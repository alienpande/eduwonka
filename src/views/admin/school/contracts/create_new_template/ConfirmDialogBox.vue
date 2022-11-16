<template>
  <div>
    <el-dialog title="Please Confirm" :append-to-body="true" :visible.sync="dialogBox" width="45%" :before-close="updateViewDialogBoxValue">
      <div class="pd-10">
        <div class="text-center">
          <br>
          <img src="images/archive_invoice.png" class="">
        </div>
        <br>
        <div class="wb-normal text-center tx-20 tx-color-05 tx-bold">Please Confirm</div><br>
        <h5 class="wb-normal pd-l-20 pd-t-20">Are you sure you want to save the template?</h5>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="white-btn-r" @click="updateViewDialogBoxValue()">Close</el-button>
        <el-button class="hash-btn-r" style="height: 38px;" @click="handleSubmit()">Proceed</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { dispatchHttp } from '@/api/dispatcher'
export default {
  name: 'ConfirmDialogBox',
  directives: {},
  components: {},
  felters: {},
  props: {
    dialogBox: {
      type: Boolean,
      default: false
    },
    contractTemplate: {
      type: Object,
      default: null
    }
  },
  data() {
    return {}
  },
  methods: {
    updateViewDialogBoxValue() {
      this.$emit('updateConfirmDialogBoxVisability', false)
    },
    handleSubmit() {
      dispatchHttp(`/contract_templates/${this.contractTemplate.id}/publish`, {}, 'patch')
        .then((response) => {
          if (response.data.error) {
            this.$notify({
              title: 'Error',
              message: response.data.error,
              type: 'error',
              duration: 2000
            })
          } else { this.$emit('confirmSuccessDialogBox', true) }
        })
        .catch(() => {
          console.log('Error')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
