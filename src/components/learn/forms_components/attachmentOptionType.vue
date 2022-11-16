<template>
  <div>
    <div v-if="formData.option_type">
      <div v-if="formData.option_type === 'choose-single'">
        <div v-for="(option, index) in formData.options" :key="option.index">
          <el-row :gutter="20">
            <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
              <el-form-item>
                <i class="el-icon-s-operation tx-20" />
                <i class="el-icon-circle-check tx-20" />
              </el-form-item>
            </el-col>
            <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
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
      </div>
      <div v-if="formData.option_type === 'choose-multiple'">
        <div v-for="(option, index) in formData.options" :key="option.index">
          <el-row :gutter="20">
            <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
              <el-form-item>
                <i class="el-icon-s-operation tx-20" />
                <el-checkbox />
              </el-form-item>
            </el-col>
            <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
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
      </div>
      <div v-if="formData.option_type === 'drop-down'">
        <div v-for="(option, index) in formData.options" :key="option.index">
          <el-row :gutter="20">
            <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
              <el-form-item>
                <i class="el-icon-s-operation tx-20" />
              </el-form-item>
            </el-col>
            <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
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
      </div>
      <el-row v-if="formData.option_type !== 'short-answer' && formData.option_type !== 'long-answer'" :gutter="20">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div class="cv-link-color pointer" @click.prevent="addAnotherOption"><i class="el-icon-plus" />Add another option</div>
        </el-col>
      </el-row><br>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Blank',
  directives: {},
  components: {
  },
  filters: {},
  props: {
    formData: Object
  },
  data() {
    return {
    }
  },
  computed: {},
  watch: {
    formData() {
    }
  },
  created() {
  },
  methods: {
    addAnotherOption() {
      var options = {
        name: ''
      }
      this.formData.options.push(options)
    },
    removeOption(item) {
      var index = this.formData.options.indexOf(item)
      if (index !== -1) {
        this.formData.options.splice(index, 1)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
