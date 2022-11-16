<template>
  <div class="about">
   <e-container
      pageTitle="Task"
      btnIcon="el-icon-plus"
      btnText="Add Task"
      @btnClick="$router.push($url.LN_LESSON_CREATE)"
    >
      <el-tabs class="floatTabHeader" v-model="activeName">
        <el-tab-pane label="Created by me" name="created">
          asj
        </el-tab-pane>
         <el-tab-pane label="Assigned to me" name="assigned">
          asj
        </el-tab-pane>
      </el-tabs>
   </e-container>
  </div>
</template>
<script>
export default {
  data:()=>({
    activeName:'created'
  })
}
</script>
