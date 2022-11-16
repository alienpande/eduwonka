<template>
  <div >
    <el-row style="margin-bottom:20px"  > 
      <el-col style="width:22rem" class="messenger-card">
        <el-card shadow="none">
          <el-row>
            <el-col :span="4" :offset="1">
              <el-avatar
                :size="68"
                :src="require('@/assets/images/profile.jpg')"
              />
            </el-col>
            <el-col :span="10" :offset="3">
              <div class="fs-20 f-600" style="color: #000000; opacity: 0.8">
                {{user.first_name}} {{user.last_name}}
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <div style="color: #000000; opacity: 0.8; font-size: 300">
                Phone Number
              </div>
              <div style="color: #000000; opacity: 0.8; font-size: 500">
               {{user.mobile_number}}
              </div>
            </el-col>
            <el-col :span="11" :offset="3">
              <div v-if="user.role === 'student'" style="color: #000000; opacity: 0.8; font-size: 300">
                Roll Number
              </div>
              <div v-else style="color: #000000; opacity: 0.8; font-size: 300" >
                Employee Id
              </div>
              <div style="color: #000000; opacity: 0.8; font-size: 500">
               {{user.roll_number}}
              </div>
            </el-col>
          </el-row>
          <button
            @click="createRoom(user)"
            style="
            border: 1px solid rgb(230, 234, 237);
            border-radius: 5px;
            color: white;
            background: rgb(188, 108, 66);
            display: block;
            padding: 9px 75px;
            margin: auto;
            margin-top: 8px;
            color: #FFFFFF;font-size:16px;font-weight:600">
            Direct Message
          </button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { dispatchGraphqlMutation, dispatchGraphql } from "@/api/dispatcher"
import {getId} from "@/util/auth"
export default {
  props: ['user'],
  components: {},
  data: () => ({}),
  created(){},
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
    },
  }
}
</script>
