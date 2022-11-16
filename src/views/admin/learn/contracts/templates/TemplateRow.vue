<template>
  <div>
    <el-table
      v-loading="file_loading"
      :data="templateData"
      style="width: 100%"
      :default-sort="{prop: 'name', order: 'descending'}"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />

      <el-table-column prop="name" label="Template Name" width="350">
        <template slot-scope="scope">
          <div class="flex flex-column">
            <span class="template-name">{{ scope.row.name }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="created_at" label="Created on" width="350">
        <template slot-scope="scope">
          <div class="flex flex-column">
            <span class="created-on">{{ scope.row.created_at }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column align="right" label="" width="60">
        <template slot-scope="scope">
          <span v-if="isMobile" class="el-dropdown-link" @click="actionSheetVisible2 = true"><i class="el-icon-more el-icon--right rounded-circle bg-color-f pd-10" /></span>

          <el-dropdown v-if="!isMobile" :hide-on-click="false" trigger="click">
            <span class="el-dropdown-link"><i class="el-icon-more el-icon--right rounded-circle bg-color-f pd-10" /></span>
            <el-dropdown-menu slot="dropdown">

              <el-dropdown-item>
                <div class="tx-bold pointer" @click="editDetails(scope.row)">
                  <svg-icon icon-class="edit" /> Edit
                </div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div class="tx-bold pointer" @click="downloadTemplate(scope.row)">
                  <svg-icon icon-class="download1" /> Download
                </div>
              </el-dropdown-item>

              <el-dropdown-item>
                <div class="pointer tx-bold delete" @click="deleteTemplate(scope.row)">
                  <svg-icon icon-class="delete_hash_red" class="tx-16" /> &nbsp;Delete
                </div>
              </el-dropdown-item>

            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import PWA from '@/util/pwa'
// import { methods } from 'vue-echarts'
export default {
  name: 'TemplateRow',
  directives: {},
  components: {},
  filters: {},
  mixins: [PWA],
  props: {
    templateData: {
      type: Array,
      default: function functionName() {}
    },
    document: {
      type: Object,
      default: function functionName() {}
    }
  },
  data() {
    return {
      file_loading: false,
      multipleSelection: []
    }
  },
  methods: {
    editDetails(obj) {
      this.$router.push(`/contracts/create_new_template/index?id=${obj.id}`)
    },
    downloadTemplate(obj) {
      // TODO download template
    },
    deleteTemplate(obj) {
      this.$emit('handleDeleteTemplate', obj.id)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="scss" scoped>
.template-name {
  color: #4998df;
}
.delete {
  color: #e76361;
}
</style>
