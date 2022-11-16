<template>
  <div class="add-signees">
    <el-row :gutter="20">
      <el-col :span="24">
        <h4 calss="tx-bold tx-16">Add Signee Roles</h4>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <div class="flex flex-row">
          <div class="tx-18 flex flex-column">
            <el-radio v-model="contractTemplate.role_type" label="ClientOnly" class="mg-b-10 tx-bold">Client Only</el-radio>
            <el-radio v-model="contractTemplate.role_type" label="Boath" class="tx-bold">Boath client and coach(me)</el-radio>
          </div>
        </div>
      </el-col>
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
import { dispatchHttp } from '@/api/dispatcher'
export default {
  name: 'AddSignees',
  components: { CancelDialogBox },
  props: {
    contractTemplate: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      cancelDialogBoxVisibility: false
    }
  },
  computed: {},
  methods: {
    handleSubmit() {
      dispatchHttp(
        `/contract_templates/${this.contractTemplate.id}/update_signee_roles`,
        { signee_role_type: this.contractTemplate.role_type },
        'patch'
      )
        .then(response => {
          this.$notify({
            title: 'Saved',
            message: 'Signees',
            type: 'success',
            duration: 2000
          })
          this.$emit('handleSubmit', 3, 'edit-document')
        })
        .catch(() => {
          console.log('Error')
        })
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
    }
  }
}
</script>

<style lang="scss" scoped>
.add-signees {
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
}
</style>
