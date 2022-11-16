<template>
  <div style="padding: 20px; overflow: auto; height: 72vh" class="dig-library-files-container">
    <el-row>
      <el-col style="color: #000000cc; font-weight: 500; font-size: 24px" :span="5">All Files</el-col>
      <el-col :offset="16" :span="3">
        <e-button label="New" @click="addNew = true" icon="el-icon-plus" />
      </el-col>
    </el-row>
    <br />
    <el-row :gutter="20" style="padding: 20px 0px 20px 0px;margin: 0px 0px 5px 0px;background: white;">
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
    </el-row>
    <div style="color: #00000099" class="fs-20 f-500">Recently Opened</div>
    <file
      v-for="(file, i) in getFiles('recents')"
      :key="i + 10"
      :icon="setIcon(file)"
      :file="file"
    /><br />
    <div style="color: #00000099" class="fs-20 f-500 ">Your Folders</div>
    <folder class="dig-library-folder" @clicks="openFolder" v-for="(folder, i) in getFolders()" :key="i" :folder="folder" /><br /><br /><br />
    <div style="color: #00000099" class="fs-20 f-500 ">All Files</div>
    <file
      v-for="(file, i) in getFiles('all')"
      :key="i + 10"
      :icon="setIcon(file)"
      :file="file"
      :showOption='optionIndex===i'
      @duplicate="setResourceVariables(file.resource_type, file)"
      @rename="setRename(file)"
      @properties="setProperties(file)"
      @bookmark="setBookmark(file)"
      @delete="updateFile(file, 'delete')"
      @handleOption='handleOption(i)'
    />
    <e-dialog class="dig-library-add-new" v-model="addNew" width="70%" top="20vh" noEsc :gutter="20" hideDefaultFooter @cancel="addNew = false" @confirm="addNew = false">
      <ad-new @create="handleFile" @upload="uploadFile" />
    </e-dialog>
    <e-dialog title="Rename File" v-model="showRename" width="40%" top="20vh" noEsc :gutter="20" @cancel="showRename = false" @confirm="updateFile(file, 'update')">
      <e-input label="Rename the File" v-model="file.title" />
    </e-dialog>
    <e-dialog v-model="showProperties" width="60%" top="20vh" noEsc :gutter="20" hideDefaultFooter @cancel="showProperties = false" @confirm="showProperties = false">
      <view-propertise :file="file" />
    </e-dialog>
  </div>
</template>
<script>
import viewPropertise from '@/components/digitalLibrary/viewPropertiseModal.vue'
import adNew from "@/components/digitalLibrary/addNew.vue"
import { dispatchGraphql } from "@/api/dispatcher"
import { getId } from '@/util/auth'
import moment from 'moment'
export default {
  components: { adNew ,viewPropertise},
  data: () => ({
    addNew: false,
    optionIndex:'',
    showRename: false,
    showProperties: false,
    file: {},
    resourceMutation: {},
    resources: [],
    bookmarks: [],
    updateMutation: `mutation($id: uuid!, $changes: eduwonka_resources_set_input) {
      update_eduwonka_resources_by_pk(pk_columns: {id: $id}, _set: $changes) {
        id
      }
    }`,
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
    this.getResources()
  },
  methods:{
    openFolder(folder) {
      this.$router.push(this.$url.DL_OPEN_FOLDER + '/' + folder.id)
    },
    setProperties(file) {
      this.file = file
      this.showProperties = true
    },
    setRename(file) {
      this.file = file
      this.showRename = true
    },
    updateFile(file, type) {
      this.showRename = false
      var data = file
      data.is_deleted = type === "delete" ? true : false
      data.deleted_at = type === "delete" ? moment().format('') : null
      data.updated_by_id = getId()
      data.updated_at = moment().format('')
      delete data.attachment
      delete data.owner
      delete data.modifier
      delete data.shares
      dispatchGraphql(this.updateMutation, { id: file.id, changes: file }).then((response) => {
        console.log(response)
        this.getResources()
      })
    },
    getBookmarkVariables(file) {
      var variables = { user_id: getId(), eduwonka_resource_id: file.id }
      return {
        "object": variables
      }
    },
    bookmarkMutate(file) {
      const mutation = `mutation($object: bookmarks_insert_input!) {
        insert_bookmarks_one(object: $object) {
          id
        }
      }`
      dispatchGraphql(mutation, this.getBookmarkVariables(file)).then((response) => {
        console.log(response)
        this.$notify({
          type: 'success',
          title: 'Bookmark',
          message: 'File bookmarked successfully',
        })
        this.getResources()
      })
    },
    setBookmark(file) {
      if (this.bookmarks.length > 0) {
        const bookmarks = this.bookmarks.find(x => x.eduwonka_resource_id === file.id)
        if (bookmarks) {
          this.$notify({
            type: 'error',
            title: 'Bookmark',
            message: 'This file is already bookmarked',
          })
        } else {
          this.bookmarkMutate(file)
        }
      } else {
        this.bookmarkMutate(file)
      }
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
    getFiles(type) {
      var allFiles = []
      var recentFiles = []
      var resources = this.resources.filter(x => x.resource_type != 'Folder')
      for (const resource of resources) {
        recentFiles.push(resource)
        if (!resource.parent_id) {
          allFiles.push(resource)
        }
      }
      if (allFiles.length > 0 || recentFiles.length > 0) {
        if (type === "all") {
          return allFiles
        } else if (type === "recents") {
          return recentFiles
        }
      }
    },
    getFolders() {
      var folders = []
      var resources = this.resources.filter(x => x.resource_type === 'Folder')
      for (const resource of resources) {
        if (!resource.parent_id) {
          folders.push(resource)
        }
      }
      return folders
    },
    uploadFile(type, file) {
      if (type === 'File') {
        this.setResourceVariables('File' ,file)
      }
    },
    handleFile(type, val) {
      if (type === 'New Folder') {
        this.setResourceVariables('Folder', val)
      } else if (type === 'New Document') {
        this.setResourceVariables('Document', val)
      } else if (type === 'New Sheet') {
        this.setResourceVariables('Sheet', val)
      } else if (type === 'New Slides') {
        this.setResourceVariables('Slides', val)
      }
    },
    setResourceVariables(type, val) {
      delete val.attachment ? val.attachment : null
      this.resourceMutation = {
        resource_type: type,
        title: typeof(val) === 'object' ? val.title : val,
        attachment_id: typeof(val) === 'object' ? (val.avatar.length > 0 ? val.avatar[0].id : val.attachment_id) : null,
        is_deleted: false,
        created_by_id: getId(),
        updated_by_id: getId()
      }
      this.addNew = false
      this.createResource()
    },
    createResource() {
      const mutation = `mutation($object: eduwonka_resources_insert_input!) {
        insert_eduwonka_resources_one(object: $object) {
          id
        }
      }`
      dispatchGraphql(mutation, { object: this.resourceMutation }).then((response) => {
        console.log(response)
        this.$notify({
          type: 'success',
          title: 'Save',
          message: 'File saved successfully',
        })
        this.getResources()
      })
    },
    getBookmarks() {
      const query = `query($id: uuid) {
        bookmarks(where: {user_id: {_eq: $id}}) {
          id
          eduwonka_resource_id
        }
      }`
      dispatchGraphql(query, { id: getId() }).then((response) => {
        this.bookmarks = response.bookmarks
      })
    },
    getResources() {
      const query = `query($id: uuid) {
        eduwonka_resources(order_by: {viewed_at: desc}, where: {_and: [{created_by_id: {_eq: $id}}, {is_deleted: {_eq: false}}]}) {
          id
          title
          resource_type
          attachment_id
          is_deleted
          deleted_at
          parent_id
          viewed_at
          created_at
          updated_at
          shares {
            id
            user {
              id
              first_name
            }
          }
          owner {
            id
            first_name
          }
          modifier {
            id
            first_name
          }
          attachment {
            id
            file_url
            small_url
            large_url
            meta
            attachment_file_data
          }
        }
      }`
      dispatchGraphql(query, { id: getId() }).then((response) => {
        this.resources = response.eduwonka_resources
        this.getBookmarks()
      })
    },
    handleOption(i){
      if (this.optionIndex===i) {
        this.optionIndex=''
      }else{
        this.optionIndex=i
      }
      
    }
  }
};
</script>
