<template>
  <e-container-lite
    :campusid="$route.params.id"
    tag="North Campus"
    showFooter
    @back="$go('/on-boarding/assign-subject/'+ $route.params.id)"
    @next="handleClick()"
  >
    <template #titleHead>
      <div class="h1">Attendance and exam details</div>
      <div class="h5">
        Kindly set your exam type and attendance preference for your institution
      </div>
    </template>

    <AttendanceType v-loading="loading" @getAttendance="getAttendance" :attendanceType="campusSetting" />
    <ExamType @getExam="getExam" :obj="examList" />
  </e-container-lite>
</template>
<script>
import {dispatchGraphql} from '@/api/dispatcher'
export default {
   components: {
    AttendanceType: () => import("./AttendanceType.vue"),
    ExamType: () => import("./ExamType.vue")
  },
  data() {
    return {
      loading: false,
      campusSetting: {},
      param: {
        id: "d7664a49-3b18-4754-8627-30678a92e685"
      },
       exam: {
         occurence: null
       },
     domain: "eduwonka.com",
      mutation: `mutation insert_single_campus_settings($object: campus_settings_insert_input!){
        insert_campus_settings_one(object: $object) {
        id
        attendance_type
        }
      }`,
      updateMutation: `mutation update_campus_settings ($id:uuid!, $changes: campus_settings_set_input!) {
        update_campus_settings_by_pk(pk_columns: {id: $id},_set: $changes) {
          id
          attendance_type
        }
      }`,
      examMutation:`mutation insert_multiple_exam_types($objects: [exam_types_insert_input!]! ) {
        insert_exam_types(objects: $objects) {
          returning {
            id
            campus_id
            name
            occurence
          }
        }
      }`,
      examUpdateMutation: `mutation update_exam_types ($id: uuid!, $changes: exam_types_set_input){
        update_exam_types_by_pk(pk_columns: {id: $id}, _set: $changes) {
          id
          name
          occurence
        }
      }`,
      examList: []
    };
  },
  created() {
     if (this.param.id) {
       this.getCampusSetting()
     }
  },
  methods: {
    getCampusSetting: function(){
      this.loading = true
      const query = `query ($id: uuid!) {
        campus_settings(where: {campus_id: {_eq: $id}}){
          id
          attendance_type
        }
      }`
      const ExamTypeQuery = `query ($id: uuid!) {
        exam_types(where: {campus_id: {_eq: $id}}){
          id
          campus_id
          name
          occurence
        }
      }`
      dispatchGraphql(query, { id: "d7664a49-3b18-4754-8627-30678a92e685" }).then((response) =>{
       this.campusSetting = response.campus_settings[0]
       console.log("attendance types", this.campusSetting)
       this.loading = false
        })
      dispatchGraphql(ExamTypeQuery, { id: "d7664a49-3b18-4754-8627-30678a92e685" }).then((response) => {
        this.examList = response.exam_types
        console.log("exam types", this.examList)
      })
    },
    getFilterVariables: function(data) {
      if(data.id){
        return {
          "id": data.id,
          "changes": data
        }
      }else{
        return {"objects": data}
      }
    },

    handleClick(){
      const campusSettingMutation = this.campusSetting.id ? this.updateMutation:this.mutation
      dispatchGraphql(campusSettingMutation, this.getFilterVariables(this.campusSetting)).then((response) => {
          console.log('Final Resp', response)
      })
      const examTypeMutation = this.exam.id ? this.examUpdateMutation : this.examMutation
      dispatchGraphql(examTypeMutation, this.getFilterVariables(this.exam)).then((response)=>{
         console.log('Final Resp', response)
         this.$emit("save", this.exam)
        this.$router.push(this.$url.WORKING_HOURS + '/' + this.$route.params.id)
      })
    },
   getAttendance(data){
      console.log('attendance_type', data)
      this.campusSetting.attendance_type=data.key
    },
    getExam(data){
      this.exam = data
    },
  },
};
</script>
