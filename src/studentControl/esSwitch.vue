<template>
  <div>
    <div class="d-flex" @click="$emit('input', !value)">
      <div class="switch-wrapper">
        <div
          class="d-flex"
          style="
            color: white;
            justify-content: space-between;
            width: 215px;
            z-index: 1;
          "
        >
          <div
            style="color: #b4b4b4; width: 107px; text-align: center"
            :class="{ 'switch-on': value }"
          >
            {{ text1 }}
          </div>
          <div
            style="color: #b4b4b4; width: 107px; text-align: center"
            :class="{ 'switch-on': !value }"
          >
            {{ text2 }}
          </div>
        </div>
        <div
          class="switch-circle"
          :class="{ 'switch-circle-on': !value }"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: true,
    },
    text1: {
      type: String,
    },
    text2: {
      type: String,
    },
  },
  data: () => ({}),
};
</script>
<style>
.switch-wrapper {
  width: 215px;
  height: 36px;
  display: flex;
  cursor: pointer;
  border-radius: 18px;

  align-items: center;
  /* padding: 2px; */
  transition: all 0.5s;
  background: #353535;
  position: relative;
}
.switch-circle {
  width: 107px;
  height: 36px;
  position: absolute;
  background: #fe9d2b;
  border-radius: 18px;
  margin-left: 0px;
  transition: all 0.2s;
}
.switch-on {
  color: #161616 !important;
}
.switch-circle-on {
  transition: all 0.2;
  margin-left: 111px;
}
</style>
