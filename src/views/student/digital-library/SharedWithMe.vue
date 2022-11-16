<template>
  <es-container pageTitle="Shared with me" class="bg-black-5">
    <el-row class="mg-l-5">
      <el-col class="mg-t-5" :span="8" :offset="9">
        <es-search v-model="searchBy" placeholder="Search"></es-search>
      </el-col>
      <el-col :span="3" :offset="1">
        <es-select placeholder="File Type" class="select-icon"></es-select>
      </el-col>
      <el-col :span="2" class="mg-l-20">
        <es-select placeholder="sort" class="select-icon"></es-select>
      </el-col>
    </el-row><br />
    <el-row>
      <el-card class="mg-l-40 mg-r-40 rounded-08 bg-black-2" :style="'border: none'" shadow="none">
        <el-row>
          <el-col :span="20">
            <span class="tx-20 tx-bolder text-white">Your Folders</span>
          </el-col>
        </el-row>
        <br />
        <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
          <el-row>
            <el-col :span="5" v-for="(folder, i) in folders" :key="i" class="mg-l-40 mg-t-15">
              <div @click="$router.push($url.DL_OPEN_FOLDER + '/' + folder.id)">
                <el-card class="pointer rounded-08 bg-black-3" :style="'border: none'" shadow="none">
                  <el-col class="d-flex justify-content-left mg-b-20">
                    <e-svg style="padding-right: 15px" icon="folderYellow"></e-svg>
                    <div>
                      <div class="sub-title">{{ folder.title }}</div>
                    </div>
                  </el-col>
                </el-card>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-card>
    </el-row><br />
    <el-row class="mg-l-5">
      <el-row>
        <el-col :span="9" class="mg-l-60 text-white tx-24 f-600">
          All files
        </el-col>
      </el-row>
      <el-row>
        <div class="mg-r-40" :style="'border: none'" shadow="none">
          <el-col :span="5" :offset="1" v-for="(file, i) in files" :key="i" class="mg-t-20">
            <el-card class="rounded-08 bg-black-3" :style="'border: none'" shadow="none">
              <div v-if="file.attachment" class="hide-upload file d-flex justify-content-center">
                <eduwonka-file-uploader :accepted-types="'image/png, image/jpeg, image/jpg application/pdf, .doc, .docx, application/msword'" :source-file-list="getAttachments(file)" @value="v => attachments = v" />
              </div>
              <el-row class="mg-t-20">
                <el-col class="d-flex justify-content-left">
                  <e-svg style="padding-right: 15px" :icon="setIcon(file)"></e-svg>
                  <div>
                    <div class="sub-title">{{ file.title }}</div>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </div>
      </el-row>
    </el-row><br />
  </es-container>
</template>
<script>
import EduwonkaFileUploader from '@/components/EduwonkaUploader/multifile.vue'
import viewPropertise from '@/components/digitalLibrary/viewPropertiseModal.vue'
import adNew from "@/components/digitalLibrary/addNew.vue"
import { dispatchGraphql } from "@/api/dispatcher"
import { getId } from '@/util/auth'
export default {
  components: { adNew, viewPropertise, EduwonkaFileUploader },
  data: () => ({
    base_url: process.env.VUE_APP_BASE_API,
    user: {},
    files: [],
    folders: [],
  }),
  created() {
    this.getUser()
    this.getResources()
  },
  methods:{
    getAttachments(file) {
      var attachments = []
      attachments.push(file.attachment)
      return attachments
    },
    getResources() {
      const query = `query($id: uuid) {
        eduwonka_resources(where: {created_by_id: {_eq: $id}}) {
          id
          title
          resource_type
          attachment {
            file_url
            small_url
            meta
            id
          }
          shares {
            id
          }
        }
      }`
      dispatchGraphql(query, { id: getId()}).then((response) => {
        for (const resource of response.eduwonka_resources) {
          if (resource.shares.length > 0) {
            if (resource.resource_type === "Folder") {
              this.folders.push(resource)
            } else {
              this.files.push(resource)
            }
          }
        }
      })
    },
    setIcon(file) {
      if (file.resource_type === "File") {
        return 'darkFile'
      } else if (file.resource_type === "Document") {
        return 'examPaper'
      } else if (file.resource_type === "Sheet") {
        return 'examCircular'
      } else if (file.resource_type === "Slides") {
        return 'slides'
      }
    },
    setResources() {
      for (const audience of this.user.audience) {
        if (audience.audienceable_type === 'DigitalLibrary') {
          if (audience.resource.resource_type === 'Folder') {
            this.folders.push(audience.resource)
          } else {
            this.files.push(audience.resource)
          }
        }
      }
    },
    getUser() {
      const query = `query($id: uuid!) {
        users_by_pk(id: $id) {
          id
          first_name
          audience(where: {audienceable_type: {_eq: "DigitalLibrary"}}) {
            id
            resource {
              id
              title
              resource_type
              attachment {
                file_url
                small_url
                meta
                id
              }
            }
          }
        }
      }`
      dispatchGraphql(query, { id: getId() }).then((response) => {
        this.user = response.users_by_pk
        this.setResources()
      })
    }
  }
};
</script>
