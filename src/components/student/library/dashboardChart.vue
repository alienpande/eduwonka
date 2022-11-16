<template>
  <div>
    <el-card class="rounded-08 bg-black-2" shadow="none">
      <el-row>
        <el-col :span="2" :offset="22">
          <es-button text="Export" icon="downloadYellow" />
        </el-col>
      </el-row>
      <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
    </el-card>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  props: {
    issueReturns: {
      type: Array,
      default: null
    }
  },
  data: () => ({
    series: [
      {
        name: "Issued Books",
        data: [],
      },
      {
        name: "Returned Books",
        data: [],
      },
    ],
    chartOptions: {
      chart: {
        type: "bar",
        height: 350,
      },
      colors: ["#FEC600", "#1FC24E"],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "20%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Jan 22",
          "Feb 22",
          "Mar 22",
          "Apr 22",
          "May 22",
          "Jun 22",
          "Jul 22",
          "Aug 22",
          "Sep 22",
          "Oct 22",
          "Nov 22",
          "Dec 22",
        ],
      },
     
      fill: {
        opacity: 1,
      },
    },
  }),
  created() {
    this.setChartData()
  },
  methods: {
    setChartData() {
      var issuedBooks = []
      var returnedBooks = []
      var months = []
      for (let i = 0; i < 12 ; i++) {
        const month = moment().month(i).format('MM')
        const year = new Date().getFullYear()
        const lastDate = new Date(year, i + 1, 0).getDate()
        months.push({first: moment(year + '-' + month + '-' + '01').format(''),last: moment(year + '-' + month + '-' + lastDate).format('')})
      }
      for (const month of months) {
        const issued = this.issueReturns.filter(x => (moment(x.date_of_borrow).format('YYYY/MM/DD') >= moment(month.first).format('YYYY/MM/DD') && moment(x.date_of_borrow).format('YYYY/MM/DD') <= moment(month.last).format('YYYY/MM/DD')))
        const returned = this.issueReturns.filter(x => (moment(x.return_date).format('YYYY/MM/DD') >= moment(month.first).format('YYYY/MM/DD') && moment(x.return_date).format('YYYY/MM/DD') <= moment(month.last).format('YYYY/MM/DD')))
        const index = months.indexOf(month)
        issuedBooks[index] = (issued.length).toFixed(0)
        returnedBooks[index] = (returned.length).toFixed(0)
      }

      if (issuedBooks.length > 0) {
        console.log(issuedBooks)
        this.series[0].data = issuedBooks
      } if (returnedBooks.length > 0) {
        this.series[1].data = returnedBooks
      } else {
        this.series[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        this.series[1].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    }
  }
};
</script>

<style>
.grade-card {
  height: 376px;
  /* max-width: 476px; */
  overflow: hidden;
}
.line-chart-container {
  /* height: 0px !important; */
  overflow: hidden;
}
.overview_chart #line-chart {
  height: 250px !important;
  width: 350px !important;
  margin: auto;
  margin-top: 60px;
}
.outlined-btn {
  border: 2px solid #6d6c6c !important;
  font-weight: bolder;
  border-radius: 4px;
  color: #6d6c6c !important;
}
.outlined-btn:disabled {
  color: #6d6c6c !important;
  border: 2px solid #6d6c6c !important;
}
@media screen and (max-width: 1225px) {
  .grade-card {
    height: 376px;
    max-width: 100%;
  }
  #line-chart {
    height: 200px !important;
    width: 250px !important;
    margin: auto;
    margin-top: 30px;
  }
}
</style>