<template>
  <div>
    <e-container pageTitle="Grade analysis" class="school-grade-analysis">
      <div class="heading">Grade Performance</div>
      <el-row :gutter="3" class="view-no-form">
        <el-col :span="12" :sm="24" :md="12">
          <div class="bg-white rounded-left pd-20" style="min-height: 377px">
            <div class="d-flex justify-content-between">
              <div class="mg-t-10 tx-bold">Your class grade progress</div>
              <!-- <div>
                <e-select :options="[{ value: 'Exam Type' }]" title="Rasgu" />
              </div> -->
            </div>
            <class-grade-chart v-if="standards.length > 0" :standards="standards" />
          </div>
        </el-col>
        <el-col :span="12" :sm="24" :md="12">
          <div class="bg-white rounded-right pd-20" style="min-height: 377px">
            <div class="mg-t-10 tx-bold">Grading System</div>
            <div class="d-flex justify-content-center mg-y-15">
              <div class="text-right mg-r-5">90-100</div>
              <div class="mg-x-10 sm-width-60" style="color: #d3d3d3;white-space: nowrap; overflow: hidden;">
                ----------------------------
              </div>
              <div class="text-right">A+</div>
            </div>
            <div class="d-flex justify-content-center mg-y-15">
              <div class="text-right mg-r-5">80-90</div>
              <div class="mg-x-10 sm-width-60" style="color: #d3d3d3;white-space: nowrap; overflow: hidden;">
                ----------------------------
              </div>
              <div class="text-right">A</div>
            </div>
            <div class="d-flex justify-content-center mg-y-15">
              <div class="text-right mg-r-5">70-80</div>
              <div class="mg-x-10 sm-width-60" style="color: #d3d3d3;white-space: nowrap; overflow: hidden;">
                ----------------------------
              </div>
              <div class="text-right">B+</div>
            </div>
            <div class="d-flex justify-content-center mg-y-15">
              <div class="text-right mg-r-5">60-70</div>
              <div class="mg-x-10 sm-width-60" style="color: #d3d3d3;white-space: nowrap; overflow: hidden;">
                ----------------------------
              </div>
              <div class="text-right">B</div>
            </div>
            <div class="d-flex justify-content-center mg-y-15">
              <div class="text-right mg-r-5">50-60</div>
              <div class="mg-x-10 sm-width-60" style="color: #d3d3d3;white-space: nowrap; overflow: hidden;">
                ----------------------------
              </div>
              <div class="text-right">C</div>
            </div>
            <div class="d-flex justify-content-center mg-y-15">
              <div class="text-right mg-r-5">35-50</div>
              <div class="mg-x-10 sm-width-60" style="color: #d3d3d3;white-space: nowrap; overflow: hidden;">
                ----------------------------
              </div>
              <div class="text-right">D</div>
            </div>
            <div class="d-flex justify-content-center mg-y-15">
              <div class="text-right mg-r-5">0-35</div>
              <div class="mg-x-10 sm-width-60" style="color: #d3d3d3;white-space: nowrap; overflow: hidden;">
                ----------------------------
              </div>
              <div class="text-right">E</div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="school-grade-analysis view-no-form">
        <el-col :span="12" :sm="24" :md="12">
          <div class="heading" style="padding-left:1.5rem !important">Focus Area</div>
          <el-card class="mg-y-10 pd-y-12 rounded-08" body-style="padding:10px" shadow="none" v-for="(item, i) in getPerformances('focusAreas')" :key="i">
            <el-row>
              <el-col :span="6" class="text-center tx-bold mg-t-15 tx-14" style="color:#E60000">
                <i class="el-icon-d-arrow-right tx-bold tx-16" style="transform: rotate(90deg);"></i>
                {{ item.percentage }}%
              </el-col>
              <el-col :span="18" class="mg-t-15">
                <div class="focus-area__text">
                  {{ item.standard }} needs to be focused on {{ item.subject }} subject
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="12" :sm="24" :md="12">
          <div class="heading" style="padding-left:1.5rem !important">Top Teachers</div>
          <el-row :gutter="10">
            <el-col :span="12" class="mg-y-8" v-for="(item, i) in getPerformances('teachers')" :key="i">
              <el-card shadow="none" class="rounded-08 text-center pg-50 cp">
                <div @click="setTeacherProfile(item.id)">
                  <el-avatar :size="72" :src="require('@/assets/images/profile.jpg')" />
                  <div class="heading">{{ item.name }}</div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </e-container>
    <grade-analysis-drawer v-if="teacher_id" :id="teacher_id" :classes="standards" :show="showSideBar" :__onCancel="()=>showSideBar = !showSideBar" />
  </div>
</template>
<script>
import ClassGradeChart from '@/components/school/GradeAnalysis/ClassGradeChart.vue';
import GradeAnalysisDrawer from '@/components/school/GradeAnalysis/GradeAnalysisDrawer.vue';
import { dispatchGraphql } from "@/api/dispatcher"
import eSelect from "@/controls/eSelect.vue";
export default {
  components: { eSelect,  GradeAnalysisDrawer, ClassGradeChart },
  data() {
    return {
      showSideBar: false,
      standards: [],
      teacher_id: null,
    }
  },
  created() {
    this.getStandards()
  },
  methods: {
    getStandards() {
      const query = `query {
        standards {
          id
          name
          exams {
            id
            name
            invigilator_id
            subject {
              id
              name
            }
            invigilator {
              id
              first_name
            }
            exam_report {
              id
              marks
            }
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.standards = response.standards
      })
    },
    getPerformances(type) {
      var topTeachers = []
      var leastPerformedClasses = []
      for (const standard of this.standards) {
        for (const exam of standard.exams) {
          if (exam && exam.exam_report.length > 0) {
            let score = 0
            for (const report of exam.exam_report) {
              if (report.marks) {
                score += parseInt(report.marks)
              }
            }
            const total  = exam.exam_report.length * 100
            const percentage = (total ? (score / total) * 100 : 0).toFixed(0)
            if (percentage < 50) {
              leastPerformedClasses.push({
                standard: standard.name,
                subject: exam.subject.name,
                percentage: percentage,
              })
            } if (percentage > 80) {
              if (topTeachers.length > 0) {
                const teacher = topTeachers.find(t => t.id === exam.invigilator.id)
                if (teacher) {
                  continue
                } else {
                  topTeachers.push({
                    id: exam.invigilator.id,
                    name: exam.invigilator.first_name,
                    percentage: percentage,
                  })
                }
              } else {
                topTeachers.push({
                  id: exam.invigilator.id,
                  name: exam.invigilator.first_name,
                  percentage: percentage,
                })
              }
            }
          }
        }
      }
      if (leastPerformedClasses.length > 0 && type === 'focusAreas') {
        return leastPerformedClasses
      } else if (topTeachers.length > 0 && type === 'teachers') {
        return topTeachers
      }
      return ''
    },
    setTeacherProfile(id) {
      this.teacher_id = id
      this.showSideBar = true
    }
  }
}
</script>

<style>

@media only screen and (max-width:767px){
  .sm-width-60{
    width:60% !important;
  }
}

.focus-area__text {
  text-align: left;
  letter-spacing: 0px;
  color: rgba(0,0,0,0.6);
  font-weight: bold;
}
</style>