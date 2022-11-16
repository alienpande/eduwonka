<template>
  <e-container-lite
    showFooter
    saveBtnText=""
    nextBtnText="Done"
    @back="$go($url.INVITE_PEOPLE)"
    @next="$go($url.LIST_OF_CAMPUS)"
  >
    <template #titleHead>
      <div class="h1">Admin Access</div>
      <div class="h5">
        Kindly give/revoke admin access to people for admin rights to desired
        campuses
      </div>
    </template>
    <e-form heading="Invite Members" themeFooter>
      <e-input label="Member Name" :span="6" v-model="firstName"/>
      <e-input label="Email Address" :span="6" v-model="email"/>
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
    return {
    };
  },
}
</script>
