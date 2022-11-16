<template>
  <div>
    <e-container
      pageTitle="Permission Slips"
      btnIcon="el-icon-plus"
      btnText="Create Slip"
      @btnClick="$router.push('/connect/create-permission-slip')"
    >
      <el-tabs class="floatTabHeader" v-model="activeName">
        <el-tab-pane label="Approved" name="Approved">
          <div class="fs-20 f-500" style="color: #222222">
            5 Permission slips
          </div>
          <br />
          <permission-card
            v-for="i in 9"
            :key="i"
            @clicks="showSideBar=true"
            title="Simple calculations assignment"
            duedate="14th June"
            SignedStatus="14/23"
          />
        </el-tab-pane>
        <el-tab-pane label="Completed" name="Completed"> </el-tab-pane>
        <el-tab-pane label="Pending" name="Pending">
          <div class="fs-20 f-500" style="color: #222222">
            5 Permission slips
          </div>
          <br />
          <permission-card
            v-for="i in 9"
            :key="i"
            title="Simple calculations assignment"
            duedate="14th June"
          />
        </el-tab-pane>
      </el-tabs>
       <permission-right-bar
      :show="showSideBar"
      :__onCancel="() => (showSideBar = !showSideBar)"
    />
    </e-container>
  </div>
</template>
<script>
import permissionCard from "@/components/connect/permissionCard.vue";
import permissionRightBar from '@/components/connect/permissionRightBar.vue'
export default {
  components: { permissionCard,permissionRightBar },
  data: () => ({
    activeName: "Approved",
    showSideBar:false,
  }),
};
</script>
