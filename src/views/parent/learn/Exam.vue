<template>
  <div>
    <e-container
      pageTitle="Quick test"
      btnIcon="el-icon-plus"
      btnText="Create test"
      @btnClick="addNewEmployees"
    >
      <el-tabs class="floatTabHeader" v-model="activeName">
        <el-tab-pane label="Active" name="activetest">
          <div style="display: flex; justify-content: space-between">
            <div style="font-size: 20px; opacity: 0.8; font-weight: 500">
              5 tests
            </div>
            <e-button
              class="mt-5"
              :span="2"
              css="btn-upadet"
              size="mini"
              icon="el-icon-sort"
              :plain="true"
              type="primary"
            ></e-button>
          </div>
          <el-row>
            <el-col :span="11" style="margin: 10px" v-for="i in 8" :key="i">
              <el-card
                shadow="none"
                style="padding: 8px"
                class="rounded-08 pg-50 cp hover-shadow"
              >
                <div @click="showSideBar = true">
                  <div
                    style="
                      font-size: 20px;
                      width: 233px;
                      font-weight: 600;
                      opacity: 0.8;
                    "
                  >
                    Lorem ipsum dolor sit amet consectetur
                  </div>
                  <div
                    style="
                      font-size: 20px;
                      opacity: 0.8;
                      font-weight: 500;
                      padding: 18px 0;
                    "
                  >
                    <span style="font-weight: 300">by</span> Shawn Fernando
                  </div>
                  <el-row>
                    <el-col :span="12">
                      <div style="font-weight: 300; opacity: 0.8">
                        Attendance
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
                        Time left
                      </div>
                      <div
                        style="
                          font-weight: 500;
                          font-size: 20px;
                          opacity: 0.8;
                          margin-top: 10px;
                        "
                      >
                        15m 12s
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <exam-right-slide
            :show="showSideBar"
            :__onCancel="() => (showSideBar = !showSideBar)"
          />
        </el-tab-pane>
        <el-tab-pane label="Upcoming" name="upcomingtest">
            <div style="display: flex; justify-content: space-between">
            <div style="font-size: 20px; opacity: 0.8; font-weight: 500">
              5 tests
            </div>
            <e-button
              class="mt-5"
              :span="2"
              css="btn-upadet"
              size="mini"
              icon="el-icon-sort"
              :plain="true"
              type="primary"
            ></e-button>
          </div>
          <el-row>
            <el-col :span="11" style="margin: 10px" v-for="i in 8" :key="i">
              <el-card
                shadow="none"
                style="padding: 8px"
                class="rounded-08 pg-50 cp hover-shadow"
              >
                <div @click="showSideBar = true">
                  <div
                    style="
                      font-size: 20px;
                      width: 233px;
                      font-weight: 600;
                      opacity: 0.8;
                    "
                  >
                    Lorem ipsum dolor sit amet consectetur
                  </div>
                  <div
                    style="
                      font-size: 20px;
                      opacity: 0.8;
                      font-weight: 500;
                      padding: 18px 0;
                    "
                  >
                    <span style="font-weight: 300">by</span> Shawn Fernando
                  </div>
                  <el-row>
                    <el-col :span="12">
                      <div style="font-weight: 300; opacity: 0.8">
                        Attendance
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
                        Time left
                      </div>
                      <div
                        style="
                          font-weight: 500;
                          font-size: 20px;
                          opacity: 0.8;
                          margin-top: 10px;
                        "
                      >
                        15m 12s
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <exam-right-slide
            :show="showSideBar"
            :__onCancel="() => (showSideBar = !showSideBar)"
          /> </el-tab-pane>
        <el-tab-pane label="Completed" name="completetest"> 
            <div style="display: flex; justify-content: space-between">
            <div style="font-size: 20px; opacity: 0.8; font-weight: 500">
              5 tests
            </div>
            <e-button
              class="mt-5"
              :span="2"
              css="btn-upadet"
              size="mini"
              icon="el-icon-sort"
              :plain="true"
              type="primary"
            ></e-button>
          </div>
          <el-row>
            <el-col :span="11" style="margin: 10px" v-for="i in 8" :key="i">
              <el-card
                shadow="none"
                style="padding: 8px"
                class="rounded-08 pg-50 cp hover-shadow"
              >
                <div @click="showSideBar = true">
                  <div
                    style="
                      font-size: 20px;
                      width: 233px;
                      font-weight: 600;
                      opacity: 0.8;
                    "
                  >
                    Lorem ipsum dolor sit amet consectetur
                  </div>
                  <div
                    style="
                      font-size: 20px;
                      opacity: 0.8;
                      font-weight: 500;
                      padding: 18px 0;
                    "
                  >
                    <span style="font-weight: 300">by</span> Shawn Fernando
                  </div>
                  <el-row>
                    <el-col :span="12">
                      <div style="font-weight: 300; opacity: 0.8">
                        Attendance
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
                        Time left
                      </div>
                      <div
                        style="
                          font-weight: 500;
                          font-size: 20px;
                          opacity: 0.8;
                          margin-top: 10px;
                        "
                      >
                        15m 12s
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <exam-right-slide
            :show="showSideBar"
            :__onCancel="() => (showSideBar = !showSideBar)"
          />
        </el-tab-pane>
      </el-tabs>
    </e-container>
  </div>
</template>
<script>
import examRightSlide from "@/components/learn/exam/examRightSlide.vue";

export default {
  components: { examRightSlide },
  data: () => ({
    activeName: "activetest",
    showSideBar: false,
  }),
  methods: {
    addNewEmployees() {
      this.$router.push(this.$url.LN_EXAM_FORM);
    },
  },
};
</script>
<style>
.hover-shadow:hover {
  box-shadow: 0px 3px 15px #00000026 !important;
  border: 1px solid #bc6c42 !important;
}
.btn-upadet {
  background: transparent !important;
}
.btn-upadet:hover {
  background: #c2784e !important;
}
</style>
