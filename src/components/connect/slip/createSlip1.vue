<template>
  <div>
    <el-row>
      <el-col :span="6" :offset="3">
        <e-input class="custom-input" v-model="slip.name" label="Slip name" placeholder="Enter Name/Purpose">
        </e-input>
      </el-col>
      <el-col :span="8" :offset="1">
        <e-date-picker class="custom-date-picker" v-model="slip.due_date" label="Set due date" placeholder="Pick a Date" @change="changeDate" format="MM/dd/yyyy">
        </e-date-picker>
      </el-col>
    </el-row><br/><br/><br/>
    <el-row class="channel-1-btns" style="border-top: 1px solid #fcdfbd; margin-top: 20px">
      <el-col style="float: right" :span="9">
        <e-button :span="15" label="Cancel" width="180" css="cancel_btn" type="default" class="p-45" />
        <e-button :span="8" label="Create Slip" width="180" @click="submit()" css="float-right" class="p-45" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { dispatchGraphqlMutation } from "@/api/dispatcher"
import { getId } from '@/util/auth'
import moment from 'moment'
export default {
  data() {
    return {
      slip: {}
    }
  },
  methods: {
    submit() {
      this.slip.created_by_id = getId()
      this.slip.status = "pending"
      dispatchGraphqlMutation('permission_slips', ['id', 'name'], this.slip).then((response) => {
        this.$emit('save', response.insert_permission_slips_one.id)
      })
    },
    changeDate: function(value) {
      this.slip.due_date = moment(value).format('')
    }
  }
}
</script>