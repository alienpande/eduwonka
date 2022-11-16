<template>
  <e-container class="hq-employee-form form-type-2" hideHeader :pageTitle="teacherId === 'new' ? 'Add Employee' : 'Update Employee'" :back="$url.HQ_EMPLOYEE">
    <!-- <e-profile-pic
      marginTop
      title="Profile Picture"
      :src="require('@/assets/images/profile.jpg')"
    ></e-profile-pic> -->
    <el-row class="align-center">
      <el-col :span="4" class="single-upload">
        <el-card class="align-center add-employee-card">
          <el-image style="height: 160px;width: auto" :src="photoUrl" class="object-fit-scale-down" />
          <div class="text-center mg-t-10">
            <eduwonka-avatar-uploader @url="v => photoUrl = v" @value="v => EmployeeDetails.avatar = v" />
          </div>
        </el-card>
      </el-col>
    </el-row>
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <e-form :rules="rules" paddingContainer="30px 0px" heading="Personal details">
      <el-col :span="11">
        <e-input v-model="EmployeeDetails.first_name" name="Employee Name" placeholder="Enter Name" rules="required" />
      </el-col>
      <el-col :span="11" :offset="1">
        <e-input v-model="EmployeeDetails.uid_number" name="Employee Id" placeholder="Enter Id" rules="required" />
      </el-col>
      <el-col :span="11" style="padding:0px 20px">
        <span class="label">Designation</span>

          <el-select  v-model="EmployeeDetails.designation_id" placeholder="Choose Designation" v-on="getDepartment(EmployeeDetails.designation_id)" rules="required">
          <el-option
            v-for="item in designations"
            :key="item.id"
            :label="((item.department ? item.department.name : '') + ' - ' + item.designation_type)"
            :value="item.id" rules="required">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="11" :offset="1">
        <e-input :value="EmployeeDetails.department" name="Department" placeholder="Choose Department" readonly rules="required"/>
      </el-col>
      <el-col :span="11" style="margin-bottom: 6%;padding: 0px 10px;">
        <e-date-picker v-model="EmployeeDetails.admission_date" name="Joining Date" placeholder="Pick a Date" @change="addDate" rules="required"  />
      </el-col>
      <!-- <el-col :span="11" :offset="1">
        <e-radio
          :span="24"
          label="Gender"
          :options="gender"
          v-model="EmployeeDetails.gender"
          rules="required"
        />
        </el-col> -->
      <el-col :span="11" :offset="1" style="padding:0px 20px">
        <p class="label">Gender</p>
        <el-select v-model="EmployeeDetails.gender" placeholder="Choose Gender" rules="required">
          <el-option v-for="item in gender" :key="item" :label="item.label" :value="item.value" />
        </el-select>
      </el-col>
      <!-- <el-col :span="11">
        <e-input v-model="EmployeeDetails.email" name="Email" placeholder="Enter Email" rules="required" />
      </el-col> -->
      <el-col :span="11">
        <e-input v-model="EmployeeDetails.available_leaves" name="Available Leaves" placeholder="Enter Available Leaves" rules="required" />
      </el-col>
      <el-col :span="11" :offset="1" style="padding:0px 20px">
        <span class="label">Blood Group</span>
        <el-select  v-model="EmployeeDetails.blood_group" placeholder="Choose Blood Group" rules="required">
          <el-option
            v-for="item in bloodGroups"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="23">
        <e-input v-model="EmployeeDetails.qualification" type="textarea" label="Qualification Details" placeholder="Enter Qualification" rules="required" />
      </el-col>
    </e-form>
    <e-form :gutter="20" heading="Contact details">
      <e-input
        :span="24"
        v-model="EmployeeDetails.address"
        name="Permanent Address"
        placeholder="Enter Address"
        rules="required"
      ></e-input>
      <el-col :span="12" style="padding:0px 10px">
        <P class="label">City</P>
        <el-select v-model="EmployeeDetails.city" name="Choose City" placeholder="Choose City" :span="4" rules="required">
          <el-option
            v-for="item in cities"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-col>
      <e-input :span="12" v-model="EmployeeDetails.state" name="State" placeholder="Enter State" rules="required"></e-input>
      <e-input
        :span="12"
        v-model="EmployeeDetails.place_of_birth"
        name="Place of Birth"
        placeholder="Enter Place of Birth"
        rules="required"
      ></e-input>
      <e-input
        :span="12"
        v-model="EmployeeDetails.nationality"
        name="Nationality"
        placeholder="Enter Nationality"
        rules="required"
      ></e-input>
    </e-form>
    <e-form v-if="teacherDetails.length > 0" :gutter="20" heading="Subject Details">
      <subject-year-input @input="secSubTeachers" :value="teacherDetails" class="sub-details-form" />
    </e-form>
    <e-form v-else :gutter="20" heading="Subject Details">
      <subject-year-input @input="secSubTeachers" class="sub-details-form"/>
    </e-form>
    <hr class="end-of-form-line">
    <div class="form-last-buttons" style="justify-content: flex-end;">
      <el-button type="secondary" plain @click="$url.HQ_EMPLOYEE">cancel</el-button>
      <el-button type="primary" @click="handleSubmit(save())">Update</el-button>
    </div>
    </ValidationObserver>
  </e-container>
</template>
<script>
import { dispatchGraphql, dispatchGraphqlMutation } from '@/api/dispatcher'
import { mapMutations } from "vuex";
import logo from '@/assets/images/user.png'
import EduwonkaAvatarUploader from '@/components/EduwonkaUploader/avatar.vue'
import SubjectYearInput from "@/components/hq/Employee/SubjectYear.Input.vue";
import EInput from '../../../../controls/eInput.vue';
import { getId } from '@/util/auth'
export default {
  components: { SubjectYearInput, EInput, EduwonkaAvatarUploader },
  data() {
    return {
      user: {},
      bloodGroups: [
        {
          value: "A +",
          label: "A +",
        },
        {
          value: "A -",
          label: "A -",
        },
        {
          value: "B +",
          label: "B +",
        },
        {
          value: "B -",
          label: "B -",
        },
        {
          value: "AB +",
          label: "AB +",
        },
        {
          value: "AB -",
          label: "AB -",
        },
        {
          value: "O +",
          label: "O +",
        },
        {
          value: "O -",
          label: "O -",
        },
      ],
      gender: [
        {
          label: "Male",
          value: "male",
        },
        {
          label: "Female",
          value: "female",
        },
      ],
      photoUrl: logo,
      teacherId: this.$route.params.id || 'new',
      teacherDetails: [],
      EmployeeDetails:{},
      designations: [],
      base_url: process.env.VUE_APP_BASE_API,
      fileUploading: false,
      subTeachers: [],
      cities: ['Mumbai', 'Delhi','Bangalore', 'Hyderabad','Agra','Ahmedabad'],
      req: {
        subjects: [],
      }
    };
  },
  computed: {
    isValid () {
      return this.EmployeeDetails.first_name && this.EmployeeDetails.uid_number && this.EmployeeDetails.description_id && this.EmployeeDetails.department && this.EmployeeDetails.admission_date && this.EmployeeDetails.gender && this.EmployeeDetails.email && this.EmployeeDetails.available_leaves && this.EmployeeDetails.blood_group && this.EmployeeDetails.qualification && this.EmployeeDetails.address && this.EmployeeDetails.city && this.EmployeeDetails.state && this.EmployeeDetails.place_of_birth && this.EmployeeDetails.nationality;
    }
  },
  methods: {
    addDate(value) {
      this.EmployeeDetails.admission_date = value
    },
    getDepartment(val) {
      var tmp = this.designations
      tmp = tmp.filter(item => item.id === val)
      if (tmp.length > 0) {
        this.EmployeeDetails.department = tmp[0].department.name
      }
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
    getDesignations() {
      const query =`query {
        designations {
          id
          designation_type
          department {
            id
            name
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.designations = response.designations
        console.log('designation', this.designations)
      })
    },
    getEmployeeDetails() {
      const userquery = ` query {
        users_by_pk(id:"${this.$route.params.id}"){
          id
          first_name
          email
          uid_number
          created_at
          qualification
          designation_id
          gender
          place_of_birth
          nationality
          city
          address
          user_profile_id
          state
          available_leaves
          admission_date
          attachment{
            id
            file_url
          }
          section_subject_teachers {
            id
            experience_years
            subject_id
            section_id
            section {
              id
              name
            }
            subject {
              name
              id
            }
          }
        }
      }`
      dispatchGraphql(userquery).then((response) => {
        this.EmployeeDetails = response.users_by_pk
        this.teacherDetails = this.EmployeeDetails.section_subject_teachers
        this.subTeachers = this.EmployeeDetails.section_subject_teachers
        this.photoUrl = this.base_url + this.EmployeeDetails.attachment.file_url

      })
    },
    save() {
      delete this.EmployeeDetails.department
      delete this.EmployeeDetails.section_subject_teachers
      delete this.EmployeeDetails.bloodGroup
      delete this.EmployeeDetails.attachment
      this.EmployeeDetails.user_profile_id = this.EmployeeDetails.avatar
      this.EmployeeDetails.account_id = this.user.account_id
      this.EmployeeDetails.password_digest = this.user.password_digest
      delete this.EmployeeDetails.avatar
      delete this.EmployeeDetails.blood_group
      dispatchGraphqlMutation('users', ['id', 'first_name'], this.EmployeeDetails).then((response) => {
      console.log('employeeDetails', response)
        var user = response.insert_users_one
        var count = 0
        for (const temp of this.subTeachers) {
          delete temp.subject
          count += 1
          temp.teacher_id = user ? user.id : this.$route.params.id
          dispatchGraphqlMutation('section_subject_teachers', ['id', 'teacher_id'], temp).then((response) => {
            console.log('subject teacher', response)
            if (count === this.subTeachers.length) {
              this.$router.push(this.$url.HQ_EMPLOYEE)
            }
          })
        }
      })
    },
    secSubTeachers(val){
      this.subTeachers = val
    },
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth"]),
  },
  mounted() {
    // this.setAsideMenuCollapse(true);
    // setTimeout(() => {
    //   this.setAsideWidth("100px");
    // }, 100);
  },
  created() {
    this.getUser()
    this.getEmployeeDetails()
    this.getDesignations()
    // this.setAsideMenuCollapse(true);
    // this.setAsideWidth("100px");
  },
  destroyed() {
    // this.setAsideMenuCollapse(false);
  },
};
</script>

<style scoped>
.label {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
}

.e-form {
  background-color: white;
  height: auto;
  overflow-x: hidden;
}
.single-upload {
  position: relative;
  width: 100%;
  display:flex;
  justify-content: center;
  align-items: center;
}
.sub-details-form >div:last-child button {
margin-left: 2.5% !important;
}
</style>
