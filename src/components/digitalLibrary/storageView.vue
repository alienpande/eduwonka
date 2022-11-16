<template>
  <div>
    <div style="display:flex;    border-top: 1px solid rgb(0 0 0 / 10%);padding-top:15px">
      <img style="padding-left:20px" src="@/assets/icons/svg/folder.svg" alt="">
      <div class="prog-bar">
        <div :style="{width:  width +'%'}" class="progbar-color"></div>

      </div>
      <div style="color:#4D4F5C;font-size:10px;margin-top:5px">{{width}}%</div>
    </div>
    <div style="color:#00000099;font-size:12px;margin:10px 0 0 20px">10 GB used of 50 GB</div>
  </div>
</template>
<script>
export default {
    props:['width']
}
</script>
<style>
.prog-bar {
  width: 10rem;
  height: 6px;
  border-radius: 10px;
  border: 1px solid rgb(112 112 112 / 80%);
      margin: 8px 15px 0 16px;
}
.progbar-color{
    background: #bc6d4281;
    width: 50%;
    height: 100%;
}
</style>
