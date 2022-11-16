<template>
  <es-container btnText="Post Query" @btnClick="postQuestion = true" pageTitle="Queries" class="bg-black-5">
    <el-row>
      <el-col :span="6" class="tx-20 text-white">
        {{queries.length}} queries
      </el-col>
      <el-col :span="5" :offset="9">
        <es-search v-model="search" placeholder="Search"></es-search>
      </el-col>
      <el-col class="mg-t-7" :span="2" :offset="1">
        <el-dropdown @command="handleTag"   >
            <span class="el-dropdown-link" primary style="color: #696969; background-color: #353535 ; border-radius:40px ;padding: 2px 8px 8px 8px;">
              All Tags<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in tagsdata" :key="item.id" :command="item.id">{{ item.name }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <br />
    <el-row style="border-bottom: 1px solid #6d6c6c"></el-row>
    <br />
    <div style="padding: 25px; height: 55vh; overflow: auto">
      <el-col v-for="query in queries" :key="query" :span="7" :offset="1">
        <el-card class="rounded-08 bg-black-2" :style="'border: none'" shadow="none" >
          <div style="cursor:pointer" @click="$router.push('/knowledge/queries-detail/' + query.id)">
            <el-row>
              <el-col class="text-white">
                <!-- Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
                erat, sed diam voluptua. At vero eos ? -->
                {{query.post }}
              </el-col>
            </el-row>
            <el-card class="mg-t-15 rounded-09 bg-black-3" :style="'border: none'" shadow="none">
              <el-row>
                <el-col :span="12">
                  <span class="text-white" style="opacity: 60%">Answers</span>
                  <div class="tx-18 text-white">{{query.query_answers.length}}</div>
                </el-col>
                <el-col :span="5" :offset="1">
                  <el-card class="rounded-09 bg-black-4" :style="'border: none'" shadow="none">
                    <div class="d-flex">
                      <e-svg icon="up" style="padding-top: 4px; padding-right: 5px"></e-svg>
                      <div class="text-white fs-16">
                        <!-- 120 -->
                        {{getvotes(query.query_answers, "up")}}
                      </div>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="5" :offset="1">
                  <el-card class="rounded-09 bg-black-4" :style="'border: none'" shadow="none">
                    <div class="d-flex">
                      <e-svg icon="arrow-down" style="padding-top: 4px; padding-right: 5px"></e-svg>
                      <div class="text-white fs-16">
                        {{getvotes(query.query_answers, "down")}}
                        <!-- 30 -->
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-card>
          </div>
        </el-card>
        <br />
      </el-col>
    </div>
    <post-question :show="postQuestion" :__onCancel="() => (postQuestion = !postQuestion)"/>
  </es-container>
</template>
<script>
import postQuestion from '@/components/student/knowledge/postQuestion.vue'
import { dispatchGraphql ,dispatchGraphqlQuery } from "@/api/dispatcher";
export default {
    components:{postQuestion},
  data: () => ({
    postQuestion: false,
    search: '',
    queries: [],
    ids: [],
    tagsdata: [],
    filter: [
      { text: "All Tags" },
      { text: "Standard 2" },
      { text: "Standard 3" },
    ],
  }),
  created(){
    this.getQueries(),
    this.tagQuery(),
    this.getvotes()
  },
  methods: {
    tagQuery() {
      dispatchGraphqlQuery('tags', ['id', 'name']).then((response) => {
        this.tagsdata = response.tags
        this.ids = this.tagsdata.map(i => i.id)
        this.getQueries()
      })
    },
    handleTag(id) {
      this.ids = []
      this.ids = id
      this.getQueries()
    },
    getIds() {
      return {
        "ids": this.ids,
      }
    },
    getvotes(val,type){
      const votes = val.map(x=> x.votes)
      console.log("vot", votes)
      const upVote = votes[0].filter(x => x.vote_type === "UPVOTE").length
      console.log("filter", upVote)
      const downVote = votes[0].filter(x => x.vote_type === "DOWNVOTE").length
      if(type === "up"){
        return upVote
      }
      else{
        return downVote
      }
    },
    getQueries: function() {
        const query = `query($ids: [uuid!]) {
          queries(where: {query_tags: {tag_id: {_in: $ids}}}) {
            id
            post
            query_answers {
              id
              comment
              votes {
                id
                vote_type
              }
            }
          }
        }`
      dispatchGraphql(query, this.getIds()).then((response) => {
        this.queries = response.queries
        console.log('queries', this.queries)
      })
    },
  },
};
</script>
