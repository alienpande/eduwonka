<template>
  <e-container
    hideHeader
    pageTitle="Add Student Enquiry"
    :back="$url.HQ_ENQUIRES"
  >
    <enquiry-form :showEnquiryDetailOnly="true" />
  </e-container>
</template>
<script>
import { mapMutations } from "vuex";
import EnquiryForm from "@/components/hq/Enquiry/EnquiryForm.vue";
export default {
  components: {
    EnquiryForm,
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
