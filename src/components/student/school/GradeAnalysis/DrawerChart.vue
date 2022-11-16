<template>
  <div class="rounded-08 position-relative bg-white pd-20 grade-carde">
    <div class="tx-bold">
      {{ title }}
    </div>
    <div class="line-chart-container text-center">
      <e-line-chart :chartdata="chartdata2" :options="options" class="line-chart__drawer" />
    </div>
  </div>
</template>

<script>
import eLineChart from "@/controls/eLineChart.vue";
export default {
  components: { eLineChart },
  name: "GradePerformanceCard",
  data() {
    return {
      chartdata2: {
        labels: ['3A','4A','7A','9A'],
        datasets: [
          {
            backgroundColor: "transparent",
            borderColor: "#37c64c",
            data: [90,120,60,150],
            // pointStrokeColor: "#fff",
            pointBackgroundColor: "#fcdfbd",
            pointRadius: 5,
            pointBorderWidth: 3,
            pointBorderColor: "#37c64c",
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
                beginAtZero: true,
                max: 200,
                display: false,
              },
              gridLines: { display: false },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontSize: 40,
              },
              grid: {
                drawOnChartArea: false,
              },
            },
          ],
        },
      },
    };
  },
  props: {
    title: String,
    chartData: Array,
    chartOptions: {
      type: Object,
    },
  },
};
</script>

<style>
.line-chart-container {
  /* height: 0px !important; */
  overflow: hidden;
}
.line-chart__drawer #line-chart {
  height: 150px !important;
  width: 150px !important;
  margin: auto;
  margin-top: 0px;
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
