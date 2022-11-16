<template>
  <e-container pageTitle="Inactive Students">
    <e-table :table="students" @pageInfo="ptest">
      <el-table-column label="Date" width="600">
        <template slot-scope="scope">
          {{ getDate(scope.row.admission_date) }}
        </template>
      </el-table-column>
      <el-table-column label="Name" prop="first_name" width="650" />
      <el-table-column align="right" width="300">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </e-table>
  </e-container>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher"
import moment from 'moment'
export default {
  data() {
    return {
      activeName: null,
      students: []
    }
  },
  created() {
    this.getSections()
  },
  methods: {
    getDate(date) {
      return moment(date).format('DD MMM YYYY')
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
            status
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        const sections = response.sections.map(x => x.section_students.filter(y => y.status === 'Inactive'))
        if (sections.length > 0) {
          for (const section of sections) {
            if (section.length > 0) {
              this.students = this.students.concat(section)
            }
          }
        }
      })
    },
    handleEdit(row) {
      this.$router.push(this.$url.HQ_STUDENT_DETAILS + "/" + row.id)
    },
    addNewStudent() {
      this.$router.push(this.$url.HQ_STUDENT_FORM);
    },
    ptest(d) {
      console.log(d);
    },
  },
};
</script>
