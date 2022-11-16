

<template>
  <e-container
    hideHeader
    pageTitle="Assign Approver to Leave "
    :back="$url.HQ_LEAVE_MANAGEMENT_MARK_APPROVAL"
  >
    <e-steps
      :steps="steps"
      :active="activeTab"
      @active-tab="activeTabChange"
      style="width: 470px"
    ></e-steps>

    <leaveDetail1
      v-if="activeTab == 1"
      @save="
        activeTab = 2;
        scrollTop();
      "
    />
    <leaveDetail2
      ref="tab2"
      v-if="activeTab == 2"
      @back="activeTab = 1"
      @save="activeTab = 3"
    />
    <leaveDetail3
      v-if="activeTab == 3"
      @edit="activeTab = 2"
      @back="activeTab = 2"
      @save="activeTab = 1"
    />
  </e-container>
</template>
<script>
import { mapMutations } from "vuex";
import leaveDetail1 from '@/components/hq/leaveDetail1.vue'
import leaveDetail2 from '@/components/hq/leaveDetail2.vue'
import leaveDetail3 from '@/components/hq/leaveDetail3.vue'

// import SubjectYearInput from "../../../components/hq/Employee/SubjectYear.Input.vue";
export default {
  components: { leaveDetail1, leaveDetail2, leaveDetail3 },
  data() {
    return {
      unregisDetails:[],
      activeTab: 1,
      steps: [
        {
          id: 1,
          icon: "hq/leaveManagement",
          title: "Leave Details",
        },
        {
          id: 2,
          icon: "hq/group",
          title: "Assign",
        },
        {
          id: 3,
          icon: "hq/healthRecords",
          title: "Summary",
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
    console.log("$$$$$$$$$$$$$$$$$$$$",this.unregisDetails)
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
