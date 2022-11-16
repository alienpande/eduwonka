<template>
  <e-container 
    class="hq-student"  
    pageTitle="Students"
    btnIcon="el-icon-plus"
    btnText="Add Student"
    @btnClick="addNewStudent"
  >
    <el-tabs class="floatTabHeader" v-model="activeName">
      <el-tab-pane label="Active" name="Active">
        <p class="heading">Below is the list of active Students for this academic year</p>
        <e-dashcard :obj="activeStudentReport">

          <!--<template #header>
            hello
          </template>-->
        </e-dashcard>

        <el-row class="searchCard">
          <el-col :span="5" class="dropdown-tab" >
            <el-dropdown @command="handleStandard">
              <span class="el-dropdown-link primary-text text" primary>
                Standard<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="item in sections" :key="item.id" :command="item.id">{{ item.standard.name + ' ' + item.name }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="3" class="primary-text dropdown-tab">
            <div @click="getStandards()" class="text"> Clear filter </div>
          </el-col>
          <el-col :span="2"  class="dropdown-tab">
            <e-button
              icon="el-icon-search"
              :plain="true"
              type="primary"
            ></e-button>
          </el-col>
        </el-row>
        <e-table :table="students" shadow>
          <el-table-column label="Photo" width="auto">
            <template slot-scope="scope">
              <div class="">
                <e-img-name v-if="scope.row.attachment"
                  :src="base_url + scope.row.attachment.file_url"
                  :name="scope.row.name"
                />
                <e-img-name v-else
                  :src="require('@/assets/images/profile.jpg')"
                  :name="scope.row.name"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Name" prop="first_name" width="auto">
          </el-table-column>
          <el-table-column label="Roll Number" prop="roll_number" width="auto">
          </el-table-column>
          <el-table-column label="Admission No" prop="admission_number" width="auto">
          </el-table-column>
          <el-table-column label="Primary Contact" prop="mobile_number" width="auto">
          </el-table-column>
          <el-table-column label="Class-Section" width="110">
            <template slot-scope="scope">
              {{ getStandardSection(scope.row) }}
              <!-- {{scope.row.attachment ? scope.row.attachment.id : ''}} -->
            </template>
          </el-table-column>
          <el-table-column label="Action" width="110">
            <template slot-scope="scope">
              <img
                @click="handleEdit(scope.$index, scope.row)"
                src="@/assets/images/downAction.png"
                alt=""
              />
              <img
                @click="handleEdit(scope.$index, scope.row)"
                src="@/assets/images/3dot-action.png"
                style="height:41px"
                alt=""
              />
            </template>
          </el-table-column>
        </e-table>
      </el-tab-pane>
      <el-tab-pane label="Inactive" name="Inactive">
        <p class="heading">Below is the List of Students who left in this academic Year</p>
        <e-dashcard :obj="inActiveStudentReport">
          <!-- <template #header>
            
          </template> -->
        </e-dashcard>
        <el-row class="searchCard">
          <el-col :span="5"  class="dropdown-tab" >
            <el-dropdown @command="handleStandard">
              <span class="el-dropdown-link primary-text text" primary>
                Standard<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="item in sections" :key="item.id" :command="item.id">{{ item.standard.name + ' ' + item.name }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="3" class="primary-text dropdown-tab" >
            <div @click="getStandards()" class="text"> Clear filter </div>
          </el-col>
          <el-col :span="2"  class="dropdown-tab">
            <e-button
              icon="el-icon-search"
              :plain="true"
              type="primary"
            ></e-button>
          </el-col>
        </el-row>
        <e-table :table="students">
          <el-table-column label="Name" prop="first_name" width="auto" />
          <el-table-column label="Roll Number" prop="roll_number" width="auto" />
          <el-table-column label="Admission number" prop="admission_number" width="auto" />
          <el-table-column label="Date of leaving" prop="date_of_exit" width="auto" />
          <el-table-column label="Class-Section" width="auto">
            <template slot-scope="scope">
              {{ getStandardSection(scope.row) }}
            </template>
          </el-table-column>
        </e-table>
      </el-tab-pane>
    </el-tabs>
    <pagination :total="total" @pagination="pagination" />
  </e-container>
</template>
<script>
import Pagination from '@/components/Pagination'
import { dispatchGraphql } from "@/api/dispatcher"
import _ from "lodash"
import { mapMutations } from 'vuex'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      sections: [],
      sectionIds: [],
      activeName: "Active",
      users: [],
      students: [],
      total: 0,
      offset: 0,
      page: 1,
      limit: 10,
      base_url: process.env.VUE_APP_BASE_API,
      filter: [
        { text: "Class Section", disabled: true },
        { text: "My Profile" },
        { text: "Logout", divided: true },
      ],
      activeStudentReport: [
        {
          title: "Total Students",
          value: "",
          icon: "hq/student",
        },
        {
          title: "Total Boys",
          value: "",
          icon: "hq/boy",
        },
        {
          title: "Total Girls",
          value: "",
          icon: "hq/girl",
        },
      ],
      inActiveStudentReport: [
        {
          title: "Total Students",
          value: "",
          icon: "hq/student",
        },
        {
          title: "Total Boys",
          value: "",
          icon: "hq/boy",
        },
        {
          title: "Total Girls",
          value: "",
          icon: "hq/girl",
        },
      ],
    }
  },
  watch: {
    activeName: _.debounce(function() {
      if (this.activeName === "Inactive") {
        this.getStudents()
      } else {
        this.getStudents()
      }
    })
  },
  mounted() {
    this.hideAsideMenuMobile();
  },
  created(){
    this.getStandards()
    // this.getStudents()
    // console.log(this.specificStudentId)
  },
  methods: {
    ...mapMutations('Common',["hideAsideMenuMobile"]),
    handleStandard(val) {
      this.sectionIds = []
      this.sectionIds[0] = val
      this.getStudents()
    },
    getStandards() {
      const query = `query{
        sections {
          id
          name
          standard {
            id
            name
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.sections = response.sections
        this.sectionIds = this.sections.map(x => x.id)
        this.getStudents()
      })
    },
    getStandardSection(val) {
      return val.section.standard.name + ' - ' + val.section.name
    },
    addNewStudent() {
      this.$router.push(this.$url.HQ_STUDENT_FORM)
    },
    // ptest(d) {
    //   console.log(d)
    // },
    pagination: function(object) {
      this.limit = object.limit
      this.offset = object.limit * (object.page - 1)
      this.getStudents()
    },
    getvariables() {
      return {
        "limit": this.limit,
        "offset": this.offset,
        "sectionIds": this.sectionIds,
        "type": this.activeName
      }
    },
    getStudents() {
      const studentQuery = `query($type: String, $sectionIds: [uuid!]) {
        users(where: {_and: [{role:{_eq:"student"}, status:{_eq:$type}}, {section_id:{_in: $sectionIds}}]}) {
          id
          first_name
          gender
        }
      }`
      const query = `query($type: String, $limit: Int, $offset: Int, $sectionIds: [uuid!]) {
        users(limit: $limit, offset: $offset, where: {_and: [{role:{_eq:"student"}, status:{_eq:$type}}, {section_id:{_in: $sectionIds}}]}) {
          id
          first_name
          roll_number
          admission_number
          mobile_number
          gender
          section_id
          attachment {
            id
            file_url
          }
          section {
            id
            name
            standard_id
            standard {
              id
              name
            }
          }
        }
        users_aggregate(where: {_and: [{role:{_eq:"student"}, status:{_eq:$type}}, {section_id:{_in: $sectionIds}}]}) {
          aggregate {
           count
          }
        }
      }`
      dispatchGraphql(query, this.getvariables()).then((response) => {
        console.log("student data", response)
        this.students = response.users
        this.total = response.users_aggregate.aggregate.count
      })
      dispatchGraphql(studentQuery, { sectionIds: this.sectionIds, type: this.activeName }).then((response) => {
        this.users = response.users
        this.activeStudentReport[0].value = this.total
        if (this.activeName === 'Active') {
          this.activeStudentReport[0].value = this.users.length
          const boys = this.users.filter(data => (data.gender === 'male' || data.gender === 'Male'))
          this.activeStudentReport[1].value = boys.length
          const girls = this.users.filter(data => (data.gender === 'female' || data.gender === 'Female'))
          this.activeStudentReport[2].value = girls.length
        } else {
          this.inActiveStudentReport[0].value = this.users.length
          const boys = this.users.filter(data => (data.gender === 'male' || data.gender === 'Male'))
          this.inActiveStudentReport[1].value = boys.length
          const girls = this.users.filter(data => (data.gender === 'female' || data.gender === 'Female'))
          this.inActiveStudentReport[2].value = girls.length
        }
      })
    },
    handleEdit(i, data) {
      this.$router.push(this.$url.HQ_STUDENT_DETAILS + "/" + data.id)
    }
  }
}
</script>
<style scoped>
@media only screen and (device-width: 768px) {
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