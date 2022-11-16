<template>
  <e-container-custom class="school-mark-grade">
    <template v-slot:header>
      <el-row class="" :span="24">
        <el-col :span="5" class="text-heading">{{ exam.name }}</el-col>
        <el-col class="float-right text-right" :span="1">
          <el-button icon="el-icon-close" style="border: 2px solid #000" circle
            @click="$go('/school/exam/standard/' + $route.params.standard_id + '/subject/' + $route.params.subject_id)"
          ></el-button>
        </el-col>
      </el-row>
      <el-row class="mg-t-10" :span="24">
        <el-col :span="16" class="mt-">
          <el-row type="flex" justify="space-around">
            <el-col class="text-sm-muted">Standard<div class="text-heading__sub">{{ exam.standard.name }}</div>
            </el-col>
            <el-col class="text-sm-muted">Subject<div class="text-heading__sub">{{ exam.subject.name }}</div>
            </el-col>
            <el-col class="text-sm-muted">Exam Type<div class="text-heading__sub">{{ exam.exam_type.name }}</div>
            </el-col>
            <el-col class="text-sm-muted">Score<div class="text-heading__sub">{{ getPercentage(exam.exam_report) }}%</div>
            </el-col>
          </el-row>
        </el-col>
        <el-col class="float-right" :span="4">
          <e-button class="mt-10" size="large" type="primary" label="Submit" @click="submit" />
        </el-col>
      </el-row>
    </template>
    <template v-slot:content>
      <el-form bgColor="transparent">
        <el-col :span="6" class="mg-t-0-f mg-b-10">
          <div class="text-sm-muted mg-y-3">
            Students
          </div>
          <!-- <el-select :options="[{value:'All'}]" /> -->
        </el-col>
        <el-col>
          <el-row justify="center" :gutter="0">
            <el-col v-for="(report, i) in exam.exam_report" :key="i" :span="20" :xs="24" :sm="24" :md="12" :lg="12" :xl="8" style="padding: 5px">
              <el-card shadow="hover" class="mark-grade-card" body-style="padding:10px 15px">
                <div class="row pd-4 justify-content-between">
                  <div class="col-12 col-md-6">
                    <div class="d-flex mg-y-5">
                      <el-avatar shape="circle" size="50px" :src="require('@/assets/images/profile.jpg')" alt="" />
                      <div class="mg-l-10 mg-t-10" style="color:#4D4F5C">{{ report.student.first_name }}</div>
                    </div>
                  </div>
                  <div class="col-12 col-md-3">
                    <div class="mark-grade-card__mark">
                      <div class="mark-grade-card__mark_text">
                        <el-input v-model="report.marks" />
                      </div>
                    </div>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col>
              <div class="text-center mg-y-40 mg-b-100">
                <el-pagination background layout="prev, pager, next" :total="exam.exam_report.length" />
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-form>
    </template>
  </e-container-custom>
</template>
<script>
import EContainerCustom from "@/controls/eContainerCustom.vue";
import { dispatchGraphql } from "@/api/dispatcher"
export default {
  components: { EContainerCustom },
  data() {
    return {
      activeName: "pastExam",
      showSideBar: true,
      exam: {},
    }
  },
  created() {
    // this.students = require("@/api/students.json");
    this.getExam()
  },
  methods: {
    setVariables(item) {
      return {
        "id": item.id,
        "change": item
      }
    },
    submit() {
      const mutation = `mutation($id: uuid!, $change: exam_results_set_input) {
        update_exam_results_by_pk(pk_columns: {id: $id}, _set: $change) {
          id
        }
      }`
      this.exam.exam_report.map(x => {
        if (x.marks) {
          x.status = "signed"
          delete x.student
        }
        dispatchGraphql(mutation, this.setVariables(x)).then((response) => {
          console.log(response)
          this.$router.push(this.$url.SH_EXAM + '/standard/' + this.$route.params.standard_id + '/subject/' + this.$route.params.subject_id)
        })
      })
      
    },
    getPercentage(reports) {
      let score = 0
      for (const report of reports) {
        if (report.marks) {
          score += parseInt(report.marks)
        } else {
          score += 0
        }
      }
      const total = reports.length * 100
      return ((score / total) * 100).toFixed(0)
    },
    getExam() {
      const query = `query {
        exams_by_pk(id: "${this.$route.params.exam_id}") {
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
          subject {
            id
            name
          }
          standard {
            id
            name
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.exam = response.exams_by_pk
      })
    }
  }
};
</script>

<style>
.exams-color {
  color: #000000;
  font-weight: 550;
}
.mt-5 {
  margin-top: -5px;
}
.mark-grade-card {
  background: #fff;
  border-radius: 8px !important;
  padding: 0px;
  /* padding: 5px; */
}
.mark-grade-card__img {
  display: inline-block;
}
.mark-grade-card__name {
  color: #4d4f5c;
  text-align: left;
  letter-spacing: 0px;
  color: #4d4f5c;
}
.mark-grade-card__mark {
  background: rgba(188, 108, 66, 0.1);
  height: 60px;
  text-align: center;
  width: 114px;
  border-radius: 5px;
  vertical-align: bottom;
}
.mark-grade-card__mark_text {
  line-height: 4;
  height: 100%;
  color: #bc6c42 !important;
  opacity: 1;
  font-weight: bold;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #bc6c42;
  color: #fff;
}
</style>