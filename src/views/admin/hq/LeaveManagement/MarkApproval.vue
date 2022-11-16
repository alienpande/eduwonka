<template>
  <e-container pageTitle="Mark Approvers">
    <el-tabs class="floatTabHeader" v-model="activeName">
      <el-tab-pane label="New Leaves" name="new">
        <p class="heading" style="padding-left:1.5em">
          List of leaves for which you have to assign approvers
        </p>
        <e-table :table="assignLeaves" @pageInfo="ptest">
          <el-table-column label="Name" width="280">
            <template slot-scope="scope">
              <e-img-name :src="require('@/assets/images/profile.jpg')" :name="scope.row.user ? scope.row.user.first_name : scope.row.user.first_name" />
            </template>
          </el-table-column>
          <el-table-column label="Department/Standard" width="300">
            <template slot-scope="scope">
              {{ scope.row.user.designation ? (scope.row.user.designation.department ? scope.row.user.designation.department.name : '') : (scope.row.user.section.standard ? scope.row.user.section.standard.name : '') }}
            </template>
          </el-table-column>
          <el-table-column label="Designation/Section" width="300">
            <template slot-scope="scope">
              {{ scope.row.user.designation ? scope.row.user.designation.designation_type : scope.row.user.section.name }}
            </template>
          </el-table-column> 
          <el-table-column label="Date Range" prop="dateRange" width="300"> 
            <template slot-scope="scope">
              <span>{{ getDate(scope.row.from_date) }} - {{ getDate(scope.row.to_date) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Status" prop="status" width="180" />
          <el-table-column label="Action" width="150">
            <template slot-scope="scope">
              <img
                @click="handleEdit(scope.row)"
                src="@/assets/images/downAction.png"
                alt=""
              />
              <img
                @click="handleEdit(scope.row)"
                src="@/assets/images/3dot-action.png"
                style="height:41px"
                alt=""
              />
            </template>
          </el-table-column>
        </e-table>
        <es-pagination :total="assignLeaves.length" @pagination="pagination"></es-pagination>
      </el-tab-pane>
      <el-tab-pane label="Inprocess Leaves" name="process">
        <e-table :table="processLeaves" @pageInfo="ptest">
          <el-table-column label="Name" width="300">
            <template slot-scope="scope">
              <e-img-name :src="require('@/assets/images/profile.jpg')" :name="scope.row.user ? scope.row.user.first_name : scope.row.user.first_name" />
            </template>
          </el-table-column>
          <el-table-column label="Department/Standard" prop="department" width="300">
            <template slot-scope="scope">
              {{ scope.row.user.designation ? (scope.row.user.designation.department ? scope.row.user.designation.department.name : '') : scope.row.user.section.standard.name }}
            </template>
          </el-table-column>
          <el-table-column label="Designation/Section" prop="designation" width="300">
            <template slot-scope="scope">
              {{ scope.row.user.designation ? scope.row.user.designation.designation_type : scope.row.user.section.name }}
            </template>
          </el-table-column>
           <el-table-column label="Date Range" prop="dateRange" width="300"> 
            <template slot-scope="scope">
              <span>{{ getDate(scope.row.from_date) }} - {{ getDate(scope.row.to_date) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Status" width="180"  prop="status">
            <template slot-scope="scope">
              <span v-if="getStatus(scope.row.approvers) == 'pending'" style="color: #ffa700">Pending</span>
              <span v-if="getStatus(scope.row.approvers) == 'approved'" style="color: #0bc32e">Approved</span>
              <span v-if="getStatus(scope.row.approvers) == 'rejected'" style="color: #e60000">Rejected</span>
            </template>
          </el-table-column>
           <el-table-column label="Action" width="150">
            <template slot-scope="scope">
              <img
                @click="handleEdit(scope.row)"
                src="@/assets/images/downAction.png"
                alt=""
              />
              <img
                @click="$router.push($url.HQ_LEAVE_MANAGEMENT_MARK_APPROVAL_INPROCESS_DETAIL + '/' + scope.row.id)"
                src="@/assets/images/3dot-action.png"
                style="height:41px"
                alt=""
              />
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
import Pagination from '@/components/Pagination'
import moment from 'moment'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      ptest: "",
      activeName: "new",
      assignLeaves: [],
      processLeaves: [],
      total: 0,
      offset: 0,
      page: 1,
      limit: 10,
    };
  },
  created() {
    this.getLeaves()
  },
  methods: {
    getStatus(approvers) {
      let status = ''
      if (approvers.length > 0) {
        approvers.forEach(x => {
          if (x.status == "approved") {
            status = 'approved'
          } else if (x.status == "rejected") {
            status = 'rejected'
          } else if (x.status === 'pending') {
            status = 'pending'
          }
        })
      }
      return status
    },
    getDate(date) {
      return moment(date).format('DD MMM yyyy')
    },
    pagination: function(object) {
      this.limit = object.limit
      this.offset = object.limit * (object.page - 1)
      this.getLeaves()
    },
    getVariables() {
      return{
        "limit": this.limit,
        "offset": this.offset
      }
    },
    getLeaves() {
      const query=`query MyQuery($limit: Int, $offset: Int) {
        leaves(limit: $limit, offset: $offset) {
          id
          leavable_id
          to_date
          from_date
          leavable_type
          reasong
          user {
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
            section {
              id
              name
              standard {
                id
                name
              }
            }
          }
          approvers {
            id
            status
          }
        }
      }`
      dispatchGraphql(query, this.getVariables()).then((response) => {
        this.assignLeaves = response.leaves.filter(x => x.approvers.length === 0)
        this.processLeaves = response.leaves.filter(x => x.approvers.length > 0)
        console.log('leave', response)
      })
    },
    handleEdit(row) {
      this.$router.push(this.$url.HQ_LEAVE_MANAGEMENT_MARK_APPROVAL_NEW_LEAVE_DETAIL + "/" + row.id)
    }
  }
}
</script>