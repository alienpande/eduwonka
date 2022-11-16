<template>
  <div>
    <e-container pageTitle="Payslip Line item">
      <!-- <div class="sub-headers"></div> -->
      <div class="heading">School Details</div>
      <el-card shadow="none">
        <e-input v-model="school.name" label="School Name" readonly />
        <e-input v-model="school.address" label="School Address" readonly />
        <div class="label">Payslips Screen Logo</div>

        <div class="upload-btn-wrappers" style="position:relative">
          <div class="btn-er" style="height: 235px; border: 2px dashed #00000066; margin: 20px">
            <e-svg class="upload-icon" style="margin: 18px 0 20px 0" icon="finance/upload" />
            <div style="color: #00000066; font-size: 18px; text-align: center">
              Drag and drop files here
            </div>
            <div style="color: #00000066; text-align: center">or</div>
            <div style="border: 1px solid rgb(188, 108, 66); border-radius: 3px; width: 164px; height: 31px; color: rgb(188, 108, 66); text-align: center; font-size: 14px; padding-top: 7px; display: block; margin: auto;">
              Browse files
            </div>
          </div>
          <input type="file" name="myfile" />
        </div>
      </el-card>
      <div class="heading">Custom Field</div>
      <el-card shadow="none">
        <el-row>
          <el-col :span="10" style="border-right: 1px solid rgb(188 108 66 / 20%);">
            <div style="color: #000000cc; font-size: 20px">Earning</div>
            <br/>
            <div style="display: flex;margin-bottom:15px" v-for="(earning,i) in earnings" :key="i">
              <input v-model="earning.name" style="box-shadow: 0px 1px 3px #11111112; border: 1px solid #cccccc; border-radius: 4px;color: #00000099;font-size:16px;padding:0 10px; margin-right:10px; width: 307px;" type="text" placeholder="Basic & DA" />
              <img @click="deleteEarning(i)" src="@/assets/images/custom-del-icon.png" alt="" />
            </div>
            <e-button css='sort-icon' @click="addEarning" :plain='true' label='Add more' icon='el-icon-plus'></e-button>
          </el-col>
           <el-col :span="10" :offset="1">
            <div style="color: #000000cc; font-size: 20px">Deduction</div>
            <br/>
            <div style="display: flex;margin-bottom:15px" v-for="(deduction,i) in deductions" :key="i">
              <input v-model="deduction.name" style="box-shadow: 0px 1px 3px #11111112; border: 1px solid #cccccc; border-radius: 4px;color: #00000099;font-size:16px;padding:0 10px; margin-right:10px; width: 307px;" type="text" placeholder="Tax" />
              <img @click="deleteDeduction(i)" src="@/assets/images/custom-del-icon.png" alt="" />
            </div>
            <e-button css='sort-icon' @click="addDeduction" :plain='true' label='Add more' icon='el-icon-plus'></e-button>
          </el-col>
        </el-row>
      </el-card>
        <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px">
        <el-col class="float-right" :span="12">
          <e-button :span="16" label="Cancel" width="180" css="cancel_btn" type="default" class="p-45" />
          <e-button :span="6" label="Create" width="180" @click="handleClick" css="float-right" class="p-45" />
        </el-col>
      </el-row>
    </e-container>
  </div>
</template>
<script>
import { dispatchGraphql, dispatchGraphqlQueryByPk } from "@/api/dispatcher"
export default {
  data:() => ({
    earnings: [],
    deductions: [],
    school: {},
    payslipLine: [],
  }),
  created() {
    this.getCampus()
  },
  methods: {
    getCampus() {
      dispatchGraphqlQueryByPk('campuses',['id', 'name', 'address', 'payslip_attachment_id'], { id: this.$route.params.campusId }).then((response) => {
        this.school = response.campuses_by_pk
        this.addEarning()
        this.addDeduction()
      })
    },
    addEarning() {
      this.earnings.push({
        name: ""
      })
    },
    deleteEarning(i) {
      this.earnings.splice(i, 1)
    },
    addDeduction() {
      this.deductions.push({
        name: ""
      })
    },
    deleteDeduction(i) {
      this.earnings.splice(i, 1)
    },
    handleClick() {
      const earning = this.earnings.map(x => x.name)
      const deduction = this.deductions.map(x => x.name)
      if (this.earnings) {
        this.payslipLine.push({
          campus_id: this.$route.params.campusId,
          payslip_line_item_type: 'Earnings',
          custom_fields: earning
        })
      } 
      if (this.earnings) {
        this.payslipLine.push({
          campus_id: this.$route.params.campusId,
          payslip_line_item_type: 'Deductions',
          custom_fields: deduction
        })
      }
      console.log('save', this.payslipLine)
      const mutation = `mutation($objects: [payslip_line_items_insert_input!]!) {
        insert_payslip_line_items(objects: $objects) {
          returning {
            id
          }
        }
      }`
      dispatchGraphql(mutation, { objects: this.payslipLine }).then((response) => {
        console.log(response)
        this.getCampus()
      })
    }
  }
}
</script>
<style>
.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
}
.upload-btn-wrappers input[type="file"] {
  font-size: 2rem;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  height: 287px;
  width: 72rem;
}
.btn-er {
  border: 2px solid gray;
  color: gray;
  background-color: white;
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: bold;
}
.upload-icon img {
  display: block;
  margin: auto;
}
</style>
