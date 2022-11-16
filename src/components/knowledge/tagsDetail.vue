<template>
  <div>
    <right-side-bar :show="show" @onClose="__onCancel">
      <div style="opacity: 0.8; display: block; width: 10rem; padding: 34px" class="f-600 fs-20" >
        {{ tag.name }}
      </div>
      <hr style="opacity: 0.2" />
      <div class="pd-x-30 pd-10 pd-b-30">
        <el-card shadow="none" style="background: rgba(248, 243, 238, 0.35)" class="rounded-08 text-center classroom-right__slide">
          <el-row style="opacity: 0.8">
            <el-col :span="12" style="border-right: 2px solid #fcdfbd; border-bottom: 2px solid #fcdfbd; padding: 10px;">
              <span>Standard</span> <br />
              <span style="color: rgb(0, 0, 0); font-weight: bold">
                {{ getStandard(tag.subject.standard_subjects) }}
              </span>
            </el-col>
            <el-col :span="12" style="border-bottom: 2px solid #fcdfbd; padding: 10px">
              <span>Subject</span> <br />
              <span style="color: rgb(0, 0, 0); font-weight: bold">
                {{ tag.subject.name }}
              </span>
            </el-col>
            <el-col style="border-right: 2px solid #fcdfbd; padding: 10px" :span="12">
              <span>Total queries</span> <br />
              <span style="color: rgb(0, 0, 0); font-weight: bold">
                {{ tag.query_tags.length }}
              </span>
            </el-col>
            <el-col style="padding-top: 10px" :span="12">
              <span>Queries answered</span> <br />
              <span style="color: rgb(0, 0, 0); font-weight: bold">
                {{ getAnswers(tag.query_tags) }}
              </span>
            </el-col>
          </el-row>
        </el-card>
         </div>
        <div style="background: #e6eaed;padding:0 20px;height:35vh;overflow:auto">
          <div style="display: flex; padding: 20px; justify-content: space-between;">
            <div class="f-600">Posted Queries</div>
            <button style="color: #BC6C42;border: 1px solid #BC6C42; border-radius: 18px; padding: 5px 17px;">See All</button>
          </div>
          <el-card shadow='none' style="margin-top:10px;font-size:12px"  v-for="qt in tag.query_tags" :key="qt">
            {{ qt.query.post }}
          </el-card>
        <!-- <div style="padding:20px " class="f-600">Other Queries</div>
          <el-card shadow='none' style="margin-top:10px;font-size:12px">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
            sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
            rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
            ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
            et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
            takimata sanctus est Lorem ipsum dolor sit amet.
          </el-card> -->
        </div>
    </right-side-bar>
  </div>
</template>
<script>
import RightSideBar from "@/components/school/rightSideBar.vue";
import { dispatchGraphql } from "@/api/dispatcher"

export default {
  components: { RightSideBar },
  props: {
    tagId: { type: String },
    show: { type: Boolean, default: false },
    __onCancel: Function,
  },
  data: () => ({
    tag: {}
  }),
  created() {
    // console.log('idddddddddddddd', this.tagId)
    this.getTagDetails()
  },
  methods: {
    getStandard(val) {
      return val[0].standard.name
    },
    getAnswers(val) {
      var count = 0
      const query = val.map(x => x.query)
      for (const item of query) {
        if (item.query_answers.length > 0) {
          count++
        }
      }
      return count
    },
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
        console.log("tag data", this.tag)
      })
    }
  }
};
</script>
