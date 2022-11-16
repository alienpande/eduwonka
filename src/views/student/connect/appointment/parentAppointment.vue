<template>
  <div>
    <es-container pageTitle="Parent Appointments" btnIcon="el-icon-plus" btnText="New Appointment" @btnClick="$router.push('/connect/createstaff-apointment/parent')" class="bg-black-5">
      <el-tabs class="floatTabHeader studentTab" v-model="activeName">
        <el-tab-pane label="Active" name="active"> 
          <el-row :gutter="20" class="mg-l-5">
            <el-col :span="6" class="mg-t-5 tx-20 text-white">
              {{ setAppointments('activeCount') }} Appointments Found
            </el-col>
            <el-col class="mg-t-5" :span="7" :offset="7">
              <es-search v-model="searchBy" placeholder="Search"></es-search>
            </el-col>
            <el-col :span="3" :offset="1">
              <es-select placeholder="Sort By" class="select-icon"></es-select>
            </el-col>
          </el-row><br />
          <div :style="`display:flex;flex-wrap:wrap`">
            <staff-card @cliks="setDetails" :appointments="setAppointments('active')" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="Upcoming" name="Upcoming">
          <el-row :gutter="20" class="mg-l-5">
            <el-col :span="6" class="mg-t-5 tx-20 text-white">
              {{ setAppointments('upcomingCount') }} Appointments Found
            </el-col>
            <el-col class="mg-t-5" :span="7" :offset="7">
              <es-search v-model="searchBy" placeholder="Search"></es-search>
            </el-col>
            <el-col :span="3" :offset="1">
              <es-select placeholder="Sort By" class="select-icon"></es-select>
            </el-col>
          </el-row><br />
          <div :style="`display:flex;flex-wrap:wrap`">
            <staff-card @cliks="setDetails" :appointments="setAppointments('upcoming')" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="Past" name="Past">
          <el-row :gutter="20" class="mg-l-5">
            <el-col :span="6" class="mg-t-5 tx-20 text-white">
              {{ setAppointments('pastCount') }} Appointments Found
            </el-col>
            <el-col class="mg-t-5" :span="7" :offset="7">
              <es-search v-model="searchBy" placeholder="Search"></es-search>
            </el-col>
            <el-col :span="3" :offset="1">
              <es-select placeholder="Sort By" class="select-icon"></es-select>
            </el-col>
          </el-row><br />
          <div :style="`display:flex;flex-wrap:wrap`">
            <staff-card @cliks='setDetails' :appointments="setAppointments('past')" />
          </div>
        </el-tab-pane>
      </el-tabs>
      <past-detail @update="showSideBar = false;getAppointments" v-if="appointment.id" :show="showSideBar" :appointment="appointment" :activeDetail="actives" :__onCancel="() => (showSideBar = !showSideBar)" />
    </es-container>
  </div>
</template>

<script>
import staffCard from '@/components/student/connect/appointment/staffCard.vue'
import pastDetail from '@/components/student/connect/appointment/pastDetail.vue'
import { dispatchGraphql } from '@/api/dispatcher'
import { getId } from '@/util/auth'
import moment from 'moment'
export default {
  components:{ staffCard, pastDetail },
  data: () => ({
    showSideBar: false,
    actives: false,
    activeName: "active",
    appointment: {},
    appointments: [],
  }),
  created() {
    this.getAppointments()
  },
  methods:{
    setDetails(val) {
      this.appointment = val
      if (this.activeName == "active" || this.activeName == "Upcoming") {
        this.actives = true
        this.showSideBar = true
      } else {
        this.actives = false
        this.showSideBar = true
      }
    },
    setAppointments(type) {
      var activeAppointments = []
      var upcomingAppointments = []
      var pastAppointments = []
      for (const appointment of this.appointments) {
        if (appointment.status === 'pending') {
          if (moment().format('YYYY-MM-DD') === moment(appointment.start_time).format('YYYY-MM-DD')) {
            activeAppointments.push(appointment)
          } else if (moment(appointment.start_time).format('YYYY-MM-DD') > moment().format('YYYY-MM-DD')) {
            upcomingAppointments.push(appointment)
          } else {
            pastAppointments.push(appointment)
          }
        } else {
          pastAppointments.push(appointment)
        }
      }
      if (type === 'active') {
        return activeAppointments
      } else if (type === 'upcoming') {
        return upcomingAppointments
      } else if (type === 'past') {
        return pastAppointments
      } else if (type === 'activeCount') {
        return activeAppointments.length
      } else if (type === 'upcomingCount') {
        return upcomingAppointments.length
      } else if (type === 'pastCount') {
        return pastAppointments.length
      }
    },
    getAppointments() {
      const query = `query($id: uuid) {
        appointments(where: {_and: [{created_by_id: {_eq: $id}}, {appointment_user_type: {_eq: "Parent"}}]}) {
          id
          title
          start_time
          status
          location
          audience {
            id
            status
            user {
              id
              first_name
            }
          }
        }
      }`
      dispatchGraphql(query, { id: getId() }).then((response) => {
        this.appointments = response.appointments
      })
    }
  }
}
</script>
