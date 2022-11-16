<template>
  <el-dialog
    title="Student Selection"
    :visible.sync="dialogBox"
    width="40%"
    :close-on-click-modal="false"
  >
    <el-select v-model="studentId" filterable placeholder="Student" style="width: 100%">
      <el-option v-for="student in students" :key="student.id" :label="student.first_name" :value="student.id" />
    </el-select>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogBox = false">Cancel</el-button>
      <el-button type="primary" @click="handleClick()">Confirm</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { dispatchGraphql } from '@/api/dispatcher'
export default {
  data() {
    return {
      dialogBox: true,
      studentId: '',
      students: [],
      loading: true
    }
  },
  created() {
    this.getstudents()
  },
  methods: {
    getstudents() {
      const query = `query {
        users(order_by: {first_name: asc}, where: {role: {_eq:"student"}}) {
          id
          first_name
        }
      }`
      dispatchGraphql(query).then(response => {
          this.loading = false
          this.students = response.users
          console.log(this.students)
      })
    },
    handleClick() {
      console.log('id', this.studentId)
      this.loading = true
      const query = `query {
        health_informations(where: {student_id: {_eq: "${this.studentId}"}}) {
          id
          student_id
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.loading = false
        if (response.health_informations.length > 0) {
          this.$router.push(this.$url.HQ_HEALTH_RECORD_VIEW + "/" + this.studentId)
        } else {
          this.$router.push(this.$url.HQ_HEALTH_RECORD_FORM + "/" + this.studentId)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
