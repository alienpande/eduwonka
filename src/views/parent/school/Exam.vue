<template>
  <e-container
    pageTitle="Exam"
    btnIcon="el-icon-plus"
    btnText="Create Exam"
    @btnClick="$go($url.SH_CREATEEXAM)"
  >
    <el-tabs class="floatTabHeader" v-model="activeName">
      <el-tab-pane label="Past" name="pastExam">
        <el-row class="mt-10" :span="24">
          <el-col :span="4" class="exams-color">5 exams</el-col>
          <el-col class="float-right" :span="2">
            <e-button
              class="mt-5"
              size="mini"
              icon="el-icon-sort"
              :plain="true"
              type="primary"
            ></e-button>
          </el-col>
          <el-col class="float-right" :span="3">
            <span class="not-graded-column"></span>
            <span class="not-graded-font">Not Graded</span>
          </el-col>
          <el-col class="float-right" :span="3">
            <span class="graded-font-column"></span>
            <span class="graded-font">Graded</span>
          </el-col>
        </el-row>

        <e-form bgColor="transparent">
          <term-card v-for="term in termList" :key="term.id" :term="term" />
        </e-form>
      </el-tab-pane>
      <el-tab-pane label="Upcoming" name="upcomingExam">
        <el-row class="mt-10" :span="24">
          <el-col :span="4" class="exams-color">5 exams</el-col>
          <el-col class="float-right" :span="2">
            <e-button
              class="mt-5"
              size="mini"
              icon="el-icon-sort"
              :plain="true"
              type="primary"
            ></e-button>
          </el-col>
        </el-row>

        <e-form bgColor="transparent">
          <upcoming-card
            v-for="upcoming in upcomingList"
            :key="upcoming.id"
            :upcoming="upcoming"
          />
        </e-form>
      </el-tab-pane>
      <el-tab-pane label="Active" name="activeExam">
        <el-row class="mt-10" :span="24">
          <el-col :span="4" class="exams-color">5 exams</el-col>
          <el-col class="float-right" :span="2">
            <e-button
              class="mt-5"
              size="mini"
              icon="el-icon-sort"
              :plain="true"
              type="primary"
            ></e-button>
          </el-col>
        </el-row>
        <e-form bgColor="transparent">
          <active-card
            v-for="upcoming in upcomingList"
            :key="upcoming.id"
            :upcoming="upcoming"
            @__clicked="$go($url.SH_GRADEMARK)"
          />
        </e-form>
      </el-tab-pane>
      <el-tab-pane label="Tentative" name="tentativeExam">
        <el-row class="mt-10" :span="24">
          <el-col :span="4" class="exams-color">5 exams</el-col>
          <el-col class="float-right" :span="2">
            <e-button
              class="mt-5"
              size="mini"
              icon="el-icon-sort"
              :plain="true"
              type="primary"
            ></e-button>
          </el-col>
        </el-row>

        <e-form bgColor="transparent">
          <tentative-card
            v-for="tentative in tentativeList"
            :key="tentative.id"
            :tentative="tentative"
          />
        </e-form>
      </el-tab-pane>
    </el-tabs>
  </e-container>
</template>
<script>
export default {
  components: {
    TermCard: () => import("@/components/school/Exam/TermCard.vue"),
    TentativeCard: () =>
      import("@/components/school/Exam/TentativeCard.vue"),
    UpcomingCard: () => import("@/components/school/Exam/UpcomingCard.vue"),
    ActiveCard: () => import("@/components/school/Exam/ActiveCard.vue"),
  },
  data() {
    return {
      activeName: "pastExam",
      showSideBar: false,
      termList: [
        {
          id: 1,
          term: "Term 1",
          attedance: "22/25",
          dueDate: "24th June 2020",
        },
        { id: 2, term: "Term 2", attedance: "18/25", dueDate: "4th July 2020" },
        {
          id: 3,
          term: "Term 3",
          attedance: "25/25",
          dueDate: "14th July 2020",
        },
        {
          id: 4,
          term: "Term 4",
          attedance: "25/25",
          dueDate: "10th August 2020",
        },
        {
          id: 5,
          term: "Term 5",
          attedance: "25/25",
          dueDate: "10th Sept 2020",
        },
      ],
      tentativeList: [
        {
          id: 1,
          tentative: "Lorem ipsum dolor sit amet consectetur",
          audiance: 25,
        },
        {
          id: 2,
          tentative: "Lorem ipsum dolor sit amet consectetur",
          audiance: 25,
        },
        {
          id: 3,
          tentative: "Lorem ipsum dolor sit amet consectetur",
          audiance: 25,
        },
        {
          id: 4,
          tentative: "Lorem ipsum dolor sit amet consectetur",
          audiance: 25,
        },
        {
          id: 5,
          tentative: "Lorem ipsum dolor sit amet consectetur",
          audiance: 25,
        },
      ],
      upcomingList: [
        {
          id: 1,
          upcoming: "Lorem ipsum dolor sit amet consectetur",
          attedance: "22/25",
          date: "14th July 2020",
        },
        {
          id: 2,
          upcoming: "Lorem ipsum dolor sit amet consectetur",
          attedance: "18/25",
          date: "14th July 2020",
        },
        {
          id: 3,
          upcoming: "Lorem ipsum dolor sit amet consectetur",
          attedance: "25/25",
          date: "14th July 2020",
        },
        {
          id: 4,
          upcoming: "Lorem ipsum dolor sit amet consectetur",
          attedance: "25/25",
          date: "14th July 2020",
        },
        {
          id: 5,
          upcoming: "Lorem ipsum dolor sit amet consectetur",
          attedance: "25/25",
          date: "14th July 2020",
        },
      ],
    };
  },
  methods: {
    onActiveCardClick(e) {
      console.log(e);
      this.showSideBar = true;
    },
  },
};
</script>

<style scoped>
.mt-10 {
  margin-top: 10px;
}
.exams-color {
  color: #000000;
  font-weight: 550;
}
.mt-5 {
  margin-top: -5px;
}
.not-graded-column {
  background-color: #e60000;
  padding: 0px 5px 0px 5px;
  height: 2px;
  border-radius: 8px;
  margin-right: 5px;
}
.not-graded-font {
  color: #11141a;
  font-size: 12px;
}
.graded-font-column {
  background-color: #0bc32e;
  padding: 0px 5px 0px 5px;
  height: 2px;
  border-radius: 8px;
  margin-right: 5px;
}
.graded-font {
  color: #11141a;
  font-size: 12px;
}
</style>
