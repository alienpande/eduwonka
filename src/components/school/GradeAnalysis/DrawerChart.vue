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
  props: {
    title: String,
    user: {
      type: Object,
      default: () => {},
    },
    standards: {
      type: Array,
      default: () => [],
    },
  },
  name: "GradePerformanceCard",
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
                fontSize: 30,
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
    // console.log(this.standards, "standards", this.user, "user")
    this.setChartData()
  },
  methods: {
    setChartData() {
      for (const standard of this.standards) {
        const userExams = standard.exams.filter(x => x.invigilator_id === this.user.id)
        if (userExams.length > 0) {
          let score = 0
          let total = 0
          for (const exam of userExams) {
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
          total = (score != 0 ? score / userExams.length : 0).toFixed(0)
          console.log(standard.name, total)
          this.chartdata2.labels.push(standard.name)
          this.chartdata2.datasets[0].data.push(total)
        }
      }
      console.log(this.chartdata2, "chartdata2")
    }
  }
}
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
