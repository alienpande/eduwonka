<template>
  <!-- <e-container hideHeader pageTitle="View Prospect Enquiry" :back="$router.push($url.HQ_ENQUIRES)"> -->
  <e-container hideHeader pageTitle="View Prospect Enquiry" >
    <!-- <nav-bar class="mg-l-20"
      heading="View Prospect Enquiry"
      @backClick="$router.push($url.HQ_ENQUIRES)"
    ></nav-bar> -->
    <e-form v-if="enquiryViewData.enquiry_type === 'prospect'" :gutter="50" heading="Prospective student Detail" class="form-class form-type-2 form-type-view">
      <el-col
        :span="4"
        v-for="(enq, index) in enquiry"
        :key="index"
        class="mg-t-40 form-input"
      >
        <p class="title" style=" text-transform: capitalize" >{{ enq.text }}</p>
        <p class="text">{{ enq.value }}</p>
      </el-col>
    </e-form>

    <e-form v-else :gutter="50" heading="Enquiry Details" class="form-class form-type-2 form-type-view">
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
      <el-col :offset="20">
        <e-button :plain="true" :span="4" label="Mark Respondant"> </e-button>
      </el-col>
    </e-form>
      <hr class="end-of-form-line">
    <el-row class="buttons form-last-buttons">
            <e-button
        :span="4"
        label="Print"
        width="180"
        @click="handleClick"
        class="p-45"
      ></e-button>
      <e-button
        :span="20"
        label="Cancel"
        width="180"
        type="default"
        @click="handleCancel"
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
      enquiryViewData: {},
      enquiry_id: this.$route.params.id,
      enquiryProspect: [
        {
          text: "Full Name",
          value: "Lorem",
        },
        {
          text: "Gender",
          value: "Female",
        },
        {
          text: "Standard",
          value: "X",
        },
        {
          text: "Mobile Number",
          value: "Lorem",
        },
        {
          text: "Date of birth",
          value: "Lorem",
        },
        {
          text: "Place of Birth",
          value: "Lorem",
        },
        {
          text: "Nationality",
          value: "Indian",
        },
        {
          text: "Caste",
          value: "Lorem",
        },
        {
          text: "Blood Group",
          value: "Lorem",
        },
        {
          text: "Religion",
          value: "Lorem",
        },
        {
          text: "Father Name",
          value: "Lorem",
        },
        {
          text: "Mother Name",
          value: "Lorem",
        },
        {
          text: "Before School",
          value: "Lorem",
        },
        {
          text: "City",
          value: "Lorem",
        },
        {
          text: "State",
          value: "Lorem",
        },
        {
          text: "Country",
          value: "Lorem",
        },
        {
          text: "Pincode",
          value: "Lorem",
        },
      ],
      enquiry: [
        // {
        //   text: "Enquirer Name",
        //   value: "Lorem",
        // },
        // {
        //   text: "Enquiry filing date",
        //   value: "Lorem",
        // },
        // {
        //   text: "Ref Email",
        //   value: "Lorem",
        // },
        // {
        //   text: "Mobile Number of Enquirer",
        //   value: "Lorem",
        // },
        // {
        //   text: "Enquirer Status",
        //   value: "Responded",
        // },
        // {
        //   text: "Enquiry Details / Purpose",
        //   value: "LoreIpsum, sector 14, 131001, Sonipat,Harayana",
        // }
      ]
    };
  },
  methods: {
    getEnquiry() {
      const query = `query($id: uuid!) {
        enquiries_by_pk(id: $id) {
          student_name
          gender
          standard_id
          mobile_number  
          dob
          place_of_birth
          nationality
          blood_group
          caste
          religion
          father_name
          mother_name
          city
          state
          enquiry_type
          postal
          before_school_name 
          enquirer_name
          enquiry_date
          enquirer_mobile_num
        }
      }` 
      dispatchGraphql(query, {id: this.enquiry_id}).then((response) => {
        console.log('enquery', response)
        const data = []
        this.enquiryViewData = response.enquiries_by_pk
        const entries = Object.entries(response.enquiries_by_pk);
        //entries.map(item => {item.text=item[0], item.value=item[1]})
        for(const item of entries){
          data.push({text: (item[0].replace("_"," ")) , value: item[1]})
        }
        this.enquiry = data
        console.log('array', data)
      })
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
    // this.setAsideMenuCollapse(true);
    // setTimeout(() => {
    //   this.setAsideWidth("100px");
    // }, 100);
  },
  created() {
    this.getEnquiry()
    // this.setAsideMenuCollapse(true);
    // this.setAsideWidth("100px");
  },
  destroyed() {
    // this.setAsideMenuCollapse(false);
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
