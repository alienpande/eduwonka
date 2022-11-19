<template>
  <div>
    <div class="queriesContainer">
      <el-row>
        <el-col :span="4">
          <div style="opacity: 0.8; font-size: 24px; font-weight: 600; margin-left: 5px;">
            Queries
          </div>
        </el-col>
        <el-col :span="3" :offset="window.width > 767 ? 13 : 2">
          <e-button
            @click="postQuestion = true"
            :plain="true"
            label="Post query"
            :size="window.width > 767 ? 'medium' : 'mini'"
          />
        </el-col>
        <el-col :span="3" :offset="window.width > 767 ? 0 : 5">
          <e-button
            label="Tag Directory"
            :size="window.width > 767 ? 'medium' : 'mini'"
          />
        </el-col>
      </el-row>
    </div>
    <div class="main-body-fix querieListWrapper">
      <el-row :style="window.width > 767 ? 'margin-left: 20px' : 'margin-left: 10px'">
        <el-col
          :span="window.width > 767 ? 6 : 8"
          style="font-weight: 500; color: #222222; font-size: 20px"
        >
          {{ total }} queries
        </el-col>
        <el-col
          :span="window.width > 767 ? 3 : 5"
          :offset="window.width > 767 ? 12 : 5"
        >
          <el-dropdown @command="handleTag">
            <span class="el-dropdown-link primary-text" primary>
              All Tags<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="item in tagsdata"
                :key="item.id"
                :command="item.id"
                >{{ item.name }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col style="padding-left: 10px" :span="1">
          <e-button
            icon="el-icon-search"
            :plain="true"
            css="bg-tranparent"
            :size="window.width > 767 ? 'medium' : 'mini'"
            @click="tagQuery()"
          />
        </el-col>
      </el-row>
      <br />
      <el-card
        class="cardWrapper"
        shadow="none"
        v-for="query in queries"
        :key="query.id"
      >
        <div style="cursor: pointer" @click="favorate(query.id)">
          <el-row>
            <el-row>
              <el-col :span="window.width > 767 ? 20 : 16">
                <div
                  @click="$router.push('/knowledge/queries-detail/' + query.id)"
                >
                  <el-col
                    class="tx-overflow"
                    style="color: #4d4f5c; font-weight: 500"
                  >
                    {{ query.post }}
                  </el-col>
                </div>
              </el-col>
              <el-col :span="2" :offset="2">
                <div v-if="verifyFavourites(query)">
                  <el-col :span="1" :offset="22">
                    <e-svg icon="heart"></e-svg>
                  </el-col>
                </div>
                <div v-if="!verifyFavourites(query)">
                  <el-col :span="1" :offset="22">
                    <e-svg icon="heartred"></e-svg>
                  </el-col>
                </div>
              </el-col>
            </el-row>
            <el-row class="mg-t-10">
              <el-col :span="4" style="display: flex">
                <img src="@/assets/images/upGreen.png" />
                <div style="color: #4d4f5c; font-weight: 600; margin-left: 5px">
                  <!-- {{ upvotes[index].id }} -->0
                </div>
              </el-col>
              <el-col :offset="1" :span="4" style="display: flex">
                <img src="@/assets/images/downRed.png" />
                <div style="color: #4d4f5c; font-weight: 600; margin-left: 5px">
                  <!-- {{ downvotes[index].id }} -->0
                </div>
              </el-col>
              <el-col :span="5" :offset="9">
                <div
                  style="
                    color: #4d4f5c;
                    font-size: 10px;
                    font-weight: 500;
                    background: #fcdfbd4d;
                    border-radius: 17px;
                    padding: 3px;
                    text-align: center;
                  "
                >
                  {{ query.query_answers.length }} Answers
                </div>
              </el-col>
            </el-row>
          </el-row>
        </div>
      </el-card>
      <es-pagination :total="total" @pagination="pagination"></es-pagination>
    </div>
    <post-question
      :show="postQuestion"
      :__onCancel="() => (postQuestion = !postQuestion)"
    />
  </div>
</template>
<script>
import postQuestion from "@/components/knowledge/postQuestion.vue";
import {
  dispatchGraphql,
  dispatchGraphqlQuery,
  dispatchGraphqlMutation,
} from "@/api/dispatcher";
import { getId } from "@/util/auth";
import esPagination from "@/studentControl/esPagination";
import screenSize from "@/mixins/screenSize";
export default {
  components: { postQuestion, esPagination },
  mixins: [screenSize],
  data() {
    return {
      postQuestion: false,
      // loading: true,
      upvotes: [],
      downvotes: [],
      tagsdata: [],
      queriesIds: [],
      filter: [
        { text: "All Tags" },
        { text: "Standard 2" },
        { text: "Standard 3" },
      ],
      queries: [],
      queriesVoteCount: {},
      favourites: [],
      ids: [],
      limit: 10,
      offset: 0,
      total: 0,
    };
  },
  created() {
    // this.getQueries()
    this.tagQuery();
  },
  methods: {
    verifyFavourites(val) {
      const fav = this.favourites.filter(
        (x) => x.favourable_id === val.id && x.user_id === getId()
      )[0];
      if (fav) {
        return false;
      } else {
        return true;
      }
    },
    favorate(id) {
      dispatchGraphqlMutation(
        "favourites",
        ["id", "favourable_id", "favourable_type"],
        this.getvariables(id)
      ).then((response) => {
        console.log("fav.................", response);
        this.getQueries();
      });
    },
    getvariables(id) {
      var favr = {};
      const favourites = this.favourites.filter(
        (x) => x.favourable_id === id && x.user_id === getId()
      );
      if (favourites.length > 0) {
        favr = favourites[0];
        favr.favourable_type = "Query";
      } else {
        favr = {
          favourable_type: "Query",
          user_id: getId(),
          favourable_id: id,
        };
      }
      return favr;
    },
    // getUpvotes() {
    //   this.queries.forEach((request) => this.getVoteCount(request.id, 'UPVOTE'));
    //   setTimeout(() => {
    //     this.getDownVotesvotes()
    //     // this.loading = false
    //   }, 3000)
    // },
    // getDownVotesvotes() {
    //   this.queries.forEach((request) => this.getVoteCount(request.id, 'DOWNVOTE'));
    //   setTimeout(() => {
    //     this.loading = false
    //   }, 2000)
    // },
    pagination: function (object) {
      this.limit = object.limit;
      this.offset = object.limit * (object.page - 1);
      this.getQueries(this.limit, this.offset);
    },
    getQueries: function () {
      const query = `query ($limit: Int, $offset: Int, $ids: [uuid!]) {
        queries(limit: $limit,offset: $offset, where: {query_tags: {tag_id: {_in: $ids}}}) {
          id
          post
          query_answers {
            id
            votes {
              id
              vote_type
            }
          }
        }
        queries_aggregate(where: {query_tags: {tag_id: {_in: $ids}}})  {
          aggregate {
           count
          }
        }
      }`;
      dispatchGraphql(query, this.getIds()).then((response) => {
        console.log("queries", response.queries);
        this.queries = response.queries;
        // this.total = this.queries.length
        this.total = response.queries_aggregate.aggregate.count;
        dispatchGraphqlQuery("favourites", [
          "id",
          "favourable_id",
          "favourable_type",
          "user_id",
        ]).then((response) => {
          this.favourites = response.favourites;
        });
      });
    },
    handleTag(id) {
      this.ids = [];
      this.ids = id;
      this.getQueries();
    },
    getIds() {
      return {
        ids: this.ids,
        limit: this.limit,
        offset: this.offset,
      };
    },
    tagQuery() {
      dispatchGraphqlQuery("tags", ["id", "name"]).then((response) => {
        this.tagsdata = response.tags;
        this.ids = this.tagsdata.map((i) => i.id);
        this.getQueries();
      });
    },
    // async getVoteCount(id, vote_type) {
    //   const query = `query ($id: uuid, $vote_type: String){
    //     queries(where: {id: {_eq: $id}}) {
    //       id
    //       query_answers {
    //         id
    //         votes(where: {vote_type: {_eq: $vote_type}}) {
    //           id
    //           vote_type
    //           query_answer_id
    //         }
    //       }
    //     }
    //   }`
    //   await new Promise((reslove) => {
    //     dispatchGraphql(query, {id: id, vote_type: vote_type}).then((response) => {
    //       this.queriesVoteCount = response.queries[0]
    //       let count = response.queries[0].query_answers.length > 0 ? response.queries[0].query_answers[0].votes.length : 0
    //       if(vote_type == 'UPVOTE'){
    //         this.upvotes.push({id:count})
    //       }else{
    //         this.downvotes.push({id:count})
    //       }
    //       reslove()
    //       //[id] = response.queries[0].query_answers.length > 0 ? response.queries[0].query_answers[0].votes.length : 0
    //     })
    //   })
    // }
  },
};
</script>

<style>
.queriesContainer {
  background: white;
  padding: 50px 30px;
}
.querieListWrapper {
  padding: 25px;
  height: 55vh;
  overflow: auto;
}
.cardWrapper {
  width: 25rem;
  display: inline-block;
  margin-left: 20px;
  margin-bottom: 20px;
}
@media screen and (max-width: 767px) {
  .queriesContainer {
    padding: 50px 10px;
  }
  .querieListWrapper {
    padding: 25px 15px;
  }
  .cardWrapper {
  width: 25rem;
  display: inline-block;
  margin-left: 8px;
  margin-bottom: 20px;
}
}
</style>