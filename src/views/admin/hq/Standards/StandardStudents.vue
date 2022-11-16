<template>
  <e-container class="hq-add-students-class" pageTitle="Students">
    <el-tabs class="floatTabHeader" v-model="activeName">
      <el-tab-pane v-for="(section, i) in sections" :key="i" :label="section.standard.name + ' - ' + section.name" :name="section.name">
        <e-dashcard :obj="studentReport" />
        <el-row style="margin-top: 1rem; margin-bottom: 2rem" class="searchCard searchCard-2">
          <el-col :span="19">
            <p class="heading " style="margin: 0px !important;padding-left: 0px !important;"> List of students present in
              <b>{{ section.standard.name + " - " + section.name }}</b>
            </p>
          </el-col>
          <e-button :span="3" class="button-margin" icon="el-icon-plus" label="Add Student" @click="addStudentDialog = true" />
          <el-col :span="2"  class="dropdown-tab">
            <e-button
              icon="el-icon-search"
              :plain="true"
              type="primary"
            ></e-button>
          </el-col>  
        </el-row>
        <e-table :table="section.section_students" @pageInfo="ptest">
          <el-table-column label="Date" >
            <template slot-scope="scope">
              {{ getDate(scope.row.admission_date) }}
            </template>
          </el-table-column>
          <el-table-column label="Name" prop="first_name"  />
          <el-table-column   label="Action">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)">Edit</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row)">Delete</el-button>
            </template>
          </el-table-column>
        </e-table>

        <e-dialog :title="'Add Students to ' + section.standard.name + ' - ' + section.name"
          v-model="addStudentDialog"
          width="60%"
          top="20vh"
          noEsc
          :gutter="20"
          hideDefaultFooter
          @cancel="addStudentDialog = false"
          @confirm="addStudentDialog = false"
        >
          <el-col :span="24" style="margin-bottom: 15px;margin-top: -30px;padding-bottom: 20px;font-size: 12px;border-bottom: 2px solid rgb(252, 223, 189);">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu
            venenatis tellus. Fusce faucibus est vitae facilisis consectetur.
          </el-col>
          <el-row :gutter="20" style="margin-bottom: 10px ;padding:0px !important" class="searchCard searchCard-2" >
            <el-col :span="6" style="font-size: 18px; font-weight: bold; ">
              {{ selectedStudents.length }} students
            </el-col>
            <!-- <el-col :span="4" :offset="10">&emsp;</el-col> -->
            <el-col :span="4" style="margin-left: auto !important;">
              <e-button :span="10" label="Update" width="100" @click="updateStudents(section)" />
            </el-col>
          </el-row>
          <el-row class="student-profiles-container">
            <student-profile-card v-for="(student, i) in students" :key="i" :disabled="verifyStudent(student, section)" v-model="student.status" :id="student.id" :name="student.first_name" :src="require('@/assets/images/profile.jpg')" @input="updateSelected" />
          </el-row>
        </e-dialog>
      </el-tab-pane>
    </el-tabs>
    <!-- <es-pagination class="pagination" :total="" @pagination=""></es-pagination> -->
    <es-pagination class="pagination"  @pagination=""></es-pagination>
  </e-container>
</template>
<script>
import StudentProfileCard from "@/components/hq/Standards/StudentProfileCard.vue"
import { dispatchGraphql } from "@/api/dispatcher"
import { mapGetters } from "vuex"
import moment from 'moment'
import _ from 'lodash'
export default {
  components: { StudentProfileCard },
  data() {
    return {
      activeName: null,
      sections: [],
      students: [],
      addStudentDialog: false,
      selectedStudents: [],
      studentReport: [
        {
          title: "Total Students",
          value: "0",
          icon: "hq/student",
        },
        {
          title: "Total Boys",
          value: "0",
          icon: "hq/boy",
        },
        {
          title: "Total Girls",
          value: "0",
          icon: "hq/girl",
        },
      ]
    }
  },
  computed: {
    ...mapGetters("Common", ["standardMenu"]),
  },
  watch: {
    activeName: _.debounce(function() {
      this.setSection()
    })
  },
  created() {
    this.getStudents()
    this.getSections()
  },
  methods: {
    addNewStudent() {
      this.$router.push(this.$url.HQ_STUDENT_FORM);
    },
    updateStudents(section) {
      this.addStudentDialog = false
      const mutation = `mutation($ids: [uuid!]) {
        update_users(where: {id: {_in: $ids}}, _set: {section_id: "${section.id}"}) {
          affected_rows
          returning {
            id
          }
        }
      }`
      dispatchGraphql(mutation, { ids: this.selectedStudents }).then((response) => {
        console.log(response)
        this.getStudents()
      })
    },
    updateSelected(val, id) {
      const i = this.selectedStudents.indexOf(id)
      if (val) {
        this.selectedStudents.push(id)
      } else {
        this.selectedStudents.splice(i, 1)
      }
      console.log('selected', this.selectedStudents)
    },
    verifyStudent(student, section) {
      if (student.section_id === section.id) {
        return true
      } else {
        return false
      }
    },
    getDate(date) {
      return moment(date).format('DD MMM YYYY')
    },
    setSection() {
      const tab = this.sections.filter(x => x.name === this.activeName)[0]
      this.studentReport[0].value = tab.section_students.length
      const boys = tab.section_students.filter(data => (data.gender === 'male' || data.gender === 'Male'))
      this.studentReport[1].value = boys.length
      const girls = tab.section_students.filter(data => (data.gender === 'female' || data.gender === 'Female'))
      this.studentReport[2].value = girls.length
    },
    getSections() {
      const query = `query {
        sections(where: {standard_id: {_eq: "${this.$route.params.id}"}}) {
          id
          name
          standard {
            id
            name
          }
          section_students {
            id
            first_name
            admission_date
            gender
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.sections = response.sections
        console.log(this.sections)
        this.activeName = this.sections[0].name
        this.studentReport[0].value = this.sections[0].section_students.length
        const boys = this.sections[0].section_students.filter(data => (data.gender === 'male' || data.gender === 'Male'))
        this.studentReport[1].value = boys.length
        const girls = this.sections[0].section_students.filter(data => (data.gender === 'female' || data.gender === 'Female'))
        this.studentReport[2].value = girls.length
      })
    },
    getStudents() {
      const query = `query {
        users(where: {_and: [{role: {_eq: "student"}}, {status: {_eq: "Active"}}]}) {
          id
          first_name
          section_id
          status
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.students = response.users
        this.selectedStudents = this.students.map(x => x.id)
      })
    },
    handleEdit(row) {
      this.$router.push(this.$url.HQ_STUDENT_DETAILS + "/" + row.id)
    },
    ptest(d) {
      console.log(d);
    },
  },
};
</script>
<style scoped>
@media only screen and (device-width: 768px) {
  .pagination {
    width: 50%;
    font-size: 12px;
  }
  .button-margin {
    margin-right: 35px;
  }
}
</style>