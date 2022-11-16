<template>
  <e-container class="appointments-add" hideHeader pageTitle="Create appointment" :back="`/connect/staff-apointment`">
    <e-steps :steps="steps" :active="activeTab" @active-tab="activeTabChange" style="width:300px" />
    <add-appointment-1 v-if="activeTab == 1" @save="handleAppointment" />
    <add-appointment-2 ref="tab2" v-if="activeTab == 2"
      :tabs="setTabs()"
      :appointmentId="appointmentId"
      :sections="sections"
      :teachers="teachers"
      :management="management"
      :non_teaching="non_teaching"
      :admins="admins"
      @back="activeTab = 1"
      @save="activeTab = 1"
    />
  </e-container>
</template>
<script>
import { mapMutations } from "vuex";
import addAppointment1 from '@/components/connect/apointment/addAppointment1.vue'
import addAppointment2 from'@/components/connect/apointment/addAppointment2.vue'
import { dispatchGraphql } from '@/api/dispatcher'
// import SubjectYearInput from "@/components/hq/Employee/SubjectYear.Input.vue";
export default {
  components: { addAppointment1 ,addAppointment2 },
  data() {
    return {
      appointmentId: '',
      sections: [],
      users: [],
      teachers: [],
      management: [],
      non_teaching: [],
      admins: [],
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
      req: {
        subjects: [],
      },
    };
  },
  methods: {
    setTabs() {
      var tabs = []
      if (this.$route.params.type === 'staff') {
        tabs = ['teacher', 'management', 'nonTeaching', 'admin', 'group']
      } else if (this.$route.params.type === 'parent') {
        tabs = ['student', 'parent', 'teacher', 'admin', 'group']
      } else if (this.$route.params.type === 'student') {
        tabs = ['student', 'teacher', 'admin', 'group']
      }
      return tabs
    },
    handleAppointment: function(val) {
      console.log('val', val)
      this.appointmentId = val
      this.activeTab = 2
      this.scrollTop()
    },
    getUsers() {
      const query = `
        query {
          users {
            id
            first_name
            role
          }
        }
      `
      dispatchGraphql(query).then(response => {
        this.users = response.users
        this.teachers = this.users.filter(x => (x.role === 'teacher' || x.role === 'employee'))
        this.management = this.users.filter(x => x.role === 'management')
        this.non_teaching = this.users.filter(x => x.role === 'staff')
        this.admins = this.users.filter(x => x.role === 'admin')
      })
    },
    getStandards() {
      const query = `
        query {
          sections(order_by: {standard: {name: asc}}) {
            id
            name
            standard {
              id
              name
            }
          }
        }
      `
      dispatchGraphql(query).then(response => {
        this.sections = response.sections
      })
    },
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth"]),
     activeTabChange(e) {
      this.activeTab = e;
    },
    scrollTop() {
       console.log('ssssssssss', this.appointment);
      this.$nextTick(() => {
        this.$refs.tab2.scrollTop = 0;
      });
    },
  },
  mounted() {
    // this.setAsideMenuCollapse(true);
    // setTimeout(() => {
    //   this.setAsideWidth("260px");
    // }, 100);
  },
  created() {
    this.getStandards()
    this.getUsers()
//    this.setAsideMenuCollapse(true);
//    this.setAsideWidth("1110px");
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
