<template>
  <div>
    <e-container hideHeader :pageTitle="termId === 'new' ? 'Add Term' : 'Update Term'" :back="$url.FI_SETTINGS_TERM">
      <div style="color: #000000cc" class="fs-20 f-600">
        Provide the below details to {{ termId === 'new' ? 'create new' : 'update' }} term
      </div>
      <br />
      <el-row>
        <el-col :span="20">
          <e-input v-model="term.name" label="Term Name" placeholder="Type Term Name" />
        </el-col>
        <el-col :span="9">
          <e-date-picker v-model="term.start_date" label="Start Date" placeholder="Choose Start Date" class="default-picker" @change="handleStart" />
        </el-col>
        <el-col :span="9" :offset="2">
          <e-date-picker v-model="term.end_date" label="End Date" placeholder="Choose End Date" class="default-picker" @change="handleEnd" />
        </el-col>
        <el-col :span="9">
          <div style="position:relative">
            <e-input v-model="term.percent_of_fees" label="% of fees to be paid in this Term" placeholder="% of fees to be paid" />
            <div style="position: absolute;right: 2px;top: 28px;font-size: 18px;background: #fcdfbd;color: #BC6C4;padding: 3.5px 9px;">
              %
            </div>
          </div>
        </el-col>
        <el-col :span="9" :offset="2">
          <e-date-picker v-model="term.due_date" label="Term Due Date for fees submission" placeholder="Choose Due Date" class="default-picker" @change="handleDue" />
        </el-col>
      </el-row>
      <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px; padding-bottom: 15px;">
        <el-col class="float-right" :span="11">
          <e-button :span="15" label="Cancel" width="180" css="cancel_btn" type="default" class="p-45" />
          <e-button :span="8" :label="termId === 'new' ? 'Create' : 'Update'" width="180" css="float-right" class="p-45" @click="handleClick" />
        </el-col>
      </el-row>
    </e-container>
  </div>
</template>
<script>
import moment from 'moment'
import { dispatchGraphqlMutation, dispatchGraphqlQueryByPk } from "@/api/dispatcher"
export default {
  data() {
    return {
      termId: 'new',
      term: {},
    }
  },
  created() {
    this.termId = this.$route.params.id || 'new'
    this.getTerm()
  },
  methods: {
    getTerm() {
      dispatchGraphqlQueryByPk('terms',['id', 'name', 'start_date', 'end_date', 'percent_of_fees', 'due_date'], { id: this.termId }).then((response) => {
        console.log(response)
        this.term = response.terms_by_pk
      })
    },
    handleClick() {
      dispatchGraphqlMutation('terms', ['id', 'name'], this.term).then((response) => {
        console.log(response)
        this.$notify({
          type: 'success',
          title: 'Term Saved',
        })
        this.$router.push(this.$url.FI_SETTINGS_TERM)
      })
    },
    handleStart: function(value) {
      this.term.start_date = moment(value).format('')
    },
    handleEnd: function(value) {
      this.term.end_date = moment(value).format('')
    },
    handleDue: function(value) {
      this.term.due_date = moment(value).format('')
    }
  },
}
</script>