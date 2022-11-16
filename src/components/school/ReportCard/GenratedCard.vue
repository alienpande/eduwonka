<template>
<div>
  <el-col v-for="exam in exams" :key="exam.id" class="bg-style"  :lg="10" :md="11">
    <div @click="$emit('getExam', exam)" class="cp">
      <el-row>
        <el-col class="fw-550" :span="12">  {{exam.standard.name}} </el-col>
        <el-col class="mtl-1040" :span="12">
          <el-row>
            <el-col class="display-flex" :span="24">
              <img
                class="br-25"
                width="40"
                height="40"
                src="https://ca.slack-edge.com/T01HA3W2NJE-U01HG8PDQMS-4cbd5c726f75-72"
              />
              <span class="display-flex mtl-10"> {{exam.users.first_name}} </span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row class="mt-20">
        <el-col class="fs-12" :span="12"> Report generated </el-col>
        <el-col class="fs-12" :span="12"> Students </el-col>
      </el-row>

      <el-row>
        <el-col class="fw-550" :span="12"> 10th Aug 2020 </el-col>
        <el-col class="fw-550" :span="12"> {{ exam.exam_report.length }} </el-col>
      </el-row>

      <el-row class="mt-15">
        <el-col class="fs-12" :span="12"> Due Date </el-col>
        <el-col class="fs-12" :span="12"> Exam Type </el-col>
      </el-row>

      <el-row>
        <el-col class="fw-550" :span="12"> 14th Aug 2020 </el-col>
        <el-col class="fw-550" :span="12">  {{exam.exam_type.name}} </el-col>
      </el-row>
    </div>
  </el-col>
</div>
</template>

<script>
export default {
  props: {
    exams: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
     
    };
  },
  created() {
    // this.getExams()
  },
  methods: {
    
  },
};
</script>

<style scoped>
.bg-style {
  background-color: #ffffff;
  padding: 25px;
  margin: 10px;
}
.fw-550 {
  font-weight: 550;
}
.fs-12 {
  font-size: 12px;
}
.mt-15 {
  margin-top: 15px;
}
.mt-20 {
  margin-top: 20px;
}
.mtl-1040 {
  margin: -10px 0 0 -40px;
}
.br-25 {
  border-radius: 25px;
}
.mtl-10 {
  margin: 10px 0 0 10px;
}
</style>
