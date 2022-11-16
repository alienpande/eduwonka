<template>
  <div>
    <div style="padding: 20px; padding-right: 50px; overflow: auto; height: 80vh" class="sm-p-r-20">
      <el-row style="display: flex; padding: 15px" class="sm-d-c sm-items-center">
        <el-col :span="16" style="display: flex" class="sm-width-100 sm-items-center">
          <e-svg @click="$router.push($url.FI_PAYSLIP_EMPLOYEE_DETAILS)" icon="back"></e-svg>
          <div style="color: #11141a; font-weight: 500; font-size: 24px; opacity: 0.8; margin-top: 7px; margin-left: 20px;">
            Employee Payslip Details
          </div>
        </el-col>
        <el-col :span="3" :offset="4" class="sm-margin-l-0 sm-width-auto">
          <e-button label="Change Employee" :plain="true" css="sort-icon" class="sm-width-auto">
          </e-button>
        </el-col>
      </el-row>
      <div class="sub-headers" style="padding-left: 20px; color: #000000cc">
        Employee Details
      </div>
      <el-row style="background: white; padding: 20px" class="sm-flex sm-wrap sm-justify-center">
        <el-col :span="4" :offset="1" class="sm-width-50 sm-margin-l-0">
          <el-avatar :size="93" :src="require('@/assets/images/profile.jpg')" />
        </el-col>
        <el-col :span="13" :offset="1" class="sm-width-50 sm-margin-l-0">
          <div style="background: #fcdfbd33;padding:15px">
            <div class="f-600 fs-16" style="color: #000000cc;margin-bottom:5px">
              {{ employee.first_name }}
            </div>
            <div style="color: #00000099">{{ employee.email }}</div>
            <div style="color: #00000099">{{ employee.uid_number }}</div>
            <div style="color: #00000099">{{ employee.designation ? employee.designation.designation_type : '' }}</div>
          </div>
        </el-col>
        <el-col :span="3" :offset="1" class="sm-width-auto sm-margin-l-0 sm-margin-t-[-40px]">
            <br/>  <br/>  <br/>
            <e-button label="Create Payslip" icon="el-icon-plus" @click="handleSlip" />
        </el-col>
      </el-row>

      <div class="sub-headers" style="padding-left: 20px; margin-top:20px;color: #000000cc">
        All Payslips of Employee
      </div>
      <el-row :gutter="20" style="padding: 15px 0px 10px 0px; margin: 0px 0px 5px 0px; background: white; height: 80px;" class="finance-payslip">
        <el-col :span="5" style="padding-left: 5px" class="dropdown-tab">
          <!-- <e-dropdown :list="filter" primary /> -->
          <el-dropdown @command="handleMonth">
            <span class="el-dropdown-link primary-text text" primary>
              Month<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in months" :key="item" :command="item">{{ item }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col :span="5" style="padding-left: 25px" class="primary-text dropdown-tab">
          <!-- <e-dropdown :list="filter2" primary /> -->
          <el-dropdown @command="handleYear">
            <span class="el-dropdown-link primary-text text" primary>
              Year<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in years" :key="item" :command="item">{{ item }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>

        <el-col :span="4" class="primary-text dropdown-tab">
          <div @click="clearFilters()" class="text">Clear filter</div>
        </el-col>
        <el-col style="padding-left: 10px" :span="1" :offset="6">
          <e-button icon="el-icon-search" :plain="true" css="bg-tranparent"></e-button>
        </el-col>
      </el-row>
      <br />
      <e-table :table="employee.payslips">
        <el-table-column label="Payslip number" prop="payslip_number" width="250" />
        <el-table-column label="Month" prop="month" width="250" />
        <el-table-column label="Year" prop="year" width="200" />
        <el-table-column label="Net salary (INR)" prop="total_amount" width="250" />
        <el-table-column label="Action" width="200">
          <template slot-scope="scope">
            <img @click="handleEdit(scope.$index, scope.row)" src="@/assets/images/downAction.png" alt="" />
            <img @click="handleEdit(scope.$index, scope.row)" src="@/assets/images/eyeIcon.png" alt="" />
          </template>
        </el-table-column>
      </e-table>
      <es-pagination class="pagination" :total="total" @pagination="pagination" />
    </div>
  </div>
</template>
<script>
import { dispatchGraphql, dispatchGraphqlQuery } from "@/api/dispatcher"
import moment from 'moment'
import esPagination from '@/studentControl/esPagination'
export default {
  components: { esPagination },
  data: () => ({
    employee: {},
    campus: {},
    months: [],
    years: [],
    selectedMonth: '',
    selectedYear: '',
    limit: 10,
    offset: 0,
    total: 0,
    filter2: [{ text: "Year" }, { text: "Subject 1" }, { text: "Subject 2" }],
  }),
  created() {
    this.getYears()
    this.getCampus()
  },
  methods: {
    ptest(d) {
      console.log(d);
    },
    getCampus() {
      dispatchGraphqlQuery('campuses', ['id', 'name']).then((response) => {
        this.campus = response.campuses[0]
        console.log(this.campus)
      })
    },
    pagination: function(object) {
      this.limit = object.limit
      this.offset = object.limit * (object.page - 1)
      console.log("vxxxxxx", this.offset)
      this.getEmployee(this.limit, this.offset)
    },
    getVariables() {
      return {
        "month": `%${this.selectedMonth}%`,
        "year": `%${this.selectedYear}%`,
        "limit": this.limit,
        "offset": this.offset
      }
    },
    getEmployee() {
      const query = `query($month: String, $year: String, $limit: Int, $offset: Int) {
        users_by_pk(id: "${this.$route.params.id}") {
          id
          first_name
          last_name
          email
          uid_number
          designation {
            id
            designation_type
          }
          payslips(limit: $limit, offset: $offset, where: {_and: [{month: {_ilike: $month}}, {year: {_ilike: $year}}]}) {
            id
            payslip_number
            total_amount
            month
            year
          }
          payslips_aggregate(limit: $limit, offset: $offset, where: {_and: [{month: {_ilike: $month}}, {year: {_ilike: $year}}]})  {
            aggregate {
              count
            }
          }
        }
      }`
      dispatchGraphql(query, this.getVariables()).then((response) => {
        console.log(response)
        this.employee = response.users_by_pk
        this.total = response.users_by_pk.payslips_aggregate.aggregate.count
      })
    },
    handleSlip() {
      localStorage.setItem('group', this.$route.params.id)
      this.$router.push(this.$url.FI_PAYSLIP_CREATE + '/' + this.campus.id)
    },
    getYears() {
      const year = new Date().getFullYear()
      this.months = moment.months()
      this.years = Array.from({length: year - 2000}, (value, index) => 2001 + index)
      this.getEmployee()
    },
    handleMonth(value) {
      this.selectedMonth = value
      this.getEmployee()
    },
    handleYear(value) {
      this.selectedYear = value
      this.getEmployee()
    },
    clearFilters() {
      this.selectedMonth = ''
      this.selectedYear = ''
      this.getEmployee()
    }
  },
};
</script>
<style scoped>
@media only screen and (device-width: 768px) {
  .pagination {
    width: 50%;
    font-size: 12px;
  }
  .dropdown-tab {
    margin-right: 3px;
    font-size: 12px;
  }
  .dropdown-tab .text {
    font-size: 14px;
  }
}
</style>