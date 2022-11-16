<template>
  <div class="view-no-form">
    <el-col class="bg-color sm-width-100" :span="9" v-for="(exam, i) in exams" :key="i">
      <el-row class="upcoming-desc">
        <el-col class="upcoming-desc-font">{{ exam.name }}</el-col>
      </el-row>
      <el-row class="upcoming-audiance-margin">
        <el-col class="upcoming-audiance-font" :span="12"> Audience </el-col>
        <el-col class="upcoming-date-font" :span="12">Date</el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="upcoming-attendance">
          {{ getTotalStudents(exam) }}
        </el-col>
        <el-col :span="12" class="upcoming-date">
          {{ getDate(exam.start_date) }}
        </el-col>
      </el-row>
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
    return {};
  },
  created() {},
  methods: {
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
  }
};
</script>

<style scoped>
.bg-color {
  background-color: #ffffff;
  padding: 20px;
  margin: 10px;
}
.upcoming-desc {
  display: flex;
}
.upcoming-desc-font {
  font-weight: 600;
  margin-top: 10px;
  width: 70%;
}
.upcoming-audiance-margin {
  margin-top: 15px;
}
.upcoming-audiance-font {
  font-size: 12px;
}
.upcoming-date-font {
  font-size: 12px;
}
.upcoming-attendance {
  font-weight: 550;
}
.upcoming-date {
  font-weight: 550;
}
</style>
