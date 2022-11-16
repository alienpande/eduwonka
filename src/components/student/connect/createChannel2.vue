<template>
<div>
  <es-dialog :title="'Students selection'" v-model="dialog" width="45%" noEsc :gutter="20" hideDefaultFooter @cancel="dialog = false" @confirm="dialog = false">
    <el-row :gutter="20" style="margin-bottom: 15px" v-loading="loading">
      <el-col :span="6" class="fs-18 tx-bolder text-white">
        {{students.length}} Students
      </el-col>
      <el-col :span="4"></el-col>
      <el-col :span="4" :offset="10" class="text-white">
        <es-button :span="4" text="Deselect All" width="200" css="cancel_btn" />
      </el-col>
      <selection-card :users="customAudience" :moderators="audiences" @input="handleCustomSelect" @deselect="deselectCustomSelect" @deselectAll="deselectAll"/>
    </el-row>
    <el-row>
      <el-col :span="20">
        <!-- <el-pagination @current-change="currentPage" @size-change="sizeChange" @prev-click="previousClick" @next-click="nextClick" background layout="prev, pager, next" style="text-align: center" :total="50" /> -->
      </el-col>
      <el-col :span="4" class="dialog-footer">
        <es-button text="Done" :plain="true" @click="dialog = false" />
      </el-col>
    </el-row>
  </es-dialog>
  <es-dialog :title="'Students selection'" v-model="teacherDialog" width="45%" noEsc :gutter="20" hideDefaultFooter @cancel="teacherDialog = false" @confirm="teacherDialog = false">
    <el-row :gutter="20" style="margin-bottom: 15px" v-loading="loading">
      <el-col :span="6" class="fs-18 tx-bolder text-white">
        {{students.length}} Students
      </el-col>
      <el-col :span="4"></el-col>
      <el-col :span="4" :offset="10" class="text-white">
        <es-button :span="4" text="Deselect All" width="200" css="cancel_btn" />
      </el-col>
      <selection-card :users="customAudience" :moderators="audiences" @input="handleCustomSelect" @deselect="deselectCustomSelect" @deselectAll="deselectAll"/>
    </el-row>
    <el-row>
      <el-col :span="20">
        <!-- <el-pagination @current-change="currentPage" @size-change="sizeChange" @prev-click="previousClick" @next-click="nextClick" background layout="prev, pager, next" style="text-align: center" :total="50" /> -->
      </el-col>
      <el-col :span="4" class="dialog-footer">
        <es-button text="Done" :plain="true" @click="teacherDialog = false" />
      </el-col>
    </el-row>
  </es-dialog>
  <div class="rounded-08 bg-black-2 student-tab mg-t-100 mg-l-40 mg-r-40" style="padding: 0 100px">
    <el-tabs class="floatTabHeader studentTab" v-model="activeName">
      <el-tab-pane label="Student" name="student">
        <el-row>
          <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
            <!-- <el-row class="mg-b-30">
              <el-col :span="6">
                <div class="text-white tx-18 tx-bolder">Standard</div><br />
                <es-select :span="17" placeholder='Select Standard' :options="subjects"></es-select>
                <el-select class="student-select" v-model="section" @change="getStudents(section)" placeholder='Select Standard'>
                <el-option v-for="item in sections" :key="item.id" :label="item.standard.name + ' ' + item.name" :value="item.id" />
              </el-select>
              </el-col>
            </el-row><hr style="opacity: 10%" /> -->
            <el-row>
              <el-col v-for="student in selectedStudents" :key="student" :span="4" class="rounded-08 bg-black-3" style="margin: 20px">
                <div class="d-flex" style="margin: 10px">
                  <el-avatar shape="circle" :src="require('@/assets/images/profile.jpg')" />
                  <span class="text-white mg-l-20 mg-t-10">{{student.first_name}}</span>
                  <e-svg icon="crossDark" class="mg-l-50 mg-t-10" @click="deselectCustomSelect(student)"/>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4" style="margin: 20px">
                <es-button text="Add Students" icon="addPluse" @click="getStudents()"/>
              </el-col>
            </el-row>
          </el-card>
        </el-row><br />
      </el-tab-pane>
      <el-tab-pane label="Teacher" name="teacher">
        <el-row>
          <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
            <el-row>
              <el-col v-for="teacher in selectedTeachers" :key="teacher" :span="4" class="rounded-08 bg-black-3" style="margin: 20px">
                <div class="d-flex" style="margin: 10px">
                  <el-avatar shape="circle" :src="require('@/assets/images/profile.jpg')" />
                  <span class="text-white mg-l-20 mg-t-10">{{teacher.first_name}}</span>
                  <e-svg icon="crossDark" class="mg-l-50 mg-t-10" @click="deselectCustomSelect(teacher)"/>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4" style="margin: 20px">
                <es-button text="Add Teacher" icon="addPluse" @click="getTeachers()"/>
              </el-col>
            </el-row>
          </el-card>
        </el-row><br />
       </el-tab-pane>
      <!-- <el-tab-pane label="Management" name="activemanagement"> </el-tab-pane> -->
      <!-- <el-tab-pane label="Non - teaching staff" name="activeno"> </el-tab-pane> -->
      <!-- <el-tab-pane label="Group" name="activegroup"> </el-tab-pane> -->
    </el-tabs>
  </div>
  <el-row style=" margin-top: 150px; background: #1e1e1e; padding-top: 25px; padding-bottom: 15px;">
    <el-col :span="5" :offset="14">
      <es-button text="Cancel" width="200" />
    </el-col>
    <el-col style="float: right" :span="5">
      <es-button text="Create Channel" width="200" @click="handleClick()" :plain="true" />
    </el-col>
  </el-row>
</div>
</template>
<script>
import { dispatchGraphql } from '@/api/dispatcher'
import {getId} from '@/util/auth'
export default {
  props: {
    section: {
      type: String,
      default() {
        return null
      }
    },
    room: {
      type: Object,
      default() {
        return null
      }
    }
  },
  watch:{
    activeName(){
      this.handleCustomAudience()
    }
  },
  data: () => ({
    activeName: "student",
    students: [],
    dialog: false,
    teacherDialog: false,
    loading: true,
    audiences: [],
    selectedStudents: [],
    selectedTeachers: [],
    teachers: [],
    customAudience: [],
    studentBtn: true,
    teacherBtn: true,
    managementBtn: false,
    schoolBtn: false,
    createProfile:true,
  }),
  created(){
  },
  methods: {
    getTeachers() {
      this.teacherDialog = true
      this.loading = true
      const query = `
        query MyQuery{
          users(where: {role: {_eq: "teacher"}}) {
            id
            first_name
            last_name
            role
          }
        }
      `
      dispatchGraphql(query).then(response => {
        this.teachers = response.users
        this.customAudience = this.teachers
        this.loading = false
      })
    },
    handleCustomAudience() {
      if (this.activeName === 'student') {
        this.customAudience = []
        this.customAudience = this.students
      } else if (this.activeName === 'teacher') {
        this.customAudience = []
        this.customAudience = this.teachers
      }
      // this.dialog = true
    },
    deselectAll: function() {
      this.audiences = []
    },
    deselectCustomSelect(val) {
      this.deselectUsers(val)
      const user = this.audiences.filter(x => x.user_id === val.id)[0]
      const index = this.audiences.indexOf(user)
      this.audiences.splice(index, 1)
    },
    handleCustomSelect(val) {
      this.setUsers(val)
      this.audiences.push({
        user_id: val.id,
        room_id: this.room.id
      })
    },
    deselectUsers: function(val){
      var tempData = val.role === 'student' ? this.selectedStudents : this.selectedTeachers
      const user = tempData.filter(x => x.id === val.id)[0]
      const index = tempData.indexOf(user)
      tempData.splice(index, 1)
      val.role === 'student' ? this.selectedStudents = tempData : this.selectedTeachers = tempData
    },
    setUsers: function(val){
      if(val.role === 'student'){
        this.selectedStudents.push(val)
      }else{
        this.selectedTeachers.push(val)
      }
    },
    getStudents() {
      this.dialog = true
      this.loading = true
      const query = `
        query($secId: uuid) {
          users(where:{_and:[{role: {_eq:"student"}}, {section_id: {_eq: $secId}}]}) {
            id
            first_name
            last_name
            role
          }
        }
      `
      dispatchGraphql(query, { secId: this.section }).then(response => {
        this.students = response.users
        this.customAudience = this.students
        this.loading = false
      })
    },
    getAudience() {
      return {
        "objects": this.audiences
      }
    },
    handleClick() {
      this.audiences.push({user_id: getId(), room_id: this.room.id})
      const mutation = `mutation($objects: [room_users_insert_input!]!) {
        insert_room_users(objects: $objects) {
          affected_rows
          returning {
            id
          }
        }
      }`
      dispatchGraphql(mutation, this.getAudience()).then(response => {
        console.log(response)
        this.$notify({
          type: 'success',
          title: 'Added Channel'
        })
        this.$router.push('/connect/messenger-connect')
      })
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
.student-select .el-input--suffix .el-input__inner {
  background: #353535 !important;
  border-radius: 18px !important;
  border: none !important;
  color: #9D9D9D !important;
}
.student-select .el-input__inner {
  height: 35px !important;
}
.non-round  .el-input--suffix .el-input__inner {
   border-radius: 4px !important;
}
.select-icon .el-select .el-input .el-select__caret{
color: #FE9D2B !important;
}
.border-color  .el-input--suffix .el-input__inner{
  border: 1px solid #FE9D2B !important;
}
.select-text-white .el-input--suffix .el-input__inner , .select-text-white .el-input--suffix .el-input__inner::placeholder {
color: #F3F3F3 !important;
font-weight: 500 !important;
}
.title-select .el-input--suffix .el-input__inner {
  background: #1E1E1E !important;
  border-radius: 18px !important;
  border: none !important;
  color: #F3F3F3 !important;
  font-weight: bold !important;
font-size: 24px !important;
}
</style>
