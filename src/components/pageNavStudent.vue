<template>
  <el-row>
    <el-col :span="1">
      <e-svg
        v-if="hideBack"
        icon="backStudent"
        class="class-back-btn"
        @click="$emit('backClick', $event)"
      ></e-svg>
    </el-col>
    <el-col :span="18">
      <div class="heading" style="color: #F3F3F3;font-weight: bold;
font-size: 24px;">{{ heading }}</div>
    </el-col>
    <e-button
      v-if="btnText != ''"
      :span="4"
      plain
      class="text-right"
      :label="btnText"
      @click="$emit('btnClick', $event)"
    ></e-button>
  </el-row>
</template>

<script>
export default {
  props: {
    heading: {
      type: String,
      required: true,
    },
    btnText: {
      type: String,
      required: "",
    },

    hideBack: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style >
.heading {
  font-size: 24px;
  font-weight: 400;
  margin-left: -1.5rem !important;
  margin-top: 5px;
  color: #000000cc;
}
.class-back-btn{
    background: #353535;
    width: 24px;
    height: 24px;
    border: 1px solid #575757;
    box-sizing: border-box;
    border-radius: 4px;
    padding-left: 7px;
    padding-top: 2px;
    margin-top: 37px;
    margin-left: 11px;

}
</style>
