<template>
  <div class="whole-form-container">
    <!-- #region Father's Details Form -->
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <e-form :gutter="50" themeHeader heading="Father Details" :rules="rules" class="form-type-2">
      <template #themeHeader>
        <e-profile-pic
          title="Profile Picture"
          :src="require('@/assets/images/profile.jpg')"
        ></e-profile-pic>
      </template>
      <e-input
        :span="12"
        v-model="parent1.first_name"
        label="Father Name"
        placeholder="Enter Name"
        rules="required"
      ></e-input>

      <e-date-picker
        :span="12"
        v-model="parent1.dob"
        type="date"
        name="Father DOB"
        placeholder="Pick a DOB"
        @change="changeFatherDate"
        format="MM/dd/yyyy"
        rules="required"
      ></e-date-picker>
      
      <e-input
        :span="12"
        v-model="parent1.mobile_number"
        label="Father's Primary Number"
        placeholder="Enter Mobile Number"
        rules="required"
      ></e-input>
      
      <e-select
        :span="12"
        label=" Qualification"
        placeholder="Choose Qualification"
        v-model="parent1.qualification"
        :options="qualifications"
        :optionName="'label'"
        :valueKey="'value'"
        rules="required"
      ></e-select>   

      <el-col :span="24">
        <span class="tx-18">Profession</span>
        <el-select v-model="parent1.profession" placeholder="Choose Profession" rules="required">
          <el-option
            v-for="item in professions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>

      <e-input :span="12"
        v-model="parent1.office_name"
        label="Office Name"
        placeholder="Enter office name"
        rules="required"
      ></e-input>

      <e-input
        :span="12"
        v-model="parent1.office_contact"
        label="Office Contact Number"
        placeholder="Enter office contact number"
        rules="required"
      ></e-input>

      <!-- <e-input
        :span="12"
        v-model="parent1.email"
        label="Email"
        placeholder="example@gmail.com"
        rules="required"
      ></e-input> -->

      <e-input
        :span="24"
        type="textarea"
        v-model="parent1.office_address"
        label="Office Address"
        placeholder="Enter office Address"
        rules="required"
      ></e-input>
    </e-form>
    <!-- #endregion -->

    <!-- #region Mother's Details Form -->
    <e-form :gutter="50" themeHeader heading="Mother Details" class="form-type-2">
      <template #themeHeader>
        <e-profile-pic
          title="Profile Picture"
          :src="require('@/assets/images/profile.jpg')"
        ></e-profile-pic>
      </template>
      <e-input
        :span="12"
        v-model="parent2.first_name"
        label="Mother Name"
        placeholder="Enter Name"
        rules="required"
      ></e-input>

      <e-date-picker
        :span="12"
        v-model="parent2.dob"
        type="date"
        name="Mother DOB"
        placeholder="Pick a DOB"
        @change="changeMotherDate"
        format="MM/dd/yyyy"
        rules="required"
      ></e-date-picker>

      <e-input
        :span="12"
        v-model="parent2.mobile_number"
        label="Mother's Mobile Number"
        placeholder="Enter mobile number"
        rules="required"
      ></e-input>
      
      <e-select
        :span="12"
        label=" Qualification"
        placeholder="Choose Qualification"
        v-model="parent2.qualification"
        :options="qualifications"
        :optionName="'label'"
        :valueKey="'value'"
        rules="required"
      ></e-select>

      <el-col :span="24">
        <span class="tx-18">Profession</span>
        <el-select v-model="parent2.profession" placeholder="Choose Profession" :span="12" rules="required">
          <el-option
            v-for="item in professions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>

      <!-- <e-input
        :span="12"
        v-model="parent2.email"
        label="Email"
        placeholder="example@gmail.com"
        rules="required"
      ></e-input>     -->

      <e-input
        :span="12"
        v-model="parent2.office_name"
        label="Office Name"
        placeholder="Enter office name"
        rules="required"
      ></e-input>

      <e-input
        :span="12"
        v-model="parent2.office_contact"
        label="Office Contact Number"
        placeholder="Enter office contact number"
        rules="required"
      ></e-input>

      <e-input
        :span="24"
        type="textarea"
        v-model="parent2.office_address"
        label="Office Address"
        placeholder="Enter office Address"
        rules="required"
      ></e-input>
    </e-form>
    <hr class="end-of-form-line">

    <!-- #endregion -->
    <el-row class="form-last-buttons">
      <e-button
        :span="20"
        label="Back"
        width="180"
        type="default"
        @click="handleBack"
        class="p-45"
      ></e-button>
      <e-button
        :span="4"
        label="Next"
        width="180"
        @click="handleSubmit(handleClick)"
        css="float-right"
        class="p-45"
      ></e-button>
    </el-row>
    </ValidationObserver>
  </div>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher"
import { getId } from '@/util/auth'
export default {
  props: {
    studentId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      rules: {},
      user: {},
      parent1: {},
      parent2: {},
      fatherId: '',
      motherId: '',
      studentParent1: {
        student_id: '',
        parent_id: '',
        relation: '',
      },
      studentParent2: {
        student_id: '',
        parent_id: '',
        relation: '',
      },  
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
      qualifications: [
        {
          label: "M.Tech",
          value: "M.Tech",
        },
        {
          label: "MBBS",
          value: "MBBS",
        },
        {
          label: "LLB",
          value: "LLB",
        },
      ],
      professions: [
       {
         label: "Professor",
         value: "professor",
       },
       {
         label: "Doctor",
         value: "doctor",
       },
       {
         label: "Lawyer",
         value: "lawyer",
       },
      ],  
      mutation: `mutation insert_multiple_parents($objects: [users_insert_input!]! ) {
          insert_users(objects: $objects) {
            returning {
              id
            }
          }
      }`,
      intermediateMutation:`mutation insert_multiple_parent_students($objects: [parent_students_insert_input!]! ) {
        insert_parent_students(objects: $objects) {
          returning {
            id
            parent_id
            student_id
            relation
          }
        }
      }`,
    }; 
  },
  created() {
    this.getUser()
    console.log('id', this.studentId)
  },
  computed: {
    isValid () {
      return this.parent1.first_name && this.parent1.dob && this.parent1.qualification && this.parent1.mobile_number && this.parent1.office_name && this.parent1.office_contact && this.parent1.office_address && this.parent1.email  && this.parent2.first_name && this.parent2.mobile_number && this.parent2.qualification && this.parent1.email && this.parent2.professions && this.parent2.email;
    }
  },
  methods: {
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
    changeFatherDate: function(value) {
      this.parent1.dob = value
    },
    changeMotherDate: function(value) {
      this.parent2.dob = value
    },
    getFilterVariables: function() {
      this.parent1.role = "parent"
      this.parent1.account_id = this.user.account_id
      this.parent1.password_digest = this.user.password_digest
      this.parent2.role = "parent"
      this.parent2.account_id = this.user.account_id
      this.parent2.password_digest = this.user.password_digest
      return { "objects": [(this.parent1),(this.parent2)]}
    },
    getVariables: function() {
      this.studentParent1.student_id = this.studentId
      this.studentParent1.parent_id = this.fatherId
      this.studentParent1.relation = "father"
      this.studentParent2.parent_id = this.motherId
      this.studentParent2.student_id = this.studentId 
      this.studentParent2.relation = " mother"
      return { "objects": [(this.studentParent1),(this.studentParent2)]}
    },
    handleClick() {
      dispatchGraphql(this.mutation, this.getFilterVariables()).then((response) => {
      this.fatherId = response.insert_users.returning[0].id
      this.motherId = response.insert_users.returning[1].id
      const student1Id = this.studentId
      console.log('eeee',this.fatherId, this.motherId,this.studentId,student1Id)
      dispatchGraphql(this.intermediateMutation, this.getVariables()).then((response) => {
        console.log(response,this.parent1.qualification)
      })
      this.$emit("save", student1Id)
      })
    },
    handleBack() {
      this.$emit("back")
    },
  },
  mounted() {},
}
</script>
