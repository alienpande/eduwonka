<template>
  <div class="dashboard-editor-container contract school-add-template">
    <div class="pd-15 d-flex justify-content-between">
      <div class="mg-l-15 mg-t-15">
        <h4><svg-icon icon-class="e-contracts_black" class="tx-medium color mg-r-5" /> Contracts</h4>
      </div>
    </div>
    <div class="title bg-white pd-15">
      <div class="bg-white pd-x-40 remove-padding">
        <div class="hash-color-1 text-center">
          <el-row :gutter="20" class="row-text-display-center pointer">

            <el-col style="width:auto" :xs="9" :sm="3" :md="3" :lg="3" :xl="3" class="tab" :class="{ active : activeTabElement == 1, tab_border : activeTabElement == 1 }" >
              <div class="coaching-program-hover pd-t-20">
                <div class="icon">
                  <svg-icon :icon-class="activeTabElement == 1 ? 'files1' : 'files'" class="icon-design" />
                </div>
                <div class="pd-5 tx-bold text">Select<br>Document</div>
              </div>
            </el-col>

            <el-col style="width:auto" :xs="9" :sm="3" :md="3" :lg="3" :xl="3" class="tab" :class="{ active : activeTabElement == 2, tab_border : activeTabElement == 2 }">
              <div class="coaching-program-hover pd-t-20">
                <div class="icon">
                  <svg-icon :icon-class="activeTabElement == 2 ? 'edit_active' : 'edit_gray'" class="icon-design" />
                </div>
                <div class="pd-5 tx-bold text">Edit<br>Document</div>
              </div>
            </el-col>

            <el-col style="width:auto" :xs="9" :sm="3" :md="3" :lg="3" :xl="3" class="tab" :class="{ active : activeTabElement == 3, tab_border : activeTabElement == 3 }">
              <div class="coaching-program-hover pd-t-20">
                <div class="icon">
                  <svg-icon :icon-class="activeTabElement == 3 ? 'preview-active' : 'preview-gray'" class="icon-design" />
                </div>
                <div class="pd-5 tx-bold text">Preview</div>
              </div>
            </el-col>

          </el-row><br>
        </div>
        <br><br>
        <el-row>
          <el-col :span="24">
            <component
              :is="component_name"
              :contract-template="contractTemplate"
              @handleSubmit="handleSubmit"
              @handleDeleteTemplate="handleDeleteTemplate"
            />
          </el-col>
        </el-row>
      </div><br>
    </div>
    <!-- <component :is="component_name" /><br> -->

  </div>
</template>

<script>
const TABS = {
  'select-document': 'select-document',
  'edit-document': 'edit-document',
  preview: 'preview'
}
import { dispatchHttp } from '@/api/dispatcher'
import SelectDocument from './SelectDocument'
import AddSignees from './AddSignees'
import EditDocument from './EditDocument'
import Preview from './Preview'

export default {
  name: 'SendContract',
  directives: {},
  components: { SelectDocument, AddSignees, EditDocument, Preview },
  filters: {},
  props: {},
  data() {
    return {
      mutation: `
        mutation insert_single_documents($object: documents_insert_input! ) {
          insert_documents_one(object: $object) {
            id
          }
        }
      `,
      component_name: 'select-document',
      activeTabElement: '1',
      contractTemplate: {
        name: '',
        title: ''
      }
    }
  },
  computed: {},
  created() {
    // if (this.$route.params.id !== 'new') {
    //   this.getEvent()
    // }
    // if (this.$route.query.tab_name) {
    //   this.activate(this.$route.query.el, this.$route.query.tab_name)
    // }
  },
  mounted() {
    if (this.$route.params.id !== 'new') {
      this.getTemplate(this.$route.params.id)
    }
  },
  methods: {
    /**
     * Breadcrumbs root element link
     */
    updateComponant() {
      this.$router.push('/contracts/index/?tab_name=templates')
    },
    /**
     * Will swwitch tabs based on selection
     * @param String '
     * @returns void
     */
    activate(el, tab_name) {
      this.activeTabElement = el
      this.component_name = TABS[tab_name]
    },
    getVariables: function(data) {
      if (data.id) {
        return { id: data.id, changes: data }
      } else {
        return { object: data }
      }
    },
    handleSubmit(el, tab_name) {
      if (this.contractTemplate.attachment_id) {
        this.activate(el, tab_name)
      }
    },
    handleDeleteTemplate() {
      this.contractTemplate.name = null
      this.contractTemplate.attachment_id = null
    },
    getTemplate(id) {
      this.selectLoading = true
      dispatchHttp('/contract_templates/' + id, {}, 'get')
        .then(response => {
          this.contractTemplate = response.data
        })
        .catch(() => {
          console.log('Error')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.tab {
  color: #9c9c9c;
  div {
    display: flex;
    flex-direction: column;
    height: 80px;
    .icon {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
    .text {
      word-wrap: break-word;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
  &.active {
    color: #513a88;
  }
}
</style>
