<template>
  <div style="overflow: auto; height: 80vh">
    <el-row style="display: flex; padding: 15px">
      <el-col :span="16" style="display: flex">
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
         Course content
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
        "
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
    <el-row style="margin-left: 25px; padding: 0 60px">
      <el-col :span="10">
        <div class="heading">Introduction</div>
        <el-card
          shadow="none"
          style="padding: 20px 10px"
          class="rounded-08 pg-50 cp"
        >
          <el-row>
            <el-col :span="5">
              <el-avatar
                class="avater-couse"
                :size="90"
                :src="require('@/assets/images/profile.jpg')"
              />
            </el-col>
            <el-col :span="16">
              <div class="coursle-name">Marina Campbell</div>
              <button class="class-btn__coursle">Positive track</button>
            </el-col>
          </el-row>
          <div
            style="
              font-size: 20px;
              font-weight: 500;
              color: rgb(34 34 34 / 80%);
              margin-top: 10px;
              padding: 5px 0;
            "
          >
            Progress stats
          </div>
          <div style="display: flex; justify-content: space-between">
            <div>
              <span
                style="
                  font-size: 14px;
                  font-weight: 300;
                  display: block;
                  color: rgb(0 0 0 / 80%);
                  margin-top: 10px;
                "
                >Ongoing</span
              >
              <span
                style="
                  font-size: 20px;
                  font-weight: 500;
                  color: rgb(0 0 0 / 80%);
                  margin-top: 15px;
                "
                >5 classes</span
              >
            </div>
            <div>
              <span
                style="
                  font-size: 14px;
                  font-weight: 300;
                  display: block;
                  color: rgb(0 0 0 / 80%);
                  margin-top: 10px;
                "
                >Completed</span
              >
              <span
                style="
                  font-size: 20px;
                  font-weight: 500;
                  color: rgb(0 0 0 / 80%);
                  margin-top: 15px;
                "
                >2 classes</span
              >
            </div>
            <div>
              <span
                style="
                  font-size: 14px;
                  font-weight: 300;
                  display: block;
                  color: rgb(0 0 0 / 80%);
                  margin-top: 10px;
                "
                >Upcoming</span
              >
              <span
                style="
                  font-size: 20px;
                  font-weight: 500;
                  color: rgb(0 0 0 / 80%);
                  margin-top: 15px;
                "
                >3 classes</span
              >
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" style="margin-left: 40px">
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
            <div v-for="i in 8" :key="i" class="cousole-wrap">
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
    </el-row>
    <div style="padding: 0 86px" class="student-tab">
      <div class="heading subtopic">Subtopic progress</div>

      <el-tabs class="floatTabHeader" v-model="activeName">
        <el-tab-pane label="Active" name="activeSubtopic">
          <el-row >
            <el-col
              class="i-icon"
              style="position: relative"
              v-for="i in 5"
              :key="i"
              :span="10"
            >
              <el-card
                shadow="none"
                style="margin: 5px"
                class="rounded-08 pg-50 cp"
              >
                <div style="display: flex">
                  <button
                    style="border: none; background: transparent"
                    v-tooltip.top-center="msg"
                  >
                    <e-svg icon="Group"> </e-svg>
                  </button>
                  <span
                    style="
                      font-size: 16px;
                      padding: 0 20px;
                      opacity: 0.8;
                      color: #222222;
                    "
                    >Subtopic 1</span
                  >
                  <div style="width: 350px; padding-left: 17px">
                    <e-progress percentage="30"></e-progress>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="Upcoming" name="upcomingSubtopic"> </el-tab-pane>
        <el-tab-pane label="Completed" name="completeSubtopic"> </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import VueSlickCarousel from "vue-slick-carousel";
export default {
  components: { VueSlickCarousel },
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
.student-tab .floatTabHeader.el-tabs.el-tabs--top > .el-tabs__header {
  position: inherit !important;
}
.subtopic {
  padding-bottom: 67px;
}
.i-icon:hover .syllabus-toltip {
  visibility: visible !important;
}


.tooltip .tooltip-inner {
  background: white;
  color: black;
  border-radius: 10px;
  border: 2px solid #FCDFBD;
  width: 130px;
  padding: 10px 15px;
  font-size: 12px;
}
</style>
