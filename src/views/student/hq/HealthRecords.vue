<template>
<div>
  <es-container hideHeader class="bg-black-5">
    <div class="bg-black-2 queries-detail__header" style="padding: 30px 50px">
      <el-row>
        <el-col :span="11" class="text-white tx-24 f-600">
          Health Records
        </el-col>
        <el-col :span="3" :offset="5">
          <es-button text="Download" icon="downloadYellow" />
        </el-col>
        <el-col :span="3" :offset="1">
          <es-button text="Raise Query" :plain="true" />
        </el-col>
      </el-row>
    </div>
    <el-card class="rounded-08 bg-black-2" :style="'margin: 30px; border: none'" shadow="none">
      <el-row>
        <el-col :span="20">
          <span class="tx-20 tx-bolder text-white">Student Details</span>
        </el-col>
      </el-row>
      <br />
      <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
        <el-row>
          <el-col :span="5" class="mg-l-20 mg-t-20 d-flex">
            <el-avatar :size="50" :src="require('@/assets/images/profile.jpg')" />
            <div class="mg-l-20">
              <div class="text-gray-6">Name</div>
              <div class="sub-title mg-t-4">{{healthInformation.student.first_name}} {{healthInformation.student.last_name}}</div>
            </div>
          </el-col>
          <el-col :span="18">
            <el-card class="rounded-09 bg-black-3" :style="'border: none'" shadow="none">
              <el-col :span="4" class="mg-b-20 mg-l-30 d-flex justify-content-center">
                <div>
                  <div class="text-gray-6">Admission Number</div>
                  <div class="sub-title mg-t-4">{{healthInformation.student.admission_number}}</div>
                </div>
              </el-col>
              <el-col :span="4" class="mg-l-30 d-flex justify-content-center">
                <div>
                  <div class="text-gray-6">Roll Number</div>
                  <div class="sub-title mg-t-4">{{healthInformation.student.roll_number}}</div>
                </div>
              </el-col>
              <el-col :span="4" class="mg-l-30 d-flex justify-content-center">
                <div>
                  <div class="text-gray-6">Gender</div>
                  <div class="sub-title mg-t-4">{{healthInformation.student.gender}}</div>
                </div>
              </el-col>
              <el-col :span="4" class="mg-l-30 d-flex justify-content-center">
                <div>
                  <div class="text-gray-6">DOB</div>
                  <div class="sub-title mg-t-4">{{getDateFormat(healthInformation.student.dob)}}</div>
                </div>
              </el-col>
              <el-col :span="4" class="mg-l-30 d-flex justify-content-center">
                <div>
                  <div class="text-gray-6">Standard</div>
                  <div class="sub-title mg-t-4">{{healthInformation.student.section.standard.name}} - {{healthInformation.student.section.name}}</div>
                </div>
              </el-col>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </el-card>
    <el-card class="rounded-08 bg-black-2" :style="'margin: 30px;border: none'" shadow="none">
      <el-row>
        <el-col :span="20">
          <span class="tx-20 tx-bolder text-white">Health Information</span>
        </el-col>
      </el-row>
      <br />
      <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
        <el-row>
          <el-card class="mg-l-40 mg-r-40 rounded-08 bg-black-3" :style="'border: none'" shadow="none">
            <el-row>
              <el-col :span="5" :offset="2" class="d-flex">
                <div>
                  <div class="text-gray-6">Height</div>
                  <div class="sub-title mg-t-4">{{healthInformation.height}} Feet</div>
                </div>
              </el-col>
              <el-col :span="5" class="d-flex">
                <div>
                  <div class="text-gray-6">Blood Group</div>
                  <div class="sub-title mg-t-4">{{healthInformation.blood_group}}</div>
                </div>
              </el-col>
              <el-col :span="5" class="d-flex">
                <div>
                  <div class="text-gray-6">Weight</div>
                  <div class="sub-title mg-t-4">{{healthInformation.weight}}</div>
                </div>
              </el-col>
              <el-col :span="5" class="d-flex">
                <div>
                  <div class="text-gray-6">Recent Checkup</div>
                  <div class="sub-title mg-t-4">{{getDateFormat(healthInformation.recent_checkup)}}</div>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-row>
      </el-card>
    </el-card>
    <el-card class="rounded-08 bg-black-2" :style="'margin: 30px;border: none'" shadow="none">
      <el-row>
        <el-col :span="20">
          <span class="tx-20 tx-bolder text-white">Allergy Information</span>
        </el-col>
      </el-row>
      <br />
      <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
        <el-row>
          <el-col :class="getStatus(healthInformation.have_allergy) === 'Yes' ? 'bg-red' : 'bg-green'" class="mg-l-40 d-flex justify-content-center" :span="4" >
            <span :class="getStatus(healthInformation.have_allergy) === 'Yes' ? 'text-red' : 'text-green'" class="tx-14">is {{ healthInformation.student.first_name }} {{ healthInformation.student.last_name }} - {{ getStatus(healthInformation.have_allergy) }}</span>
          </el-col>
        </el-row>
        <el-row v-if="getStatus(healthInformation.have_allergy) === 'Yes'" class="mg-t-20">
          <el-card class="mg-l-40 mg-r-40 rounded-08 bg-black-3" :style="'border: none'" shadow="none">
            <el-row>
              <el-col :span="5" :offset="2" class="d-flex">
                <div>
                  <div class="text-gray-6">From Which medication</div>
                  <div class="sub-title mg-t-4">{{healthInformation.medication}}</div>
                </div>
              </el-col>
              <el-col :span="5" class="d-flex">
                <div>
                  <div class="text-gray-6">From Insects</div>
                  <div class="sub-title mg-t-4">{{healthInformation.insects}}</div>
                </div>
              </el-col>
              <el-col :span="5" class="d-flex">
                <div>
                  <div class="text-gray-6">From which Food</div>
                  <div class="sub-title mg-t-4">{{healthInformation.form_which_food}}</div>
                </div>
              </el-col>
              <el-col :span="5" class="d-flex">
                <div>
                  <div class="text-gray-6">From Chemicals</div>
                  <div class="sub-title mg-t-4">{{healthInformation.from_chemicals}}</div>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-row>
      </el-card>
    </el-card>
    <el-card class="mg-l-10 mg-r-10 rounded-08 bg-black-2" :style="'border: none'" shadow="none">
      <el-row>
        <el-col :span="20">
          <span class="tx-20 tx-bolder text-white">Student Medication</span>
        </el-col>
      </el-row>
      <br />
      <el-table :data="studentMedication" custom-class="text-white">
        <el-table-column label="Medicine name" prop="medicine_name" />
        <el-table-column label="Description" prop="description" />
        <el-table-column label="Time"  >
          <template slot-scope="scope">
            {{getDateFormat(scope.row.taken_at)}}
          </template>
        </el-table-column>
        <el-table-column label="Dosage" prop="dosage" />
        <el-table-column label="Medicine is" prop="medication_given_by" />
      </el-table>
    </el-card>
    <el-row style="margin-top: 20px; background: #1e1e1e; padding-top: 25px; padding-bottom: 15px;">
      &emsp;
    </el-row>
  </es-container>
  </div>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher"
import { getId } from '@/util/auth'
import moment from 'moment'
export default {
  data() {
    return {
      healthInformation: {},
      studentMedication: []
    }
  },
  created(){
    this.getStudentMedical()
    this.getHealthInfo()
    console.log('E$EEEEEEEEEEEe', getId())
  },
  methods: {
    getStatus(status) {
      return status === true ? 'Yes' : 'No'
    },
    getDateFormat: function(date) {
      return moment(date).format('L')
    },
    getStudentMedical(){
      const medicalQuery = `query($student_id: uuid!){
        medications(where:{student_id:{_eq: $student_id}}){
          medicine_name
          description
          taken_at
          dosage
          medication_given_by
        }
      }`
      dispatchGraphql(medicalQuery,{student_id: getId()}).then((response) =>{
        this.studentMedication = response.medications
      })
    },
    getHealthInfo(){
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
          student{
            caste
            first_name
            last_name
            admission_number
            roll_number
            gender
            dob
            section{
              name
              standard{
                name
              }
            }
          }
        }
      }`
      dispatchGraphql(healthQuery, {student_id: getId()}).then((response) => {
        this.healthInformation = response.health_informations[0]
      })
    },
    addNewRecords() {
      this.$router.push(this.$url.HQ_HEALTH_RECORD_FORM);
    },
    handleEdit(i, data) {
      console.log(i, data);
      this.$router.push(this.$url.HQ_HEALTH_RECORD_VIEW);
    },
  },
};
</script>
