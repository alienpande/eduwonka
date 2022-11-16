<template>
  <div>
    <button
      @click="$emit('click', $event)"
      :style="{ width: width + 'px' }"
      :class="{ 'button-plain-true': plain }"
      class="button-plain d-flex"
      style="justify-content:center"
    >
    <e-svg v-if="icon" style="margin-top:1px;margin-right:5px" :icon='icon'></e-svg>
      <div style="text-align:center">{{ text }}</div>
    </button>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
    },
    width: {
      type: Number,
    },
    plain: {
      type: Boolean,
    },
    icon:{
      type:String
    }
    
  },
};
</script>
<style scoped>
.button-plain {
  border: 1px solid #6e6e6e;
  box-sizing: border-box;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  padding: 10px 24px;
  color: #fe9d2b;
  font-weight: 500;
  font-size: 16px;
  text-align: center;
  width: 100%;
}
.button-plain-true {
  box-sizing: border-box;
  border-radius: 4px;
  background: #fe9d2b;
  padding: 10px 24px;
  color: #161616;
  font-weight: 500;
  font-size: 16px;
  text-align: center;
  width: 100%;
}
</style>
