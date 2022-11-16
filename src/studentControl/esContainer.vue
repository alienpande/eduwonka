<template>
  <section :class="asideMenuCollapse() ? 'econtainer-collapsed' : 'econtainer'">
    <el-row
      class="student-header"
      :class="{ emptyTitile: !pageTitle }"
      style="z-index: auto"
      v-if="!hideHeader"
    >
      <el-col :span="20" class="student-header-title">
        {{ pageTitle }} <br /><span class="tx-16 tx-normal" style="opacity: 70%" v-if="subTitle">{{ subTitle }}</span>
      </el-col>

      <el-col :span="3" v-if="switchText1 && switchText2">
        <div @click="$emit('switchChange')">
          <es-switch
            :text1="switchText1"
            :text2="switchText2"
            v-model="switchValue"
          ></es-switch>
        </div>
      </el-col>
      <es-button
      style="float: right"
        class="btn"
        v-show="btnText2"
        :icon="btnIcon2"
        :text="btnText2"
        :plain="btnPlain2"
        @click="$emit('btnClick', $event)"
      />
      <es-button
      style="float: right"
        class="btn"
        v-show="btnText"
        :icon="btnIcon"
        :text="btnText"
        @click="$emit('btnClick', $event)"
      />
    </el-row>
    <page-nav-student
      style="padding: 20px 50px 25px 30px; background: #1e1e1e"
      v-if="hideHeader"
      :heading="pageTitle"
      :hideBack="back != ''"
      @backClick="$router.push(back)"
      :btnText="btnText"
      @btnClick="$emit('btnClick', $event)"
    ></page-nav-student>
    <el-main class="body" :class="!hideHeader ? '' : 'noHeader'">
      <slot />
    </el-main>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
// import pageNavBar from "../../components/pageNavBar.vue";
export default {
  components: {},
  name: "esContainer",
  data: () => ({
    switchValue: true,
  }),
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
    btnIcon2: {
      type: String,
      default: "",
    },
    btnText2: {
      type: String,
      default: "",
    },
    btnPlain2: {
      type: Boolean,
      default: false
    },
    back: {
      type: String,
      default: "",
    },

    switchText1: {
      type: String,
    },
    switchText2: {
      type: String,
    },
  },
  methods: {
    ...mapGetters("Common", ["asideMenuCollapse"]),
  },
};
</script>
<style>
.emptyTitile {
  padding-top: 62px !important;
}
</style>
