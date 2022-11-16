<template>
  <div>
    <right-side-bar :show="show" @onClose="__onCancel">
      <div
        style="opacity: 0.8; display: block; width: 10rem; padding: 34px"
        class="f-600 fs-20"
      >
        Post Answer
      </div>
      <hr style="opacity: 0.2" />
      <div style="opacity: 0.6; margin-left: 40px" class="fs-20 f-500">
        Query
      </div>
      <div
        style="
          opacity: 0.8;
          font-weight: 600;
          font-size: 20px;
          padding: 20px 40px;
        "
      >
        {{query.post}}
      </div>
      <div style="background: #e6eaed;padding:0 20px;height:45vh;overflow:auto">
        <div style="padding:20px " class="f-600">Post Question</div>
           <textarea
          v-model="queryAnswer.comment"
          class="details-expenses__textarea"
          placeholder="Type here to add your Answer"
          rows="6"
          cols="170"
        ></textarea>
        <br/>
        <e-button @click="insertQuery" label='Post Answer' ></e-button>
        <br/>
        <br/>
        <br/>
      </div>
    </right-side-bar>
  </div>
</template>

<script>
import RightSideBar from "@/components/school/rightSideBar.vue";
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
      this.queryAnswer.query_id = this.$route.params.queryId
      console.log('queryAnswers', this.queryAnswer)
      return this.queryAnswer
    },
    getQuery: function() {
      dispatchGraphqlQueryByPk('queries',['id', 'post'],{id: this.$route.params.queryId}).then((response) => {
        this.query = response.queries_by_pk
      })
    },
    insertQuery() {
      dispatchGraphqlMutation('query_answers', ['id', 'comment'], this.getvariables()).then((response) => {
        console.log("show", response);
        this.$emit('input')
      })
    }

  }
};
</script>
