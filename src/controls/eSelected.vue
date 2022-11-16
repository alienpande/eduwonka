<template>
  <div>
    <div
      @click="inputBar = !inputBar"
      style="
        width: 208px;
        height: 48px;
        box-shadow: 0px 3px 6px #00000029;
        border: 1px solid #bc6c42;
        background: white;
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        color: #bc6c42;
        cursor:pointer;
        font-weight: 500;
      "
      :class="{ 'toggle-design': !inputBar && !customColor    }"
    >
      <div style="padding: 12px 0 0 16px"> {{placeholder || 'Shawn Fernando'}} </div>
      <img
        style="height: 20px; margin-top: 12px; margin-right: 12px"
        v-if="inputBar"
        src="@/assets/images/upIcon.png"
        alt=""
      />
      <e-svg
        icon="arrow"
        style="transform: rotate(90deg); margin-right: 37px; margin-top: -4px"
        v-if="!inputBar"
      ></e-svg>
    </div>

    <div
      v-if="inputBar"
      style="
        width: 208px;
        box-shadow: 0px 3px 6px #00000029;
        border: 1px solid #bc6c42;
        background: white;
        margin-top: 10px;
        border-radius: 10px;
        position: absolute;
        z-index:99999;
      "
    >
      <div style="position: relative; margin: 9px">
        <img
          class="selected-search-icon"
          src="@/assets/images/search-icon.png"
          alt=""
        />
        <input
          type="text"
          placeholder="search"
          class="selected-input"
          name=""
          id=""
        />
      </div>
      <div>
        <div class="d-flex" style="margin: 5px 0" v-for="i in 5" :key="i">
          <el-avatar
            style="margin-left: 13px"
            :size="34"
            :src="require('@/assets/images/profile.jpg')"
          />
          <div style="color: #4d4f5c; margin: 4px 0px 0 12px">
            Paul Fernandis
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:['placeholder','customColor'],
  data: () => ({
    inputBar: false,
  }),
};
</script>
<style scoped>
.selected-input {
  border: 1px solid #bc6c42;
  border-radius: 24px;
  width: 142px;
  padding-left: 43px;
  font-size: 12px;
  height: 38px;
}
.selected-input::placeholder {
  color: #bc6c42;
}
.selected-search-icon {
  position: absolute;
  margin: 7px 0 0 9px;
}
.toggle-design {
  border: 1px solid #4d4f5c !important;
  color: black !important;
}
</style>
