<template>
  <div class="student-progress">
    <div class="progress-areas">
      <div
        class="progress-bars"
        :style="{
          width: percentage + '%',
          background: color,
          border: '1px solid' + color,
        }"
      >
        <div :style="{ background: color, border: '1px solid' + color,}" class="progress-num">{{ percentage }} %</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: "Progress",
    },
    color: {
      type: String,
    },
    percentage: {
      type: Number,
      default: 0,
    },
    withBG: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style scoped>
.student-progress .progress-areas {
  width: 100%;
  /* border: 1px solid #fcdfbd; */
  border-radius: 100px;
  height: 10px;
  background: #353535;
  margin-top: 5px;
}
.student-progress .progress-bars {
  background: #1492E6;
  height: 10px;
  display: flex;
  border-radius: 100px;
  position: relative;
}
.student-progress .progress-num {
  color: white;
  font-size: 10px;
  font-weight: 500;
  position: absolute;
  right: 0;
  background: #1492E6;
      /* width: 21px; */
  border-radius: 5px;
  padding: 2px 3px;
  top: -6px;
}
</style>
