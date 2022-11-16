<template>
  <div>
    <es-container
      hideHeader
      :pageTitle="testName"
      :back="$url.LN_ASSESMENT"
    > 
      <div style="padding: 20px">
        <el-row>
          <el-col :span="15">
            <div v-for="(form, i) in formQuestions " :key="i">
              <div v-if="step == i">
                <el-card class="bg-black-2 rounded-08" style="border: none">
                  <div
                    style="font-weight: bold; font-size: 18px; color: #f3f3f3"
                  >
                    Question {{ form.position }}
                  </div>
                  <div
                    style="
                      border: none;
                      padding: 13px;
                      border: 1px solid #404040;
                    "
                    class="rounded-08"
                  ></div>
                    <div style="color: #f3f3f3; font-size: 16px">
                      {{ form.question.name }}
                    </div>
                     <div class="hr" style="margin: 10px 0"></div>
                    <div
                      v-if="form.question.question_type === 'long-answer'"
                      style="color: #f3f3f3; padding-bottom: 10px"
                      class="fs-16 f-600"
                    >
                      Please enter a short answer
                    </div>
                    <textarea
                      v-if="form.question.question_type === 'long-answer'"
                      v-model="fAnswers[i].answer"
                      @click ="handleTextAnswer(form.question.id,i)"
                      placeholder="Start typing..."
                      class="question-text-area"
                      id=""
                      cols="80"
                      rows="10"
                    ></textarea>
                    <div
                      class="d-grid"
                      style="height: 180px"
                      v-if="form.question.question_type == 'choose-multiple'"
                     >
                      <div
                         v-for="(option, optIndex) in form.question.options"
                         :key="optIndex"
                         @click= handleAnswer(form.question.id,i)
                       >
                        <e-checkbox
                          style="display:grid"
                          class="weekly-test-checkbok"
                          v-model="option.check"
                          @change="handleSelect(option, optIndex,i)"
                          :span="0"
                        />
                       <!-- <el-checkbox v-model="option.check" @change="handleSelect(option, optIndex)"></el-checkbox> -->
                       <div class="fs-16" style="color: #f3f3f3; overflow:hidden">A. {{option.name}}</div>
                     </div>
                    </div>
                    
                    <div
                    class="d-grid"
                    style="height:180px">
                  </div>
                </el-card>
                <br />
                <el-card class="bg-black-2 rounded-08" style="border: none">
                  <div
                    style="font-weight: bold; font-size: 16px; color: #f3f3f3"
                  >
                    Take notes for your reference
                  </div>
                  <div
                    style="
                      border: none;
                      background: #353535;
                      height: 80px;
                      margin-top: 10px;
                      padding: 13px;
                    "
                    class="rounded-08"
                  >
                    <div class="text-white">
                      {{ form.question.notes }} 
                    </div>
                  </div>
                </el-card>
              </div>
            </div>
          </el-col>
          <el-col  v-if="step !=formQuestions.length" :span="7" :offset="1">
            <el-card class="bg-black-2 rounded-08" style="border: none">
              <div class="text-center fs-20 f-600 text-white">Time Left</div>
              <div class="d-flex" style="justify-content: center">
                <div>
                  <div class="class-time">{{ time }}</div>
                  <div style="font-size: 12px; color: #858585">Minutes</div>
                </div>
              </div>
            </el-card>
            <br />
            <el-card class="bg-black-2 rounded-08" style="border: none">
              <div class="text-center fs-20 f-600 text-white">Question Map</div>
              <div
                style="
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: center;
                  padding: 0 15px;
                "
              >
                <div
                  v-for="i in formQuestions"
                  :key="i.id"
                  class ="question-map-circile"
                >
                  <div  id="demo" :class ="getColor(i.position)">
                   {{ i.position }} 
                  </div>
                </div>
              </div>
              <div class="hr" style="margin: 10px 0"></div>
              <div class="d-flex" style="flex-wrap: wrap">
                <div class="d-flex" style="margin: 5px">
                  <div
                    class="question-circle-indicate"
                    style="background: #0f83e7"
                  ></div>
                  <div
                    style="font-size: 10px; color: #858585; margin-left: 7px"
                  >
                    Current
                  </div>
                </div>
                <div class="d-flex" style="margin: 5px">
                  >
                  <div
                    class="question-circle-indicate"
                    style="background: #17b719"
                  ></div>
                  <div
                    style="font-size: 10px; color: #858585; margin-left: 7px"
                  >
                    Answered
                  </div>
                </div>
                <div class="d-flex" style="margin: 5px">
                  <div
                    class="question-circle-indicate"
                    style="background: #f68e12"
                  ></div>
                  <div
                    style="font-size: 10px; color: #858585; margin-left: 7px"
                  >
                    Review
                  </div>
                </div>
                <div class="d-flex" style="margin: 5px">
                  <div
                    class="question-circle-indicate"
                    style="background: #404040"
                  ></div>
                  <div
                    style="font-size: 10px; color: #858585; margin-left: 7px"
                  >
                    Not Attempted
                  </div>
                </div>
                <div class="d-flex" style="margin: 5px">
                  <div
                    class="question-circle-indicate"
                    style="background: #f14d4d"
                  ></div>
                  <div
                    style="font-size: 10px; color: #858585; margin-left: 7px"
                  >
                    Not Answered  
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <div v-if="step == formQuestions.length">
          <el-card class="bg-black-2 rounded-08" style="border: none">
            <div
              style="
                font-weight: bold;
                font-size: 18px;
                margin-bottom: 10px;
                color: #f3f3f3;
              "
            >
              Test Summary
            </div>
            <div
              style="border: none; padding: 13px; border: 1px solid #404040"
              class="rounded-08"
            >
              <el-row>
                <el-col
                  :span="8"
                  style="padding: 0 10px"
                  v-for="(test, i) in testSum"
                  :key="i"
                >
                  <el-card class="bg-black-3 rounded-08" style="border: none">
                    <div
                      style="
                        font-weight: bold;
                        font-size: 18px;
                        margin-bottom: 10px;
                        color: #f3f3f3;
                      "
                    >
                      {{ test.text }}
                    </div>
                    <div class="hr" style="margin: 10px 0"></div>
                    <br />
                    <br />
                    <es-progress
                      :color="test.color"
                      :percentage="getPercentage(test)"
                    ></es-progress>
                    <!-- <el-progress :text-inside="true" :stroke-width="22" :percentage="getPercentage(test.text)" status="warning"></el-progress> -->
                    <br />
                    <div
                      style="font-weight: bold; font-size: 16px; color: #f3f3f3"
                    >
                      {{ test.res }}
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </div>
      </div>
      <br />
      <br /><br />
      <div
        v-if="step == 4"
        style="
          height: 80px;
          width: 100%;
          background: #1e1e1e;
          position: fixed;
          bottom: 0;
          right: 0;
          left: 290px;
        "
      >
        <el-row style="background: #1e1e1e; padding: 23px 0">
          <el-col class="d-flex" :offset="12" :span="12">
            <es-button
              @click="stepBack"
              text="Back"
              style="margin-right: 30px"
              width="200"
            ></es-button>
            <es-button text="Submit Test" :plain="true" width="200"></es-button>
          </el-col>
        </el-row>
      </div>
      <br /><br /><br /><br /><br /><br /><br />
      <div
        v-if="step !== formQuestions.length+1"
        style="
          height: 80px;
          width: 100%;
          background: #1e1e1e;
          position: fixed;
          bottom: 0;
          right: 0;
          left: 290px;
        "
      >
        <el-row style="padding-top: 20px">
          <el-col :span="3" :offset="1">
            <es-button   @click ="changeColor(step)" text="Mark for Review"></es-button>
          </el-col>
          <el-col :span="2" :offset="1">
            <button
              @click="stepBack()"
              class="quick-test-btn"
              style="margin-left: 25px"
            >
              Previous
            </button>
          </el-col>
          <el-col :span="2" :offset="1">
            <button @click="stepForward()" class="quick-test-btn">Next</button>
          </el-col>
          <el-col :span="3" :offset="6">
            <!-- <es-button text="Submit Test" @click="handleSubmit()" :plain="true"></es-button> -->
            <es-button text="Submit Test" @click="handleSubmit()" :plain="true"></es-button>
          </el-col>
        </el-row>
      </div>
    </es-container>   
  </div>
</template>
<script>
import { dispatchGraphql , dispatchGraphqlMutation } from "@/api/dispatcher";
import moment from "moment";
export default {
  data: () => ({
    formQuestions: [],
    formAnswer: [],
    selected: "",
    date: moment(),
    currentDate: moment(new Date()).format('DD-MM-YYYY'),
    testName: "",
    fResult: {},
    fAnswers: [],
    answerData: [],
    step: 0,
    count :0,
    lastStep: 1,
    checkedValues:[],
    START_TIME:'',
    testSum: [
      {
        text: "Answered Questions",
        color: "#17B719",
        res: "45/55",
        percentage :20     
      },
      {
        text: "Not Answered Questions",
        color: "#F14D4D",
        res: "03/55",
        percentage :20 
      }
    ],
     mutation: `mutation insert_multiple_form_answers($objects: [form_answers_insert_input!]! ) {
      insert_form_answers(objects: $objects) {
        returning {
          id
          answer
        }
      }
    }`
  }),
  methods: {
    getColor(idx) {
      if(this.formQuestions && idx === this.step+1) {
        return 'bg-blue question-map-circile'
      }
      if(this.answerData[idx-1] != null) {
         if(this.answerData[idx-1].answer != '' && this.answerData[idx-1].answer!=null){
           return 'bg-green question-map-circile'
         }
         else{
          return 'bg-red question-map-circile'
         }
      }
      else if(this.answerData[idx-1] == null)
      { 
         return 'bg-black question-map-circile'
      }
       if(this.answerData[idx-1].review === true ){
         console.log(" i m in orange")
        return  'bg-orenge question-map-circile'
      }
    },
    getFormResultId() {
      const query =`query{
        form_results(where:{form_id:{_eq: "${this.$route.params.id}"}}) {
          id
          submitted_at
          status
          start_time
          }
        }`
        dispatchGraphql(query).then((response)=> {
          this.fResult = response.form_results[0]
          this.START_TIME = new Date(this.fResult.start_time).getTime()
          console.log("form reslt", this.START_TIME, this.fResult)
        })
    },
    handleAnswer(val,i) {
      this.fAnswers[i].form_questions_id = val
      console.log("i an in handle answer", i, this.fAnswers[i])
      this.formAnswer.form_questions_id = val
    },
    handleTextAnswer(val,i) {
      this.fAnswers[i].form_questions_id = val
      console.log(" iam in handle text answer ", this.fAnswers[i])
      this.formAnswer.form_questions_id = val
    },
    stepBack() {
      if (this.step <= 0) {
        this.step = 0;
      } else {
        this.step--;
      }
    },
    changeColor(val) {
      this.fAnswers[val].review = true 
      this.answerData[val].review = true 
      this.getColor(val)
      console.log("change color",val, this.fAnswers[val], this.answerData[val])
      

    },
     handleSelect(val,index,i) {
      console.log("selectedval", val,i)
      if(val.check === true){
      this.checkedValues.push(val.name)
      console.log("true", this.checkedValues)
      }
      else if (val.check ===false) {
        // let a = this.checkedValues.indexOf(val)
        console.log("a",index)
        let a = this.checkedValues.indexOf(val.name)
        this.checkedValues.splice(a,1)  // will remove one  element at 'a' index 
        console.log("checkecd", this.checkedValues) 
      }
      this.fAnswers[i].answer = this.checkedValues.toString()
      console.log(" i am in select", this.fAnswers[i])
      this.formAnswer.answer = this.checkedValues.toString()
      console.log("answer", this.formAnswer.answer)
    },
    stepForward() {
      console.log("step value", this.step, this.lastStep)
        this.setData(this.step)
       if(this.step <  this.lastStep){
         this.step ++
       }
    },
    handleSubmit(){
      dispatchGraphql(this.mutation, this.getVariables()).then((response) => {
        console.log("dispatch handleSubmit", response) 
      })
      dispatchGraphqlMutation('form_results',['id','submitted_at','status','taken_time'] ,this.getfResult()).then((response)=> {
        console.log("i am in form result")
        console.log("response", response)
        this.$router.push(this.$url.LN_ASSESMENT)
      }) 
    },
    getfResult() {
      console.log("in function", this.fResult)
      this.fResult.submitted_at = moment(new Date()).format('')
      console.log("STARTIME",this.START_TIME,"SUBMITTEDAT", new Date(this.fResult.submitted_at).getTime())
      const hour = ((new Date(this.fResult.submitted_at).getTime() - this.START_TIME )/(60000*60)).toFixed(0)
      console.log("hours", hour)
      const minute = (((new Date(this.fResult.submitted_at).getTime() - this.START_TIME )/60000).toFixed(0) - hour*60)
      const second = (((new Date(this.fResult.submitted_at).getTime() - this.START_TIME )/1000)-minute*60)
      const d = new Date()
      console.log("minute",minute, "second", second )
      d.setHours(hour)
      d.setMinutes(minute)
      d.setSeconds(second)
      console.log("new taken time", moment(d).format('HH:mm:ss'), "@@@@@@@@@",(moment().format('L') + ' '+ moment(d).format('HH:mm:ss') ))
      this.fResult.taken_time = moment().format('L') + ' '+ moment(d).format('HH:mm:ss') 
      moment().format('L') + ' '+ moment(d, ['h:mm:ss']).format('LTS')
      this.fResult.status = "SUBMITTED"
      return  this.fResult
    },
    getPercentage(val) {
      if(val.text == "Answered Questions" ) {
        console.log("answer length", this.answerData.length, "quesitons length",this.formQuestions.length,"====", (this.answerData.length/this.formQuestions.length) ) 
       const filtered = this.answerData.filter(x => x.answer !=null && x.answer != undefined && x.answer!= '')
       console.log("filtered ", filtered)
       val.res = filtered.length +'/'+this.formQuestions.length
       const Anspercent = (filtered.length/this.formQuestions.length)*100
        return Anspercent.toFixed(0)
      }
      else if(val.text == "Not Answered Questions"){
        console.log("not answered percentage", (1- (this.answerData.length/this.formQuestions.length))*100 )
        const filtered = this.answerData.filter(x => x.answer !=null && x.answer != undefined && x.answer!= '')
        const unAnspercent = 100-((filtered.length/this.formQuestions.length)*100)
        val.res = (this.formQuestions.length-filtered.length) +'/'+this.formQuestions.length
        return unAnspercent.toFixed(0)
      }
    },
    getVariables() {
      for (const item of this.answerData) {
        delete item.review
      }
      console.log("in get variables", this.answerData)
      return {
        "objects": this.answerData
      }
    },
    setData(val) {
      console.log("answer slice",val,  this.answerData.slice(this.step, this.step+1))
      console.log("set data is invoked step value",val,  this.answerData, "====", this.formAnswer.answer)
      // let item ={
      //   "answer":this.formAnswer.answer,
      //   "form_questions_id":this.formAnswer.form_questions_id
      // }
      // this.formAnswer.answer = null 
      // console.log("item answer", item)
      // if (item.answer || item.form_questions_id) {
      //   this.answerData.splice(this.step,1,item)
      // }
      // console.log("final answer", this.answerData)
       this.answerData[val] = this.fAnswers[val]
       console.log("i am in  set data", this.answerData[val], this.answerData)
    },
    getQuestions() {
      const query = `query {
        forms_by_pk(id: "${this.$route.params.id}") {
          form_questions {
            id
            position
            question {
              id
              name
              options
              notes
              question_type
            }
          }
          test_time
          name
          form_type
        }
      }`;
      dispatchGraphql(query).then((response) => {
        let temp = response.forms_by_pk.form_questions;
        console.log("form_questons", temp)
        this.formQuestions = temp.sort(function (a, b) { //  to order  questions in asc order based on question number
          return parseFloat(a.position) - parseFloat(b.position);
        });
        // this.fAnswers.length = this.formQuestions.length
        for (var i = 0 ; i<this.formQuestions.length ; i++){
          this.fAnswers.push({"form_questions_id":null, "answer":null, "review": false})
        }
          console.log("form answers length ", this.fAnswers.length, this.fAnswers )

        
        this.date = moment(response.forms_by_pk.test_time, "mm:ss")
        this.lastStep = this.formQuestions.length;
        this.testName = response.forms_by_pk.form_type+ " - "+response.forms_by_pk.name;
        this.getFormResultId()
      });
    },
  },
  created() {
    this.getQuestions();
    console.log("time taken", this.date.format('HH:mm:ss'),this.date.format(''))
  },
  computed: {
    time: function () {
      //  if(this.date.format("HH:mm:ss") === "00:00:00")
      if(this.date.format("mm:ss") === "00:00"){
        this.handleSubmit()
        return "TIME OVER"
      }
      else{
      return this.date.format("mm:ss")
      }
    },
  },
  mounted: function () {
    setInterval(() => {
      this.date = moment(this.date.subtract(1, "seconds"));
    }, 1000);
  },
};
</script>
<style scoped>
.quick-test-btn {
  font-weight: 500;
  font-size: 16px;
  text-align: center;
  color: #f3f3f3;
  background: #1492e6;
  border-radius: 4px;
  width: 140px;
  padding: 10px 0;
  border: none;
}
.question-map-circile {
  width: 40px;
  height: 30px;
  text-align: center;
  color: #f3f3f3;
  border-radius: 50%;
  padding-top: 10px;
  margin: 8px;
}
.bg-green {
  background: #17b719;
}
.bg-orenge {
  background: #f78e12;
}
.bg-red {
  background: #f14d4d;
}
.bg-black {
  background: #404040;
}
.question-circle-indicate {
  width: 12px;
  height: 12px;
  border-radius: 50px;
}
.question-text-area {
  border-radius: 4px;
  border: 1px solid #6e6e6e;
  background: #353535;
  padding: 20px;
  color: #9d9d9d;
}
.question-text-area::placeholder {
  color: #9d9d9d;
}
</style>