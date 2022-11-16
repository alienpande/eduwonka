<template>
  <el-card body-style="padding:30px;" class=" rounded-08">
    <div class="tx-bold">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
    </div>
    <div class="row mg-t-40">
      <div class="col-5">
        Due Date
        <div class="tx-bold">14th July 2020</div>
      </div>
      <div class="col-5">
        Score
        <div class="tx-bold">76/100</div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    results: {
      type: Array
    }
  },
  name: "ReportDetailCard",
  created() {
    console.log('results',this.results)
  }
};
</script>

<style>
</style>