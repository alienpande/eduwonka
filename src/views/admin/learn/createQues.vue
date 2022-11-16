<template>
  <e-container hideHeader pageTitle="Create question" :back="$url.LN_QUESTIONS + '/standard/' + $route.params.standard_id + '/subject/' + $route.params.subject_id">
    <e-steps :steps="steps" :active="activeTab" @active-tab="activeTabChange" style="width: 470px"></e-steps> 
    <quesCreate1 v-if="activeTab == 1" @save="formType" />
    <quesCreate2 ref="tab2" v-if="activeTab == 2" :questionType="activeField" @changeFormField="changeType" @submit="handleSave" @back="activeTab = 1" @save="activeTab = 3" />
    <quesCreate3 v-if="activeTab == 3" :standardSubject="standardSubject" @submit="setQuestion" @back="activeTab = 2" @save="activeTab = 1" />
  </e-container>
</template>
<script>
import { mapMutations } from "vuex";
import quesCreate1 from "@/components/learn/questions/quesCreate1.vue";
import quesCreate2 from "@/components/learn/questions/quesCreate2.vue";
import quesCreate3 from "@/components/learn/questions/quesCreate3.vue";
import { dispatchGraphql, dispatchGraphqlMutation} from "@/api/dispatcher"
  export default {
    components: { quesCreate1, quesCreate2, quesCreate3 },
    data() {
      return {
        form: {},
        questionForm: {},
        standardSubject: {},
        activeField: '',
        activeTab: 1,
        steps: [
          {
            id: 1,
            icon: "hq/healthRecords",
            title: "Type",
          },
          {
            id: 2,
            icon: "learn/Help",
            title: "Questions",
          },
          {
            id: 3,
            icon: "learn/Audience",
            title: "Audience",
          },
        ],
        req: {
          subjects: [],
        },
      };
    },
    methods: {
      getVariables() {
        return {
          "standardId": this.$route.params.standard_id,
          "subjectId": this.$route.params.subject_id
        }
      },
      getStandardSubjects() {
        const query = `query($standardId: uuid!, $subjectId: uuid!) {
          standards_by_pk(id: $standardId) {
            id
            name
          }
          subjects_by_pk(id: $subjectId) {
            id
            name
          }
        }`
        dispatchGraphql(query, this.getVariables()).then((response) => {
          this.standardSubject = response
          console.log(this.standardSubject)
        })
      },
      formType: function(type) {
        this.activeField = type
        this.activeTab = 2
        this.scrollTop()
      },
      changeType(data) {
        this.activeField = data[1]
        this.questionForm.question_type = data[1]
        this.activeTab = 2
        this.scrollTop()
      },
      handleSave(data) {
        this.form = {
          question_type: data.field_type,
          name: data.question,
          required: data.required,
          options: data.options,
          answer: data.answer
        }
        this.activeTab = 3
      },
      setQuestion(data) {
        this.questionForm = {
          difficulty_level: data.difficulty_level,
          standard_id: data.standard_id,
          subject_id: data.subject_id,
          category_id: data.category_id,
          notes: data.notes,
          question_type: this.form.question_type,
          name: this.form.name,
          answer: this.form.answer,
          required: this.form.required,
          options: this.form.options,
          question_category: "QuickTest"
        }
        if (this.questionForm) {
          dispatchGraphqlMutation('questions', ['id','name'], this.questionForm).then((response) => {
            console.log(response)
            this.$router.push(this.$url.LN_QUESTIONS + '/standard/' + this.$route.params.standard_id + '/subject/' + this.$route.params.subject_id)
          })
        }
      },
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth","hideAsideMenuMobile"]),

      activeTabChange(e) {
        this.activeTab = e;
      },
      scrollTop() {
        this.$nextTick(() => {
          this.$refs.tab2.scrollTop = 0;
        });
      },
    },
    mounted() {
      // this.setAsideMenuCollapse(false);
      // setTimeout(() => {
      //   this.setAsideWidth("290px");
      // }, 100);
      this.hideAsideMenuMobile();
    },
    created() {
      // this.setAsideMenuCollapse(false);
      // this.setAsideWidth("290px");
      // this.getStandardSubjects()
    },
    destroyed() {
      this.setAsideMenuCollapse(false);
    },
  }
</script>

<style>
.label {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
}

.e-form {
  background-color: white;
  height: auto;
  overflow-x: hidden;
}
</style>
