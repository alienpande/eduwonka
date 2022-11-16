<template>
  <right-side-bar :show="show" @onClose="__onCancel">
    <div class="assign-right">
      <div>
        <div style="width: 321px;padding-left:2rem !important" class="heading">
          {{ assignment.name }}
        </div>
        <hr style="opacity: 0.2" />
        <div style="padding: 10px 30px">
          <el-row>
            <el-col :span="10">
              <el-avatar :size="98" :src="require('@/assets/images/profile.jpg')" />
            </el-col>
            <el-col :span="4" style="width:auto">
              <div style="margin-top: 20px" class="heading">
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="sb-section__2">
          <div class="pd-x-30 pd-10 pd-b-30">
            <el-card shadow="none" style="background: rgba(248, 243, 238, 0.35)" class="rounded-08 text-center classroom-right__slide">
              <el-row style="opacity: 0.8">
                <el-col :span="12" style="border-right: 2px solid #fcdfbd;border-bottom: 2px solid #fcdfbd;padding: 10px;">
                  <span>Standard</span> <br />
                  <span style="color: rgb(0, 0, 0); font-weight: bold">{{ standard }}</span>
                </el-col>
                <el-col :span="12" style="border-bottom: 2px solid #fcdfbd; padding: 10px">
                  <span>Subject</span> <br />
                  <span style="color: rgb(0, 0, 0); font-weight: bold">{{ subject }}</span>
                </el-col>
                <el-col style="border-right: 2px solid #fcdfbd; padding: 10px" :span="12">
                  <span>Attendance</span> <br />
                  <span style="color: rgb(0, 0, 0); font-weight: bold">{{ assignment.submissions.length }} / {{ audience.length }}</span>
                </el-col>
                <el-col style="padding-top: 10px" :span="12">
                  <span>Time left</span> <br />
                  <span style="color: rgb(0, 0, 0); font-weight: bold">{{ getTimeLeft(this.getDueDate(assignment.due_date), presentDate) }}</span>
                </el-col>
              </el-row>
            </el-card>
          </div>
          <div style="background: #e6eaed; margin-bottom: 100px">
            <div style="padding: 15px 15px 0px 21px;font-size: 20px;font-weight: 400;">
              About the assignment
            </div>
            <el-card shadow="none" style="margin: 10px 20px" class="rounded-08">
              <div style="opacity: 0.6">
                {{ assignment.description }}
              </div>
            </el-card>

            <div style="padding: 15px 15px 0px 21px;font-size: 20px;font-weight: 400;">
              Attachments
            </div>

            <div style="display: flex;flex-wrap: wrap;justify-content: space-between;padding: 0 26px;">
              <div v-for="i in 3" :key="i" style="display: flex;margin-top:5px;background: white;padding: 10px 15px;width: fit-content;border: 1px solid #000000;border-radius: 10px;">
                <e-svg icon="Attachment-icon"></e-svg>
                <div style="opacity: 0.8; margin-left: 10px" class="fs-16">
                  Study data.pdf
                </div>
              </div>
            </div>

            <div style="display: flex;justify-content: space-between;padding-right: 29px;;margin-top:10px">
              <div style="padding: 0px 15px 0px 21px;font-size: 20px;font-weight: 400;">
                Submissions
              </div>

              <img style="height: 36px" src="@/assets/icons/svg/download-icon.png" alt="" />
            </div>

            <el-tabs class="floatTabHeader" style="margin-left: 20px !important; margin-top: 60px !important" v-model="activeList">
              <el-tab-pane label="Submitted" name="activeone">
                <div style="display: flex; margin: 0px 0" v-for="item in finished" :key="item.id">
                  <div v-if="item" class="classrom-corsol">
                    <div class="text-corsol">{{ item.name }}</div>
                    <div @click="$router.push($url.LN_ASSIGNMENTS_DETAILS + '/' + item.id)" class="marks">View</div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="Not-Submitted" name="activetwo">
                <div style="display: flex; margin: 0px 0" v-for="item in unfinished"  :key="item.id">
                  <div v-if="item" class="classrom-corsol">
                    <div class="text-corsol">{{item.name}}</div>
                    <div @click="$router.push($url.LN_ASSIGNMENTS_DETAILS + '/' + item.id)" class="marks">View</div>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>
  </right-side-bar>
</template>
<script>
import RightSideBar from "@/components/school/rightSideBar.vue";
import {  dispatchGraphql } from "@/api/dispatcher";
import _ from "lodash";
import moment from 'moment'

export default {
  components: { RightSideBar },
  props: {
    show: { type: Boolean, default: false },
    __onCancel: Function,
    audience: {
      type: Array,
      default: []
    },
    standard: {
      type: String,
      default: ''
    },
    assignment: {
      type: Object,
      default: {}
    },
    subject: {
      type: String,
      default: ''
    },
    standardSubjectId: {
      type: String,
      default: null
    }
  },
  // created() {
  //   this.getTimeLeft(this.getDueDate(this.assignment.due_date), this.presentDate)
  // },
  data: () => ({
    users: [],
    activeList: "activeone",
    finished: [],
    unfinished: [],
    members: [],
    currentDate: moment(new Date()).format('DD-MM-YYYY'),
    presentDate: new Date().getTime(),
  }),
  watch: {
    activeList: _.debounce(function() {
      if (this.activeList == "activetwo") { 
        this.unfinished = []  
        console.log("unsubmitted", this.unfinished)
        this.getUsers(this.assignment.id, "pending")
      } 
      else {
        this.finished = []
        console.log("submitted", this.finished)
        this.getUsers(this.assignment.id, "completed")
        }
    }) 
  },
  methods: {
    getDueDate(date) {
      return new Date(date).getTime()
    },
    getUsers(id, status) {
      const userQuery =`query( $id:uuid!){
        audiences(where: {audienceable_id: {_eq: $id}}){
          status
          user{
            id
            first_name
          }  
        }
      }`
      dispatchGraphql(userQuery,  { id: id }).then((response) => {
        this.members = []
        response.audiences.map( x => {
          this.members.push({
            id: x.user.id,
            name: x.user.first_name,
            status: x.status
          })
        })
        console.log("members", this.members)
        for (const  item  of this.members) {
          if(item.status === status) {
            this.unfinished.push(item)
            console.log("unsub", this.unfinished)
          }
          else if(item.status === status) {
            this.finished.push(item)
            console.log("sub", this.finished)
          }
        }
      })
    },
    getTimeLeft(time1, time2) {
      console.log("time", time1, time2)
      let difference = time1 - time2
      let days = Math.floor(difference / (1000 * 60 * 60 * 24));
      let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((difference % (1000 * 60)) / 1000);
      if (time1 > time2) {
        return days + "d " + hours + "h "+ minutes + "m " + seconds + "s ";
      }
      else {
        return "Expired"
      }
    },
   }
};
</script>
<style>
.sb-section__2 {
  height: 49vh;
  overflow-y: scroll;
  /* padding-bottom: 200px; */
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
}
.classrom-corsol:hover {
  box-shadow: 0px 13px 21px #00000026;
}
.classrom-corsol:hover .marks {
  background: #bc6c42 !important;
  color: white !important;
}
</style>
