<template>
  <div>
    <el-card class="mg-l-40 mg-r-40 rounded-08 bg-black-2" :style="'border: none'" shadow="none">
      <el-row>
        <el-col :span="20">
          <span class="tx-20 tx-bolder text-white">Appointment Details</span>
        </el-col>
      </el-row><br />
      <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
        <el-form :model="appointment">
          <el-row class="mg-b-30">
            <el-col :span="6" :offset="1">
              <div class="text-white tx-18 tx-bolder">Name</div>
              <el-form-item prop="name">
                <es-input v-model="appointment.title" placeholder="Enter Name" />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
              <div class="text-white tx-18 tx-bolder">Set Date</div>
              <el-form-item prop="name">
                <es-date-picker v-model="appointment.start_time" placeholder="Pick a Date" @change="changeDate" format="MM/dd/yyyy" />
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
              <div>&emsp;</div>
              <el-form-item prop="name">
                <el-checkbox class="text-white mg-t-10" size="medium" v-model="appointment.reccuring">No. Set infinite Date</el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4" :offset="1">
              <div class="text-white tx-18 tx-bolder">Choose location</div>
              <el-form-item prop="name">
                <es-select Placeholder="select" :v-model="appointment.location" :options="locations" :optionName="'label'" :valueKey="'value'" @visible-change="setLocation" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </el-card>
    <el-row style=" margin-top: 70px; background: #1e1e1e; padding-top: 25px; padding-bottom: 15px;">
      <el-col :span="3" :offset="16">
        <es-button text="Cancel" width="200" />
      </el-col>
      <el-col style="float: right" :span="4">
        <es-button text="Create Appointment" width="200" @click="submit()" :plain="true" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { dispatchGraphqlMutation } from "@/api/dispatcher"
import { getId } from '@/util/auth'
import moment from 'moment'
export default {
  data: () => ({
    appointment: {},
    locations: [
      {
        label: "Online",
        value: "online",
      },
      {
        label: "Offline",
        value: "offline",
      }
    ],
  }),
  created() {
    this.setType(this.$route.params.type)
  },
  methods: {
    setType(type) {
      if (type === 'staff') {
        this.appointment.appointment_user_type = 'Staff'
      } else if (type === 'parent') {
        this.appointment.appointment_user_type = 'Parent'
      } else {
        this.appointment.appointment_user_type = 'Student'
      }
    },
    submit() {
      this.appointment.created_by_id = getId()
      this.appointment.updated_by_id = getId()
      this.appointment.status = "pending"
      this.appointment.reccuring = this.appointment.reccuring ? true : false
      console.log(this.appointment, 'appointment')
      dispatchGraphqlMutation('appointments', ['id', 'title'], this.appointment).then((response) => {
        this.$emit('save', response.insert_appointments_one.id)
      })
    },
    setLocation(val) {
      this.appointment.location = val
    },
    changeDate: function(value) {
      this.appointment.start_time = moment(value).format('')
    }
  }
}
</script>