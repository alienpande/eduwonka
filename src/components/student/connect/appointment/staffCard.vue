<template>
  <div>
    <el-col :span="23" :offset="1" v-for="(appointment, i) of appointments" :key="i" class="mg-t-20">
      <div @click="$emit('cliks', appointment)">
        <el-card shadow="none" style="padding: 8px; border: none" class="pointer rounded-08 pg-50 bg-black-2">
          <div class="tx-bolder tx-18 text-white">
            {{ appointment.title }}
          </div>
          <div shadow="none" style="border: none; padding: 13px" class="mg-t-20 rounded-08 bg-black-3">
            <el-row>
              <el-col :span="11" :offset="1">
                <div class="text-gray-6">Date</div>
                <div class="text-white tx-bolder">
                  {{ getDate(appointment.start_time) }}
                </div>
              </el-col>
              <el-col :span="10" :offset="2">
                <div class="text-gray-6">Location</div>
                <div class="text-white tx-bolder">
                  {{ appointment.status }}
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </div>
    </el-col>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  props: {
    appointments: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getDate(date) {
      return moment(date).format('DD MMM, YYYY')
    }
  }
}
</script>
