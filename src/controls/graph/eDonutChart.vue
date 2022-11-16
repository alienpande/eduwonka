<template>
  <GChart type="PieChart" :data="setData()" :options="{
    pieHole: 0.7,
    height: 250,
    pieSliceText: 'none',
    colors: ['#FCDFBD', '#BC6C42'],
    legend: {
      // position: 'none',
      position: 'bottom',
      
    },
    fontName: 'inherit',
    tooltip: {
      textStyle: { color: '#000000CC', bold: false, fontSize: 14 },
      showColorCode: true,
    },
  }" />
</template>

<script>
export default {
  props: {
    male: {
      type: Number,
      default: 0
    },
    female: {
      type: Number,
      default: 0
    }
  },
  name: "eDonutChart",
  methods: {
    setData() {
      var data = [
        ['Total count', '100'], 
        ['Female', this.female], 
        ['Male', this.male]
        ]
      return data
    }
  }
}
</script>
