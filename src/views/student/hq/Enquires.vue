<template>
  <es-container pageTitle="Enquires" btnIcon="el-icon-plus" btnText="Add Enquiry" class="bg-black-5" @btnClick="addNewEnquiry">
    <el-row>
      <el-col :span="5">
        <div style="color: #cfcfcf; padding-top: 10px">
          List of Enquires posted by {{ user.first_name }}
        </div>
      </el-col>
      <el-col class="pd-5"  :span="4" :offset="9">
        <es-search placeholder="search with name" v-model="searchBy" clearable />
      </el-col>
      <el-col :span="2" :offset="1">
        <es-date-picker placeholder="Date" />
      </el-col>
      <el-col :span="2" class="mg-l-30">
        <es-select v-model="selectedStatus" placeholder="Status" class="select-icon" :options="statuses" :optionName="'label'" :valueKey="'value' " @visible-change ="handleStatus" ></es-select>
      </el-col>
    </el-row><br />
    <el-row>
      <el-col :span="8" :key="enquiry" v-for="enquiry in enquiries">
        <div @click="$router.push($url.HQ_ENQUIRES_PROSPECT_DETAIL + '/' + enquiry.id  )">
        <el-card class="pointer rounded-09 bg-black-2" style="border: none; margin: 10px" shadow="none">
          <div :class="getClass(enquiry)" class="rounded-09 pd-5 wd-30p d-flex justify-content-center">
            <div :class="getText(enquiry)" class="f-600 tx-14">
              {{ enquiry.status }}
            </div>
          </div>
          <div style="margin-top: 10px;padding-top: 10px;" class="f-600 fs-18 text-white">
            {{ enquiry.purpose }}
          </div>
          <el-card class="rounded-09 bg-black-3" style="border: none; margin-top: 24px; margin-bottom: 10px" shadow="none">
            <el-row>
              <el-col :span="6">
                <div style="color: #9d9d9d; font-size: 12px">Name</div>
                <div style="color: #f3f3f3; font-weight: bold" class="mg-t-4">{{ enquiry.student_name }}</div>
              </el-col>
              <el-col :span="6" :offset="3">
                <div style="color: #9d9d9d; font-size: 12px">standard</div>
                <div style="color: #f3f3f3; font-weight: bold" class="mg-t-4">
                  {{ enquiry.standard.name }}
                </div>
              </el-col>
              <el-col :span="6" :offset="3">
                <div style="color: #9d9d9d; font-size: 12px">Enquiry Date</div>
                <div style="color: #f3f3f3; font-weight: bold" class="mg-t-4">{{ enquiry.enquiry_date }}</div>
              </el-col>
            </el-row>
          </el-card>
          <es-button style="margin-top: 16px" text="Download" icon="downloadYellow"></es-button>
        </el-card>
        </div>
      </el-col>
    </el-row>
    <es-pagination :total="total" @pagination="pagination"></es-pagination>
  </es-container>
</template>
<script>
import esPagination from '@/studentControl/esPagination'
import { dispatchGraphql } from "@/api/dispatcher"
import { getId } from '@/util/auth'
import _ from 'lodash'
export default {
  components: { esPagination },
  data() {
    return {
      user: {},
      enquiries: [],
      selectedStatus: '',
      statusType: ["Open","Responded"],
      limit: 10,
      offset: 0,
      total: 0,
      searchBy: '',
      statuses: [
        {
          label: "Open",
          value: "Open",
        },
        {
          label: "Responded",
          value: "Responded",
        }
      ],
    }
  },
  created() {
    this.getUser()
    this.getEnquiries()
  },
  watch: {
    searchBy: _.debounce(function() {
      this.getEnquiries()
    }),
  },
  methods: {
    handleStatus: function(value) {
      console.log(value)
      if (value === 'Open') {
        this.statusType = ["Open"]
        this.getEnquiries()
      }else if (value === 'Responded') {
        this.statusType = ["Responded"]
        this.getEnquiries()
      } else {
        this.statusType = ["Responded", "Open"]
        this.getEnquiries()
      }
    },
    getClass(enquiry) {
      return enquiry.status === 'Open' ? 'bg-yellow' : 'bg-green'
    },
    getText(enquiry) {
      return enquiry.status === 'Open' ? 'text-yellow' : 'text-green'
    },
    addNewEnquiry() {
      this.$router.push(this.$url.HQ_ENQUIRES_PROSPECT_FORM)
    },
    getUser() {
      const query = `{
        users_by_pk(id: "${getId()}") {
          id
          first_name
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.user = response.users_by_pk
      })
    },
    getVariables() {
      return{
        "status": this.statusType,  
        'search': `%${this.searchBy}%`,
        'limit': this.limit,
        'offset': this.offset    
      }
    },
    getEnquiries() {
      const query =`query($status: [String!],$limit: Int, $offset: Int,$search: String) {
        enquiries(limit: $limit, offset: $offset,where: {_and: [{user_id: {_eq: "${getId()}"}, status: {_in: $status}, student_name: {_ilike: $search}}]}) {
          id
          enquirer_name
          mobile_number
          ref_email
          status
          student_name
          admission_date
          enquiry_date
          purpose
          standard {
            id
            name
          }
        }
        enquiries_aggregate(where: {_and: [{user_id: {_eq: "${getId()}"}, status: {_in: $status}, student_name: {_ilike: $search}}]}) {
          aggregate {
            count
          }
        }
      }`
      dispatchGraphql(query,this.getVariables()).then((response) => {
        this.enquiries = response.enquiries
        this.total = response.enquiries_aggregate.aggregate.count
      })
    },
    pagination: function(object) {
      this.limit = object.limit
      this.offset = object.limit * (object.page - 1)
      this.getEnquiries()
    },
  }
}
</script>
<style scoped>
</style>
