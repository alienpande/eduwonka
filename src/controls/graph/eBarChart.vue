<template>
    <GChart  type="ColumnChart" :data="setChartData()" :options="chartOptions" />
</template>

<script>
export default {
  name: "eBarChart",
  props: {
    teaching: {
      type: Number,
      default: 0
    },
    nonTeaching: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      chartOptions: {
        legend: {
          position: "none",
        },
        chart: {
          title: "Company Performance",
          subtitle: "Sales, Expenses, and Profit: 2014-2017",
        },
        fontName: "inherit",
        vAxis: {
          title: "Employee Count",
          titleTextStyle: {
            color: "#000000CC",
            italic: false,
            bold: true,
          },
          minorGridlines: {
            count: 0,
          },
          baselineColor: "#ececec",
          gridlines: {
            color: "#ececec",
            minSpacing: 20,
          },
          ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        },
        tooltip: {
          textStyle: { color: "#000000CC", bold: false, fontSize: 14 },
          showColorCode: false,
        },
        chartArea: {
          width: "auto",
          height: "auto",
        },
        isStacked: true,
        bar: {
          groupWidth: 20,
        },
        height: 360,
        width: "100%",
      },
    };
  },
  methods: {
    setChartData() {
      var data = [["Employee Count", "Count", { role: "style" }],["Teaching", this.teaching, "#BC6C42"],["Non Teaching", this.nonTeaching, "#FCDFBD"]]
      return data
    }
  }
};
</script>
