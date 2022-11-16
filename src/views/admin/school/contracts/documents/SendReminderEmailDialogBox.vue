<template>
  <div>
    <el-dialog title="Send Reminder Email?" :append-to-body="true" :visible.sync="dialogBox" width="45%" :before-close="updateViewDialogBoxValue">
      <div class="pd-10">
        <div class="text-center">
          <br>
          <img src="images/send_mail.png" class="">
        </div>
        <br>
        <div class="wb-normal text-center tx-20 tx-color-05 tx-bold">Send Reminder Email</div><br>
        <h5 class="wb-normal pd-l-20 pd-t-20">This action will send a reminder email to your client</h5>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="white-btn-r" @click="updateViewDialogBoxValue()">Close</el-button>
        <el-button class="hash-btn-r" style="height: 38px;" @click="handleSendReminderEmail()">Proceed</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'SendReminderEmailDialogBox',
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
      this.$emit('updateSendReminderEmailDialogBoxVisability', false)
    },
    handleSendReminderEmail() {
      this.$emit('triggerReminderEmail')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
