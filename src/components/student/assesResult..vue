<template>
  <div>
    <div
      style="
        border: 1px solid rgb(64, 64, 64);
        border-radius: 10px;
        padding: 20px;
      "
    >
      <el-row>
        <el-col :span="5">
          <div
            style="
              width: 200px;
              background: #282828;
              margin-top: 45px;
              border-radius: 8px 8px 0px 0px;
              padding-bottom: 26px;
            "
            :class="{
              'score-3': score === question.total_marks,
              'score-2': score < question.total_marks && score >  0 ,
              'score-1': score === 0,
              'score-skip': score === null,
            }"
          >
            <div
              style="color: #f3f3f3; padding: 30px 0"
              class="text-center fs-20 f-600"
            >
            Question No. {{ question.position }}

            </div>
            <div
              v-if="score"
              style="color: #f3f3f3; padding: 5px 0; font-size: 38px"
              class="text-center f-600"
            >
              {{ score }}/{{ question.total_marks }}
            </div>
            <div
              v-if="score === null"
              style="color: #f3f3f3; padding: 5px 0; font-size: 38px"
              class="text-center f-600"
            >
              Skipped
            </div>
            <div
              v-if="score === 0"
              style="color: #f3f3f3; padding: 5px 0; font-size: 38px"
              class="text-center f-600"
            >
              Wrong
            </div>
            <div
              v-if="score"
              style="color: #9d9d9d; font-size: 16px; text-align: center"
            >
              Marks Scored
            </div>
          </div>
        </el-col>
        <el-col :span="17">
          <div>
            <div style="color: #f3f3f3" class="fs-16 f-600">Question</div>
            <div
              class="bg-black-3"
              style="padding: 20px; margin-top: 10px; color: #f3f3f3"
            >
              <!-- Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500ss.Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500ss. -->
              {{ question.question.name }}
            </div>
          </div>

          <div>
            <div style="color: #f3f3f3; margin-top: 15px" class="fs-16 f-600">
              Your Answer
            </div>
            <div
              class="bg-black-3"
              style="padding: 20px; margin-top: 10px; color: #f3f3f3"
            >
              <!-- Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500ss. -->
            {{ question.question.answer }}
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <br />
  </div>
</template>
<script>
export default {
  // props: ["score","question"],
  props:{
    score:{
      type : String
    },
    question: {
      type: Array
    }
  },
  data: () => ({
  }),
};
</script>
<style scoped>
.score-3 {
  border-bottom: 12px solid #1fc24e !important;
}
.score-2 {
  border-bottom: 12px solid #fec600 !important;
}
.score-1 {
  border-bottom: 12px solid #f14d4d !important;
}
.score-skip {
  border-bottom: 12px solid #9911ed !important;
  padding-bottom: 36px !important;
}
</style>
