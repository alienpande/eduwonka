<template>
  <div class="mg-l-20 sm-margin-l-0" >
    <div class="heading">
      <span class="mg-l-35 ">Vendor Detail</span>
    </div>
    <el-card shadow="none" style="padding: 8px; margin: 0 20px" class="rounded-08 pg-50 cp hover-shadow sm-mx-0" :rules="rules">
      <div class="heading" style="margin-top: 0; padding-left: 20px">
        Choose the vendor to autofills below details
      </div>
      <el-col :span="23">
        <p>Select Vendor</p>
        <el-select v-model="vendor.user_id" @change="handleVendor(vendor.user_id)" rules="required">
          <el-option v-for="item in vendors" :key="item.id" :label="item.first_name" :value="item.id" rules="required" />
        </el-select>
      </el-col>
      <br /><br /><br /><br />
      <el-row>
        <el-col :span="11">
          <e-input v-model="vendor.contact_person" name="Contact person" placeholder="Enter contact person" rules="required" />
        </el-col>
        <el-col :span="11" :offset="1">
          <e-input v-model="vendor.contact_person_number" name="Phone Number" placeholder="Enter phone number" rules="required" />
        </el-col>
        <el-col :span="11">
          <e-input v-model="vendor.gst_number" name="GST Number" placeholder="Enter GST Number" rules="required" />
        </el-col>
        <el-col :span="11" :offset="1">
          <e-input v-model="vendor.tin_number" name="Tin Number" placeholder="Enter Tin Number" rules="required" />
        </el-col>
        <el-col :span="23">
          <div style="color: #000000cc; font-size: 16px; font-weight: 600">
            Address
          </div>
          <textarea class="details-expenses__textarea" v-model="vendor.address" placeholder="Enter Address" rows="4" cols="143" rules="required" />
        </el-col>
      </el-row>
    </el-card>
    <br />
    <div class="heading" style="margin-top: 0">
      <span class="mg-l-35">Invoice Details</span>
    </div>
    <el-card shadow="none" style="padding: 8px; margin: 0 20px" class="rounded-08 pg-50 cp hover-shadow sm-mx-0">
      <el-col :span="7">
        <e-input v-model="invoice.invoice_number" name="Invoice Number" placeholder="Enter invoice number" rules="required" />
      </el-col>
      <el-col :span="7" :offset="1">
        <e-date-picker v-model="invoice.issued_date" type="date" name="Date of Creation" placeholder="Pick a Date" align="right" @change="changeIssuedDate" format="MM/dd/yyyy" rules="required" />
      </el-col>
      <el-col :span="7" :offset="1">
        <e-date-picker v-model="invoice.due_date" type="date" name="Due Date" placeholder="Pick a Date" align="right" @change="changeDueDate" format="MM/dd/yyyy" rules="required" />
      </el-col>
    </el-card>
    <div class="heading" style="margin-top: 0">
      <span class="mg-l-35">Invoice Item Details</span>
    </div>
    <div class="invoice-add">
      <el-card shadow="none" style="margin: 0 20px" class="rounded-08 cp hover-shadow sm-mx-0">
        <el-row style="padding: 30px" v-for="(item, i) in invoiceItems" :key="i">
          <el-col :span="4">
            <e-input v-model="item.name" name="Item name" />
          </el-col>
          <el-col :span="5" :offset="1">
            <e-input v-model="item.description" name="Description" rules="required" />
          </el-col>
          <el-col :span="3" :offset="1">
            <e-input v-model="item.price" name="Unit Cost" rules="required" />
          </el-col>
          <el-col :span="2" :offset="1">
            <e-input v-model="item.quantity" name="Quantity" rules="required" />
          </el-col>
          <el-col :span="5" :offset="1">
            <p class="label" style="margin-bottom: 1i0px">
              Price (Unit cost*quantity )
            </p>
            <div style="color: #888888; font-size: 16px">
              {{ item.price * item.quantity }}
            </div>
          </el-col>
          <el-col :span="1">
            <e-svg icon="close2" v-show="invoiceItems.length > 1" @click="deleteSection(i)" css="h35 mt30" />
          </el-col>
        </el-row>
        <e-button label="Add Item" :plain="true" style="margin-left: 30px" icon="el-icon-plus" @click="addMore" />
        <br /><br /><br />
        <el-row style="background: #fcdfbd66; padding: 20px 10px">
          <el-col :span="4" :offset="1">
            <div class="label">Sub total (INR)</div>
            <div style="color: #888888; font-size: 16px" >{{ setTotalAmount() }}</div>
          </el-col>
          <el-col :span="4" :offset="1">
            <e-input v-model="invoice.paid_amount" name="Amount Paid" />
          </el-col>
          <el-col :span="4" :offset="1">
            <div class="label">Balance Due</div>
            <div style="color: #888888; font-size: 16px">{{ setTotalAmount() - invoice.paid_amount || 0 }}</div>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px">
      <el-col style="float: right" :span="3" :offset="6">  
        <e-button :span="3" label="Proceed" width="180" @click="onSubmit()" css="float-right" class="p-45" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { dispatchGraphql, dispatchGraphqlMutation } from '@/api/dispatcher'
export default {
  data: () => ({
    vendors: [],
    invoice: {},
    vendor: {},
    invoiceItems: [],
    invoice_id: null,
    rules: {},
    userQuery: `query {
      users(where: {role: {_eq: "Vendor"}}) {
        id
        first_name
        address
        vendor_info {
          id
          gst_number
          tin_number
          contact_person
          contact_person_number
        }
      }
    }`,
    invoiceItemMutatiom: `mutation insert_multiple_invoice_items($objects: [invoice_items_insert_input!]!) {
      insert_invoice_items(objects: $objects) {
        returning {
          id
        }
      }
    }`,
  }),
  created() {
    this.getVendors()
  },
  methods: {
    addMore() {
      this.invoiceItems.push({
        name: '',
        description: '',
        price: '',
        quantity: '',
      })
    },
    getItemVariables() {
      this.invoiceItems.map(x => { x.invoice_id = this.invoice_id })
      return {
        'objects': this.invoiceItems
      }
    },
    getInvoiceVariables() {
      const invoice = this.invoice
      invoice.vendor_id = this.vendor.id
      invoice.status = 'Pending'
      console.log('invoice', invoice)
      return invoice
    },
    getVendorVariables() {
      const vendor = this.vendor
      delete vendor.address
      console.log('vendor', vendor)
      return vendor
    },
    onSubmit() {
      dispatchGraphqlMutation('vendor_informations', ['id'], this.getVendorVariables()).then((response) => {
        console.log(response)
        dispatchGraphqlMutation('invoices', ['id'], this.getInvoiceVariables()).then((response) => {
          console.log(response)
          this.invoice_id = response.insert_invoices_one.id
          dispatchGraphql(this.invoiceItemMutatiom, this.getItemVariables()).then((response) => {
            console.log(response)
            this.$emit('save', this.vendor.id, this.invoice_id)
          })
        })
      })
    },
    setTotalAmount() {
      let total = 0
      for(const item of this.invoiceItems) {
        total += (item.price * item.quantity)
      }
      this.invoice.total_amount = total.toFixed(2)
      return total.toFixed(2)
    },
    deleteSection(i) {
      this.invoiceItems.splice(i, 1);
    },
    changeDueDate(value) {
      this.invoice.due_date = value
    },
    changeIssuedDate(value) {
      this.invoice.issued_date = value
    },
    handleVendor(value) {
      this.vendor = this.vendors.find(x => x.id === value).vendor_info
      this.vendor.address = this.vendors.find(x => x.id === value).address
    },
    getVendors() {
      dispatchGraphql(this.userQuery).then((response) => {
        this.vendors = response.users
      })
    },
  },
};
</script>
<style>
.details-expenses__textarea {
  box-shadow: 0px 1px 3px #11111112;
  border: 1px solid #cccccc;
  border-radius: 4px;
  padding: 10px;
}
.invoice-add .el-card__body {
  padding: 0 !important;
}
</style>
