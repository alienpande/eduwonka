<template>
  <div class="rounded-08 position-relative bg-white pd-20 grade-carde">
    <div class="tx-bold">
      {{ title }}
    </div>
    <div class="line-chart-container text-center">
      <e-line-chart :chartdata="chartdata2" :options="options" class="overview_chart" />
    </div>
    <div class="position-absolute wd-90p d-flex justify-content-between b-20 l-25">
      <el-button icon="el-icon-arrow-left" size="small" class="l-0 outlined-btn" color="green" disabled />
      <el-button icon="el-icon-arrow-right" size="small" class="r-0 outlined-btn" />
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
    chartOptions: {
      type: Object,
    },
    subjects: {
      type: Array,
    },
    reports: {
      type: Array,
    }
  },
  data() {
    return {
      chartdata2: {
        labels: [],
        datasets: [
          {
            backgroundColor: "transparent",
            borderColor: "#37c64c",
            data: [],
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
                fontSize: 30,
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
  created() {
    this.getChart()
  },
  methods: {
    getChart() {
      for (const sub of this.subjects) {
        const report = this.reports.find(x => x.subject_id === sub.id)
        if (report) {
          this.chartdata2.labels.push(sub.name)
          if (report.exam_report.length > 0) {
            let marks = 0
            for (const res of report.exam_report) {
              marks += res.marks
            }
            this.chartdata2.datasets[0].data.push(marks)
          } else {
            this.chartdata2.datasets[0].data.push(0)
          }
        } else {
          this.chartdata2.labels.push(sub.name)
          this.chartdata2.datasets[0].data.push(0)
        }
      }
    }
  }
};
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
