<template>
  <div>
    <div style="padding: 20px; padding-right: 50px; overflow: auto; height: 80vh" class="sm-p-r-20">
      <el-row style="display: flex; padding: 15px" class="sm-d-c sm-items-center">
        <el-col :span="16" style="display: flex" class="sm-width-100">
          <e-svg @click="$router.push($url.FI_PAYSLIP)" icon="back"></e-svg>
          <div style="color: #11141a; font-weight: 500; font-size: 24px; opacity: 0.8; margin-top: 7px; margin-left: 20px;">
            Employee List
          </div>
        </el-col>
        <el-col :span="3" :offset="4" class="sm-width-auto sm-margin-l-0">
          <e-button @click="handleGroup" label="Create group slips" icon="el-icon-plus"> </e-button>
        </el-col>
      </el-row>
      <div class="sub-headers" style="padding-left: 20px">
        List of employees for whom you want to create/view payslips
      </div>
      <el-row style="padding: 15px 0px 10px 0px; margin: 0px 0px 5px 0px; background: white; height: 80px;" class="finance-payslip">
        <el-col :span="5" style="padding-left: 5px" class="dropdown-tab">
          <!-- <e-dropdown :list="designations" primary /> -->
          <el-dropdown @command="handleDesignation">
            <span class="el-dropdown-link primary-text text" primary>
              Designation<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in designations" :key="item.id" :command="item.id">{{ item.designation_type }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col :span="6" style="padding-left: 25px" class="primary-text dropdown-tab">
          <!-- <e-dropdown :list="filter2" primary/> -->
          <el-dropdown @command="handleDepartment">
            <span class="el-dropdown-link primary-text text" primary>
              Department<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in departments" :key="item.id" :command="item.id">{{ item.name }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>

        <el-col :span="4" class="primary-text dropdown-tab">
          <div @click="getDepartments()" class="text"> Clear filter </div>
        </el-col>
        <el-col style="padding-left: 10px" :span="1" :offset="7">
          <e-button icon="el-icon-search" :plain="true" css="bg-tranparent" />
        </el-col>
      </el-row>
      <br />
      <e-button :offset="22" label="Edit list" :plain="true" css="bg-tranparent" @click="editTable = !editTable" class="sm-margin-l-0" />
      <br /><br /><br />
      <e-table :table="employees">
        <el-table-column v-if="editTable" width="45">
          <template slot-scope="scope">
            <el-checkbox @change="handleSelectionChange(scope.row.id)" />
          </template>
        </el-table-column>
        <el-table-column label="Name" prop="name" width="350">
          <template slot-scope="scope">
            <e-img-name :src="require('@/assets/images/profile.jpg')" :name="scope.row.first_name" />
          </template>
        </el-table-column>
        <el-table-column label="Designation" prop="Designation" width="300">
          <template slot-scope="scope">
            {{ scope.row.designation ? scope.row.designation.designation_type : '' }}
          </template>
        </el-table-column>
        <el-table-column label="Department" prop="Department" width="300">
          <template slot-scope="scope">
            {{ scope.row.designation ? scope.row.designation.department.name : '' }}
          </template>
        </el-table-column>
        <el-table-column label="Joining Date" prop="joinDate" width="300">
          <template slot-scope="scope">
            {{ getDate(scope.row.created_at) }}
          </template>
        </el-table-column>

        <el-table-column label="Action" width="200">
          <template slot-scope="scope">
            <!-- <img
              @click="handleEdit(scope.$index, scope.row)"
              src="@/assets/images/download-action-icon.png"
              alt=""
            /> -->
            <img @click="$router.push($url.FI_PAYSLIP_DETAILS + '/'+ scope.row.id), handleEdit(scope.$index, scope.row)" src="@/assets/images/3dot-action.png" alt="" style="cursor: pointer" />
          </template>
        </el-table-column>
      </e-table>
    <es-pagination :total="total" @pagination="pagination"></es-pagination>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import { dispatchGraphql, dispatchGraphqlQuery } from "@/api/dispatcher"
import esPagination from '@/studentControl/esPagination'
import moment from 'moment'
export default {
  components: {
    esPagination
  },
  data: () => ({
    customHtml: `<div class="color-red">How it work?</div>`,
    designations: [],
    departments: [],
    selectedDesignation: [],
    selectedDepartment: [],
    selectedEmployees: [],
    campus: {},
    employees: [],
    editTable: false,
    limit: 10,
    offset: 0,
    total: 0, 
  }),
  mounted() {
    this.hideAsideMenuMobile()
  },
  created() {
    this.getDepartments()
    this.getCampus()
  },
  methods: {
    ...mapMutations("Common",["hideAsideMenuMobile"]),
    pagination: function(object) {
      console.log('wwwwwwwwww', object);
      this.limit = object.limit
      this.offset = object.limit * (object.page - 1)
      console.log("rrrrrrrrr", this.offset)
      this.getEmployees(this.limit, this.offset)
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
          this.getEmployees()
        })
      })
    },
    getCampus() {
      dispatchGraphqlQuery('campuses', ['id', 'name']).then((response) => {
        this.campus = response.campuses[0]
        console.log(this.campus)
      })
    },
    getDate(date) {
      return moment(date).format('DD-MM-YYYY')
    },
    getVariables() {
      return {
        "desgIds": this.selectedDesignation,
        "deptIds": this.selectedDepartment,
        "limit": this.limit,
        "offset": this.offset
      }
    },
    getEmployees() {
      const query = `query($desgIds: [uuid!], $deptIds: [uuid!],$limit: Int, $offset: Int) {
        users(limit: $limit, offset: $offset, where: { _and: [{role: {_nin: ["student", "parent"]}}, {designation_id: {_in: $desgIds}}, {designation: {department_id: {_in: $deptIds}}}]}) {
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
        users_aggregate(limit: $limit, offset: $offset, where: { _and: [{role: {_nin: ["student", "parent"]}}, {designation_id: {_in: $desgIds}}, {designation: {department_id: {_in: $deptIds}}}]}) {
          aggregate {
            count
          } 
        }
      }`
      dispatchGraphql(query, this.getVariables()).then((response) => {
        console.log(response)
        this.employees = response.users
        // this.total = this.employees.length
        // console.log("hhhhhhhhh", this.total)
        this.total = response.users_aggregate.aggregate.count
      })
    },
    handleSelectionChange(val) {
      let user = this.selectedEmployees.filter(x => x === val)[0]
      let index = this.selectedEmployees.indexOf(user)
      if (user) {
        this.selectedEmployees.splice(index, 1)
      } else {
        this.selectedEmployees.push(val)
      }
      console.log('selected', this.selectedEmployees)
    },
    handleGroup() {
      localStorage.setItem('group', this.selectedEmployees.map(x => x))
      this.$router.push(this.$url.FI_PAYSLIP_CREATE + '/' + this.campus.id)
    },
    handleDesignation(value) {
      this.selectedDesignation = []
      this.selectedDesignation[0] = value
      this.getEmployees()
    },
    handleDepartment(value) {
      this.selectedDepartment = []
      this.selectedDepartment[0] = value
      this.getEmployees()
    }
  }
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