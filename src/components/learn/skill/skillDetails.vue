<template>
  <right-side-bar :show="show" @onClose="__onClose">
    <div>
      <div class="">
        <div class="f-600 fs-20" style="width: 20rem; opacity: 0.8;padding:  15px">
          {{ details.name }}
        </div>
        <hr style="opacity: 0.2" />
        <div style="padding:10px 30px">
            <el-row>
            <el-col :span="6" :offset="3">
                <el-avatar :size="98" :src="require('@/assets/images/profile.jpg')" />
            </el-col>
            <el-col :span="4" :offset="4">
                <div style="margin-top: 20px" class="heading">{{ details.mentor.first_name }}</div>
            </el-col>
            </el-row>
        </div>
        <div class="pd-x-30 pd-10 pd-b-30">
          <el-card shadow="none" style="background: rgba(248, 243, 238, 0.35); " class="rounded-08 text-center classroom-right__slide">
            <el-row style="opacity: 0.8">
              <el-col :span="12" style="border-right: 2px solid #fcdfbd;border-bottom: 2px solid #fcdfbd;padding: 10px;">
                <span>Standard</span> <br />
                <span style="color: rgb(0, 0, 0); font-weight: bold">{{ details.standard.name }}</span>
              </el-col>
              <el-col :span="12" style="border-bottom: 2px solid #fcdfbd; padding: 10px">
                <span>Category</span> <br />
                <span style="color: rgb(0, 0, 0); font-weight: bold">{{ details.category.name }}</span>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </div>
      <div class="bg-ui-03 pd-10" style="background: #e6eaed">
        <div class="d-flex justify-content-between  mg-x-30">
          <div stlye="color:rgba(0,0,0,0.8);font-weight: 600;" class="fs-20">Score Book</div>
          <!-- <el-button :span="3" icon="el-icon-download" circle /> -->
          <e-svg icon='downloads'></e-svg>
        </div>
        <el-tabs class="mg-t-0 pd-x-30" v-model="activeName">
          <el-tab-pane label="Not-Submitted" name="ASSIGNED" class="sb-section__2">
            <el-card class="rounded-08 mg-b-20" v-for="(result, i) in setup()" :key="i">
              <div class="d-flex justify-content-betweem wd-100p cp">
                <div class="wd-70p">
                  <e-img-name :src="require('@/assets/images/profile.jpg')" :name="result.student.first_name"/>
                </div>
                <div class="mg-t-5 text-center wd-40p tx-bold">
                  <el-input-number v-model="result.score" size="mini" :min="0" :max="10" />
                </div>
                <!-- <div class="mark-container text-center wd-30p tx-bold">{{ result.score }}</div> -->
              </div>
            </el-card>
            <el-row style="margin-top: 30px">
              <el-col class="float-right" :span="8">
                <e-button css='add-subject' label='Update' @click="handleSubmit" />
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane class="mg-0 sb-section__2" label="Submitted" name="SUBMITTED">
            <el-card class="rounded-08 mg-b-20" v-for="(result, i) in setup()" :key="i">
              <div class="d-flex justify-content-betweem wd-100p cp">
                <div class="wd-70p">
                  <e-img-name :src="require('@/assets/images/profile.jpg')" :name="result.student.first_name" nameStyle="color:#4D4F5C;font-weight:500;" />
                </div>
                <div class="mark-container text-center wd-30p tx-bold">{{ result.score }}/10</div>
              </div>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </right-side-bar>
</template>

<script>
import EImgName from "../../../controls/table/eImgName.vue"
import RightSideBar from "../rightSideBar.vue"
import { dispatchGraphql } from '@/api/dispatcher'
export default {
  components: { RightSideBar, EImgName },
  props: {
    details: {
        type: Object
    },
    show: { type: Boolean, default: false },
    __onClose: Function,
  },
  data() {
    return {
      activeName: "ASSIGNED",
      mutation: `mutation($id: uuid!, $changes: skill_results_set_input) {
        update_skill_results_by_pk(pk_columns: {id: $id} _set: $changes) {
          id
        }
      }`
    };
  },
  methods: {
    setup() {
        var results  = this.details.skill_results.filter(x => x.status === this.activeName)
        if (results.length > 0) {
            return results
        }
        console.log(this.activeName, results)
    },
    getVariables(data) {
        return {
            "id": data.id,
            "changes": data
        }
    },
    handleSubmit() {
        this.details.skill_results.map(x => {
            if (x.score != 0) {
                x.status = 'SUBMITTED'
                delete x.student
            }
        })
        this.details.skill_results.map(y => {
            dispatchGraphql(this.mutation, this.getVariables(y)).then((response) => {
                console.log(response)
            })
        })
        this.$emit('update')
    }
  }
};
</script>

<style>
.mark-container {
  background: rgba(188, 108, 66, 0.35);
  border-radius: 12px;
  vertical-align: middle;
  line-height: 46px;
  color: rgb(188, 108, 66);
}
.sb-section__2 {
  height: 400px;
  overflow-y: scroll;
  padding-bottom: 350px;
}
@media screen and (min-height: 1000px) {
  .sb-section__2 {
    height: 350px;
  }
}
</style>
