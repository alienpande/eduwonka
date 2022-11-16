<template>
  <div class="form-right-bar">
    <right-side-bar :show="show" @onClose="__onCancel">
      <formBarHeader :title="rightBarData.name" :Audience="rightBarData.result_audience.length" :Submitted="getSubmitted(rightBarData.result_audience)" :datecreated="getDate(rightBarData.created_at)" :duedate="getDate(rightBarData.due_date)" />
      <div style="background: #e6eaed; height: 35vh; overflow: auto">
        <div style="display: flex; justify-content: space-between; padding-right: 29px; margin-top: 10px;">
          <div style="padding: 0px 15px 0px 21px; font-size: 20px; font-weight: 400;">
            Submissions
          </div>
          <img style="height: 36px" src="@/assets/icons/svg/download-icon.png" alt="" />
        </div>

        <el-tabs class="floatTabHeader" style="margin-left: 20px !important; margin-top: 60px !important" v-model="activeList">
          <el-tab-pane label="Submitted" name="activeone">
            <div style="display: flex; margin: 0px; flex-wrap: wrap; justify-content: space-evenly;">
              <div v-for="(audience,i) in submitted" :key="i" style=" width: 151px; height: 124px; border-radius: 4px; background: white; margin-bottom:10px;">
                <div class="pointer" @click="$router.push($url.LN_FORM_SUBMISSION + `/audience/${audience.id}`)">
                  <div style="opacity: 0.8; font-weight: 600; font-size: 15px; text-align: center; padding: 0 26px; padding-top: 16px;">
                    {{ audience.user.first_name }}
                  </div>
                  <button style="padding: 3px 8px;background:white;border-radius: 13px;border: 1px solid #bc6c42;display: block;margin: auto;margin-top: 14px;color: #bc6c42;font-size: 13px;">
                    {{ audience.user.role }}
                  </button>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Not-Submitted" name="activetwo">
            <div style="display: flex; margin: 0px; flex-wrap: wrap; justify-content: space-evenly;">
              <div v-for="(audience,i) in non_submitted" :key="i" style=" width: 151px; height: 124px; border-radius: 4px; background: white; margin-bottom:10px;">
                <div style="opacity: 0.8; font-weight: 600; font-size: 15px; text-align: center; padding: 0 26px; padding-top: 16px;">
                  {{ audience.user.first_name }}
                </div>
                <button style="padding: 3px 8px;background:white;border-radius: 13px;border: 1px solid #bc6c42;display: block;margin: auto;margin-top: 14px;color: #bc6c42;font-size: 13px;">
                  {{ audience.user.role }}
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

export default {
  components: { RightSideBar },
  props: {
    rightBarData: {
      type: Object
    },
    show: { type: Boolean, default: false },
    __onCancel: Function,
  },
  data: () => ({
    activeList: "activeone",
    submitted: [],
    non_submitted: []
  }),
  created() {
    this.getAudience()
  },
  methods: {
    getAudience() {
      for (const item of this.rightBarData.result_audience) {
        if (item.status === 'ASSIGNED') {
          this.non_submitted.push(item)
        } else {
          this.submitted.push(item)
        }
      }
      // this.non_submitted = this.rightBarData.audience.filter(x => (x.resultable_id === '' || x.resultable_id === null))
    },
    getDate(date) {
      return moment(date).format('DD MMM yyyy')
    },
    getSubmitted(audience) {
      var count = 0
      for (const aud of audience) {
        if (aud.status === 'SUBMITTED') {
          count ++
        }
      }
      return count
    }
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
