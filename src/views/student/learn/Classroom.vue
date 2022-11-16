<template>
  <div>
    <es-container
      pageTitle="Classes"
      @switchChange="switchValue = !switchValue"
      switchText1="classes"
      switchText2="Study Group"
    >
      <!-- =====================SWITHCH======================= -->
      <div style="height: 61vh; overflow: auto">
        <classroom-class v-if="switchValue" />
        <classroom-study v-else />
      </div>
    </es-container>
  </div>
</template>
<script>
import classroomClass from "../../../components/student/learn/classroomClass.vue";
import classroomStudy from "../../../components/student/learn/classroomStudyGroup.vue";
import { mapMutations } from "vuex";
export default {
  components: { classroomClass, classroomStudy },
  data() {
    return {
      searchBy: "",
      switchValue: true,
      tab: "tab1",
      subjects: [
        {
          title: "Class 4",
          value: "Class 4",
        },
        {
          title: "Science",
          value: "Science",
        },
      ],
      errors: [],
      isReady: false,
      isRecording: false,
      loading: false,
      sapio: {
          token: null,
          connectionId: 0
      },
      server: {
          host: 'https://rtc.test',
          ws: '/server',
          socket: null,
      },
      peer: {},
      showSideBar: false,
      activeName: "activeclassroom",
      filter: [
        { text: "Standard" },
        { text: "Standard 2" },
        { text: "Standard 3" },
      ],
      filter2: [
        { text: "Subject" },
        { text: "Subject 1" },
        { text: "Subject 2" },
      ],
      activeEmployeesReport: [
        {
          title: "Total Employees",
          value: "60",
          icon: "hq/employees",
        }]
    }
  },
  mounted() {
      this.init();
  },
  methods: {
    ...mapMutations("Common", [
      "setAsideMenuCollapse",
      "setAsideWidth",
      "setBg",
    ]),
    activeTabChange(e) {
      this.activeTab = e;
    },
    scrollTop() {
      this.$nextTick(() => {
        this.$refs.tab2.scrollTop = 0;
      });
    },

    addNewEmployees() {
      this.$router.push(this.$url.LN_CLASSROOM_FORM);
    },

    ptest(d) {
      console.log(d);
    },
  },
  mounted() {
    this.setAsideMenuCollapse(true);
    setTimeout(() => {
      this.setAsideWidth("100px");
    }, 100);
    this.setBg("black");
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
