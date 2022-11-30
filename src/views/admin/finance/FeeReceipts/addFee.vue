<template>
  <div class="mg-l-10">
    <e-container hideHeader pageTitle="Add Fee" :back="$url.FI_FEE_RECEIPTS">
      <el-row :gutter="24" style="background: white; padding: 20px" :rules="rules">
        <el-col :span="6">
          <div style="color: #000000cc; padding-bottom: 10px" class="fs-16 f-600">
            Standard
          </div>
          <div style="color: #00000099" class="fs-16">{{ student.section.standard.name + ' - ' + student.section.name }}</div>
        </el-col>
        <el-col :span="5">
          <div style="color: #000000cc; padding-bottom: 10px" class="fs-16 f-600">
            Student Name
          </div>
          <div style="color: #00000099" class="fs-16">{{ student.first_name }}</div>
        </el-col>
        <el-col :span="2" :offset="window.width > 767 ? 10 : 5">
          <e-button label="Edit" @click="$router.push($url.FI_FEE_RECEIPTS_DETAILS)" :plain="true" />
        </el-col>
      </el-row>
      <div class="card" :style="window.width > 767 ? 'display: flex; justify-content: space-between; margin: 20px 90px 0px 11px' : ''">
        <receipts-card v-for="(receipts, i) in receiptscard" :key="i" :title="receipts.title" :count="receipts.count" />
      </div>
      <el-row>
        <el-col :span="window.width > 767 ? 10 : 24">
          <div class="heading">Student Detail</div>
          <div style="border-radius: 10px 10px 0px 0px">
            <el-row style="border-radius: 10px 10px 0px 0px;background: #fcdfbd66;padding: 25px;">
              <el-col :span="8">
                <el-avatar :size="93" :src="require('@/assets/images/profile.jpg')" />
              </el-col>
              <el-col :span="12" :offset="2">
                <div style="details-heading">Admission Number</div>
                <div class="details-text">{{ student.admission_number }}</div>

                <div style="details-heading">Roll Number</div>
                <div class="details-text">{{ student.roll_number }}</div>

                <div style="details-heading">Gender</div>
                <div class="details-text">{{ student.gender }}</div>
              </el-col>
            </el-row>
            <el-row style="background: white; padding: 25px">
              <div style="color: #000000cc; font-sixe: 16px">
                Fee payment Status
              </div>
              <br />
              <el-col :span="10" style="height: 9rem; overflow: hidden">
                <GChart type="PieChart" :data="pieChartData" :options="pieChartOptions" class="z-index--1" />
              </el-col>
              <el-col :span="9" :offset="1">
                <div style="display: flex">
                  <span class="circle-bar" style="background: #edecfe"></span>
                  <span style="color: #11141a; font-size: 12px; font-weight: 300">On or Before Time</span>
                </div>
                <div style="color: #4d4f5c; opacity: 0.5; margin-left: 20px">60%</div>
                <br />
                <div style="display: flex">
                  <span class="circle-bar" style="background: #514bf8"></span>
                  <span style="color: #11141a; font-size: 12px; font-weight: 300">Late Fee</span>
                </div>
                <div style="color: #4d4f5c; opacity: 0.5; margin-left: 20px">60%</div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="window.width > 767 ? 13 : 24" :offset="window.width > 767 ? 1 : 0" :rules="rules">
          <div class="heading">Student Detail</div>
          <el-card shadow="none" style="height: 29rem" :rules="rules">
            <el-row :rules="rules">
              <el-row>
                <el-col :span="10">
                  <e-input v-model="feeDetail.receipt_number" label="Receipt Number" placeholder="Receipt Number" :rules="rules">
                  </e-input>
                </el-col>
                <el-col :span="13" :offset="1">
                  <e-date-picker v-model="feeDetail.paid_date" name="Fee Date" placeholder="Paid Date" align="right" @change="setPaidDate" format="MM/dd/yyyy" :rules="rules" />
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <e-date-picker v-model="feeDetail.due_date" name="Due Date" placeholder="Due Date" @change="setDueDate" format="MM/dd/yyyy" :rules="rules" />
                </el-col>
                <el-col :span="13" :offset="1">
                  <e-input v-model="feeDetail.amount" :value="setAmount()" label="Total amount being paid" placeholder="Amount" readonly />
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <e-select label="Payment Type" placeholder="Choose payment type" v-model="feeDetail.payment_type" :options="paymentTypes" :optionName="'label'" :valueKey="'value'" @visible-change="getType" :rules="rules" />
                </el-col>
              </el-row>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <div class="heading mg-l-20">Total Fees Distribution</div>
      <el-table :data="feeLineItems" custom-class="text-white">
        <el-table-column label="Line Item" prop="fee_line_item_type" width="350" />
        <el-table-column label="Payable Amount" width="350">
          <template slot-scope="scope">
            {{ scope.row.amount ? scope.row.amount : 0 }}
          </template>
        </el-table-column>
        <el-table-column label="Due Amount"  prop="default_amount" width="300" />
        <el-table-column label="Amount Paid" width="300">
          <template slot-scope="scope">
            <e-input v-model="scope.row.amount" class="mg-t-20" :placeholder="scope.row.paid_amount ? scope.row.paid_amount : 0" />
          </template>
        </el-table-column>
        <el-table-column label="Remaining Due Amount" width="350" align="center">
          <template slot-scope="scope">
            <span :class="scope.row.default_amount === scope.row.paid_amount ? 'text-green' : 'text-red'">{{ scope.row.default_amount - scope.row.paid_amount }}</span>
          </template>
        </el-table-column>
      </el-table>
      <br />
      <el-row :gutter="23">
        <div class="color: #000000CC;font-size:16px;padding:10px 0">Add Remarks</div>
        <textarea v-model="feeDetail.remarks" class="details-expenses__textarea" placeholder="Add reamarks if any..." rows="6" cols="210" />
      </el-row>
      <el-row class="text-right" :style="window.width > 767 ? 'border-top: 1px solid #fcdfbd; margin-top: 20px' : 'border-top: 1px solid #fcdfbd; margin-top: 20px; padding-top: 20px'">
        <e-button :span="window/width > 767 ? 18 : 12" label="Cancel" width="180" type="text" :class="window.width > 767 ? 'p-45 cancel-button-margin' : ''" />
        <e-button :span="window.width > 767 ? 3 : 12" label="Proceed" width="180" @click="onSubmit" css="float-right" :class="window.width > 767 ? 'p-45' : ''" />
      </el-row>
    </e-container>
  </div>
</template>

<script>
import receiptsCard from "@/components/finance/receiptsCard.vue"
import { dispatchGraphql} from "@/api/dispatcher"
import eButton from "@/controls/eButton.vue"
import { mapMutations } from "vuex"
import moment from 'moment'
import screenSize from '@/mixins/screenSize'
export default {
  components: { eButton, receiptsCard },
  mixins: [screenSize],
  data: () => ({
    receiptscard: [
      {
        title: "Total Payable (INR)",
        count: "0",
      },
      {
        title: "Total Paid (INR)",
        count: "0",
      },
      {
        title: "Total Due (INR)",
        count: "0",
      },
      {
        title: "Term Due (INR)",
        count: "0",
      },
    ],
    pieChartData: [
      ["1", "Count", { role: "style" }],
      ["1", 70, "#f00"],
      ["1", 120, "#f000"],
    ],
    pieChartOptions: {
      // is3D:true,
      pieHole: 0.8,
      pieSliceText: "none",
      chartArea: { top: "0%", height: "70%", width: "80%" },
      legend: "none",

      slices: [
        { color: "#a4a1fb" },
        { color: "#edecfe", offset: 0.01, elevated: true, size: 90 },
      ],
    },
    paymentTypes: [
      { label: "UPI Applications", value: "UPI Applications" },
      { label: "Netbanking", value: "Netbanking" },
      { label: "Credit/Debit Card", value: "Credit/Debit Card" },
      { label: "Cash", value: "Cash" }
    ],
    feeLineItems: [],
    student: {},
    feeDetail: {},
    feeDetails: [],
    terms: [],
    feeId: null,
    feeMutation: `mutation($object: fee_details_insert_input!) {
      insert_fee_details_one(object: $object) {
        id
      }
    }`,
    lineResultMutation: `mutation($objects: [student_fee_line_item_results_insert_input!]!) {
      insert_student_fee_line_item_results(objects: $objects) {
        affected_rows
        returning {
          id
        }
      }
    }`,
    lineUpdateMutation: `mutation($id: uuid!, $changes: student_fee_line_items_set_input) {
      update_student_fee_line_items_by_pk(pk_columns: {id: $id}, _set: $changes) {
        id
        paid_amount
      }
    }`
  }),
   mounted() {
    /* this.setAsideMenuCollapse(true);
    setTimeout(() => {
      this.setAsideWidth("100px");
    }, 100); */
  },
  created() {
   // this.setAsideMenuCollapse(true);
   // this.setAsideWidth("280px");
    this.getTerms()
    this.getUser()
  },
  destroyed() {
    this.setAsideMenuCollapse(false);
  },
  methods: {
    getType(value) {
      this.feeDetail.payment_type = value
    },
    setAmounts() {
      let payable = 0
      let paid = 0
      let due = 0
      var term = {}
      const currentDate = moment(new Date()).format('yyyy-MM-DD')
      for (const item of this.student.student_fee_line_items) {
        payable += item.default_amount
        paid += item.paid_amount
      }
      for (const item of this.terms) {
        if (currentDate > moment(item.start_date).format('yyyy-MM-DD') &&  currentDate < moment(item.due_date).format('yyyy-MM-DD')) {
          term = item
        }
      }
      if (term) {
        console.log('amount', (payable * term.percent_of_fees) / 100)
        this.receiptscard[3].count = ((payable * term.percent_of_fees) / 100)
      }
      due = payable - paid
      this.receiptscard[0].count = payable
      this.receiptscard[1].count = paid
      this.receiptscard[2].count = due
    },
    setItemVariables(data) {
      var item = JSON.parse(JSON.stringify(data))
      item.paid_amount = (item.paid_amount ? parseInt(item.paid_amount) : 0) + (item.amount ? parseInt(item.amount) : 0)
      delete item.amount
      console.log('item', item)
      return {
        "id": item.id,
        "changes": item
      }
    },
    setItemResultVariables() {
      var itemResults = JSON.parse(JSON.stringify(this.feeLineItems))
      itemResults.map(x => {
        x.student_fee_line_item_id = x.id,
        x.fee_detail_id = this.feeId
        delete x.paid_amount
        delete x.fee_line_item_type
        delete x.id
        delete x.default_amount
        delete x.student_id
      })
      console.log('results', itemResults)
      return {
        "objects": itemResults
      }
    },
    setFeeVariables(feeData) {
      feeData.amount = this.setAmount()
      feeData.student_id = this.$route.params.studentId
      console.log('fee', feeData)
      return {
        "object": feeData
      }
    },
    onSubmit() {
      dispatchGraphql(this.feeMutation, this.setFeeVariables(this.feeDetail)).then((response) => {
        this.feeId = response.insert_fee_details_one.id
        dispatchGraphql(this.lineResultMutation, this.setItemResultVariables()).then((response) => {
          console.log(response)
          for(const item of this.feeLineItems) {
            dispatchGraphql(this.lineUpdateMutation, this.setItemVariables(item)).then((response) => {
              console.log(response)
              this.$router.push(this.$url.FI_FEE_RECEIPTS)
            })
          }
        })
      })
    },
    setDueDate(value) {
      this.feeDetail.due_date = value
    },
    setPaidDate(value) {
      this.feeDetail.paid_date = value
    },
    setAmount() {
      let total = 0
      for (const item of this.feeLineItems) {
        total = (item.amount ? parseInt(item.amount) : 0) + total
      }
      this.feeDetail.amount = total
      return total
    },
    getUser() {
      const query = `query {
        users_by_pk(id: "${this.$route.params.studentId}") {
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
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.student = response.users_by_pk
        this.feeLineItems = this.student.student_fee_line_items
        this.setAmounts()
      })
    },
    getTerms() {
      const query = `query {
        terms {
          id
          start_date
          percent_of_fees
          due_date
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.terms = response.terms
      })
    },
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth"]),
    ptest(d) {
      console.log(d);
    },
  },
};
</script>

<style>
.details-heading {
  color: #000000cc;
  font-weight: 600;
}
.details-text {
  color: #888888;
  margin-bottom: 9px;
}
.circle-bar {
  width: 10px;
  height: 10px;

  display: inline-block;
  margin-top: 6px;
  margin-right: 7px;
  border-radius: 50%;
}

.total-fees .el-table td,
.el-table th.is-leaf {
  border-bottom: none;
}
.total-fees .el-table__row td:first-child {
  border: 1px solid #70707033 !important;
  border-bottom: none !important;
  border-top: none !important;
  color: #00000099 !important;
  /* border-right:1px solid #707070 !important; */
}
.total-fees .el-table__row td:last-child {
  border: 1px solid #70707033 !important;
  border-bottom: none !important;
  border-top: none !important;
  border-left: none !important;
  color: red !important;
  /* border-right:1px solid #707070 !important; */
}
.total-fees .el-pagination {
  display: none !important;
}
.details-expenses__textarea {
  box-shadow: 0px 1px 3px #11111112;
  border: 1px solid #cccccc;
  border-radius: 4px;
  padding: 10px;
}
.vertical {
  border-right: 1px solid #e7e7e7;
  margin-right: 60px;
}
.hr-line {
  display: block;
  width: 99.6%;
  height: 1px;
  background: #cccccc;
}
@media only screen and (device-width: 768px) {
  .card {
    padding-left: 30px;
  }
  .cancel-button-margin {
    margin-right: 57px;
  }
}
</style>
