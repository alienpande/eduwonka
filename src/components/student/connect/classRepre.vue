<template>
  <right-side-bar :show="show" @onClose="__onCancel">
    <div style="opacity: 0.8;width:15rem; padding: 34px;" class="text-white f-600 fs-20">
      Class Representatives
    </div>
    <div class="bg-black-5" style="height: 77vh; overflow: auto">
      <el-row class="mg-l-10">
        <el-col :span="10" :offset="1" style="padding: 14px 5px 14px 10px;" class="mg-t-20 rounded-08 bg-black-2 d-flex justify-content-center">
          <e-svg :style="'padding-top: 10px; padding-right: 10px'" icon="members"></e-svg>
          <div>
            <div class="text-gray-6">Members</div>
            <div class="sub-title">{{room.room_users.length}}</div>
          </div>
        </el-col>
        <el-col :span="10" :offset="1" style="padding: 14px 5px 14px 10px;" class="mg-t-20 rounded-08 bg-black-2 d-flex justify-content-center">
          <e-svg :style="'padding-top: 10px; padding-right: 10px'" icon="chatDark"></e-svg>
          <div>
            <div class="text-gray-6">Chats</div>
            <div class="sub-title">{{room.messages.length}}</div>
          </div>
        </el-col>
        <el-col :span="10" :offset="1" style="padding: 14px 5px 14px 10px;" class="mg-t-20 rounded-08 bg-black-2 d-flex justify-content-center">
          <e-svg :style="'padding-top: 10px; padding-right: 10px'" icon="calenderIcon"></e-svg>
          <div>
            <div class="text-gray-6">Created on</div>
            <div class="sub-title">{{dateFormatter(room.created_at)}}</div>
          </div>
        </el-col>
        <el-col :span="10" :offset="1" style="padding: 14px 5px 14px 10px;" class="mg-t-20 rounded-08 bg-black-2 d-flex justify-content-center">
          <e-svg :style="'padding-top: 10px; padding-right: 10px'" icon="user"></e-svg>
          <div>
            <div class="text-gray-6">Created by</div>
            <div class="sub-title">{{room.created_by_id ? room.created_by.first_name : ''}} {{room.created_by_id ? room.created_by.last_name : ''}}</div>
          </div>
        </el-col>
      </el-row>
      <el-row class="rounded-08 bg-black-2" style="margin: 30px">
        <div style="margin: 20px">
          <el-col>
            <div class="text-white f-600 fs-20">
              Moderators
            </div>
          </el-col>
          <el-row>
            <el-col v-for="moderator in moderators" :key="moderator.id" :span="10" :offset="1" class="mg-t-15">
              <div class="d-flex justify-content-center">
                <el-avatar :size="30" :src="require('@/assets/images/profile.jpg')"/>
                <div class="text-white tx-16" style="margin: 5px">
                  {{moderator.first_name}} {{moderator.last_name}}
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-row>
      <el-row class="rounded-08 bg-black-2" style="margin: 30px">
        <div style="margin: 20px">
          <el-row>
            <el-col>
              <div class="text-white f-600 fs-20">
                Members
              </div>
            </el-col>
          </el-row>
          <el-row v-for="room_user in room.room_users" :key="room_user.id">
            <div class="d-flex mg-t-20">
              <el-avatar :size="42" :src="require('@/assets/images/profile.jpg')"/>
              <div class="text-white tx-16" style="margin: 10px">
                {{room_user.user.first_name}} {{room_user.user.last_name}}
              </div>
              <es-button class="mg-l-60" text="Message" />
            </div>
          </el-row>
        </div>
      </el-row>
    </div>
  </right-side-bar>
</template>
<script>
import RightSideBar from "./../knowledge/rightSideBar.vue"
import moment from 'moment'
export default {
  components: { RightSideBar },
  props: {
    moderators: {
      type: Array,
      default() {
        return null
      }
    },
    room: {
      type: Object,
      default() {
        return null
      }
    },
    show: { type: Boolean, default: false },
    __onCancel: Function,
  },
  methods: {
    dateFormatter(date) {
      return moment(date).format('DD MMM YYYY')
    },
  }
};
</script>
<style>
.sb-section__2 {
  height: 400px;
  overflow-y: scroll;
  padding-bottom: 200px;
}
</style>
