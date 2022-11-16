<template>
  <right-side-bar :show="show" @onClose="__onCancel">
    <div>
      <div
        class="mg-x-40 mg-y-10 rounded-08 shadow-sm"
        style="
          overflow: hidden;
          border-bottom-right-radius: 8px;
          border-bottom-left-radius: 8px;
        "
      >
        <div class="tx-bold" style="width: 75%">
          <e-img-name
            :src="require('@/assets/images/profile.jpg')"
            name="Katherine Carlx"
            class="mg-y-30"
          />
        </div>
        <div class="d-flex justify-content-between wd-100p">
          <div class="text-sm-muted">
            Class Rep
            <div class="drawer-heading__1">Class 3A</div>
          </div>
          <div class="text-sm-muted">
            Reports
            <div class="drawer-heading__1">28</div>
          </div>
          <div class="text-sm-muted">
            Performance
            <div class="drawer-heading__1">Excellence</div>
          </div>
        </div>
      </div>
      <div class="pd-x-30 pd-10 pd-b-30 sb-section__2" style="background:#E6EAED">
        <div class="tx-bold">Allocation</div>
        <el-card
          class="mg-b-20 mg-t-10 rounded-08 tx-bold"
          v-for="(d, i) in 3"
          :key="i"
        >
          <div class="d-flex justify-content-between">
            <div>Class 3A</div>
            <div class="" style="color:rgba(0,0,0,0.6)">Science</div>
          </div>
        </el-card>
        <div class="tx-bold mg-y-10">Grade progress</div>
        <div class="d-flex justify-content-between bg-white rounded-08 pd-10">
          <drawer-chart />
          <div class="wd-60p-f mg-y-30 mg-x-20">
            <div>
              Best Performer
              <div class="tx-bold">7A</div>
            </div>
            <div class="mg-y-20">
              Weak Performer
              <div class="tx-bold">4A</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </right-side-bar>
</template>

<script>
import EImgName from "@/controls/table/eImgName.vue";
import RightSideBar from "../../sideBar.vue";
import DrawerChart from "./DrawerChart.vue";
export default {
  components: { EImgName, RightSideBar, DrawerChart },
  props: {
    show: { type: Boolean, default: false },
    __onCancel: Function,
  },
  data() {
    return {
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

<style>
.drawer-heading__1{
  font-size: 16px;
  font-weight: bold;
}
.el-drawer__body {
  /* height: 100%;
		overflow-y: auto; */
}
.sb-section__2 {
  height: 400px;
  overflow-y: scroll;
  padding-bottom: 200px;
}
@media screen and (min-height: 1000px) {
  .sb-section__2 {
    height: 600px;
  }
}
</style>