<template>
  <div>
    <div class="environment-header">
      <div style="display: flex; justify-content: space-between">
        <div style="opacity: 0.8; font-size: 24px; font-weight: 500">
          Kenneth Patrick
        </div>
        <div><e-svg @click="$router.push($url.LN_EXAM)" icon="Close2"></e-svg></div>
      </div>
      <div
        style="display: flex; justify-content: space-between; margin-top: 10px"
      >
        <div style="display: flex">
          <div style="margin-right: 50px">
            <div style="opacity: 0.8; font-weight: 300">Score</div>
            <div
              style="
                opacity: 0.8;
                font-size: 20px;
                font-weight: 500;
                margin-top: 5px;
              "
            >
              30/45
            </div>
          </div>
          <div style="margin-right: 50px">
            <div style="opacity: 0.8; font-weight: 300">Time taken</div>
            <div
              style="
                opacity: 0.8;
                font-size: 20px;
                font-weight: 500;
                margin-top: 5px;
              "
            >
              25 m 15 s
            </div>
          </div>
          <div>
            <div style="opacity: 0.8; font-weight: 300">Submission date</div>
            <div
              style="
                opacity: 0.8;
                font-size: 20px;
                font-weight: 500;
                margin-top: 5px;
              "
            >
              12th June
            </div>
          </div>
        </div>
        <div>
          <e-button
            @click="questionBank = true"
            class="btn"
            icon="el-icon-download"
            label="Download"
          />
        </div>
      </div>
    </div>

    <div
      class="environment-body"
      style="padding-top: 40px; height: 53vh; overflow: auto"
    >
      <div v-for="i in 5" :key="i" style="padding-left: 31px">
        <el-row style="">
          <el-col
            :span="2"
            style="
              font-size: 20px;
              padding: 0 15px 25px 15px;
              font-weight: 0.8;
              font-weight: 500;
            "
            >Q{{ i }}</el-col
          >
          <el-col :span="13">
            <div
              style="
                border: 1px solid #fcdfbd;
                padding: 15px 215px 25px 15px;

                border-right: 0;
                border-bottom: 0;
                opacity: 0.6;
                font-size: 14px;
              "
            >
              Can you explain the “balance in nature”? Who is regulating this
              dynamic stability (balance/homeostasis) & how is it maintained?
            </div>
          </el-col>
          <el-col
            :span="4"
            style="
              border: 1px solid #fcdfbd;
              border-bottom: 0;
              border-left: 0;
              padding: 13px 0px;
            "
          >
            <div
              style="
                background: rgba(188, 108, 66, 0.1);
                color: rgb(77, 79, 92);
                border-radius: 10px;
                padding: 19px 5px;
                font-weight: 500;
                width: 131px;
                font-size: 12px;
                text-align: center;
                cursor: pointer;
                margin-left: 43px;
              "
            >
              Scored : 3 marks
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col
            :span="2"
            style="
              font-size: 20px;
              padding: 0 15px 15px;
              font-weight: 0.8;
              font-weight: 500;
            "
            >A</el-col
          >
          <el-col :span="17">
            <div
              style="
                border: 1px solid #fcdfbd;
                padding: 14px 215px 15px 15px;

                border-top: 0;
                opacity: 0.6;
                font-size: 14px;
              "
            >
              There is always a dynamic balance in nature, be it homeostasis in
              local ecosystem to the grand scale of global homeostasis. Human is
              interfering with the working of nature and tending to
              destabilising the feedback systems.
            </div>
          </el-col>
          <!-- <el-col :span="3"  style="
              background: rgb(188 108 66 / 10%);
              color: #4D4F5C;
              border-radius: 10px;
              padding: 19px 25px;
              font-weight: 500;
              width:    153px;
              font-size: 12px;
              text-align:center;
              cursor: pointer;
            "> Scored : 3 marks </el-col> -->
        </el-row>
      </div>
    </div>

    <e-dialog
      :title="'Your question bank '"
      v-model="questionBank"
      width="60%"
      top="20vh"
      noEsc
      :gutter="20"
      hideDefaultFooter
      @cancel="questionBank = false"
      @confirm="questionBank = false"
    >
      <div
        style="
          display: flex;
          justify-content: space-between;
          margin-top: -25px;
          border-bottom: 1px solid #fcdfbd;
          padding-bottom: 20px;
        "
      >
        <div class="class-info">
          <div
            style="
              background: #e6eaed;
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
              background: #e6eaed;
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
        <div>
          <e-button
            icon="el-icon-search"
            :plain="true"
            css="bg-tranparent"
          ></e-button>
        </div>
      </div>

      <el-row style="margin-top: 10px">
        <el-col :span="4" style="font-weight: bold; font-size: 18px">
          45 questions
        </el-col>

        <el-col :span="3" :offset="8">
          <e-dropdown :list="filterStandard" primary />
        </el-col>
        <el-col :span="3">
          <e-dropdown :list="filterDate" primary />
        </el-col>
        <el-col :span="3">
          <e-dropdown :list="filterStatus" primary />
        </el-col>
        <el-col :span="3" class="primary-text" style="font-weight: 600"
          >Clear filter
        </el-col>
      </el-row>

      <div
        style="
          background: #e6eaed;
          border-radius: 10px;
          padding: 32px;
          margin-top: 10px;
        "
        v-for="i in 3"
        :key="i"
      >
        <div style="color: #222222; font-weight: 600; font-size: 16px">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua ?
        </div>
        <div style="display: flex; margin-top: 10px">
          <div
            style="
              border: 1px solid #bc6c42;
              border-radius: 13px;
              background: white;
              display: inline;
              padding: 0 10px;
              margin-right: 10px;
              color: #bc6c42;
              font-size: 12px;
              font-weight: 500;
            "
          >
            Type : Multi choice questions
          </div>
          <div
            style="
              border: 1px solid #bc6c42;
              border-radius: 13px;
              background: white;
              display: inline;
              padding: 0 10px;
              margin-right: 10px;
              color: #bc6c42;
              font-size: 12px;
              font-weight: 500;
            "
          >
            Difficulty : easy
          </div>
          <div
            style="
              border: 1px solid #bc6c42;
              border-radius: 13px;
              background: white;
              display: inline;
              padding: 0 10px;
              margin-left: 5px;
              color: #bc6c42;
              font-size: 12px;
              font-weight: 500;
            "
          >
            Used in : 20 quick tests
          </div>
        </div>
      </div>
       <el-col>
          <el-pagination
            @current-change="currentPage"
            @size-change="sizeChange"
            @prev-click="previousClick"
            @next-click="nextClick"
            background
            layout="prev, pager, next"
            style="text-align: center;margin-top:10px"
            :total="50"
          >
          </el-pagination>
        </el-col>
    </e-dialog>
  </div>
</template>
<script>
export default {
  data: () => ({
    questionBank: false,
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
  methods:{
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
  }
};
</script>
<style>
.environment-header {
  background: white;
  padding: 14px 64px;
}
.el-dialog__title {
  opacity: 0.8;
  font-size: 24px;
  font-weight: 500;
}
</style>
