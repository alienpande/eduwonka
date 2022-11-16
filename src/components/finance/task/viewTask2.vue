<template>
  <div class="task mg-l-20">
    <div class="heading">Assignment status</div>
    <e-table :table="audience" @pageInfo="ptest">
      <el-table-column label="User">
        <template slot-scope="scope">
          {{ scope.row.user.first_name }}
        </template>
      </el-table-column>
      <el-table-column label="Status">
        <template slot-scope="scope">
          <div style="color: #0bc32e !important" v-if="scope.row.status === 'completed'">
            Completed
          </div>
          <div style="color: #e60000" v-if="scope.row.status === 'submitted'">
            Not Started
          </div>
          <div style="color: #ffa700" v-if="scope.row.status === 'pending'">
            In Progress
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Action">
        <template slot-scope="scope">
          <div  @click="handleEdit(scope.$index, scope.row)" style="border: 1px solid #00000066;border-radius: 2px;display: flex;margin-bottom: 10px;background: white;">
            <img style="padding: 5px 0 8px 10px" src="@/assets/images/expenseImg.png" />
            <div style="margin-left: 10px; margin-top: 5px"></div>
            <e-svg class="close-iconss" icon="Download_file"></e-svg>
          </div>
        </template>
      </el-table-column>
    </e-table>
    <el-row class="text-right" style="border-top: 1px solid #fcdfbd; margin-top: 20px">
      <e-button :span="17" label="Cancel" width="180" type="default" class="p-45 cancel-button-margin"></e-button>
      <e-button :span="3" label="Download" width="180" @click="handleClick" css="float-right" class="p-45"></e-button>
    </el-row>
  </div>
</template>
<script>
import { dispatchGraphql } from '@/api/dispatcher'
// import moment from 'moment'

export default {
  data: () => ({
    audience: [],
  }),
  created() {
    this.getAudience()
  },
  methods: {
    handleClick() {
      console.log('handleClick')
    },
    getAudience() {
      const query=`query($taskId: uuid) {
        audiences(where: {audienceable_id: {_eq: $taskId}}) {
          status
          user_id
          user {
            id
            first_name
          }
        }
      }`   
      dispatchGraphql( query,{ taskId: this.$route.params.id }).then((response) =>{
        this.audience = response.audiences
      })

    },
    ptest(d) {
      console.log(d);
    },
  },
};
</script>
<style >
.close-iconss img {
  width: 22px;
  margin-top: 12px;
  margin-left: 15rem !important;
}
.task .el-pagination{
  display: none !important;
}
@media only screen and (device-width: 768px) {
  .cancel-button-margin {
    margin-right: 57px;
  }
}
</style>
