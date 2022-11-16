<template>
  <div>
    <e-container pageTitle="Payslips">
      <div class="sub-headers">View or create payslips</div>
      <el-row
        :gutter="20"
        style="
          padding: 15px 0px 10px 0px;
          margin: 0px 0px 5px 0px;
          background: white;
          height: 80px;
        "
      >
        <el-col :span="3" style="padding-left: 35px">
          <e-dropdown :list="filter" primary />
        </el-col>
        <el-col :span="4" style="padding-left: 35px" class="primary-text"
          ><e-dropdown :list="filter2" primary
        /></el-col>

        <el-col :span="3" class="primary-text">Clear filter</el-col>
        <el-col style="padding-left: 10px" :span="1" :offset="12">
          <e-button
            icon="el-icon-search"
            :plain="true"
            css="bg-tranparent"
          ></e-button>
        </el-col>
      </el-row>
      <br/>
      <div style="color: #000000cc;padding-bottom:10px" class="fs-20 f-500">
        Choose Employess to view or create payslips
      </div>
      <employe-drop/>
      <div style="color: #000000cc;padding-bottom:10px;padding-top:20px" class="fs-20 f-500">
        Your Draft Payslips
      </div>

      <e-table :table="tableData" @pageInfo="ptest">
        <el-table-column label="Payslip number" prop="payslipNumber">
        </el-table-column>
        <el-table-column label="Employee" prop="Employee"> </el-table-column>
        <el-table-column label="Date of Creation" prop="dateOfCreation">
        </el-table-column>
        <el-table-column label="For Month" prop="forMonth"> </el-table-column>

        <el-table-column label="Action">
          <template slot-scope="scope">
            <!-- <img
              @click="handleEdit(scope.$index, scope.row)"
              src="@/assets/images/download-action-icon.png"
              alt=""
            /> -->
            <img
              @click="
                $router.push($url.FI_PAYSLIP_EMPLOYEE_DETAILS),
                  handleEdit(scope.$index, scope.row)
              "
              src="@/assets/images/penaction.png"
              alt=""
              style="cursor: pointer"
            />
          </template>
        </el-table-column>
      </e-table>
    </e-container>
  </div>
</template>
<script>
import employeDrop from '@/components/finance/employeDrop.vue'
export default {
  components:{employeDrop},
  data: () => ({
    filter: [
      { text: "Designation" },
      { text: "Standard 2" },
      { text: "Standard 3" },
    ],
    filter2: [
      { text: "Departments" },
      { text: "Subject 1" },
      { text: "Subject 2" },
    ],
    tableData: [
      {
        payslipNumber: "34756",
        Employee: "January",
        forMonth: "Lorem",
        dateOfCreation: "01-02-2020",
      },
       {
        payslipNumber: "34756",
        Employee: "January",
        forMonth: "Lorem",
        dateOfCreation: "01-02-2020",
      }, {
        payslipNumber: "34756",
        Employee: "January",
        forMonth: "Lorem",
        dateOfCreation: "01-02-2020",
      }, {
        payslipNumber: "34756",
        Employee: "January",
        forMonth: "Lorem",
        dateOfCreation: "01-02-2020",
      }, {
        payslipNumber: "34756",
        Employee: "January",
        forMonth: "Lorem",
        dateOfCreation: "01-02-2020",
      }, {
        payslipNumber: "34756",
        Employee: "January",
        forMonth: "Lorem",
        dateOfCreation: "01-02-2020",
      }, {
        payslipNumber: "34756",
        Employee: "January",
        forMonth: "Lorem",
        dateOfCreation: "01-02-2020",
      }, {
        payslipNumber: "34756",
        Employee: "January",
        forMonth: "Lorem",
        dateOfCreation: "01-02-2020",
      }, {
        payslipNumber: "34756",
        Employee: "January",
        forMonth: "Lorem",
        dateOfCreation: "01-02-2020",
      },
    ],
  }),
};
</script>
