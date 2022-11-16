<template>
  <div>
    <div class="messenger-header">
      <div>Contact Directory</div>
      <e-svg icon="close2" />
    </div>
    <div style="margin-top: 30px; padding: 0 60px">
      <el-tabs class="floatTabHeader" v-model="activeName">
        <el-tab-pane
          label="Students"
          style="height: 66vh; overflow: scroll"
          name="activeclassroom"
        >
          <div
            style="display: flex; justify-content: space-between; width: 70rem"
          >
            <div style="color: #222222; font-size: 20px; font-weight: 500">
              45 students
            </div>
            <e-button
              icon="el-icon-search"
              :plain="true"
              :span="2"
              label="Search"
            ></e-button>
          </div>
          <br />
          <div
            style="
              display: flex;
              flex-wrap: wrap;
              justify-content: space-around;
            "
          >
            <messenger-card v-for="i in 9" :key="i" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="Teachers" name="dds"> </el-tab-pane>
        <el-tab-pane label="Management" name="12"> s </el-tab-pane>
        <el-tab-pane label="Non-Teaching" name="123"> </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import messengerCard from "@/components/connect/messengerCard.vue";
export default {
  components: { messengerCard },
  data: () => ({
    activeName: "activeclassroom",
  }),
};
</script>
<style>
.messenger-header {
  display: flex;
  justify-content: space-between;
  padding: 25px 65px;
  background: white;
}
.messenger-header div {
  color: #000000;
  opacity: 0.8;
  font-size: 24px;
  font-weight: 600;
}
</style>
