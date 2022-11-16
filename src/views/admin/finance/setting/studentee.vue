<template>
  <div>
    <e-container pageTitle="Student Fee Line Item" btnIcon="el-icon-plus" btnText="Create Student Fee" @btnClick="$router.push($url.FI_SETTING_STUDENT_CREATE + '/new')">
      <div class="sub-headers">
        Choose the standard to Add/Edit student fees line item
      </div>
      <el-row :gutter="20" style="padding: 15px 0px 5px 0px; margin: 0px 0px 5px 0px; background: white; height: 80px;">
        <el-col :span="5" style="padding-left: 35px">
          <!-- <e-dropdown :list="filter" primary /> -->
          <el-dropdown @command="handleStandard">
            <span class="el-dropdown-link primary-text" primary>
              Standard<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in sections" :key="item" :command="item.id">{{ (item.standard.name + ' ' + item.name) }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <!-- <el-col :span="3" style="padding-left: 35px">
          <e-dropdown :list="filter" primary />
        </el-col> -->

        <el-col :span="3" class="primary-text">
          <div @click="getSections()">Clear filter</div>
        </el-col>
        <el-col style="padding-left: 10px" :span="1" :offset="12">
          <e-button icon="el-icon-search" :plain="true" css="bg-tranparent" />
        </el-col>
      </el-row>
      <br />
      <e-table :table="students">
        <el-table-column label="Student" prop="Name">
          <template slot-scope="scope">
            <e-img-name :src="require('@/assets/images/profile.jpg')" :name="scope.row.first_name" />
          </template>
        </el-table-column>
        <el-table-column label="Standard" prop="Standard">
          <template slot-scope="scope">
            {{ scope.row.section.standard.name + ' ' + scope.row.section.name }}
          </template>
        </el-table-column>

        <el-table-column style="width: 26rem" label="Total amount" prop="Amount">
          <template slot-scope="scope">
            {{ getAmount(scope.row) }}
          </template>
        </el-table-column>
        <!-- <el-table-column style="width: 26rem"> </el-table-column> -->
        <el-table-column label="Action">
          <template slot-scope="scope">
            <e-svg style="margin-right: 10px" @click="$router.push($url.FI_SETTING_STUDENT_CREATE + `/${scope.row.id}`)" icon="pens" ></e-svg>
          </template>
        </el-table-column>
      </e-table>
    </e-container>
  </div>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher"
export default {
  data: () => ({
    sections: [],
    sectionIds: [],
    students: []
  }),
  created() {
    this.getSections()
  },
  methods: {
    getSections() {
      const query = `query {
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
        console.log(response)
        this.sectionIds = response.sections.map(x => x.id)
        this.sections = response.sections
        this.getStudents()
      })
    },
    getVariables() {
      console.log('ids', this.sectionIds)
      return {
        "ids": this.sectionIds
      }
    },
    getStudents() {
      const query = `query($ids: [uuid!]) {
        users(order_by: {first_name: asc}, where: {_and: [{role: {_eq: "student"}}, {section_id: {_in: $ids}}]}) {
          id
          first_name
          section {
            id
            name
            standard {
              id
              name
            }
          }
          student_fee_line_items {
            id
            default_amount
          }
        }
      }`
      dispatchGraphql(query, this.getVariables()).then((response) => {
        console.log(response)
        this.students = response.users
      })
    },
    getAmount(row) {
      var sum = 0
      row.student_fee_line_items.map(x => {
        sum = sum + x.default_amount
      })
      return sum
    },
    handleStandard(value) {
      this.sectionIds = []
      this.sectionIds[0] = value
      this.getStudents()
    }
  }
};
</script>
