<template>

  <el-container class="inner-container">
    <el-aside
      :class="{ 'bg-change': bgColor() === 'black' }"
      :width="asideWidth()"
    >
    <e-aside-menu :menus="menu" :isCollapse="isCollapse" 
      :thisWidth="thisWidth" />
    </el-aside>
    <vue-page-transition :name="transition" style="width: 100%">
      <router-view ref="childRef"></router-view>
    </vue-page-transition>
  </el-container>

</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "eModuleContainer",
  props: {
    menu: {
      type: Array,
    },
    transition: {
      type: String,
      default: "fade-in-right",
    },
  },
  data(){
    return {
      isCollapse: true,
      thisWidth:"0px",
      messages: [],
      message:'' 
      }
  },
  methods: {
    ...mapMutations("Common", ["setAsideMenuCollapse", "setView", "setAsideWidth"]),
    ...mapGetters("Common", ["asideWidth", "bgColor"]),
    hideSideMenu(){
      const v = this.$currentViewport ? this.$currentViewport.label : "s";
      this.setView(v);
      if(v === 's'){
        this.setAsideWidth("0px");
      }else{
        this.setAsideWidth("290px")
      }
    },
  },
  created() {
      try {
      if ( this.$router.history.current.path === '/' ) {
        try {
          if ( localStorage.getItem('noDelete') == 'true' ) {

          } else {
            if ( localStorage.getItem('mainClicked') ) {
              console.log("deleting....")
              localStorage.removeItem('mainClicked');
            }
          }
        } catch (e) {
          if ( localStorage.getItem('mainClicked') ) {
              localStorage.removeItem('mainClicked');
          }
          console.log(e);
        }
      }

      this.message = localStorage.getItem('mainClicked');
      if ( this.message ) {
        if (this.message === "mainClicked") {
          console.log("message text ", this.message);
          this.thisWidth = "290px";
          this.isCollapse = false;
          this.msgAya = true;
        }
      } else {
          console.log(" No message ");
      }
      } catch (ex) {
        console.log(ex);
      }
  },
  watch: {
    
    $route(to, from) {
      
      if(to.path == '/'){
        this.hideSideMenu()
      }
    }
  },
};
</script>