<template>
  <div>
    <es-container hideHeader pageTitle="Add Fee" :back="$url.FI_FEE_RECEIPTS" class="bg-black-5">
      <es-steps :steps="steps" :active="activeTab" @active-tab="activeTabChange" style="width:400px" />
      <fee-details-1 v-if="activeTab == 1" @save="setFeeData" @back="$url.LN_ASSIGNMENTS" />
      <fee-details-2 ref="tab2" v-if="activeTab == 2" :feeId="feeId" @back="activeTab = 1" />
    </es-container>
  </div>
</template>

<script>
import { mapMutations } from "vuex"
import feeDetails1 from "@/components/student/finance/feeDetails1.vue"
import feeDetails2 from "@/components/student/finance/feeDetails2.vue"
export default {
  components: { feeDetails1, feeDetails2 },
  data: () => ({
    activeTab: 1,
    feeId: '',
    steps: [
      {
        id: 1,
        icon: "groupDetails",
        title: "Fee Details",
      },
      {
        id: 2,
        icon: "pen3",
        title: "Payment Details",
      },
    ],
  }),
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
  methods: {
    setFeeData: function(val) {
      this.feeId = val
      this.activeTab = 2
    },
    activeTabChange(e) {
      this.activeTab = e;
    },
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth"]),
    ptest(d) {
      console.log(d);
    },
  },
};
</script>

<style>
.details-heading {
  color: #000000cc;
  font-weight: 600;
}
.details-text {
  color: #888888;
  margin-bottom: 9px;
}
.circle-bar {
  width: 10px;
  height: 10px;

  display: inline-block;
  margin-top: 6px;
  margin-right: 7px;
  border-radius: 50%;
}

.total-fees .el-table td,
.el-table th.is-leaf {
  border-bottom: none;
}
.total-fees .el-table__row td:first-child {
  border: 1px solid #70707033 !important;
  border-bottom: none !important;
  border-top: none !important;
  color: #00000099 !important;
  /* border-right:1px solid #707070 !important; */
}
.total-fees .el-table__row td:last-child {
  border: 1px solid #70707033 !important;
  border-bottom: none !important;
  border-top: none !important;
  border-left: none !important;
  color: red !important;
  /* border-right:1px solid #707070 !important; */
}
.total-fees .el-pagination {
  display: none !important;
}
.details-expenses__textarea {
  box-shadow: 0px 1px 3px #11111112;
  border: 1px solid #cccccc;
  border-radius: 4px;
  padding: 10px;
}
.hr-line {
  display: block;
  width: 99.6%;
  height: 1px;
  background: #cccccc;
}
</style>
