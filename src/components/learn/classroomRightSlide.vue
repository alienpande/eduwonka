<template>
  <right-side-bar :show="show" @onClose="__onCancel">
    <div>
      <div style="width: 321px;padding-left: 2rem !important;" class="heading">
        {{rightBarData.name}}
      </div>
      <hr style="opacity: 0.2" />
      <div style="padding:10px 30px">
        <el-row>
          <el-col :span="8">
            <el-avatar
              :size="98"
              :src="require('@/assets/images/profile.jpg')"
            />
          </el-col>
          <el-col :span="4" style="width:auto">
            <div style="margin-top: 20px" class="heading">{{rightBarData.time_table.teacher.first_name}}</div>
          </el-col>
        </el-row>
      </div>
      <div class="sb-section__2">
        <div class="pd-x-30 pd-10 pd-b-30">
          <el-card
            shadow="none"
            style="background: rgba(248, 243, 238, 0.35); "
            class="rounded-08 text-center classroom-right__slide"
          >
            <el-row style="opacity: 0.8">
              <el-col
                :span="12"
                style="
                  border-right: 2px solid #fcdfbd;
                  border-bottom: 2px solid #fcdfbd;
                  padding: 10px;
                "
              >
                <span>Standard</span> <br />
                <span style="color: rgb(0, 0, 0); font-weight: bold"
                  >{{rightBarData.time_table.standard.name}}</span
                >
              </el-col>
              <el-col
                :span="12"
                style="border-bottom: 2px solid #fcdfbd; padding: 10px"
              >
                <span>Subject</span> <br />
                <span style="color: rgb(0, 0, 0); font-weight: bold"
                  >{{rightBarData.time_table.subject.name}}</span
                >
              </el-col>
              <el-col
                style="border-right: 2px solid #fcdfbd; padding: 10px"
                :span="12"
              >
                <span>Attendance</span> <br />
                <span style="color: rgb(0, 0, 0); font-weight: bold"
                  >31/45</span
                >
              </el-col>
              <el-col style="padding-top: 10px" :span="12">
                <span>Time left</span> <br />
                <span style="color: rgb(0, 0, 0); font-weight: bold"
                  >15m 20s</span
                >
              </el-col>
            </el-row>
          </el-card>
        </div>
        <div style="background: #e6eaed; margin-bottom: 100px">
          <div
            style="
              padding: 15px 15px 0px 21px;
              font-size: 20px;
              font-weight: 400;
            "
          >
            Sub-topics covered
          </div>
          <el-card shadow="none" style="margin: 20px" class="rounded-08">
            <div
              class="d-flex"
              style="margin-top: 20px"
              v-for="i in topicsData[0].sub_topics"
              :key="i"
            >
              <div style="display: flex; margin-bottom: 13px">
                <e-svg
                  style="
                    display: inline-block;
                    margin-top: 8px;
                    margin-right: 8px;
                  "
                  icon="Pointer"
                />
                <div style="font-size: 14px; opacity: 0.6">
                  {{i.name}}
                </div>
              </div>
            </div>
            <!-- <div style="display: flex; margin-bottom: 13px">
              <e-svg
                style="
                  display: inline-block;
                  margin-top: 8px;
                  margin-right: 8px;
                "
                icon="Pointer"
              />
              <div style="font-size: 14px; opacity: 0.6">
                Lorem ipsum dolor sit amet consectetur adipiscing elit
              </div>
            </div>
            <div style="display: flex; margin-bottom: 13px">
              <e-svg
                style="
                  display: inline-block;
                  margin-top: 8px;
                  margin-right: 8px;
                "
                icon="Pointer"
              />
              <div style="font-size: 14px; opacity: 0.6">
                Lorem ipsum dolor sit amet consectetur adipiscing elit
              </div>
            </div> -->
          </el-card>

          <div
            style="
              padding: 0px 15px 0px 21px;
              font-size: 20px;
              font-weight: 400;
            "
          >
            Tasks of the session
          </div>
          <el-card shadow="none" style="margin: 20px" class="rounded-08">
            <div
              class="d-flex"
              style="margin-top: 20px"
              v-for="i in topicsData[0].session_tasks"
              :key="i"
            >
              <div style="display: flex; margin-bottom: 13px">
                <e-svg
                  style="
                    display: inline-block;
                    margin-top: 8px;
                    margin-right: 8px;
                  "
                  icon="Pointer"
                />
                <div style="font-size: 14px; opacity: 0.6">
                  {{i}}
                </div>
              </div>
            </div>
            <!-- <div style="display: flex; margin-bottom: 13px">
              <e-svg
                style="
                  display: inline-block;
                  margin-top: 8px;
                  margin-right: 8px;
                "
                icon="Pointer"
              />
              <div style="font-size: 14px; opacity: 0.6">
                Lorem ipsum dolor sit amet consectetur adipiscing elit
              </div>
            </div>
            <div style="display: flex; margin-bottom: 13px">
              <e-svg
                style="
                  display: inline-block;
                  margin-top: 8px;
                  margin-right: 8px;
                "
                icon="Pointer"
              />
              <div style="font-size: 14px; opacity: 0.6">
                Lorem ipsum dolor sit amet consectetur adipiscing elit
              </div>
            </div> -->
          </el-card>

          <div
            style="
              padding: 0px 15px 0px 21px;
              font-size: 20px;
              font-weight: 400;
            "
          >
            Attendance
          </div>
          <el-card shadow="none" style="margin: 20px" class="rounded-08">
            <el-row>
              <el-col
                :span="7"
                style="text-align: center; border-right: 1px solid #fcdfbd"
              >
                <span>Attended</span> <br />
                <span
                  style="
                    color: rgb(0, 0, 0);
                    font-weight: bold;
                    font-size: 35px;
                  "
                  >31</span
                >
              </el-col>

              <el-col
                :span="7"
                style="text-align: center; border-right: 1px solid #fcdfbd"
              >
                <span>Dropped</span> <br />
                <span
                  style="
                    color: rgb(0, 0, 0);
                    font-weight: bold;
                    font-size: 35px;
                  "
                  >5</span
                >
              </el-col>

              <el-col :span="7" style="text-align: center">
                <span>Missed</span> <br />
                <span
                  style="
                    color: rgb(0, 0, 0);
                    font-weight: bold;
                    font-size: 35px;
                  "
                  >9</span
                >
              </el-col>
            </el-row>
          </el-card>

          <div
            style="
              padding: 0px 15px 0px 21px;
              font-size: 20px;
              font-weight: 400;
            "
          >
            Queries asked
          </div>
          <el-card shadow="none" style="margin: 20px" class="rounded-08">
            <div
              class="d-flex"
              style="margin-top: 20px"
              v-for="i in 4"
              :key="i"
            >
              <div style="font-size: 14px; opacity: 0.6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum suscipit ?
              </div>
              <div><e-svg icon="Play" /></div>
            </div>
          </el-card>

          <div
            style="
              display: flex;
              justify-content: space-between;
              padding-right: 29px;
            "
          >
            <div
              style="
                padding: 0px 15px 0px 21px;
                font-size: 20px;
                font-weight: 400;
              "
            >
              Chat transcript
            </div>

            <img
              style="height: 36px"
              src="@/assets/icons/svg/download-icon.png"
              alt=""
            />
          </div>

          <el-card shadow="none" style="margin: 20px" class="rounded-08">
            <div
              class="d-flex"
              style="margin-top: 20px"
              v-for="i in 4"
              :key="i"
            >
              <el-row>
                <el-col :span="4"
                  ><el-avatar
                    :size="30"
                    :src="require('@/assets/images/profile.jpg')"
                /></el-col>
                <el-col :span="18">
                  <div style="font-weight: bold">Rachael Kenneth</div>
                  <div style="font-size: 14px; opacity: 0.6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vestibulum suscipit ?
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-card>
          <div
            style="
              display: flex;
              justify-content: space-between;
              padding-right: 29px;
            "
          >
            <div
              style="
                padding: 0px 15px 0px 21px;
                font-size: 20px;
                font-weight: 400;
              "
            >
              Class session
            </div>

            <img
              style="height: 36px"
              src="@/assets/icons/svg/download-icon.png"
              alt=""
            />
          </div>
          <el-card shadow="none" style="margin: 20px" class="rounded-08">
            <e-svg style="padding: 68px 172px" icon="Play" />
          </el-card>
        </div>
      </div>
    </div>
  </right-side-bar>
</template>

<script>
// import EImgName from "@/controls/table/eImgName.vue";
import RightSideBar from "@/components/school/rightSideBar.vue";
import { dispatchGraphql } from "@/api/dispatcher";

// import DrawerChart from "./DrawerChart.vue";
export default {
  components: { RightSideBar },
  props: {
    show: { type: Boolean, default: false },
    __onCancel: Function,
    rightBarData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      chartData: [
        ["1", "Count", { role: "style" }],
        ["0", 80, "#FCDFBD"],
        ["1", 30, "#BC6C42"],
        ["2", 40, "#FCDFBD"],
        ["3", 70, "#FCDFBD"],
        ["4", 80, "#FCDFBD"],
        ["5", 30, "#FCDFBD"],
        ["6", 10, "#FCDFBD"],
        ["7", 50, "#FCDFBD"],
        ["8", 40, "#FCDFBD"],
      ],
      topicsData: [],
      chartOptions: {
        dataOpacity: 0.3,

        vAxis: {
          gridlines: { count: 0 },
          textPosition: "none",
        },
        pointSize: 6,
        chartArea: { top: "3%", height: "80%", width: "90%" },
        hAxis: {
          minValue: 1,
          maxValue: 9,
          gridlines: { count: 20, color: "black" },
          textStyle: {
            fontSize: 13,
            transform: "rotate(0deg);",
          },
        },
        curveType: "function",
        legend: "none",
      },
    };
  },
  created() {
    console.log('right02316465789', this.rightBarData)
    this.getTopics()
  },
  methods: {
    getTopics() {
      const query = `query($id: uuid) {
        topics(where: {id: {_eq: $id}}) {
          id
          homework
          description
          key_objectives
          name
          session_activities
          session_tasks
          sub_topics {
            id
            name
          }
        }
      }`
      dispatchGraphql(query, {id: this.rightBarData.topic_id}).then(response => {
        this.topicsData = response.topics
        console.log(response)
      })
    },
  }
};
</script>

<style>
.drawer-heading__1 {
  font-size: 16px;
  font-weight: bold;
}
.el-drawer__body {
  height: 100%;
		overflow-y: auto;
}
.classroom-right__slide .el-card__body {
  padding: 15px !important;
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
