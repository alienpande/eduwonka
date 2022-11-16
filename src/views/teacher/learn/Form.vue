<template>
  <div>
    <e-container pageTitle="Form" btnIcon="el-icon-plus" btnText="Create form" @btnClick='$router.push($url.LN_FORM_CREATE)'>
      <el-tabs class="floatTabHeader" v-model="activeName">
        <el-tab-pane label="Active" name="activetest">
          <el-row :gutter="20">
            <el-col
              :span="6"
              style="font-size: 20px; color: #4d4f5c; font-weight: 500"
            >
              11 forms
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
          <el-row>
            <form-card
              @clicks="showSideBar = true"
              title="Lorem ipsum dolor sit amet consectetur"
              audience="25"
              Submitted="15"
              duedate="15m 12s"
              v-for="i in 8"
              :key="i"
            />
          </el-row>
          <form-right-bar
            :show="showSideBar"
            :__onCancel="() => (showSideBar = !showSideBar)"
          />
        </el-tab-pane>
        <el-tab-pane label="Upcoming" name="Upcoming">
          <el-row :gutter="20">
            <el-col
              :span="6"
              style="font-size: 20px; color: #4d4f5c; font-weight: 500"
            >
              11 forms
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
          <el-row>
            <form-card
              @clicks="showSideBar = true"
              title="Lorem ipsum dolor sit amet consectetur"
              audience="25"
              
              publishDate="15m 12s"
              v-for="i in 8"
              :key="i"
            />
          </el-row>
          <form-right-bar
            :show="showSideBar"
            :__onCancel="() => (showSideBar = !showSideBar)"
          />
           </el-tab-pane>
        <el-tab-pane label="Completed" name="Complete"> 
          <el-row :gutter="20">
            <el-col
              :span="6"
              style="font-size: 20px; color: #4d4f5c; font-weight: 500"
            >
              11 forms
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
          <el-row>
            <form-card
              @clicks="showSideBar = true"
              title="Lorem ipsum dolor sit amet consectetur"
              audience="25"
              
              publishDate="15m 12s"
              v-for="i in 8"
              :key="i"
            />
          </el-row>
          <form-right-bar
            :show="showSideBar"
            :__onCancel="() => (showSideBar = !showSideBar)"
          />
        </el-tab-pane>
      </el-tabs>
    </e-container>
  </div>
</template>
<script>
import formCard from '@/components/learn/form/formCard.vue'
import formRightBar from "@/components/learn/formRightBar.vue";
export default {
  data: () => ({
    activeName: "activetest",
    showSideBar: false,
  }),
  components: { formRightBar ,formCard},
};
</script>
<style>
.sort-icon {
  background: transparent !important;
}
.sort-icon:hover {
  background: #bc6c42 !important;
}
</style>
