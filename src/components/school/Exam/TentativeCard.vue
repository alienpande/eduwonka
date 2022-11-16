<template>
  <div class="view-no-form">
    <el-col class="bg-style sm-width-100" :span="9" v-for="(exam, i) in exams" :key="i">
      <el-row class="tentative-desc">
        <el-col :span="20" class="tentative-desc-font">{{ exam.name }}</el-col>
        <el-col :span="1" :offset="10">
          <div @click="$emit('rightBar', exam)">
            <e-svg icon="dots"></e-svg>
          </div>
        </el-col>
      </el-row><br />
      <el-row class="audiance-style">
        <el-col class="audiance-font" :span="12">Audience</el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="tentative-audiance">
          {{ getTotalStudents(exam) }}
        </el-col>
        <el-col class="tentative-date-margin" :span="12">
          <el-DatePicker class="tenantive-date-picker" v-model="exam.start_date" @change="changeDate(exam)" placeholder="Set Date" />
        </el-col>
      </el-row>
    </el-col>
  </div>
</template>

<script>
import { dispatchGraphql } from "@/api/dispatcher"
import moment from "moment"
export default {
  props: {
    exams: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    changeDate(exam) {
      exam.start_date = moment(exam.start_date).format("YYYY-MM-DD")
      const mutation = `mutation ($id: uuid!, $date: date) {
        update_exams_by_pk(pk_columns: {id: $id}, _set: {start_date: $date}) {
          id
          start_date
        }
      }`
      dispatchGraphql(mutation, { id: exam.id, date: exam.start_date }).then((response) => {
        console.log(response)
      })
    },
    getTotalStudents(exam) {
      var total = 0
      for (const section of exam.standard.standard_sections) {
        total += section.section_students.length
      }
      return total
    },
  }
};
</script>

<style scoped>
.bg-style {
  background-color: #ffffff;
  padding: 20px;
  margin: 10px;
}
.tentative-desc {
  display: flex;
}
.tentative-desc-font {
  font-weight: 600;
  margin-top: 10px;
  width: 100%;
}
.audiance-style {
  margin-top: 15px;
}
.audiance-font {
  font-size: 12px;
}
.tentative-audiance {
  font-weight: 550;
}
.tentative-date-margin {
  margin-top: -20px;
}
.tenantive-date-picker {
  color: #bc6c42;
}
</style>
