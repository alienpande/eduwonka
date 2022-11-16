<template>
  <div>
    <div style="display: flex; justify-content: space-between; padding: 0 40px">
      <div style="opacity: 0.8; width: 300px" class="fs-16 f-500">
        Your school topic progress
      </div>

      <!-- <div>
        <div style="display: flex; justify-content: space-between">
          <div style="display: flex">
            <span style="width: 8px;height: 8px;background: #ffa700;display: inline-block;margin-top: 6px;margin-right: 7px;"></span>
            <span style="color: #11141a; font-size: 12px; font-weight: 300">Active</span>
          </div>
          <div style="display: flex; margin-left: 19px">
            <span style="width: 8px;height: 8px;background: #4d4f5c;display: inline-block;margin-top: 6px;margin-right: 7px;"></span>
            <span style="color: #11141a; font-size: 12px; font-weight: 300">Upcoming</span>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; margin-top: 5px">
          <div style="display: flex">
            <span style="width: 8px;height: 8px;background: #0bc32e;display: inline-block;margin-top: 6px;margin-right: 7px;"></span>
            <span style="color: #11141a; font-size: 12px; font-weight: 300">Completed</span>
          </div>
          <div style="display: flex; margin-left: 29px; margin-right: 13px">
            <span style="width: 8px;height: 8px;background: #e60000;display: inline-block;margin-top: 6px;margin-right: 7px;"></span>
            <span style="color: #11141a; font-size: 12px; font-weight: 300">Delayed</span>
          </div>
        </div>
      </div> -->
    </div>

    <div class="rounded-08 position-relative bg-white pd-20 grade-carde">
      <div class="mg-l-25 line-chart-container text-center">
        <div id="chart">
          <apexchart type="bar" height="200" width="620" :options="chartOptions" :series="series" />
        </div>
      </div>
      <div class="position-absolute wd-90p d-flex justify-content-between b-20 l-25" >
        <el-button icon="el-icon-arrow-left" size="small" class="l-0 outlined-btn" color="green" disabled />
        <el-button icon="el-icon-arrow-right" size="small" class="r-0 outlined-btn" />
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  props: {
    months: {
      type: Array,
      default: () => []
    },
    topics: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    series: [
      {
        name: "Active",
        data: [],
      },
      {
        name: "Upcoming",
        data: [],
      },
      {
        name: "Completed",
        data: [],
      },
      {
        name: "Delayed",
        data: [],
      },
    ],
    chartOptions: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
        },
      },
      xaxis: {
        categories: [],
      },
      legend: {
        position: "right",
        offsetY: 40,
      },
      fill: {
        opacity: 1,
      },
    },
  }),
  created() {
    this.chartOptions.xaxis.categories = this.months
    console.log(this.topics, this.months, "topics")
    this.setChartData()
  },
  methods: {
    setChartData() {
      var active = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      var upcoming = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      var completed = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      var delayed = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      for (const month of this.months) {
        const i = this.months.indexOf(month)
        for (const topic of this.topics) {
          if (topic.sub_topics.length > 0) {
            const subTopics = topic.sub_topics.filter(x => x.status === 'completed')
            if (subTopics.length != 0) {
              if (topic.classrooms.length > 0) {
                active[i] ++
              } if (topic.sub_topics.length === subTopics.length) {
                completed[i] ++
              }
            } else {
              if (topic.classrooms.length > 0) {
                for (const classroom of topic.classrooms) {
                  if (moment(classroom.due_date).format('MMM') < month) {
                    delayed[i] ++
                  } else if (moment(classroom.due_date).format('MMM') > month) {
                    upcoming[i] ++
                  } else {
                    completed[i] ++
                  }
                }
              } else {
                upcoming[i] ++
              }
            }
          } else {
            if (topic.classrooms.length > 0) {
              for (const classroom of topic.classrooms) {
                if (moment(classroom.due_date).format('MMM') < month) {
                  delayed[i] ++
                } else if (moment(classroom.due_date).format('MMM') > month) {
                  upcoming[i] ++
                } else {
                  completed[i] ++
                }
              }
            } else {
              upcoming[i] ++
            }
          }
        }
      }
      console.log(active, upcoming, completed, delayed, "chart")
      this.series[0].data = active
      this.series[1].data = upcoming
      this.series[2].data = completed
      this.series[3].data = delayed
    }
  }
}
</script>

<style>
.grade-card {
  height: 376px;
  overflow: hidden;
}
.line-chart-container {
  /* height: 0px !important; */
  overflow: hidden;
}
.overview_chart #line-chart {
  height: 250px !important;
  width: 530px !important;
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

.graph-div {
  box-shadow: 0px 13px 21px #00000033;
  border: 2px solid #bc6c42;
  border-radius: 10px;
  background: white;
  width: 10rem;
  text-align: left;
  padding: 15px;
  font-size: 12px;
}
.graph-bold {
  color: #11141a;
  opacity: 0.8;
  font-size: 16px;
  font-weight: 500;
}
</style>
