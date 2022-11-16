<template>
  <div class=" upload-container">
    <el-upload
      v-loading="loading"
      :multiple="true"
      :action="uploadUrl"
      list-type="picture-card"
      :before-upload="startUpload"
      :on-progress="handleProgress"
      :on-success="handleImageSuccess"
      :on-error="handleUploadError"
      :file-list="fileList"
      :auto-upload="true"
      :accept="acceptedTypes"
    >
      <i slot="default" class="el-icon-plus" />
      <div slot="file" slot-scope="{file}">
        <img
          v-if="file.small_url !== null"
          :data-small-url="file.small_url"
          class="el-upload-list__item-thumbnail "
          :src="file.small_url"
          alt=""
        >
        <img
          v-else-if="file.small_url === null && (file.url.match(/\.(jpeg|jpg|gif|png)$/) !== null)"
          :data-small-url="file.small_url"
          class="el-upload-list__item-thumbnail "
          :src="file.url"
          alt=""
        >
        <img
          v-else
          :data-small-url="require('@/assets/images/eduwonka_logo.png')"
          class="el-upload-list__item-thumbnail "
          :src="require('@/assets/images/eduwonka_logo.png')"
          alt=""
        >
        <label class="el-upload-list__item-status-label"><i class="el-icon-upload-success el-icon-check" /></label>
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in" />
          </span>
          <span
            class="el-upload-list__item-delete"
            @click="handleDownload(file)"
          >
            <i class="el-icon-download" />
          </span>
          <span
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete" />
          </span>
        </span>
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'ReallyMultifileUploader',
  props: {
    value: {
      type: String,
      default: ''
    },
    sourceFileList: {
      type: Array,
      default: function() { return [] }
    },
    acceptedTypes: {
      type: String,
      default: 'image/png, image/jpeg'
    }
  },
  data() {
    return {
      tempUrl: '',
      attachments: [],
      uploadUrl: process.env.VUE_APP_BASE_API + '/upload',
      fileList: [],
      loading: false,
      hasSource: false
    }
  },
  computed: {
    imageUrl() {
      return this.value
    }
  },
  watch: {
    sourceFileList: {
      handler: function(value) {
        if (!this.hasSource && this.sourceFileList) {
          this.attachments = JSON.parse(JSON.stringify(this.sourceFileList))
          this.fileList = JSON.parse(JSON.stringify(this.sourceFileList)).map(x => { return { name: x.small_url, url: x.small_url, small_url: x.small_url } })
        }
      },
      deep: true
    },
    fileList: {
      handler: function(value) {
        // console.log(this.fileList)
      },
      deep: true
    },
    attachments: {
      handler: function(value) {
        this.fileList = []
        this.fileList = this.attachments.map(x => { return { name: x.small_url, url: x.small_url, small_url: x.small_url } })
      },
      deep: true
    }
  },
  created() {
    // console.log('created time')
    if (this.sourceFileList) {
      this.hasSource = true
      this.attachments = JSON.parse(JSON.stringify(this.sourceFileList))
      this.fileList = JSON.parse(JSON.stringify(this.sourceFileList)).map(x => { return { name: x.small_url, url: x.small_url, small_url: x.small_url } })
    }
  },
  methods: {
    handleUploadError() {
      this.loading = false
      this.$emit('loading', false)
      this.$notify({
        title: 'Upload',
        type: 'error',
        message: 'Uploading failed, please contact service provider',
        duration: 2000
      })
    },
    rmImage(uuid) {
      var arr = this.attachments
      arr.indexOf(uuid) !== -1 && arr.splice(arr.indexOf(uuid), 1)
      this.attachments = arr
      this.emitInput()
    },
    emitInput() {

    },
    handleImageSuccess(response) {
      // console.log(response)
      // console.log(this.attachments)
      this.attachments.push(response)
      this.loading = false
      this.$emit('loading', false)
      // var temp = this.attachments.map((el) => { return el.id })
      // temp = "{" + temp.join(",") + "}"
      this.$emit('value', this.attachments)
    },
    handleProgress(ev, rawFile) {
      // console.log(rawFile)
      ev.percentage = 99
    },
    startUpload() {
      this.loading = true
      this.$emit('loading', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-container {
  width: 100%;
  height: 100%;
  position: relative;
}
.el-upload-list--picture .el-upload-list__item-status-label {
    position: absolute;
    right: -17px;
    top: -7px;
    width: 46px;
    height: 26px;
    background: #13ce66;
    text-align: center;
    transform: rotate(45deg);
    box-shadow: 0 1px 1px #ccc;
}
</style>
