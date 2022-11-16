<template>
  <div
  class="student-steps"
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
};
</script>
<style >
.student-steps .eStep > div > div > .el-step__icon.is-text{
    background: #282828 !important;
}
.student-steps .is-process .step-heading{
    color: #858585 !important;
}
/* .stepIconCss {
  width: 28px;
  margin-top: 20px;
  margin-left: 0.7rem;
} */
/*  */
.main-section {
  margin-top: 50px;
  cursor: pointer;
}
.step-heading {
  font-size: 14px;
  margin-top: 10px;
}
</style>
