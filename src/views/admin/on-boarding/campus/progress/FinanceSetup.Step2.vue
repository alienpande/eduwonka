<template>
   <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
  <e-container-lite
    :campusid="$route.params.id"
    tag="North Campus"
    showFooter
    @back="$go('/on-boarding/basic-financial-details/' + campusId)"
    @next="handleSubmit($go($url.CAMPUS_BASIC_DETAIL+ '/' + campusId + '/' +accountId))">
    <template #titleHead>
      <div class="h1">Payslip Line item</div>
      <div class="h5">Details to create payslips line items</div>
    </template>
    <e-form heading="Campus Details" themeFooter :rules="rules">
      <e-input label="Campus Name" v-model="campus.name" rules="required" />
      <e-input label="Campus Address" v-model="campus.address" rules="required"/>
      <template #themeFooter>
        <e-profile-pic
          title="Payslips Screen Logo"
          :src="require('@/assets/images/profile.jpg')"
        ></e-profile-pic>
      </template>
    </e-form>
    <e-form heading="Custom Field">
      <fees-line-item :span="12" title="Earnings" v-model="earnings.earnings" rules="required"/>
      <fees-line-item :span="12" title="Deductions" v-model="deductions.earnings" rules="required"/>
    </e-form>
  </e-container-lite>
  </ValidationObserver>
</template>
<script>
import {dispatchGraphql,dispatchGraphqlQueryByPk} from '@/api/dispatcher'
import FeesLineItem from "@/components/onboarding/FinanceSetup/FeesLineItem.vue";
export default {
  components: { FeesLineItem },
  data() {
    return {
      rules: {},
      accountId: '',
      campus: '',
      // lineItems: '',
      deductions: [],
      earnings: [],
    };
  },
  computed: {
    isValid () {
      return this.campus.name && this.campus.address;
    }
  },
  created() {
    this.campusId = this.$route.params.id
    this.getPayslipLine()
    this.getCampus()
  },
  methods: {
      getCampus: function() {
        dispatchGraphqlQueryByPk('campuses',['id', 'name','address','account_id'],{id: this.$route.params.id}).then((response) => {
        console.log("*************",response.campuses_by_pk)
        this.campus = response.campuses_by_pk
        this.accountId = response.campuses_by_pk.account_id
        console.log("!!!!!!!!!!!!",this.accountId)
      })
    },
    getPayslipLine: function() {
      const query =`query($campus_id: uuid!){
        payslip_line_items(where:{campus_id:{_eq: $campus_id}}){
          payslip_line_item_type
        }        
      }`
      dispatchGraphql(query,{campus_id:this.$route.params.id}).then((response) =>{
        console.log("-----",response)
        this.earnings = response.payslip_line_items
        console.log(",,,,,,",this.earnings)
      })
    },
  }
};
</script>
