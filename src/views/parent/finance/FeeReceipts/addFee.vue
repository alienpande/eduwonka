<template>
  <div>
    <e-container hideHeader pageTitle="Add Fee" :back="$url.FI_FEE_VIEW">
      <el-row style="background: white; padding: 20px">
        <el-col :span="3">
          <div
            style="color: #000000cc; padding-bottom: 10px"
            class="fs-16 f-600"
          >
            Standard
          </div>
          <div style="color: #00000099" class="fs-16">Class 6 A</div>
        </el-col>
        <el-col :span="3">
          <div
            style="color: #000000cc; padding-bottom: 10px"
            class="fs-16 f-600"
          >
            Student Name
          </div>
          <div style="color: #00000099" class="fs-16">Akanksha jain</div>
        </el-col>
        <el-col :span="2" :offset="16">
          <e-button label="Edit" @click="$router.push($url.FI_FEE_RECEIPTS_DETAILS)" :plain="true"> </e-button>
        </el-col>
      </el-row>
      <div
        style="display: flex; justify-content: space-between; margin: 20px 0"
      >
        <receipts-card
          v-for="(receipts, i) in receiptscard"
          :key="i"
          :title="receipts.title"
          :count="receipts.count"
        />
      </div>
      <el-row>
        <el-col :span="8">
          <div class="heading">Student Detail</div>
          <div style="border-radius: 10px 10px 0px 0px">
            <el-row
              style="
                border-radius: 10px 10px 0px 0px;
                background: #fcdfbd66;
                padding: 25px;
              "
            >
              <el-col :span="10">
                <el-avatar
                  :size="133"
                  :src="require('@/assets/images/profile.jpg')"
                />
              </el-col>
              <el-col :span="10">
                <div style="details-heading">Admission Number</div>
                <div class="details-text">126363663</div>

                <div style="details-heading">Roll Number</div>
                <div class="details-text">63652476</div>

                <div style="details-heading">Gender</div>
                <div class="details-text">Female</div>
              </el-col>
            </el-row>
            <el-row style="background: white; padding: 25px">
              <div style="color: #000000cc; font-sixe: 16px">
                Fee payment Status
              </div>
              <br />
              <el-col :span="10" style="height: 9rem; overflow: hidden">
                <GChart
                  type="PieChart"
                  :data="pieChartData"
                  :options="pieChartOptions"
                  class="z-index--1"
                />
              </el-col>
              <el-col :span="9" :offset="1">
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
          </div>
        </el-col>
        <el-col :span="14" :offset="1">
          <div class="heading">Student Detail</div>
          <el-card shadow="none" style="height: 29rem">
            <el-row>
              <el-col :span="10">
                <e-input label="Receipt Number" placeholder="Text Field">
                </e-input>
              </el-col>
              <el-col :span="10" :offset="2">
                <e-date-picker
                  class="default-picker"
                  placeholder="Text Field"
                  label="Fee Date"
                >
                </e-date-picker>
              </el-col>
              <el-col :span="10">
                <e-date-picker
                  class="default-picker"
                  placeholder="Text Field"
                  label="Due Date"
                >
                </e-date-picker>
              </el-col>
              <el-col :span="10" :offset="2">
                <e-input label="Total amount being paid" placeholder="20,222">
                </e-input>
              </el-col>
              <el-col :span="10">
                <e-select label="Payment type" placeholder="Cash"> </e-select>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <div class="heading">Total Fees Distribution</div>
      <el-card shadow="none" class="total-fees">
        <e-table :table="tableData" @pageInfo="ptest">
          <el-table-column label="Line Item" prop="name">
            <template slot-scope="scope">
              <div>{{ scope.row.name }}</div>
            </template>
          </el-table-column>
          <el-table-column label="Payable Amount" prop="payableamount">
          </el-table-column>
          <el-table-column label="Amount Paid" prop="amountPaid">
            <template slot-scope="scope">
              <input
                style="
                  box-shadow: rgb(17 17 17 / 7%) 0px 1px 3px;
                  border: 1px solid rgb(204, 204, 204);
                  border-radius: 4px;
                  padding: 7px;
                  background: transparent;
                "
                type="text"
                :placeholder="scope.row.amountPaid"
              />
            </template>
          </el-table-column>

          <el-table-column label="Due Amount(INR)" prop="dueamount">
          </el-table-column>
          <el-table-column
            style="width: 11rem"
            label="Due Amount of this term"
            prop="dueThisTerm"
          >
          </el-table-column>
        </e-table>
        <div class="hr-line"></div>
        <br />
        <div class="color: #000000CC;font-size:16px;padding:10px 0">
          Add Remarks
        </div>
        <textarea
          class="details-expenses__textarea"
          placeholder="Type here to add notes"
          rows="6"
          cols="170"
        ></textarea>
      </el-card>

      <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px">
        <el-col style="float: right" :span="9">
          <e-button
            :span="15"
            label="Cancel"
            width="180"
            css="cancel_btn"
            type="default"
            class="p-45"
          ></e-button>
          <e-button
            :span="8"
            label="Create Fee"
            width="180"
            @click="handleClick"
            css="float-right"
            class="p-45"
          ></e-button>
        </el-col>
      </el-row>
    </e-container>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import receiptsCard from "@/components/finance/receiptsCard.vue";

import eButton from "@/controls/eButton.vue";
export default {
  components: { eButton, receiptsCard },
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
  }),
  methods: {
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth"]),
    ptest(d) {
      console.log(d);
    },
  },
   mounted() {
    /* this.setAsideMenuCollapse(true);
    setTimeout(() => {
      this.setAsideWidth("100px");
    }, 100); */
  },
  created() {
   // this.setAsideMenuCollapse(true);
   // this.setAsideWidth("280px");
  },
  destroyed() {
    this.setAsideMenuCollapse(false);
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
.hr-line {
  display: block;
  width: 99.6%;
  height: 1px;
  background: #cccccc;
}
</style>
