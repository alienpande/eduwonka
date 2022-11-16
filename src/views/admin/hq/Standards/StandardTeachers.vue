<template>
  <e-container pageTitle="Teachers">
    <el-tabs class="floatTabHeader" v-model="activeName">
      <el-tab-pane v-for="(section, i) in sections" :key="i" :label="section.standard.name + ' - ' + section.name" :name="section.name">
        <e-dashcard :obj="teachersReport" />
          <el-row style="margin-top: 1rem; margin-bottom: 2rem" class="searchCard searchCard-2">
          <el-col :span="19">
            <p class="heading " style="margin: 0px !important;padding-left: 0px !important;"> List of teachers present in
              <b>{{ section.standard.name + " - " + section.name }}</b>
            </p>
          </el-col>
          <e-button :span="3" class="button-margin" icon="el-icon-plus" label="Add Teacher" @click="addStudentDialog = true" />
          <el-col :span="2"  class="dropdown-tab">
            <e-button
              icon="el-icon-search"
              :plain="true"
              type="primary"
            ></e-button>
          </el-col>  
        </el-row>
        <e-table :table="section.section_teachers" @pageInfo="ptest">
          <el-table-column label="Date" prop="date" width="400">
            <template slot-scope="scope">
              {{ scope.row.teacher ? getDate(scope.row.teacher.created_at) : '' }}
              </template>
          </el-table-column>
          <el-table-column label="Name" width="400">
            <template slot-scope="scope">
              {{ scope.row.teacher ? scope.row.teacher.first_name : '' }}
            </template>
          </el-table-column>
          <el-table-column label="Subject" width="400">
            <template slot-scope="scope">
              {{ scope.row.subject.name }}
            </template>
          </el-table-column>
          <el-table-column align="right" width="200">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)">Edit</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row)">Delete</el-button>
            </template>
          </el-table-column>
        </e-table>
      </el-tab-pane>
    </el-tabs>
  </e-container>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher"
import { mapGetters } from "vuex"
import moment from 'moment'
import _ from 'lodash'
export default {
  data() {
    return {
      activeName: null,
      teachersReport: [
        {
          title: "Total Teachers",
          value: "0",
          icon: "hq/student",
        },
        {
          title: "Total Male",
          value: "0",
          icon: "hq/boy",
        },
        {
          title: "Total Female",
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
    this.getSections()
  },
  methods: {
    getDate(date) {
      return moment(date).format("DD MMM YYYY")
    },
    setSection() {
      const tab = this.sections.filter(x => x.name === this.activeName)[0]
      this.teachersReport[0].value = tab.section_teachers.length
      const boys = tab.section_teachers.filter(data => (data.teacher.gender === 'male' || data.teacher.gender === 'Male'))
      this.teachersReport[1].value = boys.length
      const girls = tab.section_teachers.filter(data => (data.teacher.gender === 'female' || data.teacher.gender === 'Female'))
      this.teachersReport[2].value = girls.length
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
          section_teachers {
            id
            teacher {
              id
              first_name
              created_at
              gender
            }
            subject {
              id
              name
            }
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.sections = response.sections
        console.log(this.sections)
        this.activeName = this.sections[0].name
        this.teachersReport[0].value = this.sections[0].section_teachers.length
        const boys = this.sections[0].section_teachers.filter(data => (data.teacher.gender === 'male' || data.teacher.gender === 'Male'))
        this.teachersReport[1].value = boys.length
        const girls = this.sections[0].section_teachers.filter(data => (data.teacher.gender === 'female' || data.teacher.gender === 'Female'))
        this.teachersReport[2].value = girls.length
      })
    },
    addNewStudent() {
      this.$router.push(this.$url.HQ_STUDENT_FORM);
    },
    handleEdit(row) {
      this.$router.push(this.$url.HQ_EMPLOYEE_FORM + "/" + row.teacher.id)
    },
    ptest(d) {
      console.log(d);
    },
  },
};
</script>
