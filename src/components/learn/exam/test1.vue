<template>
  <div style="padding: 30px">
  <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
  <el-row class="form-type-3">  
    <el-row :rules="rules">
      <el-col :span="6" style="margin-right: 33px">
        <e-input v-model="quickTest.name" name="Name of the Test" placeholder="Enter Name" rules="required" />
      </el-col>
      <el-col :span="5" style="margin-right: 33px">
        <div style="font-size: 16px; margin-bottom: 10px">
          Standard
        </div>
        <div style="box-shadow: 0px 1px 3px #11111112; border: 1px solid #cccccc; border-radius: 4px; background: white; padding: 10px;">
          {{ standard.name }}
        </div><br>
        <div style="display: inline-flex">
          <e-svg icon="Group" />
          <div style="margin-left: 11px; width: 180px; opacity: 0.4; font-size: 14px">
            The standard is default chosen from you left navigation selection
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div style="font-size: 16px; margin-bottom: 10px">
          Subject
        </div>
        <div style="box-shadow: 0px 1px 3px #11111112; border: 1px solid #cccccc; border-radius: 4px; background: white; padding: 10px;">
          {{ subject.name }}
        </div><br>
        <div style="display: inline-flex">
          <e-svg icon="Group" />
          <div style="margin-left: 11px; width: 180px ; opacity: 0.4; font-size: 14px">
            The subject is default chosen from you left navigation selection
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <e-date-picker :span="24" v-model="quickTest.due_date" type="date" label="Set Test Date" placeholder="Pick a Date" @change="changeDate" format="MM/dd/yyyy" rules="required" />
      </el-col>
      <el-col :span="12" style="padding: 5px 0 0 34px">
        <div :style="'color: #111111;font-size: 16px;font-weight: 600;margin-bottom: 6px;'">
          Set Test Time
        </div>
        <el-radio-group class="toggle-style" v-model="testTiming" style="margin-left: 0px" rules="required" >
          <el-radio style="margin-right: 5px" :label="item" @change="handleTime" border v-for="(item, index) in timings" :key="index + 1">
            {{ item.time }}
          </el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
  </el-row>
    <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px" class="form-last-buttons">
      <!-- <el-col style="float: right" :span="9"> -->
        <e-button :span="15" label="Cancel" width="180" css="cancel_btn" type="default" class="p-45" />
        <e-button :span="8" label="Proceed" width="180" @click="handleSubmit(handleClick)" css="float-right" class="p-45" />
      <!-- </el-col> -->
    </el-row>
  </ValidationObserver>
  </div>
</template>
<script>
import { dispatchGraphql, dispatchGraphqlMutation } from "@/api/dispatcher"
import moment from 'moment'
export default {
  data: () => ({
    rules: {},
    standard: {},
    subject: {},
    quickTest: {},
    testTiming: "",
    timings: [
      {
        time: "10 min",
        value: 10,
        isActive: false,
      },
      {
        time: "15 min",
        value: 15,
        isActive: false,
      },
      {
        time: "20 min",
        value: 20,
        isActive: false,
      },
      {
        time: "25 min",
        value: 25,
        isActive: true,
      },
      {
        time: "30 min",
        value: 30,
        isActive: false,
      },
      {
        time: "35 min",
        value: 35,
        isActive: false,
      },
    ],
  }),
  computed: {
    isValid () {
      return this.quickTest.name && this.quickTest.due_date && this.testTiming;
    }
  },
  methods: {
    changeDate: function (value) {
      this.quickTest.due_date = moment(value).format('')
    },
    handleTime: function (time) {
      this.quickTest.test_time = time.value
    },
    getStandardSubjects() {
      const query = `query {
        standards_by_pk(id: "${this.$route.params.standard_id}") {
          id
          name
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.standard = response.standards_by_pk
      })
      const query1 = `query {
        subjects_by_pk(id: "${this.$route.params.subject_id}") {
          id
          name
        }
      }`
      dispatchGraphql(query1).then((response) => {
        this.subject = response.subjects_by_pk
      })
    },
    getVariables() {
      this.quickTest.standard_id = this.$route.params.standard_id,
      this.quickTest.subject_id = this.$route.params.subject_id,
      this.quickTest.form_type = 'QuickTest'
      return this.quickTest
    },
    handleClick() {
      if (!this.quickTest.name) {
        alert("please give test name")
        return;
      } else if (!this.quickTest.due_date) {
        alert("please give test date")
        return;
      } else if (!this.quickTest.test_time) {
        alert("please give test time")
        return;
      }
      dispatchGraphqlMutation("forms", ["id", "standard_id", "name", "test_time", "due_date"], this.getVariables()).then((response) => {
        this.$emit("save", response.insert_forms_one)
      });
    },
  },
  created() {
    this.getStandardSubjects()
  },
};
</script>
<style></style>
