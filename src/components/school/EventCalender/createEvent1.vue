<template>
  <div>
    <el-form :model="event" ref="form" :rules="rules" class="form-type-3">
      <el-row>
        <el-col :span="4" :offset="2">
          <el-form-item label="Name of the Event" prop="title">
            <e-input v-model="event.title" placeholder="Enter Title" class="custom-input" />
          </el-form-item>
        </el-col>
        <el-col :span="4" :offset="2">
          <el-form-item label="Event Start Date" prop="start_time">
            <e-date-picker v-model="event.start_time" type="datetime" placeholder="Pick a Date" class="custom-date-picker" @change="handleStartDate" />
          </el-form-item>
        </el-col>
        <el-col :span="4" :offset="2">
          <el-form-item label="Event End Date" prop="end_time">
            <e-date-picker v-model="event.end_time" type="datetime" placeholder="Pick a Date" class="custom-date-picker" @change="handleEndDate" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="justify-content: flex-start;column-gap: 40px;">
        <el-col class="custom-input-textarea" :span="5" :offset="2" style="width:40%">
          <el-form-item label="Description" prop="description">
          <e-input v-model="event.description" placeholder="Type Description Here" type="textarea" />
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="1" style="margin-top: 5% !important;">
          <div class="syllabus-courosle" v-for="i in 3" :key="i">
            <e-svg class="pointer-icon" icon="Pointer" />
            <div class="syllabus-cousol__info">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            </div>
          </div>
        </el-col>
      </el-row>

    </el-form>
    <hr class="end-of-form-line">
    <el-row class="form-last-buttons" style="justify-content: flex-end;">
        <e-button :span="15" label="Cancel" width="180" css="cancel_btn" type="default" class="p-45" ></e-button>
        <e-button :span="8" label="Proceed" width="180" css="float-right" class="p-45" @click="handleClick('form')" ></e-button>
    </el-row>
  </div>
</template>
<script>
import moment from 'moment'
import { dispatchGraphqlMutation } from "@/api/dispatcher"

export default {
  data() {
    return {
      event: {},
      rules: {
        title: [
          { required: true, message: 'Please give Title', trigger: 'blur' }
        ],
        start_time: [
          { required: true, message: 'Event Start Date', trigger: 'blur' }
        ],
        end_time: [
          { required: true, message: 'Event End Date', trigger: 'blur' }
        ],
        description: [
          { required: true, message: 'Enter Event Description', trigger: 'blur' }
        ]
      }
    }
  },
  created() {},
  methods: {
    handleClick(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          dispatchGraphqlMutation('events', ['id', 'title'], this.event).then((response) => {
            this.$emit('save', response.insert_events_one.id)
          })
        } else {
          this.$notify({
            title: 'Error',
            message: 'Please check the data',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    handleStartDate: function(val) {
      this.event.start_time = moment(val).format('')
      console.log(this.event.start_time)
    },
    handleEndDate: function(val) {
      this.event.end_time = moment(val).format('')
      console.log(this.event.end_time)
    }
  },
}
</script>

<style scoped>
.syllabus-courosle {
  display: flex;
  margin-bottom: 18px;
}
.pointer-icon {
  display: inline-block;
  margin-top: 8px;
  margin-right: 8px;
}
.syllabus-cousol__info {
  font-size: 14px;
  font-weight: 300;
  opacity: 0.6;
}
</style>
