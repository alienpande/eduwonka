<template>
  <GChart
    type = "PieChart"
    :data="chartData"
    :options="{
      backgroundColor: '#1E1E1E',
      borderWidth: 0,
      pieHole: 0.6,
      height: 200,
      pieSliceText: 'none',
      colors: ['#353535', '#1492E6'],
      legend: {
        position: 'none',
      },
      fontName: 'inherit',
      tooltip: {
        textStyle: { color: '#000000CC', bold: false, fontSize: 14 },
        showColorCode: true,
      },
    }"
  />
</template>

<script>
export default {
  name: "eDonutChart",
  props: {
    taken: {
      type: Number,
      default: 0
    },
    remaining: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      chartData: []
    }
  },
  created() {
    this.chartData = [
      ['Total count', 'total'],
      ['Leaves Remaining', this.remaining],
      ['Leaves Taken', this.taken]
    ]
  }
};
</script>
