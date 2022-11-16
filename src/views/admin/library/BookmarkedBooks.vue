<template>
  <div class="library-bookmarked-books" style="padding: 30px; height: 73vh; overflow: auto">
    <div class="f-500" style="font-size: 24px">Bookmarked Books</div>
    <br />
    <el-row class="library-bm-sub">
      <el-col :span="12">
        <div style="color: #000000cc" class="heading-text f-500">List of books bookmarked</div>
      </el-col>
      <el-col :span="3" :offset="9">
        <e-button label="Scan to search" css="sort-icon" :plain="true"></e-button>
      </el-col>
    </el-row>
    <br />
    <div style="color: #00000099;text-align: center;padding: 10px 0;font-size: 18px;">
      We have <b>{{ total }}</b> bookmarked books
    </div>
    <book-card v-for="book in books" :key="book.id" :book="book"  v-loading="loading"/>
    <pagination :total="total" @pagination="pagination" />
  </div>
</template>
<script>
import { dispatchGraphql,dispatchGraphqlQuery } from '@/api/dispatcher'
import Pagination from '@/components/Pagination'
import { getId } from '@/util/auth'
export default {
  components: { Pagination },
  data: () => ({
    books: [],
    loading: false,
    bookCard: [],
    standards:[],
    status: 'MARK',
    user_id:'',
    total: 0,
    offset: 0,
    page: 1,
    limit: 10,
  }),
  created() {
    this.getBooks()
  },
  methods: {
    pagination: function(object) {
      this.limit = object.limit
      this.offset = object.limit * (object.page - 1)
      this.getBooks()
    },
    getvariables(){
      this.user_id = getId()
      return {
        "limit": this.limit,
        "offset": this.offset,
        "user_id": this.user_id,
        "status": this.status
      }
    },
    getBooks() {
      this.loading = true
      console.log('user id', this.user_id)
      const query = `query ($limit: Int, $offset: Int, $status: String, $user_id: uuid!) {
        books(limit: $limit, offset: $offset, where: {user_books: {status: {_eq: $status}, user_id: {_eq: $user_id}}}) {
          id
          name
          publisher
          author
          attachment{
            file_url
          }
          number_of_copies
            issue_returns_aggregate(where: {status: {_eq: "ISSUED"}}) {
            aggregate {
              count
            }
          }
          issue_returns{
            id
            book_id
            status
          }
          user_books {
            id
            book_id
            status
          }
        }
        books_aggregate(where: {user_books: {status: {_eq: $status}, user_id: {_eq: $user_id}}}) {
          aggregate {
            count
          }
        }
      }`
      dispatchGraphql(query,this.getvariables()).then((response) => {
        this.loading = false
        this.books = response.books
          console.log("books.........", this.books)
      })
    },
    // handleFilter(i){
    //   const query = `query($status: String, $standard_id: uuid) {
    //       books(where: {user_books: {status: {_eq: "MARK"}, books: {standard_id: {_eq: "${i.id}"}}}}){
    //         id
    //         name
    //         author
    //         publisher
    //         number_of_copies
    //            issue_returns_aggregate(where: {status: {_eq: "ISSUED"}}) {
    //           aggregate {
    //             count
    //           }
    //         }
    //          issue_returns{
    //           id
    //           book_id
    //           status
    //         }
    //         user_books {
    //           id
    //           book_id
    //           status
    //         }
    //       }
    //     }`
    //   dispatchGraphql(query).then((response) => {
    //     this.books = response.books
    //   })
    // },
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
