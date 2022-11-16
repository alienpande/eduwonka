<template>
  <div>
    <es-container
      hideHeader
      pageTitle="Create Group"
      :back="$url.LN_CLASSROOM"
    >
      <es-steps
        :steps="steps"
        :active="activeTab"
        @active-tab="activeTabChange"
         style="width:300px"
      ></es-steps>
      <group-details-1
        v-if="activeTab == 1"
        @save="
          activeTab = 2;
          scrollTop();
        "
      />
        <group-details-2
      ref="tab2"
      v-if="activeTab == 2"
      @back="activeTab = 1"
    />
    </es-container>
  </div>
</template>
<script>
import groupDetails1 from "@/components/student/learn/class/groupDetails1";
import groupDetails2 from "@/components/student/learn/class/groupDetails2";
import { mapMutations } from "vuex";
export default {
  components: { groupDetails1,groupDetails2 },
  data: () => ({
    activeTab: 1,
    steps: [
      {
        id: 1,
        icon: "groupDetails",
        title: "Details",
      },
      {
        id: 2,
        icon: "audiance",
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
