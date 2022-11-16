<template>
  <div>
    <e-container hideHeader pageTitle="Details of Expenses" :back="$url.FI_EXPENSES">
      <el-row class="mg-l-20">
        <el-col :span="10">
          <detail-bar title="Receipt Number" :text="expense.receipt_number" />
        </el-col>
        <el-col :span="10" :offset="1">
          <detail-bar title="Purchase Date" :text="getDate(expense.purchased_date)" />
        </el-col>
        <el-col :span="10">
          <detail-bar title="Amount (INR)" :text="expense.amount" />
        </el-col>
        <el-col :span="10" :offset="1">
          <detail-bar title="Payment type" :text="expense.payment_type" />
        </el-col>
        <el-col :span="21">
          <br />
          <detail-bar title="Category" :text="category.name" />
        </el-col>
        <el-col :span="21">
          <br />
          <detail-bar title="Notes" :text="expense.notes" />
        </el-col>
      </el-row>
      <br />
      <el-row class="mg-l-20">
        <div style="color: #000000cc; font-size: 16px; font-weight: 600">
          Attach files
        </div>
        <div v-for="i in expense.attachment_ids" :key="i" style="border: 1px solid #00000066;border-radius: 2px;display: flex;margin-bottom: 10px;width: 972px;background: white;">
          <img style="padding: 5px 0 8px 10px" src="@/assets/images/expenseImg.png" />
          <div style="margin-left: 10px; margin-top: 5px">
            <div style="color: #00000066; font-weight: 500; font-size: 14px">Expense.png</div>
            <div style="color: #979fb8; font-weight: 500; font-size: 12px">428KB</div>
          </div>
          <e-svg class="close-iconss" icon="Download_file"></e-svg>
        </div>
        <br />
        <el-row v-if="expense.status === 'Rejected'">
          <el-col :span="4">
            <div class="label">Status of approval</div>
            <e-button :span="5" label="Rejected" css="sort-icon rejected-color bg-transparent" :plain="true" />
          </el-col>
        </el-row>
  
        <el-row v-if="expense.status === 'Approved'">
          <el-col :span="4">
            <div class="label">Status of approval</div>
            <e-button :span="5" label="Approved" css="sort-icon approved-color bg-transparent" :plain="true" />
          </el-col>
        </el-row>
      </el-row>

      <el-row v-if="!expense.status" style="border-top: 1px solid #fcdfbd; margin-top: 20px">
        <el-col style="float: right" :span="7">
          <e-button :span="16" label="Reject" css="sort-icon bg-transparent" :plain="true" @click="rejectDialog = true" class="p-45" />
          <e-button :span="8" label="Approve" @click="handleApprove" css="float-right" class="p-45" />
        </el-col>
      </el-row>
    </e-container>

    <e-dialog :title="'Please Provide the reason for rejection'" v-model="rejectDialog" width="60%" top="20vh" noEsc :gutter="20" hideDefaultFooter @cancel="rejectDialog = false" @confirm="rejectDialog = false">
      <textarea class="expense-textarea" v-model="reason" placeholder="Type here to add notes" rows="5" cols="100" />
      <el-row style="border-top: 1px solid #fcdfbd">
        <el-col :span="18" :offset="16">
          <e-button :span="8" label="Cancel" @click="rejectDialog = false" css="cancel-custom" class="p-45" />
          <e-button :span="4" label="Submit" @click="handleReject" css="float-right" class="p-45" />
        </el-col>
      </el-row>
    </e-dialog>
  </div>
</template>
<script>
import { dispatchGraphqlQueryByPk, dispatchGraphql } from "@/api/dispatcher";
import moment from "moment"
export default {
  data: () => ({
    rejectDialog: false,
    expense: {},
    reason: '',
    category: {}
  }),
  created () {
    this.getExpense()
  },
  methods: {
    updateExpense() {
      delete this.expense.attachment_ids
      const mutation = `mutation($id: uuid!, $changes: expenses_set_input) {
        update_expenses_by_pk(pk_columns: {id: $id}, _set: $changes) {
          id
          status
        }
      }`
      dispatchGraphql(mutation, { id: this.$route.params.id, changes: this.expense }).then((response) => {
        console.log(response)
        this.getExpense()
      })
    },
    handleReject() {
      this.rejectDialog = false
      this.expense.status = "Rejected"
      this.updateExpense()
    },
    handleApprove() {
      this.expense.status = "Approved"
      this.updateExpense()
    },
    getDate(date) {
      return moment(date).format("DD MMM YYYY")
    },
    getExpense() {
      dispatchGraphqlQueryByPk('expenses', ['id', 'amount','notes', 'attachment_ids', 'category_id','receipt_number','purchased_date','status','payment_type'], { id: this.$route.params.id }).then((response) => {
        this.expense = response.expenses_by_pk
        dispatchGraphqlQueryByPk('categories', ['id', 'name'], { id: this.expense.category_id }).then((response) => {
          this.category = response.categories_by_pk
          console.log('category',response.categories_by_pk)
        })
      })
    },
  }
};
</script>
<style>
.close-iconss img {
  width: 22px;
  margin-top: 12px;
  margin-left: 49rem !important;
}
.cancel-custom {
  box-shadow: 0px 1px 3px #11111112;
  border-radius: 4px;
  background: #11111112 !important;
  border: none;
  color: #bc6c42;
  font-size: 16px;
  font-weight: 600;
}
.sort-icon {
  background: transparent !important;
}
.sort-icon:hover {
  background: #bc6c42 !important;
}
.expense-textarea {
  box-shadow: 0px 1px 3px #11111112;
  border: 1px solid #cccccc;
  border-radius: 4px;
  padding: 10px;
}
.rejected-color {
  color: red !important;
}
.approved-color {
  color: green !important;
}
</style>
