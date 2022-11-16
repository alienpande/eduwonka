<template>
  <div class="preview">
    <el-row :gutter="20">
      <el-col :span="24">
        <h4 calss="tx-bold tx-16">Preview</h4>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="mg-t-40">
      <el-col :span="24">
        <div class="flex flex-row mg-b-20">
          <div class="text" style="width:200px;">Document Name</div>
          <div class="text">{{ contractTemplate.name }}</div>
        </div>
        <div class="flex flex-row">
          <div class="text" style="width:200px;">Signees</div>
          <div class="flex flex-column mg-b-10">
            <div v-if="signees.includes('Teacher')" class="mg-b-10">Teacher (You)</div>
            <div v-if="signees.includes('Parent')">Parent</div>
          </div>
        </div>
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

    <confirm-dialog-box
      :dialog-box="confirmDialogBoxVisibility"
      :contract-template="contractTemplate"
      @updateConfirmDialogBoxVisability="updateConfirmDialogBoxVisability"
      @confirmSuccessDialogBox="confirmSuccessDialogBox"
    />

    <success-dialog-box
      :dialog-box="successDialogBoxVisibility"
      @updateSuccessDialogBoxVisability="updateSuccessDialogBoxVisability"
    />

  </div>
</template>

<script>
import CancelDialogBox from './CancelDialogBox'
import ConfirmDialogBox from './ConfirmDialogBox'
import SuccessDialogBox from './SuccessDialogBox'
import { dispatchHttp } from '@/api/dispatcher'
export default {
  name: '',
  components: {
    CancelDialogBox,
    ConfirmDialogBox,
    SuccessDialogBox
  },
  props: {
    contractTemplate: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      url:
        process.env.VUE_APP_BASE_API +
        '/template_contracts/' +
        this.contractTemplate.id +
        '/preview',
      cancelDialogBoxVisibility: false,
      confirmDialogBoxVisibility: false,
      successDialogBoxVisibility: false,
      signees: []
    }
  },
  mounted() {
    this.getSignees()
  },
  methods: {
    handleSubmit() {
      this.confirmDialogBoxVisibility = true
      // this.$emit('handleSubmit', 4, 'preview')
    },
    backClick() {
      this.$emit('handleSubmit', 2, 'edit-document')
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
    },
    updateConfirmDialogBoxVisability(value) {
      this.confirmDialogBoxVisibility = false
    },
    confirmSuccessDialogBox(value) {
      this.confirmDialogBoxVisibility = false
      // handle confirm here
      // After confirm, show success dialog box
      this.successDialogBoxVisibility = true
    },
    updateSuccessDialogBoxVisability(value) {
      this.successDialogBoxVisibility = value
    },
    getSignees() {
      this.selectLoading = true
      dispatchHttp(
        `/contract_templates/${this.contractTemplate.id}/signees`,
        null,
        'get'
      )
        .then(response => {
          this.signees = response.data
          console.log('DDDDSignees', this.signees);
        })
        .catch(() => {
          console.log('Error')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.preview {
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
