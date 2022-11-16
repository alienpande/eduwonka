<template>
<div class="student-dialog">
  <el-dialog
    :title="title"
    :visible="value"
    :width="width"
    :top="top"
    :fullscreen="fullscreen"
    @closed="
      $emit('input', !value);
      $emit('cancel', $event);
    "
    @close="
      $emit('input', !value);
      $emit('cancel', $event);
    "
    :custom-class="css"
    :show-close="!hideClose"
    :close-on-click-modal="noPersist"
    :close-on-press-escape="!noEsc"
  >
    <el-row :gutter="gutter">
      <slot />
    </el-row>
    <span slot="footer" class="dialog-footer">
      <div
        v-if="showFooterBorder"
        style="border-bottom: 2px solid #fcdfbd; margin-bottom: 25px"
      ></div>
      <slot name="footer" />
      <el-button
        v-if="!hideDefaultFooter"
        @click="$emit('cancel', $event)"
        type="link"
      >
        {{ btnCancelText }}
      </el-button>
      <el-button
        v-if="!hideDefaultFooter"
        type="primary"
        @click="$emit('confirm', $event)"
      >
        {{ btnConfirmText }}
      </el-button>
    </span>
  </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    noEsc: {
      type: Boolean,
      default: false,
    },
    noPersist: {
      type: Boolean,
      default: false,
    },
    hideDefaultFooter: {
      type: Boolean,
      default: false,
    },
    showFooterBorder: {
      type: Boolean,
      default: false,
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
    hideClose: {
      type: Boolean,
      default: false,
    },
    gutter: {
      type: Number,
      default: 0,
    },
    css: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    top: {
      type: String,
      default: "30vh",
    },
    width: {
      type: String,
      default: "30%",
    },
    btnCancelText: {
      type: String,
      default: "Cancel",
    },
    btnConfirmText: {
      type: String,
      default: "Confirm",
    },
  },
};
</script>
<style >
.student-dialog .el-dialog{
background: #1E1E1E !important;
}
.student-dialog .el-dialog__headerbtn .el-dialog__close{
  color: #F3F3F3 !important;
}
.student-dialog .el-dialog__title {
  color: #F3F3F3 !important;
  font-size: 22px;
}
</style>
