<template>
  <div><br>
    <el-row :gutter="20">
      <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" :offset="2">
        <div class="bg-white pd-20">
          <el-row :gutter="20" class="view-no-form">
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
              <h4>Question</h4>
            </el-col>
            <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
              <el-select v-model="selectedOption" placeholder="Select" @change="changeFieldOptions()">
                <el-option
                  v-for="item in formFields"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-col>
            <el-col :xs="14" :sm="14" :md="14" :lg="14" :xl="14">
              <div class="fr">
                <el-checkbox v-model="form_data.required">Required</el-checkbox>
                <!-- <i class="el-icon-rank" /> -->
              </div>
            </el-col>
          </el-row><br>
          <el-form ref="form" :model="form_data" label-position="top">
            <el-form-item label="" prop="question" :rules="[{ required: true, message: 'Question can`t be blank.', trigger: 'blur' }]">
              <el-input v-model="form_data.question" placeholder="Type your question here" />
            </el-form-item><br>
            <el-form-item label="" prop="name">
              <el-input v-model="form_data.answer" placeholder="Enter Short Answer" />
            </el-form-item><br>
            <el-form-item label="" prop="option.name" class="tx-danger">
              <el-input v-model="form_data.options[0].name" placeholder="Type your instruction for the Student here" />
            </el-form-item><br>
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
    <el-row :style="window.width > 767 ? 'border-top: 1px solid #fcdfbd; margin-top: 20px' : 'border-top: 1px solid #fcdfbd; margin-top: 20px; padding-top: 20px;'" :class="window.width > 767 ? 'form-last-buttons' : ''">
        <!-- <el-col style="float: right" :span="9"> -->
          <e-button :span="window.width > 767 ? 15 : 12" label="Delete" width="180" @click="handleDelete" css="cancel_btn" type="default" :class="window.width > 767 ? 'p-45' : ''" />
          <e-button :span="window.width > 767 ? 8 : 12" label="Save" width="180" @click="handleSubmit" :css="window.width > 767 ? 'float-right' : ''" :class="window.width > 767 ? 'p-45' : ''" />
        <!-- </el-col> -->
      </el-row>
  </div>
</template>

<script>
import screenSize from '@/mixins/screenSize'
export default {
  name: 'FormPage',
  mixins: [screenSize],
  directives: {},
  components: {
  },
  filters: {},
  props: {
    form: Object,
    formStatus: String,
    index: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      selectedOption: 'short-answer',
      formFields: ['choose-single', 'choose-multiple', 'drop-down', 'short-answer', 'long-answer'],
      rules: {},
      form_data: {
        id: Math.random().toString(36).substr(2, 10),
        question: '',
        required: true,
        field_type: 'short-answer',
        options: [
          { name: '' }
        ]
      }
    }
  },
  computed: {},
  created() {
    if (this.formStatus === 'edit') {
      this.form_data = this.form.data[this.index] || this.form_data
    }
  },
  methods: {
    changeFieldOptions: function() {
      this.$emit('changeFormField', [this.form_data, this.selectedOption, this.index])
    },
    handleDelete: function() {
      this.$emit('handleSubmit', this.form)
    },
    handleSubmit: function() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // if (this.formStatus === 'new') {
          //   this.form.data.push(this.form_data)
          // } else {
          //   this.form.data[this.index] = this.form_data
          // }
          this.$emit('handleSubmit', this.form_data)
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
