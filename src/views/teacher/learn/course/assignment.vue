<template>
  <div style="overflow: auto; height: 80vh">
    <el-row style="display: flex; padding: 15px">
      <el-col :span="19" style="display: flex">
        <e-svg @click="$router.push($url.LN_COURSES)" icon="back"></e-svg>
        <div
          style="
            color: #11141a;
            font-weight: 500;
            font-size: 24px;
            opacity: 0.8;
            margin-top: 7px;
            margin-left: 20px;
          "
        >
          Assignment
        </div>
      </el-col>
      <el-col :span="3">
        <div
          style="
            display: flex;
            border: 1px solid rgb(188, 108, 66);
            padding: 4px 9px;
            border-radius: 6px;
            margin-top: 10px;
            cursor: pointer;
            width: 150px;
          "
          @click="showSideBar = true"
        >
          <img src="@/assets/images/seeschedule.png" alt="" />
          <span
            style="
              color: #bc6c42;
              margin-top: 2px;
              margin-left: 6px;
              font-weight: 500;
            "
            >See schedule</span
          >
        </div>
      </el-col>
    </el-row>
    <div class="class-info" style="padding-left: 84px">
      <div
        style="
          background: white;
          display: inline-block;
          padding: 11px 22px;
          border-radius: 10px;
          color: rgb(0 0 0 / 60%);
          font-size: 16px;
          margin-right: 10px;
   /     "
      >
        Class 6A
      </div>
      <div
        style="
          background: white;
          display: inline-block;
          padding: 11px 22px;
          border-radius: 10px;
          color: rgb(0 0 0 / 60%);
          font-size: 16px;
          margin-right: 10px;
        "
      >
        Mathematics
      </div>
    </div>

    <el-row>
      <el-col :span="10" style="margin-left: 40px">
        <div class="heading">Class period stats</div>
        <el-card shadow="none" class="rounded-08 pg-50 cp">
          <div
            style="
              display: flex;
              justify-content: space-between;
              text-align: center;
            "
          >
            <div
              style="
                background: #fcdfbd;
                border-radius: 10px;
                padding: 6px 23px;
              "
            >
              <span
                style="
                  font-size: 14px;
                  font-weight: 300;
                  display: block;
                  color: rgb(0 0 0 / 80%);
                  margin-top: 10px;
                "
                >Alloted</span
              >
              <span
                style="
                  font-size: 44px;
                  font-weight: 500;
                  color: rgb(0 0 0 / 80%);
                  margin-top: 15px;
                "
                >12</span
              >
            </div>
            <div style="padding: 6px 23px">
              <span
                style="
                  font-size: 14px;
                  font-weight: 300;
                  display: block;
                  color: rgb(0 0 0 / 80%);
                  margin-top: 10px;
                "
                >Taken</span
              >
              <span
                style="
                  font-size: 44px;
                  font-weight: 500;
                  color: rgb(0 0 0 / 80%);
                  margin-top: 15px;
                "
                >6</span
              >
            </div>
            <div style="padding: 6px 23px">
              <span
                style="
                  font-size: 14px;
                  font-weight: 300;
                  display: block;
                  color: rgb(0 0 0 / 80%);
                  margin-top: 10px;
                "
                >In delay</span
              >
              <span
                style="
                  font-size: 44px;
                  font-weight: 500;
                  color: rgb(0 0 0 / 80%);
                  margin-top: 15px;
                "
                >4</span
              >
            </div>
          </div>

          <VueSlickCarousel v-bind="settings" :arrows="false" :dots="true">
            <div v-for="i in 4" :key="i" class="cousole-wrap">
              <div class="syllabus-courosle" v-for="i in 2" :key="i">
                <e-svg class="pointer-icon" icon="Pointer" />
                <div class="syllabus-cousol__info">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit
                </div>
              </div>
            </div>
          </VueSlickCarousel>
        </el-card>
      </el-col>
      <el-col :span="10" style="margin-left: 40px">
        <div class="heading">Time stats</div>
        <el-card shadow="none" class="rounded-08 card-padd cp">
          <el-row>
            <el-col :span="11" style="height: 256px; overflow: auto;border-right:1px solid #E6EAED">
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
            <el-col :span="10" style="padding: 0 20px">
              <div style="opacity: 0.8; font-weight: 300">Avg. Time</div>
              <div
                style="
                  opacity: 0.8;
                  font-weight: 500;
                  font-size: 24px;
                  margin-top: 5px;
                "
              >
                15 m
              </div>

              <br />
              <div style="opacity: 0.8; font-weight: 300">Preferred time</div>
              <div
                style="
                  opacity: 0.8;
                  font-weight: 500;
                  font-size: 24px;
                  margin-top: 5px;
                "
              >
                Morning
              </div>
              <br />
              <div style="opacity: 0.8; font-weight: 300">Avg. Breaks</div>
              <div
                style="
                  opacity: 0.8;
                  font-weight: 500;
                  font-size: 24px;
                  margin-top: 5px;
                "
              >
                4
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10" style="margin-left: 40px">
        <div class="heading">Result stats</div>
        <el-card shadow="none" class="rounded-08 results-stat card-padd cp">
          <result-stat :chartData="chartData" :chartOptions="chartOptions" />
        </el-card>
      </el-col>
      <el-col :span="10" style="margin-left: 40px">
        <div class="heading">Response study</div>
        <el-card
          shadow="none"
          style="height: 304px"
          class="rounded-08 card-padd cp"
        >
          <el-row>
            <el-col :span="11" style="height: 250px; overflow: auto;border-right:1px solid #E6EAED">
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
            <el-col :span="10" style="padding: 0 20px">
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
                    >Excellent</span
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
                    >Good</span
                  >
                </div>
              </div>

              <div
                style="
                  display: flex;
                  justify-content: space-around;
                  margin-top: 5px;
                "
              >
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
                    >Average</span
                  >
                </div>
                <div style="display: flex">
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
                  >
                </div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import resultStat from "@/components/learn/course/resultStat.vue";

export default {
  components: { VueSlickCarousel, resultStat },
  data: () => ({
    activeName: "activeSubtopic",
    msg: "Lorem ipsum dolor sit amet consectetur",
    settings: {
      dots: true,
      focusOnSelect: false,
      infinite: !true,
      slidesToShow: 2,
      slidesToScroll: 1,
      touchThreshold: 5,
    },
    pieChartData: [
      ["1", "Count", { role: "style" }],
      ["0", 80, "red"],
      ["1", 30, "#f00"],
      ["1", 120, "#f000"],
    ],
    // chartData: [
    //   ["1", "Count", { role: "style" }],
    //   ["0", 80, "#37c64c"],
    //   ["1", 30, "#37c64c"],
    //   ["2", 40, "#37c64c"],
    //   ["3", 70, "#37c64c"],
    //   ["4", 80, "#37c64c"],
    //   ["5", 30, "#37c64c"],
    //   ["6", 10, "#37c64c"],
    //   ["7", 50, "#37c64c"],
    //   ["8", 40, "#37c64c"],
    // ],
    chartdata: {
      labels: ["January", "February"],
      datasets: [
        {
          label: "Data One",
          backgroundColor: "#f87979",
          data: [40, 20],
        },
      ],
    },
    pieChartOptions: {
      // is3D:true,
      pieHole: 0.6,
      pieSliceText: "none",
      chartArea: { top: "0%", height: "70%", width: "80%" },
      legend: "none",

      slices: [
        { color: "#6358F4" },
        { color: "#FE6780" },
        { color: "#FE59B3" },
        { color: "#F9AE58", offset: 0.01, elevated: true, size: 90 },
      ],
    },

    chartOptions: {
      dataOpacity: 0.3,

      vAxis: {
        gridlines: { count: 0 },
        textPosition: "none",
      },
      pointSize: 6,
      chartArea: { top: "0%", height: "80%", width: "80%" },
      hAxis: {
        minValue: 1,
        maxValue: 9,
        gridlines: { count: 0, color: "black" },
        textStyle: {
          fontSize: 13,
          transform: "rotate(0deg);",
        },
      },
      curveType: "function",
      legend: "none",
    },
  }),
};
</script>

<style lang="scss">
.class-btn__coursle {
  border-radius: 16px;
  border: none;
  font-size: 12px;
  padding: 6px 16px;
  background: #fcdfbd;
  margin-left: 18px;
  margin-top: 35px;
  margin-bottom: 20px;
  color: #00000080;
  display: block;
  margin: auto;
}
.coursle-name {
  color: #222222;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  padding-bottom: 21px;
}

.slick-dots {
  bottom: -10px;
  li button:before,
  li.slick-active button:before {
    color: transparent;
    opacity: 1;
  }
  li button:before {
    background-color: transparent;
    border: 1px solid #bc6c42;
    border-radius: 50%;
    display: inline-block;
    height: 10px;
    width: 10px;
  }
  li.slick-active button:before {
    background-color: #bc6c42;
  }
}

.slick-dots li button::before {
  height: 10px !important;
  widows: 10px !important;
  background: #fff;
}
.cousole-wrap {
  padding: 10px 0;
}
.syllabus-courosle {
  display: flex;
  margin-bottom: 18px;
}
.pointer-icon {
  display: inline-block;
  margin-top: 8px;
  margin-right: 8px;
}
.syllabus-cousol__info {
  font-size: 14px;
  font-weight: 300;
  opacity: 0.6;
}

.subtopic {
  padding-bottom: 67px;
}
.card-padd .el-card__body {
  padding: 20px 0 !important;
}
.subtopic-hover:hover {
  background: rgba(252, 223, 189, 0.4);
  color: #bc6c42;
}
.results-stat #line-chart {
  margin-top: 0px !important;
}
.results-stat .pd-20 {
  padding: 0 !important;
}
</style>
