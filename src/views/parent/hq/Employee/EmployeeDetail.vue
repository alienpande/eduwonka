<template>
  <e-container hideHeader pageTitle="Add Standard" :back="$url.HQ_STANDARDS">
    <e-steps
      width="350px"
      :steps="steps"
      :active="activeTab"
      @active-tab="activeTabChange"
    ></e-steps>

    <standard-form-tab-1
      v-if="activeTab == 1"
      @save="
        activeTab = 2;
        scrollTop();
      "
    />
    <standard-form-tab-2
      ref="tab2"
      v-if="activeTab == 2"
      @back="activeTab = 1"
      @save="activeTab = 3"
    />
  </e-container>
</template>
<script>
import { mapMutations } from "vuex";
import StandardFormTab1 from "@/components/hq/Standards/StandardForm.Tab1.vue";
import StandardFormTab2 from "@/components/hq/Standards/StandardForm.Tab2.vue";
export default {
  components: {
    StandardFormTab1,
    StandardFormTab2,
  },
  data() {
    return {
      activeTab: 1,
      student: {
        name: "",
        gender: "female",
      },
      qualifications: [
        {
          label: "Post-Graduation",
          value: "pg",
        },
        {
          label: "Graduation",
          value: "g",
        },
        {
          label: "Secondary School",
          value: "ss",
        },
      ],
      profession: [
        {
          label: "Buisness",
          value: "business",
        },
        {
          label: "Service",
          value: "service",
        },
        {
          label: "Home Maker",
          value: "homemaker",
        },
      ],
      steps: [
        {
          id: 1,
          icon: "hq/standards",
          title: "Details",
        },
        {
          id: 2,
          icon: "hq/healthRecords",
          title: "Sequencing",
        },
      ],
    };
  },
  methods: {
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth"]),
    addNewStudent() {
      alert("asasd");
    },
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
