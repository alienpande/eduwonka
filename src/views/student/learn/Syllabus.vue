<template>
  <es-container>
    <div style="position: absolute;width: 19rem;top: 125px;border-bottom: 1px solid #f3f3f3;padding-bottom: 13px;">
      <es-select class="title-select select-icon" v-model="subject" :options="subjects" :optionName="'label'" :valueKey="'value'" @visible-change="setTopics()"></es-select>
    </div>
    <el-tabs class="floatTabHeader studentTab" v-model="activeName">
      <el-tab-pane label="Not Started" name="notStarted">
        <el-row>
          <el-col :span="5">
            <div style="color: #cfcfcf">{{ selectedTopics.length }} {{ 'Lesson' | pluralize(selectedTopics.length) }}</div>
          </el-col>
          <el-col :span="6" :offset="9">
            <es-search style="margin-top: 4px" v-model="searchBy" placeholder="Search by Subject, Class or Timing"></es-search>
          </el-col>
          <el-col :span="3" :offset="1">
            <es-select placeholder="Select" class="select-icon"></es-select>
          </el-col>
        </el-row>
        <br />
        <el-row v-if="selectedTopics.length > 0">
          <el-col :span="7" v-for="(topic, i) in selectedTopics" :key="i" style="margin-right: 20px;width: 372px;">
            <div class="pointer" @click="$router.push($url.LN_SYLLABUS_DETAILS + '/' + topic.id)">
              <VueSlickCarousel class="syllabus-coursol" v-bind="settingsRecom" :arrows="false" :dots="true">
                <div>
                  <div class="bg-black-2 p20 rounded-08">
                    <div v-if="subject" class="d-flex mb10">
                      <e-svg icon="ruler"></e-svg>
                      <div class="f-600 text-white ml10">{{ getSubject(subject) }}</div>
                    </div>
                    <div class="hr"></div>
                    <br />
                    <div class="fs-18 f-600 white-1">
                      {{ topic.name }}
                    </div>
                    <div class="rounded-08 mt10 p10 bg-black-4">
                      <el-row>
                        <el-col :span="8" :offset="1">
                          <div class="fs-12 gray-7">Subject Teacher</div>
                          <div class="f-600 white-1">{{ topic.teacher.first_name }}</div>
                        </el-col>
                        <el-col :span="8" :offset="4">
                          <div class="fs-12 gray-7">Subtopics</div>
                          <div class="f-600 white-1">{{ topic.sub_topics.length }}</div>
                        </el-col>
                      </el-row>
                    </div>
                    <br />
                    <div class="f-600 white-1">Code of Conduct</div>
                    <ul class="text-white">
                      <li v-for="(sub, i) in topic.sub_topics" :key="i">
                        {{ sub.name }}
                      </li>
                    </ul>
                  </div>
                </div> 
              </VueSlickCarousel>
              <br/> <br/> <br/>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="In-progress" name="inProgress">
        <el-row>
          <el-col :span="5">
            <div style="color: #cfcfcf">{{ selectedTopics.length }} {{ 'Lesson' | pluralize(selectedTopics.length) }}</div>
          </el-col>
          <el-col :span="6" :offset="9">
            <es-search style="margin-top: 4px" v-model="searchBy" placeholder="Search by Subject, Class or Timing"></es-search>
          </el-col>
          <el-col :span="3" :offset="1">
            <es-select placeholder="Select" class="select-icon"></es-select>
          </el-col>
        </el-row>
        <br />
        <el-row v-if="selectedTopics.length > 0">
          <el-col :span="7" v-for="(topic, i) in selectedTopics" :key="i" style="margin-right: 20px;width: 372px;">
            <div class="pointer" @click="$router.push($url.LN_SYLLABUS_DETAILS + '/' + topic.id)">
              <VueSlickCarousel class="syllabus-coursol" v-bind="settingsRecom" :arrows="false" :dots="true">
                <div>
                  <div class="bg-black-2 p20 rounded-08">
                    <div v-if="subject" class="d-flex mb10">
                      <e-svg icon="ruler"></e-svg>
                      <div class="f-600 text-white ml10">{{ getSubject(subject) }}</div>
                    </div>
                    <div class="hr"></div>
                    <br />
                    <div class="fs-18 f-600 white-1">
                      {{ topic.name }}
                    </div>
                    <div class="rounded-08 mt10 p10 bg-black-4">
                      <el-row>
                        <el-col :span="8" :offset="1">
                          <div class="fs-12 gray-7">Subject Teacher</div>
                          <div class="f-600 white-1">{{ topic.teacher.first_name }}</div>
                        </el-col>
                        <el-col :span="8" :offset="4">
                          <div class="fs-12 gray-7">Subtopics</div>
                          <div class="f-600 white-1">{{ topic.sub_topics.length }}</div>
                        </el-col>
                      </el-row>
                    </div>
                    <br />
                    <div class="f-600 white-1">Code of Conduct</div>
                    <ul class="text-white">
                      <li v-for="(sub, i) in topic.sub_topics" :key="i">
                        {{ sub.name }}
                      </li>
                    </ul>
                  </div>
                </div> 
              </VueSlickCarousel>
              <br/> <br/> <br/>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Completed" name="completed">
        <el-row>
          <el-col :span="5">
            <div style="color: #cfcfcf">{{ selectedTopics.length }} {{ 'Lesson' | pluralize(selectedTopics.length) }}</div>
          </el-col>
          <el-col :span="6" :offset="9">
            <es-search style="margin-top: 4px" v-model="searchBy" placeholder="Search by Subject, Class or Timing"></es-search>
          </el-col>
          <el-col :span="3" :offset="1">
            <es-select placeholder="Select" class="select-icon"></es-select>
          </el-col>
        </el-row>
        <br />
        <el-row v-if="selectedTopics.length > 0">
          <el-col :span="7" v-for="(topic, i) in selectedTopics" :key="i" style="margin-right: 20px;width: 372px;">
            <div class="pointer" @click="$router.push($url.LN_SYLLABUS_DETAILS + '/' + topic.id)">
              <VueSlickCarousel class="syllabus-coursol" v-bind="settingsRecom" :arrows="false" :dots="true">
                <div>
                  <div class="bg-black-2 p20 rounded-08">
                    <div v-if="subject" class="d-flex mb10">
                      <e-svg icon="ruler"></e-svg>
                      <div class="f-600 text-white ml10">{{ getSubject(subject) }}</div>
                    </div>
                    <div class="hr"></div>
                    <br />
                    <div class="fs-18 f-600 white-1">
                      {{ topic.name }}
                    </div>
                    <div class="rounded-08 mt10 p10 bg-black-4">
                      <el-row>
                        <el-col :span="8" :offset="1">
                          <div class="fs-12 gray-7">Subject Teacher</div>
                          <div class="f-600 white-1">{{ topic.teacher.first_name }}</div>
                        </el-col>
                        <el-col :span="8" :offset="4">
                          <div class="fs-12 gray-7">Subtopics</div>
                          <div class="f-600 white-1">{{ topic.sub_topics.length }}</div>
                        </el-col>
                      </el-row>
                    </div>
                    <br />
                    <div class="f-600 white-1">Code of Conduct</div>
                    <ul class="text-white">
                      <li v-for="(sub, i) in topic.sub_topics" :key="i">
                        {{ sub.name }}
                      </li>
                    </ul>
                  </div>
                </div> 
              </VueSlickCarousel>
              <br/> <br/> <br/>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </es-container>
</template>
<script>
import { dispatchGraphql } from '@/api/dispatcher'
import { getId } from '@/util/auth'
// import { mapMutations } from "vuex";
import VueSlickCarousel from "vue-slick-carousel"
import _ from 'lodash'

export default {
  components: { VueSlickCarousel },
  data: () => ({
    activeName: "notStarted",
    subject: null,
    selectedSubject: null,
    standardSubjects: [],
    subjects: [],
    topics: [],
    selectedTopics: [],
    settingsRecom: {
      dots: true,
      focusOnSelect: false,
      infinite: !true,
      slidesToShow: 1,
      slidesToScroll: 1,
      touchThreshold: 5,
    },
  }),
  watch: {
    activeName: _.debounce(function() {
      if (this.activeName === 'inProgress') {
        this.getTopics()
      } else if (this.activeName === 'completed') {
        this.getTopics()
      } else {
        this.getTopics()
      }
    })
  },
  created() {
    this.getStandard()
  },
  methods: {
    getSubject(val) {
      const standSubject = this.standardSubjects.filter(x => x.subject_id === val)[0]
      return standSubject.subject.name
    },
    setTopics() {
      if (this.subject) {
        this.selectedSubject = null
        this.selectedSubject = this.subject
        this.getTopics()
      }
    },
    getTopics() {
      this.selectedTopics = []
      let a = []
      var topics = []
      var completedTopics = []
      var activeTopics = []
      var upcomingTopics = []
      if (this.selectedSubject) {
        const standSubject = this.standardSubjects.filter(x => x.subject_id === this.selectedSubject)[0]
        if (standSubject) {
          for (const item of standSubject.subject.subject_teachers) {
            if (a.length === 0) {
              a.push(item.teacher_id)
            } else {
              const teacher = a.filter(x => x === item.teacher_id)[0]
              if (teacher != item.teacher_id) {
                a.push(item.teacher_id)
              }
            }
          }
        }
      } else {
        for (const standsubject of this.standardSubjects) {
          if (standsubject.subject.subject_teachers.length > 0) {
            for (const item of standsubject.subject.subject_teachers) {
              if (a.length === 0) {
                a.push(item.teacher_id)
              } else {
                const teacher = a.filter(x => x === item.teacher_id)[0]
                if (teacher != item.teacher_id) {
                  a.push(item.teacher_id)
                }
              }
            }
          }
        }
      }
      if (a.length > 0) {
        for (const val of a) {
          const topicsItems = this.topics.filter(y => y.assigned_teacher_id === val)
          if (topicsItems.length > 0) {
            for (const topic of topicsItems) {
              topics.push(topic)
            }
          }
        }
      }
      if (topics.length > 0) {
        for (const topic of topics) {
          let completedCount = 0
          let upcomingCount = 0
          for (const x of topic.sub_topics) { 
            if (x.status === 'completed') {
              completedCount ++
            } else if (x.status === '' || x.status === null) {
              upcomingCount ++
            }
          }
          if (topic.sub_topics.length === completedCount) {
            completedTopics.push(topic)
          } else if (topic.sub_topics.length === upcomingCount) {
            upcomingTopics.push(topic)
          } else {
            activeTopics.push(topic)
          }
        }
        if (this.activeName === 'notStarted') {
          this.selectedTopics = upcomingTopics
        } else if (this.activeName === 'inProgress') {
          this.selectedTopics = activeTopics
        } else if (this.activeName === 'completed') {
          this.selectedTopics = completedTopics
        }
        console.log('topics', this.activeName, this.selectedTopics)
      }
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
        this.getSubjects(response.users_by_pk.section.standard.id)
      })
    },
    getSubjects(val) {
      const query = `query($standId: uuid) {
        standard_subjects(where:{standard_id: {_eq: $standId}}) {
          id
          subject_id
          subject {
            id
            name
            subject_teachers {
              id
              teacher_id
            }
          }
        }
      }`
      const topicsQuery = `query {
        topics {
          id
          name
          assigned_teacher_id
          session_tasks
          session_activities
          homework
          sub_topics {
            id
            name
            status
          }
          teacher {
            id
            first_name
          }
        }
      }`
      dispatchGraphql(query, { standId: val }).then(response => {
        this.standardSubjects = response.standard_subjects
        this.standardSubjects.map(x => {
          this.subjects.push({ label: x.subject.name, value: x.subject.id })
        })
        dispatchGraphql(topicsQuery).then((response) => {
          this.topics = response.topics
          this.getTopics()
        })
      })
    }
  },
};
</script>
<style lang="scss">
.syllabus-coursol .slick-dots {
  bottom: 3px !important;
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

.syllabus-coursol .slick-dots li button::before {
  height: 15px !important;
  width: 15px !important;
  background: #fff;
  opacity: 0.5;
}
</style>
