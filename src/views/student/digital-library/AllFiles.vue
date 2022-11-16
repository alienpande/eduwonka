<template>
  <es-container pageTitle="All Files" btnText2="New" btnPlain2="true" subTitle="You can click on the files/folder to perform actions on it" @btnClick="addNew = true" class="bg-black-5">
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
          </el-row><br />
          <hr style="opacity: 10%" /><br />
          <el-row>
            <el-col class="d-flex justify-content-center">
              <es-button text="View more" />
            </el-col>
          </el-row>
        </el-card>
      </el-card>
    </el-row><br />
    <el-row :gutter="20" class="mg-l-5">
      <el-row>
        <el-col :span="9" class="mg-l-60 text-white tx-24 f-600">
          Recently opened
        </el-col>
      </el-row>
      <el-row>
        <div class="mg-r-40" :style="'border: none'" shadow="none">
          <el-col :span="5" :offset="1" v-for="(file, i) in getFiles('recents')" :key="i" class="mg-t-20">
            <el-card class="rounded-08 bg-black-3" :style="'border: none'" shadow="none">
              <div v-if="file.attachment" class="hide-upload file d-flex justify-content-center">
                <eduwonka-file-uploader :accepted-types="'image/png, image/jpeg, image/jpg application/pdf, .doc, .docx, application/msword'" :source-file-list="getAttachments(file)" @value="v => attachments = v" />
              </div>
              <el-row class="mg-t-20">
                <el-col :span="20" class="d-flex justify-content-left">
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
    <el-row :gutter="20" class="mg-l-5">
      <el-row>
        <el-col :span="9" class="mg-l-60 text-white tx-24 f-600">
          All files
        </el-col>
      </el-row>
      <el-row>
        <div class="mg-r-40" :style="'border: none'" shadow="none">
          <el-col :span="5" :offset="1" v-for="(file, i) in getFiles('all')" :key="i" class="mg-t-20">
            <el-card class="rounded-08 bg-black-3" :style="'border: none'" shadow="none">
              <div v-if="file.attachment" class="hide-upload file d-flex justify-content-center">
                <eduwonka-file-uploader :accepted-types="'image/png, image/jpeg, image/jpg application/pdf, .doc, .docx, application/msword'" :source-file-list="getAttachments(file)" @value="v => attachments = v" />
                <div class="btn">
                  <el-popover placement="right" width="250" height="600" trigger="hover">
                    <div class="bg-black-3"><br />
                      <div class="mg-l-20 pointer text-white tx-20">Open File</div><br />
                      <div class="mg-l-20 pointer text-white tx-20" @click="setProperties(file)">View File Properties</div><br />
                      <div class="mg-l-20 pointer text-white tx-20" @click="$router.push($url.DL_SHEARE_FILE + '/' + file.id)">Share File</div><br />
                      <div class="mg-l-20 pointer text-white tx-20" @click="setBookmark(file)">Bookmark</div><br />
                      <div class="mg-l-20 pointer text-white tx-20" @click="setResourceVariables(file.resource_type, file)">Duplicate</div><br />
                      <hr style="opacity: 10%" /><br />
                      <div class="mg-l-20 pointer text-white tx-20" @click="setRename(file)">Rename</div><br />
                      <div class="mg-l-20 pointer text-white tx-20">Download</div><br />
                      <div class="mg-l-20 pointer text-white tx-20" @click="updateFile(file, 'delete')">Delete</div><br />
                    </div>
                    <e-svg slot="reference" icon="actions" />
                  </el-popover>
                </div>
              </div>
              <el-row class="mg-t-20">
                <el-col :span="20" class="d-flex justify-content-left">
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
    <el-dialog title="Rename File" :visible.sync="showRename" width="45%" custom-class="custom-dialog">
      <el-row>
        <es-input label="Rename the File" v-model="file.title" />
      </el-row><br /><br />
      <hr style="opacity: 10%" />
      <el-row>
        <el-col :span="4" :offset="7">
          <es-button text="Cancel" @click="showRename = false" />&emsp;
        </el-col>
        <el-col :span="4" :offset="1">
          <es-button text="Submit" @click="updateFile(file, 'update')" :plain="true" />
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog :visible.sync="showProperties" width="60%" custom-class="custom-dialog">
      <view-properties :file="file" />
    </el-dialog>
    <el-dialog :visible.sync="addNew" width="50%" custom-class="custom-dialog">
      <ad-new @create="handleFile" @upload="uploadFile" />
    </el-dialog>
  </es-container>
</template>
<script>
import EduwonkaFileUploader from '@/components/EduwonkaUploader/multifile.vue'
import adNew from "@/components/student/digitalLibrary/addNew.vue";
import viewProperties from '@/components/student/digitalLibrary/viewProperties.vue'
import { dispatchGraphql } from "@/api/dispatcher"
import { getId } from '@/util/auth'
import moment from 'moment'
export default {
  components: { adNew , viewProperties, EduwonkaFileUploader },
  data: () => ({
    searchBy: '',
    base_url: process.env.VUE_APP_BASE_API,
    attachments: [],
    addNew: false,
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
  }),
  created() {
    this.getResources()
  },
  methods:{
    getAttachments(file) {
      var attachments = []
      attachments.push(file.attachment)
      return attachments
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
        return 'darkFile'
      } else if (file.resource_type === "Document") {
        return 'examPaper'
      } else if (file.resource_type === "Sheet") {
        return 'examCircular'
      } else if (file.resource_type === "Slides") {
        return 'slides'
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
  }
};
</script>
<style scoped>
.file {
  position: relative;
}
.file .btn {
  position: absolute;
  top: 1%;
  left: 85%;
  font-size: 10px;
  border: none;
  cursor: pointer;
  border-radius: 50px;
  text-align: center;
}
</style>