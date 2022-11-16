<template>
  <right-side-bar :show="show" @onClose="__onCancel">
    <div style="width: 321px;padding-left:2rem !important" class="heading">
      <!-- Lorem ipsum dolor sit amet consectetur  -->
      {{ qtData.name }}
    </div>
    <hr style="opacity: 0.2" />
    <div style="padding: 10px 30px">
      <el-row>
        <el-col :span="10">
          <el-avatar :size="98" :src="require('@/assets/images/profile.jpg')" />
        </el-col>
        <el-col :span="4" style="width:auto">
          <div style="margin-top: 20px" class="heading">
            {{ user ? user.first_name : '' }}
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="sb-section__2 exam-right">
      <div class="pd-x-30 pd-10 pd-b-30">
        <el-card
          shadow="none"
          style="background: rgba(248, 243, 238, 0.35)"
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
              <span style="color: rgb(0, 0, 0); font-weight: bold">
                {{ standard.name }}
              </span>
            </el-col>
            <el-col
              :span="12"
              style="border-bottom: 2px solid #fcdfbd; padding: 10px"
            >
              <span>Subject</span> <br />
              <span style="color: rgb(0, 0, 0); font-weight: bold">{{
                sub.name
              }}</span>
            </el-col>
            <el-col
              style="border-right: 2px solid #fcdfbd; padding: 10px"
              :span="12"
            >
              <span>Attendance</span> <br />
              <span style="color: rgb(0, 0, 0); font-weight: bold">
                {{ qtData.result_audience ? qtData.result_audience.length : 0 }}/{{ qtData.totalAttendence }}
              </span>
            </el-col>
            <el-col style="padding-top: 10px" :span="12">
              <span>Time left</span> <br />
              <span style="color: rgb(0, 0, 0); font-weight: bold">
                {{ qtData.test_time }} m</span
              >
            </el-col>
          </el-row>
        </el-card>
      </div>
      <div style="background: #e6eaed">
        <div
          style="
            display: flex;
            justify-content: space-between;
            padding-right: 29px;
            padding-top: 10px;
          "
        >
          <div
            style="
              padding: 0px 15px 0px 21px;
              font-size: 20px;
              font-weight: 400;
            "
          >
            Submissions
          </div>

          <img
            style="height: 36px"
            src="@/assets/icons/svg/download-icon.png"
            alt=""
          />
        </div>
        <el-tabs class="floatTabHeader" v-model="activeName">
          <el-tab-pane label="Submitted" name="submitted">
            <VueSlickCarousel v-bind="settings" :arrows="false" :dots="true">
              <div v-for="i in 2" :key="i" class="right-slite">
                <el-card
                  shadow="none"
                  style="margin: 10px"
                  class="rounded-08 pg-50 cp mb-10"
                  v-for="i in submitted"
                  :key="i.id"
                >
                  <div @click="handleClick(i)">
                    <!-- @click="$router.push($url.LN_EXAM_SUBMISSION + '/' + i.id)" -->
                    <el-row>
                      <el-col :span="7">
                        <el-avatar
                          class="avater-couse"
                          :size="90"
                          :src="require('@/assets/images/profile.jpg')"
                        />
                      </el-col>
                      <el-col :span="11">
                        <div class="pro-name">{{ i.user ? i.user.first_name : '' }}</div>
                      </el-col>
                      <el-col :span="6">
                        <div
                          style="
                            border-radius: 10px;
                            background: rgb(188 108 66 / 10%);

                            text-align: center;
                            padding: 10px;
                          "
                        >
                          <div class="avg-score">Score</div>
                          <div class="avg-score-point">
                            {{ i.user.secureMarks }}/{{
                              qtData.form_questions[0].total_marks
                            }}
                            <!-- {{qtData.form_questions[0].answer.marks}} -->
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </el-card>
              </div>
            </VueSlickCarousel>
          </el-tab-pane>

          <el-tab-pane label="Not-Submitted" name="notSubmitted">
            <VueSlickCarousel v-bind="settings" :arrows="false" :dots="true">
              <div v-for="i in 2" :key="i.id" class="right-slite">
                <el-card
                  shadow="none"
                  style="margin: 10px"
                  class="rounded-08 pg-50 cp mb-10"
                  v-for="i in notSubmitted"
                  :key="i.id"
                >
                  <!-- <div
                    @click="$router.push($url.LN_EXAM_SUBMISSION)"
                  > -->
                  <el-row>
                    <el-col :span="7">
                      <el-avatar
                        class="avater-couse"
                        :size="90"
                        :src="require('@/assets/images/profile.jpg')"
                      />
                    </el-col>
                    <el-col :span="11">
                      <div class="pro-name">{{ i.user ? i.user.first_name : '' }}</div>
                    </el-col>
                    <el-col :span="6">
                      <div
                        style="
                          border-radius: 10px;
                          background: rgb(188 108 66 / 10%);

                          text-align: center;
                          padding: 10px;
                        "
                      >
                        <div class="avg-score">Score</div>
                        <div class="avg-score-point">
                          0/{{ qtData.form_questions[0].total_marks }}
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                  <!-- </div> -->
                </el-card>
              </div>
            </VueSlickCarousel>
          </el-tab-pane>
        </el-tabs>
        <div
          v-if="activeName == 'submitted'"
          style="
            padding: 10px 15px 0px 21px;
            font-size: 20px;

            font-weight: 400;
          "
        >
          Best performers
        </div>
        <div class="pd-x-30 pd-10 pd-b-30" v-if="activeName == 'submitted'">
          <el-card
            shadow="none"
            style="background: white"
            class="rounded-08 text-center classroom-right__slide"
          >
            <el-row style="opacity: 0.8">
              <el-col
                :span="12"
                style="padding: 10px"
                v-for="i in bestPerformers"
                :key="i.id"
              >
                <el-avatar
                  class="avater-couse"
                  :size="90"
                  :src="require('@/assets/images/profile.jpg')"
                />

                <div
                  style="
                    color: rgb(0, 0, 0);
                    padding: 0 15px;
                    font-weight: bold;
                  "
                >
                  {{ i.user ? i.user.first_name : '' }}
                </div>
                <div style="color: #bc6c42; font-size: 16px; font-weight: 500">
                  {{ i.user.secureMarks }}/{{
                    qtData.form_questions[0].total_marks
                  }}
                </div>
              </el-col>
              <!-- <el-col
                :span="12"
                style="
                  border-right: 2px solid #fcdfbd;
                  border-bottom: 2px solid #fcdfbd;
                  padding: 10px;
                "
              >
                <el-avatar
                  class="avater-couse"
                  :size="90"
                  :src="require('@/assets/images/profile.jpg')"
                />

                <div
                  style="
                    color: rgb(0, 0, 0);
                    padding: 0 15px;
                    font-weight: bold;
                  "
                >
                  Kenneth patrick
                </div>
                <div style="color: #bc6c42; font-size: 16px; font-weight: 500">
                  15/15
                </div>
              </el-col>
              <el-col
                :span="12"
                style="border-bottom: 2px solid #fcdfbd; padding: 10px"
              >
                <el-avatar
                  class="avater-couse"
                  :size="90"
                  :src="require('@/assets/images/profile.jpg')"
                />

                <div
                  style="
                    color: rgb(0, 0, 0);
                    padding: 0 15px;
                    font-weight: bold;
                  "
                >
                  Kenneth patrick
                </div>
                <div style="color: #bc6c42; font-size: 16px; font-weight: 500">
                  15/15
                </div>
              </el-col>
              <el-col
                style="border-right: 2px solid #fcdfbd; padding: 10px"
                :span="12"
              >
                <el-avatar
                  class="avater-couse"
                  :size="90"
                  :src="require('@/assets/images/profile.jpg')"
                />

                <div
                  style="
                    color: rgb(0, 0, 0);
                    padding: 0 15px;
                    font-weight: bold;
                  "
                >
                  Kenneth patrick
                </div>
                <div style="color: #bc6c42; font-size: 16px; font-weight: 500">
                  15/15
                </div>
              </el-col>
              <el-col style="padding-top: 10px" :span="12">
                <el-avatar
                  class="avater-couse"
                  :size="90"
                  :src="require('@/assets/images/profile.jpg')"
                />

                <div
                  style="
                    color: rgb(0, 0, 0);
                    padding: 0 18px;
                    font-weight: bold;
                  "
                >
                  Kenneth patrick
                </div>
                <div style="color: #bc6c42; font-size: 16px; font-weight: 500">
                  15/15
                </div>
              </el-col> -->
            </el-row>
          </el-card>
        </div>

        <div
          v-if="activeName == 'submitted'"
          style="
            padding: 10px 15px 0px 21px;
            font-size: 20px;

            font-weight: 400;
          "
        >
          Weak performers
        </div>
        <div class="pd-x-30 pd-10 pd-b-30" v-if="activeName == 'submitted'">
          <el-card
            shadow="none"
            style="background: transparent"
            class="rounded-08 text-center classroom-right__slide"
          >
            <el-row style="opacity: 0.8">
              <el-col
                v-for="i in weakPerformers"
                :key="i.id"
                :span="12"
                style="padding: 10px"
              >
                <el-avatar
                  class="avater-couse"
                  :size="90"
                  :src="require('@/assets/images/profile.jpg')"
                />

                <div
                  style="
                    color: rgb(0, 0, 0);
                    padding: 0 15px;
                    font-weight: bold;
                  "
                >
                  {{ i.user ? i.user.first_name : '' }}
                </div>
                <div style="color: #bc6c42; font-size: 16px; font-weight: 500">
                  {{ i.user.secureMarks }}/{{
                    qtData.form_questions[0].total_marks
                  }}
                </div>
              </el-col>
              <!-- <el-col
                :span="12"
                style="
                  border-right: 2px solid #fcdfbd;
                  border-bottom: 2px solid #fcdfbd;
                  padding: 10px;
                "
              >
                <el-avatar
                  class="avater-couse"
                  :size="90"
                  :src="require('@/assets/images/profile.jpg')"
                />

                <div
                  style="
                    color: rgb(0, 0, 0);
                    padding: 0 15px;
                    font-weight: bold;
                  "
                >
                  Kenneth patrick
                </div>
                <div style="color: #bc6c42; font-size: 16px; font-weight: 500">
                  0/15
                </div>
              </el-col>
              <el-col
                :span="12"
                style="border-bottom: 2px solid #fcdfbd; padding: 10px"
              >
                <el-avatar
                  class="avater-couse"
                  :size="90"
                  :src="require('@/assets/images/profile.jpg')"
                />

                <div
                  style="
                    color: rgb(0, 0, 0);
                    padding: 0 15px;
                    font-weight: bold;
                  "
                >
                  Kenneth patrick
                </div>
                <div style="color: #bc6c42; font-size: 16px; font-weight: 500">
                  1/15
                </div>
              </el-col>
              <el-col
                style="border-right: 2px solid #fcdfbd; padding: 10px"
                :span="12"
              >
                <el-avatar
                  class="avater-couse"
                  :size="90"
                  :src="require('@/assets/images/profile.jpg')"
                />

                <div
                  style="
                    color: rgb(0, 0, 0);
                    padding: 0 15px;
                    font-weight: bold;
                  "
                >
                  Kenneth patrick
                </div>
                <div style="color: #bc6c42; font-size: 16px; font-weight: 500">
                  2/15
                </div>
              </el-col>
              <el-col style="padding-top: 10px" :span="12">
                <el-avatar
                  class="avater-couse"
                  :size="90"
                  :src="require('@/assets/images/profile.jpg')"
                />

                <div
                  style="
                    color: rgb(0, 0, 0);
                    padding: 0 18px;
                    font-weight: bold;
                  "
                >
                  Kenneth patrick
                </div>
                <div style="color: #bc6c42; font-size: 16px; font-weight: 500">
                  15/15
                </div>
              </el-col> -->
            </el-row>
          </el-card>
        </div>
        <div
          v-if="activeName == 'submitted'"
          style="
            padding: 10px 15px 0px 21px;
            font-size: 20px;

            font-weight: 400;
          "
        >
          Most answered questions
        </div>
        <el-row style="padding: 10px 20px" v-if="activeName == 'submitted'">
          <el-col
            v-for="i in mostAnswered"
            :key="i.question.id"
            :span="10"
            style="margin-left: 38px"
          >
            <el-card
              shadow="none"
              style="margin: 5px"
              class="rounded-08 text-center pg-50 cp"
            >
              Question {{ i.position }}
            </el-card>
          </el-col>
          <!-- <el-col :span="10" style="margin-left: 38px">
            <el-card
              shadow="none"
              style="margin: 5px"
              class="rounded-08 text-center pg-50 cp"
            >
              Question 5
            </el-card>
          </el-col>
          <el-col :span="10">
            <el-card
              shadow="none"
              style="margin: 5px"
              class="rounded-08 text-center pg-50 cp"
            >
              Question 6
            </el-card>
          </el-col>
          <el-col :span="10" style="margin-left: 38px">
            <el-card
              shadow="none"
              style="margin: 5px"
              class="rounded-08 text-center pg-50 cp"
            >
              Question 7
            </el-card>
          </el-col>
          <el-col :span="10">
            <el-card
              shadow="none"
              style="margin: 5px"
              class="rounded-08 text-center pg-50 cp"
            >
              Question 8
            </el-card>
          </el-col> -->
        </el-row>

        <div
          v-if="activeName == 'submitted'"
          style="
            padding: 10px 15px 0px 21px;
            font-size: 20px;

            font-weight: 400;
          "
        >
          Least answered questions
        </div>
        <el-row style="padding: 10px 20px" v-if="activeName == 'submitted'">
          <el-col
            v-for="i in leastAnswered"
            :key="i.question.id"
            :span="10"
            style="margin-left: 38px"
          >
            <el-card
              shadow="none"
              style="margin: 5px"
              class="rounded-08 text-center pg-50 cp"
            >
              Question {{ i.position }}
            </el-card>
          </el-col>
          <!-- <el-col :span="10" style="margin-left: 38px">
            <el-card
              shadow="none"
              style="margin: 5px"
              class="rounded-08 text-center pg-50 cp"
            >
              Question 1
            </el-card>
          </el-col>
          <el-col :span="10">
            <el-card
              shadow="none"
              style="margin: 5px"
              class="rounded-08 text-center pg-50 cp"
            >
              Question 2
            </el-card>
          </el-col>
          <el-col :span="10" style="margin-left: 38px">
            <el-card
              shadow="none"
              style="margin: 5px"
              class="rounded-08 text-center pg-50 cp"
            >
              Question 3
            </el-card>
          </el-col>
          <el-col :span="10">
            <el-card
              shadow="none"
              style="margin: 5px"
              class="rounded-08 text-center pg-50 cp"
            >
              Question 4
            </el-card>
          </el-col> -->
        </el-row>
        <div
          style="
            padding: 10px 15px 0px 21px;
            font-size: 20px;

            font-weight: 400;
          "
        >
          Attendance
        </div>

        <el-tabs
          class="floatTabHeader"
          style="margin-top: 20px !important"
          v-model="activeList"
        >
          <el-tab-pane label="Attended" name="attended">
            <div
              style="display: flex; margin: 10px 0"
              v-for="i in submitted"
              :key="i.id"
            >
              <el-avatar
                class="avater-couse"
                style="margin: 0 20px"
                :size="60"
                :src="require('@/assets/images/profile.jpg')"
              />
              <div style="font-weight: 600; font-size: 15px; margin-top: 16px">
                <!-- Kenneth patrick -->
                {{ i.user ? i.user.first_name : '' }}
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Skipped" name="skipped">
            <div
              style="display: flex; margin: 10px 0"
              v-for="i in skippedStudents"
              :key="i.id"
            >
              <el-avatar
                class="avater-couse"
                style="margin: 0 20px"
                :size="60"
                :src="require('@/assets/images/profile.jpg')"
              />
              <div style="font-weight: 600; font-size: 15px; margin-top: 16px">
                <!-- Kenneth patrick -->
                {{ i ? i.first_name : '' }}
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Left" name="left">
            <div
              style="display: flex; margin: 10px 0"
              v-for="i in notSubmitted"
              :key="i.id"
            >
              <el-avatar
                class="avater-couse"
                style="margin: 0 20px"
                :size="60"
                :src="require('@/assets/images/profile.jpg')"
              />
              <div style="font-weight: 600; font-size: 15px; margin-top: 16px">
                <!-- Kenneth patrick -->
                {{ i.user ? i.user.first_name : '' }}
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>

        <!-- end -->
      </div>
    </div>
  </right-side-bar>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher"
import RightSideBar from "@/components/school/rightSideBar.vue"
import VueSlickCarousel from "vue-slick-carousel"
export default {
  components: { RightSideBar, VueSlickCarousel },
  props: {
    qtData: {
      type: Object,
      default: null,
    },
    user: {
      type: Object,
      default: null,
    },
    notSubmitted: {
      type: Array,
      default: null,
    },
    submitted: {
      type: Array,
      default: null,
    },
    bestPerformers: {
      type: Array,
      default: null,
    },
    weakPerformers: {
      type: Array,
      default: null,
    },
    skippedStudents: {
      type: Array,
      default: null,
    },
    mostAnswered: {
      type: Array,
      default: null,
    },
    leastAnswered: {
      type: Array,
      default: null,
    },
    show: { type: Boolean, default: false },
    __onCancel: Function,
  },
  data: () => ({
    activeName: "submitted",
    activeList: "attended",
    standard: {},
    sub: {},
    settings: {
      dots: true,
      focusOnSelect: false,
      infinite: !true,
      slidesToShow: 1,
      slidesToScroll: 1,
      touchThreshold: 5,
    },
  }),
  created() {
    this.getStandardSubjects()
  },
  methods: {
    getStandardSubjects() {
      const query = `query{
        standards_by_pk(id: "${this.$route.params.standard_id}") {
          id
          name
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.standard = response.standards_by_pk
      })
      const query1 = `query{
        subjects_by_pk(id: "${this.$route.params.subject_id}") {
          id
          name
        }
      }`
      dispatchGraphql(query1).then((response) => {
        this.sub = response.subjects_by_pk
      })
    },
    handleClick(i) {
      var standard_subject = []
      standard_subject.push(this.$route.params.standard_id)
      standard_subject.push(this.$route.params.subject_id)
      localStorage.setItem("standard_subject", standard_subject)
      this.$router.push(this.$url.LN_EXAM_SUBMISSION + "/" + i.id)
    }
  },
};
</script>
<style lang="scss">
.exam-right .floatTabHeader.el-tabs.el-tabs--top > .el-tabs__header {
  position: inherit !important;
}
.exam-right .el-tabs__nav-scroll {
  padding: 0 28px !important;
  padding-top: 70px !important;
}
.sb-section__2 {
  height: 326px;
  overflow-y: scroll;
  padding-bottom: 20px;
}
.exam-right .el-tabs__header {
  border-bottom: 1px solid #fcdfbd !important;
}

.slick-dots {
  bottom: -8px;
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
.class-btn__coursle {
  border-radius: 16px;
  border: none;
  font-size: 12px;
  padding: 6px 16px;
  background: #fcdfbd;
  margin-left: 18px;
  margin-top: 5px;
  margin-bottom: 20px;

  color: #00000080;
}
.pro-name {
  font-size: 15px;
  font-weight: bold;
  color: rgb(51, 51, 51);
  width: 85px;
  text-align: center;
  margin-top: 20px;
}
.mb-10 {
  margin-bottom: 10px;
}
.avg-score {
  font-size: 14px;
  font-weight: 300;
  color: #52575d;
}
.avg-score-point {
  color: #000000;
  opacity: 0.8;
  font-size: 24px;
  font-weight: 500;
}
.right-slite {
  width: 97% !important;
  display: inline-block;
  margin-left: 8px;
  margin-bottom: 20px !important;
}
</style>