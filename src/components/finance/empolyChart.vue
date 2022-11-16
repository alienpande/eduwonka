<template>
  <GChart
    type="PieChart"
    :data="setData()"
    :options="{
      pieHole: 0.7,
      height: 250,
      pieSliceText: 'none',
      colors: ['#FCDFBD', '#BC6C42'],
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
    teaching: {
      type: Number
    },
    nonTeaching: {
      type: Number
    }
  },
  methods: {
    setData() {
      var data = [['Total count', '100'], ['Non-Teaching', this.nonTeaching], ['Teaching', this.teaching]]
      return data
    }
  }
}
</script>
