<template>
  <div class="about">
    <e-container pageTitle="Issue, Return book">
      <el-tabs class="floatTabHeader" v-model="activeName">
        <el-tab-pane label="Issue Book" name="books">
          <el-row>
            <el-col style="color: #000000cc" class="heading-text f-500" :span="window.width > 767 ? 18 : 14">
              Below is the list of books that are available for reservation or
              issue
            </el-col>
            <el-col :span="4" :offset="window.width > 767 ? 2 : 1">
              <e-button width="160" @click="$router.push($url.LI_SCAN_TO_SEARCH)" label="Scan to search"></e-button>
            </el-col>
          </el-row>
          <br />
          <div>
            <drop-filter v-if="showFilters" :standards="standards" :subjects="standard_subjects" @handleStandard="handleStandard" @handleSubject="handleSubject" @clear="getStandard" />
          </div>
          <br />
          <div style="color: #00000099;" class="text-center fs-20 f-500">We have {{ total }} books</div>
         <!-- <book-card @cliks='$router.push($url.LI_ISSUE_DETAIL)' v-for="(info, i) in books"
      :key="i"
      :bookmark="info.bookmark"
      :status="info.status"
    /> -->
          <book-card class="book-catalog-book-card" v-for="(book, i) in books" :key="i" :book="book" @cliks='redirectTo' />
          <pagination :total="total" @pagination="pagination" />
        </el-tab-pane>
        <el-tab-pane label="Return Book" name="issued">
          <el-row>
            <el-col style="color: #000000cc" class="fs-20 f-500" :span="18">
              Below is the list of books that are available for reservation or
              return
            </el-col>
            <el-col :span="4" :offset="2">
              <e-button width="160" @click="$router.push($url.LI_SCAN_TO_SEARCH)" label="Scan to search"></e-button>
            </el-col>
          </el-row>
          <br />
          <div>
            <drop-filter v-if="showFilters" :standards="standards" :subjects="standard_subjects" @handleStandard="handleStandard" @handleSubject="handleSubject" @clear="getStandard" />
          </div>
          <br />
          <e-table :table="issueBook" @pageInfo="ptest">
            <el-table-column label="Name" prop="name" width="300">
              <template slot-scope="scope">
                <div style="display: flex">
                  <img style="width: 36px; height: 48px" src="@/assets/images/book.png" alt="" />
                  <div style="margin: 10px 8px">{{ scope.row.book ? scope.row.book.name : "" }}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="User ID" prop="UserID" width="200" >
              <template slot-scope="scope">
                <span>{{scope.row.user ? scope.row.user.admission_number : ""}}</span>
              </template>
            </el-table-column>
            <el-table-column label="User Name" prop="UserName" width="200" >
              <template slot-scope="scope">
                <span>{{scope.row.user ? scope.row.user.first_name: ''}} {{scope.row.user ? scope.row.user.last_name : ''}}</span>
              </template>
            </el-table-column>
            <el-table-column label="Date of Borrow" prop="date_of_borrow" width="300" />
            <el-table-column label="Due date" prop="due_date" width="300"/>
            <el-table-column label="Action" width="200">
              <template slot-scope="scope">
                <img @click=" $router.push($url.LI_RETURN_BOOK + '/' + scope.row.id), handleEdit(scope.$index, scope.row)" src="@/assets/images/sheareAction.png" style="height: 50px; cursor: pointer" alt="" />
                <img @click="$router.push($url.LI_ISSUE_VIEW_DETAIL + '/' + scope.row.id)" src="@/assets/images/3dot-action.png" alt="" style="cursor: pointer" />
              </template>
            </el-table-column>
          </e-table>
          <es-pagination :total="estotal" @pagination="espagination" />
        </el-tab-pane>
      </el-tabs>
    </e-container>
  </div>
</template>
<script>
import screenSize from '@/mixins/screenSize'
import {dispatchGraphql, dispatchGraphqlQuery} from '@/api/dispatcher'
// import { getId } from '@/util/auth'
import Pagination from '@/components/Pagination'
import EsPagination from '@/components/Pagination'
import DropFilter from '@/components/filters.vue'
export default {
  components: {
    Pagination,
    EsPagination,
    DropFilter
  },
  mixins: [screenSize],
  data: () => ({
    activeName: "books",
    issueBook: [],
    showFilters: false,
    subjects: [],
    standard_subjects: [],
    subjectIds: [],
    standards: [],
    standardIds: [],
    books: [],
    loading: true,
    total: 0,
    offset: 0,
    page: 1,
    limit: 10,
    estotal: 0,
    esoffset: 0,
    espage: 1,
    eslimit: 10,
  }),
  watch: {
    activeName: _.debounce(function() {
      if (this.activeName === 'books') {
        this.getBooks()
      } else {
        this.selectedStatus = 'issued',
        this.getIssueBooks()
      }
    })
  },
  created() {
    this.getStandard()
  },
  methods: {
    espagination: function(object) {
      this.eslimit = object.limit
      this.esoffset = object.limit * (object.page - 1)
      this.getIssueBooks()
    },
    pagination: function(object) {
      this.limit = object.limit
      this.offset = object.limit * (object.page - 1)
      this.getBooks()
    },
    getStandard() {
      this.showFilters = false
      this.standard_subjects = []
      dispatchGraphqlQuery('standards', ['id', 'name']).then((response) => {
        this.standards = response.standards
        this.standardIds = response.standards.map(x =>  x.id)
        console.log('standards', this.standards)
        dispatchGraphqlQuery('subjects', ['id', 'name']).then((response) => {
          this.subjects = response.subjects
          this.subjectIds = response.subjects.map(x => x.id)
          this.showFilters = true
          this.getBooks()
        })
      })
    },
    redirectTo: function(book) {
      if(book.number_of_copies > book.issue_returns_aggregate.aggregate.count){
        this.$router.push(this.$url.LI_ISSUE_DETAIL + "/" + book.id)
      }
    },
    ptest(d) {
      console.log(d);
    },
    getIssuedVariables() {
      return{
        "limit": this.eslimit,
        "offset": this.esoffset
      }
    },
    getIssueBooks() {
      const query =`query($limit: Int, $offset: Int) {
        issue_returns(limit: $limit, offset: $offset, where: {status: {_eq: "ISSUED"}}) {
          id
          date_of_borrow
          due_date
          user {
            id
            admission_number
            first_name
            last_name
          }
          book {
            id
            name
          }
        }
        issue_returns_aggregate(where: {status: {_eq: "ISSUED"}}) {
          aggregate {
            count
          }
        }
      }`
      dispatchGraphql(query, this.getIssuedVariables()).then((response) => {
        this.issueBook = response.issue_returns
        this.estotal = response.issue_returns_aggregate.aggregate.count
        console.log('issue books', this.issueBook);
      });
    },
    getVariables(){
      return{
        "limit": this.limit,
        "offset": this.offset,
        "standId": this.standardIds,
        "subId": this.subjectIds
      }
    },
    getBooks() {
      this.loading=true
      const query = `query ($limit: Int, $offset: Int, $standId: [uuid!], $subId: [uuid!]) {
        books(limit: $limit, offset: $offset, where: {_and: [{standard_id: {_in: $standId}}, {subject_id: {_in: $subId}}]}) {
          id
          name
          author
          publisher
          number_of_copies
          attachment {
            file_url
            small_url
            meta
            id
          }
          issue_returns_aggregate(where: {status: {_eq: "ISSUED"}}) {
            aggregate {
              count
            }
          }
        }
        books_aggregate(where: {_and: [{standard_id: {_in: $standId}}, {subject_id: {_in: $subId}}]}) {
          aggregate {
            count
          }
        }
      }`
      dispatchGraphql(query, this.getVariables()).then((response) => {
        console.log("books", response)
        this.books = response.books
        this.total = response.books_aggregate.aggregate.count
        this.loading = false
        console.log('books', this.books);
      });
    },
    handleSubject(i) {
      console.log('sub', i)
      this.subjectIds = []
      this.subjectIds[0] = i
      this.getBooks()
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
  .pagination {
    width: 50%;
    font-size: 12px;
  }
  .dropdown-tab {
    margin-right: 3px;
  }
  .dropdown-tab .text {
    font-size: 12px;
  }
}
</style>
