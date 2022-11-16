<template>
  <e-container class="create-slip-container" hideHeader pageTitle="Create Slip" :back="`/connect/permission-slip`">
    <e-steps :steps="steps" :active="activeTab" @active-tab="activeTabChange" style="width:300px"></e-steps>
    <create-slip-1 v-if="activeTab == 1" @save="handleSlip" />
    <create-slip-2 ref="tab2" v-if="activeTab == 2"
      :slipId="slipId"
      :sections="sections"
      :teachers="teachers"
      :management="management"
      :non_teaching="non_teaching"
      :admins="admins"
      @back="activeTab = 1"
      @save="activeTab = 1"
    />
  </e-container>
</template>
<script>
import { mapMutations } from "vuex";
import createSlip1 from '@/components/connect/slip/createSlip1.vue'
import createSlip2 from'@/components/connect/slip/createSlip2.vue'
import { dispatchGraphql } from '@/api/dispatcher'
export default {
  components: { createSlip1 ,createSlip2 },
  data() {
    return {
      activeTab: 1,
      slipId: '',
      sections: [],
      users: [],
      teachers: [],
      management: [],
      non_teaching: [],
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
    handleSlip: function(val) {
      console.log('val', val)
      this.slipId = val
      this.activeTab = 2
      this.scrollTop()
    },
    getUsers() {
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
        this.teachers = this.users.filter(x => (x.role === 'teacher' || x.role === 'employee'))
        this.management = this.users.filter(x => x.role === 'management')
        this.non_teaching = this.users.filter(x => x.role === 'staff')
        this.admins = this.users.filter(x => x.role === 'admin')
      })
    },
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
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth"]),
     activeTabChange(e) {
      this.activeTab = e;
    },
     scrollTop() {
      this.$nextTick(() => {
        this.$refs.tab2.scrollTop = 0;
      });
    },
  },
  mounted() {
    // this.setAsideMenuCollapse(true);
    // setTimeout(() => {
    //   this.setAsideWidth("100px");
    // }, 100);
  },
  created() {
    this.getStandards()
    this.getUsers()
    // this.setAsideMenuCollapse(true);
    // this.setAsideWidth("260");
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
