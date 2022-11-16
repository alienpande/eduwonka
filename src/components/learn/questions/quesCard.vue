<template>
  <div class="quesCard-container">
    <div v-for="question in questions" :key="question" style="background: white; border-radius: 10px; padding: 32px; margin-top: 10px; width:64vw;">
      <div class="remove-padding" style="color: #222222; font-weight: 600; font-size: 16px;padding-right: 147px;">
        {{ question.name }}
      </div>
      <div style="display: flex; margin-top: 30px">
        <div style="border: 1px solid #bc6c42; border-radius: 13px; background: white; display: inline; padding: 5px 10px; margin-right: 10px; color: #bc6c42; font-size: 12px; font-weight: 500;">
          Type : {{ getType(question.question_type) }}
        </div>
        <div style="border: 1px solid #bc6c42; border-radius: 13px; background: white; display: inline; padding: 5px 10px; margin-right: 10px; color: #bc6c42; font-size: 12px; font-weight: 500;">
          Difficulty : {{ question.difficulty_level }}
        </div>
        <div style="border: 1px solid #bc6c42; border-radius: 13px; background: white; display: inline; padding: 5px 10px; margin-left: 5px; color: #bc6c42; font-size: 12px; font-weight: 500;">
          Used in : 20 quick tests
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.quesCard-container > div{
width: auto !important;
}
</style>
<script>
  export default {
    props: {
      questions: {
        type: Array
      }
    },
    methods: {
      getType(type) {
        if (type === 'choose-multiple') {
          return 'Multiple Choice & Multiple Answers Questions'
        } else if (type === 'choose-single') {
          return 'Multiple Choice & Single Answer Questions'
        } else if (type === 'short-answer') {
          return 'Short Answer Questions'
        } else if (type === 'long-answer') {
          return 'Long Answer Questions'
        } else if (type === 'upload-attachment') {
          return 'Attachment Questions'
        } else if (type === 'add-image') {
          return 'Image Questions'
        } else if (type === 'add-video') {
          return 'Video Questions'
        } else {
          return 'True/False Questions'
        }
      }
    }
  }
</script>