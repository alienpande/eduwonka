<template>
  <div>
    <vue-ellipse-progress
      :progress="percent"
      :thickness="6"
      emptyThickness="10%"
      :size="width"
    />
  </div>
</template>
<script>
export default {
  props: ["width", "percent"],
};
</script>
<style></style>
