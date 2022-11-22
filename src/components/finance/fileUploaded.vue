<template>
    <el-row>
      <el-col :span="18" style="background: white">
        <el-row>
          <el-col :span="window.width > 767 ? 15 : 24">
            <div class="upload-btn-wrappers">
              <div
                class="btn-er"
                style="
                  width: 448px;
                  height: 235px;
                  border: 2px dashed #00000066;
                  margin: 20px;
                "
              >
                <e-svg style="margin: 18px 0 0 202px" icon="finance/upload" />
                <div
                  style="color: #00000066; font-size: 18px; text-align: center"
                >
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
                    margin-left: 144px;
                  "
                >
                  Browse files
                </div>
              </div>
              <input type="file" name="myfile" />
            </div>
            <e-button
            icon='el-icon-plus'
              :span="3"
              label="Add Additional notes"
              css="sort-icon"
              style="margin-left:20px"
              :plain="true"
              type="primary"
            ></e-button>
            <br/>
            <br/>
            <br/>
            
          </el-col>
          <el-col :span="window.width > 767 ? 7 : 24">
            <br />
            <div
              style="
                border: 1px solid #00000066;
                border-radius: 2px;
                display: flex;
                margin-bottom: 5px;
              "
            >
              <img
                style="padding: 5px 0 8px 10px"
                src="@/assets/images/expenseImg.png"
              />
              <div style="margin-left: 10px; margin-top: 5px">
                <div
                  style="color: #00000066; font-weight: 500; font-size: 14px"
                >
                  Expense.png
                </div>
                <div style="color: #979fb8; font-weight: 500; font-size: 12px">
                  428KB
                </div>
              </div>
              <e-svg class="close-icons" icon="Close2"></e-svg>
            </div>

            <div
              style="
                border: 1px solid #00000066;
                border-radius: 2px;
                display: flex;
                margin-bottom: 5px;
              "
            >
              <img
                style="padding: 5px 0 8px 10px"
                src="@/assets/images/expenseImg.png"
              />
              <div style="margin-left: 10px; margin-top: 5px">
                <div
                  style="color: #00000066; font-weight: 500; font-size: 14px"
                >
                  Expense.png
                </div>
                <!-- <div
                    style="color: #979fb8; font-weight: 500; font-size: 12px"
                  >
                    428KB
                  </div> -->
                <el-progress style="width: 186px" percentage="30"></el-progress>
              </div>
              <e-svg class="close-icons-p" icon="Close2"></e-svg>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
</template>

<script>
import screenSize from "@/mixins/screenSize"
export default {
  mixins: [screenSize]
}
</script>

<style>
.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
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

.upload-btn-wrappers input[type="file"] {
  font-size: 2rem;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  height: 287px;
  width: 33rem;
}
.close-icons img {
  width: 18px;
  margin-top: 15px;
  margin-left: 5.3rem;
}
.close-icons-p img {
  width: 18px;
  margin-top: 15px;
  margin-left: -12px;
}
</style>
