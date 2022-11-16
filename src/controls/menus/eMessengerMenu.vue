<template>
  <el-row>
    <el-col :span="24">
      <el-menu class="exam-subject-title">
        <el-menu-item class="sub-menu-title">
          <span slot="title"> {{ standard.title }}</span>
          <img @click="$router.push('/connect/create-channel')"
            style="float: right; margin-top: 12px"
            src="@/assets/images/plus-circle.png"
            alt=""
          />
        </el-menu-item>
      </el-menu>
      <el-menu :class="standardClass" v-loading="loading">
        <el-menu-item
          v-for="(item, index) in channelMessages"
          v-bind:item="item"
          v-bind:key="index"
          @click="standardMenuClick(item)"
          :class="
            activeStandard === item.name ? 'active-menu' : 'noactive-menu'
          "
        >
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="24" v-show="selectedSubjects.length">
      <el-menu class="exam-subject-title">
        <el-menu-item class="sub-menu-title">
          <span slot="title">Direct Message</span>
           <img
           @click="$router.push('/connect/messenger-connect')"
            style="float: right; margin-top: 12px"
            src="@/assets/images/plus-circle.png"
            alt=""
          />
        </el-menu-item>
      </el-menu>
      <el-menu :class="subjectClass" v-loading="loading1">
        <el-menu-item
          v-for="(item, index) in directMessages"
          v-bind:item="item"
          v-bind:key="index"
          @click="standardMenuClick(item)"
          :class="activeSubject === getName(item) ? 'active-menu' : 'noactive-menu'"
          :ref="getName(item)"
        >
          <span slot="title">{{ getName(item) }} </span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
import { dispatchGraphql } from "@/api/dispatcher";
import { mapGetters, mapMutations } from "vuex";
import { getId } from '@/util/auth'
export default {
  props: ["golink"],
  data() {
    return {
      channelMessages: [],
      directMessages: [],
      loading: true,
      loading1: true,
      activeSubject: "",
      activeStandard: "",
      user: {},
      subject: {
        title: "bal",
        menu: [
           { id: 1, title: "Stephen Rogridious 1", routes: [] },
        { id: 2, title: "Stephen Rogridious 2", routes: [] },
        { id: 3, title: "Stephen Rogridious 3", routes: [] },
        { id: 4, title: "Stephen Rogridious 4", routes: [] },
        { id: 5, title: "Stephen Rogridious 5", routes: [] },
        { id: 6, title: "Stephen Rogridious 6", routes: [] },
          { id: 7, title: "Stephen Rogridious 7", routes: [] },
        ],
      },
      selectedSubjects: [
        { id: 1, title: "Stephen Rogridious 1", routes: [] },
        { id: 2, title: "Stephen Rogridious 2", routes: [] },
        { id: 3, title: "Stephen Rogridious 3", routes: [] },
        { id: 4, title: "Stephen Rogridious 4", routes: [] },
        { id: 5, title: "Stephen Rogridious 5", routes: [] },
        { id: 6, title: "Stephen Rogridious 6", routes: [] },
          { id: 7, title: "Stephen Rogridious 7", routes: [] },

      ],
    };
  },
  methods: {
    ...mapGetters("Common", ["view", "examMenu"]),
    ...mapMutations("Common", ["setExamMenu"]),
    // getUser: function() {
    //   const query = `query($id: uuid!) {
    //     users_by_pk(id:$id) {
    //       role
    //     }
    //   }`
    //   dispatchGraphql(query, { id: getId() }).then((response) => {
    //     this.user = response.users_by_pk
    //     console.log('dddddddddddd', this.user);
    //   })
    // },
    getName: function(item){
      if (item.room_users[0].user_id !== getId()){
        return (item.room_users[0].user.first_name)
      }else {
        return (item.room_users[1].user.first_name)
      }
    },
    getChannels: function(){
      const query = `
        query ($user_id: uuid, $room_type:  String){
          rooms(where: {room_users: {user_id: {_eq: $user_id}}, room_type: {_eq: $room_type}}) {
            id
            name
          }
        }
      `
      dispatchGraphql(query, {user_id: getId(), room_type: 'Channel'}).then(response => {
        this.channelMessages = response.rooms
        console.log('channelMessages', this.channelMessages);
        // this.directMessages = response.rooms.filter(x => x.room_type === 'Direct')
        this.loading = false
      })
    },
    getDirectRooms: function(){
      this.loading1 = true
      const query = `
        query ($user_id: uuid, $room_type:  String){
          rooms(order_by: {recently_updated_at: desc}, where: {room_users: {user_id: {_eq: $user_id}}, room_type: {_eq: $room_type}}) {
            id
            name
            room_users{
              user_id
              user{
                id
                first_name
                last_name
              }
            }
          }
        }
      `
      dispatchGraphql(query, {user_id: getId(), room_type: 'Direct'}).then(response => {
        // this.channelMessages = response.rooms.filter(x => x.room_type === 'Channel')
        this.directMessages = response.rooms
        this.loading1 = false
        console.log('directMessages', this.directMessages);
      })
    },
    standardMenuClick(i) {
      this.activeStandard = i.name;
      this.$router.push(`/connect/messenger/${i.id}`)
      this.$emit("collapse", i);
    },
    subjectMenuClick(i) {
      // this.$go(this.golink, { name: i.name });
      // this.activeSubject = i.name;
      // this.setExamMenu({
      //   subject: i,
      //   standard: this.examMenu()?.standard,
      // });
      // this.$emit("collapse", i);
    },
  },
  computed: {
    subjectClass() {
      return this.view() === "xl" ? "exam-subject-h45" : "exam-subject-h35";
    },
    standardClass() {
      return this.selectedSubjects.length > 0
        ? this.view() === "xl"
          ? "exam-standard-h35"
          : "exam-standard-h30"
        : "exam-standard-h70";
    },
    standard() {
      return {
        title: "Channels",
        menu: [
          { id: 1, title: "Management", routes: this.subject.menu },
          { id: 2, title: "Teachers", routes: this.subject.menu },
          { id: 3, title: "Class Representatives", routes: this.subject.menu },
          { id: 4, title: "Non-Teaching Staff", routes: this.subject.menu },
          { id: 5, title: "Lorem Ipsum", routes: this.subject.menu },

        ],
      };
    },
  },
  created() {
    this.getChannels()
    this.getDirectRooms()
    // this.getUser()
    if (this.examMenu().standard.title) {
      this.activeStandard = this.examMenu().standard.title;
    }
    if (this.examMenu().subject.title) {
      this.activeSubject = this.examMenu().subject.title;
    }
  },
};
</script>

<style></style>
