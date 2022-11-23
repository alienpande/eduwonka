<template>
  <div class="mg-l-20">
    <div class="heading">
      <span class="mg-l-45">Bank Details</span>
    </div>
    <el-card shadow="none">
      <el-row>
        <el-col :span="11">
          <div style="color: #000000cc; padding-bottom: 10px" class="fs-16 f-600">Account Number</div>
          <div style="color: #00000099" class="fs-16">{{ invoice.vendor_information.bank_details.account_no }}</div>
        </el-col>
        <el-col :span="11" :offset="1">
          <div style="color: #000000cc; padding-bottom: 10px" class="fs-16 f-600">IFSC Code</div>
          <div style="color: #00000099" class="fs-16">{{ invoice.vendor_information.bank_details.ifsc_code }}</div>
        </el-col>
        <el-col :span="11" :offset="1">
          <div style="color: #000000cc; padding-bottom: 10px" class="fs-16 f-600">Branch Name</div>
          <div style="color: #00000099" class="fs-16">{{ invoice.vendor_information.bank_details.bank_name }}</div>
        </el-col>
        <el-col :span="11" :offset="1">
          <div style="color: #000000cc; padding-bottom: 10px" class="fs-16 f-600">Account Holder Name</div>
          <div style="color: #00000099" class="fs-16">{{ invoice.vendor_information.bank_details.account_holder }}</div>
        </el-col>
      </el-row>
    </el-card>
    <div class="heading">
      <span class="mg-l-45">Approval and payment Details</span>
    </div>
    <el-card shadow="none">
     <el-row>
        <el-col :span="window.width > 767 ? 5 : 6" >
          <div style="color: #000000cc; padding-bottom: 10px" class="fs-16 f-600">Approved by</div>
          <!-- <div style="color: #00000099" class="fs-16">{{ invoice.approval_recommendation.user.first_name }}</div> -->
        </el-col>
         <el-col :span="window.width > 767 ? 5 : 6" >
          <div style="color: #000000cc; padding-bottom: 10px" class="fs-16 f-600">Payment Status</div>
          <div style="color: #00000099" class="fs-16">{{ invoice.status === 'Paid' ? 'Paid' : 'Pending' }}</div>
        </el-col>
         <el-col :span="window.width > 767 ? 5 : 6" >
          <div style="color: #000000cc; padding-bottom: 10px" class="fs-16 f-600">Payment Date</div>
          <div style="color: #00000099" class="fs-16">{{ getDate(invoice.updated_at) }}</div>
        </el-col>
     </el-row>
    </el-card>

    <div class="heading">
      <span class="mg-l-45">Invoice uploads (optional)</span>
    </div>
    <el-card shadow="none">
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
    </el-card>
    <el-row class="text-right" style="border-top: 1px solid #fcdfbd; margin-top: 20px">
      <e-button :span="window.width > 767 ? 18 : 12" label="Cancel" width="180" type="text" :class="window.width > 767 ? 'p-45' : 'pr-45 pl-45'" class="cancel-button-margin" />
      <e-button :span="window.width > 767 ? 18 : 12" label="Download" width="180" @click="handleClick" css="float-right" :class="window.width > 767 ? 'p-45' : 'pr-45 pl-45'" />
    </el-row>
  </div>
</template>
<script>
import moment from 'moment'
import screenSize from '@/mixins/screenSize'

export default {
  mixins: [screenSize],
  props: {
    invoice: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
  }),
  created() {
  },
  methods: {
    getDate(date) {
      return moment(date).format('DD MMM YYYY')
    },
  }
};
</script>
<style >
.close-iconss img {
  width: 22px;
  margin-top: 12px;
  margin-left: 49rem !important;
}
</style>
