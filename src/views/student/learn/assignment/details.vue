<template>
  <div>
    <es-container
      hideHeader
      :pageTitle= assignment
      :back="$url.LN_ASSIGNMENTS"
    >
      <es-steps
        :steps="steps"
        :active="activeTab"
        @active-tab="activeTabChange"
         style="width:300px"
      ></es-steps>
      <group-details-1
        v-if="activeTab == 1"
        @save="assignmentData"
        @back="$url.LN_ASSIGNMENTS"
      />
      <group-details-2
        ref="tab2"
        :assignmentInfo ="assignmentInfo"
        v-if="activeTab == 2"
        @back="activeTab = 1"
      />
    </es-container>
  </div>
</template>
<script>
import { dispatchGraphql } from '@/api/dispatcher'
import groupDetails1 from "@/components/student/learn/assignment/assignmentDetail1.vue";
import groupDetails2 from "@/components/student/learn/assignment/assignmentDetail2.vue";
import { mapMutations } from "vuex";
export default {
  components: { groupDetails1,groupDetails2 },
  data: () => ({
    activeTab: 1,
    assignmentInfo: {},
    steps: [
      {
        id: 1,
        icon: "groupDetails",
        title: "Details",
      },
      {
        id: 2,
        icon: "pen3",
        title: "Write",
      },
    ],
    assignment: {},
  }),
  
  methods: {
    getAssignDetails(){
      const query =`query($id: uuid!) {
        assignments_by_pk(id: $id) { 
          name
        }
      }`
      dispatchGraphql(query,{id:this.$route.params.id}).then((response)=> {
        this.assignment = response.assignments_by_pk.name
        console.log("ffffffffffffff", this.assignment)
      })
    },
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth"]),
    activeTabChange(e) {
      this.activeTab = e;
    },
    assignmentData: function(val) {
      console.log("val")
      this.assignmentInfo = val
      this.activeTab = 2;
      this.scrollTop();
    },
    scrollTop() {
      this.$nextTick(() => {
        this.$refs.tab2.scrollTop = 0;
      });
    },
  },
   mounted() {
    /* this.setAsideMenuCollapse(true);
    setTimeout(() => {
      this.setAsideWidth("100px");
    }, 100); */
  },
  created() {
    this.getAssignDetails()
    console.log("route params", this.$route.params.id)
//    this.setAsideMenuCollapse(true);
//    this.setAsideWidth("100px");
  },
  destroyed() {
    this.setAsideMenuCollapse(false);
  },
};
</script>
