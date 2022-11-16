<template>
  <el-col :span="span" @click="toggle" style="margin: 20px 0px 20px 0px">
    <div
      class="student-profile-card"
      :class="(disabled ? 'disabled' : '') || (value ? '' : 'unselected')"
    >
      <el-avatar shape="circle" :size="size" :src="src"></el-avatar>
      <div>
        {{ name }}
      </div>
      <e-button
        round
        :plain="!value"
        :label="disabled ? 'Not allowed' : !value ? 'Excellent' : 'Average'"
        size="small"
        @click="toggle"
      />
    </div>
  </el-col>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    span: {
      type: Number,
      default: 6,
    },
    btnText: {
      type: String,
      required: "",
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    unSelected: {
      type: Boolean,
      required: false,
    },
    src: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    size: {
      type: Number,
      default: 90,
    },
  },
  methods: {
    toggle() {
      if (!this.disabled) {
        this.$emit("input", !this.value);
      }
    },
  },
};
</script>
<style scoped>
.heading {
  font-size: 24px;
  font-weight: 400;
  margin-left: -3rem;
  margin-top: 5px;
  color: #000000cc;
}
</style>
