<template>
  <div v-if="standardSubject" class="analytic" style="overflow-y: auto; height: 80vh">
    <course-header title="Analytics" :standard="standard.name" :subject="subject.name" />
    <div style="padding: 0 95px" class="sm-p-x-15 reduce-padding">
      <el-row>
        <el-col :span="10" class="sm-width-100">
          <div class="heading">Course stats</div>
          <el-card shadow="none" class="rounded-08 cp">
            <el-row>
              <el-col :span="8" style="border-right: 1px solid #e6eaed; height: 45vh" >
                <div style="opacity: 0.8; font-weight: 500">
                  Total Subtopics
                </div>
                <div style="font-weight: 500; font-size: 44px">{{ getTopics(standardSubject.subject, 'size') }}</div>
              </el-col>
              <el-col :span="13" style="padding: 0 20px">
                <div class="text-center" style="font-size: 16px;font-weight: 500;opacity: 0.8;padding: 10px 0;">
                  Breakdown
                </div>
                <GChart type="PieChart" :data="pieChartData" :options="pieChartOptions" class="z-index--1" />

                <div style="display: flex; justify-content: space-around">
                  <div style="display: flex">
                    <span style="width: 8px;height: 8px;background: #1d85ca;display: inline-block;margin-top: 6px;margin-right: 7px;"></span>
                    <span style="color: #11141a; font-size: 12px; font-weight: 300">Completed</span>
                  </div>
                  <div style="display: flex">
                    <span style="width: 8px;height: 8px;background: #39a125;display: inline-block;margin-top: 6px;margin-right: 7px;"></span>
                    <span style="color: #11141a; font-size: 12px; font-weight: 300">Active</span>
                  </div>
                </div>

                <div style="display: flex; margin-left: 36px; margin-top: 5px">
                  <div style="display: flex">
                    <span style="width: 8px;height: 8px;background: #e4b417;display: inline-block;margin-top: 6px;margin-right: 7px;"></span>
                    <span style="color: #11141a; font-size: 12px; font-weight: 300">Upcoming</span>
                  </div>
                  <!-- <div style="display: flex">
                  <span
                    style="
                      width: 8px;
                      height: 8px;
                      background: #6358f4;
                      display: inline-block;
                      margin-top: 6px;
                      margin-right: 7px;
                    "
                  ></span>
                  <span
                    style="color: #11141a; font-size: 12px; font-weight: 300"
                    >Poor</span
                  > -->
                  <!-- </div> -->
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="10" :offset="1" class="sm-width-100 sm-margin-l-0">
          <div class="heading">Course allocation</div>
          <el-card shadow="none" class="mlm rounded-08 card-padd cp">
            <el-row>
              <el-col :span="11" style="overflow: auto;border-right: 1px solid #e6eaed;" class="sm-width-50" >
                <div v-for="topic of getTopics(standardSubject.subject, 'data')" :key="topic" class="subtopic-hover" style="display: flex;padding-bottom: 7px;padding-top: 14px;padding-left: 18px;">
                  <e-svg icon="Group"></e-svg>
                  <div style="font-size: 16px; font-weight: 600; padding: 0 24px" @click="getTeacher(topic, 'allocation')">
                    {{ topic.name }}
                  </div>
                </div>
              </el-col>
              <el-col v-if="teacher.first_name" :span="11" style="padding: 0 20px">
                <el-avatar style="margin-left: 100px" :size="90" :src="require('@/assets/images/profile.jpg')" class="sm-margin-l-0" />
                <div style="width: 95px;text-align: center;font-size: 16px;font-weight: 500;margin-left: 100px;margin-top: 14px;" class="sm-margin-l-0" >
                  {{ teacher.first_name }}
                </div>
                <!-- <button class="class-btn__coursle">Positive track</button> -->
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>

      <div class="heading" style="padding-bottom: 70px">Subtopic progress</div>
      <el-tabs class="floatTabHeader sm-width-100" v-model="activeName" >
        <el-tab-pane label="Active" name="Active">
          <el-col class="i-icon sm-width-100 " style="position: relative;margin-bottom:10px;margin-bottom:10px" v-for="topic in selectedTopics" :key="topic" :span="11" >
            <el-card shadow="none" class="mlm rounded-08 card-padd cp">
              <el-col :span="2" :offset="1">
                <e-svg icon="Group"></e-svg>
              </el-col>
              <el-col :span="6" :offset="0.5" style="overflow: auto;border-right: 1px solid #e6eaed;font-weight: bold; margin-bottom: 17px">
                {{ topic.name }}
              </el-col>
              <el-col :span="13" :offset="1">
                <el-progress :text-inside="true" :stroke-width="18" :percentage="getPercentage(topic.sub_topics)" color="#FFA700"></el-progress>
              </el-col>
            </el-card>
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="Upcoming" name="Upcoming">
          <el-col class="i-icon sm-width-100 " style="position: relative;margin-bottom:10px;margin-bottom:10px" v-for="topic in selectedTopics" :key="topic" :span="11" >
            <el-card shadow="none" class="mlm rounded-08 card-padd cp">
              <el-col :span="2" :offset="1">
                <e-svg icon="Group"></e-svg>
              </el-col>
              <el-col :span="6" :offset="0.5" style="overflow: auto;border-right: 1px solid #e6eaed;font-weight: bold; margin-bottom: 17px">
                {{ topic.name }}
              </el-col>
              <el-col :span="13" :offset="1">
                <el-progress :text-inside="true" :stroke-width="18" :percentage="getPercentage(topic.sub_topics)"></el-progress>
              </el-col>
            </el-card>
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="Completed" name="Completed">
          <el-col class="i-icon sm-width-100 " style="position: relative;margin-bottom:10px;margin-bottom:10px" v-for="topic in selectedTopics" :key="topic" :span="11" >
            <el-card shadow="none" class="mlm rounded-08 card-padd cp">
              <el-col :span="2" :offset="1">
                <e-svg icon="Group"></e-svg>
              </el-col>
              <el-col :span="6" :offset="0.5" style="overflow: auto;border-right: 1px solid #e6eaed;font-weight: bold; margin-bottom: 17px">
                {{ topic.name }}
              </el-col>
              <el-col :span="13" :offset="1">
                <el-progress :text-inside="true" :stroke-width="18" :percentage="getPercentage(topic.sub_topics)" color="#39a125"></el-progress>
              </el-col>
            </el-card>
          </el-col>
        </el-tab-pane>
      </el-tabs>

      <div class="heading">Assessment stats</div>
      <el-card shadow="none" class="rounded-08 cp">
        <el-row>
          <el-col :span="12" class="sm-width-100" style="border-right: 1px solid #e6eaed; padding-left: 15px">
            <result-stat v-if="chartLoading" :chartData="chartData" :chartOptions="chartOptions" />
          </el-col>
          <el-col :span="6" style="padding-left: 25px">
            <div class="pr-x-40 mg-y-20 text-left" style="font-weight: bold">
              Best performers
            </div>
            <div class="mg-y-20" v-for="report in getStudents('best')" :key="report">
              <e-img-name :src="require('@/assets/images/profile.jpg')" nameStyle="font-weight:normal" :name="report.student.first_name" />
            </div>
          </el-col>
          <el-col :span="6" style="padding-left: 25px">
            <div class="pr-x-40 mg-y-20 text-left" style="font-weight: bold">
              Weak performers
            </div>
            <div class="mg-y-20" v-for="report in getStudents('weak')" :key="report">
              <e-img-name :src="require('@/assets/images/profile.jpg')" nameStyle="font-weight:normal" :name="report.student.first_name" />
            </div>
          </el-col>
        </el-row>
      </el-card>

      <div class="heading">Lesson planner</div>
      <el-card shadow="none" class="rounded-08 cp">
        <el-row>
          <el-col :span="18" class="sm-width-100" style="border-right: 1px solid #e6eaed; padding-right: 15px">
            <lesson-graph v-if="barGraph" :activeData="activeData" :inActiveData="inActiveData" />
          </el-col>
          <el-col :span="6" class="sm-width-100" style="height: 250px;overflow: auto;border-right: 1px solid #e6eaed;">
            <div v-for="topic of getTopics(standardSubject.subject, 'data')" :key="topic" class="subtopic-hover" style="display: flex;padding-bottom: 7px;padding-top: 14px;padding-left: 18px;">
              <e-svg icon="Group"></e-svg>
              <div style="font-size: 16px; font-weight: 600; padding: 0 24px" @click="getTeacher(topic, 'lesson')">
                {{ topic.name }}
              </div>
            </div>
          </el-col>
          <el-col v-if="teacher.first_name && topic.name" :span="6">
            <div style="display: flex; flex-wrap: wrap">
              <div style="width: 49%;padding: 10px 0;border-right: 1px solid #e6eaed;">
                <div style="opacity: 0.6; font-weight: 500; text-align: center">
                  Task
                </div>
                <img v-if="topic.session_tasks.length > 0" style="display: block; margin: auto" src="@/assets/images/complete-icon.png" alt="" />
                <img v-else style="display: block; margin: auto" src="@/assets/images/fail-icon.png" alt="" />
              </div>
              <div style="width: 49%; padding: 10px 0">
                <div style="opacity: 0.6; font-weight: 500; text-align: center">
                  Homework
                </div>
                <img v-if="topic.homework.length > 0" style="display: block; margin: auto" src="@/assets/images/complete-icon.png" alt="" />
                <img v-else style="display: block; margin: auto" src="@/assets/images/fail-icon.png" alt="" />
              </div>
              <div style="width: 49%;padding: 10px 0;border-top: 1px solid #e6eaed;border-right: 1px solid #e6eaed;border-bottom: 1px solid #e6eaed;">
                <div style="opacity: 0.6; font-weight: 500; text-align: center">
                  Activity
                </div>
                <img v-if="topic.session_activities.length > 0" style="display: block; margin: auto" src="@/assets/images/complete-icon.png" alt="" />
                <img v-else style="display: block; margin: auto" src="@/assets/images/fail-icon.png" alt="" />
              </div>
              <div style="width: 49%;padding: 10px 0;border-top: 1px solid #e6eaed;border-bottom: 1px solid #e6eaed;">
                <div style="opacity: 0.6; font-weight: 500; text-align: center">
                  Attendance
                </div>
                <img v-if="verifyAttendance(topic)" style="display: block; margin: auto" src="@/assets/images/complete-icon.png" alt="" />
                <img v-else style="display: block; margin: auto" src="@/assets/images/fail-icon.png" alt="" />
              </div>
            </div>
            <div style="opacity: 0.8; font-weight: 500; padding: 11px 0 0 30px">
              Teacher’s profile
            </div>
            <el-row style="margin-top: 10px; margin-left: 40px">
              <el-col :span="10">
                <el-avatar :size="80" :src="require('@/assets/images/profile.jpg')"
              /></el-col>
              <el-col :span="10">
                <div style="width: 95px;text-align: center;font-size: 16px;font-weight: 500;margin-top: 28px;">
                  {{ teacher.first_name }}
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
      <el-tabs style="margin-top: 100px" class="floatTabHeader" v-model="activeTest" >
        <el-tab-pane label="Test stats" name="test">
          <el-col :span="10" class="sm-width-100">
            <el-card shadow="none" class="rounded-08 cp">
              <el-row>
                <el-col :span="7" style="border-right: 1px solid #e6eaed; height: 45vh">
                  <div style="opacity: 0.8; font-weight: 500">Total tests</div>
                  <div style="font-weight: 500; font-size: 44px">{{ exams.length }}</div>
                </el-col>
                <el-col :span="13" style="padding: 0 20px">
                  <div class="text-center" style="font-size: 16px;font-weight: 500;opacity: 0.8;padding: 10px 0;">
                    Breakdown
                  </div>
                  <GChart type="PieChart" :data="pieChartData2" :options="pieChartOptions2" class="z-index--1" />
                  <div style="display: flex; justify-content: space-around">
                    <div style="display: flex">
                      <span style="width: 8px;height: 8px;background: #BC6C42;display: inline-block;margin-top: 6px;margin-right: 7px;"></span>
                      <span style="color: #11141a; font-size: 12px; font-weight: 300">Best performers</span>
                    </div>
                    <div style="display: flex">
                      <span style="width: 8px;height: 8px;background: #4e4d4c;display: inline-block;margin-top: 6px;margin-right: 7px;"></span>
                      <span style="color: #11141a; font-size: 12px; font-weight: 300">Weak performers</span>
                    </div>
                  </div>
                  <div style="display: flex; margin-left: 12px; margin-top: 5px">
                    <div style="display: flex">
                      <span style="width: 8px;height: 8px;background: #C4C4C4;display: inline-block;margin-top: 6px;margin-right: 7px;"></span>
                      <span style="color: #11141a; font-size: 12px; font-weight: 300">Average performers</span>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="Assignment stats" name="assignment"> </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import resultStat from "@/components/learn/course/resultStat.vue"
import lessonGraph from "@/components/learn/lessonGraph.vue"
import courseHeader from "@/components/learn/course/courseHeader.vue"
import { dispatchGraphql, dispatchGraphqlQuery } from '@/api/dispatcher'
import moment from 'moment'
import _ from 'lodash'

export default {
  components: { courseHeader, resultStat, lessonGraph },
  data: () => ({
    attendanceType: '',
    attendances: [],
    activeData: [],
    inActiveData: [],
    barGraph: false,
    topic: {},
    standard: {},
    subject: {},
    standardSubject: {},
    topics: [],
    teacher: {},
    exams: [],
    chartLoading: false,
    subTopics: [],
    selectedTopics: [],
    activeName: "Active",
    activeTest: "test",
    pieChartData: [],
    pieChartOptions: {
      // is3D:true,
      pieHole: 0.6,
      pieSliceText: "none",
      chartArea: { top: "0%", height: "70%", width: "80%" },
      legend: "none",

      slices: [
        { color: "#FFA700" },
        { color: "#0BC32E" },
        { color: "#126DEA", offset: 0.01, elevated: true, size: 90 },
      ],
    },
    chartData: [],
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
    pieChartData2: [],
    pieChartOptions2: {
      // is3D:true,
      pieHole: 0.6,
      pieSliceText: "none",
      chartArea: { top: "0%", height: "70%", width: "90%" },
      legend: "none",

      slices: [
        { color: "#BC6C42" },
        { color: "#4e4d4c" },

        { color: "#C4C4C4" },
        { color: "#C4C4C4", offset: 0.01, elevated: true, size: 90 },
      ],
    },
    
  }),
  watch: {
    activeName: _.debounce(function() {
      if (this.activeName === 'Upcoming') {
        this.selectedTopics = []
        this.setTopics()
      } else if (this.activeName === 'Completed') {
        this.selectedTopics = []
        this.setTopics()
      } else {
        this.selectedTopics = []
        this.setTopics()
      }
    })
  },
  created() {
    this.getStandardandSubject()
  },
  methods: {
    setBarGraph() {
      var totalCount = 0
      var presentCount = 0
      for (const topic of this.subTopics) {
        if (topic.classrooms.length > 0) {
          for (const classroom of topic.classrooms) {
            const totalAttendance = this.attendances.filter(x => moment(x.created_at).format('yyyy-MM-DD') === moment(classroom.class_date).format('yyyy-MM-DD'))
            if (totalAttendance.length > 0) {
              totalCount = totalCount + totalAttendance.length
              const filteredAttendance = totalAttendance.filter(y => y.status === 'P')
              if (filteredAttendance.length > 0) {
                presentCount = presentCount + filteredAttendance.length
              }
            }
          }
        }
      }
      this.activeData = [13, 23, presentCount, 12],
      this.inActiveData = [44, 10, (totalCount - presentCount), 50]
      this.barGraph = true
    },
    verifyAttendance(topic) {
      let totalCount = 0
      if (topic.classrooms.length > 0) {
        for (const classroom of topic.classrooms) {
          const totalAttendance = this.attendances.filter(x => moment(x.created_at).format('yyyy-MM-DD') === moment(classroom.class_date).format('yyyy-MM-DD'))
          const filteredAttendance = totalAttendance.filter(y => y.status === 'P')
          if (filteredAttendance.length > 0 && totalAttendance.length > 0) {
            if (totalAttendance.length === filteredAttendance.length) {
              totalCount ++
            }
          }
        }
      }
      if (totalCount != 0 && totalCount === topic.classrooms.length) {
        return true
      }
      return false
    },
    getExamChart() {
      let bestCount = 0
      let weakCount = 0
      let averageCount = 0
      for (const exam of this.exams) {
        if (exam.exam_report.length > 0) {
          for (const report of exam.exam_report) {
            if (report.marks >= 90) {
              bestCount = bestCount + report.marks
            } else if (report.marks > 55 && report.marks < 90) {
              averageCount = averageCount + report.marks
            } else if (report.marks >= 40 && report.marks <= 55) {
              weakCount = weakCount + report.marks
            }
          }
        }
      }
      this.pieChartData2 = [
        ["1", "Count", { role: "style" }],
        ["0", bestCount, "red"],
        ["1", weakCount, "#f00"],
        ["1", averageCount, "#f000"],
      ]
      this.setBarGraph()
    },
    getStudents (value) {
      var bestPerformers = []
      var weakPerformers = []
      for (const exam of this.exams) {
        if (exam.exam_report.length > 0) {
          for (const report of exam.exam_report) {
            if (report.marks >= 90) {
              bestPerformers.push(report)
            } else if (report.marks >= 40 && report.marks <= 55) {
              weakPerformers.push(report)
            }
          }
        }
      }
      if (value === 'best') {
        return bestPerformers
      } else if (value === 'weak') {
        return weakPerformers
      }
    },
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
      this.getExamChart()
    },
    getPercentage(data) {
      const count = (100 / data.length)
      let percentage = 0
      for (const item of data) {
        if (item.status && item.status === 'completed') {
          percentage = percentage + count
        }
      }
      return percentage.toFixed(0)
    },
    setTopics() {
      var completedTopics = []
      var activeTopics = []
      var upcomingTopics = []
      for (const topic of this.subTopics) {
        let completedCount = 0
        let upcomingCount = 0
        for (const x of topic.sub_topics) { 
          if (x.status === 'completed') {
            completedCount ++
          } else if (x.status === '' || x.status === null) {
            upcomingCount ++
          }
        }
        if (topic.sub_topics.length === completedCount) {
          completedTopics.push(topic)
        } else if (topic.sub_topics.length === upcomingCount) {
          upcomingTopics.push(topic)
        } else {
          activeTopics.push(topic)
        }
      }
      if (this.activeName === 'Active') {
        this.selectedTopics = activeTopics
      } else if (this.activeName === 'Upcoming') {
        this.selectedTopics = upcomingTopics
      } else if (this.activeName === 'Completed') {
        this.selectedTopics = completedTopics
      }
      // this.selectedTopics = this.subTopics
    },
    getTeacher(topic, type) {
      if (type === 'lesson') {
        this.topic = topic
      }
      this.teacher = topic.teacher
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
      } else if (type === 'progress') {
        this.subTopics = topics
        this.setTopics()
      } else if (type === 'size') {
        return topics.length
      } else if (type === 'chart') {
        let completed = 0
        let active = 0
        let upcoming = 0
        for (const topic of topics) {
          for (const classroom of topic.classrooms) {
            if (moment(classroom.class_date).format('yyyy-MM-DD') < moment().format('yyyy-MM-DD')) {
              completed ++
            } else if (moment(classroom.class_date).format('yyyy-MM-DD') === moment().format('yyyy-MM-DD')) {
              active ++
            } else if (moment(classroom.class_date).format('yyyy-MM-DD') > moment().format('yyyy-MM-DD')) {
              upcoming ++
            }
          }
        }
        this.pieChartData = [
          ["1", "Count", { role: "style" }],
          ["0", upcoming, "red"],
          ["1", active, "#f00"],
          ["1", completed, "#f000"],
        ]
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
          session_tasks
          session_activities
          homework
          sub_topics {
            id
            name
            status
          }
          teacher {
            id
            first_name
          }
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
            student {
              id
              first_name
            }
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
            dispatchGraphqlQuery('campus_settings', ['id', 'attendance_type']).then((response) => {
              this.attendanceType = response.campus_settings[0].attendance_type
              dispatchGraphqlQuery('attendances', ['id', 'status', 'created_at']).then((response) => {
                this.attendances = response.attendances
                this.getTopics(this.standardSubject.subject, 'chart')
                this.getTopics(this.standardSubject.subject, 'progress')
                this.setChartStats()
              })
            })
          })
        })
      })
    }
  }
};
</script>
<style>
/* .analytic .floatTabHeader.el-tabs.el-tabs--top > .el-tabs__header {
  margin: 0px !important;
} */
.analytic .el-tabs__header {
  border-bottom: 1px solid #fcdfbd !important;
}
.analytic .floatTabHeader.el-tabs.el-tabs--top > .el-tabs__header {
  width: 57vw;
}

@media only screen and(max-width : 768px){
  .analytic .floatTabHeader > .el-tabs__header {
  width: 100%;
}
}
.analytic .floatTabHeader.el-tabs.el-tabs--top > .el-tabs__header {
  position: inherit !important;
}
.analytic .line-chart-container {
  margin-top: -35px;
}
.subtopic-hover:hover {
  background: rgba(252, 223, 189, 0.4);
  color: #bc6c42;
}
.analytic .el-card__body {
  padding-right: 0;
}
.mlm .el-card__body {
  padding-left: 0;
}
.class-btn__coursle {
  border-radius: 16px;
  border: none;
  font-size: 12px;
  padding: 6px 16px;
  background: #fcdfbd;
  margin-left: 18px;
  margin-top: 5px;
  margin-bottom: 20px;
  display: block;
  margin: auto;
  margin-top: 20px;
  color: #00000080;
}
</style>
