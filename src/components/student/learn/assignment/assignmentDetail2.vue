<template>
  <div>
    <div style="padding: 20px">
      <el-card class="rounded-08 bg-black-2" style="border: none" shadow="none">
        <div style="color: #f3f3f3" class="fs-20 f-600">
          About the assignment
        </div>
        <div
          class="rounded-08"
          style="border: 1px solid #6e6e6e; padding: 20px; margin-top: 10px"
        >
          <el-row v-for="item of assignSubmission.assignment_details" :key="item.name">
          
            <el-col  >
              <!-- <div item.name>  -->
              <es-input  :placeholder="item.name" :label="item.name" v-model="item.value" @change="handleInput"></es-input>
              <!-- </div> -->
            </el-col>
            
            <!-- <el-col :span="11">
              
              <el-card
                style="border: none; height: 248px"
                class="bg-black-3 text-white"
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </el-card>
            </el-col> -->
          </el-row>
        </div>
      </el-card>
      <br />
      <el-card class="rounded-08 bg-black-2" style="border: none" shadow="none">
        <div style="color: #f3f3f3" class="fs-20 f-600">
          Attach your assignment here
        </div>
        <div
          class="rounded-08"
          style="border: 1px solid #6e6e6e; padding: 20px; margin-top: 10px"
        >
          <div
            style="
              background: #353535;
              border: 1px dashed #575757;
              border-radius: 8px;

              padding: 50px 0;
            "
          >
            <e-svg style="display: table; margin: auto" icon="uploadIcon">
            </e-svg>
            <div style="color: #cfcfcf; text-align: center; font-size: 12px">
              Drag & drop file here or Click to add
            </div>
          </div>
          <br />
          <div class="hr"></div>
          <br />
          <el-row>
            <el-col
              :span="11"
              style="margin-right: 10px"
              v-for="i in 4"
              :key="i"
            >
              <el-row
                style="
                  border-radius: 4px;
                  background: #282828;
                  padding: 10px;
                  margin: 10px;
                "
              >
                <el-col :span="2">
                  <img
                    style="width: 36px; height: 36px"
                    src="@/assets/images/Rectangle9.png"
                    alt=""
                  />
                </el-col>
                <el-col :span="20">
                  <div>
                    <div v-if="i==1 || i==2">
                      <div style="font-size: 14px; color: white">
                        Social Science Exam Papers.pdf
                      </div>
                      <div style="color: #858585">230KB</div>
                    </div>
                    <di v-else class="d-flex" >
                      <div>
                        <div style="font-size: 14px; color: white">
                          Solved Assignment...
                        </div>
                        <div style="color: #858585">230KB</div>
                      </div>
                      <div>
                        <div
                          style="
                            width: 216px;
                            height: 8px;
                            background: #353535;
                            border-radius: 4px;margin-top:12px;margin-left:30px;
                          "
                        >
                          <div
                            style="
                              width: 73px;
                              height: 8px;
                              background: #1fc24e;
                              border-radius: 4px;
                            "
                          ></div>
                        </div>
                      </div>
                    </di>
                  </div>
                </el-col>
                <el-col :span="2" class="ref-book-cross">
                  <e-svg style="margin-top: 15px" icon="redCross"></e-svg>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <br/>
        <es-button icon='addPluse' width='250' text="Add additional notes"></es-button>
      </el-card>
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
        <es-button text="Cancel" width="200" @click="handleCancel()"></es-button>
      </el-col>
      <el-col style="float: right" :span="5">
        <es-button text="Submit" width="200" @click="$url.LN_ASSIGNMENTS"  :plain="true"  ></es-button>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped></style>
<script>
import { dispatchGraphql, dispatchGraphqlMutation } from '@/api/dispatcher'
import { getId } from '@/util/auth'
export default {
  props: {
    assignmentInfo: {
      type: Object,
      default: null
    }
  },
  data: () => ({ 
    assignSubmission: {
      assignment_id: '',
      user_id: '',
      assignment_details:[],
    }
  }),  
  methods: {
    handleCancel() {
     this.$emit('back')
    },
    handleInput(){
      if (!this.assignSubmission.id){
        this.assignSubmission.assignment_id = this.assignmentInfo.id
        this.assignSubmission.user_id = getId()
        dispatchGraphqlMutation('assignment_submissions', ['id' , 'assignment_details'], this.assignSubmission ).then((response) => {
          console.log(response)
          console.log("output", this.assignSubmission)   
          this.getAssignmentSubmissions()
        })
      }
      else {
        dispatchGraphqlMutation('assignment_submissions', ['id' , 'assignment_details'], this.assignSubmission).then((response) => {
          console.log(response)
          console.log("output", this.assignSubmission) 
          this.getAssignmentSubmissions()  
        })
      }  
        // this.taskid =  response.insert_tasks_one.id
        // console.log("idddddd", this.taskid)
        // this.$emit("save", this.ass)       
    },
    // getVariables() {
    //   this.assignSubmission.assignment_id = this.assignmentInfo.id
    //   this.assignSubmission.user_id = getId()
    //   return this.assignSubmission
    // },
    getRequiredParts() {
      for(const item of this.assignmentInfo.required_parts) {
        this.assignSubmission.assignment_details.push({"name":item, "value": ''})
      }
        console.log("assignment_details",this.assignSubmission.assignment_details)
    },
    // getLabel(val){
    //   return toString(val)
    // },
    getAssignmentSubmissions() {
      const query =`query($id:uuid!){
        assignment_submissions(where:{assignment_id:{_eq: $id}}){
          id
          assignment_details
          user_id
          assignment_id
        }
      }`
      dispatchGraphql(query,{id:this.$route.params.id}).then((response) =>{
        console.log("i am debugger")
        this.assignSubmission.id= response.assignment_submissions[0].id
        this.assignSubmission.user_id= response.assignment_submissions[0].user_id
        this.assignSubmission.assignment_id= response.assignment_submissions[0].assignment_id
        this.assignSubmission.assignment_details = response.assignment_submissions[0].assignment_details
        console.log("assignmentsubmisssion", this.assignSubmission)
      })
    },
    // if (this.assignment_submissions.id!=null)
  },
  created(){
    console.log("asignment data", this.assignmentInfo)
    this.getRequiredParts()
    this.getAssignmentSubmissions()
  },
}
</script>
