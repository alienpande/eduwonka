<template>
  <div>
    <ValidationObserver ref="observer">
    <e-form
      v-for="department in departments"
      :key="department.id"
      themeFooter
      heading="Add Department"
      subHeading="Add relevant departments for your employees to categorise them.( eg Teaching, Non Teaching, Class IV )"
      :rules="rules"
    >
      <e-input v-model="department.name" label="Department Name" rules="required"/>
      <template #themeFooter>
        <el-col>
          Add relevant Designation in this department ( like teaching staff will
          have HOD, POC etc <br />and Non teaching Will have Clerk, Accountant
          etc. )
        </el-col>
        <add-designation v-model="department.designations" />
      </template>
    </e-form>
     </ValidationObserver>
  </div>
</template>

<script>
import AddDesignation from "./AddDesignation.vue";
export default {
  components: { AddDesignation },
  props: {
    departments: {
      type: Array
    }
  },
  data() {
    return {
      rules: {},
    };
  },
  computed: {
    isValid () {
      return this.department.designations;
    }
  },
  methods: {},
};
</script>
