<template>
  <el-col class="student-select" :span="span">
    <!-- <validate v-slot="{ errors }" :rules="rules"> -->
    <ValidationProvider :name="name" :rules="rules" v-slot="{ errors }" slim>
      <p class="label">{{ label || name }}</p>
      <el-select
        class="cc"
        v-model="value"
        :disabled="disabled"
        :clearable="clearable"
        :filterable="filterable"
        :multiple="multiple"
        :multiple-limit="multipleLimit"
        :collapse-tags="collapseTags"
        :loading="loading"
        :loading-text="loadingText"
        :no-data-text="noDataText"
        :no-match-text="noMatchText"
        :remote="remote"
        :allow-create="allowCreate"
        :default-first-option="defaultFirstOption"
        :reserve-keyword="reserveKeyword"
        :name="name"
        :placeholder="placeholder"
        @input="$emit('input', value)"
        @visible-change="$emit('visible-change', value)"
        @remove-tag="$emit('remove-tag', value)"
        @focus="$emit('focus')"
        @clear="$emit('clear')"
        @blur="$emit('blur')"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :disabled="item.disabled"
          :value="item.value"
        >
        </el-option>
        <template slot="empty">
          <slot name="empty" />
        </template>
        <template slot="prefix">
          <slot name="prefix" />
        </template>
      </el-select>

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
    label: {
      type: String,
    },
    options: {
      type: Array,
      required: true,
    },
    rules: {
      type: String,
      default: "",
    },
    name: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    value: {
      type: [String, Number],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    multipleLimit: {
      type: Number,
      default: 0,
    },
    collapseTags: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    filterable: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    loadingText: {
      type: String,
    },
    noMatchText: {
      type: String,
    },
    noDataText: {
      type: String,
    },
    remote: {
      type: Boolean,
      default: false,
    },
    allowCreate: {
      type: Boolean,
      default: false,
    },
    defaultFirstOption: {
      type: Boolean,
      default: false,
    },
    reserveKeyword: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style>
.student-select .el-input--suffix .el-input__inner {
  background: #353535 !important;
  border-radius: 18px !important;
  border: none !important;
  color: #9D9D9D !important;
}
.student-select .el-input__inner {
  height: 35px !important;
}
.non-round  .el-input--suffix .el-input__inner {
   border-radius: 4px !important;
}
.select-icon .el-select .el-input .el-select__caret{
color: #FE9D2B !important;
}
.border-color  .el-input--suffix .el-input__inner{
  border: 1px solid #FE9D2B !important;
}
.select-text-white .el-input--suffix .el-input__inner , .select-text-white .el-input--suffix .el-input__inner::placeholder {
color: #F3F3F3 !important;
font-weight: 500 !important; 
}
.title-select .el-input--suffix .el-input__inner {
  background: #1E1E1E !important;
  border-radius: 18px !important;
  border: none !important;
  color: #F3F3F3 !important;
  font-weight: bold !important;
font-size: 24px !important;
}

</style>
