<template>
  <div :class="{'hidden':hidden}" class="pagination-container">
    <el-pagination
      style=
      "
      display:flex;
      justify-content:center;
      align-items:center;
      flex-wrap: wrap;
      row-gap: 10px;
      "
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="changedLayout"
      :page-sizes="pageSizes"
      :total="window.width > 767 ? total : 1"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { scrollTo } from '@/util/scroll-to'
import screenSize from '@/mixins/screenSize'
export default {
  name: 'Pagination',
  mixins: [screenSize],
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      changedLayout: this.layout
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },

    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
        // console.log(val)
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.limit = val
      this.$emit('pagination', { page: this.currentPage, limit: val })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    },
    changeLayoutOnMobile(){
      if( window.innerWidth <= 768 )
      {
        this.changedLayout = "total, sizes, jumper, prev, pager, next";
      }

    },
    handleCurrentChange(val) {
      this.$emit('pagination', { page: val, limit: this.pageSize })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    }
  },
  beforeMount(){
    this.changeLayoutOnMobile();
  }
}
</script>

<style scoped>
.pagination-container {
  background: #fff;
  border: 1px solid #e0e0e0;
  padding: 10px;
  border-top: 0px;
}

.pagination-container.hidden {
  display: none;
}
</style>
