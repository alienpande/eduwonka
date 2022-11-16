<template>
  <div>
    <e-container pageTitle="Payslip Line item">
      <div class="sub-headers">Below is the list of people who paid fees</div>
      <div class="heading">School Details</div>
      <el-card shadow="none">
        <e-input label="School Name"> </e-input>
        <e-input label="School Address"> </e-input>
        <div class="label">Payslips Screen Logo</div>

        <div class="upload-btn-wrappers" style="position:relative">
          <div
            class="btn-er"
            style="height: 235px; border: 2px dashed #00000066; margin: 20px"
          >
            <e-svg
              class="upload-icon"
              style="margin: 18px 0 20px 0"
              icon="finance/upload"
            />
            <div style="color: #00000066; font-size: 18px; text-align: center">
              Drag and drop files here
            </div>
            <div style="color: #00000066; text-align: center">or</div>
            <div
              style="
                border: 1px solid rgb(188, 108, 66);
                border-radius: 3px;
                width: 164px;
                height: 31px;
                color: rgb(188, 108, 66);
                text-align: center;
                font-size: 14px;
                padding-top: 7px;
                display: block;
                margin: auto;
              "
            >
              Browse files
            </div>
          </div>
          <input type="file" name="myfile" />
        </div>
      </el-card>
      <div class="heading">Custom Field</div>
      <el-card shadow="none">
        <el-row>
          <el-col :span="10" style="border-right: 1px solid rgb(188 108 66 / 20%);">
            <div style="color: #000000cc; font-size: 20px">Earning</div>
            <br/>
            <div style="display: flex;margin-bottom:15px" v-for="i in addMore" :key="i">
              <input
                style="
                  box-shadow: 0px 1px 3px #11111112;
                  border: 1px solid #cccccc;
                  border-radius: 4px;color: #00000099;font-size:16px;padding:0 10px;
                  margin-right:10px;
                  width: 307px;
                "
                type="text"
                 :v-model="i"
                placeholder="Basic & DA"
              />
              <img @click="addMore--" src="@/assets/images/custom-del-icon.png" alt="" />
            </div>
            <e-button css='sort-icon' @click="addMore++" :plain='true' label='Add more' icon='el-icon-plus'></e-button>
          </el-col>
           <el-col :span="10" :offset="1">
            <div style="color: #000000cc; font-size: 20px">Deduction</div>
            <br/>
            <div style="display: flex;margin-bottom:15px" v-for="i in duration" :key="i">
              <input
                style="
                  box-shadow: 0px 1px 3px #11111112;
                  border: 1px solid #cccccc;
                  border-radius: 4px;color: #00000099;font-size:16px;padding:0 10px;
                  margin-right:10px;
                  width: 307px;
                "
                type="text"
                 :v-model="i"
                placeholder="Tax"
              />
              <img @click="duration--" src="@/assets/images/custom-del-icon.png" alt="" />
            </div>
            <e-button css='sort-icon' @click="duration++" :plain='true' label='Add more' icon='el-icon-plus'></e-button>
          </el-col>
        </el-row>
      </el-card>
        <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px">
        <el-col style="float: right" :span="10">
          <e-button
            :span="16"
            label="Cancel"
            width="180"
            css="cancel_btn"
            type="default"
            class="p-45"
          ></e-button>
          <e-button
            :span="6"
            label="Create"
            width="180"
            @click="handleClick"
            css="float-right"
            class="p-45"
          ></e-button>
        </el-col>
      </el-row>
    </e-container>
  </div>
</template>
<script>
export default {
    data:()=>({
        addMore:2,
        duration:2,
    })
}
</script>
<style>
.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
}
.upload-btn-wrappers input[type="file"] {
  font-size: 2rem;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  height: 287px;
  width: 72rem;
}
.btn-er {
  border: 2px solid gray;
  color: gray;
  background-color: white;
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: bold;
}
.upload-icon img {
  display: block;
  margin: auto;
}
</style>
