<template>
  <div class="md-h-full md-overflow-scroll">
    <div class="headers-messenger">
      <el-row>
        <el-col :span="8">
          <div >
            <div style="opacity: 0.8;cursor:pointer" @click="repre = true" class="fs-16 f-500">
              Class Representatives
            </div>
            <div style="color: #4d4f5b; font-size: 12px; padding-top: 10px">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua.
            </div>
          </div>
        </el-col>
        <el-col :span="6" :offset="5">
          <div
            style="opacity: 0.8; color: #4d4f5c; padding-bottom: 10px"
            class="fs-16 f-500"
          >
            Members
          </div>
          <div class="d-flex flex-wrap justify-content-between">
            <div v-for="moderator in moderatorUsers" :key="moderator" style="postion: relative" class="ml-10px">
              <img v-if="moderator.user_profile_id" style="width: 36px;height: 36px;border: 1px solid #707070;border-radius: 50%;margin-left: -10px;" :src="moderator.attachment.small_url" alt=""/>
            </div>
            <div
              style="
                border: 1px solid rgb(112, 112, 112);
                border-radius: 17px;
                padding: 6px 15px;
                opacity: 0.8;
                font-size: 12px;
                height: 20px;
                width: 86px;
                display: inline-block;
                margin-left: 9px;
                margin-top: 4px;
              "
            >
              +{{room.moderators ? room.moderators.length : 0}} Members
            </div>
          </div>
        </el-col>
        <el-col :span="4">
          <e-button
            label="Edit Channel"
            css="sort-icon"
            :plain="true"
          ></e-button>
        </el-col>
      </el-row>
    </div>
    <div class="messenger-body" v-loading="loading">
      <div v-for="(m, i) in messages" :key="i">
        <br />
        <div class="messenger-recieve" v-if="m.user_id !== current_user">
          <div class="d-flex">
            <el-avatar
              :size="38"
              :src="require('@/assets/images/profile.jpg')"
            />
            <div style="color: #4d4f5c; margin: 8px" class="fs-16 f-500">
              {{ m.user.first_name }}
            </div>
          </div>
          <el-card
            shadow="none"
            style="width: 690px; color: #000000; opacity: 0.8; margin-top: 10px"
            class="rounded-08 messenger-msg"
          >
            {{ m.content }}
          </el-card>
        </div>

        <div class="messenger-send" v-else>
          <br />
          <div class="d-flex" style="justify-content: end">
            <el-avatar :size="38" :src="require('@/assets/images/profile.jpg')"/>
            <div style="color: #4d4f5c; margin: 8px" class="fs-16 f-500">
              {{ m.user.first_name }}
            </div>
          </div>
          <el-card shadow="none" style="width: 690px;color: #000000;opacity: 0.8;margin-top: 10px;display: block;margin-left: auto;" class="rounded-08 messenger-msg">
            {{ m.content }}
          </el-card>
        </div>
      </div>
    </div>
    <div
      class="d-flex connect-type-msg"
      style="bottom: 0px;     left: 349px; position: absolute; right: 0"
    >
      <input
        v-model="message.content"
        class="message-input"
        type="text"
        style="
          font-style: italic;
          font-size: 16px;
          padding-left: 20px;
          opacity: 0.6;
          border: 1px solid #e6eaed;
          height: 80px;
          flex: 1;
        "
        placeholder="Type your message here"
      />
      <img
        src="@/assets/images/msgIcon.png"
        style="width: 77px; height: 80px"
        alt=""
      />
      <button
        @click="handleSubmit()"
        style="
          text-align: center;
          width: 166px;
          background: #bc6c42 0% 0% no-repeat padding-box;
          border: 1px solid #e6eaed;
          color: white;
          font-size: 18px;
          font-weight: 600;
        ">
        SEND
      </button>
    </div>
    <class-repre :show="repre" :__onCancel="() => (repre = !repre)" class="repre-popup"/>
  </div>
</template>
<script>
import classRepre from "@/components/connect/classRepre.vue";
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
    current_user: '',
    loading: true,
    repre: false,
    messages: [],
    message: {},
    moderatorUsers: [],
    room: {}
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
        this.loading = false
        this.getModerators()
      })
    },getModerators: function(){
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
        this.moderatorUsers = response.users
      })
    }
    // getRoomMessages: function() {
    //   this.loading = true
    //   const query = `
    //     query($room_id: uuid) {
    //       messages(where: {room_id: {_eq: $room_id}}) {
    //         id
    //         content
    //         user_id
    //         user{
    //           id
    //           first_name
    //         }
    //       }
    //     }
    //   `
    //   dispatchGraphql(query, { room_id: this.$route.params.id }).then(response => {
    //     this.messages = response.messages
    //     this.loading = false
    //   })
    // }
  }
};
</script>
<style>
.headers-messenger {
  background: white;
  padding: 30px;
}
.messenger-body {
  padding: 40px;
  height: 43vh;
  overflow: scroll;
}
.message-input::placeholder {
  color: #4d4f5c;
}
</style>
