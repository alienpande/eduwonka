<template>
  <div><br>
   <ValidationObserver ref="observer" v-slot="{ handleSubmitdata }">
    <el-row :gutter="window.width > 767 ? 20 : 0">
      <el-col :xs="22" :sm="20" :md="20" :lg="20" :xl="20" :offset="2">
        <div class="bg-white pd-20">
          <el-form ref="form" :model="form_data" label-position="top">
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
            <el-form-item label="" prop="question" :rules="[{ required: true, message: 'Question can`t be blank.', trigger: 'blur' }]">
              <el-input v-model="form_data.question" placeholder="Type your question here" />
            </el-form-item><br>
            <el-form-item label="" prop="answer" :rules="[{ required: true, message: 'Answer can`t be blank.', trigger: 'blur' }]">
              <el-input v-model="form_data.answer" placeholder="Type your Answer here" />
            </el-form-item><br>

            <div v-for="(option, index) in form_data.options" :key="option.index">
              <el-row :gutter="20">
                <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
                  <el-form-item>
                    <i class="el-icon-s-operation tx-20" />
                    <el-checkbox />
                  </el-form-item>
                </el-col>
                <el-col :xs="18" :sm="20" :md="20" :lg="20" :xl="20">
                  <el-form-item :prop="option.name">
                    <el-input v-model="option.name" :placeholder="'Option ' + (index + 1)" />
                  </el-form-item>
                </el-col>
                <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
                  <el-form-item>
                    <i class="el-icon-close pd-t-5 fr tx-20 pointer" @click.prevent="removeOption(option)" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <el-row :gutter="20">
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="cv-link-color pointer" @click.prevent="addAnotherOption"><i class="el-icon-plus" />Add another option</div>
              </el-col>
            </el-row><br>
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
          <e-button :span="window.width > 767 ? 15 : 12" label="Delete" width="180" css="cancel_btn" type="default" :class="window.width > 767 ? 'p-45' : ''" />
          <e-button :span="window.width > 767 ? 8 : 12" label="Save" width="180" @click="handleSubmitdata(handleSubmit)" :css="window.width > 767 ? 'float-right' : ''" :class="window.width > 767 ? 'p-45' : ''" />
        <!-- </el-col> -->
      </el-row>
   </ValidationObserver>
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
    formStatus: String,
    form: Object,
    index: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      selectedOption: 'choose-multiple',
      formFields: ['choose-single', 'choose-multiple', 'drop-down', 'short-answer', 'long-answer'],
      rules: {},
      form_data: {
        id: Math.random().toString(36).substr(2, 10),
        question: '',
        answer: '',
        required: true,
        field_type: 'choose-multiple',
        options: [
          { name: '' },
          { name: '' },
          { name: '' },
          { name: '' }
        ]
      }
    }
  },
  computed: {
    isValid () {
      return this.form_data.question && this.form_data.answer;
    }
  },
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
    removeOption(item) {
      var index = this.form_data.options.indexOf(item)
      if (index !== -1) {
        this.form_data.options.splice(index, 1)
      }
    },
    addAnotherOption() {
      var options = {
        name: ''
      }
      this.form_data.options.push(options)
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
