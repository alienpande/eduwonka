<template>
  <div>
    <e-form :gutter="20" bgColor="transparent" :rules="rules">
      <!-- <el-row> -->
        <el-col :span="12" class="sm-width-100">
          <e-input v-model="classroom.name" name="Name of the class" placeholder="Enter Class Name" rules="required" />
          <e-date-picker   v-model="classroom.date" type="date" name="Class date" placeholder="Pick a Date" align="right" @change="changeDate" format="MM/dddd/yyyy" rules="required" />
          <el-col :span="12"  class="sm-width-100" style="padding-left:0px !important;margin-top:7%">
            <e-select label="Standard" placeholder="Choose a Standard" :v-model="classroom.standard_id" :options="standards" :optionName="'name'" :valueKey="'id'" :field="'standard_id'" @visible-change ="handleStandard" rules="required" />
          </el-col>
          <el-col :span="11" class="sm-width-100" style="padding-left:0px !important;margin-top:7%;margin-bottom:15%">
            <e-select label="Subject" placeholder="Choose a Subject" :v-model="classroom.subject_id" :options="subjects" :optionName="'name'" :valueKey="'id'" :field="'subject_id'" @visible-change ="handleSubject" rules="required" />
          </el-col>
        </el-col>

        <el-col :span="10" style="margin-left: 70px" class="sm-width-100 sm-margin-l-0">
          <div class="tx-18" style="margin-bottom: 10px; margin-top: -10px; font-weight: bold">
            Topic of the class
          </div>
          <e-button class="btn" :span="4" @click="addChoseTopicDialog = true" bgColor="transparent" css="bg-transparent chose-topic__btn" icon="el-icon-plus" label="Choose a Topic" rules="required" />
          <div @click="type1 = !type1" class="tx-18" style="margin-bottom: 10px; margin-top: 80px;">
            Set class Time
          </div>
          <div v-for="(slot, i) in timeData" :key="i" style="margin: 5px 15px">
            <el-checkbox v-model="slot.check" @change="handleSelected(slot, i)" rules="required"></el-checkbox>
            <div style="color: #00000099; display: inline-block; margin-left: 10px">
              {{ getTime(slot.start_time) }}
            </div>
          </div>
        </el-col>
      <!-- </el-row> -->
    </e-form>
    <el-row class="form-last-buttons">
      <!-- <el-col style="float: right" :span="9"> -->
        <e-button :span="20" label="Cancel" width="180" css="cancel_btn" type="default" class="p-45" />
        <e-button :span="4" label="Next" width="180" @click="handleClick" css="float-right" class="p-45" />
      <!-- </el-col> -->
    </el-row>
    <e-dialog title="Choose Topic" v-model="addChoseTopicDialog" width="70%" top="20vh" noEsc :gutter="20" hideDefaultFooter @cancel="addChoseTopicDialog = false" @confirm="addChoseTopicDialog = false">
      <el-col :span="24" style="margin-bottom: 20px;margin-top: -30px;padding-bottom: 20px;font-size: 12px;display: flex;justify-content: space-between;border-bottom: 2px solid rgb(252, 223, 189);">
        <div style="width: 350px;opacity:0.6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu
          venenatis tellus. Fusce faucibus est vitae facilisis consectetur.
        </div>
        <div>
          <e-button icon="el-icon-search" :plain="true" type="primary" />
        </div>
      </el-col>

      <el-row :gutter="20" class="searchCard">
        <el-col :span="6" style="font-size: 18px; font-weight: bold;padding-left:20px">
          {{ topics.length }} Topics
        </el-col>
        <el-col :span="4" style="margin-left:auto" class="sm-margin-l-0">
          <e-select label="Standard" :v-model="classroom.standard_id" :options="standards" :optionName="'name'" :valueKey="'id'" :field="'standard_id'" @visible-change ="handleStandard" />
        </el-col>
        <el-col :span="4" class="primary-text" style="margin-left:0px !important">
          <e-select label="Subject" :v-model="classroom.subject_id" :options="subjects" :optionName="'name'" :valueKey="'id'" :field="'subject_id'" @visible-change ="handleSubject" />
        </el-col>
      </el-row><br />
      <el-row>
        <el-col :span="12" class="sm-width-100" v-for="(topic, i) in topics" :key="i">
          <el-card shadow="none" class="rounded-08 pg-50 cp" style="margin: 10px">
            <div @click="getTopic(topic.id)">
              <h4 style="border-bottom: 1px solid #bc6c42;font-size:17px;color:black;opacity:0.8; padding-bottom: 11px">
                {{ topic.name }}
              </h4>
              <el-row class="pd-10">
                <el-col :span="10">
                  <span style="color: rgb(0, 0, 0); font-weight: 300">Subtopics</span><br />
                  <span style="color: rgb(0, 0, 0);font-weight: bold;padding-top: 15px;">
                    {{topic.sub_topics.length}}
                  </span>
                </el-col>
                <el-col :span="10">
                  <span style="color: rgb(0, 0, 0); font-weight: 300">Taken by</span><br />
                  <span style="color: rgb(0, 0, 0);font-weight: bold;padding-top: 15px;">
                    {{ topic.teacher ? topic.teacher.first_name : '' }}
                  </span>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-col>
        <el-pagination @current-change="currentPage" @size-change="sizeChange" @prev-click="previousClick" @next-click="nextClick" background layout="prev, pager, next" :total="50" style="text-align: center;" />
      </el-col>
    </e-dialog>
  </div>
</template>
<script>
import { dispatchGraphqlQuery,dispatchGraphqlMutation, dispatchGraphql } from "@/api/dispatcher";
import { getId } from '@/util/auth'
import moment from 'moment'
export default {
  data: () => ({
    classroomApi: process.env.VUE_APP_CLASSROOM_API,
    req: {},
    user: {},
    type1: true,
    addChoseTopicDialog: false,
    classroom: {},
    rules: {},
    subjects: [],
    subjectIds: [],
    standards: [],
    standardIds: [],
    topics: [],
    day: ["days", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    query: `query($standId: [uuid!], $subId: [uuid!]) {
      topics(where: {_and: [{standard_id: {_in: $standId}}, {subject_id: {_in: $subId}}]}) {
        id
        name
        sub_topics {
          id
          name
        }
        teacher {
          id
          first_name
        }
      }
    }`,
    timeQuery: `query ($subid: uuid!, $stid: uuid!, $day: String) {
      time_tables(where: {standard_id: {_eq: $stid}, _and: {subjectable_id: {_eq: $subid}, _and: {week_day: {_eq: $day}}}}) {
        start_time
        week_day
        id
      }
    }`,
    classQuery: `query {
      classrooms {
        id
        time_table_id
      }
    }`,
    classtimetabledata: [],
    timeData: [],
    classroom1: [],
    eData: []
  }),
  created() {
    this.getData()
    this.getUser()
  },
  methods: {
    getTime(time) {
      return moment(time).format("hh:mm a")
    },
    changeDate: function(value) {
      this.classroom.date = value
    },
    handleSubject(value, field) {
      this.classroom[field] = value
      this.subjectIds = []
      this.subjectIds[0] = value
      if (this.classroom.subject_id) {
        this.setTimeSlot(this.classroom.standard_id, this.classroom.subject_id)
      }
      this.getTopics()
    },
    handleStandard(value, field) {
      this.classroom[field] = value
      this.standardIds = []
      this.standardIds[0] = value
      this.getTopics()
    },
    getTopic(id) {
      this.classroom.topic_id = id
      console.log('topic_id', id)
      this.addChoseTopicDialog = false
    },
    handleSelected(val, i) {
      if (val.id) {
        this.classroom1.push({
          time_table_id: val.id,
        })
      } else {
        this.classroom1.splice(i, 1)
      }
      console.log('this', this.classroom1)
    },
    getTopicVariables() {
      return {
        'standId': this.standardIds,
        'subId': this.subjectIds
      }
    },
    getTopics() {
      dispatchGraphql(this.query, this.getTopicVariables()).then(response => {
        this.topics = response.topics
        console.log('topics', this.topics)
      })
    },
    getData() {
      dispatchGraphqlQuery('subjects', ['id', 'name']).then((response) => {
        this.subjects = response.subjects
        this.subjectIds = this.subjects.map(x => x.id)
        console.log('subjectIds', this.subjectIds)
      })
      dispatchGraphqlQuery('standards', ['id', 'name']).then((response) => {
        this.standards = response.standards
        this.standardIds = this.standards.map(x => x.id)
        console.log('standardIds', this.standardIds)
        this.getTopics()
      })
    },
    setTimeSlot(standId, subId) {
      const date = new Date(this.classroom.date)
      let day1 = date.getDay();
      console.log(this.day[day1], day1);
      const day = this.day[day1]
      dispatchGraphql( this.timeQuery, this.getvariables(standId, subId, day) ).then(response => {
        const timeData = response.time_tables
        // for (const data of timeData) {
        //   const data1 = data.id
        //   for (const item of this.classtimetabledata) {
        //     const time_table_id = item.time_table_id
        //     if (time_table_id === data1) {
        //       timeData.pop(data)
        //     }
        //   }
        // }
        console.log('timeData', timeData)
        timeData.map(x => this.timeData.filter(a => a.id == x.id && a.start_time == x.start_time).length > 0 ? null : this.timeData.push(x));
        console.log('time_tables', this.timeData)
      })
      // dispatchGraphql( this.classQuery ).then(response => {
      //   this.classtimetabledata = response.classrooms
      //   console.log('classroomdatatime', this.classtimetabledata)
      // })
    },

    // Creating Video call room 
    getUser() {
      const query = `
        query user($id: uuid!) {
          users_by_pk(id: $id) {
            id
            email
            first_name
            last_name
            role
          }
        }
      `
      dispatchGraphql(query, { id: getId() }).then(response => {
        this.user = response.users_by_pk
        console.log('user', response.users_by_pk)
      })
    },
    // Create JWT Token
    async getToken(){
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ userId: this.user.id, name:this.user.first_name, role:"Publisher" })
      };
      const uri = this.classroomApi + '/Classroom/createJWT'

      const response = await fetch(uri, requestOptions);
      const data = await response.json();
      return data.token;
    },
    async createClassroom(){
      const jwtToken = await this.getToken()
      let className = this.classroom.name
      className = className.replace(/[^A-Z0-9.]+/ig, "_");
      let uri = this.classroomApi + '/Classroom/create_room'

      let formData = new FormData();
      formData.append('roomname', className);
      formData.append('max_peers_count', 30);

      fetch(uri, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          'x-access-token': jwtToken,
        },
        body: new URLSearchParams(formData),
      })
      .then((response) => {
        console.lof('socket resp', response.json());
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log("The error is: " + err));
    },
    addClass() {
      dispatchGraphqlMutation('classrooms', ['id', 'name', 'time_table_id'], this.getclassvariables()).then((response) => {
        this.eData = response.insert_classrooms_one
        this.createClassroom()
        this.$emit("save", this.classroom.standard_id, this.eData.id)
        console.log('classroom', response.insert_classrooms_one)
      })

    },
    getclassvariables() {
      const data = {}
      data.name = this.classroom.name,
      data.class_date = moment(this.classroom.date).format('yyyy-MM-DD'),
      data.topic_id = this.classroom.topic_id,
      data.time_table_id = this.classroom1[0].time_table_id

      console.log('finall', data)
      return data
    },
    getvariables(standId, subId, day) {
      return {
        "stid": standId,
        "subid": subId,
        "day": day
      }
    },
    handleClick() {
      this.addClass()
      // console.log('$$$$$$$$$$$$$$$$$$$$$$$4',this.classroom);
    },
    currentPage(i) {
      this.emitPager(i);
    },
    nextClick() {
      this.pageEvent = "NextClick";
    },
    previousClick() {
      this.pageEvent = "PreviousClick";
    },
    sizeChange(i) {
      this.pageEvent = "SizeChanged";
      console.log(i);
    },
  },
};
</script>
<style>
.chose-topic__btn {
  color: #bc6c42 !important;
}
.chose-topic__btn:hover {
  color: white !important;
}
.cancel_btn {
  font-weight: bold;
  background: transparent !important;
  border: none !important;
  color: #bc6c42 !important;
}
</style>
