<template>
  <div>
    <e-container hideHeader pageTitle="View details of issue" :back="$url.LI_ISSUE_RETURN">
      <e-button label="View Book Details" css="sort-icon view-book__details" :plain="true" @click="$router.push($url.LI_EDIT_CATALOG + '/' + issueDetail.book.id)"></e-button>
      <el-card style="width: 359px; display: block; margin: auto">
        <el-row>
          <el-col :span="7">
            <img style="width: 79px; height: 103px" src="@/assets/images/book.png" alt="" />
          </el-col>
          <el-col :span="14">
            <div style="color: #000000cc" class="fs-20 f-500">
              {{ issueDetail.book.name }}
            </div>
            <div style="color: #00000099;opacity: 0.4;font-size: 10px;font-weight: 500;">
              {{ 'By ' + issueDetail.book.author }}
            </div>
            <div style="color: #000000cc; margin-top: 10px" class="fs-20 f-500">
              {{ issueDetail.book.isbn_number }}
            </div>
            <div style="color: #00000099;opacity: 0.4;font-size: 10px;font-weight: 500;">
              {{ issueDetail.book.oclc_number }}
            </div>
          </el-col>
        </el-row>
      </el-card>
      <br />
      <el-card shadow="none">
        <div class="heading" style="padding-left: 0 !important; margin-left: 0 !important">
          User Details
        </div>
        <el-row>
          <el-col :span="4">
            <div class="label">User ID</div>
            <div style="font-size: 16px; color: #000000cc">{{ issueDetail.user.id }}</div>
          </el-col>
          <el-col :span="4">
            <div class="label">User Name</div>
            <div style="font-size: 16px; color: #000000cc">{{ issueDetail.user.first_name }}</div>
          </el-col>
          <el-col :span="4">
            <div class="label">User Type</div>
            <div style="font-size: 16px; color: #000000cc">{{ issueDetail.user.role }}</div>
          </el-col>
        </el-row>
        <br />
        <div class="heading" style="padding-left: 0 !important; margin-left: 0 !important">
          Issue Details
        </div>
        <el-row>
          <el-col :span="4">
            <div class="label">Date of Borrow</div>
            <div style="font-size: 16px; color: #888888">{{ getDate(issueDetail.date_of_borrow) }}</div>
          </el-col>
          <el-col :span="4">
            <div class="label">Due Date</div>
            <div style="font-size: 16px; color: #888888">{{ getDate(issueDetail.due_date) }}</div>
          </el-col>
        </el-row>
      </el-card>
      <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px">
        <el-col :span="6" :offset="18">
          <e-button label="Done" width="180" css="float-right" class="p-45"></e-button>
        </el-col>
      </el-row>
    </e-container>
  </div>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher"
import moment from 'moment'
export default {
  data:()=>({
    issueDetail: {}
  }),
  created() {
    this.getIssueDetails()
  },
  methods: {
    getDate(date) {
      return moment(date).format('DD MMM YYYY')
    },
    getIssueDetails() {
      const query = `query {
        issue_returns_by_pk(id: "${this.$route.params.id}") {
          id
          date_of_borrow
          due_date
          user {
            id
            first_name
            role
          }
          book {
            id
            name
            author
            publisher
            isbn_number  
            oclc_number
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.issueDetail = response.issue_returns_by_pk
      })
    },
  }
}
</script>

<style>
.view-book__details {
  position: fixed;
  top: 143px;
  right: 80px;
}
</style>
