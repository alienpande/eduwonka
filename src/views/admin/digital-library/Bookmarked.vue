<template>
  <div class="dig-library-bookmarked" style="padding: 20px; overflow: auto; height: 72vh">
    <el-row>
      <el-col style="color: #000000cc;font-weight:500; font-size: 24px" :span="5">Bookmarked</el-col>
    </el-row><br />
    <el-row v-if="filter.length > 0" :gutter="20" style="padding: 20px 0px 20px 0px;margin: 0px 0px 5px 0px;background: white;">
      <el-col :span="3" style="padding-left: 35px">
        <e-dropdown :list="filter" primary />
      </el-col>
      <el-col :span="3" style="padding-left: 35px" class="primary-text">
        <e-dropdown :list="filter2" primary />
      </el-col>
      <el-col :span="3" style="color: #bc6c42; font-size: 16px">Clear filter</el-col>
      <el-col style="padding-left: 10px" :offset="13" :span="1">
        <e-button icon="el-icon-search" :plain="true" css="bg-tranparent" />
      </el-col>
    </el-row><br/>
    <div style="color:#00000099" class="fs-20 f-500">All Files</div>
      <file v-for="(file, i) in files" :key="i" :icon="setIcon(file)" :file="file" />
  </div>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher"
import { getId } from '@/util/auth'
export default {
  data: () => ({
    files: [],
    filter: [
      { text: "Standard" },
      { text: "Standard 2" },
      { text: "Standard 3" },
    ],
    filter2: [
      { text: "Subject" },
      { text: "Subject 1" },
      { text: "Subject 2" },
    ],
  }),
  created() {
    this.getBookmarks()
  },
  methods: {
    setIcon(file) {
      if (file.resource_type === "File") {
        return 'file'
      } else if (file.resource_type === "Document") {
        return 'doc'
      } else if (file.resource_type === "Sheet") {
        return 'excel'
      } else if (file.resource_type === "Slides") {
        return 'ppt'
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
