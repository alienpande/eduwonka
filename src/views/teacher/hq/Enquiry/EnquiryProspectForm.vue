<template>
  <e-container
    hideHeader
    pageTitle="Add Prospect Enquiry"
    :back="$url.HQ_ENQUIRES"
  >
    <enquiry-form />
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
