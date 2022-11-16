<template>
  <div>
    <el-dialog title="Choose from Tempalate" :append-to-body="true" :visible.sync="dialogBox" width="45%" :before-close="updateViewDialogBoxValue">
      <div class="pd-10">
        <div class="text-center">
          <div class="left pd-b-15">
            <label>Choose A Template</label>
          </div>
          <el-select v-model="templateValue" placeholder="Choose One">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.value"
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
export default {
  name: 'ChooseFromTemplateDialogBox',
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
      options: [
        {
          name: 'Client general Agreement',
          value: 'client_general_agreement'
        },
        {
          name: 'Test Agreement',
          value: 'test_agreement'
        }
      ]
    }
  },
  methods: {
    updateViewDialogBoxValue() {
      this.$emit('updateChooseTemplateDialogBox', false)
    },
    handleNext() {
      this.$emit(
        'choosenTemplate',
        this.options.find(obj => obj.value === this.templateValue)
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.left {
  text-align: left;
}
</style>
