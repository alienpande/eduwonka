<template>
  <right-side-bar :show="show" @onClose="__onCancel">
    <div style="width: 321px" class="heading">
      Please provide the below details to create the group
    </div>
    <div
      style="width: 100%; height: 1px; background: #fcdfbd; display: block"
    ></div>
    <div style="padding: 40px 80px">
      <e-input
        v-model="req.name"
        placeholder="Senior Teachers"
        label="Name of the group"
      ></e-input>
      <div class="label">Select Members</div>
      <e-selected></e-selected>
      <!-- <e-select label="Select Members" v-model="req.select"></e-select> -->
    </div>
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    <el-row style="border-top: 1px solid #fcdfbd; margin-top: 10px">
      <el-col style="float: right" :span="20">
        <e-button
          :span="15"
          label="Cancel"
          width="120"
          css="cancel-custom"
          type="default"
          class="p-45"
        ></e-button>
        <e-button
          :span="8"
          label="Share"
          width="120"
          css="float-right"
          class="p-45"
        ></e-button>
      </el-col>
    </el-row>
  </right-side-bar>
</template>
<script>
import RightSideBar from "@/components/school/rightSideBar.vue";
export default {
  components: { RightSideBar },
  props: {
    show: { type: Boolean, default: false },
    __onCancel: Function,
  },
  data: () => ({
    activeList: "activeone",
    req: {},
  }),
};
</script>
