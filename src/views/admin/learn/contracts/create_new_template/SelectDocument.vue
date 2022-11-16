<template>
  <div class="select-document">
    <el-row v-if="!contractTemplate.attachement_id" :gutter="20">
      <el-col :span="24">
        <h4 calss="tx-bold tx-16">Select Document</h4>
      </el-col>
    </el-row>
    <el-row v-if="!contractTemplate.attachement_id" :gutter="20">
      <el-col :span="24" class="pd-t-20 flex flex-row">
        <eduwonka-multifile-uploader :multiple="false" :source-file-list="contractTemplate.upload_documents" @loading="v => fileUploading = v" @value="v => {contractTemplate.attachment_id = v.map(x => x.id), contractTemplate.upload_documents = v}" />
        <!-- <el-button class="white-btn-r" round @click="choseFromTemplate()">Choose from Template</el-button> -->
      </el-col>
    </el-row>
    <el-row v-if="contractTemplate.attachement_id" :gutter="20">
      <el-col :span="20" class="mg-t-40">
        <h5>Document Selected</h5>
        <div>
          <span class="selected-template">{{ contractTemplate.title }}</span>
          <svg-icon icon-class="delete_hash" class="tx-16 pointer" @click="deleteTemplate()" />
        </div>
      </el-col>
    </el-row>
    <el-row v-if="contractTemplate.attachement_id" :gutter="20">
      <el-col :span="8" class="mg-t-40">
        <h5>* Template Name</h5>
        <el-input v-model="contractTemplate.name" placeholder="Docuemnt Name" />
      </el-col>
    </el-row>
    <el-row :gutter="20" class="mg-t-40">
      <el-col :span="24" class="buttons">
        <el-button class="btn btn-red" @click="closeButton()">Close</el-button>
        <el-button
          class="btn"
          :class="{'btn-success': contractTemplate, 'btn-base': contractTemplate === null}"
          @click="handleSubmit()"
        >Next</el-button>
      </el-col>
    </el-row>
    <choose-from-template-dialog-box
      :dialog-box="chooseFromTemplateDialogVisibility"
      @updateChooseTemplateDialogBox="updateChooseTemplateDialogBox"
      @choosenTemplate="choosenTemplate"
    />
    <choose-from-resource-library-dialog-box
      :dialog-box="chooseFromResourceLibraryVisibility"
      @updateChooseFromResourceLibraryDialogBox="updateChooseFromResourceLibraryDialogBox"
      @choosenDocument="choosenDocument"
    />
    <cancel-dialog-box
      :dialog-box="cancelDialogBoxVisibility"
      @updateCancelDialogBoxVisability="updateCancelDialogBoxVisability"
      @cancelSuccessDialogBox="cancelSuccessDialogBox"
    />
  </div>
</template>

<script>
import { dispatchGraphql, dispatchHttp } from '@/api/dispatcher'
// import Uploadcare from '@/components/ResourceLibrary/Uploadcare'
import ChooseFromTemplateDialogBox from './ChooseFromTemplateDialogBox'
import CancelDialogBox from './CancelDialogBox'
import ChooseFromResourceLibraryDialogBox from './ChooseFromResourceLibraryDialogBox'
import EduwonkaMultifileUploader from '@/components/EduwonkaUploader/multifile.vue'

export default {
  name: 'SelectDocument',
  components: {
    ChooseFromTemplateDialogBox,
    CancelDialogBox,
    ChooseFromResourceLibraryDialogBox,
    EduwonkaMultifileUploader
  },
  props: {
    contractTemplate: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      cancelDialogBoxVisibility: false,
      fileUploading: false,
      chooseFromTemplateDialogVisibility: false,
      chooseFromResourceLibraryVisibility: false,
      selectedTemplate: null,
      documentName: 'DocumentName',
      updateMutation: `mutation update_documents($id: uuid!, $changes: documents_set_input!) {
          update_documents_by_pk(pk_columns: { id: $id }, _set: $changes) {
            id
          }
        }`
    }
  },
  methods: {
    getVariables: function(data) {
      return { object: data }
    },
    onSuccess: function(event) {
      // var uploadcare_resource_data = {
      //   title: event.name,
      //   file: event.originalUrl,
      //   body: JSON.stringify(event),
      //   file_type: event.mimeType,
      //   file_size: event.size
      // }
      // const mutation_uploadcare_resource = `mutation insert_single_uploadcare_resources($object: uploadcare_resources_insert_input! ) {
      //   insert_uploadcare_resources_one(object: $object) {
      //     id
      //   }
      // }`
      // dispatchGraphql(
      //   mutation_uploadcare_resource,
      //   this.getVariables(uploadcare_resource_data)
      // ).then(response => {
      //   console.log('resp', response)
      //   this.contractTemplate.attachment_id =
      //     response.insert_uploadcare_resources_one.id
      //   this.contractTemplate.title = uploadcare_resource_data.title
      //   this.contractTemplate.name = uploadcare_resource_data.title.split(
      //     '.'
      //   )[0]
      // })
    },
    onError(event) {
      // uploadcare on error
    },
    choseFromTemplate() {
      this.chooseFromTemplateDialogVisibility = true
    },
    handleUploadDocument(command) {
      if (command === 'b') {
        this.chooseFromResourceLibraryVisibility = true
      }
    },
    /**
     * @param Object {name: 'template name', value: 'template_name'}
     */
    choosenTemplate(value) {
      if (value) {
        this.chooseFromTemplateDialogVisibility = false
        this.selectedTemplate = value // OBJ
      }
    },
    choosenDocument(value) {
      this.selectedTemplate = value // OBJ
      this.contractTemplate.name = value.name
      this.contractTemplate.title = value.title
      this.contractTemplate.attachement_id =
        value.attachement_id
      this.chooseFromResourceLibraryVisibility = false
    },
    deleteTemplate() {
      this.$emit('handleDeleteTemplate')
    },
    updateChooseTemplateDialogBox(value) {
      this.chooseFromTemplateDialogVisibility = value
    },
    updateChooseFromResourceLibraryDialogBox(value) {
      this.chooseFromResourceLibraryVisibility = value
    },
    setValues: function(){
      // this.contractTemplate.attachment_id = '{' + this.contractTemplate.attachment_id.map((el) => { return el.id }).join(',') + '}'
      this.contractTemplate.attachment_id = this.contractTemplate.upload_documents[0].id
      this.contractTemplate.title = this.contractTemplate.upload_documents[0].name
      this.contractTemplate.name = this.contractTemplate.upload_documents[0].name.split('.')[0]
      delete this.contractTemplate.upload_documents
    },
    handleSubmit() {
      const url = this.contractTemplate.id
        ? '/contract_templates/' + this.contractTemplate.id
        : '/contract_templates'
      const request = this.contractTemplate.id ? 'patch' : 'post'
      this.setValues()
      dispatchHttp(url, { contract_template: this.contractTemplate }, request)
        .then(response => {
          if (!response.data.errors) {
            // this.$router.push(
            //   `/school/create-template?id=${response.data.id}`
            // )
            this.$go(this.$url.SH_CREATENEWTEMPLATE + '/' + response.data.id)
            this.contractTemplate.id = response.data.id
            this.$emit('handleSubmit', 2, 'edit-document')
            this.$notify({
              title: 'Saved',
              message: 'Document',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Document',
              message: response.data.errors,
              type: 'error',
              duration: 2000
            })
          }
        })
        .catch(() => {
          console.log('Error')
        })
    },
    closeButton() {
      this.cancelDialogBoxVisibility = true
      // cancel
    },
    updateCancelDialogBoxVisability(value) {
      this.cancelDialogBoxVisibility = false
    },
    cancelSuccessDialogBox(value) {
      this.cancelDialogBoxVisibility = false
      // handle cancel here
      this.$router.push(`/contracts/index/?tab_name=templates`)
    }
  }
}
</script>

<style lang="scss" scoped>
.select-document {
  h4 {
    color: #513a88;
    font-weight: 800;
  }
  .selected-template {
    color: #4998df;
  }
  .footer-tab {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
}
</style>
