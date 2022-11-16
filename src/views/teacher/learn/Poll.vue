<template>
  <div class="about">
    <e-container
      pageTitle=" Poll"
      btnIcon="el-icon-plus"
      btnText=" Create Poll"
      subTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
      @btnClick="$router.push($url.LN_POLL_CREATE)"
    >
      <el-tabs class="floatTabHeader" v-model="activeName">
        <el-tab-pane label="Active" name="active">
          <el-row :gutter="20">
            <el-col
              :span="6"
              style="font-size: 20px; color: #4d4f5c; font-weight: 500"
            >
              11 polls
            </el-col>
            <el-col :span="4"></el-col>

            <el-col :span="1" :offset="15">
              <e-button
                icon="el-icon-sort"
                css="sort-icon bg-transparent"
                :plain="true"
                type="primary"
              ></e-button>
            </el-col>
          </el-row>
          <div>
            <poll-card
              title="Lorem ipsum dolor sit amet consectetur"
              audience="25"
              Submitted="15"
              duedate="15m 12s"
              v-for="i in 8"
              :key="i"
              :bottom='true'
              @clicks='showSideBar=!showSideBar'
            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="Upcoming" name="Upcoming">
           <poll-card
              
              title="Lorem ipsum dolor sit amet consectetur"
              audience="25"
              polldate="15th June"
              v-for="i in 8"
              :key="i"
              
            />
        </el-tab-pane>
      <el-tab-pane label="Completed" name="Completed">
        </el-tab-pane>
      </el-tabs>
      <poll-right-bar   :show="showSideBar"
            :__onCancel="() => (showSideBar = !showSideBar)"/>
    </e-container>
  </div>
</template>
<script>
import pollRightBar from '@/components/learn/poll/pollRigheBar.vue'
import pollCard from "@/components/learn/poll/pollCard.vue";
export default {
  components: { pollCard ,pollRightBar},
  data: () => ({
    activeName: "active",
    showSideBar:false
  }),
};
</script>
