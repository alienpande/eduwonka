<template>
<el-col class="custom-date-picker" :span="span">
  <!-- <el-col :span="span" style=""> -->
    <!-- <validate v-slot="{ errors }" :rules="rules"> -->
    <ValidationProvider :name="name" :rules="rules" v-slot="{ errors }" slim>
      <p class="label">{{ label || name }}</p>
      <el-date-picker
        v-model="value"
        :picker-options="pickerOptions"
        :type="type"
        :name="name"
        :align="align"
        :format="format"
        :size="size"
        :value-format="valueFormat"
        :placeholder="placeholder"
        :end-placeholder="endPlaceholder"
        :start-placeholder="startPlaceholder"
        :disabled="disabled"
        :readonly="readonly"
        :clearable="clearable"
        :editable="editable"
        @change="$emit('change', value)"
        @blur="$emit('blur')"
        @focus="$emit('focus')"
      >
        <template slot="range-separator">
          <slot name="range-separator" />
        </template>
      </el-date-picker>
      <div class="error-text">
        {{ errors[0] }}
      </div>
    <!-- </validate> -->
    </ValidationProvider>
  <!-- </el-col> -->
  </el-col>
</template>
<script>
export default {
  props: {
    placeholder: {
      type: String,
    },
    span: {
      type: Number,
      default: 24,
    },
    rules: {
      type: String,
      default: "",
    },
    endPlaceholder: {
      type: String,
    },
    startPlaceholder: {
      type: String,
    },
    pickerOptions: {
      type: Object,
    },
    type: {
      //year/month/date/dates/datetime/ week/datetimerange/daterange/ monthrange
      type: String,
      default: "date",
    },
    label: {
      type: String,
    },
    name: {
      type: String,
    },
    format: {
      type: String,
    },
    align: {
      // left , center , right
      type: String,
    },
    size: {
      // large/small/mini
      type: String,
    },
    valueFormat: {
      type: String,
    },
    value: {
      type: [String, Number, Boolean],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    editable: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style >

</style>