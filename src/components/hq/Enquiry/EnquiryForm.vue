<template>
  <div v-if="!loading" class="form-type-2">
    <!-- #region Prospective enquiry Detail Form -->
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <e-form v-loading="loading"
      v-if="!showEnquiryDetailOnly"
      :gutter="50"
      heading="Prospective student Detail"
      :rules="rules"
    >
      <e-input
        :span="12"
        name="Full Name"
        v-model="enquiry.student_name"
        placeholder="Enter Student Name"
        rules="required"
      ></e-input>
      <e-radio
        :span="12"
        label="Gender"
        :options="gender"
        v-model="enquiry.gender"
        rules="required"
      />

      <e-select
        :span="12"
        label="Standard"
        placeholder="Choose Standard"
        :v-model="enquiry.standard_id"
        :options="standardsData"
        :optionName="'name'"
        :valueKey="'id'"
        :field="'standard_id'"
        @visible-change ="visibleChange"
        rules="required"
      ></e-select>


      <!-- <el-select v-model="enquiry.standard_id" placeholder="Choose Standard" :span="12">
        <el-option
          v-for="item in standardsData"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select> -->
      <e-input
        :span="12"
        v-model="enquiry.mobile_number"
        label="Mobile Number"
        placeholder="Enter Mobile Number"
        rules="required"
      ></e-input>

      <e-date-picker
        :span="12"
        v-model="enquiry.dob"
        type="date"
        name="Date of Birth"
        placeholder="Pick a Date"
        @change="changeDate"
        format="MM/dd/yyyy"
        rules="required"
      ></e-date-picker>
      
      <!-- <el-date-picker
        :span="12"
        label="dateofbirth"
        v-model="enquiry.dob"
        placeholder="Date of birth"
      ></el-date-picker>  -->

<!--         
      <el-date-picker
        :span="12"
        v-model="enquiry.admission_date"
        placeholder="Admission Date"
        label="Admission Aate"
      ></el-date-picker>  -->
      
      <e-select
        :span="12"
        label="Place of birth"
        placeholder="Choose a Place"
        :v-model="enquiry.place_of_birth"
        :options="placeofbirth"
        :optionName="'Place of birth'"
        :valueKey="'label'"
        :field="'place_of_birth'"
        @visible-change ="visibleChange"
        rules="required"
      ></e-select>

      <!-- <el-select v-model="enquiry.place_of_birth" placeholder="Place of Birth" :span="12">
        <el-option
          v-for="item in placeofbirth"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select> -->

      <!-- <e-select
        :span="12"
        label="Place of birth"
        placeholder="Place of birth"
        :v-model="enquiry.place_of_birth"
        :options="placeofbirth"
      ></e-select> -->
      <e-input
        :span="12"
        v-model="enquiry.nationality"
        label="Nationality"
        placeholder="Enter Nationality"
        rules="required"
      ></e-input>
<!-- 
      <el-select v-model="enquiry.blood_group" placeholder="Blood Group" :span="12">
        <el-option
          v-for="item in bloodGroups"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select> -->
      <e-select
        :span="12"
        label="Blood Group"
        placeholder="Choose Blood Group"
        :v-model="enquiry.blood_group"
        :options="bloodGroups"
        :optionName="'bloodGroups'"
        :valueKey="'label'"
        :field="'blood_group'"
        @visible-change ="visibleChange"
        rules="required"
      ></e-select>

      <!-- <e-select
        :span="12"
        label="Blood Group"
        placeholder="Choose Blood Group"
        :v-model="enquiry.blood_group"
        :options="bloodGroups"
      ></e-select> -->

      <e-select
        :span="12"
        label="Caste"
        placeholder="Choose Caste"
        :v-model="enquiry.caste"
        :options="caste"
        :optionName="'caste'"
        :valueKey="'label'"
        :field="'caste'"
        @visible-change ="visibleChange"
        rules="required"
      ></e-select>    
<!-- 
      <el-select v-model="enquiry.caste" placeholder="Choose Caste" :span="12">
        <el-option
          v-for="item in caste"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select> -->
      <!-- <e-select
        :span="12"
        label="Caste"
        placeholder="Choose Caste"
        :v-model="enquiry.caste"
        :options="caste"
      ></e-select> -->

      <e-select
        :span="12"
        label="Religion"
        placeholder="Choose Religion"
        :v-model="enquiry.religion"
        :options="religion"
        :optionName="'religion'"
        :valueKey="'label'"
        :field="'religion'"
        @visible-change ="visibleChange"
        rules="required"
      ></e-select>  
         <!-- <el-select v-model="enquiry.religion" placeholder="Choose Religion" :span="12">
        <el-option
          v-for="item in religion"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select> -->
      <!-- <e-select
        :span="12"
        label="Religion"
        placeholder="Choose Religion"
        :v-model="enquiry.religion"
        :options="religion"
      ></e-select> -->

      <e-input
        :span="12"
        v-model="enquiry.father_name"
        label="Father Name"
        placeholder="Enter Father Name"
      ></e-input>

      <e-input
        :span="12"
        v-model="enquiry.mother_name"
        label="Mother Name"
        placeholder="Enter Mother Name"
        rules="required"
      ></e-input> 

      <e-select
        :span="12"
        label="City"
        placeholder="Choose City"
        :v-model="enquiry.city"
        :options="City"
        :optionName="'City'"
        :valueKey="'label'"
        :field="'city'"
        @visible-change ="visibleChange"
        rules="required"
      ></e-select>  
      <!-- <el-select v-model="enquiry.city" placeholder="Choose City" :span="12">
        <el-option
          v-for="item in City"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select> -->
      <!-- <e-select
        :span="12"
        label="City"
        placeholder="Choose City"
        :v-model="enquiry.city"
        :options="City"
      ></e-select> -->

      <e-select
        :span="12"
        label="State"
        placeholder="Choose State"
        :v-model="enquiry.state"
        :options="state"
        :optionName="'state'"
        :valueKey="'label'"
        :field="'state'"
        @visible-change ="visibleChange"
        rules="required"
      ></e-select>

      <!-- <el-select v-model="enquiry.state" placeholder="Choose State" :span="12">
        <el-option
          v-for="item in state"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select> -->
      <!-- <e-select
        :span="12"
        label="State"
        placeholder="Choose State"
        :v-model="enquiry.state"
        :options="state"
      ></e-select> -->
      <e-select
        :span="12"
        label="Country"
        placeholder="Choose Country"
        :v-model="enquiry.country"
        :options="country"
        :optionName="'country'"
        :valueKey="'value'"
        :field="'country'"
        @visible-change ="visibleChange"
        rules="required"
      ></e-select>
   
      <!-- <e-select
        :span="12"
        label="Country"
        placeholder="Choose Country"
        :v-model="enquiry.country"
        :options="country"
      ></e-select> -->

      <e-select
        :span="12"
        label="postal"
        placeholder="Choose postal"
        :v-model="enquiry.postal"
        :options="postal"
        :optionName="'postal'"
        :valueKey="'value'"
        :field="'postal'"
        @visible-change ="visibleChange"
        rules="required"
      ></e-select>
<!-- 
     <el-select v-model="enquiry.postal" placeholder="Choose Pincode" :span="12">
        <el-option
          v-for="item in postal"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select> -->
      <!-- <e-select
        :span="12"
        label="Pincode"
        placeholder="Choose Pincode"
        :v-model="enquiry.postal"
        :options="postal"
      ></e-select> -->

      <e-select
        :span="12"
        label="Before School"
        placeholder="Choose School"
        :v-model="enquiry.before_school_name"
        :options="beforeschool"
        :optionName="'beforeschool'"
        :valueKey="'label'"
        :field="'before_school_name'"
        @visible-change ="visibleChange"
        rules="required"
      ></e-select>
<!-- 
      <e-input
        :span="12"
        v-model="enquiry.purpose"
        label="Purpose"
        placeholder="Purpose"
      ></e-input> -->
    <!-- <el-select v-model="enquiry.before_school_name" placeholder="Choose School" :span="12">
        <el-option
          v-for="item in beforeschool"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select> -->
      <!-- <e-select
        :span="12"
        label="Before School"
        placeholder="Choose Before School"
        :v-model="enquiry.before_school_name"
        :options="beforeschool"
      ></e-select> -->
    <!-- </e-form> -->
    <!-- endregion -->

    <!-- #region Enquiry Details Form -->
    <!-- <e-form :gutter="50" heading="Enquiry Details"> -->


<!-- <e-select
        :span="12"
        label="Status"
        placeholder="Choose Status"
        :v-model="enquiry.Status"
        :options="Status"
        :optionName="'Status'"
        :valueKey="'label'"
        :field="'Status'"
        @visible-change ="visibleChange"
      ></e-select> -->
    </e-form>

    <e-form :gutter="50" heading="Enquiry Details">

      <e-input
        :span="12"
        name="Enquirer Name"
        v-model="enquiry.enquirer_name"
        placeholder="Enter Enquirer Name"
        rules="required"
      ></e-input>

<!-- 
      <el-select v-model="enquiry.status" placeholder="Choose Status" :span="12">
        <el-option
          v-for="item in Status"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select> -->
        <!-- <e-input
          :span="12"
          v-model="enquiry.status"
          label="Status"
          placeholder="Status"
        ></e-input> -->
      <e-date-picker
        :span="12"
        v-model="enquiry.enquiry_date"
        type="date"
        name="Enquiry filing date"
        placeholder="Pick a Date"
        @change="changeDate"
        format="MM/dd/yyyy"
        rules="required"
      ></e-date-picker>
  <!-- <e-select
        :span="12"
        label="Enquiry Type"
        placeholder="Choose Enquiry Type"
        :v-model="enquiry.enquiry_type"
        :options="EnquiryType"
        :optionName="'EnquiryType'"
        :valueKey="'label'"
        :field="'enquiry_type'"
        @visible-change ="visibleChange"
      ></e-select> -->
      <e-input
        :span="12"
        v-model="enquiry.ref_email"
        label="Ref Email"
        placeholder="example@gmail.com"
        rules="required"
      ></e-input>
      

      <e-input
        :span="12"
        v-model="enquiry.enquirer_mobile_num"
        label="Mobile Number"
        placeholder="Enter Mobile Number"
        rules="required"
      ></e-input>
      
      <!-- <el-select v-model="enquiry.enquiry_type" placeholder="Choose Enquiry Type" :span="12">
        <el-option
          v-for="item in EnquiryType"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select> -->
      <!-- <e-input
        :span="12"
        v-model="enquiry.enquiry_type"
        label="Enquiry Type"
        placeholder="Enquiry Type"
      ></e-input> -->
      <e-input
        :span="24"
        type="textarea"
        v-model="enquiry.details"
        label="Enquiry Details"
        placeholder="Enter Enquiry Details"
        rules="required"
      ></e-input>

      
<!-- <el-date-picker
      :span="12"
      v-model="enquiry.enquiry_date"
      placeholder="Filling date"
      label="Enquiry filing date"
    ></el-date-picker> -->



    </e-form>
    <!-- endregion -->

    <el-row class="form-last-buttons ">
      <e-button
        :span="20"
        label="Cancel"
        width="180"
        type="default"
        @click="handleCancel"
        class="p-45"
      ></e-button>
      <e-button
        :span="4"
        label="Submit"
        width="180"
        @click="handleSubmit(handleClick)"
        css="float-right"
        class="p-45"
      ></e-button>
    </el-row>
    </ValidationObserver>
  </div>
</template>
<script>
import { dispatchGraphqlQuery, dispatchGraphqlMutation } from "@/api/dispatcher";

export default {
  props: {
    showEnquiryDetailOnly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      rules: {},
      standardsData: [],
      loading: false,
      enquiry: {},
      standards: [
        {
          label: "X",
          value: "x",
        },
        {
          label: "IX",
          value: "ix",
        },
        {
          label: "VIII",
          value: "viii",
        },
        {
          label: "VII",
          value: "vii",
        },
        {
          label: "VI",
          value: "vi",
        },
      ],
      beforeschool: [
        {
          label: "Apricot High School	",
          value: "Apricot High School	",
        },
        {
          label: "Azra Public School	",
          value: "Azra Public School	",
        },
        {
          label: "Bashyam Public School	",
          value: "Bashyam Public School	",
        },
      ],
      placeofbirth: [
        {
          label: "Maharastra",
          value: "Maharastra",
        },
        {
          label: "Andhra",
          value: "Andhra",
        },
        {
          label: "Tamilnadu",
          value: "Tamilnadu",
        },
      ],
      tongue: [
        {
          label: "Hindi",
          value: "hindi",
        },
        {
          label: "English",
          value: "english",
        },
        {
          label: "Tamil",
          value: "tamil",
        },
      ],
      caste: [
        {
          label: "Hindu",
          value: "hindu",
        },
        {
          label: "Muslim",
          value: "muslim",
        },
      ],

      Status: [
        {
          label: "Active",
          value: "Active",
        },
        {
          label: "Inactive",
          value: "Inactive",
        },
      ],      
      religion: [
        {
          label: "Hindu",
          value: "hindu",
        },
        {
          label: "Muslim",
          value: "muslim",
        },
      ],
      gender: [
        {
          title: "Male",
          value: "male",
        },
        {
          title: "Female",
          value: "female",
        },
      ],
      postal: [
        {
          title: "Hyderabad",
          value: "Hyderabad",
        },
        
        {
          title: "Vijayawada",
          value: "Vijayawada",
        },
        {
          title: "Pune",
          value: "pune",
        },
      ],

      country: [
        {
          label: "India",
          value: "India",
        },
        {
          label: "Germany",
          value: "Germany",
        },
        {
          label: "Japan",
          value: "Japan",
        },
      ],

      state: [
        {
          label: "Maharashtra",
          value: "Maharashtra",
        },
        {
          label: "Andhra",
          value: "Andhra",
        },
        {
          label: "Telangana",
          value: "Telangana",
        },
      ],

      City: [
        {
          label: "Hyderabad",
          value: "Hyderabad",
        },
        {
          label: "Bangalore",
          value: "Bangalore",
        },
        {
          label: "Pune",
          value: "Pune",
        },
      ],
       
      // EnquiryType: [
      //   {
      //     label: "prospect",
      //     value: "prospect",
      //   },
      //   {
      //     label: "Student",
      //     value: "Student",
      //   },
      // ],
      bloodGroups: [
        {
          label: "A+",
          value: "a+",
        },
        {
          label: "B+",
          value: "b+",
        },
        {
          label: "O+",
          value: "o+",
        },
      ],
      // mutation: `mutation insert_single_enquiries($object: enquiries_insert_input! ) {
      //   insert_enquiries_one(object: $object) {
      //   id

      //   }
      // }`,
    }
  },
  computed: {
    isValid () {
      return this.enquiry.student_name && this.enquiry.gender && this.enquiry.standard_id && this.enquiry.mobile_number && this.enquiry.dob && this.enquiry.place_of_birth && this.enquiry.nationality && this.enquiry.blood_group && this.enquiry.caste && this.enquiry.religion && this.enquiry.father_name && this.enquiry.mother_name && this.enquiry.city && this.enquiry.state && this.enquiry.country && this.enquiry.before_school_name && this.enquiry.enquirer_name && this.enquiry.enquiry_date && this.enquiry.ref_email && this.enquiry.postal && this.enquiry.enquirer_mobile_num && this.enquiry.details;
    }
  },
  methods: {
    visibleChange: function(value, field) {
      this.enquiry[field] = value
    },
    getFilterVariables() {
       console.log(this.enquiry)
      return { "object": this.enquiry }
    },  
    changeDate: function(value) {
      this.enquiry.dob = value
      this.enquiry.enquiry_date=value
    },
    
    getStandards() {      
      dispatchGraphqlQuery('standards', ['id', 'name']).then((response) => {
        this.standardsData = response.standards
      })
    },
    handleClick() {
      console.log('$$$$$$$$$$$$$$$$w2sdfasdf', this.enquiry)
      if (this.showEnquiryDetailOnly) {
        this.enquiry.purpose = 'Enquiry Application from '  + this.enquiry.enquirer_name
        this.enquiry.status = 'Active'
        this.enquiry.enquiry_type = 'Student'
        // this.enquiry.standard_id = '8604e30f-2cc7-4ff4-af60-2bca742f4ca2'    
      } else if (!this.showEnquiryDetailOnly) {
        this.enquiry.purpose = 'Application for the Admission of '  + this.enquiry.student_name
        this.enquiry.status = 'Active'
        this.enquiry.enquiry_type = 'prospect'
      }
      dispatchGraphqlMutation('enquiries',['id'], this.enquiry).then((response) => {
        console.log("testing data",response)
        this.enquiry = response.insert_enquiries_one
        if (!this.showEnquiryDetailOnly)
        this.$router.push(this.$url.HQ_ENQUIRES_PROSPECT_DETAIL+'/'+this.enquiry.id);
        else this.$router.push(this.$url.HQ_ENQUIRES_STUDENT_DETAIL+'/'+this.enquiry.id);
      })
      this.$emit("save", this.enquiry);
    },
    handleCancel(){},      
    // getStandards: function() {   
    //   // this.loading = true   
    //   // const query = `query MyQuery {  
    //   //   standards{
    //   //     id
    //   //     name
    //   //   }
    //   // }`
      
    //   dispatchGraphql(query).then((response) => {
    //     this.standardsData = response.standards
    //     console.log('standardData', this.standardsData)
    //     this.loading = false         
    //     })
    // },
  },
  created() {
    this.getStandards()
  }
};
</script>
