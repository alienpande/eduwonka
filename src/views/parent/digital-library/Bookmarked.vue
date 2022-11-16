<template>
  <div style="padding: 20px; overflow: auto; height: 72vh">
    <el-row>
      <el-col style="color: #000000cc;font-weight:500; font-size: 24px" :span="5">
      Bookmarked
      </el-col>
     
    </el-row>
    <br />
    <el-row
      v-if="filter.length > 0"
      :gutter="20"
      style="
        padding: 20px 0px 20px 0px;
        margin: 0px 0px 5px 0px;
        background: white;
      "
    >
      <el-col :span="3" style="padding-left: 35px">
        <e-dropdown :list="filter" primary />
      </el-col>
      <el-col :span="3" style="padding-left: 35px" class="primary-text"
        ><e-dropdown :list="filter2" primary
      /></el-col>
      <el-col :span="3" style="color: #bc6c42; font-size: 16px"
        >Clear filter</el-col
      >
      <el-col style="padding-left: 10px" :offset="13" :span="1">
        <e-button
          icon="el-icon-search"
          :plain="true"
          css="bg-tranparent"
        ></e-button>
      </el-col>
    </el-row>
  
   
     <br/>
             <div style="color:#00000099" class="fs-20 f-500">All Files</div>
<file
      v-for="(file, i) in files2"
      :key="i"
      :icon="file.icon"
      :title="file.title"
    />
  </div>
</template>
<script>
export default {
  data: () => ({
    files: [
      {
        title: "Holiday Circular",
        icon: "file",
      },
      {
        title: "Exam Circular",
        icon: "excel",
      },
      {
        title: "Class X time table",
        icon: "play",
      },
      {
        title: "Class X Exam paper",
        icon: "music",
      },
    ],
     files2: [
      {
        title: "Holiday Circular",
        icon: "file",
      },
      {
        title: "Exam Circular",
        icon: "excel",
      },
      {
        title: "Class X time table",
        icon: "play",
      },
      {
        title: "Class X Exam paper",
        icon: "music",
      },
       {
        title: "Holiday Circular",
        icon: "file",
      },
      {
        title: "Exam Circular",
        icon: "excel",
      },
      {
        title: "Class X time table",
        icon: "play",
      },
      {
        title: "Class X Exam paper",
        icon: "music",
      },
       {
        title: "Holiday Circular",
        icon: "file",
      },
      {
        title: "Exam Circular",
        icon: "excel",
      },
      {
        title: "Class X time table",
        icon: "play",
      },
      {
        title: "Class X Exam paper",
        icon: "music",
      },
       {
        title: "Holiday Circular",
        icon: "file",
      },
      {
        title: "Exam Circular",
        icon: "excel",
      },
      {
        title: "Class X time table",
        icon: "play",
      },
      {
        title: "Class X Exam paper",
        icon: "music",
      },
       {
        title: "Holiday Circular",
        icon: "file",
      },
      {
        title: "Exam Circular",
        icon: "excel",
      },
      {
        title: "Class X time table",
        icon: "play",
      },
      {
        title: "Class X Exam paper",
        icon: "music",
      },
    ],
    folders: [
      "Annual Function Photos",
      "Final Exam Question paper",
      "My collection",
    ],
    filter: [
      { text: "Standard" },
      { text: "Standard 2" },
      { text: "Standard 3" },
    ],
    filter2: [
      { text: "Subject" },
      { text: "Subject 1" },
      { text: "Subject 2" },
    ],
  }),
};
</script>
