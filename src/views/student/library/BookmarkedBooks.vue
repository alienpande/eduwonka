<template>
  <es-container pageTitle="Book Catalog" subTitle="Search a book to view/edit details, check availability, bookmark or reserve" class="bg-black-5">
    <el-row :gutter="20" class="mg-l-5">
      <el-col :span="9" class="text-white tx-24 f-600">
        {{bookCard.length}} Books
      </el-col>
      <el-col class="mg-t-5" :span="5" :offset="2">
        <es-search v-model="searchBy" placeholder="Search"></es-search>
      </el-col>
      <el-col :span="3" :offset="1">
        <es-select  placeholder="Subjects" class="select-icon"  :options="subjects"  @visible-change="handleSubject"></es-select>
      </el-col>
      <el-col :span="3" class="mg-t-5 mg-l-10">
        <es-button text="Clear filter" @click="getSubjects()" />
      </el-col>
    </el-row><br />
    <books-card :books="bookCard" @getBooks="getBooks"/>
    <es-pagination :total="total" @pagination="pagination"></es-pagination>
  </es-container>
</template>
<script>
import booksCard from "@/components/student/library/bookmarkedBooksCard.vue"
import _ from 'lodash'
import esPagination from '@/studentControl/esPagination'
import { dispatchGraphql,dispatchGraphqlQuery } from "@/api/dispatcher"
import { getId } from '@/util/auth'
export default {
  components: { booksCard, esPagination },
  data: () => ({
    searchBy: '',
    bookCard: [],
    booksAggregate: '',
    limit: 10,
    offset: 0,
    total: 0,
    subjects: [],
    subjectId: [],
  }),
  watch: {
    searchBy: _.debounce(function() {
      this.getBooks()
    }, 500),
  },
  created(){
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
        'subId': this.subjectId
      }
    },
    getBooks() {
      const query =`query ($limit: Int, $offset: Int,$search: String!,$subId: [uuid!]) {
        books(limit: $limit, offset:$offset, where: {_and: {user_books: {_and: {user_id: {_eq: "${getId()}"}},status: {_eq: "MARK"}}, subject_id: {_in: $subId},name: {_ilike: $search}}}) {
          id
          name
          author
          publisher
          published_date
          number_of_copies
          user_books(where: {user_id: {_eq: "${getId()}"}, status: {_eq: "MARK"}}){
            id
            status
          }
          issue_returns_aggregate(where: {status: {_eq: "ISSUED"}}) {
            aggregate {
              count
            }
          }
        }
        books_aggregate(where: {_and: {user_books: {_and: {user_id: {_eq: "${getId()}"}},status: {_eq: "MARK"}}, subject_id: {_in: $subId},name: {_ilike: $search}}}) {
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
