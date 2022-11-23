<template>
  <div >
    <e-container
    class="finance-add-fee-receipt"
      hideHeader
      pageTitle="Add Fee Student Selection"
      :back="$url.FI_FEE_RECEIPTS"
    >
      <div class="sub-headers title" :style="{'padding-left': window.width > 767 && '50px'}">
        Hi, Please choose the student for whom you want to create fee receipt.
      </div>
      <el-row>
        <el-col :span="window.width > 767 ? 15 : 20" :offset="window.width > 767 && 5">
          <e-select
            label="Standard"
            placeholder="Choose Standard"
            v-model="feeDetail.standard"
            :options="sections"
            :optionName="'label'"
            :valueKey="'value'"
            @visible-change ="handleStandard"
          ></e-select>
        </el-col>
        <el-col :span="window.width > 767 ? 15 : 24" :offset="window.width > 767 && 5">
          <e-select
            label="Student"
            placeholder="Choose Student"
            v-model="feeDetail.student"
            :options="students"
            :optionName="'label'"
            :valueKey="'value'"
            @visible-change ="handleStudent"
          ></e-select>
        </el-col>
      </el-row>
      <br />
      <el-row class="text-right" :style="window.width > 767 ? 'border-top: 1px solid #fcdfbd; margin-top: 20px' : 'border-top: 1px solid #fcdfbd; margin-top: 20px; padding-top: 20px;'">
        <e-button
          :span="window.width > 767 ? 18 : 12"
          label="Cancel"
          width="180"
          type="text"
          :class="window.width > 767 ? 'p-45 cancel-button-margin' : ''"
        ></e-button>
        <e-button
          :span="window.width > 767 ? 3 : 12"
          label="Proceed"
          width="180"
          @click="$router.push($url.FI_FEE_RECEIPTS_ADD + '/student/' + feeDetail.student)"
          css="float-right"
          :class="window.width > 767 ? 'p-45' : ''"
        ></e-button>
      </el-row>
    </e-container>
  </div>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher";
import screenSize from "@/mixins/screenSize"
export default {
  mixins: [screenSize],
  data: () => ({
    feeDetail: {},
    sections: [],
    students: [],
  }),
  created() {
    this.getsections()
    // this.getStudent()
  },
  methods: {
    getsections: function() {
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
        for (const item of response.sections) {
          this.sections.push({ value: item.id, label: item.standard.name + ' ' + item.name })
        }
        // this.sections = response.section
        console.log("sections", this.sections)
      })
    },
    getStudent() {
      const query = `query {
        users(where: {role: {_eq: "student"}}) {
          id
          first_name
          last_name
        }
      }`
      dispatchGraphql(query).then((response) => {
        for (const item of response.users) {
          this.students.push({ value: item.id, label: item.first_name + ' ' + item.last_name})
        }
        // this.students = response.users
        console.log("student", this.students)
      })
    },
    handleStandard(value) {
      this.feeDetail.standard = value
      this.students = []
      const query = `query($id: uuid) {
        users(where: {section_id: {_eq: $id}}) {
          id
          first_name
          last_name
        }
      }`
      dispatchGraphql(query, { id: value }).then((response) => {
        for (const item of response.users) {
          this.students.push({ value: item.id, label: item.first_name + ' ' + item.last_name})
        }
        // this.students = response.users
        console.log("student", this.students)
      })
    },
    handleStudent(value) {
      this.feeDetail.student = value
    }
  }
};
</script>
<style scoped>
.title {
  font-size: 20px;
  margin-bottom: 20px;
}
@media only screen and (device-width: 768px) {
  .title {
    font-size: 14px;
  }
  .cancel-button-margin {
    margin-right: 57px;
  }
}
</style>