<template>
  <div class="learn-course-assessment" v-if="standard && subject"  style="overflow: auto; height: 80vh">
    <course-header title="Assessment" :standard="standard.name" :subject="subject.name" />
    <div style="padding: 0 80px" class="sm-p-x-15 reduce-padding">
      <div
        style="
          display: flex;
          justify-content: space-between;
          padding-right: 21px;
        "
        class="sm-p-r-0 sm-my-5 assessment-padding searchCard "
      >
        <div style="font-weight: bold; font-size: 18px">{{ students.length }} Students</div>
        <e-button
          class="sm-width-auto"
          :span="1"
          icon="el-icon-search"
          :plain="true"
          type="primary"
          css="bg-tranparent"
        ></e-button>
      </div>
      <el-row class="dashboard-cards-wrapper">
        <el-col :span="12" v-for="student in students" :key="student" >
          <el-card
            shadow="none"
            style="margin: 10px "
            class="rounded-08 pg-50 cp"
            >
            <el-row>
              <el-col style="width:auto">
                <el-avatar
                  class="avater-couse"
                  :size="90"
                  :src="require('@/assets/images/profile.jpg')"
                />
              </el-col>
              <el-col :span="8">
                <div
                  style="
                    font-size: 15px;
                    font-weight: bold;
                    color: rgb(51, 51, 51);
                    width: 85px;
                    text-align: center;
                    margin-top: 20px;
                  "
                >
                  {{ student.name }}
                </div>
              </el-col>
              <el-col :span="6" style="width:auto">
                <div
                  style="
                    border-radius: 10px;
                    background: rgb(188 108 66 / 10%);
                      
                    text-align: center;
                    padding: 10px;
                  "
                >
                  <div
                    style="font-size: 14px; font-weight: 300; color: #52575d"
                  >
                    Avg. Score 
                  </div>
                  <div
                    style="
                      color: #000000;
                      opacity: 0.8;
                      font-size: 44px;
                      font-weight: 500;
                    "
                  >
                    {{ getAvg(student) }}
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <!-- <el-pagination
        @current-change="currentPage"
        @size-change="sizeChange"
        @prev-click="previousClick"
        @next-click="nextClick"
        background
        layout="prev, pager, next"
        style="text-align: center;margin-top:15px"
        :total="50"
      >
      </el-pagination> -->
      <es-pagination :total="total" @pagination="pagination"></es-pagination>
    </div>
  </div>
</template>
<script>
import { dispatchGraphql, dispatchGraphqlQueryByPk }  from  '@/api/dispatcher'
import esPagination from '@/studentControl/esPagination'
export default {
  components: { esPagination },
  data: () => ({
    exams: [],
    student: {},
    students: [],
    stand: [],
    standard: {},
    subject: {},
    limit: 10,
    offset: 0,
    total: 0
  }), 
  created() {
    this.getStandards()
    this.getExams()
  },
  methods: {
    getAvg(student) {
      const avg = student.marks / (student.examCount * 10)
      return avg
    },
    getStandards() {
      dispatchGraphqlQueryByPk('standards', ['id', 'name'], { id: this.$route.params.standardId }).then((response) => {
        this.standard = response.standards_by_pk
        dispatchGraphqlQueryByPk('subjects', ['id', 'name'], { id: this.$route.params.subjectId }).then((response) => {
          this.subject = response.subjects_by_pk
        })
      })
    },
    getExams() {
      const query =`query($limit: Int, $offset: Int, $standId: uuid!, $subId: uuid!) {
        exams (limit: $limit, offset: $offset, where: {_and: [{standard_id: {_eq: $standId}}, {subject_id: {_eq: $subId}}]}) {
          name
          exam_report {
            id
            marks
            student_id
            student {
              status
              first_name
            }
          }
        }
        exams_aggregate (limit: $limit, offset: $offset, where: {_and: [{standard_id: {_eq: $standId}}, {subject_id: {_eq: $subId}}]}) {
          aggregate {
            count
          }
        } 
      }`
      dispatchGraphql(query,this.getVariables()).then((response) => {
        this.exams = response.exams
        console.log("hhhhhhhhhh", this.exams)
        // this.total = this.exams.length
        this.total = response.exams_aggregate.aggregate.count
        this.students = []
        for(const item of this.exams) {
          if(item.exam_report.length > 0) {
            for(const result of  item.exam_report) {
              this.student = {}
              this.student.name = result.student.first_name
              this.student.marks = result.marks
              this.student.examCount = 1
              this.student.id = result.student_id
              this.student.status = result.student.status
              if(this.students.length === 0) {
                this.students.push(this.student)
                console.log("students array", this.students)
              }
              else {
                const studentexists = this.students.some(obj => obj.id === this.student.id)
                if(studentexists) {
                  for (const item of this.students) {
                    if(item.id === this.student.id) {
                      item.marks = item.marks + this.student.marks
                      item.examCount  = this.student.examCount + 1
                    }
                  }
                }
                else {
                  this.students.push(this.student)
                }
              }
            }
          }
        }
        console.log(" unique students", this.students)
      })
    },
    getVariables() {
      return {
        "standId": this.$route.params.standardId,
        "subId": this.$route.params.subjectId,
        "limit": this.limit,
        "offset": this.offset
      }
    },
    pagination: function(object) {
      this.limit = object.limit
      this.offset = object.limit * (object.page - 1)
      this.getExams(this.limit, this.offset)
    },
    // currentPage(i) {
    //   this.emitPager(i);
    // },
    // nextClick() {
    //   this.pageEvent = "NextClick";
    // },
    // previousClick() {
    //   this.pageEvent = "PreviousClick";
    // },
    // sizeChange(i) {
    //   this.pageEvent = "SizeChanged";
    //   console.log(i);
    // },
  },
};
</script>

<style scoped>
.searchCard {
  background: rgb(255, 255, 255);
  height: 80px;
  padding: 30px 15px 30px 15px;
  margin: 20px 0px 20px 0px;
}
</style>
