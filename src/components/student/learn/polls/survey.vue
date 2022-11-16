<template>
  <div>
    <el-tabs class="floatTabHeader studentTab" v-model="tab">
      <el-tab-pane label="Active" name="tab1">
        <el-row>
          <el-col :span="10">
            <div style="color: #cfcfcf">{{active.length}} Polls</div>
          </el-col>
          <el-col :span="1" :offset="13">
            <es-button icon="updateIcon"></es-button>
          </el-col>
        </el-row>
        <br />
        <el-row>
          <el-col :span="8" class="p10" v-for="i in active" :key="i">
            <div class="bg-black-2 p20 rounded-08" @click="$router.push($url.LN_SURVAY_ACTIVE + '/form_id/' + i.id + '/form_results_id/' + i.form_results_id)">
              <div class="fs-18 f-600 white-1">
                {{i.name}}
              </div>
              <br />
              <div
                shadow="none"
                style="border: none; padding: 13px"
                class="rounded-08 bg-black-3"
              >
                <el-row>
                  <el-col :span="12">
                    <div style="color: #9d9d9d">Received on</div>
                    <div style="color: #f3f3f3; font-weight: bold">
                      {{getDate(i.created_at)}}
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div style="color: #9d9d9d">Due Date</div>
                    <div style="color: #f3f3f3; font-weight: bold">
                      {{getDate(i.due_date)}}
                    </div>
                  </el-col>
                </el-row>
              </div>
              <br />
              <es-button text="Fill Survey" :plain="true"></es-button>
            </div>
          </el-col>
        </el-row>
        <es-pagination :total="activeCount" @pagination="pagination"></es-pagination>
      </el-tab-pane>
      <el-tab-pane label="Completed" name="tab2">
            <el-row>
          <el-col :span="10">
            <div style="color: #cfcfcf">{{Completed.length}} Polls</div>
          </el-col>
          <el-col :span="1" :offset="13">
            <es-button icon="updateIcon"></es-button>
          </el-col>
        </el-row>
        <br />
        <el-row>
          <el-col :span="8" class="p10" v-for="i in Completed" :key="i">
            <div class="bg-black-2 p20 rounded-08" @click="$router.push($url.LN_SURVAY_COMPLETE + '/form_id/' + i.id + '/form_results_id/' + i.form_results_id)">
              <div class="fs-18 f-600 white-1">
                {{i.name}}
              </div>
              <br />
              <div
                shadow="none"
                style="border: none; padding: 13px"
                class="rounded-08 bg-black-3"
              >
                <el-row>
                  <el-col :span="12">
                    <div style="color: #9d9d9d">Received on</div>
                    <div style="color: #f3f3f3; font-weight: bold">
                      {{getDate(i.created_at)}}
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div style="color: #9d9d9d">Due Date</div>
                    <div style="color: #f3f3f3; font-weight: bold">
                      {{getDate(i.due_date)}}
                    </div>
                  </el-col>
                </el-row>
              </div>
              <br />
              <es-button text="Fill Survey" :plain="true"></es-button>
            </div>
          </el-col>
        </el-row>
        <es-pagination :total="CompletedCount" @pagination="pagination"></es-pagination>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import esPagination from '@/studentControl/esPagination'
import { dispatchGraphql } from '@/api/dispatcher'
import { getId } from '@/util/auth'
import moment from 'moment'
export default {
  components: { esPagination },
  data: () => ({
    tab: "tab1",
    query: `query ($id: uuid,$limit: Int, $offset: Int) {
      form_results(limit: $limit, offset: $offset,where: {user_id: {_eq: $id}, _and: {form: {form_type: {_eq: "Poll"}}}}) {
        id
        form_id
        status
        form {
          id
          name
          status
          due_date
          created_at
        }
      }
    }`,
    final: [],
    form_answers: [],
    active: [],
    Completed: [],
    limit: 10,
    offset: 0,
    total: 0,
    activeCount: 0,
    CompletedCount: 0,
  }),
  created() {
    this.getQuetion()
  },
  methods: {
    getDate(data) {
      return moment(data).format('yyyy-MM-DD')
    },
    getVariables() {
      return{
        'limit': this.limit,
        'offset': this.offset    
      }
    },
     pagination: function(object) {
      this.limit = object.limit
      this.offset = object.limit * (object.page - 1)
      this.getQuetion()
    },
    getQuetion() {
      dispatchGraphql(this.query,{id: getId()}, this.getVariables()).then((response) =>{
        console.log('forms', response.form_results)
        for(const txt of response.form_results) {
          if(txt.form_id == txt.form.id){
            txt.form.result_status = txt.status
            txt.form.form_results_id = txt.id
            this.final.push(txt.form)
          }
        }
          for(const txt of this.final) {
            if(txt.result_status == "ASSIGNED") {
              this.active.push(txt)
              this.activeCount = this.active.length
            } else {
              this.Completed.push(txt)
              this.CompletedCount = this.Completed.length
            }
          }
          console.log("finalData", this.active, this.Completed)
      })
    },
  }
};
</script>
