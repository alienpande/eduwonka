<template>
  <e-container-lite
    @back="$go($url.LEVEL_CREATION_STEP2)"
    btnRightTitle="Done"
    @rightButtonClick="$go($url.SUBJECT_CREATION)"
  >
    <template #titleHead>
      <div class="h1">Standard Sequencing</div>
      <div class="h5">
        Kindly Drag and drop the levels to their desired location
      </div>
    </template>

    <e-form bgColor="transparent">
      <sections-card
        :span="8"
        title="Existing Standards"
        :standards="standards"
      />
      <!-- <e-button class="float-right" @click="$go($url.SUBJECT_CREATION)" :span="4" label="Done" type="primary" /> -->
    </e-form>
  </e-container-lite>
</template>
<script>
export default {
  components: {
    SectionsCard: () =>
      import("@/components/hq/Standards/Sections.Card.vue"),
  },
  data() {
    return {
      standards: [
        { name: "LKG", sections: ["A", "B", "C"] },
        { name: "UKG", sections: ["A", "B", "C"] },
        { name: "1", sections: ["A", "B", "C"] },
        { name: "2", sections: ["A", "B", "C"] },
      ],
    };
  },
};
</script>
