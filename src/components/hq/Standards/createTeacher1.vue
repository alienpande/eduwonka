<template>
    <div >
        <div style="margin-left:10rem">
            <div style="color: #000000CC;font-size:20px;">Choose subjects for which you want to add teachers</div>
         
         <el-col
         :span="20"
         
        style="
          box-shadow: 0px 1px 3px #11111112;
          border: 1px solid #cccccc;
          border-radius: 4px 4px 0px 0px;
          margin-top:10px;
          background:white;
        "
      >
        <div class="lorem-box" v-for="(sub,i) in subject" :key="i">
          <div>{{sub}}</div>
          <img src="@/assets/images/loremCross.png" />
        </div>
        <img
          src="@/assets/images/lineDot.png"
          style="
            display: inline-block;
            margin-bottom: -12px;
            margin-left: -6px;
            margin-right: 6px;
          "
          alt=""
        />
        <div class="fs-16 f-500 numberFive">5</div>
        <e-svg
          style="
            display: inline-block;
            transform: rotate(90deg);
            margin-left: 22px;
            cursor: pointer;
          "
          class="rotate-90"
          icon="arrow"
        />
      </el-col>
        </div>
        <br/><br/>
        <br/>
        <br/><br/>
        <br/>
          <el-row
      style="
        border-top: 1px solid #fcdfbd;
        margin-top: 20px;
        padding-bottom: 15px;
      "
    >
      <el-col style="float: right" :span="9">
        <e-button
          :span="16"
          label="Cancel"
          width="180"
          css="cancel_btn"
          type="default"
          class="p-45"
        ></e-button>
        <e-button
          :span="8"
          label="Procced"
          width="200"
          @click="handleClick"
          css="float-right"
          class="p-45"
        ></e-button>
      </el-col>
    </el-row>
    </div>
</template>
<script>
export default {
    data:()=>({
        subject:['Arts','Maths','English','Biology','Physics']
    })
}
</script>
<style scoped>
.numberFive {
  color: rgba(0, 0, 0, 0.6);
  box-shadow: rgb(17 17 17 / 7%) 0px 1px 3px;
  border-radius: 4px;
  background: 0% 0% no-repeat padding-box padding-box rgb(188 108 66 / 20%);
  width: 54px;
  text-align: center;
  padding: 6px 0;
  display: inline-block;
  margin-left: 30px;
}
</style>