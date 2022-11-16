<template>
  <div class="form-right-bar">
    <right-side-bar :show="show" @onClose="__onCancel">
      <div style="width: 321px" class="heading">
        {{ appointment.title }}
      </div>
      <hr style="opacity: 0.2" />
      <div class="sb-section__2">
        <div class="">
          <el-card shadow="none" style="background: rgba(248, 243, 238, 0.35)" class="rounded-08 text-center classroom-right__slide">
            <el-row style="opacity: 0.8">
              <el-col :span="12" style="border-right: 2px solid #fcdfbd;border-bottom: 2px solid #fcdfbd;padding: 10px;">
                <span>Status</span> <br />
                <span style="color: rgb(0, 0, 0); font-weight: bold">{{ appointment.status }}</span>
              </el-col>
              <el-col :span="12" style="border-bottom: 2px solid #fcdfbd; padding: 10px">
                <span>Attendees</span> <br />
                <span style="color: rgb(0, 0, 0); font-weight: bold">{{ appointment.audience.length }}</span>
              </el-col>
              <el-col style="border-right: 2px solid #fcdfbd; padding: 10px" :span="12">
                <span>Date</span> <br />
                <span style="color: rgb(0, 0, 0); font-weight: bold">{{ getDate(appointment.start_time) }}</span>
              </el-col>
              <el-col style="padding-top: 10px" :span="12">
                <span>Location</span> <br />
                <span style="color: rgb(0, 0, 0); font-weight: bold">{{ appointment.location }}</span>
              </el-col>
            </el-row>
          </el-card>
          <div style="background: #e6eaed">
            <div class="heading" style="padding-top: 15px">Attendees</div>
            <div style="padding: 0 20px">
              <el-card shadow="none">
                <el-row>
                  <el-col :span="20" v-for="(audience, i) in appointment.audience" :key="i" style="margin: 10px 20px">
                    <el-row>
                      <el-col :span="10">
                        <el-avatar :size="58" :src="require('@/assets/images/profile.jpg')" />
                      </el-col>
                      <el-col :span="12">
                        <div style="color: #000000; opacity: 0.8; display: inline; margin: 10px 0px" class="fs-16 f-500">
                          {{ audience.user ? audience.user.first_name : '' }}
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-card>
              <div v-if="!activeDetail" style="display: flex;justify-content: space-between;padding-right: 29px;padding-top:10px;">
                <div style="padding: 0px 15px 0px 21px;font-size: 20px;font-weight: 400;">
                  Class session
                </div>
                <img style="height: 36px" src="@/assets/icons/svg/download-icon.png" alt="" />
              </div>
              <el-card v-if="!activeDetail" shadow="none" style="margin: 20px" class="rounded-08">
                <e-svg style="padding: 68px 152px" icon="Play" />
              </el-card>
              <div v-if="activeDetail"><br/>
                <e-button css='left-style' label='Accept' :span='7' @click="update('Approved')" />
                <e-button css='left-style' label='Decline' :span='5' :plain='true' @click="update('Rejected')" /><br/><br/>
              </div>
              <br/>
            </div>
          </div>
        </div>
      </div>
    </right-side-bar>
  </div>
</template>
<script>
import RightSideBar from "@/components/school/rightSideBar.vue";
import { dispatchGraphql } from '@/api/dispatcher'
import moment from "moment"
export default {
  components: { RightSideBar },
  props: {
    show: { type: Boolean, default: false },
    __onCancel: Function,
    activeDetail: {
      type:Boolean
    },
    appointment: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    activeList: "activeone",
  }),
  methods: {
    getVariables(status) {
      return {
        "id": this.appointment.id,
        "change": {
          "status": status
        }
      }
    },
    getAudienceVariables(audience, status) {
      return {
        "id": audience.id,
        "change": {
          "status": status
        }
      }
    },
    update(status) {
      const mutation = `mutation($id: uuid!, $change: audience_set_input) {
        update_audiences_by_pk(pk_columns: {id: $id}, _set: $change) {
          id
        }
      }`
      const appointmentMutation = `mutation($id: uuid!, $change: appointments_set_input) {
        update_appointments_by_pk(pk_columns: {id: $id}, _set: $change) {
          id
        }
      }`
      for (const audience of this.appointment.audience) {
        audience.status = status
        dispatchGraphql(mutation, this.getAudienceVariables(audience, status)).then((response) => {
          console.log(response)
        })
      }
      dispatchGraphql(appointmentMutation, this.getVariables(status)).then((response) => {
        console.log(response)
        this.$emit('update')
      })
    },
    getDate(date) {
      return moment(date).format("DD MMM, YYYY")
    }
  }
};
</script>

<style >
.sb-section__2 {
  height: 470px;
  overflow-y: scroll;
  padding-bottom: 20px;
}
.left-style{
  margin-left: 90px;
}
</style>