<template>
  <div class="finance-dash">
    <el-row class="header">
      <el-col :span="20" class="title">
        Dashboard <span>Welcome Back!</span>
      </el-col>
    </el-row>
    <div style="padding: 40px; overflow: auto; height: 50vh">
      <div style="color: #354052; text-transform: capitalize" class="fs-20 f-600">
        Quick stats
      </div><br />
      <quick-stat class="finance-dash-stats" v-if="students.length > 0" :quickStat="quickStat" :users="students" :expenses="expenses" /><br /><br />
      <dashboard-chart v-if="expenses.length > 0" :expenses="expenses" />
      <e-card  titleBold="Fee Status" :bottom="{ title: 'See More', link: $url.FI_FEE_RECEIPTS, }">
        <!-- <el-row>
          <el-col :span="4" :offset="17">
            <e-dropdown :list="filter" primary />
          </el-col>
          <el-col :span="3">
            <e-dropdown :list="filter2" primary />
          </el-col>
        </el-row> -->
        <br />
        <e-table :table="students" hidePagination shadow>
          <el-table-column label="Name">
            <template slot-scope="scope">
              <e-img-name :src="require('@/assets/images/profile.jpg')" :name="scope.row.first_name" />
            </template>
          </el-table-column>
          <el-table-column label="Standard - Section">
            <template slot-scope="scope">
              <span>{{ scope.row.section.standard.name + ' - ' + scope.row.section.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Received Amount">
            <template slot-scope="scope">
              <span>{{ getPaid(scope.row.student_fee_line_items) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Due Amount(INR)">
            <template slot-scope="scope">
              <span>{{ getDue(scope.row.student_fee_line_items) }}</span>
            </template>
          </el-table-column>
        </e-table>
      </e-card>

      <e-card :span="9" titleBold="Employee Details" subTitle="Number of Employees">
        <el-row>
          <el-col :span="13">
            <e-donut-chart :teaching="setEmployees('teaching')" :nonTeaching="setEmployees('nonTeaching')" />
          </el-col>
          <el-col :span="11"><br /><br /><br />
            <div>
              <div style="color: #00000099;font-size: 16px;display: inline-block;width: 9.2rem;">
                Total Employees
              </div>
              <div style="font-size: 16px; color: #000000cc; display: inline-block">
                {{ setEmployees('total') }}
              </div>
            </div>

            <div>
              <div class="dot-color" style="background: #bc6c42; margin-top: 10px"></div>
              <div style="color: #00000099;font-size: 16px;display: inline-block;width: 8rem;">
                Teaching
              </div>
              <div style="font-size: 16px; color: #000000cc; display: inline-block">
                {{ setEmployees('teaching') }}
              </div>
            </div>

            <div>
              <div class="dot-color" style="background: #fcdfbd; margin-top: 10px"></div>
              <div style="color: #00000099;font-size: 16px;display: inline-block;width: 8rem;">
                Non Teaching
              </div>
              <div style="font-size: 16px; color: #000000cc; display: inline-block">
                {{ setEmployees('nonTeaching') }}
              </div>
            </div>
          </el-col>
        </el-row>
      </e-card>
      <e-card style="margin-top: 30px; margin-left: 30px" :span="9" subTitle="Salary Distribution" class="finance-salary-dist">
        <salary-details  class="finance-dash-salary" :teaching="setEmployees('teaching')" :nonTeaching="setEmployees('nonTeaching')" />
      </e-card>

      <e-card :span="10" class="finance-dash-task" titleBold="Task Details" subTitle="Created Tasks" :bottom="{ title: 'View Task List', link: $url.FI_TASK, }">
        <task-info v-if="setTasks('hasData')" :upcoming="setTasks('upcoming')" :ongoing="setTasks('ongoing')" :completed="setTasks('completed')" />
      </e-card>
      <e-card :span="10" class="finance-dash-task" style="margin-top: 30px; margin-left: 30px" subTitle="Assigned Task" :bottom="{ title: 'View Task List', link: $url.FI_TASK, }">
        <task-info v-if="AssignedTasks('hasData')" :upcoming="AssignedTasks('upcoming')" :ongoing="AssignedTasks('ongoing')" :completed="AssignedTasks('completed')" />
      </e-card>

      <e-card titleBold="INVOICE DETAILS" :span='15' subTitle='Recent invoice for which payment is pending' :bottom="{ title: 'View Invoice List', link: $url.FI_INVOICE, }">
        <el-table :data="invoices" hidePagination>
          <el-table-column label="Invoice number" prop="invoice_number" />
          <el-table-column label="Vendor">
            <template slot-scope="scope">
              <span>{{ scope.row.vendor_information.user.first_name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Amount(INR)" prop="total_amount" />
          <el-table-column label="Status" prop="status"> 
            <template slot-scope="scope">
              <div style="color: #0BC32E !important;" v-if="scope.row.status === 'approved'">Approved</div>
              <div style="color: #E60000;" v-if="scope.row.status === 'rejected'">Rejected</div>
              <div style="color: #FFA700;" v-if="scope.row.status === 'pending'">Pending</div>
              <div style="color: #52575D;" v-if="scope.row.status === 'Draft'">Draft</div>
            </template>
          </el-table-column>
        </el-table>
      </e-card>
      <e-card :span="7" style="margin-top: 30px; margin-left: 30px" subTitle="Payment Stats">
        <el-row>
          <el-col :span="20"><br/><br/>
            <invoice-chart :paid="getInvoiceAmounts('paid')" :outstanding="getInvoiceAmounts('outstanding')" /><br/>
            <div>
              <div style="color: #00000099;font-size: 16px;display: inline-block;width: 9.2rem;">
                Invoiced Amount
              </div>
              <div style="font-size: 16px; color: #000000cc; display: inline-block">
                {{ getInvoiceAmounts('total') }}
              </div>
            </div>

            <div>
              <div class="dot-color" style="background: #fcdfbd; margin-top: 10px"></div>
              <div style="color: #00000099;font-size: 16px;display: inline-block;width: 8rem;">
                Outstanding
              </div>
              <div style="font-size: 16px; color: #000000cc; display: inline-block">
                {{ getInvoiceAmounts('outstanding') }}
              </div>
            </div>

            <div>
              <div class="dot-color" style="background: #bc6c42; margin-top: 10px"></div>
              <div style="color: #00000099;font-size: 16px;display: inline-block;width: 8rem;">
                Paid
              </div>
              <div style="font-size: 16px; color: #000000cc; display: inline-block">
                {{ getInvoiceAmounts('paid') }}
              </div>
            </div><br/><br/>
          </el-col>
        </el-row>
      </e-card>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex"
import DashboardChart from "@/components/finance/dashboardChart.vue"
import EDonutChart from "@/components/finance/empolyChart.vue"
import InvoiceChart from "@/components/finance/invoiceChart.vue"
import salaryDetails from "@/controls/graph/eBarChart"
import taskInfo from '@/components/finance/taskInfo.vue'
import { dispatchGraphql } from "@/api/dispatcher"
import { getId } from '@/util/auth'
import moment from 'moment'
export default {
  components: { DashboardChart, EDonutChart, salaryDetails, taskInfo, InvoiceChart },
  data: () => ({
    users: [],
    students: [],
    expenses: [],
    tasks: [],
    audience: [],
    invoices: [],
    quickStat: [
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
  }),
  // mounted() {
  //   this.setAsideMenuCollapse(true);
  //   setTimeout(() => {
  //     this.setAsideWidth("94px");
  //   }, 100);
  // },
  created() {
    this.getLineItems()
    this.getTasks()
    this.getAudience()
    this.getInvoices()
    // this.setAsideMenuCollapse(true);
    // this.setAsideWidth("100px");
  },
  // destroyed() {
  //   this.setAsideMenuCollapse(false);
  // },
  methods: {
    getInvoiceAmounts(type) {
      let total = 0
      let paid = 0
      this.invoices.forEach((invoice) => {
        total += invoice.total_amount
        paid += invoice.paid_amount
      })
      if (type === 'total') {
        return total
      } else if (type === 'paid') {
        return paid
      } else if (type === 'outstanding') {
        return total - paid
      }
    },
    getInvoices() {
      const query = `query {
        invoices {
          id
          invoice_number
          total_amount
          paid_amount
          status
          vendor_information {
            id
            user {
              id
              first_name
            }
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.invoices = response.invoices
        console.log(this.invoices, "invoices")
      })
    },
    AssignedTasks(type) {
      const upcoming = this.audience.filter(x => moment(x.task.start_date).format("YYYY-MM-DD") > moment(new Date()).format("YYYY-MM-DD"))
      const completed = this.audience.filter(x => moment(x.task.end_date).format("YYYY-MM-DD") < moment(new Date()).format("YYYY-MM-DD"))
      const ongoing = this.audience.filter(x => moment(x.task.start_date).format("YYYY-MM-DD") <= moment(new Date()).format("YYYY-MM-DD") && moment(x.task.end_date).format("YYYY-MM-DD") >= moment(new Date()).format("YYYY-MM-DD"))
      if (type === "upcoming") {
        return upcoming.length
      } else if (type === "completed") {
        return completed.length
      } else if (type === "ongoing") {
        return ongoing.length
      }
      if (type === "hasData") {
        if (upcoming.length > 0 || completed.length > 0 || ongoing.length > 0) {
          return true
        } else {
          return false
        }
      }
    },
    getAudience() {
      const query = `query {
        audiences(where: {_and: [{audienceable_type: {_eq: "Task"}}, {user_id: {_eq: "${getId()}"}}]}) {
          id
          task {
            id
            start_date
            end_date
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.audience = response.audiences
      })
    },
    setTasks(type) {
      const upcoming = this.tasks.filter(x => moment(x.start_date).format("YYYY-MM-DD") > moment(new Date()).format("YYYY-MM-DD"))
      const completed = this.tasks.filter(x => moment(x.end_date).format("YYYY-MM-DD") < moment(new Date()).format("YYYY-MM-DD"))
      const ongoing = this.tasks.filter(x => moment(x.start_date).format("YYYY-MM-DD") <= moment(new Date()).format("YYYY-MM-DD") && moment(x.end_date).format("YYYY-MM-DD") >= moment(new Date()).format("YYYY-MM-DD"))
      if (type === "upcoming") {
        return upcoming.length
      } else if (type === "completed") {
        return completed.length
      } else if (type === "ongoing") {
        return ongoing.length
      }
      if (type === "hasData") {
        if (upcoming.length > 0 || completed.length > 0 || ongoing.length > 0) {
          return true
        } else {
          return false
        }
      }
    },
    getTasks() {
      const query = `query {
        tasks(where: {assigned_by_id: {_eq: "${getId()}"}}) {
          id
          start_date
          end_date
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.tasks = response.tasks
      })
    },
    setEmployees(type) {
      let total = 0
      let teachingCount = 0
      let nonTeachingCount = 0
      for (const user of this.users) {
        if (user.role === "employee" || user.role === "teacher") {
          total ++
          if (user.section_subject_teachers.length > 0) {
            teachingCount ++
          } else {
            nonTeachingCount ++
          }
        }
      }
      if (type === 'total') {
        return total
      } else if (type === 'teaching') {
        return teachingCount
      } else if (type === 'nonTeaching') {
        return nonTeachingCount
      }
    },
    getDue(val) {
      let total = 0
      val.forEach((item) => { total += item.default_amount })
      return total - this.getPaid(val)
    },
    getPaid(val) {
      let amount = 0
      val.forEach((item) => { amount += item.paid_amount})
      return amount
    },
    getLineItems() {
      const expenseQuery = `query {
        expenses {
          id
          amount
          expenses_type
          purchased_date
        }
      }`
      const query =`query {
        users {
          id
          first_name
          section_id
          role
          gender
          section_subject_teachers {
            id
          }
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
            paid_amount
            default_amount
          }
        }
      }`
      dispatchGraphql(expenseQuery).then((response) => {
        this.expenses = response.expenses
        dispatchGraphql(query).then((response) => {
          this.users = response.users
          const students = this.users.filter(x => (x.section_id != null || x.section_id != ''))
          this.students = students.filter(x => x.student_fee_line_items.length > 0)
        })
      })
    },
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth"]),
    activeTabChange(e) {
      this.activeTab = e;
    },
    scrollTop() {
      this.$nextTick(() => {
        this.$refs.tab2.scrollTop = 0;
      });
    },
  }
}
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
