<template>
  <div class="about">
    <e-container
      pageTitle="Syllabus"
      btnIcon="el-icon-plus"
      btnText="Add Syllabus"
    >
      <el-row v-if="filter.length > 0" :gutter="20">
        <el-col :span="6"> 14 classes </el-col>
        <el-col :span="4"></el-col>
        <el-col :span="3" :offset="10">
          <e-dropdown :list="filter" primary />
        </el-col>
        <el-col :span="3" class="primary-text"
          ><e-dropdown :list="filter2" primary
        /></el-col>
        <el-col :span="1">
          <e-button icon="el-icon-sort" css='sort-icon' :plain="true" type="primary"></e-button>
        </el-col>
      </el-row>

      <div>
        <el-row style="margin-top:25px" v-for="(prog,i) in progress" :key="i">
          <el-col :span="9">
            <div style="font-weight: bold; padding-bottom: 5px">
              Lorem ipsum dolor sit amet consectetur
            </div>
            <el-card shadow="none" class="rounded-08 pg-50 cp" style="margin-top:20px">
              <div>Progress</div>
              <e-progress color='#FFA700' :percentage="prog.persentage"></e-progress>
              <el-row style="margin-top: 15px">
                <el-col span="12">
                  <span style="font-size: 14px; padding-bottom: 20px"
                    >Alloted</span
                  ><br />
                  <span style="font-size: 20px">5 classes</span>
                </el-col>
                <el-col span="6">
                  <span style="font-size: 14px; padding-bottom: 20px"
                    >Taken</span
                  ><br />
                  <span style="font-size: 20px">2 classes</span>
                </el-col>
              </el-row>
              <img
                v-if="prog.progress"
                style="width: 126px; margin-top: 11px"
                src="@/assets/icons/progress.png"
              />
              <img
                v-else
                style="width: 106px; margin-top: 11px"
                src="@/assets/icons/progress2.png"
              />
            </el-card>
            <el-card
              shadow="none"
              style="margin-top: 10px"
              class="rounded-08 pg-50 cp"
            >
              <div style="display: flex">
                <el-avatar
                  :size="70"
                  :src="require('@/assets/images/profile.jpg')"
                />
                <div class="pro-name">Marina Campbell</div>
                <button class="view-profile">View Profile</button>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12" style="margin-left: 20px">
            <div style="display: flex; justify-content: space-between;margin-bottom:10px">
              <div>Sub-topics covered</div>
              <el-button class='see_status' > <e-svg class="see_status--icon" style="    display: inline-flex;margin-right:7px" icon='statusbtn'/> See Status</el-button>
            </div>
            <el-card shadow="none" class="rounded-08 pg-55 cp">
              <div
                v-for="i in 7"
                :key="i"
                style="color: #909295; margin: 15px 0; font-size: 14px"
              >
                <el-checkbox style="margin-right: 10px"></el-checkbox>
                Lorem ipsum dolor sit amet consectetur adipiscing elit
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </e-container>
  </div>
</template>
<script>
export default {
  data: () => ({
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
    progress:[
      {
        progress:true,
        persentage:'50'
      },
      {
        progress:false,
        persentage:70
      },
    ]
  }),
};
</script>
<style >
.pro-name {
  margin-left: 12px;
  font-weight: bold;
  width: 109px;
}
.view-profile {
  margin-left: 101px;
  height: 35px;
  padding: 8px 15px;
  border-radius: 22px;
  border: 1px solid #bc6c42;
  color: #bc6c42;
  background: transparent;
}
/* .progress-btn{
  background-image: url('@/assets/icons/progress.png');
} */
.see_status{
  border: 1px solid #bc6c42 !important;
  background: transparent !important;
color: #bc6c42 !important;
}
.sort-icon{
  background: transparent !important;
}
.sort-icon:hover{
  background: #bc6c42 !important;
}
</style>
