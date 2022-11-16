<template>
  <e-container pageTitle="Enquires" btnIcon="el-icon-plus">
    <el-tabs class="floatTabHeader" v-model="activeName">
      <el-tab-pane label="Prospect Enquires" name="prospectEnquiry">
        <el-row>
          <el-col :span="20">
            <p class="title">List of prospect student</p>
          </el-col>
          <e-button
            :span="4"
            class="btn"
            icon="el-icon-plus"
            label="Add Enquiry"
            @click="$router.push($url.HQ_ENQUIRES_PROSPECT_FORM)"
          />
        </el-row>
        <el-row class="searchCard">
          <el-col :span="4" :offset="1">
            <e-dropdown :list="filterStandard" primary />
          </el-col>
          <el-col :span="4">
            <e-dropdown :list="filterDate" primary />
          </el-col>
          <el-col :span="4">
            <e-dropdown :list="filterStatus" primary />
          </el-col>
          <el-col :span="4" class="primary-text">Clear filter</el-col>
          <el-col :span="2" :offset="5">
            <e-button
              icon="el-icon-search"
              :plain="true"
              type="primary"
            ></e-button>
          </el-col>
        </el-row>
        <el-row class="block" :gutter="20">
          <el-col :span="12" v-for="(enquiry, index) in enquiries" :key="index">
            <enquiry-card
              :name="enquiry.name"
              :title="enquiry.title"
              :standard="enquiry.standard"
              :status="enquiry.status"
              :enquiryDate="enquiry.date"
            ></enquiry-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Student related Enquiry" name="studentEnquiry">
        <el-row>
          <el-col :span="20">
            <p class="title">List of In general enquiry</p>
          </el-col>
          <e-button
            :span="4"
            class="btn"
            icon="el-icon-plus"
            label="Add Enquiry"
            @click="$router.push($url.HQ_ENQUIRES_STUDENT_FORM)"
          />
        </el-row>
        <el-row class="searchCard">
          <el-col :span="4" :offset="1">
            <e-dropdown :list="filterStandard" primary />
          </el-col>
          <el-col :span="4">
            <e-dropdown :list="filterDate" primary />
          </el-col>
          <el-col :span="4">
            <e-dropdown :list="filterStatus" primary />
          </el-col>
          <el-col :span="4" class="primary-text">Clear filter</el-col>
          <el-col :span="2" :offset="5">
            <e-button
              icon="el-icon-search"
              :plain="true"
              type="primary"
            ></e-button>
          </el-col>
        </el-row>
        <el-row class="block" :gutter="20">
          <el-col :span="12" v-for="(enquiry, index) in enquiries" :key="index">
            <enquiry-card
              :name="enquiry.name"
              :title="enquiry.title"
              :standard="enquiry.standard"
              :status="enquiry.status"
              :enquiryDate="enquiry.date"
            ></enquiry-card>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </e-container>
</template>
<script>
import EnquiryCard from "@/components/hq/EnquiryCard";
export default {
  components: {
    EnquiryCard,
  },
  data() {
    return {
      activeName: "prospectEnquiry",
      filterStandard: [
        { text: "Standard" },
        { text: "XII" },
        { text: "XI" },
        { text: "X" },
      ],
      filterDate: [{ text: "Date" }],
      filterStatus: [
        { text: "Status" },
        { text: "Active" },
        { text: "Inactive" },
      ],
      enquiries: [
        {
          title: "Admission for class X will start on which day",
          name: "Amit",
          standard: "X",
          date: "14th June",
          status: "Responded",
        },
        {
          title: "Admission for class X will start on which day",
          name: "Amit",
          standard: "X",
          date: "14th June",
          status: "Open",
        },
        {
          title: "Admission for class X will start on which day",
          name: "Amit",
          standard: "X",
          date: "14th June",
          status: "Responded",
        },
        {
          title: "Admission for class X will start on which day",
          name: "Amit",
          standard: "X",
          date: "14th June",
          status: "Open",
        },
        {
          title: "Admission for class X will start on which day",
          name: "Amit",
          standard: "X",
          date: "14th June",
          status: "Open",
        },
        {
          title: "Admission for class X will start on which day",
          name: "Amit",
          standard: "X",
          date: "14th June",
          status: "Responded",
        },
      ],
    };
  },
};
</script>
<style scoped>
.title {
  color: #4d4f5c;
  font-size: 20px;
  opacity: 1;
}
.searchCard {
  background: rgb(255, 255, 255);
  height: 80px;
  padding: 30px 15px 30px 15px;
  margin: 30px 0px 30px 0px;
}
.block {
  padding: 50px;
  padding-top: 0px;
  height: 750px;
  overflow-y: scroll;
}
</style>
