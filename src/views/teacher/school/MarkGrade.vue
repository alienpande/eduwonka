<template>
  <e-container-custom>
    <template v-slot:header>
      <el-row class="" :span="24">
        <el-col :span="4" class="text-heading">Mark Exam</el-col>
        <el-col class="float-right text-right" :span="1">
          <el-button
            icon="el-icon-close"
            style="border: 2px solid #000"
            @click="$go('/school/exam')"
            circle
          ></el-button>
        </el-col>
      </el-row>
      <el-row class="mg-t-10" :span="24">
        <el-col :span="16" class="mt-">
          <el-row type="flex" justify="space-around">
            <el-col class="text-sm-muted">
              Standard
              <div class="text-heading__sub">1A</div>
            </el-col>
            <el-col class="text-sm-muted">
              Subject
              <div class="text-heading__sub">Mathematics</div>
            </el-col>
            <el-col class="text-sm-muted">
              Exam Type
              <div class="text-heading__sub">Term 2</div>
            </el-col>
            <el-col class="text-sm-muted">
              Score
              <div class="text-heading__sub">98%</div>
            </el-col>
          </el-row>
        </el-col>
        <el-col class="float-right" :span="2">
          <e-button class="mt-10" size="large" type="primary" label="Submit" />
        </el-col>
      </el-row>
    </template>
    <template v-slot:content>
      <el-form bgColor="transparent">
        <el-col :span="6" class="mg-t-0-f mg-b-10">
          <div class="text-sm-muted mg-y-3">
            Student
          </div>
          <el-select :options="[{value:'All'}]" />
        </el-col>
        <el-col>
          <el-row justify="center" :gutter="0">
            <el-col
              v-for="student in students"
              :key="student.id"
              :span="20"
              :xs="24"
              :sm="24"
              :md="12"
              :lg="12"
              :xl="8"
              style="padding: 5px"
            >
              <el-card
                shadow="hover"
                class="mark-grade-card"
                body-style="padding:10px 15px"
              >
                <div class="row pd-4 justify-content-between">
                  <div class="col-12 col-md-6">
                    <div class="d-flex mg-y-5">
                      <el-avatar
                        shape="circle"
                        size="50px"
                        :src="require('@/assets/images/profile.jpg')"
                        alt=""
                      />
                      <div class="mg-l-10 mg-t-10" style="color:#4D4F5C">{{ student.name }}</div>
                    </div>
                  </div>
                  <div class="col-12 col-md-3">
                    <div class="mark-grade-card__mark">
                      <div class="mark-grade-card__mark_text">98/100</div>
                    </div>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col>
              <div class="text-center mg-y-40 mg-b-100">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="1000"
                >
                </el-pagination>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-form>
    </template>
  </e-container-custom>
</template>

<script>
import EContainerCustom from "@/controls/eContainerCustom.vue";
export default {
  components: { EContainerCustom },
  data() {
    return {
      activeName: "pastExam",
      showSideBar: true,
      studentList: [
        {
          id: 0,
          name: "rashid",
        },
        {
          id: 1,
          name: "rashid",
        },
        {
          id: 2,
          name: "rashid",
        },
        {
          id: 3,
          name: "rashid",
        },
      ],
    };
  },
  created() {
    this.students = require("@/api/students.json");
  },
};
</script>

<style>
.exams-color {
  color: #000000;
  font-weight: 550;
}
.mt-5 {
  margin-top: -5px;
}
.mark-grade-card {
  background: #fff;
  border-radius: 8px !important;
  padding: 0px;
  /* padding: 5px; */
}
.mark-grade-card__img {
  display: inline-block;
}
.mark-grade-card__name {
  color: #4d4f5c;
  text-align: left;
  letter-spacing: 0px;
  color: #4d4f5c;
}
.mark-grade-card__mark {
  background: rgba(188, 108, 66, 0.1);
  height: 60px;
  text-align: center;
  width: 114px;
  border-radius: 5px;
  vertical-align: bottom;
}
.mark-grade-card__mark_text {
  line-height: 4;
  height: 100%;
  color: #bc6c42 !important;
  opacity: 1;
  font-weight: bold;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #bc6c42;
  color: #fff;
}
</style>