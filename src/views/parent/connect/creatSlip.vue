<template>
  <e-container hideHeader pageTitle="Create Slip" :back="`/connect/permission-slip`">
     <e-steps
      :steps="steps"
      :active="activeTab"
      @active-tab="activeTabChange"
      style="width:300px"
    ></e-steps>

    <create-slip-1
      v-if="activeTab == 1"
      @save="
        activeTab = 2;
        scrollTop();
      "
    />
    <create-slip-2
      ref="tab2"
      v-if="activeTab == 2"
      @back="activeTab = 1"
    />


  </e-container>
</template>
<script>
import { mapMutations } from "vuex";
import createSlip1 from '@/components/connect/slip/createSlip1.vue'
import createSlip2 from'@/components/connect/slip/createSlip2.vue'

// import SubjectYearInput from "@/components/hq/Employee/SubjectYear.Input.vue";
export default {
  components: { createSlip1 ,createSlip2},
  data() {
    return {
         activeTab: 1,
          steps: [
        {
          id: 1,
         icon: "hq/healthRecords",
          title: "Details",
        },
        {
          id: 2,
          icon: "learn/Audience",
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
    this.setAsideMenuCollapse(true);
    this.setAsideWidth("260");
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
