<template>
  <e-container hideHeader pageTitle="Create event" :back="$url.SH_EVENT_CALENDER">
    <e-steps :steps="steps" :active="activeTab" @active-tab="activeTabChange" style="width:300px" ></e-steps>

    <create-event-1 v-if="activeTab == 1" @save="handleEvent" />
    <create-event-2 ref="tab2" v-if="activeTab == 2" @back="activeTab = 1"
      :eventId="eventId"
      :sections="sections"
      :teachers="teachers"
      :management="management"
      :non_teaching="non_teaching"
    />

  </e-container>
</template>
<script>
import { mapMutations } from "vuex"
import createEvent1 from '../../../../components/school/EventCalender/createEvent1.vue'
import createEvent2 from '../../../../components/school/EventCalender/createEvent2.vue'
import { dispatchGraphql } from '@/api/dispatcher'

// import SubjectYearInput from "../../../components/hq/Employee/SubjectYear.Input.vue";
export default {
  components: { createEvent1, createEvent2 },
  data() {
    return {
      EventId: '',
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
      sections: [],
      users: [],
      teachers: [],
      management: [],
      non_teaching: [],
    };
  },
  methods: {
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
    getTeachers() {
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
        this.teachers = this.users.filter(x => x.role === 'teacher')
        this.management = this.users.filter(x => x.role === 'management')
        this.non_teaching = this.users.filter(x => x.role === 'admin')
        // console.log('users', this.teachers, this.management, this.non_teaching)
      })
    },
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth","hideAsideMenuMobile"]),
     activeTabChange(e) {
      this.activeTab = e;
    },
     scrollTop() {
      this.$nextTick(() => {
        this.$refs.tab2.scrollTop = 0
      })
    },
    handleEvent: function(val) {
      console.log('val', val)
      this.eventId = val
      this.activeTab = 2
      this.scrollTop()
    }
  },
  mounted() {
    // this.setAsideMenuCollapse(true)
    // setTimeout(() => {
    //   this.setAsideWidth("100px")
    // }, 100)
    this.hideAsideMenuMobile();
  },
  created() {
    // this.getStandards()
    // this.getTeachers()
    // this.setAsideMenuCollapse(true)
    // this.setAsideWidth("280px")
  },
  destroyed() {
    this.setAsideMenuCollapse(false)
  }
}
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

