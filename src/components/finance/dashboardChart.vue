<template>
  <div>
    <h4>Expenditure Report</h4>
    <el-card shadow="none">
      <el-row>
        <el-col :span="2" :offset="22">&emsp;
          <!-- <e-dropdown :list="filter" primary /> -->
        </el-col>
      </el-row>

      <apexchart type="bar" height="350" :options="chartOptions" :series="series" />
    </el-card>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  props: {
    expenses: {
      type: Array,
      default: null
    }
  },
  data: () => ({
    filter: [{ text: "Year" }, { text: "Standard 2" }, { text: "Standard 3" }],
    series: [
      {
        name: "Expenses",
        data: [],
      },
      {
        name: "Income",
        data: [],
      },
    ],
    chartOptions: {
      chart: {
        type: "bar",
        height: 350,
      },
      colors: ["#BC6C42", "#FCDFBD"],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
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
      var expenses = []
      var Income = []
      var months = []
      for (let i = 0; i < 12 ; i++) {
        const month = moment().month(i).format('MM')
        const year = new Date().getFullYear()
        const lastDate = new Date(year, i + 1, 0).getDate()
        months.push({first: moment(year + '-' + month + '-' + '01').format(''),last: moment(year + '-' + month + '-' + lastDate).format('')})
      }
      for (const month of months) {
        const data = this.expenses.filter(x => (moment(x.purchased_date).format('YYYY/MM/DD') >= moment(month.first).format('YYYY/MM/DD') && moment(x.purchased_date).format('YYYY/MM/DD') <= moment(month.last).format('YYYY/MM/DD')))
        const expenditure = data.filter(x => x.expenses_type === 'Expenditure')
        const income = data.filter(x => x.expenses_type === 'Reimbursement')
        const index = months.indexOf(month)
        let expenditure_amount = 0
        let income_amount = 0
        if (expenditure.length > 0) {
          for(const item of expenditure) {
            expenditure_amount += item.amount
          }
        } if (income.length > 0) {
          for(const item of income) {
            income_amount += item.amount
          }
        }
        expenses[index] = expenditure_amount
        Income[index] = income_amount
      }
      if (expenses.length > 0) {
        this.series[0].data = expenses
      } if (Income.length > 0) {
        this.series[1].data = Income
      } else {
        this.series[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        this.series[1].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    }
  }
}
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
  border: 2px solid #bc6c42 !important;
  font-weight: bolder;
  border-radius: 4px;
  color: #bc6c42 !important;
}
.outlined-btn:disabled {
  color: #d3d3d3 !important;
  border: 2px solid #d3d3d3 !important;
}
.month-graph {
  color: #131523;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 5px;
}
.round-cirle-indicate {
  width: 10px;
  height: 10px;

  border-radius: 50%;
  display: inline-block;
  content: "";
}
.budget-amound {
  color: #131523;
  font-size: 12px;
  display: inline-block;
  margin-left: 10px;
  font-weight: 600;
}
.sourch-amount {
  color: #7e84a3;
  display: inline-block;
  margin-left: 10px;
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
