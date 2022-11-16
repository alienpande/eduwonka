<template>
  <right-side-bar :show="show" @onClose="__onCancel">
    <div style="height: 70vh; overflow: auto">
      <div style="opacity: 0.8;width:10rem; padding: 34px;color: white" class="f-600 fs-20">
        Post Answer
      </div>
      <div style="background: #1E1E1E;">
        <el-row>
          <div class="mg-t-20 mg-l-20 mg-r-20 tx-16 d-flex text-white">
            <!-- Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat -->
            {{ query.post}}
          </div>
        </el-row>
        <el-row class="mg-t-50">
          <div class="mg-t-5 mg-l-20 tx-16 tx-bolder d-flex text-white">
            Write Your Answer
          </div>
          <div class="mg-t-10 mg-l-20 mg-r-60">
            <es-input v-model="queryAnswer.comment"  placeholder="start typing..." />
          </div>
        </el-row>
        <br /><br />
      </div>
      <div class="mg-l-20 mg-r-30">
        <es-button text='Submit' @click="insertQuery()" :plain="true"></es-button>
      </div>
    </div>
  </right-side-bar>
</template>

<script>
import RightSideBar from "@/components/student/knowledge/rightSideBar.vue"
import {  dispatchGraphqlQueryByPk, dispatchGraphqlMutation } from "@/api/dispatcher";
import { getId } from '@/util/auth'
export default {
  components: { RightSideBar },
  props: {
    show: { type: Boolean, default: false },
    __onCancel: Function,
  },
  data: () => ({
    query: {},
    queryAnswer: {}
  }),
   created() {
    this.getQuery()
  },
  methods: {
    getvariables() {
      this.queryAnswer.user_id = getId()
      this.queryAnswer.query_id = this.$route.params.query_id
      console.log('queryAnswers', this.queryAnswer)
      return this.queryAnswer
    },
    getQuery: function() {
      dispatchGraphqlQueryByPk('queries',['id', 'post'],{id: this.$route.params.query_id}).then((response) => {
        this.query = response.queries_by_pk
      })
    },
    insertQuery() {
      dispatchGraphqlMutation('query_answers', ['id', 'comment'], this.getvariables()).then((response) => {
        console.log("query_answers", response);
      })
    }

  }
};
</script>
