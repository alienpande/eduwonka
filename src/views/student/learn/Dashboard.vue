<template>
  <div v-if="user">
    <div style="font-size: 24px;font-weight: 600;padding: 18px;color: #f3f3f3;background: #1e1e1e;">
      Hi {{ user.first_name }}, welcome to Learn Module
    </div>

    <div style="padding: 20px 30px; overflow-y: auto; height: 75vh">
      <el-row>
        <el-col v-for="(classroom, i) in classes" :key="i" :span="11" class="mg-l-35">
          <el-card style="border: none" class="bg-black-2 rounded-08">
            <div class="fs-18 white-1 f-600">Active Class for {{ classroom.time_table.subject.name }}</div>
            <div style="border: 1px solid #404040; padding: 20px" class="rounded-08 mt10">
              <div class="d-flex" style="justify-content: space-between">
                <div>
                  <div class="fs-16 f-600 white-1">{{ classroom.name }}</div>
                  <div class="fs-12 gray-7">{{ getTime(classroom.time_table.start_time) }} - {{ getTime(classroom.time_table.end_time) }}</div>
                </div>
                <div>
                  <div class="fs-12 gray-7 text-center">{{ setTimeData(classroom.time_table.start_time, classroom.time_table.end_time, 'Timer') }}</div>
                  <div class="d-flex" style="justify-content: center">
                    <div class="class-time">{{ setTimeData(classroom.time_table.start_time, classroom.time_table.end_time, 'Hours') }}</div>
                    <div class="time-dot">:</div>
                    <div class="class-time">{{ setTimeData(classroom.time_table.start_time, classroom.time_table.end_time, 'Minutes') }}</div>
                    <div class="time-dot">:</div>
                    <div class="class-time">{{ setTimeData(classroom.time_table.start_time, classroom.time_table.end_time, 'Seconds') }}</div>
                  </div>
                </div>
              </div>
              <div class="bg-black-3 rounded-08 p20 mt10">
                <div class="f-600 white-1">
                  Topic: {{ classroom.topic.name }}
                </div>
              </div>
            </div>
            <div class="d-flex mt10 justify-bet" style="padding: 10px 20px">
              <es-button text="Class Prerequisites" width="260" />
              <es-button text="Join Class" :plain="true" width="260" @click="conferenceCall(classroom)" />
            </div>
          </el-card>
        </el-col>
      </el-row><br />
      <el-row>
        <el-col :span="23">
          <el-card style="border: none" class="bg-black-2 rounded-08">
            <div class="justify-bet">
              <div class="fs-18 white-1 f-600">Performance Assessment</div>
              <es-select v-model="subject" placeholder="Subject" :span="3" class="border-color select-text-white select-icon" :options="subjects" :optionName="'label'" :valueKey="'value'" @visible-change="setChartData" />
            </div>
            <br />
            <div style="border: 1px solid #404040; padding: 20px" class="rounded-08 mt10">
              <el-row>
                <el-col :span="13">
                  <div class="fs-16 f-600 white-1">
                    &emsp;
                  </div><br />
                  <div class="bg-black-3 rounded-08 p20">
                    <div id="chart" class="student-dash">
                      <apexchart type="bar" height="265" :options="chartOptions" :series="series" />
                    </div>
                    <div class="d-flex" style="width: 100%;background: rgb(53, 53, 53);border-radius: 8px;padding: 10px 0px;justify-content: space-around;padding-right: 13px;">
                      <e-svg style="transform: rotate(180deg);margin-top: -6px;height: 35px;margin-left: 23px;margin-right: 12px;" icon="arrow" />
                      <div :class="{ 'selected-arrow': i == 1 }" v-for="i in 6" :key="i" style="width: 29px;border-radius: 4px;color: #ffffff;margin: 0 9px;font-size: 16px;padding: 7px 0;text-align: center;">
                        {{ i }}
                      </div>
                      <e-svg style="background: #1492e6;height: 18px;padding: 7px 9px;margin-top: 4px;border-radius: 4px;" icon="arrowRight" />
                    </div>
                  </div>
                </el-col>
                <el-col :span="10" :offset="1">
                  <div class="fs-16 f-600 white-1">Recommendations</div><br />
                  <div class="bg-black-3 rounded-08 p20" style="padding: 5px;height: 23rem;overflow: auto;">
                    <VueSlickCarousel class="dashboard-catousel" v-bind="settingsRecom" :arrows="false" :dots="true">
                      <ul v-for="j in 5" :key="j" class="white-1">
                        <li class="fs-16 padding-right-44" v-for="i in 7" :key="i">
                          Lorem Ipsum is simply dummy text of the printing and
                          type setting industry. Lorem Ipsum is simply dummy text of the printing
                        </li>
                      </ul>
                    </VueSlickCarousel>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row><br />
      <el-row>
        <el-col :span="23">
          <el-card style="border: none" class="bg-black-2 rounded-08">
            <div class="justify-bet">
              <div class="fs-18 white-1 f-600">
                Upcoming assessment of the week
              </div>
              <!-- <es-select placeholder="Showing All Upcoming assessment of the week" :span="3" class="select-icon" /> -->
            </div>
            <br />
            <div style="border: 1px solid #404040; padding: 20px" class="rounded-08 mt10">
              <VueSlickCarousel class="dashboard-catousel" v-bind="settingsRecom2" :arrows="false" :dots="true">
                <div v-for="(assessment, i) in getUpcomingAssessments()" :key="i">
                  <div class="bg-black-3 m10 p20 rounded-08">
                    <div class="d-flex mb10">
                      <e-svg icon="ruler"></e-svg>
                      <div class="f-600 text-white ml10">{{ assessment.form.subject.name }}</div>
                    </div>
                    <div class="hr"></div>
                    <br />
                    <div class="f-600 fs-16 white-1">
                      {{ assessment.form.name }}
                    </div>
                    <div class="rounded-08 mt10 p10 bg-black-4">
                      <el-row>
                        <el-col :span="8" :offset="1">
                          <div class="fs-12 gray-7">Date</div>
                          <div class="f-600 white-1">{{ getDate(assessment.form.due_date) }}</div>
                        </el-col>
                        <el-col :span="8" :offset="4">
                          <div class="fs-12 gray-7">Type</div>
                          <div class="f-600 white-1">{{ assessment.form.form_type }}</div>
                        </el-col>
                      </el-row>
                    </div>
                    <br />
                    <es-button text="Test Details" @click="$router.push($url.LN_ASSESMENT_RESULT + '/' + assessment.form.id)" />
                  </div>
                </div>
              </VueSlickCarousel>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <br />
      <el-row>
        <el-col :span="23">
          <el-card style="border: none" class="bg-black-2 rounded-08">
            <div class="justify-bet">
              <div class="fs-18 white-1 f-600">
                Assignments reaching due date
              </div>
            </div>
            <br />
            <div style="border: 1px solid #404040; padding: 20px" class="rounded-08 mt10">
              <VueSlickCarousel class="dashboard-catousel" v-bind="settingsRecom2" :arrows="false" :dots="true" >
                <div v-for="(assignment, i) in setAssignments()" :key="i">
                  <div class="bg-black-3 m10 p20 rounded-08">
                    <div class="d-flex mb10">
                      <e-svg icon="ruler"></e-svg>
                      <div class="f-600 text-white ml10">{{ assignment.subject.name }}</div>
                    </div>
                    <div class="hr"></div>
                    <br />
                    <div class="f-600 fs-16 white-1">
                      {{ assignment.name }}
                    </div>
                    <div class="rounded-08 mt10 p10 bg-black-4">
                      <el-row>
                        <el-col :span="8" :offset="1">
                          <div class="fs-12 gray-7">Received on</div>
                          <div class="f-600 white-1">{{ getDate(assignment.created_at) }}</div>
                        </el-col>
                        <el-col :span="8" :offset="4">
                          <div class="fs-12 gray-7">Due Date</div>
                          <div class="f-600 white-1">{{ getDate(assignment.due_date) }}</div>
                        </el-col>
                      </el-row>
                    </div>
                    <br />
                    <el-row>
                      <el-col :span="13">
                        <es-progress percentage="50" class="mt10" />
                      </el-col>
                      <el-col :span="9" :offset="1">
                        <es-button :plain="true" text="View Details" @click="$router.push($url.LN_ASSIGNMENTS_DETAILS + '/' + assignment.id)" />
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </VueSlickCarousel>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <br />
      <el-row>
        <el-col :span="11">
          <el-card style="border: none" class="bg-black-2 rounded-08">
            <div class="fs-18 white-1 f-600">Performance Assessment</div>

            <br />
            <div style="border: 1px solid #404040; padding: 20px" class="rounded-08 mt10">
              <el-row>
                <el-col>
                  <div class="justify-bet">
                    <div class="fs-16 f-600 white-1">
                      &emsp;
                    </div>
                    <es-select v-model="subject" placeholder="Subject" :span="6" class="border-color select-text-white select-icon" :options="subjects" :optionName="'label'" :valueKey="'value'" />
                  </div>
                  <br />
                  <div class="bg-black-3 rounded-08 p20">
                    <div id="chart" class="student-dash">
                      <apexchart type="bar" height="265" :options="chartOptions" :series="series" />
                    </div>
                    <div class="d-flex" style="width: 100%;background: rgb(53, 53, 53);border-radius: 8px;padding: 10px 0px;justify-content: space-around;padding-right: 13px;">
                      <e-svg style="transform: rotate(180deg);margin-top: -6px;height: 35px;margin-left: 23px;margin-right: 12px;" icon="arrow" />
                      <div :class="{ 'selected-arrow': i == 1 }" v-for="i in 6" :key="i" style="width: 29px;border-radius: 4px;color: #ffffff;margin: 0 9px;font-size: 16px;padding: 7px 0;text-align: center;">
                        {{ i }}
                      </div>
                      <e-svg style="background: #1492e6;height: 18px;padding: 7px 9px;margin-top: 4px;border-radius: 4px;" icon="arrowRight" />
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-card style="border: none" class="bg-black-2 rounded-08">
            <div class="fs-18 white-1 f-600">Performance Assessment</div>

            <br />
            <div style="border: 1px solid #404040;padding: 20px;height: 27rem;overflow: auto;" class="rounded-08 mt10">
              <div class="bg-black-3 p20" style="margin-bottom: 20px" v-for="i in 6" :key="i">
                <div class="gray-7 fs-12">8:00 AM - 9:00 AM</div>
                <div style="color: #cfcfcf">
                  Lorem Ipsum is simply dummy text of the printing and type
                  setting industry.
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <br />
      <el-row>
        <el-col :span="23">
          <el-card style="border: none" class="bg-black-2 rounded-08">
            <div class="justify-bet">
              <div class="fs-18 white-1 f-600">Skill Statistics</div>
            </div>
            <br />
            <div style="border: 1px solid #404040; padding: 20px" class="rounded-08 mt10">
              <VueSlickCarousel class="dashboard-catousel" v-bind="settingsRecom2" :arrows="false" :dots="true">
                <div v-for="(skill, i) in skills" :key="i">
                  <div class="bg-black-3 m10 p20 rounded-08">
                    <div class="d-flex mb10">
                      <img src="@/assets/images/cricketIcon.png" alt="" />
                      <div class="f-600 fs-18 text-white ml10">{{ skill.name }}</div>
                    </div>
                    <div class="hr"></div>
                    <br />
                    <el-row>
                      <el-col class="bg-black-4" :span="10" :offset="1">
                        <div class="text-center gray-7 p10 f-600">
                          Skill Score
                        </div>
                        <div class="text-center fs-24 pb10 f-600 white-1">
                          {{ getSkillScore(skill.skill_results) }}
                        </div>
                      </el-col>
                      <el-col class="bg-black-4" :span="10" :offset="3">
                        <div class="text-center gray-7 p10 f-600">
                          Sessions Taken
                        </div>
                        <div class="text-center fs-24 pb10 f-600 white-1">
                          {{ getSessions(skill) }}
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </VueSlickCarousel>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <br />
      <el-row>
        <el-col :span="11">
          <el-card style="border: none" class="bg-black-2 rounded-08">
            <div class="justify-bet">
              <div class="fs-18 white-1 f-600">Survey</div>
            </div>
            <br />
            <div style="border: 1px solid #404040; padding: 20px" class="rounded-08 mt10">
              <div>
                <el-row>
                  <el-col class="bg-black-4" :span="7">
                    <div class="text-center gray-7 p10 f-600">Ongoing</div>
                    <div class="text-center fs-24 pb10 f-600 white-1">{{ getOngoingSurveys('count') }}</div>
                  </el-col>
                  <el-col class="bg-black-4" :span="7" :offset="1">
                    <div class="text-center gray-7 p10 f-600">Upcoming</div>
                    <div class="text-center fs-24 pb10 f-600 white-1">{{ getUpcomingSurveys() }}</div>
                  </el-col>
                  <el-col class="bg-black-4" :span="7" :offset="1">
                    <div class="text-center gray-7 p10 f-600">Completed</div>
                    <div class="text-center fs-24 pb10 f-600 white-1">{{ getCompletedSurveys() }}</div>
                  </el-col>
                </el-row>
                <br />
                <div class="hr"></div>
                <br />
                <div class="fs-16 f-600 white-1">Ongoing</div>
                <div v-if="getOngoingSurveys('hasData')" style="padding: 5px;height: 27rem;overflow: auto;">
                  <div v-for="(survey, i) in getOngoingSurveys('surveys')" :key="i" class="bg-black-3 p20 rounded-08 mg-t-20">
                    <div class="f-600 fs-16 white-1">
                      {{ survey.name }}
                    </div>
                    <div class="rounded-08 mt10 p10 bg-black-4">
                      <el-row>
                        <el-col :span="8" :offset="1">
                          <div class="fs-12 gray-7">Received on</div>
                          <div class="f-600 white-1">{{ getDate(survey.created_at) }}</div>
                        </el-col>
                        <el-col :span="8" :offset="4">
                          <div class="fs-12 gray-7">Due date</div>
                          <div class="f-600 white-1">{{ getDate(survey.due_date) }}</div>
                        </el-col>
                      </el-row>
                    </div>
                    <br />
                    <es-button text="Fill Survey" :plain="true" @click="$router.push($url.LN_SURVAY_ACTIVE + '/form_id/' + survey.id + '/form_results_id/' + survey.form_results_id)" />
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-card style="border: none" class="bg-black-2 rounded-08">
            <div class="justify-bet">
              <div class="fs-18 white-1 f-600">Poll</div>
            </div>
            <br />
            <div style="border: 1px solid #404040; padding: 20px" class="rounded-08 mt10">
              <div>
                <el-row>
                  <el-col class="bg-black-4" :span="7">
                    <div class="text-center gray-7 p10 f-600">Ongoing</div>
                    <div class="text-center fs-24 pb10 f-600 white-1">{{ getOngoingPolls('count') }}</div>
                  </el-col>
                  <el-col class="bg-black-4" :span="7" :offset="1">
                    <div class="text-center gray-7 p10 f-600">Upcoming</div>
                    <div class="text-center fs-24 pb10 f-600 white-1">{{ getUpcomingPolls() }}</div>
                  </el-col>
                  <el-col class="bg-black-4" :span="7" :offset="1">
                    <div class="text-center gray-7 p10 f-600">Completed</div>
                    <div class="text-center fs-24 pb10 f-600 white-1">{{ getCompletedPolls() }}</div>
                  </el-col>
                </el-row>
                <br />
                <div class="hr"></div>
                <br />
                <div class="fs-16 f-600 white-1">Ongoing</div>
                <div v-if="getOngoingPolls('hasData')" style="padding: 5px;height: 27rem;overflow: auto;">
                  <div v-for="(poll, i) in getOngoingPolls('polls')" :key="i" class="bg-black-3 p20 rounded-08 mg-t-20">
                    <div class="f-600 fs-16 white-1">
                      {{ poll.name }}
                    </div>
                    <div class="rounded-08 mt10 p10 bg-black-4">
                      <el-row>
                        <el-col :span="8" :offset="1">
                          <div class="fs-12 gray-7">Received on</div>
                          <div class="f-600 white-1">{{ getDate(poll.created_at) }}</div>
                        </el-col>
                        <el-col :span="8" :offset="4">
                          <div class="fs-12 gray-7">Due date</div>
                          <div class="f-600 white-1">{{ getDate(poll.due_date) }}</div>
                        </el-col>
                      </el-row>
                    </div>
                    <br />
                    <div class="d-flex  justify-bet mt10">
                      <es-button text="No" width="230" />
                      <es-button text="Yes" :plain="true" width="230" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <br /><br />
      <br />
      <br />
    </div>
  </div>
</template>
<script>
import VueSlickCarousel from "vue-slick-carousel"
import { mapMutations } from "vuex"
import { dispatchGraphql } from '@/api/dispatcher'
import { getId } from '@/util/auth'
import moment from 'moment'
export default {
  components: { VueSlickCarousel },
  data: () => ({
    subjects: [],
    subject: null,
    user: {},
    classes: [],
    timerBtn: true,
    submittedAssignments: [],
    assessments: [],
    surveys: [],
    polls: [],
    daylist: [],
    skills: [],
    settingsRecom: {
      dots: true,
      focusOnSelect: false,
      infinite: !true,
      slidesToShow: 1,
      slidesToScroll: 1,
      touchThreshold: 5,
    },
    settingsRecom2: {
      dots: true,
      focusOnSelect: false,
      infinite: !true,
      slidesToShow: 3,
      slidesToScroll: 1,
      touchThreshold: 5,
    },
    series: [
      {
        name: "Excellent",
        data: [0],
      },
      {
        name: "Good",
        data: [0],
      },
      {
        name: "Average",
        data: [0],
      },
      {
        name: "Poor",
        data: [0],
      },
    ],
    chartOptions: {
      chart: {
        type: "bar",
        height: 275,
      },
      colors: ["#1FC24E", "#1492E6", "#FEC600", "#F14D4D"],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
        ],
      },
      yaxis: {
        title: {
          text: "Assessments",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        enabled: false,
      },
    },
  }),
  mounted() {
    this.setAsideMenuCollapse(true);
    setTimeout(() => {
      this.setAsideWidth("100px");
    }, 100);
    this.setBg("black");
  },
  created() {
    this.getSubjects()
    this.getUser()
    this.getAssessments()
    this.getSurveys()
    this.getPolls()
//    this.setAsideMenuCollapse(true);
//    this.setAsideWidth("100px");
  },
  destroyed() {
    this.setAsideMenuCollapse(false);
  },
  methods: {
    setChartData(val) {
      this.series = []
      let excellent = 0
      let good = 0
      let average = 0
      let poor = 0
      const assessments = this.assessments.filter(x => x.form.subject_id == val)
      if (assessments.length > 0) {
        for (const assessment of assessments) {
          if (assessment.answers.length > 0) {
            for (const answer of assessment.answers) {
              if (answer.marks >= 90) {
                excellent ++
              } else if (answer.marks >= 75 && answer.marks < 90) {
                good ++
              } else if (answer.marks >= 55 && answer.marks < 75) {
                average ++
              } else if (answer.marks < 55) {
                poor ++
              }
            }
          }
        }
      }
      this.series = [
        {
          name: "Excellent",
          data: [excellent],
        },
        {
          name: "Good",
          data: [good],
        },
        {
          name: "Average",
          data: [average],
        },
        {
          name: "Poor",
          data: [poor],
        },
      ]
    },
    getSkillScore(results) {
      let score = 0
      if (results.length > 0) {
        var report = results.filter(x => x.student_id === getId())[0]
        score += report.score
      }
      return score
    },
    getSessions(skill) {
      var result = []
      for (const timetable of skill.time_tables) {
        for (const day of this.daylist) {
          if (moment(day).format('dddd') === timetable.week_day) {
            result.push(day)
          }
        }
      }
      return result.length
    },
    getCompletedPolls() {
      let count = 0
      for (const poll of this.polls) {
        if (moment(poll.due_date).format('YYYY-MM-DD') < moment(new Date()).format('YYYY-MM-DD')) {
          count ++
        }
      }
      return count
    },
    getUpcomingPolls() {
      let count = 0
      for (const poll of this.polls) {
        if (moment(poll.due_date).format('YYYY-MM-DD') > moment(new Date()).format('YYYY-MM-DD')) {
          count ++
        }
      }
      return count
    },
    getOngoingPolls(type) {
      var polls = []
      let count = 0
      for (const poll of this.polls) {
        if (moment(poll.due_date).format('YYYY-MM-DD') === moment(new Date()).format('YYYY-MM-DD')) {
          polls.push(poll)
          count ++
        }
      }
      if (polls.length > 0 && type === 'polls') {
        return polls
      } else if (type === 'count') {
        return count
      } else if (polls.length > 0 && type === 'hasData') {
        return true
      }
      return false
    },
    getPolls() {
      const query = `query {
        form_results(where: {_and: [{user_id: {_eq: "${getId()}"}}, {form: {form_type: {_eq: "Poll"}}}]}) {
          id
          form {
            id
            name
            due_date
            created_at
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        for(const report of response.form_results) {
          report.form_results_id = id
          this.polls.push(report.form)
        }
      })
    },
    getCompletedSurveys() {
      let count = 0
      for (const survey of this.surveys) {
        if (moment(survey.due_date).format('YYYY-MM-DD') < moment(new Date()).format('YYYY-MM-DD')) {
          count ++
        }
      }
      return count
    },
    getUpcomingSurveys() {
      let count = 0
      for (const survey of this.surveys) {
        if (moment(survey.due_date).format('YYYY-MM-DD') > moment(new Date()).format('YYYY-MM-DD')) {
          count ++
        }
      }
      return count
    },
    getOngoingSurveys(type) {
      var surveys = []
      let count = 0
      for (const survey of this.surveys) {
        if (moment(survey.due_date).format('YYYY-MM-DD') === moment(new Date()).format('YYYY-MM-DD')) {
          surveys.push(survey)
          count ++
        }
      }
      if (surveys.length > 0 && type === 'surveys') {
        return surveys
      } else if (type === 'count') {
        return count
      } else if (surveys.length > 0 && type === 'hasData') {
        return true
      }
      return false
    },
    getSurveys() {
      const query = `query {
        form_results(where: {_and: [{user_id: {_eq: "${getId()}"}}, {form: {form_type: {_eq: "Form"}}}]}) {
          id
          form {
            id
            name
            due_date
            created_at
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        for(const report of response.form_results) {
          report.form_results_id = id
          this.surveys.push(report.form)
        }
      })
    },
    setAssignments() {
      var assignments = []
      const currentDate = moment(new Date()).format('yyyy-MM-DD')
      const weekDate = moment(new Date(), "DD-MM-YYYY").add(5, 'days')
      for (const audience of this.user.audience) {
        if (audience.assignment) {
          if (currentDate <= moment(audience.assignment.due_date).format("yyyy-MM-DD") && moment(audience.assignment.due_date).format("yyyy-MM-DD") <= weekDate.format("yyyy-MM-DD")) {
            assignments.push(audience.assignment)
          }
        }
      }
      return assignments
    },
    getDate(date) {
      return moment(date).format('DD MMM, YYYY')
    },
    getUpcomingAssessments() {
      var assessments = []
      for (const item of this.assessments) {
        const currentDate = moment(new Date()).format('yyyy-MM-DD')
        if (currentDate < moment(item.form.due_date).format("yyyy-MM-DD")) {
          assessments.push(item)
        }
      }
      return assessments
    },
    getAssessments() {
      const query = `query {
        form_results(where: {_and: [{user_id: {_eq: "${getId()}"}}, {form: {form_type: {_eq: "QuickTest"}}}]}) {
          id
          status
          submitted_at
          start_time
          form {
            id
            name
            form_type
            test_time
            status
            due_date
            description
            subject_id
            subject {
              id
              name
            }
          }
          answers {
            id
            form_results_id
            marks
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.assessments = response.form_results
      })
    },
    setTimeData(data, data1, type) {
      var timer = 'Class Ended'
      var timeHours = '00'
      var timeMinutes = '00'
      var timeSeconds = '00'
      var start = new Date(data)
      var end = new Date(data1)
      var now = new Date().getTime();
      var timeleft = start - now;
      var passtime = end - now
      if(timeleft > 0) {
        setTimeout(() => {
          timeleft -= 1
          var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60))
          var seconds = Math.floor((timeleft % (1000 * 60)) / 1000)
          this.setTime(data, data1)
          timeHours = hours
          timeMinutes = minutes
          timeSeconds = seconds
          timer = 'Class Starts in'
        }, 1000)
      } else {
          if(passtime > 0 && timeleft <= 0) {
            setTimeout(() => {
              passtime -= 1
              var hours = Math.floor((passtime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              var minutes = Math.floor((passtime % (1000 * 60 * 60)) / (1000 * 60));
              var seconds = Math.floor((passtime % (1000 * 60)) / 1000);
              this.setTime(data,data1)
              timeHours = hours
              timeMinutes = minutes
              timeSeconds = seconds
              timer = 'Class Ends in'
            }, 1000)
          }
        }
        if (passtime < 0) {
          this.timerBtn = false
          if (type === 'Hours') {
            return timeHours
          } else if (type === 'Minutes') {
            return timeMinutes
          } else if (type === 'Seconds') {
            return timeSeconds
          } else if (type === 'Timer') {
            return timer
          }
        }
      if (type === 'Hours') {
        return timeHours
      } else if (type === 'Minutes') {
        return timeMinutes
      } else if (type === 'Seconds') {
        return timeSeconds
      } else if (type === 'Timer') {
        return timer
      }
    },
    conferenceCall(classroom) {
      var time = moment(),
        beforeTime = moment(classroom.time_table.start_time),
        afterTime = moment(classroom.time_table.end_time);
      if (time.isBetween(beforeTime, afterTime)) {
        this.$router.push(this.$url.LN_ONLINE_CLASS + '/' + classroom.id)
      } else {
        alert('This Class has ended')
      } 
    },
    getTime(time) {
      return moment(time).format('HH:mmA')
    },
    getSubjects() {
      const query = `query {
        subjects {
          id
          name
        }
      }`
      dispatchGraphql(query).then((response) => {
        for (const subject of response.subjects) {
          this.subjects.push({value: subject.id, label: subject.name})
        }
      })
    },
    getUser() {
      const acyearQuery = `query {
        academic_years {
          id
          name
          start_date
        }
      }`
      const query = `query($id: uuid!) {
        users_by_pk(id: $id) {
          id
          first_name
          last_name
          section {
            id
            name
            standard {
              id
              name
              standard_skills {
                id
                name
                skill_results {
                  id
                  score
                  status
                  student_id
                }
                time_tables {
                  id
                  week_day
                }
              }
            }
          }
          audience(where: {_and: [{user_id: {_eq: "${getId()}"}}, {audienceable_type: {_eq: "Assignment"}}]}) {
            id
            assignment {
              id
              name
              due_date
              created_at
              subject {
                id
                name
              }
            }
          }
        }
      }`
      dispatchGraphql(acyearQuery).then((response) => {
        var currentDate = moment(response.academic_years[0].start_date)
        var stopDate = moment()
        while (currentDate < stopDate) {
          this.daylist.push(moment(currentDate).format(''))
          currentDate = moment(currentDate).add(1, 'days')
        }
      })
      dispatchGraphql(query, { id: getId() }).then((response) => {
        this.user = response.users_by_pk
        this.skills = this.user.section.standard.standard_skills
        console.log(this.daylist)
        this.getClasses()
      })
    },
    getVariables() {
      return {
        "standId": this.user.section.standard.id
      }
    },
    getClasses() {
      const query = `query($standId: uuid) {
        classrooms(where: {time_table: {standard_id: {_eq: $standId}}}) {
          id
          name
          class_date
          topic {
            id
            name
          }
          time_table {
            id
            start_time
            end_time
            subject {
              id
              name
            }
          }
        }
      }`
      dispatchGraphql(query, this.getVariables()).then((response) => {
        for (const classroom of response.classrooms) {
          const currentDate = moment(new Date()).format('yyyy-MM-DD')
          if (currentDate === moment(classroom.class_date).format('yyyy-MM-DD')) {
            this.classes.push(classroom)
          }
        }
      })
    },
    ...mapMutations("Common", [
      "setAsideMenuCollapse",
      "setAsideWidth",
      "setBg",
    ]),
  },
};
</script>

<style lang="scss">
.dashboard-catousel .slick-dots {
  bottom: -20px !important;
  li button:before,
  li.slick-active button:before {
    color: #1492e6 !important;
    opacity: 1;
  }
  li button:before {
    background-color: #8b8282 !important;
    border: none !important;
    border-radius: 50%;
    color: #8b8282 !important;
    display: inline-block;
    height: 15px !important;
    width: 15px !important;
  }
  li.slick-active button:before {
    background-color: #1492e6 !important;
    height: 15px !important;
    width: 15px !important;
  }
}

.dashboard-catousel .slick-dots li button::before {
  height: 15px !important;
  width: 15px !important;
  background: #fff;
  opacity: 0.5;
}

.padding-right-44 {
  padding-right: 44px;
}
.student-dash .apexcharts-legend-text {
  color: #858585 !important;
}
.student-dash .apexcharts-text tspan {
  display: none !important;
}
.selected-arrow {
  background: #575757;
}
</style>
