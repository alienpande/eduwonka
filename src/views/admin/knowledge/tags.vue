<template>
  <div class="knowledge-tags-container" >
    <e-container class="knowledge-tags-head"
      pageTitle="Tags"
      btnIcon="el-icon-plus"
      btnText="Create Tag"
      @btnClick="tagCreate=true"
    >
      <el-row 
        :gutter="20"
        style="padding: 0px 0px 0px 0px; margin: 0px 0px 5px 0px"
      >
        <el-col
          :span="6"
          style="font-weight: 500; color: #222222; font-size: 20px"
        >
          {{ total }} tags
        </el-col>

        <el-col style="padding-left: 10px" :span="1" :offset="window.width > 767 ? 15 : 10">
          <e-button
            icon="el-icon-search"
            :plain="true"
            css="bg-tranparent"
          ></e-button>
        </el-col>
      </el-row>
      <br />
      <el-card
        shadow="none"
        style="width: 20rem; display: inline-block; margin: 0 30px 30px 0"
        v-for="(tag,i) in tagData"
        :key="i"
      >
        <div >
          <el-row >
            <el-col :span="5">
              <div style="color: #4d4f5c; font-weight: bold">{{ tag.name }}</div>
            </el-col>
            <div v-if="verifyFavourites(tag)" @click="favorate(tag.id)">
              <el-col :span="1" :offset="14">
                <e-svg icon="heart"></e-svg>
              </el-col>
            </div>
            <div v-if="!verifyFavourites(tag)">
              <el-col :span="1" :offset="14">
                <e-svg icon="heartred"></e-svg>
              </el-col>
            </div>
            <div @click="handleDetails(tag)">
              <el-col :span="1" :offset="3">
                <e-svg icon="dots"></e-svg>
              </el-col>
            </div>
          </el-row>
          <br />
          <el-row>
            <el-col :span="10">
              <div style="color: #4d4f5c; padding-bottom: 10px">Queries</div>
              <div style="color: #4d4f5c; font-weight: 500">{{ tag.query_tags.length }}</div>
            </el-col>
            <el-col :span="10" :offset="2">
              <div style="color: #4d4f5c; padding-bottom: 10px">Answers</div>
              <div style="color: #4d4f5c; font-weight: 500">{{ getAnswersCount(tag.query_tags) }}</div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <es-pagination :total="total" @pagination="pagination"></es-pagination>
    </e-container>
    <tags-detail v-if="tagsDetails" :tagId="tagId" :show="tagsDetails" :__onCancel="() => (tagsDetails = !tagsDetails)" />
    <create-tag :show="tagCreate" :__onCancel="() => (tagCreate = !tagCreate)" />
  </div>
</template>
<script>
import tagsDetail from "@/components/knowledge/tagsDetail.vue"
import createTag from "@/components/knowledge/createTag.vue"
import { dispatchGraphql , dispatchGraphqlMutation , dispatchGraphqlQuery } from "@/api/dispatcher"
import { getId } from '@/util/auth'
import esPagination from '@/studentControl/esPagination'
import screenSize from "@/mixins/screenSize";
export default {
  components: { tagsDetail, createTag, esPagination },
  mixins: [screenSize],
  data:() => ({
    tagId: '',
    tagData: [],
    answerData: [],
    count: '',
    favourites: [],
    limit: 10,
    offset: 0,
    total: 0,
    tagsDetails: false,
    tagCreate: false
  }),
  created() {
    this.getTags()
  },
  methods: {
    verifyFavourites(val) {
      const fav = this.favourites.filter(x => (x.favourable_id === val.id && x.user_id === getId()))[0]
      if (fav) {
        return false
      } else {
        return true
      }
    },
    handleDetails(tag) {
      this.tagId = tag.id
      console.log("tagId",this.tagId)
      this.tagsDetails = true
    },
    setFavorite(data) {
      alert('hii')
      console.log(data)
    },
    favorate(id) {
      dispatchGraphqlMutation('favourites', ['id', 'favourable_id','favourable_type'], this.getvariables(id) ).then((response) => {
        console.log("fav.................", response);
        this.getTags()
      })
    },
    getvariables(id) {
      var favr = {}
      const favourites = this.favourites.filter(x => (x.favourable_id === id && x.user_id === getId()))
      if (favourites.length > 0) {
        favr = favourites[0]
        favr.favourable_type = 'Tag'
      } else {
        favr = { favourable_type: "Tag", user_id: getId(), favourable_id: id }
      }
      return favr 
    },
    pagination: function(object) {
      this.limit = object.limit
      this.offset = object.limit * (object.page - 1)
      this.getTags(this.limit, this.offset)
    },
    getTags (){
      const tagQuery = `query($limit: Int, $offset: Int) {
        tags(limit: $limit, offset: $offset) {
          id
          name    
          query_tags {
            tag_id
            query_id
            query {
              id
              post
              query_answers {
                id
                comment
              }
            }
          }
        }
        tags_aggregate {
          aggregate {
           count
          }
        }
      }`
      dispatchGraphql(tagQuery, this.getTagvariables()).then((response) =>{
        this.tagData = response.tags
        console.log("tag data", this.tagData)
        this.total = response.tags_aggregate.aggregate.count
        dispatchGraphqlQuery('favourites', ['id', 'favourable_id','favourable_type','user_id']).then((response) => {
          this.favourites = response.favourites
        })

      })
    },
    getTagvariables(){
      return{
        "limit": this.limit,
        "offset": this.offset
      }
    },
    getAnswersCount(query_tags) {
      let count = 0
      const query = query_tags.map(x => x.query)
      for (const item of query) {
        if(item.query_answers.length > 0) {
          count = count + item.query_answers.length
        }
      }
      return count
    }
  }
};
</script>
