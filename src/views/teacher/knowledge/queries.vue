<template>
  <div>
    <div style="background: white; padding: 50px 30px">
      <el-row>
        <el-col :span="4">
          <div style="opacity: 0.8; font-size: 24px; font-weight: 600">
            Queries
          </div>
        </el-col>
        <el-col :span="3" :offset="13">
          <e-button @click="postQuestion=true" :plain="true" label="Post query"></e-button>
        </el-col>
        <el-col :span="3">
          <e-button label="Tag Directory "></e-button>
        </el-col>
      </el-row>
    </div>
    <div style="padding: 25px; height: 55vh; overflow: auto">
      <el-row>
        <el-col
          :span="6"
          style="font-weight: 500; color: #222222; font-size: 20px"
        >
          45 queries
        </el-col>

        <el-col :span="3" :offset="12">
          <e-dropdown style="padding-top: 15px" :list="filter" primary />
        </el-col>

        <el-col style="padding-left: 10px" :span="1">
          <e-button
            icon="el-icon-search"
            :plain="true"
            css="bg-tranparent"
          ></e-button>
        </el-col>
      </el-row>
      <br />
      <el-card 
        style="
          width: 22rem;
          display: inline-block;
          margin-left: 20px;
          margin-bottom: 20px;
        "
        shadow="none"
        v-for="i in 9"
        :key="i"
      >
      <div style="cursor:pointer" @click="$router.push('/knowledge/queries-detail')">
        <el-row>
          <el-col style="color: #4d4f5c; font-weight: 500">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos ?
          </el-col>
          <el-col :span="4" style="display: flex">
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
          <el-col :span="5" :offset="9">
            <div
              style="
                color: #4d4f5c;
                font-size: 10px;
                font-weight: 500;
                background: #fcdfbd4d;
                border-radius: 17px;
                padding: 3px;
                text-align: center;
              "
            >
              14 answers
            </div>
          </el-col>
        </el-row>
        </div>
      </el-card>
    </div>
    <post-question   :show="postQuestion"
      :__onCancel="() => (postQuestion = !postQuestion)"/>
  </div>
</template>
<script>
import postQuestion from '@/components/knowledge/postQuestion.vue'
export default {
    components:{postQuestion},
  data: () => ({
      postQuestion:false,
    filter: [
      { text: "All Tags" },
      { text: "Standard 2" },
      { text: "Standard 3" },
    ],
  }),
};
</script>
