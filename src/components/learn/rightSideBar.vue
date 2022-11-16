<template>
  <el-drawer
    :visible.sync="show"
    direction="rtl"
    size="437px"
    :before-close="()=>$emit('onClose')"
  >
    <span>
      <slot />
    </span>
  </el-drawer>
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

<style >
#el-drawer__title{position: absolute !important;right:10px;}
.el-dialog__close{
  /* border: 2px solid #000 !important;   */
}
.el-drawer__close-btn:hover{
  border:2px solid #BC6C42 !important;
  color:#BC6C42 !important;
}
.el-drawer__close-btn {
  width: 50px;
  height: 50px;
  border: 2px solid #000 !important;  
  border-radius: 50%;

}
</style>

