<template>
  <div>
    <div class="all-modal-text">
      <e-svg class="boder-icons" icon="circle-border"></e-svg>
      <div v-if="title" class="modal-title">
      {{title}}
      </div>
      <div  class="modal-title">
     <slot/>
      </div>
      <div v-if="subtitle" class="modal-sub-title">{{subtitle}}</div>
    </div>
  </div>
</template>
<script>
export default {
    props:['title','subtitle']
}
</script>
<style >
.all-modal-text {
  position: relative;
  height: 6rem;
     border-left: 2px dashed #00000033;
     padding-left: 25px;
}
.boder-icons img {
  position: absolute;
      position: absolute;
    left: -17px;
}
.modal-title {
  color: #00000099;
  font-size: 16px;
}
.modal-sub-title {
  color: #00000066;
  opacity: 0.6;
}
</style>
