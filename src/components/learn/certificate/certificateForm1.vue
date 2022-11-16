<template>
  <div class="student-tab" style="padding: 0 100px; margin-top: 100px">
    <e-dialog :title="'Custom audience selection '" v-model="dialog" width="60%" top="20vh" noEsc :gutter="20" hideDefaultFooter @cancel="dialog = false" @confirm="dialog = false">
      <el-col :span="24" style="margin-bottom: 20px; margin-top: -30px; padding-bottom: 20px; font-size: 12px; display: flex; justify-content: space-between; border-bottom: 2px solid rgb(252, 223, 189);">
        <div style="width: 350px; opacity: 0.6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu
          venenatis tellus. Fusce faucibus est vitae facilisis consectetur.
        </div>
        <div>
          <e-button icon="el-icon-search" :plain="true" size="small" type="primary"></e-button>
        </div>
      </el-col>
      <el-row :gutter="20" style="margin-bottom: 15px">
        <el-col :span="6" style="font-size: 18px; font-weight: bold; padding-left: 20px">
          {{ customAudience.length }} {{ activeName === 'nonTeaching' ? 'Non-Teaching Staff' : (activeName === 'management' ? 'Management Staff' : activeName + 's') }}
        </el-col>
        <el-col :span="4"></el-col>
        <el-col :span="4" :offset="10" class="primary-text">
          <e-button :span="4" label="Deselect All" width="100" css="cancel_btn" @click="deselectCustom" />
        </el-col>
        <el-col :span="4">
          <e-button :span="10" label="Done" width="100" @click="dialog = false"></e-button>
        </el-col>
      </el-row>
      <select-card :users="customAudience" :audience="audience" @input="handleCustomSelect" @deselect="deselectCustomSelect" />
      <el-col>
        <el-pagination background layout="prev, pager, next" style="text-align: center" :total="50" />
      </el-col>
    </e-dialog>
    <el-tabs class="floatTabHeader border-section" v-model="activeName" >
      <el-tab-pane label="Student" name="student">
        <el-row>
          <el-col :span="6">
            <div style="font-weight: bold">Standard</div>
           <el-select v-model="section" @change="getStudents(section)">
                <el-option v-for="item in sections" :key="item.id" :label="item.standard.name + ' ' + item.name" :value="item.id" />
              </el-select>
            <!-- <e-select :span="17" :options="subjects"></e-select> -->
          </el-col>
          <el-col :span="12">
            <div style="margin-bottom: 10px; font-weight: bold">
              Audience selection
            </div>
            <el-row>
              <el-col :span="10">
                <el-card
                  shadow="none"
                  style="margin-right: 20px"
                  class="rounded-08 elimeny"
                >
                  <div style="display: flex" @click="studentAudience()">
                    <e-svg style="margin-right: 10px" icon="AllStudents" />
                    All the students of the class
                  </div>
                </el-card>
              </el-col>

              <el-col :span="9">
                <div @click="handleCustomAudience">
                  <el-card shadow="none" class="rounded-08 elimeny">
                    <div style="display: flex">
                      <e-svg
                        style="margin-right: 10px"
                        icon="customselection"
                      />
                    Make a custom selection
                    </div>
                  </el-card>
                </div>
              </el-col>
              <div style="display: inline-flex; margin-top: 10px">
                <e-svg icon="Group" />
                <div
                  style="
                    margin-left: 11px;
                    opacity: 0.4;
                    font-size: 14px;
                    padding-right: 70px;
                  "
                >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu venenatis tellus. Fusce faucibus est vitae facilisis consectetur.
                </div>
              </div>
            </el-row>
          </el-col>
        </el-row>
        <div class="text-bold" style="margin-top: 20px; margin-bottom: 10px">
          Privacy mode
        </div>
        <div style="font-size: 14px; opacity: 0.4">
          You can choose who will receive the alert for the new certificate
        </div>
        <div style="margin-top: 10px">
          <button
            style="
              padding: 8px 13px;
              border-radius: 5px;
              background: transparent;
              border: 1px solid;
              font-size: 15px;
              margin-right: 15px;
              margin-bottom: 15px;
              text-transform: uppercase;
            "
            :class="{ checktrue: studentBtn }"
            @click="studentBtn = !studentBtn"
          >
            <el-checkbox v-model="studentBtn"> </el-checkbox>
            Students
          </button>
          <button
            style="
              padding: 8px 13px;
              border-radius: 5px;
              background: transparent;
              border: 1px solid;
              font-size: 15px;
              margin-right: 15px;
              margin-bottom: 15px;
              text-transform: uppercase;
            "
            :class="{ checktrue: teacherBtn }"
            @click="teacherBtn = !teacherBtn"
          >
            <el-checkbox v-model="teacherBtn"> </el-checkbox>
            Teachers
          </button>
          <button
            style="
              padding: 8px 13px;
              border-radius: 5px;
              background: transparent;
              border: 1px solid;
              font-size: 15px;
              margin-right: 15px;
              margin-bottom: 15px;
              text-transform: uppercase;
            "
            :class="{ checktrue: managementBtn }"
            @click="managementBtn = !managementBtn"
          >
            <el-checkbox v-model="managementBtn"> </el-checkbox>
            Management
          </button>
          <button
            style="
              padding: 8px 13px;
              border-radius: 5px;
              background: transparent;
              border: 1px solid;
              font-size: 15px;
              margin-right: 15px;
              margin-bottom: 15px;
              text-transform: uppercase;
            "
            :class="{ checktrue: schoolBtn }"
            @click="schoolBtn = !schoolBtn"
          >
            <el-checkbox v-model="schoolBtn"> </el-checkbox>
            School
          </button>
        </div>
        <div style="font-size: 14px; opacity: 0.4">
          Only the students and the teachers will be notified about the
          certificate
        </div>
    <!-- <div style="margin-top:10px;display: flex; padding-top:15px; justify-content: flex-end;border-top: 2px solid #fcdfbd;padding-right:1px"> -->
      <!-- <e-button
        :span="4"
        label="Next"
        @click="activeName = 'teacher'"
        width="180"
        css="float-left"
      ></e-button>
      <el-checkbox v-model="createProfile" style="margin-top: 8px;"></el-checkbox>
      <e-button
        :span="3"
        label="Create a public URL"
        width="180"
        css="cancel_btn"
        type="default"
        @click="createProfile=!createProfile"
      ></e-button>
      <e-button
        :span="3"
        label="Cancel"
        width="180"
        css="cancel_btn"
        type="default"
      ></e-button>
      <e-button
        :span="4"
        label="Proceed"
        @click="handleClick"
        width="180"
        css="float-right"
      ></e-button> -->
    <!-- </div> -->
      <el-row style="border-top: 1px solid #fcdfbd;margin-top: 20px;padding-bottom: 15px;">
        <el-col class="float-left" :span="12">
          <e-button :span="8" label="Proceed" width="180" css="float-right" class="p-45" @click="createAudience" />
        </el-col>
        <el-col class="float-right" :span="10">
          <e-button :span="15" label="Cancel" width="180" css="cancel_btn" type="default" class="p-45" @click="activeName = 'teacher'" />
          <e-button :span="8" label="Next" width="180" css="float-right" class="p-45" @click="activeName = 'teacher'" />
        </el-col>
      </el-row>
      </el-tab-pane>
      <el-tab-pane label="Teacher" name="teacher">
        <el-row>
          <el-col :span="6">&emsp;&emsp;</el-col>
          <el-col :span="12">
            <div style="margin-bottom: 10px; font-weight: bold">
              Audience selection
            </div>
            <el-row>
              <el-col :span="10">
                <el-card shadow="none" style="margin-right: 20px" class="rounded-08 elimeny" >
                  <div style="display: flex" @click="teacherAudience()">
                    <e-svg style="margin-right: 10px" icon="AllStudents" />
                    All the Teachers
                  </div>
                </el-card>
              </el-col>

              <el-col :span="9">
                <div @click="handleCustomAudience">
                  <el-card shadow="none" class="rounded-08 elimeny">
                    <div style="display: flex">
                      <e-svg style="margin-right: 10px" icon="customselection" />
                      Make a custom selection
                    </div>
                  </el-card>
                </div>
              </el-col>
              <div style="display: inline-flex; margin-top: 10px">
                <e-svg icon="Group" />
                <div style=" margin-left: 11px;opacity: 0.4;font-size: 14px;padding-right: 70px;">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu venenatis tellus. Fusce faucibus est vitae facilisis consectetur.
                </div>
              </div>
            </el-row>
          </el-col>
        </el-row>

       <el-row style="border-top: 1px solid #fcdfbd;margin-top: 20px;padding-bottom: 15px;">
          <el-col class="float-left" :span="12">
            <e-button :span="8" label="Proceed" width="180" css="float-right" class="p-45" @click="createAudience" />
          </el-col>
          <el-col class="float-right" :span="10">
            <e-button :span="15" label="Cancel" width="180" css="cancel_btn" type="default" class="p-45" @click="activeName = 'management'" />
            <e-button :span="8" label="Next" width="180" css="float-right" class="p-45" @click="activeName = 'management'" />
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Management" name="management">
        <el-row>
          <el-col :span="6">&emsp;&emsp;</el-col>
          <el-col :span="12">
            <div style="margin-bottom: 10px; font-weight: bold">
              Audience selection
            </div>
            <el-row>
              <el-col :span="10">
                <el-card shadow="none" style="margin-right: 20px" class="rounded-08 elimeny" >
                  <div style="display: flex" @click="managementAudience()">
                    <e-svg style="margin-right: 10px" icon="AllStudents" />
                    All the Management
                  </div>
                </el-card>
              </el-col>

              <el-col :span="9">
                <div @click="handleCustomAudience">
                  <el-card shadow="none" class="rounded-08 elimeny">
                    <div style="display: flex">
                      <e-svg style="margin-right: 10px" icon="customselection" />
                      Make a custom selection
                    </div>
                  </el-card>
                </div>
              </el-col>
              <div style="display: inline-flex; margin-top: 10px">
                <e-svg icon="Group" />
                <div style=" margin-left: 11px;opacity: 0.4;font-size: 14px;padding-right: 70px;">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu venenatis tellus. Fusce faucibus est vitae facilisis consectetur.
                </div>
              </div>
            </el-row>
          </el-col>
        </el-row>

        <el-row style="border-top: 1px solid #fcdfbd;margin-top: 20px;padding-bottom: 15px;">
          <el-col class="float-left" :span="12">
            <e-button :span="8" label="Proceed" width="180" css="float-right" class="p-45" @click="createAudience" />
          </el-col>
          <el-col class="float-right" :span="10">
            <e-button :span="15" label="Cancel" width="180" css="cancel_btn" type="default" class="p-45" @click="activeName = 'nonTeaching'" />
            <e-button :span="8" label="Next" width="180" css="float-right" class="p-45" @click="activeName = 'nonTeaching'" />
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Non - teaching staff" name="nonTeaching">
        <el-row>
          <el-col :span="6">&emsp;&emsp;</el-col>
          <el-col :span="12">
            <div style="margin-bottom: 10px; font-weight: bold">
              Audience selection
            </div>
            <el-row>
              <el-col :span="10">
                <el-card shadow="none" style="margin-right: 20px" class="rounded-08 elimeny" >
                  <div style="display: flex" @click="nonTeachAudience()">
                    <e-svg style="margin-right: 10px" icon="AllStudents" />
                    All the Non Teaching
                  </div>
                </el-card>
              </el-col>

              <el-col :span="9">
                <div @click="handleCustomAudience">
                  <el-card shadow="none" class="rounded-08 elimeny">
                    <div style="display: flex">
                      <e-svg style="margin-right: 10px" icon="customselection" />
                      Make a custom selection
                    </div>
                  </el-card>
                </div>
              </el-col>
              <div style="display: inline-flex; margin-top: 10px">
                <e-svg icon="Group" />
                <div style=" margin-left: 11px;opacity: 0.4;font-size: 14px;padding-right: 70px;">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu venenatis tellus. Fusce faucibus est vitae facilisis consectetur.
                </div>
              </div>
            </el-row>
          </el-col>
        </el-row>

        <el-row style="border-top: 1px solid #fcdfbd;margin-top: 20px;padding-bottom: 15px;">
          <el-col class="float-left" :span="12">
            <e-button :span="8" label="Proceed" width="180" css="float-right" class="p-45" @click="createAudience" />
          </el-col>
          <el-col class="float-right" :span="10">
            <e-button :span="15" label="Cancel" width="180" css="cancel_btn" type="default" class="p-45" @click="activeName = 'group'" />
            <e-button :span="8" label="Next" width="180" css="float-right" class="p-45" @click="activeName = 'group'" />
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Group" name="group">
       <el-row style="border-top: 1px solid #fcdfbd;margin-top: 20px;padding-bottom: 15px;" class="form-last-buttons">
          <!-- <el-col class="float-right" :span="10"> -->
            <e-button :span="15" label="Cancel" width="180" css="cancel_btn" type="default" class="p-45" ></e-button>
            <e-button :span="8" label="Proceed" width="180" css="float-right" class="p-45" @click="createAudience()" ></e-button>
          <!-- </el-col> -->
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import selectCard from "@/components/learn/certificate/selectCard.vue"
import { dispatchGraphql } from '@/api/dispatcher'
export default {
  components: { selectCard },
  props: {
    certificateId: {
      type: String,
      default: null
    },
    contractTemplate: {
      type: Object,
      default: null
    },
    sections: {
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
    }
  },
  data: () => ({
    activeName: "student",
    section: {},
    dialog: false,
    students: [],
    audience: [],
    customAudience: [],
    // subjects: [
    //   {
    //     title: "Mathematics",
    //     value: "Mathematics",
    //   },
    //   {
    //     title: "Science",
    //     value: "Science",
    //   },
    //   {
    //     title: "Hindi",
    //     value: "Hindi",
    //   },
    //   {
    //     title: "Social Science",
    //     value: "Social Science",
    //   },
    //   {
    //     title: "English",
    //     value: "English",
    //   },
    //   {
    //     title: "French",
    //     value: "French",
    //   },
    // ],
    studentBtn: true,
    teacherBtn: true,
    managementBtn: false,
    schoolBtn: false,
    createProfile:true,
  }),
  created() {
    // this.getStudents()
  },
  methods: {
    handleCustomAudience() {
      if (this.activeName === 'student') {
        this.customAudience = []
        this.customAudience = this.students
      } else if (this.activeName === 'teacher') {
        this.customAudience = []
        this.customAudience = this.teachers
      } else if (this.activeName === 'management') {
        this.customAudience = []
        this.customAudience = this.management
      } else if (this.activeName === 'nonTeaching') {
        this.customAudience = []
        this.customAudience = this.non_teaching
      }
      this.dialog = true
    },
    // getAudience() {
    //   return {
    //     "objects": this.audience
    //   }
    // },
    createAudience() {
      // console.log(this.req)
      //   this.$emit("save", this.req)
      console.log('audienceform 1', this.audience)
      let privacyData = []
      if(this.studentBtn) {
        privacyData.push("student")
      }
      if(this.teacherBtn) {
        privacyData.push("teacher")
      }
      if(this.managementBtn) {
        privacyData.push("management")
      }
      if(this.schoolBtn) {
        privacyData.push("school")
      }

      const data = {
        privacy: privacyData,
        audience: this.audience
      }
      this.$emit("tabOne",data)
      this.$emit("save", this.audience)
      // const mutation = `mutation($objects: [audience_insert_input!]!){
      //   insert_audiences(objects: $objects) {
      //     affected_rows
      //     returning {
      //       id
      //       user_type
      //     }
      //   }
      // }`
      // dispatchGraphql(mutation, this.getAudience()).then(response => {
      //   console.log(response)
      //   this.$notify({
      //     type: 'success',
      //     title: 'Task Added'
      //   })

      //   // this.$router.push(this.$url.SH_EVENT_CALENDER)
      // })
    },
     getStudents(val) {
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
      dispatchGraphql(query, { secId: val }).then(response => {
        this.students = response.users
        console.log(this.students)
      })
    },
    studentAudience() {
      this.students.map(x => {
        this.audience.push({
          user_id: x.id,
          audienceable_type: 'Certificate',
          user_type: x.role
        })
      })
      this.$notify({
        type: 'success',
        title: 'Successfully Saved'
      })
      console.log('studentaud', this.audience)
    },
    teacherAudience() {
      this.teachers.map(x => {
        this.audience.push({
          user_id: x.id,
          audienceable_type: 'Certificate',
          user_type: x.role
        })
      })
      this.$notify({
        type: 'success',
        title: 'Successfully Saved'
      })
      console.log('teacheraud', this.audience)
    },
    managementAudience() {
      this.management.map(x => {
        this.audience.push({
          user_id: x.id,
          audienceable_type: 'Certificate',
          user_type: x.role
        })
      })
      this.$notify({
        type: 'success',
        title: 'Successfully Saved'
      })
      console.log('managementaud', this.audience)
    },
    nonTeachAudience() {
      this.non_teaching.map(x => {
        this.audience.push({
          user_id: x.id,
          audienceable_type: 'Certificate',
          user_type: x.role
        })
      })
      this.$notify({
        type: 'success',
        title: 'Successfully Saved'
      })
      console.log('Nonteachaud', this.audience)
    },
    handleCustomSelect(val) {
      this.audience.push({
        user_id: val.id,
        audienceable_id: this.contractTemplate.id,
        audienceable_type: 'contractTemplate',
        user_type: val.role
      })
      console.log('handleCustomSelect', this.audience)
    },
     deselectCustomSelect(val) {
      const user = this.audience.filter(x => x.user_id === val.id)[0]
      const index = this.audience.indexOf(user)
      this.audience.splice(index, 1)
      console.log('aud', this.audience)
    },
    deselectCustom() {
      for (const item of this.customAudience) {
        const user = this.audience.filter(x => x.id === item.id)[0]
        const index = this.audience.indexOf(user)
        this.audience.splice(index, 1)
      }
      console.log('aud', this.audience)
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
