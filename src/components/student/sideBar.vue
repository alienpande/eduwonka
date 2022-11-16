<template>
  <div class="student-side-bar">
    <el-drawer
      :visible.sync="show"
      direction="rtl"
      size="437px"
      :before-close="() => $emit('onClose')"
    >
      <span>
        <slot />
      </span>
    </el-drawer>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
  },
  data() {
    return {
      // drawer: true
    };
  },
};
</script>

<style>
.student-side-bar .el-dialog__close {
  color: white !important;
}
.student-side-bar .el-drawer__wrapper {
  top: 0 !important;
}
/* .student-side-bar .el-drawer__open .el-drawer.rtl, */
.student-side-bar .el-drawer__body {
  background: black !important;
  z-index: 3 !important;
  /* width: 361px !important; */
}
.student-side-bar #el-drawer__title {
  position: absolute !important;
  top: -19px !important;
  right: 10px;
  z-index: 4 !important;
  cursor: pointer;
}

.student-side-bar .el-drawer__close-btn:hover {
border: none !important;
}
.el-dialog__close {
  /* border: 2px solid #000 !important;   */
}

/* .student-side-bar .el-drawer__close-btn:hover {
  border: 2px solid #bc6c42 !important;
  color: #bc6c42 !important;
} */

 .student-side-bar .el-drawer__close-btn {
  width: 50px;
  height: 50px;
  border: none !important;
  border-radius: 50%;
}
</style>
