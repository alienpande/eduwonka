<template>
  <div>
    <el-dialog title="Success" :append-to-body="true" :visible.sync="dialogBox" width="45%" :before-close="updateViewDialogBoxValue">
      <div class="pd-10">
        <div class="text-center">
          <br>
          <!-- <img src="images/undraw_High_five.png" class=""> -->
        </div>
        <br>
        <div class="wb-normal text-center tx-20 tx-color-05 tx-bold">The template has been successfully saved. Template was ready to send the clients.</div><br>
      </div>
      <div style="text-align: center">
        <el-button class="white-btn-r" @click="updateViewDialogBoxValue()">Close</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ConfirmDialogBox',
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
      // this.$router.push('/contracts/index/?tab_name=templates')
      this.$emit('updateSuccessDialogBoxVisability', false)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
