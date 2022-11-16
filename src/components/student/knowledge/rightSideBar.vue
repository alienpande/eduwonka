<template>
  <el-drawer
    custom-class="custom-drawer"
    :visible.sync="show"
    direction="rtl"
    size="437px"
    height="600px"
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
.el-drawer.custom-drawer {
    background-color: #1E1E1E;
}
#el-drawer__title {
    position: absolute !important;
    right:10px;
}
.el-drawer__close-btn:hover {
  border:2px solid #F17F22 !important;
  color:#F17F22 !important;
}
.el-drawer__close-btn {
  width: 50px;
  height: 50px;
  color: white;
  border: 2px solid white !important;  
  border-radius: 50%;

}
</style>

