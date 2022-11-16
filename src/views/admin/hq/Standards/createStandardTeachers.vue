<template>
  <div>
    <e-container
      
      hideHeader
      pageTitle="Add Teacher"
      :back="$url.HQ_STANDARD_TEACHERS+'/1'"
    >
      <e-steps
        :steps="steps"
        :active="activeTab"
        @active-tab="activeTabChange"
         style="width:300px"
      ></e-steps>
      <create-teacher-1
        v-if="activeTab == 1"
        @save="
          activeTab = 2;
          scrollTop();
        "
      />
        <create-teacher-2
      ref="tab2"
      v-if="activeTab == 2"
      @back="activeTab = 1"
    />
    </e-container>
  </div>
</template>
<script>
import createTeacher1 from "@/components/hq/Standards/createTeacher1.vue";
import createTeacher2 from "@/components/hq/Standards/createTeacher2.vue";

import { mapMutations } from "vuex";

export default {
  components: { createTeacher1,createTeacher2 },
  data: () => ({
    activeTab: 1,
    steps: [
      {
        id: 1,
        icon: "hq/standards",
        title: "Student",
      },
      {
        id: 2,
        icon: "hq/student",
        title: "Audience",
      },
    ],
  }),
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
//    this.setAsideMenuCollapse(true);
//    this.setAsideWidth("100px");
  },
  destroyed() {
    this.setAsideMenuCollapse(false);
  },
};
</script>
