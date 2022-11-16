<template>
  <div>
    <el-card shadow="none" style="margin: 5px" class="rounded-08 pg-50 cp">
      <div style="display: flex">
        <button
          style="border: none; background: transparent"
          v-tooltip.top-center="msg"
        >
          <e-svg icon="Group"> </e-svg>
        </button>
        <span
          style="
            font-size: 16px;
            padding: 0px 0px;
            opacity: 0.8;
            color: rgb(34, 34, 34);
            width: 102px;
          "
          >{{ text }}</span
        >
        <div style="width: 350px; padding-left: 17px">
          <e-progress :percentage="persentage"></e-progress>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  props: ["msg", "persentage", "text"],
};
</script>
