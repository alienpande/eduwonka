<template>
  <div class="mg-l-20">
    <div class="heading">
        <span class="mg-l-35">Vendor Detail</span>
    </div>
    <el-card shadow="none">
      <el-row>
        <el-col :span="11" >
          <div style="color: #000000cc;padding-bottom:10px" class="fs-16 f-600">vendor</div>
          <div style="color: #00000099;" class="fs-16">{{ invoice.vendor_information.user.first_name }}</div>
        </el-col>
        <el-col :span="11" :offset="1" >
          <div style="color: #000000cc;padding-bottom:10px" class="fs-16 f-600">Contact person</div>
          <div style="color: #00000099;" class="fs-16">{{ invoice.vendor_information.contact_person }}</div>
        </el-col>
        <el-col :span="11" >
          <div style="color: #000000cc;padding-bottom:10px" class="fs-16 f-600">Phone Number</div>
          <div style="color: #00000099;" class="fs-16">{{ invoice.vendor_information.contact_person_number}}</div>
        </el-col>
        <el-col :span="11" :offset="1" >
          <div style="color: #000000cc;padding-bottom:10px" class="fs-16 f-600">GST Number</div>
          <div style="color: #00000099;" class="fs-16">{{ invoice.vendor_information.gst_number }}</div>
        </el-col>
        <el-col :span="11" >
          <div style="color: #000000cc;padding-bottom:10px" class="fs-16 f-600">Tin Number</div>
          <div style="color: #00000099;" class="fs-16">{{ invoice.vendor_information.tin_number }}</div>
        </el-col>
        <el-col :span="11" :offset="1" >
          <div style="color: #000000cc;padding-bottom:10px" class="fs-16 f-600">Address</div>
          <div style="color: #00000099;" class="fs-16">{{ invoice.vendor_information.user.address }}</div>
        </el-col>
      </el-row>
    </el-card>

    <div class="heading">
        <span class="mg-l-35">Invoice Details</span>
    </div>
    <el-card shadow="none">
      <el-row>
        <el-col :span="7" >
          <div style="color: #000000cc;padding-bottom:10px" class="fs-16 f-600">Invoice Number</div>
          <div style="color: #00000099;" class="fs-16">{{ invoice.invoice_number }}</div>
        </el-col>
        <el-col :span="7" :offset="1" >
          <div style="color: #000000cc;padding-bottom:10px" class="fs-16 f-600">Date of Creation</div>
          <div style="color: #00000099;" class="fs-16">{{ getDate(invoice.issued_date) }}</div>
        </el-col>
        <el-col :span="7" :offset="1" >
          <div style="color: #000000cc;padding-bottom:10px" class="fs-16 f-600">Due Date</div>
          <div style="color: #00000099;" class="fs-16">{{ getDate(invoice.due_date) }}</div>
        </el-col>
      </el-row>
    </el-card>
    <div class="heading">
        <span class="mg-l-35">Item Details</span>
    </div>
    <el-card shadow='none'>
        <el-row>
            <el-col :span="4">
                <div style="color: #000000cc;padding-bottom:10px" class="fs-16 f-600">Item name</div>
            </el-col>
            <el-col :span="5" :offset="1">
                <div style="color: #000000cc;padding-bottom:10px" class="fs-16 f-600">Description</div>
            </el-col>
            <el-col :span="3" :offset="1">
                <div style="color: #000000cc;padding-bottom:10px" class="fs-16 f-600">Price</div>
            </el-col>
            <el-col :span="2" :offset="1">
                <div style="color: #000000cc;padding-bottom:10px" class="fs-16 f-600">Quantity</div>
            </el-col>
            <el-col :span="6" :offset="1">
                <div style="color: #000000cc;padding-bottom:10px" class="fs-16 f-600">Total Price (Unit cost*quantity )</div>
            </el-col>
        </el-row>
        <el-row v-for="(item,i) in invoice.invoice_items" :key="i">
            <el-col :span="4">
                <div style="color: #000000cc;padding-bottom:10px" class="fs-16">{{ item.name }}</div>
            </el-col>
            <el-col :span="5" :offset="1">
                <div style="color: #000000cc;padding-bottom:10px" class="fs-16">{{ item.description }}</div>
            </el-col>
            <el-col :span="3" :offset="1">
                <div style="color: #000000cc;padding-bottom:10px" class="fs-16">{{ item.price }}</div>
            </el-col>
            <el-col :span="2" :offset="1">
                <div style="color: #000000cc;padding-bottom:10px" class="fs-16">{{ item.quantity }}</div>
            </el-col>
            <el-col :span="6" :offset="1">
                <div style="color: #000000cc;padding-bottom:10px" class="fs-16">{{ item.price * item.quantity }}</div>
            </el-col>
        </el-row>
    </el-card>
    <el-card shadow='none' style="margin-top:-2px;border-top:none;background:#FCDFBD66">
        <el-row>
            <el-col :span="4" :offset="1">
                <div style="color: #000000cc;padding-bottom:10px" class="fs-16 f-600">Sub total (INR)</div>
                <div style="color: #00000099;" class="fs-16">{{ invoice.total_amount }}</div>
            </el-col>
            <el-col :span="4" :offset="1">
                <div style="color: #000000cc;padding-bottom:10px" class="fs-16 f-600">Amount Paid</div>
                <div style="color: #00000099;" class="fs-16">{{ invoice.paid_amount }}</div>
            </el-col>
            <el-col :span="4" :offset="1">
                <div style="color: #000000cc;padding-bottom:10px" class="fs-16 f-600">Due Amount</div>
                <div style="color: #00000099;" class="fs-16">{{ invoice.total_amount - invoice.paid_amount }}</div>
            </el-col>
        </el-row>
    </el-card>
    <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px">
        <el-col style="float: right" :span="3">
            <e-button :span="6" label="Next" width="180" @click="$emit('save')" css="float-right" class="p-45" />
        </el-col>
    </el-row>
  </div>
</template>
<script>
import moment from 'moment'
export default {
    props: {
        invoice: {
            type: Object,
            default: () => {}
        }
    },
    data:()=>({
    }),
    created() {
    },
    methods: {
        getDate(date) {
            return moment(date).format('DD-MM-YYYY')
        },
    },
}
</script>
