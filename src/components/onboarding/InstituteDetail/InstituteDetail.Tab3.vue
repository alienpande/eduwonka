<template>
  <div>
    <e-form :gutter="100">
      <el-row class="institute-onboard-others">
        <el-col :span="12">
          <div class="h1">Lets Get started</div>
          <h4 class="h4 mt30">
            Hi Amit, You are about to start your 90 days Free trial, for all of
            your campuses.
          </h4>
          <p class="h6 mt30">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et
            odio id velit sagittis viverra. Integer tellus.Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. Proin et odio id velit sagittis
            viverra. Integer tellus
          </p>
        </el-col>
        <el-col :span="12" class="text-right">
          <e-svg icon="onboarding-getting-started" />
        </el-col>
      </el-row>
    </e-form>
    <ModulePricing class="mt30" />
    <el-row class="text-right">
      <e-button
        :span="18"
        label="Cancel"
        width="180"
        type="text"
        @click="handleBack"
        class="p-45 cancel-button-margin"
      ></e-button>
      <e-button
        :span="3"
        label="Done"
        width="180"
        @click="handleClick"
        css="float-right"
        class="p-45"
      ></e-button>
    </el-row>
  </div>
</template>
<script>
import ModulePricing from "@/components/onboarding/InstituteDetail/ModulePricing.vue";
export default {
  components: {
    ModulePricing,
  },
  data() {
    return {
      student: {
        name: "",
        gender: "female",
      },
      bloodGroups: [
        {
          label: "A+",
          value: "a+",
        },
        {
          label: "B+",
          value: "b+",
        },
        {
          label: "O+",
          value: "o+",
        },
      ],
    };
  },
   props: ['institute'],
    created(){
    console.log('id in 3rd step', this.institute)
  },
  methods: {
    handleClick() {
      console.log(this.student);
      this.$emit("save", this.student);
    },

    handleBack() {
      this.$emit("back");
    },
  },
  mounted() {},
};
</script>
<style scoped>
.institute-onboard-others {
  padding: 30px 100px 0px; font-size: 24px;
}
@media only screen and (device-width: 768px) {
  .institute-onboard-others {
    padding: 15px 45px; 
  }
  .h4{
    font-size: 16px;
  }
  .h6{
    font-size: 13px;
  }
  .cancel-button-margin{
    margin-right: 35px;
  }
}
</style>