<template>
  <div class="student-tab" style="padding: 0 100px; margin-top: 100px">
    <el-tabs class="floatTabHeader border-section" v-model="activeName" >
      <el-tab-pane label="Teacher" name="activeteacher">
        <div style="color: #000000CC;font-size:20px;">Choose Users for which you want to add Approver</div>
        <el-col :span="20"  style="box-shadow: 0px 1px 3px #11111112;margin-top:10px;background:white; ">
          <el-select v-model="aprovlTeachers"   multiple placeholder="Select Approver" @change="updateValuesTeachers">
            <el-option v-for="item in teachers" :key="item.id" :label="item.first_name" :value="item.id" />
          </el-select>
        </el-col>
        <br/><br/>
        <br/><br/>
        <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px">
          <el-col style="float: right" :span="3">
            <e-button :span="6" label="Next" width="180" @click="handleClick1()" css="float-right" class="p-45" />
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Management" name="activemanagement"> 
        <div style="color: #000000CC;font-size:20px;">Choose Management for which you want to add teachers</div>
        <el-col :span="20"  style="box-shadow: 0px 1px 3px #11111112;margin-top:10px;background:white; ">
          <el-select v-model="aprovlManagement" multiple placeholder="Select Approver" @change="updateValuesManagement">
            <el-option v-for="item in managementData" :key="item.id" :label="item.first_name" :value="item.id" />
          </el-select>
        </el-col>
        <br/><br/>
        <br/><br/>
        <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px">
          <el-col style="float: right" :span="3">
            <e-button :span="6" label="Next" width="180" @click="handleClick2()" css="float-right" class="p-45" />
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Non - teaching staff" name="activeno"> 
        <div style="color: #000000CC;font-size:20px;">Choose staff for which you want to add teachers</div>
        <el-col :span="20"  style="box-shadow: 0px 1px 3px #11111112;margin-top:10px;background:white; ">
          <el-select v-model="aprovlStaff" multiple placeholder="Select Approver" @change="updateValuesStaff">
            <el-option v-for="item in staffData" :key="item.id" :label="item.first_name" :value="item.id" />
          </el-select>
        </el-col>
        <br/><br/>
        <br/><br/>
        <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px">
          <el-col style="float: right" :span="3">
            <e-button :span="6" label="Next" width="180" @click="handleClick3()" css="float-right" class="p-45" />
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Group" name="activegroup"> 
        <div style="color: #000000CC;font-size:20px;">Choose group for which you want to add teachers</div>
        <!-- <el-col :span="20"  style="box-shadow: 0px 1px 3px #11111112;margin-top:10px;background:white; ">
          <el-select v-model="aprovlGroup" multiple placeholder="Select Approver" @change="updateValuesGroup">
            <el-option v-for="item in groupData" :key="item.id" :label="item.first_name" :value="item.id" />
          </el-select>
        </el-col> -->
        <br/><br/>
        <br/><br/>
        <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px">
          <el-col style="float: right" :span="3">
            <e-button :span="6" label="Next" width="180" @click="handleClick4()" css="float-right" class="p-45" />
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher"
  export default {
    data() {
      return {
        activeName: "activeteacher",
        aprovl: '',
        update: false,
        aprovlTeachers:[],
        updatedTeachers:[],
        newTeacherApprovars:[],
        newManagementApprovars:[],
        newStaffApprovars:[],
        newGroupApprovars:[],
        deletedTeacherApprovars:[],
        deletedManagementApprovars:[],
        deletedStaffApprovars:[],
        deletedGroupApprovars:[],
        aprovlManagement:[],
        aprovlStaff:[],
        aprovlGroup:[],
        approvalData:[],
        teachers: [],
        managementData:[],
        staffData:[],
        groupData:[],
        editData:'',
        mutation: `mutation insert_multiple_approval_recommendations($objects: [approval_recommendations_insert_input!]! ) {
          insert_approval_recommendations(objects: $objects) {
            returning {
              id
              approval_recommendable_id
              approval_recommendable_type
              user_id
            }
          }
        }`,
        deleteMutation: `mutation delete_approval_recommendations($id: [uuid!]) {
          delete_approval_recommendations(where: {user_id: {_in: $id }, _and: {approval_recommendable_id: {_eq: "${this.$route.params.id}"}}}) {
            affected_rows
            returning {
              user_id
              user {
                first_name
              }
            }
          }
        }`          
      }
    }, 
    created() {
      this.getusers()
      this.getApprovers()
    },
    methods: {
      updateValuesTeachers(selected) {
        let currentValues = selected
        let selectedTeachers = this.updatedTeachers
        this.newTeacherApprovars = currentValues.filter(item => !selectedTeachers.includes(item));
        this.deletedTeacherApprovars = selectedTeachers.filter(item => !currentValues.includes(item));
        console.log('Result', this.newTeacherApprovars)
        console.log('deleted', this.deletedTeacherApprovars)
      },
      getApprover(aprovlTeachers) {
        const approvalData = []
        for (const obj of aprovlTeachers)
        {
          approvalData.push({
            user_id: obj,
            approval_recommendable_id: this.$route.params.id,
            approval_recommendable_type: "LeaveManagement",
            status: "pending"
          })
        }
        return { "objects": approvalData }
      },
      insertApprovals(approvars){
        dispatchGraphql(this.mutation, this.getApprover(approvars)).then((response) => {
          console.log('Final Resp', response)
          this.activeName ='activemanagement'
        })
      },
      getDeleteTeacher() {
        return {
          "id": this.deletedTeacherApprovars
        }
      },
      handleClick1() {
        if (this.update && this.newTeacherApprovars.length > 0) {
          this.insertApprovals(this.newTeacherApprovars)
        } else if(!this.update) {
          this.insertApprovals(this.aprovlTeachers)
        } else {
          this.activeName ='activemanagement'
        }
        if (this.deletedTeacherApprovars.length > 0) {
          //Delete the approvers
          dispatchGraphql(this.deleteMutation,this.getDeleteTeacher()).then((response) => {
            this.teachers = response.deletedTeacherApprovars
            console.log('deletedddddddddddd', this.deletedTeacherApprovars)
          })
        }
      },
      updateValuesManagement(selected) {
        let currentValues = selected
        let selectedManagement = this.updateManagement
        this.newManagementApprovars = currentValues.filter(item => !selectedManagement.includes(item));
        this.deletedManagementApprovars = selectedManagement.filter(item => !currentValues.includes(item));
        console.log('Result', this.newManagementApprovars)
        console.log('deleted', this.deletedManagementApprovars)
  
      },
      getVariable(aprovlManagement) {
        const approvalData = []
        for (const obj of aprovlManagement)
        {
          approvalData.push({
            user_id: obj,
            approval_recommendable_id: this.$route.params.id,
            approval_recommendable_type: "LeaveManagement",
            status: "pending"
          })
        }
          return { "objects": approvalData }
      },
      insertManagementApprovals(aprovlManagement) {
        dispatchGraphql(this.mutation, this.getVariable(aprovlManagement)).then((response) => {
          console.log('Final Resp', response)
          // this.$emit('save')
          this.activeName ='activeno'
        })
      },
      getDeleteManagement() {
        return {
          "id": this.deletedManagementApprovars
        }
      },
      handleClick2() {
        if (this.update && this.newManagementApprovars.length > 0) {
          this.insertManagementApprovals(this.newManagementApprovars)
        } else if (!this.update) {
          this.insertManagementApprovals(this.aprovlManagement)
        } else {
          this.activeName ='activeno'
        }
        if (this.deletedManagementApprovars.length > 0) {
          //Delete the approvers
          dispatchGraphql(this.deleteMutation,this.getDeleteManagement()).then((response) => {
            this.teachers = response.deletedManagementApprovars
            console.log('deletedddddddddddd', this.deletedManagementApprovars)
          })
        }
      },
      updateValuesStaff(selected){
        let currentValues = selected
        let selectedStaff = this.updateStaff
        this.newStaffApprovars = currentValues.filter(item => !selectedStaff.includes(item));
        this.deletedStaffApprovars = selectedStaff.filter(item => !currentValues.includes(item));
        console.log('Result', this.newStaffApprovars)
        console.log('deleted', this.deletedStaffApprovars)
      },
      getData(aprovlStaff) {
        const approvalData = []
        for (const obj of aprovlStaff)
        {
          approvalData.push({
            user_id: obj,
            approval_recommendable_id: this.$route.params.id,
            approval_recommendable_type: "LeaveManagement",
            status: "pending"
          })
        }
        return { "objects": approvalData }
      },
      insertStaffApprovals(aprovlStaff) {
        dispatchGraphql(this.mutation, this.getData(aprovlStaff)).then((response) => {
          console.log('Final Resp', response)
          // this.$emit('save')
          this.activeName ='activegroup'
        })
      },
      getDeleteStaff() {
        return {
          "id": this.deletedStaffApprovars
        }
      },
      handleClick3() {
        if (this.update && this.newStaffApprovars.length > 0) {
          this.insertStaffApprovals(this.newStaffApprovars)
        } else if(!this.update) {
          this.insertStaffApprovals(this.aprovlStaff)
        } else {
          this.activeName ='activegroup'
        }
        if (this.deletedStaffApprovars.length > 0) {
          //Delete the approvers
          dispatchGraphql(this.deleteMutation,this.getDeleteStaff()).then((response) => {
            this.teachers = response.deletedStaffApprovars
            console.log('deletedddddddddddd', this.deletedStaffApprovars)
          })
        }
      },
      updateValuesGroup(selected) {
        let currentValues = selected
        let selectedGroup = this.updateGroup
        this.newGroupApprovars = currentValues.filter(item => !selectedGroup.includes(item));
        this.deletedGroupApprovars = selectedGroup.filter(item => !currentValues.includes(item));
        console.log('Result', this.newGroupApprovars)
        console.log('deleted', this.deletedGroupApprovars)
      },
      getLeaveData(aprovlStaff) {
        const approvalData = []
        for (const obj of aprovlStaff)
        {
          approvalData.push({
            user_id: obj,
            approval_recommendable_id: this.$route.params.id,
            approval_recommendable_type: "LeaveManagement",
            status: "pending"
          })
        }
        return { "objects": approvalData }
      },
      insertGroupApprovals(aprovlGroup) {
        dispatchGraphql(this.mutation, this.getData(aprovlGroup)).then((response) => {
          console.log('Final Resp', response)
          // this.$emit('save')
          this.$emit('save')
        })
      },
      getDeleteGroup() {
        return {
          "id": this.deletedGroupApprovars
        }
      },
      handleClick4() {
        if (this.update && this.newGroupApprovars.length > 0) {
          this.insertGroupApprovals(this.newGroupApprovars)
        } else if(!this.update) {
          this.insertGroupApprovals(this.aprovlGroup)
        } else {
          this.$emit('save')
        }
        if (this.deletedGroupApprovars.length > 0) {
          //Delete the approvers
          dispatchGraphql(this.deleteMutation,this.getDeleteGroup()).then((response) => {
            this.teachers = response.deletedGroupApprovars
            console.log('deletedddddddddddd', this.deletedGroupApprovars)
          })
        }
      },
      getusers() {
        const tQuery=`query MyQuery {
          users {
            id
            first_name
            role
          }
        }`
        dispatchGraphql(tQuery).then((response) => {
          this.teachers = response.users.filter(x => (x.role === 'teacher' || x.role === 'employee'))
          this.managementData = response.users.filter(x => (x.role === 'management'))
          this.staffData = response.users.filter(x => (x.role === 'staff'))
          console.log('teacher', this.teachers)
        })
      },
      getApprovers() {
        this.update = true
        const query=` query MyQuery {
          approval_recommendations(where: {approval_recommendable_id: {_eq: "${this.$route.params.id}"}}) {
            id
            user_id
            user {
              id
              first_name
              role
            }
          }
        }`
        dispatchGraphql(query).then((response) => {
          this.editData = response.approval_recommendations
          console.log('editttttttttttttttttttttttt', this.editData)
          this.aprovlTeachers = this.editData.filter(x => x.user.role === 'teacher').map(y => y.user.id)
          this.updatedTeachers = this.editData.filter(x => x.user.role === 'teacher').map(y => y.user.id)
          console.log('teacher edit', this.aprovlTeachers)

          this.aprovlManagement = this.editData.filter(x => x.user.role === 'management').map(y => y.user.id)
          this.updateManagement = this.editData.filter(x => x.user.role === 'management').map(y => y.user.id)
          console.log('Management edit', this.aprovlManagement)

          this.aprovlStaff = this.editData.filter(x => x.user.role === 'staff').map(y => y.user.id)
          this.updateStaff = this.editData.filter(x => x.user.role === 'staff').map(y => y.user.id)
          console.log('Staff edit', this.aprovlStaff)
        })
      },
      handleClick() {
        console.log(this.req);
        this.$emit("save", this.req);
      },
    },
  };
</script>
<style>
.elimeny:hover {
  border: 1px solid #bc6c42;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  color: #bc6c42;
  cursor: pointer;
}
.cancel_btn {
  font-weight: bold;
  background: transparent !important;
  border: none !important;
  color: #bc6c42 !important;
}
.student-tab .floatTabHeader.el-tabs.el-tabs--top > .el-tabs__header {
  position: inherit !important;
}
.border-section .el-tabs__header{
border-bottom: 1px solid #FCDFBD !important;
}
</style>
