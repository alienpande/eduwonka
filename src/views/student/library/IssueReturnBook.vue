<template>
  <es-container pageTitle="Issued Books" subTitle="Below is the list of Books available for reservation or return" class="bg-black-5">
    <el-row :gutter="20" class="mg-l-5">
      <el-col :span="8" class="text-white tx-24 f-600">
        Books list
      </el-col>
      <el-col class="mg-l-450" :span="6">
        <es-search v-model="searchBy" placeholder="Search"></es-search>
      </el-col>
      <!-- <el-col :span="3" :offset="1">
        <es-select placeholder="Category" class="select-icon"></es-select>
      </el-col>
      <el-col :span="3" class="mg-l-20">
        <es-select placeholder="Due Date" class="select-icon"></es-select>
      </el-col> -->
    </el-row><br />
    <el-table :data="issueBook">
      <el-table-column label="Book name" prop="name">
        <template slot-scope="scope">
          <div style="display: flex">
            <img style="width: 36px; height: 48px" src="@/assets/images/book.png" alt="" />
            <div style="margin: 10px 8px">{{ scope.row.book.name }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Borrowing Date" prop="date_of_borrow" />
      <el-table-column label="Due Date" prop="due_date" />
      <el-table-column label="Action">
        <template slot-scope="scope">
          <img @click='$router.push($url.LI_ISSUE_VIEW_DETAIL+ "/" + scope.row.id)' src="@/assets/images/3dot-action.png" alt="" style="cursor: pointer" />
        </template>
      </el-table-column>
    </el-table>
  </es-container>
</template>
<script>
import { getId } from '@/util/auth'
import _ from 'lodash'
import { dispatchGraphql } from '@/api/dispatcher'
export default {
  data: () => ({
    searchBy: "",
    limit: 10,
    offset: 0,
    total: 0,
    issueBook: [],
  }),
  watch: {
    searchBy: _.debounce(function() {
      this.getIssueBooks()
    }, 500),
  },
  created(){
    this.getIssueBooks()
  },
  methods: {
    getFilterVariables: function() {
      return {
        'limit': this.limit,
        'offset': this.offset,
        'search': `%${this.searchBy}%`
      }
    },
    getIssueBooks() {
      const query =`
      query ($search: String!, $limit: Int, $offset: Int){
        issue_returns(limit: $limit, offset:$offset, where: {book: {name: {_like: $search}}, status: {_eq: "ISSUED"}, user_id: {_eq: "${getId()}"}}) {
          id
          date_of_borrow
          due_date
          book {
            id
            name
          }
        }
      }`
      dispatchGraphql(query, this.getFilterVariables()).then((response) => {
        this.issueBook = response.issue_returns
        console.log('issue books', this.issueBook);
      });
    }
  },
};
</script>
