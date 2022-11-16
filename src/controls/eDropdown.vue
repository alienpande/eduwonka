<template>
  <el-dropdown trigger="click" @command="handleCommand">
    <span
      class="el-dropdown-link"
      :class="primary ? 'el-dropdown-link-primary' : ''"
    >
      {{ selectedMenu.text }}<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="(item, index) in list"
        v-bind:item="item"
        v-bind:key="index"
        :disabled="item.disabled"
        :divided="item.divided"
        :command="item"
      >
        {{ item.text }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    noDefault: {
      type: Boolean,
      default: false,
    },
    primary: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedMenu: {
        text: "--Select--",
      },
    };
  },
  created() {
    const defaultMenu = this.list.filter((x) => x.default === true)[0];
    if (!defaultMenu) {
      this.selectedMenu = this.list[0];
    } else {
      this.selectedMenu = defaultMenu;
    }
  },
  methods: {
    handleCommand(i) {
      // if (!this.noDefault) {
      //   this.selectedMenu = i;
      // }
      // if (i.to) {
      //   this.$router.push(i.to);
      // }
      if (i.to) {
        this.$router.push(i.to);
      }
      else {
        this.selectedMenu = i;
      }
      this.emitInput();
    },
    emitInput() {
      this.$emit("input", this.selectedMenu);
    },
  },
};
</script>
