<template>
  <div
    class="e-steps-container"
    :style="
      'width:' + width + ';margin: auto;margin-bottom: 30px;'
    "
  >
    <el-steps :active="active" class="eStep">
      <el-step v-for="(step, index) in steps" :key="index">
        <template slot="icon">
          <div
            style="text-align: center; width: 126px; height: 126px"
            @click="$emit('active-tab', index + 1)"
          >
            <e-svg
              style="margin-top: 2rem"
              :icon="step.icon"
              :css="stepIconCss"
            />
            <p class="step-heading">{{ step.title }}</p>
          </div>
        </template>
      </el-step>
    </el-steps>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stepIconCss: "stepIconCss",
    };
  },
  props: {
    width: {
      type: String,
      default: "500px",
    },
    steps: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      default: 0,
    },
  },
  mounted(){
    let mainBody = document.querySelector(".el-main.body");
    if(mainBody)
      mainBody.classList.add("sm-margin-top-35");
  }
};
</script>

<style scoped>
.stepIconCss {
  width: 28px;
  margin-top: 20px;
  margin-left: 0.7rem;
}
.main-section {
  margin-top: 50px;
  cursor: pointer;
}
.step-heading {
  font-size: 14px;
  margin-top: 10px;
}

@media only screen and (max-width:767px){
  .e-steps-container{
    position: fixed;
    top: 125px;
    background: #F7F9FB;
    z-index: 0;
    width: 100% !important;
    left: 0;
    padding: 15px 0px;
    margin: 0px !important;
  }
  .e-steps-container >>> div{
    flex-direction:row;
    justify-content: center;
    align-items:center;
    column-gap:5%;
  }
  .e-steps-container >>> .el-step.is-horizontal{
    flex-basis:auto !important;
  }
  .e-steps-container > div > div:last-child{
    max-width:none !important;
  }
  .e-steps-container >>> .el-step__line{
    transform: rotate(0deg);
    top: 50px !important;
    right: -43px !important;
  }
  .e-steps-container >>> .eStep>div>div>.el-step__icon.is-text{
    min-width: 100px !important;
    height: 100px !important;
  }
}

</style>
