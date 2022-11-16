<template>
  <div>
    <e-container
      pageTitle="Term Creation"
      btnIcon="el-icon-plus"
      btnText="Create Term"
      @btnClick="$router.push($url.FI_TEARM_CREATE)"
    >
      <div class="sub-headers">Below is the term list</div>
      <e-table :table="tableData" @pageInfo="ptest">
        <el-table-column label="Payslip number" prop="payslipNumber">
        </el-table-column>
        <el-table-column label="End Date" prop="endDate"> </el-table-column>
        <el-table-column label="Start Date" prop="startDate"> </el-table-column>
        <el-table-column label="Due date" prop="dueDate"> </el-table-column>

        <el-table-column label="Action">
          <template slot-scope="scope">
            <div style="display: flex">
              <e-svg style="margin-right:10px"
                @click="handleEdit(scope.$index, scope.row)"
                icon="pens"
              ></e-svg>
              <e-svg
                @click="handleEdit(scope.$index, scope.row)"
                icon="closes"
              ></e-svg>
            </div>
          </template>
        </el-table-column>
      </e-table>
    </e-container>
  </div>
</template>
<script>
export default {
  components: { },
  data: () => ({
    tableData: [
      {
        payslipNumber: "Term 1",
        endDate: "01-02-2020",
        startDate: "01-02-2020",
        dueDate: "01-02-2020",
      },

     {
        payslipNumber: "Term 1",
        endDate: "01-02-2020",
        startDate: "01-02-2020",
        dueDate: "01-02-2020",
      }, {
        payslipNumber: "Term 1",
        endDate: "01-02-2020",
        startDate: "01-02-2020",
        dueDate: "01-02-2020",
      }, {
        payslipNumber: "Term 1",
        endDate: "01-02-2020",
        startDate: "01-02-2020",
        dueDate: "01-02-2020",
      }, {
        payslipNumber: "Term 1",
        endDate: "01-02-2020",
        startDate: "01-02-2020",
        dueDate: "01-02-2020",
      }, {
        payslipNumber: "Term 1",
        endDate: "01-02-2020",
        startDate: "01-02-2020",
        dueDate: "01-02-2020",
      }, {
        payslipNumber: "Term 1",
        endDate: "01-02-2020",
        startDate: "01-02-2020",
        dueDate: "01-02-2020",
      }, {
        payslipNumber: "Term 1",
        endDate: "01-02-2020",
        startDate: "01-02-2020",
        dueDate: "01-02-2020",
      }, {
        payslipNumber: "Term 1",
        endDate: "01-02-2020",
        startDate: "01-02-2020",
        dueDate: "01-02-2020",
      }, {
        payslipNumber: "Term 1",
        endDate: "01-02-2020",
        startDate: "01-02-2020",
        dueDate: "01-02-2020",
      }, {
        payslipNumber: "Term 1",
        endDate: "01-02-2020",
        startDate: "01-02-2020",
        dueDate: "01-02-2020",
      }, {
        payslipNumber: "Term 1",
        endDate: "01-02-2020",
        startDate: "01-02-2020",
        dueDate: "01-02-2020",
      }, {
        payslipNumber: "Term 1",
        endDate: "01-02-2020",
        startDate: "01-02-2020",
        dueDate: "01-02-2020",
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
