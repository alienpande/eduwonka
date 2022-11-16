<template>
  <div class="designation-bg">
    <el-row class="prl-20">
      Add relevant Designation in this department ( like teaching staff will
      have HOD, POC etc <br />
      and Non teaching Will have Clerk, Accountant etc. )
    </el-row>

    <el-row class="p-20" :span="24">
      <el-col :span="8">
        <e-input
          v-model="designation"
          label="Add Designation to department"
          placeholder="Type here"
        />
      </el-col>
      <el-col :span="4">
        <e-button
          @click="addDesignations()"
          style="color: #fcdfbd; margin: 20px 20px"
          small
          label="Add"
          plain
        ></e-button>
      </el-col>
    </el-row>

    <el-row class="prl-20"> Designation List </el-row>

    <el-col
      v-for="(obj, index) in objs"
      :key="obj.id"
      :span="4"
      class="designation-list"
    >
      <el-row>
        <el-col :span="3">{{ obj.val }}</el-col>
        <el-col @click="clearDesignation(index)" :span="1">X</el-col>
      </el-row>
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      objs: [],
      designation: "",
    };
  },
  methods: {
    addDesignations() {
      let count = this.objs.length;
      this.objs.push({
        val: this.designation,
        id: count,
      });
      this.designation = "";
    },
    clearDesignation(i) {
      // eslint-disable-next-line
            // console.log('this method is firing')
      this.objs.splice(i, 1);
    },
  },
};
</script>

<style scoped>
.designation-bg {
  background-color: #fcdfbd;
  padding: 30px 0;
}
.prl-20 {
  padding: 0 20px;
}
.p-20 {
  padding: 20px;
}
.designation-list {
  padding: 20px;
  display: flex;
}
</style>
