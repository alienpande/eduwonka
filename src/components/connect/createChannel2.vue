<!-- <template>
  <div class="student-tab" style="padding: 0 100px; margin-top: 100px">
    <el-tabs class="floatTabHeader border-section" v-model="activeName" >
      <el-tab-pane label="Student" name="activestudent">
        <el-row>
          <el-col :span="6">
            <div style="font-weight: bold">Standard</div>
            <e-select :span="17" placeholder='Class 4' class="select-dropdown" :options="subjects"></e-select>
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
                  <div style="display: flex">
                    <e-svg style="margin-right: 10px" icon="AllStudents" />
                    All the students of the class
                  </div>
                </el-card>
              </el-col>

              <el-col :span="9">
                <div @click="addStudentDialog = true">
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

      <el-row
      style="
        border-top: 1px solid #fcdfbd;
        margin-top: 20px;
        padding-bottom: 15px;
      "
    >
      <el-col style="float: right" :span="11">
        <e-button
          :span="16"
          label="Cancel"
          width="180"
          css="cancel_btn"
          type="default"
          class="p-45"
        ></e-button>
        <e-button
          :span="8"
          label="Create Channel"
          width="200"
          @click="handleClick"
          css="float-right"
          class="p-45"
        ></e-button>
      </el-col>
    </el-row>

      </el-tab-pane>
      <el-tab-pane label="Teacher" name="activeteacher"> </el-tab-pane>
      <el-tab-pane label="Management" name="activemanagement"> </el-tab-pane>
      <el-tab-pane label="Non - teaching staff" name="activeno"> </el-tab-pane>
      <el-tab-pane label="Group" name="activegroup"> </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data: () => ({
    activeName: "activestudent",
    subjects: [
      {
        title: "Class 4",
        value: "Class 4",
      },
      {
        title: "Science",
        value: "Science",
      },
      {
        title: "Hindi",
        value: "Hindi",
      },
      {
        title: "Social Science",
        value: "Social Science",
      },
      {
        title: "English",
        value: "English",
      },
      {
        title: "French",
        value: "French",
      },
    ],
    studentBtn: true,
    teacherBtn: true,
    managementBtn: false,
    schoolBtn: false,
    createProfile:true,
  }),
  methods: {
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
</style> -->


<!-- need to confirm changes -->



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
      <selection-card :users="customAudience" :audience="audience" @input="handleCustomSelect" @deselect="deselectCustomSelect" />
      <el-col>
        <el-pagination @current-change="currentPage" @size-change="sizeChange" @prev-click="previousClick" @next-click="nextClick" background layout="prev, pager, next" style="text-align: center" :total="50" />
      </el-col>
    </e-dialog>
    <el-tabs class="floatTabHeader border-section" v-model="activeName" >
      <el-tab-pane label="Student" name="student">
        <el-row>
          <el-col :span="6">
            <div style="font-weight: bold">Standard</div>
            <el-col span="17" >
              <!-- <el-select v-model="section" @change="getStudents(section)" class="select-dropdown" > -->
              <el-select v-model="section" @change="getStudents(section)">
                <el-option v-for="item in sections" :key="item.id" :label="item.standard.name + ' ' + item.name" :value="item.id" />
              </el-select>
            </el-col >
          </el-col>
          <el-col :span="12">
            <div style="margin-bottom: 10px; font-weight: bold">
              Audience selection
            </div>
            <el-row>
              <el-col :span="10">
                <el-card shadow="none" style="margin-right: 20px" class="rounded-08 elimeny" >
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
                    All the Non-Teaching staff
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
        <el-row style="border-top: 1px solid #fcdfbd;margin-top: 20px;padding-bottom: 15px;">
          <el-col class="float-right" :span="10">
            <e-button :span="15" label="Cancel" width="180" css="cancel_btn" type="default" class="p-45" ></e-button>
            <e-button :span="8" label="Proceed" width="180" css="float-right" class="p-45" @click="createAudience()" ></e-button>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import selectionCard from "@/components/school/EventCalender/selectionCard.vue"
import { dispatchGraphql } from '@/api/dispatcher'
export default {
  components: { selectionCard },
  props: {
    roomId: {
      type: String,
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
  data() {
    return {
      dialog: false,
      audience: [],
      students: [],
      section: {},
      activeName: "student",
      studentBtn: true,
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
      // teacherBtn: true,
      // managementBtn: false,
      // schoolBtn: false,
      // createProfile: true
      // customAudience: []
    }
  },
  created() {
    console.log('audience', this.teachers, this.management, this.non_teaching)
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
    getAudience() {
      return {
        "objects": this.audience
      }
    },
    createAudience() {
      console.log('eeeeeeeeeeeeeee', this.audience);
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
    handleClick() {
      console.log(this.req);
      this.$emit("save", this.req)
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
      })
    },
    studentAudience() {
      this.students.map(x => {
        this.audience.push({
          user_id: x.id,
          room_id: this.roomId
        })
      })
      this.$notify({
        type: 'success',
        title: 'Saved'
      })
      console.log('studentaud', this.audience)
    },
    teacherAudience() {
      this.teachers.map(x => {
        this.audience.push({
          user_id: x.id,
          room_id: this.roomId
        })
      })
      this.$notify({
        type: 'success',
        title: 'Saved'
      })
      console.log('teacheraud', this.audience)
    },
    managementAudience() {
      this.management.map(x => {
        this.audience.push({
          user_id: x.id,
          room_id: this.roomId
        })
      })
      this.$notify({
        type: 'success',
        title: 'Saved'
      })
      console.log('managementaud', this.audience)
    },
    nonTeachAudience() {
      this.non_teaching.map(x => {
        this.audience.push({
          user_id: x.id,
          room_id: this.roomId
        })
      })
      this.$notify({
        type: 'success',
        title: 'Saved'
      })
      console.log('Nonteachaud', this.audience)
    },
    handleCustomSelect(val) {
      this.audience.push({
        user_id: val.id,
        room_id: this.roomId
      })
      console.log('handleCustomSelect', this.audience)
    },
    deselectCustomSelect(val) {
      const user = this.audience.filter(x => x.id === val.id)[0]
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
    }
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
