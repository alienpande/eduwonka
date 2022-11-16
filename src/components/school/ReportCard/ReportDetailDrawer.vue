<template>
  <right-side-bar :show="show" @onClose="__onClose" >
    <div>
      <div class="mg-x-40 mg-10" >
        <div class="tx-bold" style="width: 75%">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </div>
        <e-img-name
          :src="require('@/assets/images/profile.jpg')"
          :name="exam.users.first_name"
          class="mg-y-20"
        />
        <div
          class="row rounded-08 justify-content-center pd-20 mg-y-20"
          style="background: rgba(252, 223, 189, 0.35)"
        >
          <div class="col-5 tx-14 mg-y-10">
            Report Generated
            <div class="tx-bold tx-14">10th August 2020</div>
          </div>
          <div class="col-4 tx-14 mg-y-10">
            Students
            <div class="tx-bold tx-14">{{ exam.exam_report.length }}</div>
          </div>
          <div class="col-5 tx-14 mg-y-10">
            Due Date
            <div class="tx-bold tx-14">10th July 2020</div>
          </div>
          <div class="col-4 tx-14 mg-y-10">
            Subject
            <div class="tx-bold tx-14">{{exam.subject.name}}</div>
          </div>
        </div>
      </div>
      <div class="bg-ui-03 pd-10" style="background: #e6eaed">
        <div class="d-flex justify-content-between wd-100p mg-x-30">
          <div stlye="color:rgba(0,0,0,0.8);font-weight: 600;">Students</div>
          <el-button :span="3" icon="el-icon-download" circle />
        </div>
        <el-tabs class="mg-t-0 pd-x-30" v-model="activeName">
          <el-tab-pane
            class="mg-0 sb-section__2 "
            label="Signed"
            name="signed"
          >
          <div v-if="examReport">
            <el-card class="rounded-08 mg-b-20" v-for="(d, i) in examReport" :key="i">
              <div
                class="d-flex justify-content-betweem wd-100p cp"
                @click="$go($url.SH_REPORT_DETAIL + '/' + d.student.id + '/' + exam.id)"
              >
                <div class="wd-70p">
                  <e-img-name
                    :src="require('@/assets/images/profile.jpg')"
                    :name="d.student.first_name"
                    nameStyle="color:#4D4F5C;font-weight:500;"
                  />
                </div>
                <div class="mark-container text-center wd-30p tx-bold">
                  {{d.marks }}%
                </div>
              </div>
            </el-card>
          </div>
          </el-tab-pane>
          <el-tab-pane
            label="Not Signed"
            name="unsigned"
            class="sb-section__2"
          >
          <div v-if="examReport">
            <el-card class="rounded-08 mg-b-20" v-for="(d, i) in examReport" :key="i">
              <div
                class="d-flex justify-content-betweem wd-100p cp"
                @click="$go($url.SH_REPORT_DETAIL + '/' + d.student.first_name)"
              >
                <div class="wd-70p">
                  <e-img-name
                    :src="require('@/assets/images/profile.jpg')"
                    :name="d.student.first_name"
                  />
                </div>
                <div class="mark-container text-center wd-30p tx-bold">{{d.marks}}%</div>
              </div>
            </el-card>
          </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </right-side-bar>
</template>

<script>
import EImgName from "@/controls/table/eImgName.vue";
import RightSideBar from "../rightSideBar.vue";
import { dispatchGraphql } from '@/api/dispatcher'
import _ from 'lodash'
export default {
  components: { RightSideBar, EImgName },
  props: {
    show: { type: Boolean, default: false },
    __onClose: Function,
    exam: {
      type: Object
    }
  },
  data() {
    return {
      examData: {},
      loading: false,
      activeName: "signed",
      examReport: []
    };
  },
  watch: {
    activeName: _.debounce(function() {
      if (this.activeName === 'signed') {
        this.examReport = null
        this.setup()
      } else {
        this.examReport =  null
        this.setup()
      }
    })
  },
  methods: {
    setup() {
      this.loading = true
      const query = `query($status: String, $examId: uuid) {
        exam_results(where: {_and: [{status: {_eq: $status}}, {exam_id: {_eq:$examId}}]}) {
          id
          marks
          status
          student {
            id
            first_name
          }
        }
      }`
      dispatchGraphql(query, { status: this.activeName, examId: this.exam.id }).then((response) => {
        console.log("show", response)
        this.examReport = response.exam_results
        this.loading = false
      })
    }
  },
  created() {
    console.log('test',this.exam)
    if (this.exam) {
      this.setup()
    }
  },
};
</script>

<style>
.mark-container {
  background: rgba(188, 108, 66, 0.35);
  border-radius: 12px;
  vertical-align: middle;
  line-height: 46px;
  color: rgb(188, 108, 66);
}
.sb-section__2 {
  height: 400px;
  overflow-y: scroll;
  padding-bottom: 350px;
}
@media screen and (min-height: 1000px) {
  .sb-section__2 {
    height: 350px;
  }
}
</style>