<template>
  <div>
    <slot name="header" />
    <el-row :gutter="gutter" :class="css">
      <el-col
        :span="span"
        v-for="(item, index) in obj"
        v-bind:item="item"
        v-bind:key="index"
      >
        <el-row
          class="dashCard"
          :class="item.icon + ' ' + (item.last ? 'analytics' : '')"
        >
          <el-col :span="8" class="dashcard-col">
            <e-svg :icon="item.icon" css="dashCardFIcon" />
          </el-col>
          <el-col :span="15" :offset="1" class="dashcard-col">
            <p class="dashcard-title">{{ item.title }}</p>
            <p class="dashcard-value">
              {{ item.value }}
            </p>
          </el-col>
          <el-col
            :span="24"
            v-if="item.last"
            v-html="item.last"
            class="last dashcard-col"
          ></el-col>
        </el-row>
      </el-col>
    </el-row>
    <slot name="footer" />
  </div>
</template>
<script>
export default {
  props: {
    span: {
      type: Number,
      default: 8,
    },
    gutter: {
      type: Number,
      default: 20,
    },
    css: {
      type: String,
      default: "dashcardRows",
    },
    obj: {
      type: Array,
      default() {
        return [];
      },
    }
  },
};
</script>
<style scoped>

.dashcardRows{
  display: flex;
  flex-wrap: wrap;
  row-gap: 20px;
}

@media only screen and (max-width: 1124px) and (min-width:768px){
.dashcardRows > div{
  width: 50% !important;
}
}

@media only screen and (device-width: 767px) {
  .dashcard-col {
    font-size: 10px;
  }

}

@media only screen and (max-width:767px){
    .dashcardRows{
      row-gap: 10px;
    }
    .dashcardRows > div{
    width: 100% !important;
    /* margin-bottom: 15px; */
  }

}

</style>