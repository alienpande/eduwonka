<template>
  <div>
    <e-container
      pageTitle="Classroom"
      btnIcon="el-icon-plus"
      btnText="Add Classroom"
      @btnClick="addNewEmployees"
    >
      <el-tabs class="floatTabHeader" v-model="activeName">
        <el-tab-pane label="Active" name="activeclassroom">
          <el-row> </el-row>
          <el-row
            v-if="filter.length > 0"
            :gutter="20"
            style="padding: 0px 0px 0px 0px; margin: 0px 0px 5px 0px"
          >
            <el-col :span="6" style="font-weight: bold; font-size: 18px">
              14 classes
            </el-col>
            <el-col :span="6"></el-col>
            <el-col :span="3" style="padding-left: 35px" :offset="10">
              <e-dropdown :list="filter" primary />
            </el-col>
            <el-col :span="3" style="padding-left: 35px" class="primary-text"
              ><e-dropdown :list="filter2" primary
            /></el-col>
            <el-col style="padding-left: 10px" :span="1">
              <e-button
                icon="el-icon-search"
                :plain="true"
                css="bg-tranparent"
              ></e-button>
            </el-col>
          </el-row>

          <el-row :gutter="10">
            <el-col :span="12" class="mg-y-1" v-for="(d, i) in 4" :key="i">
              <div @click="showSideBar = true">
                <el-card shadow="none" style="margin-bottom:10px" class="rounded-08 text-center pg-50 cp">
                  <div>
                    <el-row :gutter="10">
                      <el-col :span="16">
                        <div class="heading">
                          Simple additions and calculations
                        </div>
                        <el-card
                          shadow="none"
                          style="background: #eee2d5; opacity: 0.8"
                          class="rounded-08 text-center pg-50 cp"
                        >
                          <div>
                            <el-row>
                              <el-col :span="13">
                                <span>Standard</span> <br />
                                <span
                                  style="color: rgb(0, 0, 0); font-weight: bold"
                                  >Class 3A</span
                                >
                              </el-col>
                              <el-col :span="9">
                                <span>Subject</span> <br />
                                <span
                                  style="color: rgb(0, 0, 0); font-weight: bold"
                                  >Mathematics</span
                                >
                              </el-col>
                            </el-row>
                          </div>
                        </el-card>
                      </el-col>
                      <el-col :span="6">
                        <el-avatar
                          style="border: 3px solid #bc6c42"
                          :size="98"
                          :src="require('@/assets/images/profile.jpg')"
                        />
                        <div
                          style="
                            font-weight: bold;
                            font-size: 20px;
                            opacity: 0.8;
                          "
                        >
                         <div style="margin-top:7px">
                            Rachael Kenneth
                         </div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                  <el-card
                    style="
                      background: #eee2d5;
                      text-align: start;
                      margin-top: 15px;
                    "
                    shadow="none"
                    class="rounded-08 pg-50 cp"
                  >
                    <div>
                      <el-row style="opactiy: 0.8">
                        <el-col :span="13">
                          <span
                            style="
                              color: #222222;
                              opacity: 0.8;
                              font-weight: bold;
                            "
                            >Attendance</span
                          >
                          <br />
                          <span>31/45</span>
                        </el-col>
                        <el-col :span="10">
                          <span
                            style="
                              color: #222222;
                              opacity: 0.8;
                              font-weight: bold;
                            "
                            >Time left</span
                          >
                          <br />
                          <span>15m 20s</span>
                        </el-col>
                      </el-row>
                    </div>
                  </el-card>
                </el-card>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="Upcoming" name="upcomingclassrom">
            <el-row> </el-row>
          <el-row
            v-if="filter.length > 0"
            :gutter="20"
            style="padding: 0px 0px 0px 0px; margin: 0px 0px 5px 0px"
          >
            <el-col :span="6" style="font-weight: bold; font-size: 18px">
              14 classes
            </el-col>
            <el-col :span="6"></el-col>
            <el-col :span="3" style="padding-left: 35px" :offset="10">
              <e-dropdown :list="filter" primary />
            </el-col>
            <el-col :span="3" style="padding-left: 35px" class="primary-text"
              ><e-dropdown :list="filter2" primary
            /></el-col>
            <el-col style="padding-left: 10px" :span="1">
              <e-button
                icon="el-icon-search"
                :plain="true"
                css="bg-tranparent"
              ></e-button>
            </el-col>
          </el-row>

          <el-row :gutter="10">
            <el-col :span="12" class="mg-y-1" v-for="(d, i) in 4" :key="i">
              <div @click="showSideBar = true">
                <el-card shadow="none" style="margin-bottom:10px" class="rounded-08 text-center pg-50 cp">
                  <div>
                    <el-row :gutter="10">
                      <el-col :span="16">
                        <div class="heading">
                          Simple additions and calculations
                        </div>
                        <el-card
                          shadow="none"
                          style="background: #eee2d5; opacity: 0.8"
                          class="rounded-08 text-center pg-50 cp"
                        >
                          <div>
                            <el-row>
                              <el-col :span="12">
                                <span>Standard</span> <br />
                                <span
                                  style="color: rgb(0, 0, 0); font-weight: bold"
                                  >Class 3A</span
                                >
                              </el-col>
                              <el-col :span="10">
                                <span>Subject</span> <br />
                                <span
                                  style="color: rgb(0, 0, 0); font-weight: bold"
                                  >Mathematics</span
                                >
                              </el-col>
                            </el-row>
                          </div>
                        </el-card>
                      </el-col>
                      <el-col :span="6">
                        <el-avatar
                          style="border: 3px solid #bc6c42"
                          :size="98"
                          :src="require('@/assets/images/profile.jpg')"
                        />
                        <div
                          style="
                            font-weight: bold;
                            font-size: 20px;
                            opacity: 0.8;
                          "
                        >
                         <div style="margin-top:7px">
                            Rachael Kenneth
                         </div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                  <el-card
                    style="
                      background: #eee2d5;
                      text-align: start;
                      margin-top: 15px;
                    "
                    shadow="none"
                    class="rounded-08 pg-50 cp"
                  >
                    <div>
                      <el-row style="opactiy: 0.8">
                        <el-col :span="13">
                          <span
                            style="
                              color: #222222;
                              opacity: 0.8;
                              font-weight: bold;
                            "
                            >Attendance</span
                          >
                          <br />
                          <span>31/45</span>
                        </el-col>
                        <el-col :span="10">
                          <span
                            style="
                              color: #222222;
                              opacity: 0.8;
                              font-weight: bold;
                            "
                            >Time left</span
                          >
                          <br />
                          <span>15m 20s</span>
                        </el-col>
                      </el-row>
                    </div>
                  </el-card>
                </el-card>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="Complete" name="completeClassroom">
           <el-row> </el-row>
          <el-row
            v-if="filter.length > 0"
            :gutter="20"
            style="padding: 0px 0px 0px 0px; margin: 0px 0px 5px 0px"
          >
            <el-col :span="6" style="font-weight: bold; font-size: 18px">
              14 classes
            </el-col>
            <el-col :span="6"></el-col>
            <el-col :span="3" style="padding-left: 35px" :offset="10">
              <e-dropdown :list="filter" primary />
            </el-col>
            <el-col :span="3" style="padding-left: 35px" class="primary-text"
              ><e-dropdown :list="filter2" primary
            /></el-col>
            <el-col style="padding-left: 10px" :span="1">
              <e-button
                icon="el-icon-search"
                :plain="true"
                css="bg-tranparent"
              ></e-button>
            </el-col>
          </el-row>

          <el-row :gutter="10">
            <el-col :span="12" class="mg-y-1" v-for="(d, i) in 4" :key="i">
              <div @click="showSideBar = true">
                <el-card shadow="none" style="margin-bottom:10px" class="rounded-08 text-center pg-50 cp">
                  <div>
                    <el-row :gutter="10">
                      <el-col :span="16">
                        <div class="heading">
                          Simple additions and calculations
                        </div>
                        <el-card
                          shadow="none"
                          style="background: #eee2d5; opacity: 0.8"
                          class="rounded-08 text-center pg-50 cp"
                        >
                          <div>
                            <el-row>
                              <el-col :span="12">
                                <span>Standard</span> <br />
                                <span
                                  style="color: rgb(0, 0, 0); font-weight: bold"
                                  >Class 3A</span
                                >
                              </el-col>
                              <el-col :span="10">
                                <span>Subject</span> <br />
                                <span
                                  style="color: rgb(0, 0, 0); font-weight: bold"
                                  >Mathematics</span
                                >
                              </el-col>
                            </el-row>
                          </div>
                        </el-card>
                      </el-col>
                      <el-col :span="6">
                        <el-avatar
                          style="border: 3px solid #bc6c42"
                          :size="98"
                          :src="require('@/assets/images/profile.jpg')"
                        />
                        <div
                          style="
                            font-weight: bold;
                            font-size: 20px;
                            opacity: 0.8;
                          "
                        >
                         <div style="margin-top:7px">
                            Rachael Kenneth
                         </div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                  <el-card
                    style="
                      background: #eee2d5;
                      text-align: start;
                      margin-top: 15px;
                    "
                    shadow="none"
                    class="rounded-08 pg-50 cp"
                  >
                    <div>
                      <el-row style="opactiy: 0.8">
                        <el-col :span="13">
                          <span
                            style="
                              color: #222222;
                              opacity: 0.8;
                              font-weight: bold;
                            "
                            >Attendance</span
                          >
                          <br />
                          <span>31/45</span>
                        </el-col>
                        <el-col :span="10">
                          <span
                            style="
                              color: #222222;
                              opacity: 0.8;
                              font-weight: bold;
                            "
                            >Time left</span
                          >
                          <br />
                          <span>15m 20s</span>
                        </el-col>
                      </el-row>
                    </div>
                  </el-card>
                </el-card>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </e-container>
    <school-right-slide
      :show="showSideBar"
      :__onCancel="() => (showSideBar = !showSideBar)"
    />
  </div>
</template>
<script>
import schoolRightSlide from "@/components/learn/classroomRightSlide.vue";
export default {
  components: { schoolRightSlide },
  data() {
    return {
      showSideBar: false,
      activeName: "activeclassroom",
      filter: [
        { text: "Standard" },
        { text: "Standard 2" },
        { text: "Standard 3" },
      ],
      filter2: [
        { text: "Subject" },
        { text: "Subject 1" },
        { text: "Subject 2" },
      ],
      activeEmployeesReport: [
        {
          title: "Total Employees",
          value: "60",
          icon: "hq/employees",
        },
        {
          title: "Total Boys",
          value: "30",
          icon: "hq/boy",
        },
        {
          title: "Total Girls",
          value: "30",
          icon: "hq/girl",
        },
      ],
      inActiveEmployeesReport: [
        {
          title: "Total Employees",
          value: "3",
          icon: "hq/employees",
        },
        {
          title: "Total Boys",
          value: "2",
          icon: "hq/boy",
        },
        {
          title: "Total Girls",
          value: "1",
          icon: "hq/girl",
        },
      ],
    };
  },
  methods: {
    addNewEmployees() {
      this.$router.push(this.$url.LN_CLASSROOM_FORM);
    },
    ptest(d) {
      console.log(d);
    },
  },
};
</script>
