<template>
<div>
  <div class="rounded-08 bg-black-2 student-tab mg-t-100 mg-l-40 mg-r-40" style="padding: 0 100px">
    <el-tabs class="floatTabHeader studentTab" v-model="activeName">
      <el-tab-pane v-if="verifyType('student')" label="Student" name="student">
        <el-row>
          <el-col style="color: white; font-size: 20px; font-weight: 500" :span="5">
            Choose Students
          </el-col>
        </el-row><br />
        <el-card class="rounded-08 bg-black-3 shearefile-card" :style="'border: none'" shadow="none">
          <div style="width: 80%">
            <div class="add-more-lorem">
              <div class="lorem-boxs" v-for="(user, i) in getAudience('student')" :key="i">
                <div>{{ getUser(user.user_id, 'student') }}</div>
                <img style="cursor: pointer" @click="deleteAudience(user)" src="@/assets/images/loremCross.png" />
              </div>
            </div>
            <div style="border: 2px solid #6d6c6c">
              <div v-for="(user, i) in students" :key="i" class="lorem-check" style="margin: 5px 15px; display: inline-block; width: 10rem">
                <el-checkbox class="class-checkbox" @change="selectedUser(user)" />
                <div class="text-white" :style="`display: inline-block;margin-left: 10px`">
                  {{ user.first_name }}
                </div>
              </div>
            </div>
          </div>
        </el-card><br /><br />
      </el-tab-pane>
      <el-tab-pane v-if="verifyType('parent')" label="Parent" name="parent">
        <el-row>
          <el-col style="color: white; font-size: 20px; font-weight: 500" :span="5">
            Choose Parents
          </el-col>
        </el-row><br />
        <el-card class="rounded-08 bg-black-3 shearefile-card" :style="'border: none'" shadow="none">
          <div style="width: 80%">
            <div class="add-more-lorem">
              <div class="lorem-boxs" v-for="(user, i) in getAudience('parent')" :key="i">
                <div>{{ getUser(user.user_id, 'parent') }}</div>
                <img style="cursor: pointer" @click="deleteAudience(user)" src="@/assets/images/loremCross.png" />
              </div>
            </div>
            <div style="border: 2px solid #6d6c6c">
              <div v-for="(user, i) in parents" :key="i" class="lorem-check" style="margin: 5px 15px; display: inline-block; width: 10rem">
                <el-checkbox class="class-checkbox" @change="selectedUser(user)" />
                <div class="text-white" :style="`display: inline-block;margin-left: 10px`">
                  {{ user.first_name }}
                </div>
              </div>
            </div>
          </div>
        </el-card><br /><br />
      </el-tab-pane>
      <el-tab-pane v-if="verifyType('teacher')" label="Teacher" name="teacher">
        <el-row>
          <el-col style="color: white; font-size: 20px; font-weight: 500" :span="5">
            Choose Teachers
          </el-col>
        </el-row><br />
        <el-card class="rounded-08 bg-black-3 shearefile-card" :style="'border: none'" shadow="none">
          <div style="width: 80%">
            <div class="add-more-lorem">
              <div class="lorem-boxs" v-for="(user, i) in getAudience('employee')" :key="i">
                <div>{{ getUser(user.user_id, 'employee') }}</div>
                <img style="cursor: pointer" @click="deleteAudience(user)" src="@/assets/images/loremCross.png" />
              </div>
            </div>
            <div style="border: 2px solid #6d6c6c">
              <div v-for="(user, i) in teachers" :key="i" class="lorem-check" style="margin: 5px 15px; display: inline-block; width: 10rem">
                <el-checkbox class="class-checkbox" @change="selectedUser(user)" />
                <div class="text-white" :style="`display: inline-block;margin-left: 10px`">
                  {{ user.first_name }}
                </div>
              </div>
            </div>
          </div>
        </el-card><br /><br />
      </el-tab-pane>
      <el-tab-pane v-if="verifyType('management')" label="Management" name="management">
        <el-row>
          <el-col style="color: white; font-size: 20px; font-weight: 500" :span="5">
            Choose Management Staff
          </el-col>
        </el-row><br />
        <el-card class="rounded-08 bg-black-3 shearefile-card" :style="'border: none'" shadow="none">
          <div style="width: 80%">
            <div class="add-more-lorem">
              <div class="lorem-boxs" v-for="(user, i) in getAudience('management')" :key="i">
                <div>{{ getUser(user.user_id, 'management') }}</div>
                <img style="cursor: pointer" @click="deleteAudience(user)" src="@/assets/images/loremCross.png" />
              </div>
            </div>
            <div style="border: 2px solid #6d6c6c">
              <div v-for="(user, i) in management" :key="i" class="lorem-check" style="margin: 5px 15px; display: inline-block; width: 10rem">
                <el-checkbox class="class-checkbox" @change="selectedUser(user)" />
                <div class="text-white" :style="`display: inline-block;margin-left: 10px`">
                  {{ user.first_name }}
                </div>
              </div>
            </div>
          </div>
        </el-card><br /><br />
      </el-tab-pane>
      <el-tab-pane v-if="verifyType('nonTeaching')" label="Non - teaching staff" name="nonTeaching">
        <el-row>
          <el-col style="color: white; font-size: 20px; font-weight: 500" :span="5">
            Choose Non - teaching staff
          </el-col>
        </el-row><br />
        <el-card class="rounded-08 bg-black-3 shearefile-card" :style="'border: none'" shadow="none">
          <div style="width: 80%">
            <div class="add-more-lorem">
              <div class="lorem-boxs" v-for="(user, i) in getAudience('staff')" :key="i">
                <div>{{ getUser(user.user_id, 'staff') }}</div>
                <img style="cursor: pointer" @click="deleteAudience(user)" src="@/assets/images/loremCross.png" />
              </div>
            </div>
            <div style="border: 2px solid #6d6c6c">
              <div v-for="(user, i) in non_teaching" :key="i" class="lorem-check" style="margin: 5px 15px; display: inline-block; width: 10rem">
                <el-checkbox class="class-checkbox" @change="selectedUser(user)" />
                <div class="text-white" :style="`display: inline-block;margin-left: 10px`">
                  {{ user.first_name }}
                </div>
              </div>
            </div>
          </div>
        </el-card><br /><br />
      </el-tab-pane>
      <el-tab-pane label="Admins" name="admin">
        <el-row>
          <el-col style="color: white; font-size: 20px; font-weight: 500" :span="5">
            Choose Admins
          </el-col>
        </el-row><br />
        <el-card class="rounded-08 bg-black-3 shearefile-card" :style="'border: none'" shadow="none">
          <div style="width: 80%">
            <div class="add-more-lorem">
              <div class="lorem-boxs" v-for="(user, i) in getAudience('admin')" :key="i">
                <div>{{ getUser(user.user_id, 'admin') }}</div>
                <img style="cursor: pointer" @click="deleteAudience(user)" src="@/assets/images/loremCross.png" />
              </div>
            </div>
            <div style="border: 2px solid #6d6c6c">
              <div v-for="(user, i) in admins" :key="i" class="lorem-check" style="margin: 5px 15px; display: inline-block; width: 10rem">
                <el-checkbox class="class-checkbox" @change="selectedUser(user)" />
                <div class="text-white" :style="`display: inline-block;margin-left: 10px`">
                  {{ user.first_name }}
                </div>
              </div>
            </div>
          </div>
        </el-card><br /><br />
      </el-tab-pane>
    </el-tabs>
  </div>
  <el-row style="height: 80px;width: 1680px;left: 280px;top: 900px;border-radius: 0px;position: absolute;background: #1e1e1e;">
    <el-row class="mg-t-20">
      <el-col :span="3" :offset="1">
        <es-button text="Create Appointment" width="200" @click="createAudience()" :plain="true" />
      </el-col>
      <el-col :span="3" :offset="12">
        <es-button text="Cancel" width="200" />
      </el-col>
      <el-col style="float: right" :span="4">
        <es-button text="Next" width="200" @click="setNextTab(activeName)" :plain="true" />
      </el-col>
    </el-row>
  </el-row>
</div>
</template>
<script>
import { dispatchGraphql } from '@/api/dispatcher'
import _ from 'lodash'
export default {
  props: {
    tabs: {
      type: Array,
      default() {
        return null
      }
    },
    appointmentId: {
      type: String,
      default: null
    },
    students: {
      type: Array,
      default() {
        return null
      }
    },
    teachers: {
      type: Array,
      default() {
        return null
      }
    },
    management: {
      type: Array,
      default() {
        return null
      }
    },
    non_teaching: {
      type: Array,
      default() {
        return null
      }
    },
    admins: {
      type: Array,
      default() {
        return null
      }
    },
  },
  data: () => ({
    activeName: '',
    users: [],
    parents: [],
    audience: [],
    dynamicSection: null,
    studentBtn: true,
    teacherBtn: true,
    managementBtn: false,
    schoolBtn: false,
    createProfile: true,
  }),
  watch: {
    activeName: _.debounce(function() {
      if (this.activeName === 'parent') {
        this.setParents()
      }
    })
  },
  created() {
    this.setActiveTab()
  },
  methods: {
    getAudienceVariables() {
      return {
        "objects": this.audience
      }
    },
    createAudience() {
      const mutation = `mutation($objects: [audience_insert_input!]!) {
        insert_audiences(objects: $objects) {
          affected_rows
          returning {
            id
          }
        }
      }`
      dispatchGraphql(mutation, this.getAudienceVariables()).then(response => {
        console.log(response)
        this.$notify({
          type: 'success',
          title: 'Appointment Added'
        })
        this.$router.push(`/connect/staff-apointment`)
      })
    },
    setParents() {
      var students = this.audience.filter(x => x.user_type === 'student')
      for (const student of students) {
        const user = this.users.find(x => x.id === student.user_id)
        if (user) {
          if (user.student_parents.length > 0) {
            for (const parent of user.student_parents) {
              this.parents.push(parent.user)
            }
          }
        }
      }
      console.log(this.parents, 'parents')
    },
    setNextTab(tab) {
      const index = this.tabs.indexOf(tab)
      this.activeName = this.tabs[index + 1]
    },
    setActiveTab() {
      this.activeName = this.tabs[0]
    },
    verifyType(type) {
      const tab = this.tabs.filter(x => x === type)
      if (tab.length > 0) {
        return true
      }
    },
    selectedUser(user) {
      const selected = this.audience.find(x => x.user_id === user.id)
      if (selected) {
        this.audience.splice(this.audience.indexOf(user), 1)
      } else {
        this.audience.push({
          user_id: user.id,
          audienceable_id: this.appointmentId,
          status: "ASSIGNED",
          audienceable_type: "Appointment",
          user_type: user.role
        })
      }
      console.log(this.audience, "audience")
    },
    deleteAudience(user) {
      this.audience.splice(this.audience.indexOf(user), 1)
      console.log(this.audience, "audience")
    },
    getAudience(role) {
      return this.audience.filter(x => x.user_type == role)
    },
    getUser(id, role) {
      var user = {}
      if (role === 'student') {
        user = this.students.find(x => x.id == id)
      } else if (role === 'parent') {
        user = this.parents.find(x => x.id == id)
      } else if (role === 'employee') {
        user = this.teachers.find(x => x.id == id)
      } else if (role === 'management') {
        user = this.management.find(x => x.id == id)
      } else if (role === 'staff') {
        user = this.non_teaching.find(x => x.id == id)
      } else if (role === 'admin') {
        user = this.admins.find(x => x.id == id)
      }
      return user.first_name
    },
    handleClick() {
      console.log(this.req);
      this.$emit("save", this.req);
    },
    currentPage(i) {
      this.emitPager(i);
    },
    nextClick() {
      this.pageEvent = "NextClick";
    },
    previousClick() {
      this.pageEvent = "PreviousClick";
    },
    sizeChange(i) {
      this.pageEvent = "SizeChanged";
      console.log(i);
    },
  },
};
</script>
<style>
.add-more-lorem {
  border: 2px solid #6d6c6c;
  display: flex;
  flex-wrap: wrap;
}
.add-more-lorem input {
  font-size: 16px;
  padding: 14px 17px;
  flex: 1;
  border: none;
  background: transparent;
}
.lorem-boxs {
  box-shadow: 0px 1px 3px #11111112;
  border: 1px solid #bc6c42;
  border-radius: 4px;
  color: #bc6c42;

  font-size: 16px;
  font-weight: 600;
  padding: 3px 0;
  margin: 13px 8px;
  text-align: center;
  display: flex;
}
.lorem-boxs div {
  display: inline-block;
  padding: 0 10px;
}
.lorem-boxs img {
  height: 20px;
  margin-bottom: -4px;
  padding-right: 5px;
  padding-top: 2px;
}

.lorem-check .el-checkbox__inner {
  background: #fcdfbd66;
}
.shearefile-card .el-card__body {
  display: flex;
}
.editor-select{
  margin-top: -10px;
}
.editor-select .el-input--suffix .el-input__inner {
  background: #bc6c4280 !important;
  border: 1px solid #cccccc !important;
  height: 75px;

  color: #00000099;
  font-size: 20px;
  font-weight: 500;
}
.shearefile-card .el-col-4 {
  width: 176px !important;
}
.class-checkbox .el-checkbox__input{
  z-index: 0;
}
</style>