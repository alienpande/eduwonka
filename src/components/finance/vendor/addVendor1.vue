<template>
  <div class="mg-l-20">
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
      <div class="heading">
        <span class="mg-l-25">Vendor Detail</span>
      </div>
      <el-card shadow="none" :rules="rules">
        <el-row :gutter="20">
          <el-row :gutter="20">
            <el-col :span="23">
              <e-input v-model="vendor.first_name" type="textarea" label="Vendor Name" placeholder="Enter Vendor Name" rules="required"></e-input>
              <!-- <el-select v-model="vendor" placeholder="Enter Vendor Name" @change="updateValues" rules="required">
                <el-option v-for="item in userData" :key="item.id" :label="item.first_name" :value="item.id" rules="required"/>
              </el-select> -->
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="11">
              <e-input v-model="vendor.contact_person" type="textarea" label="Contact person" placeholder="Enter Contact Person" rules="required"></e-input>
            </el-col>
            <el-col :offset="1" :span="11">
              <e-input v-model="vendor.contact_person_number" type="number"  label="Phone Number" placeholder="Enter Phone Number" rules="required"></e-input>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="11">
              <e-input v-model="vendor.gst_number" type="textarea"  label="GST Number" placeholder="Enter GST Number" rules="required"></e-input>
            </el-col>
            <el-col :offset="1" :span="11">
              <e-input v-model="vendor.tin_number " type="textarea"  label="Tin Number" placeholder="Enter TIN Number" rules="required"></e-input>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <div class="color: #000000CC;font-size:18px;padding:10px 0" rules="required">
                Address
              </div>
              <textarea v-model="vendor.address" class="details-expenses__textarea" placeholder="Enter Address" rows="5" cols="156" rules="required" />
            </el-col>
          </el-row>
        </el-row>
        <br />
      </el-card>
      <div class="heading">
        <span class="mg-l-25">Details</span>
      </div>
      <el-card shadow="none">
        <el-row>
          <el-col :span="11">
            <e-input v-model="bankDetails.account_no " type="textarea" label="Account Number" placeholder="Enter Account Number" rules="required"></e-input>
          </el-col>
          <el-col :span="11" :offset="1">
            <e-input v-model="bankDetails.ifsc_code " type="textarea"  label="IFSC Code" placeholder="Enter IFSC Code" rules="required"></e-input>
          </el-col>
          <el-col :span="11">
            <e-input v-model="bankDetails.bank_name " type="textarea"  label="Bank Name" placeholder="Enter Bank Name" rules="required"></e-input>
          </el-col>
          <el-col :span="11" :offset="1">
            <e-input v-model="bankDetails.account_holder " type="textarea"  label="Account Holder Name" placeholder="Enter Name" rules="required"></e-input>
          </el-col>
        </el-row>
      </el-card>
      <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px">
        <el-col style="float: right" :span="3" :offset="6">
          <e-button :span="3" label="Next" width="180" @click="handleSubmit(onSubmit())" css="float-right" class="p-45" />
        </el-col>
      </el-row>
    </ValidationObserver>
  </div>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher"
import moment from 'moment'
import { getId } from "@/util/auth"
export default {
  data() {
    return {
      rules: {},
      user: {},
      vendor: {},
      bankDetails: {},
      userMutation: `mutation($object: users_insert_input!) {
        insert_users_one(object: $object) {
          id
        }
      }`,
      vendorMutation: `mutation($object: vendor_informations_insert_input!) {
        insert_vendor_informations_one(object: $object) {
          id
        }
      }`,
      bankMutation: `mutation($object: bank_details_insert_input!) {
        insert_bank_details_one(object: $object) {
          id
          vendor_id
        }
      }`
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    getUserVariables() {
      var user = this.user
      user.first_name = this.vendor.first_name
      user.address = this.vendor.address
      user.role = "Vendor"
      user.created_at = moment().format('')
      user.updated_at = moment().format('')
      return {
        'object': user
      }
    },
    getVendorVariables() {
      var vendor = this.vendor
      vendor.academic_year_id = this.user.default_academic_year_id
      delete vendor.address
      delete vendor.first_name
      return {
        'object': vendor
      }
    },
    getBankVariables() {
      this.bankDetails.academic_year_id = this.user.default_academic_year_id
      return {
        'object': this.bankDetails
      }
    },
    onSubmit() {
      dispatchGraphql(this.userMutation, this.getUserVariables()).then((response) => {
        console.log(response)
        this.vendor.user_id = response.insert_users_one.id
        dispatchGraphql(this.vendorMutation, this.getVendorVariables()).then((response) => {
          console.log(response)
          this.bankDetails.vendor_id = response.insert_vendor_informations_one.id
          dispatchGraphql(this.bankMutation, this.getBankVariables()).then((response) => {
            console.log(response)
            this.$emit('save', response.insert_bank_details_one.vendor_id)
          })
        })
      })
    },
    getUser() {
      const query = `query {
        users_by_pk(id: "${getId()}") {
          password_digest
          status
          account_id
          account_modules
          default_academic_year_id
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.user = response.users_by_pk
      })
    }
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
</style>
