<template>
  <div>
    <div
      class="level-creation-standard-list"
      v-for="i in standards"
      :key="i.id"
    >
      <el-row>
        <el-col class="lbl-lite" :span="4"> Standard Name </el-col>
        <el-col class="lbl-lite" :span="3"> Section </el-col>
        <el-col :span="4">
          <e-more-menu
            @edit="editStandard(i)"
            @delete="deleteStandard(i)"
            class="more-options"
          >
          </e-more-menu>
        </el-col>
      </el-row>

      <el-row class="mt30">
        <el-col :span="4"> {{ i.standard }} </el-col>
        <el-col :span="3"> {{ getSections(i.sections) }} </el-col>
        <e-button
          class="float-right"
          :span="4"
          plain
          label="+ Add Sections"
          @click="addSections(i.sections)"
        />
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    getSections(s) {
      const sections = [];
      s.forEach((section) => {
        sections.push(section.name);
      });
      return sections.join(",");
    },
    editStandard(i) {
      console.log("Edit Standard - ", i);
    },
    deleteStandard(i) {
      console.log("Delete Standard - ", i);
    },
    addSections(i) {
      this.$emit("addSections", i);
    },
  },
  created() {
    this.standards = require("@/api/classes.json");
  },
};
</script>
