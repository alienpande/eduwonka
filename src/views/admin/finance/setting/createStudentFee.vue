<template>
  <div>
    <e-container hideHeader pageTitle="Add Student fees line item" :back="$url.FI_SETTING_STUDENT_FEE">
      <div style="color: #000000cc; padding-bottom: 10px" class="fs-20 f-500">
        View Add or Edit standard fees line item
      </div>
      <el-card shadow="none" style="background: #fcdfbd66; padding: 0 20px 20px 20px">
        <el-row>
          <el-col :span="6">
            <div style="color: #00000099" class="fs-16 f-500">STANDARD</div>
            <div style="color: #000000cc" class="fs-16 f-600">{{ studentFeeLine.standard }}</div>
          </el-col>
          <el-col :span="6">
            <div style="color: #00000099" class="fs-16 f-500">Student</div>
            <div style="color: #000000cc" class="fs-16 f-600">{{ studentFeeLine.student }}</div>
          </el-col>
          <el-col :span="6">
            <e-button @click="addDocument=true" label="Change Details" css="sort-icon" :plain="true" />
          </el-col>
        </el-row>
      </el-card>
      <br />
      <el-card shadow="none">
        <el-row>
          <el-col class="standard-title" :span="9">Line Items</el-col>
          <el-col class="standard-title" :span="9">Total Amount (INR)</el-col>
          <el-col class="standard-title" :span="5">Actions</el-col>
        </el-row>
        <div v-for="(item, i) in studentFeeLineItems" :key="i">
          <el-row>
            <el-col class="standard-text" :span="9">{{ item.fee_line_item_type }}</el-col>
            <el-col class="standard-text" :span="9">{{ item.default_amount }}</el-col>
            <el-col class="standard-title" :span="5">
              <div style="display: flex; padding: 5px 0; padding-top: 5px">
                <e-svg style="margin-right: 10px" icon="pens" @click="editDialog = true" />
                <e-svg @click="deleteDialog=true" style="margin-right: 10px" icon="closes" />
                <e-svg icon="details"></e-svg>
              </div>
            </el-col>
          </el-row>
        </div>
        <el-row v-for="(item, i) in newLineItems" :key="i" style="margin-top: 10px">
          <el-col :span="9" style="padding-right: 20px">
            <el-select v-model="item.fee_line_item_type" placeholder="Select Line Item" @change="handleAmount(item.fee_line_item_type, i)">
              <el-option v-for="item in standardLineItems" :key="item.id" :label="item.fee_line_item_type" :value="item.fee_line_item_type" />
            </el-select>
          </el-col>
          <el-col :span="9" style="padding-right: 20px; overflow: hidden; height: 73px">
            <e-input v-model="item.default_amount" placeholder="Enter Amount" readonly></e-input>
          </el-col>
          <el-col class="d-flex" :span="5">
            <e-button :span="10" label="Done" css="sort-icon" plain />&emsp;
            <e-svg v-if="newLineItems.length > 1" style="margin-right: 10px; margin-top: 5px" icon="closes" @click="handleDelete(i)" />
          </el-col>
        </el-row>
        <e-button icon="el-icon-plus" :plain="true" label="Add Line Item" @click="addMore()" />
        <br />
        <br />
        <br />
      </el-card>
      <div class="heading">Total</div>
      <el-row>
        <el-col :span="10">
          <div style="color: #000000cc; font-size: 20px; font-weight: 500; padding: 10px 30px 10px 10px; background: #fcdfbd66;">
            {{ getTotal() }}
          </div>
        </el-col>
        <el-col :span="3" :offset="3">
          <e-button label="View Logs" css="sort-icon" :plain="true"></e-button>
        </el-col>
      </el-row>
      <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px">
        <el-col class="float-right" :span="11">
          <e-button :span="16" label="Cancel" width="180" css="cancel_btn" type="default" class="p-45" @click="$router.push($url.FI_SETTING_STUDENT_FEE)" />
          <e-button :span="6" label="Update" width="180" css="float-right" class="p-45" @click="handleClick" />
        </el-col>
      </el-row>
    </e-container>
    <e-dialog
      :title="'Choose student and standard '"
      v-model="addDocument"
      width="50%"
      top="20vh"
      noEsc
      :gutter="20"
      hideDefaultFooter
      @cancel="addDocument = false"
      @confirm="addDocument = false"
    >
      <el-row>
        <el-col :span="23">
          <div>
          <p>Student</p>
          </div>
          <el-select v-model="studentFeeLine.student_id" placeholder="Select Student" @input="getStandards(studentFeeLine.student_id)">
            <el-option v-for="student in students" :key="student.id" :label="student.first_name" :value="student.id" />
          </el-select>
          <!-- <e-select
            label="Student"
            placeholder="Select Student"
            v-model="req.Student"
            :options="standards"
          ></e-select> -->
        </el-col>
        <el-col :span="23">
          <e-select
            label="Standard"
            placeholder="Select Standard"
            v-model="studentFeeLine.standard"
            :options="standards"
            :optionName="'text'"
            :valueKey="'value'"
            @visible-change="handleStandard"
          ></e-select>
        </el-col>
        <br/><br/><br/><br/>
      </el-row><br/>
      <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px">
        <el-col class="float-right" :span="19">
          <e-button :span="15" label="Cancel" width="180" css="cancel-custom" type="default" class="p-45" @click="addDocument = false" />
          <e-button :span="9" label="Submit" width="180" css="float-right" class="p-45" @click="studentItems" />
        </el-col>
      </el-row>
    </e-dialog>
  </div>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher"

export default {
  data: () => ({
    newLineItems: [],
    loading: false,
    addDocument:false,
    studentFeeLine: {},
    studentFeeLineItems: [],
    students: [],
    standards: [],
    standardLineItems: []
  }),
  created() {
    this.getStudents()
    this.fillStandard()
    if (this.$route.params.studentId === 'new') {
      this.addDocument = true
    }
  },
  methods: {
    handleAmount(type, index) {
      const item = this.standardLineItems.filter(x => x.fee_line_item_type === type)[0]
      this.newLineItems[index].default_amount = item.default_amount
    },
    fillStandard() {
      if (!this.studentFeeLine.student_id && this.$route.params.studentId != 'new') {
        this.studentFeeLine.student_id = this.$route.params.studentId
      }
      this.addMore()
      this.studentItems()
    },
    getStudents() {
      this.loading = true
      const items = `query {
        users(where: {role: {_eq: "student"}}) {
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
        }
      }`
      dispatchGraphql(items).then((response) => {
        this.students = response.users
        console.log('students', this.students)
        const user = this.students.filter(x => x.id === this.studentFeeLine.student_id)[0]
        this.studentFeeLine.student = user.first_name
        this.studentFeeLine.standard = user.section.standard.name + ' ' + user.section.name
        this.getStudentStandard(user.section.standard.id)
      })
    },
    getStudentStandard(id) {
      const query = `query($id: uuid) {
        standard_fee_line_items(where: {standard_id: {_eq: $id}}) {
          id
          standard_id
          fee_line_item_type
          default_amount
        }
      }`
      dispatchGraphql(query, { id: id }).then((response) => {
        this.standardLineItems = response.standard_fee_line_items
        this.studentItems()
      })
    },
    handleStandard(value) {
      console.log('standard', value)
      this.studentFeeLine.standard = value
    },
    getStandards(value) {
      this.$router.push(this.$url.FI_SETTING_STUDENT_CREATE + `/${value}`)
      this.standards = []
      const user = this.students.filter(x => x.id === value)[0]
      this.studentFeeLine.student = user.first_name
      this.studentFeeLine.standard = user.section.standard.name + ' ' + user.section.name
      this.standards.push({
        text: (user.section.standard.name + ' ' + user.section.name),
        value: (user.section.standard.name + ' ' + user.section.name)
      })
      this.getStudentStandard(user.section.standard.id)
    },
    studentItems() {
      this.addDocument = false
      const items = `query($id: uuid) {
        student_fee_line_items(where: {student_id: {_eq: $id}}) {
          id
          student_id
          fee_line_item_type
          default_amount
        }
      }`
      dispatchGraphql(items, { id: this.studentFeeLine.student_id }).then((response) => {
        this.studentFeeLineItems = response.student_fee_line_items
        console.log('items', this.studentFeeLineItems)
      })
    },
    getTotal() {
      var sum = 0
      this.studentFeeLineItems.map(x => {
        sum = sum + x.default_amount
      })
      if (this.newLineItems.length > 0 && this.newLineItems[0].default_amount) {
        this.newLineItems.map(x => {
          sum = x.default_amount ? sum + parseInt(x.default_amount) : 0
        })
      }
      this.loading = false
      return sum
    },
    handleClick() {
      this.newLineItems.map(x => {
        x.student_id = this.studentFeeLine.student_id
      })

      console.log('stu', this.newLineItems)
      const mutation = `mutation($objects: [student_fee_line_items_insert_input!]!) {
        insert_student_fee_line_items(objects: $objects) {
          affected_rows
          returning {
            id
            student_id
            fee_line_item_type
            default_amount
          }
        }
      }`
      dispatchGraphql(mutation, { objects: this.newLineItems }).then((response) => {
        console.log(response)
        this.$notify({
          type: 'success',
          title: 'Items Saved',
        })
        this.$router.push(this.$url.FI_SETTING_STUDENT_FEE)
      })
    },
    addMore() {
       var lineItem = {
        fee_line_item_type: "",
        default_amount: ""
      }
      this.newLineItems.push(lineItem)
    },
    handleDelete(i) {
      this.newLineItems.splice(i, 1)
    }
  }
};
</script>
<style scoped>
.standard-title {
  color: #000000cc;
  font-size: 16px;
  font-weight: 500;
}
.standard-text {
  color: #00000099;
  font-size: 16px;
  padding: 15px 0;
}
</style>
