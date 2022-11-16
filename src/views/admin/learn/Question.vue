<template>
  <div class="about">
    <e-container pageTitle="Question" btnIcon="el-icon-plus" btnText="Create question" @btnClick="$router.push($url.LN_CREATE_QUESTION + '/standard/' + $route.params.standard_id + '/subject/' + $route.params.subject_id)">
      <el-row :gutter="20" class="searchCard">
        <el-col :span="6">
          <div style="opacity: 0.8; font-size: 20px; font-weight: bold">
            {{ total }} questions
          </div>
        </el-col>
        <el-col :span="4"></el-col>
        <el-col :span="3" :offset="5">
          <el-dropdown @command="setType">
            <span class="el-dropdown-link primary-text" primary>
              All<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in formTypes" :key="item" :command="item.value">{{ item.text }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- <e-dropdown :list="filter" primary /> -->
        </el-col>
        <el-col :span="3">
          <el-dropdown @command="setLevel">
            <span class="el-dropdown-link primary-text" primary>
              Difficulty<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in difficulties" :key="item" :command="item.value">{{ item.text }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- <e-dropdown :list="filter2" primary /> -->
        </el-col>
        <el-col :span="3" class="primary-text"
          ><e-dropdown :list="filter3" primary
        /></el-col>
        <el-col :span="2">
          <e-button icon="el-icon-search" css="sort-icon" :plain="true" type="primary" />
        </el-col>
        <el-col :span="1">
          <e-button icon="el-icon-sort" css="sort-icon" :plain="true" type="primary" />
        </el-col>
      </el-row>
      <br />
      <ques-card v-if="questions.length > 0" :questions="questions" />
      <pagination :total="total" @pagination="pagination" />
    </e-container>
  </div>
</template>
<script>
import { mapMutations } from "vuex"
import { dispatchGraphql } from "@/api/dispatcher"
import quesCard from "@/components/learn/questions/quesCard.vue";
import Pagination from '@/components/Pagination'
  export default {
    components: { quesCard, Pagination },
    data: () => ({
      total: 0,
      offset: 0,
      page: 1,
      limit: 10,
      questions: [],
      type: '',
      level: '',
      formTypes: [
        { text: "All", value: '' },
        { text: "MCQ's", value: 'choose-multiple' },
        { text: "Single Option Questions", value: 'choose-single' },
        { text: "Short Answer Questions", value: 'short-answer' },
        { text: "Long Answer Questions", value: 'long-answer' },
        { text: "True or False Questions", value: 'drop-down' },
      ],
      difficulties: [
        { text: "All", value: '' },
        { text: "Easy", value: "Easy" },
        { text: "Medium", value: "Medium" },
        { text: "Hard", value: "Hard" },
      ],
      filter3: [
        { text: "Used in" },
        { text: "Used in 1" },
        { text: "Used in 2" },
      ],
    }),
    created() {
      this.getQuestions()
    },
  mounted() {
    this.hideAsideMenuMobile();
  },
    methods: {
    ...mapMutations("Common", ["setStandardMenu","hideAsideMenuMobile"]),
      setType(val) {
        this.type = val
        this.getQuestions()
      },
      setLevel(val) {
        this.level = val
        this.getQuestions()
      },
      getVariables() {
        return {
          "type": `%${this.type}%`,
          "level": `%${this.level}%`,
          "standardId": this.$route.params.standard_id,
          "subjectId": this.$route.params.subject_id,
          "limit": this.limit,
          "offset": this.offset
        }
      },
      getQuestions() {
        const query = `query($limit: Int!, $offset: Int!, $type: String, $level: String, $standardId: uuid, $subjectId: uuid) {
          questions(limit: $limit, offset: $offset, where: {_and: [{question_type: {_ilike: $type}}, {difficulty_level: {_ilike: $level}}, {standard_id: {_eq: $standardId}}, {subject_id: {_eq: $subjectId}}]}) {
            id
            standard_id
            subject_id
            name
            question_type
            options
            answer
            required
            difficulty_level
            notes
          }
          questions_aggregate(where: {_and: [{question_type: {_ilike: $type}}, {difficulty_level: {_ilike: $level}}, {standard_id: {_eq: $standardId}}, {subject_id: {_eq: $subjectId}}]}) {
            aggregate {
              count
            }
          }
        }`
        dispatchGraphql(query, this.getVariables()).then((response) => {
          console.log(response)
          this.questions = response.questions
          this.total = response.questions_aggregate.aggregate.count
        })
      },
      pagination: function(object) {
      this.limit = object.limit
      this.offset = object.limit * (object.page - 1)
      this.getQuestions()
    },
    }
  }
</script>
