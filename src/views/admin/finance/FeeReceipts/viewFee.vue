<template>
  <div class="mg-l-20 mg-r-20">
    <e-container hideHeader pageTitle="View Fee" :back="$url.FI_FEE_RECEIPTS">
      <div style="border-radius: 10px 10px 0px 0px">
        <el-row>
          <el-col :span="window.width > 767 ? 10 : 24">
            <el-row
              style="
                border-radius: 10px 10px 0px 0px;
                background: #fcdfbd66;
                padding: 25px;
                height: 15.3rem;
              "
            >
              <el-col :span="8">
                <el-avatar
                  :size="93"
                  :src="require('@/assets/images/profile.jpg')"
                />
              </el-col>
              <el-col :span="12" :offset="2">
                <el-row>
                  <el-col :span="11" :offset="1">
                    <div style="details-heading text">Student Name</div>
                    <div class="details-text text"> {{studentFeeDetails.student.first_name}}</div>

                    <div style="details-heading text">Class</div>
                    <div class="details-text text">{{studentFeeDetails.student.section.standard.name}}{{studentFeeDetails.student.section.name}}</div>

                    <div style="details-heading text">Gender</div>
                    <div class="details-text text">{{studentFeeDetails.student.gender}}</div>
                  </el-col>
                  <el-col :span="11" :offset="1">
                    <div style="details-heading text">Admission Number</div>
                    <div class="details-text text">{{studentFeeDetails.student.admission_number}}</div>

                    <div style="details-heading text">Roll Number</div>
                    <div class="details-text text">{{studentFeeDetails.student.roll_number}}</div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="window.width > 767 ? 12 : 24" :offset="window.width > 767 ? 1 : 0">
            <el-row style="background: white; padding: 25px">
              <div style="color: #000000cc; margin-left: 92px; font-sixe: 16px">
                Fee payment Status
              </div>
              <br />
              <el-col :span="13" style="height: 9rem; overflow: hidden">
                <GChart
                  type="PieChart"
                  :data="pieChartData"
                  :options="pieChartOptions"
                  class="z-index--1"
                />
              </el-col>
              <el-col :span="7" :offset="2">
                <div style="display: flex">
                  <span class="circle-bar" style="background: #edecfe"></span>
                  <span
                    style="color: #11141a; font-size: 12px; font-weight: 300"
                    >On or Before Time</span
                  >
                </div>
                <div style="color: #4d4f5c; opacity: 0.5; margin-left: 20px">
                  60%
                </div>
                <br />
                <div style="display: flex">
                  <span class="circle-bar" style="background: #514bf8"></span>
                  <span
                    style="color: #11141a; font-size: 12px; font-weight: 300"
                    >Late Fee</span
                  >
                </div>
                <div style="color: #4d4f5c; opacity: 0.5; margin-left: 20px">
                  60%
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div :style="window.width > 767 ? 'display: flex; justify-content: space-between; margin: 20px 0' : ''">
        <receipts-card
          v-for="(receipts, i) in receiptscard"
          :key="i"
          :title="receipts.title"
          :count="receipts.count"
        />
      </div>
      <div class="heading">Fee Receipt Details</div>
      <el-card shadow="none">
        <el-row>
          <el-col :span="5">
            <div style="details-heading">Receipt Number</div>
            <br/>
            <div style="color: #000000CC;" class="details-text">{{ studentFeeDetails.receipt_number }}</div>
          </el-col>
          <el-col :span="5">
            <div style="details-heading">Fee Date</div>
            <br/>
            <div style="color: #000000CC;" class="details-text">{{ getDate(studentFeeDetails.paid_date) }}</div>
          </el-col>
           <el-col :span="5">
            <div style="details-heading">Due Date</div>
            <br/>
            <div style="color: #000000CC;" class="details-text">{{ getDate(studentFeeDetails.due_date) }}</div>
          </el-col>
          <el-col :span="5">
            <div style="details-heading">Total amount paid</div>
            <br/>
            <div style="color: #000000CC;" class="details-text">{{ studentFeeDetails.amount }}</div>
          </el-col>
          <el-col :span="4" >
            <div style="details-heading">Payment type</div>
            <br/>
            <div style="color: #000000CC;" class="details-text">{{ studentFeeDetails.payment_type }}</div>
          </el-col>
        </el-row>
      </el-card>
      <div class="heading">Total Fees Distribution</div>
      <el-card shadow="none" class="total-fees">
        <e-table :table="feeLineDetails" @pageInfo="ptest">
          <el-table-column label="Line Item" prop="fee_line_item_type" width="300">
            <template slot-scope="scope">
              <div>{{ scope.row.fee_line_item_type }}</div>
            </template>
          </el-table-column>
          <el-table-column label="Payable Amount" prop="default_amount" width="300">
          </el-table-column>
          <el-table-column label="Amount Paid" prop="paid_amount" width="300">
            <!-- <template slot-scope="scope">
              <input
                style="
                  box-shadow: rgb(17 17 17 / 7%) 0px 1px 3px;
                  border: 1px solid rgb(204, 204, 204);
                  border-radius: 4px;
                  padding: 7px;
                  background: transparent;
                "
                type="text"
                :placeholder="scope.row.paid_amount"
              />
            </template> -->
          </el-table-column>
          <el-table-column label="Due Amount(INR)" prop="Due" width="300">
            <template slot-scope="scope">
              {{setDueAmount(scope.row.default_amount, scope.row.paid_amount)}}
            </template>
          </el-table-column>
          <el-table-column label="Due Amount of this term" prop="dueThisTerm" width="300">
          <template slot-scope="scope">
              {{setDueTermAmount(scope.row.default_amount)}}
            </template>
          </el-table-column>
        </e-table>
        <div class="hr-line"></div>
        <br />
        <div class="color: #000000CC;font-size:16px;padding:10px 0">
           Remarks
        </div>
       <div style="color: #00000099;" class="fs-16 ">{{studentFeeDetails.remarks}}</div>
      </el-card>

      <el-row class="text-right" :style="window.width > 767 ? 'border-top: 1px solid #fcdfbd; margin-top: 20px' : 'border-top: 1px solid #fcdfbd; margin-top: 20px; padding-top: 20px;'">
        <e-button
          :span="window.width > 767 ? 18 : 12"
          label="Cancel"
          width="180"
          type="text"
          :class="window.width > 767 ? 'p-45 cancel-button-margin' : ''"
        ></e-button>
        <e-button
          :span="window.width > 767 ? 3 : 12"
          label="Proceed"
          width="180"
          @click="handleClick"
          css="float-right"
          :class="window.width > 767 ? 'p-45' : ''"
        ></e-button>
      </el-row>
    </e-container>
  </div>
</template>
<script>
import receiptsCard from "@/components/finance/receiptsCard.vue";
import { mapMutations } from "vuex";
import { dispatchGraphql } from "@/api/dispatcher";
import moment from "moment"
import screenSize from "@/mixins/screenSize"
export default {
  components: { receiptsCard },
  mixins: [screenSize],
  data: () => ({
    receiptscard: [
      {
        title: "Total Payable (INR)",
        count: "28,345",
      },
      {
        title: "Total Paid (INR)",
        count: "28,345",
      },
      {
        title: "Total Due (INR)",
        count: "28,345",
      },
      {
        title: "Term Due (INR)",
        count: "28,345",
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
    tableData: [
      {
        name: "Lorem",
        payableamount: "34756",
        amountPaid: "3512",
        dueamount: "34756",
        dueThisTerm: "34756",
      },
      {
        name: "Lorem",
        payableamount: "34756",
        amountPaid: "3512",
        dueamount: "34756",
        dueThisTerm: "34756",
      },
      {
        name: "Lorem",
        payableamount: "34756",
        amountPaid: "3512",
        dueamount: "34756",
        dueThisTerm: "34756",
      },
      {
        name: "Lorem",
        payableamount: "34756",
        amountPaid: "3512",
        dueamount: "34756",
        dueThisTerm: "34756",
      },
      {
        name: "Lorem",
        payableamount: "34756",
        amountPaid: "3512",
        dueamount: "34756",
        dueThisTerm: "34756",
      },
      {
        name: "Lorem",
        payableamount: "34756",
        amountPaid: "3512",
        dueamount: "34756",
        dueThisTerm: "34756",
      },
      {
        name: "Lorem",
        payableamount: "34756",
        amountPaid: "3512",
        dueamount: "34756",
        dueThisTerm: "34756",
      },
      {
        name: "Lorem",
        payableamount: "34756",
        amountPaid: "3512",
        dueamount: "34756",
        dueThisTerm: "34756",
      },
      {
        name: "Lorem",
        payableamount: "34756",
        amountPaid: "3512",
        dueamount: "34756",
        dueThisTerm: "34756",
      },
      {
        name: "Lorem",
        payableamount: "34756",
        amountPaid: "3512",
        dueamount: "34756",
        dueThisTerm: "34756",
      },
      {
        name: "Lorem",
        payableamount: "34756",
        amountPaid: "3512",
        dueamount: "34756",
        dueThisTerm: "34756",
      },
      {
        name: "Lorem",
        payableamount: "34756",
        amountPaid: "3512",
        dueamount: "34756",
        dueThisTerm: "34756",
      },
      {
        name: "Lorem",
        payableamount: "34756",
        amountPaid: "3512",
        dueamount: "34756",
        dueThisTerm: "34756",
      },
      {
        name: "Lorem",
        payableamount: "34756",
        amountPaid: "3512",
        dueamount: "34756",
        dueThisTerm: "34756",
      },
    ],
    query: `query($id: uuid){
      student_fee_line_items(where: {student_id: {_eq: $id}}) {
        id
        default_amount
        paid_amount
      }
    }`,
    feeItemQuery: `query($id: uuid){
      student_fee_line_items(where: {student_id: {_eq: $id}}) {
        paid_amount
        id
        fee_line_item_type
        default_amount
      }
    }`,
    studentFeeDetails: {},
    totalAmount: [],
    feeLineDetails: []
  }),
  methods: {
    getDate(date) {
      return moment(date).format('DD MMM, yyyy')
    },
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth"]),
    ptest(d) {
      console.log(d);
    },
    getStudentFee() {
      const query = `query($id: uuid){
        fee_details_by_pk(id: "${this.$route.params.id}") {
          id
          student_id
          amount
          receipt_number
          created_at
          paid_date
          due_date
          payment_type
          remarks
          student {
            id
            roll_number
            first_name
            admission_number
            gender
            section {
              id
              name
              standard {
                id
                name
              }
            }
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.studentFeeDetails = response.fee_details_by_pk
        console.log("class section", this.studentFeeDetails)
        dispatchGraphql(this.query, { id: this.studentFeeDetails.student_id }).then((response) => {
          this.totalAmount = response.student_fee_line_items
          console.log("student", this.totalAmount)
          this.getTotalAmount()
        })
        dispatchGraphql(this.feeItemQuery, { id: this.studentFeeDetails.student_id }).then((response) => {
          this.feeLineDetails = response.student_fee_line_items
        })
      })
    },
    getTotalAmount() {
      let total_Amount = 0
      let paidAmount = 0
      for (const item of this.totalAmount) {
        total_Amount = total_Amount + item.default_amount
        paidAmount = paidAmount + item.paid_amount

      }
      this.receiptscard[0].count = total_Amount
      this.receiptscard[1].count = paidAmount
      this.receiptscard[2].count = total_Amount - paidAmount
      console.log('totalamount',total_Amount , paidAmount , this.receiptscard[0].count)
      
    },
    setDueAmount(amount, paid) {
      const due_amount = amount - paid
      return parseInt(due_amount)
    },
    setDueTermAmount(val) {
      const due_term_amount = 40 * parseInt(val) / 100
      return parseInt(due_term_amount)
    },
  },
  // mounted() {
  //   this.setAsideMenuCollapse(true);
  //   setTimeout(() => {
  //     this.setAsideWidth("100px");
  //   }, 100);
  // },
  created() {
    // this.setAsideMenuCollapse(true);
    // this.setAsideWidth("280px");
    this.getStudentFee()
  },
  // destroyed() {
  //   this.setAsideMenuCollapse(false);
  // },
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
.hr-line {
  display: block;
  width: 99.6%;
  height: 1px;
  background: #cccccc;
}
@media only screen and (device-width: 768px) {
  .text {
    font-size: 11px;
  }
  .cancel-button-margin {
    margin-right: 57px;
  }
}
</style>
