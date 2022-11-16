<template>
  <e-container
    hideHeader
    pageTitle="Add New Health Record"
    :back="$url.HQ_HEALTH_RECORD"
  >
    <e-form theme>
      <template #theme>
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

    <e-form :gutter="50" heading="Health Information">
      <e-input
        :span="12"
        v-model="req.height"
        label="Height"
        placeholder="in cms"
      ></e-input>
      <e-input
        :span="12"
        v-model="req.weight"
        label="Weight"
        placeholder="in kgs"
      ></e-input>
      <e-select
        :span="12"
        label="Blood Group"
        placeholder="Choose Blood Group"
        :v-model="req.bloodGroup"
        :options="bloodGroups"
      ></e-select>

      <e-date-picker
        :span="12"
        v-model="req.recentCheckDate"
        placeholder="mm/dd/yyyy"
        label="Recent Check"
      ></e-date-picker>
    </e-form>

    <e-form :gutter="50" themeFooter heading="Allergy Information">
      <e-radio
        :span="12"
        label="Is Anurag having any Allergy?"
        :options="allergyChoose"
        v-model="req.isAllergetic"
      />
      <template #themeFooter>
        <e-input
          :span="12"
          v-model="req.allergy.medication"
          label="From Which Medication"
          placeholder=""
        ></e-input>
        <e-input
          :span="12"
          v-model="req.allergy.food"
          label="From Which Food"
          placeholder=""
        ></e-input>
        <e-input
          :span="12"
          v-model="req.allergy.insects"
          label="From Insects"
          placeholder=""
        ></e-input>
        <e-input
          :span="12"
          v-model="req.allergy.chemicals"
          label="From Chemicals"
          placeholder=""
        ></e-input>
      </template>
    </e-form>

    <e-form :gutter="0" heading="Student Medication">
      <medication-input v-model="req.medications" />
    </e-form>
  </e-container>
</template>
<script>
import { mapMutations } from "vuex";
import MedicationInput from "@/components/hq/HealthRecords/Medication.Input.vue";
export default {
  components: {
    MedicationInput,
  },
  data() {
    return {
      bloodGroups: [],
      allergyChoose: [
        {
          title: "Yes",
          value: "Y",
        },
        {
          title: "No",
          value: "N",
        },
      ],
      req: {
        allergy: {},
      },
      student: {
        name: "Mayank Jhawar",
        profile: require("@/assets/images/profile.jpg"),
        admissionNumber: "656563-333993-033",
        rollNumber: "00918810",
        gender: "Male",
        dob: "01/19/1990",
        class: "6-A",
      },
    };
  },
  computed: {
    keyValues() {
      return [
        {
          key: "Student Name",
          value: this.student.name,
        },
        {
          key: "Admission Number",
          value: this.student.admissionNumber,
        },
        {
          key: "Roll Number",
          value: this.student.rollNumber,
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
          value: this.student.class,
        },
      ];
    },
  },
  methods: {
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth"]),
    activeTabChange(e) {
      this.activeTab = e;
    },
    scrollTop() {
      this.$nextTick(() => {
        this.$refs.tab2.scrollTop = 0;
      });
    },
  },
   mounted() {
    /* this.setAsideMenuCollapse(true);
    setTimeout(() => {
      this.setAsideWidth("100px");
    }, 100); */
  },
  created() {
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
