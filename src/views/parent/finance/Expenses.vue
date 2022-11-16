<template>
  <div class="about">
    <e-container
      pageTitle="Expenses"
      btnIcon="el-icon-plus"
      btnText="Add Expense"
      @btnClick="$router.push($url.FI_EXPENSES_ADD)"
    >
      <el-tabs class="floatTabHeader" v-model="activeName">
        <el-tab-pane label="Expenditure" name="active">
          <div class="sub-headers">
            Below is the list of expenditure for this Academic Year
          </div>

          <el-row
            v-if="searchBar"
            :gutter="20"
            style="
              padding: 15px 0px 10px 0px;
              margin: 0px 0px 5px 0px;
              background: white;
              height: 80px;
            "
          >
            <el-col>
              <div
                style="
                  border: 2px solid #bc6c42;
                  border-radius: 4px;
                  height: 47px;
                  position: relative;
                "
              >
                <div class="search-bar">
                  <img src="@/assets/images/search-icon.png" alt="" />
                  <input placeholder="search" type="text" />
                </div>
                <button
                  @click="searchBar = !searchBar"
                  style="
                    border: 0;
                    padding: 0;
                    position: absolute;
                    top: 0;
                    right: 0;
                    height: 100%;
                  "
                >
                  <img
                    style="height: 100%"
                    src="@/assets/images/close-search-bar.png"
                    alt=""
                  />
                </button>
              </div>
            </el-col>
          </el-row>

          <el-row
            v-if="!searchBar"
            :gutter="20"
            style="
              padding: 15px 0px 10px 0px;
              margin: 0px 0px 5px 0px;
              background: white;
              height: 80px;
            "
          >
            <el-col :span="4" style="padding-left: 35px">
              <e-dropdown :list="filter" primary />
            </el-col>
            <el-col
              :span="4"
              style="padding-left: 35px"
              class="primary-text data-range__dropdown"
              ><e-dropdown :list="filter2" primary
            /></el-col>
            <el-col :span="4" style="padding-left: 35px">
              <e-dropdown :list="filter3" primary />
            </el-col>
            <el-col :span="3" class="primary-text">Clear filter</el-col>
            <el-col style="padding-left: 10px" :span="1" :offset="7">
              <e-button
                @click="searchBar = !searchBar"
                icon="el-icon-search"
                :plain="true"
                css="bg-tranparent"
              ></e-button>
            </el-col>
          </el-row>
          <br />
          <e-table :table="tableData" @pageInfo="ptest">
            <el-table-column label="Receipt number" prop="receiptnum">
            </el-table-column>
            <el-table-column label="Category" prop="catagory">
            </el-table-column>
            <el-table-column label="Purchase date" prop="purchaseDAte">
            </el-table-column>
            <el-table-column label="Amount(INR)" prop="amount">
            </el-table-column>
            <el-table-column label="Action">
              <template slot-scope="scope">
                <img
                  @click="handleEdit(scope.$index, scope.row)"
                  src="@/assets/images/download-action-icon.png"
                  alt=""
                />
                <img
                  @click="$router.push($url.FI_EXPENSES_DETAILS)"
                  src="@/assets/images/3dot-action.png"
                  alt=""
                  style="cursor: pointer"
                />
              </template>
            </el-table-column>
          </e-table>
          <!-- <expenses-table/> -->
        </el-tab-pane>
        <el-tab-pane label="Reimbursement" name="inactive"> 

            <div class="sub-headers">
            Below is the list of expenditure for this Academic Year
          </div>

          <el-row
            v-if="searchBar"
            :gutter="20"
            style="
              padding: 15px 0px 10px 0px;
              margin: 0px 0px 5px 0px;
              background: white;
              height: 80px;
            "
          >
            <el-col>
              <div
                style="
                  border: 2px solid #bc6c42;
                  border-radius: 4px;
                  height: 47px;
                  position: relative;
                "
              >
                <div class="search-bar">
                  <img src="@/assets/images/search-icon.png" alt="" />
                  <input placeholder="search" type="text" />
                </div>
                <button
                  @click="searchBar = !searchBar"
                  style="
                    border: 0;
                    padding: 0;
                    position: absolute;
                    top: 0;
                    right: 0;
                    height: 100%;
                  "
                >
                  <img
                    style="height: 100%"
                    src="@/assets/images/close-search-bar.png"
                    alt=""
                  />
                </button>
              </div>
            </el-col>
          </el-row>

          <el-row
            v-if="!searchBar"
            :gutter="20"
            style="
              padding: 15px 0px 10px 0px;
              margin: 0px 0px 5px 0px;
              background: white;
              height: 80px;
            "
          >
            <el-col :span="4" style="padding-left: 35px">
              <e-dropdown :list="filter" primary />
            </el-col>
            <el-col
              :span="4"
              style="padding-left: 35px"
              class="primary-text data-range__dropdown"
              ><e-dropdown :list="filter2" primary
            /></el-col>
            <el-col :span="4" style="padding-left: 35px">
              <e-dropdown :list="filter3" primary />
            </el-col>
            <el-col :span="3" class="primary-text">Clear filter</el-col>
            <el-col style="padding-left: 10px" :span="1" :offset="7">
              <e-button
                @click="searchBar = !searchBar"
                icon="el-icon-search"
                :plain="true"
                css="bg-tranparent"
              ></e-button>
            </el-col>
          </el-row>
          <br />
          <e-table :table="tableData" @pageInfo="ptest">
            <el-table-column label="Receipt number" prop="receiptnum">
            </el-table-column>
            <el-table-column label="Category" prop="catagory">
            </el-table-column>
            <el-table-column label="Purchase date" prop="purchaseDAte">
            </el-table-column>
            <el-table-column label="Amount(INR)" prop="amount">
            </el-table-column>
                <el-table-column label="Status" prop="status"> 
               <template slot-scope="scope">
                 <div style="color: #0BC32E !important;" v-if="scope.row.status==='Approved'"> Approved</div>
                 <div style="color: #E60000;" v-if="scope.row.status==='Rejected'"> Rejected</div>
                 <div style="color: #FFA700;" v-if="scope.row.status==='Pending'"> Pending</div>
                 <div style="color: #52575D;" v-if="scope.row.status==='Draft'"> Draft</div>
               </template>
               </el-table-column>
            <el-table-column label="Action">
              <template slot-scope="scope">
                <img
                  @click="handleEdit(scope.$index, scope.row)"
                  src="@/assets/images/download-action-icon.png"
                  alt=""
                />
                <img
                  @click="$router.push($url.FI_EXPENSES_DETAILS)"
                  src="@/assets/images/3dot-action.png"
                  alt=""
                  style="cursor: pointer"
                />
              </template>
            </el-table-column>
          </e-table>
        </el-tab-pane>
      </el-tabs>
    </e-container>
  
  </div>
</template>
<script>
// import expensesTable from "@/components/finance/expenses/expensesTable.vue";
export default {
  components: {},
  data: () => ({
    searchBar: false,
    pa:'<div>is it work</div>',
    activeName: "active",
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
    filter3: [
      { text: "Category" },
      { text: "Subject 1" },
      { text: "Subject 2" },
    ],
    tableData: [
      {
        receiptnum: "34756",
        catagory: "Lorem",
        purchaseDAte: "01-02-2020",
        amount: "34756",
        status:'Approved'
      },

      {
        receiptnum: "34756",
        catagory: "Lorem",
        purchaseDAte: "01-02-2020",
        amount: "34756",
        status:'Rejected'
      },
      {
        receiptnum: "34756",
        catagory: "Lorem",
        purchaseDAte: "01-02-2020",
        amount: "34756",
        status:'Pending'
      },
      {
        receiptnum: "34756",
        catagory: "Lorem",
        purchaseDAte: "01-02-2020",
        amount: "34756",
        status:'Draft'
      },
      {
        receiptnum: "34756",
        catagory: "Lorem",
        purchaseDAte: "01-02-2020",
        amount: "34756",
        status:'Approved'
      },

      {
        receiptnum: "34756",
        catagory: "Lorem",
        purchaseDAte: "01-02-2020",
        amount: "34756",
        status:'Rejected'
      },
      {
        receiptnum: "34756",
        catagory: "Lorem",
        purchaseDAte: "01-02-2020",
        amount: "34756",
        status:'Pending'
      },
      {
        receiptnum: "34756",
        catagory: "Lorem",
        purchaseDAte: "01-02-2020",
        amount: "34756",
        status:'Draft'
      },
    ],
  }),
  methods: {
    ptest(d) {
      console.log(d);
    },
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
</style>
