<template>
  <e-container pageTitle="Dashboard">
    <div class="heading">Grade Performance</div>
    <el-row :gutter="10" justify="center" type="flex">
      <el-col :span="12">
        <grade-performance-card
          title="Your subject grade progress"
          :chartData="chartData"
          :chartOptions="chartOptions"
        />
      </el-col>
      <el-col :span="12">
        <grade-performance-card
          title="Your class grade progress"
          :chartData="chartData"
          :chartOptions="chartOptions"
        />
      </el-col>
    </el-row>
    <el-row class="mg-y-10 heading">
      <el-col :span="12"> Exam Stats </el-col>
      <el-col :span="12"> Grading Stats </el-col>
    </el-row>
    <el-row :gutter="10" justify="center" type="flex" >
      <el-col  :md="12" >
        <stats-card
          :ongoing="15"
          :upcoming="15"
          :complted="15"
          title="Ongoing"
          :graphData="[pieChartData, pieChartData, pieChartData, pieChartData]"
        />
      </el-col>
      <el-col :md="12">
        
        <stats-card
          :ongoing="15"
          :upcoming="15"
          :complted="15"
          title="Standards"
          :graphData="[pieChartData, pieChartData, pieChartData]"
        />
      </el-col>
    </el-row>
    <el-row :gutter="10" justify="center" type="flex"  >
      <el-col :md="12" class="tx-bold ht-100-f">
        <div class="heading">Performing Stats</div>
        <div class="card d-flex bg-white rounded-08 pd-20 justify-content-even">
          <div>
            <div class="pr-x-40 mg-y-20 text-left">Best Performing Students</div>
            <div class="mg-y-20" v-for="(d, i) in 4" :key="i">
              <e-img-name
                :src="require('@/assets/images/profile.jpg')"
                name="Paul Fernandis"
                nameStyle="font-weight:normal"
              />
            </div>
          </div>
          <div class="">
            <div class="pr-x-40 mg-y-20 text-left">Weak Performing Teachers</div>
            <div class="mg-y-20" v-for="(d, i) in 4" :key="i">
              <e-img-name
                :src="require('@/assets/images/profile.jpg')"
                nameStyle="font-weight:normal"
                name="Paul Fernandis"
              />
            </div>
          </div>
        </div>
      </el-col>
      <el-col :md="12" class="tx-bold">
        <div class="heading">Performing Stats</div>
        <div class="card d-flex bg-white rounded-08 pd-20 justify-content-even">
          <div>
            <div class="pr-x-40 mg-y-15 text-left">Best Performing Exam</div>
            <div class="mg-y-40 tx-normal" v-for="(d, i) in 4" :key="i">
              Term {{ i + 1 }}
            </div>
          </div>
          <div class="">
            <div class="pr-x-40 mg-y-15 text-left">Weak Performing Exam</div>
            <div class="mg-y-40 tx-normal" v-for="(d, i) in 4" :key="i">
              Term {{ i + 1 }}
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </e-container>
</template>

<script>
import GradePerformanceCard from "@/components/school/Overview/GradePerformanceCard.vue";
import StatsCard from "@/components/school/Overview/StatsCard.vue";
import eContainer from "@/controls/eContainer.vue";
import EImgName from "@/controls/table/eImgName.vue";
export default {
  components: { eContainer, GradePerformanceCard, StatsCard, EImgName },
  data() {
    return {
      pieChartData: [
        ["1", "Count", { role: "style" }],
        ["0", 80, "#f00"],
        ["1", 30, "#f00"],
        ["1", 120, "#f000"],
      ],
      chartData: [
        ["1", "Count", { role: "style" }],
        ["0", 80, "#37c64c"],
        ["1", 30, "#37c64c"],
        ["2", 40, "#37c64c"],
        ["3", 70, "#37c64c"],
        ["4", 80, "#37c64c"],
        ["5", 30, "#37c64c"],
        ["6", 10, "#37c64c"],
        ["7", 50, "#37c64c"],
        ["8", 40, "#37c64c"],
      ],

      chartOptions: {
        dataOpacity: 0.3,

        vAxis: {
          gridlines: { count: 0 },
          textPosition: "none",
        },
        pointSize: 6,
        chartArea: { top: "0%", height: "80%", width: "80%" },
        hAxis: {
          minValue: 1,
          maxValue: 9,
          gridlines: { count: 0, color: "black" },
          textStyle: {
            fontSize: 13,
            transform: "rotate(0deg);",
          },
        },
        curveType: "function",
        legend: "none",
      },
    };
  },
};
</script>

<style lang="scss">
</style>