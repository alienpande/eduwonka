<template>
  <es-container pageTitle="Dashboard" subTitle="Welcome Back!" class="bg-black-5">
    <el-card class="mg-l-40 mg-r-40 rounded-08 bg-black-2" :style="'border: none'" shadow="none">
      <el-row>
        <el-col :span="20">
          <span class="tx-20 tx-bolder text-white">Quick Stats</span>
        </el-col>
      </el-row>
      <br />
      <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
        <el-row>
          <el-col :span="5" class="mg-l-30">
            <el-card class="rounded-08 bg-black-3" :style="'border: none'" shadow="none">
              <el-row>
                <el-col :span="6">
                  <e-svg class="mg-t-10 mg-l-15" icon="issuedBooks" />
                </el-col>
                <el-col :span="15" :offset="1">
                  <div class="fs-24 text-white f-600">
                    {{ getIssuedBooks() }}
                  </div>
                  <div class="text-gray-6">Total Books Issued</div>
                  <div>
                    <div>
                      <span><e-svg class="arrow-icon" icon="library/arrow-up"></e-svg></span>
                      <span style="color: #3dd598">2.3% </span>
                      <span class="text-gray-6 fs-12">than last year</span>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-card class="rounded-08 bg-black-3" :style="'border: none'" shadow="none">
              <el-row>
                <el-col :span="6">
                  <e-svg class="mg-t-10 mg-l-15" icon="availableBooks" />
                </el-col>
                <el-col :span="15" :offset="1">
                  <div class="fs-24 text-white f-600">
                    {{ getTotalBooks() }}
                  </div>
                  <div class="text-gray-6">Books Available</div>
                  <div>
                    <div>
                      <span><e-svg class="arrow-icon" icon="library/arrow-up"></e-svg></span>
                      <span style="color: #3dd598">2.3% </span>
                      <span class="text-gray-6 fs-12">than last year</span>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-card class="rounded-08 bg-black-3" :style="'border: none'" shadow="none">
              <el-row>
                <el-col :span="6">
                  <e-svg class="mg-t-10 mg-l-15" icon="overdue" />
                </el-col>
                <el-col :span="15" :offset="1">
                  <div class="fs-24 text-white f-600">
                    {{ getOverDueBooks() }}
                  </div>
                  <div class="text-gray-6">Overdue Books</div>
                  <div>
                    <div>
                      <span><e-svg class="arrow-icon" icon="arrow-down"></e-svg></span>
                      <span style="color: #f0142f">2.3% </span>
                      <span class="text-gray-6 fs-12">than last year</span>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-card class="rounded-08 bg-black-3" :style="'border: none'" shadow="none">
              <el-row>
                <el-col :span="6">
                  <e-svg class="mg-t-10 mg-l-15" icon="bookmarkedBooks" />
                </el-col>
                <el-col :span="15" :offset="1">
                  <div class="fs-24 text-white f-600">
                    {{ getBoomarkedBooks() }}
                  </div>
                  <div class="text-gray-6">Bookmarked</div>
                  <div>
                    <div>
                      <span class="text-gray-6">Books Available</span>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </el-card>
    <el-card class="rounded-08 bg-black-2" :style="'border: none;margin: 40px'" shadow="none">
      <el-row>
        <el-col :span="21">
          <span class="tx-20 tx-bolder text-white">New Books Added</span>
        </el-col>
        <!-- <el-col :span="3">
          <es-select placeholder="Yearly" />
        </el-col> -->
      </el-row>
      <br />
      <dashboard-chart v-if="issueReturns.length > 0" :issueReturns="issueReturns" />
    </el-card>
    <el-card class="rounded-08 bg-black-2" :style="'border: none;margin: 40px'" shadow="none">
      <el-row>
        <el-col :span="21">
          <span class="tx-20 tx-bolder text-white">New Books Added</span>
        </el-col>
        <!-- <el-col :span="3">
          <es-select placeholder="Month" />
        </el-col> -->
      </el-row>
      <br />
      <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
        <el-row>
          <span class="tx-16 text-gray-6">List of books recently added in library</span>
        </el-row>
        <el-row>
          <el-card class="rounded-08 bg-black-3" :style="'border: none;margin: 40px'" shadow="none">
            <books-card :books="getNewBooks()" />
          </el-card>
        </el-row>
        <hr style="opacity: 10%" />
        <el-row>
          <el-col class="d-flex justify-content-center">
            <es-button text="View more" @click="$router.push($url.LI_CATALOG)" />
          </el-col>
        </el-row>
      </el-card>
    </el-card>
    <el-card class="rounded-08 bg-black-2" :style="'border: none;margin: 40px'" shadow="none">
      <el-row>
        <el-col :span="21">
          <span class="tx-20 tx-bolder text-white">Mostly issued Books</span>
        </el-col>
        <!-- <el-col :span="3">
          <es-select placeholder="Month" />
        </el-col> -->
      </el-row>
      <br />
      <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
        <el-row>
          <span class="tx-16 text-gray-6">List of books recently added in library</span>
        </el-row>
        <el-row>
          <el-card class="rounded-08 bg-black-3" :style="'border: none;margin: 40px'" shadow="none">
            <books-card :books="getMostIssuedBooks()" />
          </el-card>
        </el-row>
        <hr style="opacity: 10%" />
        <el-row>
          <el-col class="d-flex justify-content-center">
            <es-button text="View more" @click="$router.push($url.LI_ISSUE_RETURN)" />
          </el-col>
        </el-row>
      </el-card>
    </el-card>
  </es-container>
</template>
<script>
import { mapMutations } from "vuex";
import dashboardChart from '@/components/student/library/dashboardChart.vue'
import booksCard from "@/components/student/library/booksCard.vue"
import { dispatchGraphql } from "@/api/dispatcher"
import { getId } from '@/util/auth'
export default {
  components:{ dashboardChart, booksCard },
  data: () => ({
    books: [],
    issueReturns: []
  }),
  mounted() {
    this.setAsideMenuCollapse(true);
    setTimeout(() => {
      this.setAsideWidth("94px");
    }, 100);
  },
  created() {
    this.getBooks()
//    this.setAsideMenuCollapse(true);
//    this.setAsideWidth("100px");
  },
  destroyed() {
    this.setAsideMenuCollapse(false);
  },
  methods: {
    getTotalBooks() {
      let total = 0
      for (const book of this.books) {
        total += book.number_of_copies
      }
      return total - this.getIssuedBooks()
    },
    getIssueReturns() {
      for (const book of this.books) {
        if (book.issue_returns.length > 0) {
          for (const issueReturn of book.issue_returns) {
            this.issueReturns.push(issueReturn)
          }
        }
      }
    },
    getMostIssuedBooks() {
      var books = []
      var issuedBooks = []
      for (const book of this.books) {
        if (book.issue_returns.length > 0) {
          issuedBooks.push(book)
        }
      }
      var sortedBooks = issuedBooks.sort((a, b) => b.issue_returns.length - a.issue_returns.length)
      if (sortedBooks.length > 0) {
        for (const item of sortedBooks) {
          if (books.length < 6) {
            books.push(item)
          }
        }
      }
      return books
    },
    getNewBooks() {
      var books = []
      for (const book of this.books) {
        if (books.length < 6) {
          books.push(book)
        }
      }
      return books
    },
    getOverDueBooks() {
      let count = 0
      for (const book of this.books) {
        if (book.issue_returns.length > 0) {
          for (const item of book.issue_returns) {
            if (item.status === 'RETURNED' && item.penality) {
              console.log(item)
              count ++
            }
          }
        }
      }
      return count
    },
    getIssuedBooks() {
      let count = 0
      for (const book of this.books) {
        if (book.issue_returns.length > 0) {
          for (const item of book.issue_returns) {
            if (item.status === 'ISSUED') {
              count ++
            }
          }
        }
      }
      return count
    },
    getBoomarkedBooks() {
      let count = 0
      for (const book of this.books) {
        if (book.user_books.length > 0) {
          count ++
        }
      }
      return count
    },
    getBooks() {
      const query = `query($id: uuid) {
        books(order_by: {published_date: desc}) {
          id
          name
          author
          publisher
          published_date
          number_of_copies
          user_books(where: {user_id: {_eq: $id}, status: {_eq: "MARK"}}) {
            id
            status
          }
          issue_returns(where: {user_id: {_eq: $id}}) {
            id
            status
            penality
            date_of_borrow
            return_date
            due_date
          }
          issue_returns_aggregate(where: {status: {_eq: "ISSUED"}}) {
            aggregate {
              count
            }
          }
        }
      }`
      dispatchGraphql(query, { id: getId() }).then((response) => {
        this.books = response.books
        this.getIssueReturns()
      })
    },
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth"]),
    activeTabChange(e) {
      this.activeTab = e;
    },
    scrollTop() {
      this.$nextTick(() => {
        this.$refs.tab2.scrollTop = 0;
      });
    },
  },
};
</script>
<style>
.dash .header {
  background: #fff;
  padding: 40px 56px 50px 56px;
}
.dash > .header > .title {
  font: normal normal 600 24px/35px Poppins;
  color: #000000;
  opacity: 0.8;
}

.dash > .header > .title > span {
  font-size: 13px;
  margin-top: -0.5rem;
  display: block;
  font-weight: 400;
  color: #00000066;
}
</style>
