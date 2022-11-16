<template>
  <e-container class="learn-add-poll" hideHeader pageTitle="Create form" :back="$url.LN_FORM">
    <e-steps
      :steps="steps"
      :active="activeTab"
      @active-tab="activeTabChange"
      style="width: 470px"
    ></e-steps>

    <createPoll1
      v-if="activeTab == 1"
      @save="pollOne"
    />
    <createPoll2
      ref="tab2"
      v-if="activeTab == 2"
      :formId="formId"
      @back="activeTab = 1"
      @save="activeTab = 3"
    />
    <createPoll3
      v-if="activeTab == 3"
      :formId="formId"
      :sections="sections"
      :teachers="teachers"
      :management="management"
      :non_teaching="non_teaching"
      @back="activeTab = 2"
      @save="activeTab = 1"
    />
  </e-container>
</template>
<script>
import { mapMutations } from "vuex";
import createPoll1 from "@/components/learn/poll/createPoll1.vue";
import createPoll2 from "@/components/learn/poll/createPoll2.vue";
import createPoll3 from "@/components/learn/poll/createPoll3.vue";
import { dispatchGraphql } from '@/api/dispatcher'

// import SubjectYearInput from "@/components/hq/Employee/SubjectYear.Input.vue";
export default {
  components: { createPoll1, createPoll2, createPoll3 },
  data() {
    return {
      activeTab: 1,
      steps: [
        {
          id: 1,
          icon: "hq/healthRecords",
          title: "Type",
        },
        {
          id: 2,
          icon: "learn/Help",
          title: "Questions",
        },
        {
          id: 3,
          icon: "learn/Audience",
          title: "Audience",
        },
      ],
      req: {
        subjects: [],
      },
      formId: "",
      sections: [],
      teachers: [],
      users: [],
      management: [],
      non_teaching: []

    };
  },
  methods: {
    pollOne(data) {
      this.activeTab = 2;
      this.scrollTop();
      console.log('tab1', data)
      this.formId = data
      console.log('tab1id', this.formId)
    },
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth","hideAsideMenuMobile"]),
    activeTabChange(e) {
      this.activeTab = e;
    },
    scrollTop() {
      this.$nextTick(() => {
        this.$refs.tab2.scrollTop = 0;
      });
    },
    getStandards() {
      const query = `query {
        sections {
          id
          name
          standard {
            id
            name
          }
        }
      }`
      dispatchGraphql(query).then(response => {
        this.sections = response.sections
        console.log('sections', this.sections)
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
        console.log('users', this.teachers, this.management, this.non_teaching)
      })
    },
  },
  mounted() {
    this.hideAsideMenuMobile()
  },

  created() {
    this.getStandards()
    this.getTeachers()
    // this.setAsideMenuCollapse(false);
    // this.setAsideWidth("290px");
  },
  destroyed() {
    this.setAsideMenuCollapse(false);
  },
};
</script>

<style>
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
>