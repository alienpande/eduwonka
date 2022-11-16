<template>
  <div>
    <div
      style="padding: 20px; padding-right: 50px; overflow: auto; height: 80vh"
    >
      <el-row style="display: flex; padding: 15px">
        <el-col :span="16" style="display: flex">
          <e-svg @click="$router.push($url.FI_PAYSLIP)" icon="back"></e-svg>
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
            Employee List
          </div>
        </el-col>
        <el-col :span="3" :offset="4">
          <e-button @click="$router.push($url.FI_PAYSLIP_CREATE)" label="Create group slips" icon="el-icon-plus"> </e-button>
        </el-col>
      </el-row>
      <div class="sub-headers" style="padding-left: 20px">
        List of employees for whom you want to create/view payslips
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
      <e-button
        :offset="22"
        label="Edit list"
        :plain="true"
        css="bg-tranparent"
      ></e-button>
      <br /><br /><br />
      <e-table :table="tableData" @pageInfo="ptest">
        <el-table-column label="Name" prop="name">
          <template slot-scope="scope">
            <e-img-name
              :src="require('@/assets/images/profile.jpg')"
              :name="scope.row.name"
            />
            
          </template>
        </el-table-column>
        <el-table-column label="Designation" prop="Designation">
        </el-table-column>
        <el-table-column label="Department" prop="Department">
        </el-table-column>
        <el-table-column label="Joining Date" prop="joinDate">
        </el-table-column>

        <el-table-column label="Action">
          <template slot-scope="scope">
            <!-- <img
              @click="handleEdit(scope.$index, scope.row)"
              src="@/assets/images/download-action-icon.png"
              alt=""
            /> -->
            <img
              @click="
                $router.push($url.FI_PAYSLIP_DETAILS),
                  handleEdit(scope.$index, scope.row)
              "
              src="@/assets/images/3dot-action.png"
              alt=""
              style="cursor: pointer"
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
    customHtml: `<div class="color-red">How it work?</div>`,
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
        name: "34756",
        Designation: "Akanksha Mittal",
        Department: "Lorem",
        joinDate: "01-02-2020",
      },
      {
        name: "34756",
        Designation: "Akanksha Mittal",
        Department: "Lorem",
        joinDate: "01-02-2020",
      },
      {
        name: "34756",
        Designation: "Akanksha Mittal",
        Department: "Lorem",
        joinDate: "01-02-2020",
      },
      {
        name: "34756",
        Designation: "Akanksha Mittal",
        Department: "Lorem",
        joinDate: "01-02-2020",
      },
      {
        name: "34756",
        Designation: "Akanksha Mittal",
        Department: "Lorem",
        joinDate: "01-02-2020",
      },
      {
        name: "34756",
        Designation: "Akanksha Mittal",
        Department: "Lorem",
        joinDate: "01-02-2020",
      },
      {
        name: "34756",
        Designation: "Akanksha Mittal",
        Department: "Lorem",
        joinDate: "01-02-2020",
      },
      {
        name: "34756",
        Designation: "Akanksha Mittal",
        Department: "Lorem",
        joinDate: "01-02-2020",
      },
      {
        name: "34756",
        Designation: "Akanksha Mittal",
        Department: "Lorem",
        joinDate: "01-02-2020",
      },
      {
        name: "34756",
        Designation: "Akanksha Mittal",
        Department: "Lorem",
        joinDate: "01-02-2020",
      },
      {
        name: "34756",
        Designation: "Akanksha Mittal",
        Department: "Lorem",
        joinDate: "01-02-2020",
      },
      {
        name: "34756",
        Designation: "Akanksha Mittal",
        Department: "Lorem",
        joinDate: "01-02-2020",
      },
      {
        name: "34756",
        Designation: "Akanksha Mittal",
        Department: "Lorem",
        joinDate: "01-02-2020",
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
