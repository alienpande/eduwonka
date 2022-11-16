<template>
  <es-container hideHeader class="bg-black-5">
    <div class="bg-black-2 queries-detail__header" style="padding: 30px 50px">
      <el-row>
        <el-col :span="11" class="text-white tx-24 f-600">
          <!-- Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod -->
          {{ question.post }}
        </el-col>
        <el-col :span="3" :offset="5">
          <es-button v-if="verifyBookmark(question)" text="Bookmark" icon="darkbookmark" @click="favorate(question.id)" />
          <span v-else>&emsp;</span>
        </el-col>
        <el-col :span="3" :offset="1">
          <es-button text="Post Answer" :plain="true" @click="postAnswer = true"></es-button>
        </el-col>
      </el-row>
      <br />
      <div v-for="i in question.query_tags" :key="i" class="text-white tx-10" style="background: #1492e6;border-radius: 16px;padding: 7px 9px;margin-right: 30px;text-align: center;display: inline-block;">
        {{ i.tag.name }}
      </div>
    </div>

    <div style="padding: 20px 40px; height: 55vh; overflow: auto">
      <div class="text-white fs-20 f-500">{{ this.question.query_answers.length   }} answers</div>
      <br />
      <div v-for="ans in question.query_answers" :key="ans">
        <el-card class="rounded-08 bg-black-2 mg-t-10" style="'border: none'" shadow="none">
          <div class="text-white">
            <!-- Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
            sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
            rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
            ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
            et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
            takimata sanctus est Lorem ipsum dolor sit amet. -->
            {{ ans.comment }}
          </div>
          <br />
          <el-row>
            <el-col :span="12" >
              <el-col :span="5" :offset="1" class="mg-t-20">
                <es-button text="Upvote" icon="up"  @click="upVote(ans.id)" />
              </el-col>
              <el-col :span="5" :offset="1" class="mg-t-20">
                <es-button text="Downvote" icon="arrow-down" @click="downVote(ans.id)" />
              </el-col>
            </el-col>
            <el-col :span="7" :offset="5">
              <el-card class="mg-t-20 rounded-08 bg-black-3" :style="'border: none'" shadow="none">
                <el-col :span="12">
                  <span class="text-white" style="opacity: 60%">Answered by</span>
                  <div class="tx-18 text-white"> {{getName(ans)}} </div>
                </el-col>
                <el-col :span="5" :offset="1">
                  <el-card class="mg-b-15 rounded-09 bg-black-4" :style="'border: none'" shadow="none">
                    <div class="d-flex">
                      <e-svg icon="up" style="padding-top: 4px; padding-right: 5px"></e-svg>
                      <div class="text-white fs-16">
                        <!-- 100 -->
                        {{ getUpVote(ans.id) }}
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
                          {{ getdownVote(ans.id) }}
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </div>
    </div>
    <post-answer :show="postAnswer" :__onCancel="() => (postAnswer = !postAnswer)"/>
  </es-container>
</template>
<script>
import postAnswer from "@/components/student/knowledge/postAnswer.vue"
import { dispatchGraphql,dispatchGraphqlMutation,dispatchGraphqlQuery } from "@/api/dispatcher";
import { getId } from '@/util/auth'
export default {
  components: { postAnswer },
  data: () => ({
    postAnswer: false,
    sub: ["Algebra", "Unit test", "Loreum"],
    question: [],
    voteData: {},
    votes: [],
    fav:[],
    favorates:[]
  }),
  created(){
    console.log("getId===========", getId())
    this.getQueryAnswer(),
    this.favorate()
  },
  methods: {
    verifyBookmark(query) {
      const bookmark = query.bookmarks.filter(x => x.user_id === getId())
      if (bookmark.length > 0) {
        return false
      }
    },
    getUpVote(id) {
      const votes = this.votes.filter(x => (x.vote_type === 'UPVOTE' && x.query_answer_id === id))
      return votes.length
    },
    getdownVote(id) {
      const votes = this.votes.filter(x => (x.vote_type === 'DOWNVOTE' && x.query_answer_id === id))
      return votes.length
    },
    upVote(id) {
      var vote = {}
      const votes = this.votes.filter(x => (x.user_id === getId() && x.query_answer_id === id))
      if (votes.length > 0) {
        vote = votes[0]
        if (vote && vote.vote_type != 'UPVOTE') {
          vote.vote_type = 'UPVOTE'
        }
      } else {
        vote = { vote_type: "UPVOTE", user_id: getId(), query_answer_id: id }
      }

      dispatchGraphqlMutation('votes', ['id', 'vote_type'], vote).then((response) => {
        console.log("upvote", response)
        this.getQueryAnswer()
      })
    },
    downVote(id) {
      var vote = {}
      const votes = this.votes.filter(x => (x.user_id === getId() && x.query_answer_id === id))
      if (votes.length > 0) {
        vote = votes[0]
        if (vote.vote_type != 'DOWNVOTE') {
          vote.vote_type = 'DOWNVOTE'
        }
      } else {
        vote = { vote_type: "DOWNVOTE", user_id: getId(), query_answer_id: id }
      }

      dispatchGraphqlMutation('votes', ['id', 'vote_type'], vote).then((response) => {
        console.log("downvote", response)
        this.getQueryAnswer()
      })
    },
    getTags(query) {
      return query.tag.name
    },
    getName(query){
      return query.user.first_name
    },
    verifyFavourites(val) {
      const fav = this.favourites.filter(x => (x.favourable_id === val.id && x.user_id === getId()))[0]
      if (fav) {
        return false
      } else {
        return true
      }
    },
    favorate(id) {
      dispatchGraphqlMutation('favourites', ['id', 'favourable_id','favourable_type'], this.getvariables(id) ).then((response) => {
        console.log("fav.................", response);
        this.getQueryAnswer()
      })

    },
    getvariables(id) {
      var favr = {}
      const favourites = this.favourites.filter(x => (x.favourable_id === id && x.user_id === getId()))
      if (favourites.length > 0) {
        favr = favourites[0]
        favr.favourable_type = 'Query'
      } else {
        favr = { favourable_type: "Query", user_id: getId(), favourable_id: id }
      }
      return favr
    },

    getQueryAnswer: function() {
      const query = `query {
        queries_by_pk(id: "${this.$route.params.query_id}") {
          id
          post
          query_answers {
            id
            comment
            user {
              id
              first_name
            }
          }
          query_tags {
            id
            tag {
              id
              name
            }
          }
          bookmarks {
            id
            user_id
            favourable_id
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
        this.question = response.queries_by_pk
        this.query_id = this.question.id
        console.log("aaaaaaaaaaaaaaaaaaa", this.question.query_answers.length)
      })
      dispatchGraphqlQuery('favourites', ['id', 'favourable_id','favourable_type','user_id']).then((response) => {
        this.favourites = response.favourites
      })
      dispatchGraphqlQuery('votes', ['id', 'vote_type', 'user_id', 'query_answer_id']).then((response) => {
        this.votes = response.votes
        console.log("#########################",this.votes)
      })
    },
  },
};
</script>
