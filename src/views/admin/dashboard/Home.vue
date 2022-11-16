<template>
<!-- <div>
    adl
</div> -->
  <e-module-container :menu="menu" transition="fade-in-left" />
</template>
<script>
import { mapMutations } from "vuex";
import { MainHeadQuater } from "./../../../util/menus/dash.menus";
import { MenuTitle } from "./../../../util/menus/main.menus";
export default {
  data() {
    return {
      menu: MainHeadQuater,
    };
  },
  created() {
    this.setMenu({
      ...MenuTitle.HQ,
      menu: this.menu,
    });
  },
  methods: {
    ...mapMutations("Common", ["setMenu"]),
  },
};
</script>
