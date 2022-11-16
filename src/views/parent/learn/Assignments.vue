<template>
  <div>
    <e-container
      pageTitle="Assignment"
      btnIcon="el-icon-plus"
      btnText="Add Assignment"
      @btnClick="$router.push($url.LN_ASSIGNMENTS_CREATE)"
    >
      <el-tabs class="floatTabHeader" v-model="activeName">
        <el-tab-pane label="Active" name="activeAssign">
          <el-row :gutter="20">
            <el-col
              :span="6"
              style="font-size: 20px; color: #4d4f5c; font-weight: 500"
            >
              10 assignments
            </el-col>
            <el-col :span="4"></el-col>

            <el-col :span="1" :offset="15">
              <e-button
                icon="el-icon-sort"
                css="sort-icon bg-transparent"
                :plain="true"
                type="primary"
              ></e-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10" v-for="i in 5" :key="i" style="margin-right:30px;margin-bottom:20px">
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
                   Simple calculations assignment
                  </div>
                  <div
                    style="
                      font-size: 20px;
                      opacity: 0.8;
                      font-weight: 500;
                      padding: 18px 0;
                    "
                  >
                    <!-- <span style="font-weight: 300">by</span> Shawn Fernando -->
                    <e-progress percentage="40"></e-progress>
                  </div>
                  <el-row>
                    <el-col :span="10">
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
                        Due Date
                      </div>
                      <div
                        style="
                          font-weight: 500;
                          font-size: 20px;
                          opacity: 0.8;
                          margin-top: 10px;
                        "
                      >
                       14th June
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <assign-right-bar
            :show="showSideBar"
            :__onCancel="() => (showSideBar = !showSideBar)"
          />
        </el-tab-pane>
        <el-tab-pane label="Upcoming" name="upcomingASsign">
          
            <el-row :gutter="20">
            <el-col
              :span="6"
              style="font-size: 20px; color: #4d4f5c; font-weight: 500"
            >
              10 assignments
            </el-col>
            <el-col :span="4"></el-col>

            <el-col :span="1" :offset="15">
              <e-button
                icon="el-icon-sort"
                css="sort-icon bg-transparent"
                :plain="true"
                type="primary"
              ></e-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10" v-for="i in 5" :key="i" style="margin-right:30px;margin-bottom:20px">
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
                    <!-- <span style="font-weight: 300">by</span> Shawn Fernando -->
                    <e-progress percentage="10"></e-progress>
                  </div>
                  <el-row>
                    <el-col :span="12">
                      <div style="font-weight: 300; opacity: 0.8">
                        Students
                      </div>
                      <div
                        style="
                          font-weight: 500;
                          font-size: 20px;
                          opacity: 0.8;
                          margin-top: 10px;
                        "
                      >
                        25
                      </div>
                    </el-col>
                    <el-col :span="9">
                      <div style="font-weight: 300; opacity: 0.8">
                        Assignment Date
                      </div>
                      <div
                        style="
                          font-weight: 500;
                          font-size: 20px;
                          opacity: 0.8;
                          margin-top: 10px;
                        "
                      >
                       14th June
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <assign-right-bar
            :show="showSideBar"
            :__onCancel="() => (showSideBar = !showSideBar)"
          />
           </el-tab-pane>
        <el-tab-pane label="Completed" name="completeAssign">
          
           <el-row :gutter="20">
            <el-col
              :span="6"
              style="font-size: 20px; color: #4d4f5c; font-weight: 500"
            >
              10 assignments
            </el-col>
            <el-col :span="4"></el-col>

            <el-col :span="1" :offset="15">
              <e-button
                icon="el-icon-sort"
                css="sort-icon bg-transparent"
                :plain="true"
                type="primary"
              ></e-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10" v-for="i in 5" :key="i" style="margin-right:30px;margin-bottom:20px">
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
                    <!-- <span style="font-weight: 300">by</span> Shawn Fernando -->
                    <e-progress percentage="100"></e-progress>
                  </div>
                  <el-row>
                    <el-col :span="12">
                      <div style="font-weight: 300; opacity: 0.8">
                        Students
                      </div>
                      <div
                        style="
                          font-weight: 500;
                          font-size: 20px;
                          opacity: 0.8;
                          margin-top: 10px;
                        "
                      >
                        25
                      </div>
                    </el-col>
                    <el-col :span="9">
                      <div style="font-weight: 300; opacity: 0.8">
                        Assignment Date
                      </div>
                      <div
                        style="
                          font-weight: 500;
                          font-size: 20px;
                          opacity: 0.8;
                          margin-top: 10px;
                        "
                      >
                       14th June
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <assign-right-bar
            :show="showSideBar"
            :__onCancel="() => (showSideBar = !showSideBar)"
          />
           </el-tab-pane>
      </el-tabs>
    </e-container>
  </div>
</template>

<script>
import assignRightBar from '@/components/learn/assaignRightBar.vue'
export default {
  components:{assignRightBar},
  data: () => ({
    activeName: "activeAssign",
    showSideBar:false,
  }),

};
</script>
<style>
.sort-icon {
  background: transparent !important;
}
.sort-icon:hover {
  background: #bc6c42 !important;
}
</style>
