<template>
  <div>
    <div v-if="createOption === '' && uploadOption === ''">
      <div class="fs-20 f-500" style="margin-top: -51px; color: #000000cc">
        Create
      </div>
      <make-file @clicks="createOption = create.title" v-for="(create, i) in creates" :key="i" :icon="create.icon" :name="create.title" /><br /><br />
      <div class="fs-20 f-500" style="color: #000000cc">Upload</div>
      <make-file @clicks="uploadOption = upload.title" v-for="(upload, i) in uploads" :key="i" :icon="upload.icon" :name="upload.title" /><br /><br />
      <div style="display: flex">
        <e-svg icon="Group" />
        <div style="color: #000000; opacity: 0.6; margin-left: 10px">
          Creation of new document,Sheets and Slides will take you to the new
          tab.
        </div>
      </div>
    </div>
    <div v-if="createOption != ''">
      <div style="margin-top: -51px; display: flex">
        <e-svg @click="createOption = ''" icon="back" />
        <div class="f-500" style="font-size: 24px; margin: 7px 0 0 10px; color: #000000cc">
          Create {{ createOption }}
        </div>
      </div><br />
      <e-input :span="24" :label='"Name of the " + createOption' v-model="fileName" :placeholder="'Enter  ' + createOption + ' Name'" /><br/><br/><br/>
      <el-row>
        <el-col :span="3" :offset="18">
          <e-button css="cancel_btn" label="cancel" />
        </el-col>
        <el-col :span="3">
          <e-button label="Create" @click="createFile()" />
        </el-col>
      </el-row>
    </div>
    <div v-if="uploadOption === 'File'">
      <div style="margin-top: -51px; display: flex">
        <e-svg @click="uploadOption = ''" icon="back" />
        <div class="f-500" style="font-size: 24px; margin: 7px 0 0 10px; color: #000000cc">
          upload {{ uploadOption }}
        </div>
      </div><br />
      <e-input :span="24" :label='"Name of the " + uploadOption' v-model="file.title" :placeholder="'Enter  ' + uploadOption + ' Name'" /><br/><br/><br/>
      <el-row class="align-center">
        <el-col :span="10" :offset="7" class="single-upload">
          <el-card class="align-center">
            <div class="text-center mg-t-10">
              <eduwonka-file-uploader :accepted-types="'image/png, image/jpeg, application/pdf, .doc, .docx, application/msword'" :source-file-list="file.avatar" @value="v => file.avatar = v" />
            </div>
          </el-card>
        </el-col>
      </el-row><br /><br />
      <el-row>
        <el-col :span="3" :offset="18">
          <e-button css="cancel_btn" label="cancel" />
        </el-col>
        <el-col :span="3">
          <e-button label="Create" @click="submit()" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import EduwonkaFileUploader from '@/components/EduwonkaUploader/multifile.vue'
import makeFile from "@/components/digitalLibrary/makeFile.vue"
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
        icon: "folder",
      },
      {
        title: "New Document",
        icon: "doc",
      },
      {
        title: "New Sheet",
        icon: "excel",
      },
      {
        title: "New Slides",
        icon: "ppt",
      },
    ],
    uploads: [
      {
        title: "Folder",
        icon: "folderCloud",
      },
      {
        title: "File",
        icon: "folderCloud",
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
}
</script>
