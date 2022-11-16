<template>
  <e-container pageTitle="Create Exam">
    <el-row>
      <el-col :span="8">
        <e-input label="Name of the Exam" placeholder="Text Field" />
      </el-col>
      <el-col class="pd-tb-20" :span="8">
        <e-DatePicker
          label="Pick Date"
          v-model="value"
          placeholder="Set Date"
        />
      </el-col>
      <el-col class="mt-30" :span="8">
        <e-checkbox
          :span="12"
          text="Keep the date tentative"
          v-model="checkboxchecked"
        />
      </el-col>
    </el-row>

    <el-row class="mt-20">
      <el-col :span="6">
        <e-input label="Standard" placeholder="Class 4" />
      </el-col>
      <el-col class="m-tb-20" :span="6">
        <e-input label="Subject" placeholder="Mathematics" primary />
      </el-col>
      <el-col :span="6">
        <e-select :options="examType" label="Exam Type" primary />
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="6" class="exam-flex">
        <el-row>
          <el-col :span="4">
            <img
              src="@/assets/icons/svg/school/alert.svg"
              width="20"
              height="20"
              alt=""
            />
          </el-col>
          <el-col class="ml-20" :span="20">
            The standard is default chosen from you left navigation selection
          </el-col>
        </el-row>
      </el-col>

      <el-col :span="6" class="exam-flex">
        <el-row>
          <el-col class="ml-16" :span="4">
            <img
              src="@/assets/icons/svg/school/alert.svg"
              width="20"
              height="20"
              alt=""
            />
          </el-col>
          <el-col class="ml-20" :span="20">
            The standard is default chosen from you left navigation selection
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row class="mt-20">
      <el-col :span="6">
        <e-select :options="invigilators" label="Invigilator" primary />
      </el-col>
    </el-row>

    <el-row class="float-right mr-30">
      <e-button @click="$go($url.SH_EXAM)" :span="12" label="Cancel" plain />
      <e-button
        @click="$go($url.SH_EXAM)"
        :span="12"
        label="Create Exam"
        primary
      />
    </el-row>
  </e-container>
</template>

<script>
import eCheckbox from "@/controls/eCheckbox.vue";
export default {
  components: { eCheckbox },
  data() {
    return {
      checkboxchecked: false,
      examType: [
        { id: 1, value: "Class Test" },
        { id: 2, value: "Sem 1" },
        { id: 3, value: "Sem 2" },
      ],
      invigilators: [
        { id: 1, value: "Vamsi Maddimsetti" },
        { id: 2, value: "Mayank Jhawar" },
        { id: 3, value: "Rajanikanth Annem" },
      ],
    };
  },
};
</script>

<style scoped>
.pd-tb-20 {
  padding: 0 20px;
}
.mt-30 {
  margin-top: 30px;
}
.mt-20 {
  margin-top: 20px;
}
.m-tb-20 {
  margin: 0 20px;
}
.exam-flex {
  display: flex;
}
.ml-20 {
  margin-left: -20px;
}
.ml-16 {
  margin-left: 16px;
}
.mr-30 {
  margin-right: 30px;
}
</style>
