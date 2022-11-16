<template>
  <el-row class="form-header-container" >
    <el-col style="width:auto">
      <e-svg
        v-if="hideBack"
        icon="back"
        @click="$emit('backClick', $event)"
      ></e-svg>
    </el-col>
    <el-col style="width:auto">
      <div class="heading">{{ heading }}</div>
    </el-col>
    <e-button
      style="width:auto;margin-left: auto;"
      v-if="btnText != ''"
      :span="4"
      plain
      class="navbar-button"
      :label="btnText"
      @click="$emit('btnClick', $event)"
    ></e-button>
  </el-row>
</template>

<script>
export default {
  props: {
    heading: {
      type: String,
      required: true,
    },
    btnText: {
      type: String,
      required: "",
    },

    hideBack: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.heading {
  font-size: 24px;
  font-weight: 400;
  margin-left: -3rem;
  margin-top: 5px;
  color: #000000cc;
}
.form-header-container{
  display:flex;
  column-gap:30px;
  padding: 20px 45px 0px !important;
}
.form-header-container::after,
.form-header-container::before{
  display:none;
}

@media only screen and (max-width:767px){
  .form-header-container{
    padding:20px 20px 0px !important;
    flex-wrap:wrap;
  }
  .navbar-button{
    margin-left: 0px !important;
  }
}

</style>
