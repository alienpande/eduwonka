<template>
  <el-col :span="span" style="">
    <!-- <validate v-slot="{ errors }" :rules="rules"> -->
      <ValidationProvider :name="name" :rules="rules" v-slot="{ errors }" slim>
      <p class="label">{{ label || name }}</p>
      <el-select
        v-model="value2"
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
        @visible-change="$emit('visible-change', value2, field)"
        @remove-tag="$emit('remove-tag', value)"
        @focus="$emit('focus')"
        @clear="$emit('clear')"
        @blur="$emit('blur')"
      >
        <el-option
          v-for="item in options"
          :key="item[valueKey]"
          :label="item[optionName]"
          :disabled="item.disabled"
          :value="item[valueKey]"
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
    valueKey: {
      type: String,
    },
    field: {
      type: String,
    },
    name: {
      type: String,
    },
    optionName: {
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
  data() {
    return {
      value2: null
    }
  },
  watch: {
    value2() {
      this.value = this.value2
      console.log('DDDDDDDDDDDDDDD', this.value)
    }
  },
  created() {
    
  }
};
</script>

