<template>
  <div>
    <div
      class="level-creation-standard-list"
      v-for="(item, index) in obj"
      v-bind:item="item"
      v-bind:key="index"
      formInnerBorder :rules="rules"
    >
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
      <p class="label" formInnerBorder :rules="rules">Standard Standard</p>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input
            placeholder="Type here"
            v-model="item.val"
            @input="handleSubmit(inputChange)"
            rules="required"
          ></el-input>
        </el-col>

        <el-col :span="6" class="float-right" style="margin-right: -3rem">
          <e-button
            @click="$emit('addSections', $event)"
            plain
            label="+ Add Section"
            class="text-right"
          />
        </el-col>
      </el-row>
      </ValidationObserver>
    </div>

    <e-button
      label="Add Standard"
      type="primary"
      icon="el-icon-plus"
      @click="addMore"
    />
  </div>
</template>
<script>
// import { uuid } from "@/util/functions";
export default {
  props: {
    value: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      obj: [
        {
          val: "",
        },
      ],
      objs: [
        {
          val: "",
        },
      ],
    };
  },
   computed: {
    isValid () {
      return this.item.val;
    }
  },
  methods: {
    addMore() {
      // const id = uuid();
      this.obj.push({
        // key: id,
        val: "",
      });
    },
    addMoreSections() {
      this.objs.push({
        // key: id,
        val: "",
      });
    },
    deleteSection(i) {
      this.objs.splice(i, 1);
      this.inputChange();
    },
    inputChange() {
      this.$emit("input", this.obj);
      const data = [];
      this.obj.forEach((x) => {
        if (x.val != "") {
          data.push(x.val);
        }
      });
      this.$emit("object", data);
    },
    inputChangeSection() {
      this.$emit("input", this.objs);
      const data = [];
      this.objs.forEach((x) => {
        if (x.val != "") {
          data.push(x.val);
        }
      });
      this.$emit("object", data);
    },
  },
  created() {
    this.obj = this.value;
    this.inputChange();
  },
  watch: {
    value(newVal) {
      this.obj = newVal;
    },
  },
};
</script>
