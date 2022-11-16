<template>
  <div> 
      <div class="d-flex" style="position: absolute; top: 160px; left: 296px">
        <div style="postion: relative">
          <img
            v-for="i in 4"
            :key="i"
            style="
              width: 36px;
              height: 36px;
              border: 1px solid #707070;
              border-radius: 50%;
              margin-left: -10px;
            "
            src="@/assets/images/profile.jpg"
            alt=""
          />
        </div>
        <div
          style="
            border: 1px solid rgb(112, 112, 112);
            border-radius: 17px;
            font-size: 12px;
            text-align: center;
            height: 28px;
            padding-top: 7px;
            width: 35px;
            display: inline-block;
            margin-left: -14px;
            margin-top: 1px;
            background: rgb(20, 146, 230);
            color: white;
          "
        >
          +20
        </div>
      </div>
      <el-tabs class="floatTabHeader studentTab" v-model="activeName">
        <el-tab-pane label="Active" name="tab1">
        
          <el-row v-for="i in classData" :key="i">
            <div class="mg-t-10">
            <el-col :span="13">
              <el-card
                class="rounded-08 bg-black-2"
                style="border: none"
                shadow="none"
              >
                <el-row>
                  <el-col :span="1">
                    <img src="@/assets/images/homeIcon.png" alt="" />
                  </el-col>
                  <el-col :span="10">
                    <div class="fs-20 f-600" style="color: #f3f3f3">
                      {{ i.name }}
                    </div>
                    <div style="color: #858585" class="fs-12">
                      {{ getTime(i.time_table.start_time )}} - {{ getTime(i.time_table.end_time) }}
                    </div>
                  </el-col>
                  <el-col :span="5" :offset="7">
                    <el-avatar
                      :size="40"
                      style="margin-left: 40px"
                      :src="require('@/assets/images/profile.jpg')"
                    />
                    <div style="color: #858585" class="fs-12">
                      By Dr. {{ i.time_table.teacher.first_name }}
                    </div>
                  </el-col>
                </el-row>
                <el-card
                  class="rounded-08 bg-black-3"
                  style="border: none; margin-top: 5px"
                  shadow="none"
                >
                  <div class="f-600" style="font-size: 18px; color: white">
                    Topic: {{ i.topic.name }}
                  </div>
                  <div class="tx-overflow" style="color: #cfcfcf">
                    {{ i.topic.description }}
                  </div>
                </el-card>
                <br />
                <div style="color: #f3f3f3" class="fs-16 f-600">
                  Reference Text Books & Downloads
                </div>
                <div v-for="topic of getCourseData(i.time_table)" :key="topic">
                  <el-row>
                    <el-col
                      :span="7"
                      style="margin-right: 5px"
                      v-for="i in topic.references_links" :key="i"
                    >
                      <el-row class="book-ref">
                        <el-col :span="6" style="position: relative">
                          <div
                            style="
                              width: 40px;
                              height: 50px;
                              background: #000000;
                              opacity: 0.6;
                              border-radius: 2px;
                              position: absolute;
                            "
                            class="download-icon-book-ref"
                          >
                            <e-svg
                              style="padding: 15px 11px"
                              icon="downloadIcon"
                            ></e-svg>
                          </div>
                          <img src="@/assets/images/Rectangle9.png" alt="" />
                        </el-col>
                        <el-col :span="18">
                          <div class="reference-book-info" style="color: #f3f3f3">
                            <a class="anchor-color" :href="i.url" target="_blank" style="color: white">{{ i.name }}</a>
                          </div>
                          <div style="color: #858585; font-size: 12px">
                            By J.K. Rowling
                          </div>
                        </el-col>
                      </el-row>
                    </el-col>
                    <el-col :span="2">
                      <img
                        style="
                          margin-top: 14px;
                          margin-left: 10px;
                          cursor: pointer;
                        "
                        src="@/assets/images/bookrefright.png"
                        alt=""
                      />
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8" :offset="3">
              <el-card
                class="rounded-08 bg-black-2"
                style="border: none"
                shadow="none"
              >
                <br />
                <div
                  style="color: #858585; font-size: 12px; text-align: center"
                >
                  Class starts in
                </div>
                <div class="d-flex" style="justify-content: center">
                  <div class="class-time">{{getTimeSlot(i.time_table.start_time, i.time_table.end_time)}}</div>
                </div>

                <div
                  style="
                    color: #f3f3f3;
                    font-size: 18px;
                    font-weight: 600;
                    margin-top: 10px;
                  "
                >
                  Join active class
                </div>
                <div style="color: #cfcfcf">
                  {{userName.first_name}} here is an active class, kindly join to attend the same
                </div>

                <div style="color: #f3f3f3; font-weight: 500; margin-top: 10px">
                  Class Prerequisites Lorem Ipsum
                </div>
                <ul>
                  <li style="color: #cfcfcf">
                    Lorem Ipsum is simply dummy text of the
                  </li>
                  <!-- <li style="color: #cfcfcf">
                    Lorem Ipsum is simply dummy text of the
                  </li>
                  <li style="color: #cfcfcf">
                    Lorem Ipsum is simply dummy text of the
                  </li> -->
                </ul>
                <br />
                <es-button text="Skip Class"> </es-button>

                <es-button
                  @click="conferenceCall(i)"
                  text="Join Class"
                  style="margin-top: 10px"
                  :plain="true"
                >
                </es-button>
              </el-card>
            </el-col>
            </div>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="Upcoming" name="tab2">
          <el-row>
            <el-col :span="5">
              <div style="color: #cfcfcf">{{classData.length}} Upcoming classes</div>
            </el-col>
            <el-col :span="6" :offset="9">
              <es-search
                style="margin-top: 4px"
                v-model="searchBy"
                placeholder="Search by Subject, Class or Timing"
              ></es-search>
            </el-col>
            <el-col :span="3" :offset="1">
              <!-- <es-select :options="subjects"></es-select> -->
              <el-select v-model="class_id" placeholder="Select" @change="setClassData(class_id)">
                <el-option v-for="item in classData" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-col>
          </el-row>

          <br />
          <br />
          <el-row>
            <el-col :span="8" v-for="i in classData" :key="i">
              <el-card
                class="rounded-08 bg-black-2"
                style="border: none; margin: 10px"
                shadow="none"
              >
                <div class="d-flex">
                  <img src="@/assets/images/mathIcon.png" alt="" />
                  <div class="f-600 text-white">{{i.name}}</div>
                </div>

                <div
                  style="
                    border-top: 1px solid #404040;
                    margin-top: 10px;
                    padding-top: 10px;
                  "
                  class="f-600 fs-16 text-white"
                >
                  Topic: {{i.topic.name}}
                </div>

                <el-card
                  class="rounded-08 bg-black-3"
                  style="border: none; margin: 10px"
                  shadow="none"
                >
                  <el-row>
                    <el-col :span="4">
                      <el-avatar
                        :size="40"
                        :src="require('@/assets/images/profile.jpg')"
                      />
                    </el-col>
                    <el-col :span="8">
                      <div style="color: #9d9d9d; font-size: 12px">
                        Taken by
                      </div>
                      <div style="color: #f3f3f3; font-weight: bold">
                        {{i.time_table.teacher.first_name}}
                      </div>
                    </el-col>
                    <el-col :span="8" :offset="4">
                      <div style="color: #9d9d9d; font-size: 12px">
                        Taken by
                      </div>
                      <div style="color: #f3f3f3; font-weight: bold">
                        {{i.time_table.teacher.first_name}}
                      </div>
                    </el-col>
                  </el-row>
                </el-card>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="Completed" name="tab3">
          <el-row>
            <el-col :span="5">
              <div style="color: #cfcfcf">{{classData.length}} Completed classes</div>
            </el-col>
            <el-col :span="6" :offset="9">
              <es-search
                style="margin-top: 4px"
                v-model="searchBy"
                placeholder="Search by Subject, Class or Timing"
              ></es-search>
            </el-col>
            <el-col :span="3" :offset="1">
              <!-- <es-select :options="subjects"></es-select> -->
              <el-select v-model="class_id" placeholder="Select" @change="setClassData(class_id)">
                <el-option v-for="item in classData" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-col>
          </el-row>

          <br />
          <br />
          <el-row>
            <el-col :span="8" v-for="i in classData" :key="i">
              <el-card
                class="rounded-08 bg-black-2"
                style="border: none; margin: 10px"
                shadow="none"
              >
                <div class="d-flex">
                  <img src="@/assets/images/mathIcon.png" alt="" />
                  <div class="f-600 text-white">{{i.name}}</div>
                </div>

                <div
                  style="
                    border-top: 1px solid #404040;
                    margin-top: 10px;
                    padding-top: 10px;
                  "
                  class="f-600 fs-16 text-white"
                >
                  Topic: {{i.topic.name}}
                </div>

                <el-card
                  class="rounded-08 bg-black-3"
                  style="border: none; margin: 10px"
                  shadow="none"
                >
                  <el-row>
                    <el-col :span="4">
                      <el-avatar
                        :size="40"
                        :src="require('@/assets/images/profile.jpg')"
                      />
                    </el-col>
                    <el-col :span="8">
                      <div style="color: #9d9d9d; font-size: 12px">
                        Taken by
                      </div>
                      <div style="color: #f3f3f3; font-weight: bold">
                        {{i.time_table.teacher.first_name}}
                      </div>
                    </el-col>
                    <el-col :span="8" :offset="4">
                      <div style="color: #9d9d9d; font-size: 12px">
                        Taken by
                      </div>
                      <div style="color: #f3f3f3; font-weight: bold">
                        {{i.time_table.teacher.first_name}}
                      </div>
                    </el-col>
                  </el-row>
                </el-card>
                <es-button text="View Recordings"></es-button>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
   
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import { dispatchGraphql } from '@/api/dispatcher'
import moment from 'moment'
import _ from 'lodash'
import { getId } from '@/util/auth'
export default {
  components: {},
  data() {
    return {
      searchBy: "",
      enable_btn: true,
      switchValue: true,
      activeName: "tab1",
      subjects: [
        {
          title: "Class 4",
          value: "Class 4",
        },
        {
          title: "Science",
          value: "Science",
        },
      ],
      class_id: '',
      query: `query {
        classrooms {
          id
          name
          class_date
          topic {
            id
            name
            description
          }
          time_table {
            id
            subjectable_id
            standard_id
            start_time
            end_time
            teacher{
              id
              first_name
            }
          }
        }
      }`,
      classData: [],
      courseData: [],
      active: [],
      upcoming: [],
      completed: [],
      timel: '',
      currentDate: moment(new Date()).format('yyyy-MM-DD'),
      courseQuery: `query {
        courses {
          id
          description
          references_links
          standard_id
          subject_id
        }
      }`,
      userQuery: `query{
        users_by_pk(id: "${getId()}") {
          id
          first_name
        }
      }`,
      userName: {},
    };
  },
  watch: {
    activeName: _.debounce(function() {
      if (this.activeName === 'tab2') {
        this.classData = []
        this.classData = this.upcoming
      } else if (this.activeName === 'tab3') {
        this.classData = []
        this.classData = this.completed
      } else {
        this.classData = []
        this.classData = this.active
      }
    })
  },
  created() {
    this.getClassData()
    console.log('id', this.class_id, "getId",getId())
  },
  methods: {
    ...mapMutations("Common", [
      "setAsideMenuCollapse",
      "setAsideWidth",
      "setBg",
    ]),

    addNewEmployees() {
      this.$router.push(this.$url.LN_CLASSROOM_FORM);
    },

    ptest(d) {
      console.log(d);
    },
    getTime(data) {
        return moment(data).format('HH:mmA')
    },
    getTimeSlot(data,data1) {
      var start = new Date(data)
      var end = new Date(data1)
        var now = new Date().getTime();
        var timeleft = start - now;
        var passtime = end - now
        if(timeleft > 0) {
          setTimeout(() => {
             timeleft -= 1
              var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
              var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
              this.getTimeSlot(data,data1)
              this.timel = hours+"h"+":"+minutes+"m:"+seconds+"s"
              }, 1000)
        } else {
          if(passtime > 0 && timeleft <= 0) {
            setTimeout(() => {
              passtime -= 1
               var hours = Math.floor((passtime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
               var minutes = Math.floor((passtime % (1000 * 60 * 60)) / (1000 * 60));
               var seconds = Math.floor((passtime % (1000 * 60)) / 1000);
               this.getTimeSlot(data,data1)
               this.timel = "ends in : "+hours+"h"+":"+minutes+"m:"+seconds+"s"
               }, 1000)
           }
        }
        if (passtime < 0) {
          this.enable_btn = false
          return ""+"TimeUp"
        }
          return this.timel
    },
    getCourseData(data) {
     const reference = this.courseData.filter(x => (x.standard_id === data.standard_id && (x.subject_id === data.subject_id)))
     return reference
    },
    getClassData() {
      dispatchGraphql( this.query ).then(response => {
        // this.classData = response.classroom
        // console.log("classData",this.classData)
         for (const form of response.classrooms) {
          if (this.currentDate < moment(form.class_date).format('yyyy-MM-DD')) {
            this.upcoming.push(form)
          } else if (this.currentDate > moment(form.class_date).format('yyyy-MM-DD')) {
            this.completed.push(form)
          } else if (this.currentDate === moment(form.class_date).format('yyyy-MM-DD')) {
            this.active.push(form)
          }
        }
        if (this.active.length > 0) {
          this.classData = this.active
        }
        console.log('completed', this.completed, 'upcoming', this.upcoming, 'active', this.active)
      })
      dispatchGraphql( this.courseQuery).then(response => {
        this.courseData = response.courses
        console.log("courses",this.courseData)
      })
      dispatchGraphql( this.userQuery ).then(response => {
        this.userName = response.users_by_pk
        console.log("user",this.userName)
      })
    },
    getVariables(data) {
      return {
        "sub_id": data.subject_id,
        "stid": data.standard_id
      }
    },
    setClassData(class_id) {
      const filterData = this.classData.filter(x => (x.id === class_id))
      console.log('id', class_id, filterData)
      this.classData = filterData
    },
    conferenceCall(classroom){
      var time = moment(),
        beforeTime = moment(classroom.time_table.start_time),
        afterTime = moment(classroom.time_table.end_time);
      if (time.isBetween(beforeTime, afterTime)) {
        this.$router.push(this.$url.LN_ONLINE_CLASS + '/' + classroom.id)
      }else{
        alert('This Class has ended')
      } 
    }
  },
  mounted() {
    this.setBg("black");
  },
};
</script>
<style>
.download-icon-book-ref {
  display: none;
}
.book-ref:hover .download-icon-book-ref {
  display: block;
}
.book-ref:hover .reference-book-info {
  color: #1492e6 !important;
}
.tx-overflow {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  -webkit-line-clamp: 2;
  line-height: 1rem;
  max-height: 3.4rem;
}
.anchor-color {
  text-anchor: white;
}
</style>
