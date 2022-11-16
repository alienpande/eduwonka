<template>
  <div>
    <es-container pageTitle="Tags" class="bg-black-5">
      <el-tabs class="floatTabHeader studentTab" v-model="activeName">
        <el-tab-pane label="All Tags" name="all">
          <el-row :gutter="20" class="mg-l-5">
            <el-col :span="6" class="tx-20 text-white">
              {{tagData.length}} tags
            </el-col>
            <el-col class="pd-10p" :span="8" :offset="9">
              <es-search v-model="searchBy" placeholder="Search"></es-search>
            </el-col>
          </el-row>
          <br />
          <el-col v-for="tag in tagData" :key="tag" :span="5" :offset="1">
            <el-card class="pointer rounded-08 bg-black-2 mg-t-20" :style="'border: none'" shadow="none">
              <!-- <div @click="tagsDetails = true"> -->
                <div  @click="handleDetails(tag.id)">
                <el-row>
                  <el-col :span="5">
                    <div class="text-white tx-16 tx-bolder">{{ tag.name }}</div>
                  </el-col>
                  <!-- <el-col :span="1" :offset="16">
                    <e-svg icon="heart"></e-svg>
                  </el-col> -->
                  <div v-if="verifyFavourites(tag)" @click="favorate(tag.id)">
                    <el-col :span="1" :offset="14">
                      <e-svg icon="heartredborder"></e-svg>
                    </el-col>
                  </div>
                  <div v-if="!verifyFavourites(tag)">
                    <el-col :span="1" :offset="14">
                      <e-svg icon="heartred"></e-svg>
                    </el-col>
                  </div>
                </el-row>
                <el-row class="mg-t-10" style="border-bottom: 1px solid #6d6c6c"></el-row>
                <el-row class="mg-t-15">
                  <el-card class="rounded-08 bg-black-3" :style="'border: none'" shadow="none">
                    <el-row>
                      <el-col :span="10">
                        <div class="text-white" style="opacity: 60%">Queries</div>
                        <div class="text-white">{{ tag.query_tags.length }}</div>
                      </el-col>
                      <el-col :span="10" :offset="2">
                        <div class="text-white" style="opacity: 60%">Answers</div>
                        <div class="text-white">{{ getAnswersCount(tag.query_tags) }}</div>
                      </el-col>
                    </el-row>
                  </el-card>
                </el-row>
              </div>
            </el-card>
          </el-col>
            <!-- <tags-detail v-if="tagsDetails" :tagId="tagId" :show="tagsDetails" :__onCancel="() => (tagsDetails = !tagsDetails)" /> -->
        </el-tab-pane>
        <el-tab-pane label="Favorite Tags" name="favourite">
          <el-row :gutter="20" class="mg-l-5">
            <el-col :span="6" class="tx-20 text-white">
              {{favoData.length}} tags
            </el-col>
            <el-col class="pd-10p" :span="8" :offset="9">
              <es-search v-model="searchBy" placeholder="Search"></es-search>
            </el-col>
          </el-row>
          <br />
          <el-col v-for="i in favoData" :key="i" :span="5" :offset="1">
            <el-card class="rounded-08 bg-black-2 mg-t-20" :style="'border: none'" shadow="none">
              <div @click="tagsDetails=true">
                <el-row>
                  <el-col :span="5">
                    <div class="text-white tx-16 tx-bolder">{{i.tag.name}}</div>
                  </el-col>
                  <el-col :span="1" :offset="16">
                    <!-- <e-svg icon="redheart"></e-svg> -->
                      <div @click="tagDelete(i)">
                       <e-svg icon="heartred"></e-svg>
                      </div>
                  </el-col>
                </el-row>
                <br />
                <el-row style="border-bottom: 1px solid #6d6c6c"></el-row>
                <el-row class="mg-t-10">
                  <el-card class="rounded-08 bg-black-3" :style="'border: none'" shadow="none">
                    <el-row>
                      <el-col :span="10">
                        <div class="text-white" style="opacity: 60%">Queries</div>
                        <div class="text-white">{{i.tag.query_tags.length}}</div>
                      </el-col>
                      <el-col :span="10" :offset="2">
                        <div class="text-white" style="opacity: 60%">Answers</div>
                        <div class="text-white">{{ getAnswersCount(i.tag.query_tags) }}</div>
                      </el-col>
                    </el-row>
                  </el-card>
                </el-row>
              </div>
            </el-card>
          </el-col>
        </el-tab-pane>
      </el-tabs>
    </es-container>
    <tags-detail v-if="tagsDetails" :tagId="tagId" :show="tagsDetails" :__onCancel="() => (tagsDetails = !tagsDetails)" />
    <!-- <tags-detail :show="tagsDetails" :__onCancel="() => (tagsDetails = !tagsDetails)" /> -->
  </div>
</template>
<script>
import tagsDetail from "@/components/student/knowledge/tagsDetail.vue"
import { dispatchGraphql, dispatchGraphqlMutation, dispatchGraphqlQuery, dispatchGraphqlDelete } from '@/api/dispatcher'
import { getId } from '@/util/auth'
import _ from 'lodash'
export default {
  components: { tagsDetail },
  data:()=>({
    tagId: '',
    tagData: [],
    count: '',
    favourites: [],
    activeName: 'all',
    tagsDetails: false,
    favoData: [],
  }),
  watch: {
    activeName: _.debounce(function() {
      if (this.activeName === 'favourite') {
        this.getFavType()
      } else {
        this.getFavType()
      }
    })
  },
  created() {
    this.getTags(),
    this.getFavType()
    // this.favorateData()
  },
  methods: {
    tagDelete(item) {
      dispatchGraphqlDelete('favourites', { id: item.id }).then((response) => {
        console.log(response)
        this.getFavType()
      })
    },
      getFavType() {
        const query = `query {
          favourites(where: {favourable_type: {_eq: "Tag"}}) {
            id
            tag {
              name
              query_tags {
                id
                query {
                  id
                  post
                  query_answers {
                    id
                  }
                }
              }
            }
          }
        }`
        dispatchGraphql(query).then((response) =>{
          this.favoData = response.favourites
          console.log("kfjgkjviuvhuiiuh", this.favoData)
        })
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
    getTags (){
      const tagQuery = `query {
        tags {
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
      }`
      dispatchGraphql(tagQuery).then((response) =>{
        this.tagData = response.tags
        console.log("tag data", this.tagData)
      }),
      dispatchGraphqlQuery('favourites', ['id', 'favourable_id','favourable_type','user_id']).then((response) => {
        this.favourites = response.favourites
      })
    },
    handleDetails(tag) {
      console.log("tttttttttttttttttttt", tag)
      this.tagId = tag
      console.log("tagId",this.tagId)
      this.tagsDetails = true
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
