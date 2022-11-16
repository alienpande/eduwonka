<template>
  <e-container pageTitle="Need Approval" class="hq-needapproval">
    <el-tabs class="floatTabHeader" v-model="activeName">
      <el-tab-pane label="Employee Leaves" name="employee">
        <p class="heading" style="padding-left: 1.5rem !important;">List of Leaves for which your approval is required </p>
        <!-- filter / searchCard -->
        <!-- <el-row class="searchCard">   
          <el-dropdown @command="handleDesignation">
            <span class="el-dropdown-link primary-text text" primary>
              Designation<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in designations" :key="item" :command="item.id">{{ item.designation_type }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>   
          <el-col :span="6" class="dropdown-tab primary-text">DateRange
            <e-dropdown :list="filterDate" primary />
          </el-col>
          <el-col :span="6" class="dropdown-tab">
            <el-dropdown @command="handleStatus">
              <span class="el-dropdown-link primary-text" primary>
                Status<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="Active">Active</el-dropdown-item>
                <el-dropdown-item command="Inactive">Inactive</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="5" class="primary-text dropdown-tab">Clear filter</el-col>
          <el-col :span="2"  class="dropdown-tab">
            <e-button
              icon="el-icon-search"
              :plain="true"
              type="primary"
            ></e-button>
          </el-col>
        </el-row> -->
        <e-table :table="tableData" @pageInfo="ptest">
          <el-table-column label="Name" width="230px">
            <template slot-scope="scope">
              <e-img-name :src="require('@/assets/images/profile.jpg')" :name="scope.row.leave.user ? scope.row.leave.user.first_name : ''" />
            </template>
          </el-table-column>
          <el-table-column label="Department" >
            <template slot-scope="scope">
              {{ scope.row.leave.user ? (scope.row.leave.user.designation ? scope.row.leave.user.designation.department.name : '') : '' }}
            </template>
          </el-table-column>
          <el-table-column label="Designation" >
            <template slot-scope="scope">
              {{ scope.row.leave.user ? (scope.row.leave.user.designation ? scope.row.leave.user.designation.designation_type : '') : '' }}
            </template>
          </el-table-column>
          <el-table-column label="Date Range" prop="dateRange" width="230px"> 
            <template slot-scope="scope">
              <span>{{ getDate(scope.row.leave.from_date) }} - {{ getDate(scope.row.leave.to_date) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Status"   prop="status" >
            <template slot-scope="scope">
            <span v-if="scope.row.status == 'pending'" style="color: #ffa700">Pending</span>
              <span v-if="scope.row.status == 'approved'" style="color: #0bc32e">approved</span>
              <span v-if="scope.row.status == 'rejected'" style="color: #e60000">Rejected</span>
            </template>
          </el-table-column>
          <el-table-column label="Actions" >
            <template slot-scope="scope">
              <e-button :span="12" size="mini" plain icon="el-icon-view" @click="$router.push($url.HQ_LEAVE_MANAGEMENT_RECORD_VIEW + '/' + scope.row.approval_recommendable_id)" />
            </template>
          </el-table-column>
        </e-table>
      </el-tab-pane>
      <el-tab-pane label="Student Leaves" name="student">
        <p class="heading" style="padding-left: 1.5rem !important;">List of Leaves for which your approval is required </p>
        <!-- filter / searchCard -->
        <!-- <el-row class="searchCard">   
          <el-dropdown @command="handleDesignation">
            <span class="el-dropdown-link primary-text text" primary>
              Designation<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in designations" :key="item" :command="item.id">{{ item.designation_type }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>   
          <el-col :span="6" class="dropdown-tab primary-text">DateRange
            <e-dropdown :list="filterDate" primary />
          </el-col>
          <el-col :span="6" class="dropdown-tab">
            <el-dropdown @command="handleStatus">
              <span class="el-dropdown-link primary-text" primary>
                Status<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="Active">Active</el-dropdown-item>
                <el-dropdown-item command="Inactive">Inactive</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="5" class="primary-text dropdown-tab">Clear filter</el-col>
          <el-col :span="2"  class="dropdown-tab">
            <e-button
              icon="el-icon-search"
              :plain="true"
              type="primary"
            ></e-button>
          </el-col>
        </el-row> -->
        <e-table :table="tableData" @pageInfo="ptest">
          <el-table-column label="Name" width="230px">
            <template slot-scope="scope">
              <e-img-name :src="require('@/assets/images/profile.jpg')" :name="scope.row.leave.user.first_name" />
            </template>
          </el-table-column>
          <el-table-column label="Standard" >
            <template slot-scope="scope">
              {{ scope.row.leave.user ? (scope.row.leave.user.section ? scope.row.leave.user.section.standard.name : '') : '' }}
            </template>
          </el-table-column>
          <el-table-column label="Section" >
            <template slot-scope="scope">
              {{ scope.row.leave.user ? (scope.row.leave.user.section ? scope.row.leave.user.section.name : '') : '' }}
            </template>
          </el-table-column>
          <el-table-column label="Date Range" prop="dateRange" width="230px"> 
            <template slot-scope="scope">
              <span>{{ getDate(scope.row.leave.from_date) }} - {{ getDate(scope.row.leave.to_date) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Status"   prop="status" >
            <template slot-scope="scope">
            <span v-if="scope.row.status == 'pending'" style="color: #ffa700">Pending</span>
              <span v-if="scope.row.status == 'approved'" style="color: #0bc32e">approved</span>
              <span v-if="scope.row.status == 'rejected'" style="color: #e60000">Rejected</span>
            </template>
          </el-table-column>
          <el-table-column label="Actions" >
            <template slot-scope="scope">
              <e-button :span="12" size="mini" plain icon="el-icon-view" @click="$router.push($url.HQ_LEAVE_MANAGEMENT_RECORD_VIEW + '/' + scope.row.approval_recommendable_id)" />
            </template>
          </el-table-column>
        </e-table>
      </el-tab-pane>
    </el-tabs>
    <pagination :total="total" @pagination="pagination" />
  </e-container>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher";
import moment from 'moment'
import Pagination from '@/components/Pagination'
import { getId } from '@/util/auth'
import _ from "lodash"
export default {
  components: {
    Pagination
  },
  data() {
    return {
      activeName: "employee",
      type: ["Employee", "Teacher"],
      ptest: "",
      leave: {},
      leaves: [],
      leavable_id: {},
      filter: [
        { text: "Class Section", disabled: true },
        { text: "My Profile" },
        { text: "Logout", divided: true },
      ],
      tableData: [],
      total: 0,
      offset: 0,
      page: 1,
      limit: 10,
    };
  },
  watch: {
    activeName: _.debounce(function() {
      if (this.activeName === "employee") {
        this.type = []
        this.type = ["Employee", "Teacher"]
        this.getLeaves()
      } else {
        this.type = []
        this.type = ["Student"]
        this.getLeaves()
      }
    })
  },
  created() {
    this.getLeaves()
  },
  methods: {
    getDate(date) {
      return moment(date).format('DD MMM yyyy')
    },
    pagination: function(object) {
      this.limit = object.limit
      this.offset = object.limit * (object.page - 1)
      this.getLeaves()
    },
    getVariables() {
      return {
        "limit": this.limit,
        "offset": this.offset,
        "id": getId(),
        "type": this.type
      }
    },
    getLeaves() {
      const query=`query($limit: Int, $offset: Int, $id: uuid, $type: [String!]) {
        approval_recommendations(limit: $limit, offset: $offset, where: {_and: [{user_id: {_eq: $id}}, {status: {_eq: "pending"}}, {approval_recommendable_type: {_eq: "Leave"}}, {leave: {leavable_type: {_in: $type}}}]}) {
          approval_recommendable_id
          status
          leave {
            from_date
            to_date
            user {
              first_name
              designation {
                designation_type
                department {
                  name
                }
              }
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
        }
        approval_recommendations_aggregate(where: {_and: [{user_id: {_eq: $id}}, {status: {_eq: "pending"}}, {approval_recommendable_type: {_eq: "Leave"}}, {leave: {leavable_type: {_in: $type}}}]}) {
          aggregate {
           count
          }
        }
      }`
      dispatchGraphql(query, this.getVariables()).then((response) => {
        this.tableData = response.approval_recommendations
        console.log('leaves', response)
        // this.total = this.tableData.length
         this.total = response.approval_recommendations_aggregate.aggregate.count
        console.log("count", this.total);
      })
    },
    handleEdit() {
      this.$router.push(this.$url.HQ_LEAVE_MANAGEMENT_RECORD_VIEW);
    },
  },
};
</script>
<style scoped>
.danger {
  color: red;
}
</style>