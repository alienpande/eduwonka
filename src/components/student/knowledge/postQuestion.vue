<template>
  <right-side-bar :show="show" @onClose="__onCancel">
    <div style="height: 70vh; overflow: auto">
      <div style="opacity: 0.8;width:10rem; padding: 34px;color: white" class="f-600 fs-20">
        Post Question
      </div>
      <div style="background: #1E1E1E;">
        <el-row>
          <div class="mg-t-20 mg-l-20 tx-16 tx-bolder d-flex text-white">
            Your Question
          </div>
          <div class="mg-t-8 mg-l-20 mg-r-30">
            <es-input v-model="query.post" placeholder="start typing..." />
          </div>
        </el-row>
        <el-row>
          <div class="mg-t-10 mg-l-20 tx-16 tx-bolder d-flex text-white">
            Choose Tag
          </div>
          <!-- <div class="mg-t-10 mg-l-20 mg-r-60">
            <es-search v-model="searchBy" placeholder="Search"></es-search>
          </div> -->
          <el-select v-model="tagQueryids"   multiple placeholder="Select tags" @change="tagIds" >
            <el-option v-for="item in tags" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-row>
        <br /><br />
      </div>
      <div class="mg-l-20 mg-r-30">
        <es-button text='Submit' @click="queryTag()" :plain="true"></es-button>
      </div>
    </div>
  </right-side-bar>
</template>
<script>
import RightSideBar from "@/components/student/knowledge/rightSideBar.vue"
import { dispatchGraphqlQuery, dispatchGraphql, dispatchGraphqlMutation } from '@/api/dispatcher'
export default {
  components: { RightSideBar },
  props: {
    show: { type: Boolean, default: false },
    __onCancel: Function,
  },
  data: () => ({
    query: {},
    searchBy: [],
    tags: [],
     tagQueryids:[]
  }),
  created() {
    this.getTag()
  },
  methods: {
    getTag() {
      dispatchGraphqlQuery('tags', ['id', 'name']).then((response) => {
        this.tags = response.tags
        console.log('tags', this.tags)
      })
    },
    tagIds(selected){
      console.log('selected', selected)
    },
    getvariables() {
      console.log('routs', this.$route.params.subject_id)
      this.query.subject_id = this.$route.params.subject_id
      console.log('query', this.tagQueryids)
      return this.query
    },
    getIds(id) {
      let tags = []
      for (const tag of this.tagQueryids) {
        let obj = {}
        obj.tag_id = tag
        obj.query_id = id
        tags.push(obj)
      }
      return { "objects": tags }
    },
    queryTag() {
      const mutation = `mutation insert_multiple_queries($objects: [query_tags_insert_input!]! ) {
        insert_query_tags(objects: $objects) {
          returning {
          id
          tag_id
          query_id
          }
        }
      }`
      dispatchGraphqlMutation('queries', ['id', 'post'], this.getvariables()).then((response) => {
        console.log("show", response);
        console.log(this.getIds(response.insert_queries_one.id))
        dispatchGraphql(mutation, this.getIds(response.insert_queries_one.id)).then((response) => {
          console.log('queriesTag', response)
        })
      })

    }
  },
};
</script>
