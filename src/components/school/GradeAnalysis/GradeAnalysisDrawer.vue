<template>
  <right-side-bar :show="show" @onClose="__onCancel" class="school-grade-analysis-drawer">
    <div>
      <div class="mg-x-40 mg-y-10 rounded-08 shadow-sm" style="overflow: hidden;border-bottom-right-radius: 8px;border-bottom-left-radius: 8px;">
        <div class="tx-bold" style="width: 75%">
          <e-img-name :src="require('@/assets/images/profile.jpg')" :name="user.first_name" class="mg-y-30" />
        </div>
        <div class="d-flex justify-content-between wd-100p">
          <div class="text-sm-muted">Class Rep
            <div class="drawer-heading__1">Class 3A</div>
          </div>
          <div class="text-sm-muted">Reports
            <div class="drawer-heading__1">28</div>
          </div>
          <div class="text-sm-muted">Performance
            <div class="drawer-heading__1">Excellence</div>
          </div>
        </div>
      </div>
      <div class="pd-x-30 pd-10 pd-b-30 sb-section__2" style="background:#E6EAED">
        <div class="tx-bold">Allocation</div>
        <el-card class="mg-b-20 mg-t-10 rounded-08 tx-bold" v-for="(item, i) in user.section_subject_teachers" :key="i">
          <div class="d-flex justify-content-between">
            <div>{{ item.section.standard.name + ' '  + item.section.name }}</div>
            <div class="" style="color:rgba(0,0,0,0.6)">{{ item.subject.name }}</div>
          </div>
        </el-card>
        <div class="tx-bold mg-y-10">Grade progress</div>
        <div class="d-flex justify-content-between bg-white rounded-08 pd-10">
          <drawer-chart v-if="user.id" :user="user" :standards="standards" />
          <div class="wd-60p-f mg-y-30 mg-x-20">
            <div>Best Performer<div class="tx-bold">{{ performers[0].standard }}</div></div>
            <div class="mg-y-20">Weak Performer<div class="tx-bold">{{ performers[performers.length - 1].standard }}</div></div>
          </div>
        </div>
      </div>
    </div>
  </right-side-bar>
</template>

<script>
import EImgName from "@/controls/table/eImgName.vue";
import RightSideBar from "../rightSideBar.vue";
import DrawerChart from "./DrawerChart.vue";
import { dispatchGraphql } from "@/api/dispatcher"
export default {
  components: { EImgName, RightSideBar, DrawerChart },
  props: {
    id: {
      type: String,
      default: ''
    },
    classes: {
      type: Array,
      default: () => []
    },
    show: { type: Boolean, default: false },
    __onCancel: Function,
  },
  data() {
    return {
      user: {},
      standards: [],
      performers: [],
    }
  },
  created() {
    if (this.id) {
      this.standards = this.classes
      this.getProfile()
      this.setPerformer()
    }
  },
  methods: {
    setPerformer() {
      var performers = []
      for (const standard of this.classes) {
        const userExams = standard.exams.filter(x => x.invigilator_id === this.id)
        if (userExams.length > 0) {
          let score = 0
          let total = 0
          for (const exam of userExams) {
            let marks = 0
            if (exam && exam.exam_report.length > 0) {
              for (const report of exam.exam_report) {
                if (report.marks) {
                  marks += parseInt(report.marks)
                }
              }
            }
            score += marks ? (marks / exam.exam_report.length) : 0
          }
          total = (score != 0 ? score / userExams.length : 0).toFixed(0)
          performers.push({ standard: standard.name, score: total })
        }
      }
      this.performers = performers.sort((a, b) => parseFloat(b.score) - parseFloat(a.score))
      console.log(this.performers, "performers")
    },
    getProfile() {
      console.log(this.id)
      const query = `query($id: uuid!) {
        users_by_pk(id: $id) {
          id
          first_name
          section_subject_teachers {
            id
            section {
              id
              name
              standard {
                id
                name
              }
            }
            subject {
              id
              name
            }
          }
        }
      }`
      dispatchGraphql(query, { id: this.id }).then((response) => {
        this.user = response.users_by_pk
        console.log(this.user, "user")
      })
    }
  }
}
</script>

<style>
.drawer-heading__1{
  font-size: 16px;
  font-weight: bold;
}
.sb-section__2 {
  height: 400px;
  overflow-y: scroll;
  padding-bottom: 200px;
}
@media screen and (min-height: 1000px) {
  .sb-section__2 {
    height: 600px;
  }
}
</style>