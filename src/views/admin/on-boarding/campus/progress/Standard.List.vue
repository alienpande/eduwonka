<template>
  <div>
    <div
      class="level-creation-standard-list"
      v-for="i in standardData"
      :key="i.id"
    >
      <el-row>
        <el-col class="lbl-lite" :span="window.width > 767 ? 4 : 5"> Standard Name </el-col>
        <el-col class="lbl-lite" :span="window.width > 767 ? 3 : 6"> Section </el-col>
        <el-col :span="4">
          <e-more-menu
            @edit="editStandard(i)"
            @delete="deleteStandard(i)"
            class="more-options"
          >
          </e-more-menu>
        </el-col>
      </el-row>
      <el-row class="mt25">
        <el-col :span="window.width > 767 ? 4 : 5"> {{ i.name }} </el-col>
        <el-col :span="window.width > 767 ? 3 : 6"> {{ getSections(i) }} </el-col>
        <e-button
          class="float-right"
          :span="window.width > 767 ? 4 : 11"
          plain
          label="+ Add Sections"
          @click="addSections(i.sections)"
        />
      </el-row>
    </div>
  </div>
</template>
<script>
import screenSize from '@/mixins/screenSize'
export default {
  props: {
    standardData: {
      type: Array
    }
  },
  mixins: [screenSize],
  data() {
    return {};
  },

  methods: {
    getSections(s) {
      const sections = [];
      s.standard_sections.forEach((s) => {
        sections.push(s.name);
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
    //console.log('props data', this.standardData)
    // this.standards = require("@/api/classes.json");
        // this.standards = require("@/views/admin/on-boarding/campus/progress/Standard.List.vue");  wrong

  },
};
</script>
