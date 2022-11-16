<template>
 <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
  <e-form
    heading="Attendance Detail"
    subHeading="Please fill the below details on attendance and exam information"
    :gutter="30"
    :rules="rules"
  >
    <el-col
      :span="8"
      :heading ="item.attendance_type"
      v-for="(item, index) in attendanceTypes"
      v-bind:key="index"
      v-model="item.attendanceType"
      :value="item.itemId"
      rules="required"
      style="background: #fff; height: 180px; padding: 30px"
    >
      <el-radio
        class="big-radio"
        v-model="item.attendanceType"
        :label="item.key"
        @change="handleSubmit(handleClick(item))"
        rules="required"
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
        rules="required"
      >
        {{ item.description }}
      </div>
    </el-col>
  </e-form>
 </ValidationObserver>
</template>

<script>
export default {
   props: {
    attendanceType: {
      type: Object
    }
  },
  data() {
    return {
      rules: {},
      attendance: [],
      attendanceTypes: [],
      selectAttendanceType: 'Class-wise Attendance',
    };
  },
  computed: {
    isValid () {
      return this.item.attendanceType;
    }
  },
  watch: {
    attendanceType() {
      this.setValue()
    }
  },
  created() {
     // this.setValue()
  },
  methods :{
    setValue: function() {
      var tempData = require("@/api/attendance-type.json");
      for (const attendance of tempData){
        this.attendanceTypes.push({title: attendance.title, key: attendance.key, description: attendance.description, attendanceType: this.attendanceType.attendance_type})
      }
      console.log('RRRRRRRRRRRRRRRR',this.attendanceType)
    },
    handleClick(attendance){
      this.$emit("getAttendance", attendance)
    },
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
