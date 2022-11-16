<template>
  <right-side-bar class="school-tentative-detail" :show="show" @onClose="__onClose">
    <div>
      <div class="">
        <div class="heading" style="padding-left: 3rem !important;">{{ exam.name }}</div>
        
        <hr style="opacity: 0.2" />
        <div style="padding:10px 30px">
          <el-row>
            <el-col :span="8">
              <el-avatar :size="98" :src="require('@/assets/images/profile.jpg')" />
            </el-col>
            <el-col :span="4" :offset="2" style="width:auto">
              <div style="margin-top: 20px" class="heading">{{ exam.invigilator.first_name || '' }}</div>
            </el-col>
          </el-row>
        </div>
        <div class="pd-x-30  pd-b-30">
          <el-card shadow="none" style="background: rgba(248, 243, 238, 0.35); " class="rounded-08 text-center classroom-right__slide">
            <el-row style="opacity: 0.8">
              <el-col :span="12" style="border-right: 2px solid #fcdfbd;border-bottom: 2px solid #fcdfbd;padding: 10px;">
                <span>Standard</span> <br />
                <span style="color: rgb(0, 0, 0); font-weight: bold">{{ exam.standard.name }}</span>
              </el-col>
              <el-col :span="12" style="border-bottom: 2px solid #fcdfbd; padding: 10px">
                <span>Exam Type</span> <br />
                <span style="color: rgb(0, 0, 0); font-weight: bold">{{ exam.exam_type.name }}</span>
              </el-col>
              <el-col style="border-right: 2px solid #fcdfbd; padding: 10px" :span="12">
                <span>Attendance</span> <br />
                <span style="color: rgb(0, 0, 0); font-weight: bold">{{ getAttendedStudents(exam) }} / {{ getTotalStudents(exam) }}</span>
              </el-col>
              <el-col style="padding-top: 10px" :span="12">
                <span>Exam date</span> <br />
                <span style="color: rgb(0, 0, 0); font-weight: bold">{{ getDate(exam.start_date) }}</span>
              </el-col>
            </el-row>
          </el-card>
        </div>

        <!-- <div style="background:#E6EAED;height:28vh;overflow:scroll" class="pd-x-30">
            <div class="fs-20 f-600" style="opacity:0.8;padding: 10px 0 0px 20px;">Mark Grade</div>
            <div class="">

            </div>
            <el-card shadow='none' class="rounded-08">
        <div style="
        opacity: 0.6;">This exam has not been graded. Please mark the grades before 15th august</div>
        <br/>
        <e-button label='Mark Grade'></e-button>
        <br/><br/>
            </el-card>
            <br/>
            <div class="d-flex">
                <e-svg icon='Group'></e-svg>
                <div style="opacity:0.4;margin-left:10px">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu venenatis tellus. Fusce faucibus est vitae facilisis consectetur.</div>
            </div>
            <br/>
        </div> -->        
      </div>
    </div>
  </right-side-bar>
</template>

<script>
// import eButton from "../../../controls/eButton.vue";
// import EImgName from "../../../controls/table/eImgName.vue";
import RightSideBar from "../rightSideBar.vue";
import moment from 'moment'
export default {
  components: { RightSideBar },
  props: {
    show: { type: Boolean, default: false },
    __onClose: Function,
    exam: {
      type: Object,
      default: null
    }
  },
  data() {
    return {}
  },
  methods: {
    getAttendedStudents(exam) {
      return exam.exam_report.length
    },
    getTotalStudents(exam) {
      var total = 0
      for (const section of exam.standard.standard_sections) {
        total += section.section_students.length
      }
      return total
    },
    getDate(date) {
      if (date) {
        return moment(date).format('MMM DD, YYYY')
      } else {
        return ''
      }
    }
  }
}
</script>

<style>
.mark-container {
  background: rgba(188, 108, 66, 0.35);
  border-radius: 12px;
  vertical-align: middle;
  line-height: 46px;
  color: rgb(188, 108, 66);
}
.sb-section__2 {
  height: 400px;
  overflow-y: scroll;
  padding-bottom: 350px;
}
@media screen and (min-height: 1000px) {
  .sb-section__2 {
    height: 350px;
  }
}
</style>
