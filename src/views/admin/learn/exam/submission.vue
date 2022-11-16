<template>
  <div>
    <div class="environment-header">
      <div style="display: flex; justify-content: space-between">
        <div style="opacity: 0.8; font-size: 24px; font-weight: 500">
          <!-- Kenneth Patrick --> {{allData.user.first_name}}
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
              <!-- 30/45 --> {{ this.ansTotalMarks }} /{{ this.total }}
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
              <!-- 25 m 15 s --> {{ allData.taken_time }}
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
              <!-- 12th June --> {{ getDate(this.submissionDate) }}
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
      <div v-for="i in allData.answers" :key="i.id" style="padding-left: 31px">
        <el-row style="">
          <el-col
            :span="2"
            style="
              font-size: 20px;
              padding: 0 15px 25px 15px;
              font-weight: 0.8;
              font-weight: 500;
            "
            >Q{{ i.position }}</el-col
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
              <!-- Can you explain the “balance in nature”? Who is regulating this
              dynamic stability (balance/homeostasis) & how is it maintained? -->
              {{ i.form_question.question.name }}
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
              Scored : {{i.marks}} marks
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
              <!-- There is always a dynamic balance in nature, be it homeostasis in
              local ecosystem to the grand scale of global homeostasis. Human is
              interfering with the working of nature and tending to
              destabilising the feedback systems. -->
              {{ i.answer }}
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
            <!-- Class 6A  --> {{ stardard.name }}
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
            {{ subject.name }}
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
        <el-col :span="6" style="font-weight: bold; font-size: 18px">
          {{questions.length}} questions
        </el-col>

        <!-- <el-col :span="3" :offset="8">
          <e-dropdown :list="filterStandard" primary />
        </el-col> -->
        <!-- <el-col :span="3"  :offset="8">
          <e-dropdown :list="filterDate" primary />
        </el-col>
        <el-col :span="3">
          <e-dropdown :list="filterStatus" primary />
        </el-col> -->
        <el-col :span="3" :offset="5">
          <el-dropdown @command="setType">
            <span class="el-dropdown-link primary-text" primary>
              All<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in formTypes" :key="item.text" :command="item.value">{{ item.text }}</el-dropdown-item>
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
              <el-dropdown-item v-for="item in difficulties" :key="item.text" :command="item.value">{{ item.text }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- <e-dropdown :list="filter2" primary /> -->
        </el-col>
        <el-col :span="3" class="primary-text" style="font-weight: 600"
          ><div @click="clearFilter">Clear filter </div>
        </el-col>
      </el-row>

      <div
        style="
          background: #e6eaed;
          border-radius: 10px;
          padding: 32px;
          margin-top: 10px;
        "
        v-for="i in questions"
        :key="i.id"
      >
        <div style="color: #222222; font-weight: 600; font-size: 16px">
          <!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua ? -->
          {{ i.name }}
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
            Type : {{ getType(i.question_type) }}
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
            Difficulty : {{ getType(i.difficulty_level) }}
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
import { dispatchGraphql } from "@/api/dispatcher";
import moment from 'moment'

export default {
  data: () => ({
    standard_subject: [],
    allData: {},
    submissionDate: '',
    total: 0,
    stardard: {},
    subject: {},
    questions: [],
    ansTotalMarks: 0,
    type: '',
    level:'',
    questionBank: false,
    // filterStandard: [
    //   { text: "Standard" },
    //   { text: "XII" },
    //   { text: "XI" },
    //   { text: "X" },
    // ],
    // filterDate: [{ text: "Date" }],
    // filterStatus: [
    //   { text: "Status" },
    //   { text: "Active" },
    //   { text: "Inactive" },
    // ],
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
  }),
  created() {
    var data = localStorage.getItem('standard_subject')
    data = data.split(",")
    this.standard_subject = data
    console.log('stasub ids', this.standard_subject);
    localStorage.removeItem('standard_subject')
    this.getData()
    this.getStandardSubQue()
  },
  methods:{
    getDate(date) {
      return (date ? moment(date) : moment()).format('DD MMM yyyy')
    },
    getData() {
      const query = `query {
        form_results_by_pk(id: "${this.$route.params.resultAudienceId}") {
          id
          user {
            id	
            first_name
          }
          submitted_at
          taken_time
          answers {
            id
            answer
            marks
            form_question {
              id
              total_marks
              question {
                id
                name
              }
            }
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        console.log('getData', response);
        this.allData = response.form_results_by_pk
        this.submissionDate = this.allData.submitted_at
        // this.subName = this.allData.result_audience[0].user.section.standards[0].standard_subjects[0].subject
        console.log('alldata.formquestion', this.allData.answers[0].form_question);
        let data = this.allData.answers
        console.log('data', data);
        //  let total = 0;
          data.forEach((v) => {
            this.total += Number(v.form_question.total_marks);
            console.log('marks', this.total);
            this.ansTotalMarks += Number(v.marks)
            console.log('anstotalMarks', this.ansTotalMarks);
          });
          return this.total, this.ansTotalMarks;
        // answer total 
      })
    },
    getVariable() {
      return {
        "standId": this.standard_subject[0],
        "subId": this.standard_subject[1]
      }
    },
    getVariables() {
      return {
        "type": `%${this.type}%`,
        "level": `%${this.level}%`,
        "standId": this.standard_subject[0],
        "subId": this.standard_subject[1]
      }
    },
    getStandardSubQue() {
      const query = `query($standId: uuid, $subId: uuid) {
        standard_subjects(where: {_and: [{standard_id: {_eq: $standId}}, {subject_id: {_eq: $subId}}]}) {
          id
          standard {
            id
            name
          }
          subject {
            id
            name
          }
        }
      }`
      const quesQuery = `query($type: String, $level: String, $standId: uuid, $subId: uuid) {
        questions(where: {_and: [{question_type: {_ilike: $type}}, {difficulty_level: {_ilike: $level}}, {standard_id: {_eq: $standId}}, {subject_id: {_eq: $subId}}]}) {
          id
          name
          question_type
          difficulty_level
        }
      }`
      dispatchGraphql(query, this.getVariable()).then((response) => {
        this.stardard = response.standard_subjects[0].standard
        this.subject = response.standard_subjects[0].subject
        dispatchGraphql(quesQuery, this.getVariables()).then((response) => {
          this.questions = response.questions
        })
      })
    },
    getType(type) {
      if (type === 'choose-multiple') {
        return 'Multiple Choice & Multiple Answers Questions'
      } else if (type === 'choose-single') {
        return 'Multiple Choice & Single Answer Questions'
      } else if (type === 'short-answer') {
        return 'Short Answer Questions'
      } else if (type === 'long-answer') {
        return 'Long Answer Questions'
      } else if (type === 'upload-attachment') {
        return 'Attachment Questions'
      } else if (type === 'add-image') {
        return 'Image Questions'
      } else if (type === 'add-video') {
        return 'Video Questions'
      } else {
        return 'True/False Questions'
      }
    },
    setType(val) {
      this.type = val;
      this.getStandardSubQue();
    },
    setLevel(val) {
      this.level = val;
      this.getStandardSubQue();
    },
    clearFilter() {
      this.type = "";
      this.level = "";
      this.getStandardSubQue();
    },
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
