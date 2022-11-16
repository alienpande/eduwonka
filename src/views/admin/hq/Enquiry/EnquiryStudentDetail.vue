<template>
  <e-container hideHeader pageTitle="View General Enquiry">
    <!-- <nav-bar class="mg-l-20"
      heading="View General Enquiry"
      @backClick="$router.push($url.HQ_ENQUIRES)"
    ></nav-bar> -->

    <e-form :gutter="50" heading="Enquiry Details" class="form-class form-type-2 form-type-view">
      <el-col
        :span="5"
        v-for="(enq, index) in enquiry"
        :key="index"
        class="mg-t-40 form-input"
      >
        <p class="title" style=" text-transform: capitalize">{{ enq.text }}</p>
        <p v-if="enq.text !== 'Enquirer Status'" class="text">
          {{ enq.value }}
        </p>
        <p
          v-else
          class="text"
          :style="{ color: enq.value === 'Open' ? 'Red' : '##0BC32E' }"
        >
          {{ enq.value }}
        </p>
      </el-col>
      <el-col class="form-input">
        <e-button :plain="true" :span="4" label="Mark Respondant"> </e-button>
      </el-col>
    </e-form>
     <hr class="end-of-form-line">

    <el-row class="form-last-buttons">
        <e-button
        :span="24"
        label="Print"
        width="180"
        @click="handleClick"
        css="float-right"
        class="p-45"
      ></e-button>
        <e-button
        :span="24"
        plain
        label="Cancel"
        width="180"
        type="default"
        @click="handleClick"
        class="p-45"
      ></e-button>
 


    </el-row>
  </e-container>
</template>
<script>
import { dispatchGraphql } from "@/api/dispatcher"
import navBar from "@/components/pageNavBar";
import { mapMutations } from "vuex";
export default {
    props:['enquiryData'],  
  components: {
    navBar,
  },
  data() {
    return {
      enquiry_id: this.$route.params.id,
      enquiry: [
        {
          text: "Enquirer Name",
          value: "Lorem",
        },
        {
          text: "Enquiry filing date",
          value: "Lorem",
        },
        {
          text: "Ref Email",
          value: "Lorem",
        },
        {
          text: "Mobile Number of Enquirer",
          value: "Lorem",
        },
        {
          text: "Enquirer Status",
          value: "Responded",
        },
        {
          text: "Enquiry Details / Purpose",
          value: "LoreIpsum, sector 14, 131001, Sonipat,Harayana",
        },
      ],
    };
  },
  methods: {

    getEnquiry() {
      const query = `query($id: uuid!) {
        enquiries_by_pk(id: $id) {          
          enquirer_name
          enquirer_mobile_num
          details
          ref_email
          enquiry_date
        }
      }` 
      dispatchGraphql(query, {id: this.enquiry_id}).then((response) => {
        console.log('enquerystusent', response)
        const data = []
        const entries = Object.entries(response.enquiries_by_pk);
        for(const item of entries){
          data.push({text: (item[0].replace("_"," ")) , value: item[1]})
        }
        this.enquiry = data
        console.log('array', data)
      })
          // console.log(this.enquiry)
          // return { "object": enquiry }
    },
    ...mapMutations("Common", ["setAsideMenuCollapse", "setAsideWidth"]),
    handleClick() {},
    handleCancel() {},
    scrollTop() {
      this.$nextTick(() => {
        this.$refs.tab2.scrollTop = 0;
      });
    },
  },
   mounted() {
    /* this.setAsideMenuCollapse(true);
    setTimeout(() => {
      this.setAsideWidth("100px");
    }, 100); */
  },
  created() {
    this.getEnquiry() 
//    this.setAsideMenuCollapse(true);
//    this.setAsideWidth("100px");
  },
  destroyed() {
    this.setAsideMenuCollapse(false);
  },
};
</script>

<style scoped>
.title {
  text-align: left;
  font: 16px;
  letter-spacing: 0px;
  color: #000000cc;
  font-weight: bolder;
}
.text {
  text-align: left;
  font: 16px;
  letter-spacing: 0px;
  color: #bcbcbc;
}
.form-type-view .form-block > div > div:last-child{
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
.form-type-view .form-block > div > div:last-child>div{
  width: auto;
}
@media only screen and (device-width: 768px) {
  .form-class {
    width: 1200px;
  }
  .form-class .form-input {
    margin-left: -10px;
    font-size: 14px;
    margin-right: 5px;
  }
  .buttons {
    float: right;
  }
}
</style>
