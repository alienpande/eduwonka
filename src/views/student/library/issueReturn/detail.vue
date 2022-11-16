<template>
  <div>
    <e-container
      hideHeader
      pageTitle="Fill details to issue"
      :back="$url.LI_ISSUE_RETURN"
    >
      <e-button
        label="View Book Details"
        css="sort-icon view-book__detail"
        :plain="true"
      ></e-button>
      <e-button
      @click="logModal=true"
        label="View Issue Logs"
        css="sort-icon view-issue__log"
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
           
            <div style="color: #000000cc;margin-top:10px" class="fs-20 f-500">ISBN Number</div>
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
      <div class="heading">User Details</div>
      <el-card shadow='none'>
<el-row>
  <el-col :span="10">
<e-input v-model="req.id" label='User ID' placeholder='Type/Scan ID'></e-input>
</el-col>
  <el-col :span="10" :offset="2">
<e-input v-model="req.user" label='User Name' placeholder='Type here'></e-input>
</el-col>
<el-col :span="10">
<e-select v-model="req.type" label='User Type' placeholder='Teacher'></e-select>
</el-col>

</el-row>
<br/>


      </el-card>

       <div class="heading">User Details</div>
      <el-card shadow='none'>
<el-row>
  <el-col :span="10">
    <e-date-picker class="default-picker" v-model="req.date" label='Date of Borrow' placeholder='12/12/2020'></e-date-picker>

  </el-col>
  <el-col :span="10" :offset="2">
<div class="label">Due Date</div>
<div style="font-size:16px;color: #888888;">  12/01/2021</div>
  </el-col>
</el-row>
      </el-card>

        <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px">
        <el-col style="float: right" :span="9">
          <e-button
            :span="15"
            label="Cancel"
            width="180"
            css="cancel_btn"
            type="default"
            class="p-45"
          ></e-button>
          <e-button
            :span="8"
            label="Issue Book"
            width="180"
            css="float-right"
            class="p-45"
          ></e-button>
        </el-col>
      </el-row>
    </e-container>
     <e-dialog
      :title="'View Issue Logs '"
      v-model="logModal"
      width="70%"
      top="20vh"
      noEsc
      :gutter="20"
      hideDefaultFooter
      @cancel="logModal = false"
      @confirm="logModal = false"
    >
    <issue-log-modal/>
     </e-dialog>
  </div>
</template>
<script>
import eDatePicker from '@/controls/eDatePicker.vue'
export default {
  components: { eDatePicker },
  data:()=>({
    req:{},
    logModal:false,
  })
}
</script>
<style>
.view-book__detail {
  position: fixed;
  top: 143px;
  right: 280px;
}
.view-issue__log {
  position: fixed;
  top: 143px;
  right: 80px;
}
.el-dialog__title {
  font-size: 24px;
  font-weight: 500;
  color: #4d4f5c;
}
</style>
