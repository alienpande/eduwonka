<template>
  <div class="learn-course-assignment" v-if="standardSubject" style="overflow: auto; height: 80vh">
    <course-header title="Assignment" :standard="standard.name" :subject="subject.name" />
    <el-row class="sm-p-x-15 reduce-padding">
      <el-col :span="10" style="margin-left: 40px " class="sm-margin-l-0 sm-width-100">
        <div class="heading">Class period stats</div>
        <el-card shadow="none" class="rounded-08 pg-50 cp">
          <div style="display: flex;justify-content: space-between;text-align: center;">
            <div style="background: #fcdfbd;border-radius: 10px;padding: 6px 23px;">
              <span style="font-size: 14px;font-weight: 300;display: block;color: rgb(0 0 0 / 80%);margin-top: 10px;">Alloted</span>
              <span style="font-size: 44px;font-weight: 500;color: rgb(0 0 0 / 80%);margin-top: 15px;">{{ getTopics(standardSubject.subject, 'alloted') }}</span>
            </div>
            <div style="padding: 6px 23px">
              <span style="font-size: 14px;font-weight: 300;display: block;color: rgb(0 0 0 / 80%);margin-top: 10px;">Taken</span>
              <span style="font-size: 44px;font-weight: 500;color: rgb(0 0 0 / 80%);margin-top: 15px;">{{ getTopics(standardSubject.subject, 'taken') }}</span>
            </div>
            <div style="padding: 6px 23px">
              <span style="font-size: 14px;font-weight: 300;display: block;color: rgb(0 0 0 / 80%);margin-top: 10px;">In delay</span>
              <span style="font-size: 44px;font-weight: 500;color: rgb(0 0 0 / 80%);margin-top: 15px;">{{ getTopics(standardSubject.subject, 'delay') }}</span>
            </div>
          </div>

          <VueSlickCarousel v-bind="settings" :arrows="false" :dots="true">
            <!-- <div v-for="i in 4" :key="i" class="cousole-wrap"> -->
            <div class="cousole-wrap" v-for="topic of getTopics(standardSubject.subject, 'data')" :key="topic">
              <e-svg class="pointer-icon" icon="Pointer" />
              <span class="syllabus-cousol__info">
                {{ topic.name }}
              </span>
            </div>
            <!-- </div> -->
          </VueSlickCarousel>
        </el-card>
      </el-col>
      <el-col :span="8" style="margin-left: 40px" class="sm-margin-l-0 sm-width-100">
        <div class="heading">Time stats</div>
        <el-card shadow="none" class="rounded-08 card-padd cp">
          <el-row>
            <el-col :span="11" style="overflow: auto;border-right:1px solid #E6EAED">
              <div v-for="topic of getTopics(standardSubject.subject, 'data')" :key="topic" class="subtopic-hover" style="display: flex;padding-bottom: 7px;padding-top: 14px;padding-left: 18px;">
                <e-svg icon="Group"></e-svg>
                <div style="font-size: 16px; font-weight: 600; padding: 0 24px" class="sm-p-x-10" @click="getStats(topic.classrooms)" >
                  {{ topic.name }}
                </div>
              </div>
            </el-col>
            <el-col v-if="hasStats" :span="10" style="padding: 0 20px">
              <div style="opacity: 0.8; font-weight: 300">Avg. Time</div>
              <div style="opacity: 0.8;font-weight: 500;font-size: 24px;margin-top: 5px;">{{ averageTime }} hrs</div><br />
              <div style="opacity: 0.8; font-weight: 300">Preferred time</div>
              <div style="opacity: 0.8;font-weight: 500;font-size: 24px;margin-top: 5px;">{{ preferredTime }}</div><br />
              <div style="opacity: 0.8; font-weight: 300">Avg. Breaks</div>
              <div style="opacity: 0.8;font-weight: 500;font-size: 24px;margin-top: 5px;">{{ averageBreaks }}</div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="sm-p-x-15 reduce-padding">
      <el-col :span="10" style="margin-left: 40px" class="sm-margin-l-0 sm-width-100">
        <div class="heading">Result stats</div>
        <el-card shadow="none" class="overflow-auto;rounded-08 results-stat card-padd cp">
          <result-stat v-if="chartLoading" :chartData="chartData" :chartOptions="chartOptions" />
        </el-card>
      </el-col>
      <el-col :span="8" style="margin-left: 40px" class="sm-margin-l-0 sm-width-100">
        <div class="heading">Response study</div>
        <el-card shadow="none" style="height: 304px" class="rounded-08 card-padd cp">
          <el-row>
            <el-col :span="11" style="height: 250px; overflow: auto;border-right:1px solid #E6EAED">
              <div v-for="exam in exams" :key="exam" class="subtopic-hover" style="display: flex;padding-bottom: 7px;padding-top: 14px;padding-left: 18px;">
                <e-svg icon="Group"></e-svg>
                <div style="font-size: 16px; font-weight: 600; padding: 0 24px" @click="getpieChartStats(exam.exam_report)">
                  {{ exam.name }}
                </div>
              </div>
            </el-col>
            <el-col v-if="loading" :span="10" style="padding: 0 20px">
              <div class="text-center" style="font-size: 16px;font-weight: 500;opacity: 0.8;padding: 10px 0;">
                Breakdown
              </div>
              <GChart type="PieChart" :data="pieChartData" :options="pieChartOptions" class="z-index--1" />
              <div style="display: flex; justify-content: space-around">
                <div style="display: flex">
                  <span style="width: 8px;height: 8px;background: #fe6780;display: inline-block;margin-top: 6px;margin-right: 7px;"></span>
                  <span style="color: #11141a; font-size: 12px; font-weight: 300">Excellent</span>
                </div>
                <div style="display: flex">
                  <span style="width: 8px;height: 8px;background: #fe59b3;display: inline-block;margin-top: 6px;margin-right: 7px;"></span>
                  <span style="color: #11141a; font-size: 12px; font-weight: 300">Good</span>
                </div>
              </div>
              <div style="display: flex;justify-content: space-around;margin-top: 5px;">
                <div style="display: flex">
                  <span style="width: 8px;height: 8px;background: #6358f4;display: inline-block;margin-top: 6px;margin-right: 7px;"></span>
                  <span style="color: #11141a; font-size: 12px; font-weight: 300">Average</span>
                </div>
                <div style="display: flex">
                  <span style="width: 8px;height: 8px;background: #f9ae58;display: inline-block;margin-top: 6px;margin-right: 7px;"></span>
                  <span style="color: #11141a; font-size: 12px; font-weight: 300">Poor</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel"
import resultStat from "@/components/learn/course/resultStat.vue"
import courseHeader from "@/components/learn/course/courseHeader.vue"
import { dispatchGraphql } from '@/api/dispatcher'
import moment from 'moment'

export default {
  components: { VueSlickCarousel, resultStat, courseHeader },
  data: () => ({
    activeName: "activeSubtopic",
    standard: {},
    subject: {},
    standardSubject: {},
    topics: [],
    hasStats: false,
    averageTime: 0,
    preferredTime: '',
    averageBreaks: 0,
    exams: [],
    loading: false,
    chartLoading: false,
    settings: {
      dots: true,
      focusOnSelect: false,
      infinite: !true,
      slidesToShow: 2,
      slidesToScroll: 1,
      touchThreshold: 5,
    },
    pieChartData: [],
    chartData: [],
    pieChartOptions: {
      // is3D:true,
      pieHole: 0.6,
      pieSliceText: "none",
      chartArea: { top: "0%", height: "70%", width: "80%" },
      legend: "none",

      slices: [
        { color: "#6358F4" },
        { color: "#FE6780" },
        { color: "#FE59B3" },
        { color: "#F9AE58", offset: 0.01, elevated: true, size: 90 },
      ],
    },

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
  }),
  created() {
    this.getStandardandSubject()
  },
  methods: {
    setChartStats () {
      this.chartLoading = false
      let reportData = 0
      for (const exam of this.exams) {
        if (exam.exam_report.length > 0) {
          for (const report of exam.exam_report) {
            reportData = reportData + report.marks
          }
          this.chartData.push([exam.name, (reportData / exam.exam_report.length), "#37c64c"])
        } else {
          this.chartData.push([exam.name, 0, "#37c64c"])
        }
      }
      this.chartLoading = true
    },
    getpieChartStats(reports) {
      this.loading = false
      this.pieChartData = [
        ["1", "Count", { role: "style" }],
        ["0", 0, "red"],
        ["1", 0, "#f00"],
        ["1", 0, "#f000"]
      ]
      if (reports.length > 0) {
        for (const report of reports) {
          if (report.marks > 90) {
            this.pieChartData[2][1] = this.pieChartData[2][1] + report.marks
          } else if (report.marks >= 75 && report.marks <= 90) {
            this.pieChartData[3][1] = this.pieChartData[3][1] + report.marks
          } else if (report.marks >= 55 && report.marks < 75) {
            this.pieChartData[1][1] = this.pieChartData[1][1] + report.marks
          }
        }
      }
      this.loading = true
    },
    getStats(classrooms) {
      let morning = 0
      let evening = 0
      var timeDiff = 0
      this.hasStats = false
      this.averageBreaks = 0
      for (const classroom of classrooms) {
        var startTime = moment(classroom.time_table.start_time, 'DD-MM-YYYY hh:mm:ss')
        var endTime = moment(classroom.time_table.end_time, 'DD-MM-YYYY hh:mm:ss')
        timeDiff = timeDiff + endTime.diff(startTime, 'hours')
        if (moment(classroom.time_table.start_time).format('HH') > 12) {
          evening ++
        } else {
          this.averageBreaks ++
          morning ++
        }
      }
      this.preferredTime = (morning > evening) ? 'Morning' : 'Evening'
      this.averageTime = timeDiff ? (timeDiff / classrooms.length).toFixed(0) : 0
      this.hasStats = true
    },
    getTopics(data, type) {
      let a = []
      var topics = []
      for (const item of data.subject_teachers) {
        if (a.length === 0) {
          a.push(item.teacher_id)
        } else {
          const teacher = a.filter(x => x === item.teacher_id)[0]
          if (teacher != item.teacher_id) {
            a.push(item.teacher_id)
          }
        }
      }
      if (a.length > 0) {
        for (const val of a) {
          const topicsItems = this.topics.filter(y => y.assigned_teacher_id === val)
          if (topicsItems.length > 0) {
            for (const topic of topicsItems) {
              topics.push(topic)
            }
          }
        }
      }
      if (type === 'data') {
        return topics
      } else {
        let alloted = 0
        let taken = 0
        let delayed = 0
        for (const topic of topics) {
          alloted = alloted + topic.classrooms.length
          for (const classroom of topic.classrooms) {
            if (moment(classroom.class_date).format('yyyy-MM-DD') < moment().format('yyyy-MM-DD')) {
              taken ++
            } else if ((moment(classroom.class_date).format('yyyy-MM-DD') === moment().format('yyyy-MM-DD')) && (moment(classroom.time_table.start_time).format('HH:mm') >= moment().format('HH:mm'))) {
              delayed ++
            }
          }
        }
        if (type === 'alloted') {
          return alloted
        } else if (type === 'taken') {
          return taken
        } else {
          return delayed
        }
      }
    },
    getVariables() {
      return {
        "standId": this.$route.params.standardId,
        "subId": this.$route.params.subjectId
      }
    },
    getStandardandSubject() {
      const standardQuery = `query($standId: uuid, $subId: uuid) {
        standard_subjects(where: {_and: [{standard_id: {_eq: $standId}}, {subject_id: {_eq: $subId}}]}) {
          id
          standard {
            id
            name
          }
          subject {
            id
            name
            subject_teachers {
              id
              teacher_id
            }
          }
        }
      }`
      const query = `query {
        topics {
          id
          name
          assigned_teacher_id
          classrooms {
            id
            name
            class_date
            time_table {
              id
              start_time
              end_time
            }
          }
        }
      }`
      const examQuery = `query($standId: uuid, $subId: uuid) {
        exams(where: {_and: [{standard_id: {_eq: $standId}}, {subject_id: {_eq: $subId}}]}) {
          id
          name
          exam_report {
            id
            marks
          }
        }
      }`
      dispatchGraphql(standardQuery, this.getVariables()).then(response => {
        this.standardSubject = response.standard_subjects[0]
        this.standard = this.standardSubject.standard
        this.subject = this.standardSubject.subject
        dispatchGraphql(query).then((response) => {
          this.topics = response.topics
          dispatchGraphql(examQuery, this.getVariables()).then(response => {
            this.exams = response.exams
            this.setChartStats()
          })
        })
      })
    }
  }
};
</script>

<style lang="scss">
.class-btn__coursle {
  border-radius: 16px;
  border: none;
  font-size: 12px;
  padding: 6px 16px;
  background: #fcdfbd;
  margin-left: 18px;
  margin-top: 35px;
  margin-bottom: 20px;
  color: #00000080;
  display: block;
  margin: auto;
}
.coursle-name {
  color: #222222;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  padding-bottom: 21px;
}

.slick-dots {
  bottom: -10px;
  li button:before,
  li.slick-active button:before {
    color: transparent;
    opacity: 1;
  }
  li button:before {
    background-color: transparent;
    border: 1px solid #bc6c42;
    border-radius: 50%;
    display: inline-block;
    height: 10px;
    width: 10px;
  }
  li.slick-active button:before {
    background-color: #bc6c42;
  }
}

.slick-dots li button::before {
  height: 10px !important;
  widows: 10px !important;
  background: #fff;
}
.cousole-wrap {
  padding: 10px 0;
}
.syllabus-courosle {
  display: flex;
  margin-bottom: 18px;
}
.pointer-icon {
  display: inline-block;
  margin-top: 8px;
  margin-right: 8px;
}
.syllabus-cousol__info {
  font-size: 14px;
  font-weight: 300;
  opacity: 0.6;
}

.subtopic {
  padding-bottom: 67px;
}
.card-padd .el-card__body {
  padding: 20px 0 !important;
}
.subtopic-hover:hover {
  background: rgba(252, 223, 189, 0.4);
  color: #bc6c42;
}
.results-stat #line-chart {
  margin-top: 0px !important;
}
.results-stat .pd-20 {
  padding: 0 !important;
}

@media only screen and (max-width:767px){
  .sm-margin-l-0{
    margin-left:0px !important;
  }
  .sm-margin-t-0{
    margin-top:0px !important;
  }
}
</style>
