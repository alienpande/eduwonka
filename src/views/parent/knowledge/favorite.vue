<template>
  <div>
    <e-container
      pageTitle="Favourites"
      btnIcon="el-icon-plus"
      btnText="Create Tag"
      @btnClick="tagCreate = true"
    >
      <el-tabs class="floatTabHeader" v-model="activeName">
        <el-tab-pane label="Tags" name="active">
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

            <el-col :span="3" :offset="12">
              <e-dropdown style="padding-top: 15px" :list="filter" primary />
            </el-col>

            <el-col style="padding-left: 10px" :span="1" >
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
            <e-svg icon="heartred"></e-svg>
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
        </el-tab-pane>
        <el-tab-pane label="Queries" name="Queries"> s </el-tab-pane>
      </el-tabs>
    </e-container>
  </div>
</template>
<script>
export default {
  data: () => ({
    activeName: "active",
    filter: [
      { text: "New - Old" },
      { text: "Standard 2" },
      { text: "Standard 3" },
    ],
  }),
};
</script>
