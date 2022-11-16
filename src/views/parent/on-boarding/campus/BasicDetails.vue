<template>
  <e-container-lite
    tag="North Campus"
    showFooter
    saveBtnText="Cancel"
    nextBtnText="Update"
    @back="$go($url.PAY_SLIP_LINE_ITEM)"
    @next="$go($url.INVITE_PEOPLE)"
  >
    <template #titleHead>
      <div class="h1">Basic details</div>
      <div class="h5">
        Below are the basic details about North Campus of your institute
      </div>
    </template>
    <e-form heading="Invite Members" themeFooter>
      <e-input label="Member Name" :span="6" />
      <e-input label="Email Address" :span="6" />
      <br />
      <template #themeFooter>
        <div style="padding: 10px 30px; color: #000000; opacity: 0.8">
          Mark the campus, for which you want to give the user the Admin Role
        </div>
        <el-col :span="4">
          <el-checkbox class="eCheckbox" v-model="checked"
            >North Campus</el-checkbox
          >
        </el-col>
        <el-col :span="4">
          <el-checkbox class="eCheckbox" v-model="checked"
            >South Campus</el-checkbox
          >
        </el-col>
        <el-col :span="4">
          <el-checkbox class="eCheckbox" v-model="checked"
            >West Campus</el-checkbox
          >
        </el-col>
        <el-col :span="4">
          <el-checkbox class="eCheckbox" v-model="checked"
            >East Campus</el-checkbox
          >
        </el-col>
      </template>
    </e-form>

    <e-form bgColor="transparent">
      <e-button label="Invite More People" icon="el-icon-plus" plain />
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
