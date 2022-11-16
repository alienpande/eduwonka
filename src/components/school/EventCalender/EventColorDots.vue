<template>
  <div>
    <div class="has-academic green-dot" v-if="hasAcademic"></div>
    <div class="has-exam yellow-dot" v-if="hasExam"></div>
    <div :class="nonAcademicClass" v-if="hasNonAcademic"></div>
    <div class="has-more-then-three-events" v-if="events.length > 3">
      +{{ events.length - 3 }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    events: {
      type: Array,
      default() {
        return null
      },
    },
  },
  computed: {
    hasExam() {
      return this.events.filter((x) => x.name).length > 0;
    },
    hasAcademic() {
      return this.events.filter((x) => x.title).length > 0;
    },
    hasNonAcademic() {
      return this.events.filter((x) => x.type === "NONACADEMIC").length > 0;
    },
    nonAcademicClass() {
      return this.hasNonAcademic
        ? this.hasExam
          ? "has-non-academic blue-dot"
          : "has-non-academic-no-exam blue-dot"
        : "has-non-academic blue-dot";
    },
  },
  created() {},
};
</script>

<style></style>
