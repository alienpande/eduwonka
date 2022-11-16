<template>
  <div >
    <div class="heading" style="padding-left: 1.5rem !important;">Health Information</div>
    <el-card shadow="none" class="rounded-08">
      <el-row class="view-no-form">
        <el-col
          :span="5"
          style="padding-bottom: 30px"
          v-for="(vendor, i) in healthInfo"
          :key="i"
        >
          <div
            style="color: #000000cc; padding-bottom: 10px"
            class="fs-16 f-600"
          >
            {{ vendor.title }}
          </div>
          <div style="color: #00000099" class="fs-16">{{ vendor.text }}</div>
        </el-col>
      </el-row>
    </el-card>
    <br />
      <div class="heading" style="padding-left:1.5rem !important">Allergy Information</div>
    <div shadow="none"  style="background:white;">
      <el-row style="padding:15px 20px">
        <el-col :span="20" style="padding-bottom: 30px">
          <div
            style="color: #000000cc; padding-bottom: 10px"
            class="fs-16 f-600"
          >
            Is Anurag having any Allergy ?
          </div>
          <div style="color: #00000099" class="fs-16">{{ allergy }}</div>
        </el-col>
      </el-row>
      <div v-if="allergy" style="background:#fcdfbd80;padding:15px 20px" >
       <el-row class="view-no-form">
        <el-col
          :span="5"
          style="padding-bottom: 30px"
          v-for="(vendor, i) in studentInfo"
          :key="i"
        >
          <div
            style="color: #000000cc; padding-bottom: 10px"
            class="fs-16 f-600"
          >
            {{ vendor.title }}
          </div>
          <div style="color: #00000099" class="fs-16">{{ vendor.text }}</div>
        </el-col>
      </el-row>
      </div>
    </div>
    <br/>
    <div class="heading" style="padding-left:1.5rem !important">Student Medication</div>
    <el-card shadow="none" class="rounded-08">
      <div style="color: #000000cc" class="fs-20 f-500">
        list of medication taken by Anurag
      </div>
      <br/>
      <el-row class="view-no-form">
        <el-col
          :span="4"
          style="padding-bottom: 30px"
          v-for="(vendor, i) in studentMedication"
          :key="i"
        >
          <div
            style="color: #000000cc; padding-bottom: 10px"
            class="fs-16 f-600"
          >
            {{ vendor.title }}
          </div>
          <div style="color: #00000099" class="fs-16">{{ vendor.text }}</div>
        </el-col>
      </el-row>
    </el-card>
     <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px;justify-content: flex-end;" class="form-last-buttons">
          <e-button
            :span="6"
            label="Done"
            width="180"
            @click="$emit('save')"
            css="float-right"
            class="p-45"
          ></e-button>
    </el-row>
  </div>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher"
import moment from "moment"
export default {
  props: {
    studentsid: {
      type: String,
      default: null
    }
  },
  data: () => ({
    allergy: '',
    healthInfo: [],
    studentInfo:[],
    studentMedication:[]
  }),
  created(){
    this.studentsid = this.$route.params.specificStudentId
    console.log('health', this.$route.params.specificStudentId)
    console.log("studentsid",this.studentsid)
    this.getHealthInfo(this.studentsid)
    this.getStudentMedical(this.studentsid)
  },
  methods: {
    getHealthInfo(studentsid){
      const healthQuery = `query($student_id: uuid!){
        health_informations(where:{student_id:{_eq: $student_id}}){
          height
          weight
          recent_checkup
          blood_group
          form_which_food
          insects
          from_chemicals
          medication
          have_allergy
        }
      }`
      dispatchGraphql(healthQuery, {student_id: studentsid}).then((response) => {
        console.log("fajkshj",response.health_informations)
        var information = response.health_informations[0]
        this.healthInfo.push(
          { title: "Height",text: information.height },
          { title: "Weight", text: information.weight },
          { title: "Recent Checkup", text: moment(information.recent_checkup).format('DD MMM, yyyy') },
          { title: "Blood Group", text: information.blood_group }
        )
        this.studentInfo.push(
          { title: "From Which Medication",text: information.medication },
          { title: "From Insects",text: information.insects },
          { title: "From which food",text: information.from_which_food },
          { title: "From Chemicals", text: information.from_chemicals }
        )
        this.allergy = information.have_allergy 
      })
    },
    getStudentMedical(studentsid){
      const medicalQuery = `query($student_id: uuid!){
        medications(where:{student_id:{_eq: $student_id}}){
          medicine_name
          description
          taken_at
          dosage
          medication_given_by
        }
      }`
      dispatchGraphql(medicalQuery,{student_id:studentsid}).then((response) =>{
        var information = response.medications[0]
        this.studentMedication.push(
          { title: "Medication Name", text: information.medicine_name },
          { title: "Description",text: information.description },
          { title: "Time",text: information.taken_at },
          { title: "Dosage", text: information.dosage },
          { title: "Medicine is", text: information.medication_given_by }
        )
      })
    }
  }
}
</script>
