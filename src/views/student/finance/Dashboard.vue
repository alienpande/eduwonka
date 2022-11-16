<template>
<es-container pageTitle="Dashboard" subTitle="Welcome Back!" class="bg-black-5">
  <el-card class="mg-l-40 mg-r-40 rounded-08 bg-black-2" :style="'border: none'" shadow="none">
    <el-row>
      <el-col :span="20">
        <span class="tx-20 tx-bolder text-white">Quick Stats</span>
      </el-col>
    </el-row>
    <br />
    <el-row :gutter="20">
      <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
        <el-row>
          <el-col :span="5" :offset="1" class="pd-25 rounded-08 bg-black-3 d-flex justify-content-center">
            <e-svg :style="'padding-top: 10px; padding-right: 15px'" icon="rupee"></e-svg>
            <div>
              <div class="text-gray-6">Total Payable(INR)</div>
              <div class="sub-title">{{ getTotalAmount() }}</div>
            </div>
          </el-col>
          <el-col :span="5" class="pd-25 mg-l-45 rounded-08 bg-black-3 d-flex justify-content-center">
            <e-svg :style="'padding-top: 10px; padding-right: 15px'" icon="rupee"></e-svg>
            <div>
              <div class="text-gray-6">Total Paid(INR)</div>
              <div class="sub-title">{{ getPaidAmount() }}</div>
            </div>
          </el-col>
          <el-col :span="5" class="pd-25 mg-l-45 rounded-08 bg-black-3 d-flex justify-content-center">
            <e-svg :style="'padding-top: 10px; padding-right: 15px'" icon="rupee"></e-svg>
            <div>
              <div class="text-gray-6">Total Due(INR)</div>
              <div class="sub-title">{{ getTotalAmount() - getPaidAmount() }}</div>
            </div>
          </el-col>
          <el-col :span="5" class="pd-25 mg-l-45 rounded-08 bg-black-3 d-flex justify-content-center">
            <e-svg :style="'padding-top: 10px; padding-right: 15px'" icon="rupee"></e-svg>
            <div>
              <div class="text-gray-6">Term Due(INR)</div>
              <div class="sub-title">{{ getTermDue() }}</div>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
  </el-card>
  <br />
  <el-row>
    <el-col :span="16">
      <el-card class="mg-l-40 mg-r-40 rounded-08 bg-black-2" :style="'border: none'" shadow="none">
        <el-row>
          <el-col :span="16">
            <span class="tx-20 tx-bolder text-white">Leave Approval</span>
          </el-col>
          <el-col :span="5" :offset="3">
            <es-button text="View leave approval list" @click="$router.push($url.HQ_LEAVE_MANAGEMENT_MARK_APPROVAL)" />
          </el-col>
        </el-row>
        <br />
        <el-table :data="student.leaves" custom-class="text-white">
          <el-table-column label="From Date">
            <template slot-scope="scope">
              {{ getDate(scope.row.from_date) }}
            </template>
          </el-table-column>
          <el-table-column label="To Date" prop="to_date">
            <template slot-scope="scope">
              {{ getDate(scope.row.to_date) }}
            </template>
          </el-table-column>
          <el-table-column label="Reason" prop="reasong" />
          <el-table-column label="Status">
            <template slot-scope="scope">
              <div class="pd-5 wd-50p d-flex justify-content-center" :class="getClass(getStatus(scope.row.approvers))">
                <span class="tx-16" :class="getStatusClass(getStatus(scope.row.approvers))">{{ getStatus(scope.row.approvers) }}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card class="mg-l-40 mg-r-40 rounded-08 bg-black-2" :style="'border: none'" shadow="none">
        <el-row>
          <el-col :span="16">
            <span class="tx-20 tx-bolder text-white">Total Leaves</span>
          </el-col>
        </el-row><br />
        <el-row>
          <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
            <div style="display: flex; justify-content: space-between">
              <div class="text-white tx-16">Leave Stats</div>
            </div><br />
            <el-row>
              <el-col :span="12">
                <e-donut-chart :taken="getTakenLeaves(student.leaves)" :remaining="student.available_leaves - getTakenLeaves(student.leaves)" />
              </el-col>
              <el-col :span="10" :offset="2"><br />
                <div class="mg-t-20">
                  <div class="dot-color" style="background: #1492E6; margin-top: 10px"></div>
                  <div class="tx-14 text-white" style="display: inline-block;">
                    <b>{{ getTakenLeaves(student.leaves) }}</b> Leaves Taken
                  </div>
                </div>

                <div class="mg-t-15">
                  <div class="dot-color" style="background: #353535; margin-top: 10px"></div>
                  <div class="text-white tx-14" style="display: inline-block;">
                    <b>{{ student.available_leaves - getTakenLeaves(student.leaves) }}</b> Leaves Remaining
                  </div>
                </div>

                <div class="mg-t-15">
                  <div class="mg-l-30 text-white tx-14" style="display: inline-block;">
                    <b>{{ student.available_leaves }}</b> Total
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-row>
      </el-card>
    </el-col>
  </el-row><br />
  <el-row>
    <el-card class="mg-l-40 mg-r-40 rounded-08 bg-black-2" :style="'border: none'" shadow="none">
      <el-row>
        <el-col :span="16">
          <span class="tx-20 tx-bolder text-white">Recent Enquiries</span>
        </el-col>
        <el-col :span="3" :offset="5">
          <es-button text="View Enquiry list" @click="$router.push($url.HQ_ENQUIRES)" />
        </el-col>
      </el-row>
      <br />
      <el-row>
        <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
          <el-col :span="8" :key="enquiry" v-for="enquiry in student.enquiries">
            <div @click="$router.push($url.HQ_ENQUIRES_PROSPECT_DETAIL + '/' + enquiry.id  )">
            <el-card class="pointer rounded-08 bg-black-3" style="border: none; margin: 10px" shadow="none">
              <div :class="getEnquiryClass(enquiry)" class="rounded-09 pd-5 wd-30p d-flex justify-content-center">
                <div :class="getText(enquiry)" class="f-600 tx-14">
                  {{ enquiry.status }}
                </div>
              </div>
              <div style="margin-top: 10px;padding-top: 10px;" class="f-600 fs-18 text-white">
                {{ enquiry.purpose }}
              </div>
              <el-card class="rounded-09 bg-black-3" style="border: none; margin-top: 24px; margin-bottom: 10px" shadow="none">
                <el-row>
                  <el-col :span="6">
                    <div style="color: #9d9d9d; font-size: 12px">Name</div>
                    <div style="color: #f3f3f3; font-weight: bold" class="mg-t-4">{{ enquiry.student_name }}</div>
                  </el-col>
                  <el-col :span="6" :offset="3">
                    <div style="color: #9d9d9d; font-size: 12px">standard</div>
                    <div style="color: #f3f3f3; font-weight: bold" class="mg-t-4">
                      {{ enquiry.standard.name }}
                    </div>
                  </el-col>
                  <el-col :span="6" :offset="3">
                    <div style="color: #9d9d9d; font-size: 12px">Enquiry Date</div>
                    <div style="color: #f3f3f3; font-weight: bold" class="mg-t-4">{{ enquiry.enquiry_date }}</div>
                  </el-col>
                </el-row>
              </el-card>
              <es-button style="margin-top: 16px" text="Download" icon="downloadYellow"></es-button>
            </el-card>
            </div>
          </el-col>
        </el-card>
      </el-row>
    </el-card>
  </el-row>
</es-container>
</template>
<script>
import EDonutChart from "@/components/student/finance/empolyChart.vue"
import { mapMutations } from "vuex"
import { dispatchGraphql } from "@/api/dispatcher"
import moment from 'moment'
import { getId } from '@/util/auth'
export default {
  components: { EDonutChart },
  data: () => ({
    student: {},
    terms: [],
  }),
  mounted() {
    this.setAsideMenuCollapse(true);
    setTimeout(() => {
      this.setAsideWidth("94px");
    }, 100);
  },
  created() {
//    this.setAsideMenuCollapse(true);
//    this.setAsideWidth("100px");
    this.getTerms()
    this.getUser()
  },
  destroyed() {
    this.setAsideMenuCollapse(false);
  },
  methods: {
    getTakenLeaves(leaves) {
      let count = 0
      if(leaves.length > 0) {
        for (const leave of leaves) {
          if (this.getStatus(leave.approvers) === 'Approved') {
            count ++
          }
        }
      }
      console.log(count)
      return count
    },
    getEnquiryClass(enquiry) {
      return enquiry.status === 'Open' ? 'bg-yellow' : 'bg-green'
    },
    getText(enquiry) {
      return enquiry.status === 'Open' ? 'text-yellow' : 'text-green'
    },
    getClass(val) {
      if (val === 'Pending') {
        return 'bg-yellow'
      } else if (val === 'Rejected') {
        return 'bg-red'
      } else if (val === 'Approved') {
        return 'bg-green'
      }
    },
    getStatusClass(val) {
      if (val === 'Pending') {
        return 'text-yellow'
      } else if (val === 'Rejected') {
        return 'text-red'
      } else if (val === 'Approved') {
        return 'text-green'
      }
    },
    getStatus(approvers) {
      let status = ''
      if (approvers.length > 0) {
        approvers.forEach(x => {
          if (x.status == "approved") {
            status = 'Approved'
          } else if (x.status == "rejected") {
            status = 'Rejected'
          } else if (x.status === 'pending') {
            status = 'Pending'
          }
        })
      }
      return status
    },
    getDate(date) {
      return moment(date).format('DD MMM yyyy')
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
    getUser() {
      const query = `query {
        users_by_pk(id: "${getId()}") {
          id
          first_name
          available_leaves
          student_fee_line_items {
            id
            student_id
            fee_line_item_type
            default_amount
            paid_amount
          }
          leaves(limit: 5) {
            id
            from_date
            to_date
            reasong
            leavable_type
            approvers {
              id
              status
            }
          }
          enquiries(order_by: {enquiry_date: desc}, limit: 3) {
            id
            enquirer_name
            mobile_number
            ref_email
            status
            student_name
            admission_date
            enquiry_date
            purpose
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
    },
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth"]),
    activeTabChange(e) {
      this.activeTab = e;
    },
    scrollTop() {
      this.$nextTick(() => {
        this.$refs.tab2.scrollTop = 0;
      });
    },
  },
};
</script>
<style>
.finance-dash .header {
  background: #fff;
  padding: 40px 56px 50px 56px;
}
.finance-dash > .header > .title {
  font: normal normal 600 24px/35px Poppins;
  color: #000000;
  opacity: 0.8;
}

.finance-dash > .header > .title > span {
  font-size: 13px;
  margin-top: -0.5rem;
  display: block;
  font-weight: 400;
  color: #00000066;
}
.dot-color {
  width: 10px;
  height: 10px;
  margin-right: 10px;
  border-radius: 50%;
  display: inline-block;
  content: "";
}
</style>
