<template>
  <div style="padding: 20px; overflow: auto; height: 72vh">
    <el-row>
      <el-col :span="6" style="display: flex">
        <e-svg icon="back" @click="$router.push($url.DL_ALL_FILES)" />
        <div
          style="
            color: #000000cc;
            font-size: 24px;
            font-weight: 500;
            margin-top: 8px;
            margin-left: 10px;
          "
        >
          Share File
        </div>
      </el-col>
      <el-col :span="4" :offset="12">
        <div
          style="
            display: flex;
            box-shadow: rgb(0 0 0 / 5%) 0px 3px 15px;
            border-radius: 4px;
            width: 164px;
            background: white;
            padding: 14px 32px;
          "
        >
          <e-svg icon="file-icon" />
          <div style="font-weight: 600; color: #00000099; margin-left: 15px">
            Holiday Circular
          </div>
        </div>
      </el-col>
    </el-row>
    <br /><br /><br /><br /><br />
    <div style="padding: 0 30px">
      <el-tabs class="floatTabHeader" v-model="activeName">
        <el-tab-pane label="Student" name="Student"> </el-tab-pane>
        <el-tab-pane label="Teacher" name="Teacher"> </el-tab-pane>
        <el-tab-pane label="Management" name="Management"> </el-tab-pane>
        <el-tab-pane label="Non - teaching staff" name="active"> </el-tab-pane>
        <el-tab-pane label="Group" name="Group">
          <el-row>
            <el-col
              style="color: #000000cc; font-size: 20px; font-weight: 500"
              :span="5"
            >
              Choose Group
            </el-col>
            <el-col :span="4" :offset="14">
              <e-button
                label="Create Group"
                icon="el-icon-plus"
                :plain="true"
                css="sort-icon"
                @click="showSideBar=true"
              ></e-button>
            </el-col>
          </el-row>
          <br />
          <el-card class="shearefile-card" shadow="none">
            <div style="width: 80%">
              <div class="add-more-lorem">
                <div
                  class="lorem-boxs"
                  v-for="(lorem, i) in addedLorem"
                  :key="i"
                >
                  <div>{{ lorem }}</div>
                  <img
                    style="cursor: pointer"
                    @click="deleteLorem(i)"
                    src="@/assets/images/loremCross.png"
                  />
                </div>
                <input
                  type="text"
                  v-model="addLorem"
                  v-on:keyup.enter="addLoremEvent"
                  placeholder="Add more Groups"
                />
              </div>

              <div style="border: 1px solid #cccccccc">
                <div
                  v-for="(Select, i) in loremSelect"
                  :key="i"
                  class="lorem-check"
                  style="margin: 5px 15px; display: inline-block; width: 10rem"
                >
                  <el-checkbox class="class-checkbox"></el-checkbox>
                  <div
                    style="
                      color: #00000099;
                      display: inline-block;
                      margin-left: 10px;
                    "
                  >
                    {{ Select }}
                  </div>
                </div>
              </div>
            </div>
            <e-select
              class="editor-select"
              :span="4"
              style="margin-left: 10px"
              placeholder="Editor"
              :options="editors"
              v-model="editorValue"
            >
            </e-select>
          </el-card>
          <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px">
            <el-col style="float: right" :span="10">
              <e-button
                :span="15"
                label="Cancel"
                width="180"
                css="cancel-custom"
                type="default"
                class="p-45"
              ></e-button>
              <e-button
                :span="8"
                label="Share"
                width="180"
                css="float-right"
                class="p-45"
              ></e-button>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
     <sheare-file-right
            :show="showSideBar"
            :__onCancel="() => (showSideBar = !showSideBar)"
          />
  </div>
</template>
<script>
import sheareFileRight from '@/components/digitalLibrary/sheareFileRight.vue'
export default {
  components:{sheareFileRight},
  data: () => ({
    activeName: "Group",
    showSideBar:false,
    addLorem: "",
    addedLorem: ["lorem", "lorem"],
    editorValue: "Editor",
    editors: [
      {
        label: "Viwer",
        value: "Viwer",
      },
      {
        label: "Commentor",
        value: "Commentor",
      },
      {
        label: "Editor",
        value: "Editor",
      },
    ],
    loremSelect: [
      "Class X",
      "Staff",
      "Non teaching",
      "Senior Teacher",
      "Select",
      "Select",
      "Select",
      "Select",
      "Select",
      "Select",
      "Select",
      "Select",
      "Select",
      "Select",
      "Select",
      "Select",
      "Select",
      "Select",
      "Select",
      "Select",
    ],
  }),
  methods: {
    addLoremEvent() {
      this.addedLorem.push(this.addLorem);
      this.addLorem = "";
    },
    deleteLorem(i) {
      this.addedLorem.splice(i, 1);
    },
  },
};
</script>
<style>
.add-more-lorem {
  border: 1px solid #cccccccc;
  display: flex;
  flex-wrap: wrap;
}
.add-more-lorem input {
  font-size: 16px;
  padding: 14px 17px;
  flex: 1;
  border: none;
  background: transparent;
}
.lorem-boxs {
  box-shadow: 0px 1px 3px #11111112;
  border: 1px solid #bc6c42;
  border-radius: 4px;
  color: #bc6c42;

  font-size: 16px;
  font-weight: 600;
  padding: 3px 0;
  margin: 13px 8px;
  text-align: center;
  display: flex;
}
.lorem-boxs div {
  display: inline-block;
  padding: 0 10px;
}
.lorem-boxs img {
  height: 20px;
  margin-bottom: -4px;
  padding-right: 5px;
  padding-top: 2px;
}

.lorem-check .el-checkbox__inner {
  background: #fcdfbd66;
}
.shearefile-card .el-card__body {
  display: flex;
}
.editor-select{
  margin-top: -5px;
}
.editor-select .el-input--suffix .el-input__inner {
  background: #bc6c4280 !important;
  border: 1px solid #cccccc !important;
  height: 75px;

  color: #00000099;
  font-size: 20px;
  font-weight: 500;
}
.shearefile-card .el-col-4 {
  width: 176px !important;
}
.class-checkbox .el-checkbox__input{
  z-index: 0;
}
</style>
