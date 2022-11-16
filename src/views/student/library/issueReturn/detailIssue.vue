<template>
  <es-container hideHeader pageTitle="simple calculations assignment and arithmetic" :back="$url.LI_ISSUE_RETURN" class="bg-black-5">
    <el-row style="margin: 20px">
      <el-col :span="5" :offset="1">
        <img style="width: 251px; height: 341px;border-redius: 4px" src="@/assets/images/book.png" alt=""/>
      </el-col>
      <el-col :span="17">
        <el-row>
          <el-card class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
            <el-col :span="5" :offset="1" class="mg-b-20 mg-t-10 d-flex">
              <e-svg :style="'padding-top: 10px; padding-right: 15px'" icon="author"></e-svg>
              <div>
                <div class="text-gray-6 tx-14">Author</div>
                <div class="sub-title tx-18 mg-t-4">{{issueBook.book.author}}</div>
              </div>
            </el-col>
            <el-col :span="5" :offset="2" class="mg-t-10 d-flex">
              <e-svg :style="'padding-top: 10px; padding-right: 15px'" icon="availableBooks"></e-svg>
              <div>
                <div class="text-gray-6 tx-14">ISBN Number</div>
                <div class="sub-title tx-18">{{issueBook.book.isbn_number}}</div>
              </div>
            </el-col>
          </el-card>
        </el-row>
        <el-row class="mg-t-20">
          <el-card class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
            <el-row>
              <el-col :span="20">
                <span class="tx-20 tx-bolder text-white">User Details</span>
              </el-col>
            </el-row>
            <br />
            <el-row :gutter="20">
              <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
                <el-row>
                  <el-card class="rounded-08 bg-black-3" :style="'border: none'" shadow="none">
                    <el-col :span="4" class="mg-b-20 mg-l-20 d-flex">
                      <div>
                        <div class="text-gray-6 tx-12">User Id</div>
                        <div class="sub-title tx-14">{{issueBook.user.roll_number}}</div>
                      </div>
                    </el-col>
                    <el-col :span="4" class="mg-l-30 d-flex">
                      <div>
                        <div class="text-gray-6 tx-12">User Name</div>
                        <div class="sub-title tx-14">{{issueBook.user.first_name}}</div>
                      </div>
                    </el-col>
                    <el-col :span="4" class="mg-l-30 d-flex">
                      <div>
                        <div class="text-gray-6 tx-12">User type</div>
                        <div class="sub-title tx-14">{{issueBook.user.role}}</div>
                      </div>
                    </el-col>
                  </el-card>
                </el-row>
              </el-card>
            </el-row>
          </el-card>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-card class="mg-l-40 mg-r-40 rounded-08 bg-black-2" :style="'border: none'" shadow="none">
        <el-row>
          <el-col :span="20">
            <span class="tx-20 tx-bolder text-white">Issue Details</span>
          </el-col>
        </el-row>
        <br />
        <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
          <el-row>
            <el-col :span="24">
              <el-card class="rounded-09 bg-black-3" :style="'border: none'" shadow="none">
                <el-col :span="4" class="mg-b-20 mg-l-10 d-flex">
                  <div>
                    <div class="text-gray-6 tx-12">Date of Borrow</div>
                    <div class="sub-title tx-14">{{issueBook.date_of_borrow}}</div>
                  </div>
                </el-col>
                <el-col :span="4" class="mg-l-10 d-flex">
                  <div>
                    <div class="text-gray-6 tx-12">Due Date</div>
                    <div class="sub-title tx-14">{{issueBook.due_date}}</div>
                  </div>
                </el-col>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-card>
    </el-row>
    <el-row>
      &emsp;
    </el-row>
  </es-container>
</template>
<script>
import {  dispatchGraphql } from "@/api/dispatcher";
export default {
  components: {  },
  data: () => ({
    issueBook: []
  }),
  created(){
    this.getIssueBooks()
  },
  methods:{
      getIssueBooks() {
        const query =`query {
          issue_returns_by_pk(id: "${this.$route.params.id}")  {
            id
            date_of_borrow
            due_date
            user{
              id
              roll_number
              first_name
              role
            }
            book {
              id
              name,
              isbn_number,
              author
            }
          }
        }`
        dispatchGraphql(query).then((response) => {
          this.issueBook = response.issue_returns_by_pk
          console.log('issue books', this.issueBook);
        });
      }
  }
};
</script>
<style>

</style>
