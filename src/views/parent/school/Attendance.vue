<template>
  <e-container
    pageTitle="Attendance "
    btnIcon="el-icon-plus"
    btnText="Holiday Marking"
  >
    <table width="60%" cellspacing="0px">
      <thead>
        <tr>
          <td
            style="
              padding: 20px;
              background: #fff;
              border-top-left-radius: 10px;
              border-bottom: 1px solid #ececec;
              border-right: 1px solid #ececec;
            "
          >
            Students
          </td>
          <td
            style="
              text-align: center;
              background: #fff;
              padding: 20px;
              border-bottom: 1px solid #ececec;
              border-right: 1px solid #ececec;
            "
          >
            Morning
          </td>
          <td
            style="
              text-align: center;
              background: #fff;
              padding: 20px;
              border-bottom: 1px solid #ececec;
              border-top-right-radius: 10px;
            "
          >
            Evening
          </td>
        </tr>
      </thead>
      <tr v-for="(s, j) in students" :key="j">
        <td width="40%" style="padding: 15px 20px 10px 20px; background: #fff">
          <e-img-name
            :src="require('@/assets/images/profile.jpg')"
            :name="s.name"
          />
        </td>
        <td
          width="30%"
          style="
            padding: 15px 20px 10px 20px;
            background: #fff;
            text-align: center;
            border-left: 1px solid #ececec;
          "
        >
          <div class="attendance present">P</div>
        </td>
        <td
          width="30%"
          style="
            padding: 15px 20px 10px 20px;
            background: #fff;
            text-align: center;
            border-left: 1px solid #ececec;
          "
        >
          <div class="attendance absent">A</div>
        </td>
      </tr>
    </table>
  </e-container>
</template>
<script>
export default {
  components: {},
  created() {
    this.students = require("@/api/students.json");
  },
};
</script>
