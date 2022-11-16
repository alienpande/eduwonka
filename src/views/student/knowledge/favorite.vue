<template>
  <es-container pageTitle="Bookmarked Queries" class="bg-black-5">
    <el-row>
      <el-col :span="6" class="tx-20 text-white">
        {{ favouriteData.length }} queries
      </el-col>
      <el-col class="mg-t-5" :span="5" :offset="7">
        <es-search v-model="search" placeholder="Search"></es-search>
      </el-col>
    </el-row>
    <br />
    <el-row style="border-bottom: 1px solid #6d6c6c"></el-row>
    <br />
    <div style="padding: 25px; height: 55vh; overflow: auto">
      <span class="mg-l-50 tx-18 tx-bolder text-white"> Queries </span>
      <br /><br />
      <el-col :span="7" :offset="1" v-for="favouite in favouriteData" :key="favouite">
        <el-card class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
          <div style="cursor:pointer" @click="$router.push('/knowledge/queries-detail/' + favouite.query.id)">
            <el-row  v-if="favouite.query">
              <el-col class="text-white">
                <!-- Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
                erat, sed diam voluptua. At vero eos ? -->
                <!-- {{ i}} -->
                {{ favouite.query.post }}
              </el-col>
            </el-row>
            <br />
            <el-card class="rounded-09 bg-black-3" :style="'border: none'" shadow="none">
              <el-row>
                <el-col :span="12">
                  <span class="text-white" style="opacity: 60%">Answers</span>
                  <div class="tx-18 text-white">
                    {{ favouite.query.query_answers.length }}
                    <!-- 200 -->
                  </div>
                </el-col>
                <el-col :span="5" :offset="1">
                  <el-card class="rounded-09 bg-black-4" :style="'border: none'" shadow="none">
                    <div class="d-flex">
                      <e-svg icon="up" style="padding-top: 4px; padding-right: 5px"></e-svg>
                      <div class="text-white fs-16">
                        <!-- 120 -->
                        {{getvotes(favouite.query.query_answers, "up")}}
                      </div>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="5" :offset="1">
                  <el-card class="rounded-09 bg-black-4" :style="'border: none'" shadow="none">
                    <div class="d-flex">
                      <e-svg icon="arrow-down" style="padding-top: 4px; padding-right: 5px"></e-svg>
                      <div class="text-white fs-16">
                        <!-- 80 -->
                        {{ getvotes(favouite.query.query_answers, "down") }}
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
import { dispatchGraphql,dispatchGraphqlQuery} from "@/api/dispatcher"
import { getId } from '@/util/auth'
export default {
    components:{postQuestion},
  data: () => ({
    postQuestion: false,
    search: '',
    favouriteData: [],
    filter: [
      { text: "All Tags" },
      { text: "Standard 2" },
      { text: "Standard 3" },
    ],
    subjectsData: [],
    subjectIds: [],
    tagData: [],
    tagIds: [],
  }),
  created () {
    this.getFavourites(),
    this.getSubjects(),
    this.getTags()
    this.getvotes()
  },
  methods: {
    handleSubject(val){
      console.log("standard", val)
      this.subjectIds = []
      this.subjectIds[0] = val
      this.getFavourites()
    },
    handleTags(value){
      console.log("tagid", value)
      this.tagIds = []
      this.tagIds[0] = value
      this.getFavourites()
    },
    getVariables(){
      return{
        "user_id": getId(),
        // "subIds": this.subjectId
        // "tagIds": this.tagIds
      }
    },
    getSubjects() {
      dispatchGraphqlQuery('subjects', ['id', 'name']).then((response) => {
        this.subjectsData = response.subjects
        this.subjectIds = this.subjectsData.map(x => x.id)
        this.getFavourites()
      })
    },
    getTags(){
      dispatchGraphqlQuery('tags', ['id', 'name']).then((response) => {
        this.tagData = response.tags
        this.tagIds = this.tagData.map(x => x.id)
      })
    },
    getvotes(val,type){
      console.log("votetype", val)
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
    getFavourites(){
      console.log(" i am get favouites")
      const favouriteQuery = `query($user_id: uuid!) {
        favourites( where: {user_id: {_eq: $user_id}}) {
          id
          favourable_id
          favourable_type
          tag {
            id
            name
            query_tags {
              id
              query{
                id
                query_answers{
                  id
                  comment
                }
              }
            }
          }
          query {
            id
            post
            query_answers {
              id
              comment
              votes{
                id
                vote_type
              }
            }
          }
        }
      }`
      dispatchGraphql(favouriteQuery, this.getVariables()).then((response) =>{
        console.log(response)
        this.favouriteData = response.favourites
        console.log("favoriteData", this.favouriteData)
      })
    },
  },
};
</script>
