<template>
  <div style="padding: 20px; overflow: auto; height: 72vh">
    <el-col style="color: #000000cc;font-weight:500; font-size: 24px" :span="5">Deleted files</el-col><br/><br/>
    <div v-if="files.length > 0">
      <div style="color: #00000099" class="fs-20 f-500">Yesterday</div> 
      <file v-for="(file, i) in setFiles('yesterday')" :key="i" :icon="setIcon(file)" :file="file" /><br/>
      <div style="color: #00000099" class="fs-20 f-500">Last Week</div>
      <file v-for="(file, i) in setFiles('last week')" :key="i" :icon="setIcon(file)" :file="file" /><br/>
      <div style="color: #00000099" class="fs-20 f-500">This month</div>
      <file v-for="(file, i) in setFiles('last month')" :key="i" :icon="setIcon(file)" :file="file" /><br/>
      <div style="color: #00000099" class="fs-20 f-500">Older</div>
      <file v-for="(file, i) in setFiles('older')" :key="i" :icon="setIcon(file)" :file="file" />
    </div>
    <div v-else>
      <no-delete />
    </div>
  </div>
</template>
<script>
import noDelete from '@/components/digitalLibrary/noDelete.vue'
import { dispatchGraphql } from "@/api/dispatcher"
import { getId } from '@/util/auth'
import moment from 'moment'
export default {
  components:{ noDelete },
  data:()=>({
    files: [],
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
