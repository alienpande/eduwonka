<template>
  <es-container btnIcon="downloadYellow" btnText="Download Date Sheet" class="bg-black-5">
    <div style="position: absolute;width: 10rem;top: 165px;border-bottom: 1px solid #f3f3f3;padding-bottom: 13px;">
      <es-select class="title-select select-icon" v-model="selectedType" :options="examTypes" :optionName="'label'" :valueKey="'value'" @visible-change="setType" />
    </div>
    <el-tabs v-if="selectedType" class="floatTabHeader studentTab" v-model="activeName">
      <el-tab-pane label="Upcoming" name="upcoming">
        <div v-if="upcoming.length > 0">
          <span class="text-white tx-14">Date Range for {{ getTerm(selectedType) }}: 02/04/2021 to 10/03/2022</span>
          <div v-for="(exam, i) in upcoming" :key="i" class="mg-t-25">
            <el-card class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
              <el-row>
                <el-col :span="6" :offset="1" class="d-flex">
                  <e-svg :style="'padding-top: 10px; padding-right: 15px'" icon="subject"></e-svg>
                  <div>
                    <div class="text-gray-6 tx-14">Subject</div>
                    <div class="sub-title tx-18 mg-t-4">{{ exam.subject.name }}</div>
                  </div>
                </el-col>
                <el-col :span="8" class="d-flex">
                  <e-svg :style="'padding-top: 10px; padding-right: 15px'" icon="calenderIcon"></e-svg>
                  <div>
                    <div class="text-gray-6 tx-14">Day & Date</div>
                    <div class="sub-title tx-18 mg-t-4">{{ getDate(exam.start_date) }}</div>
                  </div>
                </el-col>
                <el-col :span="8" :offset="1" class="d-flex">
                  <e-svg :style="'padding-top: 10px; padding-right: 15px'" icon="timer"></e-svg>
                  <div>
                    <div class="text-gray-6 tx-14">Time</div>
                    <div class="sub-title tx-18 mg-t-4">10:00am - 01:00pm</div>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </div>
        </div>
        <div v-else>
          <el-card class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
            <e-svg :style="'padding-top: 100px; padding-left: 512px'" icon="noData"></e-svg>
            <div>
              <div class="tx-20 sub-title d-flex justify-content-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ante ligula</div>
              <div class="tx-16 mg-t-15 text-gray-6 d-flex justify-content-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ante ligula</div>
            </div>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Completed" name="completed">
        <div v-if="completed.length > 0">
          <span class="text-white tx-14">Date Range for {{ getTerm(selectedType) }}: 02/04/2021 to 10/03/2022</span>
          <div v-for="(exam, i) in completed" :key="i" class="mg-t-25">
            <el-card class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
              <el-row>
                <el-col :span="6" :offset="1" class="d-flex">
                  <e-svg :style="'padding-top: 10px; padding-right: 15px'" icon="subject"></e-svg>
                  <div>
                    <div class="text-gray-6 tx-14">Subject</div>
                    <div class="sub-title tx-18 mg-t-4">{{ exam.subject.name }}</div>
                  </div>
                </el-col>
                <el-col :span="8" class="d-flex">
                  <e-svg :style="'padding-top: 10px; padding-right: 15px'" icon="calenderIcon"></e-svg>
                  <div>
                    <div class="text-gray-6 tx-14">Day & Date</div>
                    <div class="sub-title tx-18 mg-t-4">{{ getDate(exam.start_date) }}</div>
                  </div>
                </el-col>
                <el-col :span="8" :offset="1" class="d-flex">
                  <e-svg :style="'padding-top: 10px; padding-right: 15px'" icon="timer"></e-svg>
                  <div>
                    <div class="text-gray-6 tx-14">Time</div>
                    <div class="sub-title tx-18 mg-t-4">10:00am - 01:00pm</div>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </div>
        </div>
        <div v-else>
          <el-card class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
            <e-svg :style="'padding-top: 100px; padding-left: 512px'" icon="noData"></e-svg>
            <div>
              <div class="tx-20 sub-title d-flex justify-content-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ante ligula</div>
              <div class="tx-16 mg-t-15 text-gray-6 d-flex justify-content-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ante ligula</div>
            </div>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Graded" name="graded">
        <div v-if="graded.length > 0">
          <span class="text-white tx-14">Date Range for {{ getTerm(selectedType) }}: 02/04/2021 to 10/03/2022</span>
          <br><br>
          <div v-for="(exam, i) in graded" :key="i" class="pd-15">
            <el-card class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
              <el-row>
                <el-col :span="4" class="d-flex">
                  <e-svg :style="'padding-top: 10px; padding-right: 15px'" icon="subject"></e-svg>
                  <div>
                    <div class="text-gray-6 tx-14">Subject</div>
                    <div class="sub-title tx-18 mg-t-4">{{ exam.subject.name }}</div>
                  </div>
                </el-col>
                <el-col :span="6" class="d-flex">
                  <e-svg :style="'padding-top: 10px; padding-right: 15px'" icon="calenderIcon"></e-svg>
                  <div>
                    <div class="text-gray-6 tx-14">Day & Date</div>
                    <div class="sub-title tx-18 mg-t-4">{{ getDate(exam.start_date) }}</div>
                  </div>
                </el-col>
                <el-col :span="6" class="d-flex">
                  <e-svg :style="'padding-top: 10px; padding-right: 15px'" icon="timer"></e-svg>
                  <div>
                    <div class="text-gray-6 tx-14">Time</div>
                    <div class="sub-title tx-18 mg-t-4">10:00am - 01:00pm</div>
                  </div>
                </el-col>
                <el-col :span="4" class="d-flex">
                  <e-svg :style="'padding-top: 10px; padding-right: 15px'" icon="timer"></e-svg>
                  <div>
                    <div class="text-gray-6 tx-14">Marks Obtained</div>
                    <div class="sub-title tx-18  mg-t-4">{{ getScore(exam.exam_report) }}/100</div>
                  </div>
                </el-col>
                <el-col :span="4" class="d-flex">
                  <es-button class="pd-10" text="View Answersheet" />
                </el-col>
              </el-row>
            </el-card>
          </div>
        </div>
        <div v-else>
          <el-card class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
            <e-svg :style="'padding-top: 100px; padding-left: 512px'" icon="noData"></e-svg>
            <div>
              <div class="tx-20 sub-title d-flex justify-content-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ante ligula</div>
              <div class="tx-16 mg-t-15 text-gray-6 d-flex justify-content-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ante ligula</div>
            </div>
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div v-else>
      <el-card class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
        <e-svg :style="'padding-top: 100px; padding-left: 512px'" icon="noData"></e-svg>
        <div>
          <div class="tx-20 sub-title d-flex justify-content-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ante ligula</div>
          <div class="tx-16 mg-t-15 text-gray-6 d-flex justify-content-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ante ligula</div>
        </div>
      </el-card>
    </div>
  </es-container>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher"
import { getId } from '@/util/auth'
import moment from 'moment'
export default {
  data() {
    return {
      activeName: "upcoming",
      selectedType: "",
      standardId: '',
      examType: '',
      examTypes: [],
      upcoming: [],
      completed: [],
      graded: [],
    }
  },
  created() {
    this.getUser()
    this.getTypes()
  },
  methods: {
    getScore(data) {
      const report = data.filter(x => x.student_id === getId())[0]
      return report ? report.marks : 0
    },
    getDate(date) {
      return moment(date || new Date()).format('dddd') + ', ' + moment(date || new Date()).format('DD MMM YYYY')
    },
    setType(value) {
      this.examType = value
      this.upcoming = []
      this.completed = []
      this.graded = []
      this.getExams()
    },
    getTerm(val) {
      return this.examTypes.filter(x => x.value === val)[0].label
    },
    getVariables() {
      return {
        "subjectId": this.$route.params.subjectId,
        "standId": this.standardId,
        "typeId": this.examType
      }
    },
    getExams() {
      const query = `query($standId: uuid, $subjectId: uuid, $typeId: uuid) {
        exams(where: {_and: [{standard_id: {_eq: $standId}}, {subject_id: {_eq: $subjectId}}, {exam_type_id: {_eq: $typeId}}]}) {
          id
          name
          start_date
          subject {
            id
            name
          }
          exam_report {
            id
            student_id
            marks
            status
          }
        }
      }`
      dispatchGraphql(query, this.getVariables()).then((response) => {
        const currentDate = moment(new Date()).format('yyyy-MM-DD')
        for (const exam of response.exams) {
          if (exam.exam_report.length > 0) {
            if (!exam.exam_report[0].marks) {
              this.completed.push(exam)
            } else if (exam.exam_report[0].marks) {
              this.graded.push(exam)
            }
          } else {
            if (moment(exam.start_date).format('yyyy-MM-DD') > currentDate) {
              this.upcoming.push(exam)
            } else {
              this.completed.push(exam)
            }
          }
        }
      })
    },
    getTypes() {
      const query = `query {
        exam_types {
          id
          name
        }
      }`
      dispatchGraphql(query).then((response) => {
        for (const item of response.exam_types) {
          this.examTypes.push({ value: item.id, label: item.name })
        }
      })
    },
    getUser() {
      const query = `query {
        users_by_pk(id: "${getId()}") {
          id
          section {
            id
            standard {
              id
            }
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.standardId = response.users_by_pk.section.standard.id
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
