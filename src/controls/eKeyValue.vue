<template>
  <el-row :gutter="gutter">
    <el-col :span="span" style="font-weight: 600" :class="keyCss"
      >{{ item.key }}
    </el-col>
    <el-col :span="span" style="margin-bottom: 20px" :class="valueCss">
      {{ item.value }}
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "eKeyValue",
  props: {
    item: {
      type: Object,
      default() {
        return {
          key: "",
          value: "",
        };
      },
    },
    span: {
      type: Number,
      default: 12,
    },
    valueCss: {
      type: String,
      default: "",
    },
    keyCss: {
      type: String,
      default: "",
    },
    gutter: {
      type: Number,
      default: 20,
    },
  },
};
</script>
