<template>
  <div>
    <el-row>
      <el-col :span="7" style="padding-bottom: 30px">
        <div style="color: #000000cc; padding-bottom: 10px" class="fs-16 f-600">
          Name
        </div>
        <div style="color: #00000099" class="fs-16">{{ leave.employee ? leave.employee.first_name : leave.student.name }}</div>
      </el-col>
        <el-col :span="7" style="padding-bottom: 30px">
        <div style="color: #000000cc; padding-bottom: 10px" class="fs-16 f-600">
          Department / Standard
        </div>
        <div style="color: #00000099" class="fs-16">{{ leave.employee.designation ? leave.employee.designation.department.name : leave.student.section.standard.name }}</div>
      </el-col>
        <el-col :span="7" style="padding-bottom: 30px">
        <div style="color: #000000cc; padding-bottom: 10px" class="fs-16 f-600">
          Designation / Section
        </div>
        <div style="color: #00000099" class="fs-16">{{ leave.employee.designation ? leave.employee.designation.designation_type : leave.student.section.name }}</div>
      </el-col>
        <el-col :span="7" style="padding-bottom: 30px">
        <div style="color: #000000cc; padding-bottom: 10px" class="fs-16 f-600">
          From Date
        </div>
        <div style="color: #00000099" class="fs-16">{{ getDate(leave.from_date) }}</div>
      </el-col>
        <el-col :span="7" style="padding-bottom: 30px">
        <div style="color: #000000cc; padding-bottom: 10px" class="fs-16 f-600">
          To Date
        </div>
        <div style="color: #00000099" class="fs-16">{{ getDate(leave.to_date) }}</div>
      </el-col>
      <el-col :span="20" style="padding-bottom: 30px">
        <div style="color: #000000cc; padding-bottom: 10px" class="fs-16 f-600">
          Purpose
        </div>
        <div style="color: #00000099" class="fs-16">{{ leave.reasong }}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <div class="heading" style="margin-top: 0">Assignment details</div>
      </el-col>
      <el-col :span="3" :offset="15">
        <e-button label="Edit List" :plain="true"  @click="handalclick()" css="sort-icon"></e-button>
      </el-col>
    </el-row>
    <br />
    <el-card shadow="none" class="rounded-08">
      <div class="detail-header d-flex">
        <div style="width: 8rem; color: #000000cc" class="f-600 fs-16">
          User
        </div>
        <div style="width: 15rem; color: #000000cc" class="f-600 fs-16">
          Department
        </div>
        <div style="width: 15rem; color: #000000cc" class="f-600 fs-16">
          Designation
        </div>
      </div>
      <div class="detail-header d-flex" v-for="(approver, i) in approvers" :key="i" style="margin: 40px 0" >
        <div style="width: 8rem; color: #00000099" class="f-500 fs-16">{{ approver.user.first_name }} </div>
        <div style="width: 15rem; color: #00000099" class="f-500 fs-16">{{ approver.user.designation ? approver.user.designation.department.name : '' }}</div>
        <div style="width: 15rem; color: #00000099" class="f-500 fs-16">{{ approver.user.designation ? approver.user.designation.designation_type : '' }}</div>
      </div>
    </el-card>

    <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px">
      <el-col style="float: right" :span="3">
        <e-button :span="6" label="Next" width="180" @click="$emit('save')" css="float-right" class="p-45" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { dispatchGraphql } from "@/api/dispatcher"
import eButton from "../../controls/eButton.vue"
import moment from 'moment'
export default {
  components: { eButton },
  data() {
    return {
      leave: {},
      approvers: [],
    };
  },
  created() {
    this.getLeave()
  },
  methods: {
    handalclick() {
      this.$emit('edit')
    },
    getDate(date) {
      return moment(date).format("DD MMM YYYY")
    },
    getLeave() {
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
          approvers {
            id
            user {
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
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.leave = response.leaves_by_pk
        this.approvers = this.leave.approvers
        console.log('leave', this.leave)
      })
    }
  }
}
</script>
