<template>
<div>
  <div style="display: flex; flex-wrap: wrap; justify-content: space-around; padding: 40px;">
    <el-row :gutter="20" class="form-type-3">
      <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18" :offset="3">
        <br>
          <el-col :span="8"><el-button style="font-size: 20px; display: flex; border: 2px solid #000000; border-radius: 10px; width: 200px; height: 60px; margin-bottom: 5px;" class="gray-btn rounded-10" size="" @click="formFieldSelect('choose-single')">Choose One</el-button></el-col>
          <el-col :span="8"><el-button style="font-size: 20px; display: flex; border: 2px solid #000000; border-radius: 10px; width: 200px; height: 60px; margin-bottom: 5px;" class="gray-btn rounded-10" size="" @click="formFieldSelect('choose-multiple')"><i class="el-icon-success" /> Choose Multiple</el-button></el-col>
          <el-col :span="8"><el-button style="font-size: 20px; display: flex; border: 2px solid #000000; border-radius: 10px; width: 200px; height: 60px; margin-bottom: 5px;" class="gray-btn rounded-10" size="" @click="formFieldSelect('drop-down')"><i class="el-icon-caret-bottom" /> Drop Down</el-button></el-col>
        <br>
      </el-col>
      <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18" :offset="6">
        <br>
          <el-col :span="8"><el-button style="font-size: 20px; display: flex; border: 2px solid #000000; border-radius: 10px; width: 200px; height: 60px; margin-bottom: 5px;"  class="gray-btn rounded-10" size="" @click="formFieldSelect('short-answer')"><i class="el-icon-s-fold" /> Short Answer</el-button></el-col>
          <el-col :span="8"><el-button style="font-size: 20px; display: flex; border: 2px solid #000000; border-radius: 10px; width: 200px; height: 60px; margin-bottom: 5px;" class="gray-btn rounded-10" size="" @click="formFieldSelect('long-answer')"><i class="el-icon-s-fold" /> Long Answer</el-button></el-col>
          <!-- <el-col :span="8"><el-button style="font-size: 20px; display: flex; border: 2px solid #000000; border-radius: 10px; width: 200px; height: 60px; margin-bottom: 5px;" class="gray-btn rounded-10" size="" @click="formFieldSelect('opinion-scale')"><i class="el-icon-s-data" /> Opinion Scale</el-button></el-col> -->
        <br>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="14" :offset="6"></el-col>
      <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18" :offset="6">
        <br>
          <el-col :span="8"><el-button style="font-size: 20px; display: flex; border: 2px solid #000000; border-radius: 10px; width: 200px; height: 60px; margin-bottom: 5px;" class="gray-btn rounded-10" size="" @click="formFieldSelect('add-image')"><i class="el-icon-picture" /> Add Image</el-button></el-col>
          <el-col :span="8"><el-button style="font-size: 20px; display: flex; border: 2px solid #000000; border-radius: 10px; width: 200px; height: 60px; margin-bottom: 5px;" class="gray-btn rounded-10" size="" @click="formFieldSelect('add-video')"><i class="el-icon-video-camera-solid" /> Add video</el-button></el-col>
        <br>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="14" :offset="6"></el-col>
      <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18" :offset="8">
        <br>
          <el-col :span="8"><el-button style="font-size: 21px; display: flex; border: 2px solid #000000; border-radius: 10px; width: 280px; height: 60px; margin-bottom: 5px;" class="gray-btn rounded-10" size="" @click="formFieldSelect('upload-attachment')"><i class="el-icon-document-add" /> Upload Documents</el-button></el-col>
        <br>
      </el-col>
    </el-row>
    <!-- <div v-for="i in 15" :key="i" style="display: flex; border: 2px solid #000000; border-radius: 10px; width: 230px; height: 70px; margin-bottom: 15px;" class="multiple">
      <e-svg class="multiple-pointer-color" icon="Pointer" />
      <img class="multiple-pointer-black" style="width: 41px; height: 28px; margin: 20px 8px 0 3px" src="@/assets/images/multi-squre.png" alt="" />
      <div class="multiple-text" style="opacity: 0.6; font-size: 16px; padding-right: 29px; margin-top: 10px;">
        Multiple choice question
        
      </div>
      <img class="help-color" style="width: 30px; height: 28px; margin: 16px 8px 0px 0px" src="@/assets/images/helpColor.png" alt="" />

      <img class="help-black" style="width: 24px; height: 26px; margin: 17px 9px 0 0" src="@/assets/images/iBlack.png" alt="" />
    </div> -->
    </div>
    <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px" class="form-last-buttons">
      <!-- <el-col style="float: right" :span="9" class="form-last-buttons"> -->
        <e-button :span="15" label="Cancel" width="180" css="cancel_btn" type="default" class="p-45" />
        <e-button :span="8" label="Proceed" width="180" @click="handleClick" css="float-right" class="p-45" />
      <!-- </el-col> -->
    </el-row>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        form_type: ''
      }
    },
    methods: {
      formFieldSelect: function(e) {
        this.form_type = e
      },
      handleClick() {
        this.$emit("save", this.form_type)
      },
    }
  }
</script>
<style>
.multiple-pointer-color {
  display: none;

  margin: 25px 9px 0 9px;
}
.multiple:hover {
  box-shadow: 0px 13px 21px #00000033;
  border: 2px solid #bc6c42 !important;
}

.multiple:hover .multiple-text {
  color: #bc6c42;
}
.multiple:hover .multiple-pointer-black {
  display: none;
}
.multiple:hover .multiple-pointer-color {
  display: block !important;
}
.multiple:hover .help-black {
  display: none;
}
.help-color {
  display: none;
}
.multiple:hover .help-color {
  display: block;
}
</style>
