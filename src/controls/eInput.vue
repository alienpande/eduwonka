<template>
  <el-col :span="span" style="">
    <!-- <validate v-slot="{ errors }" :rules="rules"> -->
      <ValidationProvider :name="name" :rules="rules" v-slot="{ errors }" slim>
      <p class="label">{{ label || name }}</p>
      <el-input
        
        class=""
        :type="type"
        :name="name"
        :maxlength="maxlength"
        :minLength="minLength"
        :placeholder="placeholder"
        :value="value"
        :disabled="disabled"
        :readonly="readonly"
        :clearable="clearable"
        :show-password="showPassword"
        :show-word-limit="showWordLimit"
        :min="min"
        :max="max"
        :rows="rows"
        :cols="cols"
        :resize="resize"
        :size="size"
        @input="$emit('input', $event)"
        @change="$emit('change', $event)"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
        @clear="$emit('clear', $event)"
      >
        <template slot="prefix">
          <slot name="prefix" />
        </template>
        <template slot="suffix">
          <slot name="suffix" />
        </template>
        <template slot="prepend">
          <slot name="prepend" />
        </template>
        <template slot="append">
          <slot name="append" />
        </template>
      </el-input>
      <div class="error-text">
        {{ errors[0] }}
      </div>
      </ValidationProvider>
    <!-- </validate> -->
  </el-col>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: "text",
    },
    span: {
      type: Number,
      default: 24,
    },
    name: {
      type: String,
    },
    rules: {
      type: String,
      default: "",
    },
    label: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    resize: {
      // none, horizontal, vertical, both
      type: String,
      default: "none",
    },
    size: {
      // medium , small , mini
      type: String,
      default: "medium",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    showPassword: {
      type: Boolean,
      default: false,
    },
    showWordLimit: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number],
      default: "",
    },
    maxlength: {
      type: Number,
    },
    minLength: {
      type: Number,
    },
    max: {
      type: Number,
    },
    min: {
      type: Number,
    },
    rows: {
      type: Number,
    },
    cols: {
      type: Number,
    },
  },
};
</script>
<style scoped>
.error-text {
  margin-top: 0px;
}
</style>