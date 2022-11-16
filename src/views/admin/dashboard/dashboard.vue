<template>
  <div
    class="dash admin-main-dash"
    style="padding: 30px; overflow: auto; height: 72vh; width: 90vw"
  >
    <!-- Academics -->
    <el-row>
      <div style="display: flex; justify-content: space-between">
        <div class="main-title">Academics</div>
        <e-select
          class="select-dropdown"
          :span="3"
          :options="[]"
          placeholder="This Week"
        ></e-select>
      </div>
      <br />
      <br />
      <div>
        <el-row>
          <el-col :span="10">
            <card title="Student Overview">
              <div style="display: flex; justify-content: space-between">
                <div style="color: #000000cc; font-size: 16px">Total Students</div>
                <e-dropdown :list="filter" primary />
              </div>
              <el-row>
                <el-col :span="13">
                  <e-donut-chart />
                </el-col>
                <el-col :span="11">
                  <br />
                  <br />
                  <br />
                  <div>
                    <div
                      style="
                        color: #00000099;
                        font-size: 16px;
                        display: inline-block;
                        width: 9.2rem;
                      "
                    >
                      Total Students
                    </div>
                    <div
                      style="
                        font-size: 16px;
                        color: #000000cc;
                        display: inline-block;
                      "
                    >
                      100
                    </div>
                  </div>

                  <div>
                    <div
                      class="dot-color"
                      style="background: #bc6c42; margin-top: 10px"
                    ></div>
                    <div
                      style="
                        color: #00000099;
                        font-size: 16px;
                        display: inline-block;
                        width: 8rem;
                      "
                    >
                      Total Boys
                    </div>
                    <div
                      style="
                        font-size: 16px;
                        color: #000000cc;
                        display: inline-block;
                      "
                    >
                      60
                    </div>
                  </div>

                  <div>
                    <div
                      class="dot-color"
                      style="background: #fcdfbd; margin-top: 10px"
                    ></div>
                    <div
                      style="
                        color: #00000099;
                        font-size: 16px;
                        display: inline-block;
                        width: 8rem;
                      "
                    >
                      Total Girls
                    </div>
                    <div
                      style="
                        font-size: 16px;
                        color: #000000cc;
                        display: inline-block;
                      "
                    >
                      40
                    </div>
                  </div>
                </el-col>
              </el-row>
            </card>
          </el-col>
          <el-col :span="6" :offset="1">
            <card title="School">
              <el-row>
                <el-col :span="12">
                  <div style="opacity: 0.8; font-weight: 500">Exam</div>
                  <div
                    style="opacity: 0.8; font-size: 16px; font-weight: 500"
                  >
                    32 Ongoing
                  </div>
                </el-col>
                <el-col :span="12">
                  <div style="opacity: 0.8; font-weight: 500">
                    Report card
                  </div>
                  <div
                    style="opacity: 0.8; font-size: 16px; font-weight: 500"
                  >
                    14 Generated
                  </div>
                </el-col>
                <el-col :span="12" style="margin-top: 20px">
                  <div style="opacity: 0.8; font-weight: 500">
                    Performance
                  </div>
                  <div
                    style="
                      opacity: 0.8;
                      font-size: 16px;
                      font-weight: 500;
                      color: #0bc32e;
                      display: flex;
                    "
                  >
                    <img src="@/assets/images/improves.png" alt="" />
                    <div style="margin-top: 4px">18 % improved</div>
                  </div>
                </el-col>
                <el-col :span="12" style="margin-top: 20px">
                  <e-button
                    css="sort-icon"
                    :plain="true"
                    label="View School"
                  ></e-button>
                </el-col>
              </el-row>
            </card>
          </el-col>
          <el-col :span="6" :offset="1">
            <card title="Learn">
              <el-row>
                <el-col :span="12">
                  <div style="opacity: 0.8; font-weight: 500">Test</div>
                  <div
                    style="opacity: 0.8; font-size: 16px; font-weight: 500"
                  >
                    32 Ongoing
                  </div>
                </el-col>
                <el-col :span="12">
                  <div style="opacity: 0.8; font-weight: 500">Syllabus</div>
                  <div
                    style="opacity: 0.8; font-size: 16px; font-weight: 500"
                  >
                    32 Ongoing
                  </div>
                </el-col>
                <el-col :span="12" style="margin-top: 20px">
                  <div style="opacity: 0.8; font-weight: 500">Assignment</div>
                  <div
                    style="opacity: 0.8; font-size: 16px; font-weight: 500"
                  >
                    32 Ongoing
                  </div>
                </el-col>
                <el-col :span="12" style="margin-top: 20px">
                  <e-button
                    css="sort-icon"
                    :plain="true"
                    label="View Learn"
                  ></e-button>
                </el-col>
              </el-row>
            </card>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <card title="Skills">
              <el-row>
                <el-col style="height: 7rem" :span="11">
                  <GChart
                    type="PieChart"
                    :data="pieChartData"
                    :options="pieChartOptions"
                    class="z-index--1"
                  />
                </el-col>
                <el-col :span="11">
                  <div
                    style="
                      opacity: 0.8;
                      font-size: 16px;
                      font-weight: 500;
                      margin-left: 20px;
                    "
                  >
                    Performance
                  </div>
                  <br />
                  <div style="display: flex; justify-content: space-around">
                    <div style="display: flex">
                      <span
                        style="
                          width: 8px;
                          height: 8px;
                          background: #fe6780;
                          display: inline-block;
                          margin-top: 6px;
                          margin-right: 7px;
                        "
                      ></span>
                      <span
                        style="color: #11141a; font-size: 12px; font-weight: 300"
                        >Excellent</span
                      >
                    </div>
                    <div style="display: flex">
                      <span
                        style="
                          width: 8px;
                          height: 8px;
                          background: #fe59b3;
                          display: inline-block;
                          margin-top: 6px;
                          margin-right: 7px;
                        "
                      ></span>
                      <span
                        style="color: #11141a; font-size: 12px; font-weight: 300"
                        >Good</span
                      >
                    </div>
                  </div>

                  <div
                    style="
                      display: flex;
                      justify-content: space-around;
                      margin-top: 5px;
                    "
                  >
                    <div style="display: flex">
                      <span
                        style="
                          width: 8px;
                          height: 8px;
                          background: #f9ae58;
                          display: inline-block;
                          margin-top: 6px;
                          margin-right: 7px;
                        "
                      ></span>
                      <span
                        style="color: #11141a; font-size: 12px; font-weight: 300"
                        >Average</span
                      >
                    </div>
                    <div style="display: flex">
                      <span
                        style="
                          width: 8px;
                          height: 8px;
                          background: #6358f4;
                          display: inline-block;
                          margin-top: 6px;
                          margin-right: 7px;
                        "
                      ></span>
                      <span
                        style="color: #11141a; font-size: 12px; font-weight: 300"
                        >Poor</span
                      >
                    </div>
                  </div>
                </el-col>
              </el-row>

              <el-row style="border-top: 1px solid #e6eaed; padding: 9px 0">
                <el-col style="height: 7rem; overflow: hidden" :span="11">
                  <GChart
                    type="PieChart"
                    :data="pieChartData"
                    :options="pieChartOptions"
                    class="z-index--1"
                  />
                </el-col>
                <el-col :span="11">
                  <div
                    style="
                      opacity: 0.8;
                      font-size: 16px;
                      font-weight: 500;
                      margin-left: 20px;
                    "
                  >
                    Skill types
                  </div>
                  <br />
                  <div style="display: flex; justify-content: space-around">
                    <div style="display: flex">
                      <span
                        style="
                          width: 8px;
                          height: 8px;
                          background: #fe6780;
                          display: inline-block;
                          margin-top: 6px;
                          margin-right: 7px;
                        "
                      ></span>
                      <span
                        style="color: #11141a; font-size: 12px; font-weight: 300"
                        >Dance</span
                      >
                    </div>
                    <div style="display: flex">
                      <span
                        style="
                          width: 8px;
                          height: 8px;
                          background: #fe59b3;
                          display: inline-block;
                          margin-top: 6px;
                          margin-right: 7px;
                        "
                      ></span>
                      <span
                        style="color: #11141a; font-size: 12px; font-weight: 300"
                        >Music</span
                      >
                    </div>
                  </div>

                  <div
                    style="
                      display: flex;
                      justify-content: space-around;
                      margin-top: 5px;
                    "
                  >
                    <div style="display: flex">
                      <span
                        style="
                          width: 8px;
                          height: 8px;
                          background: #f9ae58;
                          display: inline-block;
                          margin-top: 6px;
                          margin-right: 7px;
                        "
                      ></span>
                      <span
                        style="color: #11141a; font-size: 12px; font-weight: 300"
                        >Gaming</span
                      >
                    </div>
                    <div style="display: flex">
                      <span
                        style="
                          width: 8px;
                          height: 8px;
                          background: #6358f4;
                          display: inline-block;
                          margin-top: 6px;
                          margin-right: 7px;
                        "
                      ></span>
                      <span
                        style="color: #11141a; font-size: 12px; font-weight: 300"
                        >Arts</span
                      >
                    </div>
                  </div>
                </el-col>
              </el-row>
            </card>
          </el-col>
          <el-col :span="15" :offset="1">
            <card title="Skill Report">
              <VueSlickCarousel v-bind="settings2" :arrows="false" :dots="true">
                <div v-for="i in 5" :key="i">
                  <el-col class="skill-report-border" :span="22" :offset="1">
                    <br />
                    <div class="d-flex">
                      <e-svg class="pl-10" icon="Salsa"></e-svg>
                      <div class="dance-text">Dance</div>
                    </div>
                    <br />
                    <el-row>
                      <el-col :span="8" :offset="3">
                        <div class="skill-courosle-title">Students</div>
                        <div class="skill-courosle-title">15</div>
                      </el-col>
                      <el-col :span="13">
                        <div class="skill-courosle-title">Sessions taken</div>
                        <div class="skill-courosle-title">7</div>
                      </el-col>
                    </el-row>
                    <div class="footer-skill-test">
                      <div class="perform-text-skill">Performance</div>
                      <div class="pl-10 d-flex">
                        <img
                          class="image-perform-up"
                          src="@/assets/images/performup.png"
                          alt=""
                        />
                        <div class="perform-texts">
                          18 % improved <br />
                          from last week
                        </div>
                      </div>
                    </div>
                  </el-col>
                </div>
              </VueSlickCarousel>
            </card>
          </el-col>
        </el-row>
      </div>
    </el-row>
    <br /><br />
    <!-- Communication -->
    <el-row>
      <div style="display: flex; justify-content: space-between">
        <div class="main-title">Communication</div>
        <e-select
          class="select-dropdown"
          :span="3"
          :options="[]"
          placeholder="This Week"
        ></e-select>
      </div>
      <br /><br />
      <div>
        <el-row>
          <el-col :span="11">
            <card :padding="true" title="Upcoming Appointments">
              <div style="padding-right: 30px; height: 24rem; overflow: auto">
                <div
                  v-for="i in 10"
                  :key="i"
                  style="
                    opacity: 0.8;
                    font-weight: 500;
                    border: 1px solid #e6eaed;
                    padding: 15px 20px 15px 20px;
                  "
                >
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  nonumy eirmod tempor
                </div>
              </div>
            </card>
          </el-col>
          <el-col :span="10" :offset="2">
            <div
              style="
                display: flex;
                margin-bottom: 10px;
                justify-content: space-between;
              "
            >
              <div class="head-title">Messaging</div>
              <img
                style="margin-top: 10px"
                src="@/assets/images/rightArrowCircile.png"
                alt=""
              />
            </div>
            <br />
            <div style="border-radius: 10px; background: white">
              <div
                style="
                  border-radius: 10px 10px 0px 0px;
                  color: #bc6c42;
                  font-size: 18px;
                  font-weight: 600;
                  background: #e6eaed;
                  padding: 25px 21px;
                "
              ></div>
              <el-tabs
                style="margin-top: 24px; margin-left: 25px"
                class="floatTabHeader"
                v-model="activeName"
              >
                <el-tab-pane
                  label="Messages"
                  name="catagory1"
                  style="height: 25rem; overflow: scroll"
                >
                  <div
                    v-for="i in 6"
                    :key="i"
                    style="
                      border: 1px solid #e6eaed;
                      border-radius: 10px;
                      width: 510px;
                      height: 137px;
                      display: flex;
                      margin-bottom: 15px;
                    "
                  >
                    <el-avatar
                      style="margin: 15px"
                      :size="98"
                      :src="require('@/assets/images/profile.jpg')"
                    />
                    <div style="width: 7rem; margin-left: 10px; margin-top: 10px">
                      <div
                        style="
                          opacity: 0.8;
                          font-size: 16px;
                          font-weight: 500;
                          margin-bottom: 20px;
                        "
                      >
                        Marina Campbell
                      </div>
                      <div
                        style="
                          text-align: center;
                          border-radius: 18px;
                          background: rgb(188, 108, 66);
                          color: white;
                          font-size: 10px;
                        "
                      >
                        Teaching Staff
                      </div>
                    </div>
                    <div style="margin-left: 30px; margin-top: 15px">
                      <div class="d-flex">
                        <div
                          style="
                            background: #0bc32e;
                            color: white;
                            border-radius: 50%;
                            height: 20px;
                            width: 20px;
                            text-align: center;
                          "
                        >
                          4
                        </div>
                        <div
                          style="color: #0bc32e; font-size: 12px; margin-left: 5px"
                        >
                          You have 4 unread messages
                        </div>
                      </div>
                      <br />
                      <e-button
                        label="View Message"
                        css="sort-icon"
                        :plain="true"
                      ></e-button>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="Channel" name="catagory2"> s </el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <div
              style="
                display: flex;
                margin-bottom: 10px;
                justify-content: space-between;
              "
            >
              <div class="head-title">Knowledge updates</div>
              <img
                style="margin-top: 10px"
                src="@/assets/images/rightArrowCircile.png"
                alt=""
              />
            </div>
            <br />

            <el-card shadow="none" class="knowldge-update">
              <div style="padding-right: 30px; height: 29rem; overflow: auto">
                <div
                  v-for="i in 10"
                  :key="i"
                  style="
                    opacity: 0.8;
                    font-weight: 500;
                    border: 1px solid #e6eaed;
                    padding: 15px 20px 15px 20px;
                  "
                >
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                  nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
                  erat, sed diam voluptua
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-row>
    <br /><br />
    <!-- Library -->
    <el-row>
      <div style="display: flex; justify-content: space-between">
        <div class="main-title">Library</div>
        <e-select
          class="select-dropdown"
          :span="3"
          :options="[]"
          placeholder="This Week"
        ></e-select>
      </div>
      <br /><br />
      <div>
        <el-row>
          <el-col :span="12">
            <div
              style="
                display: flex;
                margin-bottom: 10px;
                justify-content: space-between;
              "
            >
              <div class="head-title">Library Highlights</div>
              <img
                style="margin-top: 10px"
                src="@/assets/images/rightArrowCircile.png"
                alt=""
              />
            </div>

            <br />
            <card title="Due date Alerts">
              <div style="color: #000000cc; opacity: 0.8; font-size: 16px">
                Issued books reaching due date this week (10)
              </div>
              <br/>
              <br/>
              <VueSlickCarousel v-bind="settings2" :arrows="false" :dots="true">
                <div v-for="i in 5" :key="i">
                  <el-card shadow="none" class="card-issued-book">
                    <el-col :span="6">
                      <img class="issue-book" src="@/assets/images/book.png" alt="" />
                    </el-col>
                    <el-col :span="15" :offset="2">
                      <el-row>
                        <el-col >
                          <div class="fs-16 f-500 color-cc">Introduction to AI</div>
                          <div class="issue-book-des">By Phillip C Jackson Jr.</div>
                          <br/>
                            <div class="fs-16 f-500 color-cc">ISBN Number</div>
                          <div class="issue-book-des">1231292931</div>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-card>
                  <div class="d-flex des-footer">
                    <div>
                      <div class="des-footer-title">User Name</div>
                      <div class="des-footer-info">Mohan Das</div>
                    </div>
                    <div class="pl-10">
                      <div class="des-footer-title">Due Date</div>
                      <div class="des-footer-info">18/01/2020</div>
                    </div>
                  </div>
                </div>
              </VueSlickCarousel>
              <br/><br/>
            </card>
          </el-col>
          <el-col :span="8" :offset="2">
            <div
              style="
                display: flex;
                margin-bottom: 10px;
                justify-content: space-between;
              "
            >
              <div class="head-title">Digital Library Highlights</div>
              <img
                style="margin-top: 10px"
                src="@/assets/images/rightArrowCircile.png"
                alt=""
              />
            </div>

            <br />
            <card title="Digital Hub">
              <el-row>
                <el-col :span="13">
                  <e-donut-chart />
                </el-col>
                <el-col :span="11">
                  <br />
                  <br />
                  <br />
                  <div>
                    <div
                      style="
                        color: #00000099;
                        font-size: 16px;
                        display: inline-block;
                        width: 8rem;
                      "
                    >
                      Total Space
                    </div>
                    <div
                      style="
                        font-size: 16px;
                        color: #000000cc;
                        display: inline-block;
                      "
                    >
                      50 GB
                    </div>
                  </div>

                  <div>
                    <div
                      class="dot-color"
                      style="background: #bc6c42; margin-top: 10px"
                    ></div>
                    <div
                      style="
                        color: #00000099;
                        font-size: 16px;
                        display: inline-block;
                        width: 8rem;
                      "
                    >
                      Occupied
                    </div>
                    <div
                      style="
                        font-size: 16px;
                        color: #000000cc;
                        display: inline-block;
                      "
                    >
                      60 GB
                    </div>
                  </div>

                  <div>
                    <div
                      class="dot-color"
                      style="background: #fcdfbd; margin-top: 10px"
                    ></div>
                    <div
                      style="
                        color: #00000099;
                        font-size: 16px;
                        display: inline-block;
                        width: 8rem;
                      "
                    >
                      Available
                    </div>
                    <div
                      style="
                        font-size: 16px;
                        color: #000000cc;
                        display: inline-block;
                      "
                    >
                      40 GB
                    </div>
                  </div>
                </el-col>
              </el-row>
              <div style="border-top: 1px solid #e6eaed"></div>
              <div style="margin-left: 30px">
                <div
                  style="color: #000000cc; margin-top: 15px; margin-bottom: 25px"
                  class="fs-16 f-500"
                >
                  Files Shared recently
                </div>
                <div class="d-flex">
                  <e-svg icon="google-docs"></e-svg>
                  <div
                    style="color: #00000099; font-weight: 300; margin-left: 10px"
                  >
                    Abc.doc shared by Nusrat on Date
                  </div>
                </div>

                <div class="d-flex" style="margin-top: 15px">
                  <e-svg icon="google-docs"></e-svg>
                  <div
                    style="color: #00000099; font-weight: 300; margin-left: 10px"
                  >
                    Abc.doc shared by Nusrat on Date
                  </div>
                </div>
                <br />
                <e-button label="View Complete List"></e-button>
                <br />
                <br />
              </div>
            </card>
          </el-col>
        </el-row>
      </div>
    </el-row>
    <br /><br />
    <!-- Administration -->
    <el-row>
      <div style="display: flex; justify-content: space-between">
        <div class="main-title">Administration</div>
        <e-select
          class="select-dropdown"
          :span="3"
          :options="[]"
          placeholder="This Week"
        ></e-select>
      </div>
      <br /><br />
      <div style="">
        <el-row>
          <el-col :span="11">
            <card title="Finance">
              <el-row>
                <el-col :span="12">
                  <div style="color: #00000099">Total Fee (INR)</div>
                  <div
                    style="
                      color: #000000cc;
                      font-size: 16px;
                      font-weight: 500;
                    "
                  >
                    28,345
                  </div>
                </el-col>
                <el-col :span="12">
                  <div style="color: #00000099">Total collected (INR)</div>
                  <div
                    style="
                      color: #000000cc;
                      font-size: 16px;
                      font-weight: 500;
                    "
                  >
                    28,345
                  </div>
                </el-col>

                <el-col style="margin-top: 20px" :span="12">
                  <div style="color: #00000099">Total due (INR)</div>
                  <div
                    style="
                      color: #000000cc;
                      font-size: 16px;
                      font-weight: 500;
                    "
                  >
                    28,345
                  </div>
                </el-col>
                <el-col style="margin-top: 20px" :span="12">
                  <e-button
                    css="sort-icon"
                    :plain="true"
                    label="View Finance"
                  ></e-button>
                </el-col>
              </el-row>
            </card>
          </el-col>
          <el-col :span="10" :offset="2">
            <div
              style="
                display: flex;
                margin-bottom: 10px;
                justify-content: space-between;
              "
            >
              <div class="head-title">Enquiries</div>
              <img
                style="margin-top: 10px"
                src="@/assets/images/rightArrowCircile.png"
                alt=""
              />
            </div>
            <br />
            <card title="Alerts">
              <br />
              <div
                style="width: 120px; display: inline-block; margin: 0 30px"
                v-for="i in 3"
                :key="i"
              >
                <div
                  style="
                    width: 118px;
                    height: 118px;
                    border-radius: 10px;
                    font-size: 70px;
                    font-weight: bold;
                    background: #bc6c424d;
                    text-align: center;
                    color: #bc6c42;
                  "
                >
                  4
                </div>
                <div style="color: #bc6c42; margin-top: 10px; text-align: center">
                  New Enquiries
                </div>
              </div>
              <br /><br />
              <div
                class="d-flex"
                style="width: 87%; margin: auto; margin-top: 13px"
              >
                <e-svg icon="Group"></e-svg>
                <div style="opacity: 0.4; font-size: 10px; margin-left: 10px">
                  You will be taken to the lists of Enquiries and Leave Application,
                  once you click on the respective Squares
                </div>
              </div>
            </card>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <div
              style="
                display: flex;
                margin-bottom: 10px;
                justify-content: space-between;
              "
            >
              <div class="head-title">Leaves</div>
              <img
                style="margin-top: 10px"
                src="@/assets/images/rightArrowCircile.png"
                alt=""
              />
            </div>
            <br />
            <el-card shadow="none">
              <div
                style="display: inline-block; width: 10rem; margin-left: 15px"
                v-for="(apoint, i) in appointment"
                :key="i"
              >
                <div style="opacity: 0.8; font-weight: 500">{{ apoint.title }}</div>
                <div
                  style="
                    opacity: 0.8;
                    font-weight: 500;
                    font-size: 22px;
                    margin-top: 15px;
                  "
                >
                  {{ apoint.num }}
                </div>
              </div>
              <br /><br />
              <br />
              <div class="d-flex">
                <e-button label="View Leaves" :span="10"></e-button>
                <div style="opacity: 0.6; margin-left: 20px">
                  You will be taken to a new tab of the Leave section
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="10" :offset="2">
            <div
              style="
                display: flex;
                margin-bottom: 10px;
                justify-content: space-between;
              "
            >
              <div class="head-title">Permission Slips</div>
              <img
                style="margin-top: 10px"
                src="@/assets/images/rightArrowCircile.png"
                alt=""
              />
            </div>
            <br />
            <el-card shadow="none">
              <div
                style="display: inline-block; width: 10rem; margin-left: 15px"
                v-for="(apoint, i) in permission"
                :key="i"
              >
                <div style="opacity: 0.8; font-weight: 500">{{ apoint.title }}</div>
                <div
                  style="
                    opacity: 0.8;
                    font-weight: 500;
                    font-size: 22px;
                    margin-top: 15px;
                  "
                >
                  {{ apoint.num }}
                </div>
              </div>
              <br /><br />
              <br />
              <div class="d-flex">
                <e-button label="View Permission Slips" :span="10"></e-button>
                <div style="opacity: 0.6; margin-left: 20px">
                  You will be taken to a new tab of the appointment section
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-row>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import VueSlickCarousel from "vue-slick-carousel";
import EButton from "../../../controls/eButton.vue";
import EDonutChart from "../../../components/finance/empolyChart.vue";

export default {
  components: { VueSlickCarousel, EButton, EDonutChart },
  data: () => ({
    activeName: "catagory1",
    filter: [{ text: "Term 1" }, { text: "Term 2" }, { text: "Term 3" }],
    permission: [
      {
        title: "Approved",
        num: "22",
      },
      {
        title: "Completed",
        num: "55",
      },
      {
        title: "Pending",
        num: "44",
      },
    ],
    appointment: [
      {
        title: "Active",
        num: "22",
      },
      {
        title: "Upcoming",
        num: "55",
      },
      {
        title: "Past",
        num: "44",
      },
    ],
    pieChartData: [
      ["1", "Count", { role: "style" }],
      ["0", 80, "red"],
      ["1", 30, "#f00"],
      ["1", 120, "#f000"],
    ],
    pieChartOptions: {
      // is3D:true,
      pieHole: 0.6,
      pieSliceText: "none",
      chartArea: { top: "0%", height: "50%", width: "80%" },
      legend: "none",

      slices: [
        { color: "#6358F4" },
        { color: "#FE6780" },
        { color: "#FE59B3" },
        { color: "#F9AE58", offset: 0.01, elevated: true, size: 90 },
      ],
    },
    settings2: {
      dots: true,
      focusOnSelect: false,
      infinite: !true,
      slidesToShow: 2.2,
      slidesToScroll: 1,
      touchThreshold: 5,
    },
  }),
  methods: {
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth"]),
    activeTabChange(e) {
      this.activeTab = e;
    },
    scrollTop() {
      this.$nextTick(() => {
        this.$refs.tab2.scrollTop = 0;
      });
    },
  },
  // mounted() {
  //   this.setAsideMenuCollapse(true);
  //   setTimeout(() => {
  //     this.setAsideWidth("94px");
  //   }, 100);
  // },
  // created() {
  //   this.setAsideMenuCollapse(true);
  //   this.setAsideWidth("100px");
  // },
  // destroyed() {
  //   this.setAsideMenuCollapse(false);
  // },
};
</script>

<style lang="scss">
.slick-dots {
  bottom: -25px !important;
  li button:before,
  li.slick-active button:before {
    color: transparent;
    opacity: 1;
  }
  li button:before {
    background-color: transparent;
    border: 1px solid #bc6c42;
    border-radius: 50%;
    display: inline-block;
    height: 10px;
    width: 10px;
  }
  li.slick-active button:before {
    background-color: #bc6c42;
  }
}

.slick-dots li button::before {
  height: 10px !important;
  widows: 10px !important;
  background: #fff;
}
.skill-report-border {
  width: 273px;
  height: 244px;
  border: 1px solid #e6eaed;
  border-radius: 10px;
}
.dance-text {
  font-size: 16px;
  font-weight: 500;
  opacity: 0.8;
  margin-left: 20px;
}
.pl-10 {
  padding-left: 30px;
}
.skill-courosle-title {
  font-weight: 500;
  opacity: 0.8;
}
.footer-skill-test {
  width: 273px;
  height: 108px;
  border-radius: 10px;
  margin-top: 26px;
  background: #e6eaed80;
}
.perform-text-skill {
  padding: 17px 1px 0 40px;
  opacity: 0.8;
  font-weight: 500;
}
.perform-texts {
  color: #0bc32e;
  font-weight: 500;
}
.image-perform-up {
  display: block;
  height: 46px;
  margin-right: 14px;
}
.knowldge-update .el-card__body {
  padding: 0 !important;
}
.dash .floatTabHeader.el-tabs.el-tabs--top > .el-tabs__header {
  position: inherit !important;
}
.dash .el-tabs__item {
  color: #bc6c42;
  opacity: 0.8;
}
.card-issued-book {
  width: 18rem;
  
  box-shadow: 0px 3px 15px #0000000d;
  border-radius: 10px;
}
.issue-book {
  width: 79px;
  height: 103px;
}
.color-cc {
  color: #000000cc;
}
.issue-book-des {
 color: #00000099;
opacity: 0.4;
  font-size: 10px;
  font-weight: 500;
}
.des-footer{
  padding: 16px;
  width: 260px;
  margin-top: 14px;
  background: #e6eaed80 0% 0% no-repeat padding-box;
  border-radius: 10px;
}
.des-footer-title{
  color: #00000099;
}
.des-footer-info{
  color: #000000CC;
  font-size: 16px;
  font-weight: 500;
}
</style>
