<template>
  <es-container pageTitle="Remarks" class="bg-black-5">
    <el-row>
      <el-col :span="10">
        <el-card class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
          <el-row>
            <el-col :span="11" :offset="2" class="d-flex">
              <e-svg :style="'padding-top: 10px; padding-right: 15px'" icon="star"></e-svg>
              <div>
                <div class="text-gray-6">Avg Score</div>
                <div class="sub-title">7.5</div>
              </div>
            </el-col>
            <el-col :span="11" class="d-flex">
              <e-svg :style="'padding-top: 10px; padding-right: 15px'" icon="rankincrement"></e-svg>
              <div>
                <div class="text-gray-6">Avg Performance status</div>
                <div class="sub-title">Good</div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row><br />
    <el-row :gutter="20">
      <el-col class="mg-t-10 text-gray-6 tx-18" :span="6">
        45 Teachers Marked your Behaviour
      </el-col>
      <el-col class="mg-t-5" :span="6" :offset="3">
        <es-search v-model="searchBy" placeholder="Search"></es-search>
      </el-col>
      <el-col :span="2" :offset="1">
        <es-select placeholder="score" class="select-icon"></es-select>
      </el-col>
      <el-col :span="3" class="mg-l-5">
        <es-select placeholder="Performance" class="select-icon"></es-select>
      </el-col>
      <el-col :span="2" class="mg-l-5">
        <es-select placeholder="Subject" class="select-icon"></es-select>
      </el-col>
    </el-row>
    <div style="display:flex;flex-wrap:wrap">
      <el-col :span="7" :offset="1" v-for="i in 9 " :key="i" class="mg-t-20">
        <el-card shadow="none" style="padding: 8px; border: none" class="rounded-08 pg-50 bg-black-2">
          <div class="d-flex">
            <el-avatar shape="circle" :size="50" :src="require('@/assets/images/profile.jpg')"></el-avatar>
            <div class="mg-l-15">
              <div class="tx-bolder tx-18 text-white">Anjali mishra</div>
              <div class="text-gray-6">Physics</div>
            </div>
          </div>
          <div shadow="none" style="border: none; padding: 13px" class="mg-t-20 rounded-08 bg-black-3">
            <el-row>
              <el-col :span="11" :offset="1">
                <div class="text-gray-6">Performance</div>
                <div class="text-green tx-bolder">Excellent</div>
              </el-col>
              <el-col :span="10" :offset="2">
                <div class="text-gray-6">Score</div>
                <div class="text-white tx-bolder">7.6</div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </div>
  </es-container>
</template>
<script>
export default {
  data: () => ({}),
};
</script>
