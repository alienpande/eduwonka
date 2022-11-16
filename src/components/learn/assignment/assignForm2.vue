<template>

  <div style="margin-top: 30px">
    
    <el-row class="form-type-3">
      <el-col :span="6" >
        <e-date-picker
          style='margin-left:130px'
          v-model="assignmentId.due_date"
          placeholder="Class Date"
          label="Set due date"
          @change="changeDate"
        ></e-date-picker>
      </el-col>
      <el-col :span="11" :offset="1">
        <div style="width: 65%; margin: auto; padding-top: 10px;">
          <div style="margin-bottom: 10px; font-weight: bold">
            Audience selection
          </div>
          <div style="display: flex" class="view-no-form">
            <div>
              <el-card
                shadow="none"
                style="margin-right: 20px; width: 201px"
                class="rounded-08 elimeny"
              >
                <div style="display: flex" @click="classAudience()">
                  <e-svg style="margin-right: 10px" icon="AllStudents" /> All
                  the students of the class
                </div>
              </el-card>
            </div>

            <div>
              <div @click="dialog= true">
                <el-card
                  shadow="none"
                  style="width: 226px"
                  class="rounded-08 elimeny"
                >
                  <div style="display: flex">
                    <e-svg style="margin-right: 10px" icon="customselection" />
                    All Make a custom selection
                  </div>
                </el-card>
              </div>
            </div>
          </div>
          <div style="display: inline-flex; margin-top: 10px">
            <e-svg icon="Group" />
            <div
              style="
                margin-left: 11px;
                opacity: 0.4;
                font-size: 14px;
                padding-right: 20px;
              "
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu venenatis tellus. Fusce faucibus est vitae facilisis consectetur.
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <e-dialog :title="'Custom audience selection '" v-if ="dialog === true" v-model="dialog" width="60%" top="20vh" noEsc :gutter="20" hideDefaultFooter @cancel="dialog = false" @confirm="dialog = false">
      <el-col :span="24" style="margin-bottom: 20px; margin-top: -30px; padding-bottom: 20px; font-size: 12px; display: flex; justify-content: space-between; border-bottom: 2px solid rgb(252, 223, 189);">
        <div style="width: 350px; opacity: 0.6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu
          venenatis tellus. Fusce faucibus est vitae facilisis consectetur.
        </div>
        <div>
          <e-button icon="el-icon-search" :plain="true" size="small" type="primary"></e-button>
        </div>
      </el-col>
      <el-row :gutter="20" class="searchCard" style="margin-bottom: 15px;  top: 0; right: 0;" >
        <el-col :span="6" style="font-size: 18px; font-weight: bold; padding-left: 20px">
          {{ students.length }} Students
        </el-col>
          <e-button :span="4" label="Deselect All" style="margin-left:auto" css="cancel_btn" @click="deselectCustom" />
          <e-button :span="10" label="Done" width="100" @click="dialog = false"></e-button>
      </el-row>
      <selection-card  :users="students" :audience="audience" @input="handleCustomSelect" @deselect="deselectCustomSelect" />
      <el-col>
        <el-pagination background layout="prev, pager, next" style="text-align: center" :total="50" />
      </el-col>
    </e-dialog>
    <el-row
      style="
        border-top: 1px solid #fcdfbd;
        margin-top: 20px;
        padding-bottom: 15px;
      "
      class="form-last-buttons"
    >
      <!-- <el-col style="float: right" :span="9"> -->
        <e-button
          :span="15"
          label="Cancel"
          width="180"
          css="cancel_btn"
          type="default"
          class="p-45"
        ></e-button>
        <e-button
          :span="8"
          label="Create assignment"
          @click ="handleClick"
          width="200"
          css="float-right"
          class="p-45"
        ></e-button>
      <!-- </el-col> -->
    </el-row>
  </div>
</template>
<script>
import  selectionCard from "@/components/learn/assignment/selectionCard.vue"
import {  dispatchGraphql , dispatchGraphqlMutation } from "@/api/dispatcher";
import moment from 'moment'
export default {
  components: { selectionCard },
  props: {
    assignmentId: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    assignment: {},
    sectionIds: [],
    students: [],
    req: {},
    dialog: "false",
    usersIds: [],
    audience: [],
    requiredParts: [],
     mutation: `mutation insert_multiple_audience($objects: [audiences_insert_input!]! ) {
      insert_audiences(objects: $objects) {
        returning {
          id
          audienceable_id
        }
      }
    }`,
  }),
  methods: {
    handleCustomSelect(val) {
      this.audience.push({
        user_id: val.id,
        audienceable_type: 'Assignment',
        status: 'pending',
        user_type: "student"
      })
      console.log('handleCustomSelect', this.audience)
    },
    getStudentsSections() {
      const query = `query($id:uuid!) {
        standards(where:{id:{_eq:$id}}){
          standard_sections {
            id
          }
        }
      }`
      dispatchGraphql(query, {id:this.$route.params.standard_id}).then((response) => {
        console.log(dispatchGraphql)
        // this.sectionIds = response.standards
        for (const standard of response.standards) {
          this.sectionIds = standard.standard_sections.map(x => x.id)
        }
        console.log('sectionIds', this.sectionIds)
        this.getStudents(this.sectionIds)
      })
    },
    getStudents(val) {
      const studentQuery =`query($secIds:[uuid!]!) {
        users(where: {section_id: {_in: $secIds}}) {
          id
          first_name
        }
      }`
      dispatchGraphql(studentQuery, { secIds: val }).then((response) => {
        console.log("jkajklghajkghjkasfgjkhasfjklghjkg")
        this.usersIds= response.users.map(x => x.id)
        this.students = response.users
        console.log("students name", this.students, this.usersIds)
        console.log("i am user ids", this.usersIds)
      })
    },
    classAudience() {
      console.log("in class audience")
      this.usersIds.map(x => {
        this.audience.push({
          user_id: x,
          audienceable_type: 'Assignment',
          status: 'pending',
          user_type: 'student'
        })
      })
      console.log("audience", this.audience)
    },
    changeDate(value) {
      this.assignmentId.due_date = moment(value).format('')
      console.log(this.assignmentId.due_date)
    },
    deselectCustom() {
      this.audience.length= 0
      console.log("audience strength", this.audience)
    },
    handleClick() {
      dispatchGraphqlMutation('assignments', ['id', 'name','required_parts','due_date'], this.getVariables()).then((response) => {
        this.assignment = response.insert_assignments_one
        console.log("show", response, this.assignment.id);
        this.insertAud(this.assignment.id)
      }) 
      this.$router.push(this.$url.LN_ASSIGNMENTS + '/standard/' + this.$route.params.standard_id+'/subject/'+ this.$route.params.subject_id)
    },
    insertAud(id) {
      console.log("i am in insert audience" , id)
      dispatchGraphql(this.mutation, this.getFilterVariables(this.audience, id)).then((response) => {
        console.log("i am in audience dispatch")
        console.log("dispatch", response)     
      })
    },
    getFilterVariables(audience,val) {
      console.log( "getfilter",val, audience)
      audience.forEach(object => {
        object.audienceable_id = val;
      })
      return { "objects": audience }
    },
    deselectCustomSelect(val) {
      const user = this.audience.filter(x => x.user_id === val.id)[0]
      const index = this.audience.indexOf(user)
      this.audience.splice(index, 1)
      console.log('custom deselected in form 2', this.audience)
    },
    getVariables() {
      console.log("sakgj", this.assignmentId)
      this.requiredParts =[],
      this.requiredParts = this.assignmentId.required_parts
      this.assignmentId.required_parts = '{' + (this.requiredParts || []).map(x => x).join(',') + '}' 
      console.log("assignment in form 2", this.assignmentId.required_parts)
      return this.assignmentId
    },
  },
  created() {
    this.getStudentsSections()
    console.log("asdjhjkas", this.assignmentId)
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

</style>
