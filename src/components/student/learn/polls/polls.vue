<template>
  <div>
    <el-tabs class="floatTabHeader studentTab" v-model="tab">
      <el-tab-pane label="Active" name="Active">
        <el-row>
          <el-col :span="10">
            <div style="color: #cfcfcf">{{active.length}} Polls</div>
          </el-col>
          <el-col :span="1" :offset="13">
            <es-button icon="updateIcon"></es-button>
          </el-col>
        </el-row>
        <br />
        <el-row>
          <el-col :span="8" class="p10" v-for="i in active" :key="i">
            <div class="bg-black-2 p20 rounded-08">
              <div class="fs-18 f-600 white-1">
               {{i.name}}
              </div>
              <br />
              <div
                shadow="none"
                style="border: none; padding: 13px"
                class="rounded-08 bg-black-3"
              >
                <el-row>
                  <el-col :span="12">
                    <div style="color: #9d9d9d">Date of Creation</div>
                    <div style="color: #f3f3f3; font-weight: bold">
                      {{getDate(i.created_at)}}
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div style="color: #9d9d9d">Due Date</div>
                    <div style="color: #f3f3f3; font-weight: bold">
                      {{getDate(i.due_date)}}
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div class="d-flex justify-bet mt20">
                <es-button @click="update(i,'No')" text="No" width="150"></es-button>
                <es-button @click="update(i, 'Yes')" text="Yes" :plain="true" width="150"></es-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Completed" name="Completed">
             <el-row>
          <el-col :span="10">
            <div style="color: #cfcfcf">{{Completed.length}} Polls</div>
          </el-col>
          <el-col :span="1" :offset="13">
            <es-button icon="updateIcon"></es-button>
          </el-col>
        </el-row>
        <br />
        <el-row>
          <el-col :span="8" class="p10" v-for="i in Completed" :key="i">
            <div class="bg-black-2 p20 rounded-08">
                <div class="white-1 fs-18 f-600">
                    Your Response: <span style="color:#FE9D2B"> {{getResponse(i)}} </span>
                </div>
                <div style="margin:5px 0" class="hr"></div>
              <div class="fs-18 f-600 white-1">
                {{i.name}}
              </div>
              <br />
              <div
                shadow="none"
                style="border: none; padding: 13px"
                class="rounded-08 bg-black-3"
              >
                <el-row>
                  <el-col :span="12">
                    <div style="color: #9d9d9d">Date of Creation</div>
                    <div style="color: #f3f3f3; font-weight: bold">
                      {{getDate(i.created_at)}}
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div style="color: #9d9d9d">Date of Submission</div>
                    <div style="color: #f3f3f3; font-weight: bold">
                      {{getDate(i.due_date)}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            
            </div>
          </el-col>
        </el-row>
           </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { getId } from '@/util/auth'
import { dispatchGraphql, dispatchGraphqlQuery, dispatchGraphqlMutation } from '@/api/dispatcher'
import moment from 'moment'
export default {
  data: () => ({
    activeName: "Active",
    active: [],
    Completed: [],
    final: [],
    query: `query($id: uuid){
      form_results(where: {user_id: {_eq: $id}, _and: {form: {form_type: {_eq: "Poll"}}}}) {
        user_id
        id
        form_id
        form {
          id
          name
          form_type
          due_date
          created_at
          form_questions {
            id
            form_id
            question_id
            question {
              answer
              question_type
              options
              id
              name
            }
          }
        }
      }
    }`,
    form_answers: [],
  }),
  created() {
    this.getQuetion()
  },
  methods: {
    getDate(data) {
      return moment(data).format('yyyy-MM-DD')
    },
    getQuetion() {
      dispatchGraphql(this.query, {id: getId()}).then((response) =>{
        const data1 = []
        for(const txt of response.form_results) {
          if(txt.form_id == txt.form.id){
            txt.form.form_results_id = txt.id
            txt.form.user_id = txt.user_id
            data1.push(txt.form)
          }
        }
        const data2 = []
        for(const txt of data1) {
          for(const item of txt.form_questions) {
            if(txt.id == item.form_id) {
              item.dueDate = txt.due_date
              item.createdAt = txt.created_at
              item.form_resultsId = txt.form_results_id
              item.user_id = txt.user_id
              data2.push(item)
            }
          }
        }
        for(const txt of data2) {
          if(txt.question_id == txt.question.id && txt.question.question_type == "Dropdown") {
            txt.question.due_date = txt.dueDate
            txt.question.created_at = txt.createdAt
            txt.question.form_results_id = txt.form_resultsId
            txt.question.form_questions_id = txt.id
            txt.question.form_id = txt.form_id
            txt.question.user_id = txt.user_id
            this.final.push(txt.question)
          }
        }
        console.log('forms', data1, 'form questions', data2, 'questions', this.final)
        dispatchGraphqlQuery('form_answers', ['id', 'form_results_id', 'answer', 'form_questions_id']).then((response) => {
          this.form_answers = response.form_answers
          console.log('form_answers', this.form_answers)
        })
        dispatchGraphqlQuery('form_results', ['id', 'status', 'user_id', 'form_id']).then((response) => {
          // this.form_results = response.form_results
          console.log('form_results', response.form_results)
          var dumy = []
          const sample = this.final
          this.final = []
          for(const txt of sample) {
            dumy = response.form_results.filter(x => (x.user_id === txt.user_id) && (x.form_id === txt.form_id))
            for(const item of dumy) {
              if(txt.user_id == item.user_id && txt.form_id == item.form_id) {
                txt.status = item.status
                this.final.push(txt)
              }
            }
          }
          for(const txt of this.final) {
            if(txt.status == "ASSIGNED") {
              this.active.push(txt)
            } else {
              this.Completed.push(txt)
            }
          }
          console.log("finalData", this.active, this.Completed)

        })
      })
    },
    getResponse(val) {
      const query = `query($id: uuid, $formId: uuid){
        form_answers(where: {form_questions_id: {_eq: $id}, _and: {form_results_id: {_eq: $formId}}}) {
          answer
          id
        }
      }`
      dispatchGraphql(query, {id: val.form_questions_id, formId: val.form_results_id}).then((response) =>{
        // console.log('form',response.forms)
        return response.form_answers[0].answer
      })
    },
    update(val1, val2) {
      console.log('testing', val2,this.form_answers)
      var data = []
      data = this.form_answers.filter(x => (x.form_results_id === val1.form_results_id) && (x.form_questions_id === val1.form_questions_id))
      console.log('testing123', data)
      if(data.length>0) {
        data[0].answer = val2
        dispatchGraphqlMutation('form_answers', ['id', 'answer'], data[0]).then((response) => {
          console.log("show", response);
        })
      } else {

        const data1 = {}
        alert('hi')
        data1.answer = val2
        data1.form_results_id = val1.form_results_id
        data1.form_questions_id = val1.form_questions_id
        console.log('test12347', data1)
        // dispatchGraphqlMutation('form_answers', ['id', 'answer'], data1).then((response) => {
        //   console.log("show", response);
        // })
      }
    },
  }
};
</script>
