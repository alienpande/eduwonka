<template>
  <div>
    <div class="messenger-header">
      <div>Contact </div>
      <e-svg icon="close2" />
    </div>
    <div style="margin-top: 30px; padding: 0 60px" class="connect-contact">
      <el-tabs class="floatTabHeader" v-model="activeName">
        <el-tab-pane
          class="contact-container"
          label="Students"
          style="height: 66vh; overflow: scroll"
          name="activeclassroom"
        >
          <div
            class="connect-student-list"
            style="display: flex; justify-content: space-between; width: 70rem"
          >
            <div style="color: #222222; font-size: 20px; font-weight: 500">
              {{users.length}} students
            </div>
            <e-button icon="el-icon-search" :plain="true" :span="2" label="Search">
            </e-button>
            <div class="">
              <el-select v-model="section" @change="getStudents(section)">
                <el-option v-for="item in sections" :key="item.id" :label="item.standard.name + ' ' + item.name" :value="item.id" />
              </el-select>
            </div>
          </div>
          <br />
          <div style=" display: flex; flex-wrap: wrap; justify-content: space-around;">
            <messenger-card v-for="user in users" :key="user.id" :user="user" v-if="!loading"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Teachers" name="dds">
          <div style="display:flex;flex-wrap:wrap;justify-content:space-around;" class="float-left">
            <div style="color: #222222; font-size: 20px; font-weight: 500">
              {{teachers.length}} teachers
            </div>
            <e-button icon="el-icon-search" :plain="true" :span="2" label="Search"> </e-button>
          </div>
          <br />
          <div style=" display: flex; flex-wrap: wrap; justify-content: space-around;">
            <messenger-card v-for="user in teachers" :key="user.id" :user="user" v-if="!loading"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Management" name="12">
          <div style="display:flex;flex-wrap:wrap;justify-content:space-around;" class="float-left">
            <div style="color: #222222; font-size: 20px; font-weight: 500">
              {{management.length}} management
            </div>
            <e-button icon="el-icon-search" :plain="true" :span="2" label="Search"> </e-button>
          </div>
          <br />
          <div style=" display: flex; flex-wrap: wrap; justify-content: space-around;">
            <messenger-card v-for="user in management" :key="user.id" :user="user" v-if="!loading"/>
          </div>
         </el-tab-pane>
        <el-tab-pane label="Non-Teaching" name="123">
          <div style="display:flex;flex-wrap:wrap;justify-content:space-around;" class="float-left">
            <div style="color: #222222; font-size: 20px; font-weight: 500">
              {{non_teaching.length}} non_teaching
            </div>
            <e-button icon="el-icon-search" :plain="true" :span="2" label="Search"> </e-button>
          </div>
          <br />
          <div style=" display: flex; flex-wrap: wrap; justify-content: space-around;">
            <messenger-card v-for="user in non_teaching" :key="user.id" :user="user" v-if="!loading"/>
          </div>
         </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import { dispatchGraphql } from '@/api/dispatcher'
import messengerCard from "@/components/connect/messengerCard.vue";
export default {
  components: { messengerCard },
  data: () => ({
    activeName: "activeclassroom",
    sections: [],
    section: '',
    users: [],
    teachers: [],
    management: [],
    non_teaching: [],
    loading: true
  }),
  mounted() {
      this.hideAsideMenuMobile()
  },
  created(){
    this.getStandards()
    this.getTeachers()
  },
  methods: {
    ...mapMutations("Common",["hideAsideMenuMobile"]),
    getStandards() {
      this.loading = true
      const query = `
        query {
          sections(order_by: {standard: {name: asc}}) {
            id
            name
            standard {
              id
              name
            }
          }
        }
      `
      dispatchGraphql(query).then(response => {
        this.sections = response.sections
        this.section = this.sections[0].id
        this.getStudents(this.section.id)
      })
    },
    getTeachers() {
      this.loading = true
      const query = `
        query {
          users(where: {_not: {room_users: {room: {room_type: {_eq: "Direct"}}}}, role: {_in: ["management", "admin", "teachers"]}}) {
            id
            roll_number
            first_name
            last_name
            mobile_number
            role
          }
        }
      `
      dispatchGraphql(query).then(response => {
        this.teachers = response.users.filter(x => x.role === 'teacher')
        this.management = response.users.filter(x => x.role === 'management')
        this.non_teaching = response.users.filter(x => x.role === 'admin')
        this.loading = false
        console.log(this.teachers);
        console.log(this.management);
        console.log(this.non_teaching);
      })
    },
    getStudents(val) {
      this.loading=true
      const query = `
        query($secId: uuid) {
          users(where: {_not: {room_users: {room: {room_type: {_eq: "Direct"}}}}, _and:[{role: {_eq:"student"}}, {section_id: {_eq: $secId}}]}) {
            id
            roll_number
            first_name
            last_name
            mobile_number
            role
          }
        }
      `
      dispatchGraphql(query, { secId: val }).then(response => {
        this.users = response.users
        this.loading = false
      })
    },
  }
};
</script>
<style>
.messenger-header {
  display: flex;
  justify-content: space-between;
  padding: 25px 65px;
  background: white;
}
.messenger-header div {
  color: #000000;
  opacity: 0.8;
  font-size: 24px;
  font-weight: 600;
}
</style>
