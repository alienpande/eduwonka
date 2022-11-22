<template>
  <div class="about finance-expense">
    <e-container pageTitle="Expenses" btnIcon="el-icon-plus" btnText="Add Expense" @btnClick="$router.push($url.FI_EXPENSES_ADD + '/' + activeName)">
      <el-tabs class="floatTabHeader" v-model="activeName">
        <el-tab-pane label="Expenditure" name="Expenditure">
          <div class="sub-headers">
          </div>
          <el-row v-if="searchBar" :gutter="20" style="padding: 15px 0px 10px 0px;margin: 0px 0px 5px 0px;background: white;height: 80px;width:100%;">
            <el-col>
              <div style="border: 2px solid #bc6c42;border-radius: 4px;height: 47px;position: relative;">
                <div class="search-bar">
                  <img src="@/assets/images/search-icon.png" alt="" />
                  <input placeholder="search" type="text" />
                </div>
                <button @click="searchBar = !searchBar" style="border: 0;padding: 0;position: absolute;top: 0;right: 0;height: 100%;">
                  <img style="height: 100%" src="@/assets/images/close-search-bar.png" alt="" />
                </button>
              </div>
            </el-col>
          </el-row>

          <el-row class="finance-expenses-menu-wraper" v-if="!searchBar" :gutter="20" style="padding: 15px 0px 10px 0px;margin: 0px 0px 5px 0px;background: white;height: 80px;">
            <el-col :span="window.width > 767 ? 5 : 6" class="dropdown-tab ">
              <!-- <e-dropdown :list="categories" primary /> -->
              <el-dropdown @command="handleCategory">
                <span class="el-dropdown-link" primary>
                  Category<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="item in categories" :key="item.id" :command="item.id">{{ item.name }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
            <!-- <el-col :span="7" :offset="1" class="primary-text data-range__dropdown dropdown-tab">
              <e-dropdown :list="filter2" primary />
            </el-col> -->
            <el-col :span="window.width > 767 ? 5 : 6" class="dropdown-tab ">
              <!-- <e-dropdown :list="filter3" primary /> -->
              <el-dropdown @command="handlePrice">
                <span class="el-dropdown-link text" primary>
                  Sort By Price<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="item in filter3" :key="item.value" :command="item.value">{{ item.text }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
            <el-col :span="window.width > 767 ? 3 : 5" class="primary-text dropdown-tab">
              <div class="text" @click="getCategories()">Clear filter</div>
            </el-col>
            <el-col style="padding-left: 10px" :span="1" :offset="1">
              <e-button @click="searchBar = !searchBar" icon="el-icon-search" :plain="true" css="bg-tranparent" />
            </el-col>
          </el-row>
          <br />
          <e-table :table="expansData" @pageInfo="ptest">
            <el-table-column label="Receipt number" prop="receipt_number" width="250">
            </el-table-column>
            <el-table-column label="Category" prop="category" width="300">
              <template slot-scope="scope">
                {{ setCategories(scope.row.category_id) }}
              </template>
            </el-table-column>
            <el-table-column label="Purchase date" prop="purchased_date" width="300">
            </el-table-column>
            <el-table-column label="Amount(INR)" prop="amount" width="300">
            </el-table-column>
            <el-table-column label="Action" width="200">
              <template slot-scope="scope">
                <img @click="handleEdit(scope.$index, scope.row)" src="@/assets/images/download-action-icon.png" alt="" />
                <img @click="$router.push($url.FI_EXPENSES_DETAILS + '/'+ scope.row.id)" src="@/assets/images/3dot-action.png" alt="" style="cursor: pointer" />
              </template>
            </el-table-column>
          </e-table>
          <!-- <expenses-table/> -->
        </el-tab-pane>
        <el-tab-pane label="Reimbursement" name="Reimbursement"> 
          <div class="sub-headers">
          </div>
          <el-row  v-if="searchBar" :gutter="20" style="padding: 15px 0px 10px 0px;margin: 0px 0px 5px 0px;background: white;height: 80px;width: 81% !important;">
            <el-col>
              <div style="border: 2px solid #bc6c42;border-radius: 4px;height: 47px;position: relative;">
                <div class="search-bar">
                  <img src="@/assets/images/search-icon.png" alt="" />
                  <input placeholder="search" type="text" />
                </div>
                <button @click="searchBar = !searchBar" style="border: 0;padding: 0;position: absolute;top: 0;right: 0;height: 100%;">
                  <img style="height: 100%" src="@/assets/images/close-search-bar.png" alt="" />
                </button>
              </div>
            </el-col>
          </el-row>

          <el-row class="finance-expenses-menu-wraper" v-if="!searchBar" :gutter="20" style="padding: 15px 0px 10px 0px;margin: 0px 0px 5px 0px;background: white;height: 80px;">
            <el-col :span="window.width > 767 ? 5 : 6" class="dropdown-tab">
              <!-- <e-dropdown :list="categories" primary /> -->
              <el-dropdown @command="handleCategory">
                <span class="el-dropdown-link" primary>
                  Category<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="item in categories" :key="item.id" :command="item.id">{{ item.name }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
            <!-- <el-col :span="7" :offset="1" class="primary-text data-range__dropdown dropdown-tab">
              <e-dropdown :list="filter2" primary />
            </el-col> -->
            <el-col :span="window.width > 767 ? 5 : 6" class="dropdown-tab">
              <!-- <e-dropdown :list="filter3" primary /> -->
              <el-dropdown @command="handlePrice">
                <span class="el-dropdown-link text finance-expenses" primary >
                  Sort By Price<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" >
                  <el-dropdown-item v-for="item in filter3" :key="item.value" :command="item.value">{{ item.text }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
            <el-col :span="window.width > 767 ? 3 : 5" class="primary-text dropdown-tab">
              <div class="text" @click="getCategories()">Clear filter</div>
            </el-col>
            <el-col style="padding-left: 10px" :span="1" :offset="1">
              <e-button @click="searchBar = !searchBar" icon="el-icon-search" :plain="true" css="bg-tranparent" />
            </el-col>
          </el-row>
          <br />
          <e-table :table="expansData" @pageInfo="ptest">
            <el-table-column label="Receipt number" prop="receipt_number" width="250" />
            <el-table-column label="Category" prop="category" width="300">
              <template slot-scope="scope">
                {{ setCategories(scope.row.category_id) }}
              </template>
            </el-table-column>
            <el-table-column label="Purchase date" prop="purchased_date" width="300" />
            <el-table-column label="Amount(INR)" prop="amount" width="300" />
            <el-table-column label="Status" prop="status" width="300"> 
              <template slot-scope="scope">
                <div style="color: #0BC32E !important;" v-if="scope.row.status==='Approved'"> Approved</div>
                <div style="color: #E60000;" v-if="scope.row.status==='Rejected'"> Rejected</div>
                <div style="color: #FFA700;" v-if="!scope.row.status"> Pending</div>
                <div style="color: #52575D;" v-if="scope.row.status==='Draft'"> Draft</div>
              </template>
            </el-table-column>
            <el-table-column label="Action" width="200">
              <template slot-scope="scope">
                <img @click="handleEdit(scope.$index, scope.row)" src="@/assets/images/download-action-icon.png" alt="" />
                <img @click="$router.push($url.FI_EXPENSES_DETAILS + '/'+ scope.row.id)" src="@/assets/images/3dot-action.png" alt="" style="cursor: pointer" />
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
// import expensesTable from "@/components/finance/expenses/expensesTable.vue";
import { dispatchGraphql } from '@/api/dispatcher'
import Pagination from '@/components/Pagination'
import _ from 'lodash'
import screenSize from "@/mixins/screenSize"
export default {
  components: { Pagination },
  mixins: [screenSize],
  data: () => ({
    searchBar: false,
    pa:'<div>is it work</div>',
    activeName: "Expenditure",
    filter: [
      { text: "Sort by Price" },
      { text: "Standard 2" },
      { text: "Standard 3" },
    ],
    filter2: [
      { text: "Date Range" },
      { text: "Subject 1" },
      { text: "Subject 2" },
    ],
    priceFilter: 'asc',
    filter3: [
      { text: "Low To High Price", value: "asc" },
      { text: "High To Low price", value: "desc" },
    ],
    expansData:[],
    categories: [],
    categoryIds: [],
    total: 0,
    offset: 0,
    page: 1,
    limit: 10,
    query: `query($price: order_by, $type: String, $ids: [uuid!], $limit: Int!, $offset: Int!) {
      expenses(limit: $limit, offset: $offset, order_by: {amount: $price}, where: {_and: [{expenses_type: {_eq: $type}}, {category_id: {_in: $ids}}]}) {
        id
        category_id
        amount
        payment_type
        receipt_number
        purchased_date
        expenses_type
        status
      }
      expenses_aggregate(order_by: {amount: $price}, where: {_and: [{expenses_type: {_eq: $type}}, {category_id: {_in: $ids}}]}) {
        aggregate {
          count
        } 
      }
    }`,
    catQuery: `query {
      categories {
        id 
        name
      }
    }`
  }),
  created() {
    this.getCategories()
    // this.getData()
  },
  watch: {
    activeName: _.debounce(function() {
      this.getData()
    })
  },
  methods: {
    ptest(d) {
      console.log(d);
    },
    pagination: function(object) {
      this.limit = object.limit
      this.offset = object.limit * (object.page - 1)
      this.getData()
    },
    getVariables() {
      return {
        "limit": this.limit,
        "offset": this.offset,
        "price": this.priceFilter,
        "ids": this.categoryIds,
        "type": this.activeName,
      }
    },
    getCategories() {
      dispatchGraphql(this.catQuery).then((response) => {
        this.categories = response.categories
        this.categoryIds = this.categories.map(x => x.id)
        this.getData()
      })
    },
    getData() {
      dispatchGraphql(this.query, this.getVariables()).then((response) => {
        this.expansData = response.expenses
        this.total = response.expenses_aggregate.aggregate.count
      })
    },
    setCategories: function(catId) {
      const category = this.categories.filter(x => x.id === catId)[0]
      return category.name
    },
    handleCategory(value) {
      this.categoryIds = []
      this.categoryIds[0] = value
      this.getData()
    },
    handlePrice(value) {
      this.priceFilter = value
      this.getData()
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
    font-size: 12px;
  }
}
</style>
