<template>
  <e-container-lite
    :percentage="0"
    tag="North Campus"
    @back="$go($url.ONBOARD_CAMPUS, { name: 'North Campus' })"
    @next="$go($url.LEVEL_CREATION_STEP2)"
  >
    <template #titleHead>
      <div class="h1">Level Creation</div>
      <div class="h5">
        Kindly create the levels (eg standard/class/grades) and their divisions
        relevant for your institution
      </div>
    </template>
    <e-form
      heading="Add Levels"
      subHeading="Kindly create the Levels to access the student’s progress"
      formInnerBorder
      innerFormCss="inner-form-css-level-creation-step-1"
    >
      <el-col :span="24">
        <h3 class="h3 mb30">
          What term Is used in your Institution to define Level and its
          divisions
        </h3>
      </el-col>

      <e-input label="Term Used for level(eg Standard, class)" />
      <e-input label="Term Used for Division(eg Section)" />

      <e-button
        @click="$go($url.LEVEL_CREATION_STEP2)"
        label="Proceed"
        type="primary"
      />
      <e-spacer height="350px" />
    </e-form>
  </e-container-lite>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
