<template>
  <div class="container">
    <nav-bar />
    <div style="padding: 40px 100px">
      <div class="h1">Onboarding Institution</div>
      <e-steps
        :steps="steps"
        :active="activeTab"
        @active-tab="activeTabChange"
      ></e-steps>

      <tab1
        v-if="activeTab == 1"
        @save="
          activeTab = 2;
          scrollTop();
        "
      />
      <tab2
        ref="tab2"
        v-if="activeTab == 2"
        @back="activeTab = 1"
        @save="activeTab = 3"
      />
      <tab3
        v-if="activeTab == 3"
        @back="activeTab = 2"
        @save="$go($url.LIST_OF_CAMPUS)"
      />
    </div>
  </div>
</template>
<script>
import navBar from "@/components/onboarding/navBar.vue";
import tab1 from "@/components/onboarding/InstituteDetail/InstituteDetail.Tab1.vue";
import tab2 from "@/components/onboarding/InstituteDetail/InstituteDetail.Tab2.vue";
import tab3 from "@/components/onboarding/InstituteDetail/InstituteDetail.Tab3.vue";
export default {
  components: {
    tab1,
    tab2,
    tab3,
    navBar,
  },
  data() {
    return {
      req: {},
      activeTab: 1,

      steps: [
        {
          id: 1,
          icon: "hq/standards",
          title: "Institution",
        },
        {
          id: 2,
          icon: "campus",
          title: "Campus",
        },
        {
          id: 3,
          icon: "hq/healthRecords",
          title: "Other",
        },
      ],
    };
  },
  methods: {
    activeTabChange(e) {
      this.activeTab = e;
    },
  },
};
</script>
<style scoped>
.container {
  height: 100vh;
  background-color: #f7f9fb;
  overflow-y: scroll;
}
</style>
