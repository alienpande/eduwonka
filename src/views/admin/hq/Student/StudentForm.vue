<template>
  <e-container class="hq-add-student-form" hideHeader pageTitle="Add Student" :back="$url.HQ_STUDENT">
    <e-steps
      :steps="steps"
      :active="activeTab"
      @active-tab="activeTabChange"
    ></e-steps>

    <student-form-tab-1
      v-if="activeTab == 1"
      @save="studentData"
    />
    <student-form-tab-2
      ref="tab2"
      :studentId="studentId"
      v-if="activeTab == 2"
      @back="activeTab = 1"
      @save="studentHealth"
    />
    <student-form-tab-3
    :student1Id="student1Id"
      v-if="activeTab == 3"
      @back="activeTab = 2"
      @save="$router.push($url.HQ_STUDENT)"
    />
  </e-container>
</template>
<script>
import { mapMutations } from "vuex";
import StudentFormTab1 from "@/components/hq/Students/StudentForm.Tab1.vue";
import StudentFormTab2 from "@/components/hq/Students/StudentForm.Tab2.vue";
import StudentFormTab3 from "@/components/hq/Students/StudentForm.Tab3.vue";
export default {
  components: {
    StudentFormTab1,
    StudentFormTab2,
    StudentFormTab3,
  },
  data() {
    return {
      studentId: '',
      student1Id: '',
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
      ],
    };
  },
  methods: {
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth","hideAsideMenuMobile"]),
    addNewStudent() {
      alert("asasd");
    },
    activeTabChange(e) {
      this.activeTab = e;
    },
    studentData: function(val) {
      this.studentId = val
      this.activeTab = 2;
      this.scrollTop();
    },
    studentHealth: function(val) {
      this.student1Id = val
      this.activeTab = 3;
      this.scrollTop();
    },
    scrollTop() {
      this.$nextTick(() => {
        this.$refs.tab2.scrollTop = 0;
      });
    },
  },
  mounted() {
    this.hideAsideMenuMobile();
  },
  created() {
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
