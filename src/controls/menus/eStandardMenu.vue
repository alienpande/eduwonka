<template>
  <el-row>
    <el-col :span="24">
      <el-menu class="exam-subject-title">
        <el-menu-item class="sub-menu-title">
          <span slot="title"> {{ standard.title }}</span>
        </el-menu-item>
      </el-menu>
      <el-menu :class="standardClass">
        <e-menu-item
          v-for="(item, index) in standardMenu().routes"
          v-bind:item="item"
          v-bind:key="index"
          @click="standardMenuClick(item)"
          :class="
            activeStandard === item.title ? 'active-menu' : 'noactive-menu'
          "
        >
        </e-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapGetters("Common", ["view", "standardMenu"]),
    ...mapMutations("Common", ["setExamMenu"]),
    standardMenuClick(i) {
      console.log(i);
    },
  },
  computed: {},
  created() {},
};
</script>

<style></style>
