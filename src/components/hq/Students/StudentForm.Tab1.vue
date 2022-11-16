<template>
  <div class="whole-form-container">
    <!-- <div v-if="student.attachment">
      <e-profile-pic  marginTop title="Profile Picture" :src="base_url + student.attachment.small_url" />
    </div> -->
    <!-- <div >
      <eduwonka-multifile-uploader :source-file-list="student.profile_images" @loading="v => fileUploading = v" @value="v => {student.user_profile_id = v.map(x => x.id), student.profile_images = v}" />
    </div> -->
    <el-row class="align-center">
      <el-col :span="4" class="single-upload">
        <el-card class="align-center">
          <el-image style="height: 160px;width: auto" :src="photoUrl" class="object-fit-scale-down" />
          <div class="text-center mg-t-10">
            <eduwonka-avatar-uploader @url="v => photoUrl = v" @value="v => student.avatar = v" />
          </div>
        </el-card>
      </el-col>
    </el-row>
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <!-- #region Academic Details Form -->
    <e-form heading="Academic Details"  :model="student" ref="form" :rules="rules">
      <el-row class="mg-x-20">
        <el-col :span="11">
          <el-form-item label="Student Name" prop="first_name"><br>
            <e-input v-model="student.first_name" placeholder="Enter Name" />
          </el-form-item>
        </el-col>

        <el-col :span="1">&emsp;</el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="Roll Number" prop="roll_number"><br>
            <e-input v-model="student.roll_number" placeholder="Enter RollNumber" />
          </el-form-item>
        </el-col>


      </el-row>
      <el-row class="mg-x-20">
        <el-col :span="11" >
          <el-form-item label="Admission Date" prop="admission_date">
            <!-- <br> -->
            <e-date-picker v-model="student.admission_date" type="date" placeholder="Pick a Date" @change="changeDate" format="MM/dd/yyyy" />
          </el-form-item>
        </el-col>

        <el-col :span="1">&emsp;</el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="Admission Number" prop="admission_number">
            <!-- <br> -->
            <e-input v-model="student.admission_number" placeholder="Enter Admission Number" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row class="mg-x-20">
        <el-col :span="11">
          <el-form-item label="Standard" prop="section_id">
            <!-- <br> -->
            <el-select v-model="student.section_id" placeholder="Pick a Standard">
              <el-option v-for="item in standards" :key="item.id" :label="(item.standard ? item.standard.name : 'N/A') + ' ' + item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="1">&emsp;</el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="Gender" prop="gender">
            <!-- <br> -->
            <e-radio  :options="gender" v-model="student.gender" :value="student.gender"  />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row class="mg-x-20">
        <el-col :span="11">
          <el-form-item label="Email" prop="email"><br>
            <e-input v-model="student.email" placeholder="Enter Email Address" />
          </el-form-item>
        </el-col>
      </el-row> -->
    </e-form>
    <!-- endregion -->

    <!-- #region Personal Details Form -->
    <e-form :gutter="50" heading="Personal Details" :model="student" ref="form" :rules="rules">
      <el-row class="mg-x-30">
        <el-col :span="11">
          <el-form-item label="UID Number" prop="uid_number"><br>
            <e-input v-model="student.uid_number" placeholder="Enter UID Number" />
          </el-form-item>
        </el-col>
        <el-col :span="1">&emsp;</el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="Mobile Number" prop="mobile_number"><br>
            <e-input v-model="student.mobile_number" placeholder="Mobile Number" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="mg-x-30">
        <el-col :span="11">
          <el-form-item label="Nationality" prop="nationality"><br>
            <e-input v-model="student.nationality" placeholder="Nationality" />
          </el-form-item>
        </el-col>
        <el-col :span="1">&emsp;</el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="Mother Tongue" prop="mother_tongue"><br>
            <e-select v-model="student.mother_tongue" placeholder="Choose Mother Tongue" :options="tongue" :optionName="'label'" :valueKey="'value'" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="mg-x-30">
        <el-col>
          <el-form-item label="Caste" prop="caste"><br>
            <el-select v-model="student.caste" placeholder="Pick a Caste">
              <el-option v-for="item in caste" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="mg-x-30">
        <el-col>
          <el-form-item label="Permanent Address" prop="address"><br>
            <e-input type="textarea" v-model="student.address" placeholder="Enter Address here" />
          </el-form-item>
        </el-col>
      </el-row>
    </e-form>
    <!-- endregion -->

    <!-- #region Sibbling Information Form -->

    <!-- need to change filed -->
    <e-form :gutter="50" themeFooter heading="Sibling Information" :model="student" ref="form" :rules="rules">
      <el-row class="mg-x-30">
        <el-col>
          <el-form-item  label="Do you have any sibling in school?" prop="sibling"><br>
            <e-radio :options="sibbling" v-model="student.sibling" :value="student.sibling" />
          </el-form-item>
        </el-col>
      </el-row>
      <template #themeFooter>
        <div v-if="student.sibling === 'yes'">
          <e-select :span="12" label="Name of sibling" placeholder="Select your sibling" v-model="student.student_sibling_id" :options="sibling_students" :optionName="'label'" :valueKey="'value'" @visible-change="verifySibling" />
          <e-input :span="12" v-model="roll_number" label="Roll Number" placeholder="RollNumber" readonly />
        </div>
      </template>
    </e-form>
    <!-- endregion -->
    <hr class="end-of-form-line">
    <el-row>
      <e-button :span="24" label="Next" width="180" @click="handleSubmit(handleClick('form'))" css="float-right"  style="padding-bottom:45px;" />
    </el-row>
    </ValidationObserver>
  </div>
</template>

<script>
import { dispatchGraphql } from "@/api/dispatcher";
// import EduwonkaMultifileUploader from '@/components/EduwonkaUploader/multifile.vue'
import EduwonkaAvatarUploader from '@/components/EduwonkaUploader/avatar.vue'
import logo from '@/assets/images/user.png'
import EForm from '../../../controls/eForm.vue'
import { getId } from '@/util/auth'
export default {
  components: {EForm, EduwonkaAvatarUploader},
  data() {
    return {
      photoUrl: logo,
      roll_number: '',
      user: {},
      student: {},
      students: [],
      sibling_students: [],
      base_url: process.env.VUE_APP_BASE_API,
      standards: [],
      tongue: [
        {
          label: "Hindi",
          value: "hindi",
        },
        {
          label: "English",
          value: "english",
        },
        {
          label: "Tamil",
          value: "tamil",
        },
      ],
      caste: [
        {
          label: "Hindu",
          value: "hindu",
        },
        {
          label: "Muslim",
          value: "muslim",
        },
      ],
      sibbling: [
        {
          title: "Yes",
          value: "yes",
        },
        {
          title: "No",
          value: "no",
        },
      ],
      gender: [
        {
          title: "Male",
          value: "male",
        },
        {
          title: "Female",
          value: "female",
        },
      ],
      allergy: [
        {
          title: "Yes",
          value: "yes",
        },
        {
          title: "No",
          value: "no",
        },
      ],
      mutation: `mutation insert_single_students($object: users_insert_input! ) {
        insert_users_one(object: $object) {
          id
        }
      }`,
      rules: {
        email: [
          { required: true, message: 'Enter Valid Email', trigger: 'blur' }
        ],
        first_name: [
          { required: true, message: 'Enter Student Name', trigger: 'blur' }
        ],
        admission_date: [
          { required: true, message: 'Select Admission Date', trigger: 'blur' }
        ],
        roll_number: [
          { required: true, message: 'Enter Roll Number', trigger: 'blur' }
        ],
        admission_number: [
          { required: true, message: 'Enter Admission Number', trigger: 'blur' }
        ],
        section_id: [
          { required: true, message: 'Select Standard', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: 'Select Gender', trigger: 'blur' }
        ],
        uid_number: [
          { required: true, message: 'Enter UID', trigger: 'blur' }
        ],
        mobile_number: [
          { required: true, message: 'Enter Mobile Number', trigger: 'blur' }
        ],
        nationality: [
          { required: true, message: 'Enter Nationality', trigger: 'blur' }
        ],
        mother_tongue: [
          { required: true, message: 'Enter Mother Tongue', trigger: 'blur' }
        ],
        caste: [
          { required: true, message: 'Select caste', trigger: 'blur' }
        ],
        address: [
          { required: true, message: 'Enter Address', trigger: 'blur' }
        ],
        sibling: [
          { required: true, message: 'Check Sibling', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUser()
    // if(this.$route.params.specificStudentId) {
    //   this.getStudent()
    // }
    this.getStandardsQueryfunction()
    this.getStudentsibling()
  },
  methods: {
    verifySibling(value) {
      console.log('siblingId', value)
      const roll = this.students.filter(x => x.id === value)
      this.roll_number = roll[0].roll_number
    },
    getStandardsQueryfunction(){
      const query = `query {
        sections {
          id
          name
          standard_id
          standard {
            id
            name
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.standards = response.sections
      })
    },
    changeDate: function(value) {
      this.student.admission_date = value
    },
    getVariables: function(student) {
      this.student.user_profile_id = this.student.avatar
      this.student.account_id = this.user.account_id
      this.student.password_digest = this.user.password_digest
      delete this.student.avatar
      delete student.sibling
      student.role = "student"
      return { "object": student }
    },
    getUser() {
      const query = `query($id: uuid!) {
        users_by_pk(id:$id) {
          id
          account_id
          password_digest
        }
      }`
      dispatchGraphql(query, { id: getId() }).then((response) => {
        this.user = response.users_by_pk
        console.log('admin', this.user)
      })
    },
    handleClick(form) {
      console.log('check', form)
      dispatchGraphql(this.mutation, this.getVariables(this.student)).then((response) => {
        const studentId = response.insert_users_one.id
        this.$emit("save", studentId)
      })
    },
    getStudentsibling() {
      const query=`query {
        users(where:{role: {_eq:"student"}}){
          id
          first_name
          last_name
          roll_number
          user_profile_id
        }
      }`
      dispatchGraphql(query).then((response) =>{
        this.students = response.users
        for(var i = 0; i < response.users.length; i++) {
          this.sibling_students.push({ value: response.users[i].id, label: response.users[i].first_name })
        }
        console.log("siblingStudents", this.sibling_students)
      })
    }
  }
}
</script>

<style scoped>


</style>
