<template>
  <div>
    <div style="padding: 20px">
      <el-card class="rounded-08 bg-black-2" style="border: none" shadow="none">
        <el-row>
          <el-col :span="4" :offset="1" class="d-flex">
            <e-svg
              style="padding-top: 10px; padding-right: 15px"
              icon="scoreIcon"
            ></e-svg>
            <div>
              <div class="text-gray-6">Score</div>
              <div class="sub-title">30/45</div>
            </div>
          </el-col>
          <el-col :span="4" class="d-flex">
            <e-svg
              style="padding-top: 10px; padding-right: 15px"
              icon="clockIcon"
            ></e-svg>
            <div>
              <div class="text-gray-6">Days taken</div>
              <div class="sub-title">{{ getDays(assignmentInfo.updated_at, assignmentInfo.assignment.created_at )}} days</div>
            </div>
          </el-col>
          <el-col :span="4" class="d-flex">
            <e-svg
              style="padding-top: 10px; padding-right: 15px"
              icon="calenderIcon"
            ></e-svg>
            <div>
              <div class="text-gray-6">Submission date</div>
              <div class="sub-title">{{ getDate(assignmentInfo.updated_at) }} </div>
            </div>
          </el-col>
          <el-col :span="8" :offset="1">
              <div class="bg-black-3" style="padding:10px">
              <div class="text-white">Remarks</div>
              <div class="sub-title">Need to focus on spelling and grammer</div>
              </div>
          </el-col>
        </el-row>
      </el-card>

      <br />

      <el-card class="rounded-08 bg-black-2" style="border: none" shadow="none">
        <div style="color: #f3f3f3" class="fs-20 f-600">Assignment details</div>
        <div
          class="rounded-08"
          style="border: 1px solid #6e6e6e; padding: 10px; margin-top: 10px"
        >
          <el-row>
            <el-col :span="11" v-for="item in assignmentInfo.assignment_details" :key="item.id">
              <el-card
                class="rounded-08 bg-black-2"
                style="border: none"
                shadow="none"
              >
                <div style="color: #f3f3f3" class="fs-16 f-600">{{ item.name }}</div>
                <div
                  class="bg-black-3"
                  style="padding: 20px; margin-top: 10px; color: #f3f3f3"
                >
                  {{ item.value }}
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <br />
      <el-card class="rounded-08 bg-black-2" style="border: none" shadow="none">
        <div style="color: #f3f3f3" class="fs-20 f-600">Attachments</div>
        <div style="flex-wrap: wrap; margin-top: 6px" class="d-flex">
          <div
            v-for="i in 5"
            :key="i"
            class="bg-black-3 d-flex"
            style="width: 140px; padding: 13px; margin: 9px"
          >
            <e-svg icon="downloadAttach"></e-svg>
            <div style="color: #1492e6; padding-left: 5px">Study data.pdf</div>
          </div>
        </div>
      </el-card>
    </div>
    <el-row
      style="
        margin-top: 20px;
        background: #1e1e1e;
        padding-top: 25px;
        padding-bottom: 15px;
      "
    >
      <el-col :span="5" :offset="14">
        <es-button text="Exit" width="200" @click ="handleExit()" ></es-button>
      </el-col>
      <el-col style="float: right" :span="5">
        <es-button text="Download" width="200" :plain="true"></es-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  props: {
    assignmentInfo: {
      type: Object,
      default: null
    }
  },
  data: () => ({ 
    // assignSubmission: {
    //   assignment_id: '',
    //   user_id: '',
    //   assignment_details:[],
    // }
  }), 
  methods: {
    handleExit() {
      this.$router.push(this.$url.LN_ASSIGNMENTS)
    },
      getDate(val) {
      return moment(val).format('yyyy-MM-DD')
    },
    getDays(val1,val2) {
      if(moment(val1).format('DD') > moment(val2).format('DD') ){
        return moment(val1).format('DD') -  moment(val2).format('DD')

      }
    },

  }, 
  created() {
    console.log("assignmentInfo", this.assignmentInfo)
  },
}
</script>
