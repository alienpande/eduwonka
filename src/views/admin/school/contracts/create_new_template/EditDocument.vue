<template>
  <div class="edit-document">
    <el-row :gutter="20">
      <el-col :span="24">
        <h4 calss="tx-bold tx-16">Edit Document</h4>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="">
      <el-col :span="24">
        <p class="text">Please provide a signature field for each signee</p>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="">
      <iframe :src="url" title="W3Schools Free Online Web Tutorials" width="100%" height="100%" style="height: 800px;" />
    </el-row>
    <el-row :gutter="20" class="mg-t-40">
      <div class="footer-tab">
        <div>
          <el-button class="btn btn-link" @click="backClick()">&#60; Previous Page</el-button>
        </div>
        <el-col :span="24" class="buttons">
          <el-button class="btn btn-red" @click="closeButton()">Close</el-button>
          <el-button class="btn btn-success" @click="handleSubmit()">Next</el-button>
        </el-col>
      </div>
    </el-row>
    <cancel-dialog-box
      :dialog-box="cancelDialogBoxVisibility"
      @updateCancelDialogBoxVisability="updateCancelDialogBoxVisability"
      @cancelSuccessDialogBox="cancelSuccessDialogBox"
    />
  </div>
</template>

<script>
import CancelDialogBox from './CancelDialogBox'
export default {
  name: 'EditDocument',
  components: {
    CancelDialogBox
  },
  props: {
    contractTemplate: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      url: process.env.VUE_APP_BASE_API + 'edit_template/' + this.contractTemplate.id,
      cancelDialogBoxVisibility: false,
      checked1: true, // Replace with actual
      checked2: false // Replace with actual
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('handleSubmit', 3, 'preview')
    },
    backClick() {
      this.$emit('handleSubmit', 1, 'select-document')
    },
    closeButton() {
      this.cancelDialogBoxVisibility = true
      // cancel
    },
    updateCancelDialogBoxVisability(value) {
      this.cancelDialogBoxVisibility = false
    },
    cancelSuccessDialogBox(value) {
      this.cancelDialogBoxVisibility = false
      // handle cancel here
      this.$router.push(`/contracts/index/?tab_name=templates`)
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-document {
  h4 {
    color: #513a88;

    font-weight: 800;
  }
  .footer-tab {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  p.text {
    background-color: #ddd;
    padding: 8px;
    text-align: center;
  }
}
</style>
