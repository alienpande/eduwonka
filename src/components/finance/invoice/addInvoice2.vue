<template>
  <div class="mg-l-20 sm-margin-l-0">
    <div class="heading">
      <span class="mg-l-45">Bank Details</span>
    </div>
    <el-card shadow="none" style="padding: 8px; margin: 0 40px" class="rounded-08 pg-50 cp hover-shadow sm-mx-0">
      <el-col :span="11">
        <e-input v-model="bankDetails.account_no" name="Account Number"></e-input>
      </el-col>
      <el-col :span="11" :offset="1">
        <e-input v-model="bankDetails.ifsc_code" name="IFSC Code"></e-input>
      </el-col>
      <el-col :span="11">
        <e-input v-model="bankDetails.bank_name" name="Branch Name" placeholder="lorem" ></e-input>
      </el-col>
      <el-col :span="11" :offset="1">
        <e-input v-model="bankDetails.account_holder" name="Account Holder Name" placeholder="0121-288128" ></e-input>
      </el-col>
    </el-card>
    <e-form :gutter="50" themeFooter heading="Approval Details" class="approval-details">
      <e-radio :span="12" label="Is the Invoice pre approved?" :options="approveInvoice" v-model="isPreApproved" />
      <template #themeFooter>
        <el-row style="padding-left:30px;padding-bottom:10px">
          <el-col :span="22">
            <p>Who Approved the invoice ?</p>
            <el-select v-model="approver.user_id">
              <el-option v-for="user in users" :key="user.id" :label="user.first_name" :value="user.id"  />
            </el-select>
          </el-col>
        </el-row>
        <br/>
        <e-radio :span="12" label="Is payment done?" :options="paymentOptions" v-model="isPayment" />
      </template>
    </e-form>

    <div class="heading" style="margin-left: 30px">
      <span class="mg-l-45">Add Original Invoice (optional)</span>  
    </div>
    <file-upload style="margin-left: 50px" />
    <el-row class="text-right" style="border-top: 1px solid #fcdfbd; margin-top: 20px">
      <e-button :span="18" label="Cancel" width="180" type="text" class="p-45 cancel-button-margin" />
      <e-button :span="3" label="Proceed" width="180" @click="update" css="float-right" class="p-45" />
    </el-row>
  </div>
</template>
<script>
import fileUpload from "@/components/finance/fileUploaded.vue";
import { dispatchGraphql, dispatchGraphqlMutation} from "@/api/dispatcher"

export default {
  props: {
    invoiceId: {
      type: String,
      default: null
    },
    bankDetails: {
      type: Object,
      default: () => ({})
    },
  },
  components: { fileUpload },
  data: () => ({
    users: [],
    isPreApproved: false,
    approveInvoice: [
      {
        status: "yes",
        value: "Yes",
      },
      {
        status: "No",
        value: "No",
      },
    ],
    isPayment: false,
    paymentOptions: [
      {
        status: "yes",
        value: "Yes",
      },
      {
        status: "No",
        value: "No",
      },
    ],
    approver: {},
    query: `query {
      users (where: {role: {_nin: ["student", "parent"]}}) {
        id
        first_name
        role
      }
    }`,
  }),
  created() {
    this.getUsers()
  },
  methods: {
    getVariables() {
      const invoice = {
        id: this.invoiceId,
        status: 'Submitted',
      }
      return {
        'id': this.invoiceId,
        'changes': invoice,
      } 
    },
    getApproverVariables() {
      const approver = this.approver
      approver.approval_recommendable_id = this.invoiceId
      approver.approval_recommendable_type = 'Invoice'
      return approver
    },
    update() {
      const mutation = `mutation($id: uuid!, $changes: invoices_set_input) {
        update_invoices_by_pk(pk_columns: {id: $id}, _set: $changes) {
          id
        }
      }`
      dispatchGraphql(mutation, this.getVariables()).then((response) => {
        console.log(response)
        if (this.isPreApproved === false) {
          dispatchGraphqlMutation('approval_recommendations', ['id'], this.getApproverVariables()).then((response) => {
            console.log(response)
            this.$router.push(this.$url.FI_INVOICE)
          })
        } else {
          this.$router.push(this.$url.FI_INVOICE)
        }
      })
    },
    getUsers() {
      dispatchGraphql(this.query).then((response) => {
        this.users = response.users
      })
    }
  }
};

</script>
<style scoped>
.approval .el-card__body {
  padding: 0 !important;
}
/* .approval-details > div:first-child{
   padding-right: 0px !important;
   padding-left: 0px !important;
 }*/
@media only screen and (device-width: 768px) {
  .cancel-button-margin {
    margin-right: 57px;
  }
}
</style>
