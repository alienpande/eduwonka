<template>
  <div v-if="icon" @click="$emit('click')">
    <img class="pointer" :src="svgLogo" :class="css" />
    <!-- <simple-svg class="pointer" :src="svgLogo" :custom-class-name="css" /> -->
    <!-- <picture>
      <source :srcset="svgLogo" format="image/svg+xml" />
    </picture> -->
    <!-- <object
      :data="svgLogo"
      class="svgClass pointer"
      :class="css"
      type="image/svg+xml"
    ></object> -->
    <!-- <div v-html="svgLogo"></div> -->
  </div>
  <span v-else-if="f" @click="$emit('click')">
    <v-icon :name="f" :base-class="css" class="pointer"></v-icon>
  </span>
</template>

<script>
import Vue from "vue";
import feather from "vue-icon";
Vue.use(feather, "v-icon");

// import { SimpleSVG } from "vue-simple-svg";
// Vue.component("simple-svg", SimpleSVG);
export default {
  name: "eSvg",
  props: {
    icon: {
      type: String,
      default: "",
    },
    f: {
      type: String,
    },
    css: {
      type: String,
      default: "",
    },
  },
  computed: {
    svgLogo() {
      return this.icon
        ? require("../assets/icons/svg/" + this.icon + ".svg")
        : "";
    },
    img() {
      return this.icon != ""
        ? `<img svg-inline="" src="${this.svgLogo}" />`
        : "";
    },
  },
  created() {
    //  console.log(require("../assets/icons/svg/" + this.icon + ".svg"));
  },
  methods: {
    clicked() {
      alert("asd");
      // this.$emit("click", $event);
    },
    // getSvg() {
    //   return (
    //     '<img svg-inline svg-sprite :src="require("../assets/icons/svg/' +
    //     this.icon +
    //     '.svg")" />'
    //   );
    // },
  },
};
</script>
