<template>
  <e-container pageTitle="Create Exam" class="school-add-exam whole-form-container">
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <el-form :model="exam" ref="form" :rules="rules">
      <el-row>
        <el-col :span="8">
          <el-form-item label="Name of the Exam" prop="name">
            <e-input v-model="exam.name" placeholder="Enter name" rules="required" />
          </el-form-item>
        </el-col>
        <el-col v-if="!checkboxchecked" class="pd-tb-20 remove-padding" :span="6">
          <el-form-item label="Start Date" prop="start_date"><br>
            <e-date-picker v-model="exam.start_date" type="date" @change="changeDate" format="MM/dd/yyyy" placeholder="Pick a Date" rules="required" />
          </el-form-item>
        </el-col>
        <el-col style="margin-top:52px" :span="5" :offset="1">
          <e-checkbox  text="Keep the date tentative" v-model="checkboxchecked" rules="required" />
        </el-col>
      </el-row>

      <el-row class="mt-20">
        <el-col :span="6">
          <el-form-item label="standard" prop="standard_id">
            <e-input :value="standardData.name" rules="required" />
          </el-form-item>
          <el-col :span="24" class="exam-flex">
          <el-row>
            <el-col class="ml-16" :span="4">
              <img src="@/assets/icons/svg/school/alert.svg" width="20" height="20" alt="" />
            </el-col>
            <el-col class="ml-20" :span="20">
              The standard is default chosen from you left navigation selection
            </el-col>
          </el-row>
        </el-col>
        </el-col>
        <el-col class="m-tb-20" :span="6">
          <el-form-item label="Subject" prop="subject_id">
            <e-input :value="subjectData.name" rules="required" />
          </el-form-item>
          <el-col :span="24" class="exam-flex">
          <el-row>
            <el-col :span="4">
              <img src="@/assets/icons/svg/school/alert.svg" width="20" height="20" alt="" />
            </el-col>
            <el-col class="ml-20" :span="20">
              The standard is default chosen from you left navigation selection
            </el-col>
          </el-row>
        </el-col>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Exam Type" prop="exam_type_id"><br>
            <el-select v-model="exam.exam_type_id" placeholder="Pick Exam Type" rules="required" style="margin-top:5px">
              <el-option v-for="item in examData" :key="item.id" :label="item.name" :value="item.id" rules="required">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- <el-row>
        <el-col :span="6" class="exam-flex">
          <el-row>
            <el-col :span="4">
              <img src="@/assets/icons/svg/school/alert.svg" width="20" height="20" alt="" />
            </el-col>
            <el-col class="ml-20" :span="20">
              The standard is default chosen from you left navigation selection
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="6" class="exam-flex">
          <el-row>
            <el-col class="ml-16" :span="4">
              <img src="@/assets/icons/svg/school/alert.svg" width="20" height="20" alt="" />
            </el-col>
            <el-col class="ml-20" :span="20">
              The standard is default chosen from you left navigation selection
            </el-col>
          </el-row>
        </el-col>
      </el-row> -->

      <el-row class="mt-20">
        <el-col :span="6">
          <!-- <e-select :options="userData" label="Invigilator" primary /> -->
          <el-form-item label="Invigilator" prop="invigilator_id">
            <el-select v-model="exam.invigilator_id" placeholder="Pick a Invigilator" rules="required">
              <el-option v-for="item in userData" :key="item.id" :label="item.first_name" :value="item.id" rules="required">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <hr class="end-of-form-line">

      <el-row class="form-last-buttons" style="justify-content:flex-end">
        <e-button @click="$go($url.SH_EXAM)" :span="12" label="Cancel" plain />
        <e-button @click="handleSubmit(handleClick('form'))" :span="12" label="Create Exam" primary />
      </el-row>
    </el-form>
    </ValidationObserver>
  </e-container>
</template>


<script>
import { dispatchGraphql } from "@/api/dispatcher"
import eCheckbox from "@/controls/eCheckbox.vue"
import moment from "moment"
export default {
  components: { eCheckbox },
  props: ['list','this.standard_id','this.subject_id'],
  data() {
    return {
      exam: {},
      userData:[],
      examData:[],
      standardData: [],
      subjectData: [],
      checkboxchecked: false,
      mutation:` mutation insert_single_exams($object: exams_insert_input! ) {
        insert_exams_one(object: $object) {
          id
          exam_type_id
          invigilator_id
          standard_id
          subject_id
          start_date
          name
        }
      }`,
      getUsersQuery: `query MyQuery {
        users(where: {role: {_eq: "teacher"}}) {
          id
          first_name
          last_name
          
        }
      }`,
      getExamQuery: `query MyQuery {
        exam_types {
          id
          name
        }
      }`,
      getStandardQuery: `query MyQuery($id: uuid!) {
        standards_by_pk(id: $id) {
          id
          name
        }
      }`,
      getSubjectQuery: `query MyQuery($id: uuid!) {
        subjects_by_pk(id: $id) {
          id
          name
        }
      }`,
      rules: {
        name: [
          { required: true, message: 'Please give name', trigger: 'blur' }
        ],
        exam_type_id: [
          { required: true, message: 'Select Exam Type', trigger: 'blur' }
        ],
        invigilator_id: [
          { required: true, message: 'Select Invigilator', trigger: 'blur' }
        ],
        standard_id: [
          { required: true, message: 'Select Standard', trigger: 'blur' }
        ],
        subject_id: [
          { required: true, message: 'Select Subject', trigger: 'blur' }
        ]
      }
    };
  },
   created() {  
    this.getUsersData()
    this.getExamData()
    this.getStandardData()
    this.getSubjectData()
    this.exam.standard_id = this.$route.params.standardId
    this.exam.subject_id = this.$route.params.subjectId
  },
  computed: {
    isValid () {
      return this.exam.name && this.exam.start_date && this.exam.exam_type_id && this.exam.invigilator_id;
    }
  },
   methods: {
    getFilterVariables: function() {
      return {
        "object": this.exam
      }
    },     
    handleClick(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          dispatchGraphql(this.mutation, this.getFilterVariables()).then((response) => {
            console.log(response)
            this.$go(this.$url.SH_EXAM + '/standard/' + this.$route.params.standardId + '/subject/' + this.$route.params.subjectId)
          })
        } else {
          this.$notify({
            title: 'Error',
            message: 'Please check the data',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    getUsersData() {
      dispatchGraphql(this.getUsersQuery).then((response) => {
        this.userData = response.users
      })
    },
    getExamData() {
      dispatchGraphql(this.getExamQuery).then((response) => {
        this.examData = response.exam_types
      })
    },
    getStandardData() {
      dispatchGraphql(this.getStandardQuery, { id: this.$route.params.standardId }).then((response) => {
        this.standardData = response.standards_by_pk
      })
    },
    getSubjectData() {
      dispatchGraphql(this.getSubjectQuery, { id: this.$route.params.subjectId }).then((response) => {
        this.subjectData = response.subjects_by_pk
      })
    },
    changeDate: function(value) {
      this.exam.start_date = moment(value).format('')
    },
  }
};
</script>

<style scoped>
.pd-tb-20 {
  padding: 0 20px;
}
.mt-30 {
  margin-top: 30px;
}
.mt-20 {
  margin-top: 20px;
}
.m-tb-20 {
  margin: 0 20px;
}
.exam-flex {
  display: flex;
}
.ml-20 {
  margin-left: -20px;
}
.ml-16 {
  margin-left: 16px;
}
.mr-30 {
  margin-right: 30px;
}
</style>
