<template>
  <div>
    <div style="padding: 20px">
      <el-card
        shadow="none"
        class="bg-black-2"
        style="border: none; padding: 10px 0"
      >
        <el-row>
          <el-col :span="4" :offset="3">
            <div class="text-gray-6">Subject</div>
            <div class="sub-title">{{ assignment.subject.name }}</div>
          </el-col>
          <el-col :span="4">
            <div class="text-gray-6">Received on</div>
            <div class="sub-title">{{ getDate(assignment.created_at) }}</div>
          </el-col>
          <el-col :span="4" style="border-right: 1px solid #6e6e6e">
            <div class="text-gray-6">Due Date</div>
            <div class="sub-title">{{ getDate(assignment.due_date) }}</div>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-row>
              <el-col :span="4" :offset="1">
                <el-avatar
                  :size="50"
                  :src="require('@/assets/images/profile.jpg')"
                />
              </el-col>
              <el-col :span="9">
                <div style="color: #858585">Created by</div>
                <div style="font-weight: bold; font-size: 18px; color: #f3f3f3">
                  {{ assignment.teacher.first_name }}
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
      <br />
      <el-row>
        <el-col :span="15">
          <el-card
            class="rounded-08 bg-black-2"
            style="border: none"
            shadow="none"
          >
            <div style="color: #f3f3f3" class="fs-20 f-600">
              About the assignment
            </div>
            <div
              class="bg-black-3"
              style="padding: 20px; margin-top: 10px; color: #f3f3f3"
            >{{ assignment.description }}
            </div>
          </el-card>
        </el-col>
        <el-col :span="8" :offset="1">
          <el-card
            class="rounded-08 bg-black-2"
            style="border: none"
            shadow="none"
          >
            <div style="color: #f3f3f3" class="fs-20 f-600">
              About the assignment
            </div>

            <div style="flex-wrap:wrap;margin-top:6px" class="d-flex">
                <div v-for="i in 5" :key="i" class="bg-black-3 d-flex" style="width: 140px; padding: 13px;margin:5px">
              <e-svg icon="downloadAttach"></e-svg>
              <div style="color: #1492e6; padding-left: 5px">
                Study data.pdf
              </div>
            </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-row
      style="
        margin-top: 20px;
        background: #1e1e1e;
        padding-top: 25px;
        padding-bottom: 15px;
      "
    >
      <el-col :span="5" :offset="14">
        <es-button text="Cancel" @click="handleCancel" width="200"></es-button>
      </el-col>
      <el-col style="float: right" :span="5">
        <es-button text="Next" width="200" :plain="true" @click="handleNext"></es-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import moment from 'moment'
import { dispatchGraphql } from '@/api/dispatcher'
export default {
  data: () => ({
   assignment: {},
  }),
  methods: {
    handleCancel() {
      this.$router.push(this.$url.LN_ASSIGNMENTS)
    },
    getDate(val) {
      return moment(val).format('DD-MM-yyyy')
    },
    handleNext() {
      console.log("aksgkjaslg", this.assignment)
      this.$emit('save',this.assignment)
    },
    getAssignDetails(){
      const query =`query($id: uuid!) {
        assignments_by_pk(id: $id) { 
          id
          name
          created_at
          description
          due_date
          required_parts
          subject{
            name
          }
          teacher{
            id
            first_name
          }
        }
      }`
      dispatchGraphql(query,{id:this.$route.params.id}).then((response)=> {
        this.assignment = response.assignments_by_pk
        console.log("ffffffffffffff", this.assignment)
      })
    }
  },
  created() {
    this.getAssignDetails()
    console.log("route in 1 ", this.$route.params.id, this.assignment)
    
  }
}
</script>
