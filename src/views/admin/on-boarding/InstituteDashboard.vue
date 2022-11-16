<template>
  <e-container-lite>
    <template #titleHead>
      <div class="h1">Institue Dashboard</div>
      <div class="h5">
        Choose the campus for which you want to see the Details
      </div>
    </template>
    <template #rightHead>
      <e-button label="Add Campus" icon="el-icon-plus" plain class="mt30" />
    </template>
    <el-row>
      <el-col :span="16">
        <e-dashcard :obj="analytics" css="mb30">
          <template #header>
            <div class="heading mb20">Quick stats</div>
          </template>
        </e-dashcard>
      </el-col>
      <el-col :span="8"> </el-col>
      <el-col :span="24">
        <div class="heading mb20">List of Campus</div>
        <campus-detail-card
          :gutter="0"
          class="mb30"
          :style="{ padding: '30px' }"
          :campus="campus"
          v-for="(campus, index) in campuses"
          :key="index"
        />
      </el-col>
    </el-row>
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
      analytics: [
        {
          title: "Total Students",
          value: "60",
          icon: "hq/student",
        },
        {
          title: "Total Boys",
          value: "30",
          icon: "hq/boy",
        },
        {
          title: "Total Girls",
          value: "30",
          icon: "hq/girl",
        },
        {
          title: "Total Students",
          value: "60",
          icon: "hq/student",
        },
        {
          title: "Total Boys",
          value: "30",
          icon: "hq/boy",
        },
        {
          title: "Total Girls",
          value: "30",
          icon: "hq/girl",
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
