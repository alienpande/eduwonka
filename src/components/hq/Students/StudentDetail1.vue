<template>
  <div class="">
    <el-row>
      <el-col :span="24" class="single-upload" style="flex-direction: column;">
        <el-avatar v-if="studentData.attachment"
          :size="110"
          style="margin-left:0px"
          :src="base_url + studentData.attachment.file_url"
        />
        <el-avatar v-else
          :size="110"
          style="margin-left:0px"
          :src="require('@/assets/images/profile.jpg')"
        />
        <div style="color: #000000CC;text-align:center;" class="fs-16 f-600">Profile picture</div>
      </el-col>
    </el-row>
    <div class="heading" style="padding-left:1.5rem !important">Invoice Details</div>
    <el-card shadow="none" class="rounded-08">
      <el-row class="view-no-form">
        <el-col :span="12" style="padding-bottom: 30px" v-for="(item, index) in invoiceDetails" :key="index">
          <div style="color: #000000cc; padding-bottom: 10px" class="fs-16 f-600">
            {{ item.title }}
          </div>
          <div style="color: #00000099" class="fs-16">{{ item.text }}</div>
        </el-col>
      </el-row>
    </el-card>
    <br />
    <div class="heading" style="padding-left:1.5rem !important">Personal details</div>
    <el-card shadow="none" class="rounded-08">
      <el-row class="view-no-form">
        <el-col
          :span="12"
          style="padding-bottom: 30px"
          v-for="(vendor, i) in personalDetails"
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
        <el-col :span="20" style="padding-bottom: 30px">
          <div
            style="color: #000000cc; padding-bottom: 10px"
            class="fs-16 f-600"
          >
            Permanent Address
          </div>
          <div style="color: #00000099" class="fs-16">
            {{ permanentAdress }}
          </div>
        </el-col>
      </el-row>
    </el-card>
    <br />
    <div class="heading" style="padding-left:1.5rem !important">Sibling Information</div>
    <div shadow="none"  style="background:white;">
      <el-row style="padding:15px 20px">
        <el-col :span="20" style="padding-bottom: 30px">
          <div
            style="color: #000000cc; padding-bottom: 10px"
            class="fs-16 f-600"
          >
            Do you have any sibling in school?
          </div>
          <div style="color: #00000099" class="fs-16">{{studentData.student_sibling_id ? 'Yes' : 'No'}}</div>
        </el-col>
      </el-row>
      <div v-if="studentData.student_sibling_id" style="background:#fcdfbd80;padding:15px 20px" >
        <el-row>
          <el-col :span="11">
            <div
              style="color: #000000cc; padding-bottom: 10px"
              class="fs-16 f-600"
            >
              Name of Sibling
            </div>
            <div
              style="
                box-shadow: 0px 1px 3px #11111112;
                border-radius: 4px;
                background: #e8ded4;
                padding: 10px 0;
              "
            >
              {{ sibling.first_name }}
            </div>
          </el-col>
          <el-col :span="11" :offset="1">
            <div
              style="color: #000000cc; padding-bottom: 10px"
              class="fs-16 f-600"
            >
              Class-Section
            </div>
            <div
              style="
                box-shadow: 0px 1px 3px #11111112;
                border-radius: 4px;
                background: #e8ded4;
                padding: 10px 0;
              "
            >
             {{ sibling.section.standard.name }}-{{ sibling.section.name }}
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <br />
    <div class="heading" style="padding-left:1.5rem !important">Unregistration Details</div>
    <el-card shadow="none" class="rounded-08">
      <el-row class="view-no-form">
        <el-col
          
          style="padding-bottom: 30px"
          v-for="(vendor, i) in unregisDetails"
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
        <el-col  style="padding-bottom: 30px">
          <div
            style="color: #000000cc; padding-bottom: 10px"
            class="fs-16 f-600"
          >
            Reason of leaving the organisation
          </div>
          <div style="color: #00000099" class="fs-16">
             {{ reason }}
          </div>
        </el-col>
      </el-row>
    </el-card>
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
import { dispatchGraphql } from "@/api/dispatcher";
export default {
  data: () => ({
    studentId: '',
    studentData: {},
    studentSiblingId: '',
    permanentAdress: '',
    reason: '',
    sibling: {},
    invoiceDetails: [],
    personalDetails: [],
    base_url: process.env.VUE_APP_BASE_API,
    unregisDetails: []
  }),
  created(){
    console.log("asjdkgj")
    this.getOneStudent()
  },
  methods: {
    getOneStudent() {
      const myQuery = `query {
        users_by_pk(id:"${this.$route.params.specificStudentId}") {
          first_name
          roll_number
          admission_date
          admission_number
          gender
          uid_number
          nationality
          mother_tongue
          caste
          address
          mobile_number
          student_sibling_id
          user_profile_id
          attachment{
            id
            file_url
          }
          section{
            name
            standard{
              name
            }
          }
        }
      }`
      dispatchGraphql(myQuery).then((response) => {
        console.log('$$$$$$$$$$$$$$$$$$$', response)
        this.studentData = response.users_by_pk
        this.invoiceDetails.push(
          { title: "Student Name",text: response.users_by_pk.first_name },
          { title: "Roll Number",text: response.users_by_pk.roll_number },
          { title: "Admission Date",text: response.users_by_pk.admission_date },
          { title: "Admission Number",text: response.users_by_pk.admission_number },
          { title: "standard",text: response.users_by_pk.section.standard.name + '-' + response.users_by_pk.section.name },
          { title: "Gender",text: response.users_by_pk.gender }
        )
        this.personalDetails.push(
          { title: "UID Number", text: response.users_by_pk.uid_number },
          { title: "Mobile Number",text: response.users_by_pk.mobile_number },
          { title: "Nationality", text: response.users_by_pk.nationality },
          { title: "Mother tongue ", text:response.users_by_pk.mother_tongue },
          { title: "Caste",text: response.users_by_pk.caste }
        )
        this.permanentAdress = response.users_by_pk.address
        this.unregisDetails.push({title: "Date of unregistration", text: response.users_by_pk.date_of_exit})
        console.log("sibling id", response.users_by_pk.student_sibling_id)
        this.studentSiblingId = response.users_by_pk.student_sibling_id
        this.studentId = response.users_by_pk.id
        this.getSibling(this.studentSiblingId)
        this.reason = response.users_by_pk.reason_for_exit
      })
    },
    getSibling(studentSiblingId){
     console.log("iam in sibling", studentSiblingId)
      const siblingQuery = `query($id:uuid!){
        users_by_pk(id:$id){
          first_name
          section{
            name
            standard {
              name
            }
          }
        }
      }`
      dispatchGraphql(siblingQuery,{id:studentSiblingId}).then((response) => {
        this.sibling = response.users_by_pk
        console.log(this.sibling)
      })
    }
  },
}
</script>
