<template>
 <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
  <e-form
    heading="Exam Details"
    subHeading="Please create exam types that are conducted in your institution"
    bgColor="transparent"
    showBtn
    btnText="Add Exam Type"
    @btnClick="addMore"
    :gutter="50"
    :rules="rules"
    @next="handleSubmit(handleClick(exam))"
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
        label="name"
        v-model="item.name"
        placeholder="Type here"
        @input="handleExam(item)"
        rules="required"
      />
      <e-input
        label="occurence"
        v-model="item.occurence"
        placeholder="2"
        rules="required"
        @input="handleExam(item)"
      />
    </el-col>
  </e-form>
 </ValidationObserver>
</template>

<script>
export default {
  props: {
    obj: {
      type: Array
    }
  },
  data() {
    return {
      rules: {},
     exam: [],
     selectexamType: false
      // obj: [
      //   {
      //     name: "",
      //     occurence: "",
      //   },
      // ],
    };
  },
  computed: {
    isValid () {
      return this.item.name && this.item.occurence;
    }
  },
  methods: {
   onclick(exam){
      this.$emit("getExam", exam)
    },
    addMore() {
      // const id = uuid();
      this.obj.push({
       name: "",
        occurence: "",
      });
    },
    deleteSection(i) {
      this.obj.splice(i, 1);
      this.inputChange();
    },
    handleExam(data){
      this.$emit('getExam', data)
    }
  },
};
</script>

<style scoped>
.display-content {
  display: flex;
}
</style>
