<template>
  <es-container pageTitle="Recents" class="bg-black-5">
    <el-row class="mg-l-5">
      <el-card class="mg-l-40 mg-r-40 rounded-08 bg-black-2" :style="'border: none'" shadow="none">
        <el-row>
          <el-col :span="20">
            <span class="tx-20 tx-bolder text-white">Folders</span>
          </el-col>
        </el-row>
        <br />
        <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
          <el-row>
            <el-col :span="5" v-for="(folder, i) in getFolders()" :key="i" class="mg-l-40 mg-t-15">
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
          files
        </el-col>
      </el-row>
      <el-row>
        <div class="mg-r-40" :style="'border: none'" shadow="none">
          <el-col :span="5" :offset="1" v-for="(file, i) in getFiles()" :key="i" class="mg-t-20">
            <el-card class="rounded-08 bg-black-3" :style="'border: none'" shadow="none">
              <div v-if="file.attachment" class="hide-upload d-flex justify-content-center">
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
import { dispatchGraphql } from "@/api/dispatcher"
import { getId } from '@/util/auth'
export default {
  components: { EduwonkaFileUploader },
  data:()=>({
    resources: []
  }),
  created() {
    this.getResources()
  },
  methods: {
    getAttachments(file) {
      var attachments = []
      attachments.push(file.attachment)
      return attachments
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
    getFiles() {
      return this.resources.filter(x => x.resource_type != 'Folder')
    },
    getFolders() {
      return this.resources.filter(x => x.resource_type === 'Folder')
    },
    getResources() {
      const query = `query($id: uuid) {
        eduwonka_resources(order_by: {viewed_at: desc}, where: {_and: [{created_by_id: {_eq: $id}}, {is_deleted: {_eq: false}}]}) {
          id
          title
          resource_type
          viewed_at
          attachment {
            file_url
            small_url
            meta
            id
          }
        }
      }`
      dispatchGraphql(query, { id: getId() }).then((response) => {
        this.resources = response.eduwonka_resources
      })
    }
  }
}
</script>
