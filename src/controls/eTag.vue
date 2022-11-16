<template>
  <el-tag
    :size="size"
    :effect="effect"
    @click="$emit('click', $event)"
    :closable="closable"
    :type="type"
    :color="color"
  >
    <slot />
  </el-tag>
</template>
<script>
export default {
  props: {
    size: {
      type: String,
      default: "medium ",
    },
    effect: {
      type: String,
      default: "dark",
    },
    color: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
    closable: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
