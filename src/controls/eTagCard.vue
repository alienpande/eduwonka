<template>
  <el-col :span="span">
    <div
      style="
        border: 1px solid var(---4d4f5c);
        background: #ffffff 0% 0% no-repeat padding-box;
        box-shadow: 0px 1px 3px #11111112;
        border: 1px solid #4d4f5c;
        border-radius: 4px;
        opacity: 1;
        margin-bottom: 20px;
      "
    >
      <div style="display: inline-block; padding: 12px; margin-left: 12px">
        {{ label }}
      </div>
      <e-more-menu
        style="
          display: inline-flex;
          float: right;
          padding: 0px 12px;
          margin-top: -5px;
        "
        @edit="$emit('edit', $event)"
        @delete="$emit('delete', $event)"
      />
    </div>
  </el-col>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
    },
    span: {
      type: Number,
      default: 24,
    },
  },
};
</script>
