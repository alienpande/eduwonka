<template>
  <el-row class="e-calender">
    <el-col :span="24" class="mt10 mb20">
      <el-row>
        <el-col :span="4" class="calender-btn">
          <span class="btn btn-prev" @click="prevMonth">
            <i class="el-icon-arrow-left" style="margin: auto"></i>
          </span>
          <span class="month-year">{{ meta.calendar }}</span>
          <span class="btn btn-next" @click="nextMonth">
            <i class="el-icon-arrow-right" style="margin: auto"></i>
          </span>
        </el-col>
        <slot name="head1" />
      </el-row>
    </el-col>
    <el-col :span="24" class="mt10 mb20">
      <el-row class="event-row">
        <el-col :span="16"> {{ events.length }} Events</el-col>
        <el-col :span="3">
          <div>
            <div class="green-dot" style="display: inline-block"></div>
            Academic
          </div>
        </el-col>
        <el-col :span="2">
          <div>
            <div class="yellow-dot" style="display: inline-block"></div>
            Exam
          </div>
        </el-col>
        <el-col :span="3">
          <div>
            <div class="blue-dot" style="display: inline-block"></div>
            Non Academic
          </div>
        </el-col>
      </el-row>
    </el-col>
    <el-col class="sm-x-scroll" :span="24">
      <table class="calender" cellpadding="25" cellspacing="0">
        <thead>
          <tr>
            <td v-for="(w, k) in weeks" v-bind:key="k">
              {{ w.substring(0, 1) }}
            </td>
          </tr>
        </thead>
        <tr v-for="(weeks, index) in meta.weeks" v-bind:key="index">
          <td
            v-for="(day, j) in weeks.meta"
            v-bind:key="j"
            :class="day != '' ? 'bordered' : 'plain'"
            @click="onDayClick(day)"
          >
            <event-color-dots v-if="day != ''" :events="day.events" />
            <div
              :class="
                selected.dd == day.dd && meta.m == selected.mm
                  ? 'selected'
                  : 'normal'
              "
            >
              {{ day != "" ? day.dd : "" }}
            </div>
          </td>
        </tr>
      </table>
    </el-col>
    <el-col :span="24" class="mt20 mb20" v-if="selected.events.length > 0">
      <div class="event-info" >Events for the day</div>
      <el-row class="mt20 mb20" v-for="(e, j) in selected.events" v-bind:key="j">
        <el-col v-if="e.name" class="event-card" :span="8" >
          <div>
            {{ 'Exam: ' + e.name }}
          </div>
        </el-col>
        <el-col v-if="e.title" class="event-card" :span="8" >
          <div>
            {{ 'Event: ' + e.title }}
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
import { MONTH_SHORT, MONTH, WEEK, WEEK_SHORT } from "@/util/contants";
import EventColorDots from "./EventColorDots.vue";
import moment from 'moment'
import { dispatchGraphql } from '@/api/dispatcher'

export default {
  components: { EventColorDots },
  data() {
    return {
      skip: 0,
      meta: [],
      weeks: WEEK_SHORT,
      todays: new Date().getDate(),
      selectedDate: new Date().getDate(),
      selected: {
        day: 0,
        dd: 0,
        m: "",
        mm: 0,
        ms: "",
        w: "",
        w1: "",
        ws: "",
        yyyy: 0,
      },
      current: {
        d: new Date().getDate(),
        m: new Date().getMonth() + 1,
        y: new Date().getFullYear(),
      },
      events: [],
      eventsQuery: `query($date: timestamp_comparison_exp) {
        events(where:{start_time: $date}) {
          id
          title
          description
          start_time
        }
      }`,
      examsQuery: `query($date: date_comparison_exp) {
        exams(where:{start_date: $date}) {
          id
          name
          start_date
          exam_type {
            id
            name
          }
        }
      }`
    };
  },
  created() {
    const dt = new Date();
    this.selected = {
      day: dt.getDay(),
      dd: dt.getDate(),
      m: "",
      mm: dt.getMonth() + 1,
      ms: "",
      w: "",
      w1: "",
      ws: "",
      yyyy: dt.getFullYear(),
      events: [],
    };
    this.init();
  },
  methods: {
    init() {
      const events = require("@/api/events.json");
      events.filter((x) => x.mm == this.current.m && x.yyyy == this.current.y);
      this.events = events;
      const meta = this.getWeeksInMonth(this.current.y, this.current.m);
      meta.weeks.forEach((w) => {
        w.meta.forEach((d) => {
          if (d != "") {
            d.events = [];
            d.events = this.events.filter(
              (x) => x.dd == d.dd && x.mm == d.mm && x.yyyy == d.yyyy
            );
            if (
              d.dd === this.current.d &&
              d.mm === this.current.m &&
              d.yyyy === this.current.y
            ) {
              this.selected = d;
            }
          }
        });
      });
      this.meta = meta;
      const date = moment(this.current.y + '-' + this.current.m + '-' + this.current.d).format('')
      dispatchGraphql(this.eventsQuery, { date: {_eq: date} }).then(response => {
        this.selected.events = response.events
        dispatchGraphql(this.examsQuery, { date: {_eq: date} }).then(response => {
          response.exams.map(x => this.selected.events.push(x))
        })
      })
    },
    onDayClick(d) {
      this.selected = d;
      const date = moment(d.yyyy + '-' + d.mm + '-' + d.dd).format('')
      dispatchGraphql(this.eventsQuery, { date: {_eq: date} }).then(response => {
        this.selected.events = response.events
        dispatchGraphql(this.examsQuery, { date: {_eq: date} }).then(response => {
          response.exams.map(x => this.selected.events.push(x))
        })
      })
    },
    getWeeksInMonth(year, m) {
      const month = m - 1;
      const firstDate = new Date(year, month, 1),
        lastDate = new Date(year, month + 1, 0),
        numDays = lastDate.getDate();
      let dayOfWeekCounter = firstDate.getDay();
      let weeks = [];
      for (let date = 1; date <= numDays; date++) {
        if (dayOfWeekCounter === 0 || weeks.length === 0) {
          weeks.push([]);
        }

        weeks[weeks.length - 1].push(date);
        dayOfWeekCounter = (dayOfWeekCounter + 1) % 7;
      }
      weeks = weeks
        .filter((w) => !!w.length)
        .map((w) => ({
          start: w[0],
          end: w[w.length - 1],
          dates: w,
        }));
      weeks.forEach((w, i) => {
        if (w.dates.length != 7) {
          const new_w = [];
          if (i == 0) {
            for (let i = 0; i < 7 - w.dates.length; i++) {
              new_w.push("");
            }
            new_w.push(...w.dates);
          } else {
            new_w.push(...w.dates);
            for (let i = 0; i < 7 - w.dates.length; i++) {
              new_w.push("");
            }
          }
          w.dates = new_w;
        }
      });
      weeks.forEach((w) => {
        w.meta = [];
        for (let i = 0; i < w.dates.length; i++) {
          if (w.dates[i] != "") {
            const dt = new Date(`${year}-${m}-${w.dates[i]}`);
            w.meta.push({
              day: dt.getDay(),
              ws: WEEK_SHORT[dt.getDay()],
              w: WEEK[dt.getDay()],
              w1: WEEK_SHORT[dt.getDay()].substring(0, 1),
              dd: dt.getDate(),
              mm: dt.getMonth() + 1,
              ms: MONTH_SHORT[dt.getMonth()],
              m: MONTH[dt.getMonth()],
              yyyy: dt.getFullYear(),
              events: [],
            });
          } else {
            w.meta.push("");
          }
        }
      });
      return {
        weeks,
        week_header_short: WEEK_SHORT,
        week_header: WEEK,
        weeks_with_header: [
          { start: "Sunday", end: "Saturday", dates: WEEK, meta: WEEK },
          ...weeks,
        ],
        weeks_with_header_short: [
          { start: "Sun", end: "Sat", dates: WEEK_SHORT, meta: WEEK_SHORT },
          ...weeks,
        ],
        year,
        m,
        month: MONTH[m - 1],
        ms: MONTH_SHORT[m - 1],
        calendar: `${MONTH_SHORT[m - 1]} ${year}`,
      };
    },
    nextMonth() {
      this.selected.events = [];
      this.current.m= this.current.m + 1;
      this.init();
    },
    prevMonth() {
      this.selected.events = [];
      this.current.m = this.current.m - 1;
      this.init();
    },
  },
};
</script>
