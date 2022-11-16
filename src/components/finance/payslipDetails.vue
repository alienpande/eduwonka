<template>
  <div>
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <el-card shadow="none" class="rounded-08 pg-50 cp"  :rules="rules">
      <el-row>
        <el-col :span="7">
          <e-input v-model="payslip.payslip_number" name="Slip Number" placeholder="Enter slip number" rules="required"/>
        </el-col>
        <el-col :span="7" :offset="1">
          <e-input v-model="payslip.month" name="Month" placeholder="Enter Month" rules="required" />
        </el-col>
        <el-col :span="7" :offset="1">
          <e-date-picker v-model="payslip.due_date" name="Due Date" placeholder="Pick a Due Date" @change="handleDate"  rules="required" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-row style="border-radius: 0px 0px 4px 4px">
            <el-col :span="9" style="border-right: 1px solid rgb(77 79 92 / 29%)">
              <div class="payslip-table-header">Earning</div>
            </el-col>
            <el-col :span="14">
              <div class="payslip-table-header">Earning</div>
            </el-col>
            <div v-for="(earning, i) in payslip.earnings" :key="i">
              <el-col :span="9" style="border-right: 1px solid rgb(77 79 92 / 29%); border-left: 1px solid rgb(77 79 92 / 29%);">
                <div class="payslip-table-data">{{ earning.name }}</div>
              </el-col>
              <el-col style="border-right: 1px solid rgb(77 79 92 / 29%)" :span="15">
                <div class="payslip-table-data">
                  <input type="text" v-model="earning.amount" placeholder="Enter Amount"  rules="required" />
                </div>
              </el-col>
            </div>
            <el-col :span="9" style="border-right: 1px solid rgb(77 79 92 / 29%)">
              <div class="payslip-table-footer">Total</div>
            </el-col>
            <el-col :span="14">
              <div class="payslip-table-footer">{{ getTotalEarning() }}</div>
            </el-col>
            <el-col :span="1">&emsp;</el-col>
          </el-row>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-row style="border-radius: 0px 0px 4px 4px">
            <el-col :span="9" style="border-right: 1px solid rgb(77 79 92 / 29%)">
              <div class="payslip-table-header">Deduction</div>
            </el-col>
            <el-col :span="14">
              <div class="payslip-table-header">Amount</div>
            </el-col>
            <div v-for="(deduction, i) in payslip.deductions" :key="i">
              <el-col :span="9" style="border-right: 1px solid rgb(77 79 92 / 29%); border-left: 1px solid rgb(77 79 92 / 29%);">
                <div class="payslip-table-data">{{ deduction.name }}</div>
              </el-col>
              <el-col style="border-right: 1px solid rgb(77 79 92 / 29%)" :span="15">
                <div class="payslip-table-data">
                  <input type="text" v-model="deduction.amount" placeholder="Enter Amount"  rules="required" />
                </div>
              </el-col>
            </div>
            <el-col :span="9" style="border-right: 1px solid rgb(77 79 92 / 29%)">
              <div class="payslip-table-footer">Total</div>
            </el-col>
            <el-col :span="14">
              <div class="payslip-table-footer">{{ getTotalDeduction() }}</div>
            </el-col>
            <el-col :span="1">&emsp;</el-col>
          </el-row>
        </el-col>
      </el-row>
      <br />
      <div class="sec-title">Net</div>
      <el-col style="border-radius: 0px 0px 4px 4px; color: #52575d; font-size: 20px; font-weight: 600; background: #fcdfbd66; padding: 10px 15px; margin-top: 5px;">
        {{ getTotal() }}
      </el-col>
      <br />
      <br />
      <br />
      <div class="fs-16" style="color: #000000cc">Add Remarks</div>
      <textarea v-model="payslip.remarks" class="payslip-textarea" placeholder="Type here to add notes" rows="4" cols="165"  rules="required"/>
    </el-card>
    <br />
    <el-row v-if="!allSelect" style="border-top: 1px solid #fcdfbd; margin-top: 20px">
      <el-col style="float: right" :span="1">
        <e-button :span="4" label="Save and Proceed" width="180" css="float-right" class="p-45" @click="handlePayslip" />
      </el-col>
    </el-row>
    <el-row class="text-right" style="border-top: 1px solid #fcdfbd; margin-top: 20px">
      <e-button :span="17" label="Cancel" width="180" type="default" class="p-45 cancel-button-margin" />
      <e-button :span="3" label="Generate All" width="180" @click="handleSubmit(handleClick)" css="float-right" class="p-45" />
    </el-row>
    </ValidationObserver>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  props: {
    payslip: {
      type: Object
    }
  },
  data: () => ({
    // payslip: {},
    rules: {},
    earnings: [
      {
        name: "Baisc & DA",
        value: "",
      },
      {
        name: "Medical",
        value: "",
      },
      {
        name: "Lorem Dolle",
        value: "",
      },
      {
        name: "Dollor",
        value: "",
      },
    ],
    deductions: [
      {
        name: "Tax",
        value: "",
      },
      {
        name: "TDS/IT",
        value: "",
      },
      {
        name: "Lorem Dolle",
        value: "",
      },
      {
        name: "Dollor",
        value: "",
      },
    ],
  }),
  methods: {
    getTotalEarning() {
      // var final = this.payslip.earnings.map(x => x.amount).reduce((prev, curr) => prev + curr, 0)
      var final = 0
      for(const earn of this.payslip.earnings) {
        final += earn.amount > 0 ? parseInt(earn.amount) : 0
      }
      return final
    },
    getTotalDeduction() {
      // var final = this.payslip.deductions.map(x => x.amount).reduce((prev, curr) => prev + curr, 0)
      var final = 0
      for(const deduct of this.payslip.deductions) {
        final += deduct.amount > 0 ? parseInt(deduct.amount) : 0
      }
      return final
    },
    getTotal() {
      var total = this.getTotalEarning() - this.getTotalDeduction()
      this.payslip.total_amount = total
      return this.payslip.total_amount || 0
    },
    handleDate(value) {
      this.payslip.due_date = value
      this.payslip.year = moment(value).format('yyyy')
    },
    handlePayslip() {
      this.$emit('userPaySlip', this.payslip.employee_id)
    },
    handleClick() {
      this.$emit('generate')
    }
  }
};
</script>
<style scoped>
.payslip-table-header {
  background: rgb(188 108 66 / 20%);
  color: #000000cc;
  font-size: 18px;
  padding: 10px 21px;
}
.payslip-table-footer {
  color: #000000cc;
  font-size: 18px;
  font-weight: 500;
  background: #fcdfbd66;
  padding: 10px 21px;
}
.payslip-table-data {
  height: 35px;
  padding: 10px 21px;
  color: #000000cc;
  font-size: 16px;
}
.payslip-table-data input {
  box-shadow: 0px 1px 3px #11111112;
  border: 1px solid #cccccc;
  border-radius: 4px;
  font-size: 16px;
  padding: 8px 5px;
}
.payslip-table-data input::placeholder {
  color: #00000099;
}
.payslip-textarea {
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
