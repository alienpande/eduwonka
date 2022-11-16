<template>
  <e-container
    pageTitle="Event Calender"
    btnIcon="el-icon-plus"
    btnText="Create Event"
  >
    <EventCalender />
  </e-container>
</template>
<script>
import EventCalender from "@/components/school/EventCalender/EventCalender.vue";
export default {
  components: { EventCalender },
};
</script>
