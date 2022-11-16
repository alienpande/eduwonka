<template>
  <el-row :class="examMenuDrawer ? ' z1' : ''">
    <el-col :span="parentSpan" v-if="showParentMenu">
      <transition name="">
        <el-menu
          :collapse="menuCollapse || doCollapse"
          :class="menu.length > 10 ? 'pb-120' : ''"
        >
          <e-menu-item
            v-for="(item, index) in menus"
            v-bind:item="item"
            v-bind:key="index"
            @click="toggle"
            :class="activeMenu === item.title ? 'active-menu' : 'noactive-menu'"
          />
          <storage-view width="50" v-if="menus[0].title === 'All Files'" />
        </el-menu>
      </transition>
    </el-col>
    <el-col :span="doCollapse ? 17 : 0" v-if="showSubMenu" :class="[showParentMenu ? 'exam-menu-border': '', showParentMenu ? 'position-absolute' : '']" :style="{'width':showParentMenu ? '':'100%'}">
      <transition name="">
        <el-menu class="border-left">
          <el-menu-item class="sub-menu-title">
            <span slot="title"> {{ subMenuTitle }}</span>
          </el-menu-item>
          <e-menu-item
            v-for="item in submenu"
            v-bind:item="item"
            v-bind:key="item.id"
            @click="hideSubMenuMobile"
          />
        </el-menu>
      </transition>
    </el-col>
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
        class="border-left"
      />
    </el-col>
    <el-drawer
      title=""
      :visible.sync="examMenuDrawer"
      direction="ltr"
      :with-header="false"
      size="290px"
      class="exam-menu-border"
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
      ></e-msg>
    </el-drawer>
    <!--Exam Menu Ends-->
  </el-row>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import EExamMenu from "./menus/eExamMenu.vue";
import eMsg from "./menus/eMessengerMenu.vue";
import eMenuItem from "./eMenuItem.vue";
export default {
  components: { eMenuItem, EExamMenu, eMsg },
  props: {
    menus: {
      type: Array,
      default() {
        return [];
      },
    },
    isCollapse: {
      type: Boolean,
      default: false,
    },
    thisWidth: {
      type: String,
      default: "100px"
    }
  },
  data() {
    return {
      activeMenu: "",
      doCollapse: false,
      isExamMenu: false,
      examMenuDrawer: false,
      submenu: [],
      subMenuTitle: "",
      examMenuLink: "",
      isMsg: false,
      msg: false,
      openMsg: false,
      showParentMenu: true,
      showSubMenu: false
    };
  },
  methods: {
    ...mapMutations("Common", ["setAsideWidth", "setView", "setAsideMenuCollapse"]),
    ...mapGetters("Common", [
      "menu",
      "view",
      "standardMenu",
      "asideMenuCollapse",
    ]),
    hideSubMenuMobile(){
      
      const v = this.$currentViewport ? this.$currentViewport.label : "s";
      this.setView(v);  
      if(v === 's') {
        this.doCollapse = false;
        this.setAsideWidth("0");
        this.showParentMenu = false;
        this.showSubMenu = false;
      }
  
    },
    toggle(i) {
      const v = this.$currentViewport ? this.$currentViewport.label : "s";
      this.setView(v);
      this.activeMenu = i.title;
      this.doCollapse = false;
      this.setAsideWidth("290px");
      this.isExamMenu = false;
      this.examMenuDrawer = false;
      this.isMsg = false;
      this.msg = false;
      this.showParentMenu = true;
      this.showSubMenu = false;

      try {
          if ( localStorage.getItem('noDelete') ) {
            localStorage.removeItem('noDelete');
          }
      } catch (e) {
        console.log(e);
      }
      if (i.routes?.length > 0) {
        console.log("FIRST");
        this.doCollapse = true;
        this.subMenuTitle = i.title;
        this.submenu = i.routes;
        this.showSubMenu = true;
        if(v === 's'){
          this.showParentMenu = false;
          this.setAsideWidth("100%");
        }
      } else if (i.action && i.link && i.action === "EXAM_MENU") {
        console.log("SECOND");
        this.doCollapse = true;
        this.setAsideWidth("100px");
        setTimeout(() => {
          this.examMenuDrawer = true;
          this.examMenuLink = i.link;
          this.isMsg = false; 
        }, 20);
        
      } else if (i.action && i.link && i.action === "MSG_MENU") {
        console.log("THIRD");
        this.msg = true;
        this.isMsg = true;
        this.examMenuDrawer = true;
        this.examMenuLink = i.link;
        localStorage.setItem('noDelete', true);
      } else {
        if ( this.$router.history.current.path === '/' ) {
          localStorage.setItem('noDelete', true);
        }
        console.log("FORTH");
        this.$emit("menu-clicked");
      }
    },
    onExamMenuClickToCollapse() {
      this.isExamMenu = true;
      this.examMenuDrawer = false;
      if (this.isMsg && this.isMsg === true) {
        this.openMsg = true;
      } else {
        this.openMsg = false;
      }
      this.setAsideWidth("350px");
    },
  },
  created() {

    if (this.menu().menu) {
      this.activeMenu = this.menu().menu.filter(
        (x) => x.to === location.pathname
      )[0]?.title;
    }

    const v = this.$currentViewport ? this.$currentViewport.label : "s";
    this.setView(v);
    
    if(v === 's'){
      this.setAsideWidth("0px");
    }else{
      this.setAsideWidth(this.thisWidth);
    }
  },

  computed: {
    parentSpan() {
      if (!this.noCollapse) {
        return this.isCollapse || this.isExamMenu
          ? this.isExamMenu
            ? 7
            : 8
          : 24;
      } else {
        return 24;
      }
    },
    subMenuSpan() {
      if (!this.noCollapse) {
        return this.isCollapse ? 24 : 0;
      } else {
        return 0;
      }
    },
    menuCollapse() {
        return this.isCollapse || this.isExamMenu; 
    },

    checkStandardMenu() {
      return this.standardMenu();
    },
  },
  watch: {
    checkStandardMenu(newVal) {
      if (newVal.title != "" && newVal.routes.length > 0) {
        this.toggle(newVal);
        this.activeMenu = "Standards";
      } else {
        this.setStandardMenu({ title: "", routes: [] });
      }
    },
    thisWidth(newVal) {
      this.setAsideWidth(newVal);
    },
  },
};
</script>