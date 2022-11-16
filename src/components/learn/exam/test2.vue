<template>
  <div style="padding: 30px">
    <div :style="'font-weight: 600;font-size: 16px;opacity: 0.8;margin-bottom: 20px;'">
      Build questions
    </div>
    <div>
      <el-row v-for="(question, i) in formQuestions" :key="i" class="total-row view-no-form">
        <el-col :span="2">
          <div :style="'font-size: 20px;padding: 15px;font-weight: 0.8;font-weight: 500;'">
            Q {{ question.position }}
          </div>
        </el-col>
        <el-col :span="16" :style="'border: 1px solid #fcdfbd;padding: 15px;border-right: 0;border-bottom: 0;opacity: 0.6;font-size: 14px;'">
          <div style="width: auto">
            {{ question.name }}
          </div>
        </el-col>

        <el-col :style="'display: flex;border: 1px solid #fcdfbd;padding: 15px;border-bottom: 0;border-left: 0; width:auto;'" :span="3" :offset="2">
          <span>
            <div  v-if="question.total_marks" @click="marksDialogOpen(question)" :style="'background: rgb(188 108 66 / 10%);color: #bc6c42;border-radius: 10px;padding: 19px 25px;font-weight: 500;width: 67px;font-size: 12px;cursor: pointer;text-align: center;'">
              {{ question.total_marks }} marks>
            </div>

            <div v-else :style="'background: rgb(188 108 66 / 10%);color: #bc6c42;border-radius: 10px;padding: 5px 21px;font-weight: 500;text-align: center;font-size: 12px;width: 67px;cursor: pointer;'">
              <img style="display: block; margin: auto" src="@/assets/images/plus-mark.png" alt="" @click="marksDialogOpen(question)" />Add Marks
            </div>
            <el-dialog title="Set Marks" :visible.sync="marksDialog" width="20%" top="40vh" :close-on-click-modal="false">
              <el-input v-model="marksDialogData.total_marks" type="number" :key="question.id" />
              <span slot="footer" class="dialog-footer">
                <el-button @click="marksDialog = false">Cancel</el-button>
                <el-button type="primary" @click="setMarks(marksDialogData)">Submit</el-button>
              </span>
            </el-dialog>
          </span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <div :style="'font-size: 20px;padding: 15px;font-weight: 0.8;font-weight: 500;'">
            <!-- Q{{ formQuestions.length + 1 }} -->
          </div>
        </el-col>
        <el-col style="padding: 20px 15px; border: 1px solid #fcdfbd" :span="24">
          <el-dialog title="Select Question" :visible.sync="dialog" width="60%" top="40vh" :close-on-click-modal="false">
            <el-select v-model="question.id" filterable placeholder="Pick a Question" style="width: 100%" @change="handleQuestion(question.id)">
              <el-option v-for="question in questions" :key="question.id" :label="question.name" :value="question.id" />
            </el-select>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialog = false">Cancel</el-button>
              <el-button type="primary" @click="onConfirm()">Confirm</el-button>
            </span>
          </el-dialog>
          <e-button @click="dialog = true" class="btn" :span="4" icon="el-icon-plus" label="Add Question" />
        </el-col>
      </el-row>
      <div style="margin: 40px 120px">
        <div :style="'color: #4d4f5c;font-size: 20px;font-weight: 500;display: inline;margin-right: 10px;'">
          Total
        </div>
        <div :style="'display: inline;background: rgb(188 108 66 / 10%);color: #bc6c42;border-radius: 10px;padding: 19px 25px;font-weight: 500;width: 67px;'">
          {{ totalQuestions() > 0 ? totalQuestions() : 0 }}
        </div>
      </div>
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
import { dispatchGraphql } from "@/api/dispatcher";
export default {
  props: {
    quickTest: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    question: {},
    total_marks: "",
    dialog: false,
    marksDialog: false,
    marksDialogData: {},
    questions: [],
    formQuestions: [],
  }),
  created() {
    this.getQuestions();
  },
  methods: {
    handleClick() {
      console.log("Final Resp", this.setFormQuestions());
      const query = `mutation insert_multiple_form_questions($objects: [form_questions_insert_input!]! ) {
      insert_form_questions(objects: $objects) {
        returning {
          id
        }
      }
    }`;
      dispatchGraphql(query, this.setFormQuestions()).then((response) => {
        console.log("2 nd tab", response)
        this.$emit("save")
      })
    },
    getQuestions() {
      const query = `query {
        questions(where: {_and: [{question_category: {_eq: "QuickTest"}}, {standard_id: {_eq: "${this.$route.params.standard_id}"}}, {subject_id: {_eq: "${this.$route.params.subject_id}"}}]}) {
          id
          name
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.questions = response.questions
      })
    },
    handleQuestion(val) {
      const name = this.questions.filter((x) => x.id === val)[0].name
      this.question.name = name
      console.log("1", this.question.name)
    },
    marksDialogOpen(question) {
      this.marksDialogData = question
      this.marksDialog = true
    },
    onConfirm() {
      if (this.formQuestions.some((v) => v.question_id === this.question.id)) {
        console.log("already question was taken")
        return ''
      }
      this.dialog = false;
      this.formQuestions.push({
        name: this.question.name,
        total_marks: this.question.total_marks,
        question_id: this.question.id,
        position: this.formQuestions.length + 1,
      })
      this.question = {}
    },
    setMarks(question) {
      this.formQuestions.forEach((v) => {
        if (v.question_id === question.question_id) {
          v.total_marks = question.total_marks
        }
      })
      this.marksDialog = false;
    },
    setFormQuestions() {
      console.log(this.quickTest);
      this.formQuestions.map(
        (x) => (delete x.name, (x.form_id = this.quickTest.id))
      );
      // return this.formQuestions;
      return {
        objects: this.formQuestions,
      };
    },
    totalQuestions() {
      let total = 0
      this.formQuestions.forEach((v) => {
        total += Number(v.total_marks)
      })
      return total
    }
  },
};
</script>
<style>
.total-row:hover .treedot {
  visibility: visible !important;
}
</style>
