<template>
    <e-container>
      <e-table :table="issueLogs" @pageInfo="ptest">
        <el-table-column label="User Name" prop="user.first_name">
          <template slot-scope="scope">
            <div style="display: flex">
              <div style="margin: 10px 8px">{{ scope.row.user.first_name }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Standard" prop="book.standard.name" />
        <el-table-column label="Date of Borrow" prop="date_of_borrow" />
        <el-table-column label="Return date" prop="return_date" />
        <el-table-column label="Penality" prop="penality" />
      </e-table>
    </e-container>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher"
export default {
  data: () => ({
    issueLogs: [],
  }),
  created() {
    this.getIssueLogs()
  },
  methods: {
    ptest(d) {
      console.log(d);
    },
    getIssueLogs() {
      const query = `{
        issue_returns(where: {status: {_eq: "ISSUED"}, book_id: {_eq: "${this.$route.params.id}"}}) {
          id
          date_of_borrow
          return_date
          penality
          book {
            name
            standard_id
            standard {
              name
            }
          }
          user {
            first_name
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        console.log("issue returns", response)
        this.issueLogs = response.issue_returns
      });
    },
  }
};
</script>
