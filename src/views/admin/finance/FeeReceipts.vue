<template>
  <div class="about">
    <e-container class="main-body-container finance-fee-receipt" pageTitle="Fee Receipts" btnIcon="el-icon-plus" btnText="Add Fee" @btnClick="$router.push($url.FI_FEE_RECEIPTS_DETAILS)">
      <div class="sub-headers"></div>
      <el-row class="sub-headers-menu" v-if="!searchBar" :gutter="20" style="padding: 15px 0px 10px 0px;margin: 0px 0px 5px 0px;background: white;height: 80px;">
        <el-col :span="5" :offset="1">
          <el-dropdown @command="handlePrice">
            <span class="el-dropdown-link primary-text" primary>
              Sort By Price<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in filter" :key="item.value" :command="item.value">{{ item.text }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col :span="4" style="padding-left: 35px">
          <el-dropdown @command="handleSection">
            <span class="el-dropdown-link primary-text" primary>
              Standard<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(section, i) in sections" :key="i" :command="section.id">{{ (section.standard ? section.standard.name : '') + ' - ' + section.name }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col :span="3" class="primary-text">
          <div @click="getSections()">Clear filter</div>
        </el-col>
        <el-col style="padding-left: 10px" :span="1" :offset="7">
          <e-button @click="searchBar = !searchBar" icon="el-icon-search" :plain="true" css="bg-tranparent" ></e-button>
        </el-col>
      </el-row>

      <div class="card" id="fee-details">
        <receipts-card icons='finance/rupee' v-for="(receipts, i) in receiptscard" :key="i" :title="receipts.title" :count="receipts.count" />
      </div>
      <div class="buttons" style="display: flex; justify-content: flex-end" id="button-container">
        <e-button :span="3" label="Export pdf" css="sort-icon" :plain="true" type="primary" />
        <e-button :span="3" label="Export Excel" css="sort-icon" :plain="true" type="primary" />
      </div>
      <br />
      
      <e-table :table="tableData">
        <el-table-column label="Name" width="300">
          <template slot-scope="scope">
            <e-img-name :src="require('@/assets/images/profile.jpg')" :name="scope.row.student.first_name" />
          </template>
        </el-table-column>
        <el-table-column label="Receipt number" prop="receipt_number" width="250" />
        <el-table-column label="Standard" width="250">
          <template slot-scope="scope">
            {{ scope.row.student.section.standard.name + ' - ' + scope.row.student.section.name }}
          </template>
        </el-table-column>
        <el-table-column style="width: 11rem" label="Due Amount(INR)" prop="amount" width="200" />
        <el-table-column label="Creation Date" width="300">
          <template slot-scope="scope">
            {{ getDate(scope.row.created_at) }}
          </template>
        </el-table-column>
        <el-table-column label="Action" width="200">
          <template slot-scope="scope">
            <img @click="handleEdit(scope.$index, scope.row)" src="@/assets/images/download-action-icon.png" alt="" />
            <img @click="$router.push($url.FI_FEE_VIEW + '/'+ scope.row.id)"  src="@/assets/images/3dot-action.png" alt="" style="cursor:pointer" />
          </template>
        </el-table-column>
      </e-table>
      <pagination :total="total" @pagination="pagination" />
    </e-container>
  </div>
</template>
<script>
import receiptsCard from "@/components/finance/receiptsCard.vue";
import { dispatchGraphql } from "@/api/dispatcher";
import Pagination from '@/components/Pagination'
import moment from 'moment'
export default {
  components: { receiptsCard, Pagination },
  data: () => ({
    searchBar: false,
    total: 0,
    offset: 0,
    page: 1,
    limit: 10,
    tableData: [],
    users: [],
    priceFilter: 'asc',
    filter: [
      { text: "Low To High Price", value: "asc" },
      { text: "High To Low price", value: "desc" },
    ],
    sections: [],
    sectionIds: [],
    receiptscard: [
      {
        title: "Total Payable (INR)",
        count: "0",
      },
      {
        title: "Total Paid (INR)",
        count: "0",
      },
      {
        title: "Total Due (INR)",
        count: "0",
      },
    ],
    Ids: [],
    feeDetails: [],
    feeDetailIds: [],
    studensFee: {},
  }),
  created() {
    this.getSections()
    this.getLineItems()
  },
  methods: {
    setAmounts() {
      let payable = 0
      let paid = 0
      let due = 0
      for (const user of this.users) {
        for (const item of user.student_fee_line_items) {
          payable += item.default_amount
          paid += item.paid_amount
        }
      }
      due = payable - paid
      this.receiptscard[0].count = payable
      this.receiptscard[1].count = paid
      this.receiptscard[2].count = due
    },
    ptest(d) {
      console.log(d);
    },
    getDate(date) {
      return moment(date).format('DD MMM YYYY')
    },
    getSections() {
      const query = `query {
        sections {
          id
          name
          standard {
            id
            name
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.sections = response.sections
        this.sectionIds = this.sections.map(x => x.id)
        this.getFeeDetails()
      })
    },
    pagination: function(object) {
      this.limit = object.limit
      this.offset = object.limit * (object.page - 1)
      this.getFeeDetails()
    },
    getvariables() {
      return {
        'limit': this.limit,
        'offset': this.offset,
        "amount": this.priceFilter,
        "ids": this.sectionIds
      }
    },
    getFeeDetails() {
      const query = `query ($amount: order_by, $limit: Int!, $offset: Int!, $ids: [uuid!]) {
        fee_details(limit: $limit, offset: $offset, order_by: {amount: $amount}, where: {student: {section_id: {_in: $ids}}}) {
          id
          amount
          receipt_number
          created_at
          student {
            id
            first_name
            section_id
            section {
              id
              name
              standard {
                id
                name
              }
            }
          }
        }
        fee_details_aggregate(order_by: {amount: $amount}, where: {student: {section_id: {_in: $ids}}}) {
          aggregate {
            count
          } 
        } 
      }`
      dispatchGraphql(query, this.getvariables()).then((response) => {
        this.tableData = response.fee_details
        this.total = response.fee_details_aggregate.aggregate.count
      })
    },
    getLineItems() {
      const query =`query {
        users(where: {role: {_eq: "student"}}) {
          id
          section_id
          student_fee_line_items {
            id
            paid_amount
            default_amount
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        const users = response.users.filter(x => (x.section_id != null || x.section_id != ''))
        this.users = users.filter(x => x.student_fee_line_items.length > 0)
        this.setAmounts()
      })
    },
    handleSection(value) {
      this.sectionIds = []
      this.sectionIds.push(value)
      this.getFeeDetails()
    },
    handlePrice(value) {
      this.priceFilter = value
      this.getFeeDetails()
    }
  },
};
</script>
<style>
.sort-icon {
  background: transparent !important;
}
.sort-icon:hover {
  background: #bc6c42 !important;
}
.card {
  margin: 10px 5px;
  display: flex; 
  justify-content: space-between;
}
@media only screen and (device-width: 768px) {
  .card {
    flex-direction: row;
    margin-left: -87px;
    justify-content: space-between;
  }
  .buttons {
    margin-left: -400px;
  }
}
</style>
