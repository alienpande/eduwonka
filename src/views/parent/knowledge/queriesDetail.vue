<template>
  <div>
    <div
      class="queries-detail__header"
      style="background: white; padding: 30px 50px"
    >
      <el-row>
        <el-col :span="11" class="f-600" style="font-size: 24px">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod
        </el-col>
        <el-col :span="3" :offset="7">
          <e-button
            label="Post answer"
            :plain="true"
            @click="postAnswer = true"
            css="sort-icon"
          ></e-button>
        </el-col>
        <el-col :span="1" :offset="1">
          <e-svg @click="$router.push('/knowledge/queries')" icon="close2" />
        </el-col>
      </el-row>
      <br />
      <div
        v-for="i in sub"
        :key="i"
        style="
          color: #4d4f5c;
          font-size: 10px;
          font-weight: 500;
          background: #fcdfbd4d;
          border-radius: 16px;
          padding: 7px 9px;
          margin-right: 30px;
          text-align: center;
          display: inline-block;
        "
      >
        {{ i }}
      </div>
    </div>

    <div style="padding: 20px 40px; height: 55vh; overflow: auto">
      <div style="color: #222222" class="fs-20 f-500">14 answers</div>
      <br />
      <el-card shadow="none">
        <div class="f-600">Top Answer</div>
        <br />
        <div>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
          et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
          takimata sanctus est Lorem ipsum dolor sit amet.
        </div>
        <br />
        <el-row>
          <el-col :span="2"> <img src="@/assets/images/upvote.png" /> </el-col>
          <el-col :span="4">
            <img src="@/assets/images/downvote.png" />
          </el-col>
          <el-col :span="6">
            <span style="color: #4d4f5c; font-size: 12px">Answer by</span>
            <span style="color: #4d4f5c; font-size: 12px; font-weight: 600">
              Roshan Kenneth</span
            >
          </el-col>
          <el-col :span="1" :offset="6" style="display: flex">
            <img src="@/assets/images/upGreen.png" />
            <div style="color: #4d4f5c; font-weight: 600; margin-left: 5px">
              311
            </div>
          </el-col>
          <el-col :offset="1" :span="4" style="display: flex">
            <img src="@/assets/images/downRed.png" />
            <div style="color: #4d4f5c; font-weight: 600; margin-left: 5px">
              311
            </div>
          </el-col>
        </el-row>
      </el-card>
      <br />
      <div class="f-600">Other answers</div>
      <br />
      <el-card
        shadow="none"
        style="margin-bottom: 20px"
        v-for="i in 3"
        :key="i"
      >
        <div>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
          et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
          takimata sanctus est Lorem ipsum dolor sit amet.
        </div>
        <br />
        <el-row>
          <el-col :span="2"> <img src="@/assets/images/upvote.png" /> </el-col>
          <el-col :span="4">
            <img src="@/assets/images/downvote.png" />
          </el-col>
          <el-col :span="6">
            <span style="color: #4d4f5c; font-size: 12px">Answer by</span>
            <span style="color: #4d4f5c; font-size: 12px; font-weight: 600">
              Roshan Kenneth</span
            >
          </el-col>
          <el-col :span="1" :offset="6" style="display: flex">
            <img src="@/assets/images/upGreen.png" />
            <div style="color: #4d4f5c; font-weight: 600; margin-left: 5px">
              311
            </div>
          </el-col>
          <el-col :offset="1" :span="4" style="display: flex">
            <img src="@/assets/images/downRed.png" />
            <div style="color: #4d4f5c; font-weight: 600; margin-left: 5px">
              311
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <post-answer
      :show="postAnswer"
      :__onCancel="() => (postAnswer = !postAnswer)"
    />
  </div>
</template>
<script>
import postAnswer from "@/components/knowledge/postAnswer.vue";
export default {
  components: { postAnswer },
  data: () => ({
    postAnswer: false,
    sub: ["Algebra", "Unit test", "Loreum"],
  }),
};
</script>
