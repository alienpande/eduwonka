<template>
  <div style="width: 64rem">
    <br /><br />
    <el-tabs class="floatTabHeader" v-model="activeName">
      <el-tab-pane label="Issue History" name="history">
        <div class="fs-20" style="color: #707070">
          List of people to which this book was issued
        </div>
        <div style="height:50vh;overflow:auto">
          <div v-for="(issue, i) in issueLogs" :key="i" style="width: 303px;display:inline-block; border: 0.5px solid #e6eaed; border-radius: 5px;padding:10px;margin:5px">
            <el-row>
              <el-col :span="6">
                <el-avatar style="border: 3px solid #bc6c42" :size="60" :src="require('@/assets/images/profile.jpg')" />
              </el-col>
              <el-col :span="16">
                <div style="background: rgb(188 108 66 / 10%);padding: 12px;border-radius: 5px;">
                  <el-row>
                    <el-col :span="12">
                      <div style="color: #00000099; opacity: 0.8; font-size: 10px">User Name</div>
                      <div style="color: #00000099;opacity: 0.8;font-size: 10px;font-weight: 500;">{{ issue.user.first_name }}</div>
                    </el-col>
                    <el-col :span="12">
                      <div style="color: #00000099; opacity: 0.8; font-size: 10px">User type</div>
                      <div style="color: #00000099;opacity: 0.8;font-size: 10px;font-weight: 500;">{{ issue.user.role }}</div>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Currently Issued to" name="current">
        <div class="fs-20" style="color: #707070">
          List of people to which this book is currently issued to
        </div>
        <div style="height:50vh;overflow:auto">
          <div v-for="(issue, i) in issueLogs" :key="i" style="width: 303px;display:inline-block; border: 0.5px solid #e6eaed; border-radius: 5px;padding:10px;margin:5px">
            <el-row>
              <el-col :span="6">
                <el-avatar style="border: 3px solid #bc6c42" :size="60" :src="require('@/assets/images/profile.jpg')" />
              </el-col>
              <el-col :span="16">
                <div style="background: rgb(188 108 66 / 10%);padding: 12px;border-radius: 5px;">
                  <el-row>
                    <el-col :span="12">
                      <div style="color: #00000099; opacity: 0.8; font-size: 10px">User Name</div>
                      <div style="color: #00000099;opacity: 0.8;font-size: 10px;font-weight: 500;">{{ issue.user.first_name }}</div>
                    </el-col>
                    <el-col :span="12">
                      <div style="color: #00000099; opacity: 0.8; font-size: 10px">User type</div>
                      <div style="color: #00000099;opacity: 0.8;font-size: 10px;font-weight: 500;">{{ issue.user.role }}</div>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher"
import _ from 'lodash'
export default {
  data: () => ({
    activeName: "history",
    selectedStatus: 'RETURNED',
    issueLogs: [],
  }),
  watch: {
    activeName: _.debounce(function() {
      if (this.activeName === 'history') {
        this.selectedStatus = 'RETURNED',
        this.getLogs()
      } else {
        this.selectedStatus = 'ISSUED',
        this.getLogs()
      }
    })
  },
  created() {
    this.getLogs()
  },
  methods: {
    getLogs() {
      const query = `query($status: String) {
        issue_returns(where: {status: {_eq: $status}, book_id: {_eq: "${this.$route.params.bookId}"}}) {
          id
          date_of_borrow
          return_date
          penality
          status
          book {
            id
            name
            standard_id
            standard {
              id
              name
            }
          }
          user {
            id
            first_name
            role
          }
        }
      }`
      dispatchGraphql(query, { status: this.selectedStatus }).then((response) => {
        this.issueLogs = response.issue_returns
        console.log("issue returns", this.issueLogs)
      })
    },
  }
}
</script>
