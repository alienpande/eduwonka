<template>
  <el-row>
    <el-col v-if="!hideLeftNav" :xs="s ? 6 : 2" :sm="s ? 6 : 2" :md="s ? 6 : 2">
      <left-mobile-drawer v-if="s" />
      <left-nav v-else />
    </el-col>
    <el-col
      :xs="s ? 10 : 4"
      :sm="s ? 10 : 4"
      :md="s ? 10 : hideLeftNav ? 6 : 4"
    >
      <logo />
    </el-col>
    <el-col
      :xs="s ? 8 : 12"
      :sm="s ? 8 : 12"
      :md="s ? 8 : 6"
      :offset="!s ? 12 : 0"
    >
      <top-right-mobile-nav v-if="s" />
      <top-right-nav v-else />
    </el-col>
  </el-row>
</template>
<script>
import LeftNav from "./LeftMainDrawer.vue";
import LeftMobileDrawer from "./LeftMobileDrawer.vue";
import Logo from "./Logo.vue";
import TopRightNav from "./TopRightNav.vue";
import TopRightMobileNav from "./TopRightMobileNav";
import { mapGetters } from "vuex";
export default {
  components: {
    Logo,
    TopRightNav,
    LeftNav,
    LeftMobileDrawer,
    TopRightMobileNav,
  },
  props: {
    hideLeftNav: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    s() {
      return this.view() === "s";
    },
  },
  methods: {
    ...mapGetters("Common", ["view", "bgColor"]),
  },
};
</script>
