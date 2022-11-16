<template>
  <div class="view-no-form">
    <el-col class="bg-color sm-width-100" :span="9" v-for="(exam, i) in exams" :key="i">
      <div @click="setData(exam)" class="cp">
        <el-row class="term-desc">
          <el-col :span="2">
            <el-col :span="1" :class="setClass(exam)"></el-col>
          </el-col>
          <el-col :span="22" class="term-desc-font">{{ exam.name }}</el-col>
        </el-row>
        <el-row class="heading-margin">
          <el-col class="audiance-heading-font" :span="12"> Attendance </el-col>
          <el-col :span="12" class="due-date-heading">Due Date</el-col>
        </el-row>
        <el-row>
          <el-col :span="12" class="term-attendance">
            {{ getAttendedStudents(exam) }} / {{ getTotalStudents(exam) }}
          </el-col>
          <el-col :span="12" class="term-duedate">
            {{ getDate(exam.start_date) }}
          </el-col>
        </el-row>
      </div>
    </el-col>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    exams: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {}
  },
  created() {
  },
  methods: {
    setClass(exam) {
      var report = exam.exam_report.filter(x => x.status == 'signed')
      if (report.length > 0) {
        return 'graded-term-line'
      } else {
        return 'term-line'
      }
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
      return moment(date).format('DD MMM YYYY')
    },
    setData(exam) {
      this.$emit('rightBarOpen', exam)
    },
  }
};
</script>

<style scoped>
.bg-color {
  background-color: #ffffff;
  padding: 20px;
  margin: 10px;
}
.term-desc {
  display: flex;
}
.term-line {
  background: #e60000;
  height: 50px;
  padding: 3px;
}
.graded-term-line {
  background: #0bc32e;
  height: 50px;
  padding: 3px;
}
.term-desc-font {
  font-weight: 600;
  margin-top: 10px;
}
.heading-margin {
  margin-top: 15px;
}
.audiance-heading-font {
  font-size: 12px;
}
.due-date-heading {
  font-size: 12px;
}
.term-attendance {
  font-weight: 550;
}
.term-duedate {
  font-weight: 550;
}
</style>
