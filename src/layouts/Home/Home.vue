<template>
  <el-container>
    <el-header
      :class="{view, 'student-background' : this.bgColor() === 'black'}"
      class="header"
    >
      <navbar />
    </el-header>
    <section :class="view">
      <slot />
    </section>
  </el-container>
</template>
<script>
import Navbar from "./Navbar/Navbar.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: { Navbar },
  data() {
    return {
      view: this.$view,
      studentBack: "#1E1E1E",
    };
  },
  methods: {
    ...mapGetters("Common", ["bgColor"]),
    ...mapMutations("Common", ["setBg"]),
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
  z-index: 3;
  background: #fff;
}
.header.s {
  height: 54px !important;
  background: #f6f8f9;
}
@media only screen and (max-width: 426px) { 
  .header{
    height: 54px !important;
  }
}
.student-background{
  background: #1E1E1E;
  border-bottom: 1px solid #353535;
z-index: 3 !important;
}
</style>
