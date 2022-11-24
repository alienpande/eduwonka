<template>
  <div>
    <e-container class="finance-payslip-container" pageTitle="Payslips">
      <div class="sub-headers">View or create payslips</div>
      <el-row :gutter="20" class="finance-payslip" style="padding: 15px 0px 10px 0px; margin: 0px 0px 5px 0px; background: white; height: 80px;display:flex;align-items:center;">
        <el-col :span="window.width > 767 ? 5 : 7" :style="{padding: window.width < 767 && '0px !important'}" class="dropdown-bar">
          <!-- <e-dropdown :list="filter" primary /> -->
          <el-dropdown @command="handleDesignation">
            <span class="el-dropdown-link primary-text text" primary>
              Designation<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in designations" :key="item.id" :command="item.id">{{ item.designation_type }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col :span="window.width > 767 ? 6 : 7" :offset="window.width > 767 ? 0 : 1"  :style="{padding: window.width < 767 && '0px !important'}" class="primary-text dropdown-bar">
          <!-- <e-dropdown :list="filter2" primary /> -->
          <el-dropdown @command="handleDepartment">
            <span class="el-dropdown-link primary-text text" primary>
              Department<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in departments" :key="item.id" :command="item.id">{{ item.name }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col :span="window.width > 767 ? 5 : 3" :offset="window.width > 767 ? 2 : 0" :style="{padding: window.width < 767 && '0px !important'}" class="primary-text dropdown-bar">
          <div @click="getDepartments()"> Clear filter </div>
        </el-col>
        <el-col style="margin-top: -10px;padding-left: 10px" :span="1" :offset="window.width > 767 ? 6 : 0">
          <e-button icon="el-icon-search" :plain="true" css="bg-tranparent" ></e-button>
        </el-col>
      </el-row>
      <br/>
      <div style="color: #000000cc;padding-bottom:10px" class="fs-20 f-500">
        Choose Employess to view or create payslips
      </div>
      <employe-drop class="payslip-employees" :employees="employees" />
      <div style="color: #000000cc;padding-bottom:10px;padding-top:20px" class="fs-20 f-500">
        Your Payslips
      </div>

      <e-table :table="payslips">
        <el-table-column label="Payslip number" prop="payslip_number" />
        <el-table-column label="Employee" prop="Employee">
          <template slot-scope="scope">
            {{ scope.row.employee.first_name }}
          </template>
        </el-table-column>
        <el-table-column label="Date of Creation" prop="Date">
          <template slot-scope="scope">
            {{ getDate(scope.row.due_date) }}
          </template>
        </el-table-column>
        <el-table-column label="For Month" prop="month" />

        <el-table-column label="Action">
          <template slot-scope="scope">
            <!-- <img
              @click="handleEdit(scope.$index, scope.row)"
              src="@/assets/images/download-action-icon.png"
              alt=""
            /> -->
            <img
              @click="$router.push($url.FI_PAYSLIP_DETAILS + '/'+ scope.row.employee.id), handleEdit(scope.$index, scope.row)" src="@/assets/images/penaction.png" alt="" style="cursor: pointer" />
          </template>
        </el-table-column>
      </e-table>
       <es-pagination :total="total" @pagination="pagination"></es-pagination>
    </e-container>
  </div>
</template>
<script>
import employeDrop from '@/components/finance/employeDrop.vue'
import { dispatchGraphql, dispatchGraphqlQuery } from "@/api/dispatcher"
import moment from 'moment'
import esPagination from '@/studentControl/esPagination'
import screenSize from '@/mixins/screenSize'
export default {
  components:{employeDrop, esPagination},
  mixins: [screenSize],
  data: () => ({
    employees: [],
    designations: [],
    departments: [],
    selectedDesignation: [],
    selectedDepartment: [],
    filter: [
      { text: "Designation" },
      { text: "Standard 2" },
      { text: "Standard 3" },
    ],
    filter2: [
      { text: "Departments" },
      { text: "Subject 1" },
      { text: "Subject 2" },
    ],
    payslips: [],
    limit: 10,
    offset: 0,
    total: 0
  }),
  created() {
    this.getEmployees()
    this.getDepartments()
  },
  methods: {
    getEmployees() {
      const query = `query {
        users(where: {role: {_nin: ["student", "parent"]}}) {
          id
          first_name
          role
        }
      }`
      dispatchGraphql(query).then((response) => {
        console.log(response)
        this.employees = response.users
      })
    },
    getDepartments() {
      dispatchGraphqlQuery('designations', ['id', 'designation_type']).then((response) => {
        console.log(response)
        this.designations = response.designations
        this.selectedDesignation = this.designations.map(x => x.id)
        dispatchGraphqlQuery('departments', ['id', 'name']).then((response) => {
          console.log(response)
          this.departments = response.departments
          this.selectedDepartment = this.departments.map(x => x.id)
          this.getPaySlips()
        })
      })
    },
    pagination: function(object) {
      this.limit = object.limit
      this.offset = object.limit * (object.page - 1)
      console.log("vxxxxxx", this.offset)
      this.getPaySlips(this.limit, this.offset)
    },
    getVariables() {
      return {
        "desgIds": this.selectedDesignation,
        "deptIds": this.selectedDepartment,
        "limit": this.limit,
        "offset": this.offset
      }
    },
    getPaySlips() {
      const query = `query($desgIds: [uuid!], $deptIds: [uuid!], $limit: Int, $offset: Int) {
        payslips(limit: $limit, offset: $offset, where: {employee: {_and: [{designation_id: {_in: $desgIds}}, {designation: {department_id: {_in: $deptIds}}}]}}) {
          id
          payslip_number
          total_amount
          month
          year
          due_date
          employee {
            id
            first_name
            designation {
              id
              designation_type
              department {
                id
                name
              }
            }
          }
        }
        payslips_aggregate(limit: $limit, offset: $offset, where: {employee: {_and: [{designation_id: {_in: $desgIds}}, {designation: {department_id: {_in: $deptIds}}}]}})  {
          aggregate {
           count
          }
        }
      }`
      dispatchGraphql(query, this.getVariables()).then((response) => {
        this.payslips = response.payslips
        console.log("dispatcgh",response)
        this.total = response.payslips_aggregate.aggregate.count
      })
    },
    getDate(date) {
      return moment(date).format('DD-MM-YYYY')
    },
    handleDesignation(value) {
      this.selectedDesignation = []
      this.selectedDesignation[0] = value
      this.getPaySlips()
    },
    handleDepartment(value) {
      this.selectedDepartment = []
      this.selectedDepartment[0] = value
      this.getPaySlips()
    }
  }
};
</script>
