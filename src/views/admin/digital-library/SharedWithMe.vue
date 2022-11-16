<template>
  <div class="dig_library-share-wm" style="padding: 20px; overflow: auto; height: 72vh">
    <el-row>
      <el-col style="color: #000000cc; font-weight: 500; font-size: 24px" :span="5">
        Shared with me
      </el-col>
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
    </el-row><br />
    <div style="color: #00000099" class="fs-20 f-500">Your Folders</div>
    <folder v-for="(folder, i) in folders" :key="i" :folder="folder" /><br /><br /><br /><br />
    <div style="color: #00000099" class="fs-20 f-500">All Files</div>
    <file v-for="(file, i) in files" :key="i" :icon="setIcon(file)" :file="file" />
  </div>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher"
import { getId } from '@/util/auth'
export default {
  data: () => ({
    user: {},
    files: [],
    folders: [],
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
    this.getUser()
    this.getResources()
  },
  methods: {
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
        return 'file'
      } else if (file.resource_type === "Document") {
        return 'doc'
      } else if (file.resource_type === "Sheet") {
        return 'excel'
      } else if (file.resource_type === "Slides") {
        return 'ppt'
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
}
</script>
