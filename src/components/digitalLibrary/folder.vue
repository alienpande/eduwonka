<template>
  <div style="display:inline-block;margin:10px">
    <div @click="$emit('clicks', folder)" style="display: flex;background: white;width: 18rem;padding: 19px;border-radius:10px;">
      <img class="cp" style="padding-left: 20px;margin-right:20px" src="@/assets/icons/svg/folder.svg" alt="" />
      <div class="cp" style="color: #00000099; font-size: 15px; font-weight: 500">
        {{ folder.title }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    folder: {
      type: Object,
      default: null
    },
  }
}
</script>
