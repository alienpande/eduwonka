<template>
  <div>
    <div style="background: white; padding: 14px 64px">
      <div style="display: flex; justify-content: space-between">
        <div style="opacity: 0.8; font-size: 24px; font-weight: 500">
          {{ lesson.name }}
        </div>
        <!-- <div>
          <e-button class="btn" icon="el-icon-edit" label="Edit" />
        </div> -->
      </div>
      <div style="display: flex; justify-content: space-between; margin-top: 10px">
        <div style="display: flex">
          <div style="margin-right: 50px">
            <div style="opacity: 0.8; font-weight: 300">Alloted</div>
            <div style="opacity: 0.8;font-size: 20px;font-weight: 500;margin-top: 5px;">
              {{ lesson.classrooms.length }} classes
            </div>
          </div>
          <div style="margin-right: 50px">
            <div style="opacity: 0.8; font-weight: 300">Taken by</div>
            <div style="opacity: 0.8;font-size: 20px;font-weight: 500;margin-top: 5px;">
              {{ lesson.teacher ? lesson.teacher.first_name : 'No Teacher' }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mg-l-20" style="padding: 20px; height: 60vh; overflow: auto">
      <el-row>
        <el-col :span="8">
          <div class="heading">Description</div>
          <el-card shadow="none" class="rounded-08">
            <div style="opacity: 0.6">
              {{ lesson.description }}
            </div>
          </el-card>
        </el-col>
        <el-col :span="8" :offset="1">
          <br />
          <div class="d-flex justfy-bet">
            <div style="margin-top: 12px" class="heading">Subtopic</div>
            <e-button label="Track Status" :plain="true" :span="7" @click="trackStatus = true" css="bg-tranparent sort-icon"></e-button>
          </div>
          <el-card shadow="none" class="rounded-08">
            <!-- <VueSlickCarousel v-bind="settings" :arrows="false" :dots="true"> -->
            <div class="cousole-wrap">
              <div class="syllabus-courosle" v-for="(sub, i) in lesson.sub_topics" :key="i">
                <e-svg class="pointer-icon" icon="Pointer" />
                <div class="syllabus-cousol__info mg-t-10">
                  {{ sub.name }}
                </div>
              </div>
            </div>
            <!-- </VueSlickCarousel> -->
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div style="margin-top: 12px" class="heading">Key objectives</div>
          <el-card shadow="none" class="rounded-08">
            <div class="cousole-wrap">
              <div class="syllabus-courosle" v-for="(objective, i) in lesson.key_objectives" :key="i">
                <e-svg class="pointer-icon" icon="Pointer" />
                <div class="syllabus-cousol__info mg-t-10">
                  {{ objective }}
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8" :offset="1">
          <div style="margin-top: 12px" class="heading">
            Tasks of the session
          </div>
          <el-card shadow="none" class="rounded-08">
            <div class="cousole-wrap">
              <div class="syllabus-courosle" v-for="(task, i) in lesson.session_tasks" :key="i">
                <e-svg class="pointer-icon" icon="Pointer" />
                <div class="syllabus-cousol__info mg-t-10">
                  {{ task }}
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div style="margin-top: 12px" class="heading">
            Activities for the session
          </div>
          <el-card shadow="none" class="rounded-08">
            <div class="cousole-wrap">
              <div class="syllabus-courosle" v-for="(activity, i) in lesson.session_activities" :key="i">
                <e-svg class="pointer-icon" icon="Pointer" />
                <div class="syllabus-cousol__info mg-t-10">
                  {{ activity }}
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8" :offset="1">
          <div style="margin-top: 12px" class="heading">Homework</div>
          <el-card shadow="none" class="rounded-08">
            <div class="cousole-wrap">
              <div class="syllabus-courosle" v-for="(work, i) in lesson.homework" :key="i">
                <e-svg class="pointer-icon" icon="Pointer" />
                <div class="syllabus-cousol__info mg-t-10">
                  {{ work }}
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <e-dialog :title="'Track Status of ' + lesson.name" v-model="trackStatus" width="60%" top="20vh" noEsc :gutter="20" hideDefaultFooter @cancel="trackStatus = false" @confirm="trackStatus = false">
      <br />
      <el-row class="mg-l-20">
        <el-col :span="15">
          <e-select label="Sub Topic" placeholder="Select Sub Topic" :v-model="subTopic.id" :options="lesson.sub_topics" :optionName="'name'" :valueKey="'id'" @visible-change ="visibleChange" />
        </el-col>
        <el-col :span="2" :offset="7">
          <e-button label="Save" @click="submit()" />
        </el-col>
      </el-row>
      <div class="mg-l-20" style="height:45vh;overflow:auto">
        <el-row>
          <el-col :span="11">
            <div class="heading mg-l-10">Activities</div>
            <el-card shadow="none" class="rounded-08">
              <div class="cousole-wrap">
                <div class="syllabus-courosle" v-for="(activity, i) in subTopic.session_activities" :key="i">
                <el-checkbox v-model="activity.check" />
                  <div class="syllabus-cousol__info mg-t-1">
                    {{ activity.item }}
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="11" :offset="1">
            <div class="heading mg-l-10">Homework</div>
            <el-card shadow="none" class="rounded-08">
              <div class="cousole-wrap">
                <div class="syllabus-courosle" v-for="(work, i) in subTopic.homework" :key="i">
                <el-checkbox v-model="work.check" />
                  <div class="syllabus-cousol__info mg-t-1">
                    {{ work.item }}
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <div class="heading mg-l-10">Tasks</div>
            <el-card shadow="none" class="rounded-08">
              <div class="cousole-wrap">
                <div class="syllabus-courosle" v-for="(task, i) in subTopic.session_tasks" :key="i">
                <el-checkbox v-model="task.check" />
                  <div class="syllabus-cousol__info mg-t-1">
                    {{ task.item }}
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="10" :offset="1">
            <br/><br/><br/>
            <div class="d-flex mg-t-20">
              <div style="opacity: 0.8;margin-top:20px;margin-right:10px" class="f-500">Number of classes taken</div>
              <div style="width: 72px;height: 36px;background: 0% 0% no-repeat padding-box padding-box #bc6c421a;border-radius: 10px;padding-top: 18px;text-align: center;">{{ getTakenClasses() }}</div>
            </div>
            <div class="d-flex mg-t-20">
              <el-checkbox v-model="attendance" />&emsp;
              <div style="opacity: 0.8; width:28rem" class="fs-16 f-500">Yes, I have marked the attendance for this class</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </e-dialog>
  </div>
</template>
<script>
import { dispatchGraphql } from '@/api/dispatcher'
import moment from 'moment'
export default {
  data: () => ({
    trackStatus: false,
    subTopic: {},
    lesson: {},
    query: `query ($id: uuid!) {
      topics_by_pk(id: $id) {
        id
        name
        description
        homework
        session_tasks
        key_objectives
        session_activities
        teacher {
          first_name
          id
        }
        classrooms {
          id
          name
          class_date
        }
        sub_topics {
          id
          name
        }
      }
    }`
  }),
  created() {
    this.getTopics()
  },
  methods: {
    submit() {
      if (this.subTopic.id) {
        this.trackStatus = false
        const mutation = `mutation {
          update_sub_topics_by_pk(pk_columns: {id: "${this.subTopic.id}"}, _set: {status: "completed"}) {
            id
          }
        }`
        dispatchGraphql(mutation).then((response) => {
          console.log(response)
          this.getTopics()
        })
      }
    },
    getTakenClasses() {
      let taken = 0
      for (const classroom of this.lesson.classrooms) {
        if (moment(classroom.class_date).isBefore(moment())) {
          taken++
        }
      }
      return taken
    },
    visibleChange(val) {
      this.subTopic.id = val
      console.log(this.subTopic)
    },
    getTopics() {
      dispatchGraphql(this.query, { id: this.$route.params.id }).then(response => {
        this.lesson = response.topics_by_pk
        this.subTopic = {
          homework: this.lesson.homework.map(x => { return {check: false, item: x} }),
          session_tasks: this.lesson.session_tasks.map(y => { return {check: false, item: y} }),
          session_activities: this.lesson.session_activities.map(z => { return {check: false, item: z} }),
          attendance: false,
        }
        console.log(this.subTopic)
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
  margin-left: 15px;
  margin-top:-5px;
}
// .student-tab .floatTabHeader.el-tabs.el-tabs--top > .el-tabs__header {
//   position: inherit !important;
// }
// .subtopic {
//   padding-bottom: 67px;
// }
// .i-icon:hover .syllabus-toltip {
//   visibility: visible !important;
// }

// .tooltip .tooltip-inner {
//   background: white;
//   color: black;
//   border-radius: 10px;
//   border: 2px solid #fcdfbd;
//   width: 130px;
//   padding: 10px 15px;
//   font-size: 12px;
// }
</style>
