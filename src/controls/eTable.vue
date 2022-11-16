<template>
  <section class="etable-container">
    <el-row
      v-if="filter.length > 0"
      :gutter="20"
      style="
        background: rgb(255, 255, 255);
        height: 80px;
        padding: 30px 15px 30px 15px;
        margin: 30px 0px 30px 0px;
      "
    >
      <el-col :span="6">
        <e-dropdown :list="filter" primary />
      </el-col>
      <el-col :span="6" class="primary-text">Clear filter</el-col>
      <el-col :span="2" :offset="10">
        <e-button icon="el-icon-search" :plain="true" type="primary"></e-button>
      </el-col>
    </el-row>
    <div class="etable">
      <el-table
        :data="table"
        :height="table.length > 10 ? 400 : table.length * 75"
        style=""
        :class="shadow ? 'table-shadow' : ''"
        :fit="true"
      >
      {{table}}
        <slot /> 
      </el-table>
      <!-- <el-pagination
        v-if="!hidePagination"
        @current-change="currentPage"
        @size-change="sizeChange"
        @prev-click="previousClick"
        @next-click="nextClick"
        background
        layout="prev, pager, next"
        :total="totalPages"
      >
      </el-pagination> -->
    </div>
  </section>
</template>

<script>
export default {
  props: {
    filter: {
      type: Array,
      default() {
        return [];
      },
    },
    table: {
      type: Array,
      default() {
        return [];
      },
    },
    // defaultPage: {
    //   type: Number,
    //   default: 1,
    // },
    // size: {
    //   type: Number,
    //   default: 10,
    // },
    // totalPages: {
    //   type: Number,
    //   default: 50,
    // },
    // hidePagination: {
    //   type: Boolean,
    //   default: false,
    // },
    shadow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      page: this.defaultPage,
      pageEvent: "PageItemClicked",
    };
  },
  methods: {
    emitPager(i) {
      this.$emit("pageInfo", {
        page: i,
        size: this.size,
        default: this.defaultPage,
        event: this.pageEvent,
      });
    },
    // currentPage(i) {
    //   this.emitPager(i);
    // },
    // nextClick() {
    //   this.pageEvent = "NextClick";
    // },
    // previousClick() {
    //   this.pageEvent = "PreviousClick";
    // },
    // sizeChange(i) {
    //   this.pageEvent = "SizeChanged";
    //   console.log(i);
    // },
  },
};
</script>

<style scoped>
section{
  padding-top: var(--gap-between-components);
  /* padding-bottom: var(--gap-between-components); */
}





</style>