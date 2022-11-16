<template>
  <div>
    <es-container pageTitle="Assignment">
      <el-tabs class="floatTabHeader studentTab" v-model="activeName">
        <el-tab-pane label="Not Started" name="notStarted">
          <el-row>
            <el-col :span="6">
              <div style="color: #cfcfcf">{{ notStarted.length }} Assignments</div>
            </el-col>
            <el-col :span="7" :offset="6">
              <es-search
                style="margin-top: 3px"
                v-model="searchHeader"
                placeholder="Search by Subject, Class or Timing"
              >
              </es-search>
            </el-col>
            <el-col :span="3" :offset="2">
              <!-- <es-select placeholder="Subject" class="select-icon"></es-select> -->
              <el-dropdown @command="handleSubject"   >
                <span class="el-dropdown-link" primary style="color: #696969; background-color: #353535 ; border-radius:40px ;padding: 2px 8px 8px 8px;">
                Subjects<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="item in subjectsData" :key="item.id" :command="item.id">{{ item.name }}</el-dropdown-item>
              </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
          <br />
          <el-row>
            <el-col :span="8" v-for="assignment in notStarted" :key="assignment.id" style="padding: 10px">
              <el-card
                shadow="none"
                style="padding: 8px; border: none"
                class="rounded-08 pg-50 bg-black-2"
              >
                <el-row>
                  <el-col :span="1">
                    <img
                      style="margin-top: -5px"
                      src="@/assets/images/mathIcon.png"
                      alt=""
                    />
                  </el-col>
                  <el-col :span="15" :offset="1">
                    <div class="f-600" style="color: #f3f3f3">
                      {{ assignment.subject.name}}
                    </div>
                  </el-col>
                </el-row>

                <div class="hr"></div>
                <br />
                <div style="font-weight: bold; font-size: 18px; color: #f3f3f3">
                  {{ assignment.name}}
                </div>

                <div
                  shadow="none"
                  style="border: none; padding: 13px"
                  class="rounded-08 bg-black-3"
                >
                  <el-row>
                    <el-col :span="12">
                      <div style="color: #9d9d9d">Received on</div>
                      <div style="color: #f3f3f3; font-weight: bold">
                        {{ getDate(assignment.created_at) }}
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div style="color: #9d9d9d">Due Date</div>
                      <div style="color: #f3f3f3; font-weight: bold">
                        {{ getDate(assignment.due_date) }}
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <el-row style="margin-top: 10px">
                  <el-col :span="13">
                    <es-progress
                      style="margin-top: 15px"
                      percentage= 0
                    ></es-progress>
                  </el-col>
                  <el-col :span="10" :offset="1">
                    <es-button @click="$router.push($url.LN_ASSIGNMENTS_DETAILS + '/' + assignment.id)" text="View Details" :plain="true"></es-button>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
            <es-pagination :total="notStartedCount" @pagination="pagination"></es-pagination>
        </el-tab-pane>
        <el-tab-pane label="In-progress" name="inProgress">
               <el-row>
            <el-col :span="6">
              <div style="color: #cfcfcf">{{ assignments.length + " Assignment "}}</div>
            </el-col>
            <el-col :span="7" :offset="6">
              <es-search
                style="margin-top: 3px"
                v-model="searchHeader"
                placeholder="Search by Subject, Class or Timing"
              >
              </es-search>
            </el-col>
            <el-col :span="3" :offset="2">
              <!-- <es-select placeholder="Subject" class="select-icon"></es-select> -->
               <el-dropdown @command="handleSubject" >
                <span class="el-dropdown-link" primary style="color: #696969; background-color: #353535 ; border-radius:40px ;padding: 2px 8px 8px 8px;">
                Subjects<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="item in subjectsData" :key="item.id" :command="item.id">{{ item.name }}</el-dropdown-item>
              </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
          <br />
          <el-row>
            <el-col :span="8" v-for="assignment in assignments" :key="assignment.id" style="padding: 10px">
              <el-card
                shadow="none"
                style="padding: 8px; border: none"
                class="rounded-08 pg-50 bg-black-2"
              >
                <el-row>
                  <el-col :span="1">
                    <img
                      style="margin-top: -5px"
                      src="@/assets/images/mathIcon.png"
                      alt=""
                    />
                  </el-col>
                  <el-col :span="15" :offset="1">
                    <div class="f-600" style="color: #f3f3f3">
                      {{ assignment.subject.name }}
                    </div>
                  </el-col>
                </el-row>

                <div class="hr"></div>
                <br />
                <div style="font-weight: bold; font-size: 18px; color: #f3f3f3">
                  {{ assignment.name }}
                </div>

                <div
                  shadow="none"
                  style="border: none; padding: 13px"
                  class="rounded-08 bg-black-3"
                >
                  <el-row>
                    <el-col :span="12">
                      <div style="color: #9d9d9d">Received on</div>
                      <div style="color: #f3f3f3; font-weight: bold">
                        {{ getDate(assignment.created_at) }}
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div style="color: #9d9d9d">Due Date</div>
                      <div style="color: #f3f3f3; font-weight: bold">
                         {{ getDate(assignment.due_date) }}
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <el-row style="margin-top: 10px">
                  <el-col :span="13">
                    <es-progress
                      style="margin-top: 15px"
                      :percentage= getPercentage(assignment)
                    ></es-progress>
                  </el-col>
                  <el-col :span="10" :offset="1">
                   <es-button @click="$router.push($url.LN_ASSIGNMENTS_DETAILS + '/' + assignment.id)" text="View Details" :plain="true"></es-button>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
          <es-pagination :total="inCount" @pagination="pagination"></es-pagination>
          </el-tab-pane>
        <el-tab-pane label="Completed" name="completed">
          <el-row>
            <el-col :span="6">
              <div style="color: #cfcfcf"> {{ assignments.length +" Assignments" }}</div>
            </el-col>
            <el-col :span="7" :offset="6">
              <es-search
                style="margin-top: 3px"
                v-model="searchHeader"
                placeholder="Search by Subject, Class or Timing"
              >
              </es-search>
            </el-col>
            <el-col :span="3" :offset="2">
              <!-- <es-select placeholder="Subject" class="select-icon"></es-select> -->
              <el-dropdown @command="handleSubject">
                <span class="el-dropdown-link"  style="color: #696969; background-color: #353535 ; border-radius:40px ;padding: 2px 8px 8px 8px;">
                  Subjects<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="item in subjectsData" :key="item.id" :command="item.id">{{ item.name }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
          <br />
          <el-row>
            <el-col :span="8" v-for="assignment in assignments" :key="assignment" style="padding: 10px">
              <el-card
                shadow="none"
                style="padding: 8px; border: none"
                class="rounded-08 pg-50 bg-black-2"
              >
                <el-row>
                  <el-col :span="1">
                    <img
                      style="margin-top: -5px"
                      src="@/assets/images/mathIcon.png"
                      alt=""
                    />
                  </el-col>
                  <el-col :span="15" :offset="1">
                    <div class="f-600" style="color: #f3f3f3">
                      {{ assignment.subject.name }}
                    </div>
                  </el-col>
                </el-row>

                <div class="hr"></div>
                <br />
                <div style="font-weight: bold; font-size: 18px; color: #f3f3f3">
                  {{ assignment.name }}
                </div>
                <div
                  shadow="none"
                  style="border: none; padding: 13px"
                  class="rounded-08 bg-black-3"
                >
                  <el-row>
                    <el-col :span="12">
                      <div style="color: #9d9d9d">Received on</div>
                      <div style="color: #f3f3f3; font-weight: bold">
                       {{ getDate(assignment.created_at) }}
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div style="color: #9d9d9d">Due Date</div>
                      <div style="color: #f3f3f3; font-weight: bold">
                       {{ getDate(assignment.due_date) }}
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <el-row style="margin-top: 10px">
                  <el-col :span="13">
                    <es-progress
                      style="margin-top: 15px"
                      :percentage= getPercentage(assignment)
                    ></es-progress>
                  </el-col>
                  <el-col :span="10" :offset="1">
                    <es-button @click="$router.push($url.LN_ASSIGNMENTS_DETAILS_COMPLETE+ '/' + assignment.id)" text="View Details" :plain="true"></es-button>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
          <es-pagination :total="completedCountData" @pagination="pagination"></es-pagination>
        </el-tab-pane>
      </el-tabs>
    </es-container>
  </div>
</template>
<script>
import esPagination from '@/studentControl/esPagination'
import { getId } from '@/util/auth' 
import { dispatchGraphqlQuery,dispatchGraphql } from '@/api/dispatcher'
import _ from 'lodash'
import moment from 'moment'
export default {
  components: { esPagination },
  data: () => ({
    activeName: "notStarted",
    showSideBar: false,
    searchHeader: "",
    assignments: [],
    // subjects: [],
    subjectIds: [],
    userAssignments: [],
    subjectsData:[],
    notStarted:[],
    limit: 10,
    offset: 0,
    total: 0,
    notStartedCount: '',
    inCount: '',   
    completedCountData: '' 
  }),
  created(){
    this.getSubjects()
    this.getUserAssignments()
  },
   watch: {
    activeName: _.debounce(function() {
      if (this.activeName === 'notStarted') {
        this.assignments =[]
        this.getSubjects()
        this.getUserAssignments()
      } else if (this.activeName === 'inProgress') {
        this.assignments = []
        this.getSubjects()
        this.getUserAssignments()
      } else if(this.activeName === 'completed') {
        this.getSubjects()
        this.getUserAssignments()
      }
    })
  },
  methods: {
    handleSubject(val){
      this.subjectIds = []
      this.subjectIds[0] = val
      this.getUserAssignments()
      if(this.activeName !== "notStarted") {
        this.setAssignments()
      }
    },
    getSubjects() {      
      dispatchGraphqlQuery('subjects', ['id', 'name']).then((response) => {
        this.subjectsData = response.subjects
        this.subjectIds = this.subjectsData.map(x => x.id)
        this.getUserAssignments() 
      })
    },
    getDate(val) {
      return moment(val).format('yyyy-MM-DD')
    },
    getPercentage(val) {
      if( this.haveSubmissions.length > 0  ){
        let beforeFilter =this.haveSubmissions.filter(x => x.id === val.id).map(x => x.submissions[0].assignment_details )
        if(beforeFilter){
          this.total = beforeFilter[0].length
        }
        let tempValues = beforeFilter[0].map(x => x.value)
        let finalFilter = tempValues.filter(x => x!="")
        if(finalFilter){
          return (finalFilter.length*( 100/this.total))
        } 
      }
      else {
        return 0
      }
    },  
    setAssignments() {
      let completedAssignments =[]
      let inProgressAssignments =[]     
      let completedCount =0;
      let inProgressCount =0;
      for(const item of this.haveSubmissions){
        completedCount =0
        inProgressCount =0
        for(const obj of item.submissions[0].assignment_details){
          if(obj.value!=""){
            completedCount++
          } 
          else if(obj.value== '' || obj.value== null){
            inProgressCount++
          }
        }
        if(item.submissions[0].assignment_details.length === completedCount) {
          completedAssignments.push(item)
        }
        else if(inProgressCount >0 && inProgressCount <= item.submissions[0].assignment_details.length) {
          inProgressAssignments.push(item)
        } 
      }
      if (this.activeName === 'inProgress') {
        this.assignments =[]
        this.assignments = inProgressAssignments
         this.inCount = this.assignments.length
      } 
      else if (this.activeName === 'notStarted') {
        this.assignments = []
        this.assignments = this.notStarted
      } 
      else if (this.activeName === 'completed') {
        this.assignments =[]
        this.assignments = completedAssignments  
        this.completedCountData = this.assignments.length   
      }
    },
    getUserAssignments() {
        const query =  `query ($limit: Int, $offset: Int, $user_id: uuid!, $subIds:[uuid!]) {
          audiences(limit: $limit, offset: $offset,where: {_and: {user_id: {_eq: $user_id}, audienceable_type: {_eq: "Assignment"}}, assignment: {subject_id: {_in: $subIds}}}){
          assignment {
            due_date
            name
            required_parts
            standard_id
            subject_id
            created_at
            id
            subject{
              id
              name
            }
            submissions(where:{user_id:{_eq:$user_id}}){
              id
              assignment_id
              user_id
              assignment_details
            }
          }
        }
      }`
      dispatchGraphql(query ,this.getAssiVariables()).then((response) =>{
        this.userAssignments = response.audiences
        this.userAssignments = this.userAssignments.map(x => x.assignment)
        this.notStarted= []
        this.inProgressAssignments=[]
        let submissions = []
        for(const item of this.userAssignments){
          if( item.submissions.length === 0 ){
            this.notStarted.push(item)
            this.notStartedCount = this.notStarted.length
          }
          if(item.submissions.length !=0){
            submissions.push(item)
          }
        }
        if(this.notStarted.length> 0){
          console.log("notstarted")
        }
        if(submissions.length>0){
          this.haveSubmissions = []
          this.haveSubmissions = submissions
        }
        if(this.activeName !== "notStarted"  &&  (this.activeName === "inProgress" || this.activeName === "completed")) {
          this.setAssignments()
        }
      })
    },
    getAssiVariables() {
     return{
        "user_id": getId(),
        "subIds": this.subjectIds
      }
    },
    pagination: function(object) {
      this.limit = object.limit
      this.offset = object.limit * (object.page - 1)
      this.getUserAssignments()
    },
  },
};
</script>
<style>
.sort-icon {
  background: transparent !important;
}
.sort-icon:hover {
  background: #bc6c42 !important;
}
</style>