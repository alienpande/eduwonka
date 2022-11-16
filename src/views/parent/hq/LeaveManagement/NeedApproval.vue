<template>
  <e-container pageTitle="Need Approval">
    <p class="heading">
      List of leaves for which your approval is/was required
    </p>
    <e-table :filter="filter" :table="tableData" @pageInfo="ptest">
      <el-table-column label="Name">
        <template slot-scope="scope">
          <e-img-name
            :src="require('@/assets/images/profile.jpg')"
            :name="scope.row.name"
          />
        </template>
      </el-table-column>
      <el-table-column label="Designation" prop="designation">
      </el-table-column>
      <el-table-column label="Department" prop="department"> </el-table-column>
      <el-table-column label="Date Range" prop="dateRange"> </el-table-column>
      <el-table-column label="Status" prop="status"> </el-table-column>
      <el-table-column label="Actions">
        <template>
          <e-button
            :span="12"
            size="mini"
            label=""
            plain
            type=""
            icon="el-icon-view"
            @click="handleEdit()"
          />
        </template>
      </el-table-column>
    </e-table>
  </e-container>
</template>
<script>
export default {
  data() {
    return {
      activeName: "activeStudent",
      filter: [
        { text: "Class Section", disabled: true },
        { text: "My Profile" },
        { text: "Logout", divided: true },
      ],
      tableData: [
        {
          name: "Mayank",
          designation: "00000001",
          department: "8822990001",
          dateRange: "9407393303",
          status: "Approved",
        },

        {
          name: "Michael",
          designation: "00000002",
          department: "8822990002",
          dateRange: "94073944550",
          status: "Approved",
        },
        {
          name: "Richard",
          designation: "00000033",
          department: "8822990044",
          dateRange: "9407355443",
          status: "Pending",
        },
        {
          name: "Vivek",
          designation: "00000056",
          department: "8822994448",
          dateRange: "8895693303",
          status: "Rejected",
        },
        {
          name: "Ashely",
          designation: "00000001",
          department: "8822990001",
          dateRange: "9407393303",
          status: "Pending",
        },
      ],
    };
  },
  methods: {
    handleEdit() {
      this.$router.push(this.$url.HQ_LEAVE_MANAGEMENT_RECORD_VIEW);
    },
  },
};
</script>
