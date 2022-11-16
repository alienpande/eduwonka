<template>
  <div>
    <e-container
      class="learn-classroom"
      pageTitle="Classroom"
      btnIcon="el-icon-plus"
      btnText="Add Classroom"
      @btnClick="addNewEmployees"
    >
      <el-tabs class="floatTabHeader" v-model="activeName">
        <el-tab-pane label="Active" name="active">
          <el-row class="searchCard searchCard-2">
            <el-col :span="6" style="font-weight: bold; font-size: 18px">
              {{ total }} classes
            </el-col>
            <el-col :span="3" style="padding-left: 35px" :offset="10">
              <el-dropdown @command="handleStandard">
                <span class="el-dropdown-link primary-text" primary>
                  Standard<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="item in standards" :key="item.id" :command="item.id">{{ item.name }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
            <el-col :span="3" style="padding-left: 35px" class="primary-text">
              <el-dropdown @command="handleSubject">
                <span class="el-dropdown-link primary-text" primary>
                  Subject<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="item in subjects" :key="item.id" :command="item.id">{{ item.name }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
            <el-col style="padding-left: 10px" :span="1">
              <e-button icon="el-icon-search" :plain="true" css="bg-tranparent" />
            </el-col>
          </el-row>

          <el-row :gutter="10">
 
            <el-col :span="12" class="mg-y-1" v-for="(d, i) in forms" :key="i">
              <div @click="showSideBar = true">
                <e-card shadow="none" style="margin-bottom:10px" class="rounded-08 text-center pg-50 cp" containerHeight="379px">
                  <div>
                    <el-row :gutter="10">
                      <el-col :span="16">
                        <div class="heading" @click="conferenceCall(d)">
                          {{d.name}}
                        </div>
                        <el-card shadow="none" style="background: #eee2d5; opacity: 0.8" class="rounded-08 text-center pg-50 cp">
                          <div>
                            <el-row>
                              <el-col :span="13">
                                <span>Standard</span> <br />
                                <span style="color: rgb(0, 0, 0); font-weight: bold">{{d.time_table.standard.name}}</span>
                              </el-col>
                              <el-col :span="9">
                                <span>Subject</span> <br />
                                <span style="color: rgb(0, 0, 0); font-weight: bold">{{ d.time_table.subject ? d.time_table.subject.name : '' }}</span>
                              </el-col>
                            </el-row>
                          </div>
                        </el-card>
                      </el-col>
                      <el-col :span="6">
                        <el-avatar style="border: 3px solid #bc6c42" :size="98" :src="require('@/assets/images/profile.jpg')"/>
                        <div style="font-weight: bold;font-size: 20px;opacity: 0.8;">
                         <div style="margin-top:7px">
                            {{ d.time_table.teacher ? d.time_table.teacher.first_name : '' }}
                         </div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                  <el-card style="background: #eee2d5;text-align: start;margin-top: 15px;" shadow="none" class="rounded-08 pg-50 cp">
                    <div>
                      <el-row style="opactiy: 0.8">
                        <el-col :span="13">
                          <span style="color: #222222;opacity: 0.8;font-weight: bold;">Attendance</span>
                          <br />
                          <span>31/45</span>
                        </el-col>
                        <el-col :span="10">
                          <span style="color: #222222;opacity: 0.8;font-weight: bold;">Time left</span>
                          <br />
                          <span>{{getTimeSlot(d.time_table.start_time, d.time_table.end_time)}}</span>
                        </el-col>
                      </el-row>
                    </div>
                  </el-card>
                </e-card>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="Upcoming" name="upcoming">
          <el-row class="searchCard searchCard-2">
            <el-col :span="6" style="font-weight: bold; font-size: 18px">
              {{ total }} classes
            </el-col>
            <el-col :span="6"></el-col>
            <el-col :span="3" style="padding-left: 35px" :offset="10">
              <el-dropdown @command="handleStandard">
                <span class="el-dropdown-link primary-text" primary>
                  Standard<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="item in standards" :key="item.id" :command="item.id">{{ item.name }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
            <el-col :span="3" style="padding-left: 35px" class="primary-text">
              <el-dropdown @command="handleSubject">
                <span class="el-dropdown-link primary-text" primary>
                  Subject<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="item in subjects" :key="item.id" :command="item.id">{{ item.name }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
            <el-col style="padding-left: 10px" :span="1">
              <e-button icon="el-icon-search" :plain="true" css="bg-tranparent" />
            </el-col>
          </el-row>

          <el-row class="dashboard-cards-wrapper">
            <el-col :span="12" class="mg-y-1" v-for="(d, i) in forms" :key="i">
              <div @click="showSideBar = true">
                <e-card shadow="none" style="margin-bottom:10px" class="rounded-08 text-center pg-50 cp" containerHeight="379px"  >
                  <div>
                    <el-row :gutter="10">
                      <el-col :span="16">
                        <div class="heading">
                          {{d.name}}
                        </div>
                        <el-card shadow="none" style="background: #eee2d5; opacity: 0.8" class="rounded-08 text-center pg-50 cp">
                          <div>
                            <el-row>
                              <el-col :span="12">
                                <span>Standard</span> <br />
                                <span style="color: rgb(0, 0, 0); font-weight: bold">{{d.time_table.standard.name}}</span>
                              </el-col>
                              <el-col :span="10">
                                <span>Subject</span> <br />
                                <span style="color: rgb(0, 0, 0); font-weight: bold">{{ d.time_table.subject ? d.time_table.subject.name : '' }}</span>
                              </el-col>
                            </el-row>
                          </div>
                        </el-card>
                      </el-col>
                      <el-col :span="6">
                        <el-avatar style="border: 3px solid #bc6c42" :size="98" :src="require('@/assets/images/profile.jpg')"/>
                        <div style="font-weight: bold;font-size: 20px;opacity: 0.8;">
                         <div style="margin-top:7px">
                            {{ d.time_table.teacher ? d.time_table.teacher.first_name : '' }}
                         </div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                  <el-card style="background: #eee2d5;text-align: start;margin-top: 15px;" shadow="none" class="rounded-08 pg-50 cp">
                    <div>
                      <el-row style="opactiy: 0.8">
                        <el-col :span="13">
                          <span style="color: #222222;opacity: 0.8;font-weight: bold;">Attendance</span>
                          <br />
                          <span>31/45</span>
                        </el-col>
                        <el-col :span="10">
                          <span style="color: #222222;opacity: 0.8;font-weight: bold;">Time left</span>
                          <br />
                          <span>15m 20s</span>
                        </el-col>
                      </el-row>
                    </div>
                  </el-card>
                </e-card>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="Complete" name="completed">
          <el-row class="searchCard searchCard-2">
            <el-col :span="6" style="font-weight: bold; font-size: 18px">
              {{ total }} classes
            </el-col>
            <el-col :span="6"></el-col>
            <el-col :span="3" style="padding-left: 35px" :offset="10">
              <el-dropdown @command="handleStandard">
                <span class="el-dropdown-link primary-text" primary>
                  Standard<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="item in standards" :key="item.id" :command="item.id">{{ item.name }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
            <el-col :span="3" style="padding-left: 35px" class="primary-text">
              <el-dropdown @command="handleSubject">
                <span class="el-dropdown-link primary-text" primary>
                  Subject<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="item in subjects" :key="item.id" :command="item.id">{{ item.name }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
            <el-col style="padding-left: 10px" :span="1">
              <e-button icon="el-icon-search" :plain="true" css="bg-tranparent"></e-button>
            </el-col>
          </el-row>

          <el-row class="dashboard-cards-wrapper">
            <el-col :span="12" class="mg-y-1" v-for="(d, i) in forms" :key="i">
              <div @click="handleSideBar(d)" >
                <e-card shadow="none" style="margin-bottom:10px" class="rounded-08 text-center pg-50 cp" containerHeight="379px"  >
                  <div>
                    <el-row :gutter="10">
                      <el-col :span="16">
                        <div class="heading">
                          {{d.name}}
                        </div>
                        <el-card shadow="none" style="background: #eee2d5; opacity: 0.8" class="rounded-08 text-center pg-50 cp">
                          <div>
                            <el-row>
                              <el-col :span="12">
                                <span>Standard</span> <br />
                                <span style="color: rgb(0, 0, 0); font-weight: bold">{{d.time_table.standard.name}}</span>
                              </el-col>
                              <el-col :span="10">
                                <span>Subject</span> <br />
                                <span style="color: rgb(0, 0, 0); font-weight: bold">{{ d.time_table.subject ? d.time_table.subject.name : '' }}</span>
                              </el-col>
                            </el-row>
                          </div>
                        </el-card>
                      </el-col>
                      <el-col :span="6">
                        <el-avatar style="border: 3px solid #bc6c42" :size="98" :src="require('@/assets/images/profile.jpg')"/>
                        <div style="font-weight: bold;font-size: 20px;opacity: 0.8;">
                         <div style="margin-top:7px">
                            {{ d.time_table.teacher ? d.time_table.teacher.first_name : '' }}
                         </div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                  <el-card style="background: #eee2d5;text-align: start;margin-top: 15px;" shadow="none" class="rounded-08 pg-50 cp">
                    <div>
                      <el-row style="opactiy: 0.8">
                        <el-col :span="13">
                          <span style="color: #222222;opacity: 0.8;font-weight: bold;">Attendance</span>
                          <br />
                          <span>31/45</span>
                        </el-col>
                        <el-col :span="10">
                          <span style="color: #222222;opacity: 0.8;font-weight: bold;">Time left</span>
                          <br />
                          <span>{{getTimeSlot(d.time_table.start_time, d.time_table.end_time)}}</span>
                        </el-col>
                      </el-row>
                    </div>
                  </el-card>
                </e-card>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <!-- <pagination :total="total" @pagination="pagination" /> -->
      <es-pagination class="pagination" :total="total" @pagination="pagination"></es-pagination>
    </e-container>
    <school-right-slide v-if="rightBarData.name" :rightBarData="rightBarData" :show="showSideBar" :__onCancel="() => (showSideBar = !showSideBar)"/>
  </div>
</template>
<script>
import esPagination from '@/studentControl/esPagination'
import schoolRightSlide from "@/components/learn/classroomRightSlide.vue";
import { dispatchGraphql, dispatchGraphqlQuery } from "@/api/dispatcher";
// import Pagination from '@/components/Pagination';
import { mapMutations } from "vuex";
import moment from 'moment';
import _ from 'lodash';
// import Vue from "vue";
// import store from "../store";
// import SocketIO from "socket.io-client";
// import VueSocketIO from "vue-socket.io";
// import io from "socket.io-client";

export default {
  components: { schoolRightSlide, esPagination },
  data() {
    return {
      responseAvailable: true,
      showSideBar: false,
      timel: '',
      activeName: "active",
      rtpCapabilities: '',
      transportResp: '',
      conenctResp: '',
      standards: [],
      subjects: [],
      standardIds: [],
      subjectIds: [],
      activeEmployeesReport: [
        {
          title: "Total Employees",
          value: "60",
          icon: "hq/employees",
        },
        {
          title: "Total Boys",
          value: "30",
          icon: "hq/boy",
        },
        {
          title: "Total Girls",
          value: "30",
          icon: "hq/girl",
        },
      ],
      inActiveEmployeesReport: [
        {
          title: "Total Employees",
          value: "3",
          icon: "hq/employees",
        },
        {
          title: "Total Boys",
          value: "2",
          icon: "hq/boy",
        },
        {
          title: "Total Girls",
          value: "1",
          icon: "hq/girl",
        },
      ],
      forms: [],
      rightBarData: {},
      currentDate: moment(new Date()).format('yyyy-MM-DD'),
      dateComparison: {},
      total: 0,
      offset: 0,
      page: 1,
      limit: 10,
      selectedDate: '',
      query: `query($limit: Int!, $offset: Int!, $standIds: [uuid!]!, $subIds: [uuid!]!, $classDate: timestamp_comparison_exp) {
        classrooms(limit: $limit, offset: $offset, where: {_and: [{time_table: {_and: [{subjectable_id: {_in: $subIds}}, {standard_id: {_in: $standIds}}]}}, {class_date: $classDate}]}) {
          id
          name
          topic_id
          class_date
          time_table {
            id
            start_time
            end_time
            teacher {
              id
              first_name
            }
            subject {
              id
              name
            }
            standard {
              id
              name
            }
          }
        }
        classrooms_aggregate(where: {_and: [{time_table: {_and: [{subjectable_id: {_in: $subIds}}, {standard_id: {_in: $standIds}}]}}, {class_date: $classDate}]}) {
          aggregate {
            count
          }
        }
      }`,
    };
  },
  mounted() {
    this.hideAsideMenuMobile()
  },
  created() {
    this.getStandards()
  },
  watch: {
    activeName: _.debounce(function() {
      if (this.activeName === 'upcoming') {
        this.dateComparison = {_gt: this.currentDate}
        this.getClassRooms()
      } else if (this.activeName === 'completed') {
        this.dateComparison = {_lt: this.currentDate}
        this.getClassRooms()
      } else {
        this.dateComparison = {_eq: this.currentDate}
        this.getClassRooms()
      }
    })
  },
  methods: {
    pagination: function(object) {
      this.limit = object.limit
      this.offset = object.limit * (object.page - 1)
      this.getClassRooms()
    },
    ...mapMutations("Common",["hideAsideMenuMobile"]),
    handleStandard(val) {
      this.standardIds = []
      this.standardIds[0] = val
      this.getClassRooms()
    },
    handleSubject(val) {
      this.subjectIds = []
      this.subjectIds[0] = val
      this.getClassRooms()
    },
    getStandards: function() {
      dispatchGraphqlQuery('standards', ['id', 'name']).then((response) => {
        this.standards = response.standards
        this.standardIds = this.standards.map(x => x.id)
      })
      dispatchGraphqlQuery('subjects', ['id', 'name']).then((response) => {
        this.subjects = response.subjects
        this.subjectIds = this.subjects.map(x => x.id)
        this.getClassRooms()
      })
    },
    handleSideBar(val) {
      // console.log(val)
      this.showSideBar = true
      this.rightBarData = val
    },
    getVariables() {
      if (this.activeName === 'active') {
        this.dateComparison = {_eq: this.currentDate}
        console.log(this.dateComparison)
      }
      return {
        'limit': this.limit,
        'offset': this.offset,
        "standIds": this.standardIds,
        "subIds": this.subjectIds,
        "classDate": this.dateComparison,
      }
    },
    getClassRooms() {
      dispatchGraphql(this.query, this.getVariables()).then(response => {
        this.forms = response.classrooms
        this.total = response.classrooms_aggregate.aggregate.count
      })
    },
    addNewEmployees() {
      this.$router.push(this.$url.LN_CLASSROOM_FORM);
    },
    ptest(d) {
      console.log(d);
    },
    conferenceCall(classroom){
      var time = moment(),
        beforeTime = moment(classroom.time_table.start_time),
        afterTime = moment(classroom.time_table.end_time);
      if (time.isBetween(beforeTime, afterTime)) {
        this.$router.push('/learn/online-class/'+classroom.id+'/')
      } 
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
          // if(passtime > 0 && timeleft <= 0) {
          //   setTimeout(() => {
          //     passtime -= 1
          //      var hours = Math.floor((passtime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          //      var minutes = Math.floor((passtime % (1000 * 60 * 60)) / (1000 * 60));
          //      var seconds = Math.floor((passtime % (1000 * 60)) / 1000);
          //      this.getTimeSlot(data,data1)
          //      this.timel = "ends in : "+hours+"h"+":"+minutes+"m:"+seconds+"s"
          //      }, 1000)
          //  }
        }
        if (passtime < 0) {
          return ""+"TimeUp"
        }
          return this.timel
    },
  },
};
</script>
