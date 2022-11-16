<template>
  <div class="about">
    <e-container class="finance-invoices" pageTitle="Invoice" btnIcon="el-icon-plus" btnText="Add Invoice" @btnClick="$router.push($url.FI_INVOICE_ADD)">
      <el-tabs class="floatTabHeader" v-model="activeName">
        <el-tab-pane label="Inprocess" name="Pending">
          <div class="sub-headers">
          </div>
          <el-row class="finance-invoice " :gutter="20" style="padding: 15px 0px 10px 0px;margin: 0px 0px 5px 0px;background: white;height: 80px;display:flex;align-items:center;">
            <el-col :span="5" class="dropdown-tab" style="padding-left: 15px">
              <!-- <e-dropdown :list="filter" primary /> -->
              <el-dropdown @command="handleVendor">
                <span class="el-dropdown-link primary-text text" primary>
                  Vendor<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="user in users" :key="user.id" :command="user.vendor_info.id">{{ user.first_name }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
            
            <el-col :span="5" style="padding-left: 25px" class="dropdown-tab">
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
            <el-col :span="3" class="primary-text">
              <div class="text" @click="getusers()">Clear filter</div>
            </el-col>
            <el-col style="padding-left: 10px" :span="1">
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
            <el-col :span="5" class="dropdown-tab" style="padding-left: 15px">
              <!-- <e-dropdown :list="filter" primary /> -->
              <el-dropdown @command="handleVendor">
                <span class="el-dropdown-link primary-text text" primary>
                  Vendor<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="user in users" :key="user.id" :command="user.vendor_info.id">{{ user.first_name }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
            
            <el-col :span="3" class="primary-text">
              <div class="text" @click="getusers()">Clear filter</div>
            </el-col>
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
// import expensesTable from "@/components/finance/expenses/expensesTable.vue";
export default {
  components: {
    Pagination
  },
  data: () => ({
    searchBar: false,
    activeName: "Pending",
    statuses: [],
    total: 0,
    offset: 0,
    page: 1,
    limit: 10,
    invoices: [],
    users: [],
    userIds: [],
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
    usersQuery: `query {
      users(where: {role: {_eq: "Vendor"}}) {
        id
        first_name
        vendor_info {
          id
        }
      }
    }`,
    query: `query ($limit: Int!, $offset: Int!, $status: [String!], $ids: [uuid!]) {
      invoices(limit: $limit, offset: $offset, where: {status: {_in: $status}, _and: {vendor_id: {_in: $ids}}}) {
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
      invoices_aggregate(where: {status: {_in: $status}, _and: {vendor_id: {_in: $ids}}}) {
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
    this.getUsers()
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
      this.getusers()
    },
    getDate(date) {
      return moment(date).format("DD-MM-YYYY")
    },
    handleVendor(value) {
      this.userIds = []
      this.userIds[0] = value
      this.getInvoices()
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
        'ids': this.userIds,
      }
    },
    getInvoices() {
      dispatchGraphql(this.query, this.getVariables()).then((response) => {
        this.invoices = response.invoices
        console.log(this.invoices, 'invoices')
        this.total = response.invoices_aggregate.aggregate.count
      })
    },
    getUsers() {
      if (this.activeName === 'Pending') {
        this.statuses = ['pending', 'Rejected', 'Approved']
      }
      dispatchGraphql(this.usersQuery).then((response) => {
        this.users = response.users
        console.log(this.users, 'users')
        this.userIds = this.users.map(x => x.vendor_info.id)
        console.log(this.userIds, 'userIds')
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
