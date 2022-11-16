<template>
  <div>
    <es-container
      hideHeader
      pageTitle="VIew/ Edit Group"
      :back="$url.LN_CLASSROOM"
    >
      <es-steps
        :steps="steps"
        :active="activeTab"
        @active-tab="activeTabChange"
         style="width:300px"
      ></es-steps>
      <view-group-1
        v-if="activeTab == 1"
        @save="
          activeTab = 2;
          scrollTop();
        "
      />
       <view-group-2
      ref="tab2"
      v-if="activeTab == 2"
      @back="activeTab = 1"
    />
    </es-container>
  </div>
</template>
<script>
import viewGroup1 from "@/components/student/learn/class/viewGroup1.vue";
import viewGroup2 from "@/components/student/learn/class/viewGroup2.vue";
import { mapMutations } from "vuex";
export default {
  components: { viewGroup1,viewGroup2 },
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
