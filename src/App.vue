<template>
  <section id="app" :class="$view">
    <component :is="layout" ref="componentRef">
      <vue-page-transition name="fade-in-left">
        <router-view ref="childRef"></router-view>
      </vue-page-transition>
    </component><div></div>
  </section>
</template>

<script>
import { AppLayout } from "./util/contants";
import Vue from "vue";
import { mapMutations } from "vuex";
export default {
  computed: {
    layout() {
      return this.$route.meta.layout || AppLayout.Home;
    },
  },
  mounted() {
    this.onWindowResize();
    window.addEventListener("resize", this.onWindowResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.onWindowResize);
  },
  methods: {
    ...mapMutations("Common", ["setView"]),
    onWindowResize() {
      const v = this.$currentViewport ? this.$currentViewport.label : "s";
      this.setView(v);
      this.$event.publish("resize", v);
      Vue.prototype.$view = v;
    },
  },
};
</script>

<style scoped>
/* @import'~bootstrap/dist/css/bootstrap.css'; */
#app {
  font-family: Poppins, Helvetica, Arial, sans-serif;
}
</style>
