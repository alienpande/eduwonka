<template>
  <div class="">
    <!-- <StudentDetail3  :studentid = this.$route.params.specificStudentId  /> -->
    <div class="heading" style="padding-left:1.5rem !important">Father Detail</div>
    <div style="">
      <el-row style="background: #fcdfbd66">
        <br />
        <br />
        <br />
        <el-col class="single-upload" style="flex-direction: column;">
          <el-avatar
            :size="110"
            style="margin-left: 0px"
            :src="require('@/assets/images/profile.jpg')"
          />
          <div style="color: #000000cc; text-align: center" class="fs-16 f-600">
            Profile picture
          </div>
        </el-col>
        <br /><br /><br /><br /><br /><br /><br /><br />
      </el-row>
      <div style="background: white; padding: 20px">
      
          <el-row class="view-no-form">
            <el-col
              :span="12"
              style="padding-bottom: 30px"
              v-for="(vendor, i) in fatherDetails"
              :key="i"
            >
              <div
                style="color: #000000cc; padding-bottom: 10px"
                class="fs-16 f-600"
              >
                {{ vendor.title }}
              </div>
              <div style="color: #00000099" class="fs-16">
                {{ vendor.text }}
              </div>
            </el-col>
          </el-row>
     
      </div>
    </div>
    <br/>
       <div class="heading" style="padding-left:1.5rem !important">Mother Detail</div>
    <div style="">
      <el-row style="background: #fcdfbd66">
        <br />
        <br />
        <br />
        <el-col class="single-upload" style="flex-direction: column;">
          <el-avatar
            :size="110"
            style="margin-left: 0px"
            :src="require('@/assets/images/profile.jpg')"
          />
          <div style="color: #000000cc; text-align: center" class="fs-16 f-600">
            Profile picture
          </div>
        </el-col>
        <br /><br /><br /><br /><br /><br /><br /><br />
      </el-row>
      <div style="background: white; padding: 20px">
      
          <el-row class="view-no-form" >
            <el-col
              :span="12"
              style="padding-bottom: 30px"
              v-for="(vendor, i) in motherDetails"
              :key="i"
            >
              <div
                style="color: #000000cc; padding-bottom: 10px"
                class="fs-16 f-600"
              >
                {{ vendor.title }}
              </div>
              <div style="color: #00000099" class="fs-16">
                {{ vendor.text }}
              </div>
            </el-col>
          </el-row>
     
      </div>
    </div>
    <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px;justify-content: flex-end;" class="form-last-buttons">
          <e-button
            :span="6"
            label="Next"
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
export default {
  data: () => ({
    studentid: '',
    studentParent: [],
    studentFather: '',
    studentMother: '',
    fatherDetails: [],
    motherDetails: [],
  }),
  created() {
    this.studentid = this.$route.params.specificStudentId
    this.getStudentParent()
  },
  methods: {
    getStudentParent() {
      const parentQuery = `query($student_id: uuid) {
        parent_students(where: {student_id: {_eq: $student_id}}) {
          parent_id
          relation
        }
      }`
      dispatchGraphql(parentQuery, { student_id: this.$route.params.specificStudentId }).then((response) => {
        console.log("before", response.parent_students)
        this.studentFather = response.parent_students[0].parent_id
        this.studentMother = response.parent_students[1].parent_id
        this.getStudentFather(this.studentFather)
        this.getStudentMother(this.studentMother)
      })
    },
    getStudentFather(fatherid) {
      const fatherQuery = `query($id: uuid!){
        users_by_pk(id:$id){
          first_name
          dob
          mobile_number
          qualification
          profession
          office_contact
          office_address
          office_name
        }
      }`
      dispatchGraphql(fatherQuery, { id: fatherid }).then((response) =>{
        this.fatherDetails.push({ title: "Father Name",text: response.users_by_pk.first_name }, { title: "Father DOB",text: response.users_by_pk.dob }, { title: "Father Mobile Number",text: response.users_by_pk.mobile_number }, { title: "Qualification",text: response.users_by_pk.qualification }, { title: "Professsion",text: response.users_by_pk.profession },{ title: "OFFICE CONTACT",text: response.users_by_pk.office_contact },{ title: "OFFICE NAME",text: response.users_by_pk.office_name }, { title: "OFFICE ADDRESS",text: response.users_by_pk.office_address })
        console.log(this.fatherDetails)
      })
    },
    getStudentMother(motherid){
      const motherQuery = `query($id: uuid!){
        users_by_pk(id:$id){
          first_name
          dob
          mobile_number
          qualification
          profession
          office_contact
          office_address
          office_name
        }
      }`
      dispatchGraphql(motherQuery, { id: motherid }).then((response) =>{
        this.motherDetails.push({title: "Mother Name",text: response.users_by_pk.first_name},{title: "Mother DOB",text: response.users_by_pk.dob},{title: "Mother Mobile Number",text: response.users_by_pk.mobile_number},{title: "Qualification",text: response.users_by_pk.qualification},{title: "Professsion",text: response.users_by_pk.profession},{title: "OFFICE CONTACT",text: response.users_by_pk.office_contact},{title: "OFFICE NAME",text: response.users_by_pk.office_name},{title: "OFFICE ADDRESS",text: response.users_by_pk.office_address})
        console.log(this.motherDetails)
      })
    }
  },
}
</script>
