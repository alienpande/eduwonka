<template>
  <div class="dash library-dash">
    <el-row class="header">
      <el-col :span="20" class="title">
        Dashboard <span>Welcome Back!</span>
      </el-col>
    </el-row>
    <div class="library-dash-See-more" :style="window.width > 767 ?'padding: 40px; overflow: auto; height: 50vh' : 'padding: 40px 20px; overflow: auto; height: 50vh'">
      <el-row>
        <el-col :span="2">
          <div style="color: #354052; text-transform: capitalize" class="fs-20 f-600">
            Quick stats
          </div>
        </el-col>
        <!-- <el-col :span="2" :offset="20">
          <e-dropdown :list="filter" primary />
        </el-col> -->
      </el-row><br />
      <quick-stat v-if="books.length > 0" :quickStat="quickStat" :books="books" /><br/><br/>
      <dashboard-chart v-if="issueReturns.length > 0" :issueReturns="issueReturns" /><br /><br />
      <div v-for="(detail,i) in dashboardDetail" :key="i">
        <h4>{{ detail.title }}</h4>
        <div class="library-dash-books" style="box-shadow: 0px 1px 4px #15223214;border-radius: 6px;background: white;">
          <div style="padding: 30px;height: 40rem;overflow: hidden;">
            <el-row :style="window.width > 767 ? 'display: flex; flex-wrap: wrap; justify-content: center; padding:0 10rem' : 'padding: 0px'">
              <el-col :span="window.width > 767 ? 10 : 24" style="color: #000000cc; font-size: 16px">
                {{ detail.sub }}
              </el-col>
              <!-- <el-col :span="2" :offset="12">
                <e-dropdown :list="filter" primary />
              </el-col> -->
            </el-row>
            <div style="display: flex; flex-wrap: wrap; justify-content: center">
              <book-card 
                v-for="(book,i) in getBookDetails(detail.title)"
                :Key="i"
                :book="book"
                @cliks="$router.push($url.LI_EDIT_CATALOG + '/' + book.id)"
              />
            </div>
          </div>
          <div class="pointer" @click="redirectTo(detail.title)" style="display: flex;justify-content: center;background: #FCDFBD66;padding: 12px 0;">
            <div style="margin-right:20px;color: #BC6C42;font-weight:500">See More</div>
            <e-svg icon="keyDown"></e-svg>
          </div>
        </div><br/><br/>
      </div>
    </div>
  </div>
</template>
<script>
import dashboardChart from '@/components/library/dashboardChart.vue'
import { dispatchGraphql } from "@/api/dispatcher"
import { mapMutations } from "vuex"
import screenSize from '@/mixins/screenSize'
export default {
  components:{ dashboardChart },
  mixins: [screenSize],
  data: () => ({
    filter: [{ text: "Year" }, { text: "Standard 2" }, { text: "Standard 3" }],
    books: [],
    issueReturns: [],
    quickStat: [
      {
        title: "Total Books",
        stat: "up",
      },
      {
        title: "Books Available",
        stat: "up",
      },
      {
        title: "Books Issued",
        stat: "up",
      },
      {
        title: "Overdue Books",
        stat: "down",
      },
    ],
    dashboardDetail:[
      {
        title:'Reserved available books', 
        sub:'List of reserved books that are now available for issue'
      },
       {
        title:'New books added',
        sub:'List of Books recently added in library'
      },
       {
        title:'Most issued books',
        sub:'List of Books that are issued maximum times'
      },
    ]
  }),
  // mounted() {
  //   this.setAsideMenuCollapse(true);
  //   setTimeout(() => {
  //     this.setAsideWidth("94px");
  //   }, 100);
  // },
  created() {
    this.getBooks()
    // this.setAsideMenuCollapse(true);
    // this.setAsideWidth("100px");
  },
  // destroyed() {
  //   this.setAsideMenuCollapse(false);
  // },
  methods: {
    redirectTo(title) {
      if (title == "Reserved available books") {
        this.$router.push(this.$url.LI_RESERVED)
      } else if (title == "New books added") {
        this.$router.push(this.$url.LI_CATALOG)
      } else if (title == "Most issued books") {
        this.$router.push(this.$url.LI_ISSUE_RETURN)
      }
    },
    getBookDetails(type) {
      var newBooks = []
      var mostIssuedBooks = []
      var reservedBooks = []
      var issuedBooks = []
      for (const book of this.books) {
        if (newBooks.length < 6) {
          newBooks.push(book)
        } if (book.issue_returns.length > 0) {
          issuedBooks.push(book)
        } if (book.user_books.length > 0) {
          const reserves = book.user_books.filter(x => x.status === 'RESERVED')
          if (reserves.length > 0) {
            reservedBooks.push(book)
          }
          // for (const userBook of book.user_books) {
          //   if (userBook.status === 'RESERVED') {
          //   }
          // }
        }
      }
      var sortedBooks = issuedBooks.sort((a, b) => b.issue_returns.length - a.issue_returns.length)
      if (sortedBooks.length > 0) {
        for (const item of sortedBooks) {
          if (mostIssuedBooks.length < 6) {
            mostIssuedBooks.push(item)
          }
        }
      }
      if (type == "Reserved available books") {
        console.log('reserved', reservedBooks)
        return reservedBooks
      } else if (type == "New books added") {
        return newBooks
      } else if (type == "Most issued books") {
        return mostIssuedBooks
      }
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
    getBooks() {
      const query = `query($id: uuid) {
        books(order_by: {published_date: desc}) {
          id
          name
          author
          publisher
          published_date
          number_of_copies
          user_books {
            id
            status
          }
          issue_returns {
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
      dispatchGraphql(query).then((response) => {
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
