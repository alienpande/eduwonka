<template>
  <div class="about">
    <e-container
      pageTitle="Question"
      btnIcon="el-icon-plus"
      btnText="Create question"
      @btnClick="$router.push($url.LN_CREATE_QUESTION)"
    >
      <el-row :gutter="20">
        <el-col :span="6">
          <div style="opacity: 0.8; font-size: 20px; font-weight: bold">
            45 questions
          </div>
        </el-col>
        <el-col :span="4"></el-col>
        <el-col :span="3" :offset="5">
          <e-dropdown :list="filter" primary />
        </el-col>
        <el-col :span="3">
          <e-dropdown :list="filter2" primary />
        </el-col>
        <el-col :span="3" class="primary-text"
          ><e-dropdown :list="filter3" primary
        /></el-col>
        <el-col :span="2">
          <e-button
            icon="el-icon-search"
            css="sort-icon"
            :plain="true"
            type="primary"
          ></e-button>
        </el-col>
        <el-col :span="1">
          <e-button
            icon="el-icon-sort"
            css="sort-icon"
            :plain="true"
            type="primary"
          ></e-button>
        </el-col>
      </el-row>
      <br />
      <ques-card v-for="i in 6" :key="i" />
    </e-container>
  </div>
</template>
<script>
import quesCard from "@/components/learn/questions/quesCard.vue";
export default {
  components: { quesCard },
  data: () => ({
    filter: [
      { text: "All" },
      { text: "MCQ" },
      { text: "Single" },
      { text: "Lengthy" },
      { text: "Rating" },
      { text: "Matching" },
    ],
    filter2: [
      { text: "Difficulty" },
      { text: "Difficulty 1" },
      { text: "Difficulty 2" },
    ],
    filter3: [
      { text: "Used in" },
      { text: "Used in 1" },
      { text: "Used in 2" },
    ],
  }),
};
</script>
