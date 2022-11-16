<template>
    <div>
      <div style="opacity: 0.8; width: 200px" class="fs-16 f-500">
       Accuracy rate
      </div>
      <div id="chart">
          <apexchart type="bar" height="200" width="550" :options="chartOptions" :series="series" ></apexchart>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    activeData: {
      type: Array
    },
    inActiveData: {
      type: Array
    }
  },
  data:()=>({
    series: [
      {
        name: "Active",
        data: [],
      },
      {
        name: "Inactive",
        data: [],
      },
     
    ],
    chartOptions: {
      colors : ['#BC6C42', '#FCDFBD'],
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
        categories: [
          "Tasks",
          "Activity",
          "Attendance",
          "Homework",
        ],
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
    console.log('data', this.activeData, this.inActiveData)
    this.series[0].data = this.activeData
    this.series[1].data = this.inActiveData
  }
}
</script>