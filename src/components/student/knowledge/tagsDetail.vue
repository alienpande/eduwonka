<template>
  <right-side-bar :show="show" @onClose="__onCancel">
    <div>
      <div style="opacity: 0.8; display: block; width: 10rem; padding: 34px" class="text-white f-600 fs-20" >
        {{ tag.name }}
        <!-- tagname -->
      </div>
      <el-row class="text-center mg-x-30 pd-10">
        <el-col :span="5" class="text-white">
          <span class="tx-14" style="opacity: 60%">Standard</span>
          <div class="tx-bolder mg-t-5"> {{ getStandard(tag.subject.standard_subjects) }}</div>
        </el-col>
        <el-col :span="8" :offset="1" class="text-white">
          <span class="tx-14" style="opacity: 60%">Total Queries</span>
          <div class="tx-bolder mg-t-5">{{ tag.query_tags.length }}</div>
        </el-col>
        <el-col :span="9" :offset="1" class="text-white">
          <span class="tx-14" style="opacity: 60%">Queries Answered</span>
          <div class="tx-bolder mg-t-5">{{ getAnswersCount(tag.query_tags) }}</div>
        </el-col>
      </el-row>
      <el-row class="mg-l-10 mg-r-10 mg-t-20">
        <el-card class="rounded-08 bg-black-3" :style="'border: none'" shadow="none">
          <el-row>
            <el-col :span="17">
              <span class="tx-18 tx-bolder text-white">Top Queries</span>
            </el-col>
            <el-col :span="7">
              <es-button text="View All" />
            </el-col>
          </el-row>
          <hr style="opacity: 15%">
          <el-row class="mg-t-10"  v-for="qt in tag.query_tags" :key="qt">
            <el-col class="text-white" :span="2" :offset="1">
              <span class="tx-24 tx-bolder">.</span>
            </el-col>
            <el-col class="text-white" :span="19">
              <span class="tx-16">
                {{ qt.query.post }}
                  <!-- Lorem ipsum dolor sit amet, consetetur sadipscing elitr -->
              </span>
            </el-col>
          </el-row>
        </el-card>
      </el-row>
      <!-- <el-row class="mg-l-10 mg-r-10 mg-t-20">
        <el-card class="rounded-08 bg-black-3" :style="'border: none'" shadow="none">
          <el-row>
            <el-col :span="17">
              <span class="tx-18 tx-bolder text-white">Other Queries</span>
            </el-col>
            <el-col :span="7">
              <es-button text="View All" />
            </el-col>
          </el-row>
          <hr class="mg-t-20" style="opacity: 15%">
          <el-row class="mg-t-15" v-for="i in 4" :key="i">
            <el-col class="text-white" :span="2" :offset="1">
              <span class="tx-24 tx-bolder">.</span>
            </el-col>
            <el-col class="text-white" :span="19">
              <span class="tx-16">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              </span>
            </el-col>
          </el-row>
        </el-card>
      </el-row> -->
      <br />
    </div>
  </right-side-bar>
</template>
<script>
import RightSideBar from "@/components/student/knowledge/rightSideBar.vue"
import { dispatchGraphql } from "@/api/dispatcher"

export default {
  components: { RightSideBar },
  props: {
    tagId: { type: String },
    show: { type: Boolean, default: false },
    __onCancel: Function,
  },
  data: () => ({
    tag: {},
    ans: []
  }),
  created() {
    console.log('get id tag id ', this.tagId)
    this.getTagDetails()
  },
  methods: {
    getStandard(val) {
      return val[0].standard.name
    },
    // getAnswers(val) {
    //   var count = 0
    //   const query = val.map(x => x.query)
    //   for (const item of query) {
    //     if (item.query_answers.length > 0) {
    //       count++
    //     }
    //   }
    //   return count
    // },
    getTagDetails() {
      const query = `query($id: uuid!){
        tags_by_pk(id: $id) {
          id
          name
          query_tags {
            id
            query {
              id
              post
              query_answers {
                id
                comment
              }
            }
          }
          subject {
            id
            name
            standard_subjects {
              id
              standard {
                id
                name
              }
            }
          }
        }
      }`
      dispatchGraphql(query,{ id: this.tagId }).then((response) =>{
        this.tag = response.tags_by_pk
        console.log("ttttt", this.tag)
      })
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
     },
  }
};
</script>
