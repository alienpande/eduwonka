<template>
  <div>
    <el-col :span="6" :offset="1" class="mg-t-30">
      <el-card class="pointer rounded-08 bg-black-2" :style="'border: none'" shadow="none">
        <div>
          <el-row>
            <el-col :span="4" :offset="1">
              <el-avatar shape="circle" :size="70" :src="require('@/assets/images/profile.jpg')" />
            </el-col>
            <el-col :span="10" :offset="2" class="mg-t-15">
              <div class="text-white" style="opacity: 60%">Name</div>
              <div class="text-white tx-18 tx-bolder">{{user.first_name}} {{user.last_name}}</div>
            </el-col>
          </el-row>
          <el-row class="mg-t-10">
            <el-card class="rounded-08 bg-black-3" :style="'border: none'" shadow="none">
              <el-row>
                <el-col :span="10" :offset="1">
                  <div class="text-white" style="opacity: 60%">Phone number</div>
                  <div class="text-white">{{user.mobile_number}}</div>
                </el-col>
                <el-col :span="11" :offset="3">
                  <div v-if="user.role === 'student'" class="text-white" style="opacity: 60%">Roll Number</div>
                  <div v-else class="text-white" style="opacity: 60%">Employee Id</div>
                  <div class="text-white">{{user.roll_number}}</div>
                </el-col>
              </el-row>
            </el-card>
          </el-row><br />
          <el-row>
            <es-button @click="createRoom(user)" text="Direct " :plain="true" />
          </el-row>
        </div>
      </el-card>
    </el-col>
  </div>
</template>
<script>
import { dispatchGraphqlMutation, dispatchGraphql } from "@/api/dispatcher"
import {getId} from "@/util/auth"
export default {
  name: 'messangerCard',
  props: ['user'],
  components: {},
  data: () => ({}),
  created() {

  },
  methods: {
    createRoom: function() {
      var tempName = this.user.first_name + this.user.last_name
      dispatchGraphqlMutation('rooms', ['id'], {name: tempName, room_type: 'Direct'}).then((response) => {
        this.createRoomUsers(response.insert_rooms_one.id)
      })
    },
    getAudience(data) {
      return {
        "objects": data
      }
    },
    createRoomUsers: function(roomId) {
      var roomUsers = [{user_id: this.user.id, room_id: roomId}, {user_id: getId(), room_id: roomId}]
      const mutation = `mutation($objects: [room_users_insert_input!]!) {
        insert_room_users(objects: $objects) {
          affected_rows
          returning {
            id
          }
        }
      }`
      dispatchGraphql(mutation, this.getAudience(roomUsers)).then(response => {
        console.log(response)
        this.$notify({
          type: 'success',
          title: 'Added Direct Message'
        })
      })
    }
  }
}
</script>
