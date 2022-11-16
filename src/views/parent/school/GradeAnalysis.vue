<template>
  <div>
    <e-container pageTitle="Grade analysis">
      <div class="heading">Grade Performance</div>
      <el-row :gutter="3">
        <el-col :span="12" :sm="24" :md="12">
          <div class="bg-white rounded-left pd-20" style="min-height: 377px">
            <div class="d-flex justify-content-between">
              <div class="mg-t-10 tx-bold">Your class grade progress</div>
              <div>
                <e-select :options="[{ value: 'Exam Type' }]" title="Rasgu" />
              </div>
            </div>
            <class-grade-chart />
          </div>
        </el-col>
        <el-col :span="12" :sm="24" :md="12">
          <div class="bg-white rounded-right pd-20" style="min-height: 377px">
            <div class="mg-t-10 tx-bold">Grading System</div>
            <div class="d-flex justify-content-center mg-y-15">
              <div class="text-right mg-r-5">90-100</div>
              <div class="mg-x-10" style="color: #d3d3d3">
                ----------------------------
              </div>
              <div class="text-right">A+</div>
            </div>
            <div class="d-flex justify-content-center mg-y-15">
              <div class="text-right mg-r-5">80-90</div>
              <div class="mg-x-10" style="color: #d3d3d3">
                ----------------------------
              </div>
              <div class="text-right">A</div>
            </div>
            <div class="d-flex justify-content-center mg-y-15">
              <div class="text-right mg-r-5">70-80</div>
              <div class="mg-x-10" style="color: #d3d3d3">
                ----------------------------
              </div>
              <div class="text-right">B+</div>
            </div>
            <div class="d-flex justify-content-center mg-y-15">
              <div class="text-right mg-r-5">60-70</div>
              <div class="mg-x-10" style="color: #d3d3d3">
                ----------------------------
              </div>
              <div class="text-right">B</div>
            </div>
            <div class="d-flex justify-content-center mg-y-15">
              <div class="text-right mg-r-5">50-60</div>
              <div class="mg-x-10" style="color: #d3d3d3">
                ----------------------------
              </div>
              <div class="text-right">C</div>
            </div>
            <div class="d-flex justify-content-center mg-y-15">
              <div class="text-right mg-r-5">35-50</div>
              <div class="mg-x-10" style="color: #d3d3d3">
                ----------------------------
              </div>
              <div class="text-right">D</div>
            </div>
            <div class="d-flex justify-content-center mg-y-15">
              <div class="text-right mg-r-5">0-635</div>
              <div class="mg-x-10" style="color: #d3d3d3">
                ----------------------------
              </div>
              <div class="text-right">E</div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" :sm="24" :md="12">
          <div class="heading">Focus Area</div>
          <el-card
            class="mg-y-10 pd-y-12 rounded-08"
            body-style="padding:10px"
            shadow="none"
            v-for="(d, i) in 4"
            :key="i"
          >
            <el-row>
              <el-col :span="6" class="text-center tx-bold mg-t-15 tx-14" style="color:#E60000">
                <i
                  class="el-icon-d-arrow-right tx-bold tx-16"
                  style="transform: rotate(90deg);"
                ></i>
                12%
              </el-col>
              <el-col :span="18">
                <div class="focus-area__text">
                  Class 3 A needs to be focused on primary subjects
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="12" :sm="24" :md="12">
          <div class="heading">Top Teachers</div>
          <el-row :gutter="10">
            <el-col :span="12" class="mg-y-8" v-for="(d, i) in 4" :key="i">
              <el-card shadow="none" class="rounded-08 text-center pg-50 cp">
                <div @click="showSideBar = true">
                  <el-avatar
                    :size="72"
                    :src="require('@/assets/images/profile.jpg')"
                  />
                  <div class="heading">Rachael Kenneth</div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </e-container>
    <grade-analysis-drawer
      :show="showSideBar"
      :__onCancel="()=>showSideBar = !showSideBar"
    />
  </div>
</template>
<script>
import ClassGradeChart from '@/components/school/GradeAnalysis/ClassGradeChart.vue';
import GradeAnalysisDrawer from '@/components/school/GradeAnalysis/GradeAnalysisDrawer.vue';
import eSelect from "@/controls/eSelect.vue";
export default {
  components: { eSelect,  GradeAnalysisDrawer, ClassGradeChart },
  data() {
    return {
      showSideBar: false,
      chartData: [
        ["1", "Count", { role: "style" }],
        ["0", 80, "#FCDFBD"],
        ["1", 30, "#BC6C42"],
        ["2", 40, "#FCDFBD"],
        ["3", 70, "#FCDFBD"],
        ["4", 80, "#FCDFBD"],
        ["5", 30, "#FCDFBD"],
        ["6", 10, "#FCDFBD"],
        ["7", 50, "#FCDFBD"],
        ["8", 40, "#FCDFBD"],
      ],
      chartOptions: {
        dataOpacity: 0.3,

        vAxis: {
          gridlines: { count: 0 },
          textPosition: "none",
        },
        pointSize: 6,
        chartArea: { top: "3%", height: "80%", width: "90%" },
        hAxis: {
          minValue: 1,
          maxValue: 9,
          gridlines: { count: 20, color: "black" },
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

<style >

.focus-area__text {
  text-align: left;
  letter-spacing: 0px;
  color: rgba(0,0,0,0.6);
  font-weight: bold;
}
</style>