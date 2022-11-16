<template>
  <right-side-bar :show="show" @onClose="__onCancel">
    <div style="opacity: 0.8;width:15rem; padding: 34px;" class="text-white f-600 fs-20">
      {{ appointment.title }}
    </div>
    <div class="bg-black-5" :style="getStyles()">
      <el-row class="mg-l-10">
        <el-col :span="10" :offset="1" style="padding: 14px 5px 14px 10px;" class="mg-t-20 rounded-08 bg-black-2 d-flex justify-content-center">
          <e-svg :style="'padding-top: 10px; padding-right: 10px'" icon="checkBox"></e-svg>
          <div>
            <div class="text-gray-6">status</div>
            <div class="sub-title">{{ appointment.status }}</div>
          </div>
        </el-col>
        <el-col :span="10" :offset="1" style="padding: 14px 5px 14px 10px;" class="mg-t-20 rounded-08 bg-black-2 d-flex justify-content-center">
          <e-svg :style="'padding-top: 10px; padding-right: 10px'" icon="members"></e-svg>
          <div>
            <div class="text-gray-6">Attendees</div>
            <div class="sub-title">{{ appointment.audience.length }}</div>
          </div>
        </el-col>
        <el-col :span="10" :offset="1" style="padding: 14px 5px 14px 10px;" class="mg-t-20 rounded-08 bg-black-2 d-flex justify-content-center">
          <e-svg :style="'padding-top: 10px; padding-right: 10px'" icon="calenderIcon"></e-svg>
          <div>
            <div class="text-gray-6">Date</div>
            <div class="sub-title">{{ getDate(appointment.start_time) }}</div>
          </div>
        </el-col>
        <el-col :span="10" :offset="1" style="padding: 14px 5px 14px 10px;" class="mg-t-20 rounded-08 bg-black-2 d-flex justify-content-center">
          <e-svg :style="'padding-top: 10px; padding-right: 10px'" icon="location"></e-svg>
          <div>
            <div class="text-gray-6">Location</div>
            <div class="sub-title">{{ appointment.location }}</div>
          </div>
        </el-col>
      </el-row>
      <el-row class="rounded-08 bg-black-2" style="margin: 30px">
        <div style="margin: 20px">
          <el-col>
            <div class="text-white f-600 fs-20">
              Attendees
            </div>
          </el-col>
          <el-row>
            <el-col v-for="(audience, i) in appointment.audience" :key="i" :span="10" :offset="1" class="mg-t-15">
              <div class="d-flex justify-content-center">
                <el-avatar :size="30" :src="require('@/assets/images/profile.jpg')"/>
                <div class="text-white tx-16" style="margin: 5px">
                  {{ audience.user.first_name }}
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-row>
      <el-row v-if="!activeDetail" class="rounded-08 bg-black-2" style="margin: 30px">
        <div style="margin: 20px">
          <el-row>
            <el-col :span="17">
              <div class="text-white f-600 fs-20">
                Class sessions
              </div>
            </el-col>
            <el-col :span="7">
              <es-button text="Download" icon="downloadYellow" />
            </el-col>
          </el-row>
          <el-row v-for="i in 4" :key="i" class="mg-t-15">
            <img style="border: 2px solid #6d6c6c;border-radius: 12px; width: 320px; height: 173px" src="@/assets/images/videoScreen.png" />
          </el-row>
        </div>
      </el-row>
    </div>
    <div v-if="activeDetail" class="mg-t-25">
      <el-col :span="10" :offset="1">
        <es-button text="Decline" @click="update('Rejected')" />
      </el-col>
      <el-col :span="10" :offset="1">
        <es-button text="Accept" :plain="true" @click="update('Approved')" />
      </el-col>
    </div>
  </right-side-bar>
</template>
<script>
import RightSideBar from "@/components/student/knowledge/rightSideBar.vue"
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
    },
    getStyles() {
      if (this.activeDetail) {
        return 'height: 65vh; overflow: auto'
      } else {
        return 'height: 77vh; overflow: auto'
      }
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