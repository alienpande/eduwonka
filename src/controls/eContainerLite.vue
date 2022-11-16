<template>
  <section class="e-container-lite">
    <el-row class="header" v-if="!hideHeader">
      <el-col :span="window.width > 767 ? 2 : 24">
        <e-svg icon="back" @click="$emit('back', $event)"></e-svg
      ></el-col>
      <el-col :span="window.width > 767 ? 17 : 16">
        <el-tag
          v-if="tag"
          style="
            background: #fcdfbd;
            font-weight: 600;
            color: #bc6c42;
            border-radius: 15px;
            padding: 0px 20px;
          "
          >
            <company-name :campusid="campusid" />
          </el-tag
        >
        <slot name="titleHead" />
      </el-col>
      <el-col :span="window.width > 767 ? 5 : 8" class="text-right">
        <slot name="rightHead" />
        <!-- <e-progress
          class="mt30"
          v-if="percentage >= 0"
          :percentage="percentage"
          withBG
        /> -->
        <progress-bar :campusid="campusid" class="mt-30" v-if="campusid"/>
        <el-button
          @click="$emit('rightButtonClick', $event)"
          v-if="btnRightTitle"
          label="btnRightTitle"
          size="medium"
        ></el-button>
      </el-col>
    </el-row>
    <el-main class="body" :style="window.width > 767 ? '' : 'padding: 40px 60px !important;'">
      <slot />
      <el-row class="text-right footer-top-border" v-if="showFooter">
        <e-button
          :span="5"
          :offset="17"
          type="link"
          :label="saveBtnText"
          @click="$emit('save', $event)"
        ></e-button>
        <e-button
          :span="2"
          :width="nextBtnWidth"
          :label="nextBtnText"
          @click="$emit('next', $event)"
        ></e-button>
      </el-row>
    </el-main>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import eButton from "./eButton.vue";
import ProgressBar from "@/components/onboarding/ProgressBar";
import CompanyName from "@/components/onboarding/Company";
import screenSize from '@/mixins/screenSize'
export default {
  components: { eButton, ProgressBar, CompanyName },
  name: "eContainerLite",
  mixins: [screenSize],
  props: {
    hideHeader: {
      type: Boolean,
      default: false,
    },
    showFooter: {
      type: Boolean,
      default: false,
    },
    percentage: {
      type: Number,
      default: -1,
    },
    campusid: {
      type: String,
      default: "",
    },
    btnRightTitle: {
      type: String,
      default: "",
    },
    tag: {
      type: String,
      default: "",
    },
    subTitle: {
      type: String,
      default: "",
    },
    btnIcon: {
      type: String,
      default: "",
    },
    saveBtnText: {
      type: String,
      default: "Save & Continue later",
    },
    nextBtnText: {
      type: String,
      default: "Next",
    },
    nextBtnWidth: {
      type: String,
      default: "150",
    },
    back: {
      type: String,
      default: "",
    },
    rightButtonClick: {
      type: String,
      default: "",
    },
  },
  methods: {
    ...mapGetters("Common", ["asideMenuCollapse"]),
  },
};
</script>
