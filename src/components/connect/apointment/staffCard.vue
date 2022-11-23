<template>
  <el-row :gutter="20" :style="{display: window.width < 767 && 'grid'}">
    <el-col v-for="(appointment, i) of appointments" :key="i" class="cp mg-b-10" :span="window.width > 767 ? 7 : 24" :offset="window.width > 767 ? 1 : 0">
      <el-card shadow="none" style="padding:10px;">
        <div style="color: #000000; opacity: 0.8" class="fs-20 f-600"  @click="$emit('cliks', appointment)">
          {{ appointment.title }}
        </div>
        <br />
        <el-row>
          <el-col :span="13">
            <div style="color: #000000; opacity: 0.8; font-weight: 300">Date</div>
            <div style="color: #000000;opacity: 0.8;font-weight: 600;font-size: 20;">
              {{ getDate(appointment.start_time) }}
            </div>
          </el-col>
          <el-col :span="9">
            <div style="color: #000000; opacity: 0.8; font-weight: 300">
              Status
            </div>
            <div style="color: #000000;opacity: 0.8;font-weight: 600;font-size: 20;">
              {{ appointment.status }}
            </div>
          </el-col>
        </el-row>
      </el-card>
      <el-button type="warning" size="medium" v-if="appointment.location === 'online'" @click="conferenceCall(appointment)">Open Appointment</el-button>
    </el-col>
  </el-row>
</template>
<script>
import moment from 'moment'
import screenSize from "@/mixins/screenSize"

export default {
  mixins: [screenSize],
  props: {
    appointments: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getDate(date) {
      return moment(date).format('DD MMM, YYYY')
    },
    conferenceCall(appointment){
      var time = moment(),
        beforeTime = moment(appointment.start_time),
        afterTime = moment(appointment.end_time);
      this.$router.push('/connect/online-meet/'+appointment.id+'/')
      if (time.isBetween(beforeTime, afterTime)) {
      }
    },
  }
}
</script>
