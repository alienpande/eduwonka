<template>
  <div>
    <es-container pageTitle="Grade analysis" class="bg-black-5">
      <el-card class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
        <el-row>
          <el-col :span="20">
            <span class="tx-18 tx-bolder text-white">Grade Performance</span>
          </el-col>
          <el-col :span="3" :offset="1">
            <es-select placeholder="Exam Type" class="select-icon"></es-select>
          </el-col>
        </el-row>
        <br />
        <el-row :gutter="3">
          <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
            <el-row>
              <el-col :span="15" class="mg-l-20">
                <div class="bg-black-3 rounded pd-20">
                  <div class="d-flex justify-content-between border">
                    <div class="mg-t-12 tx-14 tx-bold text-white">Grading System</div>
                  </div>
                  <br /><br />
                  <class-grade-chart :chartData="chartData" :chartOptions="chartOptions" />
                </div>
              </el-col>
              <el-col :span="8" class="mg-l-30">
                <div class="tx-14 bg-black-3 rounded pd-20">
                  <div class="mg-t-12 tx-bold text-white border">Grading System</div>
                  <br /><br />
                  <div class="d-flex justify-content-center border">
                    <el-col :span="4" class="text-right text-white">90-100</el-col>
                    <el-col :span="2" :offset="12" class="text-white">A+</el-col>
                  </div>
                  <div class="d-flex justify-content-center mg-y-15 border">
                    <el-col :span="4" class="text-right text-white">80-90</el-col>
                    <el-col :span="2" :offset="12" class="text-white">A</el-col>
                  </div>
                  <div class="d-flex justify-content-center mg-y-15 border">
                    <el-col :span="4" class="text-right text-white">70-80</el-col>
                    <el-col :span="2" :offset="12" class="text-white">B+</el-col>
                  </div>
                  <div class="d-flex justify-content-center mg-y-15 border">
                    <el-col :span="4" class="text-right text-white">60-70</el-col>
                    <el-col :span="2" :offset="12" class="text-white">B</el-col>
                  </div>
                  <div class="d-flex justify-content-center mg-y-15 border">
                    <el-col :span="4" class="text-right text-white">50-60</el-col>
                    <el-col :span="2" :offset="12" class="text-white">C</el-col>
                  </div>
                  <div class="d-flex justify-content-center mg-y-15 border">
                    <el-col :span="4" class="text-right text-white">35-50</el-col>
                    <el-col :span="2" :offset="12" class="text-white">D</el-col>
                  </div>
                  <div class="d-flex justify-content-center mg-y-15 border">
                    <el-col :span="4" class="text-right text-white">0-35</el-col>
                    <el-col :span="2" :offset="12" class="text-white">E</el-col>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-row>
      </el-card>
      <div class="mg-t-20">
        <el-row :gutter="20">
          <el-col :span="12" :sm="24" :md="12">
            <el-card class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
              <el-row>
                <el-col :span="17">
                  <span class="tx-18 tx-bolder text-white">Compare with best Performer</span>
                </el-col>
                <el-col :span="6" :offset="1">
                  <es-select placeholder="Subject" class="select-icon"></es-select>
                </el-col>
              </el-row>
              <br />
              <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
                <el-row>
                  <el-card class="rounded-08 bg-black-3" :style="'border: none'" shadow="none">
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
                  </el-card>
                </el-row>
              </el-card>
            </el-card>
          </el-col>
          <el-col :span="12" :sm="24" :md="12">
            <el-card class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
              <el-row>
                <el-col :span="17">
                  <span class="tx-18 tx-bolder text-white">Focus Areas</span>
                </el-col>
              </el-row>
              <br />
              <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
                <el-row>
                  <div
                    style="
                      border: 1px solid #1E1E1E;
                      padding: 5px;
                      height: 14rem;
                      overflow: auto;
                    "
                    class="rounded-08 mt10"
                  >
                    <div
                      class="bg-black-3 p10"
                      style="margin-bottom: 15px"
                      v-for="i in 6"
                      :key="i"
                    >
                      <div style="color: #cfcfcf">
                        <span class="tx-14">Lorem Ipsum is simply dummy text of the printing and typecasting industry</span>
                      </div>
                    </div>
                  </div>
                </el-row>
              </el-card>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </es-container>
    <grade-analysis-drawer
      :show="showSideBar"
      :__onCancel="()=>showSideBar = !showSideBar"
    />
  </div>
</template>
<script>
import ClassGradeChart from '@/components/student/school/GradeAnalysis/ClassGradeChart.vue';
import GradeAnalysisDrawer from '@/components/student/school/GradeAnalysis/GradeAnalysisDrawer.vue';
export default {
  components: { GradeAnalysisDrawer, ClassGradeChart },
  data() {
    return {
      showSideBar: false,
      chartData: [
        ["1", "Count", { role: "style" }],
        ["0", 80, "#FE9D2B"],
        ["1", 30, "#BC6C42"],
        ["2", 40, "#FE9D2B"],
        ["3", 70, "#FE9D2B"],
        ["4", 80, "#FE9D2B"],
        ["5", 30, "#FE9D2B"],
        ["6", 10, "#FE9D2B"],
        ["7", 50, "#FE9D2B"],
        ["8", 40, "#FE9D2B"],
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
          gridlines: { count: 20, color: "white" },
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
.border {
  border-bottom: 2px solid #404040;
}
</style>