<template>
  <e-form
    heading="Exam Details"
    subHeading="Please create exam types that are conducted in your institution"
    bgColor="transparent"
    showBtn
    btnText="Add Exam Type"
    @btnClick="addMore"
    :gutter="50"
  >
    <el-col
      :span="7"
      v-for="(item, index) in obj"
      v-bind:item="item"
      v-bind:key="index"
      style="background: #fff; border-radius: 4px; margin: 20px"
    >
      <e-more-menu hideEdit class="text-right" @delete="deleteSection(item)">
      </e-more-menu>
      <e-input
        label="Exam type"
        v-model="item.examType"
        placeholder="Type here"
      />
      <e-input
        label="Counts / Year"
        v-model="item.countPerYear"
        placeholder="2"
      />
    </el-col>
  </e-form>
</template>

<script>
export default {
  data() {
    return {
      obj: [
        {
          examType: "",
          countPerYear: "",
        },
      ],
    };
  },
  methods: {
    addMore() {
      // const id = uuid();
      this.obj.push({
        examType: "",
        countPerYear: "",
      });
    },
    deleteSection(i) {
      this.obj.splice(i, 1);
      this.inputChange();
    },
  },
};
</script>

<style scoped>
.display-content {
  display: flex;
}
</style>
