<template>
  <div class="finance-add-expenses details-expenses mg-l-20">
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
      <e-container hideHeader pageTitle="Add Expenses" :back="$url.FI_EXPENSES" :rules="rules">
        <el-row :gutter="20">
          <el-row>
            <el-col :span="11">
              <e-input v-model="req.receipt_number" name="Receipt Number" placeholder="Enter Receipt number" rules="required" />
            </el-col>
            <el-col :span="11" :offset="1">
              <e-date-picker v-model="req.purchased_date" @change="addDate" format="MM/dd/yyyy" placeholder="Pick a Date" label="Purchase Date" rules="required" />
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <e-input v-model="req.amount" name="Amount (INR)" placeholder="Enter purchase amount" rules="required" />
            </el-col>
            <el-col :span="11" :offset="1">
              <p class="tx-16">Choose the Payment Type</p>
              <el-select v-model="req.payment_type" rules="required">
                <el-option v-for="item in types" :key="item.value" :label="item.value" :value="item.value" rules="required" />
              </el-select>
            </el-col>
          </el-row>
          <br />
        </el-row>
        <el-col :span="23">
          <p class="tx-16">Choose the category type</p>
          <el-select v-model="req.category_id" rules="required">
            <el-option v-for="item in categoriesData" :key="item.id" :label="item.name" :value="item.id" rules="required" />
          </el-select>
        </el-col>
        <br /><br /><br /><br />
        <el-row>
          <el-col :span="23">
            <div style="color: #000000cc; font-size: 16px; font-weight: 600">
              Notes
            </div>
            <textarea class="details-expenses__textarea" placeholder="Type here to add notes" rows="6" cols="107" v-model="req.notes" rules="required" />
          </el-col>
        </el-row>

        <div style="color: #000000cc; font-size: 16px; font-weight: 600">
          Attach files
        </div>
        <file-upload class="finance-add-expenses-upload" />
        <el-row class="text-right" style="border-top: 1px solid #fcdfbd; margin-top: 20px">
          <e-button :span="18" label="Cancel" width="180" type="text" class="p-45 cancel-button-margin" />
          <e-button :span="3" width="180" label="Create Expense" @click="handleSubmit(saveExpenses)" css="float-right" class="p-45" />
        </el-row>
      </e-container>
    </ValidationObserver>
  </div>
</template>
<script>
import fileUpload from '@/components/finance/fileUploaded.vue'
// import moment from 'moment'
import { dispatchGraphqlQuery , dispatchGraphqlMutation} from "@/api/dispatcher";
export default {
  components:{ fileUpload },
  data: () => ({
    rules: {},
    req: {},
    categoriesData:[],
    types: [
      {
        label: "CASH",
        value: "cash",
      },
      {
        label: "CARD",
        value: "card",
      },
      {
        label: "ONLINE_PAYMENT",
        value: "online_payment",
      },
    ],
  }),
  created() {
    this.getData()
  },
  methods: {
    addDate(value) {
      this.req.purchased_date = value
    },
    getData(){
      dispatchGraphqlQuery('categories', ['id', 'name']).then((response) => {
        this.categoriesData = response.categories
      })
    },
    saveExpenses() {
      this.req.expenses_type = this.$route.params.type
      dispatchGraphqlMutation('expenses', ['id', 'amount','expenses_type'], this.req).then((response) => {
        console.log("show", response)
        this.$router.push(this.$url.FI_EXPENSES)
      })

    },

  }
};
</script>
<style>
.details-expenses .el-input__prefix {
  right: 4px !important;
  top: -3px !important;
}
.details-expenses .el-input__icon {
  float: right !important;
  color: #888888 !important;
}
.details-expenses .el-input--prefix .el-input__inner {
  padding-left: 10px !important;
  box-shadow: 0px 1px 3px #11111112 !important;
  border: 1px solid #cccccc !important;
  color: #888888 !important;
  font-weight: 500 !important;
}
.details-expenses .el-input--prefix .el-input__inner::placeholder {
  color: #888888 !important;
}
.details-expenses__textarea {
  box-shadow: 0px 1px 3px #11111112;
  border: 1px solid #cccccc;
  border-radius: 4px;
  padding: 10px;
}
@media only screen and (device-width: 768px) {
  .cancel-button-margin {
    margin-right: 57px;
  }
}
</style>
