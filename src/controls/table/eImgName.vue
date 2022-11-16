<template>
  <el-row>
    <el-col :span="4" style="height:'(size)'">
      <el-avatar :shape="shape" :size="size" :src="src"></el-avatar>
    </el-col>
    <el-col :span="20">
      <div style="margin-left: 1.4rem; " :style="nameStyle">
        {{ name }}
      </div>
    </el-col>
  </el-row>
</template>
<script>
export default {
  props: {
    shape: {
      type: String,
      default: "circle",
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
      default: 40,
    },
    nameStyle: { type: String, default: "" },
    iconStyle: {
      type: String,
      default: "",
    },
  },
};
</script>
