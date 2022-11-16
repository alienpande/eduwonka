<template>
  <e-container pageTitle="Course" >
  <!-- <div style="overflow: auto; height: 80vh" class="learn-courses"> -->
    <el-row class="view-no-form" style="flex-wrap:wrap-reverse;justify-content: space-between;">
      <el-col :span="15">
        <div>
          <drop-filter v-if="showFilters" :standards="standards" :subjects="standard_subjects" @handleStandard="handleStandard" @handleSubject="handleSubject" @clear="getStandard" />
        </div>
        <el-row class="searchCard searchCard-2">
          <div style="color: #00000099;text-align: center;padding: 10px 0;font-size: 18px;">
            We have <b>{{ total }}</b>  Courses
          </div>
        </el-row>

        <div style="margin-top: 25px">
          <el-card shadow="none" style="margin-bottom: 10px" class="rounded-08 pg-50 cp" v-for="(item,i) in standardSubjects" :key="i" >
            <div @click="showStandardMenu(item)">
              <el-row class="view-no-form">
                <el-col :span="3">
                  <img src="@/assets/images/biologybook.png" alt="" />
                </el-col>
                <el-col :span="20">
                  <div style="font-size: 20px; opacity: 0.8; font-weight: 600">
                    {{ item.standard.name + ' - ' + item.subject.name }}
                  </div>
                  <el-row style="margin-top: 12px" class="view-no-form">
                    <el-col :span="4">
                      <div style="font-weight: 300; opacity: 0.8; font-size: 14px">
                        Subtopics
                      </div>
                      <div style="font-size: 20px;opacity: 0.8;font-weight: 400;margin-top: 5px;">
                        {{ getTopics(item.standard, item.subject, 'size') }}
                      </div>
                    </el-col>
                    <!-- <el-col :span="4">
                      <div style="font-weight: 300; opacity: 0.8; font-size: 14px">
                        Taken by
                      </div>
                      <div style="font-size: 14px;opacity: 0.8;font-weight: 500;margin-top: 5px;">
                        Mrs.Stephen Richard
                      </div>
                    </el-col> -->
                    <el-col :span="14">
                      <div style="font-weight: 300; opacity: 0.8; font-size: 14px">
                        Focus areas
                      </div>
                      <div style="display: flex;flex-wrap: wrap;overflow-auto;">
                        <div v-for="topic of getTopics(item.standard, item.subject, 'data')" :key="topic" style="margin-top: 5px">
                          <button class="focus-area__btn">{{ topic.name }}</button>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </div>
      </el-col>

      <el-col class="extras" :span="8" style="background: white;padding-top:10px">
        <EventCalender @events="getEvents" />
        <!-- <b-calendar block class="border rounded p-2" locale="en"></b-calendar> -->
        <div v-if="events.length > 0" style="padding: 9px 24px">
          <div style="color: #222222; opacity: 0.8; font-size: 20px">
            Events
          </div>
          <div class="event" v-for="event in events" :key="event" style="margin-top: 20px;border-bottom: 1px solid rgba(188, 108, 66, 0.4);padding-bottom: 20px;">
            <div v-if="event.name">
              <div style="padding-left: 25px;color: rgb(34, 34, 34);opacity: 0.8;font-weight: 600;border-left: 6px solid #fcdfbd;">
                {{ 'Exam: ' + event.name }}
              </div>
              <div style="display: flex;padding-left: 27px;padding-top: 12px;opacity: 0.6;">
                <e-svg icon="clock" /><span style="margin-left: 20px">{{ getTime(event.start_date) }}</span>
              </div>
              <div style="display: flex;padding-left: 27px;padding-top: 12px;opacity: 0.6;">
                <e-svg icon="loca" /><span style="margin-left: 20px">{{ event.exam_type.name }}</span>
              </div>
            </div>
            <div v-if="event.title">
              <div v-if="event.title" style="padding-left: 25px;color: rgb(34, 34, 34);opacity: 0.8;font-weight: 600;border-left: 6px solid #fcdfbd;">
                {{ 'Event: ' + event.title }}
              </div>
              <div v-if="event.title" style="display: flex;padding-left: 27px;padding-top: 12px;opacity: 0.6;">
                <e-svg icon="clock" /><span style="margin-left: 20px">{{ getTime(event.start_time) }}</span>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <pagination :total="total" @pagination="pagination" />
  <!-- </div> -->
  </e-container>
</template>
<script>
import EventCalender from "@/components/school/EventCalender/EventCalender.vue"
import { mapMutations } from "vuex"
import { Learn } from "@/util/menus/learn.menus"
import { Routes } from "@/util/menus/learn.menus"
import { dispatchGraphql, dispatchGraphqlQuery } from '@/api/dispatcher'
import moment from 'moment'
import Pagination from '@/components/Pagination'
import DropFilter from '@/components/filters.vue'
export default {
  components: { EventCalender, Pagination, DropFilter },
  data: () => ({
    standards: [],
    standardIds: [],
    showFilters: false,
    subjects: [],
    standard_subjects: [],
    subjectIds: [],
    standardSubjects: [],
    topics: [],
    events: [],
    total: 0,
    offset: 0,
    page: 1,
    limit: 10,
    Learn,
  }),
  created() {
    this.getStandard()
  },
  methods: {
    getEvents(data) {
      console.log('events', data)
      this.events = data
    },
    getTime(date) {
      if (moment(date).format('HH:mm') == '00:00') {
        return moment().format('HH:mmA')
      } else {
        moment(date).format('HH:mmA')
      }
    },
    getTopics(standard, subject, type) {
      var topics = this.topics.filter(x => (x.subject_id === subject.id && x.standard_id === standard.id))
      console.log(topics, 'topics', topics.length)
      // for (const item of items) {
      //   if (a.length === 0) {
      //     a.push(item.teacher_id)
      //   } else {
      //     const teacher = a.filter(x => x === item.teacher_id)[0]
      //     if (teacher != item.teacher_id) {
      //       a.push(item.teacher_id)
      //     }
      //   }
      // }
      // if (a.length > 0) {
      //   for (const val of a) {
      //     const topicsItems = this.topics.filter(y => y.assigned_teacher_id === val)
      //     if (topicsItems.length > 0) {
      //       for (const topic of topicsItems) {
      //         topics.push(topic)
      //       }
      //     }
      //   }
      // }
      if (type === 'data') {
        return topics
      } else {
        return topics.length
      }
    },
    handleStandard(val) {
      this.showFilters = false
      console.log('selected', val)
      this.standardIds = []
      this.standardIds[0] = val
      const query = `query($standId: uuid) {
        standard_subjects(where: {standard_id: {_eq: $standId}}) {
          id
          subject {
            id
            name
          }
        }
      }`
      dispatchGraphql(query, { standId: val }).then((response) => {
        this.standard_subjects = []
        this.standard_subjects = response.standard_subjects.map(x => x.subject)
        console.log('standard subjects', this.subjects)
        this.showFilters = true
        this.getStandardSubjects()
      })
    },
    handleSubject(val) {
      this.subjectIds = []
      this.subjectIds[0] = val
      this.getStandardSubjects()
    },
    getStandard() {
      this.showFilters = false
      this.standard_subjects = []
      dispatchGraphqlQuery('standards', ['id', 'name']).then((response) => {
        this.standards = response.standards
        this.standardIds = this.standards.map(x => x.id)
        dispatchGraphqlQuery('subjects', ['id', 'name']).then((response) => {
          this.subjects = response.subjects
          this.subjectIds = this.subjects.map(x => x.id)
          this.showFilters = true
          this.getStandardSubjects()
        })
      })
    },
    getVariables() {
      return {
        "limit": this.limit,
        "offset": this.offset,
        "standIds": this.standardIds,
        "subIds": this.subjectIds,
      }
    },
    pagination: function(object) {
      this.limit = object.limit
      this.offset = object.limit * (object.page - 1)
      this.getStandardSubjects()
    },
    getTopicVariables() {
      return {
        "standId": this.standardIds,
        "subId": this.subjectIds
      }
    },
    getStandardSubjects() {
      const query = `query($limit: Int, $offset: Int, $standIds: [uuid!], $subIds: [uuid!]) {
        standard_subjects(limit: $limit, offset: $offset, where: {_and: [{standard_id: {_in: $standIds}}, {subject_id: {_in: $subIds}}]}) {
          id
          standard {
            id
            name
          }
          subject {
            id
            name
            subject_teachers {
              id
              teacher_id
              teacher {
                id
                first_name
              }
            }
          }
        }
        standard_subjects_aggregate(where: {_and: [{standard_id: {_in: $standIds}}, {subject_id: {_in: $subIds}}]}) {
          aggregate {
            count
          }
        }
      }`
      const TopicsQuery = `query($standId: [uuid!], $subId: [uuid!]) {
        topics(where: {_and: [{standard_id: {_in: $standId}}, {subject_id: {_in: $subId}}]}) {
          id
          name
          assigned_teacher_id
          subject_id
          standard_id
        }
      }`
      dispatchGraphql(query, this.getVariables()).then(response => {
        this.standardSubjects = response.standard_subjects
        this.total = response.standard_subjects_aggregate.aggregate.count
        dispatchGraphql(TopicsQuery, this.getTopicVariables()).then(response => {
          this.topics = response.topics
        })
      })
    },
    ...mapMutations("Common", ["setStandardMenu"]),
    showStandardMenu(item) {
      const defaultRoutes = [
        {
          id: 23,
          title: "Introduction",
          to: `${Routes.LN_COURSES_INTRODUCTION + '/' + item.standard.id + '/' + item.subject.id}`,
        },
        {
          id: 24,
          title: "Syllabus",
          to: `${Routes.LN_COURSES_SYLLABUS + '/' + item.standard.id + '/' + item.subject.id}`,
        },
        {
          id: 25,
          title: "Assessment",
          to: `${Routes.LN_COURSES_ASSESSMENT + '/' + item.standard.id + '/' + item.subject.id}`,
        },
        {
          id: 26,
          title: "Course content",
          to: `${Routes.LN_COURSES_COURSECONTENT + '/' + item.standard.id + '/' + item.subject.id}`,
        },
        {
          id: 27,
          title: "Assignment",
          to: `${Routes.LN_COURSES_ASSIGNMENT + '/' + item.standard.id + '/' + item.subject.id}`,
        },
        {
          id: 28,
          title: "Grade centre",
          to: `${Routes.LN_COURSES_GRADECENTER + '/' + item.standard.id + '/' + item.subject.id}`,
        },
        {
          id: 29,
          title: "Analytics",
          to: `${Routes.LN_COURSES_ANALYTICS + '/' + item.standard.id + '/' + item.subject.id}`,
        },
        
      ];
      this.setStandardMenu({
        routes: defaultRoutes,
        standard: item.standard.id,
        sections: item.subject.id,
      });
    },
  }
};
</script>
<style>
.focus-area__btn {
  border: 1px solid #bc6c42;
  border-radius: 13px;
  height: 26px;
  padding: 0 13px;
  font-weight: 600;
  background: transparent;
  color: #bc6c42;
  margin: 0 15px 8px 0;
  font-size: 11px;
}

.extras .calender > tr > td.bordered {
  padding: 0px !important;
  border: 0;
}
.extras .calender > thead > tr > td {
  padding: 0 !important;
  border: 0;
}
.extras .event-row {
  display: none !important;
}
.extras .calender-btn {
  display: contents;
  
}
.extras .calender{
border-top: 1px solid rgb(188 108 66 / 40%) !important;
border-bottom: 1px solid rgb(188 108 66 / 40%) !important;
  padding-top: 22px;
    padding-bottom: 22px;
  margin-top: 19px;
  border-radius: 0;
}
.extras .calender > tr:last-child > td.bordered:not(:first-child) {
  border: 0;
}
.extras .calender > tr > td {
  height: 0;
}
.extras .calender > tr > td.plain {
  border: 0;
}
.extras .blue-dot {
  display: none;
}
.extras .calender {
  border: none;
}
.extras .mb20 {
  margin: 0;
}
.extras .e-calender > div > div > div > .btn-prev {
  margin-left: 110px;
}
.extras .event-card{
  display: none;
}
.extras .event-info{
  display: none;
}

.exam-subject-title .sub-menu-title{
  display: block !important;
}
.sub-menu-title{
  display: none !important;
}
</style>
