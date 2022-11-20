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
// import { scrollTo } from '@/util/scroll-to'
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
        return [10, 20, 30,40, 50]
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
    },
    // changeLayoutOnMobile: {

    // }
  },
  methods: {
    handleSizeChange(val) {
      this.limit = val
      this.$emit('pagination', { page: this.currentPage, limit: val })
      if (this.autoScroll) {
        // scrollTo(0, 800)
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
        // scrollTo(0, 800)
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
  /* border: 1px solid #e0e0e0; */
  padding: 10px 2px;
  border-top: 0px;
}

.pagination-container.hidden {
  display: none;
}

.student-pagination .el-pagination.is-background .el-pager li{
background: transparent !important;
color: #F3F3F3 !important;
}
.student-pagination .el-pagination.is-background .el-pager .active{
background: #CFCFCF !important;
color: black !important;
}
.student-pagination .el-pagination.is-background .btn-next.disabled, .student-pagination .el-pagination.is-background .btn-next:disabled, .student-pagination .el-pagination.is-background .btn-prev.disabled, .student-pagination .el-pagination.is-background .btn-prev:disabled, .student-pagination .el-pagination.is-background .el-pager li.disabled{
    background: #353535 !important;
border: none !important;
}
.student-pagination .el-pagination.is-background .btn-next, .student-pagination .el-pagination.is-background .btn-prev{
background: #1492E6 !important;
border: none !important;
}
.student-pagination .el-pagination.is-background .btn-next i, .student-pagination .el-pagination.is-background .btn-prev i{
color: black !important;

}
.student-pagination .el-pagination .btn-next .el-icon, .student-pagination .el-pagination .btn-prev .el-icon{
color: #858585 !important;
}
</style>





<!-- <template>
    <div class="student-pagination">
        <el-pagination
        v-if="!hidePagination"
        @current-change="currentPage"
        @size-change="sizeChange"
        @prev-click="previousClick"
        @next-click="nextClick"
        background
        layout="prev, pager, next"
        :total="totalPages"
      >
      </el-pagination>
    </div>
</template>
<script>
export default {
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
    data:()=>({
        totalPages:50,
    }),
    methods:{
      handleSizeChange(val) {
        this.limit = val
        this.$emit('pagination', { page: this.currentPage, limit: val })
        if (this.autoScroll) {
          scrollTo(0, 800)
        }
      },
     handleCurrentChange(val) {
        this.$emit('pagination', { page: val, limit: this.pageSize })
        if (this.autoScroll) {
          scrollTo(0, 800)
        }
      },
    nextClick() {
      this.pageEvent = "NextClick";
    },
    previousClick() {
      this.pageEvent = "PreviousClick";
    },
    sizeChange(i) {
      // this.pageEvent = "SizeChanged";
      console.log(i);
      this.limit = val
      this.$emit('pagination', { page: this.currentPage, limit: val })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    },
    }
}
</script>
<style>
.student-pagination .el-pagination.is-background .el-pager li{
background: transparent !important;
color: #F3F3F3 !important;
}
.student-pagination .el-pagination.is-background .el-pager .active{
background: #CFCFCF !important;
color: black !important;
}
.student-pagination .el-pagination.is-background .btn-next.disabled, .student-pagination .el-pagination.is-background .btn-next:disabled, .student-pagination .el-pagination.is-background .btn-prev.disabled, .student-pagination .el-pagination.is-background .btn-prev:disabled, .student-pagination .el-pagination.is-background .el-pager li.disabled{
    background: #353535 !important;
border: none !important;
}
.student-pagination .el-pagination.is-background .btn-next, .student-pagination .el-pagination.is-background .btn-prev{
background: #1492E6 !important;
border: none !important;
}
.student-pagination .el-pagination.is-background .btn-next i, .student-pagination .el-pagination.is-background .btn-prev i{
color: black !important;

}
.student-pagination .el-pagination .btn-next .el-icon, .student-pagination .el-pagination .btn-prev .el-icon{
color: #858585 !important;
}
</style> -->


