<template>
  <div>
    <e-container
      pageTitle="Tags"
      btnIcon="el-icon-plus"
      btnText="Create Tag"
      @btnClick="tagCreate=true"
    >
      <el-row
        :gutter="20"
        style="padding: 0px 0px 0px 0px; margin: 0px 0px 5px 0px"
      >
        <el-col
          :span="6"
          style="font-weight: 500; color: #222222; font-size: 20px"
        >
          45 tags
        </el-col>

        <el-col style="padding-left: 10px" :span="1" :offset="15">
          <e-button
            icon="el-icon-search"
            :plain="true"
            css="bg-tranparent"
          ></e-button>
        </el-col>
      </el-row>
      <br />
      <el-card
        shadow="none"
        style="width: 20rem; display: inline-block; margin: 0 30px 30px 0"
        v-for="i in 9"
        :key="i"
      >
      <div @click="tagsDetails=true">
        <el-row>
          <el-col :span="5">
            <div style="color: #4d4f5c; font-weight: bold">Algebra</div>
          </el-col>
          <el-col :span="1" :offset="18">
            <e-svg icon="dots"></e-svg>
          </el-col>
        </el-row>
        <br />
        <el-row>
          <el-col :span="10">
            <div style="color: #4d4f5c; padding-bottom: 10px">Queries</div>
            <div style="color: #4d4f5c; font-weight: 500">144</div>
          </el-col>
          <el-col :span="10" :offset="2">
            <div style="color: #4d4f5c; padding-bottom: 10px">Answers</div>
            <div style="color: #4d4f5c; font-weight: 500">200</div>
          </el-col>
        </el-row>
        </div>
      </el-card>
    </e-container>
    <tags-detail
      :show="tagsDetails"
      :__onCancel="() => (tagsDetails = !tagsDetails)"
    />

      <create-tag
      :show="tagCreate"
      :__onCancel="() => (tagCreate = !tagCreate)"
    />
  </div>
</template>
<script>
import tagsDetail from "@/components/knowledge/tagsDetail.vue";
import createTag from "@/components/knowledge/createTag.vue";

export default {
  components: {tagsDetail,createTag},
  data:()=>({
      tagsDetails:false,
      tagCreate:false
  })
};
</script>
