<template>
  <div>
    <es-container hideHeader :pageTitle="topic.name" :back="$url.LN_SYLLABUS">
      <div class="p20">
        <el-tabs class="floatTabHeader studentTab" style="margin-top: -10px" v-model="tab">
          <el-tab-pane label="Syllabus" name="tab1">
            <div class="bg-black-2 p20 rounded-08">
              <div class="p20 rounded-08" style="border: 1px solid #404040">
                <el-row>
                  <el-col style="margin-bottom: 20px; width: 1300px" :span="24">
                    <div class="white-1 fs-16 f-600 pb10">Introduction</div>
                    <div class="white-1 bg-black-3 p20">
                      {{ topic.description }}
                    </div>
                  </el-col>
                  <el-col :span="11" style="width: 518px">
                    <div class="white-1 fs-16 f-600 pb10">
                      Tasks to be completed
                    </div>
                    <div class="white-1 bg-black-3 p20">
                      <ul>
                        <li v-for="task in topic.session_tasks" :key="task">
                          {{ task }}
                        </li>
                      </ul>
                    </div>
                  </el-col>
                  <el-col :span="11" :offset="2" style="width: 518px">
                    <div class="white-1 fs-16 f-600 pb10">Key Objectives</div>
                    <div class="white-1 bg-black-3 p20">
                      <ul>
                        <li v-for="objective in topic.key_objectives" :key="objective">
                          {{ objective }}
                        </li>
                      </ul>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <br />
            <div class="bg-black-2 p20 rounded-08">
              <div class="p20 rounded-08" style="border: 1px solid #404040">
                <el-row>
                  <el-col :span="11" style="width: 518px">
                    <div class="white-1 fs-16 f-600 pb10">Subtopics ({{ topic.sub_topics.length }})</div>
                    <div class="bg-black-3 p20 rounded-08">
                      <VueSlickCarousel class="dashboard-catousel" v-bind="settingsRecom" :arrows="false" :dots="true">
                        <ul class="white-1">
                          <li class="fs-16 padding-right-44" v-for="sub in topic.sub_topics" :key="sub">
                            {{ sub.name }}
                          </li>
                        </ul>
                      </VueSlickCarousel>
                    </div>
                  </el-col>
                  <el-col :span="11" :offset="2" style="width: 518px">
                    <div class="white-1 fs-16 f-600 pb10">Allocated to</div>
                    <div class="bg-black-3 p20 rounded-08 d-flex">
                      <div style="width: 160px; border-right: 1px solid #575757">
                        <div style="padding: 20px 0" class="white-1 pb10 mt20 text-center f-600">
                          Teacher
                        </div>

                        <el-avatar style="display: block; margin: auto" :size="60" :src="require('@/assets/images/profile.jpg')" />
                        <div class="white-1 text-center fs-16">
                          {{ topic.teacher.first_name }}
                        </div>
                      </div>
                      <div style="width: 280px; padding-left: 20px">
                        <br />
                        <VueSlickCarousel class="dashboard-catousel" v-bind="settingsRecom2" :arrows="false" :dots="true">
                          <div v-for="sub in topic.sub_topics" :key="sub">
                            <div class="p10 d-flex sub-top-design">
                              <e-svg icon="subtopicColor"> </e-svg>
                              <div class="fs-500 tx-overflow">{{ sub.name }}</div>
                            </div>
                          </div>
                        </VueSlickCarousel>
                        <br />
                        <br />
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Study Material" name="tab2">
            <div class="d-flex">
              <div style="width: 700px" class="bg-black-2 rounded-08 p20">
                <div class="white-1 fs-16 f-600 pb10">Introduction</div>
                <div class="white-1 bg-black-3 p20">
                  {{ course.description }}
                  <br />
                  <br />
                  <br />
                </div>
              </div>

              <el-card class="rounded-08 bg-black-2" style="border: none; width: 500px; margin-left: 30px" shadow="none">
                <div class="white-1 fs-16 f-600 pb10">Documents</div>

                <div style="flex-wrap: wrap; margin-top: 6px" class="d-flex">
                  <div v-for="attachment in course.references_attachments" :key="attachment" class="bg-black-3 d-flex" style="width: 160px; padding: 13px; margin: 5px;margin-left: 25px;">
                    <e-svg icon="downloadBlue"></e-svg>
                    <div style="color: #1492e6; padding-left: 5px">
                      {{ attachment.name }}
                    </div>
                  </div>
                </div>
              </el-card>
            </div>
            <br />
            <div class="d-flex">
              <div style="width: 700px" class="bg-black-2 rounded-08 p20">
                <div class="white-1 fs-16 f-600 pb10">
                  Recorded lectures of this lesson
                </div>
                <div class="d-flex" style="flex-wrap: wrap">
                  <div style="width: 240px; margin: 30px 50px" v-for="classroom in classrooms" :key="classroom">
                    <img style="width: 100%" src="@/assets/images/recordedVideo.png" alt="" />
                    <div class="white-1">
                      {{ classroom.name }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-black-2 rounded-08 p20" style="width: 457px; margin-left: 30px">
                <div class="white-1 fs-16 f-600 pb10">References</div>
                <div v-for="reference in course.references_links" :key="reference" class="d-flex p10 bg-black-3" style="width: 320px; border-radius: 4px;margin:10px 40px">
                  <e-svg icon="attachOrange"></e-svg>
                  <div style="color: #fe9d2b; padding: 0 10px">
                    {{ reference.name }}
                  </div>
                  <e-svg icon="optionOrange" style="margin-left: auto"></e-svg>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Assignment" name="tab3">
            <el-card class="rounded-08 bg-black-2" style="border: none" shadow="none">
              <el-row>
                <el-col :span="4" :offset="1" class="d-flex">
                  <e-svg style="padding-top: 10px; padding-right: 15px" icon="ruler"></e-svg>
                  <div>
                    <div class="text-gray-6">Subject</div>
                    <div class="sub-title">{{ subject.name }}</div>
                  </div>
                </el-col>
                <el-col :span="4" class="d-flex">
                  <e-svg style="padding-top: 10px; padding-right: 15px" icon="rank"></e-svg>
                  <div>
                    <div class="text-gray-6">Avg Score</div>
                    <div class="sub-title">45/50</div>
                  </div>
                </el-col>
                <el-col :span="10" :offset="1" style="margin-top:-10px">
                <div class="bg-black-3 p20 rounded-08">
                  <div class="text-gray-6">Remarks</div>
                  <div class="f-600 white-1 fs-18">Need to focus on spelling and grammer</div>
                </div>
                </el-col>
              </el-row>
            </el-card>
            <br/>
            <div class="bg-black-2 rounded-08 p20">
              <div class="white-1 fs-16 f-600 pb10">Introduction</div>
              <el-row>
                <el-col :span="8" v-for="(assignment, i) in assignments" :key="i">
                  <el-card class="rounded-08 bg-black-3" style="border: none; margin: 10px" shadow="none">
                    <div v-if="verifyStatus(assignment, 'notStarted')">
                      <div class="d-flex">
                        <e-svg icon='errorRed'></e-svg>
                        <div class="f-600 " style="color: #F14D4D;padding-left:10px">Not Started</div>
                      </div>
                      <div style="border-top: 1px solid #404040;margin-top: 10px;padding-top: 10px;" class="f-600 fs-16 text-white">
                        {{ assignment.name }}
                      </div>
                      <el-card class="rounded-08 bg-black-4" style="border: none; margin: 10px" shadow="none">
                        <el-row>
                          <el-col :span="8">
                            <div style="color: #9d9d9d; font-size: 12px">Received on</div>
                            <div style="color: #f3f3f3; font-weight: bold">
                              {{ getDate(assignment.created_at) }}
                            </div>
                          </el-col>
                          <el-col :span="8" :offset="4">
                            <div style="color: #9d9d9d; font-size: 12px">Due Date</div>
                            <div style="color: #f3f3f3; font-weight: bold">
                              {{ getDate(assignment.due_date) }}
                            </div>
                          </el-col>
                        </el-row>
                      </el-card>
                      <es-button text="VIew Details" :plain='true' @click="$router.push($url.LN_ASSIGNMENTS_DETAILS + '/' + assignment.id)" />
                    </div>
                    <div v-if="verifyStatus(assignment, 'inProgress')">
                      <div class="d-flex">
                        <e-svg icon='network'></e-svg>
                        <div class="f-600 " style="color: #FEC600;padding-left:10px">In Progress</div>
                      </div>
                      <div style="border-top: 1px solid #404040;margin-top: 10px;padding-top: 10px;" class="f-600 fs-16 text-white">
                        {{ assignment.name }}
                      </div>
                      <el-card class="rounded-08 bg-black-4" style="border: none; margin: 10px" shadow="none">
                        <el-row>
                          <el-col :span="8">
                            <div style="color: #9d9d9d; font-size: 12px">Received on</div>
                            <div style="color: #f3f3f3; font-weight: bold">
                              {{ getDate(assignment.created_at) }}
                            </div>
                          </el-col>
                          <el-col :span="8" :offset="4">
                            <div style="color: #9d9d9d; font-size: 12px">Due Date</div>
                            <div style="color: #f3f3f3; font-weight: bold">
                              {{ getDate(assignment.due_date) }}
                            </div>
                          </el-col>
                        </el-row>
                      </el-card>
                      <es-button text="VIew Details" :plain='true' @click="$router.push($url.LN_ASSIGNMENTS_DETAILS + '/' + assignment.id)" />
                    </div>
                    <div v-if="verifyStatus(assignment, 'completed')">
                      <div class="d-flex">
                        <e-svg icon='doneGreen'></e-svg>
                        <div class="f-600 " style="color: #1FC24E;padding-left:10px">Completed</div>
                      </div>
                      <div style="border-top: 1px solid #404040;margin-top: 10px;padding-top: 10px;" class="f-600 fs-16 text-white">
                        {{ assignment.name }}
                      </div>
                      <el-card class="rounded-08 bg-black-4" style="border: none; margin: 10px" shadow="none">
                        <el-row>
                          <el-col :span="8">
                            <div style="color: #9d9d9d; font-size: 12px">Received on</div>
                            <div style="color: #f3f3f3; font-weight: bold">
                              {{ getDate(assignment.created_at) }}
                            </div>
                          </el-col>
                          <el-col :span="8" :offset="4">
                            <div style="color: #9d9d9d; font-size: 12px">Due Date</div>
                            <div style="color: #f3f3f3; font-weight: bold">
                              {{ getDate(assignment.due_date) }}
                            </div>
                          </el-col>
                        </el-row>
                      </el-card>
                      <es-button text="VIew Details" :plain='true' @click="$router.push($url.LN_ASSIGNMENTS_DETAILS_COMPLETE + '/' + assignment.id)" />
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Assessment" name="tab4">
            <el-card class="rounded-08 bg-black-2" style="border: none" shadow="none">
              <el-row>
                <el-col :span="4" :offset="1" class="d-flex">
                  <e-svg style="padding-top: 10px; padding-right: 15px" icon="ruler"></e-svg>
                  <div>
                    <div class="text-gray-6">Subject</div>
                    <div class="sub-title">{{ subject.name }}</div>
                  </div>
                </el-col>
                <el-col :span="4" class="d-flex">
                  <e-svg style="padding-top: 10px; padding-right: 15px" icon="rank"></e-svg>
                  <div>
                    <div class="text-gray-6">Avg Score</div>
                    <div class="sub-title">45/50</div>
                  </div>
                </el-col>
                <el-col :span="10" :offset="1" style="margin-top:-10px">
                  <div class="bg-black-3 p20 rounded-08">
                    <div class="text-gray-6">Remarks</div>
                    <div class="f-600 white-1 fs-18">Need to focus on spelling and grammer</div>
                  </div>
                </el-col>
              </el-row>
            </el-card>
            <br/>
            <div class="bg-black-2 rounded-08 p20">
              <div class="white-1 fs-16 f-600 pb10">Introduction</div>
              <el-row>
                <el-col :span="8" v-for="assessment in assessments" :key="assessment">
                  <el-card class="rounded-08 bg-black-3" style="border: none; margin: 10px" shadow="none">
                    <div style="margin-top: 10px;padding-top: 10px;" class="f-600 fs-16 text-white">
                      {{ assessment.form.name }}
                    </div>
                    <el-card class="rounded-08 bg-black-4" style="border: none; margin: 10px" shadow="none">
                      <el-row>
                        <el-col :span="8">
                          <div style="color: #9d9d9d; font-size: 12px">Received on</div>
                          <div style="color: #f3f3f3; font-weight: bold">
                            {{ getDate(assessment.created_at) }}
                          </div>
                        </el-col>
                        <el-col :span="8" :offset="4">
                          <div style="color: #9d9d9d; font-size: 12px">Due Date</div>
                          <div style="color: #f3f3f3; font-weight: bold">
                            {{ getDate(assessment.form.due_date) }}
                          </div>
                        </el-col>
                      </el-row>
                    </el-card>
                    <es-button text="VIew Details" :plain='true' @click="$router.push($url.LN_ASSESMENT_RESULT + '/' + assessment.form.id)"></es-button>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <br /><br /><br /><br /><br />
    </es-container>
  </div>
</template>
<script>
import VueSlickCarousel from "vue-slick-carousel"
import { dispatchGraphql } from "@/api/dispatcher"
import { getId } from '@/util/auth'
import moment from 'moment'
export default {
  components: { VueSlickCarousel },
  data: () => ({
    tab: "tab1",
    topic: {},
    subject: {},
    standard: {},
    course: {},
    classrooms: [],
    assignments: [],
    assessments: [],
    settingsRecom: {
      dots: true,
      focusOnSelect: false,
      infinite: !true,
      slidesToShow: 1,
      slidesToScroll: 1,
      touchThreshold: 5,
    },
    settingsRecom2: {
      dots: true,
      focusOnSelect: false,
      infinite: !true,
      slidesToShow: 2,
      slidesToScroll: 1,
      touchThreshold: 5,
    },
  }),
  created() {
    this.getTopics()
    this.getStandard()
  },
  methods: {
    verifyStatus(assignment, type) {
      const submission = assignment.submissions.filter(x => x.user_id === getId())[0]
      if (submission) {
        if (type === 'inProgress' && submission.assignment_details === "{}") {
          return true
        } else if (type === 'completed' && submission.assignment_details != "{}") {
          return true
        }
      } else if (type === 'notStarted') {
        return true
      }
    },
    getDate(date) {
      return moment(date).format('DD MM yyyy')
    },
    getAssessments() {
      const query = `query($id: uuid, $subId: uuid) {
        form_results(where: {_and: [{user_id: {_eq: $id}}, {form: {form_type: {_eq: "QuickTest"}, subject_id: {_eq: $subId}}}]}) {
          id
          created_at
          form {
            id
            name
            due_date
          }
        }
      }`
      dispatchGraphql(query, this.getDataVariables()).then((response) => {
        this.assessments = response.form_results
      })
    },
    getDataVariables() {
      return {
        "id": getId(),
        "subId": this.subject.id
      }
    },
    getAssignments() {
      const query = `query($id: uuid, $subId: uuid) {
        audiences(where: {_and: [{user_id: {_eq: $id}}, {audienceable_type: {_eq: "Assignment"}}, {assignment: {subject_id: {_eq: $subId}}}]}) {
          id
          user_id
          assignment {
            id
            name
            due_date
            created_at
            submissions {
              id
              user_id
              assignment_details
            }
          }
        }
      }`
      dispatchGraphql(query, this.getDataVariables()).then((response) => {
        this.assignments = response.audiences.map(x => x.assignment)
        this.getAssessments()
      })
    },
    getVariables() {
      return {
        "standId": this.standard.id,
        "subId": this.subject.id
      }
    },
    getCourse() {
      console.log('standard', this.standard)
      const query = `query($standId: uuid, $subId: uuid!) {
        courses(where:{_and:[{standard_id: {_eq: $standId}}, {subject_id: {_eq: $subId}}]}) {
          id
          standard_id
          description
          subject_id
          references_attachments
          references_links
        }
      }`
      dispatchGraphql(query, this.getVariables()).then((response) => {
        if(response.courses.length > 0) {
          this.course = response.courses[0]
          this.getAssignments()
        }  
      })
    },
    getStandard() {
      const query = `query($id: uuid!) {
        users_by_pk(id: $id) {
          id
          section {
            id
            standard {
              id
              name
            }
          }
        }
      }`
      dispatchGraphql(query, { id: getId() }).then((response) => {
        this.standard = response.users_by_pk.section.standard
        this.getCourse()
      })
    },
    getTopics() {
      const query = `query($id: uuid!) {
        topics_by_pk(id: $id) {
          id
          name
          description
          assigned_teacher_id
          key_objectives
          session_tasks
          session_activities
          homework
          sub_topics {
            id
            name
            status
          }
          classrooms {
            id
            name
            class_date
            time_table {
              id
              start_time
              end_time
            }
          }
          teacher {
            id
            first_name
            section_subject_teachers {
              id
              subject {
                id
                name
              }              
            }
          }
        }
      }`
      dispatchGraphql(query, { id: this.$route.params.id }).then((response) => {
        this.topic = response.topics_by_pk
        this.subject = this.topic.teacher.section_subject_teachers[0].subject
        this.classrooms = this.topic.classrooms
      })
    }
  }
}
</script>

<style lang="scss">
.dashboard-catousel .slick-dots {
  bottom: -20px !important;
  li button:before,
  li.slick-active button:before {
    color: #1492e6 !important;
    opacity: 1;
  }
  li button:before {
    background-color: #8b8282 !important;
    border: none !important;
    border-radius: 50%;
    color: #8b8282 !important;
    display: inline-block;
    height: 15px !important;
    width: 15px !important;
  }
  li.slick-active button:before {
    background-color: #1492e6 !important;
    height: 15px !important;
    width: 15px !important;
  }
}

.dashboard-catousel .slick-dots li button::before {
  height: 15px !important;
  width: 15px !important;
  background: #fff;
  opacity: 0.5;
}

.padding-right-44 {
  padding-right: 44px;
}
.student-dash .apexcharts-legend-text {
  color: #858585 !important;
}
.student-dash .apexcharts-text tspan {
  display: none !important;
}
.selected-arrow {
  background: #575757;
}
.sub-top-design {
  background: rgba(255, 255, 255, 0.1);
  justify-content: center;
  border-radius: 4px;
  border: 1px solid #6e6e6e;
  margin-bottom: 10px;
  margin-right: 10px;
}
.sub-top-design div:last-child {
  color: #fe9d2b;
  padding-left: 5px;
}

</style>
