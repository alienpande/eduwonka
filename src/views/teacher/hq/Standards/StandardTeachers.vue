<template>
  <e-container pageTitle="Teachers">
    <el-tabs class="floatTabHeader" v-model="dynamicSection">
      <el-tab-pane
        v-for="(s, index) in standardMenu.sections"
        :key="index"
        :label="standardMenu.standard + ' - ' + s.name"
        :name="s.name"
      >
        <e-dashcard :obj="teachersReport" />
        <el-row style="margin-top: 1rem; margin-bottom: 2rem">
          <el-col :span="21">
            <p class="title">
              List of teachers present in
              {{ standardMenu.standard + " - " + s.name }}
            </p>
          </el-col>
          <e-button
            :span="3"
            class="btn"
            icon="el-icon-plus"
            label="Add Teacher"
            @click="addTeachearsDialog = true"
          />
        </el-row>
        <e-table :filter="filter" :table="tableData" @pageInfo="ptest">
          <el-table-column label="Date" prop="date"> </el-table-column>
          <el-table-column label="Name" prop="name"> </el-table-column>
          <el-table-column align="right">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >Edit</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >Delete</el-button
              >
            </template>
          </el-table-column>
        </e-table>
      </el-tab-pane>
    </el-tabs>
    <e-dialog
      title="Tips"
      v-model="addTeachearsDialog"
      width="30%"
      top="40vh"
      noEsc
      noPersist
      showFooterBorder
      @cancel="addTeachearsDialog = false"
      @confirm="addTeachearsDialog = false"
    >
      <span>This is a message</span>
    </e-dialog>
  </e-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      addTeachearsDialog: false,
      dynamicSection: null,
      filter: [
        { text: "Class Section", disabled: true },
        { text: "My Profile" },
        { text: "Logout", divided: true },
      ],
      teachersReport: [
        {
          title: "Total Teachers",
          value: "60",
          icon: "hq/student",
        },
        {
          title: "Total Male",
          value: "30",
          icon: "hq/boy",
        },
        {
          title: "Total Female",
          value: "30",
          icon: "hq/girl",
        },
      ],
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-04",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-08",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-06",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-07",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-08",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-06",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-07",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-08",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-06",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-07",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-08",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-06",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-07",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-08",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-06",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-07",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-08",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-06",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-07",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("Common", ["standardMenu"]),
  },
  created() {
    this.dynamicSection = this.standardMenu?.sections[0]?.name;
  },
  methods: {
    addNewStudent() {
      this.$router.push(this.$url.HQ_STUDENT_FORM);
    },
    ptest(d) {
      console.log(d);
    },
  },
};
</script>
