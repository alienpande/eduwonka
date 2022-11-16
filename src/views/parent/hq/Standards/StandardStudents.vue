<template>
  <e-container pageTitle="Students">
    <el-tabs class="floatTabHeader" v-model="dynamicSection">
      <el-tab-pane
        v-for="(s, index) in standardMenu.sections"
        :key="index"
        :label="standardMenu.standard + ' - ' + s.name"
        :name="s.name"
      >
        <e-dashcard :obj="studentReport" />
        <el-row style="margin-top: 1rem; margin-bottom: 2rem">
          <el-col :span="21">
            <p class="title">
              List of students present in
              {{ standardMenu.standard + " - " + s.name }}
            </p>
          </el-col>
          <e-button
            :span="3"
            class="btn"
            icon="el-icon-plus"
            label="Add Student"
            @click="addStudentDialog = true"
          />
        </el-row>
        <e-table :table="tableData" @pageInfo="ptest">
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

        <e-dialog
          :title="
            'Add Students to Standard ' + standardMenu.standard + '-' + s.name
          "
          v-model="addStudentDialog"
          width="60%"
          top="20vh"
          noEsc
          :gutter="20"
          hideDefaultFooter
          @cancel="addStudentDialog = false"
          @confirm="addStudentDialog = false"
        >
          <el-col
            :span="24"
            style="
              margin-bottom: 40px;
              margin-top: -30px;
              padding-bottom: 20px;
              font-size: 12px;
              border-bottom: 2px solid rgb(252, 223, 189);
            "
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu
            venenatis tellus. Fusce faucibus est vitae facilisis consectetur.
          </el-col>
          <el-row class="student-profiles-container">
            <student-profile-card
              v-for="(s, index) in students"
              :key="index"
              :disabled="s.section != dynamicSection"
              v-model="s.status"
              :name="s.name"
              :src="s.img"
            />
          </el-row>  
        </e-dialog>
      </el-tab-pane>
    </el-tabs>
  </e-container>
</template>
<script>
import { mapGetters } from "vuex";
import StudentProfileCard from "@/components/hq/Standards/StudentProfileCard.vue";
export default {
  components: { StudentProfileCard },
  data() {
    return {
      s1: true,
      s2: false,
      s3: false,
      students: [
        {
          name: "Mayank Jhawar",
          img: require("@/assets/images/profile.jpg"),
          status: false,
          section: "A",
        },

        {
          name: "Mayank Jhawar",
          img: require("@/assets/images/profile.jpg"),
          status: true,
          section: "A",
        },

        {
          name: "Mayank Jhawar",
          img: require("@/assets/images/profile.jpg"),
          status: false,
          section: "C",
        },

        {
          name: "Mayank Jhawar",
          img: require("@/assets/images/profile.jpg"),
          status: true,
          section: "A",
        },
        {
          name: "Mayank Jhawar",
          img: require("@/assets/images/profile.jpg"),
          status: false,
          section: "A",
        },

        {
          name: "Mayank Jhawar",
          img: require("@/assets/images/profile.jpg"),
          status: true,
          section: "A",
        },

        {
          name: "Mayank Jhawar",
          img: require("@/assets/images/profile.jpg"),
          status: false,
          section: "C",
        },

        {
          name: "Mayank Jhawar",
          img: require("@/assets/images/profile.jpg"),
          status: true,
          section: "A",
        },
      ],
      addStudentDialog: false,
      dynamicSection: null,
      filter: [
        { text: "Class Section", disabled: true },
        { text: "My Profile" },
        { text: "Logout", divided: true },
      ],
      studentReport: [
        {
          title: "Total Students",
          value: "60",
          icon: "hq/student",
        },
        {
          title: "Total Boys",
          value: "30",
          icon: "hq/boy",
        },
        {
          title: "Total Girls",
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
