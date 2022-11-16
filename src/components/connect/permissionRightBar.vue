<template>
  <right-side-bar :show="show" @onClose="__onCancel">
    <div class="assign-right">
      <div style="width: 321px" class="heading">
        {{ slip.name }}
      </div>
      <hr style="opacity: 0.2" />
      <div style="padding: 10px 30px">
        <el-row>
          <el-col :span="6">
            <el-avatar :size="98" :src="require('@/assets/images/profile.jpg')" />
          </el-col>
          <el-col :span="16" :offset="2">
            <div style="margin-top: 40px" class="heading">{{ slip.user ? slip.user.first_name : '' }}</div>
          </el-col>
        </el-row>
      </div>
      <div class="sb-section__2">
        <div class="pd-x-30 pd-10 pd-b-30">
          <el-card shadow="none" style="background: rgba(248, 243, 238, 0.35)" class="rounded-08 text-center classroom-right__slide">
            <el-row style="opacity: 0.8">
              <el-col :span="12" style="border-bottom: 2px solid #fcdfbd; padding: 10px">
                <span>Signed</span> <br />
                <span style="color: rgb(0, 0, 0); font-weight: bold">{{ setSigned(slip) }}</span>
              </el-col>
              <el-col style="border-right: 2px solid #fcdfbd; padding: 10px" :span="12">
                <span>Total Strength</span> <br />
                <span style="color: rgb(0, 0, 0); font-weight: bold">{{ slip.audience ? slip.audience.length : 0 }}</span>
              </el-col>
              <el-col style="padding-top: 10px" :span="24">
                <span>Due date</span> <br />
                <span style="color: rgb(0, 0, 0); font-weight: bold">{{ getDate(slip.due_date) }}</span>
              </el-col>
            </el-row>
          </el-card>
        </div>
        <div style="background: #e6eaed">
          <div style="padding: 15px 15px 10px 21px;font-size: 20px;font-weight: 400;">
            Status
          </div>
          <el-tabs class="floatTabHeader" style="margin-left: 20px !important; margin-top: 60px !important" v-model="activeList">
            <el-tab-pane label="Signed" name="signed">
              <div style="display: flex; margin: 0px 0" v-for="i in audience" :key="i">
                <div class="classrom-corsol" style="box-shadow: 0px 13px 21px #00000026">
                  <div class="text-corsol">{{ i.user.first_name }}</div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="Pending" name="ASSIGNED">
              <div style="display: flex; margin: 0px 0" v-for="i in audience" :key="i">
                <div class="classrom-corsol" style="box-shadow: 0px 13px 21px #00000026">
                  <div class="text-corsol">{{ i.user.first_name }}</div>
                  <div class="marks" @click="update(i)">Sign</div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </right-side-bar>
</template>
<script>
import RightSideBar from "@/components/school/rightSideBar.vue"
import { dispatchGraphql } from '@/api/dispatcher'
import moment from "moment"
import _ from 'lodash'
export default {
  components: { RightSideBar },
  props: {
    show: { type: Boolean, default: false },
    __onCancel: Function,
    slip: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    activeList: "signed",
    audience: []
  }),
  watch: {
    activeList: _.debounce(function() {
      this.setAudience()
    })
  },
  created() {
    this.setAudience()
  },
  methods: {
    update(val) {
      const mutation = `mutation($id: uuid!) {
        update_audiences_by_pk(pk_columns: {id: $id}, _set: {status: "signed"}) {
          id
        }
      }`
      dispatchGraphql(mutation, { id: val.id }).then((response) => {
        console.log(response)
        this.setAudience()
      })
    },
    setAudience() {
      if (this.slip.audience) {
        this.audience = this.slip.audience.filter(x => x.status === this.activeList)
      }
    },
    getDate(date) {
      return moment(date).format("DD MMM, YYYY")
    },
    setSigned(slip) {
      if (slip.audience) {
        return slip.audience.filter(x => x.status === 'signed').length
      }
      return ''
    }
  }
};
</script>
<style>
.sb-section__2 {
  height: 400px;
  overflow-y: scroll;
  padding-bottom: 200px;
}
.assign-right .el-tabs__header {
  border-bottom: 1px solid #fcdfbd !important;
}
.assign-right .floatTabHeader.el-tabs.el-tabs--top > .el-tabs__header {
  position: inherit !important;
}

.classrom-corsol {
  display: flex;
  justify-content: space-between;
  border: 1px solid #fcdfbd;
  border-radius: 8px;
  padding: 9px;
  margin-bottom: 12px;
  background: white;
  width: 21rem;
  margin-bottom: 20px;
  box-shadow: 0px 13px 21px #00000026;
}
.text-corsol {
  color: #4d4f5c;
  font-size: 16px;
  padding: 5px 10px;
}
.marks {
  width: 90px;
  border-radius: 5px;
  color: #bc6c42;
  opacity: 0.8;
  font-size: 18px;
  background: white;
  text-align: center;
  padding: 6px 0;
  font-weight: 500;
  border: 1px solid #fcdfbd;
  cursor: pointer;
  background: #bc6c42 !important;
  color: white !important;
}
</style>
