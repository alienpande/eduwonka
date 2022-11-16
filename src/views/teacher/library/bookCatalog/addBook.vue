<template>
  <div>
    <e-container hideHeader pageTitle="Add new book" :back="$url.LI_CATALOG">
      <div
        style="
          border: 1px solid rgb(112 112 112 / 40%);
          border-radius: 4px;

          width: 124px;
          height: 162px;
          backgrounf: #ffffff;
          display: block;
          margin: auto;
          position: relative;
          cursor:pointer;
        "
      >
        <e-svg class="edit-pen" icon="editpens"></e-svg>
        <div
          style="
            color: #0000004d;
            font-weight: 600;
            font-size: 10px;
            opacity: 1;
            text-align: center;
            padding: 0 20px;
            margin-top: 69px;
          "
        >
          Upload cover Image
        </div>
      </div>

      <div class="heading">Book details</div>
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
          </el-col>
          <el-col :span="10" :offset="2">
            <e-select label="Vendor" placeholder="X"></e-select>
          </el-col>
          <el-col>
            <e-select
              :span="10"
              label="Category"
              placeholder="Biology"
            ></e-select>
          </el-col>
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
            label="Create Book"
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
export default {
  data: () => ({
    req: {},
  }),
};
</script>
<style>
.edit-pen img {
  position: absolute;
  top: -10px;
  right: -11px;
}
</style>
