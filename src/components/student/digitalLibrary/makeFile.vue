<template>
  <div style="display:inline-block;margin:10px;cursor:pointer;" @click="$emit('clicks')">
    <div style="  display: flex;background: #282828;width: 11rem;padding: 23px;border-radius:10px;">
    <e-svg class="icons" v-if="icon === 'examPaper'" icon="examPaper" />
    <e-svg class="icons" v-if="icon === 'examCircular'" icon="examCircular" />
    <e-svg class="icons" v-if="icon === 'slides'" icon="slides" />
    <e-svg class="icons" v-if="icon === 'folderYellow'" icon="folderYellow" />
    <e-svg class="icons" v-if="icon === 'darkFile'" icon="darkFile" />
      <div class="tx-16 f-500 text-white">{{ name }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props:['name','icon']
}
</script>
<style >
.icons img {
  margin-right: 20px
}
</style>
