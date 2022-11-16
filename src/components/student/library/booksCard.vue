<template>
  <div>
    <el-row>
      <el-col v-for="book in books" :key="book.id" :span="7" class="mg-l-30">
        <div @click='$router.push($url.LI_EDIT_CATALOG+ "/" + book.id)'>
          <el-card class="pointer rounded-08 bg-black-2" style="border: none;margin: 15px" shadow="none">
            <el-col :span="6">
              <img style="width: 109px; height: 143px" src="@/assets/images/book.png" alt="" />
            </el-col>
            <el-col :span="15" :offset="2">
              <el-row>
                <el-col :span="19">
                  <div class="text-white fs-16 f-500">
                    {{book.name}}
                  </div>
                  <div class="text-gray-6 tx-12">
                    By {{book.author}}
                  </div>
                </el-col>
                <el-col :span="1" :offset="2">
                  <div @click="deleteBookmark(book.user_books[0])" v-if="checkBookMarksStatus(book)">
                    <e-svg icon="yellowBookmarked" />
                  </div>
                  <div v-else @click="handleBookmark(book)">
                    <e-svg icon="noBookmark" />
                  </div>
                </el-col>
              </el-row><br />
              <el-row>
                  <el-col>
                    <el-card class="rounded-08 bg-black-3" style="border: none;" shadow="none">
                      <el-col :span="12">
                        <div class="text-gray-6 tx-12">Date</div>
                        <div class="mg-b-10 text-white fs-14 f-500">
                          {{book.published_date}}
                        </div>
                      </el-col>
                      <el-col :span="11" :offset="1">
                        <div class="text-gray-6 tx-12">Status</div>
                        <div class="fs-14 f-500" :class="getBookStatus(book) === 'Available' ? 'text-green': 'text-red'">
                          {{getBookStatus(book)}}
                        </div>
                      </el-col>
                    </el-card>
                  </el-col>
              </el-row>
            </el-col>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {  dispatchGraphqlQueryByPk, dispatchGraphqlMutation } from "@/api/dispatcher";
export default {
  props: {
    books: {
      type: Array
    }
  },
  components: {},
  data() {
    return {}
  },
  created(){
    this.getBookDetails()
  },
  methods: {
    handleBookmark(book){
      console.log('hiosdhl', book)
    },
    deleteBookmark(book) {
      if (book.status === 'MARK') {
        book.status = 'UNMARK'
      } else {
        book.status = 'MARK'
      }
      console.log('hiosdhl', book)
      dispatchGraphqlMutation('user_books', ['id', 'status'], book).then((response) => {
        console.log(response)
        // this.isBookMarked = false
      })
    },
    checkBookMarksStatus: function(book) {
      console.log('$$$$$$$$$$$$$44', book)
      if (book.user_books.length > 0) {
        if (book.user_books[0].status === 'MARK'){
          return true
        }
      }
      return false
    },
    getBookDetails: function(){
      dispatchGraphqlQueryByPk('books',['id'],{id: this.$route.params.queryId}).then((response) => {
        this.query = response.queries_by_pk
      })
    },
    getBookStatus(book) {
      var status = 'Unavailable'
      if (book.number_of_copies > book.issue_returns_aggregate.aggregate.count) {
        status = 'Available'
      }
      return status
    }
  }
}
</script>
