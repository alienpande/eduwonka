<template>
  <div>
    <div
      style="padding: 20px; padding-right: 50px; overflow: auto; height: 80vh"
    >
      <el-row style="display: flex; padding: 15px">
        <el-col :span="16" style="display: flex">
          <e-svg
            @click="$router.push($url.FI_PAYSLIP_EMPLOYEE_DETAILS)"
            icon="back"
          ></e-svg>
          <div
            style="
              color: #11141a;
              font-weight: 500;
              font-size: 24px;
              opacity: 0.8;
              margin-top: 7px;
              margin-left: 20px;
            "
          >
            Create group Payslips
          </div>
        </el-col>
        <el-col :span="4" :offset="4">
          <br />
          <div style="color: #00000066" class="fs-16 f-500">
            Created on 21/09/2020
          </div>
        </el-col>
      </el-row>

      <div
        @click="(lorem.isSelect = !lorem.isSelect), loremSelected()"
        :class="{ isSelected: lorem.isSelect }"
        class="lorem-box"
        style="cursor: pointer"
        v-for="(lorem, i) in loremData"
        :key="i"
      >
        <div>{{ lorem.text }}</div>
        <img v-if="!lorem.isSelect" src="@/assets/images/loremClose.png" />
        <img v-else src="@/assets/images/loremColorClose.png" />
      </div>
      <br /><br />
      <div class="sec-title">Employee Details</div>
      <br />
      <el-row style="background: white; padding: 30px 0">
        <el-col :span="3" :offset="1">
          <el-avatar
            :size="133"
            :src="require('@/assets/images/profile.jpg')"
          />
        </el-col>
        <el-col :span="18">
          <el-row
            style="
              background: #fcdfbd33;
              height: 140px;
              display: flex;
              flex-wrap: wrap;
              padding: 10px 20px;
            "
          >
            <div
              style="width: 205px; margin-bottom: 22px"
              v-for="(employee, i) in employeDetails"
              :key="i"
            >
              <div style="color: #000000cc" class="f-500">
                {{ employee.title }}
              </div>
              <div style="color: #00000099">{{ employee.text }}</div>
            </div>
          </el-row>
        </el-col>
      </el-row>
      <br />
      <div class="sec-title">Payslip Details</div>
      <br />
      <payslip-details :allSelect='allSelect' />
    </div>
  </div>
</template>
<script>
import payslipDetails from "@/components/finance/payslipDetails.vue";
import { mapMutations } from "vuex";
export default {
  components: { payslipDetails },
  data: () => ({
    allSelect:false,
    loremData: [
      {
        text: "lorem",
        isSelect: true,
      },
      {
        text: "lorem",
        isSelect: false,
      },
      {
        text: "lorem",
        isSelect: false,
      },
      {
        text: "lorem",
        isSelect: false,
      },
      {
        text: "lorem",
        isSelect: false,
      },
    ],
    employeDetails: [
      {
        title: "Employees Name",
        text: "Akanksha jain",
      },
      {
        title: "Joining Month/Year",
        text: "April 2015",
      },
      {
        title: "Attendance this month",
        text: "28",
      },
      {
        title: "Department",
        text: "28",
      },
      {
        title: "UAN Number",
        text: "6523523",
      },
      {
        title: "Gender",
        text: "Female",
      },
      {
        title: "Employees code",
        text: "63652476",
      },
      {
        title: "PF Account Number",
        text: "AS28347824",
      },
      {
        title: "Designation",
        text: "AS28347824",
      },
    ],
  }),
  methods: {
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth"]),
    activeTabChange(e) {
      this.activeTab = e;
    },
    scrollTop() {
      this.$nextTick(() => {
        this.$refs.tab2.scrollTop = 0;
      });
    },
    loremSelected() {
     if (this.loremData.findIndex(e=>e.isSelect==false)===-1) {
       this.allSelect=true
     }
    },
  },
   mounted() {
    /* this.setAsideMenuCollapse(true);
    setTimeout(() => {
      this.setAsideWidth("100px");
    }, 100); */
  },
  created() {
   // this.setAsideMenuCollapse(true);
   // this.setAsideWidth("280px");
  },
  destroyed() {
    this.setAsideMenuCollapse(false);
  },
};
</script>
<style>
.lorem-box .close-icon {
}
.isSelected {
  background: #bc6c42 0% 0% no-repeat padding-box !important;
  box-shadow: 0px 1px 3px #11111112;
  border-radius: 4px;
  color: white !important;
}
</style>
