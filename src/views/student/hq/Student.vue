<template>
  <es-container pageTitle="Personal Details" btnText="Download" btnIcon="el-icon-download" btnPlain2="true" btnText2="Raise Query" class="bg-black-5">
    <es-steps :steps="steps" :active="activeTab" @active-tab="activeTabChange" style="width:600px" />
    <student-details v-if="activeTab == 1" @save="activeTab = 2" />
    <guardian-details ref="tab2" v-if="activeTab == 2" @save="activeTab = 3" @back="activeTab = 1" />
    <medical-details ref="tab3" v-if="activeTab == 3" @back="activeTab = 2" />
  </es-container>
</template>
<script>
import studentDetails from "@/components/student/hq/studentDetails.vue"
import guardianDetails from "@/components/student/hq/guardianDetails.vue"
import medicalDetails from "@/components/student/hq/medicalDetails.vue"
export default {
  components: { studentDetails, guardianDetails, medicalDetails },
  data() {
    return {
      activeTab: 1,
      steps: [
        {
          id: 1,
          icon: "groupDetails",
          title: "Student Details",
        },
        {
          id: 2,
          icon: "guardianDetails",
          title: "Guardian Details",
        },
        {
          id: 3,
          icon: "medicalDetails",
          title: "Medical Details",
        },
      ],
    };
  },
  methods: {
    activeTabChange(e) {
      this.activeTab = e;
    },
    ptest(d) {
      console.log(d);
    },
  },
};
</script>
