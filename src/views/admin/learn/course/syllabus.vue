<template>
  <div v-if="standardSubject" style="overflow: auto; height: 80vh">
    <course-header title="Syllabus" :standard="standard.name" :subject="subject.name" />
    <el-row style=" padding: 0 60px" class="reduce-padding sm-margin-l-0 sm-p-x-15 dashboard-cards-wrapper">
      <el-col :span="10" class="sm-width-100">
        <div class="heading">Introduction</div>
        <el-card
          shadow="none"
          style="padding: 20px 10px"
          class="rounded-08 pg-50 cp"
        >
          <el-row>
            <el-col :span="6" class="sm-width-auto" style="width:auto">
              <el-avatar
                class="avater-couse"
                :size="90"
                :src="require('@/assets/images/profile.jpg')"
              />
            </el-col>
            <el-col :span="16" class="sm-width-auto" style="width:auto;display: flex;flex-direction: column;align-items: center;">
              <div class="coursle-name">Marina Campbell</div>
              <button class="class-btn__coursle">Positive track</button>
            </el-col>
          </el-row>
          <div
            style="
              font-size: 20px;
              font-weight: 500;
              color: rgb(34 34 34 / 80%);
              margin-top: 10px;
              padding: 5px 0;
            "
          >
            Progress stats
          </div>
          <div style="display: flex; justify-content: space-between" class="sm-d-c">
            <div>
              <span
                style="
                  font-size: 14px;
                  font-weight: 300;
                  display: block;
                  color: rgb(0 0 0 / 80%);
                  margin-top: 10px;
                "
                >Ongoing</span
              >
              <span
                style="
                  font-size: 20px;
                  font-weight: 500;
                  color: rgb(0 0 0 / 80%);
                  margin-top: 15px;
                "
                >{{ getTopics(standardSubject.subject, 'alloted') }} Classes</span
              >
            </div>
            <div>
              <span
                style="
                  font-size: 14px;
                  font-weight: 300;
                  display: block;
                  color: rgb(0 0 0 / 80%);
                  margin-top: 10px;
                "
                >Completed</span
              >
              <span
                style="
                  font-size: 20px;
                  font-weight: 500;
                  color: rgb(0 0 0 / 80%);
                  margin-top: 15px;
                "
                >{{ getTopics(standardSubject.subject, 'taken') }} Classes</span
              >
            </div>
            <div>
              <span
                style="
                  font-size: 14px;
                  font-weight: 300;
                  display: block;
                  color: rgb(0 0 0 / 80%);
                  margin-top: 10px;
                "
                >Upcoming</span
              >
              <span
                style="
                  font-size: 20px;
                  font-weight: 500;
                  color: rgb(0 0 0 / 80%);
                  margin-top: 15px;
                "
                >{{ getTopics(standardSubject.subject, 'delay') }} Classes</span
              >
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" style="" class="sm-width-100 sm-margin-l-0">
        <div class="heading">Class period stats</div>
        <el-card shadow="none" class="rounded-08 pg-50 cp">
          <div
            style="
              display: flex;
              justify-content: space-between;
              text-align: center;
            "
          >
            <div
              style="
                background: #fcdfbd;
                border-radius: 10px;
                padding: 6px 23px;
              "
            >
              <span
                style="
                  font-size: 14px;
                  font-weight: 300;
                  display: block;
                  color: rgb(0 0 0 / 80%);
                  margin-top: 10px;
                "
                >Alloted</span
              >
              <span
                style="
                  font-size: 44px;
                  font-weight: 500;
                  color: rgb(0 0 0 / 80%);
                  margin-top: 15px;
                "
                >{{ getTopics(standardSubject.subject, 'alloted') }}</span
              >
            </div>
            <div style="padding: 6px 23px">
              <span
                style="
                  font-size: 14px;
                  font-weight: 300;
                  display: block;
                  color: rgb(0 0 0 / 80%);
                  margin-top: 10px;
                "
                >Taken</span
              >
              <span
                style="
                  font-size: 44px;
                  font-weight: 500;
                  color: rgb(0 0 0 / 80%);
                  margin-top: 15px;
                "
                >{{ getTopics(standardSubject.subject, 'taken') }}</span
              >
            </div>
            <div style="padding: 6px 23px">
              <span
                style="
                  font-size: 14px;
                  font-weight: 300;
                  display: block;
                  color: rgb(0 0 0 / 80%);
                  margin-top: 10px;
                "
                >In delay</span
              >
              <span
                style="
                  font-size: 44px;
                  font-weight: 500;
                  color: rgb(0 0 0 / 80%);
                  margin-top: 15px;
                "
                >{{ getTopics(standardSubject.subject, 'delay') }}</span
              >
            </div>
          </div>

          <VueSlickCarousel class="learn-syllabus-carousel" v-bind="settings" :arrows="false" :dots="true" style="width:50%">
            <!-- <div v-for="i in 4" :key="i" class="cousole-wrap"> -->
            <div class="cousole-wrap" v-for="topic of getTopics(standardSubject.subject, 'data')" :key="topic">
              <e-svg class="pointer-icon" icon="Pointer" />
              <span class="syllabus-cousol__info">
                {{ topic.name }}
              </span>
            </div>
            <!-- </div> -->
          </VueSlickCarousel>
        </el-card>
      </el-col>
    </el-row>
    <div style="padding: 0 86px" class="student-tab reduce-padding sm-p-x-15 learn-syllabus-progress">
      <div class="heading subtopic">Subtopic progress</div>

      <el-tabs class="floatTabHeader" v-model="activeName">
         <el-tab-pane label="Active" name="Active" class="tab-panel-margin">
          <el-col class="i-icon sm-width-100" style="position: relative;margin-bottom:10px;margin-right:10px" v-for="topic in selectedTopics" :key="topic" :span="11" >
            <el-card shadow="none" class="mlm rounded-08 card-padd cp">
              <el-col :span="2" :offset="1">
                <e-svg icon="Group"></e-svg>
              </el-col>
              <el-col :span="6" :offset="0.5" style="overflow: auto;border-right: 1px solid #e6eaed;font-weight: bold; margin-bottom: 17px">
                {{ topic.name }}
              </el-col>
              <el-col :span="13" :offset="1">
                <el-progress :text-inside="true" :stroke-width="18" :percentage="getPercentage(topic.sub_topics)" color="#FFA700"></el-progress>
              </el-col>
            </el-card>
          </el-col>
        </el-tab-pane>

        <el-tab-pane label="Upcoming" name="Upcoming" class="tab-panel-margin">
          <el-col class="i-icon sm-width-100" style="position: relative;margin-bottom:10px;margin-right:10px" v-for="topic in selectedTopics" :key="topic" :span="11" >
            <el-card shadow="none" class="mlm rounded-08 card-padd cp">
              <el-col :span="2" :offset="1">
                <e-svg icon="Group"></e-svg>
              </el-col>
              <el-col :span="6" :offset="0.5" style="overflow: auto;border-right: 1px solid #e6eaed;font-weight: bold; margin-bottom: 17px">
                {{ topic.name }}
              </el-col>
              <el-col :span="13" :offset="1">
                <el-progress :text-inside="true" :stroke-width="18" :percentage="getPercentage(topic.sub_topics)"></el-progress>
              </el-col>
            </el-card>
          </el-col>
        </el-tab-pane>

        <el-tab-pane label="Completed" name="Completed" class="tab-panel-margin">
          <el-col class="i-icon sm-width-100" style="position: relative;margin-bottom:10px;margin-right:10px" v-for="topic in selectedTopics" :key="topic" :span="11" >
            <el-card shadow="none" class="mlm rounded-08 card-padd cp">
              <el-col :span="2" :offset="1">
                <e-svg icon="Group"></e-svg>
              </el-col>
              <el-col :span="6" :offset="0.5" style="overflow: auto;border-right: 1px solid #e6eaed;font-weight: bold; margin-bottom: 17px">
                {{ topic.name }}
              </el-col>
              <el-col :span="13" :offset="1">
                <el-progress :text-inside="true" :stroke-width="18" :percentage="getPercentage(topic.sub_topics)" color="#39a125"></el-progress>
              </el-col>
            </el-card>
          </el-col>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import courseHeader from "@/components/learn/course/courseHeader.vue"
import VueSlickCarousel from "vue-slick-carousel"
import { dispatchGraphql } from '@/api/dispatcher'
import moment from 'moment'
import _ from 'lodash'
export default {
  components: { VueSlickCarousel, courseHeader },
  data: () => ({
    activeName: "Active",
    msg: "Lorem ipsum dolor sit amet consectetur",
    standard: {},
    subject: {},
    standardSubject: {},
    topics: [],
    selectedTopics: [],
    subTopics: [],
    settings: {
      dots: true,
      focusOnSelect: false,
      infinite: !true,
      slidesToShow: 2,
      slidesToScroll: 1,
      touchThreshold: 5,
    },
  }),
  created() {
    this.getStandardandSubject()
    this.setTopics()
  },
  watch: {
    activeName: _.debounce(function() {
      if (this.activeName === 'Upcoming') {
        this.selectedTopics = []
        this.setTopics()
      } else if (this.activeName === 'Completed') {
        this.selectedTopics = []
        this.setTopics()
      } else {
        this.selectedTopics = []
        this.setTopics()
      }
    })
  },
  methods: {
    getTopics(data, type) {
      let a = []
      var topics = []
      for (const item of data.subject_teachers) {
        if (a.length === 0) {
          a.push(item.teacher_id)
        } else {
          const teacher = a.filter(x => x === item.teacher_id)[0]
          if (teacher != item.teacher_id) {
            a.push(item.teacher_id)
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
      if (type === 'data') {
        return topics
      } else if (type === 'progress') {
        this.subTopics = topics
        this.setTopics()
      } else {
        let alloted = 0
        let taken = 0
        let delayed = 0
        for (const topic of topics) {
          alloted = alloted + topic.classrooms.length
          for (const classroom of topic.classrooms) {
            if (moment(classroom.class_date).format('yyyy-MM-DD') < moment().format('yyyy-MM-DD')) {
              taken ++
            } else if ((moment(classroom.class_date).format('yyyy-MM-DD') === moment().format('yyyy-MM-DD'))) {
              delayed ++
            } 
          }
        }
        if (type === 'alloted') {
          return alloted
        } else if (type === 'taken') {
          return taken
        } else {
          return delayed
        }
      }
    },
    getPercentage(data) {
      const count = (100 / data.length)
      let percentage = 0
      for (const item of data) {
        if (item.status && item.status === 'completed') {
          percentage = percentage + count
        }
      }
      return percentage.toFixed(0)
    },
    setTopics() {
      var activeTopics = []
      var upcomingTopics = []
      var completedTopics = []
      for (const topic of this.subTopics) {
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
      if (this.activeName === 'Active') {
        this.selectedTopics = activeTopics
      } else if (this.activeName === 'Upcoming') {
        this.selectedTopics = upcomingTopics
      } else if (this.activeName === 'Completed') {
        this.selectedTopics = completedTopics
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
            }
          }
        }
      }`
      const query = `query {
        topics {
          id
          name
          assigned_teacher_id
          sub_topics {
            id
            name
            status
          }
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
      }`
      dispatchGraphql(standardQuery, this.getVariables()).then(response => {
        this.standardSubject = response.standard_subjects[0]
        this.standard = this.standardSubject.standard
        this.subject = this.standardSubject.subject
        dispatchGraphql(query).then((response) => {
          this.topics = response.topics
          this.getTopics(this.standardSubject.subject, 'progress')
        })
      })
    }
  }
};
</script>

<style lang="scss">



.class-btn__coursle {
  border-radius: 16px;
  border: none;
  font-size: 12px;
  padding: 6px 16px;
  background: #fcdfbd;
  margin-left: 18px;
  margin-top: 35px;
  margin-bottom: 20px;
  color: #00000080;
  display: block;
  margin: auto;
}
.coursle-name {
  color: #222222;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  padding-bottom: 21px;
}

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
.cousole-wrap {
  padding: 10px 0;
}
.syllabus-courosle {
  display: flex;
  margin-bottom: 18px;
}
.pointer-icon {
  display: inline-block;
  margin-top: 8px;
  margin-right: 8px;
}
.syllabus-cousol__info {
  font-size: 14px;
  font-weight: 300;
  opacity: 0.6;
}
.student-tab .floatTabHeader.el-tabs.el-tabs--top > .el-tabs__header {
  position: inherit !important;
}
.subtopic {
  padding-bottom: 67px;
}
.i-icon:hover .syllabus-toltip {
  visibility: visible !important;
}


.tooltip .tooltip-inner {
  background: white;
  color: black;
  border-radius: 10px;
  border: 2px solid #FCDFBD;
  width: 130px;
  padding: 10px 15px;
  font-size: 12px;
}

@media only screen and (max-width:767px){
  .reduce-padding {
    padding:0px 20px !important;
  }
  .sm-width-100{
    width:100% !important;
  }
}
</style>