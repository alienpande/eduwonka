<template>
  <div style="padding: 30px">
    <el-dialog
      title="Create Poll"
      :visible.sync="dialog"
      width="60%"
      top="40vh"
      :close-on-click-modal="false"
    >
      <quesCreate2 :questionType="'drop-down'" @submit="handleSave" />
      <!-- <el-select v-model="question.id" filterable placeholder="Pick a Question" style="width: 100%" @change="handleQuestion(question.id)">
        <el-option v-for="question in questions" :key="question" :label="question.name" :value="question.id" />
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">Cancel</el-button>
        <el-button type="primary" @click="addQuestion()">Confirm</el-button>
      </span> -->
    </el-dialog>
    <div style="font-weight: 600; font-size: 16px; opacity: 0.8; margin-bottom: 20px; margin-left: 10%;" >
      Build questions
    </div>
    <div>
     <el-row> 
      <el-row v-for="(question, i) in formQuestions" :key="i" class="total-row">
        <el-col :span="2" :offset="3">
          <div style="font-size: 20px; padding: 15px;font-weight: 500;" >
            Q{{ question.position }}
          </div>
        </el-col>
        <el-col :span="16" style="border: 1px solid #fcdfbd; padding: 15px; border-bottom: 5; opacity: 0.6; font-size: 14px;">
          {{ question.name }}
        </el-col>
       
      </el-row>
      <el-row>
        <el-col :span="2" :offset="3">
          <div style="font-size: 20px; padding: 15px; font-weight: 0.8; font-weight: 500;">
            <!-- Q{{ formQuestions.length + 1 }} -->
          </div>
        </el-col>
        <!-- <el-col style="padding: 20px 15px; border: 1px solid #fcdfbd" :span="16"> -->
          <e-button @click="dialog = true" class="btn pd-10" :span="4" icon="el-icon-plus" label="Add Question" />
        <!-- </el-col> -->
      </el-row>
      </el-row>
      <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px" class="form-last-buttons">
        <!-- <el-col style="float: right" :span="9"> -->
          <e-button :span="15" label="Cancel" width="180" css="cancel_btn" type="default" class="p-45" />
          <e-button :span="8" label="Proceed" width="180" @click="handleClick" css="float-right" class="p-45" />
        <!-- </el-col> -->
    </el-row>
    </div>
  </div>
</template>
<script>
import quesCreate from "@/components/learn/poll/quesCreate.vue"
import { dispatchGraphql, dispatchGraphqlMutation } from "@/api/dispatcher"
export default {
  components: { quesCreate },
  props: {
    formId: {
      type: String,
      default: null
    },
  },
  data: () => ({
    question: {},
    dialog: false,
    questions: [],
    formQuestions: [],
    mutation: `mutation($objects: [form_questions_insert_input!]!){
      insert_form_questions(objects: $objects) {
        affected_rows
        returning {
          id
        }
      }
    }`,
    questionForm: {},
  }),
  created() {
    console.log('id', this.formId)
  },
  methods: {
    handleSave(data) {
      this.questionForm = {
        question_type: "drop-down",
        name: data.question,
        required: data.required,
        options: data.options,
        answer: data.answer,
        question_category: "Poll"
      }
      if (this.questionForm) {
        dispatchGraphqlMutation('questions', ['id','name'], this.questionForm).then((response) => {
          this.question = response.insert_questions_one
          this.addQuestion()
        })
      }
    },
    // getQuestions(){
    //   dispatchGraphqlQuery('questions', ['id', 'name']).then((response) => {
    //     this.questions = response.questions
    //   })
    // },
    // handleQuestion(val) {
    //   const name = this.questions.filter(x => x.id === val)[0].name
    //   this.question.name = name
    // },
    addQuestion() {
      this.dialog = false
      this.formQuestions.push({
        name: this.question.name,
        form_id: this.formId,
        question_id: this.question.id,
        position: this.formQuestions.length + 1
      })
      this.question = {}
    },
    setFormQuestions() {
      this.formQuestions.map(x => delete x.name)
      return {
        "objects": this.formQuestions
      }
    },
    handleClick() {
      dispatchGraphql(this.mutation, this.setFormQuestions()).then(response => {
        console.log(response)
        this.$emit('save')
      })
    }
  },
};
</script>
<style>
.total-row:hover .treedot {
  visibility: visible !important;
}
</style>
