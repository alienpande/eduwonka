<template>
  <e-container hideHeader pageTitle="View Student" :back="$url.HQ_STUDENT">
    <e-steps
      :steps="steps"
      :active="activeTab"
      @active-tab="activeTabChange"
      class="view-student-steps"
    ></e-steps>

    <student-detail-tab-1
      v-if="activeTab == 1"
      @save="activeTab = 2;
      scrollTop();"
    />
    <student-detail-tab-2
      ref="tab2"
      v-if="activeTab == 2"
      @back="activeTab = 1"
      @save="activeTab = 3"
    />
    <student-detail-tab-3
      :studentsid = "studentsid"
      v-if="activeTab == 3"
      @back="activeTab = 2"
      @save="$router.push($url.HQ_STUDENT)"
    />
  </e-container>
</template>

<script>
import { mapMutations } from "vuex"
import StudentDetailTab1 from "@/components/hq/Students/StudentDetail1.vue"
import StudentDetailTab2 from "@/components/hq/Students/StudentDetail2.vue"
import StudentDetailTab3 from "@/components/hq/Students/StudentDetail3.vue"
export default {
  components: {
    StudentDetailTab1,
    StudentDetailTab2,
    StudentDetailTab3
  },
  data() {
    return {
      studentsid:'',
      activeTab: 1,
      steps: [
        {
          id: 1,
          icon: "hq/student",
          title: "Student",
        },
        {
          id: 2,
          icon: "hq/student",
          title: "Guardian",
        },
        {
          id: 3,
          icon: "hq/student",
          title: "Medical",
        },
      ]
    }
  },
  methods: {
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth","hideAsideMenuMobile"]),
    addNewStudent() {
      alert("asasd");
    },
    activeTabChange(e) {
      this.activeTab = e
    },
    scrollTop() {
      this.$nextTick(() => {
        this.$refs.tab2.scrollTop = 0;
      })
    },
  },
  mounted() {
    // this.setAsideMenuCollapse(true)
    // setTimeout(() => {
    //   this.setAsideWidth("100px");
    // }, 100)
    this.hideAsideMenuMobile();
  },
  created() {
    this.studentsid = this.$route.params.specificStudentId
    // this.setAsideMenuCollapse(true)
    // this.setAsideWidth("100px")
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

@media only screen and (max-width:767px){
  .view-student-steps >>> div{
    flex-direction: row;
  }
  .view-student-steps >>> .eStep>div>div>.el-step__icon.is-text{
    min-width: 100px;
    height: 100px;
  }
  .view-student-steps >>> .el-step__line {
    transform: rotate(0deg);
    top: 50px !important;
  }
}
</style>
