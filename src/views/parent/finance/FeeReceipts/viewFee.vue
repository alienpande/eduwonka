<template>
  <div>
    <e-container hideHeader pageTitle="View Fee" :back="$url.FI_FEE_RECEIPTS">
      <div style="border-radius: 10px 10px 0px 0px">
        <el-row>
          <el-col :span="13">
            <el-row
              style="
                border-radius: 10px 10px 0px 0px;
                background: #fcdfbd66;
                padding: 25px;
                height: 15.3rem;
              "
            >
              <el-col :span="7">
                <el-avatar
                  :size="133"
                  :src="require('@/assets/images/profile.jpg')"
                />
              </el-col>
              <el-col :span="16">
                <el-row>
                  <el-col :span="10">
                    <div style="details-heading">Student Name</div>
                    <div class="details-text">Akanksha jain</div>

                    <div style="details-heading">Class</div>
                    <div class="details-text">6-A</div>

                    <div style="details-heading">Gender</div>
                    <div class="details-text">Female</div>
                  </el-col>
                  <el-col :span="10" :offset="1">
                    <div style="details-heading">Admission Number</div>
                    <div class="details-text">126363663</div>

                    <div style="details-heading">Roll Number</div>
                    <div class="details-text">63652476</div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="11">
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
      <div class="heading">Fee Receipt Details</div>
      <el-card shadow="none">
        <el-row>
          <el-col :span="4">
            <div style="details-heading">Receipt Number</div>
            <br/>
            <div style="color: #000000CC;" class="details-text">Text Field</div>
          </el-col>
          <el-col :span="4" >
            <div style="details-heading">Fee Date</div>
            <br/>
            <div style="color: #000000CC;" class="details-text">12/08/2020</div>
          </el-col>
           <el-col :span="4" >
            <div style="details-heading">Due Date</div>
            <br/>
            <div style="color: #000000CC;" class="details-text">12/08/2020</div>
          </el-col>
          <el-col :span="4">
            <div style="details-heading">Total amount paid</div>
            <br/>
            <div style="color: #000000CC;" class="details-text">Rs 20,222</div>
          </el-col>
          <el-col :span="4" >
            <div style="details-heading">Payment type</div>
            <br/>
            <div style="color: #000000CC;" class="details-text">Cash</div>
          </el-col>
        </el-row>
      </el-card>
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
           Remarks
        </div>
       <div style="color: #00000099;" class="fs-16 ">Lore ipsum to add notes</div>
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
            label="Download"
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
import receiptsCard from "@/components/finance/receiptsCard.vue";
import { mapMutations } from "vuex";
export default {
  components: { receiptsCard },
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
