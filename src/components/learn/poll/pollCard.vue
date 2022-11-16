<template>
  <div class="dashboard-cards-wrapper">
    <el-col v-for="form in forms" :key="form.id" :span="11" style="margin-bottom: 25px">
    <!-- <el-col :span="11" style="margin: 10px"> -->
      <div style="background: white" shadow="none" class="rounded-08">
        <div class="cp" @click="$emit('clicks', form)">
          <div style="padding: 20px">
            <div style="font-size: 20px; width:60%;font-weight: 600; opacity: 0.8;">{{ form.name }}</div>
            <el-row class="view-no-form" style="border-top: 1px solid #0000000d;margin-top: 10px;padding-top: 10px;">
              <el-col :span="8">
                <div style="font-weight: 300; opacity: 0.8">Audience</div>
                <div style="font-weight: 500;font-size: 20px;opacity: 0.8;margin-top: 10px;">
                  {{ form.result_audience.length }}
                </div>
              </el-col>
              <el-col :span="8">
                <div style="font-weight: 300; opacity: 0.8">Submitted</div>
                <div style="font-weight: 500;font-size: 20px;opacity: 0.8;margin-top: 10px;">
                  {{ getSubmitcount(form.result_audience) }}
                </div>
              </el-col>
              <el-col style="width:auto">
                <div style="font-weight: 300; opacity: 0.8">Due date</div>
                <div style="font-weight: 500;font-size: 20px;opacity: 0.8;margin-top: 10px;">
                  {{ getDate(form.due_date) }}
                </div>
              </el-col>

              <!-- <el-col style="width:auto">
                <div style="font-weight: 300; opacity: 0.8">
                  Publishing date
                </div>
                <div style="font-weight: 500;font-size: 20px;opacity: 0.8;margin-top: 10px;">
                  {{ getDate(form.created_at) }}
                </div>
              </el-col>
              <el-col style="width:auto">
                <div style="font-weight: 300; opacity: 0.8">
                  Poll Date
                </div>
                <div style="font-weight: 500;font-size: 20px;opacity: 0.8;margin-top: 10px;">
                  {{ getDate(form.due_date) }}
                </div>
              </el-col> -->
            </el-row>
          </div>

          <!-- <div style="display: flex">
            <div style="border-radius: 0 0 0 10px;color: rgb(77, 79, 92);background: rgb(252, 223, 189);width: 129px;padding: 14px 0;text-align: center;">
              Yes
            </div>
            <div style="background: rgb(188, 108, 66);padding: 14px 0px;width: 26rem;text-align: center;border-radius: 0 0px 10px 0; color:white;">
              No
            </div>
          </div> -->
        </div>
      </div>
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
  components: {},
  data: () => ({
    showSideBar: true,
  }),
  created() {},
  methods: {
    getSubmitcount(data) {
      const submissions = data.filter(x => x.status === 'SUBMITTED')
      return submissions.length
    },
    getDate(date) {
      return moment(date).format('DD MMM yyyy')
    },
  }
};
</script>
