<template>
  <div>
    <e-container pageTitle="Form" btnIcon="el-icon-plus" btnText="Create form" @btnClick='$router.push($url.LN_FORM_CREATE)' class="learn-form">
      <el-tabs class="floatTabHeader" v-model="activeName">
        <el-tab-pane label="Active" name="active">
          <div class="searchCard searchCard-2">
            <el-col :span="6" style="font-size: 20px; color: #4d4f5c; font-weight: 500">
              {{ total }} forms
            </el-col>
            <el-col :span="1" :offset="15">
              <e-button icon="el-icon-sort" css="sort-icon bg-transparent" :plain="true" type="primary" />
            </el-col>
          </div>
          <el-row>
            <form-card v-if="forms.length > 0" :forms="forms" @clicks="handleSideBar" />
          </el-row>
          <form-right-bar v-if="showSideBar === true" :rightBarData="rightBarData" :show="showSideBar" :__onCancel="() => (showSideBar = !showSideBar)" />
        </el-tab-pane>
        <el-tab-pane label="Upcoming" name="upcoming">
          <div class="searchCard searchCard-2">
            <el-col :span="6" style="font-size: 20px; color: #4d4f5c; font-weight: 500" >
              {{ total }} forms
            </el-col>

            <el-col :span="1" :offset="15">
              <e-button icon="el-icon-sort" css="sort-icon bg-transparent" :plain="true" type="primary" />
            </el-col>
          </div>
          <el-row>
            <form-card v-if="forms.length > 0" :forms="forms" @clicks="handleSideBar" />
          </el-row>
          <form-right-bar v-if="showSideBar === true" :rightBarData="rightBarData" :show="showSideBar" :__onCancel="() => (showSideBar = !showSideBar)" />
        </el-tab-pane>
        <el-tab-pane label="Completed" name="completed"> 
          <div class="searchCard searchCard-2">
            <el-col :span="6" style="font-size: 20px; color: #4d4f5c; font-weight: 500" >
              {{ total }} forms
            </el-col>

            <el-col :span="1" :offset="15">
              <e-button icon="el-icon-sort" css="sort-icon bg-transparent" :plain="true" type="primary" />
            </el-col>
          </div>
          <el-row>
            <form-card v-if="forms.length > 0" :forms="forms" @clicks="handleSideBar" />
          </el-row>
          <form-right-bar v-if="showSideBar === true" :rightBarData="rightBarData" :show="showSideBar" :__onCancel="() => (showSideBar = !showSideBar)" />
        </el-tab-pane>
      </el-tabs>
      <pagination :total="total" @pagination="pagination" />
    </e-container>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import formCard from '@/components/learn/form/formCard.vue'
import formRightBar from "@/components/learn/formRightBar.vue"
import { dispatchGraphql } from '@/api/dispatcher'
import Pagination from '@/components/Pagination'
import moment from 'moment'
import _ from 'lodash'
export default {
  components: { formRightBar ,formCard, Pagination },
  data: () => ({
    forms: [],
    rightBarData: {},
    activeName: "active",
    showSideBar: false,
    currentDate: moment(new Date()).format('yyyy-MM-DD'),
    dateComparison: {},
    total: 0,
    offset: 0,
    page: 1,
    limit: 10,
    totalFirst: 0,
    totalSecond: 0
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
    handleSideBar(data) {
      this.rightBarData = data
      this.showSideBar = true
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
    pagination: function(object) {
      this.limit = object.limit
      this.offset = object.limit * (object.page - 1)
      this.getForms()
    },
    getForms() {
      const query = `query($limit: Int!, $offset: Int!, $dueDate: timestamp_comparison_exp) {
        forms(limit: $limit, offset: $offset, where: {_and: [{form_type: {_eq: "Form"}}, {due_date: $dueDate}]}) {
          id
          name
          due_date
          created_at
          result_audience {
            id
            status
            user {
              id
              first_name
              role
            }
          }
        }
        forms_aggregate(where: {_and: [{form_type: {_eq: "Form"}}, {due_date: $dueDate}]}) {
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
<style>
.sort-icon {
  background: transparent !important;
}
.sort-icon:hover {
  background: #bc6c42 !important;
}
</style>
