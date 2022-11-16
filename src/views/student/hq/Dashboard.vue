<template>
<es-container pageTitle="School Calendar" subTitle="Below is the list of Events for this Acedmic year" class="bg-black-5">
  <el-row>
    <el-col :span="2" :offset="19">
      <es-select placeholder="Event Type" class="select-icon"></es-select>
    </el-col>
    <el-col :span="2" class="mg-l-30">
      <es-select placeholder="Date Range" class="select-icon"></es-select>
    </el-col>
  </el-row><br /><br />
  <el-table :data="tableData" custom-class="text-white">
    <el-table-column label="Event Name" prop="event" />
    <el-table-column label="Date Range" prop="date" />
    <el-table-column label="Event type" prop="type" />
    <el-table-column label="Action">
      <template>
        <img @click="$router.push($url.HQ_EMPLOYEE_VIEW)"  src="@/assets/images/3dot-action.png" alt="" class="pointer" />
      </template>
    </el-table-column>
  </el-table>
</es-container>
</template>
<script>
export default {
  components: { },
  data: () => ({
    tableData: [
      {
        event: "lorem ipsum, sat imat",
        date: "23-03-2022",
        type: "Lorem ipsum is",
      },
      {
        event: "lorem ipsum, sat imat",
        date: "23-03-2022",
        type: "Lorem ipsum is",
      },
     {
        event: "lorem ipsum, sat imat",
        date: "23-03-2022",
        type: "Lorem ipsum is",
      },
      {
        event: "lorem ipsum, sat imat",
        date: "23-03-2022",
        type: "Lorem ipsum is",
      },
    ],
  }),
  
  created() {
  },
  methods: {
  },
};
</script>
