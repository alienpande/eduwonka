<template>
  <es-container pageTitle="Bookmarked" class="bg-black-5">
    <el-row class="mg-l-5">
      <el-col :span="4" class="text-white tx-24 f-600">
        All Files
      </el-col>
      <el-col class="mg-t-5" :span="8" :offset="5">
        <es-search v-model="searchBy" placeholder="Search"></es-search>
      </el-col>
      <el-col :span="3" :offset="1">
        <es-select placeholder="File Type" class="select-icon"></es-select>
      </el-col>
      <el-col :span="2" class="mg-l-20">
        <es-select placeholder="sort" class="select-icon"></es-select>
      </el-col>
    </el-row><br />
    <el-row class="mg-l-5">
      <el-row>
        <div class="mg-r-40" :style="'border: none'" shadow="none">
          <el-col :span="5" :offset="1" v-for="(file, i) in files" :key="i" class="mg-t-20">
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
  data: () => ({
    files: []
  }),
  created() {
    this.getBookmarks()
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
    getBookmarks() {
      const query = `query($id: uuid) {
        bookmarks(where: {_and: [{user_id: {_eq: $id}}, {file: {resource_type: {_neq: "Folder"}}}]}) {
          id
          file {
            id
            title
            resource_type
            attachment_id
            is_deleted
            viewed_at
            attachment {
              file_url
              small_url
              meta
              id
            }
          }
        }
      }`
      dispatchGraphql(query, { id: getId() }).then((response) => {
        const files = response.bookmarks.map(x => x.file)
        this.files = files.filter(x => x.is_deleted === false)
      })
    }
  }
};
</script>
