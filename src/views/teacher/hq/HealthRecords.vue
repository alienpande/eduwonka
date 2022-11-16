<template>
  <e-container
    pageTitle="Health Records"
    btnIcon="el-icon-plus"
    btnText="Add New Record"
    @btnClick="addNewRecords"
  >
    <p class="heading">
      
    </p>
    <e-table :filter="filter" :table="tableData" @pageInfo="ptest">
      <el-table-column label="Name">
        <template slot-scope="scope">
          <e-img-name
            :src="require('@/assets/images/profile.jpg')"
            :name="scope.row.student.first_name"
          />
        </template>
      </el-table-column>
      <el-table-column label="Roll Number" prop="student.roll_number"> </el-table-column>
      <el-table-column label="Admission No" prop="student.admission_number">
      </el-table-column>
      <el-table-column label="Primary Contact" prop="student.mobile_number">
      </el-table-column>
      <el-table-column label="Class-Section">
        <template slot-scope="scope">
          {{ getStandardSection(scope.row) }}
        </template>
      </el-table-column>
      <el-table-column label="Actions">
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
          <es-pagination :total="total" @pagination="pagination"></es-pagination>
  </e-container>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher"
import esPagination from '@/studentControl/esPagination'
export default {
  components: {
    esPagination
  },
  data() {
    return {
      ptest: "",
      studentId: "",
      filter: [
        // { text: "Class Section", disabled: true },
        // { text: "My Profile" },
        // { text: "Logout", divided: true },
      ],
      tableData: [],
      limit: 10,
      offset: 0,
      total: 0,
    }
  },
  created(){
    this.getStudents()
  },
  methods: {
    getStandardSection(val) {
      return val.student.section.standard.name + ' - ' + val.student.section.name
    },
    getVariables(){
      return{
        "limit": this.limit,
        "offset": this.offset
      }
    },
    pagination: function(object) {
      console.log('sssss', object)
      this.limit = object.limit
      this.offset = object.limit * (object.page - 1)
      console.log("bbbb", this.offset)
      this.getStudents(this.limit, this.offset)
    },
    getStudents: function() {
      const query = `query MyQuery($limit: Int, $offset: Int) {
        health_informations(limit: $limit, offset: $offset) {
          id
          student_id
          student{
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
        health_informations_aggregate(limit: $limit, offset: $offset)  {
          aggregate {
           count
          }
        }
      }`
      dispatchGraphql(query, this.getVariables()).then((response) => {
        this.tableData = response.health_informations
         this.total = response.health_informations_aggregate.aggregate.count
        this.tableData.map(x => {
          this.filter.push({
            text: (x.student.section.standard.name) + ' ' + (x.student.section.name)
          })
        })
        this.studentId = this.tableData[0].student.id
        console.log('students', this.filter)
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
