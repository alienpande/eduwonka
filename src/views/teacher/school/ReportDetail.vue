<template>
  <e-container-custom>
    <template v-slot:header>
      <el-row class="header">
        <el-col>
          <el-row class="" :span="24">
            <el-col :span="6" class="text-heading"
              >Kenneth Sebastian</el-col
            >
            <el-col class="float-right text-right" :span="1">
              <el-button
                icon="el-icon-close"
                style="border: 2px solid #000"
                @click="$go('/school/report-card')"
                circle
              ></el-button>
            </el-col>
          </el-row>
          <el-row class="mg-t-30" :span="24">
            <el-col :span="16" class="mt-">
              <el-row type="flex" >
                <el-col class="text-sm-muted">
                  Standard
                  <div class="text-heading__sub">1A</div>
                </el-col>
                <el-col class="text-sm-muted">
                  Exam Type
                  <div class="text-heading__sub">Term 2</div>
                </el-col>
                <el-col class="text-sm-muted">
                  Score
                  <div class="text-heading__sub">98%</div>
                </el-col>
              </el-row>
            </el-col>
            <el-col class="float-right" :span="2">
              <e-button
                class="mt-5"
                size="large"
                type="primary"
                label="Download"
                icon="el-icon-download"
              />
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </template>
    <template v-slot:content>
      <el-main class="body">
        <el-tabs class="floatTabHeader mg-t--40 pd-t-15 mg-x-0" v-model="active">
          <el-tab-pane label="English" name="english" class="overflow-hidden">
            <div class="row justify-content-center overflow-hidden">
              <div
                class="col-12 col-md-5 mg-t-10"
                v-for="(d, i) in 12"
                :key="i"
              >
                <report-detail-card />
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Mathematics" name="maths">
            <div class="row justify-content-center">
              <div
                class="col-12 col-md-5 mg-t-10"
                v-for="(d, i) in 12"
                :key="i"
              >
                <report-detail-card />
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Science" name="science">
            <div class="row justify-content-center">
              <div
                class="col-12 col-md-5 mg-t-10"
                v-for="(d, i) in 12"
                :key="i"
              >
                <report-detail-card />
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="French" name="french">
            <div class="row justify-content-center">
              <div
                class="col-12 col-md-5 mg-t-10"
                v-for="(d, i) in 12"
                :key="i"
              >
                <report-detail-card />
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </template>
  </e-container-custom>
</template>

<script>
import ReportDetailCard from "@/components/school/ReportCard/ReportDetailCard.vue";
import { mapGetters } from "vuex";
import EContainerCustom from "@/controls/eContainerCustom.vue";
export default {
  components: { ReportDetailCard, EContainerCustom },
  data() {
    return {
      active: "english",
    };
  },
  methods: {
    ...mapGetters("Common", ["asideMenuCollapse"]),
  },
};
</script>

<style>
</style>