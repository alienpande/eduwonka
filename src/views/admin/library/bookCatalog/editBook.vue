<template>
  <div v-loading="loading">
    <e-container
      class="library-edit-catalog"
      hideHeader
      pageTitle="View/Edit Book Details"
      :back="$url.LI_CATALOG"
    >
      <e-button
        v-if="!reservedBook"
        label="Reserve Book"
        css="reserve-book__btn"
        @click="reserveBook()"
      />
      <e-button
        label="Delete Book"
        @click="deleteBook(book)"
        css="sort-icon delete-book__btn"
        :plain="true"
      />
      <br />
      <div
        class="library-edit-catalog-info"
        style="display: flex; justify-content: center"
        :style="{'margin-top': window.width < 767 && '45px'}"
      >
        <div class="imageDivStyle">
          <e-svg class="edit-pen" icon="editpens"></e-svg>
          <img
            style="width: 124px; height: 162px"
            src="@/assets/images/book.png"
            alt=""
          />
        </div>
        <div :style="window.width > 767 ? 'display: flex' : ''">
        <el-card
          shadow="none"
          v-for="(de, i) in detail"
          :key="i"
          class="cardDivStyle"
        >
          <el-row>
            <el-col :span="7">
              <e-svg
                style="margin-top: 10px; margin-left: 15px"
                icon="openBok"
              />
            </el-col>
            <el-col :span="14" :offset="1">
              <div style="color: #000000cc; font-size: 16px">
                {{ de.title }}
              </div>
              <div
                :style="{ color: de.color }"
                style="color: #000000cc; font-size: 20px; font-weight: 600"
              >
                {{ de.count }}
              </div>
            </el-col>
          </el-row>
        </el-card>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between">
        <div class="heading" style="margin-left: 0px !important">
          Book details
        </div>
        <div
          @click="deleteBookmark()"
          v-if="userBook && userBook.status === 'MARK'"
        >
          <e-svg icon="Bookmarked"></e-svg>
        </div>
        <div v-else>
          <img
            style="width: 60px; padding-top: 10px; height: 52px"
            src="@/assets/images/unmarkBtn.png"
            alt=""
            @click="handleBookmark()"
          />
        </div>
      </div>
      <el-card shadow="none">
        <el-col :span="10">
          <e-input
            v-model="book.name"
            label="Book Name"
            placeholder="Lorem"
          ></e-input>
        </el-col>
        <el-col :span="10" :offset="2">
          <e-input
            v-model="book.author"
            label="Author"
            placeholder="Lorem"
          ></e-input>
        </el-col>
        <el-col>
          <div style="color: #000000cc; font-size: 16px; font-weight: 600">
            Summary
          </div>
          <textarea
            style="width: 90%"
            v-model="book.summary"
            class="details-expenses__textarea"
            placeholder="Summary"
            rows="4"
            cols="127"
          ></textarea>
        </el-col>
        <el-col :span="10">
          <e-input
            v-model="book.publisher"
            label="Publisher"
            placeholder="Lorem"
          ></e-input>
        </el-col>
        <el-col :span="10" :offset="2">
          <div class="custom-date-picker">
            <el-col :span="24" style="height: 100px">
              <p class="label">Published Date</p>
              <el-date-picker
                v-model="book.published_date"
                type="datetime"
                placeholder="date"
              ></el-date-picker>
            </el-col>
          </div>
        </el-col>
        <el-col :span="10">
          <e-input
            v-model="book.edition"
            label="Edition"
            placeholder="Lorem"
          ></e-input>
        </el-col>
        <el-col :span="10" :offset="2">
          <e-input
            v-model="book.amount"
            label="Price"
            placeholder="Lorem"
          ></e-input>
        </el-col>
      </el-card>
      <div class="heading" style="margin-left: 0px !important">
        Record details
      </div>
      <el-card shadow="none">
        <el-row>
          <el-col :span="10">
            <e-input
              v-model="book.isbn_number"
              label="ISBN Number"
              placeholder="Lorem"
            ></e-input>
          </el-col>
          <el-col :span="10" :offset="2">
            <e-input
              v-model="book.oclc_number"
              label="OCLC Number"
              placeholder="Lorem"
            ></e-input>
          </el-col>
          <el-col :span="10">
            <e-input
              v-model="book.number_of_copies"
              label="Number of copies"
              placeholder="Lorem"
            ></e-input>
            <!-- <e-select label="Subject" placeholder="Biology"></e-select> -->
            <p>Standard</p>
            <el-select
              v-model="book.standard_id"
              placeholder="Choose the Standard"
              class="w-40"
              @change="check(item.id)"
            >
              <el-option
                v-for="item in standards"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-col>
          <el-col :span="10" :offset="2">
            <p>Subject</p>
            <el-select
              v-model="book.subject_id"
              placeholder="Choose the subject"
              @change="check(item.id)"
            >
              <el-option
                :span="10"
                v-for="item in subjects"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
            <br /><br /><br /><br /><br />
            <e-button
              width="500"
              label="View Issue Logs"
              css="sort-icon"
              :plain="true"
              @click="dialog = true"
            ></e-button>
          </el-col>
          <br /><br />
        </el-row>
        <br /><br />
      </el-card>
      <br /><br />
      <el-row
        style="border-top: 1px solid #fcdfbd; margin-top: 20px; padding-top: 30px;"
      >
        <el-col style="float: right" :span="window.width > 500 ? 9 : 24">
          <e-button
            :span="15"
            label="Cancel"
            @click="cancel()"
            css="cancel_btn float-right"
            type="default"
          ></e-button>
          <e-button
            :span="8"
            label="Update"
            @click="handleUpdate()"
            css="float-right"
          ></e-button>
        </el-col>
      </el-row>
      <el-dialog
        :title="'Issue Logs for ' + book.name"
        :visible.sync="dialog"
        width="70%"
      >
        <issue-logs v-if="dialog" />
      </el-dialog>
    </e-container>
  </div>
</template>
<script>
import {
  dispatchGraphqlQuery,
  dispatchGraphql,
  dispatchGraphqlMutation,
  dispatchGraphqlDelete,
} from "@/api/dispatcher";
import issueLogs from "../bookCatalog/issueLogs.vue";
import eButton from "@/controls/eButton.vue";
import { getId } from "@/util/auth";
import screenSize from "@/mixins/screenSize";
export default {
  components: { eButton, issueLogs },
  mixins: [screenSize],
  data: () => ({
    dialog: false,
    reservedBook: {},
    loading: true,
    req: {},
    book: {},
    userBook: { status: "UNMARK" },
    isBookMarked: false,
    subjects: [],
    standards: [],
    detail: [
      {
        title: "Total Copies",
        count: "15",
      },
      {
        title: "Available",
        count: "5",
        color: "green",
      },
      {
        title: "Issued",
        count: "10",
      },
    ],
  }),
  methods: {
    handleBookmark() {
      let bookData = {
        user_id: getId(),
        book_id: this.$route.params.id,
        status: "MARK",
      };
      dispatchGraphqlMutation("user_books", ["id", "status"], bookData).then(
        (response) => {
          this.userBook = response.bookData;
          console.log("insert", response);
          this.isBookMarked = true;
          this.getBookDetails();
        }
      );
    },
    deleteBookmark() {
      dispatchGraphqlDelete("user_books", { id: this.userBook.id }).then(
        (response) => {
          console.log(response);
          this.isBookMarked = false;
          this.getBookDetails();
        }
      );
    },
    getSubjects() {
      dispatchGraphqlQuery("subjects", ["id", "name"], this.book).then(
        (response) => {
          this.subjects = response.subjects;
          console.log("subjects", this.subjects);
        }
      );
    },
    getStandards() {
      dispatchGraphqlQuery("standards", ["id", "name"], this.book).then(
        (response) => {
          this.standards = response.standards;
          console.log("standards", this.standards);
        }
      );
    },
    handleUpdate() {
      delete this.book.user_books;
      delete this.book.issue_returns_aggregate;
      console.log("....", this.book);
      dispatchGraphqlMutation("books", ["id", "name"], this.book).then(
        (response) => {
          console.log("update", response);
          this.$router.push(this.$url.LI_CATALOG);
        }
      );
    },
    getBookDetails() {
      const query = `{
        books(where: {id: {_eq: "${this.$route.params.id}"}}) {
          id
          name
          author
          amount
          publisher
          published_date
          subject_id
          standard_id
          summary
          edition
          number_of_copies
          isbn_number  
          oclc_number
          issue_returns_aggregate(where: {status: {_eq: "ISSUED"}}) {
            aggregate {
              count
            }
          }
          user_books(where: {user_id: {_eq: "${getId()}"}, status: {_eq: "MARK"}}){
            id
            status
          }     
        }
      }`;
      dispatchGraphql(query).then((response) => {
        this.book = response.books[0];
        if (this.book.user_books.length > 0) {
          this.userBook = this.book.user_books[0];
        }
        this.detail[0].count = this.book.number_of_copies;
        this.detail[1].count =
          this.book.number_of_copies -
          this.book.issue_returns_aggregate.aggregate.count;
        this.detail[2].count =
          this.book.issue_returns_aggregate.aggregate.count;
        console.log("books", this.book);
        this.loading = false;
      });
    },
    deleteBook(book) {
      dispatchGraphqlDelete("books", { id: book.id }).then((response) => {
        console.log("Deleted....", response);
        this.$router.push(this.$url.LI_CATALOG);
      });
    },
    getReserved() {
      const query = `query {
        user_books(where: {_and: [{book_id: {_eq: "${
          this.$route.params.id
        }"}}, {status: {_eq: "RESERVED"}}, {user_id: {_eq: "${getId()}"}}]}) {
          id
          status
        }
      }`;
      dispatchGraphql(query).then((response) => {
        this.reservedBook = response.user_books[0];
      });
    },
    reserveBook() {
      let bookData = {
        user_id: getId(),
        book_id: this.$route.params.id,
        status: "RESERVED",
      };
      dispatchGraphqlMutation("user_books", ["id", "status"], bookData).then(
        (response) => {
          this.userBook = response.bookData;
          console.log("book is reserved", response);
        }
      );
    },
    cancel() {
      this.$router.push(this.$url.LI_CATALOG);
    },
  },
  created() {
    this.getBookDetails();
    this.getSubjects();
    this.getStandards();
    this.getReserved();
    console.log("book", this.book);
  },
};
</script>
<style>
.edit-pen img {
  position: absolute;
  top: -10px;
  right: -11px;
}
.delete-book__btn {
  position: fixed;
  top: 143px;
  right: 260px;
}
.bookMark-icon {
  border: 2px solid #bc6c42;
  border-radius: 4px;
  width: 55px;
  height: 47px;
}
.bookMark-icon img {
  margin: 12px 0 1px 21px;
}
.reserve-book__btn {
  position: fixed;
  top: 143px;
  right: 80px;
}
.imageDivStyle {
  border-radius: 4px;
  width: 124px;
  height: 162px;
  background: #ffffff;
  margin-right: 40px;
  position: relative;
  cursor: pointer;
}
.cardDivStyle {
  width: 260px;
  height: 110px;
  background-color: rgba(252, 223, 189, 0.4) !important;
  margin: 49px 10px 0;
}
@media screen and (max-width: 767px) {
  .imageDivStyle {
    margin-right: 10px;
  }
  .cardDivStyle {
    margin: 0 10px 4px;
  }
}
</style>
