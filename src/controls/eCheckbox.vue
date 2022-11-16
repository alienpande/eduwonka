<template>
  <el-col :span="span" class="checkbox">
    <el-checkbox
      v-model="value"
      @change="$emit('change', $event)"
      @input="$emit('input', $event)"
    >
      {{ text }}
    </el-checkbox>
  </el-col>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: "",
    },
    span: {
      type: Number,
      default: 24,
    },
  },
};
</script>

<style scoped>
.checkbox {
  height: 100px;
}
</style>
