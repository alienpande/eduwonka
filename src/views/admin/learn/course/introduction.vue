<template>
  <div v-if="standardSubject" style="overflow: auto; height: 80vh">
    <course-header title="Introduction" :standard="standard.name" :subject="subject.name" />
    <el-row :style="{display: window.width > 767 ? 'block' : 'grid'}" style="padding: 0 25px 0 25px">
      <el-col :span="window.width > 767 ? 24 : 11" style="margin-right: 20px">
        <div class="heading">Course description</div>
        <el-card
          shadow="none"
          style="
            margin-bottom: 10px;
            font-size: 14px;
            height: 16.5rem;
            overflow: auto;
            color: rgb(0 0 0 / 60%);
          "
          class="rounded-08 pg-50 cp"
        >
        <textarea
          class="assign-textarea"
          placeholder="Text Field"
          style="
            background: #ffffff 0% 0% no-repeat padding-box;
            box-shadow: 0px 1px 3px #11111112;
            border: 1px solid #cccccc;
            border-radius: 4px;
            padding: 10px;
            width: 550px;
            height: 210px;
          "
          v-model="course.description"
          cols="55"
          rows="10"
          @change="handleCourse()"
        ></textarea>
        </el-card>
        <div class="heading">Tasks of the Session</div>
        <el-card
          shadow="none"
          style="margin-bottom: 10px; padding: 0 60px"
          class="rounded-08 pg-50 cp"
        >
          <VueSlickCarousel v-bind="settings" :arrows="false" :dots="true">
            <div v-for="teacher of getTeachers(standardSubject.subject)" :key="teacher">
              <div style ="text-align: center">
                <el-avatar
                  class="avater-couse"
                  :size="90"
                  :src="require('@/assets/images/profile.jpg')"
                />
                <div class="coursle-name">{{ teacher.first_name }}</div>
                <button  class="class-btn__coursle">{{ standard.name + ": " + subject.name }}</button>
              </div>
            </div>
          </VueSlickCarousel>
        </el-card>
      </el-col>
      <el-col :span="window.width > 767 ? 24 : 7">
        <div class="heading">Topics of the Course</div>
        <el-card
          shadow="none"
          style="margin: 10px; height: 16.5rem; overflow: auto"
          class="rounded-08"
        >
          <div
           
            style="display: flex; margin-bottom: 18px"
            v-for ="topic of getTopics(standardSubject.subject)" 
            :key ="topic"
          >
            <e-svg
              style="display: inline-block; margin-top: 8px; margin-right: 8px"
              icon="Pointer"
            />
            <div style="font-size: 14px; opacity: 0.6">
            {{ topic.name }}
            </div>
          </div>
        </el-card>

        <!-- <div class="heading">Key objectives</div>
        <el-card
          shadow="none"
          style="margin: 10px; height: 16.5rem; overflow: auto"
          class="rounded-08"
        >
          <div
            style="display: flex; margin-bottom: 18px"
            v-for="i in 7"
            :key="i"
          >
            <e-svg
              style="display: inline-block; margin-top: 8px; margin-right: 8px"
              icon="Pointer"
            />
            <div style="font-size: 14px; opacity: 0.6">
              Lorem ipsum dolor sit amet consectetur adipiscing elit
            </div>
          </div> -->
        <!-- </el-card> -->
      </el-col>
    </el-row>
    <courseduction-right :show="showSideBar" :__onCancel="() => (showSideBar = !showSideBar)" />
  </div>
</template>
<script>
import courseductionRight from "@/components/learn/course/indroductionRight.vue"
import VueSlickCarousel from "vue-slick-carousel"
import {  dispatchGraphql, dispatchGraphqlMutation  } from "@/api/dispatcher"
import screenSize from '@/mixins/screenSize'

export default {
  components: { VueSlickCarousel, courseductionRight },
  mixins: [screenSize],
  data: () => ({
    showSideBar: false,
    standard: {},
    subject: {},
    standardSubject: {},
    course: {},
    topics : [],
    settings: {
      dots: true,
      focusOnSelect: false,
      infinite: !true,
      slidesToShow: 2.5,
      slidesToScroll: 1,
      touchThreshold: 5,
    }
  }),
  methods: {
    getCourse() {
      const query = `query($standId: uuid, $subId: uuid!) {
        courses(where:{_and:[{standard_id: {_eq: $standId}}, {subject_id: {_eq: $subId}}]}) {
          id
          standard_id
          description
          subject_id
        }
      }`
      dispatchGraphql(query, this.getVariables()).then((response) => {
        if(response.courses.length > 0) {
          this.course = response.courses[0]
        }  
      })
    },
    handleCourse() {
      if (!this.course.id) {
        this.course.standard_id = this.$route.params.standardId,
        this.course.subject_id = this.$route.params.subjectId
        dispatchGraphqlMutation('courses', ['id', 'description'], this.course).then((response) => {
          console.log(response)
          this.getCourse()
        })
      } else {
        dispatchGraphqlMutation('courses', ['id', 'description'], this.course).then((response) => {
          console.log(response)
          this.getCourse()
        })
      }
    },
    getVariables() {
      return {
        "standId": this.$route.params.standardId,
        "subId": this.$route.params.subjectId
      }
    },
    getStandardandSubject() {
      const standardQuery = `query($standId: uuid, $subId: uuid) {
        standard_subjects(where: {_and: [{standard_id: {_eq: $standId}}, {subject_id: {_eq: $subId}}]}) {
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
                first_name
                id
              }
            }
          }
        }
      }`
      const query = `query {
        topics {
          id
          name
          assigned_teacher_id
        }
      }`
      dispatchGraphql(standardQuery, this.getVariables()).then(response => {
        this.standardSubject = response.standard_subjects[0]
        this.standard = this.standardSubject.standard
        this.subject = this.standardSubject.subject
        dispatchGraphql(query).then((response) => {
          this.topics = response.topics   
        })
      })
    },
    getTeachers(data) {
      var teachers = []
      if (data.subject_teachers.length > 0) {
        for(const item of data.subject_teachers) {
          teachers.push(item.teacher)
        }
      }
      return teachers
    },
    getTopics(data) {
      let teacherIds = []
      var topics = []
      for (const item of data.subject_teachers) {
        if (teacherIds.length === 0) {
          teacherIds.push(item.teacher_id)
        } else {
          const teacher = teacherIds.filter(x => x === item.teacher_id)[0]
          if (teacher != item.teacher_id) {
            teacherIds.push(item.teacher_id)
          }
        }
      }
      if (teacherIds.length > 0) {
        for (const val of teacherIds) {
          const topicsItems = this.topics.filter(y => y.assigned_teacher_id === val)
          if (topicsItems.length > 0) {
            for (const topic of topicsItems) {
              topics.push(topic)
            }
          }
        }
        return topics
      }
    },
  },
  created() {
    this.getCourse()
    this.getStandardandSubject()
  },

};
</script>

<style lang="scss">
// .class-info__span {
//   background: white;
//   display: inline-block;
//   padding: 11px 22px;
//   border-radius: 10px;
//   color: rgb(0 0 0 / 60%);
//   font-size: 16px;
//   margin-right: 10px;
// }

.slick-dots {
  bottom: -10px;
  li button:before,
  li.slick-active button:before {
    color: transparent;
    opacity: 1;
  }
  li button:before {
    background-color: transparent;
    border: 1px solid #bc6c42;
    border-radius: 50%;
    display: inline-block;
    height: 10px;
    width: 10px;
  }
  li.slick-active button:before {
    background-color: #bc6c42;
  }
}

.slick-dots li button::before {
  height: 10px !important;
  widows: 10px !important;
  background: #fff;
}
.class-btn__coursle {
  border-radius: 16px;
  border: none;
  font-size: 12px;
  padding: 6px 16px;
  background: #fcdfbd;
  margin-left: 18px;
  margin-top: 5px;
  margin-bottom: 20px;

  color: #00000080;
}
.coursle-name {
  color: #222222;
  font-size: 16px;
  font-weight: 500;
  width: 106px;
  text-align: center;
}
.avater-couse {
  margin-left: 10px;
}
</style>
