<template>
  <div class="about">
    <es-container
      pageTitle="Fee Receipts"
      subTitle="Below is the fee receipts generated in this academic year"
      btnIcon="el-icon-plus"
      btnText="Pay Fee"
      @btnClick="$router.push($url.FI_FEE_RECEIPTS_ADD)"
      class="bg-black-5"
    >
      <el-row :gutter="20" class="mg-l-5">
        <el-col class="mg-t-5" :span="8" :offset="7">
          <es-search v-model="searchBy" placeholder="Search"></es-search>
        </el-col>
        <el-col :span="2" :offset="1">
          <es-select placeholder="Sort by" class="select-icon"></es-select>
        </el-col>
        <el-col :span="2" class="mg-l-20">
          <es-select placeholder="Term" class="select-icon"></es-select>
        </el-col>
        <el-col :span="3" class="mg-l-20">
          <es-select placeholder="Date Range" class="select-icon"></es-select>
        </el-col>
      </el-row>
      <br />
      <el-card class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
        <el-row>
          <el-col :span="4" class="mg-l-10 d-flex">
            <e-svg :style="'padding-top: 10px; padding-right: 15px'" icon="rupee"></e-svg>
            <div>
              <div class="text-gray-6">Total Payable(INR)</div>
              <div class="sub-title">{{ getTotalAmount() }}</div>
            </div>
          </el-col>
          <el-col :span="4" class="d-flex">
            <e-svg :style="'padding-top: 10px; padding-right: 15px'" icon="rupee"></e-svg>
            <div>
              <div class="text-gray-6">Total Paid(INR)</div>
              <div class="sub-title">{{ getPaidAmount() }}</div>
            </div>
          </el-col>
          <el-col :span="4" class="d-flex">
            <e-svg :style="'padding-top: 10px; padding-right: 15px'" icon="rupee"></e-svg>
            <div>
              <div class="text-gray-6">Total Due(INR)</div>
              <div class="sub-title">{{ getTotalAmount() - getPaidAmount() }}</div>
            </div>
          </el-col>
          <el-col :span="5" :offset="1">
            <es-button icon="downloadYellow" text="Download PDF" />
          </el-col>
          <el-col :span="5" class="mg-l-10">
            <es-button icon="downloadYellow" text="Download XLS" />
          </el-col>
        </el-row>
      </el-card>
      <br />
      <el-table :data="student.fee_details" custom-class="text-white">
        <el-table-column label="Receipt No." prop="receipt_number" />
        <el-table-column label="Term">
          <template slot-scope="scope">
            {{ getTerm(scope.row.paid_date) }}
          </template>
        </el-table-column>
        <el-table-column label="Amount Paid(INR)" prop="amount" />
        <el-table-column label="Creation Date">
         <template slot-scope="scope">
              {{ getDate(scope.row.paid_date) }}
            </template>
        </el-table-column>
        <el-table-column label="Action">
          <template slot-scope="scope">
            <img
              @click="handleEdit(scope.$index, scope.row)"
              src="@/assets/images/download-action-icon.png"
              alt=""
             />
            <img
              @click="$router.push($url.FI_FEE_VIEW + '/'+ scope.row.id)"
              src="@/assets/images/3dot-action.png"
              alt=""
              class="pointer"
            />
          </template>
        </el-table-column>
      </el-table>
    </es-container>
  </div>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher"
import moment from 'moment'
import { getId } from '@/util/auth'
export default {
  components: {  },
  data: () => ({
    student: {},
  }),
  created() {
    this.getTerms()
    this.getUser()
  },
  methods: {
    ptest(d) {
      console.log(d);
    },
    getTerm(date) {
      var term = {}
      for (const item of this.terms) {
        if (moment(date).format('yyyy-MM-DD') > moment(item.start_date).format('yyyy-MM-DD') &&  moment(date).format('yyyy-MM-DD') < moment(item.due_date).format('yyyy-MM-DD')) {
          term = item
        }
      }
      if (term) {
        return term.name
      }
    },
    getPaidAmount() {
      let total = 0
      for (const item of this.student.student_fee_line_items) {
        total = total + item.paid_amount
      }
      return total
    },
    getTotalAmount() {
      let total = 0
      for (const item of this.student.student_fee_line_items) {
        total = total + item.default_amount
      }
      return total
    },
    getDate(date) {
      return moment(date).format('DD MMM yyyy')
    },
    getUser() {
      const query = `query {
        users_by_pk(id: "${getId()}") {
          id
          first_name
          admission_number
          roll_number
          gender
          dob
          section {
            id
            name
            standard {
              id
              name
            }
          }
          student_fee_line_items {
            id
            student_id
            fee_line_item_type
            default_amount
            paid_amount
          }
          fee_details {
            id
            paid_date
            amount
            receipt_number
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.student = response.users_by_pk
      })
    },
    getTerms() {
      const query = `query {
        terms {
          id
          name
          start_date
          due_date
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.terms = response.terms
      })
    }
  },
};
</script>
<style>
.sort-icon {
  background: transparent !important;
}
.sort-icon:hover {
  background: #bc6c42 !important;
}
</style>
