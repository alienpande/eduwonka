<template>
  <div class="analytic" style="overflow-y: auto; height: 80vh">
    <course-header title="Analytics" />
    <div style="padding: 0 95px">
      <el-row>
        <el-col :span="10">
          <div class="heading">Course stats</div>
          <el-card shadow="none" class="rounded-08 cp">
            <el-row>
              <el-col
                :span="8"
                style="border-right: 1px solid #e6eaed; height: 45vh"
              >
                <div style="opacity: 0.8; font-weight: 500">
                  Total Subtopics
                </div>
                <div style="font-weight: 500; font-size: 44px">35</div>
              </el-col>
              <el-col :span="13" style="padding: 0 20px">
                <div
                  class="text-center"
                  style="
                    font-size: 16px;
                    dont-weight: 500;
                    opacity: 0.8;
                    padding: 10px 0;
                  "
                >
                  Breakdown
                </div>
                <GChart
                  type="PieChart"
                  :data="pieChartData"
                  :options="pieChartOptions2"
                  class="z-index--1"
                />

                <div style="display: flex; justify-content: space-around">
                  <div style="display: flex">
                    <span
                      style="
                        width: 8px;
                        height: 8px;
                        background: #fe6780;
                        display: inline-block;
                        margin-top: 6px;
                        margin-right: 7px;
                      "
                    ></span>
                    <span
                      style="color: #11141a; font-size: 12px; font-weight: 300"
                      >Completed</span
                    >
                  </div>
                  <div style="display: flex">
                    <span
                      style="
                        width: 8px;
                        height: 8px;
                        background: #fe59b3;
                        display: inline-block;
                        margin-top: 6px;
                        margin-right: 7px;
                      "
                    ></span>
                    <span
                      style="color: #11141a; font-size: 12px; font-weight: 300"
                      >Active</span
                    >
                  </div>
                </div>

                <div style="display: flex; margin-left: 16px; margin-top: 5px">
                  <div style="display: flex">
                    <span
                      style="
                        width: 8px;
                        height: 8px;
                        background: #f9ae58;
                        display: inline-block;
                        margin-top: 6px;
                        margin-right: 7px;
                      "
                    ></span>
                    <span
                      style="color: #11141a; font-size: 12px; font-weight: 300"
                      >Upcoming</span
                    >
                  </div>
                  <!-- <div style="display: flex">
                  <span
                    style="
                      width: 8px;
                      height: 8px;
                      background: #6358f4;
                      display: inline-block;
                      margin-top: 6px;
                      margin-right: 7px;
                    "
                  ></span>
                  <span
                    style="color: #11141a; font-size: 12px; font-weight: 300"
                    >Poor</span
                  > -->
                  <!-- </div> -->
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="10" :offset="1">
          <div class="heading">Course allocation</div>
          <el-card
            shadow="none"
            style="height: 50vh"
            class="mlm rounded-08 card-padd cp"
          >
            <el-row>
              <el-col
                :span="11"
                style="
                  height: 46vh;
                  overflow: auto;
                  border-right: 1px solid #e6eaed;
                "
              >
                <div
                  v-for="i in 10"
                  :key="i"
                  class="subtopic-hover"
                  style="
                    display: flex;

                    padding-bottom: 7px;
                    padding-top: 14px;
                    padding-left: 18px;
                  "
                >
                  <e-svg icon="Group"></e-svg>
                  <div
                    style="font-size: 16px; font-weight: 600; padding: 0 24px"
                  >
                    Subtopic {{ i }}
                  </div>
                </div>
              </el-col>
              <el-col :span="11" style="padding: 0 20px">
                <el-avatar
                  style="margin-left: 40px"
                  :size="90"
                  :src="require('@/assets/images/profile.jpg')"
                />
                <div
                  style="
                    width: 95px;
                    text-align: center;
                    font-size: 16px;
                    font-weight: 500;
                    margin: auto;
                    margin-top: 14px;
                  "
                >
                  Sheryn landor
                </div>
                <button class="class-btn__coursle">Positive track</button>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>

      <div class="heading" style="padding-bottom: 70px">Subtopic progress</div>
      <el-tabs class="floatTabHeader" v-model="activeName">
        <el-tab-pane label="Active" name="Active">
          <el-row>
            <el-col
              class="i-icon"
              style="position: relative"
              v-for="i in 5"
              :key="i"
              :span="12"
            >
              <subtopic persentage="30" text="Subtopic 1" />
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="Upcoming" name="Upcoming"> </el-tab-pane>
        <el-tab-pane label="Completed" name="Completed"> </el-tab-pane>
      </el-tabs>

      <div class="heading">Assessment stats</div>
      <el-card shadow="none" class="rounded-08 cp">
        <el-row>
          <el-col
            :span="12"
            style="border-right: 1px solid #e6eaed; padding-left: 15px"
          >
            <grade-performance-card
              :chartData="chartData"
              :chartOptions="chartOptions"
            />
          </el-col>
          <el-col :span="6" style="padding-left: 25px">
            <div class="pr-x-40 mg-y-20 text-left" style="font-weight: bold">
              Best performers
            </div>
            <div class="mg-y-20" v-for="(d, i) in 4" :key="i">
              <e-img-name
                :src="require('@/assets/images/profile.jpg')"
                nameStyle="font-weight:normal"
                name="Paul Fernandis"
              />
            </div>
          </el-col>
          <el-col :span="6" style="padding-left: 25px">
            <div class="pr-x-40 mg-y-20 text-left" style="font-weight: bold">
              Weak performers
            </div>
            <div class="mg-y-20" v-for="(d, i) in 4" :key="i">
              <e-img-name
                :src="require('@/assets/images/profile.jpg')"
                nameStyle="font-weight:normal"
                name="Paul Fernandis"
              />
            </div>
          </el-col>
        </el-row>
      </el-card>

      <div class="heading">Lesson planner</div>
      <el-card shadow="none" class="rounded-08 cp">
        <el-row>
          <el-col
            :span="12"
            style="border-right: 1px solid #e6eaed; padding-right: 15px"
          >
            <lesson-graph />
          </el-col>
          <el-col
            :span="6"
            style="
              height: 250px;
              overflow: auto;
              border-right: 1px solid #e6eaed;
            "
          >
            <div
              v-for="i in 10"
              :key="i"
              class="subtopic-hover"
              style="
                display: flex;

                padding-bottom: 7px;
                padding-top: 14px;
                padding-left: 18px;
              "
            >
              <e-svg icon="Group"></e-svg>
              <div style="font-size: 16px; font-weight: 600; padding: 0 24px">
                Subtopic {{ i }}
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div style="display: flex; flex-wrap: wrap">
              <div
                style="
                  width: 49%;
                  padding: 10px 0;
                  border-right: 1px solid #e6eaed;
                "
              >
                <div style="opacity: 0.6; font-weight: 500; text-align: center">
                  Task
                </div>
                <img
                  style="display: block; margin: auto"
                  src="@/assets/images/complete-icon.png"
                  alt=""
                />
              </div>
              <div style="width: 49%; padding: 10px 0">
                <div style="opacity: 0.6; font-weight: 500; text-align: center">
                  Homework
                </div>
                <img
                  style="display: block; margin: auto"
                  src="@/assets/images/complete-icon.png"
                  alt=""
                />
              </div>
              <div
                style="
                  width: 49%;
                  padding: 10px 0;
                  border-top: 1px solid #e6eaed;
                  border-right: 1px solid #e6eaed;
                  border-bottom: 1px solid #e6eaed;
                "
              >
                <div style="opacity: 0.6; font-weight: 500; text-align: center">
                  Activity
                </div>
                <img
                  style="display: block; margin: auto"
                  src="@/assets/images/complete-icon.png"
                  alt=""
                />
              </div>
              <div
                style="
                  width: 49%;
                  padding: 10px 0;
                  border-top: 1px solid #e6eaed;
                  border-bottom: 1px solid #e6eaed;
                "
              >
                <div style="opacity: 0.6; font-weight: 500; text-align: center">
                  Attendance
                </div>
                <img
                  style="display: block; margin: auto"
                  src="@/assets/images/fail-icon.png"
                  alt=""
                />
              </div>
            </div>
            <div style="opacity: 0.8; font-weight: 500; padding: 11px 0 0 30px">
              Teacher’s profile
            </div>
            <el-row style="margin-top: 10px; margin-left: 30px">
              <el-col :span="10">
                <el-avatar
                  :size="80"
                  :src="require('@/assets/images/profile.jpg')"
              /></el-col>
              <el-col :span="10">
                <div
                  style="
                    width: 95px;
                    text-align: center;
                    font-size: 16px;
                    font-weight: 500;
                  "
                >
                  Sheryn landor
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
      <el-tabs
        style="margin-top: 100px"
        class="floatTabHeader"
        v-model="activeTest"
      >
        <el-tab-pane label="Test stats" name="test">
          <el-col :span="10">
            <el-card shadow="none" class="rounded-08 cp">
              <el-row>
                <el-col
                  :span="7"
                  style="border-right: 1px solid #e6eaed; height: 45vh"
                >
                  <div style="opacity: 0.8; font-weight: 500">Total tests</div>
                  <div style="font-weight: 500; font-size: 44px">35</div>
                </el-col>
                <el-col :span="13" style="padding: 0 20px">
                  <div
                    class="text-center"
                    style="
                      font-size: 16px;
                      dont-weight: 500;
                      opacity: 0.8;
                      padding: 10px 0;
                    "
                  >
                    Breakdown
                  </div>
                  <GChart
                    type="PieChart"
                    :data="pieChartData"
                    :options="pieChartOptions"
                    class="z-index--1"
                  />
                  <div style="display: flex; justify-content: center">
                    <button
                      style="border: none; background: transparent"
                      v-tooltip.top-center="msg"
                    >
                      <e-svg icon="Group"> </e-svg>
                    </button>
                    <span
                      style="
                        font-size: 16px;
                        padding: 0px 0px;
                        opacity: 0.8;
                        color: rgb(34, 34, 34);
                        width: 134px;
                        text-align: center;
                      "
                    >
                      Subtopic name
                    </span>
                  </div>
                  <div
                    class="text-center"
                    style="opacity: 0.8; font-size: 20px; font-weight: 500"
                  >
                    15 tests
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="Assignment stats" name="assignment"> </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import GradePerformanceCard from "@/components/school/Overview/GradePerformanceCard.vue";

import courseHeader from "@/components/learn/course/courseHeader.vue";
export default {
  components: { courseHeader, GradePerformanceCard },
  data: () => ({
    activeName: "Active",
    activeTest: "test",
    pieChartData: [
      ["1", "Count", { role: "style" }],
      ["0", 80, "red"],
      ["1", 30, "#f00"],
      ["1", 120, "#f000"],
    ],
    pieChartOptions: {
      // is3D:true,
      pieHole: 0.6,
      pieSliceText: "none",
      chartArea: { top: "0%", height: "70%", width: "90%" },
      legend: "none",

      slices: [
        { color: "#BC6C42" },
        { color: "#C4C4C4" },

        { color: "#C4C4C4" },
        { color: "#C4C4C4", offset: 0.01, elevated: true, size: 90 },
      ],
    },
    pieChartOptions2: {
      // is3D:true,
      pieHole: 0.6,
      pieSliceText: "none",
      chartArea: { top: "0%", height: "70%", width: "80%" },
      legend: "none",

      slices: [
        { color: "#FFA700" },
        { color: "#0BC32E" },
        { color: "#126DEA", offset: 0.01, elevated: true, size: 90 },
      ],
    },
  }),
};
</script>
<style>
/* .analytic .floatTabHeader.el-tabs.el-tabs--top > .el-tabs__header {
  margin: 0px !important;
} */
.analytic .el-tabs__header {
  border-bottom: 1px solid #fcdfbd !important;
}
.analytic .floatTabHeader.el-tabs.el-tabs--top > .el-tabs__header {
  width: 57vw;
}
.analytic .floatTabHeader.el-tabs.el-tabs--top > .el-tabs__header {
  position: inherit !important;
}
.analytic .line-chart-container {
  margin-top: -35px;
}
.subtopic-hover:hover {
  background: rgba(252, 223, 189, 0.4);
  color: #bc6c42;
}
.analytic .el-card__body {
  padding-right: 0;
}
.mlm .el-card__body {
  padding-left: 0;
}
.class-btn__coursle {
  border-radius: 16px;
  border: none;
  font-size: 12px;
  padding: 6px 16px;
  background: #fcdfbd;
  margin-left: 18px;
  margin-top: 5px;
  margin-bottom: 20px;
  display: block;
  margin: auto;
  margin-top: 20px;
  color: #00000080;
}
</style>
