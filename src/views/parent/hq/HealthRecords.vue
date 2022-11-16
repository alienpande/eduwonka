<template>
  <e-container
    pageTitle="Health Records"
    btnIcon="el-icon-plus"
    btnText="Add New Record"
    @btnClick="addNewRecords"
  >
    <p class="heading">
      Below is the list of details for each standard of the school
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
      <el-table-column label="Roll Number" prop="rollNumber"> </el-table-column>
      <el-table-column label="Admission No" prop="admissionNumber">
      </el-table-column>
      <el-table-column label="Primary Contact" prop="contact">
      </el-table-column>
      <el-table-column label="Class-Section" prop="standard"> </el-table-column>
      <el-table-column label="Actions">
        <template slot-scope="scope">
          <e-button
            :span="12"
            size="mini"
            label=""
            plain
            type=""
            icon="el-icon-view"
            @click="handleEdit(scope.$index, scope.row)"
          />
          <!-- <e-button
            :span="12"
            size="mini"
            label=""
            plain
            type=""
            icon="el-icon-download"
            @click="handleEdit(scope.$index, scope.row)"
          /> -->
        </template>
      </el-table-column>
    </e-table>
    <!-- <el-button type="text" @click="dialogVisible = true"
      >click to open the Dialog</el-button
    >

    <e-dialog
      title="Tips"
      v-model="dialogVisible"
      width="30%"
      top="40vh"
      noEsc
      noPersist
      showFooterBorder
      @cancel="dialogVisible = false"
      @confirm="dialogVisible = false"
    >
      <span>This is a message</span>
    </e-dialog> -->
  </e-container>
</template>
<script>
export default {
  data() {
    return {
      // dialogVisible: false,
      filter: [
        { text: "Class Section", disabled: true },
        { text: "My Profile" },
        { text: "Logout", divided: true },
      ],
      tableData: [
        {
          name: "Mayank",
          rollNumber: "00000001",
          admissionNumber: "8822990001",
          contact: "9407393303",
          standard: "X-C",
        },

        {
          name: "Michael",
          rollNumber: "00000002",
          admissionNumber: "8822990002",
          contact: "94073944550",
          standard: "X-A",
        },
        {
          name: "Richard",
          rollNumber: "00000033",
          admissionNumber: "8822990044",
          contact: "9407355443",
          standard: "X-C",
        },
        {
          name: "Vivek",
          rollNumber: "00000056",
          admissionNumber: "8822994448",
          contact: "8895693303",
          standard: "X-C",
        },
        {
          name: "Ashely",
          rollNumber: "00000001",
          admissionNumber: "8822990001",
          contact: "9407393303",
          standard: "X-C",
        },
      ],
    };
  },
  methods: {
    addNewRecords() {
      this.$router.push(this.$url.HQ_HEALTH_RECORD_FORM);
    },
    handleEdit(i, data) {
      console.log(i, data);
      this.$router.push(this.$url.HQ_HEALTH_RECORD_VIEW);
    },
  },
};
</script>
