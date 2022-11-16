<template>
  <es-container hideHeader pageTitle="Create channel" back="/connect/messenger" class="bg-black-5">
    <es-steps :steps="steps" :active="activeTab" @active-tab="activeTabChange" style="width:400px" />
    <create-channel-1 v-if="activeTab == 1"
    :sectionId="sectionId"
    :room="room"
    @handleSubmit="setRoomId"/>
    <create-channel-2 ref="tab2" v-if="activeTab == 2" @back="activeTab = 1" :section="sectionId" :teachers="teachers" :room="room"/>
  </es-container>
</template>
<script>
import createChannel1 from "@/components/student/connect/createChannel1.vue";
import createChannel2 from "@/components/student/connect/createChannel2.vue";
import { dispatchGraphqlQuery, dispatchGraphql } from "@/api/dispatcher";
import {getId} from '@/util/auth'

export default {
  components: { createChannel1, createChannel2 },
  data() {
    return {
      activeTab: 1,
      room: {
        name: 'students',
        moderators: []
      },
      sectionId: '',
      teachers: [],
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
      ]
    };
  },
  methods: {
    getUserSection: function() {
      const query = `query($id: uuid!) {
        users_by_pk(id:$id) {
          section_id
        }
      }`
      dispatchGraphql(query, { id: getId() }).then((response) => {
        this.sectionId = response.users_by_pk.section_id
      })
    },
    setRoomId: function(roomId){
      this.room.id = roomId
      this.scrollTop()
    },
    activeTabChange(e) {
      this.activeTab = e;
    },
    scrollTop() {
      this.activeTab = 2
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
    this.getUserSection()
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
