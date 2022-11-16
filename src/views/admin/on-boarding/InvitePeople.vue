<template>
  <e-container-lite
    @back="$go($url.CAMPUS_BASIC_DETAIL +'/'+ $route.params.id)"
    @next="$go($url.INVITE_PEOPLE)"
  >
    <template #titleHead>
      <div class="h1">Invite people</div>
      <div class="h5">
        Kindly give admin access to people for admin rights to desired campuses
      </div>
    </template>
    <e-form formInnerBorder>
      <div class="h3">
        You have not invited any member yet, to give access as an Admin to the
        existing campuses for your institute
      </div>
      <e-button
        label="Invite Member"
        class="mt30 mb30"
        @click="$go($url.ADMIN_ACCESS)"
      />
      <br /><br /><br />
    </e-form>
  </e-container-lite>
</template>
<script>
import EButton from "@/controls/eButton.vue";
export default {
  data() {
    return {
      EButton,
    };
  },
};
</script>
