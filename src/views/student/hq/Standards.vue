<template>
  <e-container
    pageTitle="Standards"
    btnIcon="el-icon-plus"
    btnText="Add New Standard"
    @btnClick="addNewStandard"
  >
    <div>
      Below is the list of Inactive student for this academic year
      <el-row
        :gutter="20"
        style="height: 80px; padding: 30px 15px 30px 15px; cursor: pointer"
      >
        <el-col
          :span="24"
          v-for="(item, index) in classes"
          v-bind:item="item"
          v-bind:key="index"
        >
          <div
            style="
              height: 150px;
              box-shadow: 0px 13px 21px #0000000d;
              background: #fff;
              border-radius: 10px;
              margin-bottom: 20px;
              width: 100%;
            "
            @click="showStandardMenu(item)"
          >
            <el-row style="height: 150px">
              <el-col
                :span="4"
                style="
                  background: #fcdfbd66;
                  height: 150px;
                  text-align: center;
                  padding: 60px;
                  border-radius: 10px 0px 0px 10px;
                "
              >
                {{ item.standard }}
              </el-col>
              <el-col :span="16">
                <table style="width: 50%; padding: 15px 25px">
                  <tr>
                    <td>Section</td>
                    <td>Students</td>
                    <td>Teachers</td>
                  </tr>
                  <tr
                    v-for="(i, index) in item.sections"
                    v-bind:item="i"
                    v-bind:key="index"
                  >
                    <td>{{ i.name }}</td>
                    <td>{{ i.students }}</td>
                    <td>{{ i.teachers }}</td>
                  </tr>
                </table>
              </el-col>
              <el-col :span="4" style="text-align: right">
                <div style="padding: 90px 20px" class="primary-text">
                  Add Section
                </div>
              </el-col>
            </el-row>
            <div style="width: 130px"></div>
          </div>
        </el-col>
      </el-row>
    </div>
  </e-container>
</template>
<script>
import { mapMutations } from "vuex";
import { Routes } from "@/util/menus/hq.menus";
export default {
  data() {
    return {
      classes: [],
    };
  },
  created() {
    this.classes = require("@/api/classes.json");
  },
  methods: {
    ...mapMutations("Common", ["setStandardMenu"]),
    addNewStandard() {
      this.$router.push(this.$url.HQ_STANDARD_FORM);
    },
    showStandardMenu(i) {

      const defaultRoutes = [
        {
          id: 22,
          title: "Students",
          to: `${Routes.HQ_STANDARD_STUDENTS}/${i.id}`,
        },
        {
          id: 23,
          title: "Teachers",
          to: `${Routes.HQ_STANDARD_TEACHERS}/${i.id}`,
        },
        {
          id: 24,
          title: "Inactive Students",
          to: `${Routes.HQ_STANDARD_INACTIVE_STUDENTS}/${i.id}`,
        },
      ];

      this.setStandardMenu({
        title: `Standard ${i.standard}`,
        routes: defaultRoutes,
        standard: i.standard,
        sections: i.sections,
      });
      this.$router.push(`${Routes.HQ_STANDARD_STUDENTS}/${i.id}`);
    },
  },
  // destroyed() {
  //   this.setStandardMenu({ title: "", routes: [] });
  // },
};
</script>
