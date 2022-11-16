<template>
  <div class="about">
    <es-container
     :pageTitle="switchValue ? 'Poll' : 'Surveys'"
      @switchChange="switchValue=!switchValue"
      switchText1="Polls"
      switchText2="Survey"
    >
      <polls v-if="switchValue"/>
      <survey v-else/>
   
    </es-container>
  </div>
</template>
<script>
import polls from "@/components/student/learn/polls/polls.vue"
import survey from "@/components/student/learn/polls/survey.vue"

export default {
  components: { polls,survey },
  data: () => ({
    switchValue:true,
    activeName: "active",
    showSideBar:false
  }),
  methods:{
   
  }
};
</script>
