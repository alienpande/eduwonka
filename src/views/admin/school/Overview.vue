<template>
  <e-container pageTitle="Dashboard" class="school-dashboard">

    <el-row class="dashboard-cards-wrapper">

      <e-card title="Grade Performance" class="chart-card-container">
        <grade-performance-card title="subject grade progress" v-if="subjects.length > 0" :subjects="subjects"
          :reports="setChartReport()" :chartData="chartData" :chartOptions="chartOptions" />
      </e-card>

      <e-card class="chart-card-container">
        <term-grade-performance title="Term wise grade progress" v-if="examTypes.length > 0" :terms="examTypes"
          :termReport="setChartReport()" :chartData="chartData" :chartOptions="chartOptions" />
      </e-card>

      <e-card title="Exam Stats" containerHeight="490px">
        <stats-card :ongoing="setExams('active')" :upcoming="setExams('upcoming')" :completed="setExams('completed')"
          title="Exams" />
      </e-card>

      <e-card title="Term Stats" containerHeight="490px">
        <stats-card :ongoing="setTypes('active')" :upcoming="setTypes('upcoming')" :completed="setTypes('completed')"
          title="Term Exams" :graphData="examTypes" />
      </e-card>

      <e-card title="Performing Stats" paddingX="10px">
        <el-row class="dashboard-cards-wrapper">
          <div>
            <div class="tx-bold pr-x-40 mg-y-20 text-left">Best Performing Students</div>
            <div class="mg-y-20" v-for="(student, i) in getPerformance('best')" :key="i">
              <e-img-name :src="require('@/assets/images/profile.jpg')" nameStyle="font-weight:normal"
                :name="student.first_name" />
            </div>
          </div>
          <div class="">
            <div class="tx-bold pr-x-40 mg-y-20 text-left">Weak Performing Students</div>
            <div class="mg-y-20" v-for="(student, i) in getPerformance('weak')" :key="i">
              <e-img-name :src="require('@/assets/images/profile.jpg')" nameStyle="font-weight:normal"
                :name="student.first_name" />
            </div>
          </div>
        </el-row>
      </e-card>

      <e-card title="Performing Stats" paddingX="10px">
        <el-row class="dashboard-cards-wrapper">
          <div>
            <div class="pr-x-40 mg-y-15 text-left tx-bold">Best Performing Exam</div>
            <div class="mg-y-40 tx-normal" v-for="(exam, i) in getExamPerformance('best')" :key="i">
              {{ exam.name }}
            </div>
          </div>
          <div class="">
            <div class="pr-x-40 mg-y-15 text-left tx-bold">Weak Performing Exam</div>
            <div class="mg-y-40 tx-normal" v-for="(exam, i) in getExamPerformance('weak')" :key="i">
              {{ exam.name }}
            </div>
          </div>
        </el-row>
      </e-card>

    </el-row>
  </e-container>
</template>

<script>
import GradePerformanceCard from "@/components/school/Overview/GradePerformanceCard.vue";
import TermGradePerformance from "@/components/school/Overview/termGradePerformance.vue";
import StatsCard from "@/components/school/Overview/StatsCard.vue";
import eContainer from "@/controls/eContainer.vue";
import EImgName from "@/controls/table/eImgName.vue";
import { dispatchGraphql } from "@/api/dispatcher"
import moment from 'moment'
export default {
  components: { eContainer, GradePerformanceCard, StatsCard, EImgName, TermGradePerformance },
  data() {
    return {
      standards: [],
      subjects: [],
      examTypes: [],
      chartData: [
        ["1", "Count", { role: "style" }],
        ["0", 80, "#37c64c"],
        ["1", 30, "#37c64c"],
        ["2", 40, "#37c64c"],
        ["3", 70, "#37c64c"],
        ["4", 80, "#37c64c"],
        ["5", 30, "#37c64c"],
        ["6", 10, "#37c64c"],
        ["7", 50, "#37c64c"],
        ["8", 40, "#37c64c"],
      ],

      chartOptions: {
        dataOpacity: 0.3,

        vAxis: {
          gridlines: { count: 0 },
          textPosition: "none",
        },
        pointSize: 6,
        chartArea: { top: "0%", height: "80%", width: "80%" },
        hAxis: {
          minValue: 1,
          maxValue: 9,
          gridlines: { count: 0, color: "black" },
          textStyle: {
            fontSize: 13,
            transform: "rotate(0deg);",
          },
        },
        curveType: "function",
        legend: "none",
      },
    };
  },
  created() {
    this.getStandards()
  },
  methods: {
    setTypes(type) {
      let active = 0
      let upcoming = 0
      let completed = 0
      for (const type of this.examTypes) {
        if (type.exams.length > 0) {
          for (const exam of type.exams) {
            if (moment(exam.start_date).format('YYYY/MM/DD') === moment(new Date()).format('YYYY/MM/DD')) {
              active++
            } else if (moment(exam.start_date).format('YYYY/MM/DD') > moment(new Date()).format('YYYY/MM/DD')) {
              upcoming++
            } else if (moment(exam.start_date).format('YYYY/MM/DD') < moment(new Date()).format('YYYY/MM/DD')) {
              completed++
            }
          }
        }
      }
      if (type === 'active') {
        return active
      } else if (type === 'upcoming') {
        return upcoming
      } else if (type === 'completed') {
        return completed
      }
    },
    setExams(type) {
      let active = 0
      let upcoming = 0
      let completed = 0
      for (const standard of this.standards) {
        for (const exam of standard.exams) {
          if (moment(exam.start_date).format('YYYY/MM/DD') === moment(new Date()).format('YYYY/MM/DD')) {
            active++
          } else if (moment(exam.start_date).format('YYYY/MM/DD') > moment(new Date()).format('YYYY/MM/DD')) {
            upcoming++
          } else if (moment(exam.start_date).format('YYYY/MM/DD') < moment(new Date()).format('YYYY/MM/DD')) {
            completed++
          }
        }
      }
      if (type === 'active') {
        return active
      } else if (type === 'upcoming') {
        return upcoming
      } else if (type === 'completed') {
        return completed
      }
    },
    getExamPerformance(type) {
      var bestExams = []
      var weakExams = []
      for (const standard of this.standards) {
        for (const exam of standard.exams) {
          if (exam.exam_report.length > 0) {
            let score = 0
            let avg = 0
            for (const report of exam.exam_report) {
              score += report.marks
            }
            avg = score / exam.exam_report.length
            if (avg >= 70) {
              bestExams.push(exam)
            } else if (avg < 55) {
              weakExams.push(exam)
            }
          }
        }
      }
      if (type === 'best') {
        return bestExams
      } else if (type === 'weak') {
        return weakExams
      }
    },
    getPerformance(type) {
      var bestPerformers = []
      var weakPerformers = []
      for (const standard of this.standards) {
        for (const exam of standard.exams) {
          if (exam.exam_report.length > 0) {
            for (const report of exam.exam_report) {
              if (report.marks >= 75) {
                const user = bestPerformers.filter(x => x.id === report.student.id)[0]
                if (!user) {
                  bestPerformers.push(report.student)
                }
              } else if (report.marks < 55) {
                const user = weakPerformers.filter(x => x.id === report.student.id)[0]
                if (!user) {
                  weakPerformers.push(report.student)
                }
              }
            }
          }
        }
      }
      if (type === 'best') {
        return bestPerformers
      } else if (type === 'weak') {
        return weakPerformers
      }
    },
    setChartReport() {
      var reports = []
      for (const standard of this.standards) {
        for (const exam of standard.exams) {
          if (exam.exam_report.length > 0) {
            reports.push(exam)
          }
        }
      }
      return reports
    },
    getStandards() {
      const query = `query {
        standards {
          id
          name
          exams {
            id
            name
            exam_type_id
            start_date
            subject_id
            exam_report {
              id
              marks
              student {
                id
                first_name
              }
            }
            subject {
              id
              name
            }
          }
        }
      }`
      const subQuery = `query {
        subjects {
          id
          name
        }
      }`
      const examQuery = `query {
        exam_types {
          id
          name
          exams {
            id
            start_date
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.standards = response.standards
        dispatchGraphql(subQuery).then((response) => {
          this.subjects = response.subjects
          dispatchGraphql(examQuery).then((response) => {
            this.examTypes = response.exam_types
          })
        })
      })
    },
  }
}
</script>

<style scoped>
.chart-card-container>>>.grade-carde>div:last-child {
  bottom: -15px;
}

@media only screen and (max-width:767px) {
  .chart-card-container>>>.grade-carde>div:last-child {
    bottom: -30px;
  }
}
</style>