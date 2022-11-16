<template>
  <div>
    <e-container
      hideHeader
      pageTitle="Add Term Creation"
      :back="$url.FI_SETTINGS_TERM"
    >
      <div style="color: #000000cc" class="fs-20 f-600">
        Provide the below details to create new term
      </div>
      <br />
      <el-row>
        <el-col :span="20">
          <e-input label="Term Name" placeholder="Type term name here">
          </e-input>
        </el-col>
        <el-col :span="9">
          <e-date-picker
            label="Start Date"
            placeholder="Choose Start Date"
            class="default-picker"
          ></e-date-picker>
        </el-col>
        <el-col :span="9" :offset="2">
          <e-date-picker
            label="End Date"
            placeholder="Choose Start Date"
            class="default-picker"
          ></e-date-picker>
        </el-col>
        <el-col :span="9">
          <div style="position:relative">
            <e-input label="% of fees to be paid in this Term" placeholder="Type term name here">
            </e-input>
            <div
              style="
                position: absolute;
                right: 0px;
                top: 30px;
                font-size: 24px;
                background: #fcdfbd;
                color: #BC6C4;
                padding: 3.5px 9px;
              "
            >
              %
            </div>
          </div>
        </el-col>
        <el-col :span="9" :offset="2">
          <e-date-picker
            label="Term Due Date for fees submission"
            placeholder="Choose Start Date"
            class="default-picker"
          ></e-date-picker>
        </el-col>
      </el-row>
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
