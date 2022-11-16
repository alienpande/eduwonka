<template>
  <section>
    <e-svg
      :icon="drawer ? 'close' : 'main/menu'"
      v-if="bgColor() === 'white'"
      css="top-menu-icon-svg"
      @click="drawer = !drawer"
    />

    <e-svg
      v-if="bgColor() === 'black'"
      icon="student/Vector"
      css="top-menu-icon-svg"
      @click="drawer = !drawer"
    />

    <el-drawer
      title=""
      :visible.sync="drawer"
      direction="ltr"
      :with-header="false"
      size="290px"
      
    >
      <e-aside-menu
        v-if="menu.length"
        :menus="menu"
        @menu-clicked="mainMenuClicked()"
        :isCollapse="false"
        
      />
    </el-drawer>
  </section>
</template>
<script>
import eAsideMenu from "@/controls/eAsideMenu.vue";
import { messageService } from "@/service";
import { MENUS } from "@/util/menus/main.menus";
import eSvg from "@/controls/eSvg.vue";
import { mapState, mapGetters } from "vuex";

export default {
  components: { eAsideMenu, eSvg },
  data() {
    return {
      drawer: false,
      menu: [],
    };
  },
  beforeMount() {
    let x = [];
    for (const key in this.routes) {
      let filtered = MENUS.find((f) => f.title == key);
      if (filtered) x.push(filtered);
    }
    this.menu = x;
  },
  computed: {
    ...mapState("User", {
      roles: (state) => state.roles,
      routes: (state) => state.routes,
    }),
  },
  methods: {
    ...mapGetters("Common", ["bgColor"]),
    mainMenuClicked() {
      this.drawer = false;
      localStorage.setItem('mainClicked', 'mainClicked');
    }
  },
};
</script>
