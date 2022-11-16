<template>
  <div>
    <el-dialog title="Archive Contract?" :append-to-body="true" :visible.sync="dialogBox" width="45%" :before-close="updateViewDialogBoxValue">
      <div class="pd-10">
        <div class="text-center">
          <br>
          <img src="images/archive_invoice.png" class="">
        </div>
        <br>
        <div class="wb-normal text-center tx-20 tx-color-05 tx-bold">Archive Contract</div><br>
        <h5 class="wb-normal pd-l-20 pd-t-20">Are you sure you want to archive this contract?</h5>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="white-btn-r" @click="updateViewDialogBoxValue()">Close</el-button>
        <el-button class="hash-btn-r" style="height: 38px;" @click="handleArchive()">Proceed</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ArchiveContractDialogBox',
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
    return {}
  },
  methods: {
    updateViewDialogBoxValue() {
      this.$emit('updateArchiveDialogBoxVisability', false)
    },
    handleArchive() {
      this.$emit('archiveHandleSuccessDialogBox', true)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
