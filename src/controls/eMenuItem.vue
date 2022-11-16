<template>
  <router-link v-if="item.to && item.to !== ''" :to="item.to">
    <el-menu-item :index="index" @click="onMenuClick(item)">
      <e-svg
        :icon="item.icon ? item.icon : ''"
        :f="item.ficon"
        css="menu-svg-icon"
        class="el-icon-"
        :class="item.icon ? item.icon.replace('/', ' ') : '' + ' ' + item.ficon"
        v-if="!noIcon"
      />
      <span slot="title">{{ item.title }}</span>
    </el-menu-item>
  </router-link>
  
  <div @click="onMenuClick(item)" :class="item.css" v-else>
    <el-menu-item :index="index">
      <e-svg
        :icon="item.icon ? item.icon : ''"
        :f="item.ficon"
        css="menu-svg-icon"
        class="el-icon-"
        :class="item.icon ? item.icon.replace('/', ' ') : '' + ' ' + item.ficon"
        v-if="!noIcon"
      />
      <span slot="title">{{ item.title }}</span>
    </el-menu-item>
    
  </div>
</template>

<script>
export default {
  name: "eMenuItem",
  props: {
    item: {
      type: Object,
      default() {
        return {
          to: "",
        };
      },
    },
    index: {
      type: [Number, String],
    },
    noIcon: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onMenuClick(i) {
      this.$emit("click", i);
    },
  },
};
</script>
