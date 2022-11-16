<template>
  <div class="about">
    <e-container
      pageTitle="Vendor"
      btnIcon="el-icon-plus"
      btnText="Add Vendor"
      @btnClick="$router.push($url.FI_VENDOR_ADD)"
    >
      <div class="sub-headers">
        Below is the list of expenditure for this Academic Year
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
        <el-col :span="3" style="padding-left: 35px" class="primary-text"
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
      <e-table :table="tableData" @pageInfo="ptest">
        <el-table-column label="Name" prop="Name">
        </el-table-column>
        <el-table-column label="Category" prop="Category"> </el-table-column>
        <el-table-column label="Contact Person" prop="ContactPerson">
        </el-table-column>
        <el-table-column label="Phone number" prop="Phonenumber"> </el-table-column>

        <el-table-column label="Action">
          <template slot-scope="scope">
            <img
              @click="handleEdit(scope.$index, scope.row)"
              src="@/assets/images/download-action-icon.png"
              alt=""
            />
            <img
              @click="$router.push($url.FI_VENDOR_VIEW),handleEdit(scope.$index, scope.row)"
              src="@/assets/images/3dot-action.png"
              alt=""
            />
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
      { text: "Vendor" },
      { text: "Standard 2" },
      { text: "Standard 3" },
    ],
    filter2: [{ text: "Status" }, { text: "Subject 1" }, { text: "Subject 2" }],
    tableData: [
      {
        Name: "Kukreja",
        Category: "Garments",
        ContactPerson: "Lorem",
        Phonenumber: "34756",
       
      },

     {
        Name: "Kukreja",
        Category: "Garments",
        ContactPerson: "Lorem",
        Phonenumber: "34756",
       
      }, {
        Name: "Kukreja",
        Category: "Garments",
        ContactPerson: "Lorem",
        Phonenumber: "34756",
       
      }, {
        Name: "Kukreja",
        Category: "Garments",
        ContactPerson: "Lorem",
        Phonenumber: "34756",
       
      }, {
        Name: "Kukreja",
        Category: "Garments",
        ContactPerson: "Lorem",
        Phonenumber: "34756",
       
      }, {
        Name: "Kukreja",
        Category: "Garments",
        ContactPerson: "Lorem",
        Phonenumber: "34756",
       
      }, {
        Name: "Kukreja",
        Category: "Garments",
        ContactPerson: "Lorem",
        Phonenumber: "34756",
       
      }, {
        Name: "Kukreja",
        Category: "Garments",
        ContactPerson: "Lorem",
        Phonenumber: "34756",
       
      }, {
        Name: "Kukreja",
        Category: "Garments",
        ContactPerson: "Lorem",
        Phonenumber: "34756",
       
      }, {
        Name: "Kukreja",
        Category: "Garments",
        ContactPerson: "Lorem",
        Phonenumber: "34756",
       
      }, {
        Name: "Kukreja",
        Category: "Garments",
        ContactPerson: "Lorem",
        Phonenumber: "34756",
       
      }, {
        Name: "Kukreja",
        Category: "Garments",
        ContactPerson: "Lorem",
        Phonenumber: "34756",
       
      }, {
        Name: "Kukreja",
        Category: "Garments",
        ContactPerson: "Lorem",
        Phonenumber: "34756",
       
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
