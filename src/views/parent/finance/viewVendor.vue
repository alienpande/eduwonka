<template>
  <e-container hideHeader pageTitle="View Vendor" :back="$url.FI_VENDOR">
    <e-steps
      :steps="steps"
      :active="activeTab"
      @active-tab="activeTabChange"
      style="width: 470px"
    ></e-steps>

    <viewVendor
      v-if="activeTab == 1"
      @save="
        activeTab = 2;
        scrollTop();
      "
    />
    <viewVendor1
      ref="tab2"
      v-if="activeTab == 2"
      @back="activeTab = 1"
      @save="activeTab = 3"
    />
    <viewVendor2
      v-if="activeTab == 3"
      @back="activeTab = 2"
      @save="activeTab = 1"
    />
  </e-container>
</template>
<script>
import { mapMutations } from "vuex";
import viewVendor from '@/components/finance/vendor/viewVendor1.vue'
import viewVendor1 from '@/components/finance/vendor/viewVendor2.vue'
import viewVendor2 from '@/components/finance/vendor/viewVendor3.vue'

// import SubjectYearInput from "@/components/hq/Employee/SubjectYear.Input.vue";
export default {
  components: { viewVendor, viewVendor1, viewVendor2 },
  data() {
    return {
      activeTab: 1,
      steps: [
        {
          id: 1,
         icon: "learn/Audience",
          title: "Vendor Details",
        },
        {
          id: 2,
        icon: "hq/healthRecords",
          title: "Audience",
        },
        {
          id: 3,
          icon: "invoice-details",
          title: "Invoice Details",
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
    this.setAsideMenuCollapse(false);
    setTimeout(() => {
      this.setAsideWidth("290px");
    }, 100);
  },
  created() {
    this.setAsideMenuCollapse(false);
    this.setAsideWidth("290px");
  },
  destroyed() {
    this.setAsideMenuCollapse(false);
  },
};
</script>

<style>
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
>
