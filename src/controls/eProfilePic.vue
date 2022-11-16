<template>
  <!-- <el-row class="text-center">
    <el-col>
      <el-image class="img" :src="src"> </el-image>
      <e-svg icon="pencil" css="pencil"></e-svg>
    </el-col>
    <el-col>
      <p class="title">{{ title }}</p>
    </el-col>
  </el-row> -->
  <div :class="marginTop ? 'profilePic-mt' : 'profilePic'">
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-preview="handlePreview"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <!-- <e-svg
        v-show="imageUrl != ''"
        icon="pencil"
        class="avatar-pencil"
      ></e-svg> -->
      <img v-show="imageUrl != ''" :src="imageUrl" class="avatar" />
      <i v-show="imageUrl == ''" class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <p class="title" style="margin-top: 10px">{{ title }}</p>
  </div>
</template>
<script>
export default {
  props: {
    src: {
      type: String,
    },
    title: {
      type: String,
    },
    marginTop: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      imageUrl: "",
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      // console.log(file, res);
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handlePreview(file) {
      console.log("Preview", file);
    },
    beforeAvatarUpload(file) {
      // const reader = new FileReader();
      // reader.onload = function () {
      //   const output = document.getElementsByClassName("el-upload__input")[0];
      //   output.src = reader.result;
      // };
      // reader.readAsDataURL(event.target.files[0]);
      console.log(file);
      // this.imageUrl = URL.createObjectURL(file.raw);
      // const isJPG = file.type === "image/jpeg";
      // const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error("Avatar picture must be JPG format!");
      // }
      // if (!isLt2M) {
      //   this.$message.error("Avatar picture size can not exceed 2MB!");
      // }
      // return isJPG && isLt2M;
    },
  },
};
</script>
<style scoped>
.img {
  border-radius: 50%;
  margin: auto;
  width: 140px;
  height: 140px;
  background-color: #fff;
}
.title {
  margin-top: -35px;
  text-align: left;
  letter-spacing: 0px;
  color: #000000cc;
  opacity: 1;
  font-weight: 600;
  text-align: center;
}
</style>
