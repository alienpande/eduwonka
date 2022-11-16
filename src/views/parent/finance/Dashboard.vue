<template>
  <div class="finance-dash">
    <el-row class="header">
      <el-col :span="20" class="title">
        Dashboard <span>Welcome Back!</span>
      </el-col>
    </el-row>
    <div style="padding: 40px; overflow: auto; height: 50vh">
      <div
        style="color: #354052; text-transform: capitalize"
        class="fs-20 f-600"
      >
        Quick stats
      </div>
      <br />

      <quick-stat
        v-for="(stat, i) in quiceStat"
        :key="i"
        :handIcon="true"
        :title="stat.title"
        :arrowUp="stat.stat"
      />
      <br /><br />
      <dashboard-chart />

      <e-card
        titleBold="Fee Status"
        :bottom="{
          title: 'See More',
          link: '/',
        }"
      >
        <el-row>
          <el-col :span="4" :offset="17">
            <e-dropdown :list="filter" primary />
          </el-col>
          <el-col :span="3">
            <e-dropdown :list="filter2" primary />
          </el-col>
        </el-row>
        <br />
        <e-table :table="tableData" hidePagination shadow>
          <el-table-column label="Name">
            <template slot-scope="scope">
              <e-img-name
                :src="require('@/assets/images/profile.jpg')"
                :name="scope.row.name"
              />
            </template>
          </el-table-column>
          <el-table-column label="Class-Section" prop="classSelection">
          </el-table-column>
          <el-table-column label="Received Amount" prop="ReceivedAmount">
          </el-table-column>
          <el-table-column label="Due Amount(INR)" prop="DueAmount">
          </el-table-column>
        </e-table>
      </e-card>

      <e-card
        :span="9"
        titleBold="Employee Details"
        subTitle="Number of Employees"
      >
        <el-row>
          <el-col :span="13">
            <e-donut-chart />
          </el-col>
          <el-col :span="11">
            <br />
            <br />
            <br />
            <div>
              <div
                style="
                  color: #00000099;
                  font-size: 16px;
                  display: inline-block;
                  width: 9.2rem;
                "
              >
                Total Employees
              </div>
              <div
                style="font-size: 16px; color: #000000cc; display: inline-block"
              >
                100
              </div>
            </div>

            <div>
              <div
                class="dot-color"
                style="background: #bc6c42; margin-top: 10px"
              ></div>
              <div
                style="
                  color: #00000099;
                  font-size: 16px;
                  display: inline-block;
                  width: 8rem;
                "
              >
                Teaching
              </div>
              <div
                style="font-size: 16px; color: #000000cc; display: inline-block"
              >
                60
              </div>
            </div>

            <div>
              <div
                class="dot-color"
                style="background: #fcdfbd; margin-top: 10px"
              ></div>
              <div
                style="
                  color: #00000099;
                  font-size: 16px;
                  display: inline-block;
                  width: 8rem;
                "
              >
                Non Teaching
              </div>
              <div
                style="font-size: 16px; color: #000000cc; display: inline-block"
              >
                40
              </div>
            </div>
          </el-col>
        </el-row>
      </e-card>
      <e-card
        style="margin-top: 30px; margin-left: 30px"
        :span="9"
        subTitle="Salary Distribution"
      >
        <salary-details />
      </e-card>

      <e-card
        :span="10"
        titleBold="Task Details"
        subTitle="Created Tasks"
        :bottom="{
          title: 'View Task List',
          link: '/',
        }"
      >
<task-info/>
      </e-card>
       <e-card
        :span="10"
        style="margin-top: 30px; margin-left: 30px"
        subTitle="Assigned Task"
        :bottom="{
          title: 'View Task List',
          link: '/',
        }"
      >
<task-info/>
      </e-card>

       <e-card
        titleBold="INVOICE DETAILS"
        :span='15'
        subTitle='Recent invoice for which payment is pending'
        :bottom="{
          title: 'View Invoice List',
          link: '/',
        }"
      >
       
        <e-table :table="tableData2" hidePagination shadow>
        
          <el-table-column label="Invoice number" prop="Invoicenumber">
          </el-table-column>
          <el-table-column label="Vendor" prop="Vendor">
          </el-table-column>
          <el-table-column label="Amount(INR)" prop="Amount">
          </el-table-column>
            <el-table-column label="Status" prop="status"> 
               <template slot-scope="scope">
                 <div style="color: #0BC32E !important;" v-if="scope.row.status==='Approved'"> Approved</div>
                 <div style="color: #E60000;" v-if="scope.row.status==='Rejected'"> Rejected</div>
                 <div style="color: #FFA700;" v-if="scope.row.status==='Pending'"> Pending</div>
                 <div style="color: #52575D;" v-if="scope.row.status==='Draft'"> Draft</div>
               </template>
               </el-table-column>
        </e-table>
      </e-card>
        <e-card
        :span="7"
          style="margin-top: 30px; margin-left: 30px"
        subTitle="Payment Stats"
      >
        <el-row>
          <el-col :span="20">
            <br/>
            <br/>
            <e-donut-chart />
            <br/>
            
            <div>
              <div
                style="
                  color: #00000099;
                  font-size: 16px;
                  display: inline-block;
                  width: 9.2rem;
                "
              >
                Invoiced Amount
              </div>
              <div
                style="font-size: 16px; color: #000000cc; display: inline-block"
              >
               10,000
              </div>
            </div>

            <div>
              <div
                class="dot-color"
                style="background: #bc6c42; margin-top: 10px"
              ></div>
              <div
                style="
                  color: #00000099;
                  font-size: 16px;
                  display: inline-block;
                  width: 8rem;
                "
              >
                Outstanding
              </div>
              <div
                style="font-size: 16px; color: #000000cc; display: inline-block"
              >
                60
              </div>
            </div>

            <div>
              <div
                class="dot-color"
                style="background: #fcdfbd; margin-top: 10px"
              ></div>
              <div
                style="
                  color: #00000099;
                  font-size: 16px;
                  display: inline-block;
                  width: 8rem;
                "
              >
               Paid
              </div>
              <div
                style="font-size: 16px; color: #000000cc; display: inline-block"
              >
                40
              </div>
            </div>
            <br/><br/>
          </el-col>
         
        </el-row>
      </e-card>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import dashboardChart from "@/components/finance/dashboardChart.vue";
import EDonutChart from "@/components/finance/empolyChart.vue";
import salaryDetails from "@/components/finance/salaryDetails.vue";
import taskInfo from '@/components/finance/taskInfo.vue'
export default {
  components: { dashboardChart, EDonutChart, salaryDetails,taskInfo },

  data: () => ({
    quiceStat: [
      {
        title: "Total Fee (INR)",
        stat: "up",
      },
      {
        title: "Total Collected (INR)",
        stat: "up",
      },
      {
        title: "Total Due (INR)",
        stat: "down",
      },
      {
        title: "Total Expense",
        stat: "down",
      },
    ],
    filter: [
      { text: "Sort by DueAmount" },
      { text: "Standard 2" },
      { text: "Standard 3" },
    ],
    filter2: [
      { text: "Term 1" },
      { text: "Standard 2" },
      { text: "Standard 3" },
    ],
    tableData: [
      {
        classSelection: "X-A",
        ReceivedAmount: "34756",
        DueAmount: "34756",
        name: "Ipsum dolor",
      },
      {
        classSelection: "X-A",
        ReceivedAmount: "34756",
        DueAmount: "34756",
        name: "Ipsum dolor",
      },
      {
        classSelection: "X-A",
        ReceivedAmount: "34756",
        DueAmount: "34756",
        name: "Ipsum dolor",
      },
      {
        classSelection: "X-A",
        ReceivedAmount: "34756",
        DueAmount: "34756",
        name: "Ipsum dolor",
      },
      {
        classSelection: "X-A",
        ReceivedAmount: "34756",
        DueAmount: "34756",
        name: "Ipsum dolor",
      },
      {
        classSelection: "X-A",
        ReceivedAmount: "34756",
        DueAmount: "34756",
        name: "Ipsum dolor",
      },
      {
        classSelection: "X-A",
        ReceivedAmount: "34756",
        DueAmount: "34756",
        name: "Ipsum dolor",
      },
      {
        classSelection: "X-A",
        ReceivedAmount: "34756",
        DueAmount: "34756",
        name: "Ipsum dolor",
      },
      {
        classSelection: "X-A",
        ReceivedAmount: "34756",
        DueAmount: "34756",
        name: "Ipsum dolor",
      },
      {
        classSelection: "X-A",
        ReceivedAmount: "34756",
        DueAmount: "34756",
        name: "Ipsum dolor",
      },
      {
        classSelection: "X-A",
        ReceivedAmount: "34756",
        DueAmount: "34756",
        name: "Ipsum dolor",
      },
      {
        classSelection: "X-A",
        ReceivedAmount: "34756",
        DueAmount: "34756",
        name: "Ipsum dolor",
      },
      {
        classSelection: "X-A",
        ReceivedAmount: "34756",
        DueAmount: "34756",
        name: "Ipsum dolor",
      },
    ],
      tableData2: [
      {
        Vendor: "lorem",
        Amount: "34756",
        Invoicenumber: "34756",
        name: "Ipsum dolor",
        status:'Approved'
      },
      {
        Vendor: "lorem",
        Amount: "34756",
        Invoicenumber: "34756",
        name: "Ipsum dolor",
        status:'Rejected'
      },{
        Vendor: "lorem",
        Amount: "34756",
        Invoicenumber: "34756",
        name: "Ipsum dolor",
        status:'Pending'
      },{
        Vendor: "lorem",
        Amount: "34756",
        Invoicenumber: "34756",
        name: "Ipsum dolor",
        status:'Draft'
      },{
        Vendor: "lorem",
        Amount: "34756",
        Invoicenumber: "34756",
        name: "Ipsum dolor",
        status:'Approved'
      },{
        Vendor: "lorem",
        Amount: "34756",
        Invoicenumber: "34756",
        name: "Ipsum dolor",
        status:'Draft'
      },{
        Vendor: "lorem",
        Amount: "34756",
        Invoicenumber: "34756",
        name: "Ipsum dolor",
        status:'Approved'
      },{
        Vendor: "lorem",
        Amount: "34756",
        Invoicenumber: "34756",
        name: "Ipsum dolor",
        status:'Approved'
      },
      {
        Vendor: "lorem",
        Amount: "34756",
        Invoicenumber: "34756",
        name: "Ipsum dolor",
        status:'Pending'
      },{
        Vendor: "lorem",
        Amount: "34756",
        Invoicenumber: "34756",
        name: "Ipsum dolor",
        status:'Draft'
      },{
        Vendor: "lorem",
        Amount: "34756",
        Invoicenumber: "34756",
        name: "Ipsum dolor",
        status:'Approved'
      },{
        Vendor: "lorem",
        Amount: "34756",
        Invoicenumber: "34756",
        name: "Ipsum dolor",
        status:'Draft'
      },{
        Vendor: "lorem",
        Amount: "34756",
        Invoicenumber: "34756",
        name: "Ipsum dolor",
        status:'Approved'
      },{
        Vendor: "lorem",
        Amount: "34756",
        Invoicenumber: "34756",
        name: "Ipsum dolor",
        status:'Approved'
      },
    ],
  }),
  methods: {
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth"]),
    activeTabChange(e) {
      this.activeTab = e;
    },
    scrollTop() {
      this.$nextTick(() => {
        this.$refs.tab2.scrollTop = 0;
      });
    },
  },
  mounted() {
    this.setAsideMenuCollapse(true);
    setTimeout(() => {
      this.setAsideWidth("94px");
    }, 100);
  },
  created() {
//    this.setAsideMenuCollapse(true);
//    this.setAsideWidth("100px");
  },
  destroyed() {
    this.setAsideMenuCollapse(false);
  },
};
</script>
<style>
.finance-dash .header {
  background: #fff;
  padding: 40px 56px 50px 56px;
}
.finance-dash > .header > .title {
  font: normal normal 600 24px/35px Poppins;
  color: #000000;
  opacity: 0.8;
}

.finance-dash > .header > .title > span {
  font-size: 13px;
  margin-top: -0.5rem;
  display: block;
  font-weight: 400;
  color: #00000066;
}
.dot-color {
  width: 10px;
  height: 10px;
  margin-right: 10px;
  border-radius: 50%;
  display: inline-block;
  content: "";
}
</style>
