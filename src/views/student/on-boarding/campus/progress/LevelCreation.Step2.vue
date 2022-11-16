<template>
  <e-container-lite
    :percentage="10"
    tag="North Campus"
    showFooter
    @back="$go($url.LEVEL_CREATION_STEP1)"
    @next="$go($url.STANDARD_SEQUENCING)"
  >
    <template #titleHead>
      <div class="h1">Level Creation</div>
      <div class="h5">
        Kindly create the levels (eg standard/class/grades) and their divisions
        relevant for your institution
      </div>
    </template>

    <e-form
      heading="Add Standard"
      subHeading="Kindly create the Levels, relevant for the institution to access the student’s progress"
      bgColor="transparent"
    >
      <standard-list @addSections="dialogSection = true" />
      <standard-input
        v-model="sections"
        @object="s = $event"
        @addSections="dialogSection = true"
      />
    </e-form>

    <e-dialog
      title="Add/Edit Section for 1"
      v-model="dialogSection"
      width="70%"
      top="40vh"
      noEsc
      noPersist
      @cancel="dialogSection = false"
      @confirm="dialogSection = false"
      btnConfirmText="Submit"
    >
      <p class="label ml20">Section Names (eg A,B,C)</p>
      <sections-input v-model="sections" @object="s = $event" />
    </e-dialog>
  </e-container-lite>
</template>
<script>
export default {
  components: {
    StandardInput: () => import("./Standard.Input.vue"),
    StandardList: () => import("./Standard.List.vue"),
    SectionsInput: () =>
      import("@/components/hq/Standards/Sections.Input.vue"),
  },
  data() {
    return {
      dialogSection: false,
      s: [],
      sections: [{ val: "" }],
    };
  },
};
</script>
