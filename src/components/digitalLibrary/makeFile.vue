<template>
  <div style="display:inline-block;margin:10px;cursor:pointer;" @click="$emit('clicks')">
    <div style="display: flex;background: rgb(188 108 66 / 10%);width: 11rem;padding: 23px;border-radius:10px;">
    <e-svg class="icons" v-if="icon === 'doc'" icon="google-docs" />
    <e-svg class="icons" v-if="icon === 'ppt'" icon="ppt" />
    <e-svg class="icons" v-if="icon === 'excel'" icon="excel" />
      <img v-if="icon==='folder'" style="margin-right:20px" src="@/assets/icons/svg/folder.svg" alt="" />
      <img v-if="icon==='folderCloud'" style="margin-right:20px;margin-top:-5px" src="@/assets/images/folderCloud.png" alt="" />
      <div style="color: #00000099; font-size: 15px; font-weight: 500">
        {{ name }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
    props:['name','icon']
}
</script>
<style >
.icons img{
   margin-right:20px
}
</style>
