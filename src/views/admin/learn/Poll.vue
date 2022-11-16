<template>
  <div class="about">
    <e-container class="learn-poll" pageTitle=" Poll" btnIcon="el-icon-plus" btnText=" Create Poll" subTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt" @btnClick="$router.push($url.LN_POLL_CREATE)">
      <el-tabs class="floatTabHeader" v-model="activeName">
        <el-tab-pane label="Active" name="active">
          <div class="searchCard searchCard-2">
            <el-col :span="6" style="font-size: 20px; color: #4d4f5c; font-weight: 500" >
              {{ total }} polls
            </el-col>

            <el-col :span="1" >
              <e-button icon="el-icon-sort" css="sort-icon bg-transparent" :plain="true" type="primary"></e-button>
            </el-col>
          </div>
          <div>
            <poll-card :forms="forms" :bottom='true' @clicks='pollData'/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Upcoming" name="upcoming">
          <div class="searchCard searchCard-2">
            <el-col :span="6" style="font-size: 20px; color: #4d4f5c; font-weight: 500" >
              {{ total }} polls
            </el-col>

            <el-col :span="1" >
              <e-button icon="el-icon-sort" css="sort-icon bg-transparent" :plain="true" type="primary"></e-button>
            </el-col>
          </div>
          <div>
            <poll-card :forms="forms" @clicks='pollData' />
          </div>
        </el-tab-pane>
        <el-tab-pane label="Completed" name="completed">
          <div class="searchCard searchCard-2">
            <el-col :span="6" style="font-size: 20px; color: #4d4f5c; font-weight: 500" >
              {{ total }} polls
            </el-col>

            <el-col :span="1" >
              <e-button icon="el-icon-sort" css="sort-icon bg-transparent" :plain="true" type="primary"></e-button>
            </el-col>
          </div>
          <div>
            <poll-card :forms="forms" :bottom='true' @clicks='pollData' />
          </div>
        </el-tab-pane>
      </el-tabs>
      <poll-right-bar v-if="rightBarData" :rightBarData="rightBarData" :show="showSideBar" :__onCancel="() => (showSideBar = !showSideBar)"/>        
      <pagination :total="total" @pagination="pagination" />
    </e-container>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import pollRightBar from '@/components/learn/poll/pollRigheBar.vue'
import pollCard from "@/components/learn/poll/pollCard.vue";
import { dispatchGraphql } from '@/api/dispatcher'
import Pagination from '@/components/Pagination'
import moment from 'moment'
import _ from 'lodash'
export default {
  components: { pollCard ,pollRightBar, Pagination },
  data: () => ({
    total: 0,
    offset: 0,
    page: 1,
    limit: 10,
    forms: [],
    rightBarData: {},
    activeName: "active",
    showSideBar: false,
    currentDate: moment(new Date()).format('yyyy-MM-DD'),
    dateComparison: {},
  }),
  watch: {
    activeName: _.debounce(function() {
      if (this.activeName === "upcoming") {
        this.dateComparison = {_gt: this.currentDate}
        this.getForms()
      } else if(this.activeName === "completed") {
        this.dateComparison = {_lt: this.currentDate}
        this.getForms()
      } else {
        this.dateComparison = {_eq: this.currentDate}
        this.getForms()
      }
    })
  },
  mounted() {
    this.hideAsideMenuMobile()
  },
  created() {
    this.getForms()
  },
  methods: {
    ...mapMutations("Common", ["hideAsideMenuMobile"]),
    pollData(value) {
      this.rightBarData = value
      console.log('rightsidebar', this.rightBarData)
      this.showSideBar = !this.showSideBar
    },
    pagination: function(object) {
      this.limit = object.limit
      this.offset = object.limit * (object.page - 1)
      this.getForms()
    },
    getVariables() {
      if (this.activeName === 'active') {
        this.dateComparison = {_eq: this.currentDate}
        console.log(this.dateComparison)
      }
      return{
        'limit': this.limit,
        'offset': this.offset,
        'dueDate': this.dateComparison,
      }
    },
    getForms() {
      const query = `query($limit: Int!, $offset: Int!, $dueDate: timestamp_comparison_exp) {
        forms(limit: $limit, offset: $offset, where: {_and: [{form_type: {_eq: "Poll"}}, {due_date: $dueDate}]}) {
          due_date
          created_at
          name
          id
          result_audience {
            id
            status
            answers {
              id
              answer
            }
            user {
              id
              first_name
            }
          }
        }
        forms_aggregate(where: {_and: [{form_type: {_eq: "Poll"}}, {due_date: $dueDate}]}) {
          aggregate {
            count
          }
        }
      }`
      dispatchGraphql(query, this.getVariables()).then(response => {
        this.forms = response.forms
        this.total = response.forms_aggregate.aggregate.count
      })
    }
  }
};
</script>
