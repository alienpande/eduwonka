<template>
  <div class="about">
    <e-container class="finance-invoices">
      <el-tabs class="floatTabHeader" v-model="activeName">
        <el-tab-pane label="Inprocess" name="Pending">
          <div class="sub-headers">
          </div>
          <el-row class="finance-invoice " :gutter="20" style="padding: 15px 0px 10px 0px;margin: 0px 0px 5px 0px;background: white;height: 80px;display:flex;align-items:center;">
            <el-col :span="window.width > 767 ? 5 : 8" style="padding-left: 25px" class="dropdown-tab">
              <!-- <e-dropdown :list="filter2" primary -->
              <el-dropdown @command="handleStatus">
                <span class="el-dropdown-link primary-text text" primary>
                  Status<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" >
                  <el-dropdown-item v-for="item in statusOptions" :key="item.value" :command="item.value">{{ item.label }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
            <el-col :span="window.width > 767 ? 3 : 8" class="primary-text">
              <div class="text" @click="getUser()">Clear filter</div>
            </el-col>
            <el-col style="padding-left: 10px" :span="window.width > 767 ? 1 : 8">
              <e-button icon="el-icon-search" :plain="true" css="bg-tranparent"></e-button>
            </el-col>
          </el-row>
          <br />
          <e-table :table="invoices" @pageInfo="ptest">
            <el-table-column label="Invoice number" prop="invoice_number" width="250" />
            <el-table-column label="Vendor" width="300">
              <template slot-scope="scope">
                {{ scope.row.vendor_information.user.first_name }}
              </template>
            </el-table-column>
            <el-table-column label="Due date" width="300">
              <template slot-scope="scope">
                <span>{{ getDate(scope.row.due_date) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Amount(INR)" prop="total_amount" width="300"></el-table-column>
            <el-table-column label="Status" prop="status" width="250"> 
              <template slot-scope="scope">
                <div style="color: #0BC32E !important;" v-if="scope.row.status=='Approved'">Approved</div>
                <div style="color: #E60000;" v-if="scope.row.status==='Rejected'"> Rejected</div>
                <div style="color: #FFA700;" v-if="scope.row.status==='pending'"> Pending</div>
              </template>
            </el-table-column>
            <el-table-column label="Action" width="200">
              <template slot-scope="scope">
                <img src="@/assets/images/download-action-icon.png" alt="" />
                <img @click="$router.push($url.FI_INVOICE_VIEW + '/' + scope.row.id)" src="@/assets/images/3dot-action.png" alt="" style="cursor:pointer" />
              </template>
            </el-table-column>
          </e-table>
          <!-- <expenses-table/> -->
        </el-tab-pane>
        <el-tab-pane label="Paid Invoice" name="Paid"> 
          <div class="sub-headers"> 
          </div>
          <el-row class="finance-invoice" :gutter="20" style="padding: 15px 0px 10px 0px;margin: 0px 0px 5px 0px;background: white;height: 80px;display:flex;align-items:center;">
            
            <el-col style="padding-left: 10px" :span="1" :offset="2">
              <e-button icon="el-icon-search" :plain="true" css="bg-tranparent"></e-button>
            </el-col>
          </el-row>
          <br />
          <e-table :table="invoices" @pageInfo="ptest">
            <el-table-column label="Invoice number" prop="invoice_number" width="250" />
            <el-table-column label="Vendor" width="300">
              <template slot-scope="scope">
                {{ scope.row.vendor_information.user.first_name }}
              </template>
            </el-table-column>
            <el-table-column label="Due date" width="300">
              <template slot-scope="scope">
                <span>{{ getDate(scope.row.due_date) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Amount(INR)" prop="total_amount" width="300" />
            <el-table-column label="Status" prop="status" width="250"> 
              <template slot-scope="scope">
                <div style="color: #0BC32E !important;" v-if="scope.row.status=='Paid'"> Paid</div>
              </template>
            </el-table-column>
            <el-table-column label="Action" width="200">
              <template slot-scope="scope">
                <img src="@/assets/images/download-action-icon.png" alt="" />
                <img @click="$router.push($url.FI_INVOICE_VIEW + '/' + scope.row.id)" src="@/assets/images/3dot-action.png" alt="" />
              </template>
            </el-table-column>
          </e-table>
        </el-tab-pane>
      </el-tabs>
      <pagination :total="total" @pagination="pagination" />
    </e-container>
  </div>
</template>
<script>
import { dispatchGraphql } from '@/api/dispatcher'
import Pagination from '@/components/Pagination'
import { mapMutations } from "vuex"
import moment from 'moment'
import _ from 'lodash'
import screenSize from '@/mixins/screenSize'
// import expensesTable from "@/components/finance/expenses/expensesTable.vue";
export default {
  components: {
    Pagination
  },
  mixins: [screenSize],
  data: () => ({
    searchBar: false,
    activeName: "Pending",
    statuses: [],
    total: 0,
    offset: 0,
    page: 1,
    limit: 10,
    user: {},
    invoices: [],
    statusOptions: [
      {
        value: "pending",
        label: "Pending"
      },
      {
        value: "Approved",
        label: "Approved"
      },
      {
        value: "Rejected",
        label: "Rejected"
      }
    ],
    query: `query ($limit: Int!, $offset: Int!, $status: [String!], $id: uuid) {
      invoices(limit: $limit, offset: $offset, where: {status: {_in: $status}, _and: {vendor_id: {_eq: $id}}}) {
        id
        issued_date
        paid_amount
        status
        total_amount
        vendor_id
        invoice_number
        due_date
        vendor_information {
          id
          user {
            id
            first_name
          }
        }
      }
      invoices_aggregate(where: {status: {_in: $status}, _and: {vendor_id: {_eq: $id}}}) {
        aggregate {
          count
        }
      }
    }`,
  }),
  mounted() {
    this.hideAsideMenuMobile()
  },
  created() {
    this.getUser()
  },
  watch: {
    activeName: _.debounce(function() {
      if (this.activeName === 'Pending') {
        this.statuses = ['pending', 'Approved', 'Rejected']
        this.getInvoices()
      } else {
        this.statuses = ['Paid']
        this.getInvoices()
      }
    })
  },
  methods: {
    ...mapMutations("Common",["hideAsideMenuMobile"]),
    ptest(d) {
      console.log(d);
    },
    pagination: function(object) {
      this.limit = object.limit
      this.offset = object.limit * (object.page - 1)
      this.getUser()
    },
    getDate(date) {
      return moment(date).format("DD-MM-YYYY")
    },
    handleStatus(value) {
      this.statuses = []
      this.statuses[0] = value
      console.log(this.statuses)
      this.getInvoices()
    },
    getVariables() {
      return {
        'limit': this.limit,
        'offset': this.offset,
        'status': this.statuses,
        'id': this.user.vendor_info.id,
      }
    },
    getInvoices() {
      dispatchGraphql(this.query, this.getVariables()).then((response) => {
        this.invoices = response.invoices
        console.log(this.invoices, 'invoices')
        this.total = response.invoices_aggregate.aggregate.count
      })
    },
    getUser() {
      if (this.activeName === 'Pending') {
        this.statuses = ['pending', 'Rejected', 'Approved']
      }
      const query = `query {
        users_by_pk(id: "${this.$route.params.id}") {
          id
          first_name
          vendor_info {
            id
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.user = response.users_by_pk
        this.getInvoices()
      })
    }
  },
};
</script>
<style>
.data-range__dropdown .el-dropdown .el-dropdown-selfdefine {
  border-radius: 4px;
  color: #ffffff !important;
  background: #bc6c42 !important;

  padding: 9px 16px;
}
.data-range__dropdown .el-dropdown .el-dropdown-selfdefine .el-icon--right {
  transform: rotate(180deg);
}
.search-bar {
  position: relative;
  margin-top: 5px;
  margin-left: 20px;
}
.search-bar input {
  color: #bc6c4299;
  height: 21px;
  padding: 5px 0 5px 28px;
  border: 0;
  border-bottom: 1px solid;
  font-size: 15px;
  width: 32rem;
}
.search-bar input::placeholder {
  color: #bc6c4299;
  font-size: 15px;
}
.search-bar img {
  position: absolute;
  top: 3px;
}
@media only screen and (device-width: 768px) {
  .pagination {
    width: 50%;
    font-size: 12px;
  }
  .dropdown-tab {
    margin-right: 3px;
    font-size: 12px;
  }
  .dropdown-tab .text {
    font-size: 11px;
  }
}
</style>
