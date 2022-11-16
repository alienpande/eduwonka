<template>
  <div class="rounded-08 position-relative bg-white pd-20 grade-carde">
    <div class="mg-l-30 line-chart-container text-center" v-loading="loading">
      <apexchart type="line" height="350" width="580" ref="chart" :options="chartOptions" :series="series" />
    </div>
    <div class="connect-result-btns position-absolute wd-100p d-flex justify-content-between b-20">
      <el-button icon="el-icon-arrow-left" size="small" class="l-0 outlined-btn" color="green" disabled />
      <el-button icon="el-icon-arrow-right" size="small" class="r-0 outlined-btn" />
    </div>
  </div>
</template>

<script>
// import eLineChart from "@/controls/eLineChart.vue";
export default {
  components: {},
  name: "GradePerformanceCard",
  props: {
    standards: {
      type: Array,
      default: () => []
    },
    report: {
      type: Array,
      default: () => {}
    }
  },
  data() {
    return {
      loading: true,
      series: [
        {
          name: "Pass",
          data: [],
        },
        {
          name: "Fail",
          data: []
        },
        
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "line",
          dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0,
          },
          toolbar: {
            show: false,
          },
        },
        colors: ["#0BC32E", "#E60000"],
        stroke: {
          curve: "smooth",
        },
          
        grid: {
          borderColor: "#e7e7e7",
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        markers: {
          size: 5,
        },
        xaxis: {
          categories: [], 
        },
        yaxis: {
          min: 0,
          max: 100,
        },
        legend: {
          position: "top",
          horizontalAlign: "right",
          floating: true,
          offsetY: -25,
          offsetX: -5,
        },
      },
    }
  },
  created() {
    this.setChartData()
  },
  methods: {
    setChartData() {
      this.loading = true
      for (const standard of this.standards) {
        const exams = this.report.filter(x => x.standard_id === standard.id)
        if (exams.length > 0) {
          let pass = 0
          let fail = 0
          this.chartOptions.xaxis.categories[standard.position] = standard.name
          for (const exam of exams) {
            for (const res of exam.exam_report) {
              if (res.marks > 40) {
                pass ++
              } else {
                fail ++
              }
            }
          }
          this.series[0].data[standard.position] = pass
          this.series[1].data[standard.position] = fail
        } else {
          this.chartOptions.xaxis.categories[standard.position] = standard.name
          this.series[0].data[standard.position] = 0
          this.series[1].data[standard.position] = 0
        }
      }
      if (this.chartOptions.xaxis.categories.length > 0 || this.series[0].data.length > 0 || this.series[1].data.length > 0) {
        this.loading = false
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
