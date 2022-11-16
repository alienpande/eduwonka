<template>
  <el-dropdown trigger="click" class="block" @command="handleCommand">
    <span class="el-dropdown-link">
      <e-svg :f="icon" css="card-veritical-svg" />
    </span>
    <el-dropdown-menu slot="dropdown" style="width: 130px">
      <el-dropdown-item command="edit" v-if="!hideDefaultMenu && !hideEdit">
        <e-svg css="h16" f="edit" />
        <div
          class="inline-block absolute"
          style="padding-left: 10px; margin-top: -3px"
        >
          Edit
        </div>
      </el-dropdown-item>
      <el-dropdown-item command="delete" v-if="!hideDefaultMenu && !hideDelete">
        <e-svg css="h16" f="trash-2" />
        <div
          class="inline-block absolute"
          style="padding-left: 10px; margin-top: -3px"
        >
          Delete
        </div>
      </el-dropdown-item>
      <el-dropdown-item command="default" v-if="true">
        <e-svg css="h16" f="trash-2" />
        <div
          class="inline-block absolute"
          style="padding-left: 10px; margin-top: -3px"
        >
          Set Default
        </div>
      </el-dropdown-item>
      <slot />
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
    icon: {
      type: String,
      default: "more-vertical",
    },
    hideDefaultMenu: {
      type: Boolean,
      default: false,
    },
    hideEdit: {
      type: Boolean,
      default: false,
    },
    hideDelete: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },

  methods: {
    handleCommand(i) {
      console.log('%%%%%%%%%%%%%%%%%%%5', i)
      this.$emit(i);
    },
    emitInput() {
      this.$emit("input", this.selectedMenu);
    },
  },
};
</script>
