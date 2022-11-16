<template>
  <div>
    <right-side-bar :show="show" @onClose="__onCancel" :rules="rules">
      <div style="opacity: 0.8;width:10rem; padding: 34px" class="f-600 fs-20">
        Post Question
      </div>
      <div style="background: #e6eaed; padding: 20px" :rules="rules">
        <div style="font-weight: 600; padding: 0 20px">Write your question</div>
        <textarea
          v-model="query.post"
          class="details-expenses__textarea"
          placeholder="Type here to add your Question"
          rows="6"
          cols="170"
          rules="required"
        ></textarea>
        <br/>
      <el-select v-model="tagQueryids"   multiple placeholder="Select tags" @change="tagIds" rules="required">
          <el-option v-for="item in tags" :key="item.id" :label="item.name" :value="item.id" rules="required"/>
        </el-select>
        <!-- <e-select placeholder='Choose' class="select-dropdown" :span='10' :options="tags" label='Choose Tags'></e-select> -->
        <br/>
        <br/>
        <br/>
        <br/>
        
        <e-button @click="queryTag" label='Post query'></e-button>
        <br/>
        <br/>  <br/>  <br/>
      </div>
    </right-side-bar>
  </div>
</template>
<script>
import RightSideBar from "@/components/school/rightSideBar.vue";
import { dispatchGraphqlQuery, dispatchGraphql,dispatchGraphqlMutation} from '@/api/dispatcher'
export default {
  components: { RightSideBar },
  props: {
    show: { type: Boolean, default: false },
    __onCancel: Function,
  },
  data: () => ({
    query: {},
    tags: [],
    tagQueryids:[],
    rules: {
      post: [
        { required: true, message: 'Write your question', trigger: 'blur' }
      ],
      tagQueryids: [
        { required: true, message: 'Select Tag', trigger: 'blur' }
      ]
    }
  }),
  created() {
    this.getTag()
    console.log('routs', this.$route.params.subject_id)
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
    
  }
};
</script>
