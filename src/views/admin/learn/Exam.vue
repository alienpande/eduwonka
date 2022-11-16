<template>
  <div>
    <e-container pageTitle="Quick test" btnIcon="el-icon-plus" btnText="Create test" @btnClick="addNewEmployees">
      <el-tabs class="floatTabHeader" v-model="activeName">
        <el-tab-pane label="Active" name="active">
          <div class="searchCard searchCard-2">
            <div style="font-size: 20px; opacity: 0.8; font-weight: 500">
              {{ total }} tests
            </div>
            <e-button class="mt-5" :span="2" css="btn-upadet" size="mini" icon="el-icon-sort" :plain="true" type="primary" />
          </div>
          <el-row class="dashboard-cards-wrapper">
            <el-col :span="11" style="margin-bottom:25px" v-for="i in quick_test" :key="i.id">
              <el-card shadow="none" style="padding: 8px" class="rounded-08 pg-50 cp hover-shadow">
                <div @click="handleClick(i, 'active')">
                  <div :style="'font-size: 20px;width: 233px;font-weight: 600;opacity: 0.8;'">
                    <!-- Lorem ipsum dolor sit amet consectetur -->
                    {{ i.name }}
                  </div>
                  <div :style="'font-size: 20px;opacity: 0.8;font-weight: 500;padding: 18px 0;'">
                    <span style="font-weight: 300">by </span>{{ user ? user.first_name : '' }}
                  </div>
                  <el-row>
                    <el-col :span="12">
                      <div style="font-weight: 300; opacity: 0.8">
                        Attendance
                      </div>
                      <div :style="'font-weight: 500;font-size: 20px;opacity: 0.8;margin-top: 10px;'">
                        {{ i.result_audience ? i.result_audience.length : 0 }} / {{ getStudents(sections) }}
                      </div>
                    </el-col>
                    <el-col :span="9">
                      <div style="font-weight: 300; opacity: 0.8">
                        Time left
                      </div>
                      <div :style="'font-weight: 500;font-size: 20px;opacity: 0.8;margin-top: 10px;'">
                        <!-- 15m 12s -->
                        {{ i.test_time }} m
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <exam-right-slide :qtData="qtData" :user="user" :notSubmitted="notSubmitted" :submitted="submitted" :bestPerformers="bestPerformers" :weakPerformers="weakPerformers" :skippedStudents="skippedStudents" :show="showSideBar" :__onCancel="() => (showSideBar = !showSideBar)" />
        </el-tab-pane>
        <el-tab-pane label="Upcoming" name="upcoming">
          <div class="searchCard searchCard-2">
            <div style="font-size: 20px; opacity: 0.8; font-weight: 500">
              {{ total }} tests
            </div>
            <e-button class="mt-5" :span="2" css="btn-upadet" size="mini" icon="el-icon-sort" :plain="true" type="primary" />
          </div>
          <el-row class="dashboard-cards-wrapper">
            <el-col :span="11" style="margin-bottom:25px" v-for="i in quick_test" :key="i.id">
              <el-card shadow="none" style="padding: 8px" class="rounded-08 pg-50 cp hover-shadow">
                <div @click="handleClick(i, 'upcoming')">
                  <div :style="'font-size: 20px;width: 233px;font-weight: 600;opacity: 0.8;'">
                    {{ i.name }}
                  </div>
                  <div :style="'font-size: 20px;opacity: 0.8;font-weight: 500;padding: 18px 0;'">
                    <span style="font-weight: 300">by</span>{{ user ? user.first_name : '' }}
                  </div>
                  <el-row>
                    <el-col :span="12">
                      <div style="font-weight: 300; opacity: 0.8">
                        Attendance
                      </div>
                      <div :style="'font-weight: 500;font-size: 20px;opacity: 0.8;margin-top: 10px;'">
                        {{ i.result_audience ? i.result_audience.length : 0 }} / {{ getStudents(sections) }}
                      </div>
                    </el-col>
                    <el-col :span="9">
                      <div style="font-weight: 300; opacity: 0.8">
                        Time left
                      </div>
                      <div :style="'font-weight: 500;font-size: 20px;opacity: 0.8;margin-top: 10px;'">
                        {{ i.test_time }} m
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <exam-right-slide :user="user" :qtData="qtData" :show="showSideBar" :notSubmitted="notSubmitted" :submitted="submitted" :bestPerformers="bestPerformers" :weakPerformers="weakPerformers" :skippedStudents="skippedStudents" :__onCancel="() => (showSideBar = !showSideBar)" />
        </el-tab-pane>
        <el-tab-pane label="Completed" name="completed">
          <div class="searchCard searchCard-2">
            <div style="font-size: 20px; opacity: 0.8; font-weight: 500">
              {{ total }} tests
            </div>
            <e-button class="mt-5" :span="2" css="btn-upadet" size="mini" icon="el-icon-sort" :plain="true" type="primary" />
          </div>
          <el-row class="dashboard-cards-wrapper">
            <el-col :span="11" style="margin-bottom:25px" v-for="i in quick_test" :key="i.id">
              <el-card shadow="none" style="padding: 8px" class="rounded-08 pg-50 cp hover-shadow">
                <div @click="handleClick(i, 'completed')">
                  <div :style="'font-size: 20px;width: 233px;font-weight: 600;opacity: 0.8;'">
                    {{ i.name }}
                  </div>
                  <div :style="'font-size: 20px;opacity: 0.8;font-weight: 500;padding: 18px 0;'">
                    <span style="font-weight: 300">by</span>{{ user ? user.first_name : '' }}
                  </div>
                  <el-row>
                    <el-col :span="12">
                      <div style="font-weight: 300; opacity: 0.8">
                        Attendance
                      </div>
                      <div :style="'font-weight: 500;font-size: 20px;opacity: 0.8;margin-top: 10px;'">
                        {{ i.result_audience ? i.result_audience.length : 0 }} / {{ getStudents(sections) }}
                      </div>
                    </el-col>
                    <el-col :span="9">
                      <div style="font-weight: 300; opacity: 0.8">
                        Time left
                      </div>
                      <div :style="'font-weight: 500;font-size: 20px;opacity: 0.8;margin-top: 10px;'">
                        {{ i.test_time - i.test_time }} m
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <exam-right-slide :user="user" :qtData="qtData" :notSubmitted="notSubmitted" :submitted="submitted" :bestPerformers="bestPerformers" :weakPerformers="weakPerformers" :skippedStudents="skippedStudents" :mostAnswered="mostAnswered" :leastAnswered="leastAnswered" :show="showSideBar" :__onCancel="() => (showSideBar = !showSideBar)" />
        </el-tab-pane>
      </el-tabs>
      <pagination :total="total" @pagination="pagination" />
    </e-container>
  </div>
</template>
<script>
import examRightSlide from "@/components/learn/exam/examRightSlide.vue";
import { mapMutations } from 'vuex'
import { dispatchGraphql } from "@/api/dispatcher";
import Pagination from '@/components/Pagination'
import moment from "moment";
import _ from "lodash";
export default {
  components: { examRightSlide, Pagination },
  data: () => ({
    quick_test: [],
    total: 0,
    offset: 0,
    page: 1,
    limit: 10,
    user: {},
    sections: [],
    notSubmitted: [], // not submitted students array for exam right slide view
    submitted: [], // submitted students array for exam right slide view
    bestPerformers: [], // Best Performer students array for exam right slide view
    weakPerformers: [], // Weak Performer students array for exam right slide view
    mostAnswered: [],
    leastAnswered: [],
    skippedStudents: [],
    qtData: {},
    activeName: "active",
    showSideBar: false,
    rightSlideData: {},
    currentDate: moment(new Date()).format("yyyy-MM-DD"),
    dateComparison: {},
  }),
  watch: {
    activeName: _.debounce(function() {
      if (this.activeName === "upcoming") {
        this.dateComparison = {_gt: this.currentDate}
        this.getQuickTests()
      } else if(this.activeName === "completed") {
        this.dateComparison = {_lt: this.currentDate}
        this.getQuickTests()
      } else {
        this.dateComparison = {_eq: this.currentDate}
        this.getQuickTests()
      }
    })
  },
  mounted() {
    this.hideAsideMenuMobile();
  },
  methods: {
    getStudents(sections) {
      let students = 0
      for (const section of sections) {
        for (const student of section.section_students) {
          students ++
        }
      }
      return students
    },
     ...mapMutations('Common',["hideAsideMenuMobile"]),
    pagination: function(object) {
      this.limit = object.limit
      this.offset = object.limit * (object.page - 1)
      this.getQuickTests()
    },
    getUsers() {
      const query = `query {
        users(where: {section_subject_teachers: {subject_id: {_eq: "${this.$route.params.subject_id}"}}}) {
          first_name
          id
        }
      }`;
      dispatchGraphql(query).then((response) => {
        console.log("user", response)
        this.user = response.users[0]
      });
    },
    getSections() {
      const query = `query {
        sections(where: {standard_id: {_eq: "${this.$route.params.standard_id}"}}) {
          section_students {
            first_name
            id
          }
        }
      }
      `;
      dispatchGraphql(query).then((response) => {
        this.sections = response.sections
        console.log("stUsr", this.sections);
      });
    },
    getvariables() {
      if (this.activeName === 'active') {
        this.dateComparison = {_eq: this.currentDate}
        console.log(this.dateComparison)
      }
      return {
        'limit': this.limit,
        'offset': this.offset,
        'standardId': this.$route.params.standard_id,
        'subjectId': this.$route.params.subject_id,
        'dueDate': this.dateComparison,
      }
    },
    getQuickTests() {
      const query = `query($limit: Int!, $offset: Int!, $standardId:uuid!, $subjectId:uuid!, $dueDate: timestamp_comparison_exp) {
        forms(limit: $limit, offset: $offset, where: {_and: [{form_type: {_eq: "QuickTest"}}, {subject_id: {_eq: $subjectId}}, {standard_id: {_eq: $standardId}}, {due_date: $dueDate}]}) {
          id
          name
          test_time
          due_date
          result_audience {
            id
            form_id
            status
            user {
              id
              first_name
            }
            answers {
              id
              answer
              marks
              form_question {
                id
                total_marks
                question {
                  id
                  name
                }
              }
            }
            form {
              form_questions {
                id
                total_marks
                question {
                  id
                  name
                  answer
                }
                answer {
                  answer
                  marks
                }
              }
            }
          }
          form_questions {
            id
            position
            total_marks
            question {
              id
              name
              answer
            }
            answer {
              answer
              marks
            }
          }
        }
        forms_aggregate(where: {_and: [{form_type: {_eq: "QuickTest"}}, {subject_id: {_eq: $subjectId}}, {standard_id: {_eq: $standardId}}, {due_date: $dueDate}]}) {
          aggregate {
            count
          }
        }
      }`
      dispatchGraphql(query, this.getvariables()).then((response) => {
        this.quick_test = response.forms
        this.total = response.forms_aggregate.aggregate.count
      })
    },
    addNewEmployees() {
      this.$router.push(this.$url.LN_EXAM_FORM +"/standard/" +this.$route.params.standard_id +"/subject/" +this.$route.params.subject_id)
    },
    handleClick(val, type) {
      console.log(val)
      let data = { ...val }

      console.log(data)
      data.totalAttendence = this.getStudents(this.sections)
      if (type === "completed") {
        data.test_time = 0
      }

      this.qtData = data
      this.notSubmitted = [] // empty before add new data
      this.submitted = [] // empty before add new data
      let submittedData = [] // empty before add new data
      this.bestPerformers = [] // empty before add new data
      this.weakPerformers = [] // empty before add new data
      this.mostAnswered = [] // empty before add new data
      this.leastAnswered = [] // empty before add new data
      this.skippedStudents = []
      // most and least answered questions
      let dataForQuestions = [...val.form_questions]
      let dataForAllAns = [...val.form_questions]
    //  console.log(dataForQuestions);
      let allAnsweredQuestions = []
      dataForQuestions.filter((v) => {
        if (v.answer) {
          allAnsweredQuestions.push(v.question.id)
        }
      });
      // let arr = ["foo", "foo", "foo", "bar", "bar", "bar", "baz", "baz"]
      let counts = allAnsweredQuestions.reduce((a, c) => {
        a[c] = (a[c] || 0) + 1
        return a
      }, {})
      let maxCount = Math.max(...Object.values(counts))
      let mostFrequent = Object.keys(counts).filter((k) => counts[k] === maxCount)
     // console.log(mostFrequent);
      mostFrequent.forEach((v) => {
        let find = dataForAllAns.find((q) => q.question.id === v)
        if (find) {
          this.mostAnswered.push(find)
        }
      });
    //  console.log("most answered ",this.mostAnswered);
      let allLeastAnsweredQuestions = []
       dataForQuestions.filter((v) => {
        if (!v.answer) {
          allLeastAnsweredQuestions.push(v.question.id)
        }
      });
      let leastCounts = allLeastAnsweredQuestions.reduce((a, c) => {
        a[c] = (a[c] || 0) + 1
        return a
      }, {});
      let maxLeastCount = Math.max(...Object.values(leastCounts))
      let mostLeastFrequent = Object.keys(leastCounts).filter((k) => leastCounts[k] === maxLeastCount)
       mostLeastFrequent.forEach((v) => {
        let find = dataForAllAns.find((q) => q.question.id === v)
        if (find) {
          this.leastAnswered.push(find)
        }
      });
      // submitted and not submitted users
      for (const item of this.qtData.result_audience) {
        if (item.status === "ASSIGNED") {
          this.notSubmitted.push(item)
        } else if (item.status === "SUBMITTED") {
          submittedData.push(item)
        }
      }
      submittedData.forEach((ele) => {
        let marks = 0
        ele.answers.forEach((ques) => {
          marks = marks + ques.marks
        })
        ele.user.secureMarks = marks
      })
      // best and weak performers
      submittedData.forEach((ele) => {
        let percentage =(ele.user.secureMarks / ele.form.form_questions[0].total_marks) * 100
        if (percentage > 79) {
          this.bestPerformers.push(ele)
        } else if (percentage < 60) {
          this.weakPerformers.push(ele)
        }
      });
      this.submitted = submittedData
      // skipped students
      let students = [...this.sections[0].section_students]
      let result_audience = [
        ...this.qtData.result_audience.map((v) => ({
          id: v.user ? v.user.id : '',
          first_name: v.user ? v.user.first_name : '',
        })),
      ];
      this.skippedStudents = students.filter((o1) => !result_audience.some((o2) => o1.id === o2.id))
    //  console.log(this.qtData);
      this.showSideBar = true
    },
  },
  created() {
    this.getUsers()
    this.getQuickTests()
    this.getSections()
  },
};
</script>
<style>
.hover-shadow:hover {
  box-shadow: 0px 3px 15px #00000026 !important;
  border: 1px solid #bc6c42 !important;
}
.btn-upadet {
  background: transparent !important;
}
.btn-upadet:hover {
  background: #c2784e !important;
}
</style>