<template>
  <div class="student-tab" :style="window.width > 767 ? 'padding: 0 100px; margin-top: 100px' : 'padding: 0; margin-top: 60px;'">
    <el-tabs class="floatTabHeader border-section" v-model="activeName" >
      <el-tab-pane label="Student" name="activestudent">
       <el-row>
          <el-col :span="10">
            <div style="font-weight: bold">Standard</div>
            <el-col :span="window.width > 767 ? 17 : 24">
              <el-select v-model="section" @change="getStudents(section)">
                <el-option v-for="item in sections" :key="item.id" :label="item.standard.name + ' ' + item.name" :value="item.id" />
              </el-select>
            </el-col >
          </el-col>
          <el-col :span="window.width > 767 ? 14 : 24">
            <div :style="window.width > 767 ? 'margin-bottom: 10px; font-weight: bold' : 'margin: 10px 0; font-weight: bold;'">
              Audience selection
            </div>
            <el-row>
              <el-col :span="11">
                <el-card shadow="none" style="margin-right: 20px" class="rounded-08 elimeny" >
                  <div style="display: flex" @click="studentAudience()">
                    <e-svg style="margin-right: 10px" icon="AllStudents" />
                    All the students of the class
                  </div>
                </el-card>
              </el-col>

              <el-col :span="11" :offset="1">
                <div @click="addStudentDialog = true">
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
        <e-dialog
          :title="'Custom audience selection '"
          v-model="addStudentDialog"
          width="60%"
          top="20vh"
          noEsc
          :gutter="20"
          hideDefaultFooter
          @cancel="addStudentDialog = false"
          @confirm="addStudentDialog = false"
        >
          <el-col
            :span="24"
            style="
              margin-bottom: 20px;
              margin-top: -30px;
              padding-bottom: 20px;
              font-size: 12px;
              display: flex;
              justify-content: space-between;
              border-bottom: 2px solid rgb(252, 223, 189);
            "
          >
            <div style="width: 350px; opacity: 0.6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu
              venenatis tellus. Fusce faucibus est vitae facilisis consectetur.
            </div>
            <div>
              <e-button
                icon="el-icon-search"
                :plain="true"
                size="small"
                type="primary"
              ></e-button>
            </div>
          </el-col>
          <el-row :gutter="20" style="margin-bottom: 15px">
            <el-col
              :span="6"
              style="font-size: 18px; font-weight: bold; padding-left: 20px"
              >
              {{students.length}} student
            </el-col>
            <el-col :span="4"></el-col>
            <el-col :span="4" :offset="10" class="primary-text">
              <e-button
                :span="4"
                label="Deselect All"
                width="100"
                css="cancel_btn"
              ></e-button>
            </el-col>
            <el-col :span="4">
              <e-button :span="10" label="Done" width="100" @click="addStudentDialog = false"></e-button>
            </el-col>
          </el-row>
          <selection-card
            :users="students"
            @input="handleCustomSelect"
          />
          <el-col>
            <el-pagination
              @current-change="currentPage"
              @size-change="sizeChange"
              @prev-click="previousClick"
              @next-click="nextClick"
              background
              layout="prev, pager, next"
              style="text-align: center"
              :total="50"
            >
            </el-pagination>
          </el-col>
        </e-dialog>
        <el-row class="text-right" :style="window.width > 767 ? 'border-top: 1px solid #fcdfbd;margin-top: 20px;' : 'border-top: 1px solid #fcdfbd;margin-top: 20px; padding-top: 20px;'">
          <e-button :span="window.width > 767 ? 17 : 12" label="Cancel" width="180" type="text" :class="window.width > 767 ? 'p-45 cancel-button-margin' : ''" />
          <e-button :span="window.width > 767 ? 3 : 12" label="Next" width="180" css="float-right" :class="window.width > 767 ? 'p-45' : ''" @click="activeName = 'activeteacher'" ></e-button>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Teacher" name="activeteacher"> 
        <el-row>
          <el-col :span="6" v-if="window.width > 767">&emsp;&emsp;</el-col>
          <el-col :span="window.width > 767 ? 12 : 24">
            <div style="margin-bottom: 10px; font-weight: bold">
              Audience selection
            </div>
            <el-row>
              <el-col :span="11">
                <el-card shadow="none" style="margin-right: 20px" class="rounded-08 elimeny" >
                  <div style="display: flex" @click="teacherAudience()">
                    <e-svg style="margin-right: 10px" icon="AllStudents" />
                    All the Teachers
                  </div>
                </el-card>
              </el-col>

              <el-col :span="11" :offset="1">
                <div @click="addStudentDialog = true">
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
        <e-dialog
          :title="'Custom audience selection '"
          v-model="addStudentDialog"
          width="60%"
          top="20vh"
          noEsc
          :gutter="20"
          hideDefaultFooter
          @cancel="addStudentDialog = false"
          @confirm="addStudentDialog = false"
        >
          <el-col
            :span="24"
            style="
              margin-bottom: 20px;
              margin-top: -30px;
              padding-bottom: 20px;
              font-size: 12px;
              display: flex;
              justify-content: space-between;
              border-bottom: 2px solid rgb(252, 223, 189);
            "
          >
            <div style="width: 350px; opacity: 0.6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu
              venenatis tellus. Fusce faucibus est vitae facilisis consectetur.
            </div>
            <div>
              <e-button
                icon="el-icon-search"
                :plain="true"
                size="small"
                type="primary"
              ></e-button>
            </div>
          </el-col>
          <el-row :gutter="20" style="margin-bottom: 15px">
            <el-col
              :span="6"
              style="font-size: 18px; font-weight: bold; padding-left: 20px"
              >
              {{teachers.length}} Teacher
            </el-col>
            <el-col :span="4"></el-col>
            <el-col :span="4" :offset="10" class="primary-text">
              <e-button
                :span="4"
                label="Deselect All"
                width="100"
                css="cancel_btn"
              ></e-button>
            </el-col>
            <el-col :span="4">
              <e-button :span="10" label="Done" width="100" @click="addStudentDialog = false"></e-button>
            </el-col>
          </el-row>
          <selection-card
            :users="teachers"
            @input="handleCustomSelect"
          />
          <el-col>
            <el-pagination
              @current-change="currentPage"
              @size-change="sizeChange"
              @prev-click="previousClick"
              @next-click="nextClick"
              background
              layout="prev, pager, next"
              style="text-align: center"
              :total="50"
            >
            </el-pagination>
          </el-col>
        </e-dialog>
       
        <el-row class="text-right" :style="window.width > 767 ? 'border-top: 1px solid #fcdfbd;margin-top: 20px;' : 'border-top: 1px solid #fcdfbd;margin-top: 20px; padding-top: 20px;'">
          <e-button :span="window.width > 767 ? 17 : 12" label="Cancel" width="180" type="text" :class="window.width > 767 ? 'p-45 cancel-button-margin' : ''" />
          <e-button :span="window.width > 767 ? 3 : 12" label="Next" width="180" css="float-right" :class="window.width > 767 ? 'p-45' : ''" @click="activeName = 'activemanagement'" ></e-button>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Management" name="activemanagement"> 
        <el-row>
          <el-col :span="6" v-if="window.width > 767">&emsp;&emsp;</el-col>
          <el-col :span="window.width > 767 ? 12 : 24">
            <div style="margin-bottom: 10px; font-weight: bold">
              Audience selection
            </div>
            <el-row>
              <el-col :span="11">
                <el-card shadow="none" style="margin-right: 20px" class="rounded-08 elimeny" >
                  <div style="display: flex" @click="managementAudience()">
                    <e-svg style="margin-right: 10px" icon="AllStudents" />
                    All the Management
                  </div>
                </el-card>
              </el-col>

              <el-col :span="11" :offset="1">
                <div @click="addStudentDialog = true">
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
        <e-dialog
          :title="'Custom audience selection '"
          v-model="addStudentDialog"
          width="60%"
          top="20vh"
          noEsc
          :gutter="20"
          hideDefaultFooter
          @cancel="addStudentDialog = false"
          @confirm="addStudentDialog = false"
        >
          <el-col
            :span="24"
            style="
              margin-bottom: 20px;
              margin-top: -30px;
              padding-bottom: 20px;
              font-size: 12px;
              display: flex;
              justify-content: space-between;
              border-bottom: 2px solid rgb(252, 223, 189);
            "
          >
            <div style="width: 350px; opacity: 0.6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu
              venenatis tellus. Fusce faucibus est vitae facilisis consectetur.
            </div>
            <div>
              <e-button
                icon="el-icon-search"
                :plain="true"
                size="small"
                type="primary"
              ></e-button>
            </div>
          </el-col>
          <el-row :gutter="20" style="margin-bottom: 15px">
            <el-col
              :span="6"
              style="font-size: 18px; font-weight: bold; padding-left: 20px"
              >
              {{management.length}} management
            </el-col>
            <el-col :span="4"></el-col>
            <el-col :span="4" :offset="10" class="primary-text">
              <e-button
                :span="4"
                label="Deselect All"
                width="100"
                css="cancel_btn"
              ></e-button>
            </el-col>
            <el-col :span="4">
              <e-button :span="10" label="Done" width="100" @click="addStudentDialog = false"></e-button>
            </el-col>
          </el-row>
          <selection-card
            :users="management"
            @input="handleCustomSelect"
          />
          <el-col>
            <el-pagination
              @current-change="currentPage"
              @size-change="sizeChange"
              @prev-click="previousClick"
              @next-click="nextClick"
              background
              layout="prev, pager, next"
              style="text-align: center"
              :total="50"
            >
            </el-pagination>
          </el-col>
        </e-dialog>
        <el-row class="text-right" :style="window.width > 767 ? 'border-top: 1px solid #fcdfbd;margin-top: 20px;' : 'border-top: 1px solid #fcdfbd;margin-top: 20px; padding-top: 20px;'">
          <e-button :span="window.width > 767 ? 17 : 12" label="Cancel" width="180" type="text" :class="window.width > 767 ? 'p-45 cancel-button-margin' : ''" />
          <e-button :span="window.width > 767 ? 3 : 12" label="Next" width="180" css="float-right" :class="window.width > 767 ? 'p-45' : ''" @click="activeName = 'activeno'" ></e-button>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Non - teaching staff" name="activeno"> 
        <el-row>
          <el-col :span="6" v-if="window.width > 767">&emsp;&emsp;</el-col>
          <el-col :span="window.width > 767 ? 12 : 24">
            <div style="margin-bottom: 10px; font-weight: bold">
              Audience selection
            </div>
            <el-row>
              <el-col :span="11">
                <el-card shadow="none" style="margin-right: 20px" class="rounded-08 elimeny" >
                  <div style="display: flex" @click="nonTeachAudience()">
                    <e-svg style="margin-right: 10px" icon="AllStudents" />
                    All the Non-Teaching staff
                  </div>
                </el-card>
              </el-col>

              <el-col :span="11" :offset="1">
                <div @click="addStudentDialog = true">
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
        <e-dialog
          :title="'Custom audience selection '"
          v-model="addStudentDialog"
          width="60%"
          top="20vh"
          noEsc
          :gutter="20"
          hideDefaultFooter
          @cancel="addStudentDialog = false"
          @confirm="addStudentDialog = false"
        >
          <el-col
            :span="24"
            style="
              margin-bottom: 20px;
              margin-top: -30px;
              padding-bottom: 20px;
              font-size: 12px;
              display: flex;
              justify-content: space-between;
              border-bottom: 2px solid rgb(252, 223, 189);
            "
          >
            <div style="width: 350px; opacity: 0.6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu
              venenatis tellus. Fusce faucibus est vitae facilisis consectetur.
            </div>
            <div>
              <e-button
                icon="el-icon-search"
                :plain="true"
                size="small"
                type="primary"
              ></e-button>
            </div>
          </el-col>
          <el-row :gutter="20" style="margin-bottom: 15px">
            <el-col
              :span="6"
              style="font-size: 18px; font-weight: bold; padding-left: 20px"
              >
              {{staff.length}} staff
            </el-col>
            <el-col :span="4"></el-col>
            <el-col :span="4" :offset="10" class="primary-text">
              <e-button
                :span="4"
                label="Deselect All"
                width="100"
                css="cancel_btn"
              ></e-button>
            </el-col>
            <el-col :span="4">
              <e-button :span="10" label="Done" width="100" @click="addStudentDialog = false"></e-button>
            </el-col>
          </el-row>
          <selection-card
            :users="staff"
            @input="handleCustomSelect"
          />
          <el-col>
            <el-pagination
              @current-change="currentPage"
              @size-change="sizeChange"
              @prev-click="previousClick"
              @next-click="nextClick"
              background
              layout="prev, pager, next"
              style="text-align: center"
              :total="50"
            >
            </el-pagination>
          </el-col>
        </e-dialog>
        <el-row class="text-right" :style="window.width > 767 ? 'border-top: 1px solid #fcdfbd;margin-top: 20px;' : 'border-top: 1px solid #fcdfbd;margin-top: 20px; padding-top: 20px;'">
          <e-button :span="window.width > 767 ? 17 : 12" label="Cancel" width="180" type="text" :class="window.width > 767 ? 'p-45 cancel-button-margin' : ''" />
          <e-button :span="window.width > 767 ? 3 : 12" label="Next" width="180" css="float-right" :class="window.width > 767 ? 'p-45' : ''" @click="activeName = 'activegroup'" ></e-button>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Group" name="activegroup">
           <el-row>
          <el-col :span="window.width > 767 ? 6 : 24">
            <div style="font-weight: bold">Group</div>
            <e-select :span="17" :options="subjects"></e-select>
          </el-col>
          <el-col :span="window.width > 767 ? 12 : 24">
            <div :style="window.width > 767 ? 'margin-bottom: 10px; font-weight: bold' : 'margin: 20px 0; font-weight: bold'">
              Audience selection
            </div>
            <el-row>
              <el-col :span="11">
                <el-card
                  shadow="none"
                  style="margin-right: 20px"
                  class="rounded-08 elimeny"
                >
                  <div style="display: flex">
                    <e-svg style="margin-right: 10px" icon="AllStudents" />
                    All the member of group Admin
                  </div>
                </el-card>
              </el-col>

              <el-col :span="11" :offset="1">
                <div @click="addStudentDialog = true">
                  <el-card shadow="none" class="rounded-08 elimeny">
                    <div style="display: flex">
                      <e-svg style="margin-right: 10px" icon="customselection" />
                      Make a new Group
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
      
        <el-row class="text-right" :style="window.width > 767 ? 'border-top: 1px solid #fcdfbd;margin-top: 20px;' : 'border-top: 1px solid #fcdfbd;margin-top: 20px; padding-top: 20px;'">
          <e-button :span="window.width > 767 ? 17 : 12" label="Cancel" width="180" type="text" :class="window.width > 767 ? 'p-45 cancel-button-margin' : ''" />
          <e-button :span="window.width > 767 ? 3 : 12" label="Create Task" width="180" css="float-right" :class="window.width > 767 ? 'p-45' : ''" @click="handleClick" ></e-button>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import selectionCard from "@/components/finance/task/selectionCard.vue"
import { dispatchGraphql } from '@/api/dispatcher'
import screenSize from '@/mixins/screenSize'
export default {
  components: { selectionCard },
  mixins: [screenSize],
  props: {
    taskid: {
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
    staff: {
      type: Array,
      default() {
        return null
      }
    }
  },
  data: () => ({
    addStudentDialog: false,
    activeName: "activestudent",
    audience: [],
    students: [],
    section: {},
    subjects: [
      {
        title: "Mathematics",
        value: "Mathematics",
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
    mutation: `mutation insert_multiple_audience($objects: [audiences_insert_input!]! ) {
      insert_audiences(objects: $objects) {
        returning {
          id
        }
      }
    }`,
    studentBtn: true,
    teacherBtn: true,
    managementBtn: false,
    schoolBtn: false,
    createProfile:true,
  }),
  methods: {
    handleCustomSelect(val) {
      this.audience.push({
        user_id: val.id,
        audienceable_id: this.taskid,
        audienceable_type: 'Task',
        status: 'pending',
        user_type: val.role
      })
      console.log('handleCustomSelect', this.audience)
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
        console.log("stude", this.students)
      })
    },
    studentAudience() {
      this.students.map(x => {
        this.audience.push({
          user_id: x.id,
          audienceable_id: this.taskid,
          audienceable_type: 'Task',
          status: 'pending',
          user_type: 'student'
        })
      })
    },
    teacherAudience() {
      this.teachers.map(x => {
        this.audience.push({
          user_id: x.id,
          audienceable_id: this.taskid,
          audienceable_type: 'Task',
          status: 'pending',
          user_type: 'teacher'
        })
      })
      console.log('teach', this.audience)
    },
    managementAudience() {
      this.management.map(x => {
        this.audience.push({
          user_id: x.id,
          audienceable_id: this.taskid,
          audienceable_type: 'Task',
          status: 'pending',
          user_type: 'management'
        })
      })
      console.log('management',this.audience)
    },
    nonTeachAudience() {
      this.staff.map(x => {
        this.audience.push({
          user_id: x.id,
          audienceable_id: this.taskid,
          audienceable_type: 'Task',
          status: 'pending',
          user_type: 'staff'
        })
      })
      console.log('staff',this.audience)
    },
    getFilterVariables() {
      console.log(this.audience)
      return { "objects": this.audience }
    },  
    handleClick() {
      dispatchGraphql(this.mutation, this.getFilterVariables()).then((response) => {
        console.log("dispatch", response)     
      })
      console.log(this.req)
      this.$router.push(this.$url.FI_TASK)    
    },
  },
  created (){}
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
@media only screen and (device-width: 768px) {
  .cancel-button-margin {
    margin-right: 57px;
  }
}
</style>