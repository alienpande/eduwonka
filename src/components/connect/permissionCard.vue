<template>
  <div @click="$emit('clicks', id)" class="cp" style="display:inline-block;margin:0 30px 30px 0">
    <el-card shadow="none" style="width: 20rem;padding:20px 0">
      <div style="color: #000000; opacity: 0.8;padding-right:40px;" class="fs-20 f-600">
        {{ title }}
      </div>
      <br />
      <el-row>
        <el-col :span="13">
          <div style="font-weight: 300; opacity: 0.8">Due Date</div>
          <div style="color: #000000; opacity: 0.8" class="fs-20 f-500">
            {{ getDate(duedate) }}
          </div>
        </el-col>
        <el-col v-if="SignedStatus" :span="11">
          <div style="font-weight: 300; opacity: 0.8">Signed Status</div>
          <div style="color: #000000; opacity: 0.8" class="fs-20 f-500">
            {{ SignedStatus }}
          </div>
        </el-col>
      </el-row>
      <br/>
      <el-row v-if="!SignedStatus">
        <el-col :span="20">
          <e-button label='Accept' :span='10' @click="update('approved')" />
          <e-button label='Decline' :plain='true' css='bg-transparent sort-icon' :offset='2' :span='10' @click="update('rejected')" />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import { dispatchGraphql } from '@/api/dispatcher'
import moment from 'moment'
export default {
  props:['id', 'title', 'duedate', 'SignedStatus'],
  data:()=>({}),
  methods: {
    update(status) {
      const mutation = `mutation {
        update_permission_slips_by_pk(pk_columns: {id: "${this.id}"}, _set: {status: "${status}"}) {
          id
          status
        }
      }`
      dispatchGraphql(mutation).then((response) => {
        console.log(response)
        this.$emit('update')
      })
    },
    getDate(date) {
      return moment(date).format('DD MMM, YYYY')
    }
  }
}
</script>
