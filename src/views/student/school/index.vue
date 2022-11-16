<template>
  
  <e-module-container :menu="menu" transition="fade-in-left" />

</template>
<script>
import { School } from "@/util/menus/school.menus";
import { MenuTitle } from "@/util/menus/main.menus";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      menu: [],
    };
  },
  created() {
    let subRoutes = this.routes[MenuTitle.School.title];
    let finalMenu = [];
    subRoutes.forEach((el) => {
      if (typeof el == "object") {
        let found = School.find((f) => f.title == Object.keys(el)[0]);
        if (found) {
          let thridLevelRoutes = Object.values(el)[0];
          let thridLevelRoutesFinal = [];
          thridLevelRoutes.forEach((val) => {
            let find = found.routes.find((f) => f.title == val);
            if (find) thridLevelRoutesFinal.push(find);
          });
          found.routes = [...thridLevelRoutesFinal];
          finalMenu.push(found);
        }
      } else {
        let found = School.find((f) => f.title == el);
        if (found) {
          delete found.routes;
          // delete found.aciton;
          // delete found.link;
          finalMenu.push(found);
        }
      }
    });

    this.menu = finalMenu;
    this.setMenu({
      ...MenuTitle.Library,
      menu: finalMenu,
    });
  },
  computed: {
    ...mapState("User", {
      routes: (state) => state.routes,
    }),
  },
  methods: {
    ...mapMutations("Common", ["setMenu"]),
  },
};
</script>
<style scoped>
</style>