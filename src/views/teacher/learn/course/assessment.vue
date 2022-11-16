<template>
  <div style="overflow: auto; height: 80vh">
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
          Assessment
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
            width: 160px;
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
            >Upcoming test</span
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
    <div style="padding: 0 80px">
      <el-row class="searchCard">
        <el-col :span="3" :offset="1">
          <e-dropdown :list="filterStandard" primary />
        </el-col>
        <el-col :span="3">
          <e-dropdown :list="filterDate" primary />
        </el-col>
        <el-col :span="3">
          <e-dropdown :list="filterStatus" primary />
        </el-col>
        <el-col :span="7" class="primary-text" style="font-weight: 600"
          >Clear
        </el-col>
        <el-col :span="2" :offset="5">
          <e-button
            label="Apply"
            style="margin-top: -12px"
            type="primary"
          ></e-button>
        </el-col>
      </el-row>

      <div
        style="
          display: flex;
          justify-content: space-between;
          padding-right: 21px;
        "
      >
        <div style="font-weight: bold; font-size: 18px">40 students</div>
        <e-button
          :span="1"
          icon="el-icon-search"
          :plain="true"
          type="primary"
          css="bg-tranparent"
        ></e-button>
      </div>
      <el-row>
        <el-col :span="12" v-for="i in 6" :key="i">
          <el-card
            shadow="none"
            style="margin: 10px"
            class="rounded-08 pg-50 cp"
          >
            <el-row>
              <el-col :span="7">
                <el-avatar
                  class="avater-couse"
                  :size="90"
                  :src="require('@/assets/images/profile.jpg')"
                />
              </el-col>
              <el-col :span="11">
                <div
                  style="
                    font-size: 15px;
                    font-weight: bold;
                    color: rgb(51, 51, 51);
                    width: 85px;
                    text-align: center;
                    margin-top: 20px;
                  "
                >
                  Kenneth patrick
                </div>
              </el-col>
              <el-col :span="6">
                <div
                  style="
                    border-radius: 10px;
                    background: rgb(188 108 66 / 10%);
                      
                    text-align: center;
                    padding: 10px;
                  "
                >
                  <div
                    style="font-size: 14px; font-weight: 300; color: #52575d"
                  >
                    Avg. Score
                  </div>
                  <div
                    style="
                      color: #000000;
                      opacity: 0.8;
                      font-size: 44px;
                      font-weight: 500;
                    "
                  >
                    7.9
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-card>

        </el-col>
      </el-row>
      <el-pagination
            @current-change="currentPage"
            @size-change="sizeChange"
            @prev-click="previousClick"
            @next-click="nextClick"
            background
            layout="prev, pager, next"
            style="text-align: center;margin-top:15px"
            :total="50"
          >
          </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    filterStandard: [
      { text: "Standard" },
      { text: "XII" },
      { text: "XI" },
      { text: "X" },
    ],
    filterDate: [{ text: "Date" }],
    filterStatus: [
      { text: "Status" },
      { text: "Active" },
      { text: "Inactive" },
    ],
  }),
   methods: {
    currentPage(i) {
      this.emitPager(i);
    },
    nextClick() {
      this.pageEvent = "NextClick";
    },
    previousClick() {
      this.pageEvent = "PreviousClick";
    },
    sizeChange(i) {
      this.pageEvent = "SizeChanged";
      console.log(i);
    },
  },
};
</script>
<style scoped>
.searchCard {
  background: rgb(255, 255, 255);
  height: 80px;
  padding: 30px 15px 30px 15px;
  margin: 20px 0px 20px 0px;
}
</style>
