<template>
  <div>
    <div class="receipt-names" style="display:none">
      <div @click="receiptName = !receiptName" class="receipt-name"></div>
      <!-- <e-selected v-if="receiptName" :options="certificateFormOneData.audience" style="position:absolute;top: 50px" /> -->
       <select v-if="receiptName">
         <option v-for="audience in certificateFormOneData.audience" :key="audience.user_id" style="position:absolute;top: 50px">
           {{ audience.name }}
         </option>
       </select>
    </div>
    <!-- <img style="width: 461px; display: block; margin: 49px auto" src="@/assets/images/cert1.png" /> -->
    <el-row v-if="!contractTemplate.attachement_id" :gutter="20">
      <el-col :span="24" class="pd-t-20 flex flex-row">
        <eduwonka-multifile-uploader :multiple="false" :source-file-list="contractTemplate.upload_documents" @loading="v => fileUploading = v" @value="v => {contractTemplate.attachment_id = v.map(x => x.id), contractTemplate.upload_documents = v}" />
        <!-- <el-button class="white-btn-r" round @click="choseFromTemplate()">Choose from Template</el-button> -->
      </el-col>
    </el-row>

    <div
      style="
        display: flex;
        padding-top: 15px;
        justify-content: flex-end;
        border-top: 2px solid #fcdfbd;
        padding-right: 100px;
      "
      class="form-last-buttons remove-padding"
    >
      <el-checkbox
        v-model="createProfile"
        style="margin-top: 8px"
      ></el-checkbox>
      <e-button
        :span="3"
        label="Create a public URL"
        width="180"
        css="cancel_btn"
        type="default"
        @click="createProfile = !createProfile"
      ></e-button>
      <e-button
        :span="2"
        label="Cancel"
        width="180"
        css="cancel_btn"
        type="default"
      ></e-button>
      <e-button
        :span="4"
        label="Proceed"
        @click="handleClick()"
        width="180"
        css="float-right"
      ></e-button>
    </div>
  </div>
</template>
<script>
import { dispatchGraphql, dispatchGraphqlMutation, dispatchHttp } from '@/api/dispatcher'
import EduwonkaMultifileUploader from '@/components/EduwonkaUploader/multifile.vue'
export default {
  components: { EduwonkaMultifileUploader },
  props: {
    certificateFormOneData: {
      type: Object,
      default: null
    },
    contractTemplate: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    certificate: {},
    receiptName: false,
    createProfile: true,
  }),
  methods: {
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
          console.log('no errors');
          if (!response.data.errors){
            // this.$go(this.$url.SH_CREATENEWTEMPLATE + '/' + response.data.id)
            
            this.contractTemplate.id = response.data.id
            console.log('GGGGGG');
            this.$emit('handleSubmit', 3)
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
    getAudience() {
      return {
        "objects": this.audience
      }
    },
    handleClick() {
        let data = {
          privacy: ["sdf"]
        }
      // dispatchGraphqlMutation('certificates', ['id', 'privacy'], data).then((response) => {
      //   this.$emit('save', response.insert_certificates_one.id)
      //   if(response.insert_certificates_one.id) {
      //     const mutation = `mutation($objects: [audience_insert_input!]!){
      //     insert_audiences(objects: $objects) {
      //       affected_rows
      //         returning {
      //           id
      //           user_type
      //         }
      //       }
      //     }`
      //     dispatchGraphql(mutation, this.getAudience()).then(response => {
      //       console.log(response)
      //       this.$notify({
      //         type: 'success',
      //         title: 'Task Added'
      //       })
      //     })
      //   }
      // })
      this.handleSubmit()
      // this.$router.push(this.$url.LN_CERTIFICATE)
    }
  }
};
</script>
<style>
.receipt-names {
  position: relative;
  top: 28vh;
  left: 82vh;
width: 226px;
  cursor: pointer;
}
.receipt-name{

  padding: 22px 0;
  content: '';
  display: block;
}
</style>
