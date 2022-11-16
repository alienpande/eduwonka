<template>
  <e-container hideHeader pageTitle="Create lesson" :back="$url.LN_LESSON">
    <e-steps
      :steps="steps"
      :active="activeTab"
      @active-tab="activeTabChange"
      style="width: 470px"
    ></e-steps>

    <lesson-create-1
      v-if="activeTab == 1"
      @save="
        activeTab = 2;
        scrollTop();
      "
    />
    <lesson-create-2
      ref="tab2"
      v-if="activeTab == 2"
      @back="activeTab = 1"
      @save="activeTab = 3"
    />
    <lesson-create-3
      v-if="activeTab == 3"
      @back="activeTab = 2"
      @save="activeTab = 1"
    />
  </e-container>
</template>
<script>
import { mapMutations } from "vuex";
import lessonCreate1 from "@/components/learn/lesson/lessonCreate1.vue";
import lessonCreate2 from "@/components/learn/lesson/lessonCreate2.vue";
import lessonCreate3 from "@/components/learn/lesson/lessonCreate3.vue";

// import SubjectYearInput from "@/components/hq/Employee/SubjectYear.Input.vue";
export default {
  components: { lessonCreate1, lessonCreate2, lessonCreate3 },
  data() {
    return {
      activeTab: 1,
      steps: [
        {
          id: 1,
          icon: "hq/healthRecords",
          title: "Type",
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
