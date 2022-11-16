<template>
  <section class="left-menu-drawer">
    <el-row>
      <el-col :xs="12" :sm="12" :md="12">
        <e-svg
          icon="menu"
          css="top-menu-icon-svg-sm"
          @click="openInternalMenu"
          v-show="show"
        />
      </el-col>
      <el-col :xs="12" :sm="12" :md="12">
        <e-svg
          icon="grid"
          css="top-menu-icon-svg-sm"
          @click="mainMenuDrawer = !mainMenuDrawer"
        />
      </el-col>
    </el-row>
    <el-drawer
      title="Main Dashboard"
      :visible.sync="mainMenuDrawer"
      direction="ltr"
      :with-header="true"
      :size="view() !== 's' ? '290px' : '100%'"
      :class="view()"
    >
      <e-aside-menu :menus="mainMenu" @menu-clicked="openSubmenu()" />
    </el-drawer>
    <el-drawer
      :title="internalMenuTitle"
      :visible.sync="internalMenuDrawer"
      direction="ltr"
      :with-header="true"
      :size="view() !== 's' ? '290px' : '100%'"
      :class="view() + ' mobile'"
    >
      <el-menu
        v-show="!hasSubmenu"
        :class="view() + (internalMenu.length > 10 ? ' mb-150' : '')"
      >
        <e-menu-item
          :to="item.to"
          v-for="(item, index) in menu().menu"
          v-bind:item="item"
          v-bind:key="index"
          :class="item.css + ' ' + view()"
          @click="imClicked"
        />
      </el-menu>
      <el-menu
        v-show="hasSubmenu"
        :class="view() + (subMenu.length > 10 ? ' mb-150' : '')"
      >
        <el-menu-item
          class="sub-menu-title"
          style="margin-top: 10px; height: 65px"
          @click="hasSubmenu = false"
        >
          <e-svg f="chevron-left" css="h20" />
          <span slot="title"> {{ subMenuTitle }}</span>
        </el-menu-item>
        <e-menu-item
          :to="s.to"
          v-for="(s, index) in subMenu"
          v-bind:item="s"
          v-bind:key="index"
          :class="s.css + ' ' + view()"
          @click="imClicked"
        />
      </el-menu>
    </el-drawer>
    <!--Exam Menu Starts-->
    <el-col :span="isExamMenu ? 17 : 0">
      <e-exam-menu
        :golink="examMenuLink"
        v-if="isExamMenu && openMsg==false"
        class="border-left"
      />
      <e-msg
        :golink="examMenuLink"
        v-if="isExamMenu && openMsg"
        :name="examMenuLink"
        class="border-left"
      />
    </el-col>
    <el-drawer
      title=""
      :visible.sync="examMenuDrawer"
      direction="ltr"
      :with-header="false"
      :size="view() !== 's' ? '290px' : '100%'"
      :class="view() + ' mobile'"
    >
      <e-exam-menu
        :golink="examMenuLink"
        v-show="examMenuDrawer && !msg"
        @collapse="onExamMenuClickToCollapse"
      />
      <e-msg
        :golink="examMenuLink"
        @collapse="onExamMenuClickToCollapse"
        v-show="examMenuDrawer && msg"
        :name="examMenuLink"
      ></e-msg>
    </el-drawer>
    <!--Exam Menu Ends-->
  </section>
</template>
<script>
import eAsideMenu from "@/controls/eAsideMenu.vue";
import { MENUS } from "@/util/menus/main.menus";
import { mapGetters, mapMutations } from "vuex";
import EMenuItem from "@/controls/eMenuItem.vue";
import ESvg from "@/controls/eSvg.vue";
export default {
  components: { eAsideMenu, EMenuItem, ESvg },
  data() {
    return {
      mainMenuDrawer: false,
      internalMenuDrawer: false,
      mainMenu: MENUS,
      internalMenu: [],
      internalMenuTitle: "",
      hasSubmenu: false,
      subMenu: [],
      subMenuTitle: "",
      show: false,
      menuLoading: false,
      isCollapse: false,
      isExamMenu: false,
      examMenuDrawer: false,
      examMenuLink: "",
      isMsg: false,
      msg: false,
      openMsg: false,
    };
  },
  methods: {
    ...mapGetters("Common", ["menu", "view"]),
    ...mapMutations("Common", ["setAsideWidth", "setView", "setAsideMenuCollapse"]),
    init() {
      this.internalMenu = this.menu().menu;
      this.internalMenuTitle = this.menu().title;
      console.log('Menu Title', this.internalMenuTitle)
      console.log('Menus', this.internalMenu)
    },
    openInternalMenu() {
      this.init();
      this.internalMenuDrawer = !this.internalMenuDrawer;
    },
    imClicked(i) {
      const v = this.$currentViewport ? this.$currentViewport.label : "s";
      this.setView(v);

      this.hasSubmenu = false;
      this.subMenu = [];
      
      this.isCollapse = false;
      this.isExamMenu = false;
      this.examMenuDrawer = false;
      this.isMsg = false;
      this.msg = false;

      console.log('Clicked submenu', i)
      if (i.routes?.length > 0) {
        this.subMenuTitle = i.title;
        this.hasSubmenu = true;
        this.subMenu = i.routes;
        console.log("FIRSTT")
      } else if (i.action && i.link && i.action === "EXAM_MENU") {
        this.examMenuDrawer = true;
        this.subMenuTitle = i.title;
        this.hasSubmenu = true;
        console.log("SECONDD")
        this.examMenuLink = i.link;
        this.internalMenuDrawer = false;
      } else if (i.action && i.link && i.action === "MSG_MENU") {
        this.msg = true;
        this.isMsg = true;
        this.examMenuDrawer = true;
        this.examMenuLink = i.link;
        console.log("THIRDD")
      }else {
        console.log("FOURTHH")
        this.internalMenuDrawer = false;
        this.$router.push(i.to);
        if(v === 's'){
          this.setAsideWidth("0px");
        }else{
          this.setAsideWidth("290px")
        }
      }
    },
    onExamMenuClickToCollapse() {
      const v = this.$currentViewport ? this.$currentViewport.label : "s";
      this.setView(v);
      this.isExamMenu = false;
      this.examMenuDrawer = false;
      this.internalMenuDrawer = false;
      this.mainMenuDrawer = false;
      if (this.isMsg && this.isMsg === true) {
        this.openMsg = true;
      } else {
        this.openMsg = false;
      }
      if(v === 's'){
        this.setAsideWidth("0px");
      }else{
        this.setAsideWidth("290px")
      }
    },

    openSubmenu(){
      this.internalMenu = []
      this.mainMenuDrawer = false
      this.internalMenuDrawer = true
      this.internalMenu = this.menu().menu
      console.log("Open Sub Menu ", this.menu().menu)
    },
  },

  watch: {
    internalMenuDrawer(newVal) {
      if (newVal === false) {
        this.hasSubmenu = false;
        this.subMenu = [];
      }
    },
    $route(to, from) {
      if(to.path == '/'){
        this.show = false
        this.internalMenuDrawer = false
        this.examMenuDrawer = false;
      }else{
        this.show = true
      }
    }
  },
};
</script>
<style scoped>
  .left-menu-drawer >>> .el-drawer__header{
    z-index: 0 !important;
  }
</style>