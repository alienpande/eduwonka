<template>
  <div>
    <e-container pageTitle="Assignment" btnIcon="el-icon-plus" btnText="Add Assignment" @btnClick="$router.push($url.LN_ASSIGNMENTS_CREATE + '/' + standardSubjectId)">
      <el-tabs class="floatTabHeader" v-model="activeName">
        <el-tab-pane label="Active" name="Active">
          <el-row class="sm-flex searchCard searchCard-2">
            <el-col :span="6"  style="font-size: 20px; color: #4d4f5c; font-weight: 500">
              {{ total + ' assignments' }}
            </el-col>
            <el-col :span="1" :offset="15" class="sm-margin-l-0" style="margin-left:auto !important">
              <e-button icon="el-icon-sort" css="sort-icon bg-transparent" :plain="true" type="primary"></e-button>
            </el-col>
          </el-row>
          <el-row class="dashboard-cards-wrapper">
            <el-col :span="10" v-for="assignment in assignments" :key="assignment.id" style="margin-bottom:20px">
              <el-card shadow="none" style="padding: 8px" class="rounded-08 pg-50 cp hover-shadow">
                  <div @click="handleClick(assignment)">
                  <div style="font-size: 20px;width: 233px;font-weight: 600;opacity: 0.8;">
                   {{ assignment.name }}
                  </div>
                  <div style="font-size: 20px;opacity: 0.8;font-weight: 500;padding: 18px 0;">
                  </div>
                  <el-row class="dashboard-cards-wrapper">
                    <el-col :span="10">
                      <div style="font-weight: 300; opacity: 0.8">Submitted</div>
                      <div style="font-weight: 500;font-size: 20px;opacity: 0.8;margin-top: 10px;">
                        {{ getSubmitted(assignment.audience) + '/' +  assignment.audience.length }}
                      </div>
                    </el-col>
                    <el-col :span="9">
                      <div style="font-weight: 300; opacity: 0.8">Due Date</div>
                      <div style="font-weight: 500;font-size: 20px;opacity: 0.8;margin-top: 10px;">
                        {{ getDate(assignment.due_date) }}
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <assign-right-bar :show="showSideBar" :assignment="assignment" :audience="assignment.audience" :standard="standard" :subject="subject" :__onCancel="() => (showSideBar = !showSideBar)" />
        </el-tab-pane>
        <el-tab-pane label="Upcoming" name="Upcomming">
          <el-row class="sm-flex searchCard searchCard-2">
            <el-col :span="6" style="font-size: 20px; color: #4d4f5c; font-weight: 500">
              {{ total + ' assignments' }}
            </el-col>
            <el-col :span="4"></el-col>

            <el-col :span="1" :offset="15" class="sm-margin-l-0" style="margin-left:auto !important">
              <e-button icon="el-icon-sort" css="sort-icon bg-transparent" :plain="true" type="primary"></e-button>
            </el-col>
          </el-row>
          <el-row class="dashboard-cards-wrapper">
            <el-col :span="10" v-for="assignment in assignments" :key="assignment.id" style="margin-bottom:20px">
              <el-card shadow="none" style="padding: 8px" class="rounded-08 pg-50 cp hover-shadow">
                <div @click="handleClick(assignment)">
                  <div style="font-size: 20px;width: 233px;font-weight: 600;opacity: 0.8;">
                    {{ assignment.name }}
                  </div>
                  <div style="font-size: 20px;opacity: 0.8;font-weight: 500;padding: 18px 0;">
                    <!-- <span style="font-weight: 300">by</span> Shawn Fernando -->
                    <!-- <e-progress percentage= 10></e-progress> -->
                  </div>
                  <el-row class="dashboard-cards-wrapper">
                    <el-col :span="12">
                      <div style="font-weight: 300; opacity: 0.8">Students</div>
                      <div style="font-weight: 500;font-size: 20px;opacity: 0.8;margin-top: 10px;">
                        {{ assignment.audience.length }}
                      </div>
                    </el-col>
                    <el-col :span="9">
                      <div style="font-weight: 300; opacity: 0.8">Assignment Date</div>
                      <div style="font-weight: 500;font-size: 20px;opacity: 0.8;margin-top: 10px;">
                        {{ getDate(assignment.due_date) }}
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <assign-right-bar :show="showSideBar" :assignment="assignment" :audience="assignment.audience" :standard="standard" :subject="subject" :__onCancel="() => (showSideBar = !showSideBar)" />
        </el-tab-pane>
        <el-tab-pane label="Completed" name="Completed">
          <el-row class="sm-flex searchCard searchCard-2">
            <el-col :span="6" style="font-size: 20px; color: #4d4f5c; font-weight: 500">
              {{ total + ' assignments' }}
            </el-col>
            <el-col :span="4"></el-col>

            <el-col :span="1" :offset="15" class="sm-margin-l-0" style="margin-left:auto !important">
              <e-button icon="el-icon-sort" css="sort-icon bg-transparent" :plain="true" type="primary"></e-button>
            </el-col>
          </el-row>
          <el-row class="dashboard-cards-wrapper">
            <el-col :span="10" v-for="assignment in assignments" :key="assignment.id" style="margin-bottom:20px">
              <el-card shadow="none" style="padding: 8px" class="rounded-08 pg-50 cp hover-shadow">
                <div @click="handleClick(assignment)">
                  <div style="font-size: 20px;width: auto;font-weight: 600;opacity: 0.8;">
                    {{ assignment.name }}
                  </div>
                  <div style="font-size: 20px;opacity: 0.8;font-weight: 500;padding: 18px 0;">
                  </div>
                  <el-row class="dashboard-cards-wrapper">
                    <el-col >
                      <div style="font-weight: 300; opacity: 0.8">Students</div>
                      <div style="font-weight: 500;font-size: 20px;opacity: 0.8;margin-top: 10px;">
                        {{ assignment.audience.length }}
                      </div>
                    </el-col>
                    <el-col >
                      <div style="font-weight: 300; opacity: 0.8">Assignment Date</div>
                      <div style="font-weight: 500;font-size: 20px;opacity: 0.8;margin-top: 10px;">
                        {{ getDate(assignment.due_date) }}
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <div v-if="showSideBar">
            <assign-right-bar :show="showSideBar" :audience ="assignment.audience" :standard="standard" :subject="subject" :assignment="assignment" :standardSubjectId="standardSubjectId" :__onCancel="() => (showSideBar = !showSideBar)" />
          </div>
        </el-tab-pane>
      </el-tabs>
      <pagination :total="total" @pagination="pagination" />
    </e-container>
  </div>
</template>

<script>
import { mapMutations } from "vuex"
import assignRightBar from '@/components/learn/assaignRightBar.vue'
import {  dispatchGraphql , dispatchGraphqlQueryByPk } from "@/api/dispatcher"
import Pagination from '@/components/Pagination'
import _ from "lodash"
import moment from 'moment'
export default {
  components:{ assignRightBar, Pagination },
  data: () => ({
    total: 0,
    offset: 0,
    page: 1,
    limit: 10,
    assignments: [],
    activeName: "Active",
    showSideBar: false, 
    standardSubjectId: '',
    subject:'',
    standard:'',
    sumittedStudents: [],
    assignment: {},
    currentDate: moment(new Date()).format('DD MMM yyyy'),
    dateComparison: {},
  }),
  mounted() {
    this.hideAsideMenuMobile();
  },
  watch: {
    activeName: _.debounce(function() {
      if (this.activeName === "Upcomming") {
        this.dateComparison = {_gt: this.currentDate}
        this.getAssignments()
      } else if(this.activeName === "Completed") {
        this.dateComparison = {_lt: this.currentDate}
        this.getAssignments()
      } else {
        this.dateComparison = {_eq: this.currentDate}
        this.getAssignments()
      }
    })
  },
  methods: {    
    ...mapMutations("Common", ["setStandardMenu","hideAsideMenuMobile"]),
    pagination: function(object) {
      this.limit = object.limit
      this.offset = object.limit * (object.page - 1)
      this.getAssignments()
    },
    getVariables() {
      if (this.activeName === 'Active') {
        this.dateComparison = {_eq: this.currentDate}
        console.log(this.dateComparison)
      }
      return {
        'limit': this.limit,
        'offset': this.offset,
        'standardId': this.$route.params.standard_id,
        'subjectId': this.$route.params.subject_id,
        'dueDate': this.dateComparison,
      }
    },
    getAssignments() {
      const assignQuery =`query($limit: Int!, $offset: Int!, $standardId:uuid!, $subjectId:uuid!, $dueDate: timestamp_comparison_exp) {
        assignments(limit: $limit, offset: $offset, where: {_and: [{standard_id: {_eq: $standardId}}, {subject_id: {_eq: $subjectId}}, {due_date: $dueDate}]}) {
          description
          id
          name
          due_date
          audience {
            id
            status
          }
          submissions {
            id
          }
        }
        assignments_aggregate(where: {_and: [{standard_id: {_eq: $standardId}}, {subject_id: {_eq: $subjectId}}, {due_date: $dueDate}]}) {
          aggregate {
            count
          }
        }
      }`
      dispatchGraphql(assignQuery, this.getVariables()).then((response) => {
        this.assignments = response.assignments
        this.total = response.assignments_aggregate.aggregate.count
      })
    },
    handleClick(val) {
      this.assignment = val
      console.log("in handleClick", val , this.assignment)
      this.showSideBar = true 
    },
    getSubmitted(val) {
      console.log("submitted", val)
      const submitted= val.filter(i => i.status ==='submitted')
      console.log("submitted", submitted)
      if(submitted.length!=0) {
        return submitted.length
      } else {
        return 0
      }
    },
    getStandard() {
      dispatchGraphqlQueryByPk('standards',['id', 'name'],{id: this.$route.params.standard_id}).then((response) => {
        this.standard= response.standards_by_pk.name
        console.log("jhklasgja", this.standard )
      })  
      dispatchGraphqlQueryByPk('subjects',['id', 'name'],{id: this.$route.params.subject_id}).then((response) => {
        this.subject= response.subjects_by_pk.name
        console.log("jhklasgja", this.subject )
      })
    },
    getDate(value) {
      return moment(value).format('DD-MM-YYYY')
    },
    getRouteParams() {
      this.standardSubjectId = this.$route.params.standard_id +"/"+ this.$route.params.subject_id
      console.log("ashgakljghjkaghjklsgj",this.standardSubjectId)
    },
  
  },
  created() {
    this.getStandard()
    this.getRouteParams()
    this.getAssignments()
  }, 

};
</script>
<style>
.sort-icon {
  background: transparent !important;
}
.sort-icon:hover {
  background: #bc6c42 !important;
}
</style>
