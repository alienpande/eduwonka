<template>
  <e-container-lite
    :percentage="20"
    tag="North Campus"
    showFooter
    @back="$go($url.STANDARD_SEQUENCING)"
    @next="$go($url.ASSIGN_SUBJECT)"
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
    >
      <e-tag-card
        v-for="(item, index) in subjects"
        v-bind:item="item"
        v-bind:key="index + 1"
        :label="item.name"
        :span="6"
        @edit="editSubject(item)"
        @delete="deleteSubject(item)"
      />
      <template #footer>
        <e-spacer height="100px" />
      </template>
    </e-form>

    <e-dialog
      :title="dialogMode === 'ADD' ? 'Add Subject' : 'Edit ' + subject"
      v-model="addSubjectDialog"
      width="30%"
      top="30vh"
      @cancel="addSubjectDialog = false"
      @confirm="saveSubject"
    >
      <e-input v-model="subject" label="Subject Name" />
      <!-- <e-input v-model="subject_code" label="Subject Code" /> -->
    </e-dialog>
  </e-container-lite>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher";
import { Mode } from "@/util/contants";
export default {
  data() {
    return {
      addSubjectDialog: false,
      subject: "",
      subject_code: "",
      subjects: [],
      dialogMode: Mode.ADD,
      itemToEdit: {},
      mutation: `mutation insert_single_subjects($object: subjects_insert_input! ) {
        insert_subjects_one(object: $object) {
          id,
          name
        }
      }`,
      getSubjectsQuery: `query MyQuery {
        subjects(where: {campus_id: {_eq: "0bb2a3ab-6cd7-4ab6-bbf5-b5a6d65c8e10"}}) {
         name
          subject_code
          id
          created_at
        }
      }`
    };
  },
  created() {
    // / this.subjects = require("@/api/subjects.json"); /
    dispatchGraphql(this.getSubjectsQuery).then((response) => {
      console.log("show", response);
      this.subjects = response.subjects;
    })
  },
  methods: {
    getVariables: function () {
      return {
        object: {
          campus_id: "0bb2a3ab-6cd7-4ab6-bbf5-b5a6d65c8e10",
          name: this.subject,
          subject_code: this.subject_code
        },
      }
    },
    saveSubject() {
      if (this.dialogMode === Mode.ADD) {
        dispatchGraphql(this.mutation, this.getVariables()).then((response) => {
          console.log("show", response);
          this.subjects.push({ id: response.insert_subjects_one.id, name: response.insert_subjects_one.name });
          // / this.$emit("save", this.subjects); /
        })
      //  /  this.subjects.push({ id: this.subjects.length, name: this.subject }); /
      }
      if (this.dialogMode === Mode.EDIT) {
        this.subjects.forEach((subject) => {
          if (subject.id === this.itemToEdit.id) {
            subject.name = this.subject;
          }
        });
      }
      this.addSubjectDialog = false;
      this.subject = "";
      this.dialogMode = Mode.ADD;
    },
    editSubject(i) {
      this.addSubjectDialog = true;
      this.dialogMode = Mode.EDIT;
      this.subject = i.name;
      this.itemToEdit = i;
    },
    deleteSubject(i) {
      this.subjects.splice(i, 1);
    },
  },
};
</script>
