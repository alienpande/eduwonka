<template>
  <es-container v-if="user" pageTitle="Dashboard" class="bg-black-5">
    <el-card class="mg-r-30 rounded-08 bg-black-2" :style="'border: none'" shadow="none">
      <el-row>
        <el-col :span="20">
          <span class="tx-20 tx-bolder text-white">Grade Performance</span>
        </el-col>
      </el-row>
      <br />
      <el-row :gutter="3">
        <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
          <el-row :gutter="10" justify="center" type="flex">
            <el-col :span="12" class="mg-l-20">
              <div class="bg-black-3 rounded pd-20">
                <div class="d-flex justify-content-between border">
                  <div class="mg-t-12 tx-bold text-white">Subject Grade Progress</div>
                </div>
                <br /><br />
                <subject-chart v-if="subjects.length > 0" :subjects="subjects" :reports="setChartReport()" :chartData="chartData" :chartOptions="chartOptions" />
              </div>
            </el-col>
            <el-col :span="12" class="mg-l-20">
              <div class="bg-black-3 rounded pd-20">
                <div class="d-flex justify-content-between border">
                  <div class="mg-t-12 tx-bold text-white">Team Wise Grade Progress</div>
                </div>
                <br /><br />
                <class-grade-chart v-if="examTypes.length > 0" :terms="examTypes" :termReport="setChartReport()" :chartData="chartData" :chartOptions="chartOptions" />
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-row>
    </el-card>
    <br />
    <el-row class="mg-r-40">
      <el-col :span="12">
        <el-card class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
          <el-row>
            <el-col :span="20">
              <span class="tx-18 tx-bolder text-white">Exam Stats</span>
            </el-col>
          </el-row>
          <br />
          <el-row :gutter="3">
            <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
              <el-row class="mg-y-3">
                <el-col :span="6" :offset="1" class="tx-14 text-center">
                  <el-card class="bg-black-3" :style="'border: none'" shadow="none">
                    <span class="text-white" style="opacity: 60%">Ongoing</span>
                    <div class="mg-y-10 tx-24 text-white">{{ getOngoingExams() }}</div>
                  </el-card>
                </el-col>
                <el-col :span="6" :offset="2" class="tx-14 text-center">
                  <el-card class="bg-black-3" :style="'border: none'" shadow="none">
                    <span class="text-white" style="opacity: 60%">Upcoming</span>
                    <div class="mg-y-10 tx-24 text-white">{{ getUpcomingExams('count') }}</div>
                  </el-card>
                </el-col>
                <el-col :span="6" :offset="2" class="tx-14 text-center">
                  <el-card class="bg-black-3" :style="'border: none'" shadow="none">
                    <span class="text-white" style="opacity: 60%">Completed</span>
                    <div class="mg-y-10 tx-24 text-white">{{ getCompletdExams() }}</div>
                  </el-card>
                </el-col>
              </el-row>
              <br />
              <el-row style="border-bottom: 1px solid #6d6c6c"></el-row>
              <el-row class="mg-t-10">
                <el-card class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
                  <el-row>
                    <el-col :span="20">
                      <span class="tx-18 tx-bolder text-white">Upcoming Exams</span>
                    </el-col>
                  </el-row>
                  <br />
                  <el-row :gutter="3">
                    <el-card class="rounded-08 bg-black-3" style="border: none;height: 15rem;overflow: auto;" shadow="none">
                      <el-row v-for="(exam, i) in getUpcomingExams('exams')" :key="i">
                        <el-row class="mg-t-10">
                          <span class="mg-l-10 tx-18 text-white">{{ exam.subject.name }}</span>
                        </el-row><br />
                        <el-card class="rounded-08 bg-black-4" :style="'border: none'" shadow="none">
                          <el-col :span="11" :offset="1" class="mg-b-10">
                            <span class="text-white" style="opacity: 60%">Exam</span>
                            <div class="mg-y-5 tx-16 text-white">{{ exam.name }}</div>
                          </el-col>
                          <el-col :span="11" :offset="1">
                            <span class="text-white" style="opacity: 60%">Date</span>
                            <div class="mg-y-5 tx-16 text-white">{{ getDate(exam.start_date) }}</div>
                          </el-col>
                        </el-card>
                      </el-row><br />
                    </el-card>
                  </el-row>
                </el-card>
              </el-row>
            </el-card>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-card class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
          <el-row>
            <el-col :span="20">
              <span class="tx-18 tx-bolder text-white">Event Stats</span>
            </el-col>
          </el-row>
          <br />
          <el-row :gutter="3">
            <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
              <el-row class="mg-y-3">
                <el-col :span="6" :offset="1" class="tx-14 text-center">
                  <el-card class="bg-black-3" :style="'border: none'" shadow="none">
                    <span class="text-yellow">Academic</span>
                    <div class="mg-y-10 tx-24 text-white">{{ getAcademicEvents() }}</div>
                  </el-card>
                </el-col>
                <el-col :span="6" :offset="2" class="tx-14 text-center">
                  <el-card class="bg-black-3" :style="'border: none'" shadow="none">
                    <span class="text-blue">Exam</span>
                    <div class="mg-y-10 tx-24 text-white">{{ getExamEvents() }}</div>
                  </el-card>
                </el-col>
                <el-col :span="6" :offset="2" class="tx-14 text-center">
                  <el-card class="bg-black-3" :style="'border: none'" shadow="none">
                    <span class="text-green">Non-Acdemic</span>
                    <div class="mg-y-10 tx-24 text-white">{{ '0' }}</div>
                  </el-card>
                </el-col>
              </el-row>
              <br />
              <el-row style="border-bottom: 1px solid #6d6c6c"></el-row>
              <el-row class="mg-t-10">
                <el-card class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
                  <el-row>
                    <el-col :span="20">
                      <span class="tx-18 tx-bolder text-white">Upcoming Events</span>
                    </el-col>
                  </el-row>
                  <br />
                  <el-row :gutter="3">
                    <el-card class="rounded-08 bg-black-3" style="border: none;height: 15rem;overflow: auto;" shadow="none">
                      <el-row v-for="(event, i) in getUpcomingEvents()" :key="i">
                        <el-card class="rounded-08 bg-black-4" :style="'border: none'" shadow="none">
                          <el-col :span="7" :offset="1" class="mg-b-10">
                            <span class="text-white" style="opacity: 60%">{{ event.title ? 'Event' : 'Exam' }}</span>
                            <div class="mg-y-5 tx-16 text-white">{{ event.title ? event.title : event.name }}</div>
                          </el-col>
                          <el-col :span="7" :offset="1">
                            <span class="text-white" style="opacity: 60%">Date</span>
                            <div class="mg-y-5 tx-16 text-white">{{ event.title ? getDate(event.start_time) : getDate(event.start_date) }}</div>
                          </el-col>
                          <el-col :span="7" :offset="1">
                            <span class="text-white" style="opacity: 60%">Description</span>
                            <div class="mg-y-5 tx-16 text-white">{{ event.title ? event.description : '' }}</div>
                          </el-col>
                        </el-card><br />
                      </el-row>
                    </el-card>
                  </el-row>
                </el-card>
              </el-row>
            </el-card>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <br />
    <el-row class="mg-r-40">
      <el-col :span="12">
        <el-card class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
          <el-row>
            <el-col :span="20">
              <span class="tx-20 tx-bolder text-white">Attendance Graph</span>
            </el-col>
          </el-row>
          <br />
          <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
            <el-row :gutter="10" justify="center" type="flex">
              <div class="bg-black-3 rounded pd-20">
                <attendance-chart :attendance="setAttendnace()" :chartData="chartData" :chartOptions="chartOptions" />
              </div>
            </el-row>
          </el-card>
        </el-card>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-card class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
          <el-row>
            <el-col :span="20">
              <span class="tx-20 tx-bolder text-white">Focus Areas</span>
            </el-col>
          </el-row>
          <br />
          <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
            <el-row>
              <div style="border: 1px solid #1E1E1E;padding: 5px;height: 18rem;overflow: auto;" class="rounded-08 mt10">
                <div class="bg-black-3 p10" style="margin-bottom: 15px" v-for="i in 6" :key="i">
                  <div style="color: #cfcfcf">
                    <span class="tx-14">Lorem Ipsum is simply dummy text of the printing and typecasting industry</span>
                  </div>
                </div>
              </div>
            </el-row>
          </el-card>
        </el-card>
      </el-col>
    </el-row>
  </es-container>
</template>

<script>
import subjectChart from '@/components/student/school/GradeAnalysis/subjectChart.vue'
import ClassGradeChart from '@/components/student/school/GradeAnalysis/ClassGradeChart.vue'
import attendanceChart from '@/components/student/school/GradeAnalysis/attendanceChart.vue'
import { dispatchGraphql } from "@/api/dispatcher"
import { getId } from '@/util/auth'
import moment from 'moment'
export default {
  components: { subjectChart, attendanceChart, ClassGradeChart },
  data() {
    return {
      user: {},
      subjects: [],
      examTypes: [],
      pieChartData: [
        ["1", "Count", { role: "style" }],
        ["0", 80, "#f00"],
        ["1", 30, "#f00"],
        ["1", 120, "#f000"],
      ],
      chartData: [
        ["1", "Count", { role: "style" }],
        ["0", 80, "#FE9D2B"],
        ["1", 30, "#FE9D2B"],
        ["2", 40, "#FE9D2B"],
        ["3", 70, "#FE9D2B"],
        ["4", 80, "#FE9D2B"],
        ["5", 30, "#FE9D2B"],
        ["6", 10, "#FE9D2B"],
        ["7", 50, "#FE9D2B"],
        ["8", 40, "#FE9D2B"],
      ],

      chartOptions: {
        dataOpacity: 0.3,

        vAxis: {
          gridlines: { count: 0 },
          textPosition: "none",
        },
        pointSize: 6,
        chartArea: { top: "3%", height: "80%", width: "90%" },
        hAxis: {
          minValue: 1,
          maxValue: 9,
          gridlines: { count: 20, color: "white" },
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
    this.getUser()
    this.getSubjects()
    this.getExamTypes()
  },
  methods: {
    setChartReport() {
      var reports = []
      for (const exam of this.user.section.standard.exams) {
        if (exam.exam_report.length > 0) {
          reports.push(exam)
        }
      }
      return reports
    },
    setAttendnace() {
      var months = []
      var attendanceArray = []
      for (let i = 0; i < 12 ; i++) {
        const month = moment().month(i).format('MM')
        const year = new Date().getFullYear()
        const lastDate = new Date(year, i + 1, 0).getDate()
        months.push({first: moment(year + '-' + month + '-' + '01').format(''),last: moment(year + '-' + month + '-' + lastDate).format('')})
      }
      for (const month of months) {
        const attendance = this.user.student_attendance.filter(x => (moment(x.taken_at).format('YYYY/MM/DD') >= moment(month.first).format('YYYY/MM/DD') && moment(x.taken_at).format('YYYY/MM/DD') <= moment(month.last).format('YYYY/MM/DD')))
        const index = months.indexOf(month)
        attendanceArray[index] = ((attendance.length * 100) / moment(month.last).format('DD')).toFixed(0)
      }
      if (attendanceArray.length > 0) {
        return attendanceArray
      } else {
        return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    },
    getUpcomingEvents() {
      var events = []
      for (const exam of this.user.section.standard.exams) {
        if (moment(exam.start_date).format("YYYY-MM-DD") > moment(new Date()).format("YYYY-MM-DD")) {
          events.push(exam)
        }
      }
      for (const audience of this.user.audience) {
        if (moment(audience.event.start_time).format("YYYY-MM-DD") > moment(new Date()).format("YYYY-MM-DD")) {
          events.push(audience.event)
        }
      }
      if (events.length > 0) {
        return events
      }
    },
    getExamEvents() {
      let count = 0
      if (this.user.section.standard.exams.length > 0) {
        count += this.user.section.standard.exams.length
      }
      return count
    },
    getAcademicEvents() {
      let count = 0
      if (this.user.audience.length > 0) {
        count += this.user.audience.length
      }
      return count
    },
    getDate(date) {
      return moment(date).format("DD MMM, YYYY")
    },
    getCompletdExams() {
      let count = 0
      for (const exam of this.user.section.standard.exams) {
        if (moment(exam.start_date).format("YYYY-MM-DD") < moment(new Date()).format("YYYY-MM-DD")) {
          count ++
        }
      }
      return count
    },
    getUpcomingExams(type) {
      let count = 0
      var exams = []
      for (const exam of this.user.section.standard.exams) {
        if (moment(exam.start_date).format("YYYY-MM-DD") > moment(new Date()).format("YYYY-MM-DD")) {
          exams.push(exam)
          count ++
        }
      }
      if (type === 'count') {
        return count
      } else if (type === 'exams' && exams.length > 0) {
        return exams
      }
    },
    getOngoingExams() {
      let count = 0
      for (const exam of this.user.section.standard.exams) {
        if (moment(exam.start_date).format('yyyy-MM-DD') === moment(new Date()).format('yyyy-MM-DD')) {
          count ++
        }
      }
      return count
    },
    getExamTypes() {
      const query = `query {
        exam_types {
          id
          name
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.examTypes = response.exam_types
      })
    },
    getSubjects() {
      const query = `query {
        subjects {
          id
          name
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.subjects = response.subjects
      })
    },
    getUser() {
      const query = `query($id: uuid!) {
        users_by_pk(id: $id) {
          id
          first_name
          last_name
          student_attendance {
            id
            taken_at
            status
          }
          section {
            id
            name
            standard {
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
                }
                subject {
                  id
                  name
                }
              }
            }
          }
          audience(where: {audienceable_type: {_eq: "Event"}}) {
            id
            audienceable_type
            event {
              id
              title
              start_time
              description
            }
          }
        }
      }`
      dispatchGraphql(query, { id: getId() }).then((response) => {
        console.log(this.user)
        this.user = response.users_by_pk
      })
    }
  }
};
</script>

<style lang="scss">
</style>