<template>
  <div class="title bg-white pd-15">
    <el-row :gutter="20">
      <el-col class="sm-width-100"  :span="7">
        <el-row>
          <el-col  :span="24">
            <el-input v-model="search_files" v-debounce:1s="getTemplates" class="search-input-design1" placeholder="Search by Template Name" :debounce-events="['click', 'keyup']" /><br>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="pd-t-15 pd-b-15">
              <div class="flex flex-row flex-between">
                <el-button class="lite-green-btn pd-b-10-f" round @click="createNewTemplate()">
                  Create New Template</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col class="sm-d-none" :span="7">
        &nbsp;
      </el-col>
      <el-col class="sm-width-auto"  :span="10">
        <h5>Remaining Quata</h5>
        <!-- <remaining-quota /> -->
      </el-col>
    </el-row>
    <el-row>
      <el-col class="sm-width-50" :span="8">
        <div class="pd-b-25">
          <div class="flex flex-row">
            <el-dropdown>
              <span class="el-dropdown-link tx-bold">
                Date Range &nbsp;&nbsp;<i class="el-icon-arrow-right tx-bold tx-14" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <el-date-picker
                    v-model="program_date_range"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="To"
                    start-placeholder="Start date"
                    end-placeholder="End date"
                    :picker-options="pickerOptions"
                  />
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <template-row :template-data="documents" @handleDeleteTemplate="handleDeleteTemplate" />
      </el-col>
    </el-row>
    <!-- <max-quota-dialog-box :dialog-box="maxQuotaDialogBoxVisibility" @updateMaxQuotaDialogBoxVisibility="updateMaxQuotaDialogBoxVisibility"/> -->
  </div>
</template>

<script>
import { getId } from '@/util/auth'
import { dispatchHttp } from '@/api/dispatcher'
import TemplateRow from './TemplateRow'
// import RemainingQuota from '../RemainingQuota.vue'
// import MaxQuotaDialogBox from '../MaxQuotaDialogBox.vue'
// import { mapGetters } from 'vuex'

export default {
  name: 'Templates',
  components: { TemplateRow },
  data() {
    return {
      pickerOptions: {},
      program_date_range: [],
      documents: [],
      loading_files: false,
      search_files: '',
      maxQuotaDialogBoxVisibility: false
    }
  },
  computed: {
    // ...mapGetters({ planDetails: 'subscription/planDetails' })
  },
  created() {},
  mounted() {
    this.getTemplates()
  },
  methods: {
    getTemplates: function() {
      this.loading_files = true
      const url = '/contract_templates'
      dispatchHttp(url, {}, 'get').then(response => {
        this.documents = response.data
        this.loading_files = false
      })
    },
    onSuccess(event) {
      this.loading_files = true
      // console.log('Success: ', event)
      dispatchHttp(
        '/document/document_create',
        { document_path: event.originalUrl },
        'post'
      )
        .then(response => {
          var contract_data = {
            document_title: event.name,
            document_id: response.data.document_id,
            user_id: getId(),
            fields: JSON.stringify(event)
          }
          this.handleSubmit(contract_data)
          this.loading_files = false
        })
        .catch(() => {
          this.loading_files = false
        })
    },
    onError(event) {
      console.log('Error: ', event)
    },
    handleDeleteTemplate(id) {
      this.loading_files = true
      const url = `/contract_templates/${id}`
      dispatchHttp(url, {}, 'delete').then(response => {
        this.documents = response.data.contract_templates
        if (response.data.status === 'success') {
          this.$notify({
            title: 'Deleted',
            message: 'Template',
            type: 'success',
            duration: 3000
          })
        } else {
          this.$notify({
            title: "Can't delete",
            message:
              'This Templage beein used with one of the Coaching Program',
            type: 'error',
            duration: 4000
          })
        }
        this.loading_files = false
      })
    },
    createNewTemplate() {
      // TODO: create template, should be validated later with max quota
      this.$go(this.$url.SH_CREATETEMPLATE + '/new')
    }
    // updateMaxQuotaDialogBoxVisibility(value) {
    //   this.maxQuotaDialogBoxVisibility = value
    // }
  }
}
</script>

<style lang="scss">
  
</style>
