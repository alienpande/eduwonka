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
        @click="addSelectionDialog = true"
        text="Add audience"
        icon="addPluse"
        width="200"
        style="width: 200px; margin: auto"
      >
      </es-button>
    </div>
    <br />
    <br />
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
    <es-dialog
      v-model="addSelectionDialog"
      width="70%"
      top="20vh"
      noEsc
      :gutter="20"
      hideDefaultFooter
      @cancel="addSelectionDialog = false"
      @confirm="addSelectionDialog = false"
    >
      <div class="d-flex" style="margin-top: -56px">
        <div style="font-weight: bold; font-size: 24px; color: #f3f3f3">
          Audience Selection
        </div>

        <es-search
          style="margin-top: 4px; margin-left: 50px; width: 19rem"
          v-model="searchBy"
          placeholder="Search by student name"
        ></es-search>
      </div>
      <br />
      <div class="hr"></div>
      <br />
      <div class="d-flex" style="justify-content: space-between">
        <div>
          <div style="font-weight: bold; font-size: 18px; color: #f3f3f3">
            45 Students
          </div>
          <div style="font-size: 12px; color: #858585">Selected: 3</div>
        </div>
        <es-button text="Deselect All"></es-button>
      </div>
      <el-row>
        <el-col
          style="padding: 0 15px; margin: 15px 0"
          :span="4"
          v-for="i in 12"
          :key="i"
        >
          <div
            :class="{ 'select-audiance': i % 4 == 0 }"
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
              style="position: absolute; top: 9px; left: 11px"
              v-if="i % 4 === 0"
              icon="selectAudiance"
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
      <br />
      <div class="hr"></div>
      <br />
      <el-row>
        <el-col :span="10">
          <es-pagination></es-pagination>
        </el-col>
        <el-col :span="6" :offset="8">
          <es-button text="Done" :plain="true"></es-button>
        </el-col>
      </el-row>
    </es-dialog>
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
