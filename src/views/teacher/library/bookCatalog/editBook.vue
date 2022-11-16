<template>
  <div>
    <e-container
      hideHeader
      pageTitle="View/Edit Book Details"
      :back="$url.LI_CATALOG"
    >
      <e-button
        label="Reserve Book"
        css=" reserve-book__btn"
        
      ></e-button>

       <e-button
        label="Delete Book"
        css="sort-icon delete-book__btn"
        :plain="true"
      ></e-button>
     
      <br/>
<div style="    display: flex;
    ">
     <div
        style="
          border-radius: 4px;

          width: 124px;
          height: 162px;
          backgrounf: #ffffff;
         margin-right:40px;
          position: relative;
          cursor: pointer;
        "
      >
        <e-svg class="edit-pen" icon="editpens"></e-svg>
        <img
          style="width: 124px; height: 162px"
          src="@/assets/images/book.png"
          alt=""
        />
      </div>
      <el-card shadow="none" v-for="(de,i) in detail" :key="i" style="width: 260px;height: 110px;background:#FCDFBD66;margin:0 10px;
    margin-top: 49px;
}">
        <el-row>
          <el-col :span="7">
            <e-svg style="margin-top: 10px; margin-left: 15px" icon="openBok" />
          </el-col>
          <el-col :span="14" :offset="1">
            <div style="color: #000000cc; font-size: 16px">{{de.title}}</div>
            <div :style="{  color: de.color }" style="color: #000000cc; font-size: 20px; font-weight: 600">
           {{de.count}}
            </div>
          </el-col>
        </el-row>
      </el-card>
      </div>

      <div style="display: flex;
    justify-content: space-between;">
          <div class="heading">Book details</div>
     
          <img style="width: 60px;padding-top:10px;
height: 52px;" src="@/assets/images/unmarkBtn.png" alt="">
     
      </div>
      <el-card shadow="none">
        <el-col :span="10">
          <e-input
            v-model="req.bookName"
            label="Book Name"
            placeholder="Lorem"
          ></e-input>
        </el-col>
        <el-col :span="10" :offset="2">
          <e-input
            v-model="req.author"
            label="Author"
            placeholder="Lorem"
          ></e-input>
        </el-col>
        <el-col>
          <div style="color: #000000cc; font-size: 16px; font-weight: 600">
            Summary
          </div>
          <textarea
            v-model="req.Summary"
            class="details-expenses__textarea"
            placeholder="Summary"
            rows="4"
            cols="127"
          ></textarea>
        </el-col>
        <el-col :span="10">
          <e-input
            v-model="req.Publisher"
            label="Publisher"
            placeholder="Lorem"
          ></e-input>
        </el-col>
        <el-col :span="10" :offset="2">
          <e-date-picker
            v-model="req.author"
            class="default-picker"
            label="Author"
            placeholder="Lorem"
          ></e-date-picker>
        </el-col>
        <el-col :span="10">
          <e-input
            v-model="req.Edition"
            label="Edition"
            placeholder="Lorem"
          ></e-input>
        </el-col>
        <el-col :span="10" :offset="2">
          <e-input
            v-model="req.Price"
            label="Price"
            placeholder="Lorem"
          ></e-input>
        </el-col>
      </el-card>
      <div class="heading">Record details</div>
      <el-card shadow="none">
        <el-row>
          <el-col :span="10">
            <e-input
              v-model="req.isbn"
              label="ISBN Number"
              placeholder="Lorem"
            ></e-input>
          </el-col>
          <el-col :span="10" :offset="2">
            <e-input
              v-model="req.oclc"
              label="OCLC Number"
              placeholder="Lorem"
            ></e-input>
          </el-col>
          <el-col :span="10">
            <e-input
              v-model="req.numOfCop"
              label="Number of copies"
              placeholder="Lorem"
            ></e-input>
            <e-select label="Category" placeholder="Biology"></e-select>
          </el-col>
          <el-col :span="10" :offset="2">
            <e-select label="Vendor" placeholder="X"></e-select>
            <br />
            <br />
            <br />
            <br />
            <br />
            <e-button
              width="500"
              label="View Issue Logs"
              css="sort-icon"
              :plain="true"
            ></e-button>
          </el-col>
          <br />
          <br />
          <!-- <el-col >
           
          </el-col> -->
          <!-- <el-col >
          </el-col> -->
        </el-row>
        <br />
        <br />
      </el-card>
      <br />
      <br />
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
            label="Update"
            width="180"
            css="float-right"
            class="p-45"
          ></e-button>
        </el-col>
      </el-row>
    </e-container>
  </div>
</template>
<script>
import eButton from "@/controls/eButton.vue";
export default {
  components: { eButton },
  data: () => ({
    req: {},
    detail:[
        {
            title:"Total Copies",
            count:'15'
        },
         {
            title:"Available",
            count:'5',
            color:'green'
        },
         {
            title:"Issued",
            count:'10'
        },
    ]
  }),
};
</script>
<style>
.edit-pen img {
  position: absolute;
  top: -10px;
  right: -11px;
}
.delete-book__btn {
  position: fixed;
  top: 143px;
  right: 260px;
}
.bookMark-icon{
    border: 2px solid #BC6C42;
border-radius: 4px;width: 55px;
height: 47px;
}
.bookMark-icon img{
        margin: 12px 0 1px 21px;
}
.reserve-book__btn{
 position: fixed;
  top: 143px;
  right: 80px;
}
</style>
