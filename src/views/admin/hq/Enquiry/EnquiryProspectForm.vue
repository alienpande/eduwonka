<template>
  <e-container
    class="hq-enquiry-form"
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
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth","hideAsideMenuMobile"]),
    scrollTop() {
      this.$nextTick(() => {
        this.$refs.tab2.scrollTop = 0;
      });
    },
  },
  mounted() {
    this.hideAsideMenuMobile()
  },
  created() {

  },
  destroyed() {
    this.setAsideMenuCollapse(false);
  },
};
</script>
