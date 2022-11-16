<template>
  <e-container-lite
    :percentage="85"
    tag="North Campus"
    showFooter
    @back="$go($url.DEPARTMENT_DESIGNATION)"
    @next="$go($url.PAY_SLIP_LINE_ITEM)"
  >
    <template #titleHead>
      <div class="h1">Basic Financial Details</div>
      <div class="h5">Basic details for the financial module</div>
    </template>
    <e-form heading="Default Currency and Date format">
      <el-col :span="24" class="mb20">Choose Default currency</el-col>
      <el-radio-group class="toggle-style" v-model="defaultCurrency">
        <el-radio
          :label="item"
          border
          v-for="(item, index) in defaultCurrencies"
          :key="index + 1"
        >
          {{ item.name }}
        </el-radio>
      </el-radio-group>

      <el-col :span="24" class="mb20">Choose Default Date format</el-col>
      <el-radio-group class="toggle-style" v-model="defaultDateFmt">
        <el-radio
          :label="item"
          border
          v-for="(item, index) in defaultDateFormats"
          :key="index + 1"
        >
          {{ item.name }}
        </el-radio>
      </el-radio-group>
    </e-form>
    <e-form heading="Fees Line Items">
      <fees-line-item
        title=" Please enter the fees line items for students fees"
        v-model="lineItems"
      />
    </e-form>
  </e-container-lite>
</template>
<script>
import FeesLineItem from "@/components/onboarding/FinanceSetup/FeesLineItem.vue";
export default {
  components: { FeesLineItem },
  data() {
    return {
      defaultDateFmt: {},
      defaultCurrency: null,
      defaultCurrencies: [],
      defaultDateFormats: [],
      lineItems: [],
    };
  },
  created() {
    this.defaultCurrencies = require("@/api/currencies.json");
    this.defaultDateFormats = require("@/api/date-formats.json");
  },
};
</script>
