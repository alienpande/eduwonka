<template>
  <div>
    <div v-if="createOption === '' && uploadOption === ''">
      <div class="fs-20 f-500 text-white mg-t-15">
        Create
      </div>
      <make-file @clicks="createOption = create.title" v-for="(create, i) in creates" :key="i" :icon="create.icon" :name="create.title" />
      <br /><br />
      <div class="fs-20 f-500 text-white mg-t-15">Upload</div>
      <make-file @clicks="uploadOption = upload.title" v-for="(upload, i) in uploads" :key="i" :icon="upload.icon" :name="upload.title" />
      <br /><br />
      <div style="display: flex">
        <e-svg icon="darkGroup" />
        <div class="text-white" style="opacity: 0.6; margin-left: 10px">
          Creation of new document,Sheets and Slides will take you to the new
          tab.
        </div>
      </div>
    </div>
    <div v-if="createOption != ''">
      <div style="margin-top: 10px; display: flex">
        <e-svg @click="createOption = ''" icon="darkBack" />
        <span class="f-500 text-white tx-24 mg-l-20" style="margin-top: -7px">Create {{ createOption }}</span>
      </div>
      <el-row class="mg-t-40">
        <es-input :span="24" :label='"Name of the " + createOption' v-model="fileName" :placeholder="'Enter ' + createOption + ' Name'" />
      </el-row>
      <hr class="mg-t-50" style="opacity: 10%" />
      <el-row>
        <el-col :span="4" :offset="7">
          <es-button text="Cancel" />&emsp;
        </el-col>
        <el-col :span="4" :offset="1">
          <es-button text="Create" :plain="true" @click="createFile()" />
        </el-col>
      </el-row>
    </div>
    <div v-if="uploadOption != ''">
      <div style="margin-top: 10px; display: flex">
        <e-svg @click="uploadOption = ''" icon="darkBack" />
        <span class="f-500 text-white tx-24 mg-l-20" style="margin-top: -7px">Upload {{ uploadOption }}</span>
      </div>
      <el-row class="mg-t-40">
        <es-input :span="24" :label='"Name of the " + uploadOption' v-model="file.title" :placeholder="'Enter ' + uploadOption + ' Name'" />
      </el-row>
      <el-row class="align-center">
        <el-col :span="10" :offset="7" class="single-upload">
          <el-card class="align-center">
            <div class="text-center mg-t-10">
              <eduwonka-file-uploader :accepted-types="'image/png, image/jpeg, application/pdf, .doc, .docx, application/msword'" :source-file-list="file.avatar" @value="v => file.avatar = v" />
            </div>
          </el-card>
        </el-col>
      </el-row><br /><br />
      <hr class="mg-t-50" style="opacity: 10%" />
      <el-row>
        <el-col :span="4" :offset="7">
          <es-button text="Cancel" />&emsp;
        </el-col>
        <el-col :span="4" :offset="1">
          <es-button text="Create" :plain="true" @click="submit()" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import EduwonkaFileUploader from '@/components/EduwonkaUploader/multifile.vue'
import makeFile from '@/components/student/digitalLibrary/makeFile.vue'
import eButton from "@/controls/eButton.vue"
import logo from '@/assets/images/file.png'
export default {
  components: { eButton, makeFile, EduwonkaFileUploader },
  data: () => ({
    photoUrl: logo,
    createOption: '',
    uploadOption: '',
    file: {},
    fileName: '',
    creates: [
      {
        title: "New Folder",
        icon: "folderYellow",
      },
      {
        title: "New Document",
        icon: "examPaper",
      },
      {
        title: "New Sheets",
        icon: "examCircular",
      },
      {
        title: "New Slides",
        icon: "slides",
      },
    ],
    uploads: [
      {
        title: "Folder",
        icon: "folderYellow",
      },
      {
        title: "File",
        icon: "darkFile",
      },
    ],
  }),
  methods: {
    createFile() {
      this.$emit('create', this.createOption, this.fileName)
    },
    submit() {
      this.$emit('upload', this.uploadOption, this.file)
    }
  }
};
</script>
