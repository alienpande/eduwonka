<template>
  <div>
    <el-card class="mg-l-40 mg-r-40 rounded-08 bg-black-2" :style="'border: none'" shadow="none">
      <el-row>
        <el-col :span="20">
          <span class="tx-20 tx-bolder text-white">Student Details</span>
        </el-col>
      </el-row>
      <br />
      <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
        <el-row>
          <el-col :span="6" class="mg-l-20 mg-t-20 d-flex">
            <el-avatar :size="50" :src="require('@/assets/images/profile.jpg')" />
            <div class="mg-l-20">
              <div class="text-gray-6">Name</div>
              <div class="sub-title">{{ student.first_name }}</div>
            </div>
          </el-col>
          <el-col :span="5" class="d-flex">
            <el-card class="rounded-08 bg-black-3" :style="'border: none'" shadow="none">
              <el-col :span="24" class="mg-b-20 mg-l-30 d-flex">
                <e-svg :style="'padding-top: 10px; padding-right: 15px'" icon="rupee"></e-svg>
                <div>
                  <div class="text-gray-6">AMount Payable</div>
                  <div class="sub-title">51,200</div>
                </div>
              </el-col>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="rounded-08 bg-black-3" :style="'border: none'" shadow="none">
              <el-col :span="7" class="mg-b-20 mg-l-50 d-flex">
                <div>
                  <div class="text-gray-6">Standard</div>
                  <div class="sub-title">{{ student.section.standard.name }}</div>
                </div>
              </el-col>
              <el-col :span="7" class="mg-l-40 d-flex">
                <div>
                  <div class="text-gray-6">Admission Number</div>
                  <div class="sub-title">{{ student.admission_number }}</div>
                </div>
              </el-col>
              <el-col :span="6" class="mg-l-40 d-flex">
                <div>
                  <div class="text-gray-6">Roll Number</div>
                  <div class="sub-title">{{ student.roll_number }}</div>
                </div>
              </el-col>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </el-card>
    <br />
    <el-form :model="student">
      <el-card class="mg-l-40 mg-r-40 rounded-08 bg-black-2" :style="'border: none'" shadow="none">
        <el-row>
          <el-col :span="20">
            <span class="tx-20 tx-bolder text-white">Payment Details</span>
          </el-col>
        </el-row>
        <br />
        <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
          <el-col :span="11" :offset="1">
            <h5 class="text-white">Pincode</h5>
            <el-form-item prop="pincode">
              <es-input v-model="student.postal" placeholder="Enter a Pincode" readonly />
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <h5 class="text-white">Mobile Number</h5>
            <el-form-item prop="mobile">
              <es-input v-model="student.mobile_number" placeholder="Enter Mobile Number" readonly />
            </el-form-item>
          </el-col>
          <el-col :span="23" :offset="1">
            <h5 class="text-white">Area/Street</h5>
            <el-form-item prop="address">
              <es-input v-model="student.address" placeholder="Enter Address" readonly />
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <h5 class="text-white">City</h5>
            <el-form-item prop="city">
              <es-input v-model="student.city" placeholder="Enter City" readonly />
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <h5 class="text-white">State</h5>
            <el-form-item prop="state">
              <es-input v-model="student.state" placeholder="Enter State" readonly/>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <h5 class="text-white">Email Address</h5>
            <el-form-item prop="email">
              <es-input v-model="student.email" placeholder="Enter Email Address" readonly />
            </el-form-item>
          </el-col>
        </el-card>
      </el-card>
      <br />
      <el-card class="mg-l-40 mg-r-40 rounded-08 bg-black-2" :style="'border: none'" shadow="none">
        <el-row>
          <el-col :span="20">
            <span class="tx-20 tx-bolder text-white">Choose one of the below options to pay</span>
          </el-col>
        </el-row>
        <br />
        <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
          <el-col :span="20" :offset="2">
            <el-form-item prop="pay_type">
              <el-radio-group style="background-color: #353535" v-model="payment">
                <el-radio-button label="Credit/Debit Card"></el-radio-button>
                <el-radio-button label="Netbanking"></el-radio-button>
                <el-radio-button label="UPI Applications"></el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-card>
      </el-card>
    </el-form>
    <el-row style=" margin-top: 20px; background: #1e1e1e; padding-top: 25px; padding-bottom: 15px;">
      <el-col :span="5" :offset="14">
        <es-button text="Cancel" width="200" @click="back" />
      </el-col>
      <el-col style="float: right" :span="5">
        <es-button text="Pay Fee" width="200" @click="payFee()" :plain="true"  ></es-button>
      </el-col>
    </el-row>
    <el-dialog title="Select UPI Application" :visible.sync="upiDialog" width="45%" custom-class="custom-dialog">
      <hr style="opacity: 10%" /><br />
      <el-row class="text-center" :gutter="20">
        <el-col :span="4" class="mg-l-20">
          <div class="pointer" @click="selectedUpi('Phone Pe UPI')">
            <el-avatar :size="70" :src="require('@/assets/images/profile.jpg')" />
            <div class="text-gray-6">Phone Pe</div>
          </div>
        </el-col>
        <el-col :span="4" class="mg-l-20">
          <div class="pointer" @click="selectedUpi('Google Pay UPI')">
            <el-avatar :size="70" :src="require('@/assets/images/profile.jpg')" />
            <div class="text-gray-6">Google Pay</div>
          </div>
        </el-col>
        <el-col :span="4" class="mg-l-20">
          <div class="pointer" @click="selectedUpi('BHIM UPI')">
            <el-avatar :size="70" :src="require('@/assets/images/profile.jpg')" />
            <div class="text-gray-6">BHIM</div>
          </div>
        </el-col>
        <el-col :span="4" class="mg-l-20">
          <div class="pointer" @click="selectedUpi('Amazon Pay UPI')">
            <el-avatar :size="70" :src="require('@/assets/images/profile.jpg')" />
            <div class="text-gray-6">Amazon Pay</div>
          </div>  
        </el-col>
        <el-col :span="4" class="mg-l-20">
          <div class="pointer" @click="selectedUpi('payTM UPI')">
            <el-avatar :size="70" :src="require('@/assets/images/profile.jpg')" />
            <div class="text-gray-6">payTM</div>
          </div>
        </el-col>
      </el-row><br /><br />
      <h5 class="text-white" style="margin-left: 35%">{{ upi ? paymentDetails.upi_name : 'UPI' }} ID</h5>
      <el-row class="mg-l-100 text-center">
        <el-col :span="13">
          <es-input v-model="paymentDetails.upi_id" placeholder="Type here ..." />
        </el-col>
        <el-col :span="7">
          <es-select />
        </el-col>
      </el-row>
      <hr style="opacity: 10%" />
      <el-row class="text-center">
        <es-button text="PAY" @click="onPayment" :plain="true" />
      </el-row>
    </el-dialog>
    <el-dialog title="Net Banking" :visible.sync="netBanking" width="45%" custom-class="custom-dialog">
      <hr style="opacity: 10%" /><br />
      <el-row class="text-center" :gutter="20">
        <el-col :span="4" class="mg-l-20">
          <div class="pointer">
            <el-avatar :size="70" :src="require('@/assets/images/profile.jpg')" />
            <div class="text-gray-6">SBI</div>
          </div>
        </el-col>
        <el-col :span="4" class="mg-l-20">
          <div class="pointer">
            <el-avatar :size="70" :src="require('@/assets/images/profile.jpg')" />
            <div class="text-gray-6">HDFC</div>
          </div>
        </el-col>
        <el-col :span="4" class="mg-l-20">
          <div class="pointer">
            <el-avatar :size="70" :src="require('@/assets/images/profile.jpg')" />
            <div class="text-gray-6">ICICI</div>
          </div>
        </el-col>
        <el-col :span="4" class="mg-l-20">
          <div class="pointer">
            <el-avatar :size="70" :src="require('@/assets/images/profile.jpg')" />
            <div class="text-gray-6">AXIS</div>
          </div>  
        </el-col>
        <el-col :span="4" class="mg-l-20">
          <div class="pointer">
            <el-avatar :size="70" :src="require('@/assets/images/profile.jpg')" />
            <div class="text-gray-6">Canara Bank</div>
          </div>
        </el-col>
      </el-row><br /><br />
      <p class="text-white" style="margin-left: 35%">select some other Bank</p>
      <el-row style="margin-left: 20%" class="text-center">
        <el-col :span="16">
          <es-select />
        </el-col>
      </el-row><br />
      <hr style="opacity: 10%" />
      <el-row class="text-center">
        <es-button text="PAY" @click="onPayment" :plain="true" />
      </el-row>
    </el-dialog>
    <el-dialog title="Debit/Credit Card" :visible.sync="card" width="45%" custom-class="custom-dialog">
      <hr style="opacity: 10%" /><br />
      <el-row class="text-center" :gutter="20">
        <el-form :model="paymentDetails">
          <el-col :span="11" class="mg-l-15">
            <h5 class="text-white">Slect Card Type</h5>
            <el-form-item prop="card_type">
              <es-select v-model="paymentDetails.card_type" />
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <h5 class="text-white">Name on the Card</h5>
            <el-form-item >
              <es-input v-model="paymentDetails.name" placeholder="Enter Name" />
            </el-form-item>
          </el-col>
          <el-col :span="11" class="mg-l-15">
            <h5 class="text-white">Card Number</h5>
            <el-form-item>
              <es-input v-model="paymentDetails.card_number" placeholder="Type 16 digit card Number" />
            </el-form-item>
          </el-col>
          <el-col :span="5" :offset="1">
            <h5 class="text-white">Expiry Date</h5>
            <el-form-item >
              <es-date-picker v-model="paymentDetails.card_expiry" placeholder="Select" @change="changeDate" format="MM/dd/yyyy" />
            </el-form-item>
          </el-col>
          <el-col :span="5" :offset="1">
            <h5 class="text-white">CVV</h5>
            <el-form-item>
              <es-input v-model="paymentDetails.card_cvv" placeholder="Enter CVV" show-password />
            </el-form-item>
          </el-col>
        </el-form>
      </el-row><br /><br />
      <hr style="opacity: 10%" />
      <el-row class="text-center">
        <es-button text="PAY" @click="onPayment" :plain="true" />
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher"
import { getId } from '@/util/auth'
export default {
  components: {},
  props: {
    feeId: {
      type: String
    }
  },
  data: () => ({
    payment: '',
    upiDialog: false,
    upi: false,
    netBanking: false,
    card: false,
    student: {},
    paymentDetails: {},
    mutation: `mutation($object: payments_insert_input!) {
      insert_payments_one(object: $object) {
        id
      }
    }`,
    feeUpdateMutation: `mutation($id: uuid!, $change: String) {
      update_fee_details_by_pk(pk_columns: {id: $id}, _set: {payment_type: $change}) {
        id
      }
    }`
  }),
  created() {
    console.log('id', this.feeId)
    this.getUser()
  },
  methods: {
    getUser() {
      const query = `query {
        users_by_pk(id: "${getId()}") {
          id
          first_name
          admission_number
          roll_number
          email
          mobile_number
          city
          state
          address
          postal
          section {
            id
            standard {
              id
              name
            }
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.student = response.users_by_pk
      })
    },
    setFeeVariables() {
      return {
        "id": this.feeId,
        "change": this.payment
      }
    },
    setPaymentVariables() {
      this.paymentDetails.user_id = getId()
      return {
        "object": this.paymentDetails
      }
    },
    changeDate: function(value) {
      this.paymentDetails.card_expiry = value
    },
    onPayment() {
      dispatchGraphql(this.mutation, this.setPaymentVariables()).then((response) => {
        console.log(response)
        dispatchGraphql(this.feeUpdateMutation, this.setFeeVariables()).then((response) => {
          console.log(response)
          this.$router.push(this.$url.FI_FEE_RECEIPTS)
        })
      })
    },
    back() {
      this.$emit('back')
    },
    payFee() {
      if(this.payment === 'UPI Applications') {
        this.upiDialog = true
      } else if (this.payment === 'Netbanking') {
        this.netBanking = true
      } else if (this.payment === 'Credit/Debit Card') {
        this.card = true
      }
    },
    selectedUpi(val) {
      this.upi = false
      this.paymentDetails.upi_name = val
      this.upi = true
    }
  }
}
</script>
