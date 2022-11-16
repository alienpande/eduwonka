<template>
  <div>
    <e-container
      hideHeader
      pageTitle="Details of Expenses"
      :back="$url.FI_EXPENSES"
    >
      <el-row>
        <el-col :span="5">
          <detail-bar title="Receipt Number" text="1203QWJ" />
        </el-col>
        <el-col :span="5">
          <detail-bar title="Purchase Date" text="01-02-2020" />
        </el-col>
        <el-col :span="5">
          <detail-bar title="Amount (INR)" text="20,000" />
        </el-col>
        <el-col :span="5">
          <detail-bar title="Payment type" text="Cheque" />
        </el-col>

        <el-col :span="20">
          <br />
          <detail-bar title="Category" text="Garments" />
        </el-col>

        <el-col :span="20">
          <br />
          <detail-bar
            title="Notes"
            text="Lorem Ipsum dolar sit Lorem Ipsum dolar sit Lorem Ipsum dolar sit Lorem Ipsum dolar sit Lorem Ipsum dolar sit"
          />
        </el-col>
      </el-row>
      <br />

      <div style="color: #000000cc; font-size: 16px; font-weight: 600">
        Attach files
      </div>
      <div
        v-for="i in 2"
        :key="i"
        style="
          border: 1px solid #00000066;
          border-radius: 2px;
          display: flex;
          margin-bottom: 10px;
          width: 972px;
          background: white;
        "
      >
        <img
          style="padding: 5px 0 8px 10px"
          src="@/assets/images/expenseImg.png"
        />
        <div style="margin-left: 10px; margin-top: 5px">
          <div style="color: #00000066; font-weight: 500; font-size: 14px">
            Expense.png
          </div>
          <div style="color: #979fb8; font-weight: 500; font-size: 12px">
            428KB
          </div>
        </div>

        <e-svg class="close-iconss" icon="Download_file"></e-svg>
      </div>

      <br />
      <el-row v-if="isReject">
        <el-col :span="4">
          <div class="label">Status of approval</div>
          <e-button
            :span="5"
            label="Rejected"
            css="sort-icon rejected-color bg-transparent"
            :plain="true"
          ></e-button>
        </el-col>
        <el-col :span="15">
          <div class="label">Reason of Rejection</div>
          <div class="fs-16" style="color: #888888">
            Lorem Ipsum dolar sit Lorem Ipsum dolar sit Lorem Ipsum dolar sit
          </div>
          <div class="fs-16" style="color: #888888">
            Lorem Ipsum dolar sit Lorem Ipsum dolar sit Lorem Ipsum dolar sit
          </div>
        </el-col>
      </el-row>

      <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px">
        <el-col style="float: right" :span="7">
          <e-button
            :span="16"
            label="Reject"
            css="sort-icon bg-transparent"
            :plain="true"
            @click="approveDialoge = !approveDialoge"
            class="p-45"
          ></e-button>
          <e-button
            :span="8"
            label="Approve"
            @click="handleClick"
            css="float-right"
            class="p-45"
          ></e-button>
        </el-col>
      </el-row>
    </e-container>

    <e-dialog
      :title="'Please Provide the reason for rejection'"
      v-model="approveDialoge"
      width="60%"
      top="20vh"
      noEsc
      :gutter="20"
      hideDefaultFooter
      @cancel="approveDialoge = false"
      @confirm="approveDialoge = false"
    >
      <textarea
        class="expense-textarea"
        placeholder="Type here to add notes"
        rows="5"
        cols="100"
      ></textarea>
      <el-row style="border-top: 1px solid #fcdfbd">
        <el-col :span="18" :offset="16">
          <e-button
            :span="8"
            label="Cancel"
            css="cancel-custom"
            class="p-45"
          ></e-button>
          <e-button
            :span="4"
            label="Submit"
            @click="(isReject = !isReject), (approveDialoge = false)"
            css="float-right"
            class="p-45"
          ></e-button>
        </el-col>
      </el-row>
    </e-dialog>
  </div>
</template>
<script>
export default {
  data: () => ({
    approveDialoge: false,
    isReject: false,
  }),
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
</style>
