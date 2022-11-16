<template>
  <div class="grade-center learn-grade-center" style="overflow: auto; height: 80vh">
    <el-row style="display: flex; padding: 15px" class="sm-d-c sm-items-center view-no-form">
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
      <el-col :span="3" class="sm-width-auto">
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
    <div class="class-info sm-flex sm-justify-center sm-p-x-15" style="padding-left: 84px">
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

    <div style="margin-top: 88px; margin-left: 79px" class="sm-mx-5 sm-margin-l-0 reduce-padding">
      <el-tabs class="floatTabHeader" v-model="activeName">
        <el-tab-pane label="Active" name="activeGrade">
          <div class="f-500 fs-20" style="opacity: 0.8">5 Answer sheets</div>
          <el-row style="margin-top: 20px">
            <el-col
              :span="10"
              v-for="i in 5"
              :key="i"
              style="margin-right: 20px; margin-bottom: 20px"
              class="sm-width-100"
            >
              <el-card
                shadow="none"
                style="padding: 8px"
                class="rounded-08 pg-50 cp"
              >
                <div @click="answerSheet = true">
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
                        height: 1px;
                        width: 100%;
                        background: #fcdfbd;
                        margin: 13px 0;
                      "
                    ></div>
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
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="Completed" name="CompletedGrade">d </el-tab-pane>
      </el-tabs>
    </div>
    <e-dialog
      :title="'Answer sheet grading '"
      v-model="answerSheet"
      width="70%"
      top="20vh"
      noEsc
      :gutter="20"
      hideDefaultFooter
      @cancel="answerSheet = false"
      @confirm="answerSheet = false"
    >
      <div style="margin-top: -77px; margin-left: 234px;margin-bottom:10px" class="sm-margin-t-0 sm-margin-l-0 sm-my-5">
        <div class="class-info sm-p-l-0 sm-flex sm-justify-center" style="">
          <div
            style="
              background: white;
              display: inline-block;
              padding: 11px 22px;
              border-radius: 10px;
              color: rgb(0 0 0 / 60%);
              font-size: 16px;
              margin-right: 10px;
              border: 1px solid #e6eaed;
            "
            class="sm-p-x-15"
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
              border: 1px solid #e6eaed;
            "
            class="sm-p-x-15"

          >
            Mathematics
          </div>
        </div>
      </div>

      <div>
        <e-selected :inputBar="bar" />
      </div>
      <br />
      <div style="border-top: 1px solid #fcdfbd; width: 100%">
        <br />
        <el-row>
          <el-col :span="18" class="sm-width-100" >
            <div
              style="
                border: 1px solid #fcdfbd;
                border-radius: 10px 10px 0px 0px;
                padding: 0 20px;
                height: 50vh;
                overflow: scroll;
              "
            >
              <div v-for="i in 3" :key="i">
                <div class="d-flex">
                  <div
                    style="
                      color: #000000;
                      opacity: 0.8;
                      font-size: 20px;
                      font-weight: 500;
                      width: 6rem;
                      margin-top: 30px;
                      margin-left: 10px;
                    "
                  >
                    Q{{ i }}
                  </div>
                  <div
                    class="d-flex"
                    style="
                      border: 1px solid #fcdfbd;
                      border-bottom: none;
                      padding: 10px;
                    "
                  >
                    <div style="width: 27rem; margin-right: 30px">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua ?
                      <span
                        style="
                          text-align: right;
                          margin-left: 346px;
                          font-weight: 500;
                        "
                        >5 marks</span
                      >
                    </div>

                    <div class="tool-bar-gradding">
                      <img
                        class="toolbar-img"
                        src="@/assets/images/correctIcon.png"
                        alt=""
                      />
                      <div class="tool-info">Correct</div>
                    </div>
                  </div>
                </div>
                <div class="d-flex">
                  <div
                    style="
                      color: #000000;
                      opacity: 0.8;
                      font-size: 20px;
                      font-weight: 500;
                      width: 6rem;
                      margin-top: 30px;
                      margin-left: 10px;
                    "
                  >
                    A
                  </div>
                  <div
                    class="d-flex"
                    style="
                      border: 1px solid #fcdfbd;
                      border-top: none;
                      padding: 10px;
                    "
                  >
                    <div style="width: 27rem; margin-right: 30px">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea
                    </div>

                    <div class="tool-bar-gradding" style="height: 50px">
                      <div class="tool-info" style="padding: 18px 0">
                        5 Marks
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="5" :offset="1" class="sm-width-100 sm-margin-l-0 sm-flex sm-wrap sm-justify-space-between">
            <div style="color: #4d4f5c; font-size: 16px" class="sm-width-100">Grading tool as</div>
            <div class="tool-bar-gradding sm-width-47">
              <img
                class="toolbar-img"
                src="@/assets/images/correctIcon.png"
                alt=""
              />
              <div class="tool-info">Correct</div>
            </div>
            <div class="tool-bar-gradding sm-width-47">
              <img
                class="toolbar-img"
                src="@/assets/images/wrongIcon.png"
                alt=""
              />
              <div class="tool-info">Wrong</div>
            </div>
            <div class="tool-bar-gradding sm-width-47">
              <img
                class="toolbar-img"
                src="@/assets/images/commentIcon.png"
                alt=""
              />
              <div class="tool-info">Comment</div>
            </div>
            <div class="tool-bar-gradding sm-width-47">
              <img
                class="toolbar-img"
                src="@/assets/images/addicon.png"
                alt=""
              />
              <div class="tool-info">Add Mark</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </e-dialog>
  </div>
</template>
<script>
export default {
  data: () => ({
    bar: false,
    answerSheet: false,
    activeName: "activeGrade",
  }),
};
</script>
<style>
.grade-center .floatTabHeader.el-tabs.el-tabs--top > .el-tabs__header {
  position: inherit !important;
}
.tool-bar-gradding {
  background: rgb(188 108 66 / 10%);
  border-radius: 10px;
  width: 100px;
  height: 82px;
  margin-top: 10px;
}
.tool-info {
  color: #4d4f5c;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  padding-bottom: 10px;
}
.toolbar-img {
  display: block;
  margin: auto;
  margin-bottom: 3px;
  padding-top: 15px;
}
</style>
