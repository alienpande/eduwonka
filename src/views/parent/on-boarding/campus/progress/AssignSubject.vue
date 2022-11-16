<template>
  <e-container-lite
    :percentage="30"
    tag="North Campus"
    showFooter
    @back="$go($url.SUBJECT_CREATION)"
    @next="$go($url.ATTENDANCE_AND_EXAM)"
  >
    <template #titleHead>
      <div class="h1">Assign Subject</div>
      <div class="h5">Kindly assign the subjects to the relevant standards</div>
    </template>

    <e-form
      :heading="item.name"
      v-for="(item, key) in classes"
      v-bind:item="item"
      :id="key"
      :key="item.name + key"
    >
      <el-col :span="24" class="mb20">Choose Subject</el-col>
      <el-checkbox
        class="toggle-style"
        v-model="item.isSelected"
        v-for="(item, index) in item.subjects"
        v-bind:key="key + index + 1"
        :label="item.name"
        border
      />
    </e-form>
  </e-container-lite>
</template>
<script>
export default {
  data() {
    return {
      classes: [],
      defaultSubjects: [],
    };
  },
  created() {
    this.defaultSubjects = Object.assign([], require("@/api/subjects.json"));
    this.classes = require("@/api/classes.json");
    this.classes.forEach((c) => {
      if (c.subjects.length > 0) {
        this.defaultSubjects.forEach((s, i) => {
          const isFound = c.subjects.filter((x) => x.id === s.id)[0];
          if (!isFound) {
            c.subjects[i] = s;
          }
        });
      } else {
        this.defaultSubjects.forEach((s) => {
          c.subjects.push({ ...s });
        });
      }
    });
  },
  methods: {
    getClassIndex(list, id) {
      return list.findIndex((e) => e.id == id);
    },
  },
};
</script>
