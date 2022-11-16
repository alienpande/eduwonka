<template>
  <el-col>
   <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <el-row class="mt30">
      <e-input
        :span="8"
        placeholder="Type here"
        v-model="designation.designation_type"
        label="Add Designation to Department"
        rules="required"
      />
      <e-button
        plain
        :span="3"
        :offset="1"
        label="Add"
        style="margin-top: 25px"
         :rules="rules"
        @click="handleSubmit(addDesignation)"
      />
      
    </el-row>
   </ValidationObserver>
    <el-row class="mt20" :gutter="30" v-if="designationList.length > 0">
      <p class="label ml20">Designation List</p>
      <el-col
        :span="4"
        v-for="(i, index) in designationList"
        :key="index + 1"
        class="ml20 mt20"
      >
        <el-row>
          <el-col :span="20" style="word-break: break-all; color: #888888">{{
            i.designation_type
          }}</el-col>
          <el-col :span="4">
            <i
              class="el-icon-close"
              style="color: #bc6c42; font-weight: bold; cursor: pointer"
              @click="deleteDesignation(index)"
            ></i>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- </ValidationObserver> -->
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
  },
  data() {
    return {
      rules: {},
      designation: {
        designation_type: null
      },
      designationList: [],
    };
  },
  computed: {
    isValid () {
      return this.designation.designation_type;
    }
  },
  methods: {
    addDesignation() {
      if (this.designation != "") {
        this.designationList.push(this.designation);
        this.designation = {};
        this.inputChange();
      }
    },
    deleteDesignation(i) {
      this.designationList.splice(i, 1);
      this.inputChange();
    },
    inputChange() {
      this.$emit("input", this.designationList);
    },
  },
  created() {
    console.log('$$$$$$$$$$$$$$$$$$$$', this.value)
    this.designationList = this.value;
    this.inputChange();
  },
  watch: {
    value(newVal) {
      this.designationList = newVal;
    },
  },
};
</script>
