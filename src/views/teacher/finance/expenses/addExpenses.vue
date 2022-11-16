<template>
  <div class="details-expenses">
    <e-container
      hideHeader
      pageTitle="Add Expenses"
      :back="$url.FI_EXPENSES"
    >
      <el-row>
        <el-col :span="10">
          <e-input
            :span="19"
            v-model="req.standard"
            name="Receipt Number"
            placeholder="Text Field"
          ></e-input>
        </el-col>
        <el-col :span="10">
          <e-date-picker
            :span="19"
            v-model="req.date"
            placeholder="Choose date of purchase"
            label="Purchase Date"
          ></e-date-picker>
        </el-col>
        <el-col :span="10">
          <e-input
            :span="19"
            v-model="req.standard"
            name="Amount (INR)"
            placeholder="Enter purchase amount"
          ></e-input>
        </el-col>
        <el-col :span="10">
          <e-select
            :span="19"
            label="Payment type"
            placeholder="Choose the payment type"
            :v-model="req.standard"
            :options="standards"
          ></e-select>
        </el-col>
        <br />
      </el-row>
      <el-col>
        <e-select
          :span="18"
          label="Category"
          placeholder="Choose the category type"
          :v-model="req.standard"
          :options="standards"
        ></e-select>
      </el-col>
      <br />
      <br />
      <br />
      <br />
      <el-row>
        <el-col>
          <div style="color: #000000cc; font-size: 16px; font-weight: 600">
            Notes
          </div>
          <textarea
            class="details-expenses__textarea"
            placeholder="Type here to add notes"
            rows="6"
            cols="107"
          ></textarea>
        </el-col>
      </el-row>

      <div style="color: #000000cc; font-size: 16px; font-weight: 600">
      Attach files
      </div>
      <file-upload/>
     
      <!-- <br />
      <br />
      <br />
      <br /> -->

      <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px">
        <el-col style="float: right" :span="9">
          <e-button
            :span="15"
            label="Cancel"
            width="180"
            css="cancel_btn"
            type="default"
            class="p-45"
          ></e-button>
          <e-button
            :span="8"
            label="Create Expense"
            width="180"
            css="float-right"
            class="p-45"
          ></e-button>
        </el-col>
      </el-row>
    </e-container>
  </div>
</template>
<script>
import fileUpload from '@/components/finance/fileUploaded.vue'
export default {
    components:{fileUpload},
  data: () => ({
    req: {},
    standards: [
      {
        label: "X",
        value: "x",
      },
      {
        label: "IX",
        value: "ix",
      },
      {
        label: "VIII",
        value: "viii",
      },
      {
        label: "VII",
        value: "vii",
      },
      {
        label: "VI",
        value: "vi",
      },
    ],
  }),
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

</style>
