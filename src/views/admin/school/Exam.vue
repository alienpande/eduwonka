<template>
  <e-container class="school-exam" pageTitle="Exam" btnIcon="el-icon-plus" btnText="Create Exam" @btnClick="$go($url.SH_CREATEEXAM + '/standard/' + $route.params.standard_id + '/subject/' + $route.params.subject_id)">
    <el-tabs class="floatTabHeader" v-model="activeName">
      <el-tab-pane label="Past" name="past">
        <el-row :span="24" class="searchCard searchCard-2">
          <el-col :span="4" class="exams-color">{{ total }} exams</el-col>
          <el-col  :span="3">
            <span class="not-graded-column"></span>
            <span class="not-graded-font">Not Graded</span>
          </el-col>
          <el-col  :span="3">
            <span class="graded-font-column"></span>
            <span class="graded-font">Graded</span>
          </el-col>
          <el-col  :span="2">
            <e-button class="mt-5" size="mini" icon="el-icon-sort" :plain="true" type="primary" />
          </el-col>
        </el-row>
        <e-form bgColor="transparent" pLeft="0px"> 
          <past-card @rightBarOpen='setRightBar' :exams="exams" />
        </e-form>

        <exam-details v-if="examDetails.id" :exam="examDetails" :show="isRight" :__onClose="()=>(isRight = !isRight)" />

      </el-tab-pane>
      <el-tab-pane label="Upcoming" name="upcoming">
        <el-row :span="24" class="searchCard searchCard-2">
          <el-col :span="4" class="exams-color">{{ total }} exams</el-col>
          <!-- <el-col class="float-right" :span="2"> -->
            <e-button style="margin-left:auto" class="mt-5" size="mini" icon="el-icon-sort" :plain="true" type="primary" />
          <!-- </el-col> -->
        </el-row>
        <e-form bgColor="transparent" pLeft="0px">
          <upcoming-card :exams="exams" />
        </e-form>
      </el-tab-pane>
      <el-tab-pane label="Active" name="active">
        <el-row :span="24" class="searchCard searchCard-2">
          <el-col :span="4" class="exams-color">{{ total }} exams</el-col>
            <e-button style="margin-left:auto" class="mt-5" size="mini" icon="el-icon-sort" :plain="true" type="primary" />
        </el-row>
        <e-form bgColor="transparent">
          <active-card :exams="exams" @__clicked="setGradeMarks" />
        </e-form>
      </el-tab-pane>
      <el-tab-pane label="Tentative" name="tentative">
        <el-row :span="24" class="searchCard searchCard-2">
          <el-col :span="4" class="exams-color">{{ total }} exams</el-col>
          <e-button style="margin-left:auto" class="mt-5" size="mini" icon="el-icon-sort" :plain="true" type="primary" />
        </el-row>
        <e-form bgColor="transparent">
          <tentative-card @rightBar='setTentative' :exams="exams" />
        </e-form>

        <tentative-details v-if="tentativeDetails.id" :exam="tentativeDetails" :show="isTentativeDetails" :__onClose="()=>(isTentativeDetails = !isTentativeDetails)" />

      </el-tab-pane>
    </el-tabs>
    <pagination :total="total" @pagination="pagination" />
  </e-container>
</template>
<script>
import ExamDetails from '@/components/school/Exam/examDetails.vue'
import TentativeDetails from '@/components/school/Exam/tantativeDetail.vue'
import pastCard from "@/components/school/Exam/TermCard.vue"
import TentativeCard from "@/components/school/Exam/TentativeCard.vue"
import UpcomingCard from "@/components/school/Exam/UpcomingCard.vue"
import ActiveCard from "@/components/school/Exam/ActiveCard.vue"
import { dispatchGraphql } from "@/api/dispatcher"
import Pagination from '@/components/Pagination'
import moment from 'moment'
import _ from 'lodash'
export default {
  components: { ActiveCard, UpcomingCard, pastCard, ExamDetails, TentativeDetails, TentativeCard, Pagination },
  data() {
    return {
      activeName: "past",
      isRight:false,
      isTentativeDetails:false,
      tentativeDetails: {},
      examDetails: {},
      exams: [],
      currentDate: moment(new Date()).format('yyyy-MM-DD'),
      dateComparison: {},
      total: 0,
      offset: 0,
      page: 1,
      limit: 10,
    }
  },
  watch: {
    activeName: _.debounce(function() {
      if (this.activeName === 'upcoming') {
        this.dateComparison = {_gt: this.currentDate}
        this.getExams()
      } else if (this.activeName === 'past') {
        this.dateComparison = {_lt: this.currentDate}
        this.getExams()
      } else if (this.activeName === 'active') {
        this.dateComparison = {_eq: this.currentDate}
        this.getExams()
      } else {
        this.dateComparison = {_is_null: true}
        this.getExams()
      }
    })
  },
  created() {
    this.getExams()
  },
  methods: {
    pagination: function(object) {
      this.limit = object.limit
      this.offset = object.limit * (object.page - 1)
      this.getExams()
    },
    setTentative(exam) {
      this.tentativeDetails = {}
      this.tentativeDetails = exam
      this.isTentativeDetails = true
    },
    setGradeMarks(id) {
      this.$router.push(this.$url.SH_GRADEMARK + '/standard/' + this.$route.params.standard_id + '/subject/' + this.$route.params.subject_id + '/' + id)
    },
    setRightBar(exam) {
      this.examDetails = {}
      this.examDetails = exam
      this.isRight = true
    },
    getVariables() {
      if (this.activeName === 'past') {
        this.dateComparison = {_lt: this.currentDate}
        console.log(this.dateComparison)
      }
      return {
        'limit': this.limit,
        'offset': this.offset,
        'startDate': this.dateComparison,
        'standardId': this.$route.params.standard_id,
        'subjectId': this.$route.params.subject_id
      }
    },
    getExams() {
      const query = `query($limit: Int!, $offset: Int!, $startDate: date_comparison_exp, $standardId:uuid, $subjectId:uuid,) {
        exams(limit: $limit, offset: $offset, where: {_and: [{start_date: $startDate}, {standard_id: {_eq: $standardId}}, {subject_id: {_eq: $subjectId}}]}) {
          id
          name
          start_date
          exam_type {
            id
            name
          }
          exam_report {
            id
            marks
            status
            student {
              id
              first_name
            }
          }
          invigilator {
            id
            first_name
            last_name
          }
          standard {
            id
            name
            standard_sections {
              id
              name
              section_students {
                id
                first_name
                last_name
              }
            }
          }
        }
        exams_aggregate(where: {_and: [{start_date: $startDate}, {standard_id: {_eq: $standardId}}, {subject_id: {_eq: $subjectId}}]}) {
          aggregate {
            count
          }
        }
      }`
      dispatchGraphql(query, this.getVariables()).then((response) => {
        this.exams = response.exams
        this.total = response.exams_aggregate.aggregate.count
      })
    }
  },
};
</script>

<style scoped>
.mt-10 {
  margin-top: 10px;
}
.exams-color {
  color: #000000;
  font-weight: 550;
}
.mt-5 {
  margin-top: -5px;
}
.not-graded-column {
  background-color: #e60000;
  padding: 0px 5px 0px 5px;
  height: 2px;
  border-radius: 8px;
  margin-right: 5px;
}
.not-graded-font {
  color: #11141a;
  font-size: 12px;
}
.graded-font-column {
  background-color: #0bc32e;
  padding: 0px 5px 0px 5px;
  height: 2px;
  border-radius: 8px;
  margin-right: 5px;
}
.graded-font {
  color: #11141a;
  font-size: 12px;
}
</style>
