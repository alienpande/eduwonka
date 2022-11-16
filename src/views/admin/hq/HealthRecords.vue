<template>
  <e-container
    class="hq-health"
    pageTitle="Health Records"
    btnIcon="el-icon-plus"
    btnText="Add New Record"
    @btnClick="addNewRecords"
  >
    <p class="heading">Below is the list of Student Health Records for each Standard</p>
    <!-- <el-col style="color: #000000cc" class="heading-text f-500" :span="24"> -->
      
    <!-- </el-col> -->
    <el-row  class="searchCard">
      <el-col :span="5"  class="dropdown-tab">
        <el-dropdown @command="handleStandard">
          <span class="el-dropdown-link primary-text text" primary>
            Standard<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in sections" :key="item.id" :command="item.id">{{ item.standard.name + ' ' + item.name }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="3" class=" primary-text dropdown-tab">
        <div @click="getSections()" class="text"> Clear filter </div>
      </el-col>
          <el-col :span="2"  class="dropdown-tab">
            <e-button
              icon="el-icon-search"
              :plain="true"
              type="primary"
            ></e-button>
          </el-col>      
    </el-row><br />
    <e-table :table="tableData" @pageInfo="ptest">
      <el-table-column label="Name" width="165px">
        <template slot-scope="scope">
          <e-img-name
            :src="require('@/assets/images/profile.jpg')"
            :name="scope.row.student.first_name"
          />
        </template>
      </el-table-column>
      <el-table-column label="Roll Number" prop="student.roll_number"  />
      <el-table-column label="Admission No" prop="student.admission_number"  />
      <el-table-column label="Primary Contact" prop="student.mobile_number"  />
      <el-table-column label="Class-Section" >
        <template slot-scope="scope">
          {{ getStandardSection(scope.row) }}
        </template>
      </el-table-column>
      <el-table-column label="Actions" >
        <template slot-scope="scope">
          <e-button
            :span="12"
            size="mini"
            label=""
            plain
            type=""
            icon="el-icon-view"
            @click="handleEdit(scope.$index, scope.row)"
          />
        </template>
      </el-table-column>
    </e-table>
    <es-pagination class="pagination" :total="total" @pagination="pagination"></es-pagination>
  </e-container>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher"
import esPagination from '@/studentControl/esPagination'
import { mapMutations } from 'vuex'
export default {
  components: {
    esPagination
  },
  data() {
    return {
      sections: [],
      ptest: "",
      tableData: [],
      limit: 10,
      offset: 0,
      total: 0,
    }
  },
  mounted() {
    this.hideAsideMenuMobile()
  },
  created() {
    // this.getStudents()
    this.getSections()
  },
  methods: {
    ...mapMutations("Common",["hideAsideMenuMobile"]),
    handleStandard(val) {
      this.sectionIds = []
      this.sectionIds[0] = val
      this.getStudents()
    },
    getStandardSection(val) {
      return val.student.section.standard.name + ' - ' + val.student.section.name
    },
    getVariables(){
      return{
        "limit": this.limit,
        "offset": this.offset,
        "sectionIds": this.sectionIds
      }
    },
    pagination: function(object) {
      this.limit = object.limit
      this.offset = object.limit * (object.page - 1)
      this.getStudents(this.limit, this.offset)
    },
    getSections() {
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
    getStudents() {
      const query = `query MyQuery($limit: Int, $offset: Int, $sectionIds: [uuid!]) {
        health_informations(limit: $limit, offset: $offset, where: {student: {section_id: {_in: $sectionIds}}}) {
          id
          student_id
          student {
            id
            first_name
            mobile_number
            admission_number
            roll_number
            section {
              id
              name
              standard {
                id
                name
              }
            }
          }
        }
        health_informations_aggregate(where: {student: {section_id: {_in: $sectionIds}}})  {
          aggregate {
           count
          }
        }
      }`
      dispatchGraphql(query, this.getVariables()).then((response) => {
        this.tableData = response.health_informations
        this.total = response.health_informations_aggregate.aggregate.count
      })
    },
    addNewRecords() {
      this.$router.push(this.$url.HQ_STUDENT_HEALTH_RECORD_FORM)
    },
    handleEdit(i, data) {
      console.log('hhhhhhhhhhh', data)
      console.log(i, data);
      this.$router.push(this.$url.HQ_HEALTH_RECORD_VIEW + "/" +data.student.id)
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