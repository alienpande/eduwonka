<template>
  <div class="return-book">
    <e-container hideHeader pageTitle="Return book" :back="$url.LI_ISSUE_RETURN">
      <div style="color: #e60000" class="fs-16 text-center">
        {{ verifyDate(issueDetail.due_date) ? 'Due Date Crossed !!' : '' }}
      </div>
      <el-card shadow="none" style="width: 30rem;height: 12rem;box-shadow: 0px 3px 15px #0000000d;border-radius: 10px;margin: 10px auto;">
        <el-col :span="6">
          <img style="width: 109px; height: 143px" src="@/assets/images/book.png" alt="" />
        </el-col>
        <el-col :span="17" :offset="1">
          <el-card  class="return-book__middle" shadow="none" style="background: rgb(188 108 66 / 10%)">
            <h5 style="margin-bottom: 0 !important">{{ issueDetail.book.name }}</h5>
            <div style="color: #00000099;opacity: 0.4;font-size: 10px;font-weight: 500;">
              {{ 'By' + issueDetail.book.author }}
            </div>
            <h6 style="margin-top: 10px !important; margin-bottom: 0 !important">
              {{ issueDetail.book.isbn_number }}
            </h6>
            <div style="color: #00000099;opacity: 0.4;font-size: 10px;font-weight: 500;">
              {{ issueDetail.book.oclc_number }}
            </div>
            <el-row>
              <el-col :span="10">
                <div style="color: #000000cc; font-size: 15px; font-weight: bold">
                  Date of Borrow
                </div>
                <div style="color: #4d4f5c; font-size: 15px">{{ getDate(issueDetail.date_of_borrow) }}</div>
              </el-col>
               <el-col :span="10" :offset="2">
                <div style="color: #000000cc; font-size: 15px; font-weight: bold">
                  Due date
                </div>
                <div style="color: #4d4f5c; font-size: 15px">{{ getDate(issueDetail.due_date) }}</div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-card>
      <h4>Book Information</h4>
      <el-card shadow="none">
        <el-col :span="22">
          <e-input label="Condition of book" v-model="issueDetail.book_condition" placeholder="Type here" />
        </el-col>
        <el-col :span="10">
          <br />
          <span style="color: #000000cc" class="fs-16 f-600">Return date </span>
          <span style="color: #00000099" class="fs-16 f-600">( when user returns book)</span>
          <e-date-picker v-model="issueDetail.return_date" class="default-picker" placeholder="Pick a Date"></e-date-picker>
        </el-col>
        <el-col :span="10" :offset="2">
          <br />
          <e-input label="Penalty amount" v-model="issueDetail.penality" placeholder="Pick a Date"/>
        </el-col>
        <el-row :gutter="20">
          <el-col :span="22">
            <e-radio v-model="reportValue" label="Is the book replaced with new book ?" :options="report" />
          </el-col><br />
        </el-row>
        <el-row :gutter="20">
          <el-col>
            <el-card style="background: #fcdfbd" shadow="none">
              <e-input label="Provide New book details ( optional)"></e-input>
            </el-card>
          </el-col>
        </el-row>
        <br />
      </el-card>

      <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px">
        <el-col style="float: right" :span="10">
          <e-button :span="16" label="Cancel" width="180" css="cancel_btn" type="default" class="p-45"></e-button>
          <e-button :span="6" label="Return Book" width="180" @click="handleClick" css="float-right" class="p-45"></e-button>
        </el-col>
      </el-row>
    </e-container>
  </div>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher"
import eInput from "@/controls/eInput.vue";
import moment from 'moment'
export default {
  components: { eInput },
  data: () => ({
    reportValue: "Yes",
    report: [
      {
        title: "Yes",
        value: "Yes",
      },
      {
        title: "No",
        value: "No",
      },
    ],
    issueDetail: {}
  }),
  created() {
    this.getIssueDetails()
  },
  methods: {
    handleClick() {
      console.log(this.issueDetail)
    },
    verifyDate(date) {
      return moment(date).format('yyyy/mm/dd') < moment().format('yyyy/mm/dd')
    },
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
};
</script>
<style>
.return-book .el-radio__inner {
  width: 23px !important;
  height: 23px !important;
}
 .return-book__middle .el-card__body {
    padding: 9px 20px !important;
}
</style>
