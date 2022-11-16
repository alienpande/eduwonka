<template>
  <div class="pointer" @click="enquiry_type === 'prospect' ? $router.push($url.HQ_ENQUIRES_PROSPECT_DETAIL + '/' + id) : $router.push($url.HQ_ENQUIRES_STUDENT_DETAIL + '/' + id)">
    <el-card v-if="enquiry_type === 'prospect'" class="enquiryCard">
      <el-row>
        <el-col :span="14">
          <p class="enquiryCardTitle title">{{ title }}</p>
        </el-col>
        <el-col :span="2" :offset="4">
          <e-button
            icon="el-icon-download"
            :plain="true"
            type="primary"
          ></e-button>
        </el-col>
      </el-row>
      <el-row class="enquiryContent">
        <el-col :span="5" class="content">
          <p class="header">Name</p>
          <p class="text">{{ name }}</p>
        </el-col>
        <el-col :span="6" class="content">
          <p class="header">Standard</p>
          <p class="text">{{ standard }}</p>
        </el-col>
        <el-col :span="7" class="content">
          <p class="header">Enquiry Date</p>
          <p class="text">{{ enquiryDate }}</p>
        </el-col>
        <el-col :span="4" class="content">
          <p class="header">Status</p>
          <p class="text" :style="{ color: status === 'Inactive' ? 'Red' : 'Green' }">
            {{ status }}
          </p>
        </el-col>
      </el-row>
    </el-card>
    <el-card v-else class="enquiryCard">
      <el-row>
        <el-col :span="14">
          <p class="enquiryCardTitle">{{ title }}</p>
        </el-col>
         <el-col :span="2" :offset="4"
          ><e-button
            icon="el-icon-download"
            :plain="true"
            type="primary"
          ></e-button> 
        </el-col> 
      </el-row>
      <el-row class="enquiryContent">
        <el-col :span="6" class="content">
          <p class="header">Name</p>
          <p class="text">{{ name }}</p>
        </el-col>
        <el-col :span="10" :offset="2" class="content">
          <p class="header">Enquiry Date</p>
          <p class="text">{{ enquiryDate }}</p>
        </el-col>
        <el-col :span="5" class="content">
          <p class="header">Status</p>
          <p class="text" :style="{ color: status === 'Inactive' ? 'Red' : 'Green' }">
            {{ status }}
          </p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
export default {
  props: {
    enquiry_type: {
      type: String,
      default: null
    },
    id: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: "Lorem ipsum dolor sit amet consectetur",
    },
    name: {
      type: String,
    },
    standard: {
      type: String,
    },
    enquiryDate: {
      type: String,
    },
    status: {
      type: String,
      default: "Open",
    },
  },
  created() {
    console.log('data', this.standard, this.title, this.name, this.enquiryDate, this.status)
  }
};
</script>
<style scoped>
@media only screen and (device-width: 768px) {
  .title {
    font-size: 12px;
  }
  .content {
    font-size: 10px;
    margin-right: 2px;
  }
  .content .header {
    font-size: 12px;
  }
}

@media only screen and (max-width:767px)
{
  .enquiryCard>div>div:last-child{
    display: flex;
    flex-direction: column;
  }
  .enquiryCard>div>div:last-child>div{
    width: auto;
    margin-left: 0px;
  }
}
</style>