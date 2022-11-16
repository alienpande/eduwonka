<template>
  <div style="padding: 20px; overflow: auto; height: 72vh">
    <el-row>
      <el-col
        style="color: #000000cc; font-weight: 500; font-size: 24px"
        :span="5"
      >
        All Files
      </el-col>
      <el-col :offset="16" :span="3">
        <e-button
          label="New"
          @click="addNew = true"
          icon="el-icon-plus"
        ></e-button>
      </el-col>
    </el-row>
    <br />
    <el-row
      v-if="filter.length > 0"
      :gutter="20"
      style="
        padding: 20px 0px 20px 0px;
        margin: 0px 0px 5px 0px;
        background: white;
      "
    >
      <el-col :span="3" style="padding-left: 35px">
        <e-dropdown :list="filter" primary />
      </el-col>
      <el-col :span="3" style="padding-left: 35px" class="primary-text"
        ><e-dropdown :list="filter2" primary
      /></el-col>
      <el-col :span="3" style="color: #bc6c42; font-size: 16px"
        >Clear filter</el-col
      >
      <el-col style="padding-left: 10px" :offset="13" :span="1">
        <e-button
          icon="el-icon-search"
          :plain="true"
          css="bg-tranparent"
        ></e-button>
      </el-col>
    </el-row>
    <div style="color: #00000099" class="fs-20 f-500">Recently Opened</div>
    <file
      v-for="(file, i) in files"
      :key="i + 100"
      :icon="file.icon"
      :title="file.title"
      :showOption='optionIndex===i + 100'
      @rename="showRename = true"
      @properties="showProperties = true"
      @handleOption='handleOption(i + 100, $event)'
    />
   
    <br />
    <div style="color: #00000099" class="fs-20 f-500">Your Folders</div>
    <folder v-for="(name, i) in folders" :key="i" :name="name" />
    <br />
    <br />
    <e-button label="View more" css="sort-icon" :plain="true"></e-button>
    <br />
    <br />
    <br />
    <div style="color: #00000099" class="fs-20 f-500">All Files</div>
    <file
      v-for="(file, i) in files2"
      :key="i + 10"
      :icon="file.icon"
      :title="file.title"
       :showOption='optionIndex===i'
      @rename="showRename = true"
      @properties="showProperties = true"
      @handleOption='handleOption(i)'
    />
    <e-dialog
      v-model="addNew"
      width="70%"
      top="20vh"
      noEsc
      :gutter="20"
      hideDefaultFooter
      @cancel="addNew = false"
      @confirm="addNew = false"
    >
      <ad-new />
    </e-dialog>
    <e-dialog
      title="Rename File"
      v-model="showRename"
      width="40%"
      top="20vh"
      noEsc
      :gutter="20"
      hideDefaultFooter
      @cancel="showRename = false"
      @confirm="showRename = false"
    >
      <e-input label="Name of the folder" v-model="rename" />
    </e-dialog>

    <e-dialog
      v-model="showProperties"
      width="60%"
      top="20vh"
      noEsc
      :gutter="20"
      hideDefaultFooter
      @cancel="showProperties = false"
      @confirm="showProperties = false"
    >
     <view-propertise/>
    </e-dialog>
  </div>
</template>
<script>
import adNew from "@/components/digitalLibrary/addNew.vue";
import viewPropertise from '@/components/digitalLibrary/viewPropertiseModal.vue'
export default {
  components: { adNew ,viewPropertise},
  data: () => ({
    addNew: false,
    optionIndex:'',
    showRename: false,
    showProperties: false,
    rename: "",
    files: [
      {
        title: "Holiday Circular",
        icon: "file",
      },
      {
        title: "Exam Circular",
        icon: "excel",
      },
      {
        title: "Class X time table",
        icon: "play",
      },
      {
        title: "Class X Exam paper",
        icon: "music",
      },
    ],
    files2: [
      {
        title: "Holiday Circular",
        icon: "file",
      },
      {
        title: "Exam Circular",
        icon: "excel",
      },
      {
        title: "Class X time table",
        icon: "play",
      },
      {
        title: "Class X Exam paper",
        icon: "music",
      },
      {
        title: "Holiday Circular",
        icon: "file",
      },
      {
        title: "Exam Circular",
        icon: "excel",
      },
      {
        title: "Class X time table",
        icon: "play",
      },
      {
        title: "Class X Exam paper",
        icon: "music",
      },
      {
        title: "Holiday Circular",
        icon: "file",
      },
      {
        title: "Exam Circular",
        icon: "excel",
      },
      {
        title: "Class X time table",
        icon: "play",
      },
      {
        title: "Class X Exam paper",
        icon: "music",
      },
      {
        title: "Holiday Circular",
        icon: "file",
      },
      {
        title: "Exam Circular",
        icon: "excel",
      },
      {
        title: "Class X time table",
        icon: "play",
      },
      {
        title: "Class X Exam paper",
        icon: "music",
      },
      {
        title: "Holiday Circular",
        icon: "file",
      },
      {
        title: "Exam Circular",
        icon: "excel",
      },
      {
        title: "Class X time table",
        icon: "play",
      },
      {
        title: "Class X Exam paper",
        icon: "music",
      },
    ],
    folders: [
      "Annual Function Photos",
      "Final Exam Question paper",
      "My collection",
    ],
    filter: [
      { text: "Standard" },
      { text: "Standard 2" },
      { text: "Standard 3" },
    ],
    filter2: [
      { text: "Subject" },
      { text: "Subject 1" },
      { text: "Subject 2" },
    ],
  }),
  methods:{
    handleOption(i){
      if (this.optionIndex===i) {
        this.optionIndex=''
      }else{
        this.optionIndex=i
      }
      
    }
  }
};
</script>
