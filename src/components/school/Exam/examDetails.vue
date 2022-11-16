<template>
  <right-side-bar class="school-exam-past" :show="show" @onClose="__onClose">
    <div>
      <div class="">
        <div class="heading" style="padding-left: 3rem !important">{{ exam.name }}</div>
        <hr style="opacity: 0.2" />
        <div style="padding:10px 30px">
          <el-row>
            <el-col :span="8">
              <el-avatar :size="98" :src="require('@/assets/images/profile.jpg')" />
            </el-col>
            <el-col :span="4" :offset="1" style="width:auto">
              <div style="margin-top: 20px" class="heading">{{ exam.invigilator.first_name || '' }}</div>
            </el-col>
          </el-row>
        </div>
        <div class="pd-x-30 pd-10 pd-b-30">
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
      </div>
      <div class="bg-ui-03 pd-10" style="background: #e6eaed">
        <div class="d-flex justify-content-between  mg-x-30">
          <div stlye="color:rgba(0,0,0,0.8);font-weight: 600;" class="fs-20">Grade book</div>
          <!-- <el-button :span="3" icon="el-icon-download" circle /> -->
          <e-svg icon='downloads'></e-svg>
        </div>
        <el-tabs class="mg-t-0 pd-x-30" v-model="activeName">
          <el-tab-pane class="mg-0 sb-section__2" label="Submitted" name="signed">
            <el-card class="rounded-08 mg-b-20" v-for="(report, i) in reports" :key="i">
              <div class="d-flex justify-content-betweem wd-100p cp">
                <div class="wd-70p">
                  <e-img-name :src="require('@/assets/images/profile.jpg')" :name="report.student.first_name" nameStyle="color:#4D4F5C;font-weight:500;" />
                </div>
                <div class="mark-container text-center wd-30p tx-bold">{{ report.marks }}</div>
              </div>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="Not-Submitted" name="notSigned" class="sb-section__2">
            <el-card class="rounded-08 mg-b-20" v-for="(report, i) in reports" :key="i">
              <div class="d-flex justify-content-betweem wd-100p cp">
                <div class="wd-70p">
                  <e-img-name :src="require('@/assets/images/profile.jpg')" :name="report.student.first_name" />
                </div>
                <div class="mark-container text-center wd-30p tx-bold">0</div>
              </div>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </right-side-bar>
</template>

<script>
// import eButton from "../../../controls/eButton.vue";
import EImgName from "../../../controls/table/eImgName.vue";
import RightSideBar from "../rightSideBar.vue";
import moment from 'moment'
import _ from 'lodash'
export default {
  components: { RightSideBar, EImgName },
  props: {
    show: { type: Boolean, default: false },
    __onClose: Function,
    exam: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      activeName: "signed",
      reports: [],
      signed: [],
      notSigned: []
    };
  },
  watch: {
    activeName: _.debounce(function() {
      if (this.activeName === 'notSigned') {
        this.reports = []
        this.reports = this.notSigned
      } else if (this.activeName === 'signed') {
        this.reports = []
        this.reports = this.signed
      }
    })
  },
  created() {
    console.log("created")
    this.setGradeBook()
  },
  methods: {
    setGradeBook() {
      for (const report of this.exam.exam_report) {
        if (report.status === 'signed') {
          this.signed.push(report)
        } else {
          this.notSigned.push(report)
        }
      }
      this.reports = []
      this.reports = this.signed
      console.log(this.signed, 'signed', this.notSigned, 'notSigned')
    },
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
      return moment(date).format('MMM DD, YYYY')
    }
  }
};
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
