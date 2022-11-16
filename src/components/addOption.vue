<template>
  <div>
    <div
      style="
        padding-bottom: 10px;
        opacity: 0.8;
        font-weight: 600;
        font-size: 16px;
      "
    >
      {{title}}
    </div>
    <div v-for="(sub, i) in store" :key="i" class="subtopic-add">
      <input v-model="sub.topic" type="text" />
      <img
        style="position: absolute; left: 211px; top: 3px"
        src="@/assets/images/sub3dot.png"
        alt=""
      />
    </div>
    <button
      style="
        width: 155px;
        height: 48px;
        background: white;
        border: none;
        color: #bc6c42;
        font-size: 12px;
        font-weight: 500;
        display: flex;
        justify-content: center;
        padding-top: 5px;
        margin-top: 10px;
      "
      @click="addSubTopic"
    >
      <img src="@/assets/images/add-topics.png" alt="" />
      <div style="margin-top: 12px; margin-left: 5px">{{btnText}}</div>
    </button>
  </div>
</template>
<script>
export default {
    props:['title','btnText','store'],
  data: () => ({
    req: {},

  }),
  methods: {
    addSubTopic() {
      this.store.push({ topic: "" });
    },
  },
  created(){
      this.store.push({ topic: "Lorem ipsum dolor sit" });
  }
};
</script>
<style>
.subtopic-add {
  position: relative;
  margin-bottom: 10px;
}
.subtopic-add input {
  box-shadow: 0px 1px 3px #11111112;
  border: 1px solid #bc6c42;
  border-radius: 4px;
  color: #bc6c42;
  font-size: 17px;
  line-height: 38px;
  padding: 0 15px;
}
</style>
