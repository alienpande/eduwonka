<template>
  <e-container
    pageTitle="Employees"
    btnIcon="el-icon-plus"
    btnText="Add Employees"
    @btnClick="addNewEmployees"
  >
    <el-tabs class="floatTabHeader" v-model="activeName">
      <el-tab-pane label="Active" name="activeEmployees">
        <e-dashcard :obj="activeEmployeesReport">
          <template #header>
            Below is the list of active Employees for this academic year
          </template>
        </e-dashcard>
        <e-table :filter="filter" :table="tableData" @pageInfo="ptest">
          <el-table-column label="Date" prop="date"> </el-table-column>
          <el-table-column label="Name" prop="name"> </el-table-column>
          <el-table-column align="right">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >Edit</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >Delete</el-button
              >
            </template>
          </el-table-column>
        </e-table>
      </el-tab-pane>
      <el-tab-pane label="Inactive" name="inactiveEmployees">
        <e-dashcard :obj="inActiveEmployeesReport">
          <template #header>
            Below is the list of Inactive Employees for this academic year
          </template>
        </e-dashcard>
        <e-table :filter="filter" :table="tableData">
          <el-table-column label="Date" prop="date"> </el-table-column>
          <el-table-column label="Name" prop="name"> </el-table-column>
        </e-table>
      </el-tab-pane>
    </el-tabs>
  </e-container>
</template>
<script>
export default {
  data() {
    return {
      activeName: "activeEmployees",
      filter: [
        { text: "Class Section", disabled: true },
        { text: "My Profile" },
        { text: "Logout", divided: true },
      ],
      activeEmployeesReport: [
        {
          title: "Total Employees",
          value: "60",
          icon: "hq/employees",
        },
        {
          title: "Total Boys",
          value: "30",
          icon: "hq/boy",
        },
        {
          title: "Total Girls",
          value: "30",
          icon: "hq/girl",
        },
      ],
      inActiveEmployeesReport: [
        {
          title: "Total Employees",
          value: "3",
          icon: "hq/employees",
        },
        {
          title: "Total Boys",
          value: "2",
          icon: "hq/boy",
        },
        {
          title: "Total Girls",
          value: "1",
          icon: "hq/girl",
        },
      ],
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-04",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-08",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-06",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-07",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-08",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-06",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-07",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-08",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-06",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-07",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-08",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-06",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-07",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-08",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-06",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-07",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-08",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-06",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-07",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
      ],
    };
  },
  methods: {
    addNewEmployees() {
      this.$router.push(this.$url.HQ_EMPLOYEE_FORM+'new');
    },
    ptest(d) {
      console.log(d);
    },
  },
};
</script>
