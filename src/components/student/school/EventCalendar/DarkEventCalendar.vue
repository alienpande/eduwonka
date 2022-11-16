<template>
<div>
  <el-row class="e-calender">
    <el-col :span="24" class="mt10 mb20">
      <el-row>
        <el-col :span="14" class="text-white mg-t-10 fs-14"> 20 Events</el-col>
        <el-col :span="3" class="calender-btn">
          <i class="el-icon-arrow-left pointer yellowArrow" style="margin-top: 10px" @click="prevMonth" />&emsp;
          <span class="text-white month-year">{{ meta.calendar }}</span>&emsp;
          <i class="el-icon-arrow-right pointer yellowArrow" style="margin: auto" @click="nextMonth" />
        </el-col>
        <el-col :span="3" class="mg-l-20">
          <es-select placeholder="Event Type" class="select-icon"></es-select>
        </el-col>
        <el-col :span="3" class="mg-l-20">
          <es-select placeholder="Subject" class="select-icon"></es-select>
        </el-col>
        <slot name="head1" />
      </el-row>
    </el-col>
  </el-row>
  <el-card class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
    <el-row class="e-calender">
      <el-row>
        <el-col :span="24" class="mt10 mb20">
          <el-row class="event-row">
            <el-col :span="17"><span class="tx-20 tx-bolder text-white">Geometry Weekly Test</span></el-col>
            <el-col :span="2">
              <div>
                <div class="green-dot" style="display: inline-block"></div>&emsp;
                <span class="text-white tx-14">Academic</span>
              </div>
            </el-col>
            <el-col :span="2">
              <div>
                <div class="red-dot" style="display: inline-block"></div>&emsp;
                <span class="text-white tx-14">Exam</span>
              </div>
            </el-col>
            <el-col :span="3">
              <div>
                <div class="yellow-dot" style="display: inline-block"></div>
                <span class="text-white tx-14 mg-l-15">Non- Academic</span>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <div style="border-top: 2px solid #404040;" />
      <el-col :span="16">
        <table class="bg-black-2 darkcalender" cellpadding="25" cellspacing="0">
          <thead>
            <tr class="darkplain">
              <td class="tx-16 tx-bolder text-white" v-for="(w, k) in weeks" v-bind:key="k">
                {{ w.substring(0, 1) }}
              </td>
            </tr>
          </thead>
          <tr class="bg-black-3" v-for="(weeks, index) in meta.weeks" v-bind:key="index">
            <td class="tx-16 tx-bolder text-white"
              v-for="(day, j) in weeks.meta"
              v-bind:key="j"
              :class="day != '' ? (selected.dd == day.dd && meta.m == selected.mm ? 'pointer selected' : 'pointer darkbordered') : 'darkplain'"
              @click="onDayClick(day)"
            >
              <EventColorDots v-if="day != ''" :events="day.events" />
              {{ day != "" ? day.dd : "" }}
            </td>
          </tr>
        </table>
      </el-col>
      <el-col :span="7" :offset="1">
        <el-card style="border: none;border-left: 2px solid #404040" class="bg-black-2">
          <div class="fs-16 white-1 f-600">Events on {{ selected.dd }} / {{ selected.m }} / {{ selected.yyyy }}</div>
          <br />
          <div style="border: 1px solid #1E1E1E; padding: 20px; height: 20rem; overflow: auto;" class="rounded-08 mt10">
            <div class="tx-14 bg-black-3 p10" style="border-left: 3px solid green; margin-bottom: 15px" v-for="(e, j) in selected.events" v-bind:key="j">
              <div style="color: #cfcfcf" v-if="e.name">
                {{ 'Exam: ' + e.name }}
              </div>
              <div style="color: #cfcfcf" v-if="e.title">
                {{ 'Event: ' + e.title }}
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</div>
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
<style scoped>
.calender-btn {
  background: #353535 !important;
  border-radius: 18px !important;
  border: none !important;
  color: #9D9D9D !important;
  height: 35px !important;
  text-align: center;
  margin-top: 5px;
}
.yellowArrow {
    color: #FE9D2B;
}
</style>
