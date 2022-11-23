<template>
  <div>
    <el-col :span="window.width > 767 ? 11 : 24" :offset="window.width > 767 ? 1 : 0" v-for="(task, i) in tasks" :key="i">
      <el-card class="cp" style="width:31rem;border-radius: 10px;margin-bottom:30px">
        <div @click="handleTask(task)">
        <el-row>
          <el-col :span="15">
            <div style="color: #000000cc" class="fs-20 f-500">
             {{ task.name }}
            </div>
          </el-col>
          <el-col :span="6" :offset="2">
            <div v-if="task.priority < 3" class="f-600" style="color: #bc6c42; opacity: 0.8">High Priority</div>
            <div v-if="task.priority >= 3 && task.priority <= 6" class="f-600" style="color: #00000099">Medium</div>
            <div v-if="task.priority > 6 && task.priority <10" class="f-600" style="color: #00000099">Low</div>
          </el-col>
        </el-row>
        <br/>
        <el-card style="background: rgb(188 108 66 / 10%);border-radius: 10px;" shadow="none">
          <el-row>
            <el-col :span="7">
              <div style="color: #00000066; font-weight: 300">Assigned by</div>
              <div style="color: #00000099; font-weight: 500">{{ task.user.first_name }}</div>
            </el-col>
            <el-col :span="7" :offset="1">
              <div style="color: #00000066; font-weight: 300">Status</div>
              <div style="color: #00000099; font-weight: 500">{{ task.status }}</div>
            </el-col>
            <el-col :span="7" :offset="1">
              <div style="color: #00000066; font-weight: 300">Due date</div>
              <div style="color: #00000099; font-weight: 500">{{ getDate(task.end_date) }}</div>
            </el-col>
          </el-row>
        </el-card>
        </div>
      </el-card>
    </el-col>
  </div>
</template>
<script>
import moment from 'moment'
import screenSize from '@/mixins/screenSize'
export default {
  props: {
    tasks: {
      type: Array,
      default: []
    }
  },
  mixins: [screenSize],
  methods: {
    handleTask(task) {
      this.$router.push(this.$url.FI_TASK_VIEW + "/" + task.id)
    },
    getDate(date) {
      return moment(date).format('DD MM YYYY')
    }
  }
}
</script>
