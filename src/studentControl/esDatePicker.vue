<template>
<div class="student-date-picker">
  <el-col :span="span" style="height: 100px">
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
  </el-col>
  </div>
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
      tyep: String,
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

<style> 
.student-date-picker .label{
    color: #F3F3F3 !important;
}
.student-date-picker .el-input__prefix {
  right: 4px !important;
  top: -3px !important;
}
.student-date-picker .el-input__icon {
  float: right !important;
  color: #FE9D2B !important;
}
.student-date-picker .el-input--prefix .el-input__inner {
  padding-left: 10px !important;
  box-shadow: 0px 1px 3px #11111112 !important;
  border:1px solid #6E6E6E !important;
  color: #9D9D9D !important;
  font-weight: 500 !important;
  background: #353535 !important;

}
.student-date-picker .el-input--prefix .el-input__inner::placeholder {
  color: #9D9D9D !important;
}
</style>