<template>
  <e-container-lite @back="$go($url.LIST_OF_CAMPUS)">
    <template #titleHead>
      <div class="h1">Onboarding {{ $route.params.name }}</div>
      <div class="h5">
        We are getting you onboarded to your new school management system
      </div>
    </template>
    <template #rightHead>
      <e-svg
        icon="onboarding-getting-started"
        css="svg-onbording-getting-started-right"
      />
    </template>
    <el-row>
      <el-col :span="window.width > 767 ? 18 : 24">
        <ModulePricing showRemovePlanButton shrink />
      </el-col>
      <el-col :span="window.width > 767 ? 6 : 24">
        <div class="h1">Plan for {{ $route.params.name }}</div>
        <div class="h5 mt20">
          <span
            style="
              text-decoration: line-through;
              color: #000000;
              opacity: 0.4;
              font-weight: 600;
              margin-right: 20px;
            "
            >$399/month</span
          >
          <span
            style="
              color: #000000;
              font-weight: 600;
              opacity: 1;
              margin-right: 20px;
            "
            >$0/month</span
          >
        </div>
        <p class="mt20">You won’t be charged for 3 months</p>
        <e-button
          class="mb20 pointer"
          label="Proceed"
          @click="redirectTo"
        />
        <p
          style="
            color: #000000;
            opacity: 0.6;
            font-size: 14px;
            margin-top: 70px;
          "
        >
          <e-svg f="alert-circle" css="h20" /> Once the trial period ends you
          will have to pay $399/month
        </p>
      </el-col>
    </el-row>
  </e-container-lite>
</template>
<script>
import ModulePricing from "@/components/onboarding/InstituteDetail/ModulePricing.vue";
import screenSize from '@/mixins/screenSize'
export default {
  components: {
    ModulePricing,
  },
  mixins: [screenSize],
  data() {
    return {
      campuses: [],
    };
  },
  methods: {
    redirectTo: function(){
      this.$router.push(`/on-boarding/level-creation-step-1/${this.$route.params.id}`)
    },
    activeTabChange(e) {
      this.activeTab = e;
    },
  },
  created() {
    this.campuses = require("@/api/campuses.json");
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
