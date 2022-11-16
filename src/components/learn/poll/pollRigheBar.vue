<template>
  <div class="form-right-bar">
    <right-side-bar :show="show" @onClose="__onCancel">
      
      <formBarHeader
        :title="rightBarData.name"
        :Audience="rightBarData.result_audience ? rightBarData.result_audience.length : 0"
        :Submitted="getSubmitted(rightBarData.result_audience)"
        :datecreated="getDate(rightBarData.created_at)"
        :duedate="getDate(rightBarData.due_date)"
      />
      <div style="display: flex">
        <div style="color: rgb(77, 79, 92);background: rgb(252, 223, 189);width: 26rem;padding: 7px 0;text-align: center;">
          Yes<br/>{{ setOption(rightBarData.result_audience, 'Yes') }}
        </div>
        <div style="background: rgb(188, 108, 66);padding: 7px 0px;width: 26rem;text-align: center;color:white;">
          No<br/>{{ setOption(rightBarData.result_audience, 'No') }}
        </div>
      </div>
      <div style="background: #e6eaed; height: 35vh; overflow: auto">
        <div style="display: flex;justify-content: space-between;padding-right: 29px;margin-top: 10px;">
          <div style="padding: 0px 15px 0px 21px;font-size: 20px;font-weight: 400;">
            Submissions
          </div>

          <img style="height: 36px" src="@/assets/icons/svg/download-icon.png" alt="" />
        </div>

        <el-tabs class="floatTabHeader" style="margin-left: 20px !important; margin-top: 60px !important" v-model="activeList">
          <el-tab-pane label="Submitted" @click="getSubmitcount(this.rightBarData.result_audience)" name="activeone">
            <div style="display: flex; margin: 0px; flex-wrap: wrap; justify-content: space-evenly;" >
              <div v-for="i in submitedData" :key="i" style="width: 151px;height: 124px;border-radius: 4px;background: white;margin-bottom:10px;">
                <div style="opacity: 0.8;font-weight: 600;font-size: 15px;text-align: center;padding: 0 26px;padding-top: 16px;">
                  {{i.user.first_name}}
                </div>
                <button style="padding: 3px 8px;background:white;border-radius: 13px;border: 1px solid #bc6c42;display: block;margin: auto;margin-top: 14px;color: #bc6c42;font-size: 13px;">
                  Guardian
                </button>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Not-Submitted" name="activetwo">  
            <div style="display: flex; margin: 0px; flex-wrap: wrap; justify-content: space-evenly;" >
              <div v-for="i in submitedData" :key="i" style="width: 151px;height: 124px;border-radius: 4px;background: white;margin-bottom:10px;">
                <div style="opacity: 0.8;font-weight: 600;font-size: 15px;text-align: center;padding: 0 26px;padding-top: 16px;">
                  {{i.user.first_name}}
                </div>
                <button style="padding: 3px 8px;background:white;border-radius: 13px;border: 1px solid #bc6c42;display: block;margin: auto;margin-top: 14px;color: #bc6c42;font-size: 13px;">
                  Guardian
                </button>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </right-side-bar>
  </div>
</template>
<script>
import RightSideBar from "@/components/school/rightSideBar.vue";
import moment from 'moment'
import _ from 'lodash'

export default {
  components: { RightSideBar },
  props: {
    show: { type: Boolean, default: false },
    __onCancel: Function,
    rightBarData: {
      type: Object
    }
  },
  data: () => ({
    activeList: "activeone",
    submited: [],
    unsubmited: [],
    submitedData: []
  }),
  watch: {
    activeList: _.debounce(function() {
      if (this.activeList === 'activeone') {
        this.submitedData = []
        this.submitedData = this.rightBarData.result_audience.filter(x => x.status == "SUBMITTED")
        // this.submitedData = this.submited
        console.log('fghdfjkgdfklgjdf', this.submitedData)
      } else {
        this.submitedData = []
        this.submitedData = this.rightBarData.result_audience.filter(x => x.status == "ASSIGNED")
        // this.submitedData = this.unsubmited
      }
    })
  },
  created() {
    // console.log("forms33333333", this.rightBarData)
    this.getSubmitcount(this.rightBarData.result_audience)
  },
  methods: {
    setOption(audience, option) {
      let usersCount = 0
      let YesCount = 0
      let NoCount = 0
      const submissions = audience.filter(x => x.status == 'SUBMITTED')
      for (const submission of submissions) {
        if (submission.answers.length > 0) {
          usersCount ++
          const answers = submission.answers.filter(x => x.answer === 'Yes')
          if (answers.length > 0) {
            YesCount ++
          } else {
            NoCount ++
          }
        }
      }
      if (option === 'Yes') {
        return YesCount > 0 ? (YesCount / usersCount) * 100 : 0 + ' %'
      } else if (option === 'No') {
        return NoCount > 0 ? (NoCount / usersCount) * 100 : 0 + ' %'
      }
    },
    getSubmitted(data) {
      const submissions = data.filter(x => x.status == 'SUBMITTED')
      return submissions.length
    },
    getSubmitcount(data) {
      if (data) {
        console.log(data)
        // this.submited = []
        for (const txt of data) {
          if (txt.status === 'ASSIGNED') {
            this.submited.push(txt)
            console.log('submited', this.submited)
          } else {
            this.unsubmited.push(txt)
            console.log('unsubmited', this.unsubmited)
          }
        }
      }
      return 0
    },
    getDate(date) {
      // console.log('date', moment(date).format('DD MMM yyyy'))
      return moment(date).format('DD MMM yyyy')
    },
  }
};
</script>

<style>
.form-right-bar .el-tabs__header {
  border-bottom: 1px solid #fcdfbd !important;
}
.form-right-bar .floatTabHeader.el-tabs.el-tabs--top > .el-tabs__header {
  position: inherit !important;
}
</style>
