<template>
  <e-container-lite>
    <template #titleHead>
      <div class="h1">Onboarding all your Campus</div>
      <div class="h5">
        Choose the campus for which you want to complete the onboarding Details
      </div>
    </template>
    <template #rightHead>
      <e-button label="Add Campus" icon="el-icon-plus" plain class="mt30" />
    </template>
    <campus-detail-card
      class="mb30"
      :campus="campus"
      v-for="(campus, index) in campuses"
      :key="index"
    />
  </e-container-lite>
</template>
<script>
import CampusDetailCard from "@/components/onboarding/ListOfCampus/CampusDetailCard.vue";
export default {
  components: { CampusDetailCard },
  data() {
    return {
      campuses: [
        {
          name: "North Campus",
          percentage: 50,
          email: "mayank@mailinator.com",
          academicPeriod: 2020,
          address: "451 Usha nagar ext",
          pincode: "452009",
        },
        {
          name: "East Campus",
          percentage: 100,
          email: "mayank@mailinator.com",
          academicPeriod: 2020,
          address: "451 Usha nagar ext",
          pincode: "452009",
        },
        {
          name: "South Campus",
          percentage: 0,
          email: "mayank@mailinator.com",
          academicPeriod: 2020,
          address: "451 Usha nagar ext",
          pincode: "452009",
        },
      ],
    };
  },
  methods: {
    activeTabChange(e) {
      this.activeTab = e;
    },
  },
};
</script>
<style scoped>
.container {
  height: 100vh;
  background-color: #f7f9fb;
  overflow-y: scroll;
}
</style>
