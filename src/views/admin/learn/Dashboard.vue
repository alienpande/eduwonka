<template>
  <e-container class="learn-dashboard" pageTitle="Dashboard" subTitle="Welcome back!">
    <el-row class="searchCard">
      <el-col :span="3">
        <!-- <e-dropdown :list="Standard" primary /> -->
        <el-dropdown @command="handleStandard">
          <span class="el-dropdown-link primary-text" primary>
            Standard<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in standards" :key="item.id" :command="item.id">{{ item.name }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="4" class="primary-text">
        <div @click="getStandards()">Clear filter</div>
      </el-col>
      <el-col :span="2" :offset="11">
        <e-button label="APPLY" style="" type="primary" />
      </el-col>
    </el-row>

    <el-row class="dashboard-cards-wrapper">
      <e-card shadow="none" title="Classroom">
        <el-row class="mg-y-3" style="border-bottom: 1px solid #fcdfbd">
          <el-col :span="8" style="font-size: 14px" class="text-center tx-bold">
            Ongoing
            <div style="opacity: 0.8" class="mg-y-10 tx-24">{{ setClasses('ongoing') }}</div>
          </el-col>
          <el-col style="font-size: 14px" :span="8" class="text-center tx-bold">
            Completed
            <div style="opacity: 0.8" class="mg-y-10 tx-24">{{ setClasses('completed') }}</div>
          </el-col>
          <el-col style="font-size: 14px" :span="8" class="text-center tx-bold">
            Upcoming
            <div style="opacity: 0.8" class="mg-y-10 tx-24">{{ setClasses('upcoming') }}</div>
          </el-col>
        </el-row>
        <el-row style="height: 15rem; overflow: auto">
          <div v-for="(classroom, i) in classrooms" :key="i" class="classrom-corsol">
            <div class="text-corsol">{{ classroom.name }}</div>
            <div class="marks">{{ classroom.topic.sub_topics.length }}</div>
          </div>
        </el-row>
      </e-card>

      <e-card title="Notifications" overFlowY="scroll">
        <div class="noti" v-for="i in 6" :key="i">
          <div class="noti-text"
            style="color: rgb(0, 0, 0);opacity: 0.8;font-size: 14px;border: 1px solid;border-radius: 10px;padding: 15px;position: relative;margin-top: 10px;">
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam
            </div>
          </div>
          <div class="notitification-hover"
            style="display: flex;justify-content: space-between;border: 1px solid;padding: 10px;width: 23rem;margin-left: 32px;box-shadow: 0px 6px 13px #00000026;border-radius: 0px 0px 10px 10px;border: 1px solid #bc6c42;display: none;">
            <div style="padding-right: 20px;width: 13rem;opacity: 0.8;font-size: 14px;">
              Lorem ipsum dolor sit amet consectetur
            </div>
            <button class="pointer"
              style="width: 150px;box-shadow: 0px 1px 3px #11111112;border: 1px solid #bc6c42;border-radius: 4px;color: #bc6c42;font-weight: 600;font-size: 16px;background: white;">
              Mark Done
            </button>
          </div>
        </div>
      </e-card>

      <e-card shadow="none" style="width:100% !important" class="rounded-08 pg-50" title="Syllabus Stats" containerHeight="auto">
        <el-row>
          <el-col :span="17" style="border-right: 1px solid #e6eaed" class="sm-width-100">
            <test-graph v-if="setSyllabus('load')" :months="setAcademicData()" :topics="setSyllabus('topics')" />
          </el-col>
          <el-col :span="7" style="padding-left: 20px" class="sm-width-100 sm-margin-t-40">
            <div class="fs-16 f-500" style="opacity: 0.8; padding-bottom: 10px">
              Recommendations
            </div>

            <div class="syllabus-courosle" v-for="i in recomText" :key="i">
              <e-svg class="pointer-icon" icon="Pointer" />
              <div class="syllabus-cousol__info">{{ i }}</div>
            </div>
          </el-col>
        </el-row>
      </e-card>

      <e-card shadow="none" class="rounded-08 pg-50" title="Test Stats" containerHeight="550px" style="width:100% !important;">
        <el-row class="mg-y-3" style="border-bottom: 1px solid #fcdfbd">
          <el-col :span="8" style="font-size: 14px" class="text-center tx-bold">
            Ongoing
            <div style="opacity: 0.8" class="mg-y-10 tx-24">{{ setTests('ongoing') }}</div>
          </el-col>
          <el-col style="font-size: 14px" :span="8" class="text-center tx-bold">
            Completed
            <div style="opacity: 0.8" class="mg-y-10 tx-24">{{ setTests('completed') }}</div>
          </el-col>
          <el-col style="font-size: 14px" :span="8" class="text-center tx-bold">
            Upcoming
            <div style="opacity: 0.8" class="mg-y-10 tx-24">{{ setTests('upcoming') }}</div>
          </el-col>
        </el-row>

        <result-stat v-if="setExamReport('load')" :standards="standards" :report="setExamReport('report')" />
      </e-card>
      <!-- <div class="heading" style="margin: 0">Poll</div> -->
      <!-- <div class="select-dropdown" style="margin-right: -80px; margin-top: -14px">
            <e-select :span="14" placeholder="Group" :options="subjects" />
          </div> -->
      <!-- </div> -->
      <e-card shadow="none" class="rounded-08 pg-50" title="Poll" containerHeight="550px" style="width:100% !important;">
        <el-row class="mg-y-3" style="border-bottom: 1px solid #fcdfbd">
          <el-col :span="8" style="font-size: 14px" class="text-center tx-bold">
            Ongoing
            <div style="opacity: 0.8" class="mg-y-10 tx-24">{{ setPolls('ongoing') }}</div>
          </el-col>
          <el-col style="font-size: 14px" :span="8" class="text-center tx-bold">
            Completed
            <div style="opacity: 0.8" class="mg-y-10 tx-24">{{ setPolls('completed') }}</div>
          </el-col>
          <el-col style="font-size: 14px" :span="8" class="text-center tx-bold">
            Upcoming
            <div style="opacity: 0.8" class="mg-y-10 tx-24">{{ setPolls('upcoming') }}</div>
          </el-col>
        </el-row>
        <div style="opacity: 0.8;font-size: 14px;font-weight: 500;margin-top: 30px;margin-bottom: 15px;">
          Ongoing
        </div>
        <VueSlickCarousel v-bind="settings2" :arrows="false" :dots="true">
          <div v-for="(poll, i) in setPolls('active')" :key="i" class="poll-corsole">
            <div class="pad-poll">
              <div class="poll-text">
                {{ poll.name }}
              </div>
              <div class="poll-audo">Audience</div>
              <div class="poll-15">{{ poll.result_audience.length }}</div>
            </div>
            <div>
              <button class="poll-yes__btn">Yes</button>
              <button class="poll-no__btn">No</button>
            </div>
          </div>
        </VueSlickCarousel>
      </e-card>
      <!-- </el-col> -->
      <!-- <div style="display: flex;justify-content: space-between;margin-top: 30px;width: 88%;margin-bottom: 10px;"> -->
      <!-- <div class="heading" style="margin: 0">Skill stats</div> -->
      <!-- <div class="dance-dropdown" style="margin-right: -80px; margin-top: -14px">
        <e-select :span="14" placeholder="Dance" :options="Dances"></e-select>
      </div> -->
      <!-- </div> -->

      <e-card style="width: 100% !important" title="Skill Stats" shadow="none" containerHeight="auto"
        class="rounded-08 pg-50 learn-dash-skill">
        <el-row>
          <el-col :span="7" class="sm-width-100" style="overflow: auto;height: 24rem;padding-right: 20px;border-right: 1px solid #e6eaed;">
            <div v-for="(skill, i) in skills" :key="i" class="pointer skill-stat-view"
              style="border: 1px solid #bc6c42;border-radius: 10px;padding: 20px;margin-bottom: 20px;">
              <div @click="setSkillChart(skill)">
                <div>
                  <e-svg style="display: inline-block" icon="Salsa"></e-svg>
                  <div style="display: inline-block;margin-left: 20px;font-size: 16px;font-weight: 600;opacity: 0.8;">
                    {{ skill.name }}
                  </div>
                </div>
                <div style="display: flex; margin-top: 5px">
                  <div style="margin-left: 30px">
                    <div style="font-weight: 500; opactiy: 0.8">Students</div>
                    <div style="font-weight: 500; opactiy: 0.8; font-size: 16px">{{ skill.skill_results.length }}</div>
                  </div>
                  <div style="margin-left: 25px">
                    <div style="font-weight: 500; opactiy: 0.8">Sessions taken</div>
                    <div style="font-weight: 500; opactiy: 0.8; font-size: 16px">{{ getSessions(skill) }}</div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col v-if="hasChart" class="sm-width-100" :span="6" style="border-right: 1px solid #e6eaed; padding-bottom: 45px">
            <div class="text-center" style="font-size: 16px;dont-weight: 500;opacity: 0.8;padding: 10px 0;">
              Breakdown
            </div>

            <GChart type="PieChart" :data="pieChartData" :options="pieChartOptions" class="z-index--1" />
            <div style="display: flex; justify-content: space-around">
              <div style="display: flex">
                <span
                  style="width: 8px;height: 8px;background: #fe6780;display: inline-block;margin-top: 6px;margin-right: 7px;"></span>
                <span style="color: #11141a; font-size: 12px; font-weight: 300">Excellent</span>
              </div>
            </div>

            <div style="display: flex;justify-content: space-around;margin-top: 5px;">
              <div style="display: flex">
                <span
                  style="width: 8px;height: 8px;background: #fe59b3;display: inline-block;margin-top: 6px;margin-right: 7px;"></span>
                <span style="color: #11141a; font-size: 12px; font-weight: 300">Average</span>
              </div>
              <div style="display: flex">
                <span
                  style="width: 8px;height: 8px;background: #6358f4;display: inline-block;margin-top: 6px;margin-right: 7px;"></span>
                <span style="color: #11141a; font-size: 12px; font-weight: 300">Poor</span>
              </div>
            </div>
          </el-col>
          <el-col v-if="hasChart" class="sm-width-100" :span="5" style="border-right: 1px solid #e6eaed; padding-left: 15px">
            <div class="pr-x-40 mg-y-20 text-left" style="font-weight: bold">
              Best performers
            </div>
            <div class="mg-y-20" v-for="(performer, i) in bestPerformers" :key="i">
              <e-img-name :src="require('@/assets/images/profile.jpg')" nameStyle="font-weight:normal"
                :name="performer.student.first_name" />
            </div>
          </el-col>
          <el-col v-if="hasChart" class="sm-width-100" :span="4" style="padding-left: 15px">
            <div class="pr-x-40 mg-y-20 text-left" style="font-weight: bold">
              Weak performers
            </div>
            <div class="mg-y-20" v-for="(performer, i) in weakPerformers" :key="i">
              <e-img-name :src="require('@/assets/images/profile.jpg')" nameStyle="font-weight:normal"
                :name="performer.student.first_name" />
            </div>
          </el-col>
        </el-row>
      </e-card>
      <!-- <div class="group-dropdown" style="margin-right: -80px; margin-left: 30px; margin-top: -14px">
            <e-select :span="14" placeholder="Groups" :options="subjects" />
          </div> -->
      <e-card title="Assignments">
        <stats-card :ongoing="setAssignments('ongoing')" :upcoming="setAssignments('upcoming')"
          :completed="setAssignments('completed')" title="Assignments" />
      </e-card>
      <e-card title="Forms">
        <stats-card :ongoing="setForms('ongoing')" :upcoming="setForms('upcoming')" :completed="setForms('completed')"
          title="Forms" />
      </e-card>
    </el-row>
  </e-container>
</template>
<script>
import resultStat from "@/components/learn/dashResult.vue"
import VueSlickCarousel from "vue-slick-carousel"
import StatsCard from "@/components/school/Overview/StatsCard.vue"
import testGraph from "@/components/learn/testGraph.vue"
import { dispatchGraphql } from "@/api/dispatcher"
import { getId } from '@/util/auth'
import moment from 'moment'
export default {
  components: { VueSlickCarousel, resultStat, StatsCard, testGraph },
  data: () => ({
    user: {},
    standards: [],
    standardIds: [],
    forms: [],
    polls: [],
    assignments: [],
    exams: [],
    classrooms: [],
    skills: [],
    bestPerformers: [],
    weakPerformers: [],
    hasChart: false,
    daylist: [],
    settings2: {
      dots: true,
      focusOnSelect: false,
      infinite: !true,
      slidesToShow: 2.2,
      slidesToScroll: 1,
      touchThreshold: 5,
    },
    pieChartData: [],
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
    subjects: [
      {
        title: "Group 1",
        value: "Group 1",
      },
      {
        title: "Group 2",
        value: "Group 2",
      },
      {
        title: "Group 3",
        value: "Group 3",
      },
      {
        title: "Group 4",
        value: "Group 4",
      },
    ],
    Dances: [
      {
        title: "Dance",
        value: "Dance",
      },
      {
        title: "Music",
        value: "Music",
      },
      {
        title: "Art",
        value: "Art",
      },
      {
        title: "Type 4",
        value: "Type 4",
      },
    ],
    filterStatus: [
      { text: "Status" },
      { text: "Active" },
      { text: "Inactive" },
    ],
    Standard: [
      { text: "Standard" },
      { text: "Class 1 B" },
      { text: "Class 2 A" },
      { text: "Class 2 B" },
      { text: "Class 3 A" },
      { text: "Class 2 A" },
      { text: "Class 2 B" },
      { text: "Class 3 A" },
    ],
    recomText: [
      "Focus needs to be implied on the class 9 progress",
      "Class 2 have increased delays in lesson progress",
      "Class 10 have been performing great and has no delays",
      "Mr. Richard could take a counselling session to focus on lesson planner tracking",
    ],
  }),
  created() {
    this.getUser()
    this.getStandards()
  },
  methods: {
    setSyllabus(type) {
      var syllabus = []
      for (const standard of this.standards) {
        if (standard.standard_sections.length > 0) {
          for (const section of standard.standard_sections) {
            if (section.section_teachers.length > 0) {
              for (const teacher of section.section_teachers) {
                if (teacher.topics.length > 0) {
                  for (const topic of teacher.topics) {
                    syllabus.push(topic)
                  }
                }
              }
            }
          }
        }
      }
      if (syllabus.length > 0) {
        if (type === 'topics') {
          return syllabus
        } else if (type === 'load') {
          return true
        }
      }
    },
    setAcademicData() {
      var months = []
      var startDate = this.user.academic_year.start_date
      while (moment(startDate).isBefore(this.user.academic_year.end_date)) {
        months.push(moment(startDate).format("MMM"))
        startDate = moment(startDate).add(1, "months").format("YYYY-MM-DD")
      }
      if (months.length > 0) {
        return months
      }
    },
    setExamReport(type) {
      var report = []
      for (const exam of this.exams) {
        if (exam.exam_report.length > 0) {
          report.push(exam)
        }
      }
      if (report.length > 0) {
        if (type === 'report') {
          return report
        } else if (type === 'load') {
          return true
        }
      } else if (type === 'load') {
        console.log('check load')
        return true
      }
    },
    handleStandard(val) {
      this.standardIds = []
      this.standardIds.push(val)
      this.getData()
    },
    getStandards() {
      const query = `query {
        standards {
          id
          name
          position
          standard_sections {
            id
            name
            section_teachers {
              id
              topics {
                id
                name
                sub_topics {
                  id
                  name
                  status
                }
                classrooms {
                  id
                  class_date
                }
              }
            }
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.standards = response.standards
        this.standardIds = this.standards.map(x => x.id)
        this.getData()
      })
    },
    setSkillChart(skill) {
      this.hasChart = false
      this.pieChartData = []
      this.bestPerformers = []
      this.weakPerformers = []
      let bestCount = 0
      let weakCount = 0
      let averageCount = 0
      for (const result of skill.skill_results) {
        if (result.score > 7) {
          this.bestPerformers.push(result)
          bestCount = bestCount + result.score
        } else if (result.score <= 7 && result.score > 4) {
          averageCount = averageCount + result.score
        } else if (result.score <= 4 && result.score > 0) {
          this.weakPerformers.push(result)
          weakCount = weakCount + result.score
        }
      }
      this.pieChartData = [
        ["1", "Count", { role: "style" }],
        ["Poor", weakCount, "red"],
        ["Average", averageCount, "#f00"],
        ["Excellent", bestCount, "#f000"],
      ]
      if (this.pieChartData.length > 0) {
        this.hasChart = true
      }
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
    setClasses(type) {
      let ongoing = 0
      let upcoming = 0
      let completed = 0
      for (const classroom of this.classrooms) {
        if (moment(classroom.class_date).format("YYYY-MM-DD") < moment().format("YYYY-MM-DD")) {
          completed++
        } else if (moment(classroom.class_date).format("YYYY-MM-DD") > moment().format("YYYY-MM-DD")) {
          upcoming++
        } else {
          ongoing++
        }
      }
      if (type === "ongoing") {
        return ongoing
      } else if (type === "upcoming") {
        return upcoming
      } else if (type === "completed") {
        return completed
      }
    },
    setTests(type) {
      let ongoing = 0
      let upcoming = 0
      let completed = 0
      for (const exam of this.exams) {
        if (moment(exam.start_date).format("YYYY-MM-DD") < moment().format("YYYY-MM-DD")) {
          completed++
        } else if (moment(exam.start_date).format("YYYY-MM-DD") > moment().format("YYYY-MM-DD")) {
          upcoming++
        } else {
          ongoing++
        }
      }
      if (type === "ongoing") {
        return ongoing
      } else if (type === "upcoming") {
        return upcoming
      } else if (type === "completed") {
        return completed
      }
    },
    setAssignments(type) {
      let ongoing = 0
      let upcoming = 0
      let completed = 0
      for (const assignment of this.assignments) {
        if (moment(assignment.due_date).format("YYYY-MM-DD") < moment().format("YYYY-MM-DD")) {
          completed++
        } else if (moment(assignment.due_date).format("YYYY-MM-DD") > moment().format("YYYY-MM-DD")) {
          upcoming++
        } else {
          ongoing++
        }
      }
      if (type === "ongoing") {
        return ongoing
      } else if (type === "upcoming") {
        return upcoming
      } else if (type === "completed") {
        return completed
      }
    },
    setForms(type) {
      let ongoing = 0
      let upcoming = 0
      let completed = 0
      for (const form of this.forms) {
        if (moment(form.due_date).format("YYYY-MM-DD") < moment().format("YYYY-MM-DD")) {
          completed++
        } else if (moment(form.due_date).format("YYYY-MM-DD") > moment().format("YYYY-MM-DD")) {
          upcoming++
        } else {
          ongoing++
        }
      }
      if (type === "ongoing") {
        return ongoing
      } else if (type === "upcoming") {
        return upcoming
      } else if (type === "completed") {
        return completed
      }
    },
    setPolls(type) {
      let active = []
      let ongoing = 0
      let upcoming = 0
      let completed = 0
      for (const poll of this.polls) {
        if (moment(poll.due_date).format("YYYY-MM-DD") < moment().format("YYYY-MM-DD")) {
          completed++
        } else if (moment(poll.due_date).format("YYYY-MM-DD") > moment().format("YYYY-MM-DD")) {
          upcoming++
        } else {
          active.push(poll)
          ongoing++
        }
      }
      if (type === "ongoing") {
        return ongoing
      } else if (type === "upcoming") {
        return upcoming
      } else if (type === "completed") {
        return completed
      } else if (type === "active") {
        return active
      }
    },
    getVariables() {
      return {
        "standIds": this.standardIds
      }
    },
    getData() {
      const query = `query {
        forms {
          id
          name
          form_type
          due_date
          result_audience {
            id
            form_id
          }
        }
      }`
      const assnQuery = `query($standIds: [uuid!]) {
        assignments(where: {standard_id: {_in: $standIds}}) {
          id
          name
          due_date
        }
      }`
      const examQuery = `query($standIds: [uuid!]) {
        exams(where: {standard_id: {_in: $standIds}}) {
          id
          name
          start_date
          standard_id
          exam_report {
            id
            exam_id
            marks
          }
        }
      }`
      const classQuery = `query($standIds: [uuid!]) {
        classrooms(where: {time_table: {standard_id: {_in: $standIds}}}) {
          id
          name
          class_date
          topic {
            id
            name
            sub_topics {
              id
              name
            }
          }
        }
      }`
      const skillsQuery = `query($standIds: [uuid!]) {
        skills(where: {standard_id: {_in: $standIds}}) {
          id
          name
          skill_results {
            id
            score
            status
            student {
              id
              first_name
            }
          }
          time_tables {
            id
            week_day
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.forms = response.forms.filter(x => x.form_type === "Form")
        this.polls = response.forms.filter(x => x.form_type === "Poll")
        dispatchGraphql(assnQuery, this.getVariables()).then((response) => {
          this.assignments = response.assignments
          dispatchGraphql(examQuery, this.getVariables()).then((response) => {
            this.exams = response.exams
            dispatchGraphql(classQuery, this.getVariables()).then((response) => {
              this.classrooms = response.classrooms
              // var currentDate = moment(this.user.academic_year.start_date).format("YYYY-MM-DD")
              // var stopDate = moment().format("YYYY-MM-DD")
              var startDate = this.user.academic_year.start_date
              while (moment(startDate).isBefore(moment())) {
                this.daylist.push(moment(startDate).format("YYYY-MM-DD"))
                startDate = moment(startDate).add(1, "days").format("YYYY-MM-DD")
              }
              dispatchGraphql(skillsQuery, this.getVariables()).then((response) => {
                this.skills = response.skills
              })
            })
          })
        })
      })
    },
    getUser() {
      const query = `query($id: uuid!) {
        users_by_pk(id: $id) {
          id
          first_name
          academic_year {
            id
            start_date
            end_date
          }
        }
      }`
      dispatchGraphql(query, { id: getId() }).then((response) => {
        this.user = response.users_by_pk
      })
    }
  }
}
</script>

<style lang="scss">
.slick-dots {
  bottom: -25px !important;

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

.classrom-corsol {
  display: flex;
  width: 90%;
  justify-content: space-between;
  border: 1px solid #fcdfbd;
  border-radius: 8px;
  padding: 9px;
  margin-top: 15px;
}

.text-corsol {
  color: #4d4f5c;
  font-size: 16px;
  padding: 5px 10px;
}

.marks {
  width: 90px;
  border-radius: 5px;
  color: rgb(17, 20, 26);
  background: rgba(188, 108, 66, 0.1);
  opacity: 0.8;
  font-size: 20px;
  text-align: center;
  padding: 6px 0;
}

.noti-text:hover {
  border: 1px solid #bc6c42 !important;
}

.noti:hover .notitification-hover {
  display: flex !important;
  margin-bottom: 10px !important;
  border-top: 0 !important;
}

.results #line-chart {
  margin-top: 10px !important;
}

.results .pd-20 {
  padding: 0 !important;
}

.poll-corsole {
  border: 1px solid #bc6c42;
  border-radius: 10px;
  width: 11.87rem !important;
  margin-top: 10px;
}

.poll-text {
  font-size: 14px;
  font-weight: 600;
}

.poll-audo {
  font-size: 12px;
  font-weight: 300;
  margin-top: 10px;
}

.poll-15 {
  font-weight: 600;
  font-size: 20px;
}

.pad-poll {
  padding: 15px;
}

.poll-yes__btn {
  font-size: 15px;
  padding: 7px 15px;
  border: none;
  background: #bc6c42;
  border-radius: 7px;
  color: white;
}

.poll-no__btn {
  padding: 7px 58px;
  border: none;
  font-size: 15px;
  background: rgba(188, 108, 66, 0.1);
}

.skill-stat-view:hover {
  box-shadow: 0px 13px 21px #00000026;
}
</style>