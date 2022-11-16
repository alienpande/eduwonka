<template>
  <section :class="asideMenuCollapse() ? 'econtainer-collapsed' : 'econtainer'" >
    <el-row class="header" style="z-index: auto;" v-if="!hideHeader">
      <el-col class="title">
        {{ pageTitle }} <span v-if="subTitle">{{ subTitle }}</span>
      </el-col>
      <e-button
        class="btn"
        :span="4"
        v-show="btnText"
        :icon="btnIcon"
        :label="btnText"
        @click="$emit('btnClick', $event)"
      />
    </el-row>
    <page-nav-bar
      style="padding: 20px 45px 0px"
      v-if="hideHeader"
      :heading="pageTitle"
      :hideBack="back != ''"
      @backClick="$router.push(back)"
      :btnText="btnText"
      @btnClick="$emit('btnClick', $event)"
    ></page-nav-bar>
    <el-main class="body" ref="mainBody" :class="!hideHeader ? '' : 'noHeader'">
      <slot />
    </el-main>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import pageNavBar from "../components/pageNavBar.vue";
export default {
  components: { pageNavBar },
  name: "eContainer",
  props: {
    hideHeader: {
      type: Boolean,
      default: false,
    },
    pageTitle: {
      type: String,
      default: "",
    },
    subTitle: {
      type: String,
      default: "",
    },
    btnIcon: {
      type: String,
      default: "",
    },
    btnText: {
      type: String,
      default: "",
    },
    back: {
      type: String,
      default: "",
    },
  },
  mounted(){
    // if(document.querySelector(".el-main.body > .e-steps-container")){ document.querySelector(".el-main.body").style.marginTop="30%";}
  },
  methods: {
    ...mapGetters("Common", ["asideMenuCollapse"]),
  },
};
</script>
<style scoped>

.header::before,.header::after{
  display:none;
}

.header{
  display:flex;
  justify-content:space-between;
  align-items: center;
}
.header > div{
  width:auto !important;
}

@media only screen and (max-width:767px){
  .header{
    flex-direction:column;
    align-items: flex-start;
  }
}


</style>