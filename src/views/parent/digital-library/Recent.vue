<template>
  <div style="padding: 20px; overflow: auto; height: 72vh">
    <el-col style="color: #000000cc;font-weight:500; font-size: 24px" :span="5">
      Shared with me
    </el-col>
    <br/>
    <br/>
    <div style="color: #00000099" class="fs-20 f-500">Yesterday</div>
    
    <file

      v-for="(file, i) in files"
      :key="i"
      :icon="file.icon"
      :title="file.title"
    />
      <br/>
     <div style="color: #00000099" class="fs-20 f-500">Last Week</div>
  
    <file

      v-for="(file, i) in files"
      :key="i"
      :icon="file.icon"
      :title="file.title"
    />
       <br/>
     <div style="color: #00000099" class="fs-20 f-500">This month</div>
  
    <file

      v-for="(file, i) in files"
      :key="i"
      :icon="file.icon"
      :title="file.title"
    />
     <br/>
     <div style="color: #00000099" class="fs-20 f-500">Older</div>
  
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
  data:()=>({
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
  })
}
</script>
