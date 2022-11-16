<template>
  <side-bar class="sheare-right-side" :show="show" @onClose="__onCancel">
    <div
      style="font-weight: bold; font-size: 20px; padding: 20px; color: #f3f3f3"
    >
      Chat
    </div>
    <el-tabs
      class="floatTabHeader studentTab"
      style="margin-top: 33px; padding: 20px"
      v-model="tab"
    >
      <el-tab-pane label="Received" name="tab1">
        <el-row>
          <el-col :span="4">
            <el-avatar
              :size="40"
              :src="require('@/assets/images/profile.jpg')"
            />
          </el-col>
          <el-col :span="10">
            <div class="text-white">Amit Goyal</div>
            <div style="color: #858585; font-size: 12px">Today 5:56 PM</div>
          </el-col>
        </el-row>
        <br />
        <el-row>
          <el-col :span="4" style="position: relative">
            <div
              style="
                width: 40px;
                height: 50px;
                background: #000000;
                opacity: 0.6;
                border-radius: 2px;
                position: absolute;
              "
              class="download-icon-book-ref"
            >
              <e-svg style="padding: 15px 11px" icon="downloadIcon"></e-svg>
            </div>
            <img src="@/assets/images/Rectangle9.png" alt="" />
          </el-col>
          <el-col :span="11">
            <div class="reference-book-info" style="color: #f3f3f3">
              Harry Potter and the Cursed child
            </div>
            <div style="color: #858585; font-size: 12px">By J.K. Rowling</div>
          </el-col>
          <el-col :span="2" :offset="3">
            <e-svg
              style="
                background: #353535;
                border-radius: 4px;
                display: inline-block;
                padding: 1px 4px;
              "
              icon="delIcon"
            ></e-svg>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Send" name="tab2"> </el-tab-pane>
    </el-tabs>
  </side-bar>
</template>
<script>
export default {
  components: {},
  props: {
    show: { type: Boolean, default: false },
    __onCancel: Function,
  },
  data: () => ({
    tab: "tab1",
  }),
};
</script>
<style>
/* .chat-right-side .el-drawer__header {
  display: none !important;
} */

.sheare-right-side .el-tabs__header {
  border-bottom: 1px solid #353535 !important;
}
.sheare-right-side .floatTabHeader.el-tabs.el-tabs--top > .el-tabs__header {
  position: inherit !important;
}
</style>
