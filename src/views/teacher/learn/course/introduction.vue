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
          Lorem ipsum : dolor sit amet consectetur
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

    <el-row style="padding: 0 25px 0 25px">
      <el-col :span="11" style="margin-right: 20px">
        <div class="heading">Introduction</div>
        <el-card
          shadow="none"
          style="
            margin-bottom: 10px;
            font-size: 14px;
            height: 16.5rem;
            overflow: auto;
            color: rgb(0 0 0 / 60%);
          "
          class="rounded-08 pg-50 cp"
        >
          Lorem ipsum dolor sit , consectetur adipiscing elit. Cras egestas
          pretium magna id euismod. Etiam molestie tristique nulla, at fermentum
          felis imperdiet viverra. Suspendisse nisl lectus, molestie cursus leo
          quis, dapibus dapibus lectus. Etiam ornare interdum pellentesque.
          Pellentesque erat arcu, suscipit eu ex sed, fermentum elementum nibh.
          Duis feugiat lectus sit amet risus pretium aliquet. Integer posuere
          suscipit tellus vel posuere. Sed aliquet faucibus ligula eu accumsan.
          Proin at odio pellentesque, scelerisque justo at, ullamcorper sapien.
          Praesent ullamcorper nisi augue, at ornare dui gravida id. Integer
          tristique, dapibus dapibus lectus. Etiam ornare interdum pellentesque.
          Pellentesque erat arcu, eu ex sed, fermentum elementum nibh. Duis
          feugiat lectumcorper nisi augue, us vel posuere. Sed aliquet faucibus
          ligula eu accumsan. Proin at odio pellentemmsssque, s asscelerisque
          justo at, ullamcorper .
        </el-card>
        <div class="heading">Tasks of the session</div>
        <el-card
          shadow="none"
          style="margin-bottom: 10px; padding: 0 60px"
          class="rounded-08 pg-50 cp"
        >
          <VueSlickCarousel v-bind="settings" :arrows="false" :dots="true">
            <div v-for="i in 7" :key="i">
              <div>
                <el-avatar
                  class="avater-couse"
                  :size="90"
                  :src="require('@/assets/images/profile.jpg')"
                />
                <div class="coursle-name">Marina Campbell</div>
                <button class="class-btn__coursle">class 6</button>
              </div>
            </div>
          </VueSlickCarousel>
        </el-card>
      </el-col>
      <el-col :span="7">
        <div class="heading">Tasks of the session</div>
        <el-card
          shadow="none"
          style="margin: 10px; height: 16.5rem; overflow: auto"
          class="rounded-08"
        >
          <div
            style="display: flex; margin-bottom: 18px"
            v-for="i in 7"
            :key="i"
          >
            <e-svg
              style="display: inline-block; margin-top: 8px; margin-right: 8px"
              icon="Pointer"
            />
            <div style="font-size: 14px; opacity: 0.6">
              Lorem ipsum dolor sit amet consectetur adipiscing elit
            </div>
          </div>
        </el-card>

        <div class="heading">Key objectives</div>
        <el-card
          shadow="none"
          style="margin: 10px; height: 16.5rem; overflow: auto"
          class="rounded-08"
        >
          <div
            style="display: flex; margin-bottom: 18px"
            v-for="i in 7"
            :key="i"
          >
            <e-svg
              style="display: inline-block; margin-top: 8px; margin-right: 8px"
              icon="Pointer"
            />
            <div style="font-size: 14px; opacity: 0.6">
              Lorem ipsum dolor sit amet consectetur adipiscing elit
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <introduction-right
      :show="showSideBar"
      :__onCancel="() => (showSideBar = !showSideBar)"
    />
  </div>
</template>
<script>
import introductionRight from "@/components/learn/course/indroductionRight.vue";
import VueSlickCarousel from "vue-slick-carousel";
export default {
  components: { VueSlickCarousel, introductionRight },
  data: () => ({
    showSideBar: false,
    settings: {
      dots: true,
      focusOnSelect: false,
      infinite: !true,
      slidesToShow: 2.5,
      slidesToScroll: 1,
      touchThreshold: 5,
    },
  }),
};
</script>

<style lang="scss">
// .class-info__span {
//   background: white;
//   display: inline-block;
//   padding: 11px 22px;
//   border-radius: 10px;
//   color: rgb(0 0 0 / 60%);
//   font-size: 16px;
//   margin-right: 10px;
// }

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
.coursle-name {
  color: #222222;
  font-size: 16px;
  font-weight: 500;
  width: 106px;
  text-align: center;
}
.avater-couse {
  margin-left: 10px;
}
</style>
