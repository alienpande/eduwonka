<template>
  
  <e-module-container :menu="menu" transition="fade-in-left" />

</template>
<script>
import { mapMutations, mapState } from "vuex";
import { Connect } from "@/util/menus/connect.menus";
import { MenuTitle } from "@/util/menus/main.menus";
export default {
  data() {
    return {
      menu: [],
    };
  },
  created() {
    let subRoutes = this.routes[MenuTitle.Connect.title];
    let finalMenu = [];
    subRoutes.forEach((el) => {
      if (typeof el == "object") {
        let found = Connect.find((f) => f.title == Object.keys(el)[0]);
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
        finalMenu.push(Connect.find((f) => f.title == el));
      }
    });
    this.menu = finalMenu;
    this.setMenu({
      ...MenuTitle.Connect,
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
