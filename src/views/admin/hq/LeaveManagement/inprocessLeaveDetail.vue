<template>
  <e-container hideHeader pageTitle="Approval Status For Leave " :back="$url.HQ_LEAVE_MANAGEMENT_MARK_APPROVAL">
    <div class="heading">Leave Application</div>
    <el-card shadow="none" class="rounded-08">
      <el-row>
        <el-col :span="7" style="padding-bottom: 30px">
          <div  style="color: #000000cc; padding-bottom: 10px"  class="fs-16 f-600">Name</div>
          <div style="color: #00000099" class="fs-16">{{ leave.user ? leave.user.first_name : leave.user.first_name }}</div>
        </el-col>
        <el-col :span="7" style="padding-bottom: 30px">
          <div  style="color: #000000cc; padding-bottom: 10px"  class="fs-16 f-600">From</div>
          <div style="color: #00000099" class="fs-16">{{ getDate(leave.from_date) }}</div>
        </el-col>
        <el-col :span="7" style="padding-bottom: 30px">
          <div  style="color: #000000cc; padding-bottom: 10px"  class="fs-16 f-600">To Date</div>
          <div style="color: #00000099" class="fs-16">{{ getDate(leave.to_date) }}</div>
        </el-col>
        <el-col :span="7" style="padding-bottom: 30px">
          <div  style="color: #000000cc; padding-bottom: 10px"  class="fs-16 f-600">Department / Standard</div>
          <div style="color: #00000099" class="fs-16">{{ leave.user.designation ? leave.user.designation.department.name : leave.user.section.standard.name }}</div>
        </el-col>
        <el-col :span="7" style="padding-bottom: 30px">
          <div  style="color: #000000cc; padding-bottom: 10px"  class="fs-16 f-600">Designation / Section</div>
          <div style="color: #00000099" class="fs-16">{{ leave.user.designation ? leave.user.designation.designation_type : leave.user.section.name }}</div>
        </el-col>
        <el-col style="padding-bottom: 30px">
          <div style="color: #000000cc; padding-bottom: 10px" class="fs-16 f-600">Purpose</div>
          <div style="color: #00000099" class="fs-16">{{ leave.reasong }}</div>
        </el-col>
      </el-row>
    </el-card>
    <br />
    <div class="heading">Leave approvers</div>
    <el-card shadow="none" class="rounded-08">
      <div class="approver-header d-flex">
        <div style="width: 8rem; color: #000000cc" class="f-600 fs-16">
          User
        </div>
        <div style="width: 15rem; color: #000000cc" class="f-600 fs-16">
          Department
        </div>
        <div style="width: 15rem; color: #000000cc" class="f-600 fs-16">
          Designation
        </div>
        <div style="width: 20rem; color: #000000cc" class="f-600 fs-16">
          Status
        </div>
        <div style="width: 20rem; color: #000000cc" class="f-600 fs-16">
          Reason
        </div>
      </div>
      <div
        class="detail-header d-flex" v-for="(approver, i) in approvers" :key="i" style="margin: 40px 0">
        <div style="width: 8rem; color: #00000099" class="f-500 fs-16">{{ approver.user.first_name }}</div>
        <div style="width: 15rem; color: #00000099" class="f-500 fs-16">{{ approver.user.designation ? approver.user.designation.department.name : '' }}</div>
        <div style="width: 15rem; color: #00000099" class="f-500 fs-16">{{ approver.user.designation ? approver.user.designation.designation_type : '' }}</div>
        <div style="width: 20rem" class="f-500 fs-16">
          <div v-if="approver.status == 'rejected'" style="color: #e60000">Rejected</div>
          <div v-if="approver.status == 'pending'" style="color: #ffa700">Pending</div>
          <div v-if="approver.status == 'approved'" style="color: #0bc32e">Approved</div>
        </div>
        <div style="width: 20rem; color: #00000099" class="f-500 fs-16">{{ approver.reason }}</div>
      </div>
    </el-card>
    <el-row style="border-top: 1px solid #fcdfbd;margin-top: 20px;padding-bottom: 15px;">
      <el-col style="float: right" :span="9">
        <e-button :span="15" label="Cancel" width="180" css="cancel_btn" type="default" class="p-45" />
        <e-button :span="8" label="Download" width="200" @click="handleClick" css="float-right" class="p-45" />
      </el-col>
    </el-row>
  </e-container>
</template>

<script>
import { mapMutations } from "vuex"
import { dispatchGraphql } from "@/api/dispatcher"
import moment from 'moment'
export default {
  data() {
    return {
      leave: {},
      approvers: []
    };
  },
  mounted() {
    this.setAsideMenuCollapse(true);
    setTimeout(() => {
      this.setAsideWidth("280px");
    }, 100);
  },
  created() {
   // this.setAsideMenuCollapse(true);
   // this.setAsideWidth("280px");
    this.getLeave()
  },
  destroyed() {
    this.setAsideMenuCollapse(false);
  },
  methods: {
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth"]),
    addNewuser() {
      alert("asasd");
    },
    getDate(date) {
      return moment(date).format("DD MMM YYYY")
    },
    getLeave() {
      const query=`query MyQuery {
        leaves_by_pk(id: "${this.$route.params.id}") {
          id
          from_date
          to_date
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
            reason
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
      dispatchGraphql(query).then((response) => {
        this.leave = response.leaves_by_pk
        this.approvers = this.leave.approvers
        console.log('leave', this.leave)
      })
    },
    activeTabChange(e) {
      this.activeTab = e
    },
    scrollTop() {
      this.$nextTick(() => {
        this.$refs.tab2.scrollTop = 0
      });
    },
  },
};
</script>
