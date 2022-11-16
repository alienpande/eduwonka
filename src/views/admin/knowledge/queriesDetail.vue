<template>
  <div>
    <div
      class="queries-detail__header"
      style="background: white; padding: 30px 50px"
    >
      <el-row>
        <el-col :span="11" class="f-600" style="font-size: 24px">
          {{question.post}}
        </el-col>
        <el-col :span="3" :offset="7">
          <e-button
            label="Post answer"
            :plain="true"
            @click="postAnswer = true"
            css="sort-icon"
          ></e-button>
        </el-col>
        <el-col :span="1" :offset="1">
          <e-svg @click="$router.push('/knowledge/overview')" icon="close2" />
        </el-col>
      </el-row>
      <br />
      <div
        v-for="query in question.query_tags"
        :key="query"
        style="
          color: #4d4f5c;
          font-size: 10px;
          font-weight: 500;
          background: #fcdfbd4d;
          border-radius: 16px;
          padding: 7px 9px;
          margin-right: 30px;
          text-align: center;
          display: inline-block;
        "
      >
        {{ getTags(query) }}
      </div>
    </div>

    <div style="padding: 20px 40px; height: 55vh; overflow: auto">
      <div style="color: #222222" class="fs-20 f-500">{{question.query_answers.length}} answers</div>
      <br />
      <div class="f-600">Answers</div>
      <br />
      <el-card
        shadow="none"
        style="margin-bottom: 20px"
        v-for="query in question.query_answers"
        :key="query"
      >
        <div>
          {{query.comment}}
        </div>
        <br />
        <el-row>
          <el-col :span="2"> <img src="@/assets/images/upvote.png" @click="upVote(query.id)" /> </el-col>
          <el-col :span="4">
            <img src="@/assets/images/downvote.png" @click="downVote(query.id)" />
          </el-col>
          <el-col :span="6">
            <span style="color: #4d4f5c; font-size: 12px">Answer by</span>
            <span style="color: #4d4f5c; font-size: 12px; font-weight: 600">
              {{getName(query)}} </span
            >
          </el-col>
          <el-col :span="1" :offset="6" style="display: flex">
            <img src="@/assets/images/upGreen.png" />
            <div style="color: #4d4f5c; font-weight: 600; margin-left: 5px">
              {{ getUpVote(query.id) }}
            </div>
          </el-col>
          <el-col :offset="1" :span="4" style="display: flex">
            <img src="@/assets/images/downRed.png" />
            <div style="color: #4d4f5c; font-weight: 600; margin-left: 5px">
              {{ getdownVote(query.id) }}
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <post-answer
      :show="postAnswer" @input="setAnswer"
      :__onCancel="() => (postAnswer = !postAnswer)"
    />
  </div>
</template>
<script>
import postAnswer from "@/components/knowledge/postAnswer.vue";
import { dispatchGraphql, dispatchGraphqlQuery,dispatchGraphqlMutation } from "@/api/dispatcher";
import { getId } from '@/util/auth'
export default {
  components: { postAnswer },
  data: () => ({
    postAnswer: false,
    sub: ["Algebra", "Unit test", "Loreum"],
    question: {},
    voteData: {},
    votes: []
  }),
  created() {
    this.getQueryAnswer()
  },
  methods: {
    setAnswer() {
      this.postAnswer = false
      this.getQueryAnswer()
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
      // this.voteData.vote_type = "UPVOTE"
      // this.voteData.user_id = getId()
      // this.getvote(voteData)
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
      // this.voteData.vote_type = "vote"
      // this.voteData.user_id = getId()
      // this.getvote(voteData)
    },
    getTags(query) {
      return query.tag.name
    },
    getName(query){
      return query.user.first_name
    },
    getQueryAnswer: function() {
      const query = `query {
        queries_by_pk(id: "${this.$route.params.queryId}") {
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
        }
      }`
      dispatchGraphql(query).then((response) => {
        console.log('queries', response.queries_by_pk)
        this.question = response.queries_by_pk
      })
      dispatchGraphqlQuery('votes', ['id', 'vote_type', 'user_id', 'query_answer_id']).then((response) => {
        this.votes = response.votes
        console.log(this.votes)
      })
    },

  }
};
</script>
