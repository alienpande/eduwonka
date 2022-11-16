<template>
  <div>
    <div
      style="display: flex; margin-bottom: 10px; justify-content: space-between"
    >
      <div class="head-title">{{ title }}</div>
      <img
        style="margin-top: 10px"
        src="@/assets/images/rightArrowCircile.png"
        alt=""
      />
    </div>
  </div>
</template>
<script>
export default {
  props: ["title"],
};
</script>
