<template>
  <e-container
    hideHeader
    pageTitle="Details of Leave Application"
    :back="$url.HQ_LEAVE_MANAGEMENT_NEED_APPROVAL"
  >
    <e-form bgColor="transparent" paddingContainer="0px" pLeft="0px">
      <el-col :span="24">
        <el-row class="view-no-form">
          <el-col
            :span="item.span || 8"
            v-for="(item, index) in keyValues"
            :key="index"
          >
            <e-key-value :span="24" :item="item" />
          </el-col>
        </el-row>
      </el-col>
    </e-form>

    <hr class="end-of-form-line">

    <el-row v-if="approver.status === 'pending'">
      <el-col class="form-last-buttons" style="flex-direction: row;justify-content: flex-end;">
        <e-button :span="4" css="float-right" label="Reject" plain @click="dialogReject = true" />
        <e-button :span="4" css="float-right" label="Approve" type="primary" @click="updateStatus('approved')" />
      </el-col>
    </el-row>

    <e-dialog title="Please Provide the reason for rejection" v-model="dialogReject" width="70%" top="40vh" noEsc noPersist @cancel="dialogReject = false" @confirm="updateStatus('rejected')" btnConfirmText="Submit">
      <e-input v-model="reason" :span="24" type="textarea" :rows="4" placeholder="Type here to enter reason of rejection" />
    </e-dialog>
  </e-container>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher"
import { getId } from '@/util/auth'
export default {
  data() {
    return {
      dialogReject: false,
      leave: {},
      reason: '',
      approver: {}
    };
  },
  computed: {
    keyValues() {
      return [
        {
          key: "Name",
          value: this.leave.name,
        },
        {
          key: "From Date",
          value: this.leave.from_date,
        },
        {
          key: "To Date",
          value: this.leave.to_date,
        },
        {
          key: "Designation / Section",
          value: this.leave.designation,
        },
        {
          key: "Department / Standard",
          value: this.leave.department,
        },
        {
          key: "Purpose",
          value: this.leave.reasong,
          span: 24,
        },
      ];
    },
  },
   created(){
    this.getLeaves()
    this.getRecommendation()
  },
  methods: {
    getDataVariables() {
      return {
        "leaveId": this.$route.params.id,
        "id": getId()
      }
    },
    getRecommendation() {
      const query = `query($id: uuid, $leaveId: uuid) {
        approval_recommendations(where: {_and: [{user_id: {_eq: $id}}, {approval_recommendable_id: {_eq: $leaveId}}]}) {
          id
          status
          reason
        }
      }`
      dispatchGraphql(query, this.getDataVariables()).then((response) => {
        this.approver = response.approval_recommendations[0]
      })
    },
    getLeaves() {
      const query = `query {
        leaves_by_pk(id: "${this.$route.params.id}") {
          id
          from_date
          to_date
          leavable_type
          reasong
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
      }`
      dispatchGraphql(query).then((response) => {
        this.leave = response.leaves_by_pk
        this.leave.name = this.leave.user.first_name
        this.leave.designation = this.leave.user.designation ? this.leave.user.designation.designation_type : this.leave.user.section.name
        this.leave.department = this.leave.user.designation ? this.leave.user.designation.department.name : this.leave.user.section.standard.name
        console.log('leave', this.leave)
      })
    },
    updateStatus(status) {
      this.dialogReject = false
      const mutation = `mutation update_approval_recommendations($id: uuid!, $changes: approval_recommendations_set_input) {
        update_approval_recommendations_by_pk(pk_columns: {id: $id},_set: $changes) {
          id
          status
        }
      }`
      dispatchGraphql(mutation, this.getVariables(status)).then((response) => {
        console.log('response', response)
        this.$router.push(this.$url.HQ_LEAVE_MANAGEMENT_NEED_APPROVAL)
      })
    },
    getVariables(status) {
      return {
        "id": this.approver.id,
        "changes": {
          "status": status,
          "reason": this.reason
        } 
      }
    }
  },
};
</script>

<style scoped>
/* .label {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
}

.e-form {
  background-color: white;
  height: auto;
  overflow-x: hidden;
} */

.button-approve {
  color: #bc6c42;
}
</style>

<style>

</style>
