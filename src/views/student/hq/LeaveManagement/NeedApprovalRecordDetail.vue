<template>
  <es-container hideHeader pageTitle="Leave Approval Status" :back="$url.HQ_LEAVE_MANAGEMENT_MARK_APPROVAL" class="bg-black-5">
    <el-dialog title="All Approvers" :visible.sync="dialog" width="60%" custom-class="custom-dialog">
      <el-table :data="leave.approvers" custom-class="text-white">
        <el-table-column label="User">
          <template slot-scope="scope">
            {{ scope.row.user.first_name }}
          </template>
        </el-table-column>
        <el-table-column label="Designation">
          <template slot-scope="scope">
            {{ scope.row.user.designation.designation_type }}
          </template>
        </el-table-column>
        <el-table-column label="Department">
          <template slot-scope="scope">
            {{ scope.row.user.designation.department.name }}
          </template>
        </el-table-column>
        <el-table-column label="Status">
          <template slot-scope="scope">
            <div class="pd-5 wd-50p d-flex justify-content-center" :class="getClass(getStatus(scope.row.status))">
              <span class="tx-16" :class="getStatusClass(getStatus(scope.row.status))">{{ getStatus(scope.row.status) }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-card class="rounded-08 bg-black-2" style="border: none; margin: 30px" shadow="none">
      <el-row>
        <el-col :span="20">
          <span class="tx-20 tx-bolder text-white">Leave Details</span>
        </el-col>
      </el-row><br />
      <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
        <el-row>
          <el-card class="rounded-09 bg-black-3" :style="'border: none'" shadow="none">
            <el-col :span="4" class="mg-b-20 d-flex">
              <div>
                <div class="text-gray-6">Name</div>
                <div class="sub-title mg-t-4">{{ user.first_name }}</div>
              </div>
            </el-col>
            <el-col :span="4" class="mg-l-30 d-flex">
              <div>
                <div class="text-gray-6">From Date</div>
                <div class="sub-title mg-t-4">{{ getDate(leave.from_date) }}</div>
              </div>
            </el-col>
            <el-col :span="4" class="mg-l-30 d-flex">
              <div>
                <div class="text-gray-6">To Date</div>
                <div class="sub-title mg-t-4">{{ getDate(leave.to_date) }}</div>
              </div>
            </el-col>
            <el-col :span="4" class="mg-l-30 d-flex">
              <div>
                <div class="text-gray-6">Standard</div>
                <div class="sub-title mg-t-4">{{ user.section ? user.section.standard.name : '' }}</div>
              </div>
            </el-col>
            <el-col :span="4" class="mg-l-30 d-flex">
              <div>
                <div class="text-gray-6">Section</div>
                <div class="sub-title mg-t-4">{{ user.section ? user.section.name : '' }}</div>
              </div>
            </el-col>
          </el-card>
        </el-row>
        <el-row class="mg-t-25">
          <span class="tx-18 tx-bolder text-white mg-b-10">Purpose</span>
          <el-card class="mg-t-8 rounded-09 bg-black-3" :style="'border: none'" shadow="none">
            <div>
              <div class="sub-title">
                {{ leave.reasong }}
              </div>
            </div>
          </el-card>
        </el-row>
      </el-card>
    </el-card>
    <el-row style="margin: 30px">
      <el-col :span="12">
        <el-card class="rounded-09 bg-black-2" :style="'border: none'" shadow="none">
          <el-row>
            <el-col :span="18">
              <span class="tx-20 tx-bolder text-white">Approval Status</span>
            </el-col>
            <el-col :span="6">
              <es-button text="View all approvers" @click="dialog = true" />
            </el-col>
          </el-row><br />
          <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
            <el-row>
              <el-col :span="20" style="margin: 20px">
                <div>
                  <span class="tx-16 text-white">Net Approval Status marked by Approvers</span>
                </div>
                <div :class="getClass(getApprovalStatus(leave.approvers))" class="wd-35p mg-t-20 d-flex justify-content-center">
                  <span :class="getStatusClass(getApprovalStatus(leave.approvers))" class="tx-14">{{ getApprovalStatus(leave.approvers) }} - {{ getApprovalDate(leave.approvers) }}</span>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-card>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-card class="rounded-09 bg-black-2" :style="'border: none'" shadow="none">
          <el-row>
            <el-col :span="18">
              <span class="tx-20 tx-bolder text-white">Attached files</span>
            </el-col>
          </el-row><br />
          <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
            <div style="flex-wrap:wrap;margin-top:6px" class="d-flex">
              <div v-for="i in 5" :key="i" class="bg-black-3 d-flex" style="width: 140px; padding: 13px;margin:5px">
                <e-svg icon="downloadBlue"></e-svg>
                <div style="color: #1492e6; padding-left: 5px">
                  Study data.pdf
                </div>
              </div>
            </div>
          </el-card>
        </el-card>
      </el-col>
    </el-row>
    <el-row style=" margin-top: 20px; background: #1e1e1e; padding-top: 25px; padding-bottom: 15px;">
      <el-col :span="3" :offset="20">
        <es-button text="Cancel" width="200" />
      </el-col>
    </el-row>
  </es-container>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher"
import { mapMutations } from "vuex"
import { getId } from '@/util/auth'
import moment from 'moment'
export default {
  components: { },
  data() {
    return {
      dialog: false,
      leave: {},
      user: {}
    }
  },
   mounted() {
    /* this.setAsideMenuCollapse(true);
    setTimeout(() => {
      this.setAsideWidth("100px");
    }, 100); */
  },
  created() {
//    this.setAsideMenuCollapse(true);
//    this.setAsideWidth("100px");
    this.getUser()
    this.getLeave()
  },
  destroyed() {
    this.setAsideMenuCollapse(false);
  },
  methods: {
    getApprovalDate(approvers) {
      if (approvers.length > 0) {
        return moment(approvers[0].updated_at).format('DD-MM-yyyy')
      }
    },
    getApprovalStatus(approvers) {
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
    getStatus(val) {
      if (val === 'pending') {
        return 'Pending'
      } else if (val === 'rejected') {
        return 'Rejected'
      } else if (val === 'approved') {
        return 'Approved'
      }
    },
    getDate(date) {
      return moment(date).format('DD MMM yyyy')
    },
    getLeave() {
      const query = `query($id: uuid!) {
        leaves_by_pk(id: $id) {
          id
          from_date
          to_date
          reasong
          approvers {
            id
            status
            updated_at
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
            }
          }
        }
      }`
      dispatchGraphql(query, { id: this.$route.params.id }).then((response) => {
        this.leave = response.leaves_by_pk
        console.log(this.leave)
      })
    },
    getUser() {
      const query = `query {
        users_by_pk(id: "${getId()}") {
          id
          first_name
          section {
            id
            name
            standard {
              id
              name
            }
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.user = response.users_by_pk
      })
    },
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth"]),
    scrollTop() {
      this.$nextTick(() => {
        this.$refs.tab2.scrollTop = 0;
      });
    },
  },
};
</script>
