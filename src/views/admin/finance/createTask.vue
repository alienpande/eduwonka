<template>
  <e-container class="finance-create-task" hideHeader pageTitle="Add Task" :back="$url.FI_TASK">
    <e-steps
      :steps="steps"
      :active="activeTab"
      @active-tab="activeTabChange"
      style="width:300px"
    ></e-steps>
    <add-task-1 v-if="activeTab == 1" @save="activeTab = 2; scrollTop();getTaskId($event)" />
    <add-task-2
      :taskid="taskid"
      :sections="sections"
      :teachers="teachers"
      :management="management"
      :staff="staff"
      ref="tab2"
      v-if="activeTab == 2"
      @back="activeTab = 1"
    />
  </e-container>
</template>
<script>
import { dispatchGraphql } from '@/api/dispatcher'
import { mapMutations } from "vuex";
import addTask1 from '@/components/finance/task/addTask1.vue'
import addTask2 from '@/components/finance/task/addTask2.vue'
export default {
  components: { addTask1 ,addTask2},
  data() {
    return {
      sections:[],
      teachers: [],
      management: [],
      staff: [],
      activeTab: 1,
      taskid:'',
      steps: [
        {
          id: 1,
         icon: "learn/Audience",
          title: "Vendor Details",
        },
        {
          id: 2,
        icon: "hq/healthRecords",
          title: "Assignment",
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
        }`
      dispatchGraphql(query).then(response => {
        this.sections = response.sections
        console.log("TTTTTTTT", this.sections)
      })
    },
    getTeachers() {
      const query = `query {
        users(where: {role: {_eq: "teacher"}}) {
          id
          first_name
        }
      }`
      dispatchGraphql(query).then(response => {
        this.teachers = response.users
        console.log('teacher', this.teachers)
      })
    },
    getManagement() {
      const query = `query {
          users(where: {role: {_eq: "management"}}) {
            id
            first_name
          }
        }`
      dispatchGraphql(query).then(response => {
        this.management = response.users
        console.log('teacher', this.management)
      })
    },
     getNonteach() {
      const query = `query {
        users(where: {role: {_in: ["staff", "admin"]}}) {
          id
          first_name
        }
      }`
      dispatchGraphql(query).then(response => {
        this.staff = response.users
        console.log('teacher', this.staff)
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
    getTaskId(data){
      this.taskid = data
      console.log('save data', data)
    }
  },
   mounted() {
    /* this.setAsideMenuCollapse(true);
    setTimeout(() => {
      this.setAsideWidth("100px");
    }, 100); */
  },  
  created() {  
    this.taskid  
    this.getNonteach()
    this.getManagement()
    this.getStandards()
    this.getTeachers()
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
