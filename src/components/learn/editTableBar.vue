<template>
  <right-side-bar :show="show" @onClose="__onCancel">
    <div class="assign-right">
      <div>
        <div style="width: 321px;padding-left:2rem !important" class="heading">Add Subject</div>
        <br />
        <hr style="opacity: 0.2" />

        <div class="sb-section__2" style="height: 68vh">
          <div class="pd-x-30 pd-10 pd-b-30">
            <el-card shadow="none" style="background: rgba(248, 243, 238, 0.35)" class="rounded-08 text-center classroom-right__slide">
              <el-row style="opacity: 0.8">
                <el-col :span="12" style="border-right: 2px solid #fcdfbd; padding: 10px">
                  <span>Day</span> <br />
                  <span style="color: rgb(0, 0, 0); font-weight: bold">{{ fieldData.day }}</span>
                </el-col>
                <el-col :span="12" style="padding: 10px">
                  <span>Time</span> <br />
                  <span style="color: rgb(0, 0, 0); font-weight: bold">
                    <el-time-picker
                      is-range
                      v-model="form.time"
                      range-separator="-"
                      start-placeholder="Start"
                      end-placeholder="End"
                      format="HH:mm"
                      @change="calculateDuration()">
                    </el-time-picker>
                  </span>
                </el-col>
              </el-row>
            </el-card>
          </div>

          <div style="background: #e6eaed">
            <br />
            <e-select class="select-dropdown" style="margin-left: 25px" :span="10" label="Choose Subject" placeholder="Select Subject" :options="subjects" :optionName="'name'" :valueKey="'id'" @visible-change="getTeachers" />
            <e-select v-if="skills.length > 0" class="select-dropdown" style="margin-left: 25px" :span="10" label="Choose Skill" placeholder="Select Skill" :options="skills" :optionName="'name'" :valueKey="'id'" @visible-change="getMentor" />

            <br /><br /><br />
            <br />
            <div v-if="verify" class="f-600 f-16" style="margin-left: 25px">
              Assigned teacher
            </div>
            <br />
            <el-card v-if="verify" shadow="none" class="rounded-08" style="margin: 0 20px">
              <div class="d-flex">
                <el-avatar :size="98" :src="require('@/assets/images/profile.jpg')" />
                <div style="margin-left: 35px">
                  <div class="fs-16 f-600" style="opacity: 0.8">
                    {{ form.teacher }}
                  </div>
                  <br />
                  <div style="border: 1px solid var(--unnamed-color-bc6c42);background: #ffffff 0% 0% no-repeat padding-box;border: 1px solid #bc6c42;border-radius: 13px;color: #bc6c42;padding: 0 10px;">
                    Experince: {{ form.experience }} years
                  </div>
                </div>
              </div>
            </el-card>
            <br />
            <div v-if="teachers.length > 0" class="f-600 f-16" style="margin-left: 25px">
              Available teachers
            </div>
            <br />
            <VueSlickCarousel v-bind="settings" :arrows="false" :dots="true">
              <el-card shadow="none" v-for="item in teachers" :key="item" class="rounded-08 table-bar-card">
                <div class="pointer" @click="selectTeacher(item)">
                  <el-avatar :size="98" class="avater-table-bar" :src="require('@/assets/images/profile.jpg')" />
                  
                  <div>
                    <div class="fs-16 f-600 table-bar-info">{{ item.teacher.first_name }}
                    </div>
                    <!-- <br /> -->
                    <!-- <button class="table-bar-select">Select</button> -->
                  </div>
                </div>
              </el-card>
            </VueSlickCarousel>
            <br /><br />
            <el-row style="margin-top: 20px;padding-bottom: 15px;">
              <el-col class="float-right" :span="10">
                <e-button css='add-subject' label='Add Subject/Skill' @click="handleSubmit" />
              </el-col>
            </el-row>
            <br /><br /><br />
          </div>
        </div>
      </div>
    </div>
  </right-side-bar>
</template>
<script>
import RightSideBar from "../../components/school/rightSideBar.vue";
import ESelect from "@/controls/eSelect.vue";
import VueSlickCarousel from "vue-slick-carousel";
import { dispatchGraphql, dispatchGraphqlMutation } from "@/api/dispatcher"
import moment from 'moment'
import { dispatchGraphqlQuery } from "../../api/dispatcher";
export default {
  components: { RightSideBar, ESelect, VueSlickCarousel },
  props: {
    fieldData: {
      type: Object
    },
    show: { type: Boolean, default: false },
    __onCancel: Function,
  },
  data: () => ({
    verify: false,
    form: {},
    activeList: "activeone",
    standards: [],
    users: [],
    subjects: [],
    skills: [],
    teachers: [],
    settings: {
      dots: true,
      focusOnSelect: false,
      infinite: !true,
      slidesToShow: 2,
      slidesToScroll: 2,
      touchThreshold: 5,
    }
  }),
  created() {
    this.getUsers()
  },
  methods: {
    getUsers() {
      dispatchGraphqlQuery('users', ['id', 'first_name']).then((response) => {
        this.users = response.users
        this.getStandards()
      })
    },
    getStandards() {
      const query = `query {
        standards {
          id
          name
          standard_skills {
            id
            name
            mentor_id
          }
          standard_subjects {
            id
            subject {
              id
              name
              subject_teachers {
                id
                experience_years
                teacher {
                  id
                  first_name
                }
              }
            }
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.standards = response.standards
        this.getSubjects()
      })
    },
    calculateDuration() {
      this.form.start_time = (moment().format('L') + ' ' + moment(this.form.time[0], ['HH:mm']).format('LTS'))
      this.form.end_time = (moment().format('L') + ' ' + moment(this.form.time[1], ['HH:mm']).format('LTS'))
      console.log(this.form)
    },
    getSubjects() {
      this.verify = false
      this.form.standard_id = this.$route.params.standardId
      this.subjects = []
      const standard = this.standards.filter(x => x.id === this.$route.params.standardId)[0]
      this.subjects = standard.standard_subjects.map(x => x.subject)
      console.log(standard)
      if (standard.standard_skills.length > 0) {
        this.skills = standard.standard_skills
      }
    },
    getMentor(value) {
      const skill = this.skills.filter(x => x.id === value)[0]
      this.form.subjectable_id = value
      this.form.subjectable_type = 'Skill'
      this.form.teacher_id = skill.mentor_id
      this.form.week_day = this.fieldData.day
    },
    getTeachers(value) {
      this.verify = false
      this.form.subjectable_id = value
      this.form.subjectable_type = 'Subject'
      this.teachers = []
      const subject = this.subjects.filter(x => x.id === value)[0]
      this.teachers = subject.subject_teachers
    },
    selectTeacher(val) {
      this.verify = false
      this.form.week_day = this.fieldData.day
      this.form.teacher_id = val.teacher.id
      this.form.teacher = val.teacher.first_name
      this.form.experience = val.experience_years
      this.verify = true
    },
    handleSubmit() {
      delete this.form.time
      delete this.form.teacher
      delete this.form.experience
      console.log(this.form)
      dispatchGraphqlMutation('time_tables', ['id', 'week_day'], this.form).then((response) => {
        console.log(response)
        this.show = false
        this.$emit('save')
      })
    }
  }
};
</script>
<style lang="scss">
.sb-section__2 {
  height: 49vh;
  overflow-y: scroll;
  /* padding-bottom: 200px; */
}
.assign-right .el-tabs__header {
  border-bottom: 1px solid #fcdfbd !important;
}
.assign-right .floatTabHeader.el-tabs.el-tabs--top > .el-tabs__header {
  position: inherit !important;
}

.classrom-corsol {
  display: flex;
  justify-content: space-between;
  border: 1px solid #fcdfbd;
  border-radius: 8px;
  padding: 9px;
  margin-bottom: 12px;
  background: white;
  width: 21rem;
}
.text-corsol {
  color: #4d4f5c;
  font-size: 16px;
  padding: 5px 10px;
}
.marks {
  width: 90px;
  border-radius: 5px;
  color: #bc6c42;
  opacity: 0.8;
  font-size: 18px;
  background: white;
  text-align: center;
  padding: 6px 0;
  font-weight: 500;
  border: 1px solid #fcdfbd;
  cursor: pointer;
}
.classrom-corsol:hover {
  box-shadow: 0px 13px 21px #00000026;
}
.classrom-corsol:hover .marks {
  background: #bc6c42 !important;
  color: white !important;
}
.table-bar-card {
  margin: 0 20px;
  width: 175px !important;
}
.avater-table-bar {
  margin: auto;
  display: block;
  margin-bottom: 15px;
}
.table-bar-info {
  opacity: 0.8;
  text-align: center;
}
.table-bar-select {
  border: 1px solid var(--unnamed-color-bc6c42);
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #bc6c42;
  border-radius: 13px;
  color: #bc6c42;
  padding: 0 10px;
  display: block;
  margin: auto;
}

.slick-dots {
  bottom: -30px;
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
.add-subject{
    display: block;
    margin: auto;
}
</style>
