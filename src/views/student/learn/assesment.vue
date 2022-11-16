<template>
  <div>
    <es-container pageTitle="Assessment">
      <el-tabs class="floatTabHeader studentTab" v-model="activeName">
        <el-tab-pane label="Active" name="active">
          <el-row>
            <el-col  v-for ="test in active" :key="test.id" :span="13">
              <el-card style="border: none" class="bg-black-2 rounded-08">
                <div class="d-flex" style="justify-content: space-between">
                  <div class="text-white fs-20 f-600" style="padding-top: 10px">
                    <!-- Geometry Weekly Test --> {{test.form.name}}
                  </div>
                  <div>
                    <div
                      style="display: block; text-align: center; color: #858585"
                    >
                      Time Left
                    </div>
                    <div class="d-flex" style="justify-content: center">
                      <!-- <div class="class-time">00</div>
                      <div class="time-dot">:</div> -->
                      <div class="class-time"> {{ time }} </div>
                      <!-- <div class="time-dot">:</div>
                      <div class="class-time">46</div> -->
                    </div>
                  </div>
                </div>

                <div class="hr" style="margin-top: 6px"></div>
                <br />
                <div class="d-flex">
                  <div style="width: 12rem">
                    <div class="l-title" style="color: #858585">Subject</div>
                    <div class="sub-title"> {{test.form.subject.name}} </div>
                  </div>
                  <div style="width: 12rem">
                    <div class="l-title" style="color: #858585">Type</div>
                    <div class="sub-title">
                      <!-- Quick Test --> {{ test.form.form_type }}
                    </div>
                  </div>
                  <div style="width: 10rem">
                    <div class="l-title" style="color: #858585">Questions</div>
                    <div class="sub-title"> {{ test.form.form_questions_aggregate.aggregate.count }} </div>
                  </div>
                  <div style="width: 10rem">
                    <div class="l-title" style="color: #858585">
                      Passing marks
                    </div>
                    <div class="sub-title">{{ sum }}</div>
                  </div>
                </div>
                <br />
                <el-row>
                  <el-col :span="3">
                    <el-avatar
                      :size="50"
                      :src="require('@/assets/images/profile.jpg')"
                    />
                  </el-col>
                  <el-col :span="10">
                    <div class="l-title" style="color: #858585">Examinor</div>
                    <div class="sub-title">Somya Kukreja</div>
                  </el-col>
                </el-row>
                <br /><br /><br /><br /><br /><br />
                <es-button
                  @click="handleClick(test)"
                  text="I am ready to start"
                  :plain="true"
                  style="width: 230px; margin: auto; display: block"
                ></es-button>
              </el-card>
              <br/><br/>
            </el-col>
           <el-col   :span="10" :offset="1">
              <el-card style="border: none" class="bg-black-2 rounded-08">
                <div style="font-weight: bold; font-size: 18px; color: #f3f3f3">
                  Code of Conduct
                </div>
                <div style="color: #cfcfcf">
                  Lorem Ipsum is simply dummy text of the printing and type
                  setting industry.Lorem Ipsum is simply dummy text of the
                  printing and type setting industry.
                </div>
                <ul style="color: #cfcfcf">
                  <li v-for="i in 6" :key="i">
                    Lorem Ipsum is simply dummy text of the printing and type
                    setting industry
                  </li>
                </ul>
              </el-card>
                <es-dialog 
                  v-model="weekTest"
                  width="60%"
                  top="20vh"
                  noEsc
                  :gutter="20"
                  hideDefaultFooter
                  @cancel="weekTest = false"
                  @confirm="weekTest = false"
                >
                  <div
                    class="f-600 text-center"
                    style="color: #f3f3f3; font-size: 24px; margin-top: -55px"
                  >
                    {{ this.testName }}
                  </div>
                  <div class="hr" style="margin-top: 10px"></div>
                  <br />
                  <div class="text-center text-white fs-20 f-600">Instruction</div>
                  <div style="color: #cfcfcf">
                    {{ this.testInstruction }}
                  </div>
                  <br />
                  <div class="d-flex" style="height: 47px;">
                    <e-checkbox
                      v-model="checkBox"
                      class="weekly-test-checkbok"
                      :span="1"
                    />
                    <div class="fs-16" style="color: #f3f3f3">
                      I agree to everything stated above
                    </div>
                  </div>

                  <div class="hr"></div>
                  <br />
                  <el-row>
                    <el-col class="d-flex" :span="5" :offset="12">
                      <es-button
                        width="200"
                        @click="weekTest = false"
                        style="margin-right: 20px"
                        text="Exit"
                      ></es-button>
                      <e-button
                        width="200"
                        :disabled ="!checkBox"
                        @click="startTest()"
                        label="Start Test"                        
                      ></e-button>
                      </el-col>
                  </el-row>
                </es-dialog>
            </el-col>
          </el-row>
          <!--====================== weekly test======================= -->
        </el-tab-pane>
        <el-tab-pane label="Upcoming" name="upcoming">
          <el-row>
            <el-col :span="5">
              <div style="color: #cfcfcf; padding-top: 10px">
                {{ assessment.length }} Upcoming Tests
              </div>
            </el-col>
            <el-col :span="2" :offset="12">
              <es-select placeholder="Type" class="select-icon"></es-select>
            </el-col>
            <el-col :span="4" :offset="1">
              <es-select placeholder="Subject" class="select-icon"></es-select>
               <!-- <el-select  @change="handleSubject">
                <el-option v-for="item in subjects" :key="item.id" :label="item.name" :value="item.id" />
              </el-select> -->
  
            </el-col>
          </el-row>
          <br />
          <el-row>
            <el-col :span="8" :key="i.id" v-for="i in assessment">
              <el-card
                class="rounded-08 bg-black-2"
                style="border: none; margin: 10px"
                shadow="none"
              >
                <div class="d-flex">
                  <img src="@/assets/images/mathIcon.png" alt="" />
                  <div class="f-600 text-white"> {{ i.form.subject.name }} </div>
                </div>

                <div
                  style="
                    border-top: 1px solid #404040;
                    margin-top: 10px;
                    padding-top: 10px;
                  "
                  class="f-600 fs-16 text-white"
                >
                   {{ i.form.name }}
                </div>

                <el-card
                  class="rounded-08 bg-black-3"
                  style="border: none; margin: 10px"
                  shadow="none"
                >
                  <el-row>
                    <el-col :span="8">
                      <div style="color: #9d9d9d; font-size: 12px">Date</div>
                      <div style="color: #f3f3f3; font-weight: bold">
                         <!-- {{ i.form.due_date }} -->
                          {{ getDate(i.form.due_date) }}
                      </div>
                    </el-col>
                    <el-col :span="8" :offset="4">
                      <div style="color: #9d9d9d; font-size: 12px">Type</div>
                      <div style="color: #f3f3f3; font-weight: bold">
                         {{ i.form.form_type }}
                      </div>
                    </el-col>
                  </el-row>
                </el-card>
                <es-button text="Set Reminder"></es-button>
              </el-card>
            </el-col>
          </el-row>
           <es-pagination :total="upcomingCount" @pagination="pagination"></es-pagination>
        </el-tab-pane>
        <el-tab-pane label="Completed" name="completed">
          <el-row>
            <el-col :span="5">
              <div style="color: #cfcfcf; padding-top: 10px">
                {{ assessment.length }} Completed Tests
              </div>
            </el-col>
            <el-col :span="2" :offset="6">
              <es-select placeholder="Type" class="select-icon"></es-select>
            </el-col>

            <el-col :span="4" :offset="1">
               <es-select placeholder="Standard" class="select-icon"></es-select>
              <!-- <el-select
                v-model="standard.id"
                filterable
                placeholder="Standard"
                style="width: 100%"
                @change="handleSubject"
              >
                <el-option
                  v-for="standard in subjects"
                  :key="standard.id"
                  :label="standard.name"
                  :value="standard.id"
                />
              </el-select> -->
            </el-col>
            <el-col :span="5" :offset="1">
              <es-select
                placeholder="Showing Last 3 Months"
                class="select-icon"
              ></es-select>
            </el-col>
          </el-row>
          <br />
          <el-row>
            <el-col :span="8" :key="i" v-for="i in assessment">
              <el-card
                class="rounded-08 bg-black-2"
                style="border: none; margin: 10px"
                shadow="none"
              >
                <div class="d-flex">
                  <img src="@/assets/images/mathIcon.png" alt="" />
                  <div class="f-600 text-white">{{ i.form.subject.name }}</div>
                </div>

                <div
                  style="
                    border-top: 1px solid #404040;
                    margin-top: 10px;
                    padding-top: 10px;
                  "
                  class="f-600 fs-16 text-white"
                >
                  {{ i.form.name }}
                </div>

                <el-card
                  class="rounded-08 bg-black-3"
                  style="border: none; margin: 10px"
                  shadow="none"
                >
                  <el-row>
                    <el-col :span="8">
                      <div style="color: #9d9d9d; font-size: 12px">Date</div>
                      <div style="color: #f3f3f3; font-weight: bold">
                       {{ getDate(i.form.due_date) }}
                      </div>
                    </el-col>
                    <el-col :span="8" :offset="4">
                      <div style="color: #9d9d9d; font-size: 12px">Type</div>
                      <div style="color: #f3f3f3; font-weight: bold">
                       {{ i.form.form_type }}
                      </div>
                    </el-col>
                  </el-row>
                </el-card>
                <es-button
                v-if ="i.form.status === SUBMITTED"
                  @click="$router.push($url.LN_ASSESMENT_RESULT)"
                  text="View Result"
                ></es-button>
              </el-card>
            </el-col>
          </el-row>
          <es-pagination :total="completedCount" @pagination="pagination"></es-pagination>
        </el-tab-pane>
      </el-tabs>
    </es-container>
  </div>
</template>
<script>
import esPagination from '@/studentControl/esPagination'
import { dispatchGraphql, dispatchGraphqlQuery, dispatchGraphqlMutation } from "@/api/dispatcher"
import { getId } from '@/util/auth'
import moment from "moment"
import _ from "lodash"
export default {
  components: { esPagination },
  data: () => ({
    testName:'',
    testInstruction: '',
    activeName: "active",
    disabled : true,
    assessment: [],
    quickTests: [],
    active: [],
    standard: {},
    date: moment(),
    testId: '',
    totalMarks: [],
    fId: '',
    sum:0,
    subjects: [],
    totalQuestions: '',
    upcoming: [],
    fResult: {},
    completed: [],
    weekTest: false,
    checkBox: false,
    currentDate: moment(new Date()).format("yyyy-MM-DD"),
    limit: 10,
    offset: 0,
    total: 0,
    upcomingCount: 0,
    completedCount: 0
    // currentDate1: moment(new Date()).format("HH:MM:SS")
  }),
  watch: {
    activeName: _.debounce(function () {
      if (this.activeName === "upcoming") {
        this.assessment = [];
        this.assessment = this.upcoming;
        console.log('upcoming', this.assessment);
      } else if (this.activeName === "completed") {
        this.assessment = [];
        this.assessment = this.completed;
        console.log('comple', this.assessment);
      } else if(this.activeName === 'active') {
        this.assessment = [];
        console.log('jasjkj', this.active);
        this.assessment = this.active; 
      }
    }),
  },
  methods: {
    handleClick(test) {
      this.weekTest = true
      this.testName = test.form.name
      this.testId = test.form.id
      this.fId= test.id
      // console.log("let", testName)
      this.testInstruction = test.form.description
    },
     getVariables() {
      return{
        'limit': this.limit,
        'offset': this.offset    
      }
    },
    getDate(date) {
      return moment(date).format('DD MMM yyyy')
    },
    getFormResults() {
      const query = `query($limit: Int, $offset: Int) {
        form_results(limit: $limit, offset: $offset, where: {_and: [{user_id: {_eq: "${getId()}"}}, {form: {form_type: {_eq: "QuickTest"}}}]}) {
          id
          status
          submitted_at
          start_time
          form {
            id
            name
            form_type
            test_time
            status
            due_date
            description
            subject {
              id
              name
            }
            form_questions{
              total_marks
            }
            form_questions_aggregate {
              aggregate {
                count
              }
            }
          }
          user {
            id
            first_name
          }
        }
      }`
      dispatchGraphql(query,this.getVariables()).then((response) => {
        // this.quick_test = response.forms;
        console.log('getid', getId());
        this.quickTests = response.form_results;
         console.log("test length", this.quickTests) 
        this.totalQuestions = this.quickTests[0].form.form_questions_aggregate.aggregate.count
        console.log("total marks ",this.quickTests[0].form.form_questions.map(x =>x.total_marks) )
        this.totalMarks = this.quickTests[0].form.form_questions
        this.totalMarks= this.totalMarks.map(x => x.total_marks) 
        this.sum = this.totalMarks.reduce(function(a, b) { return a + b; }, 0);
        console.log("sum", this.sum)
        console.log('assessment', this.quickTests,"total marks array", this.totalMarks);
        if(this.quickTests.length > 0) {
          for (const quickTest of this.quickTests) {
            console.log(" i am in filter", this.quickTests)
            if ( (this.currentDate < moment(quickTest.form.due_date).format("yyyy-MM-DD")) ) {
              this.upcoming.push(quickTest);
            } 
            else if (this.currentDate > moment(quickTest.form.due_date).format("yyyy-MM-DD")  || quickTest.status ==="SUBMITTED")  {
              this.completed.push(quickTest);
              console.log("i am in completed ", this.completed)
            } 
            else if ( this.currentDate === moment(quickTest.form.due_date).format("yyyy-MM-DD") && quickTest.status ==="ASSIGNED") {
              this.active.push(quickTest);
            }
            this.upcomingCount = this.upcoming.length
            console.log("kkkkkkkkkkkkkkkkkk", this.upcomingCount)
            this.completedCount = this.completed.length
          }
        }
        this.quick_test = this.active; 
        console.log(this.completed, this.upcoming, this.active)
        this.testId = this.quickTests[0].form.id;
        (this.date = moment(response.form_results.form.test_time, "mm:ss")),
        console.log('testId', this.testId);
        console.log('a1', this.assessment);
      });
    },
    pagination: function(object) {
      this.limit = object.limit
      this.offset = object.limit * (object.page - 1)
      this.getFormResults()
    },
    },
    getSubjects() {
      dispatchGraphqlQuery("subjects", ["id", "name"]).then((response) => {
        this.subjects = response.subjects;
        // this.standardIds = response.standards.map(x => x.id);
        console.log('subjects', this.subjects);
      });
    },
    handleSubject(val) {
      console.log("fjhasjdghjasgjl", val)
      // const name = this.standards.filter((x) => x.id === val)[0].name;
      // this.standard.name = name;
      console.log("upcoming", this.upcoming)
      this.upcoming = this.upcoming.filter(x => x.subject == val )
      this.assessment = []
      this.assessment= this.upcoming

    },
    startTest() {
       dispatchGraphqlMutation('form_results',['id','start_time'] ,this.setStartTime()).then((response)=> {
       console.log("set start time in dispatch")
       console.log("response", response)
       this.$router.push(this.$url.LN_ASSESMENT_QUICK_TEST + "/" + this.testId)
       console.log('tesid', this.testId);
      })
      // $router.push($url.LN_ASSESMENT_QUICK_TEST)
    },
    setStartTime() {
      this.fResult.start_time = moment(new Date()).format('')
      console.log("set start time in asssesment", this.fResult.start_time)
      this.fResult.id = this.fId
      console.log("fResultObject", this.fResult)
      return this.fResult
    },
  created() {
    this.getFormResults()
    this.getSubjects()
  },
  computed: {
    time: function () {
      let dueDate = this.quickTests[0].form.due_date
      let hours = ((new Date(dueDate).getTime() - new Date().getTime())/60000*60).toFixed(0)
      let minutes = ((new Date(dueDate).getTime() - new Date().getTime())/60000).toFixed(0)-(hours*60)
      let seconds = ((new Date(dueDate).getTime() - new Date().getTime())/1000)-(minutes*60)
      const d =new Date()
      d.setHours(hours)
      d.setMinutes(minutes)
      d.setSeconds(seconds)
      return this.date.format('MMMM Do YYYY, h:mm:ss')
    },
  },
  // mounted: function () {
  //   setInterval(() => {
  //     this.date = moment(this.date.subtract(1, "seconds"));
  //   }, 1000);
  // },
};
</script>
<style>
.weekly-test-checkbok {
  margin-top: 3px;
}

.weekly-test-checkbok .el-checkbox__input.is-checked .el-checkbox__inner,
.weekly-test-checkbok .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #1492e6 !important;
  border-color: #1492e6 !important;
}
</style>