<template>
  <el-col :span="span" class="toggle-btn" :class="isSelected ? 'selected' : ''">
    <div @click="toggled">{{ label }}</div>
  </el-col>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
    span: {
      type: Number,
      default: 24,
    },
  },
  data() {
    return {
      isSelected: false,
    };
  },
  watch: {
    value(newVal) {
      this.selected = newVal;
    },
  },
  methods: {
    toggled() {
      this.isSelected = !this.isSelected;
      this.$emit("input", this.isSelected);
    },
  },
  mounted() {
    this.isSelected = this.value;
  },
};
</script>
