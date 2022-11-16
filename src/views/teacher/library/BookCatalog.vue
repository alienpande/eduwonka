<template>
  <div style="padding: 30px; height: 73vh; overflow: auto">
    <div style="display: flex; justify-content: space-between;padding-right:25px">
      <div class="f-500" style="font-size: 24px">Book Catalog</div>

      <e-button :span="3" @click="$router.push($url.LI_ADD_CATALOG)" label="Add new book" icon="el-icon-plus"></e-button>
    </div>
    <br />
    <el-row>
      <el-col :span="17">
        <div style="color: #000000cc" class="fs-20 f-500">
          Search a book to view/edit details, check availability bookmark or Reserve
        </div>
      </el-col>
      <el-col :span="3" :offset="4">
        <e-button @click="$router.push($url.LI_SCAN_CATALOG)" label="Scan to search" css="sort-icon" :plain="true">
        </e-button>
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
      <el-col :span="3" style="padding-left: 35px">
        <e-dropdown :list="filter" primary />
      </el-col>

      <el-col :span="2" style="color: #bc6c42; font-size: 16px"
        >Clear filter</el-col
      >
      <el-col style="padding-left: 10px" :offset="14" :span="1">
        <e-button
          icon="el-icon-search"
          :plain="true"
          css="bg-tranparent"
        ></e-button>
      </el-col>
    </el-row>
    <div
      style="
        color: #00000099;
        text-align: center;
        padding: 10px 0;
        font-size: 18px;
      "
    >
      We have <b>60</b>  books for biology
    </div>
    <book-card
      v-for="(info, i) in bookCard"
      @cliks='$router.push($url.LI_EDIT_CATALOG)'
      :key="i"
      :bookmark="info.bookmark"
      :status="info.status"
    />
  </div>
</template>
<script>
export default {
  data: () => ({
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
    bookCard: [
      {
        status: "Unavailable",
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
        status: "Unavailable",
        bookmark: "mark",
      },

      {
        status: "Unavailable",
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
};
</script>
