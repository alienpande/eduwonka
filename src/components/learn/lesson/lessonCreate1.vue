<template>
  <div style="padding-bottom: 20px">
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <el-row>
      <el-col class="custom-input" :span="6" :rules="rules">
        <e-input
          v-model="lesson1.name"
          name="Name"
          placeholder="Lesson Name"
          rules="required"
        ></e-input>
      </el-col>
      <el-col :span="6" :offset="1" rules="required">
        <add-option
          title="Subtopics"
          :store="subtopic"
          v-model="subtopic"
          btnText="Add Subtopic"
          placeholder="Subtopics"
          rules="required"
        />
      </el-col>
       <el-col :span="1">
          <e-svg
            v-show="subtopic.length > 1"
            icon="close2"
            @click="deleteSection(index)"
            css="h35 mt30"
          />
        </el-col>
      </el-row>
      <el-row style="border-top: 1px solid #fcdfbd; margin-top: 20px">
        <el-col style="float: right" :span="9">
          <e-button
            :span="15"
            label="Cancel"
            width="180"
            css="cancel_btn"
            type="default"
            class="p-45"
          ></e-button>
          <e-button
            :span="8"
            label="Proceed"
            width="180"
            @click="handleSubmit(setData())"
            css="float-right"
            class="p-45"
          ></e-button>
        </el-col>
      </el-row>
    </ValidationObserver>
  </div>
</template>
<script>
export default {
  data: () => ({
    rules: {},
    lesson1: {},
    subtopic: [],
    value: []
  }),
  computed: {
    isValid () {
      return this.lesson1.name && this.subtopic;
    }
  },
  methods: {
    setData() {
      this.$emit('save', this.lesson1, this.subtopic)
    },
    addSubTopic() {
      this.subtopic.push({ topic: "" });
    },
    deleteSection(i) {
        this.subtopic.splice(i, 1)
    },
  },
  created() {
  },
};
</script>
<style>
.subtopic-add {
  position: relative;
  margin-bottom: 10px;
}
.subtopic-add input {
  box-shadow: 0px 1px 3px #11111112;
  border: 1px solid #bc6c42;
  border-radius: 4px;
  color: #bc6c42;
  font-size: 17px;
  line-height: 38px;
  padding: 0 15px;
}
</style>
