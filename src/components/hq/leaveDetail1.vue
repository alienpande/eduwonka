<template>
  <div>
    <el-row>
      <el-col :span="7" style="padding-bottom: 30px">
        <div style="color: #000000cc; padding-bottom: 10px" class="fs-16 f-600">
          Name
        </div>
        <div style="color: #00000099" class="fs-16">{{ leave.employee ? leave.employee.first_name : leave.student.first_name }}</div>
      </el-col>
      <el-col :span="7" style="padding-bottom: 30px" >
        <div style="color: #000000cc; padding-bottom: 10px" class="fs-16 f-600">
          Department / Standard
        </div>
        <div style="color: #00000099" class="fs-16">{{ leave.employee.designation ? leave.employee.designation.department.name : leave.student.section.standard.name }}</div>
      </el-col>
      <el-col :span="7" style="padding-bottom: 30px">
        <div style="color: #000000cc; padding-bottom: 10px" class="fs-16 f-600" >
          Designation / Section
        </div>
        <div style="color: #00000099" class="fs-16">{{ leave.employee.designation ? leave.employee.designation.designation_type : leave.student.section.name }}</div>
      </el-col>
      <el-col :span="7" style="padding-bottom: 30px" >
        <div style="color: #000000cc; padding-bottom: 10px" class="fs-16 f-600" >
          From Date
        </div>
        <div style="color: #00000099" class="fs-16">{{ getDate(leave.from_date) }}</div>
      </el-col>
      <el-col :span="7" style="pa}dding-bottom: 30px" >
        <div style="color: #000000cc; padding-bottom: 10px" class="fs-16 f-600" >
          To Date
        </div>
        <div style="color: #00000099" class="fs-16">{{ getDate(leave.to_date) }}</div>
      </el-col>
      <el-col>
        <div style="color: #000000cc; padding-bottom: 10px" class="fs-16 f-600">
          Purpose
        </div>
        <div style="color: #00000099" class="fs-16">{{ leave.reasong }}</div>
      </el-col>
    </el-row>
    <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px">
      <el-col style="float: right" :span="3">
        <e-button :span="6" label="Next" width="180" @click="$emit('save')" css="float-right" class="p-45" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher"
import moment from 'moment'
export default {
  data() {
    return {
      leave: {}
    }
  },
  created() {
    this.getLeaves()
  },
  methods: {
    getDate(date) {
      return moment(date).format("DD MMM YYYY")
    },
    getLeaves() {
      const query=`query MyQuery {
        leaves_by_pk(id: "${this.$route.params.id}") {
          id
          from_date
          to_date
          leavable_type
          reasong
          employee {
            id
            first_name
            designation {
              id
              designation_type
              department {
                id
                name
              }
            }
          }
          student {
            id
            first_name
            section {
              id
              name
              standard {
                id
                name
              }
            }
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.leave = response.leaves_by_pk
        console.log('leave', this.leave)
      })
    }
  },
}
</script>