<template>
  <el-row :gutter="20">
    <el-col :span="24" class="mb20">{{ title }}</el-col>
    <!-- <e-toggle-button
      v-for="(item, index) in defaultSubjects"
      v-bind:key="index + 1"
      :span="4"
      v-model="item.isSelected"
      :label="item.name"
      @input="onChange"
    >
    </e-toggle-button> -->
    <el-checkbox
      v-model="item.isSelected"
      v-for="(item, index) in defaultSubjects"
      v-bind:key="id + index + 1"
      :label="item.name"
      @change="onChange"
      border
    ></el-checkbox>

    <slot />
  </el-row>
</template>
<script>
import Vue from "vue";
export default {
  props: {
    value: {
      type: Array,
      default() {
        return [];
      },
    },
    title: {
      type: String,
      default: "Choose Subject",
    },
    id: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      defaultSubjects: [],
    };
  },
  mounted() {
    const subjects = require("@/api/subjects.json");
    this.defaultSubjects = Object.assign([], subjects);

    if (this.value.length) {
      this.defaultSubjects.forEach((s) => {
        const isFound = this.value.filter(
          (x) => x.id === s.id && x.isSelected
        )[0];
        if (isFound) {
          s.isSelected = true;
        }
      });
    }
    this.defaultSubjects.forEach((f, index) => {
      Vue.set(this.defaultSubjects[index], "isSelected", f.isSelected);
      console.log(index, f.isSelected);
    });
  },
  methods: {
    onChange() {
      const selectedSubjects = this.defaultSubjects.filter((x) => x.isSelected);
      this.$emit("input", selectedSubjects);
    },
  },
};
</script>
