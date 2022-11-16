<template>
  <div>
    <e-container pageTitle="Report">
      <el-tabs class="floatTabHeader" v-model="activeName">
        <el-tab-pane label="Genrated" name="genrated">
          <el-row class="mt-10" :span="24">
            <el-col :span="4" class="exams-color">5 exams</el-col>
            <el-col class="float-right" :span="2">
              <e-button
                class="mt-5"
                size="mini"
                icon="el-icon-sort"
                :plain="true"
                type="primary"
              ></e-button>
            </el-col>
            <el-col class="float-right" :span="3">
              <e-dropdown :list="filterSubject" primary />
            </el-col>
            <el-col class="float-right" :span="3">
              <e-dropdown :list="filterStandard" primary />
            </el-col>
          </el-row>

          <el-row style="flex" justify="center">
            <genrated-card
              v-for="i in 5"
              :key="i"
              @__clicked="showRightSideBar = !showRightSideBar"
            />
            <!-- @__clicked="$go($url.SH_REPORT_DETAIL)" -->
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="Signed" name="signed"> </el-tab-pane>
      </el-tabs>
    </e-container>
    <report-detail-drawer
      :show="showRightSideBar"
      :__onClose="()=>(showRightSideBar = !showRightSideBar)"
    />
  </div>
</template>

<script>
import ReportDetailDrawer from "@/components/school/ReportCard/ReportDetailDrawer.vue";
export default {
  components: {
    GenratedCard: () =>
      import("@/components/school/ReportCard/GenratedCard.vue"),
    ReportDetailDrawer,
  },
  data() {
    return {
      showRightSideBar: false,
      activeName: "genrated",
      filterStandard: [
        { text: "Standard" },
        { text: "XII" },
        { text: "XI" },
        { text: "X" },
      ],
      filterSubject: [{ text: "Subject" }, { text: "ECE" }, { text: "CSE" }],
    };
  },
};
</script>

<style scoped>

.mt-10 {
  margin-top: 10px;
}
.exams-color {
  color: #000000;
  font-weight: 550;
}
.mt-5 {
  margin-top: -5px;
}
</style>
