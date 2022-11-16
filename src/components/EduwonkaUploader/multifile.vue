<template>
  <div v-loading.lock="loading">
    <el-checkbox v-if="fileRecords.length > 0" v-model="fileDeletable" class="file-preview-new">Select to open or delete a document</el-checkbox>
    <div :class="fileDeletable ? 'delete-upload' : ''">
      <VueFileAgent
        ref="fileInput"
        v-model="fileRecords"
        :theme="listType"
        :multiple="multiple"
        :deletable="fileDeletable"
        :linkable="true"
        :meta="true"
        :max-files="14"
        :help-text="'Choose file to upload'"
        :error-text="{
          type: 'Invalid file type',
          size: 'Files should not exceed 10MB in size',
        }"
        @select="filesSelected($event)"
        @beforedelete="onBeforeDelete($event)"
        @delete="fileDeleted($event)"
        @upload="onUpload($event)"
        @upload:error="onUploadError($event)"
      />
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
/* eslint-disable */
import VueFileAgentStyles from 'vue-file-agent/dist/vue-file-agent.css'
export default {
  name: 'EduwonkaMultifileUploader',
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
    },
    listType: {
      type: String,
      default: 'grid'
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      fileDeletable: false,
      fileRecords: [],
      uploadUrl: process.env.VUE_APP_BASE_API + '/upload',
      fileRecordsForUpload: [],
      hasSource: false,
      tempUrl: '',
      attachments: [],
      loading: false
    }
  },
  watch: {
    sourceFileList: {
      handler: function(value) {
        if (!this.hasSource && this.sourceFileList) {
          this.attachments = JSON.parse(JSON.stringify(this.sourceFileList))
          this.fileRecords = JSON.parse(JSON.stringify(this.sourceFileList)).map(x => {
            return {...JSON.parse(x.meta), id: x.id}
          })
        }
      },
      deep: true
    },
    attachments: {
      handler: function(value) {
        this.fileRecords = []
        this.fileRecords = this.attachments.map(x => {
         return {...JSON.parse(x.meta), id: x.id}
        })
      },
      deep: true
    }
  },
  created () {
    console.log(this.sourceFileList);
    if (this.sourceFileList) {
      this.hasSource = true
      this.attachments = JSON.parse(JSON.stringify(this.sourceFileList))
      this.fileRecords = JSON.parse(JSON.stringify(this.sourceFileList)).map(x => {
        return {...JSON.parse(x.meta), id: x.id}
      })
    }
  },
  methods: {
    uploadFiles: function() {
      // debugger
      // Using the default uploader. You may use another uploader instead.
      const uploadingFiles = this.fileRecordsForUpload
      this.$refs.fileInput.upload(this.uploadUrl, this.uploadHeaders, this.fileRecordsForUpload, function createFormData(fileData){
        var formData = new FormData();
        formData.append('action', 'upload');
        formData.append('meta', JSON.stringify(fileData)); // this is important! - the actual file for upload
        formData.append('file', fileData.file)
        return formData; // edit: fixed. Thanks to Chauhan-Nitesh for the comment below
      });
      this.fileRecordsForUpload = []
    },
    onUpload(responses) {
      console.log('Res', responses);
      this.attachments = this.attachments.concat(responses.map(x => x.data))
      console.log('This', this.attachments);
      this.$emit('value', this.attachments)
      this.$emit('loading', false)
      this.loading = false
    },
    deleteUploadedFile: function(fileRecord) {
      // Using the default uploader. You may use another uploader instead.

      this.$refs.fileInput.deleteUpload(this.uploadUrl, this.uploadHeaders, fileRecord)
    },
    filesSelected: function(fileRecordsNewlySelected) {
      var validFileRecords = fileRecordsNewlySelected.filter((fileRecord) => !fileRecord.error)
      this.fileRecordsForUpload = this.fileRecordsForUpload.concat(validFileRecords)
      this.$emit('loading', true)
      this.loading = true
      this.uploadFiles()
    },
    onBeforeDelete: function(fileRecord) {
      console.log('working');
      var i = this.fileRecordsForUpload.indexOf(fileRecord)
      if (i !== -1) {
        this.fileRecordsForUpload.splice(i, 1)
      } else {
        if (confirm('Are you sure you want to delete?')) {
          // debugger
          this.$refs.fileInput.deleteFileRecord(fileRecord) // will trigger 'delete' event
        }
      }
    },
    fileDeleted: function(fileRecord) {
      this.attachments = this.attachments.filter(x => x.id != fileRecord.id)
      this.$emit('value', this.attachments)
      var ii = this.fileRecords.indexOf(fileRecord)
      this.fileRecords.splice(ii, 1)
      this.fileDeletable = this.fileRecords.length > 0
      // console.log(fileRecord);
      // var i = this.fileRecordsForUpload.indexOf(fileRecord)
      // if (i !== -1) {
      //   this.fileRecordsForUpload.splice(i, 1)
      // } else {
      //   // this.deleteUploadedFile(fileRecord)
      // }
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
