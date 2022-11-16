<template>
  <el-row>
    <el-col
      :span="24"
      class="nav-left-logo">
      <el-row style="padding: 0 0px 0px 50px">
        <el-col :span="14">
          <el-avatar
            shape="square"
            :size="118"
            :src="require('@/assets/images/eduwonka_logo.png')"
          ></el-avatar>
        </el-col>
        <el-col
          :span="10"
          class="nav-right-text"
          >It’s time to onboard your institution!
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<style scoped>
  .nav-left-logo {
    top: 0px;
    left: 0px;
    height: 120px;
    background: #fff;
    box-shadow: 0px 1px 4px #15223214;
  }
  .nav-right-text {
    letter-spacing: 2px;
    color: #bc6c42;
    font-size: 20px;
    font-weight: bold;
    text-align: right;
    padding: 45px;
  }
  @media only screen and (device-width: 768px) {
    .nav-right-text{
      font-size: 18px;
      padding: 35px;
    }
  }
</style>