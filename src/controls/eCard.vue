<template>
  <el-col :span="span" style="padding:0px !important; width:100%" class="ecard-container">
    <div style="margin-bottom: 1rem;font-size: 20px;font-weight: 500;" v-if="title != ''">{{ title }}</div>
    <div v-if="titleBold != ''"
      style="margin-bottom: 1rem; font-weight: bold; font-size: 20px"
      
    >
      {{ titleBold }}
    </div>
    <slot name="header" />
    <div
      style="
        background: #fff;
        box-shadow: 0px 1px 4px #15223214;
        border-radius: 6px;
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
        
      "

      :style="{
        'margin-top': title != '' ? '0px' : '46px',
        height: containerHeight, 
        overflowY: overFlowY
      }"
    >
      <div class="content-wrapper" style="padding: 30px" :style="{paddingLeft:paddingX,paddingRight:paddingX}">
        <div style="font: 16px; color: #00000099">
          {{ subTitle }} 
        </div>
        <div class="slot-wrapper" style="padding: 18px">
          <slot />
        </div>
      </div>

      <div
        v-if="bottom.title"
        style="
          background: rgba(252, 223, 189, 0.4);
          text-align: center;
          padding-top: 20px;
          padding-bottom: 20px;
          color: rgb(188, 108, 66);
          cursor: pointer;
          font-size: 14px;
          margin-top: auto;
        "
      >
        <router-link :to="bottom.link" style="color: rgb(188, 108, 66)">
          {{ bottom.title }}
          <i
            
            class="el-icon-arrow-right"
          ></i>
        </router-link>
      </div>
    </div>

    <slot name="footer" />
  </el-col>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    containerHeight: {
      type: String,
      default: "442px",
    },
    paddingX: {
      type: String,
      default: "30px",
    },
    overFlowY: {
      type: String,
      default: "hidden",
    },
    subTitle: {
      type: String,
      default: "",
    },
    span: {
      type: Number,
      default: 24,
    },
    titleBold: {
      type: String,
      default: ''
    },
    bottom: {
      type: Object,
      default() {
        return {
          title: "",
          link: "",
        };
      },
      upIcon: {
        type: Boolean,
        default: false,
      },
    },
    css: {
      type: String,
      default: "dashcardRows",
    },
    obj: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
<style>
.rotate45 {
  transform: rotate(90deg) !important;
}
</style>
<style scoped>
@media only screen and (max-width:767px){

  .ecard-container{
      width: 100% !important;
      padding: 20px 0px !important;
    }
  .content-wrapper{
    padding: 20px !important;
  }  
  .slot-wrapper{
    padding: 0px !important;
  }
}
</style>