<template>
  <div class="about">
    <e-container class="learn-syllabus" pageTitle="Syllabus">
      <div style="color: #00000099;text-align: center;padding: 10px 0;font-size: 18px;">
        We have <b>{{ total }}</b>  Topics
      </div>
      <div>
        <drop-filter v-if="showFilters" :standards="standards" :subjects="standard_subjects" @handleStandard="handleStandard" @handleSubject="handleSubject" @clear="getStandard" />
      </div>
      <div style="margin-bottom: 5%;">
        <el-row style="margin-top:25px;row-gap:25px" v-for="topic in topics" :key="topic" class="view-no-form">
          <el-col :span="9" class="sm-width-100">
            <div style="font-weight: bold; padding-bottom: 5px">
              {{ topic.name }}
            </div>
            <el-card shadow="none" class="rounded-08 pg-50 cp" style="margin-top:20px">
              <div>Progress</div>
              <e-progress color='#FFA700' :percentage="getPercentage(topic.sub_topics)"></e-progress>
              <el-row style="margin-top: 15px">
                <el-col span="12">
                  <span style="font-size: 14px; padding-bottom: 20px">Alloted</span><br />
                  <span style="font-size: 20px">{{ topic.classrooms.length }} class</span>
                </el-col>
                <el-col span="6">
                  <span style="font-size: 14px; padding-bottom: 20px">Taken</span><br />
                  <span style="font-size: 20px">{{ getTakenClassrooms(topic.classrooms) }}</span>
                </el-col>
              </el-row>
              <img v-if="getClasses(topic.classrooms) === 'in-progress'" style="width: 126px; margin-top: 11px" src="@/assets/icons/progress.png" />
              <img v-else style="width: 106px; margin-top: 11px" src="@/assets/icons/progress2.png" />
            </el-card>
            <el-card shadow="none" style="margin-top: 10px" class="rounded-08 pg-50 cp">
              <div style="display: flex;align-items:center;justify-content: space-between;" >
                <el-avatar :src="require('@/assets/images/profile.jpg')" style="width:65px !important;height:65px !important;overflow:visible;" />
                <div class="pro-name">{{ topic.teacher ? topic.teacher.first_name : '' }}</div>
                <button class="view-profile">View Profile</button>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12" style="margin-left: 20px" class="sm-margin-l-0 sm-margin-t-5">
            <div style="display: flex; justify-content: space-between;margin-bottom:10px">
              <div>Sub-topics covered</div>
              <el-button class='see_status' >
                <e-svg class="see_status--icon" style="display: inline-flex;margin-right:7px" icon='statusbtn'/>See Status
              </el-button>
            </div>
            <el-card shadow="none" class="rounded-08 pg-55 cp">
              <div v-for="sub in topic.sub_topics" :key="sub" style="color: #909295; margin: 15px 0; font-size: 14px">
                <el-checkbox :value="Verify(sub.status)" readonly style="margin-right: 10px"></el-checkbox>
                {{ sub.name }}
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <pagination :total="total" @pagination="pagination" />
      <!-- <es-pagination :total="total" @pagination="pagination"></es-pagination> -->
    </e-container>
  </div>
</template>
<script>
import { dispatchGraphql, dispatchGraphqlQuery } from "@/api/dispatcher"
import Pagination from '@/components/Pagination'
import DropFilter from '@/components/filters.vue'
import moment from 'moment'
export default {
  components: { Pagination, DropFilter },
  data: () => ({
    total: 0,
    offset: 0,
    page: 1,
    limit: 10,
    classData: [],
    subTopics: {},
    topics: [],
    standards: [],
    standardIds: [],
    showFilters: false,
    subjects: [],
    standard_subjects: [],
    subjectIds: []
  }),
  created() {
    this.getStandard()
  },
  methods: {
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
        this.getTopics()
      })
    },
    handleSubject(val) {
      this.subjectIds = []
      this.subjectIds[0] = val
      this.getTopics()
    },
    getPercentage(data) {
      const count = (100 / data.length)
      let percentage = 0
      for (const item of data) {
        if (item.status === 'completed') {
          percentage = percentage + count
        }
      }
      return percentage.toFixed(0)
    },
    Verify(val) {
      if (val === 'completed') {
        return true
      }
      return false
    },
    getClasses(val) {
      const currentClassrooms = val.filter(x => (moment(x.class_date).format('yyyy-MM-DD') === moment().format('yyyy-MM-DD')))
      if (currentClassrooms.length > 0) {
        return 'in-progress'
      }
    },
    getStandard: function() {
      this.showFilters = false
      this.standard_subjects = []
      dispatchGraphqlQuery('standards', ['id', 'name']).then((response) => {
        this.standards = response.standards
        this.standardIds = this.standards.map(x => x.id)
        dispatchGraphqlQuery('subjects', ['id', 'name']).then((response) => {
          this.subjects = response.subjects
          this.subjectIds = this.subjects.map(x => x.id)
          this.showFilters = true
          this.getTopics()
        })
      })
    },
    getVariables() {
      return {
        'limit': this.limit,
        'offset': this.offset,
        "standIds": this.standardIds,
        "subIds": this.subjectIds
      }
    },
    getTopics(){
      const query = `query($limit: Int!, $offset: Int!, $standIds: [uuid!], $subIds: [uuid!]) {
        topics(limit: $limit, offset: $offset, where: {_and: [{standard_id: {_in: $standIds}}, {subject_id: {_in: $subIds}}]}) {
          id
          name
          classrooms {
            id
            class_date
          }
          teacher {
            id
            first_name
          }
          sub_topics {
            id
            name
            status
          }
        }
        topics_aggregate(where: {_and: [{standard_id: {_in: $standIds}}, {subject_id: {_in: $subIds}}]}) {
          aggregate {
            count
          }
        }
      }`
      dispatchGraphql(query, this.getVariables()).then((response) => {
        console.log('topics', response)
        this.topics = response.topics
        this.total = response.topics_aggregate.aggregate.count
      })
    },
    pagination: function(object) {
      this.limit = object.limit
      this.offset = object.limit * (object.page - 1)
      this.getTopics()
    },
    getTakenClassrooms(val) {
      let count = 0
      for(const item of val) {
        if (moment().format('yyyy-MM-DD') >= moment(item.class_date).format('yyyy-MM-DD')) {
          count ++
        }
      }
      return count
    }
  }
};
</script>
<style >
.pro-name {
  margin-left: 0px !important;
  margin-top: 0px !important;
  margin-right: auto !important;
  font-weight: bold;
  width: 109px;
}
.view-profile {
  margin-left: 0px !important;
  height: 36px !important;
  padding: 0px 6px !important;
  border-radius: 22px;
  border: 1px solid #bc6c42;
  color: #bc6c42;
  background: transparent;
  width: 100px !important;
}
/* .progress-btn{
  background-image: url('@/assets/icons/progress.png');
} */
.see_status{
  border: 1px solid #bc6c42 !important;
  background: transparent !important;
color: #bc6c42 !important;
}
.sort-icon{
  background: transparent !important;
}
.sort-icon:hover{
  background: #bc6c42 !important;
}
</style>
