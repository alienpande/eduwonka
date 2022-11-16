<template>
  <div><br>
    <el-row :gutter="20">
      <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" :offset="2">
        <div class="bg-white pd-20">
          <el-row :gutter="20" class="view-no-form">
            <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
              <h4>Student-Upload</h4>
            </el-col>
            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
              <div class="fr">
                <el-checkbox v-model="form_data.required">Required</el-checkbox>
                <!-- <i class="el-icon-rank" /> -->
              </div>
            </el-col>
          </el-row><br>
          <el-form ref="form" :model="form_data" label-position="top">
            <el-form-item label="" prop="name">
              <el-input v-model="form_data.question" placeholder="Type your question here" />
            </el-form-item>
            <el-form-item label="" prop="name">
              <el-input v-model="form_data.answer" placeholder="Enter Short Answer" />
            </el-form-item><br>
            <el-form-item label="" prop="name">
              <el-checkbox-button v-model="form_data.options[0].upload" >Allow Student to Upload Attachment</el-checkbox-button>
              <!-- <el-button v-model="form_data.options[0].upload" class="white-btn-r" size="mini">Allow Student to Upload Attachment</el-button> -->
            </el-form-item>
            <el-form-item label="" prop="name">
              <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="form_data.options[1].attachments" list-type="picture" multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
              </el-upload>
              <!-- <el-checkbox-button v-model="form_data.options[0].attachments" >Allow Student to Upload Attachment</el-checkbox-button> -->
            </el-form-item>
            <!-- <el-button class="light-green-btn-r" @click="handleSubmit()">
              <svg-icon icon-class="save" class="tx-medium mg-r-5" /> Save
            </el-button>
            <el-button class="red-btn-r fr" @click="handleDelete()">
              <i class="el-icon-delete" /> Delete
            </el-button> -->
          </el-form>
        </div>
      </el-col>
    </el-row>
    <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px" class="form-last-buttons">
      <!-- <el-col style="float: right" :span="9"> -->
        <e-button :span="15" label="Delete" width="180" @click="handleDelete" css="cancel_btn" type="default" class="p-45" />
        <e-button :span="8" label="Save" width="180" @click="handleSubmit" css="float-right" class="p-45" />
      <!-- </el-col> -->
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'FormPage',
  directives: {},
  components: {
  },
  filters: {},
  props: {
    form: Object
  },
  data() {
    return {
      rules: {},
      form_data: {
        question: '',
        required: true,
        field_type: 'upload-attachment',
        options: [
          { upload: false },
          { attachments: '' }
        ]
      }
    }
  },
  computed: {},
  created() {
  },
  methods: {
    handleDelete: function() {
      this.$emit('handleSubmit', this.form)
    },
    handleSubmit: function() {
      // this.form.data.push(this.form_data)
      this.$emit('handleSubmit', this.form_data)
    },
    handlePreview() {
      console.log('thius', this.form_data.options[1].attachments)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
