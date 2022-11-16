<template>
  <div>
    <div style="position: relative">
      <img
        style="position: absolute; margin-left: 7px; margin-top: 6px"
        src="@/assets/images/searchIconStudent.png"
        alt=""
      />
      <input
        class="student-search"
        type="text"
        v-model="value"
        @change="$emit('input',value)"
        :placeholder="placeholder"
      />
    </div>
  </div>
</template>
<script>
export default {
    props:['value','placeholder']
}
</script>
<style scoped>
.student-search {
  color: #9d9d9d;
  background: #353535;
  border-radius: 18px;
  padding: 10px 8px 10px 30px;
  border: none;
  width: 100%;
}
</style>
