<template>
  <div class="task1 mg-l-20" >
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <div class="heading">Task Details</div>
    <el-card shadow="none" :rules="rules">
      <el-row>
        <el-col :span="11">
          <e-input label="Task Name*" placeholder="Enter Task Name" v-model="task.name" rules="required"></e-input>
        </el-col>
        <el-col :span="11" :offset="1">
          <e-input label="Priority*" placeholder="Enter Priority" v-model="task.priority" rules="required"></e-input>
        </el-col>
        <el-col :span="23">
          <div class="color: #000000CC;font-size:16px;padding:10px 0">
            Description
          </div>
          <textarea 
            class="details-expenses__textarea"
            placeholder="Description"
            v-model="task.description"
            rows="5"
            cols="150"
            rules="required"
          ></textarea>
        </el-col>
      </el-row>
    </el-card>
    <div class="heading">Timeline</div>

    <el-card shadow="none">
      <div v-for="i in titmeline" :key="i">
        <el-row>
          <el-col :span="10">
            <e-date-picker
              label="Date"            
              placeholder="Choose Date"
              v-model="task.start_date"
              @change="changeDate"
              format="MM/dd/yyyy"
              class="default-picker"
              rules="required"
            ></e-date-picker>
          </el-col>
          <el-col :span="10" :offset="1">
            <p>Time (optional)</p>
            <el-time-picker
              v-model="time"
              :picker-options="{
                selectableRange: '06:00:00 - 23:59:59'
              }"
              placeholder="Select Start time"
              @change="handleTime"
              rules="required"
            >
            </el-time-picker>
            <!-- <e-select :span="7" label="Time (optional)"
              placeholder="Choose Hour"
              v-model="time.hour"
              :options="hours"
              :valueKey="'label'"
              :field="'hour'"
              @visible-change="handleHour"
            ></e-select>
            <br />

            <e-select style="margin-left: 10px" :span="6"
              placeholder="Choose Minute"
              v-model="time.minute"
              :options="arr"
              :valueKey="'label'"
              :field="'minute'"
              @visible-change="handleMinute"
            ></e-select>

            <e-select style="margin-left: 10px" :span="4" 
              placeholder="Choose seconds"
              v-model="time.second"
              :options="sec"
              :valueKey="'label'"
              :field="'sec'"
              @visible-change="handleSecond"
            ></e-select> -->
          </el-col>
          <el-col  v-if="titmeline>=2" :span="2" :offset="1"> <br/> <img @click="titmeline--" src="@/assets/images/custom-del-icon.png" alt=""> </el-col>
        </el-row>
      </div>
      <e-button v-if="titmeline < 2"
        @click="titmeline++"
        label="Add End Date"
        icon="el-icon-plus"
        :plain="true"
      ></e-button>
      <br/>
      <br/>
    </el-card>
    <div class="heading">Task Frequency</div>
    <el-card shadow="none">
      <el-row>
        <el-col :span="9">
          <e-radio v-model="reportValue"
            :span="12"
            label="Do you want to repeat this task?"
            :options="report"
            @change ="repeateData"
            rules="required"
          />
        </el-col>
      </el-row>
    </el-card>
    <el-card v-if="reportValue==='Yes'"
      shadow="none"
      style="
        border-top: none;
        margin-top: -5px;
        background: #fcdfbd;
        padding: 0 30px;
        padding-top: 20px;
      "
    >
      <el-row>
        <el-col :span="11">
          <e-radio label="Repeat" v-model="repeatValue"  :options="Repeat" @change='select' rules="required" />
        </el-col>
        <el-col :span="11" :offset="1">
          <e-radio
            label="End Repeat"
            v-model="endRepeatValue"
            :options="endRepeat"  
            rules="required"          
          />
          <div v-if="endRepeatValue === 'End repeat date'">
            <e-date-picker
              class="default-picker"
              placeholder="Choose End repeat date"
              v-model ="task.repeat_end_date"
              @change="changeEndDate"
              format="MM/dd/yyyy"
              rules="required"
            ></e-date-picker>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <div class="heading">Other Details</div>
    <el-card shadow="none">
      <el-row>
        <el-col :span="10">
          <e-date-picker
            label="Assignment date"
            class="default-picker"
            placeholder="Assign Date"
            v-model="task.assigned_at"
            @change="changeAssignDate"
            format="MM/dd/yyyy"
            rules="required"
          ></e-date-picker>
        </el-col>
        <el-col :span="10" :offset="1">          
          <e-select
            label="Assigned By"
            placeholder="Choose Assign"
            :v-model="task.assigned_by_id"
            :options="assign"
            :optionName="'first_name'"
            :valueKey="'id'"
            :field="'assigned_by_id'"
            @visible-change ="visibleChange"
            rules="required"
          ></e-select>
        </el-col>
        <el-col>
          <e-radio label="Image is mandatory ?" v-model="imageValue" :options="report" rules="required" />
        </el-col>
      </el-row>
    </el-card>
    <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px">
      <el-col style="float: right" :span="3" :offset="6">
        <e-button
          :span="3"
          label="Save and Proceed"
          :taskid="taskid"
          width="180"
          @click="handleSubmit(handleClick)"
          css="float-right"
          class="p-45"
        ></e-button>
      </el-col>
    </el-row>
    </ValidationObserver>
  </div>
</template>
<script>
import {  dispatchGraphql ,dispatchGraphqlMutation} from "@/api/dispatcher";
import eDatePicker from "@/controls/eDatePicker.vue";
import moment from 'moment'
export default {
  components: { eDatePicker },
  data: () => ({
    rules: {},
    reportValue:'Yes',
    titmeline:1,
    repeatValue: "Daily",
    endRepeatValue: "End repeat date",
    imageValue: "No",
    task: {},
    assign: [],
    tasks: [],
    taskid: '',
    // minute: '',
    // hour: '',
    // second: '',
    time: '',
    hours:[],
    arr: [],
    sec: [],
    report: [
      {
        title: "Yes",
        value: "Yes",
      },
      {
        title: "No",
        value: "No",
      },
    ],
    Repeat: [
      {
        title: "Daily",
        value: "Daily",
      },
      {
        title: "Weekly",
        value: "Weekly",
      },
      {
        title: "Monthly",
        value: "Monthly",
      },
    ],
    endRepeat: [
      {
        title: "End repeat date",
        value: "End repeat date",
      },
      {
        title: "Repeat Forever",
        value: "Repeat Forever",
      },
    ],  
  }),
  computed: {
    isValid () {
      return this.task.name && this.task.priority && this.task.description && this.task.start_date && this.reportValue && this.endRepeatValue && this.task.repeat_end_date && this.task.assigned_at && this.task.assigned_by_id;
    }
  },
  methods: { 
    handleTime() {
      if (this.titmeline == 1) {
        this.task.start_date = (moment(this.task.start_date).format('L') + ' ' + moment(this.time, ['h:mm A']).format('LTS'))
      } else {
        this.task.end_date = (moment(this.task.end_date).format('L') + ' ' + moment(this.time, ['h:mm A']).format('LTS'))
      }
      console.log('date', this.task.start_date, this.task.end_date)
    },
    getTime() {
      console.log("i am in for loop")
      for(var min = 0; min < 60; min++) {
        this.arr.push({label : min, value: min})
      }
      console.log("muinutes", this.arr)
    },
    getHour() {
      for(var min = 0; min <=24; min++) {
        this.hours.push({label : min, value: min})
      }
        console.log("hours", this.hours)
    },
    getSec() {
      for(var min = 0; min < 60; min++) {
        this.sec.push({label : min, value: min})
      }
        console.log("sec", this.sec)
    },
    select(val) {
      console.log("HHHHHH", this.repeatValue)
      this.task.repeat_type = val
    },
    repeateData(val){
      this.task.repeat = val
    },
    visibleChange: function(value, field) {
      this.task[field] = value
    },
    getVariables: function(task) {
      this.task.repeat_type = this.repeatValue
      this.task.repeat = this.reportValue
      return { "object": task }
    },
    changeDate: function(value) {  
      if (this.titmeline == 1){
        this.task.start_date = value
      }
      else {
        this.task.end_date = value
      }
    },                             
    changeEndDate: function(value) {
        this.task.repeat_end_date = value        
    },
    changeAssignDate: function(value){
      this.task.assigned_at = value        
    },
    getAssigner(){
      const query=`query {
        users (where:  {role: {_neq: "student"}}){
          id
          first_name
        }
      }`
      dispatchGraphql(query).then((response) =>{ 
        this.assign = response.users
      })
    },
    handleClick: function() {       
      dispatchGraphqlMutation('tasks', ['id', 'name'], this.task).then((response) => {
        console.log("show", response);
        console.log("output", this.task)     
        this.taskid = response.insert_tasks_one.id
        console.log("idddddd", this.taskid)
        this.$emit("save", this.taskid)       
      })
    }
  },
  created(){
    this.getAssigner()
    this.getTime()
    this.getHour()
    this.getSec()
  }
}
</script>
<style >
.task1 .el-radio__inner{
width:23px !important;
height:23px !important;
}
</style>
