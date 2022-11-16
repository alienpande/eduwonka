<template>
  <e-form
    heading="Add Standard"
    subHeading="Kindly create the Levels, relevant for the institution to access the student’s progress"
    class="text-center"
  >
    <el-col class="mb30">
      You have no Departments added yet <br />
      let’s add some departments for your institution <br />
      ( eg Teaching, Non Teaching, Class IV employees)
    </el-col>
    <e-button
      label="+ Add Departments"
      type="primary"
      @click="$emit('noData')"
    />
  </e-form>
</template>

<script>
export default {};
</script>
