<template>
  <es-container pageTitle="St. Stephens School">
    <div>
      <el-row style="padding: 0 20px">
        <el-col :span="12">
          <el-card
            class="rounded-08 bg-black-2"
            style="border: none; margin: 10px"
            shadow="none"
          >
            <img
              style="margin: auto; display: block; margin-top: 30px"
              src="@/assets/images/profileVideoIcon.png"
            />
            <div
              class="fs-16 f-600 text-center"
              style="color: #858585; padding-top: 20px"
            >
              Your Camera is turned off
            </div>
            <br />
            <div class="hr"></div>
            <br />

            <div class="d-flex" style="justify-content: center">
              <e-svg class="icon-bg-custom" icon="videoMute"></e-svg>
              <e-svg
                class="icon-bg-custom"
                style="padding: 0 14px"
                icon="microphone"
              ></e-svg>
            </div>
            <br />
            <es-button
              @click="checkLevel = true"
              text="Check Video & Audio levels"
              style="display: block; margin: auto; width: 420px"
              width="400"
            ></es-button>
            <br />
          </el-card>
        </el-col>
        <el-col :span="8" :offset="3">
          <br />
          <br /><br /><br />
          <div style="color: #f3f3f3" class="fs-20 f-600 text-center">
            Ready to Join?
          </div>
          <br />
          <div style="color: #858585; font-size: 12px; text-align: center">
            Class starts in
          </div>

          <div class="d-flex" style="justify-content: center">
            <div class="class-time">00</div>
            <div class="time-dot">:</div>
            <div class="class-time">10</div>
            <div class="time-dot">:</div>
            <div class="class-time">46</div>
          </div>
          <br /><br />
          <es-button
            style="display: block; margin: auto; width: 370px"
            text="Join Now"
          ></es-button>
          <br /><br />
          <es-button
            style="display: block; margin: auto; width: 370px"
            :plain="true"
            text="Present"
          ></es-button>
        </el-col>
      </el-row>
      <!-- =================check audio level======================== -->
      <es-dialog
        v-model="checkLevel"
        width="40%"
        top="20vh"
        noEsc
        :gutter="20"
        hideDefaultFooter
        @cancel="checkLevel = false"
        @confirm="checkLevel = false"
      >
        <div
          class="f-600 text-center"
          style="color: #f3f3f3; font-size: 24px; margin-top: -55px"
        >
          Audio Check
        </div>
        <br />
        <el-card
          class="rounded-08 bg-black-3"
          style="border: none"
          shadow="none"
        >
          <el-row>
            <el-col :span="9" :offset="7">
              <es-select
                placeholder="Microphone: Laptop"
                :options="microphone"
              ></es-select>
            </el-col>
          </el-row>
          <br />
          <div class="d-flex">
            <e-svg
              class="icon-bg-custom"
              style="padding: 0 14px"
              icon="microphoneWhite"
            ></e-svg>
            <div
              v-for="(level, i) in audioLevel"
              :key="i"
              :class="{
                'high-level': level === 'high',
                'empty-level': level === '',
              }"
              class="audio-level"
            ></div>
          </div>
        </el-card>
        <br />
        <br />
        <div style="font-size: 16px; color: #f3f3f3; text-align: center">
          Does the Audio levels change when you say “Hello” ?
        </div>
        <br />
        <div class="d-flex" style="justify-content: center">
          <es-button
            text="No"
            @click="(checkLevel = false), (audioSetting = true)"
            width="200"
            style="margin-right: 15px"
          ></es-button>
          <es-button
            text="Yes"
            @click="(checkLevel = false), (checkVideo = true)"
            :plain="true"
            width="200"
          ></es-button>
        </div>
        <br />
        <br />
        <div class="text-white" style="text-align: right">Skip ></div>
      </es-dialog>
      <!-- =======================check video level ====================-->

      <es-dialog
        v-model="checkVideo"
        width="40%"
        top="20vh"
        noEsc
        :gutter="20"
        hideDefaultFooter
        @cancel="checkVideo = false"
        @confirm="checkVideo = false"
      >
        <div
          class="f-600 text-center"
          style="color: #f3f3f3; font-size: 24px; margin-top: -55px"
        >
          Camera Check
        </div>
        <br />
        <img
          style="display: block; margin: auto"
          src="@/assets/images/videoChek.png"
          alt=""
        />

        <br />
        <div style="font-size: 16px; color: #f3f3f3; text-align: center">
          Can you see yourself above?
        </div>
        <br />
        <div class="d-flex" style="justify-content: center">
          <es-button
            text="No"
            width="200"
            style="margin-right: 15px"
          ></es-button>
          <es-button text="Yes" @click="$router.push($url.LN_ONLINE_CLASS)" :plain="true" width="200"></es-button>
        </div>
        <br />

        <div class="text-white" style="text-align: right">Skip ></div>
      </es-dialog>
      <!-- ===================AUDIO SETTING================= -->
      <es-dialog
        v-model="audioSetting"
        width="40%"
        top="20vh"
        noEsc
        :gutter="20"
        hideDefaultFooter
        @cancel="audioSetting = false"
        @confirm="audioSetting = false"
      >
        <img
          style="display: block; margin: auto"
          src="@/assets/images/audioSetting.png"
          alt=""
        />

        <br />
        <div style="font-size: 16px; color: #f3f3f3; text-align: center">
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old.
        </div>
        <br />
        <es-button
          text="Go to Settings"
          style="display: block; margin: auto; width: 300px"
          :plain="true"
          width="300"
        ></es-button>
        <br />

        <div class="text-white d-flex">
          <e-svg icon="leftArrow"></e-svg>
          <div style="margin-left: 10px">Go back</div>
        </div>
      </es-dialog>
    </div>
  </es-container>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  data: () => ({
    checkLevel: false,
    checkVideo: false,
    audioSetting: false,
    microphone: [
      {
        title: "Microphone: Laptop",
        value: "Microphone: Laptop",
      },
    ],
    audioLevel: ["low", "low", "low", "low", "high", "", "", ""],
  }),
  methods: {
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth"]),
    activeTabChange(e) {
      this.activeTab = e;
    },
    scrollTop() {
      this.$nextTick(() => {
        this.$refs.tab2.scrollTop = 0;
      });
    },
  },
   mounted() {
    /* this.setAsideMenuCollapse(true);
    setTimeout(() => {
      this.setAsideWidth("100px");
    }, 100); */
  },
  created() {
//    this.setAsideMenuCollapse(true);
//    this.setAsideWidth("100px");
  },
  destroyed() {
    this.setAsideMenuCollapse(false);
  },
};
</script>
<style>
.audio-level {
  content: "";
  background: #1fc24e;
  width: 32px;
  height: 12px;
  margin: 15px 12px;
  display: block;
}
.high-level {
  background: #fec600 !important;
}
.empty-level {
  background: #575757 !important;
}
</style>
