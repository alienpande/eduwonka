<template>
  <e-container
    class="hq-health-detail"
    hideHeader
    pageTitle="View Record"
    :back="$url.HQ_HEALTH_RECORD"
    btnText="Delete Record"
    @btnClick="deleteRecord(healthResponse)"
    v-loading="loading"
  >
    <e-form class="form-type-2" bgColor="rgb(249, 238, 227)">
      <template>
        <el-col :span="3">
          <el-avatar
            shape="circle"
            :size="140"
            :src="student.profile"
          ></el-avatar>
        </el-col>
        <el-col :span="20" :offset="1">
          <el-row>
            <el-col :span="6" v-for="(item, index) in keyValues" :key="index">
              <e-key-value :span="24" :item="item" />
            </el-col>
          </el-row>
        </el-col>
      </template>
    </e-form>

    <e-form :gutter="50" heading="Health Information" class="form-type-2">
      <e-input
        :span="12"
        v-model="healthResponse.height"
        label="Height"
        placeholder="in cms"
      ></e-input>
      <e-input
        :span="12"
        v-model="healthResponse.weight"
        label="Weight"
        placeholder="in kgs"
      ></e-input>
      <!-- <div class="custom-date-picker" > -->
        <el-col :span="12" label="Blood Group" style="">
          <p class="label">Blood Group</p>
          <el-select  v-model="healthResponse.blood_group" placeholder="Choose Blood Group">
            <el-option
              v-for="item in bloodGroups"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      <!-- </div> -->
      <e-date-picker
        :span="12"
        v-model="healthResponse.recent_checkup"
        type="date"
        name="Recent Check"
        align="right"
        @change="changeDate"
        format="MM/dd/yyyy"
      ></e-date-picker>
    </e-form>

    <e-form :gutter="50" themeFooter heading="Allergy Information" class="form-type-2">
      <e-radio
        :span="12"
        :label="`Is ${this.student.first_name} having any Allergy?`"
        :options="allergyChoose"
        v-model="healthResponse.have_allergy"
      />
      <template #themeFooter>
        <e-input
          :span="12"
          v-model="healthResponse.medication"
          label="From Which Medication"
          placeholder=""
        ></e-input>
        <e-input
          :span="12"
          v-model="healthResponse.form_which_food"
          label="From Which Food"
          placeholder=""
        ></e-input>
        <e-input
          :span="12"
          v-model="healthResponse.insects"
          label="From Insects"
          placeholder=""
        ></e-input>
        <e-input
          :span="12"
          v-model="healthResponse.from_chemicals"
          label="From Chemicals"
          placeholder=""
        ></e-input>
      </template>
    </e-form><br>

    <e-form :gutter="0" heading="Student Medication" >
      <medication-input :medications="medications" :student="student" />
    </e-form>
    <el-row class="form-last-buttons">
        <e-button
          style="margin-left: auto;"
          label= "Update"   
          type= "primary"
          @click="handleUpdate()"
        />
    </el-row>
  </e-container>
</template>
<script>
import { dispatchGraphql, dispatchGraphqlMutation, dispatchGraphqlDelete } from "@/api/dispatcher"
import { mapMutations } from "vuex"
import MedicationInput from "@/components/hq/HealthRecords/Medication.Input.vue"
export default {
  components: {
    MedicationInput,
  },
  data() {
    return {
      loading: false,
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
      value: '',
      allergyChoose: [
        {
          title: "Yes",
          label: true
        },
        {
          title: "No",
          label: false
        },
      ],
      req: {
        allergy: {},
      },
      medications: [],
      healthResponse: {},
      student: {},
    };
  },
  computed: {
    keyValues() {
      return [
        {
          key: "Student Name",
          value: this.student.first_name,
        },
        {
          key: "Admission Number",
          value: this.student.admission_number,
        },
        {
          key: "Roll Number",
          value: this.student.roll_number,
        },
        {
          key: "Gender",
          value: this.student.gender,
        },
        {
          key: "DOB",
          value: this.student.dob,
        },
        {
          key: "Class",
          value:  this.student.standard,
        },
      ];
    },
  },
  methods: {
    changeDate: function(value) {
      this.healthResponse.recent_checkup = value
    },
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth"]),
    getHealthInformation() {
      this.loading = true
      const query = `query {
        health_informations(where: {student_id: {_eq: "${this.$route.params.studentId}"}}) {
          id
          student_id  
          height
          weight
          blood_group
          recent_checkup
          have_allergy
          from_chemicals
          form_which_food
          medication
          insects
        }
      }`
      dispatchGraphql(query).then((response) => {
        console.log("students", response)
        this.healthResponse = response.health_informations[0]
        this.loading = false
      })
    },
    getUserInformation() {
      const query = `query {
        users_by_pk(id: "${this.$route.params.studentId}") {
          id
          first_name
          admission_number
          roll_number
          dob
          gender
          section {
            id
            name
            standard {
              id
              name
            }
          }
        }
      }`
        dispatchGraphql(query).then((response) => {
        this.student = response.users_by_pk
        this.student.standard = (this.student.section.standard.name + ' - ' + this.student.section.name)
        console.log("stuhealthhhhhhhhhhhhhhhhhents", this.student)
        this.loading = false
      })
    },
    getMedicationInfo() {
      const query = `query {
        medications(where: {student_id: {_eq: "${this.$route.params.studentId}"}}) {
          id
          medicine_name
          description
          dosage
          taken_at
          medication_given_by
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.medications = response.medications
        console.log("medications", response)
      })
    },
    getVariables(data) {
      return {
        "id": data.id,
        "changes": data
      }
    },
    getHealthVariables(data) {
      return {
        "id": data.id,
        "changes": data
      }
    },
    handleUpdate() {
      dispatchGraphqlMutation('health_informations', ['id', 'height'], this.healthResponse).then((response) => {
        console.log("show", response)
      })
      if (this.medications.length > 0) {
        var count = 0
        for (const temp of this.medications){
          count += 1
          dispatchGraphqlMutation('medications', ['id', 'medicine_name', 'description', 'dosage'], temp).then((response) => {
            console.log('ccccccc', response)
            if (count === this.medications.length){
              this.$router.push(this.$url.HQ_HEALTH_RECORD);
            }
          })
        }
      } else {
        this.$router.push(this.$url.HQ_HEALTH_RECORD);
      }
    },
    deleteRecord(health_information) {
      const deleteMutation = `mutation($id: uuid) {
        delete_medications(where: {student_id: {_eq: $id}}) {
          returning {
            id
            medicine_name
          }
        }
      }`
      dispatchGraphqlDelete('health_informations', { id: health_information.id }).then((response) => {
        console.log('HealthRecord', response)
        dispatchGraphql(deleteMutation, { id: this.$route.params.studentId }).then((response) => {
          console.log('Medications', response)
          this.$router.push(this.$url.HQ_HEALTH_RECORD)
        })
      })
    },
  },
  mounted() {
    // this.setAsideMenuCollapse(true);
    // setTimeout(() => {
    //   this.setAsideWidth("100px");
    // }, 100);
  },
  created() {
    this.getHealthInformation();
    this.getMedicationInfo();
    this.getUserInformation();
    // this.setAsideMenuCollapse(true);
    // this.setAsideWidth("100px");
  },
  destroyed() {
    this.setAsideMenuCollapse(false);
  },
};
</script>

<style scoped>
@media only screen and (device-width: 768px) {
  .details {
    font-size: 10px;
    margin-left: -30px;
    width: 100%; 
  }
}

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
</style>
