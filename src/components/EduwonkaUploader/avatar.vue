<template>
  <div class="">

    <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">
      Change
    </el-button>

    <image-cropper
      v-show="imagecropperShow"
      :key="imagecropperKey"
      :url="uploadUrl"
      lang-type="en"
      @close="close"
      @crop-upload-success="cropSuccess"
    />
  </div>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'

export default {
  name: 'ReallyAvatarUploader',
  components: { ImageCropper },
  data() {
    return {
      imagecropperShow: false,
      imagecropperKey: 0,
      uploadUrl: process.env.VUE_APP_BASE_API + '/upload'
    }
  },
  methods: {
    cropSuccess(resData) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.image = resData.url
      this.$emit('value', resData.id)
      this.$emit('url', resData.small_url)
    },
    close() {
      this.imagecropperShow = false
    }
  }
}
</script>

<style scoped>
  .avatar{
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
</style>

