<template>
  <e-container-lite
    :percentage="50"
    tag="North Campus"
    showFooter
    @back="$go($url.ATTENDANCE_AND_EXAM)"
    @next="$go($url.DEPARTMENT_DESIGNATION)"
  >
    <template #titleHead>
      <div class="h1">Working days and hours</div>
      <div class="h5">
        Kindly set your exam type and attendance preference for your institution
      </div>
    </template>
    <e-form
      heading="Non-Working Days"
      subHeading="When is the institute closed ?"
    >
      <el-col :span="24">
        <div
          v-for="(item, index) in wh"
          v-bind:item="item"
          v-bind:key="index"
          class="working-hours"
          :class="item.isClosed ? 'weekend' : ''"
        >
          {{ item.day }}
        </div>
      </el-col>
    </e-form>
    <el-row :gutter="30">
      <el-col :span="12">
        <e-form subHeading="Please update working hours for you work days">
          <el-col
            :span="24"
            v-for="(item, index) in weekdays"
            v-bind:item="item"
            v-bind:key="index"
            class="weekday"
          >
            <div>
              {{ item.day }}
              <div>
                <span>{{ item.timing.start }}</span>
                <i class="el-icon-minus" style="color: #ba6c47" />
                <span>{{ item.timing.end }}</span>
              </div>
            </div>
          </el-col>
        </e-form>
      </el-col>
      <el-col :span="12">
        <e-form subHeading="Please update your breaks">
          <el-col :span="24" class="weekday">
            <div>
              Snacks Break
              <div>
                <span>{{ breaks.snackBreak.start }}</span>
                <i class="el-icon-minus" style="color: #ba6c47" />
                <span>{{ breaks.snackBreak.end }}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="24" class="weekday">
            <div>
              Lunch Break
              <div>
                <span>{{ breaks.lunchBreak.start }}</span>
                <i class="el-icon-minus" style="color: #ba6c47" />
                <span>{{ breaks.lunchBreak.end }}</span>
              </div>
            </div>
          </el-col>
        </e-form>
      </el-col>
    </el-row>
  </e-container-lite>
</template>
<script>
export default {
  data() {
    return {
      wh: [],
    };
  },
  created() {
    this.wh = require("@/api/working-hours.json");
  },
  computed: {
    weekdays() {
      return this.wh.filter((x) => !x.isClosed);
    },
    breaks() {
      return this.weekdays[0];
    },
  },
};
</script>
