<template>
  <div>
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <el-card class="mg-l-40 mg-r-40 rounded-08 bg-black-2" :style="'border: none'" shadow="none">
      <el-row>
        <el-col :span="5" :offset="2" class="d-flex">
          <e-svg :style="'padding-top: 10px; padding-right: 15px'" icon="rupee"></e-svg>
          <div>
            <div class="text-gray-6">Total Payable(INR)</div>
            <div class="sub-title">{{ getTotalAmount() }}</div>
          </div>
        </el-col>
        <el-col :span="5" class="d-flex">
          <e-svg :style="'padding-top: 10px; padding-right: 15px'" icon="rupee"></e-svg>
          <div>
            <div class="text-gray-6">Total Paid(INR)</div>
            <div class="sub-title">{{ getPaidAmount() }}</div>
          </div>
        </el-col>
        <el-col :span="5" class="d-flex">
          <e-svg :style="'padding-top: 10px; padding-right: 15px'" icon="rupee"></e-svg>
          <div>
            <div class="text-gray-6">Total Due(INR)</div>
            <div class="sub-title">{{ getTotalAmount() - getPaidAmount() }}</div>
          </div>
        </el-col>
        <el-col :span="5" class="d-flex">
          <e-svg :style="'padding-top: 10px; padding-right: 15px'" icon="rupee"></e-svg>
          <div>
            <div class="text-gray-6">Term Due(INR)</div>
            <div class="sub-title">{{ getTermDue() }}</div>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <br />
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
          <el-col :span="17">
            <el-card class="rounded-08 bg-black-3" :style="'border: none'" shadow="none">
              <el-col :span="4" class="mg-b-20 mg-l-30 d-flex">
                <div>
                  <div class="text-gray-6">Standard</div>
                  <div class="sub-title">{{ student.section.standard.name }}</div>
                </div>
              </el-col>
              <el-col :span="4" class="mg-l-40 d-flex">
                <div>
                  <div class="text-gray-6">Admission Number</div>
                  <div class="sub-title">{{ student.admission_number }}</div>
                </div>
              </el-col>
              <el-col :span="4" class="mg-l-40 d-flex">
                <div>
                  <div class="text-gray-6">Roll Number</div>
                  <div class="sub-title">{{ student.roll_number }}</div>
                </div>
              </el-col>
              <el-col :span="4" class="mg-l-40 d-flex">
                <div>
                  <div class="text-gray-6">Gender</div>
                  <div class="sub-title">{{ student.gender }}</div>
                </div>
              </el-col>
              <el-col :span="4" class="mg-l-40 d-flex">
                <div>
                  <div class="text-gray-6">Age</div>
                  <div class="sub-title">{{ getAge() }} Years</div>
                </div>
              </el-col>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </el-card>
    <br />
    <el-card class="mg-l-40 mg-r-40 rounded-08 bg-black-2" :style="'border: none'" shadow="none" :rules="rules">
      <el-row>
        <el-col :span="20">
          <span class="tx-20 tx-bolder text-white">Fee item Details</span>
        </el-col>
      </el-row>
      <br />
      <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c" :rules="rules">
        <el-row>
          <el-card class="rounded-08 bg-black-3" :style="'border: none'" shadow="none" :rules="rules">
            <el-col :span="4" class="mg-l-30 d-flex" :rules="rules">
              <div :rules="rules">
                <div class="text-gray-6">Receipt Number</div>
                <es-input class="mg-t-6" v-model="feeDetail.receipt_number" placeholder="receipt number" rules="required"/>
              </div>
            </el-col>
            <el-col :span="4" class="mg-l-40 d-flex">
              <div>
                <div class="text-gray-6">Fee Date</div>
                <es-date-picker class="mg-t-6" :span="12" v-model="feeDetail.paid_date" type="date" @change="setPaidDate" format="MM/dd/yyyy" rules="required" />
              </div>
            </el-col>
            <el-col :span="4" class="mg-l-40 d-flex">
              <div>
                <div class="text-gray-6">Due Date</div>
                  <es-date-picker class="mg-t-6" :span="12" v-model="feeDetail.due_date" type="date" @change="setDueDate" format="MM/dd/yyyy" rules="required"/>
              </div>
            </el-col>
            <el-col :span="4" class="mg-l-40 d-flex">
              <div>
                <div class="text-gray-6">Total amount to be paid</div>
                <div class="sub-title mg-t-6">{{ getTotalAmount() - getPaidAmount() }}</div>
              </div>
            </el-col>
          </el-card>
        </el-row>
      </el-card>
    </el-card>
    <br />
    <el-card class="mg-l-40 mg-r-40 rounded-08 bg-black-2" :style="'border: none'" shadow="none">
      <el-row>
        <el-col :span="20">
          <span class="tx-20 tx-bolder text-white">Fee item Details</span>
        </el-col>
      </el-row>
      <br />
      <el-table :data="feeLineItems" custom-class="text-white" :rules="rules">
        <el-table-column label="Line Item" prop="fee_line_item_type" />
        <el-table-column label="Payable Amount">
          <template slot-scope="scope">
            {{ scope.row.amount ? scope.row.amount : 0 }}
          </template>
        </el-table-column>
        <el-table-column label="Due Amount"  prop="default_amount" />
        <el-table-column label="Amount Paid" width="250">
          <template slot-scope="scope">
            <es-input v-model="scope.row.amount" class="mg-t-20" :placeholder="scope.row.paid_amount ? scope.row.paid_amount : 0" />
          </template>
        </el-table-column>
        <el-table-column label="Remaining Due Amount">
          <template slot-scope="scope">
            <span :class="scope.row.default_amount === scope.row.paid_amount ? 'text-green' : 'text-red'">{{ scope.row.default_amount - scope.row.paid_amount }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-row class="mg-t-20">
        <el-col :span="10">
          <span class="tx-20 tx-bolder text-yellow">Total Amount Payable: {{ setAmount() }}</span>
        </el-col>
      </el-row>
      <br /><hr style="opacity: 10%" />
      <el-row :rules="rules">
        <el-col :span="20" :rules="rules">
          <span class="tx-18 tx-bolder text-white">Remarks</span>
          <el-card class="mg-t-10 mg-r-10 rounded-08 bg-black-3" :style="'border: none'" shadow="none" rules="required">
            <es-input v-model="feeDetail.remarks" placeholder="Add Remark" rules="required" />
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <el-row style=" margin-top: 20px; background: #1e1e1e; padding-top: 25px; padding-bottom: 15px;">
      <el-col :span="5" :offset="14">
        <es-button text="Cancel" width="200" />
      </el-col>
      <el-col style="float: right" :span="5">
        <es-button text="Proceed" width="200" @click="handleSubmit(onSubmit)" :plain="true" />
      </el-col>
    </el-row>
    </ValidationObserver>
  </div>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher"
import moment from 'moment'
import { getId } from '@/util/auth'
export default {
  components: {},
  data: () => ({
    rules: {},
    feeLineItems: [],
    student: {},
    feeDetail: {},
    feeDetails: [],
    terms: [],
    feeId: null,
    feeMutation: `mutation($object: fee_details_insert_input!) {
      insert_fee_details_one(object: $object) {
        id
      }
    }`,
    lineResultMutation: `mutation($objects: [student_fee_line_item_results_insert_input!]!) {
      insert_student_fee_line_item_results(objects: $objects) {
        affected_rows
        returning {
          id
        }
      }
    }`,
    lineUpdateMutation: `mutation($id: uuid!, $changes: student_fee_line_items_set_input) {
      update_student_fee_line_items_by_pk(pk_columns: {id: $id}, _set: $changes) {
        id
        paid_amount
      }
    }`
  }),
  created() {
    this.getUser()
    this.getTerms()
  },
  methods: {
    setItemVariables(data) {
      var item = JSON.parse(JSON.stringify(data))
      item.paid_amount = (item.paid_amount ? parseInt(item.paid_amount) : 0) + (item.amount ? parseInt(item.amount) : 0)
      delete item.amount
      console.log('item', item)
      return {
        "id": item.id,
        "changes": item
      }
    },
    setItemResultVariables() {
      var itemResults = JSON.parse(JSON.stringify(this.feeLineItems))
      itemResults.map(x => {
        x.student_fee_line_item_id = x.id,
        x.fee_detail_id = this.feeId
        delete x.paid_amount
        delete x.fee_line_item_type
        delete x.id
        delete x.default_amount
        delete x.student_id
      })
      console.log('results', itemResults)
      return {
        "objects": itemResults
      }
    },
    setFeeVariables(feeData) {
      feeData.amount = this.setAmount()
      feeData.student_id = getId()
      console.log('fee', feeData)
      return {
        "object": feeData
      }
    },
    onSubmit() {
      dispatchGraphql(this.feeMutation, this.setFeeVariables(this.feeDetail)).then((response) => {
        this.feeId = response.insert_fee_details_one.id
        dispatchGraphql(this.lineResultMutation, this.setItemResultVariables()).then((response) => {
          console.log(response)
          for(const item of this.feeLineItems) {
            dispatchGraphql(this.lineUpdateMutation, this.setItemVariables(item)).then((response) => {
              console.log(response)
              this.$emit('save', this.feeId)
            })
          }
        })
      })
    },
    setDueDate(value) {
      this.feeDetail.due_date = value
    },
    setPaidDate(value) {
      this.feeDetail.paid_date = value
    },
    setAmount() {
      let total = 0
      for (const item of this.feeLineItems) {
        total = (item.amount ? parseInt(item.amount) : 0) + total
      }
      return total
    },
    getTermDue() {
      var term = {}
      const currentDate = moment(new Date()).format('yyyy-MM-DD')
      for (const item of this.terms) {
        if (currentDate > moment(item.start_date).format('yyyy-MM-DD') &&  currentDate < moment(item.due_date).format('yyyy-MM-DD')) {
          term = item
        }
      }
      if (term) {
        return ((this.getTotalAmount() * term.percent_of_fees) / 100)
      }
    },
    getPaidAmount() {
      let total = 0
      for (const item of this.student.student_fee_line_items) {
        total = total + item.paid_amount
      }
      return total
    },
    getTotalAmount() {
      let total = 0
      for (const item of this.student.student_fee_line_items) {
        total = total + item.default_amount
      }
      return total
    },
    getAge() {
      var years = moment().diff(this.student.dob, 'years')
      return years
    },
    getUser() {
      const query = `query {
        users_by_pk(id: "${getId()}") {
          id
          first_name
          admission_number
          roll_number
          gender
          dob
          section {
            id
            name
            standard {
              id
              name
            }
          }
          student_fee_line_items {
            id
            student_id
            fee_line_item_type
            default_amount
            paid_amount
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.student = response.users_by_pk
        this.feeLineItems = this.student.student_fee_line_items
      })
    },
    getTerms() {
      const query = `query {
        terms {
          id
          start_date
          percent_of_fees
          due_date
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.terms = response.terms
      })
    }
  },
}
</script>
