<template>
  <div>
    <es-container pageTitle="Event Calendar" class="bg-black-5">
      <!-- <DarkEventCalender /> -->
      <el-row v-if="eventDates.length > 0 || timeTables.length > 0">
        <el-col :span="16">
          <calendar :eventDates="eventDates" :timeTables="timeTables" />
        </el-col>
        <el-col :span="7" :offset="1">
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
        </el-col>
      </el-row>
    </es-container>
  </div>
</template>
<script>
// import DarkEventCalender from "@/components/student/school/EventCalendar/DarkEventCalendar.vue"
import Calendar from "@/components/student/calendar/index.vue"
import { dispatchGraphql } from "@/api/dispatcher"
import {getId} from "@/util/auth"
import moment from 'moment'
export default {
  // components: { DarkEventCalender },
  components: { Calendar },
  data() {
    return {
      student: {},
      standard: {},
      events: [],
      timeTables: [],
      eventDates: [],
      classroomQuery: `query($standardId: uuid) {
        classrooms(where: {time_table: {standard_id: {_eq: $standardId}}}) {
          id
          name
          class_date
          time_table {
            id
            start_time
            end_time
            standard {
              id
              name
            }
          }
        }
      }`,
      examsQuery: `query($standardId: uuid) {
        exams(where: {standard_id: {_eq: $standardId}}) {
          id
          name
          start_date
        }
      }`,
      eventsQuery: `query($studentId: uuid) {
        audiences(where: {_and: [{user_id: {_eq: $studentId}}, {audienceable_type: {_eq: "Event"}}]}) {
          id
          event {
            id
            title
            start_time
            end_time
          }
        }
      }`,
      appointmentsQuery: `query($studentId: uuid) {
        audiences(where: {_and: [{user_id: {_eq: $studentId}}, {audienceable_type: {_eq: "Appointment"}}]}) {
          id
          appointment {
            id
            title
            start_time
            end_time
          }
        }
      }`,
      timeTableQuery: `query($standardId: uuid) {
        time_tables(where: {standard_id: {_eq: $standardId}}) {
          id
          week_day
          start_time
          end_time
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
    this.getStudent()
  },
  methods: {
    setLink(scope) {
      if (scope.type === 'appointment') {
        this.$go('/connect/online-meet/' + scope.url)
      } else if (scope.type === 'classroom') {
        this.$go('/learn/online-class/' + scope.url)
      }
    },
    getTodayEvents() {
      var todayEvents = []
      if (this.events.length > 0) {
        for (const event of this.events) {
          if (event.type === 'classroom') {
            todayEvents.push({ type: event.type, event: event.data.time_table.standard.name + ' - ' + event.data.name, times: moment(event.data.time_table.start_time).format('HH:mm') + ' - ' + moment(event.data.time_table.end_time).format('HH:mm'), url: event.data.id })
          } else if (event.type === 'event') {
            todayEvents.push({ type: event.type, event: event.data.title, times: moment(event.data.start_time).format('HH:mm') + ' - ' + moment(event.data.end_time).format('HH:mm'), url: 'No URL' })
          } else if (event.type === 'appointment') {
            todayEvents.push({ type: event.type, event: event.data.title, times: moment(event.data.start_time).format('HH:mm') + ' - ' + moment(event.data.start_time).add(1, 'hours').format('HH:mm'), url: event.data.location === 'online' ? event.data.id : 'No URL'  })
          }
        }
      }
      if (todayEvents.length > 0) {
        return todayEvents
      }
    },
    getClassrooms() {
      // Classrooms
      dispatchGraphql(this.classroomQuery, { standardId: this.standard.id }).then((response) => {
        if (response.classrooms.length > 0) {
          for (const classroom of response.classrooms) {
            if (moment(classroom.class_date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) {
              this.events.push({ data: classroom, type: 'classroom' })
            }
            const start_time = moment(classroom.class_date).format('L') + ' ' + moment(classroom.time_table.start_time).format('LTS')
            const end_time = moment(classroom.class_date).format('L') + ' ' + moment(classroom.time_table.start_time).format('LTS')
            this.eventDates.push({ start: moment(start_time).format(''), title: ('CLASSROOM: ' + classroom.time_table.standard.name + ' - ' + classroom.name), end: moment(end_time).format('') })
          }
          this.getExams()
        } else {
          this.getExams()
        }
      })
    },
    getExams() {
      dispatchGraphql(this.examsQuery, { standardId: this.standard.id }).then((response) => {
        if (response.exams.length > 0) {
          for (const exam of response.exams) {
            this.eventDates.push({ start: moment(exam.start_date).format(''), title: ('EXAM: ' + exam.name), end: moment(exam.start_date).add(1, 'days').format('') })
          }
          this.getEvents()
        } else {
          this.getEvents()
        }
      })
    },
    getEvents() {
      dispatchGraphql(this.eventsQuery, { studentId: this.student.id }).then((response) => {
        if (response.audiences.length > 0) {
          for (const audience of response.audiences) {
            if ( moment(audience.event.start_time).format('YYYY-MM-DD') >= moment().format('YYYY-MM-DD') && moment(audience.event.end_time).format('YYYY-MM-DD') <= moment().format('YYYY-MM-DD')) {
              this.events.push({ data: audience.event, type: 'event' })
            }
            this.eventDates.push({ start: moment(audience.event.start_time).format(''), title: ('EVENT: ' + audience.event.title), end: moment(audience.event.end_time).format('') })
          }
          this.getAppointments()
        } else {
          this.getAppointments()
        }
      })
    },
    getAppointments() {
      dispatchGraphql(this.appointmentsQuery, { studentId: this.student.id }).then((response) => {
        if (response.audiences.length > 0) {
          for (const audience of response.audiences) {
            if ( moment(audience.appointment.start_time).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) {
              this.events.push({ data: audience.appointment, type: 'appointment' })
            }
            this.eventDates.push({ start: moment(audience.appointment.start_time).format(''), title: ('Appointment: ' + audience.appointment.title), end: moment(audience.appointment.start_time).add(1, 'hours').format('') })
          }
          this.getTimeTable()
        } else {
          this.getTimeTable()
        }
      })
    },
    getTimeTable() {
      // TimeTable
      dispatchGraphql(this.timeTableQuery, { standardId: this.standard.id }).then((response) => {
        if (response.time_tables.length > 0) {
          this.timeTables = response.time_tables
        }
        // console.log(this.eventDates, this.timeTables)
      })
    },
    getStudent() {
      const query = `query {
        users_by_pk(id: "${getId()}") {
          id
          first_name
          section {
            id
            name
            standard {
              id
              name
            }
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.student = response.users_by_pk
        this.standard = this.student.section.standard
        this.getClassrooms()
      })
    }
  }
}
</script>
