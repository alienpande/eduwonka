<template>
  <!-- container with custom header -->
  <section :class="asideMenuCollapse() ? 'econtainer-collapsed' : 'econtainer'">
    <el-row class="header">
      <slot name="header" />
    </el-row>
    <el-main class="body" >
      <slot name="content" />
    </el-main>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "eContainerCh",
  props: {
    hideHeader: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    ...mapGetters("Common", ["asideMenuCollapse"]),
  },
};
</script>
