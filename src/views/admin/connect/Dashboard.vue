<template>
  <div style="padding: 20px 30px; overflow-y: auto; height: 75vh" class="connect-dashboard">
    <div class="heading" style="font-size: 24px; padding-left: 0px">
      Dashbaord
    </div>
    <el-row class="connect-dashboard-filter"
      :gutter="20"
      style="
        background: rgb(255, 255, 255);
        height: 80px;
        padding: 30px 15px 30px 15px;
        margin: 5px 0px 30px 0px;
        width: 73vw;
      "
    >
      <div class="filter-options">
        <el-col :span="3">
          <e-dropdown :list="Standard" primary />
        </el-col>
        <el-col :span="3">
          <e-dropdown :list="filterStatus" primary />
        </el-col>
        <el-col :span="4" class="primary-text">Clear filter</el-col>
      </div>
      <el-col :span="2" :offset="11">
        <e-button
          label="APPLY"
          style="margin-top: -10px; margin-right: 10px"
          type="primary"
        ></e-button>
      </el-col>
    </el-row>

    <el-row class="connect-classroom">
      <el-col :span="10">
        <div class="heading">Classroom</div>
        <el-card shadow="none" class="rounded-08 pg-50 cp">
          <el-row class="mg-y-3" style="border-bottom: 1px solid #fcdfbd">
            <el-col
              :span="8"
              style="font-size: 14px"
              class="text-center tx-bold"
            >
              Ongoing
              <div style="opacity: 0.8" class="mg-y-10 tx-24">15</div>
            </el-col>
            <el-col
              style="font-size: 14px"
              :span="8"
              class="text-center tx-bold"
            >
              Completed
              <div style="opacity: 0.8" class="mg-y-10 tx-24">15</div>
            </el-col>
            <el-col
              style="font-size: 14px"
              :span="8"
              class="text-center tx-bold"
            >
              Upcoming
              <div style="opacity: 0.8" class="mg-y-10 tx-24">15</div>
            </el-col>
          </el-row>

          <VueSlickCarousel v-bind="settings" :arrows="false" :dots="true">
            <div v-for="k in 3" :key="k">
              <div v-for="i in 3" :key="i" class="classrom-corsol">
                <div class="text-corsol">Name of the teacher</div>
                <div class="marks">15</div>
              </div>
            </div>
          </VueSlickCarousel>
        </el-card>
      </el-col>
      <el-col style="margin-left: 20px" :span="8">
        <div
          style="
            display: flex;
            justify-content: space-between;
            margin-top: 30px;
            margin-bottom: 10px;
          "
        >
          <div class="heading" style="margin: 0">Notifications</div>
          <div style="color: #bc6c42; font-size: 16px; font-weight: 500">
            Clear all
          </div>
        </div>
        <el-card
          style="height: 22rem; overflow: auto"
          shadow="none"
          class="rounded-08 pg-50 cp"
        >
          <div class="noti" v-for="i in 6" :key="i">
            <div
              class="noti-text"
              style="
                color: rgb(0, 0, 0);
                opacity: 0.8;
                font-size: 14px;
                border: 1px solid;
                border-radius: 10px;
                padding: 15px;
                position: relative;
                margin-top: 10px;
              "
            >
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam
              </div>
            </div>
            <div
              class="notitification-hover"
              style="
                display: flex;
                justify-content: space-between;

                border: 1px solid;
                padding: 10px;
                width: 23rem;
                margin-left: 32px;
                box-shadow: 0px 6px 13px #00000026;
                border-radius: 0px 0px 10px 10px;
                border: 1px solid #bc6c42;
                display: none;
              "
            >
              <div
                style="
                  padding-right: 20px;
                  width: 13rem;
                  opacity: 0.8;
                  font-size: 14px;
                "
              >
                Lorem ipsum dolor sit amet consectetur
              </div>
              <button
                style="
                  width: 150px;
                  box-shadow: 0px 1px 3px #11111112;
                  border: 1px solid #bc6c42;
                  border-radius: 4px;
                  color: #bc6c42;
                  font-weight: 600;
                  font-size: 16px;
                  background: white;
                "
              >
                Mark Done
              </button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row class="test-stats">
      <div style="width: 76%">
        <div class="heading">Test stats</div>
        <el-card shadow="none" class="rounded-08 pg-50 cp">
          <el-row class="test-stats-inner">
            <el-col :span="16" style="border-right: 1px solid #e6eaed">
              <test-graph />
            </el-col>
            <el-col :span="7" style="padding-left: 20px">
              <div
                class="fs-16 f-500"
                style="opacity: 0.8; padding-bottom: 10px"
              >
                Recommendations
              </div>

              <div class="syllabus-courosle" v-for="i in recomText" :key="i">
                <e-svg class="pointer-icon" icon="Pointer" />
                <div class="syllabus-cousol__info">
                  {{ i }}
                </div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </div>
    </el-row>

    <el-row class="connect-result">
      <el-col :span="10" class="results">
        <div class="heading">Test stats</div>
        <el-card shadow="none" class="rounded-08 pg-50 cp">
          <el-row class="mg-y-3" style="border-bottom: 1px solid #fcdfbd">
            <el-col
              :span="8"
              style="font-size: 14px"
              class="text-center tx-bold"
            >
              Ongoing
              <div style="opacity: 0.8" class="mg-y-10 tx-24">15</div>
            </el-col>
            <el-col
              style="font-size: 14px"
              :span="8"
              class="text-center tx-bold"
            >
              Completed
              <div style="opacity: 0.8" class="mg-y-10 tx-24">15</div>
            </el-col>
            <el-col
              style="font-size: 14px"
              :span="8"
              class="text-center tx-bold"
            >
              Upcoming
              <div style="opacity: 0.8" class="mg-y-10 tx-24">15</div>
            </el-col>
          </el-row>

          <result-stat />
        </el-card>
      </el-col>
      <el-col style="margin-left: 20px" :span="8">
        <div
          style="
            display: flex;
            justify-content: space-between;
            margin-top: 30px;
            margin-bottom: 10px;
          "
        >
          <div class="heading" style="margin: 0">Poll</div>
          <div
            class="select-dropdown"
            style="margin-right: -80px; margin-top: -14px"
          >
            <e-select
              :span="14"
              placeholder="Group"
              :options="subjects"
            ></e-select>
          </div>
        </div>
        <el-card
          style="height: 24rem"
          shadow="none"
          class="rounded-08 pg-50 cp"
        >
          <el-row class="mg-y-3" style="border-bottom: 1px solid #fcdfbd">
            <el-col
              :span="8"
              style="font-size: 14px"
              class="text-center tx-bold"
            >
              Ongoing
              <div style="opacity: 0.8" class="mg-y-10 tx-24">15</div>
            </el-col>
            <el-col
              style="font-size: 14px"
              :span="8"
              class="text-center tx-bold"
            >
              Completed
              <div style="opacity: 0.8" class="mg-y-10 tx-24">15</div>
            </el-col>
            <el-col
              style="font-size: 14px"
              :span="8"
              class="text-center tx-bold"
            >
              Upcoming
              <div style="opacity: 0.8" class="mg-y-10 tx-24">15</div>
            </el-col>
          </el-row>
          <div
            style="
              opacity: 0.8;
              font-size: 14px;
              font-weight: 500;
              margin-top: 30px;
              margin-bottom: 15px;
            "
          >
            Ongoing
          </div>
          <VueSlickCarousel v-bind="settings2" :arrows="false" :dots="true">
            <div v-for="i in 5" :key="i" class="poll-corsole">
              <div class="pad-poll">
                <div class="poll-text">
                  Lorem ipsum dolor sit amet, consectetur
                </div>
                <div class="poll-audo">Audience</div>
                <div class="poll-15">15</div>
              </div>
              <div>
                <button class="poll-yes__btn">Yes</button>
                <button class="poll-no__btn">No</button>
              </div>
            </div>
          </VueSlickCarousel>
        </el-card>
      </el-col>
    </el-row>
    <div
      style="
        display: flex;
        justify-content: space-between;
        margin-top: 30px;
        width: 76%;
        margin-bottom: 10px;
      "
    >
      <div class="heading" style="margin: 0">Skill stats</div>
      <div
        class="dance-dropdown"
        style="margin-right: -80px; margin-top: -14px"
      >
        <e-select :span="14" placeholder="Dance" :options="Dances"></e-select>
      </div>
    </div>

    <el-card
      style="height: 24rem; width: 76%"
      shadow="none"
      class="skill-stats rounded-08 pg-50 cp"
    >
      <el-row class="skill-stats-inner">
        <el-col
          :span="7"
          style="
            overflow: auto;
            height: 24rem;
            padding-right: 20px;
            border-right: 1px solid #e6eaed;
          "
        >
          <div
            v-for="i in 5"
            :key="i"
            class="skill-stat-view"
            style="
              border: 1px solid #bc6c42;
              border-radius: 10px;
              padding: 20px;
              margin-bottom: 20px;
            "
          >
            <div>
              <e-svg style="display: inline-block" icon="Salsa"></e-svg>
              <div
                style="
                  display: inline-block;
                  margin-left: 20px;
                  font-size: 16px;
                  font-weight: 600;
                  opacity: 0.8;
                "
              >
                Salsa
              </div>
            </div>
            <div style="display: flex; margin-top: 5px">
              <div style="margin-left: 30px">
                <div style="font-weight: 500; opactiy: 0.8">Students</div>
                <div style="font-weight: 500; opactiy: 0.8; font-size: 16px">
                  15
                </div>
              </div>
              <div style="margin-left: 25px">
                <div style="font-weight: 500; opactiy: 0.8">Sessions taken</div>
                <div style="font-weight: 500; opactiy: 0.8; font-size: 16px">
                  7
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col
          :span="6"
          style="border-right: 1px solid #e6eaed; padding-bottom: 45px"
        >
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
              <span style="color: #11141a; font-size: 12px; font-weight: 300"
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
              <span style="color: #11141a; font-size: 12px; font-weight: 300"
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
              <span style="color: #11141a; font-size: 12px; font-weight: 300"
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
              <span style="color: #11141a; font-size: 12px; font-weight: 300"
                >Poor</span
              >
            </div>
          </div>
        </el-col>
        <el-col
          :span="5"
          style="border-right: 1px solid #e6eaed; padding-left: 15px"
        >
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
        <el-col :span="4" style="padding-left: 15px">
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

    <el-row class="mg-y-10 graph-heading">
      <el-col :span="9" style="margin: 0;" class="heading"> Assignment/Form Stats </el-col>
      <el-col :span="7" class="graph-heading-forms" style="display:none"> Forms </el-col>
      <el-col :span="2">
        <div
          class="group-dropdown"
          style="margin-right: -80px; margin-left: 30px; margin-top: -14px"
        >
          <e-select
            :span="14"
            placeholder="Groups"
            :options="subjects"
          ></e-select>
        </div>
      </el-col>
    </el-row>
    <el-row class="connect-graph" :gutter="10" justify="center" type="flex">
      <el-col :span="9">
        <el-col :span="9" class="graph-title"> Assignments </el-col>
        <stats-card
          :ongoing="15"
          :upcoming="15"
          :complted="15"
          title="Ongoing"
          :graphData="[pieChartData, pieChartData, pieChartData, pieChartData]"
        />
      </el-col>
      <el-col :md="20">
        <el-col :span="9" class="graph-title"> Forms </el-col>
        <stats-card
          :ongoing="15"
          :upcoming="15"
          :complted="15"
          title="Ongoing"
          :graphData="[pieChartData, pieChartData, pieChartData]"
        />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import resultStat from "@/components/learn/dashResult.vue";
import VueSlickCarousel from "vue-slick-carousel";
import StatsCard from "@/components/school/Overview/StatsCard.vue";
import testGraph from "@/components/learn/testGraph.vue";
export default {
  components: { VueSlickCarousel, resultStat, StatsCard, testGraph },
  data: () => ({
    settings: {
      dots: true,
      focusOnSelect: false,
      infinite: !true,
      slidesToShow: 1,
      slidesToScroll: 1,
      touchThreshold: 5,
    },
    settings2: {
      dots: true,
      focusOnSelect: false,
      infinite: !true,
      slidesToShow: 2.2,
      slidesToScroll: 1,
      touchThreshold: 5,
    },
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
      chartArea: { top: "0%", height: "70%", width: "80%" },
      legend: "none",

      slices: [
        { color: "#6358F4" },
        { color: "#FE6780" },
        { color: "#FE59B3" },
        { color: "#F9AE58", offset: 0.01, elevated: true, size: 90 },
      ],
    },
    subjects: [
      {
        title: "Group 1",
        value: "Group 1",
      },
      {
        title: "Group 2",
        value: "Group 2",
      },
      {
        title: "Group 3",
        value: "Group 3",
      },
      {
        title: "Group 4",
        value: "Group 4",
      },
    ],
    Dances: [
      {
        title: "Dance",
        value: "Dance",
      },
      {
        title: "Music",
        value: "Music",
      },
      {
        title: "Art",
        value: "Art",
      },
      {
        title: "Type 4",
        value: "Type 4",
      },
    ],
    filterStatus: [
      { text: "Status" },
      { text: "Active" },
      { text: "Inactive" },
    ],
    Standard: [
      { text: "Standard" },
      { text: "Class 1 B" },
      { text: "Class 2 A" },
      { text: "Class 2 B" },
      { text: "Class 3 A" },
      { text: "Class 2 A" },
      { text: "Class 2 B" },
      { text: "Class 3 A" },
    ],
    recomText: [
      "Focus needs to be implied on the class 9 progress",
      "Class 2 have increased delays in lesson progress",
      "Class 10 have been performing great and has no delays",
      "Mr. Richard could take a counselling session to focus on lesson planner tracking",
    ],
  }),
};
</script>

<style lang="scss">
.slick-dots {
  bottom: -25px !important;
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
.classrom-corsol {
  display: flex;
  justify-content: space-between;
  border: 1px solid #fcdfbd;
  border-radius: 8px;
  padding: 9px;
  margin-top: 15px;
}
.text-corsol {
  color: #4d4f5c;
  font-size: 16px;
  padding: 5px 10px;
}
.marks {
  width: 90px;
  border-radius: 5px;
  color: rgb(17, 20, 26);
  background: rgba(188, 108, 66, 0.1);
  opacity: 0.8;
  font-size: 20px;
  text-align: center;
  padding: 6px 0;
}
.noti-text:hover {
  border: 1px solid #bc6c42 !important;
}
.noti:hover .notitification-hover {
  display: flex !important;
  margin-bottom: 10px !important;
  border-top: 0 !important;
}
.results #line-chart {
  margin-top: 10px !important;
}
.results .pd-20 {
  padding: 0 !important;
}
.poll-corsole {
  border: 1px solid #bc6c42;
  border-radius: 10px;
  width: 11.87rem !important;
  margin-top: 10px;
}
.poll-text {
  font-size: 14px;
  font-weight: 600;
}
.poll-audo {
  font-size: 12px;
  font-weight: 300;
  margin-top: 10px;
}
.poll-15 {
  font-weight: 600;
  font-size: 20px;
}
.pad-poll {
  padding: 15px;
}
.poll-yes__btn {
  font-size: 15px;
  padding: 7px 15px;
  border: none;
  background: #bc6c42;
  border-radius: 7px;
  color: white;
}
.poll-no__btn {
  padding: 7px 58px;
  border: none;
  font-size: 15px;
  background: rgba(188, 108, 66, 0.1);
}
.skill-stat-view:hover {
  box-shadow: 0px 13px 21px #00000026;
}
</style>
