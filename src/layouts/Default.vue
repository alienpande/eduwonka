<template>
  <div>
    <slot />
  </div>
</template>
<script>
export default {
  data() {
    return {
      view: this.$view,
    };
  },
  created() {
    this.$event.subscribe("resize", (v) => {
      this.view = v;
    });
  },
};
</script>
