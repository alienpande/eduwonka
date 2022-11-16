<template>
  <div>
    <formSub
      name="Kenneth Patrick"
      Answered="12/12"
      timetaken="25 m 15 s"
      submission=" 12th June"
    >
      <quesAns
        v-for="i in 5"
        :key="i"
        :numques="i"
        ques="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ?"
        ans="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ?"
      />
    </formSub>
  </div>
</template>
<script>
import formSub from "@/components/learn/form/formSub.vue";
import quesAns from "@/components/learn/form/quesAns.vue";

export default {
  components: { formSub, quesAns },
};
</script>
