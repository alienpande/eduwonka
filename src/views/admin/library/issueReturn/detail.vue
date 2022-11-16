<template>
  <div>
    <e-container hideHeader pageTitle="Fill details to issue" :back="$url.LI_ISSUE_RETURN">
      <e-button label="View Book Details" css="sort-icon view-book__detail" :plain="true" @click="$router.push($url.LI_EDIT_CATALOG + '/' + $route.params.bookId)"></e-button>
      <e-button @click="logModal=true" label="View Issue Logs" css="sort-icon view-issue__log" :plain="true"></e-button>
      <el-card style="width: 359px; display: block; margin: auto">
        <el-row>
          <el-col :span="7">
            <img style="width: 79px; height: 103px" src="@/assets/images/book.png" alt="" />
          </el-col>
          <el-col :span="14">
            <div style="color: #000000cc" class="fs-20 f-500">
              {{ bookData.name }}
            </div>
            <div style="color: #00000099;opacity: 0.4;font-size: 10px;font-weight: 500;">
              {{ bookData.publisher }}
            </div>
            <div style="color: #000000cc;margin-top:10px" class="fs-20 f-500">ISBN Number</div>
            <div style="color: #00000099;opacity: 0.4;font-size: 10px;font-weight: 500;">
              {{ bookData.isbn_number }}
            </div>
          </el-col>
        </el-row>
      </el-card>
      <div class="heading">User Details</div>
      <el-card shadow='none'>
      <!-- <el-row>
        <el-col :span="10">
          <e-input v-model="req.id" label='User ID' placeholder='Type/Scan ID'></e-input>
        </el-col>
        <el-col :span="10" :offset="2">
          <e-input v-model="req.user" label='User Name' placeholder='Type here'></e-input>
        </el-col>
        <el-col :span="10">
          <e-select v-model="req.type" label='User Type' placeholder='Teacher'></e-select>
        </el-col>
      </el-row> -->
        <el-row>
          <el-col :span="10">
            <p>User Type</p>
            <el-select v-model="role" label="User Type" placeholder="Select User type" @change="check()">
              <el-option v-for="item in userRole" :key="item.id" :label="item.label" :value="item.value" />
            </el-select>
          </el-col>
          <el-col :span="10" :offset="2">
            <p>User Name</p>
            <!-- <e-input v-model="req.user" label='User Name' placeholder='Type here'></e-input> -->
            <el-select v-model="req.id" label="User Name" placeholder="Select user" @change="handleUser">
              <el-option v-for="user in userFilter" :key="user.id" :label="user.first_name" :value="user.id" />
            </el-select>
          </el-col>
          <el-col :span="10">
            <e-input v-model="req.id" label="User ID" placeholder="Type/Scan ID"></e-input>
          </el-col>
        </el-row>
        <br /><br />
      </el-card>
      <div class="heading">User Details</div>
      <el-card shadow='none'>
      <!-- <el-row>
        <el-col :span="10">
          <e-date-picker class="default-picker" v-model="req.date" label='Date of Borrow' placeholder='12/12/2020'></e-date-picker>

        </el-col>
        <el-col :span="10" :offset="2">
      <div class="label">Due Date</div>
      <div style="font-size:16px;color: #888888;">  12/01/2021</div>
        </el-col>
      </el-row> -->
        <el-row>
          <el-col :span="10">
            <e-date-picker :span="24" v-model="issueBook.date_of_borrow" name="Date of Borrow" align="right" format="MM/dd/yyyy" @change="changeDate($event)"></e-date-picker>
          </el-col>
          <el-col :span="10" :offset="2">
            <div class="label">Due Date</div>
            <div style="font-size: 16px; color: #888888">
              {{ issueBook.due_date }}
            </div>
          </el-col>
        </el-row>
      </el-card>
      <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px">
        <el-col style="float: right" :span="9">
          <e-button :span="15" label="Cancel" width="180" css="cancel_btn" type="default" class="p-45"></e-button>
          <e-button :span="8" label="Issue Book" width="180" css="float-right" class="p-45" @click="insertIssueBook" ></e-button>
        </el-col>
      </el-row>
    </e-container>
    <e-dialog :title="'View Issue Logs '" v-model="logModal" width="70%" top="20vh" noEsc :gutter="20" hideDefaultFooter @cancel="logModal = false" @confirm="logModal = false">
      <issue-log-modal />
    </e-dialog>
  </div>
</template>
<script>
import eDatePicker from '@/controls/eDatePicker.vue'
import { dispatchGraphql, dispatchGraphqlQuery, dispatchGraphqlMutation } from "@/api/dispatcher"
import moment from "moment"
export default {
  components: { eDatePicker },
  data:()=>({
    req: {},
    logModal: false,
    book: {},
    userFilter: {},
    usersData: {},
    bookData: {},
    bookSettings: {},
    issueBook: {
      status: "ISSUED",
      due_date: moment().format("YYYY-MM-DD")
    },
    userRole: [
      {
        label: "Admin",
        value: "Admin",
      },
      {
        label: "Parent",
        value: "Parent",
      },
      {
        label: "Employee",
        value: "Employee",
      },
      {
        label: "Student",
        value: "Student",
      },
      {
        label: "Institute_admin",
        value: "Institute_admin",
      },
      {
        label: "group",
        value: "group",
      },
      {
        label: "staff",
        value: "staff",
      },
    ],
    role: "",
  }),
  created() {
    this.getBookDetails()
    this.getUsers()
  },
  methods: {
    handleUser(user_id ) {
      this.issueBook.user_id = user_id
    },
    getUsers: function () {
      dispatchGraphqlQuery("users", ["id", "role", "admission_number", "first_name"]).then((response) => {
        this.usersData = response.users
        console.log("users", this.usersData)
      })
    },
    getBookDetails() {
      const query = `{
        books(where: {id: {_eq: "${this.$route.params.bookId}"}}) {
          id
          isbn_number
          name
          publisher
          academic_year_id
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.bookData = response.books[0]
         this.getDuedays()
      });
    },
    changeDate: function (value) {
      const selectedDate = new Date(value)
      const newDueData = new Date(
        selectedDate.setDate(selectedDate.getDate() + 7)
      )
      this.issueBook.due_date =  moment(newDueData).format("YYYY-MM-DD")
      this.issueBook.date_of_borrow = moment(value).format("YYYY-MM-DD")
    },
    getDuedays() {
      const query = `query($academic_year_id: uuid!){
        book_settings(where: {academic_year_id: {_eq: $academic_year_id }}) {
          academic_year_id
          due_days
        }
      }`
      dispatchGraphql(query, {academic_year_id: this.bookData.academic_year_id,}).then((response) => {
        this.bookSettings = response.book_settings[0]
      })
    },
    check() {
      if (this.role === "Admin") {
        this.userFilter = this.usersData.filter((x) => x.role === "admin")
        console.log("user", this.userFilter)
      } else if (this.role === "Parent") {
        this.userFilter = this.usersData.filter((x) => x.role === "parent")
        console.log("user", this.userFilter);
      } else if (this.role === "Employee") {
        this.userFilter = this.usersData.filter((x) => x.role === "employee")
        console.log("user", this.userFilter)
      } else if (this.role === "Student") {
        this.userFilter = this.usersData.filter((x) => x.role === "student")
        console.log("user", this.userFilter)
      } else if (this.role === "Institute_admin") {
        this.userFilter = this.usersData.filter((x) => x.role === "institute_admin")
        console.log("user", this.userFilter)
      } else if (this.role === "group") {
        this.userFilter = this.usersData.filter((x) => x.role === "group")
        console.log("user", this.userFilter)
      } else {
        this.userFilter = this.usersData.filter((x) => x.role === "staff")
        console.log("user", this.userFilter)
      }
    },
    getVariables() {
      this.issueBook.book_id = this.$route.params.bookId
      return this.issueBook
    },
    insertIssueBook() {
      dispatchGraphqlMutation("issue_returns",["id", "date_of_borrow", "book_id", "due_date", "user_id", "status"],this.getVariables()).then((response) => {
        console.log("show", response)
        this.issueBook = response
        this.$router.push(this.$url.LI_ISSUE_RETURN)
      })
    }
  }
}
</script>
<style>
.view-book__detail {
  position: fixed;
  top: 143px;
  right: 280px;
}
.view-issue__log {
  position: fixed;
  top: 143px;
  right: 80px;
}
.el-dialog__title {
  font-size: 24px;
  font-weight: 500;
  color: #4d4f5c;
}
</style>
