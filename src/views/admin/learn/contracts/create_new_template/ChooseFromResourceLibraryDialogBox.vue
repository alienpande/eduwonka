<template>
  <div>
    <el-dialog title="Choose from Resource Library" :append-to-body="true" :visible.sync="dialogBox" width="45%" :before-close="updateViewDialogBoxValue">
      <div class="pd-10">
        <div class="text-center">
          <div class="left pd-b-15">
            <label>Choose file</label>
          </div>
          <el-select v-model="templateValue" placeholder="Choose One">
            <el-option
              v-for="item in filtered"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            />
          </el-select>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="white-btn-r" @click="updateViewDialogBoxValue()">Close</el-button>
        <el-button
          class="hash-btn-r"
          :class="{'success-btn-fill': templateValue }"
          style="height: 38px;"
          @click="handleNext()"
        >Next</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { ContractDocuments } from '@/services/contract_documents'

export default {
  name: 'ChooseFromResourceLibraryDialogBox',
  directives: {},
  components: {},
  felters: {},
  props: {
    dialogBox: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      templateValue: '',
      options: []
    }
  },
  computed: {
    filtered() {
      return this.options.filter(item => {
        if (item.uploadcare_resource) {
          return item.uploadcare_resource.file_type === 'application/pdf'
        }
      })
    }
  },
  mounted() {
    // this.getTemplates()
  },
  methods: {
    updateViewDialogBoxValue() {
      this.$emit('updateChooseFromResourceLibraryDialogBox', false)
    },
    handleNext() {
      const item = this.options.find(obj => obj.id === this.templateValue)
      this.$emit('choosenDocument', {
        name: item.title.split('.')[0],
        title: item.title,
        uploadcare_resource_id: item.uploadcare_resource_id
      })
    },
    getTemplates: function() {
      this.loading_files = true
      ContractDocuments.getResoruceLibraryFiles().then(res => {
        this.options = res
        this.loading_files = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.left {
  text-align: left;
}
</style>
