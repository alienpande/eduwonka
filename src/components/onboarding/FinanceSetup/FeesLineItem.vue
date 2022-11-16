<template>
  <el-col :span="span">
    <p class="label" style="margin-bottom: 30px">
      {{ title }}
    </p>
    <div
      style="background: transparent; padding: 0px 0px 10px 0px"
      v-for="(item, index) in lineItems"
      :item="item"
      :key="index"
    >
      <el-row :gutter="20">
        <e-input
          :span="span == 24 ? 8 : 18"
          name=""
          v-model="item.fee_line_item_type"
          @input="inputChange"
          class="h40"
        ></e-input>
        <e-input
          :span="span == 24 ? 8 : 18"
          name=""
          v-model="item.default_amount"
          @input="inputChange"
          class="h40"
        ></e-input>
        <el-col :span="1">
          <e-svg
            v-show="obj.length > 1"
            icon="close2"
            @click="deleteSection(index)"
            css="h35 mt10"
          />
        </el-col>
      </el-row>
    </div>

    <e-button
      label="Add More"
      icon="el-icon-plus"
      class="mt30"
      plain
      @click="addMore"
    />
  </el-col>
</template>
<script>
export default {
  props: {
    value: {
      type: Array,
      default() {
        return [];
      },
    },
    title: {
      type: String,
    },
    span: {
      type: Number,
      default: 24,
    },
    lineItems: {
      type: Array,
    }
    },
  data() {
    return {
      obj: [
        {
          lineItem: "",
        },
      ],
    };
  },
  methods: {
    addMore() {
      // const id = uuid();
      this.obj.push({
        lineItem: "",
      });
    },
    deleteSection(i) {
      this.obj.splice(i, 1);
      this.inputChange();
    },
    inputChange() {
      this.$emit("input", this.obj);
    },
  },
  created() {
    this.obj = this.value;
    if (this.value.length <= 0) {
      this.addMore();
    }
    this.inputChange();
  },
  watch: {
    value(newVal) {
      this.obj = newVal;
    },
  },
};
</script>

<style scoped></style>
