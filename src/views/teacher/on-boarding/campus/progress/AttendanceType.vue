<template>
  <e-form
    heading="Attendance Detail"
    subHeading="Please fill the below details on attendance and exam information"
    :gutter="30"
  >
    <el-col
      :span="8"
      v-for="(item, index) in attendanceTypes"
      v-bind:key="index"
      style="background: #fff; height: 180px; padding: 30px"
    >
      <el-radio
        class="big-radio"
        v-model="selectAttendanceType"
        :label="item.key"
      >
        {{ item.title }}
      </el-radio>

      <div
        style="
          margin-top: 10px;
          margin-left: 30px;
          color: #000000;
          opacity: 0.6;
        "
      >
        {{ item.description }}
      </div>
    </el-col>
  </e-form>
</template>

<script>
export default {
  data() {
    return {
      selectAttendanceType: false,
    };
  },
  created() {
    this.attendanceTypes = require("@/api/attendance-type.json");
  },
};
</script>

<style scoped>
.display-content {
  display: flex;
}
.attendance-title {
  font-weight: 550;
}
.attendance-description {
  font-weight: 300;
  color: #000000;
  margin-top: 5px;
}
</style>
