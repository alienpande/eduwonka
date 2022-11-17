<template>
  <div>
    <h3 class="heading-title" v-if="topHeading != ''">
      {{ topHeading }}
    </h3>
    <!-- <div class="form-container" style="padding: 30px 0px 0 0px"> -->
    <div class="form-container" :style="{padding: paddingContainer}">
      <el-form :rules="rules" :model="model">
        <el-row >
          <el-col :span="showBtn ? 20 : 24" v-if="heading || subHeading">
            <p class="heading" style="padding-left: 1.5rem !important;">{{ heading }}</p>
            <p class="subHeading" v-if="subHeading">{{ subHeading }}</p>
          </el-col>
          <e-button
            class="right"
            :span="showBtn ? 4 : 0"
            :label="btnText"
            :icon="btnIcon"
            @click="$emit('btnClick', $event)"
          ></e-button>
        </el-row>
        <el-row class="theme-form" :gutter="50" v-if="theme">
          <slot name="theme" />
        </el-row>
        <el-row class="theme-form-header" :gutter="50" v-if="themeHeader">
          <slot name="themeHeader" />
        </el-row>
        <div
          v-if="!theme"
          class="form-block"
          :style="{ backgroundColor: bgColor, paddingLeft: pLeft, paddingRight: pLeft }"
        >
          <slot name="header" />
          <el-row :gutter="gutter" v-if="!formInnerBorder" class="form-inputs-container">
            <slot />
          </el-row>
          <div :style="window.width > 767 ? 'padding: 0px 50px' : 'padding: 0px 10px;'" v-if="formInnerBorder">
            <div
              :class="innerFormCss"
              class="institute-onboard-form"
            >
              <slot />
            </div>
          </div>
          <slot name="footer" />
        </div>
        <el-row class="theme-form-footer" :gutter="50" v-if="themeFooter">
          <slot name="themeFooter" />
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import screenSize from '@/mixins/screenSize'
export default {
  props: {
    model: {
      type: Object,
      default() {
        return {}
      }
    },
    rules: {
      type: Object,
      default() {
        return {}
      }
    },
    heading: {
      type: String,
    },
    subHeading: {
      type: String,
    },
    bgColor: {
      type: String,
    },
    gutter: {
      type: Number,
      default: 20,
    },
    topHeading: {
      type: String,
      default: "",
    },
    innerFormCss: {
      type: String,
      default: "",
    },
    formInnerBorder: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: Boolean,
      default: false,
    },
    themeFooter: {
      type: Boolean,
      default: false,
    },
    themeHeader: {
      type: Boolean,
      default: false,
    },
    showBtn: {
      type: Boolean,
      default: false,
    },
    btnText: {
      type: String,
      default: "Add",
    },
    btnIcon: {
      type: String,
      default: "el-icon-plus",
    },
    pLeft: {
      type: String,
      default: "30px",
    },
    paddingContainer: {
      type: String,
      deafult: "30px 0px 0 0px"
    }
  },
  mixins: [screenSize],
  data() {
    return {};
  },
};
</script>

<style scoped>
.institute-onboard-form {
  border: 2px dashed #484b4d73;
  border-radius: 10px;
  text-align: center;
  padding: 100px;
}
/* .form-inputs-container{
  display:flex;
  flex-wrap:wrap;
} */
@media only screen and (device-width: 768px) {
  .institute-onboard-form{
    padding : 40px 40px 100px 40px;
  }
}
@media only screen and (max-width:767px){
  .form-container{
    padding: 30px 0px 0px 0px !important;
  }
  .institute-onboard-form{
    padding : 30px !important;
  }
}
</style>