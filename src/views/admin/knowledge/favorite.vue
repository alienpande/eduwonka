<template >
  <div >
    <e-container class="knowledge-fav-head"
      pageTitle="Favourites"
      btnIcon="el-icon-plus"
      btnText="Create Tag"
      @btnClick="tagCreate = true"
    >
      <el-tabs class="floatTabHeader knowledge-fav-tab-head" v-model="activeName">
        <el-tab-pane label="Tags" name="Tag">
          <el-row :gutter="20" style="padding: 0px 0px 0px 0px; margin: 0px 0px 5px 0px">
            <el-col :span="6" style="font-weight: 500; color: #222222; font-size: 20px">
              {{ total + " Tags" }}
            </el-col>

            <el-col :span="3" :offset="12">
              <!-- <e-dropdown style="padding-top: 15px" :list="filter" primary /> -->
              <el-dropdown @command="handleDate">
                <span class="el-dropdown-link primary-text" primary>
                  Filter<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="item1 in filter1" :key="item1.id" :command="item1.value">{{ item1.text }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>

            <el-col style="padding-left: 10px" :span="1" >
              <e-button icon="el-icon-search" :plain="true" css="bg-tranparent" ></e-button>
            </el-col>
          </el-row><br />
          <el-card
            shadow="none"
            style="width: 20rem; display: inline-block; margin: 0 30px 30px 0"
            v-for="(favourite,i) in favouriteData"
            :key="i"
          >
            <div v-if="favourite.tag" @click="tagsDetails=true">
              <el-row>
                <el-col :span="5">
                  <div style="color: #4d4f5c; font-weight: bold">{{ favourite.tag.name }}</div>
                </el-col>
                <el-col :span="1" :offset="18">
                  <!-- <e-svg icon="heartred"></e-svg> -->
                  <div @click="tagDelete(favourite)">
                  <e-svg icon="heartred"></e-svg>
                  </div>
                </el-col>
              </el-row>
              <br />
              <el-row>
                <el-col :span="10">
                  <div style="color: #4d4f5c; padding-bottom: 10px">Queries</div>
                  <!-- <div style="color: #4d4f5c; font-weight: 500">{{item.tag.query_tags.length}}</div> -->
                  <div style="color: #4d4f5c; font-weight: 500">{{ favourite.tag.query_tags.length }}</div>
                </el-col>
                <el-col :span="10" :offset="2">
                  <div style="color: #4d4f5c; padding-bottom: 10px">Answers</div>
                  <div style="color: #4d4f5c; font-weight: 500">{{ getAnswers(favourite.tag.query_tags) }}</div>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="Queries" name="Query">
          <el-row :gutter="20" style="padding: 0px 0px 0px 0px; margin: 0px 0px 5px 0px">
            <el-col :span="6" style="font-weight: 500; color: #222222; font-size: 20px">
              {{ total + "  Queries" }}
            </el-col>

            <el-col :span="3" :offset="12">
                <!-- <e-dropdown style="padding-top: 15px" :list="filter" primary /> -->
              <el-dropdown @command="handleDate">
                 <span class="el-dropdown-link primary-text" primary>
                   filter<i class="el-icon-arrow-down el-icon--right"></i>
                 </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="info in filter2" :key="info.id" :command="info.value">{{ info.text }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>

            <el-col style="padding-left: 10px" :span="1" >
              <e-button icon="el-icon-search" :plain="true" css="bg-tranparent" ></e-button>
            </el-col>
          </el-row><br />
          <el-card
            style="
              width: 22rem;
              display: inline-block;
              margin-left: 20px;
              margin-bottom: 20px;
            "
            shadow="none"
            v-for="(favouite,i) in favouriteData"
            :key="i"
          >
            <el-row v-if="favouite.query">
              <el-row style="display: flex">
                <el-col style="color: #4d4f5c; font-weight: 500">
                  <!-- to display post content -->
                  <!-- <h5> post content </h5> -->
                  <div> {{ favouite.query.post }}</div>
                </el-col>
                <el-col :span="1" :offset="12">
                  <div @click ="queryDelete(favouite)"> 
                    <e-svg icon="heartred"></e-svg>
                  </div>
                </el-col>
              </el-row>
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
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-tab-pane>
      </el-tabs>
      <es-pagination :total="total" @pagination="pagination"></es-pagination>
    </e-container>
  </div>
</template>
<script>
import { dispatchGraphql , dispatchGraphqlDelete} from "@/api/dispatcher"
import _ from "lodash"
import { getId } from '@/util/auth'
import esPagination from '@/studentControl/esPagination'
export default {
  components: { esPagination },
  data: () => ({
    activeName: "Tag",
    favouriteData: [],
    dateFilter: "asc",
    filter1: [
      { text: "Old - New", value: "asc" },
      { text: "New - Old", value: "desc" },
    ],
    filter2: [
      { text: "Old - New", value: "asc" },
      { text: "New - Old", value: "desc" },
    ],
    limit: 10,
    offset: 0,
    total: 0
  }),
  watch: {
    activeName: _.debounce(function() {
      if (this.activeName === "Query") {
        this.getFavourites()
      } else {
        this.getFavourites()
      }
    })
  },
  created () {
    this.getFavourites()
  },
  methods: {
    getVariables(){
      return{
        "updated_at":this.dateFilter,
        "user_id": getId(),
        "favourable_type": this.activeName,
        "limit": this.limit,
        "offset": this.offset
      }
    },
    pagination: function(object) {
      this.limit = object.limit
      this.offset = object.limit * (object.page - 1)
      this.getFavourites(this.limit, this.offset)
    },
    getFavourites(){
      console.log(" i am get favouites")
      const favouriteQuery = `query($limit: Int,$offset: Int, $updated_at: order_by, $user_id: uuid!, $favourable_type:String) {
        favourites(limit: $limit, offset: $offset, order_by: {updated_at: $updated_at}, where: {user_id: {_eq: $user_id}, favourable_type: {_eq: $favourable_type}}) {
          id
          favourable_id
          favourable_type
          updated_at
          tag {
            id
            name
            query_tags {
              id
              query{
                query_answers{
                  id
                }
              }
            }
          }
          query {
            id
            post
            updated_at
            query_answers {
              id
            }
          }
        }
        favourites_aggregate(order_by: {updated_at: $updated_at}, where: {user_id: {_eq: $user_id}, favourable_type: {_eq: $favourable_type}}) {
          aggregate {
            count
          }
        }
      }`
      dispatchGraphql(favouriteQuery, this.getVariables()).then((response) =>{
        console.log(response)
        this.favouriteData = response.favourites
        this.total = response.favourites_aggregate.aggregate.count
      })
    },
    tagDelete(item) {
      dispatchGraphqlDelete('favourites', { id: item.id }).then((response) => {
        console.log(response)
        this.getFavourites()
      })
    },
    queryDelete(data) {
      dispatchGraphqlDelete('favourites', { id: data.id }).then((response) => {
        console.log(response)
        this.getFavourites()
      })
    },
    handleDate(value) {
     this.dateFilter = value
     this.getFavourites()
    },
    getAnswers(query_tags) {
      console.log("val",query_tags)
      let count = 0
      const query = query_tags.map(x => x.query)
      console.log("query in length", query)
        for (const item of query) {
          if(item.query_answers.length > 0) {
           count = count + item.query_answers.length
           console.log("lenth", item.query_answers.length, count)
          }
        }
      return count
    }
  },
};
</script>
