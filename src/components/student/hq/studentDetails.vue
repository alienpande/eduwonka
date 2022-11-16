<template>
  <div>
    <el-card class="rounded-08 bg-black-2" :style="'margin: 30px;border: none'" shadow="none">
      <el-row>
        <el-col :span="20">
          <span class="tx-20 tx-bolder text-white">Academic Details</span>
        </el-col>
      </el-row>
      <br />
      <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
        <el-row>
          <el-col :span="5" class="mg-l-20 mg-t-20 d-flex">
            <el-avatar :size="50" :src="require('@/assets/images/profile.jpg')" />
            <div class="mg-l-20">
              <div class="text-gray-6">Name</div>
              <div class="sub-title mg-t-4">{{student.first_name}} {{student.last_name}}</div>
            </div>
          </el-col>
          <el-col :span="18">
            <el-card class="rounded-09 bg-black-3" :style="'border: none'" shadow="none">
              <el-col :span="4" class="mg-b-20 mg-l-30 d-flex justify-content-center">
                <div>
                  <div class="text-gray-6">Admission Number</div>
                  <div class="sub-title mg-t-4">{{student.admission_number}}</div>
                </div>
              </el-col>
              <el-col :span="4" class="mg-l-30 d-flex justify-content-center">
                <div>
                  <div class="text-gray-6">Roll Number</div>
                  <div class="sub-title mg-t-4">{{student.roll_number}}</div>
                </div>
              </el-col>
              <el-col :span="4" class="mg-l-30 d-flex justify-content-center">
                <div>
                  <div class="text-gray-6">Admission Date</div>
                  <div class="sub-title mg-t-4">{{student.admission_date}}</div>
                </div>
              </el-col>
              <el-col :span="4" class="mg-l-30 d-flex justify-content-center">
                <div>
                  <div class="text-gray-6">Gender</div>
                  <div class="sub-title mg-t-4">{{student.gender}}</div>
                </div>
              </el-col>
              <el-col :span="4" class="mg-l-30 d-flex justify-content-center">
                <div>
                  <div class="text-gray-6">Standard</div>
                  <div class="sub-title mg-t-4">{{student.section.standard.name}}-{{student.section.name}}</div>
                </div>
              </el-col>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </el-card>
    <el-card class="rounded-08 bg-black-2" :style="'margin: 30px;border: none'" shadow="none">
      <el-row>
        <el-col :span="20">
          <span class="tx-20 tx-bolder text-white">Personal Details</span>
        </el-col>
      </el-row>
      <br />
      <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
        <el-row>
          <el-col :span="24">
            <el-card class="rounded-09 bg-black-3" :style="'border: none'" shadow="none">
              <el-col :span="4" class="mg-b-20 mg-l-30 d-flex">
                <div>
                  <div class="text-gray-6">UID Number</div>
                  <div class="sub-title mg-t-4">{{student.uid_number}}</div>
                </div>
              </el-col>
              <el-col :span="4" class="mg-l-30 d-flex">
                <div>
                  <div class="text-gray-6">Mobile Number</div>
                  <div class="sub-title mg-t-4">{{student.mobile_number}}</div>
                </div>
              </el-col>
              <el-col :span="4" class="mg-l-30 d-flex">
                <div>
                  <div class="text-gray-6">Nationality</div>
                  <div class="sub-title mg-t-4">{{student.nationality}}</div>
                </div>
              </el-col>
              <el-col :span="4" class="mg-l-30 d-flex">
                <div>
                  <div class="text-gray-6">Mother Tongue</div>
                  <div class="sub-title mg-t-4">{{student.mother_tongue}}</div>
                </div>
              </el-col>
              <el-col :span="4" class="mg-l-30 d-flex">
                <div>
                  <div class="text-gray-6">Standard</div>
                  <div class="sub-title mg-t-4">{{student.section.standard.name}}-{{student.section.name}}</div>
                </div>
              </el-col>
              <el-col :span="20" class="mg-b-20 mg-l-30 d-flex">
                <div>
                  <div class="text-gray-6">Address</div>
                  <div class="sub-title mg-t-4">
                    {{student.address}}
                  </div>
                </div>
              </el-col>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </el-card>
    <el-card class="rounded-08 bg-black-2" :style="'margin: 30px;border: none'" shadow="none">
      <el-row>
        <el-col :span="20">
          <span class="tx-20 tx-bolder text-white">Sibling Information</span>
        </el-col>
      </el-row>
      <br />
      <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
        <el-row>
          <el-col :span="24">
            <el-card class="rounded-09 bg-black-3" :style="'border: none'" shadow="none">
              <el-col :span="6" class="mg-b-20 mg-l-30 d-flex">
                <div>
                  <div class="text-gray-6">Do you have any Sibling in school?</div>
                  <div class="sub-title mg-t-4">{{getSiblingStatus()}}</div>
                </div>
              </el-col>
              <div v-if="student.student_sibling_id">
                <el-col :span="4" class="mg-l-30 d-flex">
                  <div>
                    <div class="text-gray-6">Name of Sibling</div>
                    <div class="sub-title mg-t-4">{{sibling.first_name}}-{{sibling.last_name}}</div>
                  </div>
                </el-col>
                <el-col :span="4" class="mg-l-30 d-flex">
                  <div>
                    <div class="text-gray-6">Class-Section</div>
                    <div class="sub-title mg-t-4">{{sibling.section.standard.name}}-{{sibling.section.name}}</div>
                  </div>
                </el-col>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </el-card>
    <el-card class="rounded-08 bg-black-2" :style="'margin: 30px;border: none'" shadow="none">
      <el-row>
        <el-col :span="20">
          <span class="tx-20 tx-bolder text-white">Unregistered Details</span>
        </el-col>
      </el-row>
      <br />
      <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
        <el-row>
          <el-col :span="24">
            <el-card class="rounded-09 bg-black-3" :style="'border: none'" shadow="none">
              <el-col :span="5" class="mg-b-20 mg-l-30 d-flex">
                <div>
                  <div class="text-gray-6">Date of unregistration</div>
                  <div class="sub-title mg-t-4">{{student.date_of_leaving}}</div>
                </div>
              </el-col>
              <el-col :span="4" class="mg-l-30 d-flex">
                <div>
                  <div class="text-gray-6">Last class and section</div>
                  <div class="sub-title mg-t-4">{{student.section.standard.name}}-{{student.section.name}}</div>
                </div>
              </el-col>
              <el-col :span="13" class="mg-l-30 d-flex">
                <div>
                  <div class="text-gray-6">Reason for leaving the Organization</div>
                  <div class="sub-title mg-t-4">{{student.reason_for_exit}}</div>
                </div>
              </el-col>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </el-card>
    <el-card style="background: #1e1e1e;" :style="'border: none'" shadow="none">
      <el-row>
        <el-col style="float: right" :span="5">
          <es-button text="Next" width="200" @click="save"  :plain="true" />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher"
import { getId } from '@/util/auth'
export default {
  components: {},
  data: () => ({
    student: {},
    sibling: {}
  }),
  created(){
    this.getOneStudent()
  },
  methods: {
    getSiblingStatus: function(){
      if(this.student.student_sibling_id){
        return "Yes"
      }
      return "No"
    },
    getOneStudent() {
      console.log('aaaaaaaaaa', getId())
      const myQuery = `query {
        users_by_pk(id:"${getId()}") {
          first_name
          last_name
          roll_number
          admission_date
          admission_number
          gender
          uid_number
          nationality
          mother_tongue
          caste
          address
          mobile_number
          student_sibling_id
          reason_for_exit
          date_of_leaving
          section{
            name
            standard{
              name
            }
          }
        }
      }`
      dispatchGraphql(myQuery).then((response) => {
        this.student = response.users_by_pk
        this.getSibling(this.student.student_sibling_id)
        // this.invoiceDetails.push(
        //   { title: "Student Name",text: response.users_by_pk.first_name },
        //   { title: "Roll Number",text: response.users_by_pk.roll_number },
        //   { title: "Admission Date",text: response.users_by_pk.admission_date },
        //   { title: "Admission Number",text: response.users_by_pk.admission_number },
        //   { title: "standard",text: response.users_by_pk.section.standard.name + '-' + response.users_by_pk.section.name },
        //   { title: "Gender",text: response.users_by_pk.gender }
        // )
        // this.personalDetails.push(
        //   { title: "UID Number", text: response.users_by_pk.uid_number },
        //   { title: "Mobile Number",text: response.users_by_pk.mobile_number },
        //   { title: "Nationality", text: response.users_by_pk.nationality },
        //   { title: "Mother tongue ", text:response.users_by_pk.mother_tongue },
        //   { title: "Caste",text: response.users_by_pk.caste }
        // )
        // this.permanentAdress = response.users_by_pk.address
        // this.unregisDetails.push({title: "Date of unregistration", text: response.users_by_pk.date_of_exit})
        // console.log("sibling id", response.users_by_pk.student_sibling_id)
        // this.studentSiblingId = response.users_by_pk.student_sibling_id
        // this.studentId = response.users_by_pk.id
        // this.getSibling(this.studentSiblingId)
        // this.reason = response.users_by_pk.reason_for_exit
      })
    },
    getSibling(studentSiblingId){
     console.log("iam in sibling", studentSiblingId)
      const siblingQuery = `query($id:uuid!){
        users_by_pk(id:$id){
          first_name
          last_name
          section{
            name
            standard {
              name
            }
          }
        }
      }`
      dispatchGraphql(siblingQuery,{id:studentSiblingId}).then((response) => {
        this.sibling = response.users_by_pk
        console.log('RRRRRRRRRRRRRRRR',this.sibling)
      })
    },
    save: function() {
      this.$emit('save')
    }
  }
}
</script>
