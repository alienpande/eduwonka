<template>
  <right-side-bar :show="show" @onClose="__onCancel">
    <div class="extras" style="margin-top:60px;overflow:auto;height:78vh">
 <EventCalender />
        <!-- <b-calendar block class="border rounded p-2" locale="en"></b-calendar> -->
        <div style="padding: 9px 24px">
          <div style="color: #222222; opacity: 0.8; font-size: 20px">
            Upcoming Events
          </div>
          <div
            class="event"
            v-for="i in 5"
            :key="i"
            style="
              margin-top: 20px;
              border-bottom: 1px solid rgba(188, 108, 66, 0.4);
              padding-bottom: 20px;
            "
          >
            <div
              style="
                padding-left: 25px;
                color: rgb(34, 34, 34);
                opacity: 0.8;
                font-weight: 600;
                border-left: 6px solid #fcdfbd;
              "
            >
              Lorem ipsum : dolor sit amet consectetur
            </div>
            <div
              style="
                display: flex;
                padding-left: 27px;
                padding-top: 12px;
                opacity: 0.6;
              "
            >
              <e-svg icon="clock" />
              <span style="margin-left: 20px">8 AM - 9 AM</span>
            </div>
            <div
              style="
                display: flex;
                padding-left: 27px;
                padding-top: 12px;
                opacity: 0.6;
              "
            >
              <e-svg icon="loca" />
              <span style="margin-left: 20px">Online</span>
            </div>
          </div>
        </div>
           </div>
  </right-side-bar>
</template>
<script>
import EventCalender from "@/components/school/EventCalender/EventCalender.vue";
import RightSideBar from "@/components/school/rightSideBar.vue";
export default {
      components: { RightSideBar ,EventCalender},
     props: {
    show: { type: Boolean, default: false },
    __onCancel: Function,
  },
}
</script>
<style >

.extras .calender > tr > td.bordered {
  padding: 0px !important;
  border: 0;
}
.extras .calender > thead > tr > td {
  padding: 0 !important;
  border: 0;
}
.extras .event-row {
  display: none !important;
}
.extras .calender-btn {
  display: contents;
  
}
.extras .calender{
border-top: 1px solid rgb(188 108 66 / 40%) !important;
border-bottom: 1px solid rgb(188 108 66 / 40%) !important;
  padding-top: 22px;
    padding-bottom: 22px;
  margin-top: 19px;
  border-radius: 0;
}
.extras .calender > tr:last-child > td.bordered:not(:first-child) {
  border: 0;
}
.extras .calender > tr > td {
  height: 0;
}
.extras .calender > tr > td.plain {
  border: 0;
}
.extras .blue-dot {
  display: none;
}
.extras .calender {
  border: none;
}
.extras .mb20 {
  margin: 0;
}
.extras .e-calender > div > div > div > .btn-prev {
  margin-left: 110px;
}
.extras .event-card{
  display: none;
}
.extras .event-info{
  display: none;
}
</style>