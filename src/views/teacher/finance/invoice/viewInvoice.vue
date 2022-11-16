<template>
  <e-container hideHeader pageTitle="View Invoice" :back="$url.FI_INVOICE">
     <e-steps
      :steps="steps"
      :active="activeTab"
      @active-tab="activeTabChange"
      style="width:300px"
    ></e-steps>

    <view-invoice-1
      v-if="activeTab == 1"
      @save="
        activeTab = 2;
        scrollTop();
      "
    />
    <view-invoice-2
      ref="tab2"
      v-if="activeTab == 2"
      @back="activeTab = 1"
    />


  </e-container>
</template>
<script>
import { mapMutations } from "vuex";
import viewInvoice1 from '@/components/finance/invoice/viewInvoice1.vue'
import viewInvoice2 from '@/components/finance/invoice/viewInvoice2.vue'
// import SubjectYearInput from "@/components/hq/Employee/SubjectYear.Input.vue";
export default {
  components: { viewInvoice1 ,viewInvoice2},
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
      req: {
        subjects: [],
      },
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
