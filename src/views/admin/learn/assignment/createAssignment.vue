
<template>
  <e-container class="learn-add-assignment learn-create-assign" hideHeader pageTitle="Create assignment" :back="$url.LN_ASSIGNMENTS">
     <e-steps
      :steps="steps"
      :active="activeTab"
      @active-tab="activeTabChange"
      style="width:300px"
    ></e-steps>

    <assign-form-1
      v-if="activeTab == 1"
      @save="assignmentInfo"
    />
    <assign-form-2
    :assignmentId="assignmentId"
      ref="tab2"
      v-if="activeTab == 2"
      @back="activeTab = 1"
    />


  </e-container>
</template>
<script>
import { mapMutations } from "vuex";
import assignForm1 from '@/components/learn/assignment/assignForm1.vue'
import assignForm2 from '@/components/learn/assignment/assignForm2.vue'

// import SubjectYearInput from "@/components/hq/Employee/SubjectYear.Input.vue";
export default {
  components: { assignForm1 ,assignForm2},
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
      assignmentId: {},
      req: {
        subjects: [],
      },
    };
  },
  methods: {
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth","hideAsideMenuMobile"]),
     activeTabChange(e) {
      this.activeTab = e;
    },
    assignmentInfo: function(val) {
      this.assignmentId = val
      console.log("id in create", this.assignmentId)
      this.activeTab = 2;
      this.scrollTop();
    },
     scrollTop() {
      this.$nextTick(() => {
        this.$refs.tab2.scrollTop = 0;
      });
    },
  },
  mounted() {
    // this.setAsideMenuCollapse(true);
    // setTimeout(() => {
    //   this.setAsideWidth("290px");
    // }, 100);
    this.hideAsideMenuMobile();
  },
  created() {
//    this.setAsideMenuCollapse(true);
//    this.setAsideWidth("100px");
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
