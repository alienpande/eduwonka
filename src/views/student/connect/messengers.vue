<template>
  <div class="bg-black-5">
    <div class="bg-black-2 headers-messenger">
      <el-row>
        <el-col :span="14">
          <div>
            <div class="text-white tx-28 f-500">
              Class Representatives
            </div>
            <div class="text-gray-6 fs-18" style="padding-top: 10px">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua.
            </div>
          </div>
        </el-col>
        <el-col :span="6" :offset="2">
          <div style="opacity: 0.8; padding-bottom: 10px" class="text-white fs-16 f-500">
            Members
          </div>
          <div class="d-flex">
            <div v-for="moderator in moderatorUsers" :key="moderator" style="postion: relative">
              <img v-if="moderator.user_profile_id" style="width: 36px;height: 36px;border: 1px solid #707070;border-radius: 50%;margin-left: -10px;" :src="moderator.attachment.small_url" alt="" />
            </div>
            <div @click="repre = true" style="border-radius: 35px;padding: 10px 15px;height: 20px;width: 12px;" class="pointer bg-blue tx-16 text-white mg-l-3">
              +{{room.moderators ? room.moderators.length : 0}}
            </div>
          </div>
        </el-col>
        <el-col :span="2">
          <es-button text="Edit" icon="pencildark" />
        </el-col>
      </el-row>
    </div>
    <div class="messenger-body">
      <div v-for="(m, i) in messages" :key="i">
        <br />
        <div class="messenger-recieve" v-if="m.user_id !== current_user">
          <div class="d-flex">
            <el-avatar :size="38" :src="require('@/assets/images/profile.jpg')"/>
            <div style="margin: 8px" class="text-white fs-16 f-500">
              {{ m.user.first_name }}
            </div>
          </div>
          <el-card shadow="none" style="border: none;width: 690px; margin-top: 10px" class="text-white rounded-08 bg-black-3">
            {{ m.content }}
          </el-card>
        </div>

        <div class="messenger-send" v-else>
          <br />
          <div class="d-flex" style="justify-content: end">
            <el-avatar :size="38" :src="require('@/assets/images/profile.jpg')" />
            <div style="margin: 8px" class="text-white fs-16 f-500">
              {{ m.user.first_name }}
            </div>
          </div>
          <el-card shadow="none" style="border: none;width: 690px;margin-top: 10px;display: block;margin-left: auto;" class="text-white rounded-08 bg-black-3">
            {{ m.content }}
          </el-card>
        </div>
      </div>
    </div>
    <div class="bg-black-4 d-flex" style="bottom: 0px;left: 290px; position: absolute; right: 0">
      <input v-model="message.content" class="message-input tx-16" type="text" style="background-color : #1E1E1E;font-style: italic;padding-left: 20px;height: 80px;flex: 1;" placeholder="Type your message here" />
      <img src="@/assets/images/smily.png" style="width: 77px; height: 85px" alt="" />
      <button @click="handleSubmit()" class="text-center" style="width: 166px;background: #FE9D2B 0% 0% no-repeat padding-box;border: 1px solid #FE9D2B;color: white;font-size: 18px;font-weight: 600;">
        SEND
      </button>
    </div>
    <class-repre :moderators="moderatorUsers" :room="room" :show="repre" :__onCancel="() => (repre = !repre)" />
  </div>
</template>
<script>
import classRepre from "@/components/student/connect/classRepre.vue";
import { getId } from '@/util/auth'
import { dispatchGraphql, dispatchGraphqlMutation } from '@/api/dispatcher'
export default {
  components: { classRepre },
  channels: {
      RpiChannel: {
        connected() {
          console.log('connected to room');
        },
        rejected(data) {
          console.log('rejected', data);
        },
        received(data) {
          console.log('received data', data);
          this.messages.push(data.message)
        },
        disconnected() {
          console.log('disconnected from room');
        }
      }
    },
    watch:{
      $route (to, from){
          this.getRoomMessages()
        }
      },
  data: () => ({
    repre: false,
    moderatorUsers: [],
    current_user: '',
    loading: true,
    repre: false,
    messages: [],
    room: {},
    message: {}
  }),
  created(){
    this.current_user = getId()
    this.message.user_id = getId()
    this.getRoomMessages()
  },
  mounted() {
      this.connectToServer()
    },
  methods: {
    connectToServer() {
        console.log('Connecting to server')
        this.$cable.subscribe({
          channel: 'RpiChannel',
          room_id: this.$route.params.id,
          user_id: getId()
        })
      },
    handleSubmit: function(){
      this.message.room_id = this.$route.params.id
      dispatchGraphqlMutation('messages', ['id', 'content', 'user_id', {user: ['id', 'first_name', 'last_name']}], this.message).then((response) => {
        console.log(response);
        this.$cable.perform({
          channel: 'RpiChannel',
          action: 'message_from_rpi',
          data: {
            message: response.insert_messages_one
          }
        })
        this.message.content = ''

      })
    },
    getRoomMessages: function() {
      this.loading = true
      const query = `
        query($id: uuid!) {
          rooms_by_pk(id: $id) {
            id
            created_at
            created_by_id
            created_by{
              first_name
              last_name
            }
            room_users{
              id
              user{
                first_name
                last_name
                attachment{
                  small_url
                }
              }
            }
            moderators
            messages{
              id
              content
              user_id
              user{
                id
                first_name
              }
            }
          }
        }
      `
      dispatchGraphql(query, { id: this.$route.params.id }).then(response => {
        this.messages = response.rooms_by_pk.messages
        this.room = response.rooms_by_pk
        console.log('roomsssSs', this.room);
        this.loading = false
        this.getModerators()
      })
    },
    getModerators: function(){
      const query = `query ($ids: [uuid!]) {
        users(where: {id: {_in: $ids}}) {
          id
          first_name
          last_name
          user_profile_id
          attachment{
            small_url
          }
        }
      }`
      dispatchGraphql(query, { ids: this.room.moderators }).then(response => {
        console.log('array of users', response);
        this.moderatorUsers = response.users
      })
    }
  }
};
</script>
<style>
.headers-messenger {
  background: #1E1E1E;
  padding: 30px;
}
.messenger-body {
  padding: 40px;
  height: 53vh;
  overflow: scroll;
}
.message-input::placeholder {
  color: #4d4f5c;
}
</style>
