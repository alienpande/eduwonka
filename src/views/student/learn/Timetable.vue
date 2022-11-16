<template>
  <div class="about">
    <es-container pageTitle="Time Table">
      <el-dialog title="Reserve Subject/ Skill" :visible.sync="dialogBox" width="40%">
        <el-table :data="dialogdata">
          <el-table-column label="Subject/ Skill" width="200">
            <template slot-scope="scope">
              {{ scope.row.subject ? scope.row.subject.name : scope.row.skill.name }}
            </template>
          </el-table-column>
          <el-table-column label="Teacher/ Mentor" width="220">
          <template slot-scope="scope">
              {{ scope.row.teacher.first_name }}
            </template></el-table-column>
          <el-table-column width="170">
            <template slot-scope="scope">
              <el-button v-if="scope.row.skill" type="primary" @click="handleReserve(scope.row)">Reserve</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
      <div class="d-flex" style="position: fixed; top: 168px; right: 88px">
        <div style="width: 12px;height: 12px;background: #1fc24e;border-radius: 50px;margin-top: 4px;margin-right: 9px;"></div>
        <div style="color: #858585">reserved Class</div>
      </div>
      <!-- <div style="margin-bottom: 100px; margin-left: 430px">
        <e-select style="color: #f3f3f3;margin-left: 25px;opacity: 0.8;" :span="10" label="Choose Standard" placeholder="Select Standard" :options="standards" :optionName="'name'" :valueKey="'id'" @visible-change="setStandard" />
      </div><br> -->
      <div style="display: flex; overflow: scroll; height: 60vh; width: 90vw">
        <div class="grid-container" style="display: flex">
          <div style="margin-top: 60px">
            <div v-for="day in weekDays" :key="day" style="color: #f3f3f3;opacity: 0.8;font-size: 22px;font-weight: 500;text-align: right;padding-top: 45px;padding-bottom: 57px;margin-bottom: 15px;">
              {{ day }}
            </div>
          </div>
          <div class="flex-container">
            <div v-for="(time,i) in timings" :key="i" style="margin: 15px 10px">
              <div style="color: #f3f3f3;opacity: 0.8;font-size: 20px;font-weight: 500;text-align: center;">
                {{ getSlotTime(time) }}
              </div>

              <div v-for="day in weekDays" :key="day" style="display: flex;margin: 45px 40px;background: #1e1e1e">
                <div v-if="VerifySlotData(day, time) === true" :class="getClass(day, time)" style="width: 207px;height: 101px;" @click="getSlotData(day, time, 'title') === false ? setDetails(day, time) : ''">
                  <div data-toggle="tooltip" data-placement="top" :class="getSlotData(day, time, 'classroom') ? 'pointer border-done' : ''" style="height: 101px">
                    <div style="color: #f3f3f3;opacity: 0.8;font-size: 16px;font-weight: 600;text-align: center;padding-top: 20px;">
                      {{ getSlotData(day, time, 'teacher') }}
                    </div>
                    <div style="color: #f3f3f3;opacity: 0.6;font-size: 16px;text-align: center;padding-top: 5px;">
                      {{ getSlotData(day, time, 'subject') }}
                    </div>
                    <div v-if="getReservedSlot(day, time)" style="color: #1fc24e; text-align: center; font-size: 12px">
                      reserved
                    </div>
                  </div>
                </div>
                <div v-if="VerifySlotData(day, time) === false" class="grid-item colspan" style="width: 207px;height: 101px;background: #1e1e1e;border-radius: 4px;">
                  <e-svg style="padding: 34px 89px" icon="emptyTime"></e-svg>
                </div>
                <div v-if="VerifySlotData(day, time) === null" style="background: #black;height: 101px;">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </es-container>
    <time-right v-if="rightBarData" :slotData="rightBarData" :show="timeRightBar" :__onCancel="() => (timeRightBar = !timeRightBar)"/>
  </div>
</template>

<script>
import { mapMutations } from "vuex"
import timeRight from '@/components/student/learn/timeRight.vue'
import { dispatchGraphql } from "@/api/dispatcher"
import { getId } from '@/util/auth'
import moment from 'moment'
export default {
  components:{timeRight},
  data: () => ({
    dialogBox: false,
    dialogdata: [],
    weekDays: [],
    timings: [],
    selectedStandard: null,
    timeTables:[],
    campus_setting: {},
    timeRightBar:false,
    rightBarData: {}
  }),
  created() {
//    this.setAsideMenuCollapse(true);
//    this.setAsideWidth("100px");
    this.getStandard()
    this.getCampusData()
  },
  methods: {
    getVariables(data) {
      return {
        "object": {
          "skill_id": data.skill.id,
          "student_id": getId(),
          "status": "ASSIGNED"
        }
      }
    },
    handleReserve(scope) {
      const mutation = `mutation($object: skill_results_insert_input!) {
        insert_skill_results_one(object: $object) {
          id
        }
      }`
      dispatchGraphql(mutation, this.getVariables(scope)).then((response) => {
        console.log(response)
        this.dialogBox = false
        this.dialogdata = []
        this.weekDays = []
        this.timings = []
        this.selectedStandard = null
        this.timeTables = []
        this.campus_setting = {}
        this.timeRightBar = false
        this.rightBarData = {}
        this.getStandard()
        this.getCampusData()
      })
    },
    setResereved(slotData) {
      this.dialogdata = []
      this.dialogdata = slotData
      this.dialogBox = true
    },
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
    setDetails(day, time) {
      var slotData = this.timeTables.filter(x => (x.week_day === day && moment(x.start_time).format('HH:mm') <= moment(time).format('HH:mm') && moment(x.end_time).format('HH:mm') > moment(time).format('HH:mm')))[0]
      if (slotData) {
        const classroom = slotData.classrooms.filter(x => moment(x.class_date).format('DD/MM/yyyy') === moment().format('DD/MM/yyyy'))[0]
        if (classroom) {
          this.rightBarData = slotData
          this.timeRightBar = true
        }
      }
    },
    VerifySlotData(day, time) {
      if (this.timeTables.length > 0) {
        var slotData = this.timeTables.filter(x => (x.week_day === day && moment(x.start_time).format('HH:mm') === moment(time).format('HH:mm')))[0]
        var slot = this.timeTables.filter(x => (x.week_day === day && moment(x.start_time).format('HH:mm') <= moment(time).format('HH:mm') && moment(x.end_time).format('HH:mm') > moment(time).format('HH:mm')))[0]
        if (slotData) {
          return true
        } else if (slot) {
          return null
        }
      }
      return false
    },
    getReservedSlot(day, time) {
      if (this.timeTables.length > 0) {
        var slotData = this.timeTables.filter(x => (x.week_day === day && moment(x.start_time).format('HH:mm') === moment(time).format('HH:mm')))
        if (slotData.length > 1) {
          const slot = slotData.filter(x => x.skill)[0]
          if (slot && slot.skill.skill_results.length > 0) {
            const result = slot.skill.skill_results.filter(x => x.student_id === getId())[0]
            if (result) {
              return true
            }
          }
        }
      }
    },
    getData(data, type) {
      const slot = data.filter(x => x.skill)[0]
      if (slot && slot.skill.skill_results.length > 0) {
        const result = slot.skill.skill_results.filter(x => x.student_id === getId())[0]
        if (!result) {
          if (type === 'teacher') {
            return ''
          } else if (type === 'subject') {
            return 'Reserve Slot'
          }
        } else {
          if (type === 'teacher') {
            return slot.teacher.first_name
          } else if (type === 'subject') {
            return slot.skill.name
          }
        }
      } else {
        if (type === 'teacher') {
          return ''
        } else if (type === 'subject') {
          return 'Reserve Slot'
        }
      }
    },
    getSlotData(day, time, type) {
      if (this.timeTables.length > 0) {
        var slotData = this.timeTables.filter(x => (x.week_day === day && moment(x.start_time).format('HH:mm') === moment(time).format('HH:mm')))
        if (slotData.length > 0) {
          var teachers = []
          var subjectableType = []
          var classrooms = []
          for (const data of slotData) {
            teachers.push(data.teacher.first_name)
            subjectableType.push(data.subject ? data.subject.name : data.skill.name)
            classrooms = data.classrooms.length > 0 ? data.classrooms.filter(x => moment(x.class_date).format('DD/MM/yyyy') === moment().format('DD/MM/yyyy')) : ''
          }
          if (type === 'teacher') {
            return teachers.length > 0 && teachers.length <= 1 ? teachers[0] : this.getData(slotData, 'teacher')
          } else if (type === 'subject') {
            return subjectableType.length > 0 && subjectableType.length <= 1 ? subjectableType[0] : this.getData(slotData, 'subject')
          } else if (type === 'title') {
            if (subjectableType.length > 1 && teachers.length > 1) {
              const slot = slotData.filter(x => x.skill)[0]
              if (slot && slot.skill.skill_results.length > 0) {
                const result = slot.skill.skill_results.filter(x => x.student_id === getId())[0]
                if (!result) {
                  this.setResereved(slotData)
                }
              } else {
                this.setResereved(slotData)
              }
            } else {
              return false
            }
          } else if (type === 'classroom') {
            if (classrooms.length > 0) {
              return true
            }
            else {
              return false
            }
          }
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
    getStandard() {
      const query = `query($id: uuid!) {
        users_by_pk(id: $id) {
          id
          section {
            id
            standard {
              id
              name
            }
          }
        }
      }`
      dispatchGraphql(query, { id: getId() }).then((response) => {
        this.selectedStandard = response.users_by_pk.section.standard.id
        this.getTimeTable()
      })
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
            skill_results {
              id
              student_id
              skill_id
            }
          }
          classrooms {
            id
            name
            class_date
            topic {
              id
              name
              description
              sub_topics {
                id
                name
              }
            }
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
    },
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth"]),
    activeTabChange(e) {
      this.activeTab = e;
    },
    scrollTop() {
      this.$nextTick(() => {
        this.$refs.tab2.scrollTop = 0;
      });
    },
  },
   mounted() {
    /* this.setAsideMenuCollapse(true);
    setTimeout(() => {
      this.setAsideWidth("100px");
    }, 100); */
  },
  destroyed() {
    this.setAsideMenuCollapse(false);
  },

};
</script>
<style>
.border-done {
  border: 1px solid #1fc24e;
}
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
</style>
