<template>
  <e-container-lite
    :percentage="80"
    tag="North Campus"
    showFooter
    @back="$go($url.WORKING_HOURS)"
    @next="$go($url.BASIC_FINANCIAL)"
  >
    <template #titleHead>
      <div class="h1">Employee Details</div>
      <div class="h5">
        Kindly create the designation and Department for your employees
      </div>
    </template>

    <e-form
      heading="Add Standard"
      subHeading="Kindly create the Levels, relevant for the institution to access the student’s progress"
    >
      <div class="department-description">
        <el-row>
          You have no Departments added yet <br />
          let’s add some departments for your institution <br />
          ( eg Teaching, Non Teaching, Class IV employees)
        </el-row>

        <el-row>
          <e-button
            class="add-departments-button"
            :span="4"
            label="+ Add Departments"
            type="primary"
          />
        </el-row>
      </div>

      <div class="p-20" v-for="obj in objs" :key="obj.id">
        <el-row>
          <e-input
            v-model="obj.val"
            label="Department Name"
            placeholder="Type here"
            :span="6"
          />
        </el-row>

        <designation-list />
      </div>
    </e-form>
    <el-row>
      <e-button
        @click="addDepartments()"
        label="+ Add More Departments"
        plain
      ></e-button>
    </el-row>
    <DepartmentNoDataFound v-if="noDataFound" @noData="noDataFound = false" />
    <AddDepartment v-if="!noDataFound" />
  </e-container-lite>
</template>
<script>
export default {
  components: {
    AddDepartment: () =>
      import(
        "@/components/onboarding/DesignationDepartment/AddDepartment.vue"
      ),
    DepartmentNoDataFound: () =>
      import(
        "@/components/onboarding/DesignationDepartment/DepartmentNoDataFound.vue"
      ),
  },
  data() {
    return {
      noDataFound: true,
    };
  },
  methods: {
    addDepartments() {
      let count = this.objs.length;
      this.objs.push({
        val: "",
        id: count,
      });
      this.department = "";
    },
  },
};
</script>

<style scoped>
.add-departments-button {
  margin: 0 auto;
  padding-top: 50px;
  text-align: center;
}
.p-20 {
  padding: 20px;
}
.department-description {
  text-align: center;
  align-items: center;
  padding: 50px;
  color: #000000cc;
  font-weight: 600;
}
</style>
