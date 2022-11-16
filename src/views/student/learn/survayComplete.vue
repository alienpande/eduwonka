<template>
  <div>
    <es-container hideHeader pageTitle="Atul Sharma" :back="$url.LN_POLL">
      <el-card class="rounded-08 bg-black-2" style="border: none;margin:0 20px" shadow="none">
        <el-row>
          <el-col :span="4" :offset="1" class="d-flex">
            <e-svg
              style="padding-top: 10px; padding-right: 15px"
              icon="answered"
            ></e-svg>
            <div>
              <div class="text-gray-6">Answered</div>
              <div class="sub-title">12/15</div>
            </div>
          </el-col>
          <el-col :span="4" class="d-flex">
            <e-svg
              style="padding-top: 10px; padding-right: 15px"
              icon="calenderIcon"
            ></e-svg>
            <div>
              <div class="text-gray-6">Submission Date</div>
              <div class="sub-title">12th Jan, 2021</div>
            </div>
          </el-col>
          <el-col :span="4" class="d-flex">
            <e-svg
              style="padding-top: 10px; padding-right: 15px"
              icon="personed"
            ></e-svg>
            <div>
              <div class="text-gray-6">Guardian</div>
              <div class="sub-title">Kenith cole</div>
            </div>
          </el-col>
          <el-col :span="4" :offset="6">
            <es-button
              text="Download Report"
              icon="downloadBlack"
              :plain="true"
            ></es-button>
          </el-col>
        </el-row>
      </el-card>
      <br />
      <el-row>
        <el-col :span="10" v-for="i in 6" :key="i" style="margin: 20px">
          <div class="bg-black-2 rounded-08 p20">
            <div class="fs-18 f-600 white-1">Question {{ i }}</div>
            <div
              class="rounded-08 p20"
              style="border: 1px solid #404040; margin-top: 10px"
            >
              <div class="fs-16 white-1">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </div>
              <div class="fs-18 f-500 white-1" style="padding: 7px 0">
                Your Answer
              </div>
              <div class="p20 bg-black-3 rounded-08 white-1">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </div>
            </div>
          </div>
        </el-col>
      </el-row>

      <br /><br /><br /><br /><br /><br />
    </es-container>
  </div>
</template>
