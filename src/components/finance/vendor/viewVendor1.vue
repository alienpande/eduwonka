<template>
  <div class="mg-l-20">
    <div class="heading">
      <span class="mg-l-25">Vendor Detail</span>
    </div>
    <el-card shadow="none">
      <el-row>
        <el-col :span="23">
          <!-- <el-select v-model="vendor" placeholder="Enter Vendor Name" @change="updateValues" >
            <el-option v-for="item in userData" :key="item.id" :label="item.first_name" :value="item.id" />
          </el-select> -->
          <e-input v-model="user.first_name" type="text" label="Vendor Name" placeholder="Enter Vendor Name"></e-input>
        </el-col>
        <br /><br /><br /><br />
        <el-col :span="11">
          <e-input v-model="user.vendor_info.contact_person" type="text" label="Contact person" placeholder="Enter Contact Person"></e-input>
        </el-col>
        <el-col :offset="1" :span="11">
          <e-input v-model="user.vendor_info.contact_person_number" type="number" label="Phone Number" placeholder="Enter Phone Number"></e-input>
        </el-col>
        <el-col :span="11">
          <e-input v-model="user.vendor_info.gst_number" type="text" label="GST Number" placeholder="Enter GST Number"></e-input>
        </el-col>
        <el-col :offset="1" :span="11">
          <e-input v-model="user.vendor_info.tin_number" type="text" label="Tin Number" placeholder="Enter TIN Number"></e-input>
        </el-col>
        <el-col :span="23">
          <div class="color: #000000CC;font-size:16px;padding:10px 0">
            Address
          </div>
          <textarea v-model="user.address" class="details-expenses__textarea" placeholder="LoreIpsum, sector 14, 131001, Sonipat,Harayana" rows="5" cols="128" />
        </el-col>
      </el-row>
      <br />
    </el-card>
    <div class="heading">
      <span class="mg-l-25">Bank Details</span>
    </div>
    <el-card shadow="none">
      <el-row>
        <el-col :span="11">
          <e-input v-model="user.vendor_info.bank_details.account_no" type="text"  label="Account Number"></e-input>
        </el-col>
        <el-col :span="11" :offset="1">
          <e-input v-model="user.vendor_info.bank_details.ifsc_code" type="text"  label="IFSC Code"></e-input>
        </el-col>
        <el-col :span="11">
          <e-input v-model="user.vendor_info.bank_details.bank_name" type="text"  label="Bank Name" placeholder="Enter Bank Name"></e-input>
        </el-col>
        <el-col :span="11" :offset="1">
          <e-input v-model="user.vendor_info.bank_details.account_holder" type="text"  label="Account Holder Name" placeholder="0121-288128" ></e-input>
        </el-col>
      </el-row>
    </el-card>
    <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px">
      <el-col style="float: right" :span="3" :offset="6">
        <e-button :span="3" label="Save and Proceed" width="180" @click="save()" css="float-right" class="p-45" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { dispatchGraphql } from '@/api/dispatcher'
export default {
  props: {
    user: {
      type: Object,
      default: () => ({})
    },
  },
  data() {
    return {
      userMutation: `mutation($id: uuid!, $changes: users_set_input) {
        update_users_by_pk(pk_columns: {id: $id}, _set: $changes) {
          id
        }
      }`,
      vendorMutation: `mutation($id: uuid!, $changes: vendor_informations_set_input) {
        update_vendor_informations_by_pk(pk_columns: {id: $id}, _set: $changes) {
          id
        }
      }`,
      bankMutation: `mutation($id: uuid!, $changes: bank_details_set_input) {
        update_bank_details_by_pk(pk_columns: {id: $id}, _set: $changes) {
          id
        }
      }`
    }
  },
  created() {},
  methods: {
    getUserVariables() {
      var user = this.user
      delete user.vendor_info
      return {
        'id': user.id,
        'changes': user
      }
    },
    getVendorVariables() {
      var vendor = this.user.vendor_info
      delete vendor.bank_details
      return {
        'id': vendor.id,
        'changes': vendor
      }
    },
    getBankVariables() {
      var bankDetails = this.user.vendor_info.bank_details
      return {
        'id': bankDetails.id,
        'object': bankDetails
      }
    },
    save() {
      console.log(this.user, 'user')
      dispatchGraphql(this.userMutation, this.getUserVariables()).then((response) => {
        console.log(response)
        dispatchGraphql(this.vendorMutation, this.getVendorVariables()).then((response) => {
          console.log(response)
          dispatchGraphql(this.bankMutation, this.getBankVariables()).then((response) => {
            console.log(response)
            this.$emit('save')
          })
        })
      })
    }
  }
}

</script>

<style>
.details-expenses__textarea {
  box-shadow: 0px 1px 3px #11111112;
  border: 1px solid #cccccc;
  border-radius: 4px;
  padding: 10px;
}
</style>
