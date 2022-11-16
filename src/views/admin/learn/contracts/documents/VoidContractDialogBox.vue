<template>
  <div>
    <el-dialog title="Void Contract" :append-to-body="true" :visible.sync="dialogBox" width="45%" :before-close="updateViewDialogBoxValue">
      <div class="pd-10">
        <div class="text-center">
          <br>
          <img src="images/cancel_invoice.png" class="">
        </div>
        <br>
        <div class="wb-normal text-center tx-22 tx-color-05 tx-bold">Void Contract</div><br>
        <h5 class="wb-normal tx-16 pd-l-20 pd-t-20">Once voided, this contract will be automatically moved to the "Archived Tab". Are you sure you want to void this contract?</h5>
        <h5 class="wb-normal pd-l-20 pd-t-20">Reason for voiding</h5>
        <div class="wb-normal mg-l-20 mg-r-20">
          <textarea v-model="reason" rows="5" />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="white-btn-r" @click="updateViewDialogBoxValue()">Close</el-button>
        <el-button class="hash-btn-r" style="height: 38px;" @click="handleVoid()">Proceed</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'VoidContractDialogBox',
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
      reason: ''
    }
  },
  methods: {
    updateViewDialogBoxValue() {
      this.$emit('updateVoidContractDialogBoxVisibility', false)
    },
    handleVoid() {
      this.$emit('voidSuccessDialogBox', this.reason)
      this.reason = '' // clear reson textbox after submit
    }
  }
}
</script>

<style lang="scss" scoped>
textarea {
  width: 100%;
  border: 1px solid #ccc;
  outline: none;
  padding: 7px;
  box-sizing: border-box;
  color: #2b2b2b;
}
</style>
