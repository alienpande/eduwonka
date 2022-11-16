<template>
  <div class="assesment">
    <es-container
      hideHeader
      pageTitle="Hi Atul, you did an excellent job"
      :back="$url.LN_ASSESMENT"
    >
      <div style="padding: 20px">
        <es-button
          icon="downloadBtnIcon"
          style="width: 200px; top: 159px; right: 52px; position: absolute"
          text="Download"
        ></es-button>
        <el-card
          class="rounded-08 bg-black-2"
          style="border: none"
          shadow="none"
        >
          <el-row>
            <el-col :span="4" :offset="1" class="d-flex">
              <e-svg
                style="padding-top: 10px; padding-right: 15px"
                icon="scoreIcon"
              ></e-svg>
              <div>
                <div class="text-gray-6">Score</div>
                <div class="sub-title">{{ aMark }} / {{ qMark }}</div>
              </div>
            </el-col>
            <el-col :span="4" class="d-flex">
              <e-svg
                style="padding-top: 10px; padding-right: 15px"
                icon="rank"
              ></e-svg>
              <div>
                <div class="text-gray-6">Class Rank</div>
                <div class="sub-title">{{ rank }}</div>
              </div>
            </el-col>
            <el-col :span="4" class="d-flex">
              <e-svg
                style="padding-top: 10px; padding-right: 15px"
                icon="calenderIcon"
              ></e-svg>
              <div>
                <div class="text-gray-6">Submission date</div>
                <div class="sub-title">{{ getFormResults() }} </div>
              </div>
            </el-col>
            <el-col :span="8" :offset="1">
              <div class="d-flex">
                <div
                  style="
                    :width= 372px ;
                    height: 28px;
                    background: #1fc24e;
                    color: white;
                    font-weight: bold;
                    font-size: 16px;
                    text-align: center;
                    padding-top: 4px;
                  "
                >
                  {{ getWidth("Correct") }}
                </div>
                <div
                  style="
                    :width= 372px ;
                    height: 28px;
                    background: #fec600;
                    color: white;
                    font-weight: bold;
                    font-size: 16px;
                    text-align: center;
                    padding-top: 4px;
                  "
                >
                  {{ getWidth("PartialCorrect") }}
                </div>
                <div
                  style="
                    :width= 372px ;
                    height: 28px;
                    background: #9911ed;
                    color: white;
                    font-weight: bold;
                    font-size: 16px;
                    text-align: center;
                    padding-top: 4px;
                  "
                >
                  {{ getWidth("skipedCorrect") }}
                </div>
                <div
                  style="
                    :width= 372px ;
                    height: 28px;
                    background: #f14d4d;
                    color: white;
                    font-weight: bold;
                    font-size: 16px;
                    text-align: center;
                    padding-top: 4px;
                  "
                >
                  {{getWidth("Wrong")}}
                </div>
                <!-- <div style="width: 372px; height: 28px; background: #9911ed color: white; font-weight: bold; font-size: 16px; text-align: center; padding-top: 4px;">{{getWidth('PartialCorrect')}}</div> -->
                <!-- <div style="width: 372px; height: 28px; background: #fec600 color: white; font-weight: bold; font-size: 16px; text-align: center; padding-top: 4px;">{{getWidth('skipedCorrect')}}</div> -->
                <!-- <div style="width: 372px; height: 28px; background: #f14d4d color: white; font-weight: bold; font-size: 16px; text-align: center; padding-top: 4px;">{{getWidth('Wrong')}}</div> -->
              </div>
            </el-col>
          </el-row>
        </el-card>
        <br />
        <el-card
          class="rounded-08 bg-black-2"
          style="border: none; position: relative"
        >
          <div class="d-flex" style="position: absolute; right: 0">
            <div
              class="d-flex"
              style="margin-right: 15px"
              v-for="(indi, i) in indicate"
              :key="i"
            >
              <div
                class="make-indicate-block"
                :style="{ background: indi.color }"
              ></div>
              <div style="color: #858585; margin-left: 10px">
                {{ indi.text }}
              </div>
            </div>
          </div>
          <el-tabs
            class="floatTabHeader studentTab"
            style="margin-top: 60px"
            v-model="activeName"
          >
            <el-tab-pane label="All Answers" name="activeAssign">
              <div v-for="i in questions" :key="i">
                <asses-result :score ="i.answer.marks" :question ="i"/>
                <!-- <asses-result score="2" />
                <asses-result score="0" />
                <asses-result /> -->
              </div>
            </el-tab-pane>
            <el-tab-pane label=" Correct" name="Correct">
              <div v-for="i in questions" :key="i">
                <asses-result :score ="i.answer.marks" :question ="i"/>
              </div>
            </el-tab-pane>
            <el-tab-pane label="Partially Correct" name="PartiallyCorrect">
               <div v-for="i in questions" :key="i">
                <asses-result :score ="i.answer.marks" :question ="i"/>
              </div>
            </el-tab-pane>
            <el-tab-pane label="Wrong " name="Wrong">
              <div v-for="i in questions" :key="i">
                <asses-result :score ="i.answer.marks" :question ="i"/>
              </div>
            </el-tab-pane>
            <el-tab-pane label="Skipped" name="Skipped"> 
              <div v-for="i in questions" :key="i">
                <asses-result :score ="i.answer.marks" :question ="i"/>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </es-container>
  </div>
</template>
<script>
import { dispatchGraphql }  from  '@/api/dispatcher'
import _ from 'lodash'
import moment from 'moment'
import { getId } from '@/util/auth'
export default {
  data: () => ({
    activeName: "activeAssign",
    questions: [],
    sub_date: '',
    qMark: '',
    aMark: '',
    crt: 0,
    wr: 0,
    sk: 0,
    pc: 0,
    progress: [],
    rank: 0,
    indicate: [
      {
        text: " Correct",
        color: "#1FC24E",
      },
      {
        text: " Skipped ",
        color: "#9911ED",
      },
      {
        text: " Partially Correct",
        color: "#FEC600",
      },
      {
        text: " Wrong",
        color: "#F14D4D",
      },
    ],
    mark: [],
    numbers: []
  }),
    created(){
      this.getQuestions("all")
      console.log("user id", getId());
      // this.getPercentage()
      // this.getWidth()
      // this.updateProgres()
    },
    watch: {
    activeName: _.debounce(function() {
      if (this.activeName === 'Correct') {
        this.questions = []
        this.getQuestions("Correct")
      } else if (this.activeName === 'PartiallyCorrect') {
          this.questions = []
        this.getQuestions("PartiallyCorrect")
      } else if (this.activeName === 'Wrong') {
        this.questions = []
        this.getQuestions("Wrong")
      }else if (this.activeName === 'Skipped') {
        this.questions = []
        this.getQuestions("Skipped")
      } else {
        this.questions = []
        this.getQuestions("all")
      }
    })
  },
  methods: {
    getQuestions(type){
      // const query = `query($id: uuid!,$user_id: uuid!){
      //   forms_by_pk(id:$id){           
      //     form_questions{
      //       total_marks
      //       position
      //       answer{
      //         marks
      //       }
      //       question{
      //         name
      //         answer
      //         id
      //       }
      //     }
      //   }
      // }`
      const query = `query($user_id: uuid!,$id: uuid!) {
        forms(where: {result_audience: {user_id: {_eq: $user_id}}, _and: {id: {_eq: $id}}}) {
          id
          form_questions {
            id
            total_marks
            position
            answer {
            marks
            }
            question {
              id
              answer
              name
            }
          }
        }
      }`
      const query1 = `query{
        forms {           
          form_questions{
            answer{
              marks
            } 
          }
        }
      }`
      dispatchGraphql(query , {user_id:getId() , id: this.$route.params.id }).then((response) => {
        if (type == "all"){
          this.questions = response.forms[0].form_questions
          console.log("yyyyyyyyyyyyyyyyyyyyyyy", this.questions)
          this.crt = this.questions.filter(x => x.answer.marks == x.total_marks).length
          this.pc = this.questions.filter(x => x.answer.marks <  x.total_marks && x.answer.marks > 0).length
          this.wr = this.questions.filter(x => x.answer.marks == 0).length
          this.sk = this.questions.filter(x => x.answer.marks == null).length
          for(const item of this.questions){
            this.qMark =  item.total_marks
            this.aMark =   item.answer.marks
            console.log("item",this.aMark, this.qMark )
          }
        } else if(type == "Correct"){
          this.questions = response.forms[0].form_questions.filter(x => x.answer.marks == x.total_marks)
          this.crt = this.questions.length
        }else if(type == "PartiallyCorrect"){
          this.questions = response.forms[0].form_questions.filter(x => x.answer.marks <  x.total_marks && x.answer.marks > 0)
          this.pc = this.questions.length
        }else if(type == "Wrong"){
          this.questions = response.forms[0].form_questions.filter(x => x.answer.marks === 0)
          this.wr = this.questions.length
        }else if(type == "Skipped"){
          this.questions = response.forms[0].form_questions.filter(x => x.answer.marks == null)
          this.sk = this.questions.length
        }
      })
      dispatchGraphql(query1).then((response) => {
        this.mark = response.forms
        this.mark = this.mark.map(x => x.form_questions).flat(Infinity)
        this.mark = this.mark.map(x => x.answer).filter(x => x !== null)
          const cleanedArray = [];
          this.mark.forEach((val) => {
            if(val.marks !== null){
              cleanedArray.push(val.marks);
            }
          });
        console.log("mark", this.mark,cleanedArray )
        this.numbers = cleanedArray ;
        this.numbers.sort((a, b) => b - a );
        this.rank = this.numbers.indexOf(this.aMark)+1
        console.log("rank", this.rank)
      })
    },
    // getMarks(){
      //  for(const item of this.questions){
      //       this.qMark = this.qMark + item.total_marks
      //       this.aMark =  this.aMark + item.answer.marks
      //       console.log("item",this.aMark, this.qMark )
      //     }
          // return this.aMark 
    // },
    getFormResults(){
        const query = `query($id: uuid!){
          form_results(where: {form_id: {_eq: $id}}) {
            submitted_at
            id
          }
        } `
      dispatchGraphql(query , {id: this.$route.params.id}).then((response) => {
        this.sub_date =  response.form_results[0].submitted_at
      })
      return moment(this.sub_date).format('DD-MM-yyyy')
    },
    getWidth(type){
      if (type === "Correct"){
        // console.log("cccccccccccccccc", (this.crt/(this.crt+this.pc+this.sk+this.wr)*100)+"%" );
        const dumy = this.crt/(this.crt+this.pc+this.sk+this.wr)*100
        const data = dumy+'%'
        console.log('C', data)
        if(dumy>0) {
          return data       
        }
      }else if (type === "PartialCorrect"){
        // console.log("mmmmmmmmmmmmmmmmmmm", (this.pc/(this.crt+this.pc+this.sk+this.wr)*100)+"%") ;
        const dumy = this.pc/(this.crt+this.pc+this.sk+this.wr)*100
        const data = dumy+'%'
        console.log('pC', data)
        if(dumy>0){
          return data
        }
      }else if (type === "skipedCorrect"){
        // console.log("wrong", (this.wr/(this.crt+this.pc+this.sk+this.wr)*100)+"%") ;
        const dumy = this.wr/(this.crt+this.pc+this.sk+this.wr)*100
        const data = dumy+'%'
        console.log('sK', data)
        if(dumy>0){
          return data
        }
      }else if (type === "Wrong"){
        // console.log("skipped", (this.sk/(this.crt+this.pc+this.sk+this.wr)*100)+"%") ;
        const dumy = this.sk/(this.crt+this.pc+this.sk+this.wr)*100
        const data = dumy+'%'
        console.log('Wc', data)
        if(dumy>0){
          return data
        }
      }
    },
  }
};
</script>
<style>
.make-indicate-block {
  width: 18px;
  height: 18px;
}
.assesment .floatTabHeader.el-tabs.el-tabs--top > .el-tabs__header {
  position: inherit !important;
}
</style>
