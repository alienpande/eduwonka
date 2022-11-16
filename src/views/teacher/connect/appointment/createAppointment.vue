<template>
  <e-container hideHeader pageTitle="Create appointment" :back="`/connect/staff-apointment`">
     <e-steps
      :steps="steps"
      :active="activeTab"
      @active-tab="activeTabChange"
      style="width:300px"
    ></e-steps>

    <add-appointment-1
      v-if="activeTab == 1"
      @save="
        activeTab = 2;
        scrollTop();
      "
    />
    <add-appointment-2
      ref="tab2"
      v-if="activeTab == 2"
      @back="activeTab = 1"
    />


  </e-container>
</template>
<script>
import { mapMutations } from "vuex";
import addAppointment1 from '@/components/connect/apointment/addAppointment1.vue'
import addAppointment2 from'@/components/connect/apointment/addAppointment2.vue'

// import SubjectYearInput from "@/components/hq/Employee/SubjectYear.Input.vue";
export default {
  components: { addAppointment1 ,addAppointment2},
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
          icon: "hq/student",
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
    this.setAsideMenuCollapse(true);
    setTimeout(() => {
      this.setAsideWidth("260px");
    }, 100);
  },
  created() {
//    this.setAsideMenuCollapse(true);
//    this.setAsideWidth("1110px");
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
