<template>
  <div>
    <div
      style="padding: 20px; padding-right: 50px; overflow: auto; height: 80vh"
    >
      <el-row style="display: flex; padding: 15px">
        <el-col :span="16" style="display: flex">
          <e-svg
            @click="$router.push($url.FI_PAYSLIP_EMPLOYEE_DETAILS)"
            icon="back"
          ></e-svg>
          <div
            style="
              color: #11141a;
              font-weight: 500;
              font-size: 24px;
              opacity: 0.8;
              margin-top: 7px;
              margin-left: 20px;
            "
          >
            Employee Payslip Details
          </div>
        </el-col>
        <el-col :span="3" :offset="4">
          <e-button label="Change Employee" :plain="true" css="sort-icon">
          </e-button>
        </el-col>
      </el-row>
      <div class="sub-headers" style="padding-left: 20px; color: #000000cc">
        Employee Details
      </div>
      <el-row style="background: white; padding: 20px">
        <el-col :span="3" :offset="1">
          <el-avatar
            :size="133"
            :src="require('@/assets/images/profile.jpg')"
          />
        </el-col>
        <el-col :span="4">
          <div style="background: #fcdfbd33;padding:15px">
            <div class="f-600 fs-16" style="color: #000000cc;margin-bottom:5px">
              Akanksha Mittal
            </div>
            <div style="color: #00000099">abc@gmail.com</div>
            <div style="color: #00000099">0121-2771829</div>
            <div style="color: #00000099">Designation</div>
          </div>
        </el-col>
        <el-col :span="3" :offset="12">
            <br/>  <br/>  <br/>
            <e-button label="Create Payslip" icon="el-icon-plus"> </e-button>
        </el-col>
      </el-row>

      <div class="sub-headers" style="padding-left: 20px; margin-top:20px;color: #000000cc">
        All Payslips of Employee
      </div>
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
      <br />
      <e-table :table="tableData" @pageInfo="ptest">
        <el-table-column label="Payslip number" prop="payslipNum">
        </el-table-column>
        <el-table-column label="Month" prop="month"> </el-table-column>
        <el-table-column label="Year" prop="Year"> </el-table-column>
        <el-table-column label="Net salary (INR)" prop="netsalary">
        </el-table-column>

        <el-table-column label="Action">
          <template slot-scope="scope">
            <img
              @click="handleEdit(scope.$index, scope.row)"
              src="@/assets/images/downAction.png"
              alt=""
            />
            <img
              @click="handleEdit(scope.$index, scope.row)"
              src="@/assets/images/eyeIcon.png"
              alt=""
            />
          </template>
        </el-table-column>
      </e-table>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    filter: [{ text: "Month" }, { text: "Standard 2" }, { text: "Standard 3" }],
    filter2: [{ text: "Year" }, { text: "Subject 1" }, { text: "Subject 2" }],
    tableData: [
      {
        payslipNum: "34756",
        month: "January",
        Year: "2020",
        netsalary: "34756",
      },
      {
        payslipNum: "34756",
        month: "January",
        Year: "2020",
        netsalary: "34756",
      },
      {
        payslipNum: "34756",
        month: "January",
        Year: "2020",
        netsalary: "34756",
      },
      {
        payslipNum: "34756",
        month: "January",
        Year: "2020",
        netsalary: "34756",
      },
      {
        payslipNum: "34756",
        month: "January",
        Year: "2020",
        netsalary: "34756",
      },
      {
        payslipNum: "34756",
        month: "January",
        Year: "2020",
        netsalary: "34756",
      },
      {
        payslipNum: "34756",
        month: "January",
        Year: "2020",
        netsalary: "34756",
      },
      {
        payslipNum: "34756",
        month: "January",
        Year: "2020",
        netsalary: "34756",
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
