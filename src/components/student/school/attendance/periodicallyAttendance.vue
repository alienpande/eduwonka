<template>
  <div>
    <div v-if="attendance.length > 0">
      <el-row>
        <el-col :span="3" :offset="20" class="calender-btn">
          <i class="el-icon-arrow-left pointer yellowArrow" style="margin-top: 10px" @click="prevMonth" />&emsp;
          <span class="text-white month-year">{{ meta.calendar }}</span>&emsp;
          <i class="el-icon-arrow-right pointer yellowArrow" style="margin: auto" @click="nextMonth" />
        </el-col>
      </el-row>
      <br />
      <el-row class="mg-t-15">
        <el-card :body-style="{ padding: '15px' }" class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
          <el-row class="text-white">
            <el-col :span="2" :offset="1" class="d-flex">
              <b class="tx-16">Day</b>
            </el-col>
            <el-col v-for="(time, i) of timings" :key="i" :span="2" :offset="1" class="d-flex">
              <b class="tx-16">{{ getTime(time) }}</b>
            </el-col>
          </el-row>
          <br>
          <el-row v-for="(weeks, index) in meta.weeks" v-bind:key="index" class="pd-5">
            <el-row v-for="(day, j) in weeks.meta" v-bind:key="j">
              <el-card v-if="day != ''" class="rounded-08 bg-black-3 mg-b-10" :style="'border: none'" shadow="none">
                <el-row>
                  <el-col :span="2" class="d-flex mg-l-60">
                    <div class="text-white mg-t-5 fs-14">{{ getDate(day) }}</div>
                  </el-col>
                  <div v-for="(time, i) of timings" :key="i">
                    <el-col v-if="verifySlot(day, i) === true" :span="2" :offset="1">
                      <el-button :type="getStatus(day, i) === 'P' ? 'success' : 'danger'" size="small">{{ getStatus(day, i) }}</el-button>
                    </el-col>
                    <el-col v-else :span="2" :offset="1">&emsp;</el-col>
                  </div>
                </el-row>
              </el-card>
            </el-row>
          </el-row>
        </el-card>
      </el-row>
    </div>
    <div v-else>
      <el-card class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
        <e-svg :style="'padding-top: 100px; padding-left: 512px'" icon="noData"></e-svg>
        <div>
          <div class="tx-20 sub-title d-flex justify-content-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ante ligula</div>
          <div class="tx-16 mg-t-15 text-gray-6 d-flex justify-content-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ante ligula</div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import { MONTH_SHORT, MONTH, WEEK, WEEK_SHORT } from "@/util/contants";
import { dispatchGraphql } from '@/api/dispatcher'
import { getId } from '@/util/auth'
import moment from 'moment'
  export default {
    components: {},
    props: {},
    data: () => ({
      meta: [],
      weeks: WEEK_SHORT,
      todays: new Date().getDate(),
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
      campus: {},
      user: {},
      timings: [],
      attendance: [],
      timeTable: []
    }),
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
      this.init()
      this.getCampusData()
      this.getUser()
    },
    methods: {
      verifySlot(day, index) {
        const date = day.mm + '/' + day.dd + '/' + day.yyyy
        const dayAttendance = this.attendance.filter(x => 
          (
            moment(x.taken_at).format('YYYY/MM/DD') === moment(date).format('YYYY/MM/DD')
          )
        )
        if (dayAttendance.length > 0) {
          for (const item of dayAttendance) {
            const timeSlot = this.timeTable.filter(x => x.id === item.attendance_value)[0]
            if (moment(timeSlot.start_time).format('HH:mm') === moment(this.timings[index]).format('HH:mm')) {
              return true
            }
          }
        }
      },
      getDate(day) {
        const date = day.mm + '/' + day.dd + '/' + day.yyyy
        return moment(date).format('DD MMM YYYY')
      },
      getStatus(day, index) {
        const date = day.mm + '/' + day.dd + '/' + day.yyyy
        const dayAttendance = this.attendance.filter(x => 
          (
            moment(x.taken_at).format('YYYY/MM/DD') === moment(date).format('YYYY/MM/DD')
          )
        )
        if (dayAttendance.length > 0) {
          for (const item of dayAttendance) {
            const timeSlot = this.timeTable.filter(x => x.id === item.attendance_value)[0]
            if (moment(timeSlot.start_time).format('HH:mm') === moment(this.timings[index]).format('HH:mm')) {
              return item.status
            }
          }
        }
      },
      getTime(time) {
        return moment(time).format('HH:mm')
      },
      getTimings() {
        var diff = 1
        var startTime = moment(this.campus.setting.start_time)
        var endTime = moment(this.campus.setting.end_time)
        var addTime = startTime
        this.timings.push(addTime)
        for (var i = 1; i < 7; i++) {
          if (addTime <= endTime) {
            addTime = moment(addTime).add(diff, 'hour')
            this.timings.push(addTime)
          }
        }
      },
      getUser() {
        const query = `query($id: uuid!) {
          users_by_pk(id: $id) {
            id
            section {
              standard {
                time_table {
                  id
                  start_time
                  end_time
                }
              }
            }
            student_attendance {
              id
              status
              attendance_type
              taken_at
              attendance_type
              attendance_value
            }
          }
        }`
        dispatchGraphql(query, { id: getId() }).then((response) => {
          this.user = response.users_by_pk
          this.timeTable = this.user.section.standard.time_table
          this.attendance = this.user.student_attendance.filter(x => x.attendance_value != null)
        })
      },
      getCampusData() {
        const query = `query {
          campuses {
            id
            setting {
              id
              attendance_type
              non_working_days
              start_time
              end_time
            }
          }
        }`
        dispatchGraphql(query).then((response) => {
          this.campus = response.campuses[0]
          this.getTimings()
        })
      },
      init() {
        const meta = this.getWeeksInMonth(this.current.y, this.current.m)
        meta.weeks.forEach((w) => {
          w.meta.forEach((d) => {
            if (d != "") {
              if (
                d.dd === this.current.d &&
                d.mm === this.current.m &&
                d.yyyy === this.current.y
              ) {
                this.selected = d
              }
            }
          })
        })
        this.meta = meta
      },
      getWeeksInMonth(year, m) {
        const month = m - 1;
        const firstDate = new Date(year, month, 1),
          lastDate = new Date(year, month + 1, 0),
          numDays = lastDate.getDate();
        let dayOfWeekCounter = firstDate.getDay()
        let weeks = [];
        for (let date = 1; date <= numDays; date++) {
          if (dayOfWeekCounter === 0 || weeks.length === 0) {
            weeks.push([])
          }

          weeks[weeks.length - 1].push(date);
          dayOfWeekCounter = (dayOfWeekCounter + 1) % 7
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
            const new_w = []
            if (i == 0) {
              for (let i = 0; i < 7 - w.dates.length; i++) {
                new_w.push("")
              }
              new_w.push(...w.dates)
            } else {
              new_w.push(...w.dates)
              for (let i = 0; i < 7 - w.dates.length; i++) {
                new_w.push("")
              }
            }
            w.dates = new_w;
          }
        });
        weeks.forEach((w) => {
          w.meta = [];
          for (let i = 0; i < w.dates.length; i++) {
            if (w.dates[i] != "") {
              const dt = new Date(`${year}-${m}-${w.dates[i]}`)
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
              w.meta.push("")
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
    }
  }
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