<template>
  <div class="library-dash-reserved-books" style="padding: 30px; height: 73vh; overflow: auto">
    <div class="f-500" style="font-size: 24px">Reserved books</div>
    <br />
    <el-row :gutter="20">
      <el-col :span="10">
        <div style="color: #000000cc" class="heading-text f-500">
          List of books Reserved by you
        </div>
      </el-col>
      <el-col :span="3" :offset="11">
        <e-button label="Scan to search" css="sort-icon" :plain="true">
        </e-button>
      </el-col>
    </el-row>
    <br />
    <div>
      <drop-filter v-if="showFilters" :standards="standards" :subjects="standard_subjects" @handleStandard="handleStandard" @handleSubject="handleSubject" @clear="getStandard" />
    </div>
    <div style="color: #00000099;text-align: center;padding: 10px 0;font-size: 18px;">
      You have <b>{{ total }}</b> reserved books
    </div>
    <reverse-card class="reserved-books-card" v-if="reservedbooks.length > 0" :books="reservedbooks" @setUserbook="getBookDetails" />
    <pagination :total="total" @pagination="pagination" />
  </div>
</template>
<script>
import {dispatchGraphql, dispatchGraphqlQuery} from '@/api/dispatcher'
import Pagination from '@/components/Pagination'
import DropFilter from '@/components/filters.vue'
import { getId } from '@/util/auth'
export default {
  components: {
    Pagination,
    DropFilter
  },
  data: () => ({
    loading: true,
    showFilters: false,
    subjects: [],
    standard_subjects: [],
    subjectIds: [],
    standards: [],
    standardIds: [],
    reservedbooks: [],
    total: 0,
    offset: 0,
    page: 1,
    limit: 10,
  }),
  created() {
    this.getStandard()
  },
  methods:{
    getBookDetails(val) {
      this.$router.push(this.$url.LI_EDIT_CATALOG+ "/" + val.id)
    },
    handleStandard(i) {
      this.showFilters = false
      console.log('selected', i)
      this.standardIds = []
      this.standardIds[0] = i
      const query = `query($standId: uuid) {
        standard_subjects(where: {standard_id: {_eq: $standId}}) {
          id
          subject {
            id
            name
          }
        }
      }`
      dispatchGraphql(query, { standId: i }).then((response) => {
        this.standard_subjects = []
        this.standard_subjects = response.standard_subjects.map(x => x.subject)
        console.log('standard subjects', this.subjects)
        this.showFilters = true
        this.getBooks()
      })
    },
    handleSubject(i) {
      this.subjectIds = []
      this.subjectIds[0] = i
      this.getBooks()
    },
    pagination: function(object) {
      this.limit = object.limit
      this.offset = object.limit * (object.page - 1)
      this.getBooks()
    },
    getVariables() {
      return {
        'userId': getId(),
        "limit": this.limit,
        "offset": this.offset,
        'standard_id': this.standardIds,
        'subject_id': this.subjectIds
      }
    },
    getBooks() {
      const query = `query ($limit: Int, $offset: Int, $userId: uuid, $standard_id: [uuid!], $subject_id: [uuid!]) {
        books(limit: $limit, offset: $offset, where: {_and: [{subject_id: {_in: $subject_id}}, {standard_id: {_in: $standard_id}}, {user_books: {_and: [{status: {_eq: "RESERVED"}}, {user_id: {_eq: $userId}}]}}]}) {
          id
          author
          name
          publisher
          issue_returns {
            id
            due_date
          }
          user_books {
            id
            book_id
          }
        }
        books_aggregate(where: {_and: [{subject_id: {_in: $subject_id}}, {standard_id: {_in: $standard_id}}, {user_books: {_and: [{status: {_eq: "RESERVED"}}, {user_id: {_eq: $userId}}]}}]}) {
          aggregate {
            count
          }
        }
      }`
      dispatchGraphql(query, this.getVariables()).then((response) => {
        this.reservedbooks = response.books
        this.total = response.books_aggregate.aggregate.count
        console.log("hk", this.reservedbooks)
      })
    },
    getStandard() {
      this.loading = true
      this.showFilters = false
      this.standard_subjects = []
      dispatchGraphqlQuery('standards', ['id', 'name']).then((response) => {
        this.standards = response.standards
        this.standardIds = this.standards.map(x => x.id)
        dispatchGraphqlQuery('subjects', ['id', 'name']).then((response) => {
          this.subjects = response.subjects
          this.subjectIds = this.subjects.map(x => x.id)
          this.loading = false
          this.showFilters = true
          this.getBooks()
        })
      })
    },
  }
};
</script>
<style scoped>
.heading-text {
  font-size: 20px;
}
@media only screen and (device-width: 768px) {
  .heading-text {
    font-size: 16px;
  }
}
</style>
