<template>

  
  <e-module-container :menu="menu" transition="fade-in-left" />


</template>
<script>
import { mapMutations } from "vuex";
import { Learn } from "@/util/menus/learn.menus";
import { MenuTitle } from "@/util/menus/main.menus";
export default {
  data() {
    return {
      menu: Learn,
    };
  },
  created() {
    this.setMenu({
      ...MenuTitle.Learn,
      menu: this.menu,
    });
  },
  methods: {
    ...mapMutations("Common", ["setMenu"]),
  },
};
</script>
