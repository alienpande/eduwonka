<template>
  <div>
    <side-bar :show="show" @onClose="__onCancel">
      <div
        style="
          background: #1e1e1e !important;
          
        "
      >
        <div style="background: #282828; padding: 16px">
          <h5 class="text-white">Anil Sir’s Mathematics class Group</h5>
        </div>
        <div style="padding: 16px;height: calc(100vh - 85px);
          overflow-x: scroll;">
          <el-row>
            <el-col :span="4" :offset="1">
              <el-avatar
                :size="50"
                :src="require('@/assets/images/profile.jpg')"
              />
            </el-col>
            <el-col :span="9">
              <div style="color: #858585">Created by</div>
              <div style="font-weight: bold; font-size: 18px; color: #f3f3f3">
                Anjali Mishra
              </div>
            </el-col>
          </el-row>
          <br />
          <div class="hr"></div>
          <br />
          <el-row>
            <el-col :span="8">
              <div style="color: #858585">Subject</div>
              <div style="font-weight: bold; font-size: 16px; color: #f3f3f3">
                Mathematics
              </div>
            </el-col>
            <el-col :span="8">
              <div style="color: #858585">Created on:</div>
              <div style="font-weight: bold; font-size: 16px; color: #f3f3f3">
                12 Aug, 2021
              </div>
            </el-col>
            <el-col :span="8">
              <div style="color: #858585">Occurs</div>
              <div style="font-weight: bold; font-size: 16px; color: #f3f3f3">
                Daily (4PM - 6PM)
              </div>
            </el-col>
          </el-row>

          <el-card
            class="rounded-08 bg-black-3"
            style="border: none; margin: 10px"
            shadow="none"
          >
            <div style="color: #f3f3f3; font-size: 18px" class="fs-18 f-600">
              Group Highlights
            </div>
            <ul class="text-white">
              <li style="margin: 5px 0" v-for="i in 3" :key="i">
                Lorem Ipsum is simply dummy text of the printing and type
                setting industry.
              </li>
            </ul>
          </el-card>
          <br />
          <el-card
            class="rounded-08 bg-black-3"
            style="border: none; margin: 10px"
            shadow="none"
          >
            <div style="color: #f3f3f3; font-size: 18px" class="fs-18 f-600">
              Group Highlights
            </div>
            <el-row style="margin-top: 10px">
              <el-col
                style="padding: 5px 0"
                class="d-flex"
                :span="12"
                v-for="i in 4"
                :key="i"
              >
                <el-avatar
                  :size="60"
                  :src="require('@/assets/images/profile.jpg')"
                />
                <div
                  style="color: #f3f3f3; padding-top: 15px; padding-left: 5px"
                  class="fs-16"
                >
                  Atul Sharma
                </div>
              </el-col>
            </el-row>
          </el-card>
          <br />
          <el-card
            class="rounded-08 bg-black-3"
            style="border: none; margin: 10px"
            shadow="none"
          >
            <div style="color: #f3f3f3; font-size: 18px" class="fs-18 f-600">
              Group Highlights
            </div>
            <el-row>
              <el-col
                :span="12"
                v-for="i in 4"
                :key="i"
                style="padding: 10px 0px"
              >
                <el-row class="book-ref">
                  <el-col :span="6" style="position: relative">
                    <div
                      style="
                        width: 40px;
                        height: 50px;
                        background: #000000;
                        opacity: 0.6;
                        border-radius: 2px;
                        position: absolute;
                      "
                      class="download-icon-book-ref"
                    >
                      <e-svg
                        style="padding: 15px 11px"
                        icon="downloadIcon"
                      ></e-svg>
                    </div>
                    <img src="@/assets/images/Rectangle9.png" alt="" />
                  </el-col>
                  <el-col :span="18" style="padding: 0 3px">
                    <div class="reference-book-info" style="color: #f3f3f3">
                      Social Science Exam Papers.pdf
                    </div>
                    <div style="color: #858585; font-size: 12px">
                      By J.K. Rowling
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-card>

          <br />
          <el-card
            class="rounded-08 bg-black-3"
            style="border: none; margin: 10px"
            shadow="none"
          >
            <div style="color: #f3f3f3; font-size: 18px" class="fs-18 f-600">
              Downloads
            </div>
            <el-row>
              <el-col
                :span="12"
                v-for="i in 4"
                :key="i"
                style="padding: 10px 0px"
              >
                <el-row class="book-ref">
                  <el-col :span="6" style="position: relative">
                    <div
                      style="
                        width: 40px;
                        height: 50px;
                        background: #000000;
                        opacity: 0.6;
                        border-radius: 2px;
                        position: absolute;
                      "
                      class="download-icon-book-ref"
                    >
                      <e-svg
                        style="padding: 15px 11px"
                        icon="downloadIcon"
                      ></e-svg>
                    </div>
                    <img src="@/assets/images/Rectangle9.png" alt="" />
                  </el-col>
                  <el-col :span="18" style="padding: 0 3px">
                    <div class="reference-book-info" style="color: #f3f3f3">
                      Social Science Exam Papers.pdf
                    </div>
                    <div style="color: #858585; font-size: 12px">
                      By J.K. Rowling
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-card>
          <br/>
          <div class="hr"></div>
          <br>
          <es-button text='Join Group' :plain='true'></es-button>
        </div>
      </div>
    </side-bar>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    show: { type: Boolean, default: false },
    __onCancel: Function,
  },
  data: () => ({
    tab: "tab1",
  }),
};
</script>
<style>
.download-icon-book-ref {
  display: none;
}
.book-ref:hover .download-icon-book-ref {
  display: block;
}
.book-ref:hover .reference-book-info {
  color: #1492e6 !important;
}
</style>
