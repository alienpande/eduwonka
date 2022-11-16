<template>
  <div>
    <el-dialog title="Download Contract" :append-to-body="true" :visible.sync="dialogBox" width="45%" :before-close="updateViewDialogBoxValue">
      <div class="pd-10">
        <div class="text-center">
          <br>
          <img src="images/download.png" class="">
        </div>
        <br>
        <div class="wb-normal text-center tx-20 tx-color-05 tx-bold">Download Contract</div><br>
        <h5 class="wb-normal pd-l-20 pd-t-20">Are you sure you want to download this contract?</h5>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="white-btn-r" @click="updateViewDialogBoxValue()">Close</el-button>
        <el-button class="hash-btn-r" style="height: 38px;" @click="handleDownload()">Proceed</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'DownloadContractDialogBox',
  directives: {},
  components: {},
  felters: {},
  props: {
    dialogBox: { type: Boolean, default: false },
    contract: { type: Object, default: function() {} }
  },
  data() {
    return {}
  },
  methods: {
    updateViewDialogBoxValue() {
      this.$emit('updateDownloadContractDialogBoxVisibility', false)
    },
    handleDownload() {
      window.open(
        `${process.env.VUE_APP_BASE_API}/client/${this.contract.id}/download`,
        '_blank'
      )
      this.$emit('updateDownloadContractDialogBoxVisibility', false)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
