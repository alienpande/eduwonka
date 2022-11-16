<template>
  <div style="margin-top: 30px">
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
      <el-row :gutter="20" style="margin-bottom: 15px" class="searchCard">
        <el-col :span="6" style="font-size: 18px; font-weight: bold; padding-left: 20px">
          {{ customAudience.length }} Students
        </el-col>
        <!-- <el-col :span="4"  class="primary-text"> -->
          <e-button :span="4" label="Deselect All" style="margin-left:auto" css="cancel_btn" @click="deselectCustom" />
        <!-- </el-col> -->
        <!-- <el-col :span="4"> -->
          <e-button :span="10" label="Done" width="100" @click="dialog = false"></e-button>
        <!-- </el-col> -->
      </el-row>
      <selection-card :users="customAudience" :audience="audience" @input="handleCustomSelect" @deselect="deselectCustomSelect" />
      <el-col>
        <el-pagination background layout="prev, pager, next" style="text-align: center" :total="50" />
      </el-col>
    </e-dialog>
    <div style="width: 45%; margin: auto" class="sm-width-100">
      <div style="margin-bottom: 10px; font-weight: bold">
        Audience selection
      </div>
      <div style="display:flex; row-gap: 10px;" class="view-no-form">
        <div>
          <el-card shadow="none" style="margin-right: 20px; width: 201px" class="rounded-08 elimeny">
            <div style="display: flex"  @click="studentAudience()">
              <e-svg style="margin-right: 10px" icon="AllStudents" /> All the students of the class
            </div>
          </el-card>
        </div>
        <div>
          <div @click="handleCustomAudience">
            <el-card shadow="none" style="width: 226px" class="rounded-08 elimeny">
              <div style="display: flex">
                <e-svg style="margin-right: 10px" icon="customselection" /> Make a custom selection
              </div>
            </el-card>
          </div>
        </div>
      </div>
      <div style="display: inline-flex; margin-top: 10px">
        <e-svg icon="Group" />
        <div :style="'margin-left: 11px;opacity: 0.4;font-size: 14px;padding-right: 20px;'">
          I got it working as a custom head script but I am not sure how to
          get the window object call working.
        </div>
      </div>
    </div>
    <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px;padding-bottom:15px" class="form-last-buttons">
      <!-- <el-col style="float: right" :span="9"> -->
        <e-button :span="15" label="Cancel" width="180" css="cancel_btn" type="default" class="p-45" />
        <e-button :span="8" label="Create test" width="180" @click="handleClick" css="float-right" class="p-45" />
      <!-- </el-col> -->
    </el-row>
  </div>
</template>
<script>
import { dispatchGraphql } from '@/api/dispatcher'
import selectionCard from "@/components/school/EventCalender/selectionCard.vue"
export default {
  components: { selectionCard },
  props: {
    quickTest: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    customAudience: [],
    dialog: false,
    students: [],
    audience: [],
  }),
  created() {
    this.getStudents()
  },
  methods: {
    getStudents() {
      const query = `query {
        sections(where: {standard_id: {_eq: "${this.$route.params.standard_id}"}}) {
          section_students {
            id
            first_name
          }
        }
      }`
      dispatchGraphql(query).then(response => {
        const students = response.sections.map(x => x.section_students)
        this.students = students[0]
        console.log('studnet', this.students)
      })
    },
    handleCustomAudience() {
      this.customAudience = []
      this.customAudience = this.students
      this.dialog = true
    },
    studentAudience() {
      this.audience = [];
      this.students.map(x => {
        this.audience.push({
          user_id: x.id
        })
      })
      this.$notify({
        type: 'success',
        title: 'Successfully Saved'
      })
      console.log('studentaud', this.audience)
    },
    handleCustomSelect(val) {
      this.audience.push({
        user_id: val.id
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
      this.audience = []
      console.log('aud', this.audience)
    },
    handleClick() {
      const audienceData = this.audience
      audienceData.forEach((v) => {
        (v.status = "ASSIGNED"),
        (v.form_id = this.quickTest.id)
      });
      console.log(audienceData);
      const obj = {objects: audienceData}
      const query = `mutation insert_multiple_form_results($objects: [form_results_insert_input!]! ) {
        insert_form_results(objects: $objects) {
          returning {
            id
          }
        }
      }`
      dispatchGraphql(query, obj).then((response) => {
        console.log("3 nd tab", response)
        this.$emit("save")
      });
    }
  }
};
</script>
<style>
.elimeny:hover {
  border: 1px solid #bc6c42;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  color: #bc6c42;
  cursor: pointer;
}
</style>
