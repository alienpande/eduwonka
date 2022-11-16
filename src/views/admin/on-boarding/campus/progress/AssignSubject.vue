<template>
<ValidationObserver ref="observer" v-slot="{ handleSubmit }">
  <e-container-lite
    tag="North Campus"
    :campusid="$route.params.id"
    showFooter
    @back="$go('/on-boarding/subject-creation/'+ $route.params.id)"
    @next="handleSubmit(handleClick())"
  >
    <!-- @next="$go($url.ATTENDANCE_AND_EXAM)" -->
    <template #titleHead>
      <div class="h1">Assign Subject</div>
      <div class="h5">Kindly assign the subjects to the relevant standards</div>
    </template>
    <e-form
      :heading="item.name"
      v-for="(item, key) in standards_data"
      v-bind:item="item"
      :id="key"
      :key="item.name + key"
      :rules="rules"
    >
      <el-col :span="24" class="mb20">Choose Subject</el-col>
      <el-checkbox
        class="toggle-style"
        v-for="(sub) in item.subjects"
        v-model="sub.checked"
        v-bind:key="sub.id"
        :label="sub.name"
        @change="handleSubmit(addOrRemoveSubject(sub, item))"
        border
        rules="required"
      />
    </e-form>
  </e-container-lite>
  </ValidationObserver>
</template>
<script>
import { dispatchGraphql, dispatchGraphqlDelete } from "@/api/dispatcher"
export default {
  data() {
    return {
      rules: {},
      mutation: `mutation insert_multiple_standard_subjects($objects: [standard_subjects_insert_input!]!) {
        insert_standard_subjects(objects: $objects) {
          returning {
            id
            standard_id
            subject_id
          }
        }
      }`,
      standards_data:[],
      subjects_data:[],
      assign_subs: [],
      standard_subject_data: [],
      newStandardSubjects: [],
    };
  },
  computed: {
    isValid () {
      return this.sub.name ;
    }
  },
  created() {
    // this.defaultSubjects = Object.assign([], require("@/api/subjects.json"));
    // this.standards_data = require("@/api/standards_data.json");

    // this.standards_data.forEach((c) => {
    //   if (c.subjects.length > 0) {
    //     this.subjects_data.forEach((s, i) => {
    //       const isFound = c.subjects.filter((x) => x.id === s.id)[0];
    //       if (!isFound) {
    //         c.subjects[i] = s;
    //       }
    //     });
    //   } else {
    //     this.subjects_data.forEach((s) => {
    //       c.subjects.push({ ...s });
    //     });
    //   }
    // });
    this.getStandardsAndSubject()
  },
  methods: {
    getStandardsAndSubject: function() {
      const query = `query MyQuery {
        standards(order_by: {position: asc}){
          id
          name
          standard_subjects {
            id
            standard_id
            subject_id
          }
        }
        subjects(order_by: {name: asc}){
          id
          name
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.standards_data = response.standards
        this.subjects_data = response.subjects
        this.standard_subject_data = response.standard_subjects
        console.log('........', this.standards_data)
        for (const standard of this.standards_data) {
          standard.subjects = []
          standard.subjects = this.subjects_data
          standard.subjects = standard.subjects.map(item => ({['name']: item.name, ['id']: item.id}))
          var result = standard.subjects.filter(function (x) {
            return standard.standard_subjects.some(function (y) {
              if (x.id === y.subject_id) {
                x.checked = true
              }
            })
          })
          console.log(result)
        }
      })
    },
    getClassIndex(list, id) {
      return list.findIndex((e) => e.id == id);
    },
    addOrRemoveSubject(sub, standard) {
      if(sub.checked) {
        this.newStandardSubjects.push({
          standard_id: standard.id,
          subject_id: sub.id
        })
      } else {
        const standardSubject = standard.standard_subjects.filter(x => x.subject_id === sub.id && x.standard_id === standard.id)[0]
        if (standardSubject) {
          dispatchGraphqlDelete('standard_subjects', { id: standardSubject.id }).then((response) => {
            console.log('delete', response)
            this.getStandardsAndSubject()
          })
        }
        // const data = this.newStandardSubjects.filter(x => x.subject_id === sub.id && x.standard_id === standard.id)[0]
        // const index = this.newStandardSubjects.indexOf(data)
        // this.newStandardSubjects.splice(index, 1)
      }
      console.log("add", this.newStandardSubjects)
    },

    getVariables: function() {
      this.newStandardSubjects.map(x => x.campus_id=this.$route.params.id)
      return { "objects": this.newStandardSubjects }
    },
    handleClick() {
      if (this.newStandardSubjects.length > 0) {
        dispatchGraphql(this.mutation, this.getVariables()).then((response) => {
          console.log('save', response)
        })
      }
      this.$router.push(`/on-boarding/attendance-and-exam/${this.$route.params.id}`)
    }
  },
};
</script>
