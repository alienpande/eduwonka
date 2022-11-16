<template>
  <div>
    <es-container hideHeader pageTitle="Lorem Ipsum" :back="$url.LN_POLL">
      <el-row>
        <el-col :span="100" v-for="i in final" :key="i" style="margin: 0px">
          <div>
            <el-row >
              <el-col v-if="i.question_type === 'choose-multiple'">
                <div class="bg-black-2 rounded-08 p20">
                  <div class="fs-18 f-600 white-1">Question:- {{ i.name }}</div>
                  <!-- <div
                    class="rounded-08 p20"
                    style="border: 1px solid #404040; margin-top: 0px"
                  > -->
                    <!-- <div class="fs-16 white-1">
                      {{i.answer}}
                    </div> -->
                    <!-- <div class="fs-18 f-500 white-1" style="padding: 1px 0">
                      choose Answer -->
                      <div class="fs-18 f-500 white-1" style="padding: 0px 0">
                        <el-col :span="10"  style="margin: 20px">
                          <!-- <el-radio v-model="name"> {{item.name}} </el-radio> -->
                          <el-radio-group
                            class="toggle-style"
                            v-model="testAnswer"
                            style="margin-left: 0px"
                          >
                          <el-radio
                            style="margin-right: 5px"
                            :label="item"
                            @change="changeTestTime(i,testAnswer)"
                            border
                            v-for="(item, index) in i.options"
                            :key="index + 1"
                          >
                            {{ item.name }}
                          </el-radio>
                        </el-radio-group>
                        </el-col>
                      </div>
                    <!-- </div> -->
                    <!-- <textarea
                      style="
                        border: 1px solid #6e6e6e;
                        box-sizing: border-box;
                        border-radius: 4px;
                        background: #353535;
                        color: #9d9d9d;
                        font-size: 16px;
                        padding: 15px;
                      "
                      placeholder="Start Typing..."
                      id=""
                      cols="25"
                      rows="4"
                    ></textarea> -->
                  <!-- </div> -->
                </div>
              </el-col>
              <el-col v-if="i.question_type === 'long-answer'">
                <div class="bg-black-2 rounded-08 p20">
                  <div class="fs-18 f-600 white-1">Question {{ i.name }}</div>
                  <div
                    class="rounded-08 p20"
                    style="border: 1px solid #404040; margin-top: 10px"
                  >
                    <div class="fs-16 white-1">
                      <!-- {{i.answer}} -->
                    </div>
                    <div class="fs-18 f-500 white-1" style="padding: 7px 0">
                      Your Answer
                    </div>
                    <textarea
                      style="
                        border: 1px solid #6e6e6e;
                        box-sizing: border-box;
                        border-radius: 4px;
                        background: #353535;
                        color: #9d9d9d;
                        font-size: 16px;
                        padding: 15px;
                      "
                      v-model="testAnswer"
                      @change="changeTestTime(i,testAnswer)"
                      placeholder="Start Typing..."
                      id=""
                      cols="25"
                      rows="4"
                    ></textarea>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>

      <el-row
        style="
          margin-top: 20px;
          background: #1e1e1e;
          padding-top: 25px;
          padding-bottom: 15px;
        "
      >
        <el-col :span="5" :offset="14">
          <es-button text="Cancel" width="200"></es-button>
        </el-col>
        <el-col style="float: right" :span="5">
          <es-button text="Submit" @click="saveAnswer()" width="200" :plain="true"></es-button>
        </el-col>
      </el-row>
      <br /><br /><br /><br /><br /><br />
    </es-container>
  </div>
</template>
<script>
import { dispatchGraphql, dispatchGraphqlMutation, dispatchGraphqlQuery } from '@/api/dispatcher'
export default {
  data: () => ({
    tab: "tab1",
    query: `query($id: uuid){
      form_questions(where: {form_id: {_eq: $id}}) {
        id
        form_id
        question {
          id
          name
          answer
          question_type
          options
        }
      }
    }`,
    final: [],
    testAnswer: '',
    answer: {}
  }),
  created() {
    this.getQuetion()
    console.log("id", this.$route.params.form_id)
  },
  methods: { 
    changeTestTime: function (time,i) {
      this.testAnswer = i.name
      this.answer.answer = this.testAnswer
      this.answer.form_questions_id = time.form_question_id
      this.answer.form_results_id = time.form_results_id
      console.log('answer', this.answer)
    },
    saveAnswer() {
      dispatchGraphqlQuery('form_answers', ['id', 'form_results_id','form_questions_id']).then((response) => {
        this.subjects = response.form_answers
        for(const txt of response.form_answers) {
          if(txt.form_results_id == this.answer.form_results_id && txt.form_questions_id == this.answer.form_questions_id) {
            this.answer.id = txt.id
            dispatchGraphqlMutation('form_answers', ['id', 'answer','form_results_id','form_questions_id'], this.answer).then((response) => {
              console.log("show", response);
            })
          } else {
            dispatchGraphqlMutation('form_answers', ['id', 'answer','form_results_id','form_questions_id'], this.answer).then((response) => {
              console.log("show", response);
            })
          }
        }
      })
    },

    getQuetion() {
      dispatchGraphql(this.query, {id: this.$route.params.form_id}).then((response) =>{
        console.log('1234567',response.form_questions)
        for(const txt of response.form_questions) {
          if(txt.question.question_type != "Dropdown") {
            txt.question.form_question_id = txt.id
            txt.question.form_results_id = this.$route.params.form_results_id
            this.final.push(txt.question)
          }
        }
        console.log('final', this.final)
      })
    },
  }
};
</script>
