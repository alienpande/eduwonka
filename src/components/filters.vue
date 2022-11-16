<template>
    <el-row :gutter="20" style="padding: 20px 0px 20px 0px;margin: 0px 0px 5px 0px;background: white;">
      <el-col v-if="standards.length > 0" :span="5" :offset="1" class="dropdown-tab">
        <el-dropdown @command="handleStandard">
          <span class="el-dropdown-link primary-text" primary>
            Standard<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in standards" :key="item.id" :command="item.id">{{ item.name }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <e-dropdown :list="standard" @input="handleFilter" primary class="text" /> -->
      </el-col>
      <el-col v-if="subjects.length > 0" :span="5" :offset="1" class="dropdown-tab">
        <el-dropdown @command="handleSubject">
          <span class="el-dropdown-link primary-text" primary>
            Subject<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in subjects" :key="item.id" :command="item.id">{{ item.name }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <e-dropdown :list="subject" @input="handleFilterSub" primary class="text" /> -->
      </el-col>

      <el-col :span="4" style="color: #bc6c42; font-size: 16px" class="cp dropdown-tab">
        <div @click="clearFilter" class="text">Clear filter</div>
      </el-col>
      <!-- <el-col style="padding-left: 10px" :offset="5" :span="1">
        <e-button icon="el-icon-search" :plain="true" css="bg-tranparent"></e-button>
      </el-col> -->
    </el-row>
</template>
<script>
export default {
  props: {
    standards: {
      type: Array,
      default: null
    },
    subjects: {
      type: Array,
      default: null
    }
  },
  created() {
    console.log('filters child', this.standards, this.subjects)
  },
  methods: {
    handleStandard(i) {
      this.$emit('handleStandard', i)
      this.subjects = []
    },
    handleSubject(i) {
      this.$emit('handleSubject', i)
    },
    clearFilter() {
      this.$emit('clear')
    }
  }
}
</script>
<style scoped>
.heading-text {
  font-size: 20px;
}
@media only screen and (device-width: 768px) {
  .heading-text {
    font-size: 16px;
  }
  .pagination {
    width: 50%;
    font-size: 12px;
  }
  .dropdown-tab {
    margin-right: 3px;
  }
  .dropdown-tab .text {
    font-size: 12px;
  }
}
</style>