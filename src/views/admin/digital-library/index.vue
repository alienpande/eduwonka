<template>
  
  <e-module-container :menu="menu" transition="fade-in-left" />

</template>
<script>
import { mapMutations, mapState } from "vuex";
import { DigitalLibrary } from "@/util/menus/digital-library.menus";
import { MenuTitle } from "@/util/menus/main.menus";
export default {
  data() {
    return {
      menu: [],
    };
  },
  created() {
    let subRoutes = this.routes[MenuTitle.DigitalLibrary.title];
    let finalMenu = [];
    subRoutes.forEach((el) => {
      if (typeof el == "object") {
        let found = DigitalLibrary.find((f) => f.title == Object.keys(el)[0]);
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
        finalMenu.push(DigitalLibrary.find((f) => f.title == el));
      }
    });
    this.menu = finalMenu;
    this.setMenu({
      ...MenuTitle.DigitalLibrary,
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
