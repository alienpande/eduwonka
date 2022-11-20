<template>
<div class="about">
    <e-container pageTitle="Time Table" :btnIcon="selectedStandard ? 'el-icon-edit' : ''" :btnText="selectedStandard ? 'Edit' : ''" @btnClick="$router.push($url.LN_TIMETABLE_EDIT + '/' + selectedStandard)">
      <div :style="{'margin-left': window.width > 767 ? '360px' : '0'}" style="margin-bottom: 100px; margin-left: 360px">
        <e-select class="select-dropdown" style="margin-left: 25px" :span="10" label="Choose Standard" placeholder="Select Standard" :options="standards" :optionName="'name'" :valueKey="'id'" @visible-change="setStandard" />
      </div><br>
      <div style="display: flex;overflow: scroll;height: 69vh;width: 81vw;">
        <div class="grid-container" style="display: flex">
          <div style="margin-top: 50px" class="learn-timetable-edit">
            <div v-for="day in weekDays" :key="day" style="color: #000000;opacity: 0.8;font-size: 22px;font-weight: 500;text-align: right;padding-top: 45px;padding-bottom: 57px;margin-bottom: 15px;">
              {{ day }}
            </div>
          </div>
          <div class="flex-container">
            <div v-for="(time,i) in timings" :key="i">
              <div style="color: #000000;opacity: 0.8;font-size: 20px;font-weight: 500;text-align: center;">
                {{ getSlotTime(time) }}
              </div>
              <div style="display: flex;margin: 45px 40px" v-for="day in weekDays" :key="day">
                <div v-if="VerifySlotData(day, time) === true" data-toggle="tooltip" data-placement="top" :title="getSlotData(day, time, 'title')" :class="getClass(day, time)" style="background: rgb(188 108 66 / 10%);width: 207px;height: 101px;">
                  <div style="color: #000000;opacity: 0.8;font-size: 16px;font-weight: 600;text-align: center;padding-top: 20px;">
                    {{ getSlotData(day, time, 'teacher') }}
                  </div>
                  <div style="color: #000000;opacity: 0.6;font-size: 16px;text-align: center;padding-top: 10px;">
                    {{ getSlotData(day, time, 'subject') }}
                  </div>
                </div>
                <div v-if="VerifySlotData(day, time) === false" class="grid-item colspan" style="width: 207px; height: 101px;">
                </div>
                <!-- <div v-if="VerifySlotData(day, time) === null" style="height: 101px;"></div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </e-container>
  </div>
  <!-- <div class="about">
    <e-container pageTitle="Time Table" btnIcon="el-icon-edit" btnText="Edit" @btnClick="$router.push($url.LN_TIMETABLE_EDIT)">
      <div style="display: flex;overflow:scroll;height:58vh;width:77vw;">
        <div style="display: flex" v-for="(time, i) in timeTable" :key="i">
          <div style="margin-top: 50px" v-if="time[0].type === 'week'">
            <div style="color: #000000;opacity: 0.8;font-size: 20px;font-weight: 500;text-align: right;padding-top: 36px;padding-bottom: 44px;margin-bottom: 10px;" v-for="(info, i) in time[0].info" :key="i">
              {{ info }}
            </div>
          </div>
          <div v-else>
            <div style="margin: 15px 10px" v-for="(cls, j) in time" :key="j">
              <div style="color: #000000;opacity: 0.8;font-size: 20px;font-weight: 500;text-align: center;" v-if="cls.time">{{ cls.time }}</div>
              <div style="width: 207px;height: 101px;background: rgb(188 108 66 / 10%);" v-if="cls.teacher && cls.subject && !cls.time">
                <div style="color: #000000;opacity: 0.8;font-size: 16px;font-weight: 600;text-align: center;padding-top: 15px; "> {{ cls.teacher }}</div>
                <div style="color: #000000;opacity: 0.6;font-size: 16px;text-align: center;padding-top: 15px;">{{ cls.subject }}</div>
              </div>
              <div style="width: 207px; height: 101px; background: white" v-if="Object.keys(cls).length === 0"></div>
            </div>
          </div>
        </div>
      </div>
    </e-container>
  </div> -->
</template>

<script>
import { dispatchGraphql, dispatchGraphqlQuery } from "@/api/dispatcher"
import moment from 'moment'
import screenSize from '@/mixins/screenSize'

export default {
  mixins: [screenSize],
  data: () => ({
    weekDays: [],
    timings: [],
    standards: [],
    selectedStandard: null,
    timeTables:[],
    campus_setting: {},
  }),
  created() {
    this.getStandards()
    this.getCampusData()
  },
  methods: {
    getClass(day, time) {
      if (this.timeTables.length > 0) {
        var slotData = this.timeTables.filter(x => (x.week_day === day && moment(x.start_time).format('HH:mm') === moment(time).format('HH:mm')))[0]
        if (slotData) {
          const startTime = moment(slotData.start_time)
          const end = moment(slotData.end_time)
          const duration = moment.duration(end.diff(startTime))
          const hours = duration.asHours()
          if (hours === 1) {
            return 'colspan-1'
          } else if (hours === 2) {
            return 'colspan-1'
          } else if (hours === 3) {
            return 'colspan-1'
          }
        }
      }
    },
    VerifySlotData(day, time) {
      if (this.timeTables.length > 0) {
        var slotData = this.timeTables.filter(x => (x.week_day === day && moment(x.start_time).format('HH:mm') <= moment(time).format('HH:mm') && moment(x.end_time).format('HH:mm') > moment(time).format('HH:mm')))[0]
        var slot = this.timeTables.filter(x => (x.week_day === day && moment(x.start_time).format('HH:mm') <= moment(time).format('HH:mm') && moment(x.end_time).format('HH:mm') > moment(time).format('HH:mm')))[0]
        if (slotData) {
          return true
        } else if (slot) {
          return null
        }
      }
      return false
    },
    getSlotData(day, time, type) {
      if (this.timeTables.length > 0) {
        var slotData = this.timeTables.filter(x => (x.week_day === day && moment(x.start_time).format('HH:mm') <= moment(time).format('HH:mm') && moment(x.end_time).format('HH:mm') > moment(time).format('HH:mm')))
        if (slotData.length > 0) {
          var teachers = []
          var subjectableType = []
          for (const data of slotData) {
            if (data.teacher) {
              teachers.push(data.teacher.first_name)
            }
            subjectableType.push(data.subject ? data.subject.name : data.skill.name)
          }
          if (type === 'teacher') {
            return teachers[0]
          } else if (type === 'subject') {
            return subjectableType[0]
          } else if (type === 'title') {
            if (subjectableType.length > 1 && teachers.length > 1) {
              return 'Teacher: ' + teachers[0] + '\nSubject: ' + subjectableType[0] + '\r\n\r' + 'Teacher: ' + teachers[1] + '\nSubject: ' + subjectableType[1]
            }
          }
          // if (slotData && type === 'teacher') {
          //   return slotData.teacher.first_name
          // } else if (slotData && type === 'subject') {
          //   return slotData.subject ? slotData.subject.name : slotData.skill.name
          // }
        }
      }
    },
    getSlotTime(time) {
      return moment(time).format('HH:mm')
    },
    getTimings() {
      var diff = 1
      var startTime = moment(this.campus_setting.start_time)
      var endTime = moment(this.campus_setting.end_time)
      var addTime = startTime
      this.timings.push(addTime)
      for (var i = 1; i < 7; i++) {
        if (addTime <= endTime) {
          addTime = moment(addTime).add(diff, 'hour')
          this.timings.push(addTime)
        }
      }
    },
    getWeekDays() {
      const weekdays = ['Monday', 'Tuesday', 'Wednesday','Thursday','Friday','Saturday', 'Sunday']
      const nonWeekDays = this.campus_setting.non_working_days
      for (const day of nonWeekDays) {
        const item = weekdays.filter(x => x === day)
        const index = weekdays.indexOf(item)
        weekdays.splice(index, 1)
      }
      this.weekDays = weekdays
    },
    getStandards() {
      dispatchGraphqlQuery('standards', ['id', 'name']).then((response) => {
        this.standards = response.standards
      })
    },
    setStandard(value) {
      this.selectedStandard = value
      this.getTimeTable()
    },
    getTimeTable() {
      const query = `query($id: uuid) {
        time_tables(where: {standard_id: {_eq: $id}}) {
          id
          week_day
          start_time
          end_time
          skill {
            id
            name
            mentor_id
          }
          standard  {
            id
            name
          }
          subject {
            id
            name
          }
          teacher {
            id
            first_name
          }
        }
      }`
      dispatchGraphql(query, { id: this.selectedStandard }).then((response) => {
        this.timeTables = response.time_tables
      })
    },
    getCampusData() {
      const query = `query {
        campus_settings {
          id
          campus_id
          start_time
          end_time
          non_working_days
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.campus_setting = response.campus_settings[0]
        this.getWeekDays()
        this.getTimings()
      })
    }
  }
}
</script>
<style >
.flex-container {
  display: flex;
  flex-direction: row;
}
.colspan-3 {
  width: 780px;
  /* display: inline;
  position: absolute; */
}
.colspan-2 {
  width: 490px;
  /* display: inline;
  position: absolute; */
}
.colspan-1 {
  width: 207px;
  /* display: inline;
  position: absolute; */
}
.grid-container {
  display: grid;
}
.grid-item {
  background-color: white
}
</style>