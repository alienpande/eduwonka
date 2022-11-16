<template>
  <!-- <e-container pageTitle="Enquires" btnIcon="el-icon-plus" btnText="Add Enquiry" @btnClick="$router.push($url.HQ_ENQUIRES_PROSPECT_FORM)"> -->
  <e-container pageTitle="Enquires" >
    <el-tabs class="floatTabHeader" v-model="activeName">
      <el-tab-pane label="Prospect Enquires" name="prospect">
      <el-row>

        <el-row class="searchCard searchCard-2">
          <el-col :span="21">
            <p class="heading" style="padding-left:0px !important;margin: 0px !important;">List of prospect student</p>
          </el-col>
          <e-button :span="3" class="button-margin" icon="el-icon-plus" style="margin-left:auto " label="Add Enquiry" @click="$router.push($url.HQ_ENQUIRES_PROSPECT_FORM)" />
        </el-row>
      </el-row>
        <el-row class="searchCard">
          <el-col :span="5" class="dropdown-tab">
           <!-- <e-dropdown :list="filterStandard" primary />  -->
            <el-dropdown @command="handleStandard">
              <span class="el-dropdown-link primary-text" primary>
                Standard<i class="el-icon-arrow-down el-icon--right primary"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="item in filterStandard" :key="item.id" :command="item.id">{{ item.name }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="4" class="dropdown-tab">
            <e-dropdown :list="filterDate" primary />
          </el-col>
          <el-col :span="4" class="dropdown-tab">
            <!-- <e-dropdown :list="filterStatus" primary /> -->
            <el-dropdown @command="handleStatus">
              <span class="el-dropdown-link primary-text" primary>
                Status<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="Active">Active</el-dropdown-item>
                <el-dropdown-item command="Inactive">Inactive</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="4" class="primary-text dropdown-tab">Clear filter</el-col>
          <el-col :span="2"  class="dropdown-tab">
            <e-button
              icon="el-icon-search"
              :plain="true"
               type="primary"
            ></e-button>
          </el-col>
        </el-row>
        <el-row class="block" :gutter="20">
          <el-col :span="12" v-for="(enquiry, index) in enquiries" :key="index" class="enquiry-card" >
            <enquiry-card v-if="enquiry.enquiry_type === 'prospect'"
              :id="enquiry.id"
              :enquiry_type="enquiry.enquiry_type"
              :name="enquiry.student_name"
              :title="enquiry.purpose"
              :standard="enquiry.standard.name"
              :status="enquiry.status"
              :enquiryDate="enquiry.enquiry_date"
            ></enquiry-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Student related Enquiry" name="Student">
    <!--   <el-row>
          <el-col :span="21">
            <p class="title"></p>
          </el-col>

        </el-row> -->
        <el-row class="searchCard searchCard-2">
          <el-col :span="21">
            <p class="heading" style="padding-left:0px !important;margin: 0px !important;">List of general enquiry</p>
          </el-col>
          <e-button
            :span="3"
            class="button-margin" 
            icon="el-icon-plus"
            label="Add Enquiry"
            style="margin-left:auto"
            @click="$router.push($url.HQ_ENQUIRES_STUDENT_FORM)"
          />
        </el-row>
        <el-row class="searchCard">      
          <el-col :span="6" class="dropdown-tab">
            <e-dropdown :list="filterDate" primary />
          </el-col>
          <el-col :span="6" class="dropdown-tab">
            <!-- <e-dropdown :list="filterStatus" primary /> -->
            <el-dropdown @command="handleStatus">
              <span class="el-dropdown-link primary-text" primary>
                Status<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="Active">Active</el-dropdown-item>
                <el-dropdown-item command="Inactive">Inactive</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="5" class="primary-text dropdown-tab">Clear filter</el-col>

          <el-col :span="2"  class="dropdown-tab">
            <e-button
              icon="el-icon-search"
              :plain="true"
              type="primary"
            ></e-button>
          </el-col>
        </el-row>
        <el-row class="block" :gutter="20">
          <el-col :span="12" v-for="(enquiry, index) in enquiries" :key="index" class="enquiry-card">
            <enquiry-card v-if="enquiry.enquiry_type === 'Student'"
              :id="enquiry.id"
              :enquiry_type="enquiry.enquiry_type"
              :name="enquiry.enquirer_name"
              :title="enquiry.purpose"
              :status="enquiry.status"
              :enquiryDate="enquiry.enquiry_date"
            ></enquiry-card>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <es-pagination class="pagination" :total="total" @pagination="pagination"></es-pagination>
  </e-container>
</template>
<script>
import { dispatchGraphql,dispatchGraphqlQuery } from "@/api/dispatcher"
import EnquiryCard from "@/components/hq/EnquiryCard"
import _ from 'lodash'
import esPagination from '@/studentControl/esPagination'
import { mapMutations } from 'vuex'

export default {
  components: {
    EnquiryCard,esPagination
  },
  data() {
    return {
      activeName: "prospect",
      statusType: ["Active", "Inactive"],
      standardId: [],
      limit: 10,
      offset: 0,
      total: 0,
      filterStandard: [
        // { text: "Standard" },
        // { text: "XII" },
        // { text: "XI" },
        // { text: "X" },
      ],
    filterDate: [{ text: "Date" }],

      filterStatus: [
        { text: "Status" },
        { text: "Active" },
        { text: "Inactive" },
      ],
      enquiries: [
        // {
        //   title: "Admission for class X will start on which day",
        //   name: "Amit",
        //   standard: "X",
        //   date: "14th June",
        //   status: "Responded",
        // },
        // {
        //   title: "Admission for class X will start on which day",
        //   name: "Amit",
        //   standard: "X",
        //   date: "14th June",
        //   status: "Open",
        // },
        // {
        //   title: "Admission for class X will start on which day",
        //   name: "Amit",
        //   standard: "X",
        //   date: "14th June",
        //   status: "Responded",
        // },
        // {
        //   title: "Admission for class X will start on which day",
        //   name: "Amit",
        //   standard: "X",
        //   date: "14th June",
        //   status: "Open",
        // },
        // {
        //   title: "Admission for class X will start on which day",
        //   name: "Amit",
        //   standard: "X",
        //   date: "14th June",
        //   status: "Open",
        // },
        // {
        //   title: "Admission for class X will start on which day",
        //   name: "Amit",
        //   standard: "X",
        //   date: "14th June",
        //   status: "Responded",
        // },
      ],
    };
  },
  watch: {
    activeName: _.debounce(function() {
      if (this.activeName === 'Student') {
        this.getEnquiries()
      } else {
        this.getEnquiries()
      }
    }),
  },
  mounted() {
    this.hideAsideMenuMobile();
  },
  created() {
    this.getStandards()
    this.getEnquiries()
  },
  methods: {
    ...mapMutations("Common",["hideAsideMenuMobile"]),
    handleStatus(val) {
      if (val === 'Inactive') {
        this.statusType = ["Inactive"]
        this.getEnquiries()
      } else if (val === 'Active') {
        this.statusType = ["Active"]
        this.getEnquiries()
      } else {
        this.statusType = ["Active", "Inactive"]
        this.getEnquiries()
      }
    },
    handleStandard(val) {
      console.log('val', val)
      this.standardId = []
      this.standardId[0] = val
      this.getEnquiries()
    },
    pagination: function(object) {
      console.log('sssss', object)
      this.limit = object.limit
      this.offset = object.limit * (object.page - 1)
      console.log("bbbb", this.offset)
      this.getEnquiries(this.limit, this.offset)
    },
    getEnquiries(){
      const query = 
       `query($type: String, $status: [String!], $ids: uuid_comparison_exp,$limit: Int, $offset: Int) {
          enquiries(limit: $limit, offset: $offset, where:{_and: [{enquiry_type: {_eq: $type}}, {status: {_in: $status}}, {standard_id: $ids}]}) {
            id
            purpose
            student_name
            enquiry_date
            enquirer_name 
            enquiry_type
            status
            standard {
              id
              name
            }
          }
          enquiries_aggregate(limit: $limit, offset: $offset, where:{_and: [{enquiry_type: {_eq: $type}}, {status: {_in: $status}}, {standard_id: $ids}]}) {
            aggregate {
            count
            }
          }
        }`
      dispatchGraphql(query, this.getVariables()).then((response) => {
        console.log("enquiries data",response)
        this.enquiries = response.enquiries
        console.log('console', this.enquiries)
        // this.total = this.enquiries.length
         this.total = response.enquiries_aggregate.aggregate.count
      })
    },
    getVariables() {
      return {
        "limit": this.limit,
        "offset": this.offset,
        "type": this.activeName,
        "status": this.statusType,
        "ids":  this.activeName === 'prospect' ? { "_in": this.standardId } : { "_is_null": true }
      }
    },
    getStandards() { 
      dispatchGraphqlQuery('standards', ['id', 'name']).then((response) => {
        this.filterStandard = response.standards
        this.standardId = this.filterStandard.map(x => x.id)
        this.getEnquiries()
      })
    }
  }
}
</script>
<style scoped>
.title {
  color: #4d4f5c;
  font-size: 20px;
  opacity: 1;
}
/* .searchCard {
  background: rgb(255, 255, 255);
  height: 80px;
  padding: 30px 15px 30px 15px;
  margin: 30px 0px 30px 0px;
} */
.block {
  padding: 0px;
  padding-top: 0px;
  height: 750px;
  overflow-y: scroll;
}
@media only screen and (device-width: 768px) {
  .pagination {
    width: 50%;
    font-size: 12px;
  }
  .button-margin {
    margin-right: 35px;
  }
  .dropdown-tab {
    margin-right: 3px;
    font-size: 12px;
  }
  .enquiry-card {
    width: 100%;
  }
}
</style>
