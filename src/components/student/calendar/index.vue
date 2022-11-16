<template>
  <div>
    <full-calendar class="calendar" :event-limit="2" :options="calendarOptions" />
  </div>
</template>
<script>
import "@fullcalendar/core/vdom";
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/list/main.css";
import moment from 'moment'
export default {
  components: { FullCalendar },
  props: {
    eventDates: {
      type: Array,
      default: null,
    },
    timeTables: {
      type: Array,
      default: null,
    }
  },
  data() {
    return {
      monthDates: [],
      monthEvents: [],
      initialDate: moment().format(''),
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin],
        timeZone: 'UTC',
        initialView: 'dayGridMonth',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        events: [],
        eventDisplay: 'block',
        displayEventTime: false,
        allDaySlot: false,
        dayMaxEvents: 2,
        expandRows: true,
        slotEventOverlap: false,
      },
      buttonText: {
        today: 'Today',
        month: 'Month',
        week: 'Week',
        day: 'Day',
        list: 'List'
      },
    }
  },
  // mounted() {
  //   this.$dispatch('changeMonth', start, end, current)
  // },
  created() {
    this.monthEvents = []
    this.monthEvents = this.eventDates
    this.handleMonthChange(this.initialDate)
  },
  methods: {
    handleMonthChange(val) {
      this.monthEvents = []
      this.monthEvents = this.eventDates
      if (val) {
        this.monthDates = new Array(moment(val).daysInMonth()).fill(null).map((x, i) => moment(val).startOf('month').add(i, 'days'))
        this.setTimeTable()
      }
    },
    setTimeTable() {
      // TimeTable
      var slots = []
      for (const slot of this.timeTables) {
        slots = slots.concat(this.getMonthDates(slot))
      }
      if (slots.length > 0) {
        this.monthEvents = this.monthEvents.concat(slots)
      }
      if (this.monthEvents.length > 0 && slots.length > 0) {
        this.calendarOptions.events = this.monthEvents
        console.log(this.calendarOptions.events, 'events', this.monthEvents)
      }
    },
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
  }
};
</script>
<style scoped>
.fc .fc-button .fc-icon {
  vertical-align: bottom !important;
}
.fc-event {
  min-height: 45px;
}
.fc-event-main,
.fc-event-title {
  white-space: pre-wrap;
}
.fc-event-title-container {
  padding: 2px 6px;
}
</style>