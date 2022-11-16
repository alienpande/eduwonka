<template>
  <div>
    <e-container pageTitle="Report">
      <el-tabs class="floatTabHeader" v-model="activeName">
        <el-tab-pane label="Genrated" name="genrated">
          <el-row class="mt-10" :span="24">
            <el-col :span="4" class="exams-color">{{ exams.length }} Exams </el-col>
            <el-col class="float-right" :span="2">
              <e-button
                class="mt-5"
                size="mini"
                icon="el-icon-sort"
                :plain="true"
                type="primary"
              ></e-button>
            </el-col>
            <el-col class="float-right" :span="3">
              <!-- <e-dropdown :list="filterSubject" primary /> -->
              <el-dropdown >
              <span class="el-dropdown-link" primary>
                Standard<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="item in standards" :key="item.id" :command="item.id">{{ item.name }}</el-dropdown-item>
              </el-dropdown-menu>
              </el-dropdown>
            </el-col>
            <el-col class="float-right" :span="3">
              <!-- <e-dropdown :list="filterStandard" primary /> -->
              <el-dropdown >
              <span class="el-dropdown-link" primary>
                Subject<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="item in subjects" :key="item.id" :command="item.id">{{ item.name }}</el-dropdown-item>
              </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>

          <el-row style="flex" justify="center">
            <genrated-card
              :exams="exams"
              @getExam="showRightSide"
            />
            <!-- @__clicked="$go($url.SH_REPORT_DETAIL)" -->
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="Signed" name="signed"> </el-tab-pane>
      </el-tabs>
    </e-container>
    <report-detail-drawer
      v-if="hasExamdata"
      :show="showRightSideBar"
      :exam="exam"
      :__onClose="()=>(showRightSideBar = !showRightSideBar)"
    />
  </div>
</template>

<script>
import ReportDetailDrawer from "@/components/school/ReportCard/ReportDetailDrawer.vue";
import { dispatchGraphql } from '@/api/dispatcher'
import genratedCard from "@/components/school/ReportCard/GenratedCard.vue"
export default {
  components: {
    genratedCard,
    ReportDetailDrawer
  },
  data() {
    return {
      hasExamdata: false,
      showRightSideBar: false,
      activeName: "genrated",
      filterStandard: [
        { text: "Standard" },
        { text: "XII" },
        { text: "XI" },
        { text: "X" },
      ],
      subjects: [],
      standards: [],
      exams: [],
      exam: {},
      filterSubject: [{ text: "Subject" }, { text: "ECE" }, { text: "CSE" }],
      getExamsQuery: `query {
        exams {
          id 
          name
          exam_report {
            id
            marks
            status
            student {
              id
              first_name
            }
          }
          users {
            id
            first_name
          }
          exam_type {
            name
            id
          }
          standard {
            id
            name
          }
          subject {
            id 
            name
          }
        }
      }`,
      getStandardQuery: `query {
        standards {
          id
          name
        }
      }`,
      getSubjectQuery: `query {
        subjects {
          id
          name
        }
      }`,
    };
  },
  created() {
    this.getExams()
  },
  methods: {
    getExams(){
      dispatchGraphql(this.getExamsQuery).then((response) => {
        console.log("show", response);
        this.exams = response.exams;
      })
      dispatchGraphql(this.getStandardQuery).then((response) => {
        console.log("standards", response);
        this.standards = response.standards;
      })
      dispatchGraphql(this.getSubjectQuery).then((response) => {
        console.log("subjects", response);
        this.subjects = response.subjects;
      })
    },
    showRightSide(data) {
      this.exam = data
      if (this.exam) {
        this.hasExamdata = true
      }
      console.log('extam data', data)
      this.showRightSideBar = !this.showRightSideBar
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
</style>
