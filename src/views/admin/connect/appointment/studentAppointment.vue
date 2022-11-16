<template>
  <div>
    <e-container pageTitle="Student Appointments" btnIcon="el-icon-plus" btnText="New Appointment" @btnClick="$router.push('/connect/createstaff-apointment/student')">
      <el-tabs class="floatTabHeader" v-model="activeName">
        <el-tab-pane label="Active" name="active"> 
          <el-row>
            <el-col :span="3">
              <div style="color: #222222" class="fs-16 f-500">
                {{ setAppointments('activeCount') }} appointments
              </div>
            </el-col>
            <el-col :span="3" :offset="16">
              <e-dropdown :list="filter" primary />
            </el-col>
            <el-col style="padding-left: 10px" :span="1">
              <e-button icon="el-icon-search" :plain="true" css="bg-tranparent sort-icon" />
            </el-col>
          </el-row>
          <div style="display:flex;flex-wrap:wrap">
            <staff-card @cliks="setDetails" :appointments="setAppointments('active')" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="Upcoming" name="Upcoming">
          <el-row>
            <el-col :span="3">
              <div style="color: #222222" class="fs-16 f-500">
                {{ setAppointments('upcomingCount') }} appointments
              </div>
            </el-col>
            <el-col :span="3" :offset="16">
              <e-dropdown :list="filter" primary />
            </el-col>
            <el-col style="padding-left: 10px" :span="1">
              <e-button icon="el-icon-search" :plain="true" css="bg-tranparent sort-icon" />
            </el-col>
          </el-row>
          <div style="display:flex;flex-wrap:wrap">
            <staff-card  @cliks="setDetails" :appointments="setAppointments('upcoming')" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="Past" name="Past">
          <el-row>
            <el-col :span="3">
              <div style="color: #222222" class="fs-16 f-500">
                {{ setAppointments('pastCount') }} appointments
              </div>
            </el-col>
            <el-col :span="3" :offset="16">
              <e-dropdown :list="filter" primary />
            </el-col>
            <el-col style="padding-left: 10px" :span="1">
              <e-button icon="el-icon-search" :plain="true" css="bg-tranparent sort-icon" />
            </el-col>
          </el-row>
          <div style="display:flex;flex-wrap:wrap">
            <staff-card  @cliks='setDetails' :appointments="setAppointments('past')" />
          </div>
        </el-tab-pane>
      </el-tabs>
      <past-detail @update="showSideBar = false;getAppointments" v-if="appointment.id" :show="showSideBar" :appointment="appointment" :activeDetail="actives" :__onCancel="() => (showSideBar = !showSideBar)" />
    </e-container>
  </div>
</template>

<script>
import staffCard from '@/components/connect/apointment/staffCard.vue'
import pastDetail from '@/components/connect/apointment/pastDetail.vue'
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
    filter: [
      { text: "New - Old" },
      { text: "Standard 2" },
      { text: "Standard 3" },
    ],
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
        appointments(where: {_and: [{created_by_id: {_eq: $id}}, {appointment_user_type: {_eq: "Student"}}]}) {
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
};
</script>
