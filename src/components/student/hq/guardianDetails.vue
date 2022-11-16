<template>
  <div>
    <el-card class="rounded-08 bg-black-2" :style="'margin: 30px;border: none'" shadow="none" v-if="father.relation === 'father'">
      <el-row>
        <el-col :span="20">
          <span class="tx-20 tx-bolder text-white">Father's Details</span>
        </el-col>
      </el-row>
      <br />
      <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
        <el-row>
          <el-col :span="5" class="mg-l-20 mg-t-55 d-flex">
            <el-avatar :size="50" :src="require('@/assets/images/profile.jpg')" />
            <div class="mg-l-20">
              <div class="text-gray-6">Name</div>
              <div class="sub-title mg-t-4">{{father.student.first_name}} {{father.student.last_name}}</div>
            </div>
          </el-col>
          <el-col :span="18">
            <el-card class="rounded-09 bg-black-3" :style="'border: none'" shadow="none">
              <el-row>
                <el-col :span="4" class="mg-l-30 d-flex">
                  <div>
                    <div class="text-gray-6">Father Name</div>
                    <div class="sub-title mg-t-4">{{father.user.frist_name}} {{father.user.last_name}}</div>
                  </div>
                </el-col>
                <el-col :span="4" class="mg-l-30 d-flex">
                  <div>
                    <div class="text-gray-6">Primary Number</div>
                    <div class="sub-title mg-t-4">{{father.user.mobile_number}}</div>
                  </div>
                </el-col>
                <el-col :span="4" class="mg-l-30 d-flex">
                  <div>
                    <div class="text-gray-6">Profession</div>
                    <div class="sub-title mg-t-4">{{father.user.profession}}</div>
                  </div>
                </el-col>
                <el-col :span="4" class="mg-l-30 d-flex">
                  <div>
                    <div class="text-gray-6">Office Contact No.</div>
                    <div class="sub-title mg-t-4">{{father.user.office_contact}}</div>
                  </div>
                </el-col>
                <el-col :span="4" class="mg-l-30 d-flex">
                  <div>
                    <div class="text-gray-6">DOB</div>
                    <div class="sub-title mg-t-4">{{father.user.dob}}</div>
                  </div>
                </el-col>
              </el-row>
              <el-row class="mg-t-20">
                <el-col :span="4" class="mg-l-30 d-flex">
                  <div>
                    <div class="text-gray-6">Qualification</div>
                    <div class="sub-title mg-t-4">{{father.user.qualification}}</div>
                  </div>
                </el-col>
                <el-col :span="4" class="mg-l-30 d-flex">
                  <div>
                    <div class="text-gray-6">Office Name</div>
                    <div class="sub-title mg-t-4">{{father.user.office_name}}</div>
                  </div>
                </el-col>
                <el-col :span="13" class="mg-l-30 d-flex">
                  <div>
                    <div class="text-gray-6">Office Address</div>
                    <div class="sub-title mg-t-4">
                      {{father.user.office_address}}
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </el-card>
    <el-card class="rounded-08 bg-black-2" :style="'margin: 30px;border: none'" shadow="none" v-if="mother.relation === 'mother'">
      <el-row>
        <el-col :span="20">
          <span class="tx-20 tx-bolder text-white">Mother's Details</span>
        </el-col>
      </el-row>
      <br />
      <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
        <el-row>
          <el-col :span="5" class="mg-l-20 mg-t-55 d-flex">
            <el-avatar :size="50" :src="require('@/assets/images/profile.jpg')" />
            <div class="mg-l-20">
              <div class="text-gray-6">Name</div>
              <div class="sub-title mg-t-4">{{mother.student.first_name}} {{mother.student.last_name}}</div>
            </div>
          </el-col>
          <el-col :span="18">
            <el-card class="rounded-09 bg-black-3" :style="'border: none'" shadow="none">
              <el-row>
                <el-col :span="4" class="mg-l-30 d-flex">
                  <div>
                    <div class="text-gray-6">Mother Name</div>
                    <div class="sub-title mg-t-4">{{mother.user.first_name}} {{mother.user.last_name}}</div>
                  </div>
                </el-col>
                <el-col :span="4" class="mg-l-30 d-flex">
                  <div>
                    <div class="text-gray-6">Primary Number</div>
                    <div class="sub-title mg-t-4">{{mother.user.mobile_number}}</div>
                  </div>
                </el-col>
                <el-col :span="4" class="mg-l-30 d-flex">
                  <div>
                    <div class="text-gray-6">Profession</div>
                    <div class="sub-title mg-t-4">{{mother.user.profession}}</div>
                  </div>
                </el-col>
                <el-col :span="4" class="mg-l-30 d-flex">
                  <div>
                    <div class="text-gray-6">Office Contact No.</div>
                    <div class="sub-title mg-t-4">{{mother.user.office_contact}}</div>
                  </div>
                </el-col>
                <el-col :span="4" class="mg-l-30 d-flex">
                  <div>
                    <div class="text-gray-6">DOB</div>
                    <div class="sub-title mg-t-4">{{mother.user.dob}}</div>
                  </div>
                </el-col>
              </el-row>
              <el-row class="mg-t-20">
                <el-col :span="4" class="mg-l-30 d-flex">
                  <div>
                    <div class="text-gray-6">Qualification</div>
                    <div class="sub-title mg-t-4">{{mother.user.qualification}}</div>
                  </div>
                </el-col>
                <el-col :span="4" class="mg-l-30 d-flex">
                  <div>
                    <div class="text-gray-6">Office Name</div>
                    <div class="sub-title mg-t-4">{{mother.user.office_name}}</div>
                  </div>
                </el-col>
                <el-col :span="13" class="mg-l-30 d-flex">
                  <div>
                    <div class="text-gray-6">Office Address</div>
                    <div class="sub-title mg-t-4">
                      {{mother.user.office_address}}
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </el-card><br />
    <el-card style="background: #1e1e1e;" :style="'border: none'" shadow="none">
      <el-row>
        <el-col style="float: right" :span="5">
          <es-button text="Next" width="200" @click="save"  :plain="true"  ></es-button>
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
    studentParents: [],
    mother: {},
    father: {}
  }),
  created(){
    this.getStudentParent()
  },
  methods: {
    getStudentParent() {
      const parentQuery = `query($student_id: uuid!){
      parent_students(where:{student_id:{_eq: $student_id}}){
          parent_id
          relation
          student{
            id
            first_name
            last_name
          }
          user{
            id
            first_name
            last_name
            mobile_number
            qualification
            qualification
            office_address
            office_contact
            dob
            profession
          }
        }
      }`
      dispatchGraphql(parentQuery, {student_id: getId()}).then((response) => {
        this.studentParents = response.parent_students
        for(const parent of this.studentParents){
          if(parent.relation === 'mother'){
            this.mother = parent
          }else{
            this.father = parent
          }
        }
        console.log('mother', this.mother)
        console.log('father', this.father)
      })
    },
    save() {
      this.$emit('save')
    }
  }
}
</script>
