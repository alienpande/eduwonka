<template>
  <el-container>
    <el-header :class="view" class="header">
      <navbar hideLeftNav />
    </el-header>
    <section :class="view">
      <slot />
    </section>
  </el-container>
</template>
<script>
import Navbar from "./Navbar/Navbar.vue";
export default {
  components: { Navbar },
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
<style scoped>
.header {
  height: 120px !important;
  box-shadow: 0px 1px 4px #15223214;
  z-index: 1;
  background: #fff;
}
.header.s {
  height: 54px !important;
  background: #f6f8f9;
}
</style>
