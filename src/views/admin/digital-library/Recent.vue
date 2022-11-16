<template>
  <div style="padding: 20px; overflow: auto; height: 72vh">
    <el-col style="color: #000000cc;font-weight:500; font-size: 24px" :span="5">
      Recents
    </el-col><br /><br /><br />
    <div style="color: #00000099" class="fs-20 f-500">Your Folders</div>
    <folder class="dig-library-folder" @clicks="openFolder" v-for="(folder, i) in getFolders()" :key="i" :folder="folder" /><br /><br /><br /><br />
    <div style="color: #00000099" class="fs-20 f-500">All Files</div>
    <file v-for="(file, i) in getFiles()" :key="i" :icon="setIcon(file)" :file="file" />
  </div>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher"
import { getId } from '@/util/auth'
export default {
  data:()=>({
    resources: []
  }),
  created() {
    this.getResources()
  },
  methods: {
    openFolder(folder) {
      this.$router.push(this.$url.DL_OPEN_FOLDER + '/' + folder.id)
    },
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
