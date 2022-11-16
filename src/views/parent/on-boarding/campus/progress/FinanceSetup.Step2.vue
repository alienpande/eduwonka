<template>
  <e-container-lite
    :percentage="90"
    tag="North Campus"
    showFooter
    @back="$go($url.BASIC_FINANCIAL)"
    @next="$go($url.CAMPUS_BASIC_DETAIL)"
  >
    <template #titleHead>
      <div class="h1">Payslip Line item</div>
      <div class="h5">Details to create payslips line items</div>
    </template>
    <e-form heading="Campus Details" themeFooter>
      <e-input label="School Name" />
      <e-input label="School Address" />
      <template #themeFooter>
        <e-profile-pic
          title="Payslips Screen Logo"
          :src="require('@/assets/images/profile.jpg')"
        ></e-profile-pic>
      </template>
    </e-form>
    <e-form heading="Custom Field">
      <fees-line-item :span="12" title="Earnings" v-model="earnings" />
      <fees-line-item :span="12" title="Deductions" v-model="deductions" />
    </e-form>
  </e-container-lite>
</template>
<script>
import FeesLineItem from "@/components/onboarding/FinanceSetup/FeesLineItem.vue";
export default {
  components: { FeesLineItem },
  data() {
    return {
      deductions: [],
      earnings: [],
    };
  },
};
</script>
