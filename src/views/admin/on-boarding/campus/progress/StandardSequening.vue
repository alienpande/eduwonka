<template>
  <e-container-lite
    @back="$go('/on-boarding/level-creation-step-2/'+ $route.params.id)"
    btnRightTitle="Done"
    @rightButtonClick="$go($url.SUBJECT_CREATION + '/' + campusId)"
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
import {dispatchGraphql} from '@/api/dispatcher'
export default {
  components: {
    SectionsCard: () =>
      import("@/components/hq/Standards/Sections.Card.vue"),
  },
  created() {
    console.log('router campus id',this.$route.params.id);
    this.campusId = this.$route.params.id
    this.getStandards()
  },
  data() {
    return {
      // standards: [
      //   { name: "LKG", sections: ["A", "B", "C"] },
      //   { name: "UKG", sections: ["A", "B", "C"] },
      //   { name: "1", sections: ["A", "B", "C"] },
      //   { name: "2", sections: ["A", "B", "C"] },
      // ],
      standards: [],
    };
  },
  methods: {
    getStandards() {
      const query = `query {
        standards {
          id
          name
          standard_sections {
            id
            name
          }
        }
      }`
      dispatchGraphql(query).then((response) => {
      this.standards = response.standards
      console.log("standards", response)
      });
    }
  }
};
</script>
