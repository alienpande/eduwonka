<template>
  <div>
    <el-tabs class="floatTabHeader studentTab" v-model="activeName">
      <el-tab-pane label="Academics" name="academics">
        <el-row>
          <el-col :span="10">
            <div style="color: #cfcfcf">10 Certfificates Available</div>
          </el-col>
          <el-col :span="4" :offset="10">
            <es-button class="pd-10" icon="downloadYellow" text="Download All" />
          </el-col>
        </el-row>
        <el-col v-for="i in 6" :key="i" :span="11" :offset="1" class="mg-t-30">
          <el-card class="rounded-08 bg-black-2" :style="'border: none'" shadow="none">
            <el-row>
              <el-col :span="18" class="mt10 mb20">
                <el-row class="event-row">
                  <span class="tx-18 tx-bolder text-white">Lorem ipsum is simply dummy</span>
                </el-row>
              </el-col>
              <el-col :span="6" class="mt10 mb20">
                <el-row class="event-row">
                  <es-button icon="downloadBlack" text="Download" :plain="true" />
                </el-row>
              </el-col>
            </el-row>
            <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
              <div class="d-flex justify-content-center">
                <e-svg icon="studentCertificate"></e-svg>  
              </div>
            </el-card>
          </el-card>
        </el-col>
      </el-tab-pane>
      <el-tab-pane label="Sports" name="sports"></el-tab-pane>
      <el-tab-pane label="Other Extracurricular Activities" name="other"></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import esButton from '../../../../studentControl/esButton.vue';
export default {
  components: { esButton },
  data: () => ({
    activeName: "academics",
  }),
  created() {},
  methods: {}
};
</script>