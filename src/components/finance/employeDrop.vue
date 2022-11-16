<template>
  <div>
    <el-row style="background: white; padding: 20px 20px 0 20px">
      <el-col style="box-shadow: 0px 1px 3px #11111112; border: 1px solid #cccccc; border-radius: 4px 4px 0px 0px;">
        <div class="lorem-box" v-for="(selected, index) in selectedEmployees" :key="index">
          <div>{{ selected.first_name }}</div>
          <img src="@/assets/images/loremCross.png" @click="deleteSelection(index)" />
        </div>
        <!-- <img src="@/assets/images/lineDot.png" style="display: inline-block; margin-bottom: -12px; margin-left: -6px; margin-right: 6px;" alt="" />
        <div class="fs-16 f-500 numberFive">5</div> -->
        <e-svg style="display: inline-block; transform: rotate(90deg); margin-left: 22px; cursor: pointer;" :class="{'rotate-90' : boxShow}" icon="arrow" @click="boxShow=!boxShow" />
      </el-col>
      <el-col v-if="!boxShow" :span="3" :offset="20" style="padding-bottom:20px">
        <br/>
        <e-button label="Proceed" width="200" @click="handleGroup" />
        <br/>
      </el-col>
    </el-row>
    <el-row v-if="boxShow" style="background: white; padding: 0 20px">
      <el-col style="box-shadow: 0px 1px 3px #11111112; border: 1px solid #cccccc; border-radius: 4px 4px 0px 0px; display: flex;">
        <div  class="search-employe" style="padding: 9px 0; position: relative;width:80%">
          <img style="position: absolute; left: 19px; top: 14px" src="@/assets/images/search-icon.png" alt="" />
          <input type="text" placeholder="Search" name="" id="" style="width:85%;" />
        </div>
        <div  style="color: #bc6c42; font-weight: 500; margin: 12px 0 0 38px">
          Clear all
        </div>
      </el-col>
    </el-row>
    <el-row v-if="boxShow" style="background: white; padding: 0 20px" >
      <el-col style="box-shadow: 0px 1px 3px #11111112; border: 1px solid #cccccc; border-radius: 4px 4px 0px 0px; display: flex; padding: 20px; width: 100%; height: 460px; overflow-x: auto; overflow-y:hidden; flex-wrap: wrap; flex-direction: column;">
        <div class="employe-check" v-for="(check,i) in checkBox" :key="i" style="height: 450px; width: 356px; display: flex; flex-flow: column wrap; flex-wrap: wrap;">
          <!-- <div style="color: #bc6c42; font-size: 20px; font-weight: 600; margin-left: 15px; margin-bottom: 7px;">
           {{ check.latter }}
          </div> -->
          <div v-for="(employee, i) in employees" :key="i" style="margin: 5px 15px">
            <el-checkbox v-model="employee.check" @change="handleSelected(employee, i)"></el-checkbox>
            <div style="color: #00000099; display: inline-block; margin-left: 10px">
              {{ employee.first_name }}
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { dispatchGraphqlQuery } from "@/api/dispatcher"
export default {
  components:{ },
  props: {
    employees: {
      type: Array
    }
  },
  data:() => ({
    campus: {},
    selectedEmployees: [],
    boxShow: false,
    checkBox: [
      {
        latter:'A'
      }
    ]
  }),
  created() {
    this.getCampus()
  },
  methods: {
    getCampus() {
      dispatchGraphqlQuery('campuses', ['id', 'name']).then((response) => {
        this.campus = response.campuses[0]
        console.log(this.campus)
      })
    },
    handleSelected(val, i) {
      if (val.check) {
        this.selectedEmployees.push({
          id: val.id,
          first_name: val.first_name
        })
      } else {
        this.selectedEmployees.splice(i, 1)
      }
      console.log('this', this.selectedEmployees)
    },
    deleteSelection(i) {
      this.selectedEmployees.splice(i, 1)
    },
    handleGroup() {
      localStorage.setItem('group', this.selectedEmployees.map(x => x.id))
      this.$router.push(this.$url.FI_PAYSLIP_CREATE + '/' + this.campus.id)
    }
  }
}
</script>
<style>

.numberFive {
  color: rgba(0, 0, 0, 0.6);
  box-shadow: rgb(17 17 17 / 7%) 0px 1px 3px;
  border-radius: 4px;
  background: 0% 0% no-repeat padding-box padding-box rgb(188 108 66 / 20%);
  width: 54px;
  text-align: center;
  padding: 6px 0;
  display: inline-block;
  margin-left: 30px;
}
.search-employe input {
  border: 1px solid #ba6b41;
  border-radius: 4px;
  width: 818px;
  color: #bc6c42;
  font-size: 16px;
  padding: 8px 38px;
  margin-left: 10px;
}
.search-employe input::placeholder {
  color: #bc6c42;
}
.employe-check .el-checkbox__inner {
  background: #fcdfbd66;
}
.rotate-90{
    transform: rotate(-90deg) !important;
}
</style>
