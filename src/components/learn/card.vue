<template>
  <div style="border-radius: 10px; background: white">
    <div
      style="
        border-radius: 10px 10px 0px 0px;
        color: #bc6c42;
        font-size: 18px;
        font-weight: 600;
        background: #e6eaed;
        padding: 10px 21px;
      "
    >
      {{ title }}
    </div>
    <div :class="{'padding-zero' : padding}" style="padding: 20px">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  props: ["title", "padding"],
};
</script>
<style >
.padding-zero{
    padding:0px !important;
}
</style>
