<template>
  <div>
    <e-container
      hideHeader
      pageTitle="Create certificate"
      :back="$url.LN_CERTIFICATE"
    >
      <e-steps
        :steps="steps"
        :active="activeTab"
        @active-tab="activeTabChange"
         style="width:300px"
      ></e-steps>
      <certificate-form-1
        v-if="activeTab == 1"
        @save="
          activeTab = 2;
          scrollTop();
        "
      />
        <certificate-form-2
      ref="tab2"
      v-if="activeTab == 2"
      @back="activeTab = 1"
    />
    </e-container>
  </div>
</template>
<script>
import certificateForm1 from "@/components/learn/certificate/certificateForm1.vue";
import certificateForm2 from "@/components/learn/certificate/certificateForm2.vue";

import { mapMutations } from "vuex";

export default {
  components: { certificateForm1,certificateForm2 },
  data: () => ({
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
