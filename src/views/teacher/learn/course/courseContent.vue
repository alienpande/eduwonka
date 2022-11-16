<template>
  <div style="overflow: auto; height: 80vh">
    <el-row style="display: flex; padding: 15px">
      <el-col :span="16" style="display: flex">
        <e-svg @click="$router.push($url.LN_COURSES)" icon="back"></e-svg>
        <div
          style="
            color: #11141a;
            font-weight: 500;
            font-size: 24px;
            opacity: 0.8;
            margin-top: 7px;
            margin-left: 20px;
          "
        >
          Course content
        </div>
      </el-col>
    </el-row>
    <div class="class-info" style="padding-left: 84px">
      <div
        style="
          background: white;
          display: inline-block;
          padding: 11px 22px;
          border-radius: 10px;
          color: rgb(0 0 0 / 60%);
          font-size: 16px;
          margin-right: 10px;
        "
      >
        Class 6A
      </div>
      <div
        style="
          background: white;
          display: inline-block;
          padding: 11px 22px;
          border-radius: 10px;
          color: rgb(0 0 0 / 60%);
          font-size: 16px;
          margin-right: 10px;
        "
      >
        Mathematics
      </div>
    </div>

    <div style="padding: 0 30px">
      <el-row>
        <el-col :span="11">
          <div class="heading">About the topic</div>
          <el-card shadow="none" class="rounded-08 pg-50 cp">
            <div style="opacity: 0.6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              egestas pretium magna id euismod. Etiam molestie tristique nulla,
              at fermentum felis imperdiet viverra. Suspendisse nisl lectus,
              molestie cursus leo quis, dapibus dapibus lectus. Etiam ornare
              interdum pellentesque. Pellentesque erat arcu, suscipit eu ex sed,
              fermentum elementum nibh. Duis feugiat lectus sit amet risus
              pretium aliquet. Integer posuere suscipit tellus vel posuere. Sed
              aliquet faucibus ligula eu accumsan. Proin at odio pellentesque
            </div>
          </el-card>
          <div style="display: flex; justify-content: space-between">
            <div class="heading">References</div>
            <e-button
              class="btn"
              :span="6"
              icon="el-icon-plus"
              label="Add Link"
              @click="addRef=true"
              :plain="true"
              style="margin-top: 15px"
            />
          </div>
          <el-card shadow="none" class="rounded-08 pg-50 cp">
            <div
              v-for="(txt, i) in refTxt"
              :key="i"
              style="
                border: 1px solid #000000;
                border-radius: 10px;
                display: flex;
                justify-content: space-between;
                padding: 10px 9px;
                margin-bottom: 15px;
              "
              class="ref-section"
            >
              <div style="display: flex">
                <img
                  class="ref-color"
                  src="@/assets/images/ref-icon-color.png"
                  alt=""
                />
                <img
                  class="ref-black"
                  src="@/assets/images/ref-icon-black.png"
                  alt=""
                />
                <div
                  class="fs-16 ref-txt"
                  style="opacity: 0.8; margin-left: 10px"
                >
                  {{ txt.text }}
                </div>
              </div>

              <img
                class="color-dot"
                src="@/assets/images/3dotcolor.png"
                alt=""
              />

              <img
                class="dot-white"
                src="@/assets/images/dotwhite.png"
                alt=""
              />
            </div>
          </el-card>
        </el-col>
        <el-col :span="8" :offset="1">
          <div style="display: flex; justify-content: space-between">
            <div class="heading">Documents</div>
            <e-button
              class="btn"
              :span="11"
              icon="el-icon-plus"
              @click="addDocument = true"
              label="Add Document"
              :plain="true"
              style="margin-top: 15px"
            />
          </div>
          <el-card shadow="none" class="rounded-08 pg-50 cp">
            <el-row>
              <el-col :span="11" v-for="i in 7" :key="i">
                <div
                  class="document-section"
                  style="
                    border: 1px solid #000000;
                    border-radius: 10px;
                    padding: 18px;

                    margin: 9px;
                  "
                >
                  <div style="display: flex; justify-content: space-between">
                    <e-svg class="attach-icon" icon="Attachment-icon"></e-svg>
                    <img
                      class="color-attach"
                      src="@/assets/images/attachcolor.png"
                      alt=""
                    />

                    <img src="@/assets/images/dotwhite.png" alt="" />
                  </div>
                  <div
                    style="width: 81px; margin-top: 20px"
                    class="fs-16 doc-text"
                  >
                    Study data.pdf
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <e-dialog
      :title="'Add a document '"
      v-model="addDocument"
      width="40%"
      top="20vh"
      noEsc
      :gutter="20"
      hideDefaultFooter
      @cancel="addDocument = false"
      @confirm="addDocument = false"
    >
      <div
        style="
          height: 1px;
          width: 100%;
          opacity: 0.4;
          background: #ba6c47;
          margin-top: -20px;
          margin-bottom: 15px;
        "
      ></div>
      <e-input
        :span="14"
        v-model="req.doc"
        name="Name of the Document"
        placeholder="Text Field"
        style="margin-left: 7px"
      ></e-input>
      <br />
      <el-col :span="18">
        <div style="color: #111111; margin-left: 7px" class="fs-16">
          Upload attachments
        </div>
        <e-button
          class="btn"
          :span="13"
          icon="el-icon-plus"
          label="Upload attachment"
          :plain="true"
          style="margin-top: 15px"
        />

        <e-button
          class="btn"
          :span="13"
          icon="el-icon-plus"
          label="Add Document"
          style="margin-top: 65px"
        />
      </el-col>
    </e-dialog>

    <e-dialog
      :title="'Add a Reference '"
      v-model="addRef"
      width="40%"
      top="20vh"
      noEsc
      :gutter="20"
      hideDefaultFooter
      @cancel="addRef = false"
      @confirm="addRef = false"
    >
      <div
        style="
          height: 1px;
          width: 100%;
          opacity: 0.4;
          background: #ba6c47;
          margin-top: -20px;
          margin-bottom: 15px;
        "
      ></div>
      <e-input
        :span="14"
        v-model="req.ref"
        name="Name of the Reference"
        placeholder="Text Field"
        style="margin-left: 7px"
      ></e-input>
      <e-input
        :span="14"
        v-model="req.url"
        name="Add the URL"
        placeholder="Text Field"
        style="margin-left: 7px"
      ></e-input>
      <br />
      <el-col :span="18">
        

        <e-button
          class="btn"
          :span="13"
          icon="el-icon-plus"
          label="Add Reference"
          style="margin-top: 35px"
        />
      </el-col>
    </e-dialog>
  </div>
</template>
<script>
export default {
  data: () => ({
    addDocument: false,
    addRef:false,
    req: {},
    refTxt: [
      {
        text: "Statistic article",
      },
      {
        text: "Introduction article",
      },
      {
        text: "About the invention",
      },
      {
        text: "Story of fight",
      },
    ],
  }),
};
</script>
<style>
.color-attach {
  visibility: hidden;
  height: 35px;
  margin-top: -10px;
  margin-left: -5px;
  margin-bottom: 4px;
}
.attach-icon {
  visibility: visible;
}
.document-section:hover {
  box-shadow: 0px 13px 21px #00000026;
}
.document-section:hover .doc-text {
  color: #bc6c42;
}

.document-section:hover .color-attach {
  visibility: visible !important;
}
.document-section:hover .attach-icon {
  visibility: hidden !important;
  display: none;
}

.color-dot {
  margin-top: -9px;
  display: none;
  margin-right: 3px;
  width: 13px;
  height: 34px;
  margin-top: -6px;
}
.dot-white {
  display: block;
}
.ref-section:hover {
  box-shadow: 0px 13px 21px #00000026;
  border: 1px solid #bc6c42 !important;
}

.ref-color {
  display: none;
  margin-top: -1px;
  margin-left: 2px;
}
.ref-black {
  display: block;
}

.ref-section:hover .color-dot {
  display: block;
}

.ref-section:hover .dot-white {
  display: none;
}
.ref-section:hover .ref-txt {
  color: #bc6c42;
}
.ref-section:hover .ref-color {
  display: block;
}

.ref-section:hover .ref-black {
  display: none;
}
.el-dialog__title {
  font-size: 24px;
  font-weight: 500;
  color: #4d4f5c;
}
</style>
