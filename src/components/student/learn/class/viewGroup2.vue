<template>
  <div>
    <br />

    <div style="padding: 20px">
      <div class="fs-20 f-600 text-center text-white">
        Audience selection for Study group
      </div>
      <div style="color: #858585; margin: 10px 0" class="text-center">
        You can select Max 5 and Min 1 student for group creation
      </div>
      <es-button
        text="Edit audience"
        icon="pen2"
        width="200"
        style="width: 200px; margin: auto"
      >
      </es-button>
    </div>

    <br />
    <div
      style="
        width: 860px;
        height: 195px;
        background: #1e1e1e;
        border-radius: 8px;
        display: block;
        margin: auto;
        padding-top: 10px;
      "
    >
      <el-row style="display: flex; justify-content: space-between">
        <el-col
          style="padding: 0 15px; margin: 15px 0"
          :span="4"
          v-for="i in 5"
          :key="i"
        >
          <div
            class='select-audiance'
            style="
              position: relative;
              width: 136px;
              height: 120px;
              background: #282828;
              border-radius: 8px;
              padding-top: 30px;
            "
          >
            <e-svg
              style="position: absolute; top: 9px; right: 11px"
              v-if="i % 2 === 0"
              icon="delectDetail"
            ></e-svg>
            <el-avatar
              style="margin: auto; display: block"
              :size="58"
              :src="require('@/assets/images/profile.jpg')"
            />
            <div class="text-center text-white" style="padding-top: 5px">
              Atul Sharma
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <br />
    <br />
    <el-row
      style="
        margin-top: 20px;
        background: #1e1e1e;
        padding-top: 25px;
        padding-bottom: 15px;
      "
    >
      <el-col :span="5" :offset="14">
        <es-button text="Cancel" width="200"></es-button>
      </el-col>
      <el-col style="float: right" :span="5">
        <es-button
          text="Create Study Group"
          width="200"
          :plain="true"
        ></es-button>
      </el-col>
    </el-row>
    <!-- ====================DETAILS REFERENCR==================== -->
  </div>
</template>
<script>
export default {
  data: () => ({
    addSelectionDialog: false,
  }),
};
</script>
<style>
.noHeader {
  padding: 20px 0 0 0 !important;
}
.select-audiance {
  background: #353535 !important;
}
</style>
