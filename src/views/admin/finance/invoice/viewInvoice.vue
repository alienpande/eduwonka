<template>
  <e-container hideHeader pageTitle="View Invoice" :back="$url.FI_INVOICE">
    <e-steps :steps="steps" :active="activeTab" @active-tab="activeTabChange" style="width:300px" />

    <view-invoice-1 v-if="activeTab == 1 && invoice.id" :invoice="invoice" @save="activeTab == 2" />
    <view-invoice-2 ref="tab2" :invoice="invoice" v-if="activeTab == 2" @back="activeTab = 1" />

  </e-container>
</template>
<script>
import viewInvoice1 from '@/components/finance/invoice/viewInvoice1.vue'
import viewInvoice2 from '@/components/finance/invoice/viewInvoice2.vue'
import { dispatchGraphql } from '@/api/dispatcher'
import { mapMutations } from "vuex";
// import SubjectYearInput from "@/components/hq/Employee/SubjectYear.Input.vue";
export default {
  components: { viewInvoice1, viewInvoice2 },
  data() {
    return {
      activeTab: 1,
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
      invoice: {},
    };
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
    getinvoice() {
      const query = `query {
        invoices_by_pk(id: "${this.$route.params.id}") {
          id
          invoice_number
          issued_date
          due_date
          total_amount
          paid_amount
          vendor_id
          updated_at
          approval_recommendation {
            id
            user {
              id
              first_name
            }
          }
          vendor_information {
            id
            contact_person
            contact_person_number
            gst_number
            tin_number
            bank_details {
              id
              account_holder
              bank_name
              ifsc_code
              account_no
            }
            user {
              id
              first_name
              address
            }
          }
          invoice_items {
            id
            name
            description
            quantity
            price
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.invoice = response.invoices_by_pk
      })
    }
  },
  mounted() {
    /* this.setAsideMenuCollapse(true);
    setTimeout(() => {
      this.setAsideWidth("100px");
    }, 100); */
  },
  created() {
    this.getinvoice()
   // this.setAsideMenuCollapse(true);
   // this.setAsideWidth("280px");
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
