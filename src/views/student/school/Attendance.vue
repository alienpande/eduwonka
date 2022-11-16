<template>
  <es-container class="bg-black-5">
    <div style="position: absolute;width: 12rem;top: 165px;border-bottom: 1px solid #f3f3f3;padding-bottom: 13px;">
      <es-select class="title-select select-icon" v-model="attendaceTypeValue" :options="AttendanceTypes" />
    </div>
    <daily-attendance v-if="attendaceTypeValue === 'daily'" :array="array" :type ="type" />
    <monthly-attendance v-if="attendaceTypeValue === 'monthly'" :array ="array" :type ="type" />
    <periodically-attendance v-if="attendaceTypeValue === 'periodically'" />
    <el-card v-if="!attendaceTypeValue" class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
      <e-svg :style="'padding-top: 100px; padding-left: 512px'" icon="noData"></e-svg>
      <div>
        <div class="tx-20 sub-title d-flex justify-content-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ante ligula</div>
        <div class="tx-16 mg-t-15 text-gray-6 d-flex justify-content-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ante ligula</div>
      </div>
    </el-card>
  </es-container>
</template>
<script>
import dailyAttendance from "@/components/student/school/attendance/dailyAttendance"
import monthlyAttendance from "@/components/student/school/attendance/monthlyAttendance.vue"
import periodicallyAttendance from "@/components/student/school/attendance/periodicallyAttendance.vue"
import { dispatchGraphql } from '@/api/dispatcher'
import { getId } from '@/util/auth'
export default {
  components: { dailyAttendance, monthlyAttendance, periodicallyAttendance },
  data() {
    return  {
      attendanceData : [],
      array: [],
      attendance: [],
      selectedType: "",
      attendaceTypeValue: '',
      campusId: '',
      type: '',
      AttendanceTypes: [
        {
          label: "Daily",
          value: "daily",
        },
        {
          label: "Monthly",
          value: "monthly",
        },
        {
          label: "Periodically",
          value: "periodically",
        },
      ]
    }
  },
  watch: {
    attendaceTypeValue(){
      console.log('attendaceTypeValue', this.attendaceTypeValue)
    }
  },
  created() {
    console.log("Array", this.array)
    this.getCampusId()
    // this.getAttendance()
  },
  methods: {
    getCampusId() {
      const query = `query {
        users(where: {id: {_eq: "${getId()}"}}) {
          section {
            standard {
              campus_id
            }
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.campusId = response.users[0].section.standard.campus_id
        console.log("campusid", this.campusId)
        this.getCampusSetting()
      })
    },
    getCampusSetting() {
      const query = `query($id: uuid!){
        campus_settings(where: {campus_id: {_eq: $id}})  {
          attendance_type
        }
      }`
      dispatchGraphql(query, {id: this.campusId }).then((response) => {
        console.log("i am i verigy", this.campusId)
        this.type = response.campus_settings[0].attendance_type
        console.log("type", this.type)
         this.getAttendance()
      })
    },
    getAttendance() {
      const query = `query($id: uuid) {
        attendances(where: {attendable_id: {_eq: $id}}) {
          id
          status
          attendance_type
          taken_at
        }
      }`
      dispatchGraphql(query, { id: getId() }).then((response) => {
        this.attendance = response.attendances
        console.log("attendanceArray", this.attendance, this.type)        
        if(this.type === "TWOTIME") {
          this.array= this.getDailyAttendance()
          this.array = this.array.filter(x => x.morning_status!= null && x.evening_status != null)
          // to remove duplicate objects form array
          this.array = this.array.filter((value, index, self) =>
          index === self.findIndex((t) => (
              t.taken_at === value.taken_at 
            ))
          )
          console.log("att", this.array)
          this.array = this.array.sort(function(a,b){
           return new Date(a.taken_at) - new Date(b.taken_at);
          });
        }
        else if(this.type === "ONETIME") {
         // to place objects in order date
         this.array = this.attendance
          this.array = this.array.sort(function(a,b){
           return new Date(a.taken_at) - new Date(b.taken_at);
          });
        }
      })
    },
    getDailyAttendance() {
        console.log("attendance", this.attendance, this.attendance.length)
        for (const item  of  this.attendance){
          if(this.attendanceData.length === 0 ){
            if(item.attendance_type === "Morning"){
            this.attendanceData.push({"taken_at": item.taken_at, "morning_status":item.status,"evening_status" : null})
            }
            else if(item.attendance_type === "Evening") {
              this.attendanceData.push({"taken_at": item.taken_at, "morning_status": null, "evening_status":item.status })
            }
            console.log("item", item)
          }
          else{
            for(const obj of this.attendanceData){
              if(item.taken_at == obj.taken_at) {
                if(item.attendance_type == "Morning") {
                  obj.morning_status = item.status
                }
                else if(item.attendance_type == "Evening") {
                  obj.evening_status = item.status
                  
                }
              }
              else{
                if(item.attendance_type == "Morning"){
                 this.attendanceData.push({"taken_at": item.taken_at, "morning_status":item.status,"evening_status" : null})
                }
                else if(item.attendance_type == "Evening") {
                 this.attendanceData.push({"taken_at": item.taken_at, "morning_status": null, "evening_status":item.status })
                }
              }
            }
          }
        } 
        return this.attendanceData
      },

  }
};
</script>
