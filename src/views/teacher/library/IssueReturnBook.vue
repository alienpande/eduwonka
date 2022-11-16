<template>
  <div class="about">
    <e-container pageTitle="Issue, Return book">
      <el-tabs class="floatTabHeader" v-model="activeName">
        <el-tab-pane label="Issue Book" name="active">
             <el-row>
            <el-col style="color: #000000cc" class="fs-20 f-500" :span="18">
              Below is the list of books that are available for reservation or
              return
            </el-col>
            <el-col :span="4" :offset="2">
              <e-button
                width="160"
                @click="$router.push($url.LI_SCAN_TO_SEARCH)"
                label="Scan to search"
              ></e-button>
            </el-col>
          </el-row>
          <br />
          <el-row
            v-if="filter.length > 0"
            :gutter="20"
            style="
              padding: 20px 0px 20px 0px;
              margin: 0px 0px 5px 0px;
              background: white;
            "
          >
            <el-col :span="3" style="padding-left: 35px">
              <e-dropdown :list="filter" primary />
            </el-col>
            <el-col :span="3" style="padding-left: 35px" class="primary-text"
              ><e-dropdown :list="filter2" primary
            /></el-col>
            <el-col :span="3" style="color: #bc6c42; font-size: 16px"
              >Clear filter</el-col
            >
            <el-col style="padding-left: 10px" :offset="13" :span="1">
              <e-button
                icon="el-icon-search"
                :plain="true"
                css="bg-tranparent"
              ></e-button>
            </el-col>
          </el-row>
          <br />
          <div style="color: #00000099;" class="text-center fs-20 f-500">We have 60 books for biology.Tap to issue</div>
         
           <book-card
@cliks='$router.push($url.LI_ISSUE_DETAIL)'      v-for="(info, i) in bookCard"
      :key="i"
      :bookmark="info.bookmark"
      :status="info.status"
    />
           </el-tab-pane>
        <el-tab-pane label="Return Book" name="activeclassroom">
          <el-row>
            <el-col style="color: #000000cc" class="fs-20 f-500" :span="18">
              Below is the list of books that are available for reservation or
              return
            </el-col>
            <el-col :span="4" :offset="2">
              <e-button
                width="160"
                @click="$router.push($url.LI_SCAN_TO_SEARCH)"
                label="Scan to search"
              ></e-button>
            </el-col>
          </el-row>
          <br />
          <el-row
            v-if="filter.length > 0"
            :gutter="20"
            style="
              padding: 20px 0px 20px 0px;
              margin: 0px 0px 5px 0px;
              background: white;
            "
          >
            <el-col :span="3" style="padding-left: 35px">
              <e-dropdown :list="filter" primary />
            </el-col>
            <el-col :span="3" style="padding-left: 35px" class="primary-text"
              ><e-dropdown :list="filter2" primary
            /></el-col>
            <el-col :span="3" style="color: #bc6c42; font-size: 16px"
              >Clear filter</el-col
            >
            <el-col style="padding-left: 10px" :offset="13" :span="1">
              <e-button
                icon="el-icon-search"
                :plain="true"
                css="bg-tranparent"
              ></e-button>
            </el-col>
          </el-row>
          <br />
          <e-table :table="tableData" @pageInfo="ptest">
            <el-table-column label="Name" prop="name">
              <template slot-scope="scope">
                <div style="display: flex">
                  <img
                    style="width: 36px; height: 48px"
                    src="@/assets/images/book.png"
                    alt=""
                  />
                  <div style="margin: 10px 8px">{{ scope.row.name }}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="User ID" prop="UserID"> </el-table-column>
            <el-table-column label="User Name" prop="UserName">
            </el-table-column>

            <el-table-column label="Date of Borrow" prop="dateOfBorrow">
            </el-table-column>
            <el-table-column label="Due date" prop="Duedate">
              <template slot-scope="scope">
                <div style="display: flex">
                  <div v-if="scope.row.Overdue" style="color: #e60000">
                    {{ scope.row.Duedate }} <br />
                    <div style="text-align: center">Overdue</div>
                  </div>
                  <div v-else style="margin: 10px 8px">
                    {{ scope.row.Duedate }}
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="Action">
              <template slot-scope="scope">
                <img
                  @click="
                    $router.push($url.LI_RETURN_BOOK),
                      handleEdit(scope.$index, scope.row)
                  "
                  src="@/assets/images/sheareAction.png"
                  style="height: 50px; cursor: pointer"
                  alt=""
                />
                <img
                @click="$router.push($url.LI_ISSUE_VIEW_DETAIL)"
                  src="@/assets/images/3dot-action.png"
                  alt=""
                  style="cursor: pointer"
                />
              </template>
            </el-table-column>
          </e-table>
        </el-tab-pane>
      </el-tabs>
    </e-container>
  </div>
</template>
<script>
export default {
  data: () => ({
    activeName: "active",
    filter: [
      { text: "Standard" },
      { text: "Standard 2" },
      { text: "Standard 3" },
    ],
    filter2: [
      { text: "Subject" },
      { text: "Subject 1" },
      { text: "Subject 2" },
    ],
    tableData: [
      {
        name: "Ipsum dolor",
        UserID: "34756",
        UserName: "Lorem Ipsum",
        dateOfBorrow: "01-02-2020",
        Duedate: "01-02-2020",
        Overdue: true,
      },
      {
        name: "Ipsum dolor",
        UserID: "34756",
        UserName: "Lorem Ipsum",
        dateOfBorrow: "01-02-2020",
        Duedate: "01-02-2020",
        Overdue: true,
      },
      {
        name: "Ipsum dolor",
        UserID: "34756",
        UserName: "Lorem Ipsum",
        dateOfBorrow: "01-02-2020",
        Duedate: "01-02-2020",
      },
      {
        name: "Ipsum dolor",
        UserID: "34756",
        UserName: "Lorem Ipsum",
        dateOfBorrow: "01-02-2020",
        Duedate: "01-02-2020",
      },
      {
        name: "Ipsum dolor",
        UserID: "34756",
        UserName: "Lorem Ipsum",
        dateOfBorrow: "01-02-2020",
        Duedate: "01-02-2020",
      },
      {
        name: "Ipsum dolor",
        UserID: "34756",
        UserName: "Lorem Ipsum",
        dateOfBorrow: "01-02-2020",
        Duedate: "01-02-2020",
      },
      {
        name: "Ipsum dolor",
        UserID: "34756",
        UserName: "Lorem Ipsum",
        dateOfBorrow: "01-02-2020",
        Duedate: "01-02-2020",
      },
      {
        name: "Ipsum dolor",
        UserID: "34756",
        UserName: "Lorem Ipsum",
        dateOfBorrow: "01-02-2020",
        Duedate: "01-02-2020",
      },
      {
        name: "Ipsum dolor",
        UserID: "34756",
        UserName: "Lorem Ipsum",
        dateOfBorrow: "01-02-2020",
        Duedate: "01-02-2020",
      },
      {
        name: "Ipsum dolor",
        UserID: "34756",
        UserName: "Lorem Ipsum",
        dateOfBorrow: "01-02-2020",
        Duedate: "01-02-2020",
      },
      {
        name: "Ipsum dolor",
        UserID: "34756",
        UserName: "Lorem Ipsum",
        dateOfBorrow: "01-02-2020",
        Duedate: "01-02-2020",
      },
      {
        name: "Ipsum dolor",
        UserID: "34756",
        UserName: "Lorem Ipsum",
        dateOfBorrow: "01-02-2020",
        Duedate: "01-02-2020",
      },
      {
        name: "Ipsum dolor",
        UserID: "34756",
        UserName: "Lorem Ipsum",
        dateOfBorrow: "01-02-2020",
        Duedate: "01-02-2020",
      },
      {
        name: "Ipsum dolor",
        UserID: "34756",
        UserName: "Lorem Ipsum",
        dateOfBorrow: "01-02-2020",
        Duedate: "01-02-2020",
      },
    ],
     bookCard: [
      {
        status: "Available",
        bookmark: "mark",
      },
      {
        status: "Available",
        bookmark: "unmark",
      },
      {
        status: "Available",
        bookmark: "unmark",
      },
      {
        status: "Available",
        bookmark: "unmark",
      },
      {
        status: "Available",
        bookmark: "mark",
      },

      {
        status: "Available",
        bookmark: "mark",
      },
      {
        status: "Available",
        bookmark: "unmark",
      },
      {
        status: "Available",
        bookmark: "unmark",
      },
    ],
  }),
  methods: {
    ptest(d) {
      console.log(d);
    },
  },
};
</script>
