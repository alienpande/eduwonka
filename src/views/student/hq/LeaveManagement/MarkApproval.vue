<template>
  <es-container pageTitle="Leave management" btnPlain2="true" btnText2="Apply Leaves" class="bg-black-5" @btnClick="addNewLeave" >
    <el-tabs class="floatTabHeader studentTab" v-model="activeName">
      <el-tab-pane label="Current leaves" name="tab1">
        <el-card class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
          <el-row>
            <el-col :span="4" class="mg-l-10 d-flex">
              <e-svg :style="'padding-top: 10px; padding-right: 15px'" icon="leave1"></e-svg>
              <div>
                <div class="text-gray-6">Total Leave Balance</div>
                <div class="sub-title mg-t-4">{{ user.available_leaves }}</div>
              </div>
            </el-col>
            <el-col :span="4" class="d-flex">
              <e-svg :style="'padding-top: 10px; padding-right: 15px'" icon="leave2"></e-svg>
              <div>
                <div class="text-gray-6">Total Taken</div>
                <div class="sub-title mg-t-4">{{ getTakenLeaves(user.leaves) }}</div>
              </div>
            </el-col>
            <el-col :span="4" class="d-flex">
              <e-svg :style="'padding-top: 10px; padding-right: 15px'" icon="leave3"></e-svg>
              <div>
                <div class="text-gray-6">Total Remaining</div>
                <div class="sub-title mg-t-4">{{ user.available_leaves - getTakenLeaves(user.leaves) }}</div>
              </div>
            </el-col>
            <el-col :span="5" :offset="1">
              <es-button icon="downloadYellow" text="Download PDF" />
            </el-col>
            <el-col :span="5" class="mg-l-10">
              <es-button icon="downloadYellow" text="Download XLS" />
            </el-col>
          </el-row>
        </el-card><br />
        <el-table :data="user.leaves" custom-class="text-white">
          <el-table-column label="From Date">
            <template slot-scope="scope">
              {{ getDate(scope.row.from_date) }}
            </template>
          </el-table-column>
          <el-table-column label="To Date">
            <template slot-scope="scope">
              {{ getDate(scope.row.to_date) }}
            </template>
          </el-table-column>
          <el-table-column label="Reason" prop="reasong" />
          <el-table-column label="Type" prop="leavable_type" />
          <el-table-column label="Status">
            <template slot-scope="scope">
              <div class="pd-5 wd-50p d-flex justify-content-center" :class="getClass(getStatus(scope.row.approvers))">
                <span class="tx-16" :class="getStatusClass(getStatus(scope.row.approvers))">{{ getStatus(scope.row.approvers) }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Action">
            <template slot-scope="scope">
              <img @click="handleEdit(scope.$index, scope.row)" src="@/assets/images/download-action-icon.png" alt="" />
              <img @click="$router.push($url.HQ_LEAVE_MANAGEMENT_RECORD_VIEW + '/' + scope.row.id)"  src="@/assets/images/3dot-action.png" alt="" class="pointer" />
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="Past Leaves" name="tab2"></el-tab-pane>
    </el-tabs>
  </es-container>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher"
import { getId } from '@/util/auth'
import moment from 'moment'
export default {
  data() {
    return {
      activeName: "tab1",
      user: {}
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    getTakenLeaves(leaves) {
      let count = 0
      if(leaves.length > 0) {
        for (const leave of leaves) {
          if (this.getStatus(leave.approvers) === 'Approved') {
            count ++
          }
        }
      }
      console.log(count)
      return count
    },
    getClass(val) {
      if (val === 'Pending') {
        return 'bg-yellow'
      } else if (val === 'Rejected') {
        return 'bg-red'
      } else if (val === 'Approved') {
        return 'bg-green'
      }
    },
    getStatusClass(val) {
      if (val === 'Pending') {
        return 'text-yellow'
      } else if (val === 'Rejected') {
        return 'text-red'
      } else if (val === 'Approved') {
        return 'text-green'
      }
    },
    getStatus(approvers) {
      let status = ''
      if (approvers.length > 0) {
        approvers.forEach(x => {
          if (x.status == "approved") {
            status = 'Approved'
          } else if (x.status == "rejected") {
            status = 'Rejected'
          } else if (x.status === 'pending') {
            status = 'Pending'
          }
        })
      }
      return status
    },
    getDate(date) {
      return moment(date).format('DD MMM yyyy')
    },
    addNewLeave() {
      this.$router.push(this.$url.HQ_LEAVE_MANAGEMENT_NEED_APPROVAL)
    },
    getUser() {
      const query = `query {
        users_by_pk(id: "${getId()}") {
          id
          first_name
          available_leaves
          leaves {
            id
            from_date
            to_date
            reasong
            leavable_type
            approvers {
              id
              status
            }
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.user = response.users_by_pk
        console.log(this.user)
      })
    }
  },
}
</script>
