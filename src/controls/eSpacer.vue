<template>
  <div :style="{ height: height }"></div>
</template>
<script>
export default {
  props: {
    height: {
      type: String,
      default: "200px",
    },
  },
};
</script>
