<template>
  <div class="library-book-catalog" style="padding: 30px; height: 73vh; overflow: auto">
    <div style="display: flex; justify-content: space-between;padding-right:25px">
      <div class="f-500" style="font-size: 24px">Book Catalog</div>
      <e-button :span="3" @click="$router.push($url.LI_ADD_CATALOG)" label="Add new book" icon="el-icon-plus"></e-button>
    </div>
    <br />
    <el-row>
      <el-col :span="17">
        <div style="color: #000000cc" class="heading-text f-500">
          Search a book to view/edit details, check availability bookmark or Reserve
        </div>
      </el-col>
      <el-col :span="3" :offset="4">
        <e-button @click="$router.push($url.LI_SCAN_CATALOG)" label="Scan to search" css="sort-icon" :plain="true">
        </e-button>
      </el-col>
    </el-row>
    <br />
    <div>
      <drop-filter v-if="showFilters" :standards="standards" :subjects="standard_subjects" @handleStandard="handleStandard" @handleSubject="handleSubject" @clear="getStandard" />
    </div>
    <div
      style="
        color: #00000099;
        text-align: center;
        padding: 10px 0;
        font-size: 18px;
      "
    >
      We have <b>{{ total }}</b>  books
    </div>
    <book-card
      class="book-catalog-book-card"
      v-for="(book, i) in bookCard"
      :key="i"
      :book="book"
      @cliks='redirectTo'
    />
    <!-- <book-card
      v-for="(info, i) in bookCard"
      @cliks='$router.push($url.LI_EDIT_CATALOG+ "/" + info.id)'
      :key="i"
      :publisher="info.publisher"
      :name="info.name"
      :bookmark="info.user_books.length"
      :author="info.author"
      :id="info.id"
    /> -->
     <!-- <el-pagination
        @current-change="currentPage"
        @size-change="sizeChange"
        @prev-click="previousClick"
        @next-click="nextClick"
        background
        layout="prev, pager, next"
        style="text-align: center;margin-top:15px"
        :total="50"
      >
      </el-pagination> -->
      <pagination :total="total" @pagination="pagination" />
  </div>
</template>
<script>
import { dispatchGraphql, dispatchGraphqlQuery } from "@/api/dispatcher"
import { getId } from '@/util/auth'
import DropFilter from '@/components/filters.vue'
import Pagination from '@/components/Pagination'
export default {
  components: {
    Pagination,
    DropFilter
  },
  data: () => ({
    showFilters: false,
    subjects: [],
    standard_subjects: [],
    subjectIds: [],
    standards: [],
    standardIds: [],
    bookCard: [],
    total: 0,
    offset: 0,
    page: 1,
    limit: 10,
  }),
  methods: {
    redirectTo: function(book) {
      // this.$router.push(`/edit-catalog/${book.id}`)
      this.$router.push(this.$url.LI_EDIT_CATALOG+ "/" + book.id)
    },
    // getBookStatus(book) {
    //   var status = 'Unavailable'
    //   if (book.number_of_copies > book.issue_returns_aggregate.aggregate.count) {
    //     status = 'Available'
    //   }
    //   return status
    // },
    getStandard() {
      this.showFilters = false
      this.standard_subjects = []
      dispatchGraphqlQuery('standards', ['id', 'name']).then((response) => {
        this.standards = response.standards
        this.standardIds = response.standards.map(x => x.id)
        console.log('standards', this.standards)
        dispatchGraphqlQuery('subjects', ['id', 'name']).then((response) => {
          this.subjects = response.subjects
          this.subjectIds = response.subjects.map(x => x.id)
          console.log('subjects', this.subjects)
          this.showFilters = true
          this.getBooks()
        })
      })
    },
    pagination: function(object) {
      this.limit = object.limit
      this.offset = object.limit * (object.page - 1)
      this.getBooks()
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
          user_books(where: {user_id: {_eq: "${getId()}"}, status: {_eq: "MARK"}}) {
            id
            status
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
        this.bookCard = response.books
        this.total = response.books_aggregate.aggregate.count
      });
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
      console.log('sub', i)
      this.subjectIds = []
      this.subjectIds[0] = i
      this.getBooks()
    },
    getName() {
      if (this.bookCard[0].subject) {
        return (this.bookCard[0].subject ? 'for ' + this.bookCard[0].subject.name : '')
      }
      if (this.bookCard[0].standard) {
        return (this.bookCard[0].standard ? 'for ' + this.bookCard[0].standard.name : '')
      }
    },
    clearFilter(){
      this.getStandard()
    }
  },
  created() {
    // this.getBooks()
    this.getStandard()
    // this.getSubjects()
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