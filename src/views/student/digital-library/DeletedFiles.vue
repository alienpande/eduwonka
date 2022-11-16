<template>
  <es-container pageTitle="Deleted Files" class="bg-black-5">
    <div v-if="files.length > 0">
      <el-row class="mg-l-5">
        <el-row>
          <el-col :span="9" class="mg-l-60 text-gray-6 tx-24 f-600">
            Yesterday
          </el-col>
        </el-row>
        <el-row>
          <div class="mg-r-40" :style="'border: none'" shadow="none">
            <el-col :span="5" :offset="1" v-for="(file, i) in setFiles('yesterday')" :key="i" class="mg-t-20">
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
      <el-row class="mg-l-5">
        <el-row>
          <el-col :span="9" class="mg-l-60 text-gray-6 tx-24 f-600">
            Last Week
          </el-col>
        </el-row>
        <el-row>
          <div class="mg-r-40" :style="'border: none'" shadow="none">
            <el-col :span="5" :offset="1" v-for="(file, i) in setFiles('last week')" :key="i" class="mg-t-20">
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
      <el-row class="mg-l-5">
        <el-row>
          <el-col :span="9" class="mg-l-60 text-gray-6 tx-24 f-600">
            This Month
          </el-col>
        </el-row>
        <el-row>
          <div class="mg-r-40" :style="'border: none'" shadow="none">
            <el-col :span="5" :offset="1" v-for="(file, i) in setFiles('last month')" :key="i" class="mg-t-20">
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
      <el-row class="mg-l-5">
        <el-row>
          <el-col :span="9" class="mg-l-60 text-gray-6 tx-24 f-600">
            Older
          </el-col>
        </el-row>
        <el-row>
          <div class="mg-r-40" :style="'border: none'" shadow="none">
            <el-col :span="5" :offset="1" v-for="(file, i) in setFiles('older')" :key="i" class="mg-t-20">
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
    </div>
    <div v-else>
      <img style="width: 1510px; height: 657px" src="@/assets/images/noFiles.png" />
    </div>
  </es-container>
</template>
<script>
import EduwonkaFileUploader from '@/components/EduwonkaUploader/multifile.vue'
import { dispatchGraphql } from "@/api/dispatcher"
import { getId } from '@/util/auth'
import moment from 'moment'
export default {
  components: { EduwonkaFileUploader },
  data:()=>({
    files: []
  }),
  created() {
    this.getResources()
  },
  methods:{
    setFiles(date) {
      var yesterdayFiles = []
      var lastWeekFiles = []
      var lastMonthFiles = []
      var olderFiles = []
      const currentDate = moment(new Date()).format('yyyy-MM-DD')
      const yesterday = moment(new Date(), "DD-MM-YYYY").subtract(1, 'days')
      const lastWeek = moment(new Date(), "DD-MM-YYYY").subtract(7, 'days')
      const monthDate = moment(new Date(), "DD-MM-YYYY").subtract(1, 'months')
      for (const file of this.files) {
        if (currentDate <= moment(file.deleted_at).format("yyyy-MM-DD") && moment(file.deleted_at).format("yyyy-MM-DD") >= yesterday.format("yyyy-MM-DD")) {
          yesterdayFiles.push(file)
        } else if (lastWeek.format("yyyy-MM-DD") <= moment(file.deleted_at).format("yyyy-MM-DD") && moment(file.deleted_at).format("yyyy-MM-DD") > yesterday.format("yyyy-MM-DD")) {
          lastWeekFiles.push(file)
        } else if (monthDate.format("yyyy-MM-DD") <= moment(file.deleted_at).format("yyyy-MM-DD") && moment(file.deleted_at).format("yyyy-MM-DD") > lastWeek.format("yyyy-MM-DD")) {
          lastMonthFiles.push(file)
        } else {
          olderFiles.push(file)
        }
      }
      if (date === 'yesterday') {
        return yesterdayFiles
      } else if (date === 'last week') {
        return lastWeekFiles
      } else if (date === 'last month') {
        return lastMonthFiles
      } else {
        return olderFiles
      }
    },
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
    getResources() {
      const query = `query($id: uuid) {
        eduwonka_resources(where: {_and: [{created_by_id: {_eq: $id}}, {is_deleted: {_eq: true}}]}) {
          id
          title
          resource_type
          attachment_id
          is_deleted
          deleted_at
          viewed_at
          created_at
          updated_at
          attachment {
            file_url
            small_url
            meta
            id
          }
        }
      }`
      dispatchGraphql(query, { id: getId() }).then((response) => {
        this.files = response.eduwonka_resources
      })
    },
  }
}
</script>
