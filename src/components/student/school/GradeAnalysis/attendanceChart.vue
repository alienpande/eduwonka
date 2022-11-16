<template>
  <div class="rounded-08 position-relative bg-black-3 pd-20 grade-carde">
    <div class="tx-bold">
      {{ title }}
    </div>
    <div class="line-chart-container text-center">
      <e-line-chart :chartdata="chartdata2" :options="options" class="class-grade-chart" />
    </div>
    <div
      class="position-absolute wd-100p d-flex justify-content-between b-5 l-10"
    >
      <el-button type="info" icon="el-icon-arrow-left" size="small" circle disabled />
      <el-button type="info" icon="el-icon-arrow-right" size="small" circle />
    </div>
  </div>
</template>

<script>
import eLineChart from "@/controls/eLineChart.vue";
export default {
  components: { eLineChart },
  name: "GradePerformanceCard",
  props: {
    title: String,
    chartData: Array,
    chartOptions: {
      type: Object,
    },
    attendance: {
      type: Array,
    },
  },
  data() {
    return {
      chartdata2: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            backgroundColor: "transparent",
            borderColor: "#FE9D2B",
            data: [],
            // pointStrokeColor: "#fff",
            pointBackgroundColor: "#FE9D2B",
            pointRadius: 5,
            pointBorderWidth: 3,
            pointBorderColor: "#FE9D2B",
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        responsive: !true,
        maintainAspectRatio: true,
        scales: {
          yAxes: [
            {
              ticks: {
                fontSize: 20,
                beginAtZero: true,
                stepSize: 20,
                max: 100,
                display: true,
              },
              gridLines: { display: false },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontSize: 18,
              },
              grid: {
                drawOnChartArea: false,
              },
            },
          ],
        },
      },
    }
  },
  created() {
    this.chartdata2.datasets[0].data = this.attendance
  },
}
</script>

<style>
.grade-card {
  height: 376px;
  max-width: 476px;
  overflow: hidden;
}
.line-chart-container {
  /* height: 0px !important; */
  overflow: hidden;
}
.class-grade-chart #line-chart{
  height: 230px !important;
  width: 640px !important;
  margin: auto;
  margin-top: 0px;
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
