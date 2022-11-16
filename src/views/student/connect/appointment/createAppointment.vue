<template>
  <es-container hideHeader pageTitle="Create appointment" :back="`/connect/staff-apointment`" class="bg-black-5">
    <es-steps :steps="steps" :active="activeTab" @active-tab="activeTabChange" style="width:400px" />
    <add-appointment-1 v-if="activeTab == 1" @save="handleAppointment" />
    <add-appointment-2 ref="tab2" v-if="activeTab == 2"
    :tabs="setTabs()"
      :appointmentId="appointmentId"
      :students="students"
      :teachers="teachers"
      :management="management"
      :non_teaching="non_teaching"
      :admins="admins"
      @back="activeTab = 1"
      @save="activeTab = 1"
    />
  </es-container>
</template>
<script>
import addAppointment1 from '@/components/student/connect/appointment/addAppointment1.vue'
import addAppointment2 from'@/components/student/connect/appointment/addAppointment2.vue'
import { dispatchGraphql } from '@/api/dispatcher'
export default {
  components: { addAppointment1 ,addAppointment2 },
  data() {
    return {
      appointmentId: '',
      users: [],
      students: [],
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
  created() {
    this.getUsers()
  },
  destroyed() {},
  methods: {
    setTabs() {
      var tabs = []
      if (this.$route.params.type === 'staff') {
        tabs = ['teacher', 'management', 'nonTeaching', 'admin']
      } else if (this.$route.params.type === 'parent') {
        tabs = ['student', 'parent', 'teacher', 'admin']
      } else if (this.$route.params.type === 'student') {
        tabs = ['student', 'teacher', 'admin']
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
            student_parents {
              id
              user {
                id
                first_name
                role
              }
            }
          }
        }
      `
      dispatchGraphql(query).then(response => {
        this.users = response.users
        this.students = this.users.filter(x => x.role === 'student')
        this.teachers = this.users.filter(x => (x.role === 'teacher' || x.role === 'employee'))
        this.management = this.users.filter(x => x.role === 'management')
        this.non_teaching = this.users.filter(x => x.role === 'staff')
        this.admins = this.users.filter(x => x.role === 'admin')
      })
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
