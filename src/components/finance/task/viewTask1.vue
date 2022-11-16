<template>
  <div class="mg-l-20">
    <div class="heading">Task Details</div>
    <el-card shadow="none">
      <el-row>
        <el-col :span="7">
          <div class="label f-600">Task Details</div>
          <div class="fs-16 label-detail">{{ taskDetails.name }}</div>
        </el-col>
        <el-col :span="7" :offset="1">
          <div class="label f-600">Priority</div>
          <div class="fs-16 label-detail">{{ taskDetails.priority }}</div>
        </el-col>
        <el-col :span="7" :offset="1">
          <div class="label f-600">Description</div>
          <div class="fs-16 label-detail">
            {{ taskDetails.description }}
          </div>
        </el-col>
      </el-row>
    </el-card>

    <el-row>
      <el-col :span="11">
        <div class="heading">Timeline</div>
        <el-card shadow="none">
          <div class="label f-600">Duration</div>
          <div class="fs-16 label-detail">
            {{ getDate(taskDetails.start_date) }} To {{ getDate(taskDetails.end_date) }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="11" :offset="1">
        <div class="heading">Repeat</div>
        <el-card shadow="none">
          <el-row>
            <el-col :span="11">
              <div class="label f-600">Task repeats</div>
              <div class="fs-16 label-detail">{{ taskDetails.repeat_type }}</div>
            </el-col>
            <el-col :span="11" :offset="1">
              <div class="label f-600">End Repeat</div>
              <div class="fs-16 label-detail">{{ taskDetails.repeat_end_date }}</div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <div class="heading">Other Details</div>
    <el-card shadow="none">
      <el-row>
        <el-col :span="7">
          <div class="label f-600">Assignment date</div>
          <div class="fs-16 label-detail">{{ getDate(taskDetails.assigned_at) }}</div>
        </el-col>
        <el-col :span="7" :offset="1">
          <div class="label f-600">Assigned By</div>
          <div class="fs-16 label-detail">{{ taskDetails.user ? taskDetails.user.first_name : '' }}</div>
        </el-col>
        <el-col :span="7" :offset="1">
          <div class="label f-600">Image mandatory</div>
          <div class="fs-16 label-detail">{{ taskDetails.image }}</div>
        </el-col>
      </el-row>
    </el-card>
    <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px">
      <el-col style="float: right" :span="3" :offset="6">  
        <e-button :span="3" label="Proceed" width="180" @click="$emit('save')" css="float-right" class="p-45"></e-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { dispatchGraphql } from '@/api/dispatcher'
// import { getId } from '@/util/auth'
import moment from 'moment'
export default {
  data: () => ({
    taskDetails: {},
  }),
  created() {
    this.getTask()
  },
  methods: {
    getDate(date) {
      return moment(date).format('DD MM YYYY')
    },
    getTask() {
      const query = `query {
        tasks_by_pk(id: "${this.$route.params.id}") {
          name
          id
          end_date
          priority
          description
          start_date
          repeat_type
          repeat_end_date
          assigned_at
          image
          status
          user {
            id
            first_name
          }
          audience {
            id
            status
            user {
              id
              first_name
            }
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.taskDetails = response.tasks_by_pk
      })
    }
  },
}

</script>

<style scoped>
.label-detail {
  color: #000000cc;
  padding-bottom: 10px;
}
</style>
