<template>
  <div class="dashboard-editor-container contract school-esign">
    <div class="pd-15 d-flex justify-content-between">
      <div class="mg-l-15 mg-t-15">
        <h4><svg-icon icon-class="e-contracts_black" class="tx-medium color mg-r-5" /> Contracts</h4>
      </div>
    </div>
    <div class="title bg-white pd-15">
      <div class=" pd-l-15">
        <el-tabs v-model="component_name" @tab-click="handle_tab_active">
          <el-tab-pane label="Documents" name="documents" />
          <el-tab-pane label="Templates" name="templates" />
          <el-tab-pane label="Archived" name="archived" />
        </el-tabs>
      </div>
    </div><br>
    <component :is="component_name" /><br>
  </div>
</template>

<script>
import Documents from './contracts/documents/index'
import Templates from './contracts/templates/index'
// import Archived from './archived/index'

export default {
  name: 'Contracts',
  components: {
    Documents,
    // Archived,
    Templates,
  },
  filters: {},
  props: [],
  data() {
    return {
      component_name: 'templates',
      contracts: [],
      loading_files: false
    }
  },
  computed: {},
  created() {
    // Get component name from URL
    this.component_name = this.$route.query.tab_name
      ? this.$route.query.tab_name
      : 'templates'

    // Get contracts
    // this.getContracts()
  },
  methods: {
    handle_tab_active: function(tab, event) {
      switch (tab.name) {
        case 'docuemnts':
          this.component_name = 'documents'
          break
        case 'templates':
          this.component_name = 'templates'
          break
        case 'archived':
          this.component_name = 'archived'
          break
      }

      this.$router.push({
        path: '/school/esign/?tab_name=' + this.component_name
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
