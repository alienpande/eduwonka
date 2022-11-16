<template>
  <e-container hideHeader pageTitle="Create quick test" :back="$url.LN_EXAM + '/standard/' + $route.params.standard_id + '/subject/' + $route.params.subject_id" >
    <e-steps :steps="steps" :active="activeTab" @active-tab="activeTabChange" style="width: 470px" />

    <test-1 v-if="activeTab == 1" @save="setQuickTest" />
    <test-2 ref="tab2" :quickTest="quickTest" v-if="activeTab == 2" @back="activeTab = 1" @save="activeTab = 3" />
    <test-3 v-if="activeTab == 3" :quickTest="quickTest" @back="activeTab = 2" @save="$router.push($url.LN_EXAM + '/standard/' + $route.params.standard_id + '/subject/' + $route.params.subject_id)" />
  </e-container>
</template>
<script>
import test1 from "@/components/learn/exam/test1.vue"
import test2 from "@/components/learn/exam/test2.vue"
import test3 from "@/components/learn/exam/test3.vue"
import { mapMutations } from "vuex"
export default {
  components: { test1, test2, test3 },
  data() {
    return {
      quickTest: {},
      activeTab: 1,
      steps: [
        {
          id: 1,
          icon: "hq/healthRecords",
          title: "Details",
        },
        {
          id: 2,
          icon: "learn/Help",
          title: "Questions",
        },
        {
          id: 3,
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
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth","hideAsideMenuMobile"]),
    activeTabChange(e) {
      this.activeTab = e;
    },
    scrollTop() {
      this.$nextTick(() => {
        this.$refs.tab2.scrollTop = 0;
      });
    },
    setQuickTest(value) {
      this.quickTest = value
      this.activeTab = 2
    }
  },
  mounted() {
    // this.setAsideMenuCollapse(false);
    // setTimeout(() => {
    //   this.setAsideWidth("290px");
    // }, 100);
    this.hideAsideMenuMobile();
  },
  created() {
    // this.setAsideMenuCollapse(false);
    // this.setAsideWidth("290px");
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
