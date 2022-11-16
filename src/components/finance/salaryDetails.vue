<template>
  <div>
   
    

      <apexchart
        type="bar"
        height="240"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    
  </div>
</template>
<script>
export default {
  data: () => ({
    filter: [{ text: "Year" }, { text: "Standard 2" }, { text: "Standard 3" }],
    series: [
      {
        name: "Teaching",
        data: [
          44,
       0
         
        ],
      },
      {
        name: "Non Teaching",
        data: [
         0,
          55,
         
        ],
      },
     
    ],
    chartOptions: {
      chart: {
        type: "bar",
        height: 150,
      },
      colors: ["#BC6C42", "#FCDFBD"],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "15%",
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
          "Teaching",
          "Non Teaching",
         
        ],
      },

      fill: {
        opacity: 1,
      },
      tooltip: {
        enabled: false,
       
      },
    },
  }),
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
