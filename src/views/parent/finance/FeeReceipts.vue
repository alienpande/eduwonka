<template>
  <div class="about">
    <e-container
      pageTitle="Fee Receipts"
      btnIcon="el-icon-plus"
      btnText="Add Fee"
      @btnClick="$router.push($url.FI_FEE_RECEIPTS_ADD)"
    >
      <div class="sub-headers">Below is the list of people who paid fees</div>
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
        <el-col :span="5" style="padding-left: 35px">
          <e-dropdown :list="filter" primary />
        </el-col>
        <el-col :span="4" style="padding-left: 35px" class="primary-text"
          ><e-dropdown :list="filter2" primary
        /></el-col>

        <el-col :span="4" style="padding-left: 35px">
          <e-dropdown :list="filter3" primary />
        </el-col>
        <el-col :span="4" style="padding-left: 35px">
          <e-dropdown :list="filter3" primary />
        </el-col>
        <el-col :span="3" class="primary-text">Clear filter</el-col>
        <el-col style="padding-left: 10px" :span="1" :offset="2">
          <e-button
            @click="searchBar = !searchBar"
            icon="el-icon-search"
            :plain="true"
            css="bg-tranparent"
          ></e-button>
        </el-col>
      </el-row>

      <div
        style="display: flex; justify-content: space-between; margin: 20px 0"
      >
        <receipts-card
        icons='finance/rupee'
          v-for="(receipts, i) in receiptscard"
          :key="i"
          :title="receipts.title"
          :count="receipts.count"
        />
      </div>
      <div style="display: flex; justify-content: flex-end">
        <e-button
          :span="3"
          label="Export pdf"
          css="sort-icon"
          :plain="true"
          type="primary"
        ></e-button>
        <e-button
          :span="3"
          label="Export Excel"
          css="sort-icon"
          :plain="true"
          type="primary"
        ></e-button>
      </div>
      <br />

      
      <e-table :table="tableData" @pageInfo="ptest">
        <el-table-column label="Name" prop="name">
          <template slot-scope="scope">
            <e-img-name
              :src="require('@/assets/images/profile.jpg')"
              :name="scope.row.name"
            />
          </template>
        </el-table-column>
        <el-table-column label="Receipt number" prop="receiptnum">
        </el-table-column>
        <el-table-column label="Class-Section" prop="classSection">
        </el-table-column>

        <el-table-column
          style="width: 11rem"
          label="Due Amount(INR)"
          prop="amount"
        >
        </el-table-column>
        <el-table-column label="Creation Date" prop="creationDate">
        </el-table-column>
        <el-table-column label="Action">
          <template slot-scope="scope">
            <img
              @click="handleEdit(scope.$index, scope.row)"
              src="@/assets/images/download-action-icon.png"
              alt=""
            />
            <img
              @click="$router.push($url.FI_FEE_VIEW)" 
              src="@/assets/images/3dot-action.png"
              alt=""
              style="cursor:pointer"
            />
          </template>
        </el-table-column>
      </e-table>
    </e-container>
  </div>
</template>
<script>
import receiptsCard from "@/components/finance/receiptsCard.vue";
export default {
  components: {
    receiptsCard,
  },
  data: () => ({
    filter: [
      { text: "Sort by DueAmount" },
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
    receiptscard: [
      {
        title: "Total Payable (INR)",
        count: "28,345",
      },
      {
        title: "Total Paid (INR)",
        count: "28,345",
      },
      {
        title: "Total Due (INR)",
        count: "28,345",
      },
    ],
    tableData: [
      {
        name: "Ipsum dolor",
        receiptnum: "34756",
        classSection: "X-A",
        creationDate: "01-02-2020",
        amount: "34756",
      },
      {
        name: "Ipsum dolor",
        receiptnum: "34756",
        classSection: "X-A",
        creationDate: "01-02-2020",
        amount: "34756",
      },
      {
        name: "Ipsum dolor",
        receiptnum: "34756",
        classSection: "X-A",
        creationDate: "01-02-2020",
        amount: "34756",
      },
      {
        name: "Ipsum dolor",
        receiptnum: "34756",
        classSection: "X-A",
        creationDate: "01-02-2020",
        amount: "34756",
      },
      {
        name: "Ipsum dolor",
        receiptnum: "34756",
        classSection: "X-A",
        creationDate: "01-02-2020",
        amount: "34756",
      },
      {
        name: "Ipsum dolor",
        receiptnum: "34756",
        classSection: "X-A",
        creationDate: "01-02-2020",
        amount: "34756",
      },
      {
        name: "Ipsum dolor",
        receiptnum: "34756",
        classSection: "X-A",
        creationDate: "01-02-2020",
        amount: "34756",
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
.sort-icon {
  background: transparent !important;
}
.sort-icon:hover {
  background: #bc6c42 !important;
}
</style>
