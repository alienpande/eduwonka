<template>
  <div class="grade-center" style="overflow: auto; height: 80vh">
    <el-row style="display: flex; padding: 15px">
      <el-col :span="19" style="display: flex">
        <e-svg @click="$router.push($url.LN_COURSES)" icon="back"></e-svg>
        <div
          style="
            color: #11141a;
            font-weight: 500;
            font-size: 24px;
            opacity: 0.8;
            margin-top: 7px;
            margin-left: 20px;
          "
        >
          Grade Center
        </div>
      </el-col>
      <el-col :span="3">
        <div
          style="
            display: flex;
            border: 1px solid rgb(188, 108, 66);
            padding: 4px 9px;
            border-radius: 6px;
            margin-top: 10px;
            cursor: pointer;
            width: 170px;
          "
        >
          <img src="@/assets/images/seeschedule.png" alt="" />
          <span
            style="
              color: #bc6c42;
              margin-top: 2px;
              margin-left: 6px;
              font-weight: 500;
            "
            >Upcoming exam</span
          >
        </div>
      </el-col>
    </el-row>
    <div class="class-info" style="padding-left: 84px">
      <div
        style="
          background: white;
          display: inline-block;
          padding: 11px 22px;
          border-radius: 10px;
          color: rgb(0 0 0 / 60%);
          font-size: 16px;
          margin-right: 10px;
   /     "
      >
        Class 6A
      </div>
      <div
        style="
          background: white;
          display: inline-block;
          padding: 11px 22px;
          border-radius: 10px;
          color: rgb(0 0 0 / 60%);
          font-size: 16px;
          margin-right: 10px;
        "
      >
        Mathematics
      </div>
    </div>

    <div style="margin-top: 88px; margin-left: 79px">
      <el-tabs class="floatTabHeader" v-model="activeName">
        <el-tab-pane label="Active" name="activeGrade">
            <div class="f-500 fs-20" style="opacity: 0.8;">5 Answer sheets</div>
            <el-row style="margin-top:20px">
                <el-col :span="10" v-for="i in 5 " :key="i" style="margin-right:20px;margin-bottom:20px">
                 <el-card
                shadow="none"
                style="padding: 8px"
                class="rounded-08 pg-50 cp "
              >
                <div>
                  <div
                    style="
                      font-size: 20px;
                      width: 233px;
                      font-weight: 600;
                      opacity: 0.8;
                    "
                  >
                    Lorem ipsum dolor sit 
                  </div>
                  <div
                    style="
                     height:1px;width:100%;
                     background:#FCDFBD;
                     margin:13px 0;
                    "
                  >
                  </div>
                  <el-row>
                    <el-col :span="12">
                      <div style="font-weight: 300; opacity: 0.8">
                        Submitted
                      </div>
                      <div
                        style="
                          font-weight: 500;
                          font-size: 20px;
                          opacity: 0.8;
                          margin-top: 10px;
                        "
                      >
                        22/25
                      </div>
                    </el-col>
                    <el-col :span="9">
                      <div style="font-weight: 300; opacity: 0.8">
                     Grading status
                      </div>
                      <div
                        style="
                          font-weight: 500;
                          font-size: 20px;
                          opacity: 0.8;
                          margin-top: 10px;
                        "
                      >
                        8 Checked
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </el-col>
            </el-row>
             </el-tab-pane>
        <el-tab-pane label="Completed" name="CompletedGrade">d </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    activeName: "activeGrade",
  }),
};
</script>
<style >
 .grade-center .floatTabHeader.el-tabs.el-tabs--top > .el-tabs__header {
  position: inherit !important;
}
</style>
