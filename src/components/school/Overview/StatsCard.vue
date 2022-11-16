<template>
  <div class="bg-white rounded-08 pd-10 pd-y-50 ">
    <el-row class="mg-y-3" style="border-bottom: 1px solid #fcdfbd">
      <el-col :span="8" style="font-size: 14px" class="text-center tx-bold">
        Ongoing
        <div style="opacity: 0.8" class="mg-y-10 tx-24">{{ ongoing }}</div>
      </el-col>
      <el-col style="font-size: 14px" :span="8" class="text-center tx-bold">
        Completed
        <div style="opacity: 0.8" class="mg-y-10 tx-24">{{ completed }}</div>
      </el-col>
      <el-col style="font-size: 14px" :span="8" class="text-center tx-bold">
        Upcoming
        <div style="opacity: 0.8" class="mg-y-10 tx-24">{{ upcoming }}</div>
      </el-col>
    </el-row>
    <el-row justify="between" style="margin-top:20px">
      <el-col :span="8" class="tx-bold"> {{ title }} </el-col>
      <el-col :span="16" class="d-flex text-right justify-content-even tx-bold on-going legend-container">
        <div class="dot orange text-sm-muted">Completed</div>
        <div class="dot green text-sm-muted">Active</div>
        <div class="dot blue text-sm-muted">Upcoming</div>
      </el-col>
    </el-row>
    <el-row class="pd-20 mg-t-40">
      <el-col :span="12">
        <GChart type="PieChart" :data="setChartData()" :options="pieChartOptions" class="z-index--1" />
      </el-col>
      <el-col :span="12" class="pd-x-10">
        <div class="d-flex align-item-center flex-column justify-content-center ht-120">
          <div>On Going</div>
          <div class="tx-bold">{{ ongoing }}</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
export default {
  components: { VueSlickCarousel },
  name: "StatsCard",
  props: {
    ongoing:{
      type: Number
    },
    completed: {
      type: Number
    },
    upcoming: {
      type: Number
    },
    title: {
      type: String
    },
    graphData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      pieChartOptions: {
        // is3D:true,
        pieHole: 0.6,
        pieSliceText: "none",
        chartArea: { top: "0%", height: "70%", width: "80%" },
        legend: "none",

        slices: [
          { color: "blue" },
          { color: "green" },
          { color: "orange", offset: 0.01, elevated: true, size: 90 },
        ],
      },
    }
  },
  methods: {
    setChartData() {
      var Data = [["1", "count", { role: "style" }], ["upcoming", this.upcoming, "#f00"], ["ongoing", this.ongoing, "f00"], ["completed", this.completed, "f000"]]
      return Data
    }
  }
}
</script>

<style lang="scss">
.stats-card {
  max-width: 277px;
  overflow: hidden;
}

.legend-container{
  column-gap: 10%;
}

@media only screen and (max-width: 767px){
  .legend-container{
    flex-direction: column;
    align-items: flex-end;
  }
}


@media screen and (min-width: 1024px) {
  .stats-card {
    height: 376px;
    max-width: 270px;
  }
}
@media screen and (min-width: 1200px) {
  .stats-card {
    max-width: 349px;
  }
}
@media screen and (min-width: 1366px) {
  .stats-card {
    max-width: 415px;
  }
}

@media screen and (min-width: 1536px) {
  .stats-card {
    height: 376px;
    max-width: 490px;
  }
}
@media screen and (min-width: 1600px) {
  .stats-card {
    height: 376px;
    max-width: 530px;
  }
}
@media screen and (min-width: 1800px) {
  .stats-card {
    max-width: 630px;
  }
}
@media screen and (min-width: 1900px) {
  .stats-card {
    height: 376px;
    max-width: 680px;
  }
}
@media screen and (min-width: 2304px) {
  .stats-card {
    height: 376px;
    max-width: 880px;
  }
}

@media screen and (min-width: 2560px) {
  .stats-card {
    height: 376px;
    max-width: 960px;
  }
}
@media screen and (min-width: 2880px) {
  .stats-card {
    height: 376px;
    max-width: 1150px;
  }
}
.carousal-card {
  height: 169px;
  border: 1.5px solid #bc6c42;
  width: 85%;
  border-radius: 8px;
  overflow: hidden;
}

.slick-dots {
  bottom: -10px;
  li button:before,
  li.slick-active button:before {
    color: transparent;
    opacity: 1;
  }
  li button:before {
    background-color: transparent;
    border: 1px solid #bc6c42;
    border-radius: 50%;
    display: inline-block;
    height: 10px;
    width: 10px;
  }
  li.slick-active button:before {
    background-color: #bc6c42;
  }
}

.slick-dots li button::before {
  height: 10px !important;
  widows: 10px !important;
  background: #fff;
}
.performing-card {
  background: #fff;
}
.on-going {
  position: relative;
  /* width: 100%; */
}
.on-going .dot {
  position: relative;
}
.on-going .dot::before {
  position: absolute;
  left: -15px;
  top: 5px;
  width: 10px;
  height: 10px;
  content: "";
  border-radius: 2px;
}
.on-going .dot.green::before {
  background: greenyellow;
}
.on-going .dot.orange::before {
  background: orange;
}
.on-going .dot.blue::before {
  background: blue;
}
</style>