<template>
  <div class="remark-container">
    <div class="remark-header" style="background: white; padding: 15px 50px">
      <div
        style="color: #000000; opacity: 0.8; font-size: 24px"
        class="fs-24 f-600"
      >
        Remarks
      </div>
      <br />
      <el-row>
        <el-col :span="3">
          <div style="opacity: 0.8; font-weight: 300">Standard</div>
          <div style="opacity: 0.8" class="fs-20 f-500">4 A</div>
        </el-col>
        <el-col :span="4">
          <div style="opacity: 0.8; font-weight: 300">Students Marked</div>
          <div style="opacity: 0.8" class="fs-20 f-500">43/45</div>
        </el-col>
        <el-col :span="5">
          <div style="opacity: 0.8; font-weight: 300">Class Representative</div>
          <div style="opacity: 0.8" class="fs-20 f-500">Markus Kornell</div>
        </el-col>
      </el-row>
    </div>
    <br />
    <div style="height:58vh;overflow:auto">
    <el-row style="padding: 10px 30px">
      <el-col :span="4">
        <div style="color: #222222" class="fs-20 f-500">45 students</div>
      </el-col>
      <el-col :span="3" :offset="17">
        <e-button
          icon="el-icon-search"
          :plain="true"
          css="sort-icon"
        ></e-button>
      </el-col>
    </el-row>
    <br />
    <el-card v-for="i in 9" :key="i" shadow="none" style="width: 20rem;display:inline-block;margin-left:50px;margin-bottom:30px">
      <el-row>
        <el-col :span="10">
          <el-avatar :size="78" :src="require('@/assets/images/profile.jpg')" />
        </el-col>
        <el-col :span="10">
          <div style="opacity: 0.8" class="fs-20 f-600">Stephan Rodrigous</div>
        </el-col>
      </el-row>
      <br/>
      <el-row>
        <el-col :span="10">
          <div style="opacity: 0.8; font-weight: 300">Performance</div>
          <e-svg icon='excelant'/>
        </el-col>
        <el-col :span="6" :offset="7">
          <div style="opacity: 0.8; font-weight: 300">Score</div>
          <div style="opacity: 0.8" class="fs-20 f-500">7.6</div>
        </el-col>
      </el-row>
    </el-card>
    </div>
  </div>
</template>
