<template>
  <div>
    <e-container
      pageTitle="Student Fee Line Item"
      btnIcon="el-icon-plus"
      btnText="Create Student Fee"
      @btnClick="$router.push($url.FI_SETTING_STUDENT_CREATE)"
    >
      <div class="sub-headers">
        Choose the standard to Add/Edit standard fees line item
      </div>
      <el-row
        :gutter="20"
        style="
          padding: 15px 0px 5px 0px;
          margin: 0px 0px 5px 0px;
          background: white;
          height: 80px;
        "
      >
        <el-col :span="3" style="padding-left: 35px">
          <e-dropdown :list="filter" primary />
        </el-col>
        <el-col :span="3" style="padding-left: 35px">
          <e-dropdown :list="filter" primary />
        </el-col>

        <el-col :span="3" class="primary-text">Clear filter</el-col>
        <el-col style="padding-left: 10px" :span="1" :offset="12">
          <e-button
            icon="el-icon-search"
            :plain="true"
            css="bg-tranparent"
          ></e-button>
        </el-col>
      </el-row>
      <br />
      <e-table :table="tableData" @pageInfo="ptest">
        <el-table-column label="Student" prop="name">
          <template slot-scope="scope">
            <e-img-name
              :src="require('@/assets/images/profile.jpg')"
              :name="scope.row.name"
            />
          </template>
        </el-table-column>
        <el-table-column label="Standard" prop="Standard"> </el-table-column>

        <el-table-column
          style="width: 26rem"
          label="Total amount"
          prop="totalamount"
        >
        </el-table-column>
        <!-- <el-table-column style="width: 26rem"> </el-table-column> -->
        <el-table-column label="Action">
          <template slot-scope="scope">
            <e-svg
              style="margin-right: 10px"
              @click="handleEdit(scope.$index, scope.row)"
              icon="pens"
            ></e-svg>
          </template>
        </el-table-column>
      </e-table>
    </e-container>
  </div>
</template>
<script>
export default {
  data: () => ({
    filter: [
      { text: "Standard" },
      { text: "Standard 2" },
      { text: "Standard 3" },
    ],
    tableData: [
      {
        name: "34756",
        Standard: "X-A",
        totalamount: "01-02-2020",
      },
      {
        name: "34756",
        Standard: "X-A",
        totalamount: "01-02-2020",
      },
      {
        name: "34756",
        Standard: "X-A",
        totalamount: "01-02-2020",
      },
      {
        name: "34756",
        Standard: "X-A",
        totalamount: "01-02-2020",
      },
      {
        name: "34756",
        Standard: "X-A",
        totalamount: "01-02-2020",
      },
      {
        name: "34756",
        Standard: "X-A",
        totalamount: "01-02-2020",
      },
      {
        name: "34756",
        Standard: "X-A",
        totalamount: "01-02-2020",
      },
      {
        name: "34756",
        Standard: "X-A",
        totalamount: "01-02-2020",
      },
      {
        name: "34756",
        Standard: "X-A",
        totalamount: "01-02-2020",
      },
    ],
  }),
};
</script>
