<template>
  <!-- <e-container
    hideHeader
    pageTitle="Add New Health Record"
    :back="$url.HQ_HEALTH_RECORD"
    btnText="save"
    @btnClick="save"
  > -->
  <e-container
    hideHeader
    pageTitle="Add New Health Record"
    :back="$url.HQ_HEALTH_RECORD"
  >
    <e-form class="form-type-2" bgColor="#f9eee3" >
      <template>
        <el-col :span="4">
          <el-avatar
            shape="circle"
            :size="140"
            :src="student.profile"
          ></el-avatar>
        </el-col>
        <el-col :span="20">
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
        v-model="healthDetails.height"
        label="Height"
        placeholder="in cms"
      ></e-input>
      <e-input
        :span="12"
        v-model="healthDetails.weight"
        label="Weight"
        placeholder="in kgs"
      ></e-input>
      <!-- <div class="custom-date-picker" > -->
        <el-col :span="12" label="Blood Group" style="">
          <p class="label">Blood Group</p>
          <el-select  v-model="healthDetails.blood_group" placeholder="Choose Blood Group">
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
        v-model="healthDetails.recent_checkup"
        placeholder="mm/dd/yyyy"
        label="Recent Check"
        @change="changeDate"
      ></e-date-picker>
    </e-form>

    <e-form :gutter="50" themeFooter heading="Allergy Information" class="form-type-2">
      <e-radio
        :span="12"
        label="Is Anurag having any Allergy?"
        :options="allergyChoose"
        v-model="healthDetails.have_allergy"
      />
      <template #themeFooter>
        <e-input
          :span="12"
          v-model="healthDetails.medication"
          label="From Which Medication"
          placeholder=""
        ></e-input>
        <e-input
          :span="12"
          v-model="healthDetails.form_which_food"
          label="From Which Food"
          placeholder=""
        ></e-input>
        <e-input
          :span="12"
          v-model="healthDetails.insects"
          label="From Insects"
          placeholder=""
        ></e-input>
        <e-input
          :span="12"
          v-model="healthDetails.from_chemicals"
          label="From Chemicals"
          placeholder=""
        ></e-input>
      </template>
    </e-form>

    <e-form :gutter="0" heading="Student Medication">
      <medication-input :medications="medications" :student="student" />
    </e-form>
    <el-row class="form-last-buttons">
        <e-button
          style="margin-left: auto;"
          label= "Cancel" 
          plain  
          type= "primary"
          @click="save()"
        />
        <e-button
          label= "Done"   
          type= "primary"
          @click="$url.HQ_HEALTH_RECORD"
        />
    </el-row>
  </e-container>
</template>
<script>
import { dispatchGraphql, dispatchGraphqlMutation } from "@/api/dispatcher"
import { mapMutations } from "vuex"
import MedicationInput from "@/components/hq/HealthRecords/Medication.Input.vue"
export default {
  components: {
    MedicationInput
  },
  data() {
    return {
      medications: [],
      healthDetails: {},
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
          value: true,
        },
        {
          title: "No",
          value: false,
        },
      ],
      req: {
        allergy: {},
      },
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
          value: this.student.strandard,
        },
      ];
    },
  },
  methods: {
    changeDate: function(value) {
      this.healthDetails.recent_checkup = value
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
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth"]),
    activeTabChange(e) {
      this.activeTab = e;
    },
    scrollTop() {
      this.$nextTick(() => {
        this.$refs.tab2.scrollTop = 0;
      });
    },
     getMedVar: function (data) {
      return {
        "object": data
      }
    },
    getVariables: function (data) {
      return {
        "object": data
      }
    },
    save() {
      this.healthDetails.student_id = this.$route.params.studentId
      dispatchGraphqlMutation('health_informations', ['id', 'height'], this.healthDetails).then((response) => {
        console.log('health', response)
        if (this.medications.length > 0) {
          var count = 0
          for (const temp of this.medications) {
            count += 1
            temp.student_id = this.$route.params.studentId
            dispatchGraphqlMutation('medications', ['id', 'medicine_name'], temp).then((response) => {
              console.log('medications', response)
              if (count === this.medications.length) {
                this.$router.push(this.$url.HQ_HEALTH_RECORD)
              }
            })
          }
        } else {
          this.$router.push(this.$url.HQ_HEALTH_RECORD)
        }
      })
    }
  },
  mounted() {
    // this.setAsideMenuCollapse(true);
    // setTimeout(() => {
    //   this.setAsideWidth("100px");
    // }, 100);
  },
  created() {
    this.getUserInformation()
//    this.setAsideMenuCollapse(true);
//    this.setAsideWidth("100px");
  },
  destroyed() {
    this.setAsideMenuCollapse(false);
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
</style>
