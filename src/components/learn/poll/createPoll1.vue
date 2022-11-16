<template>
  <div>
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <el-row class="form-type-4">
      <el-row :rules="rules" :gutter="20">
        <el-col :span="6" :offset="4">
          <e-input
            v-model="polloneData.name"
            name="Name of the poll"
            placeholder="Text Field"
            rules="required"
          ></e-input>
        </el-col>
        <el-col :span="6" :offset="2">
          <!-- <e-date-picker
            class="default-picker"
            v-model="polloneData.date"
            name="Set due date"
            placeholder="14th June 2020"
          ></e-date-picker> -->
          <e-date-picker
            v-model="polloneData.date"
            type="date"
            name="Set due date"
            placeholder="Choose Date"
            align="right"
            @change="changeDate"
            format="MM/dd/yyyy"
            rules="required"
          ></e-date-picker>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :offset="4">
          <div class="text-bold fs-16" style="margin-top: 20px; margin-bottom: 10px">
            Privacy
          </div>
          <el-col class="form-type-3">
            <span style="font-size: 14px; opacity: 0.4;">
              You can choose the poll to be anonymous or be submitted with names
            </span>
            <!-- <div style="margin-top: 10px">
              <button
                v-for="(select, i) in customSelect"
                :key="i"
                class="custom-select-btn"
                :class="{ checkingtrue: select.value }"
                @click="select.value = !select.value"
              >
                <el-checkbox v-model="polloneData.value"> </el-checkbox>
                {{ select.text }}
              </button>
            </div> -->
            <div style="margin: 5px 15px">
              <el-col v-for="(acces, i) in customSelect" :key="i" :span="5">
                <el-checkbox v-model="acces.privacy" @change="handleSelected(acces, i)"></el-checkbox>
                <div style="color: #00000099; display: inline-block; margin-left: 10px">
                  {{ acces.text }}
                </div>
              </el-col>
            </div>
            <div style="font-size: 14px; opacity: 0.4">
              The poll will be anonymous and the identity will be hidden during
              submission
            </div>
          </el-col>
        </el-col>
      </el-row>

    </el-row>  
      <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px" class="form-last-buttons">
        <!-- <el-col style="float: right" :span="9"> -->
          <e-button
            :span="15"
            label="Cancel"
            width="180"
            css="cancel_btn"
            type="default"
            class="p-45"
          ></e-button>
          <e-button
            :span="8"
            label="Proceed"
            width="180"
            @click="handleSubmit(savePoll())"
            css="float-right"
            class="p-45"
          ></e-button>
        <!-- </el-col> -->
      </el-row>
    </ValidationObserver>    
  </div>
</template>
<script>
import eDatePicker from "@/controls/eDatePicker.vue";
import {  dispatchGraphqlMutation } from "@/api/dispatcher"
import moment from 'moment'
export default {
  components: { eDatePicker },
  data: () => ({
    req: {},
    rules: {},
    polloneData: {},
    customSelect: [
      {
        text: "Anonymus Poll",
        value: false,
      },
      {
        text: "Identity made visible",
        value: false,
      },
    ]
  }),
  computed: {
    isValid () {
      return this.polloneData.name && this.polloneData.date;
    }
  },
  created() {},
  methods: {
     changeDate: function(value) {
      this.polloneData.date = moment(value).format('')
      console.log(this.polloneData.date)
    },
    handleSelected(val) {
      console.log(val)
      if (val.text) {
        this.polloneData.privacy = val.text
      }
      console.log('this', this.polloneData)
    },

    getvariables() {
      const data = {}
      data.due_date = this.polloneData.date
      data.privacy_mode = this.polloneData.privacy
      data.name = this.polloneData.name
      data.form_type = 'Poll'
      return data
    },
    savePoll() {
      dispatchGraphqlMutation('forms', ['id', 'name' ,'privacy_mode'], this.getvariables()).then((response) => {
        this.$emit('save',response.insert_forms_one.id)
      })

    },


  }
};
</script>
<style>
.checkingtrue {
  box-shadow: 0px 13px 21px #00000026;
  color: #bc6c42 !important;
}
.custom-select-btn {
  padding: 8px 13px;
  border-radius: 5px;
  background: white;
  color: #4D4F5C;
  border: 1px solid;
  font-size: 15px;
  margin-right: 15px;
  margin-bottom: 15px;
  text-transform: uppercase;
}
</style>
