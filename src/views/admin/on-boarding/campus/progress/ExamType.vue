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
      :span="window.width > 767 ? 7 : 20"
      v-for="(item, index) in obj"
      v-bind:item="item"
      v-bind:key="index"
      style="background: #fff; border-radius: 4px; margin: 20px 0px"
    >
      <e-more-menu hideEdit class="text-right" @delete="deleteSection(item)">
      </e-more-menu>
      <e-input
        label="name"
        v-model="item.name"
        placeholder="Type here"
        @input="handleExam(item)"
        rules="required"
        class="mb20"
      />
      <e-input
        label="occurence"
        v-model="item.occurence"
        placeholder="2"
        rules="required"
        class="mb20"
        @input="handleExam(item)"
      />
    </el-col>
  </e-form>
 </ValidationObserver>
</template>

<script>
import screenSize from '@/mixins/screenSize'
export default {
  props: {
    obj: {
      type: Array
    }
  },
  mixins: [screenSize],
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
