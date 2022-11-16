<template>
  <div>
    <el-dialog title="You have successfylly voided this contract" :append-to-body="true" :visible.sync="dialogBox" width="45%" :before-close="updateViewDialogBoxValue">
      <div class="pd-10">
        <div class="text-center">
          <br>
          <img src="images/undraw_High_five.png" class="">
        </div>
        <br>
        <div class="wb-normal text-center tx-22 tx-color-05 tx-bold">You have successfylly voided this contract</div><br>
      </div>
      <div class="center">
        <el-button class="white-btn-r" @click="updateViewDialogBoxValue()">Close</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'VoidSuccessDialogBox',
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
      this.$emit('updateVoidSuccessDialogBox', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.center {
  text-align: center;
}
</style>
