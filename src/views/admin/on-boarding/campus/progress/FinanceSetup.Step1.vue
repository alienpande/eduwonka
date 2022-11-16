<template>
  <e-container-lite
    :campusid="$route.params.id"
    tag="North Campus"
    showFooter
    @back="$go('/on-boarding/department-designation/' + $route.params.id)"
    @next="handleClick"    
    >
    <template #titleHead>
      <div class="h1">Basic Financial Details</div>
      <div class="h5">Basic details for the financial module</div>
    </template>
     <ValidationObserver ref="observer" >
    <e-form heading="Default Currency and Date format" :rules="rules">
      <el-col :span="24" class="mb20">Choose Default currency</el-col>
      <el-radio-group class="toggle-style" v-model="account_settings.currency_format" rules="required">
        <el-radio :label="item.name" border  v-for="(item, index) in defaultCurrencies" :key="index + 1" rules="required">
          {{ item.name }}
        </el-radio>
      </el-radio-group>
      <el-col :span="24" class="mb20">Choose Default Date format</el-col>
      <el-radio-group class="toggle-style" v-model="account_settings.date_time_format" rules="required">
        <el-radio :label="item.name" border v-for="(item, index) in defaultDateFormats" :key="index + 1" rules="required">
          {{ item.name }}
        </el-radio>
      </el-radio-group>
    </e-form>
     </ValidationObserver>
    <e-form heading="Fees Line Items">
      <fees-line-item 
        title=" Please enter the fees line items for students fees"
        :lineItems="lineItems"    
        rules="required"    
      />
    </e-form>
  </e-container-lite>
 <!-- </ValidationObserver> -->
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher"
import FeesLineItem from "@/components/onboarding/FinanceSetup/FeesLineItem.vue"
export default {
  components: { FeesLineItem },
  data() {
    return {
      rules: {},
      account_id : '',
      account_settings: {},
      defaultDateFmt: {},
      defaultCurrency: null,
      defaultCurrencies: [],
      defaultDateFormats: [],
      lineItems: [],
      updateMutation: `mutation update_account_settings($id: uuid!, $changes: account_settings_set_input) {
          update_account_settings_by_pk(pk_columns: { id: $id }, _set: $changes) {
            id
          }
        }`,
    };
  },
  computed: {
    isValid () {
      return this.account_settings.currency_format && this.account_settings.date_time_format;
    }
  },
  created() {
    console.log("gfghfgasdfyugy", this.rules)
    this.defaultCurrencies = require("@/api/currencies.json");
    this.defaultDateFormats = require("@/api/date-formats.json");
    this.getAccountSettings()
    // this.getPayslipLine()
    this.getFeeLines()
  },
  methods: {
    // getPayslipLine: function() {
    //   const query =`query($campus_id: uuid!){
    //     payslip_line_items(where:{campus_id:{_eq: $campus_id}}){
    //       payslip_line_item_type
    //     }        
    //   }`
    //   dispatchGraphql(query,{campus_id:this.$route.params.id}).then((response) =>{
    //     console.log("payslip",response)
    //     this.lineItems = response.payslip_line_items
    //     console.log("res",this.lineItems)
    //   })
    // },
    getFeeLines: function() {
      const query =`query($campus_id: uuid!){
        fee_line_items(where:{campus_id:{_eq: $campus_id}}){
          default_amount
          fee_line_item_type
        }        
      }`
      dispatchGraphql(query,{campus_id:this.$route.params.id}).then((response) =>{
        console.log("feeline",response)
        this.lineItems = response.fee_line_items
        console.log("res",this.lineItems)
      })
    },
    getAccountSettings: function() {
      const query = `query ($id: uuid!) {
        account_settings(where: {account_id: {_eq: $id}}){
          id
          currency_format
          date_time_format
          account_id
        }
      }`
      dispatchGraphql(query, {id: "94208896-2db8-488e-8c60-ed512c946a67"}).then((response) => {
        this.account_settings = response.account_settings[0]
        console.log("TTTTTTTTTTTTTTTTTTTTTTTTTT", this.account_settings)
      })
    },
    getVariable: function(account_settings) {
      account_settings.account_id= "94208896-2db8-488e-8c60-ed512c946a67";
      return {
        "id": account_settings.id,
        "changes": account_settings
      }
    },  
    handleClick() {
      console.log("###########",this.getVariable(this.account_settings))

      dispatchGraphql(this.updateMutation, this.getVariable(this.account_settings)).then((response) => {
        console.log(response)
          this.$emit("save", this.account_settings);
          // this.$router.push("/on-boarding/payslip-line-item")
         this.$router.push(`/on-boarding/payslip-line-item/${this.$route.params.id}`)
        })
    },
  },
};
</script>
