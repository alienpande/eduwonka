<template>
  <div>
    <e-container
      hideHeader
      pageTitle="View details of issue"
      :back="$url.LI_ISSUE_RETURN"
    >
      <e-button
        label="View Book Details"
        css="sort-icon view-book__details"
        :plain="true"
      ></e-button>
      <el-card style="width: 359px; display: block; margin: auto">
        <el-row>
          <el-col :span="7">
            <img
              style="width: 79px; height: 103px"
              src="@/assets/images/book.png"
              alt=""
            />
          </el-col>
          <el-col :span="14">
            <div style="color: #000000cc" class="fs-20 f-500">
              Introduction to AI
            </div>
            <div
              style="
                color: #00000099;
                opacity: 0.4;
                font-size: 10px;
                font-weight: 500;
              "
            >
              By Phillip C Jackson Jr.
            </div>

            <div style="color: #000000cc; margin-top: 10px" class="fs-20 f-500">
              ISBN Number
            </div>
            <div
              style="
                color: #00000099;
                opacity: 0.4;
                font-size: 10px;
                font-weight: 500;
              "
            >
              1231292931
            </div>
          </el-col>
        </el-row>
      </el-card>
      <br />
      <el-card shadow="none">
        <div
          class="heading"
          style="padding-left: 0 !important; margin-left: 0 !important"
        >
          User Details
        </div>
        <el-row>
          <el-col :span="4">
            <div class="label">User ID</div>
            <div style="font-size: 16px; color: #000000cc">Type/Scan ID</div>
          </el-col>
          <el-col :span="4">
            <div class="label">User Name</div>
            <div style="font-size: 16px; color: #000000cc">Mohan Das</div>
          </el-col>
          <el-col :span="4">
            <div class="label">User Type</div>
            <div style="font-size: 16px; color: #000000cc">Teacher</div>
          </el-col>
        </el-row>
        <br />
        <div
          class="heading"
          style="padding-left: 0 !important; margin-left: 0 !important"
        >
          Issue Details
        </div>
        <el-row>
          <el-col :span="4">
            <div class="label">Date of Borrow</div>
            <div style="font-size: 16px; color: #888888">12/12/2020</div>
          </el-col>
          <el-col :span="4">
            <div class="label">Due Date</div>
            <div style="font-size: 16px; color: #888888">12/01/2021</div>
          </el-col>
        </el-row>
      </el-card>
      <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px">
        <el-col :span="6" :offset="18">
          <e-button
            
            label="Done"
            width="180"
            css="float-right"
            class="p-45"
          ></e-button>
        </el-col>
      </el-row>
    </e-container>
  </div>
</template>
<style>
.view-book__details {
  position: fixed;
  top: 143px;
  right: 80px;
}
</style>
