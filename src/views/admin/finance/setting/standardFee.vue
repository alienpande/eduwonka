<template>
  <div>
    <e-container pageTitle="Standard Fee Line Item" btnIcon="el-icon-plus" btnText="Create Standard Fee" @btnClick="$router.push($url.FI_CREATE_STANDARD + '/new')">
      <div class="sub-headers">
        Choose the standard to Add/Edit standard fees line item
      </div>
      <el-row :gutter="20" style="padding: 15px 0px 5px 0px; margin: 0px 0px 5px 0px; background: white; height: 80px;">
        <el-col :span="5" style="padding-left: 35px">
          <!-- <e-dropdown :list="filter" primary /> -->
          <el-dropdown @command="handleStandard">
            <span class="el-dropdown-link primary-text" primary>
              Standard<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in standards" :key="item" :command="item.id">{{ item.name }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>

        <el-col :span="3" class="primary-text">Clear filter</el-col>
        <el-col style="padding-left: 10px" :span="1" :offset="13">
          <e-button icon="el-icon-search" plain css="bg-tranparent" />
        </el-col>
      </el-row>
      <br />
      <e-table :table="standards" @pageInfo="ptest">
        <el-table-column label="Standard" prop="name"> </el-table-column>
        <el-table-column style="width: 26rem" label="Total amount" prop="amount">
          <template slot-scope="scope">
            {{ getAmount(scope.row) }}
          </template>
        </el-table-column>
        <el-table-column style="width: 26rem"> </el-table-column>
        <el-table-column style="width: 26rem"> </el-table-column>
        <el-table-column label="Action">
          <template slot-scope="scope">
            <e-svg
              style="margin-right: 10px"
              @click="$router.push($url.FI_CREATE_STANDARD + `/${scope.row.id}`)"
              icon="pens"
            ></e-svg>
          </template>
        </el-table-column>
      </e-table>
    </e-container>
  </div>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher"
export default {
  data: () => ({
    filter: [
      { text: "Standard" },
      { text: "Standard 2" },
      { text: "Standard 3" },
    ],
    standards: [],
  }),
  created() {
    this.getStandards()
  },
  methods: {
    getStandards() {
      const query = `query {
        standards(order_by: {name: asc}) {
          id
          name
          standard_fee_line_items {
            id
            default_amount
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        console.log(response)
        this.standards = response.standards
      })
    },
    getAmount(row) {
      var sum = 0
      row.standard_fee_line_items.map(x => {
        sum = sum + x.default_amount
      })
      return sum
    },
  }
};
</script>
