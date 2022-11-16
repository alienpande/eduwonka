<template>
  <es-container pageTitle="Book Catalog" subTitle="Search a book to view/edit details, check availability, bookmark or reserve" class="bg-black-5">
    <el-row :gutter="20" class="mg-l-5">
      <el-col :span="9" class="text-white tx-24 f-600">
        {{booksAggregate.aggregate.count}} Books
      </el-col>
      <el-col class="mg-t-5" :span="5" :offset="2">
        <es-search v-model="searchBy" placeholder="Search"></es-search>
      </el-col>
      <el-col :span="3" :offset="1">
        <es-select  placeholder="Subjects" class="select-icon" :options="subjects" @visible-change="handleSubject" />
      </el-col>
      <el-col :span="3" class="mg-t-5 mg-l-10">
        <es-button text="Clear filter" @click="getSubjects()" />
      </el-col>
    </el-row><br />
    <books-card
      @cliks='$router.push($url.LI_EDIT_CATALOG+ "/" + info.id)'
      :books="bookCard"
    />
    <es-pagination :total="total" @pagination="pagination"></es-pagination>
  </es-container>
</template>
<script>
import esPagination from '@/studentControl/esPagination'
import { dispatchGraphql, dispatchGraphqlQuery} from "@/api/dispatcher"
import { getId } from '@/util/auth'
import booksCard from "@/components/student/library/booksCard.vue"
import _ from 'lodash'
// import EsButton from '../../../studentControl/esButton.vue'
export default {
  components: { booksCard, esPagination },
  data: () => ({
    bookCard: [],
    searchBy: '',
    booksAggregate: '',
    limit: 10,
    offset: 0,
    total: 0,
    subjects: [],
    selectedSubject: '',
    subjectId: []
  }),
  watch: {
    searchBy: _.debounce(function() {
      this.getBooks()
    }, 500),
  },
  created() {
    // this.getBooks(),
    this.getSubjects()
  },
  methods: {
    pagination: function(object) {
      this.limit = object.limit
      this.offset = object.limit * (object.page - 1)
      this.getBooks()
    },
    handleSubject(val) {
      this.subjectId = []
      this.subjectId.push(val)
      this.getBooks()
      console.log("value", val)
    },
    clearFilter(){
      this.getBooks()
    },
    getSubjects() {
      dispatchGraphqlQuery('subjects', ['id', 'name']).then((response) => {
        for (const item of response.subjects) {
          this.subjects.push({ value: item.id, label: item.name })
        }
        this.subjectId = this.subjects.map(x => x.value)
        this.getBooks()
      })
    },
    getFilterVariables: function() {
      return {
        'limit': this.limit,
        'offset': this.offset,
        'search': `%${this.searchBy}%`,
        'subId' : this.subjectId
      }
    },
    getBooks() {
      const query = `query ($limit: Int, $offset: Int,$search: String!,$subId: [uuid!]) {
        books(limit: $limit, offset:$offset, where: {_and: [{user_books: {user_id: {_eq: "${getId()}"}}}, {subject_id: {_in: $subId}}, {name: {_ilike: $search}}]}) {
          id
          name
          author
          publisher
          published_date
          subject_id
          number_of_copies
          user_books{
            id
            status
          }
          issue_returns_aggregate(where: {status: {_eq: "ISSUED"}}) {
            aggregate {
              count
            }
          }
        }
        books_aggregate(where: {_and: [{user_books: {user_id: {_eq: "${getId()}"}}},{subject_id: {_in: $subId}},{name: {_ilike: $search}}]})  {
          aggregate {
            count
          }
        }
      }`
      dispatchGraphql(query, this.getFilterVariables()).then((response) => {
        console.log("books", response)
        this.bookCard = response.books
        this.booksAggregate = response.books_aggregate
        this.total = this.booksAggregate.aggregate.count
      });
    },
  }
};
</script>
