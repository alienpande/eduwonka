<template>
  <es-container pageTitle="Contact Directory" class="bg-black-5">
    <el-tabs class="floatTabHeader studentTab" v-model="activeName">
      <el-tab-pane label="Students" style="height: 66vh; overflow: scroll" name="activeclassroom">
        <el-row>
          <el-col :span="6" class="tx-20 text-white mg-t-10">
            {{users.length}} students
          </el-col>
          <el-col class="mg-t-5" :span="5" :offset="12">
            <es-search v-model="search" placeholder="Search"></es-search>
          </el-col>
        </el-row>
        <el-row>
          <messenger-card v-for="user in users" :key="user.id" :user="user" v-if="!loading"/>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Teachers" name="dds">
        <el-row>
          <messenger-card v-for="user in teachers" :key="user.id" :user="user" v-if="!loading"/>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Management" name="12">
        <el-row>
          <messenger-card v-for="user in management" :key="user.id" :user="user" v-if="!loading"/>
        </el-row>
       </el-tab-pane>
      <el-tab-pane label="Non-Teaching" name="123">
        <el-row>
          <messenger-card v-for="user in non_teaching" :key="user.id" :user="user" v-if="!loading"/>
        </el-row>
       </el-tab-pane>
    </el-tabs>
  </es-container>
</template>
<script>
import { dispatchGraphql } from '@/api/dispatcher'
import messengerCard from "@/components/student/connect/messengerCard.vue";
import {getId} from "@/util/auth"
export default {
  name: 'studentMessanger',
  components: { messengerCard },
  data: () => ({
    activeName: "activeclassroom",
    loading: true,
    teachers: [],
    management: [],
    non_teaching: [],
    users: [],
    sectionId: '',
    search: ''
  }),
  created() {
    this.getTeachers()
    this.getUserSection()
  },
  methods: {
    getUserSection: function() {
      const query = `query($id: uuid!) {
        users_by_pk(id:$id) {
          section_id
        }
      }`
      dispatchGraphql(query, { id: getId() }).then((response) => {
        // this.sectionId = response.users_by_pk.section_id
        this.getStudents(response.users_by_pk.section_id)
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
        console.log('aaaaaaaaaaaaa', this.non_teaching);
        this.loading = false
      })
    },
    getStudents(val) {
      this.loading=true
      const query = `
        query($secId: uuid) {
          users(where:{_not: {room_users: {room: {room_type: {_eq: "Direct"}}}}, _and:[{role: {_eq:"student"}}, {section_id: {_eq: $secId}}]}) {
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
    }
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
