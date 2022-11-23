<template>
  <div>
    <div class="finance-create-payslip" style="padding: 20px; padding-right: 50px; overflow: auto; height: 80vh">
      <el-row style="display: flex; padding: 15px">
        <el-col :span="16" style="display: flex">
          <e-svg @click="$router.push($url.FI_PAYSLIP_EMPLOYEE_DETAILS)" icon="back"></e-svg>
          <div style="color: #11141a; font-weight: 500; font-size: 24px; opacity: 0.8; margin-top: 7px; margin-left: 20px;">
            Create group Payslips
          </div>
        </el-col>
        <el-col :span="4" :offset="4">
          <br />
          <div style="color: #00000066" class="fs-16 f-500">
            Created on {{ getDate() }}
          </div>
        </el-col>
      </el-row>

      <!-- <div @click="(lorem.isSelect = !lorem.isSelect), loremSelected()" :class="{ isSelected: lorem.isSelect }" class="lorem-box" style="cursor: pointer" v-for="(lorem, i) in loremData" :key="i"> -->
      <div @click="selectedUser(i, user)" class="lorem-box" style="cursor: pointer" v-for="(user, i) in group" :key="i">
        <div>{{ user.first_name }}</div>
        <img src="@/assets/images/loremClose.png" />
        <!-- <img v-if="!lorem.isSelect" src="@/assets/images/loremClose.png" />
        <img v-else src="@/assets/images/loremColorClose.png" /> -->
      </div>
      <br /><br />
      <div class="sec-title">Employee Details</div>
      <br />
      <el-row class="finance-create-payslip-employee" style="background: white; padding: 30px 0">
        <el-col :span="window.width > 767 ? 3 : 23" :offset="window.width > 767 ? 1 : 0">
          <el-avatar :size="93" :src="require('@/assets/images/profile.jpg')" />
        </el-col>
        <el-col :span="window.width > 767 ? 19 : 24">
          <el-row :style="window.width > 767 ? 'background: #fcdfbd33; height: 140px; display: flex; flex-wrap: wrap; padding: 10px 20px;' : 'background: #fcdfbd33; padding: 10px 20px; margin-top: 20px;'">
            <div style="width: 205px; margin-bottom: 22px" v-for="(employee, i) in employees" :key="i">
              <div style="color: #000000cc" class="f-500">
                {{ employee.title }}
              </div>
              <div style="color: #00000099">{{ employee.text }}</div>
            </div>
          </el-row>
        </el-col>
      </el-row>
      <br />
      <div class="sec-title">Payslip Details</div>
      <br />
      <payslip-details @generate="generatePaySlips" @userPaySlip="handlePayslip" :payslip="user.payslip" />
    </div>
  </div>
</template>
<script>
import payslipDetails from "@/components/finance/payslipDetails.vue"
import { mapMutations } from "vuex"
import moment from 'moment'
import { dispatchGraphql } from "@/api/dispatcher"
import screenSize from '@/mixins/screenSize'
export default {
  components: { payslipDetails },
  mixins : [screenSize],
  data: () => ({
    group: [],
    allSelect:false,
    employeeDetails: [],
    employeePaySlips: [],
    user: {},
    earnings: [],
    deductions: []
  }),
  computed: {
    employees() {
      return [
        {
          title: "Employees Name",
          text: this.user.first_name || 'Nil',
        },
        {
          title: "Joining Month/Year",
          text: moment(this.user.created_at).format('DD MMM YYYY'),
        },
        {
          title: "Attendance this month",
          text: "28",
        },
        {
          title: "Department",
          text: this.user.department,
        },
        {
          title: "UAN Number",
          text: this.user.uid_number || 'Nil',
        },
        {
          title: "Gender",
          text: this.user.gender || 'Nil',
        },
        {
          title: "Employees code",
          text: this.user.uid_number || 'Nil',
        },
        {
          title: "PF Account Number",
          text: "AS28347824",
        },
        {
          title: "Designation",
          text: this.user.designation,
        },
      ]
    },
  },
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
    getPayslipItems() {
      const query = `query {
        payslip_line_items(where: {campus_id: {_eq: "${this.$route.params.campusId}"}}) {
          id
          custom_fields
          payslip_line_item_type
        }
      }`
      dispatchGraphql(query).then((response) => {
        let earnings = response.payslip_line_items.filter(x => x.payslip_line_item_type === 'Earnings')[0].custom_fields
        let deductions = response.payslip_line_items.filter(x => x.payslip_line_item_type === 'Deductions')[0].custom_fields
        earnings.map(x => { this.earnings.push({ name: x, amount: 0 }) })
        deductions.map(x => { this.deductions.push({ name: x, amount: 0 }) })
        console.log('line items', this.earnings, this.deductions)
      })
    },
    handleEmployees() {
      for(const employee of this.group) {
        this.employeeDetails.push({
          id: employee.id,
          first_name: employee.first_name,
          created_at: employee.created_at,
          gender: employee.gender,
          uid_number: employee.uid_number,
          department: employee.designation ? employee.designation.department.name : 'Nil',
          designation: employee.designation ? employee.designation.designation_type : 'Nil',
          payslip: {
            custom_fields: "",
            payslip_number: "",
            month: " ",
            employee_id: employee.id,
            due_date: "",
            earnings: this.earnings,
            deductions: this.deductions,
            total_amount: "",
            remarks: "",
            status: "draft",
            year: moment().format('yyyy')
          }
        })
      }
    },
    handlePayslip(val) {
      var earn = []
      var deduct = []
      let user = this.employeeDetails.filter(x => x.id === val)[0]
      let data = this.employeeDetails.indexOf(user)

      for (const item of user.payslip.earnings) {
        earn.push(item.name + ':' + item.amount)
      }
      for (const item of user.payslip.deductions) {
        deduct.push(item.name + ':' + item.amount)
      }

      if (this.employeePaySlips.filter(x => x.employee_id === val)[0]) {
        let emp = this.employeePaySlips.filter(x => x.employee_id === val)[0]
        let index = this.employeePaySlips.indexOf(emp)
        this.employeePaySlips[index] = {
          payslip_number: user.payslip.payslip_number,
          month: user.payslip.month,
          employee_id: user.payslip.employee_id,
          due_date: user.payslip.due_date,
          total_amount: user.payslip.total_amount,
          remarks: user.payslip.remarks,
          year: user.payslip.year,
          custom_fields: '{Earnings=> ' + earn + '}' + '{Deductions=> ' + deduct + '}',
          status: "submitted"
        }
      } else {
        this.employeePaySlips.push({
          payslip_number: user.payslip.payslip_number,
          month: user.payslip.month,
          employee_id: user.payslip.employee_id,
          due_date: user.payslip.due_date,
          total_amount: user.payslip.total_amount,
          remarks: user.payslip.remarks,
          year: user.payslip.year,
          custom_fields: '{Earnings=> ' + earn + '}' + '{Deductions=> ' + deduct + '}',
          status: "submitted"
        })
      }
      console.log(this.employeePaySlips)
      this.selectedUser(data + 1, this.employeeDetails[data + 1])
    },
    generatePaySlips() {
      console.log('payslip', this.employeePaySlips)
      const mutation = `mutation($objects: [payslips_insert_input!]!) {
        insert_payslips(objects: $objects) {
          affected_rows
          returning {
            id
            custom_fields
          }
        }
      }`
      dispatchGraphql(mutation, { objects: this.employeePaySlips }).then((response) => {
        console.log(response)
        this.$router.push(this.$url.FI_PAYSLIP)
      })
    },
    getDate() {
      return moment().format('DD/MM/YYYY')
    },
    selectedUser(i, employee) {
      const user = this.employeeDetails.filter(x => x.id === employee.id)[0]
      console.log('ussss', user)
      this.user = user
    },
    // loremSelected() {
    //  if (this.loremData.findIndex(e=>e.isSelect==false)===-1) {
    //    this.allSelect=true
    //  }
    // },
    getEmployees(ids) {
      const query = `query($ids: [uuid!]) {
        users(where: {id: {_in: $ids}}) {
          id
          first_name
          role
          gender
          uid_number
          created_at
          designation {
            id
            designation_type
            department {
              id
              name
            }
          }
        }
      }`
      dispatchGraphql(query, { ids: ids }).then((response) => {
        this.group = response.users
        this.handleEmployees()
        this.selectedUser(0, this.group[0])
      })
    }
  },
   mounted() {
    /* this.setAsideMenuCollapse(true);
    setTimeout(() => {
      this.setAsideWidth("100px");
    }, 100); */
  },
  created() {
    console.log('id', this.$route.params.campusId)
    this.getPayslipItems()
    var data = localStorage.getItem('group')
    data = data.split(",")
    console.log('ids', data)
    this.getEmployees(data)
    localStorage.removeItem('group')
   // this.setAsideMenuCollapse(true);
   // this.setAsideWidth("280px");
  },
  destroyed() {
    this.setAsideMenuCollapse(false);
  },
};
</script>
<style>
/* .lorem-box .close-icon {
} */
.isSelected {
  background: #bc6c42 0% 0% no-repeat padding-box !important;
  box-shadow: 0px 1px 3px #11111112;
  border-radius: 4px;
  color: white !important;
}
</style>
