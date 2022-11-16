<template>
  <e-container
    class="hq-employees"
    pageTitle="Employees"
    btnIcon="el-icon-plus"
    btnText="Add Employees"
    @btnClick="addNewEmployees"
  >
    <el-tabs class="floatTabHeader" v-model="activeName">
      <el-tab-pane label="Active" name="Active">

        <p class="heading">Below is the list of active employees for this academic year</p>
        <e-dashcard :obj="activeEmployeesReport">
          <template #header /> 
        </e-dashcard>
        <el-row class="searchCard">
          <el-col :span="5"  class="dropdown-tab" >
            <el-dropdown @command="handleDesignation">
              <span class="el-dropdown-link primary-text text" primary>
                Department<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="item in designations" :key="item.id" :command="item.id">{{ (item.department ? item.department.name : '') + ' - ' + item.designation_type }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="3" class="mg-l-10 mg-t-5 primary-text dropdown-tab" >
            <div @click="getDesignations()" class="text"> Clear filter </div>
          </el-col>
          <el-col :span="2"  class="dropdown-tab">
            <e-button
              icon="el-icon-search"
              :plain="true"
              type="primary"
            ></e-button>
          </el-col>          
        </el-row>
        <e-table :table="employees" @pageInfo="ptest">
          <el-table-column label="Date" prop="date" >
            <template slot-scope="scope">
              {{ getDate(scope.row.admission_date) }}
            </template>
          </el-table-column>
          <el-table-column label="Name" prop="first_name"  />
          <el-table-column label="Department - Designation" >
            <template slot-scope="scope">
              {{ (scope.row.designation.department ? scope.row.designation.department.name : '') + ' - ' + scope.row.designation.designation_type }}
            </template>
          </el-table-column>
          <el-table-column label="Action">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)">Edit</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row)">Delete</el-button>
            </template>
          </el-table-column>
        </e-table>
      </el-tab-pane>
      <el-tab-pane label="Inactive" name="Inactive">
        <p class="heading">Below is the list of employees who left this academic year</p>

        <e-dashcard :obj="inActiveEmployeesReport">
          <template #header />
        </e-dashcard>
        <el-row class="searchCard">
          <el-col :span="5"  class="dropdown-tab" >
            <el-dropdown @command="handleDesignation">
              <span class="el-dropdown-link primary-text text" primary>
                Department<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="item in designations" :key="item.id" :command="item.id">{{ (item.department ? item.department.name : '') + ' - ' + item.designation_type }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="3" class="mg-l-10 mg-t-5 primary-text dropdown-tab" >
            <div @click="getDesignations()" class="text"> Clear filter </div>
          </el-col>
          <el-col :span="2"  class="dropdown-tab">
            <e-button
              icon="el-icon-search"
              :plain="true"
              type="primary"
            ></e-button>
          </el-col>          
        </el-row>
        <e-table :table="employees">
          <el-table-column label="Date" prop="date" width="600">
            <template slot-scope="scope">
              {{ getDate(scope.row.date_of_exit) }}
            </template>
          </el-table-column>
          <el-table-column label="Name" prop="first_name" width="700" />
        </e-table>
      </el-tab-pane>
    </el-tabs>
    <pagination :total="total" @pagination="pagination" />
  </e-container>
</template>
<script>
import { dispatchGraphql, dispatchGraphqlDelete } from '@/api/dispatcher'
import Pagination from '@/components/Pagination'
import moment from 'moment'
import _ from 'lodash'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      designations: [],
      designationIds: [],
      employees: [],
      users: [],
      total: 0,
      offset: 0,
      page: 1,
      limit: 10,
      activeName: "Active",
      activeEmployeesReport: [
        {
          title: "Total Employees",
          value: "60",
          icon: "hq/employees",
        },
        {
          title: "Total Males",
          value: "30",
          icon: "hq/boy",
        },
        {
          title: "Total Females",
          value: "30",
          icon: "hq/girl",
        }
      ],
      inActiveEmployeesReport: [
        {
          title: "Total Employees",
          value: "3",
          icon: "hq/employees",
        },
        {
          title: "Total Male",
          value: "2",
          icon: "hq/boy",
        },
        {
          title: "Total Females",
          value: "1",
          icon: "hq/girl",
        }
      ],
    };
  },
  watch: {
    activeName: _.debounce(function() {
      if (this.activeName === "Inactive") {
        this.getEmployeeDetails()
      } else {
        this.getEmployeeDetails()
      }
    })
  },
  created() {
    this.getDesignations()
    // this.getEmployeeDetails()
  },
  methods: {
    addNewEmployees() {
      this.$router.push(this.$url.HQ_EMPLOYEE_FORM +'/new')
    },
    pagination: function(object) {
      this.limit = object.limit
      this.offset = object.limit * (object.page - 1)
      this.getEmployeeDetails()
    },
    handleDesignation(val) {
      this.designationIds = []
      this.designationIds[0] = val
      this.getEmployeeDetails()
    },
    getVariables() {
      return {
        "limit": this.limit,
        "offset": this.offset,
        "designationIds": this.designationIds,
        "status": this.activeName
      }
    },
    getDesignations() {
      const query = `query {
        designations {
          id
          designation_type
          department {
            id
            name
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.designations = response.designations
        this.designationIds = this.designations.map(x => x.id)
        this.getEmployeeDetails()
      })
    },
    getEmployeeDetails: function() {
      const employeeQuery = `query ($status: String, $designationIds: [uuid!]) {
        users(where: {_and: [{status: {_eq: $status}, role: {_in: ["employee","teacher"]}}, {designation_id: {_in: $designationIds}}]}) {
          id
          first_name
          gender
        }
      }`
      const query = `query($status: String, $limit: Int, $offset: Int, $designationIds: [uuid!]) {
        users(limit: $limit, offset: $offset, where: {_and: [{status: {_eq: $status}, role: {_in: ["employee","teacher"]}}, {designation_id: {_in: $designationIds}}]}) {
          id
          first_name
          gender
          created_at
          status
          admission_date
          designation {
            id
            designation_type
            department {
              id
              name
            }
          }
        }
        users_aggregate(where: {_and: [{status: {_eq: $status}, role: {_in: ["employee","teacher"]}}, {designation_id: {_in: $designationIds}}]}) {
          aggregate {
           count
          }
        }
      }`
      dispatchGraphql(query, this.getVariables()).then((response) => {
        this.employees = response.users
        this.total = response.users_aggregate.aggregate.count
      })
      dispatchGraphql(employeeQuery, { designationIds: this.designationIds, status: this.activeName }).then((response) => {
        this.users = response.users
        if (this.activeName === 'Active') {
          this.activeEmployeesReport[0].value = this.users.length
          const boys = this.users.filter(data => (data.gender === 'male' || data.gender === 'Male'))
          this.activeEmployeesReport[1].value = boys.length
          const girls = this.users.filter(data => (data.gender === 'female' || data.gender === 'Female'))
          this.activeEmployeesReport[2].value = girls.length
        } else {
          this.inActiveEmployeesReport[0].value = this.users.length
          const boys = this.users.filter(data => (data.gender === 'male' || data.gender === 'Male'))
          this.inActiveEmployeesReport[1].value = boys.length
          const girls = this.users.filter(data => (data.gender === 'female' || data.gender === 'Female'))
          this.inActiveEmployeesReport[2].value = girls.length
        }
      })
    },
    handleDelete(row) {
      dispatchGraphqlDelete('users', { id: row.id }).then((response) => {
        console.log('delete', response)
      })
      this.$router.push(this.$url.HQ_EMPLOYEES_FORM)
    },
    handleEdit(row) {
      this.$router.push(this.$url.HQ_EMPLOYEE_FORM + "/" + row.id)
    },
    ptest(d) {
      console.log(d);
    },
    getDate(date) {
      return moment(date || Date()).format('DD MMM yyyy')
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
  }
  .dropdown-tab .text {
    font-size: 12px;
  }
}
</style>