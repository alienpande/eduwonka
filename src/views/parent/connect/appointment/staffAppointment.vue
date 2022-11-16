<template>
  <div>
      <e-container
      pageTitle="Appointment"
      btnIcon="el-icon-plus"
      btnText="New Appointment"
      @btnClick="$router.push('/connect/createstaff-apointment')"
    >
      <el-tabs class="floatTabHeader" v-model="activeName">
        <el-tab-pane label="Active" name="active"> 
           <el-row>
            <el-col :span="3">
              <div style="color: #222222" class="fs-16 f-500">
                5 appointments
              </div>
            </el-col>
            <el-col :span="3" :offset="16">
              <e-dropdown :list="filter" primary />
            </el-col>
            <el-col style="padding-left: 10px" :span="1">
              <e-button
                icon="el-icon-search"
                :plain="true"
                css="bg-tranparent sort-icon"
              ></e-button>
            </el-col>
          </el-row>
        <div style="display:flex;flex-wrap:wrap">
            <staff-card  @cliks='actives=true' v-for="i in 10" :key="i" />
        </div>
        <past-detail
      :show="actives" :activeDetail='true'
      :__onCancel="() => (actives = !actives)"
    />
         </el-tab-pane>
        <el-tab-pane label="Upcoming" name="Upcoming"> asfa </el-tab-pane>
        <el-tab-pane label="Past" name="Past">
          <el-row>
            <el-col :span="3">
              <div style="color: #222222" class="fs-16 f-500">
                5 appointments
              </div>
            </el-col>
            <el-col :span="3" :offset="16">
              <e-dropdown :list="filter" primary />
            </el-col>
            <el-col style="padding-left: 10px" :span="1">
              <e-button
                icon="el-icon-search"
                :plain="true"
                css="bg-tranparent sort-icon"
              ></e-button>
            </el-col>
          </el-row>
        <div style="display:flex;flex-wrap:wrap">
            <staff-card @cliks='showSideBar=true' v-for="i in 10" :key="i" />
        </div>
        </el-tab-pane>
      </el-tabs>
        <past-detail
      :show="showSideBar"
      :__onCancel="() => (showSideBar = !showSideBar)"
    />
    </e-container>
   
  </div>
</template>

<script>
import staffCard from '@/components/connect/apointment/staffCard.vue'
import pastDetail from '@/components/connect/apointment/pastDetail.vue'
export default {
  components:{staffCard,pastDetail},
  data: () => ({
    showSideBar:false,
    actives:false,
    activeName: "active",
    filter: [
      { text: "New - Old" },
      { text: "Standard 2" },
      { text: "Standard 3" },
    ],
  }),
  methods:{
   
  }
};
</script>
