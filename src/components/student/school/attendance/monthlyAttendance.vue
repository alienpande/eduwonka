<template>
  <div>
    <el-row>
      <el-col :span="4" :offset="20">
        <es-select v-model="customType" placeholder="last 30 days" :options="previousDays" :optionName="'label'" :valueKey="'value'" @visible-change="getCustomData(customType)" />
      </el-col>
    </el-row>
    <br />
    <el-row class="mg-t-15">
      <el-card :body-style="{ padding: '15px' }" class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
        <el-row class="text-white">
          <el-col :span="4" :offset="1" class="d-flex">
            <b>Week</b>
          </el-col>
          <el-col v-for="day in weekDays" :key="day" :span="2" :offset="1" class="d-flex">
            <b class="tx-16">{{ day }}</b>
          </el-col>
        </el-row>
        <br>
        <el-row v-for="i in attendance.length " :key="i" class="pd-5">
          <el-card class="rounded-08 bg-black-3" :style="'border: none'" shadow="none">
            <el-row>
              <el-col :span="3" class="d-flex mg-l-55">
                <div class="text-white mg-t-5">week{{i}}</div>
              </el-col>
              <div v-if="type == 'TWOTIME'">
                <el-col v-for="(item) in attendance[i-1]" :key="item" :span="2" :offset="1">
                  <div style="display:flex" :span="2" class="mg-l-70">
                    <div v-if="item.morning_status">
                      <el-button :type="item.morning_status == 'P' ? 'success': 'danger' "  size="small">{{ item.morning_status }}</el-button>
                    </div>
                    <div v-else class="text-white mg-l-10">--</div>
                    <div v-if="item.evening_status" class="mg-l-10">
                      <el-button :type="item.evening_status == 'P' ? 'success' : 'danger' " size="small">{{ item.evening_status }}</el-button>
                    </div>
                    <div v-else class="text-white mg-l-30">--</div>
                  </div>
                </el-col>
              </div>
              <div v-if="type == 'ONETIME'">
                <el-col  v-for="(item) in weekData[i-1]" :key="item" :span="2" :offset="1">
                  <el-button :type=" item.morning_status == 'P' ? 'success': 'danger' "  size="small">{{ item.status }}</el-button>
                </el-col>
              </div>
            </el-row>
          </el-card>
        </el-row>
      </el-card>
    </el-row>
  </div>
</template>
<script>
import { dispatchGraphql } from '@/api/dispatcher'
import moment from 'moment'
export default {
  components: {},
  props: {
    array : {
      type: Array,
      default: null
      },
    type: {
      type: String,
      default: null
    }      
  },
  data: () => ({
    attendance: [],
    customType : '',
    weekDays: [],
    previousDays: [
      {
        label: "last 30 days",
        value: "last 30 days",
      },
    ],
  }),
  created() {
    console.log("monthly type", this.type, this.array)
    this.getCampusData()
    this.getAttendance()
  },
  methods: {
    getWeekDays() {
      const weekdays = ['Monday', 'Tuesday', 'Wednesday','Thursday','Friday','Saturday', 'Sunday']
      const nonWeekDays = this.campus.setting.non_working_days
      for (const day of nonWeekDays) {
        const item = weekdays.filter(x => x === day)
        const index = weekdays.indexOf(item)
        weekdays.splice(index, 1)
      }
      this.weekDays = weekdays
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
        this.getWeekDays()
      })
    },
    getCustomData (val) {
      console.log("val",val)
      let dummy =[]
      dummy = this.array.sort(function(a,b) {
        return new Date(b.taken_at) - new Date(a.taken_at);
      });
      console.log("after sort", dummy)
      let count = dummy.length > 30 ? 30 : dummy.length 
      // count =5
      this.array = []
      for (var i=0; i < count ; i++) {
        console.log("dummy index", dummy[i], typeof dummy[i])
        this.array.push(dummy[i])
      }
      console.log("dummy to real", this.array)
      if(this.array.length > 0){
        this.array = this.array.sort( function(a,b){
          return new Date(a.taken_at) - new Date(b.taken_at);
        })
        this.attendance = []
        this.attendance =  this.getAttendance()
        console.log("six data in if " ,this.attendance)
        this.array = dummy.sort( function(a,b){
            return new Date(a.taken_at) - new Date(b.taken_at);
          }) // to regenerate the original "array"
        console.log("dummydummy", dummy)
      }
    },
    getAttendance() {
      let trial =[]
      let i =0
      for (const item of this.array) {
        console.log("item",  moment(new Date(item.taken_at)).format('dddd'))
        if(moment(new Date(item.taken_at)).format('dddd')!= "Friday") {
          trial.push(item)
          console.log("pushed")
          if(this.array.indexOf(item) === this.array.length-1) {
           this.attendance[i] = trial
          }
        }
        else {
          console.log( "offer",typeof this.attendance[i])
          trial.push(item)
          console.log("pushed")
          this.attendance[i] = trial
          trial =[]
          i++
        }
      }
      console.log("trial", this.attendance)
      this.getAlligned() 
      return this.attendance
    },  
    getAlligned() {
      let item ={}
      if( moment(new Date(this.attendance[0][0].taken_at)).format('dddd') === 'Tuesday') {
        console.log("getting into tuesday")
        this.attendance[0].unshift(item) 
      }
      else if( moment(new Date(this.attendance[0][0].taken_at)).format('dddd') === 'Wednesday') {
        this.attendance[0].unshift(item, item)
        console.log("getting into wednesday")
      }
      else if( moment(new Date(this.attendance[0][0].taken_at)).format('dddd') === 'Thursday') {
       this.attendance[0].unshift(item, item, item)
      }
      else if(  moment(new Date(this.attendance[0][0].taken_at)).format('dddd') === 'Friday' ) {
        this.attendance[0].unshift(item, item, item, item)
      }
      console.log("correct", this.attendance[0])
    },
  }
}
</script>