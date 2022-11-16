<template>
  <e-container-lite
    :percentage="40"
    tag="North Campus"
    showFooter
    @back="$go($url.ASSIGN_SUBJECT)"
    @next="$go($url.WORKING_HOURS)"
  >
    <template #titleHead>
      <div class="h1">Attendance and exam details</div>
      <div class="h5">
        Kindly set your exam type and attendance preference for your institution
      </div>
    </template>
    <AttendanceType />
    <ExamType />
  </e-container-lite>
</template>
<script>
export default {
  components: {
    AttendanceType: () => import("./AttendanceType.vue"),
    ExamType: () => import("./ExamType.vue"),
  },
  data() {
    return {
      examList: 1,
    };
  },
};
</script>
