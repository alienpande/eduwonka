<template>
  <div class="about">
    <es-container
      class="bg-black-5"
     :pageTitle="switchValue ? 'Grades' : 'Certificates'"
      @switchChange="switchValue=!switchValue"
      switchText1="Grades"
      switchText2="Certificates"
    >
      <grades v-if="switchValue"/>
      <certificates v-else/>
   
    </es-container>
  </div>
</template>
<script>
import grades from "@/components/student/school/reportCard/grades.vue"
import certificates from "@/components/student/school/reportCard/certificates.vue"

export default {
  components: { grades, certificates },
  data: () => ({
    switchValue: true,
    activeName: "active",
    showSideBar: false
  }),
  methods:{}
};
</script>
