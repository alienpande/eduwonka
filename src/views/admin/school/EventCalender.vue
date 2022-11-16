<template>
  <e-container
    pageTitle="Event Calender"
    btnIcon="el-icon-plus"
    btnText="Create Event"
    @btnClick="$router.push($url.SH_CREATE_EVENT)"
  >
    <!-- <div style="position: absolute;width: 10rem;top: 190px;border-bottom: 1px solid #f3f3f3;padding-bottom: 13px;">
      <e-select multiple v-model="teacher_id" :options="users" :optionName="'first_name'" :valueKey="'id'" @visible-change="setTeacher" />
    </div> -->
    <div class="block">
      <e-select multiple collapseTags filterable clearable v-model="teacherIds" :options="users" :optionName="'first_name'" :valueKey="'id'" @visible-change="setTeacher" />
    </div><br />
    <el-row v-if="eventDates.length > 0 || timeTables.length > 0">
      <el-col :span="24">
        <calendar v-if="showCalendar" :eventDates="eventDates" :timeTables="timeTables" :ids="teacherIds" />
      </el-col>
      <!-- <el-col :span="7" :offset="1">
        <div style="display: flex;justify-content: space-between;margin-top: 30px;margin-bottom: 10px;">
          <div class="heading" style="margin: 0">Events</div>
        </div>
        <el-card style="height: 22rem; overflow: auto" shadow="none" class="rounded-08 pg-50">
          <e-table :table="getTodayEvents()" hidePagination shadow>
            <el-table-column label="Event" prop="event" />
            <el-table-column label="Time" prop="times" />
            <el-table-column label="Action" prop="url">
              <template slot-scope="scope">
                <el-button v-if="scope.row.url != 'No URL'" @click="setLink(scope.row)" type="text" size="small">Detail</el-button>
                <span v-else>NO URL</span>
              </template>
            </el-table-column>
          </e-table>
        </el-card>
      </el-col> -->
    </el-row>
  </e-container>
</template>
<script>
import Calendar from "@/components/calendar/index.vue"
import { dispatchGraphql, dispatchGraphqlQuery } from "@/api/dispatcher"
import { mapMutations } from "vuex"
import {getId} from "@/util/auth"
import moment from "moment"
export default {
  components: { Calendar },
  data() {
    return {
      users: [],
      teacherIds: [],
      timeTables: [],
      eventDates: [],
      showCalendar: false,
      classroomQuery: `query($teacherId: [uuid!]) {
        classrooms(where: {time_table: {teacher_id: {_in: $teacherId}}}) {
          id
          name
          class_date
          time_table {
            id
            start_time
            end_time
            teacher_id
            standard {
              id
              name
            }
          }
        }
      }`,
      appointmentQuery: `query($teacherId: [uuid!]) {
        audiences(where: {_and: [{user_id: {_in: $teacherId}}, {audienceable_type: {_eq: "Appointment"}}]}) {
          id
          user_id
          appointment {
            id
            title
            location
            start_time
            end_time
          }
        }
      }`,
      eventQuery: `query($teacherId: [uuid!]) {
        audiences(where: {_and: [{user_id: {_in: $teacherId}}, {audienceable_type: {_eq: "Event"}}]}) {
          id
          user_id
          event {
            id
            title
            start_time
            end_time
          }
        }
      }`,
      timeTableQuery: `query($teacherId: [uuid!]) {
        time_tables(where: {teacher_id: {_in: $teacherId}}) {
          id
          week_day
          start_time
          end_time
          teacher_id
          standard {
            id
            name
          }
          subject {
            id
            name
          }
          skill {
            id
            name
          }
        }
      }`
    }
  },
  created() {
    this.getUsers()
  },
  mounted() {
    this.hideAsideMenuMobile();
  },
  methods: {
    setLink(scope) {
      if (scope.type === 'appointment') {
        this.$go('/connect/online-meet/' + scope.url)
      } else if (scope.type === 'classroom') {
        this.$go('/learn/online-class/' + scope.url)
      }
    },
    // getTodayEvents() {
    //   var todayEvents = []
    //   if (this.events.length > 0) {
    //     for (const event of this.events) {
    //       if (event.type === 'classroom') {
    //         todayEvents.push({ type: event.type, event: event.data.time_table.standard.name + ' - ' + event.data.name, times: moment(event.data.time_table.start_time).format('HH:mm') + ' - ' + moment(event.data.time_table.end_time).format('HH:mm'), url: event.data.id })
    //       } else if (event.type === 'event') {
    //         todayEvents.push({ type: event.type, event: event.data.title, times: moment(event.data.start_time).format('HH:mm') + ' - ' + moment(event.data.end_time).format('HH:mm'), url: 'No URL' })
    //       } else if (event.type === 'appointment') {
    //         todayEvents.push({ type: event.type, event: event.data.title, times: moment(event.data.start_time).format('HH:mm') + ' - ' + moment(event.data.start_time).add(1, 'hours').format('HH:mm'), url: event.data.location === 'online' ? event.data.id : 'No URL'  })
    //       }
    //     }
    //   }
    //   if (todayEvents.length > 0) {
    //     return todayEvents
    //   }
    // },
    getMonthDates(slot) {
      var timeTable = []
      const Sundays = this.monthDates.filter(x => moment(x).format('dddd') === 'Sunday')
      const Mondays = this.monthDates.filter(x => moment(x).format('dddd') === 'Monday')
      const Tuesdays = this.monthDates.filter(x => moment(x).format('dddd') === 'Tuesday')
      const Wednesdays = this.monthDates.filter(x => moment(x).format('dddd') === 'Wednesday')
      const Thursdays = this.monthDates.filter(x => moment(x).format('dddd') === 'Thursday')
      const Fridays = this.monthDates.filter(x => moment(x).format('dddd') === 'Friday')
      const Saturdays = this.monthDates.filter(x => moment(x).format('dddd') === 'Saturday')
      if (slot.week_day === 'Sunday') {
        Sundays.map(x => {
          const start_time = moment(x).format('L') + ' ' + moment(slot.start_time).format('LTS')
          const end_time = moment(x).format('L') + ' ' + moment(slot.end_time).format('LTS')
          timeTable.push({
            start: moment(start_time).format(''),
            title: 'CLASS: ' + slot.standard.name + ' - ' + (slot.subject ? slot.subject.name : (slot.skill ? slot.skill.name : '')),
            end: moment(end_time).format(''),
          })
        })
      } else if (slot.week_day === 'Monday') {
        Mondays.map(x => {
          const start_time = moment(x).format('L') + ' ' + moment(slot.start_time).format('LTS')
          const end_time = moment(x).format('L') + ' ' + moment(slot.end_time).format('LTS')
          timeTable.push({
            start: moment(start_time).format(''),
            title: 'CLASS: ' + slot.standard.name + ' - ' + (slot.subject ? slot.subject.name : (slot.skill ? slot.skill.name : '')),
            end: moment(end_time).format(''),
          })
        })
      } else if (slot.week_day === 'Tuesday') {
        Tuesdays.map(x => {
          const start_time = moment(x).format('L') + ' ' + moment(slot.start_time).format('LTS')
          const end_time = moment(x).format('L') + ' ' + moment(slot.end_time).format('LTS')
          timeTable.push({
            start: moment(start_time).format(''),
            title: 'CLASS: ' + slot.standard.name + ' - ' + (slot.subject ? slot.subject.name : (slot.skill ? slot.skill.name : '')),
            end: moment(end_time).format(''),
          })
        })
      } else if (slot.week_day === 'Wednesday') {
        Wednesdays.map(x => {
          const start_time = moment(x).format('L') + ' ' + moment(slot.start_time).format('LTS')
          const end_time = moment(x).format('L') + ' ' + moment(slot.end_time).format('LTS')
          timeTable.push({
            start: moment(start_time).format(''),
            title: 'CLASS: ' + slot.standard.name + ' - ' + (slot.subject ? slot.subject.name : (slot.skill ? slot.skill.name : '')),
            end: moment(end_time).format(''),
          })
        })
      } else if (slot.week_day === 'Thursday') {
        Thursdays.map(x => {
          const start_time = moment(x).format('L') + ' ' + moment(slot.start_time).format('LTS')
          const end_time = moment(x).format('L') + ' ' + moment(slot.end_time).format('LTS')
          timeTable.push({
            start: moment(start_time).format(''),
            title: 'CLASS: ' + slot.standard.name + ' - ' + (slot.subject ? slot.subject.name : (slot.skill ? slot.skill.name : '')),
            end: moment(end_time).format(''),
          })
        })
      } else if (slot.week_day === 'Friday') {
        Fridays.map(x => {
          const start_time = moment(x).format('L') + ' ' + moment(slot.start_time).format('LTS')
          const end_time = moment(x).format('L') + ' ' + moment(slot.end_time).format('LTS')
          timeTable.push({
            start: moment(start_time).format(''),
            title: 'CLASS: ' + slot.standard.name + ' - ' + (slot.subject ? slot.subject.name : (slot.skill ? slot.skill.name : '')),
            end: moment(end_time).format(''),
          })
        })
      } else if (slot.week_day === 'Saturday') {
        Saturdays.map(x => {
          const start_time = moment(x).format('L') + ' ' + moment(slot.start_time).format('LTS')
          const end_time = moment(x).format('L') + ' ' + moment(slot.end_time).format('LTS')
          timeTable.push({
            start: moment(start_time).format(''),
            title: 'CLASS: ' + slot.standard.name + ' - ' + (slot.subject ? slot.subject.name : (slot.skill ? slot.skill.name : '')),
            end: moment(end_time).format(''),
          })
        })
      }
      return timeTable
    },
    getTimeTable() {
      // TimeTable
      dispatchGraphql(this.timeTableQuery, { teacherId: this.teacherIds }).then((response) => {
        if (response.time_tables.length > 0) {
          this.timeTables = response.time_tables
          console.log('timetables', this.timeTables)
          this.showCalendar = true
        } else {
          this.showCalendar = true
        }
      })
    },
    getClassrooms() {
      // Classrooms
      dispatchGraphql(this.classroomQuery, { teacherId: this.teacherIds }).then((response) => {
        if (response.classrooms.length > 0) {
          for (const classroom of response.classrooms) {
            // if (moment(classroom.class_date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) {
            //   this.events.push({ data: classroom, type: 'classroom' })
            // }
            const start_time = moment(classroom.class_date).format('L') + ' ' + moment(classroom.time_table.start_time).format('LTS')
            const end_time = moment(classroom.class_date).format('L') + ' ' + moment(classroom.time_table.start_time).format('LTS')
            this.eventDates.push({ id: classroom.time_table.teacher_id, start: moment(start_time).format(''), title: ('CLASSROOM: ' + classroom.time_table.standard.name + ' - ' + classroom.name), end: moment(end_time).format('') })
          }
          console.log('classrooms', this.eventDates)
          this.getExams()
        } else {
          console.log('classrooms', this.eventDates)
          this.getExams()
        }
      })
    },
    getExams() {
      // Exams
      dispatchGraphqlQuery('exams', ['id', 'name', 'start_date']).then((response) => {
        if (response.exams.length > 0) {
          for (const exam of response.exams) {
            this.eventDates.push({ color: '#409EFF', start: moment(exam.start_date).format(''), title: ('EXAM: ' + exam.name), end: moment(exam.start_date).add(1, 'days').format('') })
          }
          console.log('exams', this.eventDates)
          this.getEvents()
        } else {
          console.log('exams', this.eventDates)
          this.getEvents()
        }
      })
    },
    getEvents() {
      // events
      dispatchGraphql(this.eventQuery, { teacherId: this.teacherIds }).then((response) => {
        if (response.audiences.length > 0) {
          for (const audience of response.audiences) {
            // if ( moment(audience.event.start_time).format('YYYY-MM-DD') >= moment().format('YYYY-MM-DD') && moment(audience.event.end_time).format('YYYY-MM-DD') <= moment().format('YYYY-MM-DD')) {
            //   this.events.push({ data: audience.event, type: 'event' })
            // }
            this.eventDates.push({ id: audience.user_id, start: moment(audience.event.start_time).format(''), title: ('EVENT: ' + audience.event.title), end: moment(audience.event.end_time).format('') })
          }
          console.log('events', this.eventDates)
          this.getAppointments()
        } else {
          console.log('events', this.eventDates)
          this.getAppointments()
        }
      })
    },
    getAppointments() {
      // Appointments
      dispatchGraphql(this.appointmentQuery, { teacherId: this.teacherIds }).then((response) => {
        if (response.audiences.length > 0) {
          for (const audience of response.audiences) {
            // if ( moment(audience.appointment.start_time).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) {
            //   this.events.push({ data: audience.appointment, type: 'appointment' })
            // }
            this.eventDates.push({ id: audience.user_id, start: moment(audience.appointment.start_time).format(''), title: ('Appointment: ' + audience.appointment.title), end: moment(audience.appointment.start_time).add(1, 'hours').format('') })
          }
          console.log('appointments', this.eventDates)
          this.getTimeTable()
        } else {
          console.log('appointments', this.eventDates)
          this.getTimeTable()
        }
      })
    },
    setTeacher(val) {
      this.teacherIds = []
      this.showCalendar = false
      this.eventDates = []
      this.timeTables = []
      this.teacherIds = val
      this.getClassrooms()
    },
    getUsers() {
      const query = `query {
        users(where: {role: {_in: ["teacher", "staff", "employee", "admin"]}}) {
          id
          first_name
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.users = response.users
        this.setTeacher([getId()])
      })
    },
    ...mapMutations("Common",["hideAsideMenuMobile"])
  }
};
</script>
