<template>
  <div>
    <formSub :name="setName(audience)" :role="setRole(audience)" :Answered="getAnsweredCount(audience) + '/' + getCount(audience)" timetaken="25 m 15 s" :submission="getDate(audience.submitted_at)" >
      <quesAns v-for="form_question in audience.form.form_questions" :key="form_question.id" :numques="form_question.position"
        :ques="form_question.question.name"
        :ans="form_question.answer.answer"
      />
    </formSub>
  </div>
</template>
<script>
import formSub from "@/components/learn/form/formSub.vue";
import quesAns from "@/components/learn/form/quesAns.vue";
import { dispatchGraphql } from '@/api/dispatcher'
import moment from 'moment'

export default {
  components: { formSub, quesAns },
  data: () => ({
    audience: {},
  }),
  created() {
    this.getUser()
  },
  methods: {
    setRole(val) {
      if (val.user) {
        return val.user.role
      }
    },
    setName(val) {
      if (val.user) {
        return val.user.first_name
      }
    },
    getDate(date) {
      return (date ? moment(date) : moment()).format('DD MMM yyyy')
    },
    getCount(val) {
      return val.form.form_questions.length
    },
    getAnsweredCount(val) {
      let count = 0
      for (const item of val.form.form_questions) {
        if (item.answer && item.answer.answer) {
          count ++
        }
      }
      return count
    },
    getUser() {
      const query = `query($id: uuid!) {
        form_results_by_pk(id: $id) {
          id
          submitted_at
          updated_at
          user {
            id
            first_name
            role
          }
          form {
            id
            form_questions {
              id
              position
              question {
                id
                name
              }
              answer {
                id
                answer
              }
            }
          }
        }
      }`
      dispatchGraphql(query, { id: this.$route.params.id }).then(response => {
        this.audience = response.form_results_by_pk
      })
    }
  }
};
</script>
