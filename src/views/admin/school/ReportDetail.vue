<template>
  <e-container-custom>
    <template v-slot:header>
      <el-row class="header">
        <el-col>
          <el-row class="" :span="24">
            <el-col :span="6" class="text-heading">{{ student.first_name }}</el-col>
            <el-col class="float-right text-right" :span="1">
              <el-button
                icon="el-icon-close"
                style="border: 2px solid #000"
                @click="$go('/school/report-card')"
                circle
              ></el-button>
            </el-col>
          </el-row>
          <el-row class="mg-t-30" :span="24">
            <el-col :span="16" class="mt-">
              <el-row type="flex" >
                <el-col class="text-sm-muted">
                  Standard
                  <div class="text-heading__sub">{{ student.exam_results[0].exam.standard.name }}</div>
                </el-col>
                <el-col class="text-sm-muted">
                  Exam Type
                  <div class="text-heading__sub">{{ student.exam_results[0].exam.exam_type.name }}</div>
                </el-col>
                <el-col class="text-sm-muted">
                  Score
                  <div class="text-heading__sub">{{ getPercentage(student.exam_results) }}%</div>
                </el-col>
              </el-row>
            </el-col>
            <el-col class="float-right" :span="2">
              <e-button
                class="mt-5"
                size="large"
                type="primary"
                label="Download"
                icon="el-icon-download"
              />
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </template>
    <template v-slot:content>
      <el-main  class="body">
        <el-tabs  class="floatTabHeader mg-t--40 pd-t-15 mg-x-0" v-model="active">
          <el-tab-pane v-for="exam in exams" :key="exam.subject.id" :label="exam.subject.name" :name="exam.subject.id" class="overflow-hidden">
            <div class="row justify-content-center overflow-hidden">
              <div
                class="col-12 col-md-5 mg-t-10"
                v-for="(d, i) in results.length"
                :key="i"
                :results="results"
              >
                <report-detail-card />
              </div>
            </div>
          </el-tab-pane>
          <!-- <el-tab-pane label="Mathematics" name="maths">
            <div class="row justify-content-center">
              <div
                class="col-12 col-md-5 mg-t-10"
                v-for="(d, i) in 12"
                :key="i"
              >
                <report-detail-card />
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Science" name="science">
            <div class="row justify-content-center">
              <div
                class="col-12 col-md-5 mg-t-10"
                v-for="(d, i) in 12"
                :key="i"
              >
                <report-detail-card />
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="French" name="french">
            <div class="row justify-content-center">
              <div
                class="col-12 col-md-5 mg-t-10"
                v-for="(d, i) in 12"
                :key="i"
              >
                <report-detail-card />
              </div>
            </div>
          </el-tab-pane> -->
        </el-tabs>
      </el-main>
    </template>
  </e-container-custom>
</template>

<script>
import ReportDetailCard from "@/components/school/ReportCard/ReportDetailCard.vue";
import { mapGetters } from "vuex";
import EContainerCustom from "@/controls/eContainerCustom.vue";
import { dispatchGraphql } from '@/api/dispatcher'

export default {
  components: { ReportDetailCard, EContainerCustom },
  props: {},
  data() {
    return {
      active: "english",
      student: [],
      examId: '',
      studentId: '',
      exams: [],
      subjectData: [],
      results: [],
    };
  },
  methods: {
    ...mapGetters("Common", ["asideMenuCollapse"]),
    getUserQuery() {
      this.loading = true
      const query = `query ($id: uuid!) {
        users_by_pk(id: $id) {
          first_name
          exam_results {
            marks
            exam {
              id
              exam_type {
                id
                name
              }
              standard {
                name
              }
              subject {
                id
                name
              }
            }
          }
        }
      }`
      dispatchGraphql(query, { id: this.$route.params.id }).then((response) => {
        console.log("getData", response)
        this.student = response.users_by_pk
      })
    },
    getExamData(){
      const query = `query {
        exams(where: {id: {_eq: "${this.$route.params.examId}"}}) {
          id
          subject {
            id
            name
          }
        }
      }`
      dispatchGraphql(query, ).then((response) => {
        console.log("examData", response)
        this.exams = response.exams
      })
    },
    getResultData(){
      const query = `query {
        exam_results(where: {student_id: {_eq: "${this.$route.params.id}"}}) {
          marks
          id
          exam {
            name
          }
        }
      }`
      dispatchGraphql(query, ).then((response) => {
        console.log("examResults", response)
        this.results = response.exam_results
      })
    },
    getPercentage(exams_results) {
      var total = 0
      total = total + (exams_results[0].marks / 150) * 100
      return total.toFixed(2)
    },
  },
  created (){
    this.getUserQuery()
    this.getExamData()
    this.studentId = this.$route.params.id 
    console.log("student_id", this.studentId)
    this.getResultData()
    
  }
};
</script>

<style>
</style>