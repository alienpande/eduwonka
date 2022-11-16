<template>
  <div class="whole-form-container">
     <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <e-form :gutter="50" heading="Health Information" :rules="rules" class="form-type-2">
      <e-input
        :span="12"
        v-model="student.height"
        label="Height"
        placeholder="Enter Height"
        rules="required"
      ></e-input>

      <e-input
        :span="12"
        v-model="student.weight"
        label="Weight"
        placeholder="Enter Weight"
        rules="required"
      ></e-input>
      
       <e-select
        :span="12"
        label=" Blood Group"
        placeholder="Choose Blood Group"
        v-model="student.blood_group"
        :options="bloodGroups"
        :optionName="'label'"
        :valueKey="'value'"
        rules="required"
      ></e-select> 
      
      <e-date-picker
        :span="12"
        v-model="student.recent_checkup"
        type="date"
        name="Recent Check"
        placeholder="Pick a Date"
        @change="changeDate"
        format="MM/dd/yyyy"
        rules="required"
      ></e-date-picker>
    </e-form>
    
    <e-form :gutter="50" themeFooter class="form-type-2">
      <e-radio
        :span="24"
        label="Is student having any Allergy ?"
        :options="allergy"
        v-model="student.have_allergy"
        rules="required"
      />
      <template #themeFooter>
        <div v-if="student.have_allergy === 'yes'" class="view-no-form">
        <e-input
          :span="12"
          v-model="student.medication"
          label="From Which Medication"
          placeholder="Enter Medication"
          rules="required"
        ></e-input>

        <e-input
          :span="12"
          v-model="student.form_which_food"
          label="From which food"
          placeholder="Enter Food"
          rules="required"
        ></e-input>

        <e-input
          :span="12"
          v-model="student.insects"
          label="From Insects"
          placeholder="Enter Insects"
          rules="required"
        ></e-input>

        <e-input
          :span="12"
          v-model="student.from_chemicals"
          label="From Chemicals"
          placeholder="Enter Chemicals"
          rules="required"
        ></e-input>
        </div>
      </template>
    </e-form>
    <!-- component added from health module -->
    <!-- <e-form :gutter="0" heading="Student Medication">
      <medication-input :medications="medications" :student="student" />
    </e-form> -->
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
        label="Save"
        width="180"
        @click="handleSubmit(handleClick())"
        css="float-right"
        class="p-45"
      ></e-button>
    </el-row>
    </ValidationObserver>
  </div>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher";
export default {
  props: {
    student1Id: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      student: {
        student_id: "",
        height: "",
        weight: "",
        blood_group: "",
        recent_checkup: "",
        medication: "",
        form_which_food: "",
        insects: "",
        from_chemicals: "",
      },    
      bloodGroups: [
        {
          label: "A +",
          value: "A +",
        },
        {
          label: "A -",
          value: "A -",
        },
        {
          label: "B +",
          value: "B +",
        },
        {
          label: "B -",
          value: "B -",
        },
        {
          label: "O +",
          value: "O +",
        },
        {
          label: "O -",
          value: "O -",
        },
        {
          label: "AB +",
          value: "AB +",
        },
        {
          label: "AB -",
          value: "AB -",
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
      getHealth: `mutation ($object: health_informations_insert_input! ) {
        insert_health_informations_one(object: $object) {
          id
        }
      }`
    }
  },
  created() {
    console.log('id', this.student1Id)
  },
  computed: {
    isValid () {
      return this.student.height && this.student.weight && this.student.blood_group && this.student.recent_checkup && this.student.have_allergy && this.student.medication && this.student.form_which_food && this.student.insects && this.student.from_chemicals;
    }
  },
  methods: {
    changeDate: function(value) {
      this.student.recent_checkup = value
    },
    getVariables: function(student) {
      student.student_id = this.student1Id
      return { "object": student }
    },
    handleClick: function()    {
      console.log("ssgdsdfwdqwf", this.student)
      dispatchGraphql(this.getHealth, this.getVariables(this.student)).then((response) => {
        console.log("student health information", response)
        this.$emit("save", this.student)
      })
    },
    handleBack() {
      this.$emit("back")
    }
  },
  mounted() {},
}
</script>
