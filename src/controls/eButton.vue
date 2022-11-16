<template>
  <el-col :span="span" :offset="offset">
    <el-button
      :type="type"
      :icon="icon"
      @click="$emit('click', $event)"
      :class="css"
      :size="size"
      :disabled="disabled"
      :autofocus="autofocus"
      :plain="plain"
      :circle="circle"
      :round="round"
      :loading="loading"
      :style="{ width: width + 'px' }"
    >
      {{ label }}
    </el-button>
  </el-col>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
    },
    icon: {
      type: String,
    },
    span: {
      type: Number,
      default: 24,
    },
    offset: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      default: "primary",
    },
    width: {
      type: String,
      default: "auto",
    },
    size: {
      // mini / medium / small
      type: String,
    },
    css: {
      // float-left && float-right (Global Classes SuperUtils)
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    circle: {
      type: Boolean,
      default: false,
    },
    plain: {
      type: Boolean,
      default: false,
    },
    round: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
