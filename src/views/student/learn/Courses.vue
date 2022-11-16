<template>
  <div style="overflow: auto; height: 80vh">
    <el-row>
      <el-col :span="17">
        <div style="font-size: 24px; opacity: 0.8; padding: 30px 0 0 47px">
          Courses
        </div>
        <el-row
          v-if="filter.length > 0"
          :gutter="20"
          style="padding: 0px 0px 0px 0px; margin: 10px 0px 5px 0px"
        >
          <el-col
            :span="4"
            style="
              font-weight: bold;
              font-size: 18px;
              padding-left: 50px !important;
            "
          >
            14 classes
          </el-col>
          <el-col :span="6"></el-col>
          <el-col :span="4" style="padding-left: 35px" :offset="10">
            <e-dropdown :list="filter" primary />
          </el-col>
          <el-col :span="5" style="padding-left: 35px" class="primary-text"
            ><e-dropdown :list="filter2" primary
          /></el-col>
        </el-row>

        <div style="padding: 0 50px; margin-top: 10px">
          <el-card
            shadow="none"
            style="margin-bottom: 10px"
            class="rounded-08 pg-50 cp"
            v-for="i in 5"
            :key="i"
          >
          <div @click="showStandardMenu(i)">
            <el-row >
              <el-col :span="3">
                <img src="@/assets/images/biologybook.png" alt="" />
              </el-col>
              <el-col :span="20">
                <div style="font-size: 20px; opacity: 0.8; font-weight: 600">
                  Lorem ipsum : dolor sit amet consectetur
                </div>
                <el-row style="margin-top: 12px">
                  <el-col :span="4">
                    <div
                      style="font-weight: 300; opacity: 0.8; font-size: 14px"
                    >
                      Subtopics
                    </div>
                    <div
                      style="
                        font-size: 20px;
                        opacity: 0.8;
                        font-weight: 400;
                        margin-top: 5px;
                      "
                    >
                      14
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div
                      style="font-weight: 300; opacity: 0.8; font-size: 14px"
                    >
                      Taken by
                    </div>
                    <div
                      style="
                        font-size: 14px;
                        opacity: 0.8;
                        font-weight: 500;
                        margin-top: 5px;
                      "
                    >
                      Mrs.Stephen Richard
                    </div>
                  </el-col>
                  <el-col :span="14">
                    <div
                      style="font-weight: 300; opacity: 0.8; font-size: 14px"
                    >
                      Focus areas
                    </div>
                    <div
                      style="display: flex; flex-wrap: wrap; margin-top: 5px"
                    >
                      <button class="focus-area__btn">Mental strenth</button>
                      <button class="focus-area__btn">Communication</button>
                      <button class="focus-area__btn">Aptitude</button>
                      <button class="focus-area__btn">
                        Analytical thinking
                      </button>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            </div>
          </el-card>
        </div>
      </el-col>

      <el-col class="extras" :span="7" style="background: white;padding-top:10px">
        <EventCalender />
        <!-- <b-calendar block class="border rounded p-2" locale="en"></b-calendar> -->
        <div style="padding: 9px 24px">
          <div style="color: #222222; opacity: 0.8; font-size: 20px">
            Upcoming Events
          </div>
          <div
            class="event"
            v-for="i in 4"
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
      </el-col>
    </el-row>
  </div>
</template>
<script>
import EventCalender from "@/components/school/EventCalender/EventCalender.vue";
import { mapMutations } from "vuex";
import { Learn } from "@/util/menus/learn.menus";
import { Routes } from "@/util/menus/learn.menus";
export default {
  components: { EventCalender },
  data: () => ({
    filter: [
      { text: "Standard" },
      { text: "Standard 2" },
      { text: "Standard 3" },
    ],
    filter2: [
      { text: "Subject" },
      { text: "Mathmatetic" },
      { text: "Subject 2" },
    ],
    Learn,
  }),
  methods:{
       ...mapMutations("Common", ["setStandardMenu"]),
       showStandardMenu(i) {
      const defaultRoutes = [
       
        {
          id: 23,
          title: "Introduction",
          to: `${Routes.LN_COURSES_INTRODUCTION}`,
        },
        {
          id: 24,
          title: "Syllabus",
          to: `${Routes.LN_COURSES_SYLLABUS}`,
        },
        {
          id: 25,
          title: "Assessment",
          to: `${Routes.LN_COURSES_ASSESSMENT}`,
        },
        {
          id: 26,
          title: "Course content",
          to: `${Routes.LN_COURSES_COURSECONTENT}`,
        },
        {
          id: 27,
          title: "Assignment",
          to: `${Routes.LN_COURSES_ASSIGNMENT}`,
        },
        {
          id: 28,
          title: "Grade centre",
          to: `${Routes.LN_COURSES_GRADECENTER}`,
        },
        {
          id: 29,
          title: "Analytics",
          to: `${Routes.LN_COURSES_ANALYTICS}`,
        },
        
      ];
      // console.log(this.Learn);
     
      // this.Learn.find(e=>e.to == this.$route.path).routes=defaultRoutes
      this.setStandardMenu({
        routes: defaultRoutes,
        standard: i,
        sections: i,
      });
      // this.$router.push(`sksk/${i}`);
    },
  }
};
</script>
<style>
.focus-area__btn {
  border: 1px solid #bc6c42;
  border-radius: 13px;
  height: 26px;
  padding: 0 13px;
  font-weight: 600;
  background: transparent;
  color: #bc6c42;
  margin: 0 15px 8px 0;
  font-size: 11px;
}

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

.exam-subject-title .sub-menu-title{
  display: block !important;
}
.sub-menu-title{
  display: none !important;
}
</style>
