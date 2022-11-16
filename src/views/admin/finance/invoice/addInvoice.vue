<template>
  <e-container class="finance-add-invoice" hideHeader pageTitle="Add Invoice" :back="$url.FI_INVOICE">
    <e-steps :steps="steps" :active="activeTab" @active-tab="activeTabChange" style="width:300px" />
    <add-invoice-1 v-if="activeTab == 1" @save="handleInvoice" />
    <add-invoice-2 ref="tab2" :bankDetails="bankDetails" :invoiceId="invoiceId" v-if="activeTab == 2" @back="activeTab = 1" />
  </e-container>
</template>
<script>
import { mapMutations } from "vuex";
import addInvoice1 from '@/components/finance/invoice/addInvoice1.vue'
import addInvoice2 from '@/components/finance/invoice/addInvoice2.vue'
import { dispatchGraphql } from "@/api/dispatcher"
// import SubjectYearInput from "@/components/hq/Employee/SubjectYear.Input.vue";
export default {
  components: { addInvoice1 ,addInvoice2},
  data() {
    return {
      activeTab: 1,
      invoiceId: null,
      bankDetails: {},
      steps: [
        {
          id: 1,
          icon: "invoice-details",
          title: "Invoice Details",
        },
        {
          id: 2,
          icon: "hq/healthRecords",
          title: "Bank Details",
        },
      ],
    }
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
    handleInvoice(vendor, invoice) {
      this.invoiceId = invoice
      const query = `query($id: uuid) {
        bank_details(where: {vendor_id: {_eq: $id}}) {
          id
          account_no
          account_holder
          ifsc_code
          bank_name
        }
      }`
      dispatchGraphql(query, { id: vendor }).then((response) => {
        this.bankDetails = response.bank_details[0]
      })
      this.activeTab = 2
      this.scrollTop()
    }
  },
  mounted() {
    /* this.setAsideMenuCollapse(true);
    setTimeout(() => {
      this.setAsideWidth("100px");
    }, 100); */
  },
  created() {
   // this.setAsideMenuCollapse(true);
   // this.setAsideWidth("280px");
  },
  destroyed() {
    this.setAsideMenuCollapse(false);
  }
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
