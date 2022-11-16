<template>
  <div>
    <e-container pageTitle="Lesson Planner">
      <el-tabs class="floatTabHeader" v-model="activeName">
        <el-tab-pane label="Active" name="active">
          <div class="searchCard searchCard-2">
            <div style="color: #222222; font-weight: 500; font-size: 20px">
              {{ total }} lessons
            </div>
            <e-button icon="el-icon-sort" css="sort-icon bg-transparent" :plain="true" type="primary" />
          </div>

          <div style="margin-top: 20px;width:100%" class="dashboard-cards-wrapper">
            <lesson-card v-for="i in lessons" :key="i" @clickDetails="$router.push($url.LN_LESSON_DETAILS + '/' + i.id)" :title="i.name" :Alloted="i.classrooms.length" :Takenby="getTeacher(i.teacher)" :topic_id="i.id" topic="Lorem ipsum dolor sit amet consectetur adipiscing elit" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="Upcoming" name="upcoming"> 
          <div class="searchCard searchCard-2">
            <div style="color: #222222; font-weight: 500; font-size: 20px">
              {{ total }} lessons
            </div>
            <e-button icon="el-icon-sort" css="sort-icon bg-transparent" :plain="true" type="primary" />
          </div>
          <div style="margin-top: 20px;width:100%" class="dashboard-cards-wrapper">
            <lesson-card v-for="i in lessons" :key="i" @clickDetails="$router.push($url.LN_LESSON_DETAILS + '/' + i.id)" :title="i.name" :Alloted="i.classrooms.length" :Takenby="getTeacher(i.teacher)" :topic_id="i.id" topic="Lorem ipsum dolor sit amet consectetur adipiscing elit" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="Completed" name="completed"> 
          <div class="searchCard searchCard-2">
            <div style="color: #222222; font-weight: 500; font-size: 20px">
              {{ total }} lessons
            </div>
            <e-button icon="el-icon-sort" css="sort-icon bg-transparent" :plain="true" type="primary" />
          </div>

          <div style="margin-top: 20px;width:100%" class="dashboard-cards-wrapper">
            <lesson-card v-for="i in lessons" :key="i" @clickDetails="$router.push($url.LN_LESSON_DETAILS + '/' + i.id)" :title="i.name" :Alloted="i.classrooms.length" :Takenby="getTeacher(i.teacher)" :topic_id="i.id" topic="Lorem ipsum dolor sit amet consectetur adipiscing elit" />
          </div>
        </el-tab-pane>
      </el-tabs>
      <pagination :total="total" @pagination="pagination" />
    </e-container>
  </div>
</template>
<script>
import lessonCard from "@/components/learn/lesson/lessonCard.vue";
import { dispatchGraphql  } from '@/api/dispatcher'
import Pagination from '@/components/Pagination'
import moment from 'moment'
import _ from 'lodash'
export default {
  components: { lessonCard, Pagination },
  data: () => ({
    activeName: "active",
    total: 0,
    offset: 0,
    page: 1,
    limit: 10,
    lessons: [],
    currentDate: moment(new Date()).format('yyyy-MM-DD'),
    dateComparison: {},
    query: `query($limit: Int!, $offset: Int!, $classDate: timestamp_comparison_exp) {
      topics(limit: $limit, offset: $offset, where: {classrooms: {class_date: $classDate}}) {
        id
        name
        teacher {
          id
          first_name
        } 
        classrooms {
          id
          name
          class_date
        }
      }
      topics_aggregate(where: {classrooms: {class_date: $classDate}}) {
        aggregate {
          count
        }
      }
    }`
  }),
  created () {
    this.getLessons()
  },
  watch: {
    activeName: _.debounce(function() {
      if (this.activeName === "upcoming") {
        this.dateComparison = {_gt: this.currentDate}
        this.getLessons()
      } else if(this.activeName === "completed") {
        this.dateComparison = {_lt: this.currentDate}
        this.getLessons()
      } else {
        this.dateComparison = {_eq: this.currentDate}
        this.getLessons()
      }
    })
  },
  methods: {
    getTeacher(teacher) {
      if (teacher) {
        return teacher.first_name
      } else {
        return 'No teacher'
      }
    },
    pagination: function(object) {
      this.limit = object.limit
      this.offset = object.limit * (object.page - 1)
      this.getLessons()
    },
    getVariables() {
      if (this.activeName === 'active') {
        this.dateComparison = {_eq: this.currentDate}
        console.log(this.dateComparison)
      }
      return{
        'limit': this.limit,
        'offset': this.offset,
        'classDate': this.dateComparison,
      }
    },
    getLessons() { 
      dispatchGraphql(this.query, this.getVariables()).then(response => {
        this.lessons = response.topics
        this.total = response.topics_aggregate.aggregate.count
      })
    },

  }
};
</script>
