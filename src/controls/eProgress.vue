<template>
  <div>
    <div class="progress-areas">
      <div
        class="progress-bars"
        :style="{
          width: percentage + '%',
          background: color,
          border: '1px solid' + color,
        }"
      >
        <div class="progress-num">{{ percentage }} %</div>
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
.progress-areas {
  width: 100%;
  border: 1px solid #fcdfbd;
  border-radius: 100px;
  height: 10px;
  margin-top: 5px;
}
.progress-bars {
  background: #fcdfbd;
  height: 10px;
  border-radius: 100px;
  position: relative;
}
.progress-num {
  color: #bc6c42;
  font-size: 10px;
  font-weight: 500;
  position: absolute;
  right: 0;
  background: white;
  border: 1px solid #fcdfbd;
  border-radius: 5px;
  padding: 2px 3px;
  top: -6px;
}
</style>
