<template>
  <e-container pageTitle="Dashboard" subTitle="Welcome back!">
    <e-dashcard :span="6" :obj="dashCardData">
      <template #header> Quick stats </template>
    </e-dashcard>
    <el-row :gutter="40">
      <e-card
        :span="15"
        title="Leaves Approval"
        subTitle="Recent leaves for which your approval is/was required"
        :bottom="{
          title: 'View leave approval List',
          link: '/',
        }"
      >
        <e-table :table="tableData" hidePagination shadow>
          <el-table-column label="Date" prop="date"> </el-table-column>
          <el-table-column label="Name" prop="name"> </el-table-column>
          <el-table-column label="Address" prop="address"> </el-table-column>
        </e-table>
      </e-card>
      <e-card :span="9" title="" subTitle="Total Leaves">
        <e-donut-chart />
      </e-card>
      <e-card
        :span="24"
        title="Recent Enquires"
        subTitle="List of recent Enquiries and their status"
        :bottom="{
          title: 'View Enquires List',
          link: $url.HQ_ENQUIRES,
        }"
      >
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
      </e-card>
      <e-card
        :span="12"
        title="Students Details and Enquiries"
        subTitle="Student count statistics"
      >
        <e-donut-chart />
      </e-card>
      <e-card
        :span="12"
        title=""
        subTitle="Enquires"
        :bottom="{
          title: 'View Task List',
          link: $url.HQ_ENQUIRES,
        }"
      >
        <e-donut-chart />
      </e-card>
      <e-card
        :span="12"
        title="Employee Detail"
        subTitle="Employee gender count"
      >
        <e-donut-chart />
      </e-card>
      <e-card :span="12" title="" subTitle="Employee Distribution">
        <e-bar-chart />
      </e-card>
    </el-row>
    <!-- <el-row :gutter="40">
      <el-col :span="12" style="padding: 20px; background: #fff">
        <GChart type="ColumnChart" :data="chartData" :options="chartOptions" />
      </el-col>
      <el-col :span="12">
        <GChart
          type="PieChart"
          :data="[
            ['Total count', '100'],
            ['Female', 60],
            ['Male', 40],
          ]"
          :options="{
            pieHole: 0.7,
            height: 250,
            pieSliceText: 'none',
            colors: ['#FCDFBD', '#BC6C42'],
            legend: {
              position: 'none',
            },
            fontName: 'inherit',
            tooltip: {
              textStyle: { color: '#000000CC', bold: false, fontSize: 14 },
              showColorCode: true,
            },
          }"
        />
      </el-col>
    </el-row> -->
  </e-container>
</template>
<script>
// import { mapMutations } from "vuex";
import EnquiryCard from "@/components/hq/EnquiryCard";
import eBarChart from "@/controls/graph/eBarChart";
import EDonutChart from "@/controls/graph/eDonutChart.vue";

export default {
  components: {
    EnquiryCard,
    eBarChart,
    EDonutChart,
  },
  data() {
    return {
      dashCardData: [
        {
          title: "Total Students",
          value: "60",
          icon: "hq/student",
          last:
            "<span class='green-text'>2.3% <i class='el-icon-top'></i></span> than last year",
        },
        {
          title: "Total Boys",
          value: "30",
          icon: "hq/boy",
          last:
            "<span class='green-text'>2.3% <i class='el-icon-top'></i></span> than last year",
        },
        {
          title: "Total Girls",
          value: "30",
          icon: "hq/girl",
          last:
            "<span class='green-text'>2.3% <i class='el-icon-top'></i></span> than last year",
        },
        {
          title: "Total Employees",
          value: "62",
          icon: "hq/girl",
          last:
            "<span class='red-text'>1.6% <i class='el-icon-bottom'></i></span> than last year",
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
      ],
    };
  },
  // methods: {
  //   ...mapMutations("Common", ["setAsideMenuCollapse"]),
  // },
  // mounted() {
  //   this.setAsideMenuCollapse(true);
  // },
};
</script>
