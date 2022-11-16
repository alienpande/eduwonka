<template>
  <div class="details" style="display: inline-block">
    <div class="card">
      <el-col :span="2" :offset="1">
        <e-svg v-if="icons" style="margin: 21px 0 0 20px" :icon="icons" />
        <img
          v-else
          style="width: 60px; height: 60px; margin: 19px 0 0 0px"
          src="@/assets/images/handIcon.png"
          alt=""
        />
      </el-col>
      <el-col :span="15" class="mg-l-10">
        <div class="title">
          {{ title }}
        </div>
        <div class="count">
          {{ count }}
        </div>
      </el-col>
    </div>
  </div>
</template>
<script>
export default {
  props: ["title", "count", "icons", "img"],
};
</script>
<style scoped>
.card {
  width: 330px;
  height: 110px;
  border-radius: 12px;
  background: #fcdfbd66;
  display: flex;
}
.title {
  font-size: 16px;
  font-weight: 500;
  color: #000000cc;
  margin-top: 23px;
}
.count {
  font-size: 20px;
  font-weight: 500;
  color: #000000cc;
}
@media only screen and (device-width: 768px) {
  .details {
    margin-left: -40px;
  }
  .title {
    font-size: 12px;
    font-weight: 500;
    color: #000000cc;
    margin-top: 23px;
  }
  .count {
    font-size: 16px;
    font-weight: 500;
    color: #000000cc;
  }
  .card {
    margin-left: 17px;
    width: 180px;
    height: 100px;
    border-radius: 12px;
    background: #fcdfbd66;
    display: flex;
  }
}
</style>