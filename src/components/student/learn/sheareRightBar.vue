<template>
  <side-bar class="chat-right-side" :show="show" @onClose="__onCancel">
    <div
      style="font-weight: bold; font-size: 20px; padding: 20px; color: #f3f3f3"
    >
      Send/ Receive Files
    </div>
    <el-tabs
      class="floatTabHeader studentTab"
      style="margin-top: 33px; padding: 20px"
      v-model="tab"
    >
      <el-tab-pane label="Received" name="tab1">
        <el-card
          v-for="i in 2"
          :key="i"
          class="rounded-08 bg-black-2"
          style="border: none; margin-bottom: 20px"
          shadow="none"
        >
          <div
            style="
              display: flex;
              justify-content: space-between;
              border-bottom: 1px solid #404040;
              padding-bottom: 5px;
            "
          >
            <div class="text-white">Amit Goyal</div>
            <div style="color: #858585; font-size: 12px">Today 5:56 PM</div>
          </div>
          <el-row
            class="book-ref"
            v-for="j in i + 1"
            :key="j"
            style="margin: 15px 0"
          >
            <el-col :span="5" style="position: relative">
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
            <el-col :span="2" :offset="6">
              <e-svg
                style="
                  background: #353535;
                  border-radius: 4px;
                  display: inline-block;
                  padding: 1px 4px;
                  margin-top: 15px;
                "
                class="del-icon-sheare"
                icon="delIcon"
              ></e-svg>
            </el-col>
          </el-row>
        </el-card>
        <br />
      </el-tab-pane>
      <el-tab-pane label="Send" name="tab2">
        <div
          style="
            background: #353535;
            border: 1px dashed #575757;
            border-radius: 8px;

            padding: 20px 0;
          "
        >
          <e-svg style="display: table; margin: auto" icon="uploadIcon">
          </e-svg>
          <div style="color: #cfcfcf; text-align: center; font-size: 12px">
            Drag & drop file here or Click to add
          </div>
        </div>
        <br />
        <div class="hr"></div>
        <br />
        <div style="color: #f3f3f3" class="fs-16 f-600">Uploaded Files</div>

        <el-row v-for="i in 4" :key="i" style="margin: 10px 0">
          <el-col :span="5" style="position: relative">
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
          <el-col :span="13">
            <div class="reference-book-info" style="color: #f3f3f3">
              Harry Potter and the...
            </div>
            <div style="color: #858585; font-size: 12px">234 KB</div>
          </el-col>
          <el-col :span="6">
              <es-load percent='34' width='50'></es-load>

          </el-col>
        </el-row>
        <br />
        <div class="hr"></div>
        <br />
        <es-select placeholder="Send to: All Students"></es-select>
        <br />
        <br />
        <br />
        <es-button text="Send File" :plain="true"></es-button>
      </el-tab-pane>
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
.chat-right-side .el-drawer__header {
  display: none !important;
}

.chat-right-side .el-tabs__header {
  border-bottom: 1px solid #353535 !important;
}
.chat-right-side .floatTabHeader.el-tabs.el-tabs--top > .el-tabs__header {
  position: inherit !important;
}
.download-icon-book-ref,
.del-icon-sheare {
  display: none !important;
}
.book-ref:hover .download-icon-book-ref {
  display: block !important;
}
.book-ref:hover .del-icon-sheare {
  display: inline-block !important;
}
.book-ref:hover .reference-book-info {
  color: #1492e6 !important;
}
</style>
