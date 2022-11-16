<template>
  <div class="rounded-08 position-relative bg-white pd-20 grade-carde">
    <!-- <div class="tx-bold">
      {{ title }}
    </div> -->
    <div class="line-chart-container text-center">
      <e-line-chart :chartdata="chartdata2" :options="options" class="class-grade-chart" />
    </div>
    <div class="position-absolute wd-100p d-flex justify-content-between b-20 l-5">
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
    standards: {
      type: Array,
      default: () => []
    },
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
                max: 100,
                display: false,
              },
              gridLines: { display: false },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontSize: 16,
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
    this.setChartData()
  },
  methods: {
    setChartData() {
      for (const standard of this.standards) {
        let score = 0
        let total = 0
        for (const exam of standard.exams) {
          let marks = 0
          if (exam && exam.exam_report.length > 0) {
            for (const report of exam.exam_report) {
              if (report.marks) {
                marks += parseInt(report.marks)
              }
            }
          }
          score += marks ? (marks / exam.exam_report.length) : 0
        }
        total = (score != 0 ? score / standard.exams.length : 0).toFixed(0)
        console.log(standard.name, total)
        this.chartdata2.labels.push(standard.name)
        this.chartdata2.datasets[0].data.push(total)
      }
    }
  }
}
</script>
<style scoped>
.grade-carde >>> .line-chart-container + .position-absolute{
  bottom: -15px;
}
.grade-carde >>> .class-grade-chart #line-chart{
  width: 400px !important;
}

</style>
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
  height: 200px !important;
  width: 350px !important;
  margin: auto;
  margin-top: 35px;
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