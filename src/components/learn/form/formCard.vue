<template>
  <div class="dashboard-cards-wrapper">
    <el-col v-for="form in forms" :key="form.id" :span="11" style="margin-bottom: 25px">
      <el-card hadow="none" style="padding: 8px" class="rounded-08 pg-50 cp">
        <div @click="$emit('clicks', form)">
          <div style="font-size: 20px; width:60%; font-weight: 600; opacity: 0.8;">
            {{ form.name }}
          </div>
          <!-- <div
            style="
              font-size: 20px;
              opacity: 0.8;
              font-weight: 500;
              padding: 18px 0;
            "
          >
            <span style="font-weight: 300">by</span> Shawn Fernando
          </div> -->
          <el-row style="border-top:1px solid #0000000D;margin-top:10px;padding-top:10px" class="dashboard-cards-wrapper">
            <el-col v-if="form.result_audience" :span="4">
              <div style="font-weight: 300; opacity: 0.8">
                Audience
              </div>
              <div style="font-weight: 500; font-size: 20px; opacity: 0.8; margin-top: 10px;">
                {{ form.result_audience.length }}
              </div>
            </el-col>
            <el-col v-if="form.result_audience" :span="4">
              <div style="font-weight: 300; opacity: 0.8">
                Submitted
              </div>
              <div style="font-weight: 500; font-size: 20px; opacity: 0.8; margin-top: 10px;">
                {{ getSubmitted(form.result_audience) }}
              </div>
            </el-col>
            <el-col :span="6">
              <div style="font-weight: 300; opacity: 0.8">
                Due date
              </div>
              <div style="font-weight: 500; font-size: 20px; opacity: 0.8; margin-top: 10px;">
                {{ getDate(form.due_date) }}
              </div>
            </el-col>

            <el-col :span="6">
              <div style="font-weight: 300; opacity: 0.8">
              Publishing date
              </div>
              <div style="font-weight: 500; font-size: 20px; opacity: 0.8; margin-top: 10px;">
                {{ getDate(form.created_at) }}
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-col>
  </div>
</template>
<script>
import moment from 'moment'
  export default {
    props: {
      forms: {
        type: Array
      }
    },
    components:{},
    data:()=>({
      showSideBar: true
    }),
    methods: {
      getDate(date) {
        return moment(date).format('DD MMM yyyy')
      },
      getSubmitted(audience) {
        var count = 0
        for (const aud of audience) {
          if (aud.status === 'SUBMITTED') {
            count ++
          }
        }
        return count
      }
    }
  }
</script>