<template>
  <e-container-lite
    :campusid="$route.params.id"
    tag="North Campus"
    showFooter
    @back="$go('/on-boarding/StandardSequening/'+ $route.params.id)"
    @next="$go($url.ASSIGN_SUBJECT + '/' + $route.params.id)"
  >
    <template #titleHead>
      <div class="h1">Subject Creation</div>
      <div class="h5">
        Kindly create the subjects that your institution will be covering
      </div>
    </template>
    <e-form
      heading="Add subjects"
      subHeading="Kindly create the subjects that your institution will be covering"
      showBtn
      btnText="Add Subject"
      @btnClick="addSubjectDialog = true"
      :gutter="20"
       :rules="rules"
    >
      <e-tag-card
        v-for="(data, index) in subjects"
        v-bind:data="data.name"
        v-bind:key="index + 1"
        :label="data.name"
        :span="6"
        @edit="editSubject(data)"
        @delete="deleteSubject(data)"
      />
      <template #footer>
        <e-spacer height="100px" />
      </template>
    </e-form>
  <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <e-dialog
      :title="dialogMode === 'ADD' ? 'Add Subject' : 'Edit ' + subject.name"
      v-model="addSubjectDialog"
      width="30%"
      top="30vh"
      @cancel="addSubjectDialog = false"
      @confirm="handleSubmit(saveSubject)"
    >
      <e-input v-model="subject.name" label="Subject Name" rules="required"/>
    </e-dialog>
  </ValidationObserver>
  </e-container-lite>
</template>
<script>
import { dispatchGraphqlDelete, dispatchGraphqlQuery, dispatchGraphqlMutation, dispatchGraphqlQueryByPk } from "@/api/dispatcher";
import { Mode } from "@/util/contants";
export default {
  data() {
    return {
      addSubjectDialog: false,
      subject: {},
      subjects: [],
      dialogMode: Mode.ADD,
      campusId: '',
      rules: {},
    }
  },
  computed: {
    isValid () {
      return this.subject.name ;
    }
  },
  created() {
    this.getSubjects()
    console.log('router campus id',this.$route.params.id);
    this.campusId = this.$route.params.id
  },
  methods: {
    getSubjects: function() {
      dispatchGraphqlQuery('subjects', ['id', 'name']).then((response) => {
        this.subjects = response.subjects
      })
    },
    getSubjectVariables: function(subject) {
      return {
        'id': subject.id,
        'changes': {
          name: subject.name
        }
      }
    },
    saveSubject() {
      dispatchGraphqlMutation('subjects', ['id', 'name'], this.subject).then((response) => {
        console.log("show", response);
        this.addSubjectDialog = false
        this.dialogMode = Mode.ADD
        this.getSubjects()
      })
    },
    editSubject: function(data) {
      console.log('$$$$$$$$$$$$$$$$$$', data)
      this.getSubject(data.id)
      this.addSubjectDialog = true;
      this.dialogMode = Mode.EDIT;
      this.subject = data;
      console.log(this.subject)
    },
    getSubject: function(subject_id) {
      dispatchGraphqlQueryByPk('subjects',['id', 'name'],{id: subject_id}).then((response) => {
      this.subject = response.subjects_by_pk
    })
    },
    deleteSubject(subject) {
      dispatchGraphqlDelete('subjects', { id: subject.id }).then((response) => {
        console.log(response)
        this.getSubjects()
      })
    },
  },
};
</script>
