<template>
  <div>
    <el-row>
      <el-col :span="window.width > 767 ? 5 : 24">
        <e-input v-model="appointment.title" class="custom-input" label="Name of the appointment" placeholder="Enter Name" />
      </el-col>
      <el-col :style="{'margin-top': window.width < 767 && '3px' }" :span="window.width > 767 ? 5 : 24" :offset="window.width > 767 && 2">
        <e-date-picker :span="window.width > 767 ? 12 : 24" v-model="appointment.start_time" type="datetime" name="Set Date" placeholder="Pick a Date" @change="changeDate" format="MM/dd/yyyy hh:mm:ss" />
      </el-col>
      <el-col :style="{height: window.width < 767 && '56px' }" :span="window.width > 767 ? 6 : 24" :offset="window.width > 767 && 1">
        <br />
        <div style="display: flex; margin-top: 10px">
          <e-checkbox :span="window.width > 767 ? 12 : 24" text="No, Set Infinite Date" v-model="appointment.reccuring" />
        </div>
      </el-col>
    </el-row>
    <el-row>
    <el-col :span="window.width > 767 ? 5 : 24" class="channel-1-select">
      <e-select :span="window.width > 767 ? 12 : 24" label="Location" placeholder="Choose Location" :v-model="appointment.location" :options="locations" :optionName="'label'" :valueKey="'value'" @visible-change="setLocation" />
      <br /><br /><br /><br />
      <div style="display: inline-flex">
        <e-svg icon="Group" />
        <div class="channel-1-agr" style="margin-left: 11px; opacity: 0.4; font-size: 14px">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu
          venenatis tellus. Fusce faucibus est vitae facilisis consectetur.
        </div>
      </div>
    </el-col>
    </el-row>
    <el-row class="channel-1-btns" style="border-top: 1px solid #fcdfbd; margin-top: 20px">
      <el-col style="float: right" :span="window.width > 767 && 10">
        <e-button :span="window.width > 767 ? 15 : 12" label="Cancel" width="180" css="cancel_btn" type="default" :class="window.width > 767 ? 'p-45' : 'pr-45 pl-45'" ></e-button>
        <e-button :span="window.width > 767 ? 8 : 12" label="Create appointment" width="210" @click="submit()" css="float-right" :class="window.width > 767 ? 'p-45' : 'pr-45 pl-45'"></e-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { dispatchGraphqlMutation, dispatchGraphql } from "@/api/dispatcher"
import { getId } from '@/util/auth'
import moment from 'moment'
import screenSize from "@/mixins/screenSize"

export default {
  mixins: [screenSize],
  components: {},
  data() {
    return {
      classroomApi: process.env.VUE_APP_CLASSROOM_API,
      appointment: {},
      user: {},
      locations: [
        {
          label: "Online",
          value: "online",
        },
        {
          label: "Offline",
          value: "offline",
        }
      ],
    };
  },
  created() {
    this.setType(this.$route.params.type)
    this.getUser()
  },
  methods: {
    setType(type) {
      if (type === 'staff') {
        this.appointment.appointment_user_type = 'Staff'
      } else if (type === 'parent') {
        this.appointment.appointment_user_type = 'Parent'
      } else {
        this.appointment.appointment_user_type = 'Student'
      }
    },
    submit() {
      this.appointment.created_by_id = getId()
      this.appointment.updated_by_id = getId()
      this.appointment.status = "pending"
      this.appointment.reccuring = this.appointment.reccuring ? true : false
      console.log(this.appointment, 'appointment')
      dispatchGraphqlMutation('appointments', ['id', 'title'], this.appointment).then((response) => {
        if(this.appointment.location === 'online'){
          this.createClassroom()
        }
        this.$emit('save', response.insert_appointments_one.id)
      })
    },

    //Creating Video call room
     getUser() {
       const query = `
         query user($id: uuid!) {
           users_by_pk(id: $id) {
             id
             email
             first_name
             last_name
             role
           }
         }
       `
       dispatchGraphql(query, { id: getId() }).then(response => {
         this.user = response.users_by_pk
         console.log('user', response.users_by_pk)
       })
     },

     // Create JWT Token
     async getToken(){
       const requestOptions = {
         method: 'POST',
         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
         body: new URLSearchParams({ userId: this.user.id, name:this.user.first_name, role:"Publisher" })
       };
       const uri = this.classroomApi + '/Classroom/createJWT'

       const response = await fetch(uri, requestOptions);
       const data = await response.json();
       return data.token;
     },

     async createClassroom(){
       const jwtToken = await this.getToken()
       let className = this.appointment.title
       className = className.replace(/[^A-Z0-9.]+/ig, "_");
       let uri = this.classroomApi + '/Classroom/create_room'

       let formData = new FormData();
       formData.append('roomname', className);
       formData.append('max_peers_count', 30);

       fetch(uri, {
         method: "POST",
         headers: {
           "Content-Type": "application/x-www-form-urlencoded",
           'x-access-token': jwtToken,
         },
         body: new URLSearchParams(formData),
       })
       .then((response) => {
         console.log('socket resp', response.json());
       })
       .then((data) => {
         console.log(data);
       })
       .catch((err) => console.log("The error is: " + err));
     },

    setLocation(val) {
      this.appointment.location = val
    },
    changeDate: function(value) {
      this.appointment.start_time = moment(value).format('')
    }
  }
};
</script>

<style scoped>

</style>
