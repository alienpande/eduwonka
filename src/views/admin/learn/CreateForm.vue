<template>
  <e-container class="learn-add-form" hideHeader pageTitle="Create form" :back="$url.LN_FORM">
    <e-steps :steps="steps" :active="activeTab" @active-tab="activeTabChange" style="width: 470px" ></e-steps>
    <formCreate1 v-if="activeTab == 1" @save="handleForm" />
    <formCreate2 ref="tab2" v-if="activeTab == 2" :formId="formId" @back="activeTab = 1" @save="activeTab = 3" />
    <formCreate3 v-if="activeTab == 3"
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
import formCreate1 from "@/components/learn/form/formCreate1.vue";
import formCreate2 from "@/components/learn/form/formCreate2.vue";
import formCreate3 from "@/components/learn/form/formCreate3.vue";
import { dispatchGraphql } from '@/api/dispatcher'
// import SubjectYearInput from "@/components/hq/Employee/SubjectYear.Input.vue";
export default {
  components: { formCreate1, formCreate2, formCreate3 },
  data() {
    return {
      formId: '',
      sections: [],
      users: [],
      teachers: [],
      management: [],
      non_teaching: [],
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
    handleForm: function(val) {
      console.log('val', val)
      this.formId = val
      this.activeTab = 2
      this.scrollTop()
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
  },
  mounted() {
    this.hideAsideMenuMobile()
  },
  created() {
    this.getStandards()
    this.getTeachers()
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
