<template>
  <div>
    <e-container
      hideHeader
      pageTitle="Add Fee Student Selection"
      :back="$url.FI_FEE_RECEIPTS_ADD"
    >
      <div class="sub-headers">
        Hi, Please choose the student for whom you want to create fee receipt.
      </div>
      <el-row>
        <el-col :span="15" :offset="5">
          <e-select
            :span="10"
            label="Standard"
            placeholder="Class 6 A"
            :v-model="req.standard"
            :options="standards"
          ></e-select>
        </el-col>
        <el-col :span="15" :offset="5">
            <br/>
            <br/>
          <e-select
            :span="10"
            label="Student"
            placeholder="Akanksha jain"
            :v-model="req.Student"
            :options="standards"
          ></e-select>
        </el-col>
      </el-row>
      <br/>
      <br/>
       <br/>
      <br/>
        <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px">
        <el-col style="float: right" :span="10">
          <e-button
            :span="16"
            label="Cancel"
            width="180"
            css="cancel-custom"
            type="default"
            class="p-45"
          ></e-button>
          <e-button
            :span="8"
            label="Proceed"
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
  data: () => ({
    req: {},
    standards: [
      {
        label: "X",
        value: "x",
      },
      {
        label: "IX",
        value: "ix",
      },
      {
        label: "VIII",
        value: "viii",
      },
      {
        label: "VII",
        value: "vii",
      },
      {
        label: "VI",
        value: "vi",
      },
    ],
  }),
};
</script>
