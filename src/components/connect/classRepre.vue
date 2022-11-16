<template>
  <right-side-bar :show="show" @onClose="__onCancel">
    <div style="width: 321px" class="heading">Class Representatives</div>
    <hr style="opacity: 0.2" />
    <br />
    <div style="opacity: 0.8; padding-left: 30px" class="fs-20 f-500">
      Moderators
    </div>
    <br />

    <el-row>
      <el-col :span="3" :offset="2">
        <el-avatar :size="58" :src="require('@/assets/images/profile.jpg')" />
      </el-col>
      <el-col :span="4">
        <div style="margin-top: 0px; font-size: 16px" class="heading">
          Rachael Kenneth
        </div>
      </el-col>
      <el-col :span="3" :offset="3">
        <el-avatar :size="58" :src="require('@/assets/images/profile.jpg')" />
      </el-col>
      <el-col :span="4">
        <div style="margin-top: 0px; font-size: 16px" class="heading">
          Rachael Kenneth
        </div>
      </el-col>
    </el-row>
    <br />
    <el-row>
      <el-col :span="3" :offset="2">
        <el-avatar :size="58" :src="require('@/assets/images/profile.jpg')" />
      </el-col>
      <el-col :span="4">
        <div style="margin-top: 0px; font-size: 16px" class="heading">
          Rachael Kenneth
        </div>
      </el-col>
      <el-col :span="3" :offset="3">
        <el-avatar :size="58" :src="require('@/assets/images/profile.jpg')" />
      </el-col>
      <el-col :span="4">
        <div style="margin-top: 0px; font-size: 16px" class="heading">
          Rachael Kenneth
        </div>
      </el-col>
    </el-row>

    <div class="sb-section__2">
      <div class="pd-x-30 pd-10 pd-b-30">
        <el-card
          shadow="none"
          style="background: rgba(248, 243, 238, 0.35)"
          class="rounded-08 text-center classroom-right__slide"
        >
          <el-row style="opacity: 0.8">
            <el-col
              :span="12"
              style="
                border-right: 2px solid #fcdfbd;
                border-bottom: 2px solid #fcdfbd;
                padding: 10px;
              "
            >
              <span>Members</span> <br />
              <span style="color: rgb(0, 0, 0); font-weight: bold">44</span>
            </el-col>
            <el-col
              :span="12"
              style="border-bottom: 2px solid #fcdfbd; padding: 10px"
            >
              <span>Chats</span> <br />
              <span style="color: rgb(0, 0, 0); font-weight: bold">2450</span>
            </el-col>
            <el-col
              style="border-right: 2px solid #fcdfbd; padding: 10px"
              :span="12"
            >
              <span>Created on</span> <br />
              <span style="color: rgb(0, 0, 0); font-weight: bold"
                >14th June 2000</span
              >
            </el-col>
            <el-col style="padding-top: 10px" :span="12">
              <span>Created by</span> <br />
              <span style="color: rgb(0, 0, 0); font-weight: bold">
                14th June 2000</span
              >
            </el-col>
          </el-row>
        </el-card>
      </div>
      <div style="background: #e6eaed; padding: 10px 0" class="repre-members">
        <div style="opacity: 0.8; padding-left: 30px" class="fs-20 f-500">
          Members
        </div>
        <div class="d-flex" v-for="i in 5" :key="i" style="margin:10px 20px;padding:10px 30px;background:white;box-shadow: 0px 13px 21px #00000026; border-radius: 10px;justify-content:space-between">
          <div style="font: normal normal normal 16px/20px Poppins;
letter-spacing: 0px;
color: #4D4F5C;padding:10px 10px;">Kenneth Sebastian</div>
<e-button :span="8" label='Message'></e-button>
        </div>
      </div>
    </div>
  </right-side-bar>
</template>
<script>
import EButton from '../../controls/eButton.vue';
import RightSideBar from "./../../components/school/rightSideBar.vue";

export default {
  components: { RightSideBar, EButton },
  props: {
    show: { type: Boolean, default: false },
    __onCancel: Function,
  },
};
</script>
<style>
.sb-section__2 {
  height: 400px;
  overflow-y: scroll;
  padding-bottom: 200px;
}
</style>
