<template>
  <es-container
    btnIcon="addPluse"
    btnText="Add Skill"
    @btnClick="$router.push($url.LN_ADD_SKILL)"
  >
    <div
      style="
        position: absolute;
        width: 10rem;
        top: 165px;
        border-bottom: 1px solid #f3f3f3;
        padding-bottom: 13px;
      "
    >
      <es-select
        class="title-select select-icon"
        v-model="subjectSelect"
        :options="subject"
      ></es-select>
    </div>
    <el-tabs class="floatTabHeader studentTab" v-model="tab">
      <el-tab-pane label="Progress" name="tab1">
        <el-card
          class="rounded-08 bg-black-2"
          style="border: none"
          shadow="none"
        >
          <el-row>
            <el-col
              :span="4"
              style="border-right: 1px solid #353535"
              class="d-flex"
            >
              <img
                src="@/assets/images/skillScoreIcon.png"
                style="margin-top: 8px; padding-right: 10px; height: 56px"
              />
              <div class="bg-black-3 rounded-08 p10">
                <div class="text-gray-6 f-600 text-center">Skill Score</div>
                <div class="fs-24 f-600 text-center white-1">9.8</div>
              </div>
            </el-col>
            <el-col :span="6" :offset="1" class="d-flex">
              <e-svg
                style="padding-top: 10px; padding-right: 15px"
                icon="network"
              ></e-svg>
              <div>
                <div class="text-gray-6">Total sessions taken</div>
                <div class="sub-title">30/45</div>
              </div>
            </el-col>
            <el-col :span="6" class="d-flex">
              <e-svg
                style="padding-top: 10px; padding-right: 15px"
                icon="calenderIcon"
              ></e-svg>
              <div>
                <div class="text-gray-6">Next session</div>
                <div class="sub-title">12th Jan, 2021</div>
              </div>
            </el-col>
            <el-col :span="4" class="d-flex">
              <el-avatar
                :size="40"
                style="margin-right: 15px; margin-top: 10px"
                :src="require('@/assets/images/profile.jpg')"
              />
              <div>
                <div class="text-gray-6">Mentor</div>
                <div class="sub-title">Kenith cole</div>
              </div>
            </el-col>
          </el-row>
        </el-card>
        <br />
        <el-row>
          <el-col :span="11">
            <div class="bg-black-2 rounded-08 p20">
              <div class="fs-16 f-600 white-1">
                Best performers of the month
              </div>
              <div
                class="p10 mt10 rounded-08"
                style="border: 1px solid #404040"
              >
                <el-row
                  v-for="(perform, i) in bestPerform"
                  :key="i"
                  style="border-bottom: 1px solid #353535"
                >
                  <el-col :span="3">
                    <el-avatar
                      :size="40"
                      style="margin-right: 15px; margin-top: 10px"
                      :src="require('@/assets/images/profile.jpg')"
                    />
                  </el-col>
                  <el-col :span="8">
                    <div class="white-1 pt10 fs-16 f-500">Somya Kukreja</div>
                  </el-col>
                  <el-col :span="2" :offset="3" class="pt10">
                    <div class="d-flex" v-if="perform.pos === 'down'">
                      <e-svg
                        icon="arrow-down"
                        style="padding-top: 4px; padding-right: 5px"
                      ></e-svg>
                      <div style="color: #f14d4d" class="fs-16">
                        {{ perform.level }}
                      </div>
                    </div>
                    <div class="d-flex" v-if="perform.pos === 'eq'">
                      <e-svg
                        icon="downYellow"
                        style="padding-top: 4px; padding-right: 5px"
                      ></e-svg>
                      <div style="color: #fec600" class="fs-16">
                        {{ perform.level }}
                      </div>
                    </div>
                    <div class="d-flex" v-if="perform.pos === 'up'">
                      <e-svg
                        icon="up"
                        style="padding-top: 4px; padding-right: 5px"
                      ></e-svg>
                      <div style="color: #1fc24e" class="fs-16">
                        {{ perform.level }}
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="2" :offset="5">
                    <div class="fs-16 pt10 f-600 white-1">
                      {{ perform.position }}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
          <el-col :span="11" :offset="2">
            <div class="bg-black-2 rounded-08 p20">
              <div class="fs-16 f-600 white-1">Tips to better your score</div>
              <div
                class="p10 mt10 rounded-08"
                style="border: 1px solid #404040"
              >
                <ul class="white-1">
                  <li v-for="k in 4" class="fs-16 f-400" :key="k">
                    Lorem Ipsum is simply dummy text of the printing and type
                    setting industry.
                  </li>
                </ul>
              </div>
            </div>
          </el-col>
        </el-row>
        <br />
        <el-row>
          <el-col :span="11">
            <div class="bg-black-2 rounded-08 p20">
              <div class="fs-16 f-600 white-1">Your weekly score graph</div>
              <div class="hr mt10"></div>
              <div class="d-flex justify-bet mt10">
                <div
                  style="background: #282828; border-radius: 4px; width: 122px"
                  class="p10"
                >
                  <div class="f-400 text-center" style="color: #858585">
                    Ongoing Score
                  </div>
                  <div class="fs-24 f-600 text-center white-1">9.8</div>
                </div>
                <div
                  style="background: #282828; border-radius: 4px; width: 122px"
                  class="p10"
                >
                  <div class="f-400 text-center" style="color: #858585">
                    Average Score
                  </div>
                  <div class="fs-24 f-600 text-center white-1">9.8</div>
                </div>
                <div
                  style="background: #282828; border-radius: 4px; width: 122px"
                  class="p10"
                >
                  <div class="f-400 text-center" style="color: #858585">
                    Max Score
                  </div>
                  <div class="fs-24 f-600 text-center white-1">9.8</div>
                </div>
              </div>
              <br />
              <div id="chart">
                <apexchart
                  type="area"
                  height="350"
                  :options="chartOptions"
                  :series="series"
                ></apexchart>
              </div>
              <div style="display: flex; justify-content: center">
                <e-svg
                  style="
                    background: #1492e6;
                    height: 18px;
                    width: 10px;
                    padding: 7px 9px;
                    margin-top: 4px;
                    border-radius: 4px;
                    transform: rotate(180deg);
                    margin-right: 5px;
                  "
                  icon="arrowRight"
                ></e-svg>
                <e-svg
                  style="
                    background: #353535;
                    height: 18px;
                    width: 10px;
                    padding: 7px 9px;
                    margin-top: 4px;
                    border-radius: 4px;
                  "
                  icon="arrowRight"
                ></e-svg>
              </div>
            </div>
            <br />
          </el-col>
          <el-col :span="11" :offset="2">
            <div class="bg-black-2 rounded-08">
              <div class="p20">
                <div class="fs-16 f-600 white-1">Weekly progress</div>
                <div class="hr mt10"></div>
                <br />
                <br />
                <el-avatar
                  :size="80"
                  style="display: block; margin: auto; width: 90px"
                  :src="require('@/assets/images/profile.jpg')"
                />
                <div class="fs-20 f-400 white-1 text-center">Atul Sharma</div>
                <div
                  style="width: 10rem; margin-left: auto; margin-right: 36px"
                >
                  <div class="f-400 text-gray-6 text-center" style="">
                    Your Performance
                  </div>
                  <div class="d-flex" style="justify-content: center">
                    <e-svg
                      icon="up"
                      style="margin-top: 8px; margin-right: 10px"
                    ></e-svg>
                    <div class="fs-20 f-600" style="color: #1fc24e">10%</div>
                  </div>
                </div>
              </div>
              <div style="position: relative">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                  <path
                    fill="#FE9D2B"
                    fill-opacity="1"
                    d="M0,256L120,240C240,224,480,192,720,176C960,160,1200,160,1320,160L1440,160L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
                  ></path>
                </svg>
                <div class="curve-path"></div>
                <div style="top: 80px; left: 60px" class="curve-idicate"></div>
                  <div style="top: 54px; right: 60px" class="curve-idicate"></div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="About Skill" name="tab2">
        <el-row>
          <el-col :span="11" style="width: 570px">
            <div class="bg-black-2 rounded-08 p20">
              <div class="fs-16 f-600 white-1">Key Highlights</div>
              <div
                class="p10 mt10 rounded-08"
                style="border: 1px solid #404040"
              >
                <ul class="white-1">
                  <li v-for="k in 4" class="fs-16 f-400" :key="k">
                    Lorem Ipsum is simply dummy text of the printing and type
                    setting industry.
                  </li>
                </ul>
              </div>
            </div>
          </el-col>
          <el-col :span="11" :offset="1" style="width: 570px">
            <div class="bg-black-2 p20 rounded-08">
              <div class="fs-16 f-600 white-1 p10">Watch Video</div>
              <img
                style="width: 505px; height: 240px"
                src="@/assets/images/videoScreen.png"
              />
            </div>
          </el-col>
        </el-row>
        <br />
        <el-row>
          <el-col :span="11" style="width: 570px">
            <div class="bg-black-2 rounded-08 p20">
              <div class="fs-16 f-600 white-1">Key Highlights</div>
              <div
                class="p10 mt10 rounded-08"
                style="border: 1px solid #404040"
              >
                <VueSlickCarousel
                  class="dashboard-catousel"
                  v-bind="settingsRecom"
                  :arrows="false"
                  :dots="true"
                >
                  <ul v-for="j in 5" :key="j" class="white-1">
                    <li class="fs-16 padding-right-44" v-for="i in 4" :key="i">
                      Lorem Ipsum is simply dummy text of the printing and type
                      setting industry.
                    </li>
                  </ul>
                </VueSlickCarousel>
                <br />
              </div>
            </div>
          </el-col>
          <el-col :span="11" style="width: 570px" :offset="1">
            <div class="bg-black-2 p20 rounded-08">
              <div class="fs-16 f-600 white-1 p10">Know about your mentor</div>
              <img
                style="width: 505px; height: 240px"
                src="@/assets/images/videoScreen.png"
              />
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </es-container>
</template>
<script>
import VueSlickCarousel from "vue-slick-carousel";

export default {
  components: { VueSlickCarousel },
  data: () => ({
    tab: "tab1",
    settingsRecom: {
      dots: true,
      focusOnSelect: false,
      infinite: !true,
      slidesToShow: 1,
      slidesToScroll: 1,
      touchThreshold: 5,
    },
    subjectSelect: "Cricket",
    subject: [
      {
        label: "Cricket",
        value: "Cricket",
      },
    ],
    bestPerform: [
      {
        position: "1st",
        level: 2,
        pos: "up",
      },
      {
        position: "2nd",
        level: 2,
        pos: "eq",
      },
      {
        position: "3rd",
        level: 2,
        pos: "up",
      },
      {
        position: "4th",
        level: 2,
        pos: "down",
      },
    ],
    series: [
      {
        name: "series1",
        data: [131, 100, 88, 81, 109, 109, 140],
      },
    ],
    chartOptions: {
      chart: {
        height: 350,
        type: "area",
      },
      colors: ["#FE9D2B"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },
      tooltip: {
        enabled: false,
      },
    },
    series2: [
      {
        name: "series1",
        data: [131, 132, 133, 134, 135, 136, 137],
      },
    ],
    chartOptions2: {
      chart: {
        height: 350,
        type: "area",
      },
      colors: ["#FE9D2B"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },
      tooltip: {
        enabled: false,
      },
    },
  }),
};
</script>

<style lang="scss">
.dashboard-catousel .slick-dots {
  bottom: -20px !important;
  li button:before,
  li.slick-active button:before {
    color: #1492e6 !important;
    opacity: 1;
  }
  li button:before {
    background-color: #8b8282 !important;
    border: none !important;
    border-radius: 50%;
    color: #8b8282 !important;
    display: inline-block;
    height: 15px !important;
    width: 15px !important;
  }
  li.slick-active button:before {
    background-color: #1492e6 !important;
    height: 15px !important;
    width: 15px !important;
  }
}

.dashboard-catousel .slick-dots li button::before {
  height: 15px !important;
  width: 15px !important;
  background: #fff;
  opacity: 0.5;
}

.padding-right-44 {
  padding-right: 44px;
}
.student-dash .apexcharts-legend-text {
  color: #858585 !important;
}
.student-dash .apexcharts-text tspan {
  display: none !important;
}
.selected-arrow {
  background: #575757;
}
.curve-path {
  height: 12rem;
  width: 100%;
  margin-top: -7px;
  background: #fe9d2b;
  overflow: auto;
  border-radius: 0 0 8px 8px;
}
.curve-idicate {
  width: 13.69px;
  height: 12px;
  border: 2px solid #1492e6;
  background: #1492e6;
  position: absolute;
  border-radius: 50%;
}
</style>
