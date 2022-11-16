<template>
  <e-module-container :class="{'body-background-change' : bgColor()==='black'}" :menu="menu" transition="fade-in-left" />
</template>
<script>
import { mapMutations ,mapGetters} from "vuex";
import { LearnStudent } from "@/util/menus/learn.menus";
import { MenuTitle } from "@/util/menus/main.menus";
export default {
  data() {
    return {
      menu: LearnStudent,
    };
  },
  created() {
    this.setMenu({
      ...MenuTitle.LearnStudent,
      menu: this.menu,
    });
  },
  methods: {
    ...mapGetters("Common", ["bgColor"]),
    ...mapMutations("Common", ["setMenu"]),
  },
};
</script>
<style >
.body-background-change  {
  background: black !important;
}
</style>