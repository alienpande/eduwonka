<template>
  <es-container hideHeader pageTitle="PTM" :back="$url.HQ_DASHBOARD" class="bg-black-5">
    <el-card class="rounded-08 bg-black-2" style="border: none; margin: 30px" shadow="none">
      <el-row>
        <el-col :span="20">
          <span class="tx-20 tx-bolder text-white">Event Details</span>
        </el-col>
      </el-row><br />
      <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
        <el-row>
          <el-card class="rounded-09 bg-black-3" :style="'border: none'" shadow="none">
            <el-col :span="4" class="mg-b-20 d-flex">
              <div>
                <div class="text-gray-6">Event Name</div>
                <div class="sub-title">Lorem</div>
              </div>
            </el-col>
            <el-col :span="4" class="mg-l-30 d-flex">
              <div>
                <div class="text-gray-6">Event Type</div>
                <div class="sub-title">meeting</div>
              </div>
            </el-col>
            <el-col :span="4" class="mg-l-30 d-flex">
              <div>
                <div class="text-gray-6">From Date</div>
                <div class="sub-title">12-09-1996</div>
              </div>
            </el-col>
            <el-col :span="4" class="mg-l-30 d-flex">
              <div>
                <div class="text-gray-6">To Date</div>
                <div class="sub-title">12-09-1996</div>
              </div>
            </el-col>
            <el-col :span="4" class="mg-l-30 d-flex">
              <div>
                <div class="text-gray-6">for Classes</div>
                <div class="sub-title">PTM</div>
              </div>
            </el-col>
            <el-col :span="20" class="mg-l-1 mg-t-10 mg-b-10 d-flex">
              <div>
                <div class="text-gray-6">Description</div>
                <div class="sub-title">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam</div>
              </div>
            </el-col>
          </el-card>
        </el-row>
      </el-card>
    </el-card>
    <el-row style="margin: 30px">
      <el-card class="rounded-09 bg-black-2" :style="'border: none'" shadow="none">
        <el-row>
          <el-col :span="18">
            <span class="tx-20 tx-bolder text-white">Attached files</span>
          </el-col>
        </el-row><br />
        <el-card class="rounded-08 bg-black-2" style="border: 2px solid #6d6c6c">
          <div style="flex-wrap:wrap;margin-top:6px" class="d-flex">
            <div v-for="i in 5" :key="i" class="bg-black-3 d-flex" style="width: 140px; padding: 13px;margin:5px">
              <e-svg icon="downloadBlue"></e-svg>
              <div style="color: #1492e6; padding-left: 5px">
                Study data.pdf
              </div>
            </div>
          </div>
        </el-card>
      </el-card>
    </el-row>
    <el-row style=" margin-top: 60px; background: #1e1e1e; padding-top: 25px; padding-bottom: 15px;">
      <el-col :span="3" :offset="21">
        <es-button text="Exit" width="200" />
      </el-col>
    </el-row>
  </es-container>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  components: { },
  data() {
    return {
      dialog: false,
    }
  },
   mounted() {
    /* this.setAsideMenuCollapse(true);
    setTimeout(() => {
      this.setAsideWidth("100px");
    }, 100); */
  },
  created() {
//    this.setAsideMenuCollapse(true);
//    this.setAsideWidth("100px");
  },
  destroyed() {
    this.setAsideMenuCollapse(false);
  },
  methods: {
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth"]),
    scrollTop() {
      this.$nextTick(() => {
        this.$refs.tab2.scrollTop = 0;
      });
    },
  },
};
</script>
