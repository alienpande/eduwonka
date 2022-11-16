<template>
    <div>
        <el-row style="display: flex; padding: 15px">
      <el-col :span="16" style="display: flex">
        <e-svg @click="$router.push($url.LN_COURSES)" icon="back"></e-svg>
        <div style="color: #11141a;font-weight: 500;font-size: 24px;opacity: 0.8;margin-top: 7px;margin-left: 20px;">
          {{title}}
        </div>
      </el-col>
    </el-row>
    <div class="class-info" style="padding-left: 84px">
      <div style="background: white;display: inline-block;padding: 11px 22px;border-radius: 10px;color: rgb(0 0 0 / 60%);font-size: 16px;margin-right: 10px;">
        {{ standard }}
      </div>
      <div style="background: white;display: inline-block;padding: 11px 22px;border-radius: 10px;color: rgb(0 0 0 / 60%);font-size: 16px;margin-right: 10px;">
        {{ subject }}
      </div>
    </div>
    </div>
</template>
<script>
export default {
  props:{
    title: {
      type: String
    },
    standard: {
      type: String
    },
    subject: {
      type: String
    },
    back: {
      type: String
    }
  }
}
</script>