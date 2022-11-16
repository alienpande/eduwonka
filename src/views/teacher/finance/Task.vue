<template>
  <div class="about">
    <e-container
      pageTitle="Task"
      btnIcon="el-icon-plus"
      btnText="Add Task"
      @btnClick="$router.push($url.FI_TASK_CREATE)"
    >
      <el-tabs class="floatTabHeader" v-model="activeName">
        <el-tab-pane label="Created by me" name="created"> 
          <div class="sub-headers">11 Tasks assigned to me</div>

          <el-row
            :gutter="20"
            style="
              padding: 15px 0px 10px 0px;
              margin: 0px 0px 5px 0px;
              background: white;
              height: 80px;
            "
          >
            <el-col :span="3" style="padding-left: 35px">
              <e-dropdown :list="filter" primary />
            </el-col>
            <el-col :span="3" style="padding-left: 35px" class="primary-text"
              ><e-dropdown :list="filter2" primary
            /></el-col>
             <el-col :span="3" style="padding-left: 35px" class="primary-text"
              ><e-dropdown :list="filter2" primary
            /></el-col>
            <el-col :span="4" style="padding-left: 35px">
              <e-dropdown :list="filter3" primary />
            </el-col>
            <el-col :span="3" class="primary-text">Clear filter</el-col>
            <el-col style="padding-left: 10px" :span="1" :offset="6">
              <e-button
                icon="el-icon-search"
                :plain="true"
                css="bg-tranparent"
              ></e-button>
            </el-col>
          </el-row>
          <br />
          <div
            style="
              display: flex;
              flex-wrap: wrap;
              justify-content: space-around;
            "
          >
            <task-card
              title=" Send reminders to Parents for…"
              :statused="Card.statused"
              assign="Mr Amit Sh.."
               @cliks='$router.push($url.FI_TASK_VIEW)'
              :status="Card.status"
              dueDate="14th June"
              v-for="(Card,i) in cardDetail"
              :key="i"
            />
          </div>
           </el-tab-pane>
        <el-tab-pane label="Assigned to me" name="assigned">
          <div class="sub-headers">11 Tasks assigned to me</div>

          <el-row
            :gutter="20"
            style="
              padding: 15px 0px 10px 0px;
              margin: 0px 0px 5px 0px;
              background: white;
              height: 80px;
            "
          >
            <el-col :span="3" style="padding-left: 35px">
              <e-dropdown :list="filter" primary />
            </el-col>
            <el-col :span="3" style="padding-left: 35px" class="primary-text"
              ><e-dropdown :list="filter2" primary
            /></el-col>
            <el-col :span="4" style="padding-left: 35px">
              <e-dropdown :list="filter3" primary />
            </el-col>
            <el-col :span="3" class="primary-text">Clear filter</el-col>
            <el-col style="padding-left: 10px" :span="1" :offset="9">
              <e-button
                icon="el-icon-search"
                :plain="true"
                css="bg-tranparent"
              ></e-button>
            </el-col>
          </el-row>
          <br />
          <div
            style="
              display: flex;
              flex-wrap: wrap;
              justify-content: space-around;
            "
          >
            <task-card
              title=" Lorem ipsum dolor sit amet consectetur"
              :statused="Card.statused"
              @cliks='$router.push($url.FI_TASK_VIEW)'
              assign="Mr Amit Sh.."
              :status="Card.status"
              dueDate="14th June"
              v-for="(Card,i) in cardDetail"
              :key="i"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
    </e-container>
  </div>
</template>
<script>
import taskCard from "@/components/finance/taskCard.vue";
export default {
  components: { taskCard },
  data: () => ({
    activeName: "created",
    cardDetail: [
      {
        statused: "High Priority",
        status: "Not Started",
      },
      {
        statused: "High Priority",
        status: "Not Started",
      },
      {
        statused: "Medium",
        status: "Completed",
      },
      {
        statused: "Low",
        status: "Not Started",
      },
      {
        statused: "High Priority",
        status: "Status",
      },
      {
        statused: "High Priority",
        status: "Status",
      },
    ],
    filter: [
      { text: "Vendor" },
      { text: "Standard 2" },
      { text: "Standard 3" },
    ],
    filter2: [{ text: "Status" }, { text: "Subject 1" }, { text: "Subject 2" }],
    filter3: [
      { text: "Due Date Range" },
      { text: "Subject 1" },
      { text: "Subject 2" },
    ],
  }),
};
</script>
