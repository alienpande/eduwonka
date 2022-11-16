<template>
  <div class="container">
    <nav-bar />
    <div style="padding: 40px 100px">
      <div class="h1">Onboarding Institution</div>
      <e-steps :steps="steps" :active="activeTab" @active-tab="activeTabChange" ></e-steps>

      <tab1 v-if="activeTab == 1" @save="handleClick"/>
      <tab2 ref="tab2" v-if="activeTab == 2" :institute="institute_id"  @back="activeTab = 1" @save="activeTab = 3;save"/>
      <tab3 ref="tab2" v-if="activeTab == 3" :institute="institute_id"  @back="activeTab = 2" @save="redirectTo"/>
    </div>
  </div>
</template>
<script>
import navBar from "@/components/onboarding/navBar.vue";
import tab1 from "@/components/onboarding/InstituteDetail/InstituteDetail.Tab1.vue";
import tab2 from "@/components/onboarding/InstituteDetail/InstituteDetail.Tab2.vue";
import tab3 from "@/components/onboarding/InstituteDetail/InstituteDetail.Tab3.vue";
export default {
  components: {
    tab1,
    tab2,
    tab3,
    navBar,
  },
  data() {
    return {
      req: {},
      activeTab: 1,
      institute_id: '',

      steps: [
        {
          id: 1,
          icon: "hq/standards",
          title: "Institution",
        },
        {
          id: 2,
          icon: "campus",
          title: "Campus",
        },
        {
          id: 3,
          icon: "hq/healthRecords",
          title: "Other",
        },
      ],
    };
  },
  methods: {
    redirectTo: function() {
      this.$router.push(`/on-boarding/list-of-campus/${this.institute_id}`)
    },
    activeTabChange(e) {
      this.activeTab = e;
    },
    handleClick(id){
      this.activeTab = 2
      this.institute_id = id
    }
  },
};
</script>
<style scoped>
.container {
  height: 100vh;
  background-color: #f7f9fb;
  overflow-y: scroll;
}
.h1{
  margin-bottom: 15px;
}
</style>
