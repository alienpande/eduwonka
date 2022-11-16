<template>
  <e-container hideHeader pageTitle="Add Vendor" :back="$url.FI_VENDOR">
     <e-steps
      :steps="steps"
      :active="activeTab"
      @active-tab="activeTabChange"
      style="width:300px"
    ></e-steps>

    <add-vendor-1
      v-if="activeTab == 1"
      @save="
        activeTab = 2;
        scrollTop();
      "
    />
    <add-vendor-2
      ref="tab2"
      v-if="activeTab == 2"
      @back="activeTab = 1"
    />


  </e-container>
</template>
<script>
import { mapMutations } from "vuex";
import addVendor1 from '@/components/finance/vendor/addVendor1.vue'
import addVendor2 from '@/components/finance/vendor/addVendor2.vue'

// import SubjectYearInput from "@/components/hq/Employee/SubjectYear.Input.vue";
export default {
  components: { addVendor1 ,addVendor2},
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
