<template>
  <div>
    <el-row>
      <el-col :span="6">
        <div class="fs-20 f-500" style="color: #000000cc">
          Add Teachers Present to XA
        </div>
      </el-col>
      <el-col :span="3" :offset="15">
        <e-button
          icon="el-icon-search"
          :plain="true"
          css="sort-icon"
        ></e-button>
      </el-col>
    </el-row>
    <br/>
    <e-table :table="tableData" shadow>
      <el-table-column label="Name">
        <template slot-scope="scope">
          <div class="d-flex">
            <el-checkbox v-model="scope.row.nameCheckBox"
              style="margin-top: 0px; margin-right: 10px; padding: 10px"
            ></el-checkbox>
            <e-img-name
              :src="require('@/assets/images/profile.jpg')"
              :name="scope.row.name"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Department" prop="Department">
      </el-table-column>
      <el-table-column label="Subject" prop="Subject"> </el-table-column>
      <el-table-column label="Action">
        <template slot-scope="scope">
          <img
            @click="handleEdit(scope.$index, scope.row)"
            src="@/assets/images/downAction.png"
            alt=""
          />
          <img
            @click="handleEdit(scope.$index, scope.row)"
            src="@/assets/images/eyeIcon.png"
            alt=""
          />
        </template>
      </el-table-column>
    </e-table>
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
  data: () => ({
    tableData: [
      {
        Department: "Akanksha Mittal",
        Subject: "34756",
        name: "34756",
        nameCheckBox: true,
      },
       {
        Department: "Akanksha Mittal",
        Subject: "34756",
        name: "34756",
        nameCheckBox: false,
      },  {
        Department: "Akanksha Mittal",
        Subject: "34756",
        name: "34756",
        nameCheckBox: true,
      },  {
        Department: "Akanksha Mittal",
        Subject: "34756",
        name: "34756",
        nameCheckBox: false,
      },  {
        Department: "Akanksha Mittal",
        Subject: "34756",
        name: "34756",
        nameCheckBox: true,
      },  {
        Department: "Akanksha Mittal",
        Subject: "34756",
        name: "34756",
        nameCheckBox: true,
      },
    ],
  }),
};
</script>
