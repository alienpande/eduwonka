<template>
  <div class="container">
  <el-row>
    <el-col :span="4" :offset="20">
      <es-select v-model="customType" placeholder="last 30 days" :options="previousDays" :optionName="'label'" :valueKey="'value'" @visible-change="getCustomData(customType)" />
    </el-col>
  </el-row>
  <br />
  <el-row class="mg-t-15">
    <el-col :span="7" :offset="1" v-for="boxNo in attendance.length"   :key="boxNo" class="mg-t-15">
      <el-card :body-style="{ padding: '15px' }" class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
        <el-row class="text-white">
          <el-col :span="10" :offset="2" class="d-flex">
            <b>Date</b>
          </el-col>
          <div v-if="type === 'TWOTIME'">
            <el-col :span="5" :offset="1" class="d-flex">
              <b class="tx-16">Morning</b>
            </el-col>
            <el-col :span="5" class="d-flex">
              <b class="tx-16">Evening</b>
            </el-col>
         </div>
         <div v-if="type === 'ONETIME'">
           <el-col :span="5" :offset="1" class="d-flex">
            <b>Day</b>
           </el-col>
         </div>
        </el-row>
        <br>
        <el-row   v-for="i in attendance[boxNo-1]" :key="i" class="pd-5">
          <el-card class="rounded-08 bg-black-3" :style="'border: none'" shadow="none">
            <el-row  v-if ="type ==='TWOTIME'">
              <el-col :span="12" class="d-flex">
                <!-- <div class="text-white mg-t-5"> {{getDate(i.taken_at)}} </div> -->
                 <div class="text-white mg-t-5"> {{  getDate(i.taken_at) }} </div>
              </el-col>
              <el-col  :span="5" :offset="1">
                <el-button :type="i.morning_status == 'P' ? 'success' : 'danger' " size="small">{{ i.morning_status }}</el-button>
              </el-col>
              <el-col :span="5" :offset="1">
                 <el-button  :type="i.evening_status == 'P' ? 'success' : 'danger'" size="small">{{ i.evening_status }} </el-button>
              </el-col>
            </el-row>
            <el-row  v-if ="type ==='ONETIME'">
              <el-col :span="12" class="d-flex">
                <div class="text-white mg-t-5"> {{  getDate(i.taken_at) }} </div>
                  </el-col>
                 <el-col  :span="5" :offset="1">
                <el-button :type ="i.status === 'P' ? 'success' : 'danger'" size="small">{{ i.status }}</el-button>
              </el-col>
            </el-row>
          </el-card>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  name: 'Blank',
  directives: {},
  filters: {},
  components: {
  },
  props: {
    array: {
      type:Array,
      default:null
    },
    type :{
      type:String,
      default: null
    }
  },
  data() {
    return {  
      attendance:[],
      previousDays: [
      {
        label: "last 30 days",
        value: "last 30 days",
      },
      ],
      customType : ''
    }
  },
  created() {
    console.log("created", this.array)
    this.getTrialAttendance()
    console.log("data",this.attendance)
  },
  methods: {
    getDate(date) {
      return moment(date).format('DD MMM yyyy')
    },
    getCustomData (val) {
      let dummy = this.array
      console.log("val",val)
      dummy = dummy.sort(function(a,b){
        return new Date(b.taken_at) - new Date(a.taken_at);
      });
      // console.log("after sort", dummy)
      let count = dummy.length > 30 ? 30 : dummy.length 
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
      this.attendance =  this.getTrialAttendance()
      console.log("six data in if " , this.attendance )
      this.array = dummy.sort( function(a,b){
          return new Date(a.taken_at) - new Date(b.taken_at);
        }) // to regenerate the original "array"
      // console.log("dummydummy", dummy)
      }
    },
    getTrialAttendance() {
      let trial =[]
      let i =0
      console.log("arraylength", this.array.length)
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
      return this.attendance
    },
  }    
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
