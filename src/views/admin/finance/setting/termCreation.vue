<template>
  <div>
    <e-container pageTitle="Terms" btnIcon="el-icon-plus" btnText="Create Term" @btnClick="$router.push($url.FI_TEARM_CREATE + '/new')">
      <div class="sub-headers">Below is the Term list</div>
      <e-table :table="terms">
        <el-table-column label="Term" prop="name" />
        <el-table-column label="Start Date" prop="Date">
          <template slot-scope="scope">
            {{ getDate(scope.row.start_date) }}
          </template>
        </el-table-column>
        <el-table-column label="End Date" prop="Date">
          <template slot-scope="scope">
            {{ getDate(scope.row.end_date) }}
          </template>
        </el-table-column>
        <el-table-column label="Due date" prop="Date">
          <template slot-scope="scope">
            {{ getDate(scope.row.due_date) }}
          </template>
        </el-table-column>
        <el-table-column label="Action">
          <template slot-scope="scope">
            <div style="display: flex">
              <e-svg style="margin-right:10px"
                @click="$router.push($url.FI_TEARM_CREATE + `/${scope.row.id}`)"
                icon="pens"
              ></e-svg>
              <e-svg
                @click="handleDelete(scope.row)"
                icon="closes"
              ></e-svg>
            </div>
          </template>
        </el-table-column>
      </e-table>
    </e-container>
  </div>
</template>
<script>
import { dispatchGraphqlQuery, dispatchGraphqlDelete } from "@/api/dispatcher"
import moment from 'moment'
export default {
  components: {},
  data: () => ({
    terms: [],
  }),
  created() {
    this.getTerms()
  },
  methods: {
    getTerms() {
      dispatchGraphqlQuery('terms', ['id', 'name', 'start_date', 'end_date', 'due_date']).then((response) => {
        console.log(response)
        this.terms = response.terms
      })
    },
    getDate(date) {
      return moment(date). format('DD MMM yyyy')
    },
    handleDelete(row) {
      dispatchGraphqlDelete('terms', { id: row.id }).then((response) => {
        console.log(response)
        this.$notify({
          type: 'error',
          title: 'Term Deleted',
        })
        this.getTerms()
      })
    }
  }
}
</script>
