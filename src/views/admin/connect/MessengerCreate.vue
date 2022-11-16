<template>
  <e-container hideHeader pageTitle="Create channel" back="/connect/messenger" class="create-channel">
    <e-steps
      id="create-channel-main"
      :steps="steps"
      :active="activeTab"
      @active-tab="activeTabChange"
      style="width: 300px"
    ></e-steps>

    <create-channel-1 v-loading="loading"
     class="create-channel-section"
      v-if="activeTab == 1 && !loading"
      :users="users"
      :room="room"
      @handleSubmit="setRoomId"
    />
    <create-channel-2 ref="tab2"
    v-if="activeTab == 2"
    @back="activeTab = 1"
    :roomId="room.id"
    :sections="sections"
    :teachers="teachers"
    :management="management"
    :non_teaching="non_teaching"
    />
  </e-container>
</template>
<script>
import { mapMutations } from "vuex";
import createChannel1 from "@/components/connect/createChannel1.vue";
import createChannel2 from "@/components/connect/createChannel2.vue";
import { dispatchGraphqlQuery, dispatchGraphql } from "@/api/dispatcher";

// import SubjectYearInput from "../../../components/hq/Employee/SubjectYear.Input.vue";
export default {
  components: { createChannel1, createChannel2 },
  data() {
    return {
      room: {
        room_type: 'Channel'
      },
      loading: true,
      sections: [],
      teachers: [],
      management: [],
      non_teaching: [],
      users: [
        {
          value: 'guide',
          label: 'Guide'
        },
        {
          value: 'guide',
          label: 'sdffsdGuide'
        }
      ],
      activeTab: 1,
      steps: [
        {
          id: 1,
          icon: "hq/healthRecords",

          title: "Details",
        },
        {
          id: 2,
          icon: "learn/Audience",
          title: "Audience",
        },
      ],
      req: {
        subjects: [],
      },
    };
  },
  methods: {
    getStandards() {
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
      })
    },
    getTeachers() {
      const query = `
        query {
          users {
            id
            first_name
            role
          }
        }
      `
      dispatchGraphql(query).then(response => {
        this.users = response.users
        this.teachers = this.users.filter(x => x.role === 'teacher')
        this.management = this.users.filter(x => x.role === 'management')
        this.non_teaching = this.users.filter(x => x.role === 'admin')
        // console.log('users', this.teachers, this.management, this.non_teaching)
      })
    },
    getUsers() {
      this.loading=true
      dispatchGraphqlQuery('users', ['id', 'first_name']).then((response) => {
        this.users = this.modifyCategories(response.users)
      })
    },
    modifyCategories(data) {
      var b = data.map(x => {
        const a = {}
        a.label = x.name
        a.value = x.id
        return a
      })
      this.loading=false
      console.log('%%%%%%SSSSSSSSS', this.loading)
      return b
    },
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth"]),
    activeTabChange(e) {
      this.activeTab = e;
    },
    setRoomId: function(roomId){
      this.room.id = roomId
      console.log('$$$$$$$$###########', roomId);
      console.log('$$$$$$$$###########', this.room);
      this.scrollTop()
    },
    scrollTop() {
      this.activeTab = 2;
      this.$nextTick(() => {
        this.$refs.tab2.scrollTop = 0;
      });
    },
  },
  mounted() {
    this.setAsideMenuCollapse(true);
    setTimeout(() => {
      this.setAsideWidth("280px");
    }, 100);
  },
  created() {
    this.getUsers()
    this.getTeachers()
    this.getStandards()
   // this.setAsideMenuCollapse(true);
   // this.setAsideWidth("280px");
  },
  destroyed() {
    this.setAsideMenuCollapse(false);
  },
};
</script>

<style scoped>
.label {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
}

.e-form {
  background-color: white;
  height: auto;
  overflow-x: hidden;
}
</style>
