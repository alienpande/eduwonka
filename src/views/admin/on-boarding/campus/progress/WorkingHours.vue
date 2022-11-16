<template>
 <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
  <e-container-lite
    :campusid="$route.params.id"
    tag="North Campus"
    showFooter
    @back="$go('/on-boarding/attendance-and-exam/'+ $route.params.id)"
    @next="handleSubmit(workingHours())"
  >
    <!-- @next="$go($url.DEPARTMENT_DESIGNATION)" -->
    <template #titleHead>
      <div class="h1">Working days and hours</div>
      <div class="h5">
        Kindly set your exam type and attendance preference for your institution
      </div>
    </template>
    <e-form
      heading="Non-Working Days"
      subHeading="When is the institute closed ?"
      :rules="rules"
    >
      <el-col :span="24">
        <div>
          <!-- v-for="(item, index) in wh"
          v-bind:item="item"
          v-bind:key="index"
          class="working-hours"
          :class="item.isClosed ? 'weekend' : ''"
        > -->
        <el-checkbox
          class="toggle-style"
          v-for="(item, index) in wh"
          v-bind:item="item"
          v-bind:key="index"
          v-model="item.isClosed"
          :class="item.isClosed ? 'weekend' : ''"
          border
          rules="required"
        >
          {{ item.day }}
        </el-checkbox>
        </div>
      </el-col>
    </e-form>
    <el-row :gutter="30">
      <el-col :span="12">
        <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
        <e-form subHeading="Please update working hours for you work days" :rules="rules">
          <el-col :span="24" class="weekday">
            <div>
              Start Time : 
              <span>
                <el-time-select class="input-text" style="width: 20%; margin-right: 50px"
                  v-model="startTime"
                  rules="required"
                  :picker-options="{
                    start: '09:00',
                    step: '01:00',
                    end: '18:00'
                  }"
                  placeholder="Select time"
                  @change="handleSubmit(setStartTime(startTime))">
                </el-time-select>
                <!-- <i class="el-icon-minus" style="color: #ba6c47;margin-right: 50px" /> -->
                
              </span>
            </div>
          </el-col>
          <el-col :span="24" class="weekday">
            <div>
              End Time : 
              <span>
                <el-time-select class="input-text" style="width: 20%; margin-right: 50px"
                  v-model="endTime"
                  rules="required"
                  :picker-options="{
                    start: '09:00',
                    step: '01:00',
                    end: '18:00'
                  }"
                  placeholder="Select time"
                  @change="handleSubmit(setEndTime(endTime))">
                </el-time-select>
                <!-- <i class="el-icon-minus" style="color: #ba6c47;margin-right: 50px" /> -->
                
              </span>
            </div>
          </el-col>
          <!-- <el-col
            :span="24"
            v-for="(item, index) in weekdays"
            v-bind:item="item"
            v-bind:key="index"
            class="weekday"
          > -->
            <!-- <div>
              {{ item.day }}
              <div>
                <el-time-select class="input-text" style="width: 20%; margin-right: 100px" v-model="item.timing.start"
                  :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                  }"
                  placeholder="Select time">
                </el-time-select>

                <i class="el-icon-minus" style="color: #ba6c47;margin-right: 80px" />
                <el-time-select class="input-text" style="width: 20%;" v-model="item.timing.end" :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                  }"
                  placeholder="Select time">
                </el-time-select>
              </div>
            </div> -->
          <!-- </el-col> -->
        </e-form>
         </ValidationObserver>
      </el-col>
      <el-col :span="12">
        <e-form subHeading="Please update your breaks" :rules="rules">
          <el-col :span="24" class="weekday">
            <div>
              Snacks Break
              <div>
                <!-- <span>{{ breaks.snackBreak.start }}</span> -->
                <el-time-select class="input-text" style="width: 20%; margin-right: 50px" v-model="breaks.snackBreak.start" rules="required"
                  :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                  }"
                  placeholder="Select time">
                </el-time-select>
                <i class="el-icon-minus" style="color: #ba6c47;margin-right: 50px" />
                <!-- <span>{{ breaks.snackBreak.end }}</span> -->
                <el-time-select class="input-text" style="width: 20%;" v-model="breaks.snackBreak.end" rules="required" :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                  }"
                  placeholder="Select time">
                </el-time-select>
              </div>
            </div>
          </el-col>
          <el-col :span="24" class="weekday">
            <div>
              Lunch Break
              <div>
                <!-- <span>{{ breaks.lunchBreak.start }}</span> -->
                <el-time-select class="input-text" style="width: 20%; margin-right: 50px" v-model="breaks.lunchBreak.start" rules="required"
                  :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                  }"
                  placeholder="Select time">
                </el-time-select>
                <i class="el-icon-minus" style="color: #ba6c47;margin-right: 50px" />
                <!-- <span>{{ breaks.lunchBreak.end }}</span> -->
                <el-time-select class="input-text" style="width: 20%;" v-model="breaks.lunchBreak.end" rules="required" :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                  }"
                  placeholder="Select time">
                </el-time-select>
              </div>
            </div>
          </el-col>
        </e-form>
      </el-col>
    </el-row>
  </e-container-lite>
 </ValidationObserver>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher"
import moment from 'moment'
export default {
  data() {
    return {
      rules: {},
      setting: '',
      startTime: '',
      endTime: '',
      campusSetting: {},
      wh: [],
      mutation: `mutation($id: uuid!, $changes: campus_settings_set_input!) {
        update_campus_settings_by_pk(pk_columns: {id: $id}, _set: $changes) {
          id
          start_time
          end_time
        }
      }`,
      insertMutation: `mutation ($object: standard_subjects_insert_input!) {
        insert_campus_settings_one(object: $object) {
          id
        }
      }`
    };
  },
  created() {
    this.getCampusSetting()
    this.wh = require("@/api/working-hours.json");
  },
  methods: {
    setStartTime(time) {
      this.campusSetting.start_time = (moment().format('L') + ' ' + moment(time, ['HH:mm']).format('LTS'))
      console.log(this.campusSetting.start_time)
    },
    setEndTime(time) {
      this.campusSetting.end_time = (moment().format('L') + ' ' + moment(time, ['HH:mm']).format('LTS'))
      console.log(this.campusSetting.start_time)
    },
    getCampusSetting() {
      const query = `query MyQuery {
        campus_settings(where: {campus_id: {_eq: "${this.$route.params.id}"}}) {
          id
          campus_id
          non_working_days
          campus_breaks
          start_time
          end_time
        }
      }`
      dispatchGraphql(query).then((response) => {
        console.log('save', response)
        this.setting = response.campus_settings[0]
        this.startTime = moment(this.setting.start_time).format('HH:mm')
        this.endTime = moment(this.setting.end_time).format('HH:mm')
        this.campusSetting.start_time = this.setting.start_time
        this.campusSetting.end_time = this.setting.end_time
        this.weekdays.forEach((element) => {
          this.setting.non_working_days?.forEach((ele) => {
            if(ele === element.day) {
              console.log('closed',element)
              element.isClosed = true
            }
          })
          // console.log(element)
          // console.log(element.day)
        })
        // const workingHours = JSON.parse(response.campus_settings[0].working_hours);
        // this.weekdays.forEach((ele) => {
        //   workingHours.forEach((whr) => {
        //     if(ele.day === whr.day) {
        //       console.log('wdays',ele.day);
        //       ele.timing.start = whr.timing.start
        //       ele.timing.end = whr.timing.end
        //     }
        //   })
        // })

        const campusBreaks = JSON.parse(response.campus_settings[0].campus_breaks)
        this.breaks.snackBreak = campusBreaks?.snackBreak;
        this.breaks.lunchBreak = campusBreaks?.lunchBreak;
        console.log(response.campus_settings[0]);
      });
    },
    getVariables: function() {
      console.log('setting', this.campusSetting)
      if (this.setting && this.setting.id) {
        return {
          "id": this.setting.id,
          "changes": this.campusSetting
        }
      } else {
        return {
          "object": this.campusSetting
        }
      }
    },
    workingHours() {
      const nonWork = this.wh.filter((x) => x.isClosed)
      const nonWorkingDay = nonWork.map((x) => x.day)
      this.campusSetting = {
        start_time: this.campusSetting.start_time,
        end_time: this.campusSetting.end_time,
        campus_id: this.$route.params.id,
        non_working_days:  nonWorkingDay,
        campus_breaks: JSON.stringify({
          snackBreak: this.breaks.snackBreak,
          lunchBreak: this.breaks.lunchBreak,
        })
      }
      const mutationVariable = this.setting && this.setting.id ? this.mutation : this.insertMutation
        dispatchGraphql(mutationVariable, this.getVariables()).then((response) => {
          console.log('save', response)
        })
      this.$router.push(`/on-boarding/department-designation/${this.$route.params.id}`)
    }
  },
  computed: {
    weekdays() {
      return this.wh.filter((x) => !x.isClosed);
    },
    breaks() {
      return this.weekdays[0];
    },
    isValid () {
      return this.item.isClosed && this.startTime && this.endTime && this.breaks.snackBreak.end && this.breaks.snackBreak.start && this.breaks.lunchBreak.start && this.breaks.lunchBreak.end;
    }
  },
};
</script>
<style>
.input-text {
  width: "30%";
  /* color: #ba6c47;
  border: 1px solid #ba6c47;
  padding: 5px 15px;
  border-radius: 6px;
  margin: 30px; */
}
.el-date-editor{
  width: "75%";
}
</style>
