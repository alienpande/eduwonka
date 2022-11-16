<template>
  <el-col :span="span" style="height: auto">
    <!-- <validate v-slot="{ errors }" :rules="rules"> -->
    <ValidationProvider :name="name" :rules="rules" v-slot="{ errors }" slim>
      <p class="label">{{ label }}</p>
      <el-radio
        v-model="val"
        @change="$emit('change', val)"
        @input="$emit('input', val)"
        :disabled="disabled"
        :name="name"
        :border="border"
        :label="option.value"
        v-for="(option, index) in options"
        :key="index"
      >
        {{ option.title }}
      </el-radio>
      <div class="error-text">
        {{ errors[0] }}
      </div>
    <!-- </validate> -->
    </ValidationProvider>
  </el-col>
</template>
<script>
export default {
  props: {
    span: {
      type: Number,
      default: 24,
    },
    rules: {
      type: String,
      default: "",
    },
    label: {
      type: String,
    },
    options: {
      type: Array,
    },
    name: {
      type: String,
    },
    value: {
      type: [String, Number, Boolean],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      val: this.value,
    };
  },
  mounted() {
    this.val = this.value;
  },
};
</script>
