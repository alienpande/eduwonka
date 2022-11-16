<template>
  <div>
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <el-row>
      <el-col class="custom-input sm-width-100 sm-margin-l-0" :span="5" :offset="4" :rules="rules">
        <e-input v-model="form.name" name="Name of the form" placeholder="Enter name" rules="required" />
      </el-col>
      <el-col class="custom-date-picker sm-width-100 sm-margin-l-0" :offset="1" :span="6">
        <e-date-picker v-model="form.due_date" placeholder="Select Date" label="Set date" @change="handleChange" rules="required" />
      </el-col>
    </el-row>
    <br />
    <el-row>
      <el-col class="custom-input-textarea sm-margin-l-0 sm-width-100" :span="9" :offset="4"  :rules="rules">
        <e-input type="textarea" v-model="form.description" label="Description" placeholder="Description" rules="required" />
      </el-col>
      <el-col :span="6" :offset="1" class="sm-margin-l-0 sm-width-100">
        <br/>
        <div v-for="i in 3" :key="i" style="display: flex; margin-bottom: 13px">
          <e-svg style="display: inline-block; margin-top: 8px; margin-right: 8px" icon="Pointer" />
          <div style="font-size: 14px; opacity: 0.6">
            Lorem ipsum dolor sit amet consectetur adipiscing elit
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px; padding-bottom: 15px;" class="form-last-buttons" >
      <!-- <el-col style="float: right" :span="9"> -->
        <e-button :span="15" label="Cancel" width="180" css="cancel_btn" type="default" class="p-45" />
        <e-button :span="8" label="Proceed" width="200" css="float-right" @click="handleSubmit(handleClick)" class="p-45" />
      <!-- </el-col> -->
    </el-row>
    </ValidationObserver>
  </div>
</template>
<script>
import { dispatchGraphqlMutation } from "@/api/dispatcher"
import moment from 'moment'
export default {
  data: () => ({
    rules: {},
    form: {},
  }),
  computed: {
    isValid () {
      return this.form.name && this.form.description && this.form.due_date;
    }
  },
  created() {},
  methods: {
    handleClick() {
      this.form.form_type = 'Form'
      dispatchGraphqlMutation('forms', ['id', 'name'], this.form).then((response) => {
        this.$emit('save', response.insert_forms_one.id)
      })
    },
    handleChange: function(val) {
      this.form.due_date = moment(val).format('')
    }
  }
}
</script>
<style></style>
