<template>
  <e-container hideHeader pageTitle="Add Employee" :back="$url.HQ_EMPLOYEE">
    <e-profile-pic
      marginTop
      title="Profile Picture"
      :src="require('@/assets/images/profile.jpg')"
    ></e-profile-pic>
    <e-form :gutter="20" heading="Personal details">
      <e-input
        :span="12"
        v-model="req.employeeName"
        name="Employee Name"
      ></e-input>
      <e-input :span="12" v-model="req.employeeId" name="Employee Id"></e-input>
      <e-select
        :span="12"
        v-model="req.designation"
        name="Designation"
      ></e-select>
      <e-select
        :span="12"
        v-model="req.department"
        name="Department"
      ></e-select>
      <e-date-picker
        :span="12"
        v-model="req.joiningDate"
        name="Joining Date"
      ></e-date-picker>
      <e-date-picker
        :span="12"
        v-model="req.gender"
        name="Gender"
      ></e-date-picker>
      <e-input
        :span="12"
        v-model="req.availableLeaves"
        name="Available Leaves"
      ></e-input>
      <e-select
        :span="12"
        v-model="req.bloodGroup"
        name="Blood Group"
      ></e-select>
      <e-input
        v-model="req.qualification"
        :span="24"
        type="textarea"
        name="Qualification Details"
      ></e-input>
    </e-form>

    <e-form :gutter="20" heading="Contact details">
      <e-input
        :span="24"
        v-model="req.address"
        type="textarea"
        name="Permanent Address"
      ></e-input>
      <e-select :span="12" v-model="req.city" name="City"></e-select>
      <e-select :span="12" v-model="req.state" name="State"></e-select>
      <e-input
        :span="12"
        v-model="req.birthPlace"
        name="Place of Birth"
      ></e-input>
      <e-input
        :span="12"
        v-model="req.nationality"
        name="Nationality"
      ></e-input>
    </e-form>

    <e-form :gutter="20" heading="Subject Details">
      <subject-year-input v-model="req.subjects" />
    </e-form>
    <!-- {{ req.subjects }} -->
  </e-container>
</template>
<script>
import { mapMutations } from "vuex";
import SubjectYearInput from "@/components/hq/Employee/SubjectYear.Input.vue";
export default {
  components: { SubjectYearInput },
  data() {
    return {
      req: {
        subjects: [],
      },
    };
  },
  methods: {
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth"]),
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
