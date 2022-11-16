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
  props: {
    prospect: {
      type: Number,
      default: 0
    },
    student: {
      type: Number,
      default: 0
    }
  },
  name: "eDonutChart",
  methods: {
    setData() {
      var data = [['Total count', '100'], ['Prospect Enquiries', this.prospect], ['Student Enquiries', this.student]]
      return data
    }
  }
}
</script>
