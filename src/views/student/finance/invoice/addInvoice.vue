<template>
  <e-container hideHeader pageTitle="Add Invoice" :back="$url.FI_INVOICE">
     <e-steps
      :steps="steps"
      :active="activeTab"
      @active-tab="activeTabChange"
      style="width:300px"
    ></e-steps>

    <add-invoice-1
      v-if="activeTab == 1"
      @save="
        activeTab = 2;
        scrollTop();
      "
    />
    <add-invoice-2
      ref="tab2"
      v-if="activeTab == 2"
      @back="activeTab = 1"
    />


  </e-container>
</template>
<script>
import { mapMutations } from "vuex";
import addInvoice1 from '@/components/finance/invoice/addInvoice1.vue'
import addInvoice2 from '@/components/finance/invoice/addInvoice2.vue'
// import SubjectYearInput from "@/components/hq/Employee/SubjectYear.Input.vue";
export default {
  components: { addInvoice1 ,addInvoice2},
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
